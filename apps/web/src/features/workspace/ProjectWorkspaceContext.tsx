import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PlanSection, ProjectWorkspace, WorkspaceJourneyStage } from '../../types';
import { WORKSPACE_STORAGE_KEY, createInitialWorkspace, deriveWorkspace } from './workspaceUtils';
import { getWorkspaceMetadata } from './workspacePersistence';
import { supabase } from '@/lib/supabase';
import { withSupabaseRetry } from '@/lib/supabaseRetry';
import { useAuth } from '@/features/auth/AuthContext';

interface ProjectWorkspaceContextValue {
  workspace: ProjectWorkspace;
  setWorkspace: React.Dispatch<React.SetStateAction<ProjectWorkspace>>;
  updateWorkspace: (updates: Partial<ProjectWorkspace>) => void;
  updateProfile: (updates: Partial<ProjectWorkspace['profile']>) => void;
  updateBrand: (updates: Partial<ProjectWorkspace['brand']>) => void;
  setPlanSections: (sections: PlanSection[]) => void;
  setStage: (stage: WorkspaceJourneyStage) => void;
  toggleWeeklyPriority: (id: string) => void;
  cycleAutoTaskStatus: (id: string) => void;
  cycleFirstCustomerTaskStatus: (id: string) => void;
  toggleChecklistItem: (groupId: string, itemId: string) => void;
  loadProject: (id: string) => Promise<void>;
  createProject: (title: string, mode: string) => Promise<string | null>;
  flushWorkspace: () => Promise<void>;
  isSaving: boolean;
  syncStatus: WorkspaceSyncStatus;
  lastSyncedAt: number | null;
  activeProjectId: string | null;
}

const ProjectWorkspaceContext = createContext<ProjectWorkspaceContextValue | null>(null);

type WorkspaceSyncStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'failed' | 'conflict';

