export type DiscoveryCapitalLevel = 'low' | 'medium' | 'high';
export type DiscoveryExperienceLevel = 'beginner' | 'operator' | 'expert';
export type DiscoveryEntrySpeed = 'fast' | 'moderate' | 'slow';
export type DiscoveryCustomerType = 'individuals' | 'businesses' | 'government' | 'smb';
export type DiscoveryOpportunityDepth = 'quick' | 'deep';
export type ArabRegion = 'gulf' | 'levant' | 'egypt' | 'maghreb' | 'iraq';

export interface DiscoveryRiskRadar {
  regulatory: number;
  operational: number;
  competitive: number;
  seasonal: number;
  logistics: number;
}

export interface DiscoverySectorInsights {
  capitalLevel: DiscoveryCapitalLevel;
  experienceLevel: DiscoveryExperienceLevel;
  entrySpeed: DiscoveryEntrySpeed;
  regulationLevel: number;
  marginLevel: number;
  customerType: DiscoveryCustomerType;
  opportunityDepth: DiscoveryOpportunityDepth;
  arabRegions: ArabRegion[];
  countryFocus: string[];
  riskRadar: DiscoveryRiskRadar;
}

export interface DiscoveryFilterState {
  capital: DiscoveryCapitalLevel | 'all';
  country: string | 'all';
  experience: DiscoveryExperienceLevel | 'all';
  speed: DiscoveryEntrySpeed | 'all';
  regulationMax: number;
  marginMin: number;
  customerType: DiscoveryCustomerType | 'all';
  opportunityDepth: DiscoveryOpportunityDepth | 'all';
  region: ArabRegion | 'all';
}

export interface DiscoverySectorRecord {
  id: string;
  label: string;
  groupTitle: string;
  exists: boolean;
  isNew?: boolean;
}

export interface DiscoverySectorWithInsights extends DiscoverySectorRecord {
  insights: DiscoverySectorInsights;
  fitScore: number;
}

export interface DiscoveryRegionOpportunity {
  id: ArabRegion;
  label: string;
  count: number;
  emphasis: string;
  topSectors: DiscoverySectorWithInsights[];
}

export const REGION_LABELS: Record<ArabRegion, string> = {
  gulf: 'الخليج',
  levant: 'بلاد الشام',
  egypt: 'مصر',
  maghreb: 'المغرب العربي',
  iraq: 'العراق',
};

export const COUNTRY_OPTIONS = [
  { id: 'saudi', label: 'السعودية', region: 'gulf' as ArabRegion },
  { id: 'uae', label: 'الإمارات', region: 'gulf' as ArabRegion },
  { id: 'qatar', label: 'قطر', region: 'gulf' as ArabRegion },
  { id: 'kuwait', label: 'الكويت', region: 'gulf' as ArabRegion },
  { id: 'oman', label: 'عُمان', region: 'gulf' as ArabRegion },
  { id: 'bahrain', label: 'البحرين', region: 'gulf' as ArabRegion },
  { id: 'jordan', label: 'الأردن', region: 'levant' as ArabRegion },
  { id: 'lebanon', label: 'لبنان', region: 'levant' as ArabRegion },
  { id: 'syria', label: 'سوريا', region: 'levant' as ArabRegion },
  { id: 'palestine', label: 'فلسطين', region: 'levant' as ArabRegion },
  { id: 'egypt', label: 'مصر', region: 'egypt' as ArabRegion },
  { id: 'morocco', label: 'المغرب', region: 'maghreb' as ArabRegion },
  { id: 'algeria', label: 'الجزائر', region: 'maghreb' as ArabRegion },
  { id: 'tunisia', label: 'تونس', region: 'maghreb' as ArabRegion },
  { id: 'libya', label: 'ليبيا', region: 'maghreb' as ArabRegion },
  { id: 'iraq', label: 'العراق', region: 'iraq' as ArabRegion },
];

const ALL_REGIONS: ArabRegion[] = ['gulf', 'levant', 'egypt', 'maghreb', 'iraq'];

