
export interface ForestArea {
  year: string;
  area: number;
}

export interface TimberlandOwnership {
  category: string;
  acres: number;
}

export const forestryService = {
  fetchForestProductionArea: async (): Promise<ForestArea[]> => {
    return [
      { year: '1990', area: 1180000 },
      { year: '2000', area: 1160000 },
      { year: '2010', area: 1150000 },
      { year: '2015', area: 1190000 },
      { year: '2020', area: 1150000 },
    ];
  },

  fetchTimberlandOwnership: async (): Promise<TimberlandOwnership[]> => {
    return [
      { category: 'Private Timberland', acres: 359152 },
      { category: 'Federal Forest System', acres: 155000 },
      { category: 'Other Federal Lands', acres: 251000 },
    ];
  }
};
