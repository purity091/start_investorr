
export interface MarketingKPI {
  label: string;
  value: string;
  trend?: string;
}

export interface BudgetShare {
  year: number;
  value: number;
}

export interface BudgetDistribution {
  year: number;
  paidMedia: number;
  martech: number;
  labor: number;
  agencies: number;
}

export interface AIAdoption {
  function: string;
  adoption: number;
}

export interface AgencyRevenue {
  agency: string;
  revenue2020: number;
  revenue2021: number;
  revenue2022: number;
  revenue2023: number;
  revenue2024: number;
}

const MOCK_KPIS: MarketingKPI[] = [
  { label: 'حجم سوق العلاقات العامة عالمياً', value: '107 مليار دولار' },
  { label: 'حجم سوق التسويق عبر المؤثرين', value: '16.4 مليار دولار' },
  { label: 'إجمالي الإنفاق التسويقي العالمي', value: '897.7 مليار دولار' },
];

const MOCK_BUDGET_SHARE: BudgetShare[] = [
  { year: 2014, value: 10.9 },
  { year: 2015, value: 11.0 },
  { year: 2016, value: 12.1 },
  { year: 2017, value: 11.3 },
  { year: 2018, value: 11.2 },
  { year: 2019, value: 10.5 },
  { year: 2020, value: 11.0 },
  { year: 2021, value: 6.4 },
  { year: 2022, value: 9.5 },
  { year: 2023, value: 9.1 },
  { year: 2024, value: 7.7 },
];

const MOCK_DISTRIBUTION: BudgetDistribution[] = [
  { year: 2017, paidMedia: 25, martech: 22, labor: 28, agencies: 25 },
  { year: 2018, paidMedia: 23, martech: 29, labor: 24, agencies: 24 },
  { year: 2019, paidMedia: 26, martech: 26, labor: 25, agencies: 23 },
  { year: 2020, paidMedia: 22, martech: 26, labor: 25, agencies: 27 },
  { year: 2021, paidMedia: 27, martech: 26, labor: 25, agencies: 22 },
  { year: 2022, paidMedia: 26, martech: 25, labor: 25, agencies: 24 },
  { year: 2023, paidMedia: 25, martech: 25, labor: 25, agencies: 25 },
  { year: 2024, paidMedia: 28, martech: 24, labor: 25, agencies: 23 },
];

const MOCK_AI_ADOPTION: AIAdoption[] = [
  { function: 'تخصيص المحتوى', adoption: 25 },
  { function: 'تحليل البيانات', adoption: 42 },
  { function: 'أتمتة المهام', adoption: 35 },
  { function: 'دعم العملاء', adoption: 18 },
  { function: 'الإنشاء الإبداعي', adoption: 31 },
];

const MOCK_AGENCIES_REVENUE: AgencyRevenue[] = [
  { agency: 'WPP', revenue2020: 15.4, revenue2021: 16.9, revenue2022: 17.8, revenue2023: 18.2, revenue2024: 18.5 },
  { agency: 'Omnicom', revenue2020: 13.2, revenue2021: 14.5, revenue2022: 15.1, revenue2023: 15.5, revenue2024: 15.8 },
  { agency: 'Publicis', revenue2020: 10.8, revenue2021: 11.7, revenue2022: 12.8, revenue2023: 13.2, revenue2024: 13.5 },
  { agency: 'Interpublic', revenue2020: 8.5, revenue2021: 9.1, revenue2022: 9.8, revenue2023: 10.1, revenue2024: 10.4 },
  { agency: 'Dentsu', revenue2020: 7.2, revenue2021: 7.8, revenue2022: 8.5, revenue2023: 8.8, revenue2024: 9.1 },
];

export const marketingService = {
  fetchKPIs: async (): Promise<MarketingKPI[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_KPIS), 800));
  },
  fetchBudgetShare: async (): Promise<BudgetShare[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_BUDGET_SHARE), 800));
  },
  fetchDistribution: async (): Promise<BudgetDistribution[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DISTRIBUTION), 1000));
  },
  fetchAIAdoption: async (): Promise<AIAdoption[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_AI_ADOPTION), 900));
  },
  fetchAgenciesRevenue: async (): Promise<AgencyRevenue[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_AGENCIES_REVENUE), 700));
  }
};
