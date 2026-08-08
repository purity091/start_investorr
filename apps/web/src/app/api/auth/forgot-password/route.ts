import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

type ForgotPasswordBody = {
  email?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ForgotPasswordBody | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', message: 'Email is required.' },
      { status: 400 }
    );
  }

  const origin = new URL(request.url).origin;
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    return NextResponse.json(
      { error: 'PASSWORD_RESET_FAILED', message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
