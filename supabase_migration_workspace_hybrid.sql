-- Hybrid workspace storage migration.
-- Keeps canvas_data for backward compatibility while extracting searchable metadata
-- and preparing smaller section/version tables for future patch updates.

ALTER TABLE public.business_canvas
  ADD COLUMN IF NOT EXISTS sector_label TEXT,
  ADD COLUMN IF NOT EXISTS sector_group TEXT,
  ADD COLUMN IF NOT EXISTS opportunity_title TEXT,
  ADD COLUMN IF NOT EXISTS project_summary TEXT,
  ADD COLUMN IF NOT EXISTS current_stage TEXT DEFAULT 'discovery',
  ADD COLUMN IF NOT EXISTS readiness_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS validation_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS execution_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS journey_progress INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_snapshot_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS schema_version INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS row_version INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS business_canvas_user_updated_idx
  ON public.business_canvas (user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS business_canvas_user_active_updated_idx
  ON public.business_canvas (user_id, updated_at DESC)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS business_canvas_created_idx
  ON public.business_canvas (created_at DESC);

CREATE INDEX IF NOT EXISTS business_canvas_user_stage_idx
  ON public.business_canvas (user_id, current_stage);

CREATE INDEX IF NOT EXISTS business_canvas_user_sector_idx
  ON public.business_canvas (user_id, sector_label);

CREATE INDEX IF NOT EXISTS business_canvas_public_idx
  ON public.business_canvas (is_public)
  WHERE is_public = true;

-- Backfill metadata from existing JSONB payloads.
UPDATE public.business_canvas
SET
  sector_label = COALESCE(sector_label, canvas_data #>> '{profile,sectorLabel}'),
  sector_group = COALESCE(sector_group, canvas_data #>> '{profile,sectorGroup}'),
  opportunity_title = COALESCE(opportunity_title, canvas_data #>> '{profile,opportunityTitle}'),
  project_summary = COALESCE(project_summary, canvas_data #>> '{profile,summary}'),
  current_stage = COALESCE(current_stage, canvas_data #>> '{currentStage}', 'discovery'),
  readiness_score = COALESCE(readiness_score, NULLIF(canvas_data #>> '{metrics,readinessScore}', '')::INTEGER, 0),
  validation_score = COALESCE(validation_score, NULLIF(canvas_data #>> '{metrics,validationScore}', '')::INTEGER, 0),
  execution_score = COALESCE(execution_score, NULLIF(canvas_data #>> '{metrics,executionScore}', '')::INTEGER, 0),
  journey_progress = COALESCE(journey_progress, NULLIF(canvas_data #>> '{metrics,journeyProgress}', '')::INTEGER, 0)
WHERE canvas_data IS NOT NULL;

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

CREATE INDEX IF NOT EXISTS business_canvas_sections_canvas_idx
  ON public.business_canvas_sections (canvas_id, section_type);

CREATE INDEX IF NOT EXISTS business_canvas_sections_user_idx
  ON public.business_canvas_sections (user_id, updated_at DESC);

ALTER TABLE public.business_canvas_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own canvas sections" ON public.business_canvas_sections;
CREATE POLICY "Users can read own canvas sections"
ON public.business_canvas_sections
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own canvas sections" ON public.business_canvas_sections;
CREATE POLICY "Users can insert own canvas sections"
ON public.business_canvas_sections
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own canvas sections" ON public.business_canvas_sections;
CREATE POLICY "Users can update own canvas sections"
ON public.business_canvas_sections
FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own canvas sections" ON public.business_canvas_sections;
CREATE POLICY "Users can delete own canvas sections"
ON public.business_canvas_sections
FOR DELETE
USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.business_canvas_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id UUID NOT NULL REFERENCES public.business_canvas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  version INTEGER NOT NULL,
  snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (canvas_id, version)
);

CREATE INDEX IF NOT EXISTS business_canvas_versions_canvas_idx
  ON public.business_canvas_versions (canvas_id, version DESC);

ALTER TABLE public.business_canvas_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own canvas versions" ON public.business_canvas_versions;
CREATE POLICY "Users can read own canvas versions"
ON public.business_canvas_versions
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own canvas versions" ON public.business_canvas_versions;
CREATE POLICY "Users can insert own canvas versions"
ON public.business_canvas_versions
FOR INSERT
WITH CHECK (auth.uid() = user_id);
