import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Intercambio PKCE (magic link, OAuth) → sesión en cookies.
 * En Supabase: Authentication → URL Configuration → Redirect URLs:
 * `${NEXT_PUBLIC_APP_URL}/auth/callback`
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = requestUrl.searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth", request.url));
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(error.message)}`,
        request.url
      )
    );
  }

  return response;
}
