import { checkRateLimit, getClientIp, jsonError, logSecurityEvent } from '@/lib/apiGuards';

const ACTION_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  login: { limit: 5, windowMs: 10 * 60 * 1000 },
  register: { limit: 3, windowMs: 30 * 60 * 1000 },
  forgot_password: { limit: 3, windowMs: 30 * 60 * 1000 },
};

export function enforceAuthRateLimit(request: Request, action: keyof typeof ACTION_LIMITS, email: string) {
  const policy = ACTION_LIMITS[action];
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

  return null;
}
