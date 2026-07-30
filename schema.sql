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
    canvas_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Turn on Row Level Security (RLS) but allow public read/write for now to facilitate migration
ALTER TABLE public.proven_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on projects" ON public.proven_projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON public.proven_projects FOR INSERT WITH CHECK (true);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public insert on lessons" ON public.lessons FOR INSERT WITH CHECK (true);

ALTER TABLE public.business_canvas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on canvas" ON public.business_canvas FOR SELECT USING (true);
CREATE POLICY "Allow public insert on canvas" ON public.business_canvas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on canvas" ON public.business_canvas FOR UPDATE USING (true);
