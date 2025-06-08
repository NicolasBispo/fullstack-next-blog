'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authRequests } from '@/requests/auth-requests';
import { useQuery, useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CurrentUserDto } from '@/responses/dto/current-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AuthResponseDto } from '@/responses/dto/auth';
import { LoginSchema, RegisterSchema } from '@/schemas/auth';



interface AuthContextType {
  user: CurrentUserDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginMutation: UseMutationResult<AuthResponseDto, Error, LoginSchema>;
  registerMutation: UseMutationResult<AuthResponseDto, Error, RegisterSchema>;
  logoutMutation: UseMutationResult<void, Error, void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient()  
  const { data: user, isLoading, refetch: refetchUser } = useQuery<CurrentUserDto | null>({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        return await authRequests.me();
      } catch (error: any) {
        if (error?.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    gcTime: 0,
    initialData: null
  });
  

  const loginMutation = useMutation({
    mutationFn: authRequests.login,
    onSuccess: () => {
      refetchUser()
      router.push("/")
      router.refresh()
    },
  });

  const registerMutation = useMutation({
    mutationFn: authRequests.register,
    onSuccess: () => {
      refetchUser()
      toast.success("Account created successfully")
      router.push("/")
      router.refresh()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to create account")
    }
  });
  
  useEffect(() => {
    console.log('valor do user', user)
  }, [user])

  const logoutMutation = useMutation({
    mutationFn: authRequests.logout,
    onSuccess: () => {
      refetchUser()
      router.push("/")
      router.refresh()
    },
  });

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginMutation,
    registerMutation,
    logoutMutation
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