
export type QuestionType = 'cards' | 'list' | 'textarea_choice' | 'profile_builder' | 'resources_check' | 'competition_map' | 'validation_scale' | 'goal_matrix' | 'fear_select' | 'empathy_map' | 'cross_sector';

export interface QuestionOption {
  val: string;
  icon?: string;
  title?: string;
  desc?: string;
  label?: string;
  score?: number;
}

export interface Question {
  id: string;
  step: number;
  icon: string;
  label: string;
  sublabel: string;
  type: QuestionType;
  placeholder?: string;
  options?: QuestionOption[];
  profiles?: any[];
  items?: any[];
  goals?: any[];
  followup?: {
    label: string;
    options: string[];
  };
  multi?: boolean;
}

export interface AiAnalysisResult {
  score: number;
  scoreBreakdown: {
    idea: number;
    market: number;
    resources: number;
    execution: number;
  };
  radarData: {
    tech: number;
    market: number;
    team: number;
    financial: number;
    operations: number;
  };
  verdict: string;
  verdictType: 'green' | 'yellow' | 'red';
  executiveSummary: string;
  hybridInnovation?: {
     suggestedModel: string;
     whyItWorks: string;
     blueOceanOpportunity: string;
  };
  behavioralPersona: {
    psychographics: string;
    jobsToBeDone: string;
    empathyMap: {
       sees: string;
       hears: string;
       feels: string;
       pains: string;
    };
    toneOfVoice: string;
  };
  marketSize: {
    tam: string;
    sam: string;
    som: string;
    source: string;
  };
  competitiveIntelligence: {
     fundingInsights: string;
     competitorWeakness: string;
     marketSignals: string;
  };
  timeToRevenue: string;
  breakEvenMonths: number;
  opportunityCost: {
     buildVsBuy: string;
     calculatedLoss: string;
     strategicAdvice: string;
  };
  sensitivityAnalysis: {
     cacImpact: string;
     churnImpact: string;
     baseCac: number;
     baseChurn: number;
  };
  financials: {
    monthlyFixed: string;
    monthlyVariable: string;
    cac: string;
    ltv: string;
    ltvCacRatio: string;
    runway: string;
  };
  ganttTasks: Array<{
     id: string;
     task: string;
     startDay: number;
     duration: number;
     dependencies?: string[];
     isCritical: boolean;
  }>;
  criticalObstacles: Array<{
    title: string;
    detail: string;
    severity: 'critical' | 'high' | 'medium';
    timeframe: string;
  }>;
  actionPlan: {
    week1: ActionItem[];
    month1: ActionItem[];
    month3: ActionItem[];
    month6: ActionItem[];
  };
  risks: Array<{
    title: string;
    probability: 'high' | 'medium' | 'low';
    impact: 'high' | 'medium' | 'low';
    mitigation: string;
    earlySignal: string;
    planB: string;
    killSwitch: string;
  }>;
  activationPlan: {
     notionExportUrl?: string;
     trelloExportUrl?: string;
  };
  validationPlan: {
    nextStep: string;
    successMetric: string;
    timeboxDays: number;
    budget: string;
  };
  resources: Array<{
    title: string;
    type: 'أداة' | 'مقال' | 'كورس' | 'مجتمع' | 'كتاب';
    platform: string;
    why: string;
    cost: string;
    urgency: 'فوري' | 'مهم' | 'اختياري';
  }>;
  keyMetrics: Array<{
    metric: string;
    target: string;
    how: string;
    frequency: 'يومي' | 'أسبوعي' | 'شهري';
  }>;
  pivotSignals: string[];
  successStory: string;
  failureLesson: string;
  aiInsight: string;
}

export interface ActionItem {
  action: string;
  why: string;
  howExactly: string;
}
