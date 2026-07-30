export type SavedMarketRecord = {
  id: string;
  kind: 'problem' | 'opportunity';
  title: string;
  summary: string;
  sectorName: string;
  subSectorName: string;
  countries: string[];
  audience: string;
  budget: string;
  linkedTitle: string;
  model: string;
  status: 'draft' | 'validated' | 'priority';
  marketBand: 'small' | 'medium' | 'large';
  easeBand: 'hard' | 'moderate' | 'easy';
  profitBand: 'low' | 'medium' | 'high';
  competitionBand: 'high' | 'medium' | 'low';
  priorityScore: number;
  marketScore: number;
  easeScore: number;
  profitScore: number;
  updatedLabel: string;
  tags: string[];
};

export const MARKET_PROBLEM_STORAGE_KEY = 'khotta_selected_market_problem';
export const MARKET_SAVED_ITEMS_STORAGE_KEY = 'khotta_saved_market_items';

export const loadSavedMarketItems = () => {
  try {
    const raw = localStorage.getItem(MARKET_SAVED_ITEMS_STORAGE_KEY);
    if (!raw) return [] as SavedMarketRecord[];
    const parsed = JSON.parse(raw) as SavedMarketRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as SavedMarketRecord[];
  }
};

export const saveSavedMarketItems = (items: SavedMarketRecord[]) => {
  localStorage.setItem(MARKET_SAVED_ITEMS_STORAGE_KEY, JSON.stringify(items));
};

export const isMarketItemSaved = (recordId: string) =>
  loadSavedMarketItems().some(item => item.id === recordId);

export const toggleSavedMarketItem = (record: SavedMarketRecord) => {
  const current = loadSavedMarketItems();
  const exists = current.some(item => item.id === record.id);

  if (exists) {
    const next = current.filter(item => item.id !== record.id);
    saveSavedMarketItems(next);
    return { saved: false, items: next };
  }

  const next = [record, ...current];
  saveSavedMarketItems(next);
  return { saved: true, items: next };
};
