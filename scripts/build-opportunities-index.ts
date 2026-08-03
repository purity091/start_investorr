import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src/data/opportunities/json_items');
const PUBLIC_ITEMS_DIR = path.resolve(__dirname, '../public/data/opportunities_items');
const PUBLIC_INDEX_FILE = path.resolve(__dirname, '../_archive_unused_not_for_git/data-raw/opportunities_index.full.json');

// Ensure public directories exist
if (!fs.existsSync(PUBLIC_ITEMS_DIR)) {
  fs.mkdirSync(PUBLIC_ITEMS_DIR, { recursive: true });
}

if (!fs.existsSync(SRC_DIR)) {
  console.error("Source directory not found:", SRC_DIR);
  process.exit(1);
}

const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.json'));
const opportunities = [];

const countryToId = {
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

const findSectorId = (jsonPath, category) => {
  const combined = (jsonPath.join(' ') + ' ' + (category || '')).toLowerCase();
  
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

files.forEach(filename => {
  const filePath = path.join(SRC_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error("Error parsing JSON:", filename);
    return;
  }

  // Copy file to public directory
  fs.writeFileSync(path.join(PUBLIC_ITEMS_DIR, filename), fileContent);

  if (data.opportunity) {
    const opp = data.opportunity;
    const jsonPath = opp.path || [];
    const sectorNameFromPath = jsonPath[0] || 'فرص استخباراتية';
    const subSectorName = jsonPath[1] || 'عام';
    const sectorId = findSectorId(jsonPath, opp.metadata?.category_tag);

    const mappedCountries = (opp.geography?.active_regions || []).map((r) => {
      const name = typeof r === 'object' ? r.name : r;
      return countryToId[name] || name;
    });

    let b2xVal = 'B2C';
    const modelStr = (opp.metadata?.business_model || '').toUpperCase();
    if (modelStr.includes('B2B2C')) b2xVal = 'B2B2C';
    else if (modelStr.includes('B2B')) b2xVal = 'B2B';
    else if (modelStr.includes('B2G')) b2xVal = 'B2G';

    let budgetVal = opp.budget || 'medium';
    if (!opp.budget) {
      const pain = opp.strategic_matrix?.market_pain || 0;
      const tam = opp.strategic_matrix?.liquidity_tam || 0;
      if (pain > 9 || tam > 9) budgetVal = 'high';
      else if (pain > 7 || tam > 7) budgetVal = 'medium';
      else budgetVal = 'low';
    }

    const transformedOpp = {
      id: opp.metadata.id || filename.replace('.json', ''),
      title: opp.core_content.title || 'العنوان مفقود',
      desc: opp.core_content.problem_statement || 'لا يوجد وصف حالياً',
      pain: opp.strategic_matrix?.market_pain || 0,
      money: opp.strategic_matrix?.liquidity_tam || 0,
      freq: 10, 
      gap: opp.strategic_matrix?.competitive_moat || 0,
      opps: (opp.investment_proposals || []).map((p) => ({
        type: p.industry_tag || 'مشروع مقترح',
        name: p.brand_name || 'اسم المشروع',
        model: p.revenue_model || 'نموذج العمل'
      })),
      countries: mappedCountries,
      budget: budgetVal,
      b2x: b2xVal,
      sectorId,
      sectorName: sectorNameFromPath,
      subSectorName,
      roadmap: opp.execution_roadmap,
      whyNotSolved: opp.deep_analysis?.why_unsolved_reasons,
      techStack: opp.deep_analysis?.recommended_tech_stack,
      mainRisk: opp.deep_analysis?.main_risk_index,
      filename: filename // Store filename so UI can fetch the full JSON later if needed
    };
    
    opportunities.push(transformedOpp);
  }
});

fs.writeFileSync(PUBLIC_INDEX_FILE, JSON.stringify(opportunities, null, 2));
console.log(`Processed ${files.length} files. Saved index to ${PUBLIC_INDEX_FILE}`);
