-- Bank-transfer based subscription upgrade requests.

CREATE TABLE IF NOT EXISTS public.subscription_upgrade_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_plan TEXT NOT NULL CHECK (current_plan IN ('starter', 'founder', 'leader')),
  requested_plan TEXT NOT NULL CHECK (requested_plan IN ('starter', 'founder', 'leader')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  receipt_path TEXT NOT NULL,
  receipt_file_name TEXT NOT NULL,
  receipt_file_type TEXT,
  receipt_file_size INTEGER,
  reviewer_id UUID,
  reviewed_at TIMESTAMPTZ,
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (
    CASE current_plan
      WHEN 'starter' THEN 0
      WHEN 'founder' THEN 1
      WHEN 'leader' THEN 2
      ELSE 0
    END
    <
    CASE requested_plan
      WHEN 'starter' THEN 0
      WHEN 'founder' THEN 1
      WHEN 'leader' THEN 2
      ELSE 0
    END
  )
);

CREATE INDEX IF NOT EXISTS subscription_upgrade_requests_user_created_idx
  ON public.subscription_upgrade_requests (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS subscription_upgrade_requests_status_created_idx
  ON public.subscription_upgrade_requests (status, created_at DESC);

ALTER TABLE public.subscription_upgrade_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own upgrade requests" ON public.subscription_upgrade_requests;
CREATE POLICY "Users can read own upgrade requests"
ON public.subscription_upgrade_requests FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own pending upgrade requests" ON public.subscription_upgrade_requests;
CREATE POLICY "Users can create own pending upgrade requests"
ON public.subscription_upgrade_requests FOR INSERT
WITH CHECK (auth.uid() = user_id AND status = 'pending');

DROP POLICY IF EXISTS "Admins can read upgrade requests" ON public.subscription_upgrade_requests;
CREATE POLICY "Admins can read upgrade requests"
ON public.subscription_upgrade_requests FOR SELECT
USING (public.get_current_profile_role() = 'admin');

DROP POLICY IF EXISTS "Admins can update upgrade requests" ON public.subscription_upgrade_requests;
CREATE POLICY "Admins can update upgrade requests"
ON public.subscription_upgrade_requests FOR UPDATE
USING (public.get_current_profile_role() = 'admin')
WITH CHECK (public.get_current_profile_role() = 'admin');

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'subscription-receipts',
  'subscription-receipts',
  false,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::TEXT[]
)
ON CONFLICT (id) DO UPDATE
SET
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']::TEXT[];

DROP POLICY IF EXISTS "Users can upload own subscription receipts" ON storage.objects;
CREATE POLICY "Users can upload own subscription receipts"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'subscription-receipts'
  AND auth.uid()::TEXT = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Users can read own subscription receipts" ON storage.objects;
CREATE POLICY "Users can read own subscription receipts"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'subscription-receipts'
  AND auth.uid()::TEXT = (storage.foldername(name))[1]
);

DROP POLICY IF EXISTS "Admins can read subscription receipts" ON storage.objects;
CREATE POLICY "Admins can read subscription receipts"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'subscription-receipts'
  AND public.get_current_profile_role() = 'admin'
);
