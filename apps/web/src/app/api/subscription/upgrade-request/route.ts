import { NextResponse } from 'next/server';

import {
  getSubscriptionPlan,
  isHigherSubscriptionPlan,
  normalizeSubscriptionPlanId,
} from '@/lib/subscriptionPlans';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

const MAX_RECEIPT_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
]);

const sanitizeFileName = (name: string) =>
  name
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 90) || 'receipt';

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: 'UNAUTHENTICATED' }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'INVALID_FORM_DATA' }, { status: 400 });
  }

  const targetPlan = normalizeSubscriptionPlanId(formData.get('targetPlan'));
  const receipt = formData.get('receipt');

  if (!(receipt instanceof File)) {
    return NextResponse.json({ error: 'RECEIPT_REQUIRED' }, { status: 400 });
  }

  if (receipt.size <= 0 || receipt.size > MAX_RECEIPT_SIZE_BYTES) {
    return NextResponse.json({ error: 'INVALID_RECEIPT_SIZE' }, { status: 400 });
  }

  if (!ALLOWED_RECEIPT_TYPES.has(receipt.type)) {
    return NextResponse.json({ error: 'INVALID_RECEIPT_TYPE' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('subscription_plan')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json({ error: 'PROFILE_LOOKUP_FAILED' }, { status: 500 });
  }

  const currentPlan = getSubscriptionPlan(profile?.subscription_plan);
  if (!isHigherSubscriptionPlan({ currentPlanId: currentPlan.id, targetPlanId: targetPlan })) {
    return NextResponse.json({ error: 'TARGET_PLAN_NOT_HIGHER' }, { status: 400 });
  }

  const { data: pendingRequest, error: pendingError } = await supabase
    .from('subscription_upgrade_requests')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .maybeSingle();

  if (pendingError) {
    return NextResponse.json({ error: 'PENDING_REQUEST_LOOKUP_FAILED' }, { status: 500 });
  }

  if (pendingRequest) {
    return NextResponse.json({ error: 'PENDING_REQUEST_EXISTS' }, { status: 409 });
  }

  const extension = receipt.name.includes('.') ? receipt.name.split('.').pop() : 'bin';
  const safeName = sanitizeFileName(receipt.name);
  const receiptPath = `${user.id}/${Date.now()}-${crypto.randomUUID()}-${safeName}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from('subscription-receipts')
    .upload(receiptPath, receipt, {
      contentType: receipt.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: 'RECEIPT_UPLOAD_FAILED', message: uploadError.message },
      { status: 500 }
    );
  }

  const { data, error: insertError } = await supabase
    .from('subscription_upgrade_requests')
    .insert({
      user_id: user.id,
      current_plan: currentPlan.id,
      requested_plan: targetPlan,
      status: 'pending',
      receipt_path: receiptPath,
      receipt_file_name: receipt.name,
      receipt_file_type: receipt.type,
      receipt_file_size: receipt.size,
    })
    .select('id, requested_plan, status, created_at')
    .single();

  if (insertError) {
    await supabase.storage.from('subscription-receipts').remove([receiptPath]);
    return NextResponse.json(
      { error: 'UPGRADE_REQUEST_CREATE_FAILED', message: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ request: data });
}