const categoryPatterns = {
  digital: [
    'software',
    'ai',
    'artificial-intelligence',
    'cloud',
    'cyber',
    'search',
    'social',
    'internet',
    'apps',
    'communications',
    'telecommunications',
    'mobile',
    'saas',
    'seo',
    'marketing',
    'advertising',
    'influencer',
    'content',
    'video',
    'online',
  ],
  commerce: [
    'ecommerce',
    'retail',
    'shopping',
    'b2b',
    'b2c',
    'c2c',
    'wholesale',
    'marketplace',
    'apparel',
    'cosmetics',
    'food',
    'beverage',
    'fashion',
    'consumer',
    'private-label',
    'direct-selling',
  ],
  agriculture: ['farming', 'fisheries', 'agri', 'seeds', 'crop', 'forestry'],
  energy: ['energy', 'climate', 'waste', 'water', 'greentech', 'carbon', 'emissions', 'fossil', 'petroleum'],
  finance: ['financial', 'bank', 'insurance', 'investments', 'financing', 'mortgages'],
  health: ['health', 'medical', 'pharma', 'hospital', 'care', 'wellbeing'],
  infrastructure: ['construction', 'real-estate', 'property', 'building', 'cities', 'smart-construction'],
  logistics: ['logistics', 'transport', 'shipping', 'supply-chain', 'aviation', 'rail', 'water-transport', 'vehicles', 'fulfillment'],
  manufacturing: ['industrial', 'metals', 'chem', 'mining', 'machinery', 'electronics', 'hardware', 'robotics', 'semiconductors'],
  hospitality: ['travel', 'tourism', 'accommodation', 'food-drink-services', 'hospitality', 'leisure'],
  public: ['policy', 'government', 'politics', 'trade', 'demographic', 'law-enforcement', 'public-'],
  services: ['services', 'consulting', 'education', 'science', 'labor', 'bpo', 'business-services'],
  media: ['media', 'publishing', 'audio', 'news', 'film', 'gaming', 'entertainment'],
};

const containsPattern = (value: string, patterns: string[]) =>
  patterns.some((pattern) => value.includes(pattern));

const getCategory = (sectorId: string) => {
  const id = sectorId.toLowerCase();
  if (containsPattern(id, categoryPatterns.digital)) return 'digital';
  if (containsPattern(id, categoryPatterns.commerce)) return 'commerce';
  if (containsPattern(id, categoryPatterns.agriculture)) return 'agriculture';
  if (containsPattern(id, categoryPatterns.energy)) return 'energy';
  if (containsPattern(id, categoryPatterns.finance)) return 'finance';
  if (containsPattern(id, categoryPatterns.health)) return 'health';
  if (containsPattern(id, categoryPatterns.infrastructure)) return 'infrastructure';
  if (containsPattern(id, categoryPatterns.logistics)) return 'logistics';
  if (containsPattern(id, categoryPatterns.manufacturing)) return 'manufacturing';
  if (containsPattern(id, categoryPatterns.hospitality)) return 'hospitality';
  if (containsPattern(id, categoryPatterns.public)) return 'public';
  if (containsPattern(id, categoryPatterns.services)) return 'services';
  if (containsPattern(id, categoryPatterns.media)) return 'media';
  return 'services';
};

