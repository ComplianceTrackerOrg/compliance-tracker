"use client"

import React, { memo, useMemo } from "react"
import { UrqlProvider } from "@urql/next"
import { initClient, ssr } from "@/lib/graphql/exchanges"

export interface AuthProviderProps {
  children: React.ReactNode
  url?: string
  logoutUrl?: string
}
interface GraphqlClientProviderProps {
  children: React.ReactNode
  url: string
}

const GRAPHQL_URL = "https://rjtezqqbmcpujhvadccw.supabase.co/graphql/v1" //TODO: use environment variable or pass as props?

const createClient = initClient()

export const UrqlClientProvider = ({
  children,
  url,
}: GraphqlClientProviderProps) => {
  const client = useMemo(() => {
    return createClient(url)
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

//TODO: Implement AuthUserProvider
export const AuthProvider = memo(({ children }: AuthProviderProps) => {
  return <UrqlClientProvider url={GRAPHQL_URL}>{children}</UrqlClientProvider>
})
AuthProvider.displayName = "AuthProvider"
