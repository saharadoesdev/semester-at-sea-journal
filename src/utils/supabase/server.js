import { createServerClient } from '@supabase/ssr'

// provides a dummy cookie handler to satisfy library's requirements
// without calling any dynamic functions (for static pages)
export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // A no-op cookie handler for static pages
        getAll() {
          return []
        },
        setAll(cookiesToSet) {
          // No-op
        },
      },
    }
  )
}