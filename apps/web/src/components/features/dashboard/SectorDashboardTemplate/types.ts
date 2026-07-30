import { LucideIcon } from 'lucide-react';

export interface SectorKPI {
  label: string;
  value: string;
  unit?: string;
  icon?: LucideIcon;
}

export interface SectorSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string | React.ReactNode;
  /** 'dark' → dark card, 'light' (default) → white card */
  variant?: 'dark' | 'light';
  dark?: boolean;
  /** Highlight color for left-bar accent (e.g. '#10b981') — overrides accent prop */
  accentColor?: string;
}

export interface SectorMarket {
  label: string;
  country: string;
  note: string;
  icon?: LucideIcon;
}

export interface SectorLeader {
  name: string;
  country?: string;
  note?: string;
}

export interface BusinessOpportunity {
  id: string;
  title: string;
  description?: string;
  examples: string[];
  note?: string;
  icon?: LucideIcon;
}

export interface SectorDashboardProps {
  title: string;
  titleEn?: string;
  subtitle: string;
  icon: LucideIcon;
  /** Tailwind color name: 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'cyan' … */
  accent: string;
  /** Exact hex for accent — used for CSS custom properties */
  accentHex?: string;
  pdfLabel?: string;
  kpis: SectorKPI[];
  sections: SectorSection[];
  leaders?: SectorLeader[];
  definition?: string;
  industryInsights?: string[];
  tags?: string[];
  topMarkets?: SectorMarket[];
  businessOpportunities?: BusinessOpportunity[];
  swotAnalysis?: SwotAnalysis;
  onBack?: () => void;
  onBuildPlan?: (projectName?: string) => void;
  parentCategory?: string;
  sectorId?: string; // New: To link with central registry
  navItems?: any[];
}

export interface SwotAnalysis {
  description: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
  insight: string;
}

export interface SwotItem {
  text: string;
  textEn?: string;
}
