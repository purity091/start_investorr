"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { supabase } from '@/lib/supabase';

const getSafeRedirectPath = (target: string | null) => {
  if (!target) return '/home';
  const normalized = target.startsWith('/') ? target : `/${target}`;
  if (normalized.startsWith('//') || normalized.includes('://')) return '/home';
  return normalized;
};

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = getSafeRedirectPath(searchParams.get('next') || searchParams.get('redirect'));

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (mounted && session) {
          router.replace(redirectPath);
        }
      })
      .catch((error) => {
        console.warn('Login session lookup failed.', error);
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  return <AuthScreen />;
}
