import 'server-only';

import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';

const USER_CACHE_TTL_MS = 60_000;

type CachedUser = {
  user: User | null;
  expiresAt: number;
};

const verifiedUserCache = new Map<string, CachedUser>();

const cleanupExpiredUsers = () => {
  const now = Date.now();

  for (const [token, cached] of verifiedUserCache.entries()) {
    if (cached.expiresAt <= now) {
      verifiedUserCache.delete(token);
    }
  }
};

export async function getServerSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getCachedServerUser() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token;

  if (!accessToken) {
    return null;
  }

  cleanupExpiredUsers();

  const cached = verifiedUserCache.get(accessToken);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.user;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    verifiedUserCache.delete(accessToken);
    return null;
  }

  verifiedUserCache.set(accessToken, {
    user,
    expiresAt: Date.now() + USER_CACHE_TTL_MS,
  });

  return user;
}

