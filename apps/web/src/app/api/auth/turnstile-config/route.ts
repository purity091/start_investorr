import { NextResponse } from 'next/server';

export async function GET() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  const secret = process.env.TURNSTILE_SECRET ?? '';

  return NextResponse.json({
    enabled: Boolean(siteKey && secret),
    siteKey,
    siteKeyConfigured: Boolean(siteKey),
    secretConfigured: Boolean(secret),
  });
}
