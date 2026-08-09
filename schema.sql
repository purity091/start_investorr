-- 1. Create Proven Projects Table
CREATE TABLE IF NOT EXISTS public.proven_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    location TEXT,
    business_model TEXT,
    
    -- Market Data
    target_audience TEXT,
    market_size TEXT,
    growth_rate TEXT,
    
    -- Financials
    initial_investment TEXT,
    valuation TEXT,
    
    -- Overview Texts
    problem_text TEXT,
    problem_impact TEXT,
    solution_text TEXT,
    
    -- Arrays
    revenue_streams TEXT[],
    tools TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.proven_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Canvas Table (For saving user business models)
CREATE TABLE IF NOT EXISTS public.business_canvas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- references auth.users in supabase
    project_title TEXT NOT NULL,
    is_public BOOLEAN DEFAULT false,
    share_token TEXT UNIQUE,
    published_at TIMESTAMPTZ,
    published_by UUID,
    sector_label TEXT,
    sector_group TEXT,
    opportunity_title TEXT,
    project_summary TEXT,
    current_stage TEXT DEFAULT 'discovery',
    readiness_score INTEGER DEFAULT 0,
    validation_score INTEGER DEFAULT 0,
    execution_score INTEGER DEFAULT 0,
    journey_progress INTEGER DEFAULT 0,
    canvas_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_snapshot_at TIMESTAMPTZ,
    schema_version INTEGER DEFAULT 1,
    row_version INTEGER DEFAULT 1,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Make the schema safe to run on an existing Supabase project where
-- business_canvas was created before the current columns were added.
ALTER TABLE public.business_canvas
    ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS published_by UUID,
    ADD COLUMN IF NOT EXISTS sector_label TEXT,
    ADD COLUMN IF NOT EXISTS sector_group TEXT,
    ADD COLUMN IF NOT EXISTS opportunity_title TEXT,
    ADD COLUMN IF NOT EXISTS project_summary TEXT,
    ADD COLUMN IF NOT EXISTS current_stage TEXT DEFAULT 'discovery',
    ADD COLUMN IF NOT EXISTS readiness_score INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS validation_score INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS execution_score INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS journey_progress INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS canvas_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS last_snapshot_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS schema_version INTEGER DEFAULT 1,
    ADD COLUMN IF NOT EXISTS row_version INTEGER DEFAULT 1,
    ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE TABLE IF NOT EXISTS public.business_canvas_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canvas_id UUID NOT NULL REFERENCES public.business_canvas(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    section_type TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (canvas_id, section_type)
);

CREATE TABLE IF NOT EXISTS public.business_canvas_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canvas_id UUID NOT NULL REFERENCES public.business_canvas(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    version INTEGER NOT NULL,
    snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (canvas_id, version)
);

