import { type NextRequest } from 'next/server';
import {
  assertSameOrigin,
  checkRateLimit,
  getClientIp,
  jsonError,
  logSecurityEvent,
  readJsonWithLimit,
} from '@/lib/apiGuards';

type AuthRateLimitBody = {
  action?: unknown;
  email?: unknown;
};

const ACTION_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  login: { limit: 5, windowMs: 10 * 60 * 1000 },
  register: { limit: 3, windowMs: 30 * 60 * 1000 },
  forgot_password: { limit: 3, windowMs: 30 * 60 * 1000 },
};

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  const { data: body, error } = await readJsonWithLimit<AuthRateLimitBody>(request, 4 * 1024);
  if (error) {
    return error;
  }

  const action = typeof body?.action === 'string' ? body.action : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const policy = ACTION_LIMITS[action];

  if (!policy || !email) {
    logSecurityEvent({
      eventType: 'AUTH_RATE_LIMIT_INVALID_REQUEST',
      request,
      metadata: { action },
    });
    return jsonError('Invalid request.', 400);
  }

  const ip = getClientIp(request);
  const ipLimit = checkRateLimit({
    key: `auth:${action}:ip:${ip}`,
    ...policy,
  });
  const emailLimit = checkRateLimit({
    key: `auth:${action}:email:${email}`,
    ...policy,
  });

  if (!ipLimit.allowed || !emailLimit.allowed) {
    logSecurityEvent({
      eventType: 'AUTH_RATE_LIMIT_BLOCKED',
      request,
      metadata: {
        action,
        retryAfterSeconds: Math.max(ipLimit.retryAfterSeconds, emailLimit.retryAfterSeconds),
      },
    });
    return jsonError('Too many attempts. Try later.', 429);
  }

  logSecurityEvent({
    eventType: 'AUTH_RATE_LIMIT_ALLOWED',
    request,
    metadata: { action },
  });

  return Response.json({ ok: true });
}
