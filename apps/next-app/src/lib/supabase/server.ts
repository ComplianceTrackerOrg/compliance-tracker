import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

const SUPABASE_URL = process.env.SUPABASE_URL!
const KEY = process.env.SUPABASE_API_KEY!

/**
 * Creates a server-side Supabase client that handles cookies automatically.
 *
 * @returns A Supabase client configured for server-side usage.
 */
export const createClient = async () => {
  if (!SUPABASE_URL || !KEY) {
    throw new Error("Missing env variables")
  }

  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

/**
 * Checks if a user is logged in.
 *
 * @returns A promise that resolves to a boolean indicating whether the user
 *          is logged in or not.
 */

export const isLoggedIn = async () => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) return true

  return false
}
