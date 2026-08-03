import { NextResponse, type NextRequest } from 'next/server';

const DEFAULT_MAX_BODY_BYTES = 32 * 1024;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type SecurityEvent = {
  eventType: string;
  request?: Request;
  userId?: string | null;
  metadata?: Record<string, unknown>;
};

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function logInternalError(context: string, error: unknown) {
  console.error(
    JSON.stringify({
      level: 'error',
      event: 'internal_error',
      context,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }),
  );
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export function logSecurityEvent({ eventType, request, userId, metadata }: SecurityEvent) {
  console.info(
    JSON.stringify({
      level: 'info',
      event: 'security_event',
      eventType,
      userId: userId ?? null,
      ip: request ? getClientIp(request) : undefined,
      userAgent: request?.headers.get('user-agent') ?? undefined,
      metadata: metadata ?? {},
      timestamp: new Date().toISOString(),
    }),
  );
}

export async function readJsonWithLimit<T>(
  request: Request,
  maxBytes = DEFAULT_MAX_BODY_BYTES,
): Promise<{ data: T | null; error: NextResponse | null }> {
  const contentLength = request.headers.get('content-length');

  if (contentLength && Number(contentLength) > maxBytes) {
    return { data: null, error: jsonError('Payload too large.', 413) };
  }

  const raw = await request.text();
  const size = new TextEncoder().encode(raw).byteLength;

  if (size > maxBytes) {
    return { data: null, error: jsonError('Payload too large.', 413) };
  }

  try {
    return { data: JSON.parse(raw) as T, error: null };
  } catch {
    return { data: null, error: jsonError('Invalid JSON payload.', 400) };
  }
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return null;

  const expectedOrigin = request.nextUrl.origin;
  if (origin !== expectedOrigin) {
    logSecurityEvent({
      eventType: 'CSRF_ORIGIN_DENIED',
      request,
      metadata: { origin, expectedOrigin },
    });
    return jsonError('Request not allowed.', 403);
  }

  return null;
}

export function checkRateLimit({ key, limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function isUuid(value: unknown) {
  return (
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}
