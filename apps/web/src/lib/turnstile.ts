import 'server-only';

import { getClientIp, logInternalError, logSecurityEvent } from '@/lib/apiGuards';

type TurnstileSiteverifyResponse = {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
};

type VerifyTurnstileResult =
  | { ok: true; result: TurnstileSiteverifyResponse }
  | { ok: false; status: number; message: string; codes?: string[] };

export async function verifyTurnstileToken(
  request: Request,
  token: unknown,
): Promise<VerifyTurnstileResult> {
  if (typeof token !== 'string' || !token.trim()) {
    logSecurityEvent({
      eventType: 'TURNSTILE_MISSING_TOKEN',
      request,
    });
    return { ok: false, status: 403, message: 'Security verification is required.' };
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    logInternalError('turnstile_secret_missing', new Error('TURNSTILE_SECRET is not configured.'));
    return { ok: false, status: 500, message: 'Security verification is not configured.' };
  }

  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: getClientIp(request),
      }),
    });
  } catch (error) {
    logInternalError('turnstile_siteverify_network_error', error);
    return { ok: false, status: 403, message: 'Security verification failed.' };
  }

  if (!response.ok) {
    logInternalError('turnstile_siteverify_http_error', new Error(`siteverify ${response.status}`));
    return { ok: false, status: 403, message: 'Security verification failed.' };
  }

  let result: TurnstileSiteverifyResponse;
  try {
    result = (await response.json()) as TurnstileSiteverifyResponse;
  } catch (error) {
    logInternalError('turnstile_siteverify_json_error', error);
    return { ok: false, status: 403, message: 'Security verification failed.' };
  }

  if (!result.success) {
    logSecurityEvent({
      eventType: 'TURNSTILE_DENIED',
      request,
      metadata: {
        codes: result['error-codes'] ?? [],
        hostname: result.hostname,
        action: result.action,
      },
    });
    return {
      ok: false,
      status: 403,
      message: 'Security verification failed.',
      codes: result['error-codes'],
    };
  }

  return { ok: true, result };
}
