import { Problem } from '../components/features/discovery/ProblemOpportunityEngine/types';

export const loadDynamicOpportunities = async (): Promise<Problem[]> => {
  // Use Vite's glob import to find all JSON files recursively in the opportunities directory
  const modules = import.meta.glob('../data/opportunities/**/*.json');
  const opportunities: Problem[] = [];

  for (const path in modules) {
    try {
      const mod: any = await modules[path]();
      const data = mod.default || mod;
      

      if (data.opportunity) {
        const opp = data.opportunity;
        
        // Extract Sector/SubSector from path or category
        const jsonPath = opp.path || [];
        const sectorNameFromPath = jsonPath[0] || 'فرص استخباراتية';
        const subSectorName = jsonPath[1] || 'عام';
        
        // Advanced Mapping Logic
        const findSectorId = (path: string[], category: string): string => {
          const combined = (path.join(' ') + ' ' + (category || '')).toLowerCase();
          
          if (combined.includes('health') || combined.includes('pharma') || combined.includes('medical') || combined.includes('hospital')) return 'health';
          if (combined.includes('edu') || combined.includes('learn') || combined.includes('school') || combined.includes('train')) return 'edu';
          if (combined.includes('fintech') || combined.includes('bank') || combined.includes('finance') || combined.includes('payment') || combined.includes('fraud')) return 'fintech';
          if (combined.includes('agri') || combined.includes('farm') || combined.includes('agriculture') || combined.includes('food security') || combined.includes('insect')) return 'agri';
          if (combined.includes('retail') || combined.includes('commerce') || combined.includes('e-commerce') || combined.includes('shopping') || combined.includes('mall') || combined.includes('sale')) return 'retail';
          if (combined.includes('energy') || combined.includes('environ') || combined.includes('green') || combined.includes('solar') || combined.includes('climate') || combined.includes('carbon')) return 'energy';
          if (combined.includes('logistics') || combined.includes('transport') || combined.includes('shipping') || combined.includes('supply chain') || combined.includes('traffic') || combined.includes('vehicle')) return 'logistics';
          if (combined.includes('real estate') || combined.includes('proptech') || combined.includes('housing') || combined.includes('building') || combined.includes('apartment')) return 'realestate';
          if (combined.includes('industry') || combined.includes('manufactur') || combined.includes('construction') || combined.includes('infrastructure') || combined.includes('steel') || combined.includes('factory')) return 'industry';
          if (combined.includes('consumer') || combined.includes('lifestyle') || combined.includes('fmcg') || combined.includes('food') || combined.includes('beauty') || combined.includes('fashion') || combined.includes('nutrition')) return 'life';
          if (combined.includes('media') || combined.includes('entertain') || combined.includes('gaming') || combined.includes('content') || combined.includes('cinema') || combined.includes('music') || combined.includes('news')) return 'media';
          if (combined.includes('economy') || combined.includes('politics') || combined.includes('policy') || combined.includes('govt') || combined.includes('regulat')) return 'economy';
          if (combined.includes('advertis') || combined.includes('market') || combined.includes('ads') || combined.includes('influencer') || combined.includes('seo')) return 'advertising';
          if (combined.includes('chem') || combined.includes('resource') || combined.includes('mining') || combined.includes('oil') || combined.includes('plastic') || combined.includes('petrol')) return 'chemicals';
          if (combined.includes('reconstruction') || combined.includes('syria')) return 'reconstruction';
          if (combined.includes('sports') || combined.includes('recreation') || combined.includes('fitness') || combined.includes('stadium')) return 'sports';
          if (combined.includes('tech') || combined.includes('saas') || combined.includes('software') || combined.includes('ai') || combined.includes('digital') || combined.includes('cloud')) return 'tech';
          
          return 'dynamic_sector';
        };

        const sectorId = findSectorId(jsonPath, opp.metadata?.category_tag);

        // Geography ID Mapping (Critical for filtering)
        const countryToId: Record<string, string> = {
          'Saudi Arabia': 'SA', 'Saudi': 'SA', 'KSA': 'SA', 'SA': 'SA',
          'United Arab Emirates': 'AE', 'UAE': 'AE', 'Emirates': 'AE', 'AE': 'AE',
          'Egypt': 'EG', 'Egyptians': 'EG', 'EG': 'EG',
          'Qatar': 'QA', 'QA': 'QA',
          'Kuwait': 'KW', 'KW': 'KW',
          'Bahrain': 'BH', 'BH': 'BH',
          'Oman': 'OM', 'OM': 'OM',
          'Jordan': 'JO', 'JO': 'JO',
          'Morocco': 'MA', 'MA': 'MA',
          'Algeria': 'DZ', 'DZ': 'DZ',
          'Tunisia': 'TN', 'TN': 'TN',
          'Lebanon': 'LB', 'LB': 'LB',
          'Iraq': 'IQ', 'IQ': 'IQ',
          'Syria': 'SY', 'SY': 'SY',
          'USA': 'US', 'United States': 'US', 'US': 'US',
          'UK': 'GB', 'United Kingdom': 'GB', 'GB': 'GB',
          'Turkey': 'TR', 'TR': 'TR',
          'Global': 'ALL', 'Worldwide': 'ALL', 'All': 'ALL'
        };

        const mappedCountries = (opp.geography?.active_regions || []).map((r: any) => {
          const name = typeof r === 'object' ? r.name : r;
          return countryToId[name] || name;
        });

        // Business Model mapping with B2B2C support
        let b2xVal: any = 'B2C';
        const modelStr = (opp.metadata?.business_model || '').toUpperCase();
        if (modelStr.includes('B2B2C')) b2xVal = 'B2B2C';
        else if (modelStr.includes('B2B')) b2xVal = 'B2B';
        else if (modelStr.includes('B2G')) b2xVal = 'B2G';
        else b2xVal = 'B2C';

        // Budget Mapping
        let budgetVal: any = opp.budget || 'medium';
        if (!opp.budget) {
          const pain = opp.strategic_matrix?.market_pain || 0;
          const tam = opp.strategic_matrix?.liquidity_tam || 0;
          if (pain > 9 || tam > 9) budgetVal = 'high';
          else if (pain > 7 || tam > 7) budgetVal = 'medium';
          else budgetVal = 'low';
        }

        // Transform the structured JSON into the Problem type used by the UI
        const transformedOpp: Problem = {
          id: opp.metadata.id || path.split('/').pop()?.replace('.json', '') || Math.random().toString(),
          title: opp.core_content.title || 'العنوان مفقود',
          desc: opp.core_content.problem_statement || 'لا يوجد وصف حالياً',
          pain: opp.strategic_matrix?.market_pain || 0,
          money: opp.strategic_matrix?.liquidity_tam || 0,
          freq: 10, 
          gap: opp.strategic_matrix?.competitive_moat || 0,
          opps: (opp.investment_proposals || []).map((p: any) => ({
            type: p.industry_tag || 'مشروع مقترح',
            name: p.brand_name || 'اسم المشروع',
            model: p.revenue_model || 'نموذج العمل'
          })),
          countries: mappedCountries,
          budget: budgetVal,
          b2x: b2xVal,
          // Grouping metadata
          sectorId,
          sectorName: sectorNameFromPath,
          subSectorName,
          // Extended dynamic fields
          roadmap: opp.execution_roadmap,
          whyNotSolved: opp.deep_analysis?.why_unsolved_reasons,
          techStack: opp.deep_analysis?.recommended_tech_stack,
          mainRisk: opp.deep_analysis?.main_risk_index
        };
        
        opportunities.push(transformedOpp);
      } else {
        console.warn(`File at ${path} does not have the 'opportunity' root key.`);
      }
    } catch (error) {
      console.error(`Failed to load opportunity at ${path}:`, error);
    }
  }

  return opportunities;
};
