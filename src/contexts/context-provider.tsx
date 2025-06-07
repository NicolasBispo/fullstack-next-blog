"use client"

import { ReactNode } from "react"
import { AuthProvider } from "./auth-context"
import QueryClientProvider from "./query-client-context"

const providers = [AuthProvider, QueryClientProvider]
export default function ContextProvider({children}: {children: ReactNode}) {
  return providers.reduce((acc, Provider) => (
    <Provider>{acc}</Provider>
  ), children)
}