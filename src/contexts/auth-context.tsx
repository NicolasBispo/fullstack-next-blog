'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authRequests } from '@/requests/auth-requests';
import { useQuery } from '@tanstack/react-query';
import { CurrentUserDto } from '@/responses/dto/current-user';
import { AxiosError } from 'axios';

interface AuthContextType {
  user: CurrentUserDto | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {data: user, isLoading} = useQuery({
    queryKey: ["me"],
    queryFn: () => authRequests.me(),
    retry: false
  });

  const value = {
    user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 