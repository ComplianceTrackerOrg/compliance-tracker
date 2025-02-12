import { SupabaseClient, User } from "@supabase/supabase-js"

/**
 * Retrieves the Supabase user associated with the given authenticated user.
 *
 * @param {SupabaseClient} client - The Supabase client instance.
 * @param {User} user - The authenticated Supabase user.
 * @returns The custom user, null if not found.
 */
export const getSupabaseUser = async (client: SupabaseClient, user: User) => {
  const { data: superbaseUser } = await client
    .from("user")
    .select("id")
    .eq("auth_id", user.id)
    .single()

  return superbaseUser
}
