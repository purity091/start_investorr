import { ProjectWorkspace } from '../../types';

const clampScore = (value: unknown) => {
  const score = typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 0;
  return Math.max(0, Math.min(100, score));
};

export function getWorkspaceMetadata(workspace: ProjectWorkspace) {
  return {
    project_title: workspace.profile.name || 'مشروع بدون اسم',
    sector_label: workspace.profile.sectorLabel || null,
    sector_group: workspace.profile.sectorGroup || null,
    opportunity_title: workspace.profile.opportunityTitle || null,
    project_summary: workspace.profile.opportunitySummary || null,
    current_stage: workspace.currentStage || 'discovery',
    readiness_score: clampScore(workspace.metrics.readinessScore),
    validation_score: clampScore(workspace.metrics.validationScore),
    execution_score: clampScore(workspace.metrics.executionScore),
    journey_progress: clampScore(workspace.metrics.journeyProgress),
    schema_version: 1,
  };
}
