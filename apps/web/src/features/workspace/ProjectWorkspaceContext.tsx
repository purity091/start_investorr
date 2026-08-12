import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PlanSection, ProjectWorkspace, WorkspaceJourneyStage } from '../../types';
import {
  ACTIVE_PROJECT_STORAGE_KEY,
  WORKSPACE_OWNER_STORAGE_KEY,
  WORKSPACE_STORAGE_KEY,
  clearWorkspaceSessionCache,
  createInitialWorkspace,
  deriveWorkspace,
} from './workspaceUtils';
import { getWorkspaceMetadata } from './workspacePersistence';
import { supabase } from '@/lib/supabase';
import { withSupabaseRetry } from '@/lib/supabaseRetry';
import { useAuth } from '@/features/auth/AuthContext';
import { getProjectIdFromEditPath } from '@/utils/routes';
import { getSubscriptionPlan } from '@/lib/subscriptionPlans';
import { invalidateProjectCountCache } from '@/lib/projectCache';

interface ProjectWorkspaceContextValue {
  workspace: ProjectWorkspace;
  setWorkspace: React.Dispatch<React.SetStateAction<ProjectWorkspace>>;
  updateWorkspace: (
    updates: Partial<ProjectWorkspace> | ((current: ProjectWorkspace) => Partial<ProjectWorkspace>)
  ) => void;
  updateProfile: (updates: Partial<ProjectWorkspace['profile']>) => void;
  updateBrand: (updates: Partial<ProjectWorkspace['brand']>) => void;
  setPlanSections: (sections: PlanSection[]) => void;
  setStage: (stage: WorkspaceJourneyStage) => void;
  toggleWeeklyPriority: (id: string) => void;
  cycleAutoTaskStatus: (id: string) => void;
  cycleFirstCustomerTaskStatus: (id: string) => void;
  toggleChecklistItem: (groupId: string, itemId: string) => void;
  loadProject: (id: string) => Promise<ProjectWorkspace | null>;
  createProject: (title: string, mode: string) => Promise<string | null>;
  clearActiveProject: (id?: string) => void;
  flushWorkspace: () => Promise<void>;
  isSaving: boolean;
  syncStatus: WorkspaceSyncStatus;
  lastSyncedAt: number | null;
  activeProjectId: string | null;
}

const ProjectWorkspaceContext = createContext<ProjectWorkspaceContextValue | null>(null);

type WorkspaceSyncStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'failed' | 'conflict';

interface PendingWorkspaceSync {
  projectId: string;
  userId: string;
  workspace: ProjectWorkspace;
  updatedAt: number;
  status: 'pending_sync';
}

const WORKSPACE_SYNC_DEBOUNCE_MS = 1500;
const LEGACY_WORKSPACE_PENDING_SYNC_KEY = 'khotta_workspace_pending_sync_v1';
const WORKSPACE_PENDING_SYNC_PREFIX = 'khotta_workspace_pending_sync_v2_';
const WORKSPACE_VERSION_SNAPSHOT_MS = 15 * 60 * 1000;
const getProjectsCacheKey = (userId: string) => `khotta_projects_cache_${userId}`;
const getPendingSyncKey = (projectId: string) => `${WORKSPACE_PENDING_SYNC_PREFIX}${projectId}`;

const parsePendingSync = (raw: string | null): PendingWorkspaceSync | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<PendingWorkspaceSync>;
    if (
      typeof parsed.projectId !== 'string'
      || typeof parsed.userId !== 'string'
      || typeof parsed.updatedAt !== 'number'
      || parsed.status !== 'pending_sync'
      || !parsed.workspace
      || typeof parsed.workspace !== 'object'
    ) {
      return null;
    }

    return parsed as PendingWorkspaceSync;
  } catch {
    return null;
  }
};

const getPendingSync = (projectId: string, userId: string) => {
  const currentKey = getPendingSyncKey(projectId);
  const current = parsePendingSync(localStorage.getItem(currentKey));
  if (current?.projectId === projectId && current.userId === userId) {
    return { key: currentKey, value: current };
  }

  const legacy = parsePendingSync(localStorage.getItem(LEGACY_WORKSPACE_PENDING_SYNC_KEY));
  if (legacy?.projectId === projectId && legacy.userId === userId) {
    return { key: LEGACY_WORKSPACE_PENDING_SYNC_KEY, value: legacy };
  }

  return null;
};