const WORKSPACE_SYNC_DEBOUNCE_MS = 45 * 1000;
const WORKSPACE_PENDING_SYNC_KEY = 'khotta_workspace_pending_sync_v1';
const WORKSPACE_VERSION_SNAPSHOT_MS = 15 * 60 * 1000;

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
  const { user } = useAuth();
  const userRef = useRef(user);
  const activeProjectIdRef = useRef<string | null>(null);
  const workspaceRef = useRef<ProjectWorkspace | null>(null);
  const syncInFlightRef = useRef(false);
  const skipNextAutoSaveRef = useRef(true);
  const activeProjectVersionRef = useRef<number | null>(null);
  const lastVersionSnapshotAtRef = useRef<number>(0);
  const [activeProjectId, setActiveProjectIdState] = useState<string | null>(() => {
    // Restore active project from localStorage across page refreshes
    return localStorage.getItem('khotta_active_project_id') ?? null;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [syncStatus, setSyncStatus] = useState<WorkspaceSyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [workspace, setWorkspace] = useState<ProjectWorkspace>(() => loadWorkspace(planSections));

  const setActiveProjectId = (id: string | null) => {
    setActiveProjectIdState(id);
    if (id) {
      localStorage.setItem('khotta_active_project_id', id);
    } else {
      localStorage.removeItem('khotta_active_project_id');
    }
  };

  useEffect(() => {
    setWorkspace((current) => {
      if (current.planSections === planSections) return current;
      return deriveWorkspace({ ...current, planSections });
    });
  }, [planSections]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    workspaceRef.current = workspace;
  }, [workspace]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
    if (!user || !activeProjectId) return;

    localStorage.setItem(
      WORKSPACE_PENDING_SYNC_KEY,
      JSON.stringify({
        projectId: activeProjectId,
        userId: user.id,
        workspace,
        updatedAt: Date.now(),
        status: 'pending_sync',
      }),
    );

    if (skipNextAutoSaveRef.current) {
      skipNextAutoSaveRef.current = false;
      return;
    }

    setSyncStatus((current) => (current === 'saving' ? current : 'pending'));
  }, [workspace, user, activeProjectId]);

  const flushWorkspace = useCallback(async () => {
    const currentUser = userRef.current;
    const currentProjectId = activeProjectIdRef.current;
    const currentWorkspace = workspaceRef.current;

    if (!currentUser || !currentProjectId || !currentWorkspace || syncInFlightRef.current) return;

    syncInFlightRef.current = true;
    setIsSaving(true);
    setSyncStatus('saving');

    try {
      const currentVersion = activeProjectVersionRef.current ?? 1;
      const nextVersion = currentVersion + 1;
      const now = new Date().toISOString();

      const { data, error } = await withSupabaseRetry(() =>
        supabase
          .from('business_canvas')
          .update({
            canvas_data: currentWorkspace,
            ...getWorkspaceMetadata(currentWorkspace),
            last_snapshot_at: now,
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

      if (!data) {
        throw new Error('WORKSPACE_CONFLICT');
      }

      activeProjectVersionRef.current = data.row_version ?? nextVersion;

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
      setSyncStatus('saved');
      localStorage.removeItem(WORKSPACE_PENDING_SYNC_KEY);
    } catch (err) {
      console.error('Workspace sync failed:', err);
      setSyncStatus(err instanceof Error && err.message === 'WORKSPACE_CONFLICT' ? 'conflict' : 'failed');
    } finally {
      syncInFlightRef.current = false;
      setIsSaving(false);
    }
  }, []);

  // Auto-sync to Supabase with a longer debounce. Local storage remains instant.
  useEffect(() => {
    if (!user || !activeProjectId || syncStatus !== 'pending') return;

    const timeout = setTimeout(() => {
      void flushWorkspace();
    }, WORKSPACE_SYNC_DEBOUNCE_MS);

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

  const loadProject = async (id: string) => {
    if (!user) return;
    try {
      const { data, error } = await withSupabaseRetry(() =>
        supabase
          .from('business_canvas')
          .select('canvas_data, row_version')
          .eq('id', id)
          .eq('user_id', user.id) // Verify ownership
          .is('deleted_at', null)
          .maybeSingle()
      );
        
      if (error) throw error;
      if (data && data.canvas_data) {
        skipNextAutoSaveRef.current = true;
        setWorkspace(deriveWorkspace({
          ...createInitialWorkspace(planSections),
          ...data.canvas_data as ProjectWorkspace
        }));
        setActiveProjectId(id);
        activeProjectVersionRef.current = data.row_version ?? 1;
        lastVersionSnapshotAtRef.current = Date.now();
        setSyncStatus('saved');
        setLastSyncedAt(Date.now());
        localStorage.removeItem(WORKSPACE_PENDING_SYNC_KEY);
      }
    } catch (err) {
      console.error('Error loading project', err);
    }
  };

  const createProject = async (title: string, mode: string) => {
    if (!user) return null;
    try {
      const initial = createInitialWorkspace(planSections);
      initial.profile.name = title;
      // You can store mode inside profile or elsewhere if needed
      
      const { data, error } = await supabase
        .from('business_canvas')
        .insert([{
          user_id: user.id,
          canvas_data: initial,
          ...getWorkspaceMetadata(initial),
        }])
        .select('id, row_version')
        .single();
        
      if (error) throw error;
      
      if (data) {
        skipNextAutoSaveRef.current = true;
        setWorkspace(deriveWorkspace(initial));
        setActiveProjectId(data.id);
        activeProjectVersionRef.current = data.row_version ?? 1;
        lastVersionSnapshotAtRef.current = Date.now();
        setSyncStatus('saved');
        setLastSyncedAt(Date.now());
        localStorage.removeItem(WORKSPACE_PENDING_SYNC_KEY);
        return data.id;
      }
    } catch (err) {
      console.error('Error creating project', err);
    }
    return null;
  };

  const updateWorkspace = useCallback((updates: Partial<ProjectWorkspace>) => {
    setWorkspace((current) => deriveWorkspace({ ...current, ...updates }));
  }, []);

  const updateProfile = useCallback((updates: Partial<ProjectWorkspace['profile']>) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        profile: { ...current.profile, ...updates },
      })
    );
  }, []);

  const updateBrand = useCallback((updates: Partial<ProjectWorkspace['brand']>) => {
    setWorkspace((current) =>
      deriveWorkspace({
        ...current,
        brand: { ...current.brand, ...updates },
      })
    );
  }, []);

  const setPlanSections = useCallback((sections: PlanSection[]) => {
    setWorkspace((current) => {
      if (current.planSections === sections) return current;
      return deriveWorkspace({ ...current, planSections: sections });
    });
  }, []);

  const setStage = useCallback((stage: WorkspaceJourneyStage) => {
    setWorkspace((current) => {
      if (current.currentStage === stage) return current;
      return deriveWorkspace({ ...current, currentStage: stage });
    });
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
    flushWorkspace,
    isSaving,
    syncStatus,
    lastSyncedAt,
    activeProjectId,
  }), [
    workspace,
    updateWorkspace,
    updateProfile,
    updateBrand,
    setPlanSections,
    setStage,
    toggleWeeklyPriority,
    cycleAutoTaskStatus,
    cycleFirstCustomerTaskStatus,
    toggleChecklistItem,
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
