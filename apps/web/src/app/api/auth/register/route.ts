import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

type RegisterBody = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

const getAuthErrorCode = (message: string) => {
  if (/already registered|user already exists|already been registered/i.test(message)) {
    return 'USER_ALREADY_REGISTERED';
  }
  if (/password/i.test(message)) return 'WEAK_PASSWORD';
  return 'AUTH_REGISTER_FAILED';
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RegisterBody | null;
  const fullName = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', message: 'Valid email and password are required.' },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return NextResponse.json(
      { error: getAuthErrorCode(error.message), message: error.message },
      { status: 400 }
    );
  }

  if (data.user) {
    await supabase
      .from('profiles')
      .upsert(
        {
          id: data.user.id,
          full_name: fullName || null,
          email,
          role: 'user',
          status: 'active',
        },
        { onConflict: 'id' }
      );
  }

  return NextResponse.json({
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name ?? fullName,
        }
      : null,
    sessionCreated: Boolean(data.session),
  });
}
