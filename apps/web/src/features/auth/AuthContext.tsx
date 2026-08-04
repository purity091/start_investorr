import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { withSupabaseRetry } from '@/lib/supabaseRetry';
import { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'suspended' | 'pending';
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refetchProfile: async () => {},
});

const PROFILE_CACHE_TTL_MS = 60_000;

const getProfileCacheKey = (userId: string) => `khotta_profile_cache_${userId}`;

const readCachedProfile = (userId: string): UserProfile | null => {
  try {
    const raw = sessionStorage.getItem(getProfileCacheKey(userId));
    if (!raw) return null;

    const cached = JSON.parse(raw) as { profile: UserProfile; cachedAt: number };
    if (!cached.profile || Date.now() - cached.cachedAt > PROFILE_CACHE_TTL_MS) {
      sessionStorage.removeItem(getProfileCacheKey(userId));
      return null;
    }

    return cached.profile;
  } catch {
    return null;
  }
};

const writeCachedProfile = (profile: UserProfile) => {
  try {
    sessionStorage.setItem(
      getProfileCacheKey(profile.id),
      JSON.stringify({ profile, cachedAt: Date.now() })
    );
  } catch {
    // Cache is an optimization only. Private browsing/storage failures should not block auth.
  }
};

const createFallbackProfile = (user: User): UserProfile => ({
  id: user.id,
  full_name:
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : null,
  email: user.email ?? null,
  role: 'user',
  status: 'active',
});

const describeProfileError = (error: unknown) => {
  if (!error || typeof error !== 'object') {
    return String(error);
  }

  const candidate = error as {
    message?: unknown;
    code?: unknown;
    details?: unknown;
    hint?: unknown;
    name?: unknown;
  };

  return {
    name: typeof candidate.name === 'string' ? candidate.name : undefined,
    code: typeof candidate.code === 'string' ? candidate.code : undefined,
    message: typeof candidate.message === 'string' ? candidate.message : 'Unknown profile fetch error',
    details: typeof candidate.details === 'string' ? candidate.details : undefined,
    hint: typeof candidate.hint === 'string' ? candidate.hint : undefined,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const profileRequestRef = useRef<Promise<void> | null>(null);
  const loadedProfileUserRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async (nextUser: User, options?: { force?: boolean }) => {
    const userId = nextUser.id;

    if (!options?.force && loadedProfileUserRef.current === userId) {
      return;
    }

    if (!options?.force) {
      const cachedProfile = readCachedProfile(userId);
      if (cachedProfile) {
        loadedProfileUserRef.current = userId;
        setProfile(cachedProfile);
        return;
      }
    }

    if (profileRequestRef.current && !options?.force) {
      return profileRequestRef.current;
    }

    profileRequestRef.current = (async () => {
      try {
        const { data, error } = await withSupabaseRetry(() =>
          supabase
            .from('profiles')
            .select('id, full_name, email, role, status')
            .eq('id', userId)
            .maybeSingle()
        );

        if (error) throw error;

        if (data) {
          const nextProfile = data as UserProfile;
          loadedProfileUserRef.current = userId;
          setProfile(nextProfile);
          writeCachedProfile(nextProfile);
        } else {
          const fallbackProfile = createFallbackProfile(nextUser);
          loadedProfileUserRef.current = userId;
          setProfile(fallbackProfile);
          writeCachedProfile(fallbackProfile);
        }
      } catch (err) {
        const fallbackProfile = createFallbackProfile(nextUser);
        loadedProfileUserRef.current = userId;
        setProfile(fallbackProfile);
        writeCachedProfile(fallbackProfile);
        console.warn('Profile lookup failed; using auth metadata fallback.', describeProfileError(err));
      } finally {
        profileRequestRef.current = null;
      }
    })();

    return profileRequestRef.current;
  }, []);

  const applySession = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);
    setUser(nextSession?.user ?? null);

    if (nextSession?.user) {
      await fetchProfile(nextSession.user);
    } else {
      loadedProfileUserRef.current = null;
      setProfile(null);
    }
  }, [fetchProfile]);

  const refetchProfile = async () => {
    if (user) {
      await fetchProfile(user, { force: true });
    }
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (!mounted) return;
        await applySession(session);
      })
      .catch((error) => {
        console.warn('Initial auth session lookup failed.', describeProfileError(error));
        if (!mounted) return;
        setSession(null);
        setUser(null);
        setProfile(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      applySession(session).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signOut = async () => {
    try {
      // 1. Call server API to clear HTTP cookies securely
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // 2. Clear client-side Supabase state
      await supabase.auth.signOut();

      // 3. Remove only auth-related keys — preserve workspace/project data
      const authKeys = ['khotta_active_tab', 'platform_feedback_prompted'];
      authKeys.forEach((key) => localStorage.removeItem(key));
      
      // 4. Reset React state
      setSession(null);
      setUser(null);
      setProfile(null);
      loadedProfileUserRef.current = null;
      
      // 5. Force hard reload to landing page
      window.location.href = '/';
    } catch (e) {
      console.error('Error signing out', e);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, refetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
