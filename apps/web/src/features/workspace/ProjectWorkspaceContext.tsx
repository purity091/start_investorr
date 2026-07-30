import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlanSection, ProjectWorkspace, WorkspaceJourneyStage } from '../../types';
import { WORKSPACE_STORAGE_KEY, createInitialWorkspace, deriveWorkspace } from './workspaceUtils';
import { supabase } from '@/lib/supabase';
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
  isSaving: boolean;
  activeProjectId: string | null;
}

const ProjectWorkspaceContext = createContext<ProjectWorkspaceContextValue | null>(null);

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
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [workspace, setWorkspace] = useState<ProjectWorkspace>(() => loadWorkspace(planSections));

  useEffect(() => {
    setWorkspace((current) => {
      if (current.planSections === planSections) return current;
      return deriveWorkspace({ ...current, planSections });
    });
  }, [planSections]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  // Auto-sync to Supabase with debounce
  useEffect(() => {
    if (!user || !activeProjectId) return;
    
    const timeout = setTimeout(async () => {
      setIsSaving(true);
      try {
        await supabase
          .from('business_canvas')
          .update({ 
            canvas_data: workspace,
            project_title: workspace.profile.name || 'مشروع بدون اسم'
          })
          .eq('id', activeProjectId);
      } catch (err) {
        console.error('Error saving to supabase', err);
      } finally {
        setIsSaving(false);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [workspace, user, activeProjectId]);

  const loadProject = async (id: string) => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('business_canvas')
        .select('canvas_data')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      if (data && data.canvas_data) {
        setWorkspace(deriveWorkspace({
          ...createInitialWorkspace(planSections),
          ...data.canvas_data as ProjectWorkspace
        }));
        setActiveProjectId(id);
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
          project_title: title,
          canvas_data: initial
        }])
        .select('id')
        .single();
        
      if (error) throw error;
      
      if (data) {
        setWorkspace(deriveWorkspace(initial));
        setActiveProjectId(data.id);
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
    isSaving,
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
    isSaving,
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
