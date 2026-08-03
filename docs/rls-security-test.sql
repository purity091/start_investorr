-- Manual RLS security checks for Supabase SQL editor.
-- Replace the UUIDs below with real auth.users IDs from a staging project.

-- Test setup assumptions:
-- 1. Run supabase_migration_secure_rls.sql first.
-- 2. Create two users: USER_A and USER_B.
-- 3. Insert one private canvas for each user.

-- Example data setup using service role only:
-- INSERT INTO public.business_canvas (id, user_id, project_title, canvas_data)
-- VALUES
--   ('00000000-0000-0000-0000-0000000000a1', '<USER_A_UUID>', 'A private project', '{}'),
--   ('00000000-0000-0000-0000-0000000000b1', '<USER_B_UUID>', 'B private project', '{}');

-- As USER_A, this should return exactly 1 row: USER_A private project.
-- SELECT id, user_id, project_title
-- FROM public.business_canvas
-- ORDER BY project_title;

-- As USER_A, this should return 0 rows.
-- SELECT id, user_id, project_title
-- FROM public.business_canvas
-- WHERE user_id = '<USER_B_UUID>';

-- As USER_A, this should affect 0 rows or be rejected by RLS.
-- UPDATE public.business_canvas
-- SET project_title = 'malicious update'
-- WHERE user_id = '<USER_B_UUID>';

-- As anonymous/not signed in, private canvases should return 0 rows.
-- SELECT id, user_id, project_title
-- FROM public.business_canvas
-- WHERE is_public = false;

-- Public sharing check:
-- As USER_A, mark only USER_A's canvas public.
-- UPDATE public.business_canvas
-- SET is_public = true,
--     published_at = NOW(),
--     published_by = '<USER_A_UUID>'
-- WHERE id = '00000000-0000-0000-0000-0000000000a1';

-- As USER_B, this should affect 0 rows or be rejected by RLS.
-- UPDATE public.business_canvas
-- SET is_public = true,
--     published_at = NOW(),
--     published_by = '<USER_B_UUID>'
-- WHERE id = '00000000-0000-0000-0000-0000000000a1';

-- As anonymous/not signed in, this should return only public canvases.
-- SELECT id, project_title
-- FROM public.business_canvas;

-- As anonymous/not signed in, this should be rejected or affect 0 rows.
-- UPDATE public.business_canvas
-- SET project_title = 'anonymous update'
-- WHERE id = '00000000-0000-0000-0000-0000000000a1';