const clearPendingSync = (projectId: string, userId: string) => {
  localStorage.removeItem(getPendingSyncKey(projectId));

  const legacy = parsePendingSync(localStorage.getItem(LEGACY_WORKSPACE_PENDING_SYNC_KEY));
  if (legacy?.projectId === projectId && legacy.userId === userId) {
    localStorage.removeItem(LEGACY_WORKSPACE_PENDING_SYNC_KEY);
  }
};

const loadWorkspace = (planSections: PlanSection[]) => {
  try {
    const raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (!raw) return deriveWorkspace(createInitialWorkspace(planSections));
    const parsed = JSON.parse(raw) as ProjectWorkspace;
    const initial = createInitialWorkspace(planSections);
    return deriveWorkspace({
      ...initial,
      ...parsed,
      profile: { ...initial.profile, ...parsed.profile },
      brand: { ...initial.brand, ...parsed.brand },
      decision: { ...initial.decision, ...parsed.decision },
      execution: {
        ...initial.execution,
        ...parsed.execution,
        weeklyPriorities: parsed.execution?.weeklyPriorities || initial.execution.weeklyPriorities,
        bottlenecks: parsed.execution?.bottlenecks || initial.execution.bottlenecks,
        phasePlan: parsed.execution?.phasePlan || initial.execution.phasePlan,
        autoTasks: parsed.execution?.autoTasks || initial.execution.autoTasks,
        checklists: parsed.execution?.checklists || initial.execution.checklists,
        firstCustomerSprint: parsed.execution?.firstCustomerSprint || initial.execution.firstCustomerSprint,
        kpis: parsed.execution?.kpis || initial.execution.kpis,
      },
      metrics: { ...initial.metrics, ...parsed.metrics },
      financialEstimates: parsed.financialEstimates || [],
      planSections: parsed.planSections?.length ? parsed.planSections : planSections,
    });
  } catch {
    return deriveWorkspace(createInitialWorkspace(planSections));
  }
};

