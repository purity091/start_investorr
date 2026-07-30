import React from 'react';

export type TaskId =
  | 'target'
  | 'market_size'
  | 'audience'
  | 'solution'
  | 'advantage'
  | 'competitors'
  | 'arsenal'
  | 'features'
  | 'prototype_plan'
  | 'revenue'
  | 'costs'
  | 'projections'
  | 'marketing'
  | 'metrics'
  | 'branding'
  | 'risk'
  | 'legal'
  | 'team_governance'
  | 'brief'
  | 'pitch_deck'
  | 'dossier';

export interface HackathonState {
  hasStarted: boolean;
  pledged: boolean;
  startTime: number | null;
  currentStage: number;
  taskStatus: Record<TaskId, boolean>;
  answers: Record<string, any>;
  selectedOpportunityId: string;
  intensityScore: number;
  lastActivity: number;
  accomplished: boolean;
  registrationData?: {
    industries: string[];
    domains: string[];
    mobile: string;
    jobRole: string;
    country: string;
  };
  scenario: ScenarioState;
}

export interface ScenarioState {
  marketingSpend: number;
  pricingStrategy: 'low' | 'premium' | 'freemium';
  teamFocus: 'product' | 'growth' | 'ops';
  churn?: number;
  timeToRevenue?: number;
  cac?: number;
}

export interface Opportunity {
  id: string;
  title: string;
  desc: string;
  pain: number;
  sector: string;
}

export interface ReadinessBreakdown {
  marketClarity: number;
  financialStrength: number;
  executionQuality: number;
  riskControl: number;
  overall: number;
  reasons: string[];
}

export interface SimulationResult {
  sustainability: number;
  successChance: number;
  runwayStress: number;
  ltvEstimate: number;
  verdict: 'stable' | 'watch' | 'critical';
}

export interface ExecutionMilestone {
  week: number;
  title: string;
  owner: string;
  status: 'focus' | 'at-risk' | 'stable';
  kpi: string;
}

export interface ExecutionKPI {
  label: string;
  current: string;
  target: string;
}

export interface PriorityAlert {
  level: 'high' | 'medium';
  title: string;
  detail: string;
}

export interface ParticipantScore {
  idea: number;
  success: number;
  accuracy: number;
}

export type ParticipantStatus = 'active' | 'at-risk' | 'blocked';
export type ScoreMetric = keyof ParticipantScore;

export interface ParticipantRecord {
  id: string;
  name: string;
  project: string;
  avatar: string;
  group: string;
  lastSeen: string;
  status: ParticipantStatus;
  taskStatus: Record<TaskId, boolean>;
  score: ParticipantScore;
  adminFlags: string[];
}

export interface SprintTask {
  id: TaskId;
  title: string;
  detail: string;
  placeholder: string;
  icon: any;
  type?: 'text' | 'swot' | 'list' | 'financial' | 'table';
}

export interface SprintDay {
  day: number;
  title: string;
  codename: string;
  accent: string;
  tasks: SprintTask[];
}
