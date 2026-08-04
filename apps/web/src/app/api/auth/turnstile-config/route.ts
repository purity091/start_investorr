export const dynamic = 'force-dynamic';

export async function GET() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || '';
  const secretConfigured = Boolean(process.env.TURNSTILE_SECRET);

  return Response.json(
    {
      enabled: Boolean(siteKey && secretConfigured),
      siteKey: secretConfigured ? siteKey : '',
      siteKeyConfigured: Boolean(siteKey),
      secretConfigured,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
