-- 1. Create the profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'manager')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  subscription_plan TEXT NOT NULL DEFAULT 'starter'
    CHECK (subscription_plan IN ('starter', 'founder', 'leader')),
  bookmarked_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS bookmarked_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'starter'
    CHECK (subscription_plan IN ('starter', 'founder', 'leader'));

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper avoids recursive RLS checks when admin policies need the current user's role.
CREATE OR REPLACE FUNCTION public.get_current_profile_role()
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.profiles
  WHERE id = auth.uid()
  LIMIT 1
$$;

-- A user may update personal fields, but role/status are admin-controlled.
CREATE OR REPLACE FUNCTION public.protect_profile_admin_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (
    NEW.role IS DISTINCT FROM OLD.role
    OR NEW.status IS DISTINCT FROM OLD.status
    OR NEW.subscription_plan IS DISTINCT FROM OLD.subscription_plan
  ) AND public.get_current_profile_role() IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Only administrators can update profile role, status, or subscription plan'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_admin_fields_trigger ON public.profiles;
CREATE TRIGGER protect_profile_admin_fields_trigger
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_profile_admin_fields();

-- 3. Policies for users
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 4. Policies for admins
-- Admin can read all profiles
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" 
ON public.profiles FOR SELECT 
USING (public.get_current_profile_role() = 'admin');

-- Admin can update all profiles
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING (public.get_current_profile_role() = 'admin')
WITH CHECK (public.get_current_profile_role() = 'admin');

DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
CREATE POLICY "Admins can delete profiles"
ON public.profiles FOR DELETE
USING (public.get_current_profile_role() = 'admin');

-- Admin project management uses the authenticated client and therefore needs
-- explicit RLS access in addition to the user ownership policies.
DROP POLICY IF EXISTS "Admins can read all canvas" ON public.business_canvas;
CREATE POLICY "Admins can read all canvas"
ON public.business_canvas FOR SELECT
USING (public.get_current_profile_role() = 'admin');

DROP POLICY IF EXISTS "Admins can update all canvas" ON public.business_canvas;
CREATE POLICY "Admins can update all canvas"
ON public.business_canvas FOR UPDATE
USING (public.get_current_profile_role() = 'admin')
WITH CHECK (public.get_current_profile_role() = 'admin');

DROP POLICY IF EXISTS "Admins can delete all canvas" ON public.business_canvas;
CREATE POLICY "Admins can delete all canvas"
ON public.business_canvas FOR DELETE
USING (public.get_current_profile_role() = 'admin');

-- 5. Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role, status)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    'user',
    'active'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Insert existing users into profiles (so you don't lose current users)
INSERT INTO public.profiles (id, full_name, email, role, status)
SELECT id, raw_user_meta_data->>'full_name', email, 'user', 'active'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 7. (Optional but important) Make your specific user an ADMIN
-- REPLACE THE EMAIL BELOW WITH YOUR ACTUAL LOGIN EMAIL
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com'; 
