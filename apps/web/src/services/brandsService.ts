
export interface BrandValue {
  name: string;
  value: number;
}

export interface AgencyNetwork {
  name: string;
  points: number;
  holdingCompany: string;
}

export interface AdvertiserSpend {
  name: string;
  spend: number;
}

export interface QuickFact {
  title: string;
  value: string;
}

export const fetchBrandsData = async (): Promise<BrandValue[]> => {
  return [
    { name: 'Apple', value: 1100 },
    { name: 'Google', value: 850 },
    { name: 'Microsoft', value: 780 },
    { name: 'Amazon', value: 720 },
    { name: 'Nvidia', value: 650 },
    { name: 'Facebook', value: 580 },
    { name: 'Instagram', value: 520 },
    { name: 'McDonald\'s', value: 450 },
    { name: 'Oracle', value: 380 },
    { name: 'Visa', value: 320 }
  ];
};

export const fetchAgenciesData = async (): Promise<AgencyNetwork[]> => {
  return [
    { name: 'Ogilvy', points: 5800, holdingCompany: 'WPP' },
    { name: 'DDB Worldwide', points: 4200, holdingCompany: 'Omnicom Group' },
    { name: 'VML', points: 3900, holdingCompany: 'WPP' },
    { name: 'Leo', points: 3500, holdingCompany: 'Publicis Groupe' },
    { name: 'BBDO Worldwide', points: 3200, holdingCompany: 'Omnicom Group' },
    { name: 'McCann Worldgroup', points: 2900, holdingCompany: 'Interpublic Group' },
    { name: 'Havas Creative Group', points: 2600, holdingCompany: 'Havas Group' },
    { name: 'FCB', points: 2300, holdingCompany: 'Interpublic Group' },
    { name: 'LePub', points: 1900, holdingCompany: 'Publicis Groupe' },
    { name: 'TBWA Worldwide', points: 1700, holdingCompany: 'Omnicom Group' }
  ];
};

export const fetchAdvertisersData = async (): Promise<AdvertiserSpend[]> => {
  return [
    { name: 'Amazon', spend: 22.4 },
    { name: 'L\'Oréal', spend: 14.8 },
    { name: 'Procter & Gamble', spend: 11.2 },
    { name: 'Alibaba Group', spend: 9.5 },
    { name: 'LVMH', spend: 8.9 },
    { name: 'PDD Holdings', spend: 7.8 },
    { name: 'Samsung Electronics', spend: 6.9 },
    { name: 'Unilever', spend: 6.5 },
    { name: 'Alphabet (Google)', spend: 5.9 },
    { name: 'Comcast Corp.', spend: 5.2 }
  ];
};

export const fetchQuickFacts = async (): Promise<QuickFact[]> => {
  return [
    { title: 'Largest advertiser worldwide', value: 'Procter & Gamble' },
    { title: 'Most valuable brand worldwide', value: 'Apple' },
    { title: 'Most creative advertising market', value: 'United States' }
  ];
};
