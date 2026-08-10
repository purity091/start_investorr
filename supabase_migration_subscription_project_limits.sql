-- Enforce project creation limits by the user's selected package.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'starter'
    CHECK (subscription_plan IN ('starter', 'founder', 'leader'));

CREATE OR REPLACE FUNCTION public.get_subscription_project_limit(plan_id TEXT)
RETURNS INTEGER
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT CASE plan_id
    WHEN 'starter' THEN 5
    WHEN 'founder' THEN 10
    WHEN 'leader' THEN NULL
    ELSE 5
  END
$$;

CREATE OR REPLACE FUNCTION public.enforce_business_canvas_project_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  selected_plan TEXT;
  allowed_projects INTEGER;
  active_projects INTEGER;
BEGIN
  SELECT COALESCE(subscription_plan, 'starter')
  INTO selected_plan
  FROM public.profiles
  WHERE id = NEW.user_id;

  selected_plan := COALESCE(selected_plan, 'starter');
  allowed_projects := public.get_subscription_project_limit(selected_plan);

  IF allowed_projects IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*)
  INTO active_projects
  FROM public.business_canvas
  WHERE user_id = NEW.user_id
    AND deleted_at IS NULL;

  IF active_projects >= allowed_projects THEN
    RAISE EXCEPTION 'PROJECT_LIMIT_REACHED:%:%', selected_plan, allowed_projects
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS business_canvas_project_limit_trigger ON public.business_canvas;
CREATE TRIGGER business_canvas_project_limit_trigger
BEFORE INSERT ON public.business_canvas
FOR EACH ROW
EXECUTE FUNCTION public.enforce_business_canvas_project_limit();
