"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session) {
        router.replace('/home');
      }
    });

    return () => {
      mounted = false;
    };
  }, [router]);

  return <AuthScreen />;
}