CREATE TABLE IF NOT EXISTS public.project_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canvas_id UUID REFERENCES public.business_canvas(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    action TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    event_type TEXT NOT NULL,
    ip TEXT,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('success', 'info', 'warning', 'ai', 'system')),
    category TEXT NOT NULL DEFAULT 'system' CHECK (category IN ('projects', 'security', 'billing', 'system')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    read_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS business_canvas_user_updated_idx ON public.business_canvas (user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS business_canvas_user_active_updated_idx ON public.business_canvas (user_id, updated_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS business_canvas_created_idx ON public.business_canvas (created_at DESC);
CREATE INDEX IF NOT EXISTS business_canvas_user_stage_idx ON public.business_canvas (user_id, current_stage);
CREATE INDEX IF NOT EXISTS business_canvas_user_sector_idx ON public.business_canvas (user_id, sector_label);
CREATE INDEX IF NOT EXISTS business_canvas_sections_canvas_idx ON public.business_canvas_sections (canvas_id, section_type);
CREATE INDEX IF NOT EXISTS business_canvas_sections_user_idx ON public.business_canvas_sections (user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS business_canvas_versions_canvas_idx ON public.business_canvas_versions (canvas_id, version DESC);
CREATE INDEX IF NOT EXISTS business_canvas_public_idx ON public.business_canvas (is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS business_canvas_share_token_idx ON public.business_canvas (share_token) WHERE share_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS project_activity_canvas_idx ON public.project_activity (canvas_id, created_at DESC);
CREATE INDEX IF NOT EXISTS project_activity_user_idx ON public.project_activity (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS security_events_user_idx ON public.security_events (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_created_idx ON public.notifications (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_unread_idx ON public.notifications (user_id, created_at DESC) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS security_events_type_idx ON public.security_events (event_type, created_at DESC);

-- Turn on Row Level Security (RLS). Public reference data is read-only.
ALTER TABLE public.proven_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read proven projects" ON public.proven_projects;
CREATE POLICY "Public can read proven projects" ON public.proven_projects FOR SELECT USING (true);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read lessons" ON public.lessons;
CREATE POLICY "Public can read lessons" ON public.lessons FOR SELECT USING (true);

ALTER TABLE public.business_canvas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own or public canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can insert own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can update own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can delete own canvas" ON public.business_canvas;
CREATE POLICY "Users can read own or public canvas"
ON public.business_canvas FOR SELECT
USING (auth.uid() = user_id OR (is_public = true AND deleted_at IS NULL));

CREATE POLICY "Users can insert own canvas"
ON public.business_canvas FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own canvas"
ON public.business_canvas FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own canvas"
ON public.business_canvas FOR DELETE
USING (auth.uid() = user_id);

ALTER TABLE public.business_canvas_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can insert own canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can update own canvas sections" ON public.business_canvas_sections;
CREATE POLICY "Users can read own canvas sections"
ON public.business_canvas_sections FOR SELECT
USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
);

CREATE POLICY "Users can insert own canvas sections"
ON public.business_canvas_sections FOR INSERT
WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
);

CREATE POLICY "Users can update own canvas sections"
ON public.business_canvas_sections FOR UPDATE
USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
)
WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
);

ALTER TABLE public.business_canvas_versions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own canvas versions" ON public.business_canvas_versions;
DROP POLICY IF EXISTS "Users can insert own canvas versions" ON public.business_canvas_versions;
CREATE POLICY "Users can read own canvas versions"
ON public.business_canvas_versions FOR SELECT
USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
);

CREATE POLICY "Users can insert own canvas versions"
ON public.business_canvas_versions FOR INSERT
WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
);

ALTER TABLE public.project_activity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own project activity" ON public.project_activity;
DROP POLICY IF EXISTS "Users can insert own project activity" ON public.project_activity;
CREATE POLICY "Users can read own project activity"
ON public.project_activity FOR SELECT
USING (
    auth.uid() = user_id
    AND (
        canvas_id IS NULL
        OR EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
    )
);

CREATE POLICY "Users can insert own project activity"
ON public.project_activity FOR INSERT
WITH CHECK (
    auth.uid() = user_id
    AND (
        canvas_id IS NULL
        OR EXISTS (SELECT 1 FROM public.business_canvas bc WHERE bc.id = canvas_id AND bc.user_id = auth.uid())
    )
);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own security events" ON public.security_events;
DROP POLICY IF EXISTS "Users can insert own security events" ON public.security_events;
CREATE POLICY "Users can read own security events"
ON public.security_events FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own security events"
ON public.security_events FOR INSERT
WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can read own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;

CREATE POLICY "Users can read own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

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
    INSERT INTO public.notifications (user_id, type, category, title, message, link, metadata)
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

REVOKE ALL ON FUNCTION public.create_system_notification(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB)
FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_system_notification(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB)
TO service_role;

CREATE OR REPLACE FUNCTION public.notify_business_canvas_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.notifications (user_id, type, category, title, message, link, metadata)
    VALUES (
        NEW.user_id,
        'success',
        'projects',
        'تم إنشاء المشروع',
        FORMAT('تم إنشاء مشروع "%s" وأصبح جاهزاً لإضافة بيانات الدراسة.', NEW.project_title),
        FORMAT('/projects/%s/edit', NEW.id),
        jsonb_build_object('project_id', NEW.id)
    );

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS business_canvas_created_notification ON public.business_canvas;
CREATE TRIGGER business_canvas_created_notification
AFTER INSERT ON public.business_canvas
FOR EACH ROW
EXECUTE FUNCTION public.notify_business_canvas_created();
