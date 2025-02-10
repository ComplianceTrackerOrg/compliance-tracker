"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

const AUTH_CALLBACK_URL = process.env.AUTH_CALLBACK!

export const signInWithGithub = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: AUTH_CALLBACK_URL,
    },
  })

  if (error) {
    throw new Error("Error signing in: " + error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export const signOut = async () => {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error("Error signing out: " + error.message)
  }

  redirect("/login")
}
