import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlanSection, ProjectWorkspace, WorkspaceJourneyStage } from '../../types';
import { WORKSPACE_STORAGE_KEY, createInitialWorkspace, deriveWorkspace } from './workspaceUtils';

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
  const [workspace, setWorkspace] = useState<ProjectWorkspace>(() => loadWorkspace(planSections));

  useEffect(() => {
    setWorkspace((current) => {
      if (current.planSections === planSections) return current;
      return deriveWorkspace({ ...current, planSections });
    });
  }, [planSections]);

  useEffect(() => {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

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
