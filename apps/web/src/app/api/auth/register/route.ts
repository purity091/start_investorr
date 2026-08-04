import { type NextRequest } from 'next/server';
import { assertSameOrigin, jsonError, readJsonWithLimit } from '@/lib/apiGuards';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { createClient } from '@/utils/supabase/server';
import { enforceAuthRateLimit } from '../authLimits';

type RegisterBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
  turnstileToken?: unknown;
};

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const { data: body, error } = await readJsonWithLimit<RegisterBody>(request, 8 * 1024);
  if (error) return error;

  const turnstile = await verifyTurnstileToken(request, body?.turnstileToken);
  if (turnstile.ok !== true) {
    return jsonError(turnstile.message, turnstile.status);
  }

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!name || !email || password.length < 6) {
    return jsonError('Invalid registration request.', 400);
  }

  const rateLimitError = enforceAuthRateLimit(request, 'register', email);
  if (rateLimitError) return rateLimitError;

  const supabase = await createClient();
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: request.nextUrl.origin,
    },
  });

  if (authError) {
    return jsonError(authError.message, 400);
  }

  return Response.json({ ok: true });
}
