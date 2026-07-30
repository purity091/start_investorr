"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthScreen } from '@/features/auth/AuthScreen';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user already has an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/home');
      }
    });

    // Listen for successful login and redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return <AuthScreen />;
}
