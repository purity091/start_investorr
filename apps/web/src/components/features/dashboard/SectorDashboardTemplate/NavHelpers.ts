import { SectorSection } from './types';

/**
 * Build nav labels from sections.
 */
export const buildNav = (
  sections: SectorSection[],
  hasLeaders: boolean,
  hasDefinition: boolean,
  hasOpportunities: boolean,
  hasSwot: boolean,
): string[] => {
  const items: string[] = [];
  
  if (hasDefinition) items.push('التعريف بالقطاع');
  
  sections.forEach((s) => {
    if (!items.includes(s.title)) items.push(s.title);
  });

  if (hasLeaders && !items.includes('الشركات الرائدة')) items.push('الشركات الرائدة');
  if (hasSwot) items.push('تحليل SWOT');
  if (hasOpportunities) items.push('فرص الاستثمار');
  
  return items;
};

/** Map nav label → data-section id */
export const buildNavMap = (
  sections: SectorSection[],
  hasLeaders: boolean,
  hasDefinition: boolean,
  hasOpportunities: boolean,
  hasSwot: boolean,
): Record<string, string> => {
  const map: Record<string, string> = {};
  
  if (hasDefinition) map['التعريف بالقطاع'] = 'definition';
  
  sections.forEach((s) => {
    map[s.title] = s.id;
  });
  
  if (hasLeaders) map['الشركات الرائدة'] = 'leaders';
  if (hasSwot) map['تحليل SWOT'] = 'swot-analysis';
  if (hasOpportunities) map['فرص الاستثمار'] = 'opportunities-section';
  
  return map;
};
