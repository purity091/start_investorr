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
  
  if (hasDefinition) items.push('التعريف');
  if (hasSwot) items.push('تحليل SWOT');
  if (hasOpportunities) items.push('فرص الاستثمار');
  
  sections.forEach((s) => {
    if (!items.includes(s.title)) items.push(s.title);
  });

  if (hasLeaders && !items.includes('القادة')) items.push('القادة');
  
  return items;
}

/** Map nav label → data-section id */
export const buildNavMap = (
  sections: SectorSection[],
  hasLeaders: boolean,
  hasDefinition: boolean,
  hasOpportunities: boolean,
  hasSwot: boolean,
): Record<string, string> => {
  const map: Record<string, string> = {};
  sections.forEach((s) => {
    map[s.title] = s.id;
  });
  if (hasSwot) map['تحليل SWOT'] = 'swot-analysis';
  if (hasLeaders) map['القادة'] = 'leaders';
  if (hasDefinition) map['التعريف'] = 'definition';
  if (hasOpportunities) map['فرص الاستثمار'] = 'opportunities-section';
  return map;
}
