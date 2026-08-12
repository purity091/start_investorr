const PROJECT_COUNT_TTL_MS = 30_000;

const getProjectCountKey = (userId: string) => `khotta_project_count_${userId}`;

export function readProjectCountCache(userId: string): number | null {
  try {
    const raw = sessionStorage.getItem(getProjectCountKey(userId));
    if (!raw) return null;
    const cached = JSON.parse(raw) as { count?: number; expiresAt?: number };
    if (typeof cached.count !== 'number' || !cached.expiresAt || cached.expiresAt <= Date.now()) {
      sessionStorage.removeItem(getProjectCountKey(userId));
      return null;
    }
    return cached.count;
  } catch {
    return null;
  }
}

export function writeProjectCountCache(userId: string, count: number) {
  try {
    sessionStorage.setItem(getProjectCountKey(userId), JSON.stringify({
      count,
      expiresAt: Date.now() + PROJECT_COUNT_TTL_MS,
    }));
  } catch {
    // Storage can be unavailable; Supabase remains the source of truth.
  }
}

export function invalidateProjectCountCache(userId: string) {
  try {
    sessionStorage.removeItem(getProjectCountKey(userId));
  } catch {
    // Ignore unavailable browser storage.
  }
}
