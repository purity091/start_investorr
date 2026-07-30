
export interface GrainProduction {
  year: string;
  volume: number;
}

export interface BeefProduction {
  country: string;
  value2024: number;
  value2025: number;
}

export interface AutonomousEquipment {
  application: string;
  value2021: number;
  value2027: number;
}

export interface FruitImports {
  region: string;
  share: number;
}

export const farmingService = {
  fetchGrainProduction: async (): Promise<GrainProduction[]> => {
    return [
      { year: '2008/09', volume: 2.1 },
      { year: '2010/11', volume: 2.2 },
      { year: '2012/13', volume: 2.3 },
      { year: '2014/15', volume: 2.5 },
      { year: '2016/17', volume: 2.6 },
      { year: '2018/19', volume: 2.7 },
      { year: '2020/21', volume: 2.75 },
      { year: '2021/22', volume: 2.8 },
      { year: '2022/23', volume: 2.7 },
      { year: '2023/24', volume: 2.3 },
      { year: '2024/25', volume: 2.5 },
      { year: '2025/26', volume: 2.6 },
    ];
  },

  fetchBeefProduction: async (): Promise<BeefProduction[]> => {
    return [
      { country: 'الولايات المتحدة', value2024: 12.3, value2025: 12.6 },
      { country: 'البرازيل', value2024: 10.5, value2025: 10.8 },
      { country: 'الصين', value2024: 7.2, value2025: 7.5 },
      { country: 'الاتحاد الأوروبي', value2024: 6.6, value2025: 6.8 },
      { country: 'الهند', value2024: 4.3, value2025: 4.5 },
      { country: 'الأرجنتين', value2024: 3.1, value2025: 3.2 },
      { country: 'أستراليا', value2024: 2.3, value2025: 2.4 },
      { country: 'المكسيك', value2024: 2.1, value2025: 2.2 },
      { country: 'روسيا', value2024: 1.3, value2025: 1.4 },
      { country: 'كندا', value2024: 1.1, value2025: 1.2 },
    ];
  },

  fetchAutonomousEquipment: async (): Promise<AutonomousEquipment[]> => {
    return [
      { application: 'الحصاد', value2021: 4.2, value2027: 12.5 },
      { application: 'الرش', value2021: 3.5, value2027: 8.8 },
      { application: 'الزراعة', value2021: 2.8, value2027: 7.2 },
      { application: 'أخرى', value2021: 1.5, value2027: 4.5 },
    ];
  },

  fetchFruitImports: async (): Promise<FruitImports[]> => {
    return [
      { region: 'ألمانيا', share: 8 },
      { region: 'هولندا', share: 6 },
      { region: 'المملكة المتحدة', share: 5 },
      { region: 'فرنسا', share: 5 },
      { region: 'بلجيكا', share: 3 },
      { region: 'إسبانيا', share: 2 },
      { region: 'دول أوروبية أخرى', share: 14 },
      { region: 'بقية العالم', share: 57 },
    ];
  }
};
