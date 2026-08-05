'use client';

import React, { createContext, useContext, useState } from 'react';
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
