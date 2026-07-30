
export interface PlanSection {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  lastEdited?: string;
  editedBy?: string;
  progress: number; // 0 to 100
  aiScore?: number; // 0 to 100
  humanScore?: number; // 0 to 100
}

export interface BusinessModelItem {
  id: string;
  category: 'users' | 'partners' | 'value' | 'cost' | 'revenue';
  title: string;
  content: string;
  icon?: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  credits: number;
  totalCredits: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'ai' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  relatedPlan: string;
  assignedBy: string;
  dueDate: string;
  timestamp: string;
}

export type WorkspaceJourneyStage =
  | 'discovery'
  | 'analysis'
  | 'decision'
  | 'planning'
  | 'execution';

export type WorkspaceDecisionStatus =
  | 'continue'
  | 'validate'
  | 'delay'
  | 'pivot';

export interface WorkspaceRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  targetTab: string;
  priority: 'high' | 'medium' | 'low';
}

export interface WorkspaceWeeklyPriority {
  id: string;
  title: string;
  owner: string;
  done: boolean;
}

export interface WorkspaceExecutionTask {
  id: string;
  title: string;
  description: string;
  owner: string;
  dueWindow: 'day-7' | 'day-30' | 'day-60' | 'day-90';
  status: 'pending' | 'in_progress' | 'completed';
  category: 'legal' | 'finance' | 'marketing' | 'product' | 'sales';
  priority: 'high' | 'medium' | 'low';
}

export interface WorkspaceChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface WorkspaceChecklistGroup {
  id: 'legal' | 'finance' | 'marketing' | 'product' | 'sales';
  label: string;
  items: WorkspaceChecklistItem[];
}

export interface WorkspacePhasePlan {
  id: '30' | '60' | '90';
  label: string;
  focus: string;
  outcomes: string[];
}

export interface WorkspaceKpi {
  id: string;
  label: string;
  value: string;
  target: string;
  insight: string;
}

export interface WorkspaceProjectProfile {
  name: string;
  sectorId: string | null;
  sectorLabel: string | null;
  sectorGroup: string | null;
  countryId: string | null;
  countryLabel: string | null;
  customerType: string | null;
  opportunityTitle: string | null;
  opportunitySummary: string | null;
}

export interface WorkspaceBrandProfile {
  prompt: string;
  personality: string | null;
  palette: string | null;
}

export interface WorkspaceDecisionState {
  status: WorkspaceDecisionStatus;
  confidence: number;
  rationale: string;
}

export interface WorkspaceExecutionState {
  weeklyPriorities: WorkspaceWeeklyPriority[];
  bottlenecks: string[];
  phasePlan: WorkspacePhasePlan[];
  autoTasks: WorkspaceExecutionTask[];
  checklists: WorkspaceChecklistGroup[];
  firstCustomerSprint: WorkspaceExecutionTask[];
  kpis: WorkspaceKpi[];
}

export interface WorkspaceMetrics {
  journeyProgress: number;
  readinessScore: number;
  validationScore: number;
  executionScore: number;
}

export interface ProjectWorkspace {
  id: string;
  updatedAt: string;
  currentStage: WorkspaceJourneyStage;
  profile: WorkspaceProjectProfile;
  assumptions: string[];
  risks: string[];
  planSections: PlanSection[];
  brand: WorkspaceBrandProfile;
  decision: WorkspaceDecisionState;
  execution: WorkspaceExecutionState;
  metrics: WorkspaceMetrics;
  recommendations: WorkspaceRecommendation[];
}
