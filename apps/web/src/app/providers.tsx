'use client';

import React from 'react';
import { AuthProvider } from '@/features/auth/AuthContext';
import { AuthModalProvider } from '@/features/auth/AuthModalContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>{children}</AuthModalProvider>
    </AuthProvider>
  );
}
