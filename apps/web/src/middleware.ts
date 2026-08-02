import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Quick check for Supabase auth cookie presence to avoid redundant network calls
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith('sb-') && c.value);

  const PROTECTED_ROUTES = [
    '/workspace',
    '/editor',
    '/my-plans',
    '/profile',
    '/settings',
    '/customer-dashboard',
    '/customer-projects',
    '/customer-account',
    '/market-discovery',
    '/problem-engine',
    '/strategic-dashboard',
  ];

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 1. Unauthenticated user accessing protected route: redirect immediately without hitting API rate limits
  if (isProtectedRoute && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Unauthenticated user accessing login page: render immediately
  if (pathname.startsWith('/login') && !hasAuthCookie) {
    return NextResponse.next();
  }

  // 3. Only verify with Supabase server when auth cookie exists
  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect unauthenticated users away from protected routes
    if (isProtectedRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from the login page
    if (pathname.startsWith('/login') && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/home';
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.warn('Supabase auth check rate-limited or unavailable:', err);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/login',
    '/workspace/:path*',
    '/editor/:path*',
    '/my-plans/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/customer-dashboard/:path*',
    '/customer-projects/:path*',
    '/customer-account/:path*',
    '/market-discovery/:path*',
    '/problem-engine/:path*',
    '/strategic-dashboard/:path*',
  ],
};
