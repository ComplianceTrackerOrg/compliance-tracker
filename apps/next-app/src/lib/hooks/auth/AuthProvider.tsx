"use client"

import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useRouter } from "next/navigation"
import { UrqlProvider } from "@urql/next"
import { initGraphqlClient, ssr } from "@/lib/graphql/exchanges"
import { createClient } from "@/lib/supabase/client"
import { getSupabaseUser } from "@/lib/supabase/service"
import { AuthenticatedUser } from "@/types"

interface GraphqlClientProviderProps {
  children: React.ReactNode
  url: string
  apiKey: string
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthUserProviderProps {
  children: React.ReactNode
  apiKey: string
  url: string
}

interface AuthUserContextProps {
  authUser: AuthenticatedUser | null
}

const AuthUserContext = createContext<AuthUserContextProps>({ authUser: null })

const createGraphqlClient = initGraphqlClient()

export const UrqlClientProvider = ({
  children,
  apiKey,
  url,
}: GraphqlClientProviderProps) => {
  const client = useMemo(() => {
    return createGraphqlClient(url, apiKey)
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

export const AuthUserProvider = ({
  children,
  apiKey,
  url,
}: AuthUserProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient(url, apiKey)

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const supabaseUser = await getSupabaseUser(supabase, user)
        const authenticatedUser: AuthenticatedUser = {
          id: supabaseUser ? supabaseUser.id : 0,
          email: user.email?.toLowerCase() ?? "",
          avatarUrl: user.user_metadata.avatar_url,
        }
        setAuthUser(authenticatedUser)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setAuthUser(null)
        router.push("/login")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <AuthUserContext.Provider value={{ authUser }}>
      {children}
    </AuthUserContext.Provider>
  )
}

export const AuthProvider = memo(({ children }: AuthProviderProps) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
  if (!SUPABASE_URL || !API_KEY) {
    throw new Error("URL or key not set")
  }

  const graphqlUrl = `${SUPABASE_URL}/graphql/v1`

  return (
    <AuthUserProvider url={SUPABASE_URL} apiKey={API_KEY}>
      <UrqlClientProvider url={graphqlUrl} apiKey={API_KEY}>
        {children}
      </UrqlClientProvider>
    </AuthUserProvider>
  )
})
AuthProvider.displayName = "AuthProvider"

export const useAuth = () => {
  return useContext(AuthUserContext)
}
