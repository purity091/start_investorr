
export interface AdSpendGrowth {
  region: string;
  growth: number;
}

export interface GrowthYearly {
  year: number;
  value: number;
}

export interface DigitalAdSpend {
  year: number;
  search: number;
  video: number;
  banner: number;
  influencer: number;
  social: number;
  other: number;
}

export interface RetailMediaSpend {
  year: number;
  spend: number;
}

export interface AgencyBillings {
  year: number;
  billings: number;
}

const MOCK_GROWTH_REGION: AdSpendGrowth[] = [
  { region: 'أمريكا الشمالية', growth: 5 },
  { region: 'أوروبا الغربية', growth: 4.5 },
  { region: 'أمريكا اللاتينية', growth: 9 },
  { region: 'الشرق الأوسط وشمال أفريقيا', growth: 9.2 },
  { region: 'آسيا والمحيط الهادئ', growth: 7.5 },
];

const MOCK_GROWTH_YEARLY: GrowthYearly[] = [
  { year: 2020, value: -3.5 },
  { year: 2021, value: 15.6 },
  { year: 2022, value: 5.2 },
  { year: 2023, value: 4.8 },
  { year: 2024, value: 8.52 },
  { year: 2025, value: 7.4 },
  { year: 2026, value: 6.8 },
  { year: 2027, value: 6.2 },
  { year: 2028, value: 5.9 },
];

const MOCK_DIGITAL_SPEND: DigitalAdSpend[] = [
  { year: 2018, search: 110, video: 35, banner: 45, influencer: 10, social: 60, other: 68 },
  { year: 2019, search: 125, video: 42, banner: 48, influencer: 15, social: 75, other: 86 },
  { year: 2020, search: 115, video: 50, banner: 40, influencer: 20, social: 85, other: 151 },
  { year: 2021, search: 155, video: 65, banner: 55, influencer: 30, social: 110, other: 185 },
  { year: 2022, search: 180, video: 80, banner: 60, influencer: 45, social: 135, other: 148 },
  { year: 2023, search: 210, video: 95, banner: 65, influencer: 60, social: 160, other: 129 },
  { year: 2024, search: 235, video: 115, banner: 70, influencer: 80, social: 190, other: 110 },
  { year: 2025, search: 260, video: 135, banner: 75, influencer: 105, social: 220, other: 82 },
  { year: 2026, search: 285, video: 155, banner: 80, influencer: 130, social: 250, other: 56 },
  { year: 2027, search: 310, video: 175, banner: 85, influencer: 155, social: 280, other: 33 },
  { year: 2028, search: 335, video: 195, banner: 90, influencer: 180, social: 310, other: 12 },
  { year: 2029, search: 360, video: 215, banner: 95, influencer: 205, social: 340, other: 0 },
  { year: 2030, search: 385, video: 235, banner: 100, influencer: 230, social: 370, other: 0 },
];

const MOCK_RETAIL_MEDIA: RetailMediaSpend[] = [
  { year: 2018, spend: 35 },
  { year: 2019, spend: 45 },
  { year: 2020, spend: 60 },
  { year: 2021, spend: 85 },
  { year: 2022, spend: 110 },
  { year: 2023, spend: 135 },
  { year: 2024, spend: 136.07 },
  { year: 2025, spend: 185 },
  { year: 2026, spend: 205 },
  { year: 2027, spend: 225 },
  { year: 2028, spend: 245 },
];

const MOCK_WPP_BILLINGS: AgencyBillings[] = [
  { year: 2010, billings: 42 },
  { year: 2011, billings: 43.5 },
  { year: 2012, billings: 44.41 },
  { year: 2013, billings: 45.2 },
  { year: 2014, billings: 46 },
  { year: 2015, billings: 48 },
  { year: 2016, billings: 50 },
  { year: 2017, billings: 51.5 },
  { year: 2018, billings: 52 },
  { year: 2019, billings: 53.5 },
  { year: 2020, billings: 48 },
  { year: 2021, billings: 51 },
  { year: 2022, billings: 51.8 },
  { year: 2023, billings: 52.5 },
  { year: 2024, billings: 53 },
];

export const advertisingService = {
  fetchGrowthRegion: async (): Promise<AdSpendGrowth[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GROWTH_REGION), 800);
    });
  },
  
  fetchGrowthYearly: async (): Promise<GrowthYearly[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_GROWTH_YEARLY), 800);
    });
  },
  
  fetchDigitalSpend: async (): Promise<DigitalAdSpend[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DIGITAL_SPEND), 1000);
    });
  },
  
  fetchRetailMediaSpend: async (): Promise<RetailMediaSpend[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RETAIL_MEDIA), 900);
    });
  },
  
  fetchAgencyBillings: async (): Promise<AgencyBillings[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_WPP_BILLINGS), 700);
    });
  }
};
