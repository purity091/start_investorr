export interface Opportunity {
  type: string;
  name: string;
  model: string;
}

export interface Problem {
  id: string;
  title: string;
  desc: string;
  pain: number;
  money: number;
  freq: number;
  gap: number;
  opps: Opportunity[];
  countries: any[]; 
  budget: 'low' | 'medium' | 'high';
  b2x: 'B2B' | 'B2C' | 'B2G' | 'B2B2C';
  sectorId?: string;
  subSectorId?: string;
  subSectorName?: string;
  sectorName?: string;
  globalResolution?: {
    caseStudy: string;
    historicalContext: string; 
    sufferingCountries: string[]; 
    successCountries: { name: string; flag: string; reason: string }[]; 
    resolutionSteps: string[];
    successConditions: string[];
    currentManagementModel: string; 
    localApplication: {
      strategy: string;
      phases: string[];
    };
  };
  // New dynamic fields for full JSON-driven UI
  roadmap?: {
    title?: string;
    subtitle?: string;
    phases: {
      title: string;
      description: string;
      icon: string;
      color_theme?: string;
    }[];
  };
  whyNotSolved?: string[];
  techStack?: string[];
  mainRisk?: string;
}

export interface SubSector {
  id: string;
  name: string;
  count: number;
  problems: Problem[];
}

export interface Sector {
  id: string;
  icon: any;
  name: string;
  count: number;
  color: string;
  subs: SubSector[];
}
