-- Secure RLS baseline for user-owned data.
-- Apply this after schema.sql and workspace/profile migrations.

-- Required ownership/shared columns.
ALTER TABLE public.business_canvas
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS published_by UUID,
  ADD COLUMN IF NOT EXISTS row_version INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS business_canvas_share_token_idx
  ON public.business_canvas (share_token)
  WHERE share_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS business_canvas_user_active_updated_idx
  ON public.business_canvas (user_id, updated_at DESC)
  WHERE deleted_at IS NULL;

-- Audit log for sensitive project actions.
CREATE TABLE IF NOT EXISTS public.project_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id UUID REFERENCES public.business_canvas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_activity_canvas_idx
  ON public.project_activity (canvas_id, created_at DESC);

CREATE INDEX IF NOT EXISTS project_activity_user_idx
  ON public.project_activity (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  event_type TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS security_events_user_idx
  ON public.security_events (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS security_events_type_idx
  ON public.security_events (event_type, created_at DESC);

-- Public reference data: readable by everyone, not writable from the anon client.
ALTER TABLE public.proven_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on projects" ON public.proven_projects;
DROP POLICY IF EXISTS "Allow public insert on projects" ON public.proven_projects;
DROP POLICY IF EXISTS "Public can read proven projects" ON public.proven_projects;
CREATE POLICY "Public can read proven projects"
ON public.proven_projects
FOR SELECT
USING (true);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read on lessons" ON public.lessons;
DROP POLICY IF EXISTS "Allow public insert on lessons" ON public.lessons;
DROP POLICY IF EXISTS "Public can read lessons" ON public.lessons;
CREATE POLICY "Public can read lessons"
ON public.lessons
FOR SELECT
USING (true);

-- User-owned project/canvas rows.
ALTER TABLE public.business_canvas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Allow public insert on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Allow public update on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only read their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only insert their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only update their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only delete their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Anyone can read public canvases" ON public.business_canvas;
DROP POLICY IF EXISTS "Anyone can read public canvases or own canvases" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can read own or public canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can insert own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can update own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can delete own canvas" ON public.business_canvas;

CREATE POLICY "Users can read own or public canvas"
ON public.business_canvas
FOR SELECT
USING (auth.uid() = user_id OR (is_public = true AND deleted_at IS NULL));

CREATE POLICY "Users can insert own canvas"
ON public.business_canvas
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own canvas"
ON public.business_canvas
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own canvas"
ON public.business_canvas
FOR DELETE
USING (auth.uid() = user_id);

-- Smaller workspace sections inherit ownership through user_id and parent canvas.
ALTER TABLE public.business_canvas_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Allow public insert on canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Allow public update on canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can read own canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can insert own canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can update own canvas sections" ON public.business_canvas_sections;
DROP POLICY IF EXISTS "Users can delete own canvas sections" ON public.business_canvas_sections;

CREATE POLICY "Users can read own canvas sections"
ON public.business_canvas_sections
FOR SELECT
USING (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert own canvas sections"
ON public.business_canvas_sections
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update own canvas sections"
ON public.business_canvas_sections
FOR UPDATE
USING (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
)
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own canvas sections"
ON public.business_canvas_sections
FOR DELETE
USING (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

-- Version history is user-private.
ALTER TABLE public.business_canvas_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on canvas versions" ON public.business_canvas_versions;
DROP POLICY IF EXISTS "Allow public insert on canvas versions" ON public.business_canvas_versions;
DROP POLICY IF EXISTS "Users can read own canvas versions" ON public.business_canvas_versions;
DROP POLICY IF EXISTS "Users can insert own canvas versions" ON public.business_canvas_versions;

CREATE POLICY "Users can read own canvas versions"
ON public.business_canvas_versions
FOR SELECT
USING (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert own canvas versions"
ON public.business_canvas_versions
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1
    FROM public.business_canvas bc
    WHERE bc.id = canvas_id
      AND bc.user_id = auth.uid()
  )
);

-- Activity logs: users can read/insert their own project activity only.
ALTER TABLE public.project_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own project activity" ON public.project_activity;
CREATE POLICY "Users can read own project activity"
ON public.project_activity
FOR SELECT
USING (
  auth.uid() = user_id
  AND (
    canvas_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.business_canvas bc
      WHERE bc.id = canvas_id
        AND bc.user_id = auth.uid()
    )
  )
);

DROP POLICY IF EXISTS "Users can insert own project activity" ON public.project_activity;
CREATE POLICY "Users can insert own project activity"
ON public.project_activity
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND (
    canvas_id IS NULL
    OR EXISTS (
      SELECT 1
      FROM public.business_canvas bc
      WHERE bc.id = canvas_id
        AND bc.user_id = auth.uid()
    )
  )
);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own security events" ON public.security_events;
CREATE POLICY "Users can read own security events"
ON public.security_events
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own security events" ON public.security_events;
CREATE POLICY "Users can insert own security events"
ON public.security_events
FOR INSERT
WITH CHECK (auth.uid() = user_id);
