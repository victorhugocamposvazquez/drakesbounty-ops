import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isStaffEmail } from "@/lib/auth/staff";

const publicPaths = ["/login", "/auth/callback", "/auth/signout"];

function isPublicPath(pathname: string) {
  return publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  if (!user) {
    if (isPublicPath(path)) {
      return response;
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isStaffEmail(user.email)) {
    await supabase.auth.signOut();
    const denied = new URL("/login", request.url);
    denied.searchParams.set("error", "not_staff");
    return NextResponse.redirect(denied);
  }

  if (path === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
