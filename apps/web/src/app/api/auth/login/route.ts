import { type NextRequest } from 'next/server';
import { assertSameOrigin, jsonError, readJsonWithLimit } from '@/lib/apiGuards';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { createClient } from '@/utils/supabase/server';
import { enforceAuthRateLimit } from '../authLimits';

type LoginBody = {
  email?: unknown;
  password?: unknown;
  turnstileToken?: unknown;
};

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const { data: body, error } = await readJsonWithLimit<LoginBody>(request, 8 * 1024);
  if (error) return error;

  const turnstile = await verifyTurnstileToken(request, body?.turnstileToken);
  if (turnstile.ok !== true) {
    return jsonError(turnstile.message, turnstile.status);
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password) {
    return jsonError('Invalid login request.', 400);
  }

  const rateLimitError = enforceAuthRateLimit(request, 'login', email);
  if (rateLimitError) return rateLimitError;

  const supabase = await createClient();
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

  if (authError) {
    return jsonError(authError.message, 401);
  }

  return Response.json({ ok: true });
}
