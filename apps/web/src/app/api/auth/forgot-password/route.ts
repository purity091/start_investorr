import { type NextRequest } from 'next/server';
import { assertSameOrigin, jsonError, readJsonWithLimit } from '@/lib/apiGuards';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { createClient } from '@/utils/supabase/server';
import { enforceAuthRateLimit } from '../authLimits';

type ForgotPasswordBody = {
  email?: unknown;
  turnstileToken?: unknown;
};

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const { data: body, error } = await readJsonWithLimit<ForgotPasswordBody>(request, 8 * 1024);
  if (error) return error;

  const turnstile = await verifyTurnstileToken(request, body?.turnstileToken);
  if (turnstile.ok !== true) {
    return jsonError(turnstile.message, turnstile.status);
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email) {
    return jsonError('Invalid password recovery request.', 400);
  }

  const rateLimitError = enforceAuthRateLimit(request, 'forgot_password', email);
  if (rateLimitError) return rateLimitError;

  const supabase = await createClient();
  const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${request.nextUrl.origin}/reset-password`,
  });

  if (authError) {
    return jsonError(authError.message, 400);
  }

  return Response.json({ ok: true });
}
