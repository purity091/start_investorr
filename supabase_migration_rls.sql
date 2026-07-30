-- Drop existing insecure policies (if any)
DROP POLICY IF EXISTS "Allow public read on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Allow public insert on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Allow public update on canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only read their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only insert their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only update their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Users can only delete their own canvas" ON public.business_canvas;
DROP POLICY IF EXISTS "Anyone can read public canvases" ON public.business_canvas;

-- Ensure RLS is enabled
ALTER TABLE public.business_canvas ENABLE ROW LEVEL SECURITY;

-- Add is_public column for sharing if it doesn't exist
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='business_canvas' AND column_name='is_public') THEN
    ALTER TABLE public.business_canvas ADD COLUMN is_public BOOLEAN DEFAULT false;
  END IF;
END $$;

-- 1. Read Policy: Owner can read their canvas, OR anyone can read if it's public
CREATE POLICY "Anyone can read public canvases or own canvases" 
ON public.business_canvas 
FOR SELECT 
USING (auth.uid() = user_id OR is_public = true);

-- 2. Insert Policy: Only the owner can create a canvas for themselves
CREATE POLICY "Users can only insert their own canvas" 
ON public.business_canvas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. Update Policy: Only the owner can update their canvas
CREATE POLICY "Users can only update their own canvas" 
ON public.business_canvas 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Delete Policy: Only the owner can delete their canvas
CREATE POLICY "Users can only delete their own canvas" 
ON public.business_canvas 
FOR DELETE 
USING (auth.uid() = user_id);
