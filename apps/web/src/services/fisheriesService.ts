
export interface GlobalFishProduction {
  year: string;
  volume: number;
  forecast?: boolean;
}

export interface MarketSegment {
  year: string;
  fishing: number;
  aquaculture: number;
}

export interface RegionalProduction {
  name: string;
  value: number;
}

export const fisheriesService = {
  fetchGlobalProduction: async (): Promise<GlobalFishProduction[]> => {
    // This will connect to radar_investment_db later
    // For now, returning mock data that matches the chart requirements
    return [
      { year: '2002', volume: 133 },
      { year: '2005', volume: 142 },
      { year: '2008', volume: 147 },
      { year: '2011', volume: 156 },
      { year: '2014', volume: 167 },
      { year: '2017', volume: 172 },
      { year: '2020', volume: 178 },
      { year: '2023', volume: 184.6 },
      { year: '2025', volume: 189, forecast: true },
    ];
  },

  fetchMarketSegments: async (): Promise<MarketSegment[]> => {
    return [
      { year: '2007', fishing: 90, aquaculture: 50 },
      { year: '2010', fishing: 89, aquaculture: 59 },
      { year: '2013', fishing: 91, aquaculture: 70 },
      { year: '2016', fishing: 91, aquaculture: 80 },
      { year: '2019', fishing: 93, aquaculture: 88 },
      { year: '2022', fishing: 90.6, aquaculture: 96 },
      { year: '2025', fishing: 91, aquaculture: 102 },
    ];
  },

  fetchRegionalProduction: async (): Promise<RegionalProduction[]> => {
    return [
      { name: 'China', value: 13.4 },
      { name: 'Indonesia', value: 6.5 },
      { name: 'Peru', value: 5.8 },
      { name: 'Russia', value: 5.1 },
      { name: 'USA', value: 4.8 },
      { name: 'India', value: 3.7 },
      { name: 'Vietnam', value: 3.5 },
      { name: 'Japan', value: 3.2 },
      { name: 'Norway', value: 2.5 },
      { name: 'Iceland', value: 1.8 },
    ];
  }
};
