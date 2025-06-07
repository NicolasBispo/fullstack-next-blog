"use client"
import { useMutation } from "@tanstack/react-query";
import { authRequests } from "../requests/auth-requests";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter()
  const loginMutation = useMutation({
    mutationFn: authRequests.login,
    onSuccess: () => {
      router.push("/")
    },
  });

  const registerMutation = useMutation({
    mutationFn: authRequests.register,
    onSuccess: () => {
      toast.success("Account created successfully")
      router.push("/")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to create account")
    }
  });

  const logoutMutation = useMutation({
    mutationFn: authRequests.logout,
    onSuccess: () => {
      
      router.push("/")
    },
  });

  return {
    loginMutation,
    registerMutation,
    logoutMutation
  };
}