export const ProjectWorkspaceProvider: React.FC<{
  children: React.ReactNode;
  planSections: PlanSection[];
}> = ({ children, planSections }) => {
  const { user, profile } = useAuth();
  const userRef = useRef(user);
  const activeProjectIdRef = useRef<string | null>(null);
  const syncInFlightPromiseRef = useRef<Promise<void> | null>(null);
  const workspaceRevisionRef = useRef(0);
  const persistedRevisionRef = useRef(0);
  const skipNextAutoSaveRef = useRef(true);
  const activeProjectVersionRef = useRef<number | null>(null);
  const lastVersionSnapshotAtRef = useRef<number>(0);
  const hydratedUserIdRef = useRef<string | null>(null);
  const restoredProjectIdRef = useRef<string | null>(null);
  const [activeProjectId, setActiveProjectIdState] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<WorkspaceSyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [workspace, setWorkspaceState] = useState<ProjectWorkspace>(() =>
    deriveWorkspace(createInitialWorkspace(planSections))
  );
  const workspaceRef = useRef<ProjectWorkspace>(workspace);

  const setWorkspace = useCallback<React.Dispatch<React.SetStateAction<ProjectWorkspace>>>((action) => {
    const current = workspaceRef.current;
    if (!current) return;

    const candidate = typeof action === 'function'
      ? (action as (current: ProjectWorkspace) => ProjectWorkspace)(current)
      : action;

    if (candidate === current) return;

    const nextWorkspace = deriveWorkspace(candidate);
    workspaceRef.current = nextWorkspace;
    workspaceRevisionRef.current += 1;
    setWorkspaceState(nextWorkspace);
  }, []);

  const setActiveProjectId = (id: string | null) => {
    activeProjectIdRef.current = id;
    setActiveProjectIdState(id);
    if (id) {
      localStorage.setItem(ACTIVE_PROJECT_STORAGE_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_PROJECT_STORAGE_KEY);
    }
  };

  useEffect(() => {
    setWorkspace((current) => {
      if (current.planSections === planSections) return current;
      return deriveWorkspace({ ...current, planSections });
    });
  }, [planSections, setWorkspace]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    workspaceRef.current = workspace;
  }, [workspace]);

  useEffect(() => {
    const nextUserId = user?.id ?? null;
    if (hydratedUserIdRef.current === nextUserId) return;
    let cancelled = false;

    hydratedUserIdRef.current = nextUserId;
    const initialWorkspace = deriveWorkspace(createInitialWorkspace(planSections));

    if (!nextUserId) {
      workspaceRef.current = initialWorkspace;
      activeProjectIdRef.current = null;
      workspaceRevisionRef.current = 0;
      persistedRevisionRef.current = 0;
      activeProjectVersionRef.current = null;
      restoredProjectIdRef.current = null;
      skipNextAutoSaveRef.current = true;
      queueMicrotask(() => {
        if (cancelled) return;
        setWorkspaceState(initialWorkspace);
        setActiveProjectIdState(null);
        setSyncStatus('idle');
      });
      return () => {
        cancelled = true;
      };
    }

    const ownsStoredWorkspace = localStorage.getItem(WORKSPACE_OWNER_STORAGE_KEY) === nextUserId;
    const routeProjectId = getProjectIdFromEditPath(window.location.pathname);
    const restoredWorkspace = routeProjectId
      ? initialWorkspace
      : ownsStoredWorkspace
        ? loadWorkspace(planSections)
        : initialWorkspace;
    const restoredProjectId = routeProjectId
      ?? (ownsStoredWorkspace ? localStorage.getItem(ACTIVE_PROJECT_STORAGE_KEY) : null);

    if (!ownsStoredWorkspace) {
      clearWorkspaceSessionCache();
    }

    workspaceRef.current = restoredWorkspace;
    activeProjectIdRef.current = restoredProjectId;
    workspaceRevisionRef.current = 0;
    persistedRevisionRef.current = 0;
    activeProjectVersionRef.current = null;
    restoredProjectIdRef.current = routeProjectId ? null : restoredProjectId;
    skipNextAutoSaveRef.current = true;
    queueMicrotask(() => {
      if (cancelled) return;
      setWorkspaceState(restoredWorkspace);
      setActiveProjectIdState(restoredProjectId);
      setSyncStatus(restoredProjectId ? 'saved' : 'idle');
    });
    return () => {
      cancelled = true;
    };
  }, [planSections, user?.id]);

  // Sync to local storage
  useEffect(() => {
    if (!user || hydratedUserIdRef.current !== user.id || workspace !== workspaceRef.current) return;

    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
    localStorage.setItem(WORKSPACE_OWNER_STORAGE_KEY, user.id);
    if (!activeProjectId) return;

    if (skipNextAutoSaveRef.current) {
      skipNextAutoSaveRef.current = false;
      return;
    }

    localStorage.setItem(
      getPendingSyncKey(activeProjectId),
      JSON.stringify({
        projectId: activeProjectId,
        userId: user.id,
        workspace,
        updatedAt: Date.now(),
        status: 'pending_sync',
      }),
    );

    setSyncStatus((current) => (current === 'saving' ? current : 'pending'));
  }, [workspace, user, activeProjectId]);

  const flushWorkspace = useCallback<() => Promise<void>>(async () => {
    if (syncInFlightPromiseRef.current) {
      await syncInFlightPromiseRef.current;
      return;
    }

    const currentUser = userRef.current;
    const currentProjectId = activeProjectIdRef.current;
    const currentWorkspace = workspaceRef.current;

    if (!currentUser || !currentProjectId || !currentWorkspace) return;

    const revisionToSave = workspaceRevisionRef.current;
    const saveOperation = (async () => {
      setIsSaving(true);
      setSyncStatus('saving');

      try {
      const currentVersion = activeProjectVersionRef.current ?? 1;
      const nextVersion = currentVersion + 1;
      const now = new Date().toISOString();

      let savedVersion: number | null = null;
      const { data, error } = await withSupabaseRetry(() =>
        supabase
          .from('business_canvas')
          .update({
            canvas_data: currentWorkspace,
            ...getWorkspaceMetadata(currentWorkspace),
            last_snapshot_at: now,
            updated_at: now,
            row_version: nextVersion,
          })
          .eq('id', currentProjectId)
          .eq('user_id', currentUser.id)
          .eq('row_version', currentVersion)
          .is('deleted_at', null)
          .select('row_version')
          .maybeSingle()
      );

      if (error) throw error;

      savedVersion = data?.row_version ?? null;

      if (!savedVersion) {
        const { data: latestRow, error: latestError } = await supabase
          .from('business_canvas')
          .select('row_version')
          .eq('id', currentProjectId)
          .eq('user_id', currentUser.id)
          .is('deleted_at', null)
          .maybeSingle();

        if (latestError) throw latestError;

        const latestVersion = latestRow?.row_version ?? currentVersion;
        const retryVersion = latestVersion + 1;

        const { data: retryData, error: retryError } = await withSupabaseRetry(() =>
          supabase
            .from('business_canvas')
            .update({
              canvas_data: currentWorkspace,
              ...getWorkspaceMetadata(currentWorkspace),
              last_snapshot_at: now,
              updated_at: now,
              row_version: retryVersion,
            })
            .eq('id', currentProjectId)
            .eq('user_id', currentUser.id)
            .eq('row_version', latestVersion)
            .is('deleted_at', null)
            .select('row_version')
            .maybeSingle()
        );

        if (retryError) throw retryError;
        savedVersion = retryData?.row_version ?? null;

        if (!savedVersion) {
          setSyncStatus('conflict');
          return;
        }
      }

      activeProjectVersionRef.current = savedVersion;

      const shouldSnapshot =
        Date.now() - lastVersionSnapshotAtRef.current >= WORKSPACE_VERSION_SNAPSHOT_MS;

      if (shouldSnapshot) {
        const { error: versionError } = await supabase.from('business_canvas_versions').insert({
          canvas_id: currentProjectId,
          user_id: currentUser.id,
          version: activeProjectVersionRef.current,
          snapshot: currentWorkspace,
        });

        if (!versionError) {
          lastVersionSnapshotAtRef.current = Date.now();
        }
      }

      setLastSyncedAt(Date.now());
      persistedRevisionRef.current = revisionToSave;

      if (workspaceRevisionRef.current === revisionToSave) {
        setSyncStatus('saved');
        clearPendingSync(currentProjectId, currentUser.id);
      } else {
        setSyncStatus('pending');
      }
      sessionStorage.removeItem(getProjectsCacheKey(currentUser.id));
      } catch (err) {
        console.error('Workspace sync failed:', err);
        setSyncStatus('failed');
      } finally {
        setIsSaving(false);
      }
    })();

    syncInFlightPromiseRef.current = saveOperation;
    await saveOperation;

    if (syncInFlightPromiseRef.current === saveOperation) {
      syncInFlightPromiseRef.current = null;
    }

  }, []);

  // Auto-sync to Supabase with a longer debounce. Local storage remains instant.
  useEffect(() => {
    if (!user || !activeProjectId || (syncStatus !== 'pending' && syncStatus !== 'failed')) return;

    const timeout = setTimeout(() => {
      void flushWorkspace();
    }, syncStatus === 'failed' ? 5000 : WORKSPACE_SYNC_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [workspace, user, activeProjectId, syncStatus, flushWorkspace]);

  useEffect(() => {
    const flushOnExit = () => {
      if (syncStatus === 'pending' || syncStatus === 'failed') {
        void flushWorkspace();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushOnExit();
      }
    };

    window.addEventListener('pagehide', flushOnExit);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', flushOnExit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [syncStatus, flushWorkspace]);

  const loadProject = useCallback(async (id: string) => {
    if (!user) return null;
    try {
      if (activeProjectIdRef.current && activeProjectIdRef.current !== id) {
        await flushWorkspace();
        if (workspaceRevisionRef.current !== persistedRevisionRef.current) {
          await flushWorkspace();
        }
      }

      const { data, error } = await withSupabaseRetry(() =>
        supabase
          .from('business_canvas')
          .select('canvas_data, row_version, updated_at')
          .eq('id', id)
          .eq('user_id', user.id) // Verify ownership
          .is('deleted_at', null)
          .maybeSingle()
      );
        
      if (error) throw error;
      if (data && data.canvas_data) {
        const databaseWorkspace = deriveWorkspace({
          ...createInitialWorkspace(planSections),
          ...data.canvas_data as ProjectWorkspace
        });
        const pendingSync = getPendingSync(id, user.id);
        const databaseUpdatedAt = data.updated_at ? Date.parse(data.updated_at) : 0;
        const shouldRecoverPending = Boolean(
          pendingSync
          && pendingSync.value.updatedAt > databaseUpdatedAt
        );
        const loadedWorkspace = shouldRecoverPending
          ? deriveWorkspace({
              ...createInitialWorkspace(planSections),
              ...pendingSync!.value.workspace,
            })
          : databaseWorkspace;

        skipNextAutoSaveRef.current = !shouldRecoverPending;
        workspaceRef.current = loadedWorkspace;
        workspaceRevisionRef.current = shouldRecoverPending ? 1 : 0;
        persistedRevisionRef.current = 0;
        setWorkspaceState(loadedWorkspace);
        setActiveProjectId(id);
        activeProjectVersionRef.current = data.row_version ?? 1;
        lastVersionSnapshotAtRef.current = Date.now();
        setSyncStatus(shouldRecoverPending ? 'pending' : 'saved');
        setLastSyncedAt(databaseUpdatedAt || Date.now());

        if (!shouldRecoverPending) {
          clearPendingSync(id, user.id);
        } else if (pendingSync?.key === LEGACY_WORKSPACE_PENDING_SYNC_KEY) {
          localStorage.setItem(getPendingSyncKey(id), JSON.stringify(pendingSync.value));
          localStorage.removeItem(LEGACY_WORKSPACE_PENDING_SYNC_KEY);
        }

        return loadedWorkspace;
      }
    } catch (err) {
      console.error('Error loading project', err);
    }
    return null;
  }, [flushWorkspace, planSections, user]);

  useEffect(() => {
    const projectId = restoredProjectIdRef.current;
    if (!user || !projectId) return;

    restoredProjectIdRef.current = null;
    void loadProject(projectId);
  }, [loadProject, user]);

  const createProject = useCallback(async (title: string, mode: string) => {
    if (!user) return null;
    try {
      if (activeProjectIdRef.current) {
        await flushWorkspace();
        if (workspaceRevisionRef.current !== persistedRevisionRef.current) {
          await flushWorkspace();
        }
      }

      const initial = createInitialWorkspace(planSections);
      initial.profile.name = title;
      const initialWithMetadata = {
        ...initial,
        feasibilityModelType: mode,
      };

      const plan = getSubscriptionPlan(profile?.subscription_plan);
      if (plan.projectLimit !== null) {
        const { count, error: countError } = await supabase
          .from('business_canvas')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .is('deleted_at', null);

        if (countError) throw countError;

        if ((count ?? 0) >= plan.projectLimit) {
          window.alert(
            `وصلت إلى حد ${plan.name}: ${plan.projectLimitLabel}. يمكنك حذف مشروع قديم أو ترقية الباقة لإنشاء مشروع جديد.`
          );
          return null;
        }
      }
      
      const metadata = getWorkspaceMetadata(initialWithMetadata);
      const { data, error } = await supabase.rpc('create_business_canvas_atomic', {
        p_canvas_data: initialWithMetadata,
        p_project_title: metadata.project_title,
        p_sector_label: metadata.sector_label,
        p_sector_group: metadata.sector_group,
        p_opportunity_title: metadata.opportunity_title,
        p_project_summary: metadata.project_summary,
        p_current_stage: metadata.current_stage,
        p_readiness_score: metadata.readiness_score,
        p_validation_score: metadata.validation_score,
        p_execution_score: metadata.execution_score,
        p_journey_progress: metadata.journey_progress,
      });
        
      if (error) throw error;
      
      const createdProject = Array.isArray(data) ? data[0] : data;
      if (createdProject) {
        const createdWorkspace = deriveWorkspace(initialWithMetadata);
        skipNextAutoSaveRef.current = true;
        workspaceRef.current = createdWorkspace;
        workspaceRevisionRef.current = 0;
        persistedRevisionRef.current = 0;
        setWorkspaceState(createdWorkspace);
        setActiveProjectId(createdProject.id);
        activeProjectVersionRef.current = createdProject.row_version ?? 1;
        lastVersionSnapshotAtRef.current = Date.now();
        setSyncStatus('saved');
        setLastSyncedAt(Date.now());
        clearPendingSync(createdProject.id, user.id);
        sessionStorage.removeItem(getProjectsCacheKey(user.id));
        invalidateProjectCountCache(user.id);
        return createdProject.id;
      }
    } catch (err) {
      console.error('Error creating project', err);
    }
    return null;
  }, [flushWorkspace, planSections, profile?.subscription_plan, user]);

  const clearActiveProject = useCallback((id?: string) => {
    const currentProjectId = activeProjectIdRef.current;
    if (id && currentProjectId !== id) return;

    const currentUser = userRef.current;
    if (currentProjectId && currentUser) {
      clearPendingSync(currentProjectId, currentUser.id);
    }

    const initialWorkspace = deriveWorkspace(createInitialWorkspace(planSections));
    workspaceRef.current = initialWorkspace;
    activeProjectIdRef.current = null;
    restoredProjectIdRef.current = null;
    activeProjectVersionRef.current = null;
    workspaceRevisionRef.current = 0;
    persistedRevisionRef.current = 0;
    skipNextAutoSaveRef.current = true;
    localStorage.removeItem(ACTIVE_PROJECT_STORAGE_KEY);
    setWorkspaceState(initialWorkspace);
    setActiveProjectIdState(null);
    setSyncStatus('idle');
    setLastSyncedAt(null);
  }, [planSections]);

  const updateWorkspace = useCallback((updates: Partial<ProjectWorkspace> | ((current: ProjectWorkspace) => Partial<ProjectWorkspace>)) => {
    setWorkspace((current) => ({
      ...current,
      ...(typeof updates === 'function' ? updates(current) : updates),
    }));
  }, [setWorkspace]);

  const updateProfile = useCallback((updates: Partial<ProjectWorkspace['profile']>) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        profile: { ...current.profile, ...updates },
      })
    );
  }, [setWorkspace]);

  const updateBrand = useCallback((updates: Partial<ProjectWorkspace['brand']>) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        brand: { ...current.brand, ...updates },
      })
    );
  }, [setWorkspace]);

  const setPlanSections = useCallback((sections: PlanSection[]) => {
    setWorkspace((current) => {
      if (current.planSections === sections) return current;
      return deriveWorkspace({ ...current, planSections: sections });
    });
  }, [setWorkspace]);

  const setStage = useCallback((stage: WorkspaceJourneyStage) => {
    setWorkspace((current) => {
      if (current.currentStage === stage) return current;
      return deriveWorkspace({ ...current, currentStage: stage });
    });
  }, [setWorkspace]);

  const toggleWeeklyPriority = useCallback((id: string) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        execution: {
          ...current.execution,
          weeklyPriorities: current.execution.weeklyPriorities.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item
          ),
        },
      })
    );
  }, [setWorkspace]);

  const cycleAutoTaskStatus = useCallback((id: string) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        execution: {
          ...current.execution,
          autoTasks: current.execution.autoTasks.map((task) => {
            if (task.id !== id) return task;
            const nextStatus =
              task.status === 'pending'
                ? 'in_progress'
                : task.status === 'in_progress'
                  ? 'completed'
                  : 'pending';
            return { ...task, status: nextStatus };
          }),
        },
      })
    );
  }, [setWorkspace]);

  const cycleFirstCustomerTaskStatus = useCallback((id: string) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        execution: {
          ...current.execution,
          firstCustomerSprint: current.execution.firstCustomerSprint.map((task) => {
            if (task.id !== id) return task;
            const nextStatus =
              task.status === 'pending'
                ? 'in_progress'
                : task.status === 'in_progress'
                  ? 'completed'
                  : 'pending';
            return { ...task, status: nextStatus };
          }),
        },
      })
    );
  }, [setWorkspace]);

  const toggleChecklistItem = useCallback((groupId: string, itemId: string) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        execution: {
          ...current.execution,
          checklists: current.execution.checklists.map((group) =>
            group.id !== groupId
              ? group
              : {
                  ...group,
                  items: group.items.map((item) =>
                    item.id === itemId ? { ...item, done: !item.done } : item
                  ),
                }
          ),
        },
      })
    );
  }, [setWorkspace]);

  const value = useMemo<ProjectWorkspaceContextValue>(() => ({
    workspace,
    setWorkspace,
    updateWorkspace,
    updateProfile,
    updateBrand,
    setPlanSections,
    setStage,
    toggleWeeklyPriority,
    cycleAutoTaskStatus,
    cycleFirstCustomerTaskStatus,
    toggleChecklistItem,
    loadProject,
    createProject,
    clearActiveProject,
    flushWorkspace,
    isSaving,
    syncStatus,
    lastSyncedAt,
    activeProjectId,
  }), [
    workspace,
    setWorkspace,
    updateWorkspace,
    updateProfile,
    updateBrand,
    setPlanSections,
    setStage,
    toggleWeeklyPriority,
    cycleAutoTaskStatus,
    cycleFirstCustomerTaskStatus,
    toggleChecklistItem,
    loadProject,
    createProject,
    clearActiveProject,
    flushWorkspace,
    isSaving,
    syncStatus,
    lastSyncedAt,
    activeProjectId,
  ]);

  return <ProjectWorkspaceContext.Provider value={value}>{children}</ProjectWorkspaceContext.Provider>;
};

export const useProjectWorkspace = () => {
  const context = useContext(ProjectWorkspaceContext);
  if (!context) {
    throw new Error('useProjectWorkspace must be used within ProjectWorkspaceProvider');
  }
  return context;
};