const insightTemplates: Record<string, DiscoverySectorInsights> = {
  digital: {
    capitalLevel: 'low',
    experienceLevel: 'beginner',
    entrySpeed: 'fast',
    regulationLevel: 2,
    marginLevel: 4,
    customerType: 'businesses',
    opportunityDepth: 'quick',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'qatar', 'jordan'],
    riskRadar: { regulatory: 2, operational: 2, competitive: 5, seasonal: 1, logistics: 1 },
  },
  commerce: {
    capitalLevel: 'medium',
    experienceLevel: 'operator',
    entrySpeed: 'fast',
    regulationLevel: 2,
    marginLevel: 3,
    customerType: 'individuals',
    opportunityDepth: 'quick',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'morocco', 'iraq'],
    riskRadar: { regulatory: 2, operational: 3, competitive: 4, seasonal: 3, logistics: 4 },
  },
  agriculture: {
    capitalLevel: 'high',
    experienceLevel: 'operator',
    entrySpeed: 'slow',
    regulationLevel: 3,
    marginLevel: 3,
    customerType: 'smb',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'maghreb', 'iraq'],
    countryFocus: ['saudi', 'egypt', 'morocco', 'iraq', 'oman'],
    riskRadar: { regulatory: 3, operational: 4, competitive: 3, seasonal: 5, logistics: 3 },
  },
  energy: {
    capitalLevel: 'high',
    experienceLevel: 'expert',
    entrySpeed: 'slow',
    regulationLevel: 5,
    marginLevel: 4,
    customerType: 'government',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'iraq', 'maghreb'],
    countryFocus: ['saudi', 'uae', 'egypt', 'iraq', 'oman'],
    riskRadar: { regulatory: 5, operational: 4, competitive: 3, seasonal: 2, logistics: 4 },
  },
  finance: {
    capitalLevel: 'medium',
    experienceLevel: 'expert',
    entrySpeed: 'moderate',
    regulationLevel: 5,
    marginLevel: 4,
    customerType: 'businesses',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'levant'],
    countryFocus: ['saudi', 'uae', 'qatar', 'egypt', 'jordan'],
    riskRadar: { regulatory: 5, operational: 3, competitive: 4, seasonal: 1, logistics: 1 },
  },
  health: {
    capitalLevel: 'high',
    experienceLevel: 'expert',
    entrySpeed: 'slow',
    regulationLevel: 5,
    marginLevel: 4,
    customerType: 'government',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'levant'],
    countryFocus: ['saudi', 'uae', 'egypt', 'qatar', 'jordan'],
    riskRadar: { regulatory: 5, operational: 4, competitive: 3, seasonal: 1, logistics: 2 },
  },
  infrastructure: {
    capitalLevel: 'high',
    experienceLevel: 'expert',
    entrySpeed: 'slow',
    regulationLevel: 4,
    marginLevel: 3,
    customerType: 'government',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'iraq', 'maghreb'],
    countryFocus: ['saudi', 'uae', 'egypt', 'iraq', 'morocco'],
    riskRadar: { regulatory: 4, operational: 5, competitive: 3, seasonal: 2, logistics: 4 },
  },
  logistics: {
    capitalLevel: 'high',
    experienceLevel: 'operator',
    entrySpeed: 'moderate',
    regulationLevel: 4,
    marginLevel: 3,
    customerType: 'businesses',
    opportunityDepth: 'deep',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'iraq', 'morocco'],
    riskRadar: { regulatory: 4, operational: 4, competitive: 4, seasonal: 2, logistics: 5 },
  },
  manufacturing: {
    capitalLevel: 'high',
    experienceLevel: 'expert',
    entrySpeed: 'slow',
    regulationLevel: 4,
    marginLevel: 3,
    customerType: 'smb',
    opportunityDepth: 'deep',
    arabRegions: ['gulf', 'egypt', 'maghreb', 'iraq'],
    countryFocus: ['saudi', 'egypt', 'morocco', 'uae', 'iraq'],
    riskRadar: { regulatory: 4, operational: 5, competitive: 3, seasonal: 2, logistics: 4 },
  },
  hospitality: {
    capitalLevel: 'medium',
    experienceLevel: 'operator',
    entrySpeed: 'moderate',
    regulationLevel: 3,
    marginLevel: 3,
    customerType: 'individuals',
    opportunityDepth: 'quick',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'morocco', 'qatar'],
    riskRadar: { regulatory: 3, operational: 3, competitive: 4, seasonal: 4, logistics: 2 },
  },
  public: {
    capitalLevel: 'medium',
    experienceLevel: 'expert',
    entrySpeed: 'slow',
    regulationLevel: 5,
    marginLevel: 2,
    customerType: 'government',
    opportunityDepth: 'deep',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'iraq', 'jordan'],
    riskRadar: { regulatory: 5, operational: 3, competitive: 2, seasonal: 1, logistics: 1 },
  },
  services: {
    capitalLevel: 'low',
    experienceLevel: 'beginner',
    entrySpeed: 'fast',
    regulationLevel: 2,
    marginLevel: 4,
    customerType: 'smb',
    opportunityDepth: 'quick',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'jordan', 'morocco'],
    riskRadar: { regulatory: 2, operational: 2, competitive: 4, seasonal: 2, logistics: 1 },
  },
  media: {
    capitalLevel: 'low',
    experienceLevel: 'operator',
    entrySpeed: 'fast',
    regulationLevel: 2,
    marginLevel: 3,
    customerType: 'individuals',
    opportunityDepth: 'quick',
    arabRegions: ALL_REGIONS,
    countryFocus: ['saudi', 'uae', 'egypt', 'iraq', 'morocco'],
    riskRadar: { regulatory: 2, operational: 2, competitive: 5, seasonal: 3, logistics: 1 },
  },
};

