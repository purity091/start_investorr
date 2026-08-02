import { supabase } from '@/lib/supabase';

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
export const BOOKMARKED_PROJECTS_STORAGE_KEY = 'khotta_bookmarked_project_ids';

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

export const removeSavedMarketRecord = (id: string): SavedMarketRecord[] => {
  const current = loadSavedMarketItems();
  const next = current.filter(item => item.id !== id);
  saveSavedMarketItems(next);
  return next;
};

export const loadBookmarkedProjectIds = (): string[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKED_PROJECTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveBookmarkedProjectIds = (ids: string[]) => {
  localStorage.setItem(BOOKMARKED_PROJECTS_STORAGE_KEY, JSON.stringify(ids));
};

export const toggleBookmarkedProjectId = (id: string): boolean => {
  const current = loadBookmarkedProjectIds();
  const exists = current.includes(id);
  let next: string[];
  if (exists) {
    next = current.filter(item => item !== id);
  } else {
    next = [...current, id];
  }
  saveBookmarkedProjectIds(next);
  return !exists;
};

export const removeBookmarkedProjectId = (id: string): void => {
  const current = loadBookmarkedProjectIds();
  const next = current.filter(item => item !== id);
  saveBookmarkedProjectIds(next);
};

/**
 * Cloud Sync helpers with Supabase:
 * Ensures bookmarked projects sync seamlessly across devices for logged-in users.
 */
export const syncCloudBookmarks = async (userId: string): Promise<string[]> => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('bookmarked_ids')
      .eq('id', userId)
      .maybeSingle();

    if (profile && Array.isArray(profile.bookmarked_ids)) {
      const local = loadBookmarkedProjectIds();
      const merged = Array.from(new Set([...local, ...profile.bookmarked_ids]));
      saveBookmarkedProjectIds(merged);
      return merged;
    }
  } catch (err) {
    console.warn('Supabase cloud bookmark sync fallback to localStorage:', err);
  }
  return loadBookmarkedProjectIds();
};

export const saveCloudBookmarks = async (userId: string, bookmarkedIds: string[]) => {
  try {
    await supabase
      .from('profiles')
      .update({ bookmarked_ids: bookmarkedIds })
      .eq('id', userId);
  } catch (err) {
    // Gracefully handle if column is not present or offline
  }
};
