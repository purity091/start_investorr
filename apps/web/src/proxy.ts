import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = [
  '/home',
  '/workspace',
  '/editor',
  '/projects',
  '/my-plans',
  '/new-plan',
  '/bmc',
  '/notifications',
  '/tasks',
  '/first-90-days',
  '/financial-calculator',
  '/subscriber-hub',
  '/hackathon',
  '/admin-dashboard',
  '/users-management',
  '/admin-plans',
  '/admin-analytics',
  '/admin-security',
  '/profile',
  '/settings',
  '/customer-dashboard',
  '/customer-projects',
  '/customer-account',
  '/customer-activity',
  '/customer-support',
  '/customer-subscription',
  '/customer-usage',
  '/brand-identity',
  '/market-discovery',
  '/problem-engine',
  '/saved-market-items',
  '/discovery-center',
  '/company-deep-dive',
  '/strategic-dashboard',
  '/unicorn-benchmark',
  '/project-ideas',
  '/saas-ideas',
  '/micro-saas-ideas',
  '/proven-projects',
  '/failed-projects',
];

const hasSupabaseAuthCookie = (request: NextRequest) =>
  request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith('sb-') && Boolean(cookie.value));

const base64UrlToBytes = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
};

const base64UrlToString = (value: string) =>
  new TextDecoder().decode(base64UrlToBytes(value));

const decodeCookieValue = (value: string) => {
  const decoded = decodeURIComponent(value);

  if (!decoded.startsWith('base64-')) {
    return decoded;
  }

  try {
    return atob(decoded.slice('base64-'.length));
  } catch {
    return decoded;
  }
};

const extractAccessToken = (request: NextRequest) => {
  const groupedCookies = new Map<string, Array<{ index: number; value: string }>>();

  request.cookies
    .getAll()
    .filter((cookie) => cookie.name.startsWith('sb-') && Boolean(cookie.value))
    .forEach((cookie) => {
      const chunkMatch = cookie.name.match(/^(.*)\.(\d+)$/);
      const groupName = chunkMatch?.[1] ?? cookie.name;
      const index = chunkMatch?.[2] ? Number(chunkMatch[2]) : 0;
      const group = groupedCookies.get(groupName) ?? [];

      group.push({ index, value: cookie.value });
      groupedCookies.set(groupName, group);
    });

  for (const chunks of groupedCookies.values()) {
    const rawValue = chunks
      .sort((a, b) => a.index - b.index)
      .map((chunk) => chunk.value)
      .join('');
    const decodedValue = decodeCookieValue(rawValue);
    const tokenMatch = decodedValue.match(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);

    if (tokenMatch) {
      return tokenMatch[0];
    }
  }

  return null;
};

const isJwtTimeValid = (token: string) => {
  try {
    const [, payload] = token.split('.');
    const claims = JSON.parse(base64UrlToString(payload)) as { exp?: number; nbf?: number };
    const now = Math.floor(Date.now() / 1000);

    if (claims.nbf && claims.nbf > now) return false;
    if (claims.exp && claims.exp <= now) return false;

    return true;
  } catch {
    return false;
  }
};

const isJwtSignatureValid = async (token: string) => {
  const secret = process.env.SUPABASE_JWT_SECRET;

  if (!secret) {
    return true;
  }

  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  return crypto.subtle.verify(
    'HMAC',
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(`${header}.${payload}`)
  );
};

const hasUsableLocalSession = async (request: NextRequest) => {
  if (!hasSupabaseAuthCookie(request)) {
    return false;
  }

  const accessToken = extractAccessToken(request);

  if (!accessToken) {
    return false;
  }

  return isJwtTimeValid(accessToken) && isJwtSignatureValid(accessToken);
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const hasLocalSession = await hasUsableLocalSession(request);

  if (isProtectedRoute && !hasLocalSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '';
    url.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/home',
    '/home/:path*',
    '/workspace',
    '/workspace/:path*',
    '/editor',
    '/editor/:path*',
    '/projects/:path*',
    '/my-plans',
    '/my-plans/:path*',
    '/new-plan',
    '/new-plan/:path*',
    '/new-plan-pro',
    '/new-plan-pro/:path*',
    '/new-plan-family',
    '/new-plan-family/:path*',
    '/new-plan-bmc',
    '/new-plan-bmc/:path*',
    '/new-plan-mit24',
    '/new-plan-mit24/:path*',
    '/new-plan-lean',
    '/new-plan-lean/:path*',
    '/bmc',
    '/bmc/:path*',
    '/notifications',
    '/notifications/:path*',
    '/tasks',
    '/tasks/:path*',
    '/first-90-days',
    '/first-90-days/:path*',
    '/financial-calculator',
    '/financial-calculator/:path*',
    '/subscriber-hub',
    '/subscriber-hub/:path*',
    '/hackathon',
    '/hackathon/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/users-management',
    '/users-management/:path*',
    '/admin-plans',
    '/admin-plans/:path*',
    '/admin-analytics',
    '/admin-analytics/:path*',
    '/admin-security',
    '/admin-security/:path*',
    '/profile',
    '/profile/:path*',
    '/settings',
    '/settings/:path*',
    '/customer-dashboard',
    '/customer-dashboard/:path*',
    '/customer-projects',
    '/customer-projects/:path*',
    '/customer-account',
    '/customer-account/:path*',
    '/customer-activity',
    '/customer-activity/:path*',
    '/customer-support',
    '/customer-support/:path*',
    '/customer-subscription',
    '/customer-subscription/:path*',
    '/customer-usage',
    '/customer-usage/:path*',
    '/brand-identity',
    '/brand-identity/:path*',
    '/market-discovery',
    '/market-discovery/:path*',
    '/problem-engine',
    '/problem-engine/:path*',
    '/saved-market-items',
    '/saved-market-items/:path*',
    '/discovery-center',
    '/discovery-center/:path*',
    '/company-deep-dive',
    '/company-deep-dive/:path*',
    '/strategic-dashboard',
    '/strategic-dashboard/:path*',
    '/unicorn-benchmark',
    '/unicorn-benchmark/:path*',
    '/project-ideas',
    '/project-ideas/:path*',
    '/saas-ideas',
    '/saas-ideas/:path*',
    '/micro-saas-ideas',
    '/micro-saas-ideas/:path*',
    '/proven-projects',
    '/proven-projects/:path*',
    '/failed-projects',
    '/failed-projects/:path*',
  ],
};
