-- System notifications for user-facing alerts.
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('success', 'info', 'warning', 'ai', 'system')),
  category TEXT NOT NULL DEFAULT 'system' CHECK (category IN ('projects', 'security', 'billing', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_created_idx
  ON public.notifications (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx
  ON public.notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
CREATE POLICY "Users can read own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
CREATE POLICY "Users can delete own notifications"
ON public.notifications FOR DELETE
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.create_system_notification(
  target_user_id UUID,
  notification_type TEXT,
  notification_category TEXT,
  notification_title TEXT,
  notification_message TEXT,
  notification_link TEXT DEFAULT NULL,
  notification_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  created_notification_id UUID;
BEGIN
  INSERT INTO public.notifications (
    user_id,
    type,
    category,
    title,
    message,
    link,
    metadata
  )
  VALUES (
    target_user_id,
    notification_type,
    notification_category,
    notification_title,
    notification_message,
    notification_link,
    COALESCE(notification_metadata, '{}'::jsonb)
  )
  RETURNING id INTO created_notification_id;

  RETURN created_notification_id;
END;
$$;