export const getCountryById = (countryId: string) =>
  COUNTRY_OPTIONS.find((country) => country.id === countryId);

export const getSectorInsights = (sectorId: string): DiscoverySectorInsights => {
  const category = getCategory(sectorId);
  const template = insightTemplates[category] || insightTemplates.services;

  if (sectorId.includes('government') || sectorId.includes('policy')) {
    return {
      ...template,
      customerType: 'government',
      regulationLevel: Math.min(5, template.regulationLevel + 1),
      opportunityDepth: 'deep',
    };
  }

  if (sectorId.includes('ai') || sectorId.includes('cloud') || sectorId.includes('cyber')) {
    return {
      ...template,
      marginLevel: 5,
      countryFocus: ['saudi', 'uae', 'qatar', 'egypt', 'jordan'],
    };
  }

  if (sectorId.includes('ecommerce') || sectorId.includes('retail')) {
    return {
      ...template,
      customerType: 'individuals',
      entrySpeed: 'fast',
    };
  }

  if (sectorId.includes('travel') || sectorId.includes('tourism')) {
    return {
      ...template,
      riskRadar: {
        ...template.riskRadar,
        seasonal: 5,
      },
    };
  }

  return template;
};

const capitalRank: Record<DiscoveryCapitalLevel, number> = { low: 1, medium: 2, high: 3 };
const experienceRank: Record<DiscoveryExperienceLevel, number> = { beginner: 1, operator: 2, expert: 3 };

export const matchesDiscoveryFilters = (
  sector: DiscoverySectorWithInsights,
  filters: DiscoveryFilterState,
  searchTerm: string
) => {
  const search = searchTerm.trim().toLowerCase();
  const countryRegion = filters.country === 'all' ? null : getCountryById(filters.country)?.region;

  if (
    search &&
    !sector.label.toLowerCase().includes(search) &&
    !sector.groupTitle.toLowerCase().includes(search) &&
    !sector.id.toLowerCase().includes(search)
  ) {
    return false;
  }

  if (filters.capital !== 'all' && capitalRank[sector.insights.capitalLevel] > capitalRank[filters.capital]) {
    return false;
  }

  if (
    filters.experience !== 'all' &&
    experienceRank[sector.insights.experienceLevel] > experienceRank[filters.experience]
  ) {
    return false;
  }

  if (filters.speed !== 'all' && sector.insights.entrySpeed !== filters.speed) {
    return false;
  }

  if (filters.customerType !== 'all' && sector.insights.customerType !== filters.customerType) {
    return false;
  }

  if (filters.opportunityDepth !== 'all' && sector.insights.opportunityDepth !== filters.opportunityDepth) {
    return false;
  }

  if (filters.region !== 'all' && !sector.insights.arabRegions.includes(filters.region)) {
    return false;
  }

  if (filters.country !== 'all') {
    const countryMatch = sector.insights.countryFocus.includes(filters.country);
    const regionMatch = countryRegion ? sector.insights.arabRegions.includes(countryRegion) : false;
    if (!countryMatch && !regionMatch) {
      return false;
    }
  }

  if (sector.insights.regulationLevel > filters.regulationMax) {
    return false;
  }

  if (sector.insights.marginLevel < filters.marginMin) {
    return false;
  }

  return true;
};

