"use client"
import { useAuth } from "@/contexts/auth-context";
import { getCookie } from 'cookies-next'

export default function Home() {
  const {user} = useAuth()

  return (
    <div>
      dados do usuario: {JSON.stringify(user)}
      <h1>Home</h1>
    </div>
  );
}
