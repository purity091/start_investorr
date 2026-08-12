import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getSubscriptionPlan } from '@/lib/subscriptionPlans';
import {
  assertSameOrigin,
  getClientIp,
  isUuid,
  jsonError,
  logInternalError,
  logSecurityEvent,
  readJsonWithLimit,
} from '@/lib/apiGuards';

type PublishRequestBody = {
  projectId?: unknown;
  isPublic?: unknown;
};

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  const { data: body, error: bodyError } = await readJsonWithLimit<PublishRequestBody>(request, 8 * 1024);

  if (bodyError) {
    return bodyError;
  }

  const { projectId, isPublic } = body ?? {};

  if (!isUuid(projectId)) {
    logSecurityEvent({
      eventType: 'PROJECT_PUBLISH_INVALID_ID',
      request,
      metadata: { isPublic },
    });
    return jsonError('معرّف المشروع مطلوب.', 400);
  }

  if (typeof isPublic !== 'boolean') {
    return jsonError('حالة المشاركة غير صالحة.', 400);
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return jsonError('يجب تسجيل الدخول أولاً.', 401);
  }

  if (isPublic) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_plan')
      .eq('id', user.id)
      .maybeSingle();
    if (profileError) {
      logInternalError('Failed to read subscription plan before publishing', profileError);
      return jsonError('تعذر التحقق من صلاحية المشاركة حالياً.', 500);
    }
    if (getSubscriptionPlan(profile?.subscription_plan).id === 'starter') {
      return jsonError('مشاركة خطة العمل متاحة في باقتي مؤسس وقائد فقط.', 403);
    }
  }

  const now = new Date().toISOString();
  const shareToken = isPublic ? crypto.randomUUID().replaceAll('-', '') : null;
  const { data, error } = await supabase
    .from('business_canvas')
    .update({
      is_public: isPublic,
      share_token: shareToken,
      published_at: isPublic ? now : null,
      published_by: isPublic ? user.id : null,
      updated_at: now,
    })
    .eq('id', projectId)
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .select('id, is_public, share_token, published_at')
    .maybeSingle();

  if (error) {
    logInternalError('Failed to update project publish status', error);
    return jsonError('حدث خطأ أثناء تحديث المشاركة. حاول لاحقاً.', 500);
  }

  if (!data) {
    return jsonError('لم يتم العثور على المشروع.', 404);
  }

  const { error: activityError } = await supabase.from('project_activity').insert({
    canvas_id: projectId,
    user_id: user.id,
    action: isPublic ? 'publish_project' : 'unpublish_project',
    metadata: { is_public: isPublic },
  });

  if (activityError) {
    console.warn('Failed to write project publish audit log:', activityError.message);
  }

  const { error: securityEventError } = await supabase.from('security_events').insert({
    user_id: user.id,
    event_type: isPublic ? 'PROJECT_SHARED' : 'PROJECT_UNSHARED',
    ip: getClientIp(request),
    user_agent: request.headers.get('user-agent'),
    metadata: { project_id: projectId },
  });

  if (securityEventError) {
    logInternalError('Failed to write project security event', securityEventError);
  }

  logSecurityEvent({
    eventType: isPublic ? 'PROJECT_SHARED' : 'PROJECT_UNSHARED',
    request,
    userId: user.id,
    metadata: { projectId },
  });

  return NextResponse.json({ project: data, shareToken: data.share_token });
}
