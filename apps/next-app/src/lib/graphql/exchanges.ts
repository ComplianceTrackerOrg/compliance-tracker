import {
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "@urql/next"

const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string

export const ssr = ssrExchange({
  isClient: typeof window === "undefined",
})

export const initClient = () => {
  return (url: string) => {
    return createClient({
      url,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: () => {
        return {
          headers: {
            "Content-Type": "application/json",
            apiKey: API_KEY,
          },
        }
      },
    })
  }
}
