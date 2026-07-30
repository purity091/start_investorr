export interface GlobalFishProduction {
  year: number;
  volume: number;
}
export interface MarketSegment {
  year: number;
  fishing: number;
  aquaculture: number;
}
export interface RegionalProduction {
  name: string;
  value: number;
}
export const fisheriesService = {
  fetchGlobalProduction: async () => [] as GlobalFishProduction[],
  fetchMarketSegments: async () => [] as MarketSegment[],
  fetchRegionalProduction: async () => [] as RegionalProduction[]
};
