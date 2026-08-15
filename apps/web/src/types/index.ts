
// ─────────────────────────────────────────────
// Company Profile Types (new UI)
// ─────────────────────────────────────────────

export interface FundingRound {
  id: string;
  announcedDate: string;
  transactionName: string;
  investorsCount: number;
  moneyRaised: string;
  leadInvestor: string;
  fundingType: string;
}

export interface Investment {
  id: string;
  announcedDate: string;
  orgName: string;
  isLead: boolean;
  fundingRound: string;
  moneyRaised: string;
}

export interface KeyPerson {
  id: string;
  name: string;
  title: string;
  linkedIn?: string;
}

export interface SubOrganization {
  id: string;
  name: string;
  type: string;
}

export interface SimilarCompany {
  id: string;
  name: string;
  hqLocation: string;
  similarityScore: string;
  marketCapOrValuation: string;
  keyAdvantage: string;
  status: string;
}

export interface RelatedSector {
  id: string;
  sectorName: string;
  marketSize: string;
  growthRateMom: string;
  relevanceLevel: string;
  keyTrends: string[];
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TechSolutionDetails {
  architectureOverview: string;
  infrastructureType: string;
  keyFeatures: string[];
}

export interface ExpansionStrategy {
  targetMarkets: string[];
  growthChannels: string[];
  strategicMilestones: { year: string; title: string; description: string }[];
}

export interface FounderStory {
  founderName: string;
  background: string;
  vision: string;
}

export interface LessonAndEvidence {
  lessonsLearned: string[];
  verifiedDocuments: { title: string; issuer: string; date: string; verifyCode: string }[];
}

export interface IdealCustomerPersona {
  personaTitle?: string;
  customerSegment?: string;
  customerProfile?: string;
  archetypeRole?: string;
  painPoints?: string[];
  keyMotivations?: string[];
  buyingBehavior?: string;
  buyingTriggers?: string;
  decisionCriteria?: string[];
  economicValueLtv?: string;
  valueAlignment?: string;
}

export interface TargetAudienceProfile {
  idealCustomerPersonas: IdealCustomerPersona[];
}

export interface Company {
  id: string;
  name: string;
  permalink: string;
  shortDescription: string;
  aboutDescription: string;
  logoUrl: string;
  revenueModel: string;
  marketPosition: string;
  topCompetitors: string[];
  competitiveAdvantage: string;
  foundedDate: string;
  ipoStatus: string;
  fundingStatus: string;
  hqLocation: string;
  employeeRange: string;
  website: string;
  websiteUrl?: string;
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  categories: string[];
  totalFundingAmount: string;
  fundingRoundsCount: number;
  legalName: string;
  alsoKnownAs: string;
  operatingStatus: string;
  exitsCount: number;
  stockSymbol: string;
  companyType: string;
  founders: string[];
  phoneNumber: string;
  contactEmail: string;
  monthlyWebVisits: string;
  visitsMomChange: string;
  itSpend: string;
  activeTechProductsCount: number;
  sampleTechs: string[];
  patentsCount: number;
  trademarksCount: number;
  fundingRounds: FundingRound[];
  investments: Investment[];
  keyPeople: KeyPerson[];
  subOrganizations: SubOrganization[];
  swotAnalysis?: SwotAnalysis;
  techSolutionDetails?: TechSolutionDetails;
  expansionStrategy?: ExpansionStrategy;
  founderStory?: FounderStory;
  lessonAndEvidence?: LessonAndEvidence;
  similarCompaniesList?: SimilarCompany[];
  relatedSectorsList?: RelatedSector[];
  targetAudienceProfile?: TargetAudienceProfile;
}

// ─────────────────────────────────────────────

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

export interface WorkspaceFinancialEstimate {
  id: string;
  modelType: 'saas' | 'sales';
  modelTitle: string;
  mrr: number;
  arr: number;
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  paybackMonths: number;
  monthlyExpense: number;
  annualOpEx: number;
  netProfitAnnual: number;
  netMargin: number;
  feasibilityGrade: string;
  savedAt: string;
  notes?: string;
}

export interface ProjectWorkspace {
  id: string;
  updatedAt: string;
  feasibilityModelType?: string;
  feasibilityModels?: Record<string, Record<string, unknown>>;
  currentStage: WorkspaceJourneyStage;
  profile: WorkspaceProjectProfile;
  assumptions: string[];
  risks: string[];
  planSections: PlanSection[];
  brand: WorkspaceBrandProfile;
  decision: WorkspaceDecisionState;
  execution: WorkspaceExecutionState;
  financialEstimates?: WorkspaceFinancialEstimate[];
  metrics: WorkspaceMetrics;
  recommendations: WorkspaceRecommendation[];
}
