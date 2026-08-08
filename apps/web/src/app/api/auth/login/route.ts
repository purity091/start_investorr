import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

type LoginBody = {
  email?: unknown;
  password?: unknown;
};

const getAuthErrorCode = (message: string) => {
  if (/invalid login credentials/i.test(message)) return 'INVALID_CREDENTIALS';
  if (/email not confirmed/i.test(message)) return 'EMAIL_NOT_CONFIRMED';
  return 'AUTH_LOGIN_FAILED';
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginBody | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', message: 'Email and password are required.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json(
      { error: getAuthErrorCode(error.message), message: error.message },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name ?? null,
        }
      : null,
  });
}
