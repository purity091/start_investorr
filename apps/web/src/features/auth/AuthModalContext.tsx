'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthModal } from './AuthModal';

type AuthMode = 'login' | 'register' | 'forgot_password';

interface AuthModalContextType {
  isOpen: boolean;
  mode: AuthMode;
  openAuthModal: (mode?: AuthMode) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType>({
  isOpen: false,
  mode: 'login',
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const fullLocation = hash + search;

    // Automatically detect recovery links sent by Supabase Auth and redirect to /reset-password
    if (fullLocation.includes('type=recovery') || (fullLocation.includes('access_token=') && fullLocation.includes('type=recovery'))) {
      if (!window.location.pathname.startsWith('/reset-password')) {
        const targetUrl = `/reset-password${hash}${search ? (hash ? '&' + search.slice(1) : search) : ''}`;
        window.location.href = targetUrl;
      }
    }
  }, []);

  const openAuthModal = (initialMode: AuthMode = 'login') => {
    setMode(initialMode);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ isOpen, mode, openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal isOpen={isOpen} onClose={closeAuthModal} initialMode={mode} />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  return useContext(AuthModalContext);
};