export const calculateFitScore = (
  insights: DiscoverySectorInsights,
  filters: DiscoveryFilterState
) => {
  let score = 48;

  if (filters.capital === 'all') {
    score += 8;
  } else if (capitalRank[insights.capitalLevel] <= capitalRank[filters.capital]) {
    score += 16;
  } else {
    score -= 12;
  }

  if (filters.experience === 'all') {
    score += 8;
  } else if (experienceRank[insights.experienceLevel] <= experienceRank[filters.experience]) {
    score += 14;
  } else {
    score -= 14;
  }

  if (filters.speed === 'all') {
    score += 6;
  } else if (insights.entrySpeed === filters.speed) {
    score += 12;
  }

  if (filters.customerType === 'all') {
    score += 6;
  } else if (insights.customerType === filters.customerType) {
    score += 12;
  }

  if (filters.opportunityDepth === 'all') {
    score += 4;
  } else if (insights.opportunityDepth === filters.opportunityDepth) {
    score += 8;
  }

  if (filters.region === 'all') {
    score += 4;
  } else if (insights.arabRegions.includes(filters.region)) {
    score += 8;
  }

  if (filters.country !== 'all') {
    const region = getCountryById(filters.country)?.region;
    if (insights.countryFocus.includes(filters.country)) {
      score += 8;
    } else if (region && insights.arabRegions.includes(region)) {
      score += 5;
    }
  } else {
    score += 4;
  }

  score += Math.max(0, 6 - Math.abs(insights.regulationLevel - filters.regulationMax));
  score += Math.max(0, 6 - Math.abs(insights.marginLevel - filters.marginMin));

  return Math.max(0, Math.min(99, score));
};

export const getRegionOpportunities = (
  sectors: DiscoverySectorWithInsights[]
): DiscoveryRegionOpportunity[] =>
  ALL_REGIONS.map((regionId) => {
    const regionSectors = sectors
      .filter((sector) => sector.insights.arabRegions.includes(regionId))
      .sort((left, right) => right.fitScore - left.fitScore);

    const emphases: Record<ArabRegion, string> = {
      gulf: 'طلب قوي وأسواق تعتمد على الشراكات والتمويل السريع.',
      levant: 'فرص مرنة في الخدمات الرقمية والتعليم والحلول منخفضة التكلفة.',
      egypt: 'حجم سوق كبير يفضّل النماذج القابلة للتوسع والتوزيع.',
      maghreb: 'مساحة جيدة للزراعة والتصنيع الخفيف والحلول الموجهة للتصدير.',
      iraq: 'فرص واضحة في البنية والخدمات واللوجستيات مع احتياج تشغيلي مرتفع.',
    };

    return {
      id: regionId,
      label: REGION_LABELS[regionId],
      count: regionSectors.length,
      emphasis: emphases[regionId],
      topSectors: regionSectors.slice(0, 3),
    };
  });

export const capitalizeLabelMap: Record<DiscoveryCapitalLevel, string> = {
  low: 'رأس مال منخفض',
  medium: 'رأس مال متوسط',
  high: 'رأس مال مرتفع',
};

export const experienceLabelMap: Record<DiscoveryExperienceLevel, string> = {
  beginner: 'مناسب للمبتدئ',
  operator: 'يحتاج خبرة تشغيلية',
  expert: 'يحتاج خبرة عميقة',
};

export const speedLabelMap: Record<DiscoveryEntrySpeed, string> = {
  fast: 'دخول سريع',
  moderate: 'دخول متوسط',
  slow: 'دخول بطيء',
};

export const customerLabelMap: Record<DiscoveryCustomerType, string> = {
  individuals: 'أفراد',
  businesses: 'شركات',
  government: 'حكومة',
  smb: 'منشآت صغيرة',
};

export const depthLabelMap: Record<DiscoveryOpportunityDepth, string> = {
  quick: 'فرصة سريعة البدء',
  deep: 'فرصة عميقة طويلة المدى',
};

export const riskLabelMap: Record<keyof DiscoveryRiskRadar, string> = {
  regulatory: 'تشريعي',
  operational: 'تشغيلي',
  competitive: 'تنافسي',
  seasonal: 'موسمي',
  logistics: 'لوجستي',
};
