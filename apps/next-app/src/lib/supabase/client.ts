"use client"
import { createBrowserClient } from "@supabase/ssr"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY!

/**
 * Creates a Supabase client that is safe to use on the client.
 *
 * @returns A Supabase client.
 */
export const createClient = () => {
  return createBrowserClient(SUPABASE_URL, KEY)
}

/**
 * Checks if a user is logged in.
 *
 * @returns A promise that resolves to a boolean indicating whether the user is
 *          logged in or not.
 */
export const isLoggedIn = async () => {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) return true

  return false
}
