-- Fix: function_search_path_mutable (Supabase linter 0011)
-- Trigger funksiyalarına sabit search_path (search_path injection qorunması).
-- Yalnız public obyektlərə müraciət etdikləri üçün davranış dəyişmir.
ALTER FUNCTION public.pm_bump_app_state_version() SET search_path = public, pg_temp;
ALTER FUNCTION public.pm_guard_app_state()        SET search_path = public, pg_temp;
