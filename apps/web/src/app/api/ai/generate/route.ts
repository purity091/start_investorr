import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const AI_DISABLED_RESPONSE = {
  error: 'AI features are currently disabled.',
  code: 'AI_FEATURES_DISABLED',
};

export async function POST() {
  return NextResponse.json(AI_DISABLED_RESPONSE, { status: 410 });
}

export async function GET() {
  return NextResponse.json(AI_DISABLED_RESPONSE, { status: 410 });
}

