import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () =>
         cookieStore.getAll().map((c) => ({
            name: c.name,
            value: c.value,
          })),
        setAll: () => {
          // We leave this blank because our middleware itself
          // will re-emit any Set-Cookie headers via NextResponse.
        },
      },
    }
  )
}