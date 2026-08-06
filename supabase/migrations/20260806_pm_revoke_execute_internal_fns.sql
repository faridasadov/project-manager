-- Fix: anon/authenticated_security_definer_function_executable (linter 0028/0029)
-- Bu funksiyalar RLS policy-lərində İSTİFADƏ OLUNMUR və klient RPC ilə çağırmır:
--  • Trigger funksiyaları — caller EXECUTE tələb etmir.
--  • Maintenance funksiyaları — lazım olsa service_role çağırır.
-- anon/authenticated-dən EXECUTE geri alınır → birbaşa RPC çağırışı bağlanır.
-- QEYD: RLS-də işlədilən pm_is_admin/pm_role/pm_workspace_id/pm_same_workspace/
-- pm_is_active_member/pm_is_super_admin/pm_workspace_approved TOXUNULMUR — onlardan
-- EXECUTE almaq RLS qiymətləndirməsini qırar.

-- Trigger funksiyaları
REVOKE EXECUTE ON FUNCTION public.pm_guard_app_state()        FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pm_bump_app_state_version() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pm_guard_approval_change()  FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pm_sync_email_verified()    FROM public, anon, authenticated;

-- Maintenance funksiyaları (service_role saxlanılır)
REVOKE EXECUTE ON FUNCTION public.pm_archive_app_state()          FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pm_thin_app_state_history(uuid) FROM public, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.pm_archive_app_state()          TO service_role;
GRANT  EXECUTE ON FUNCTION public.pm_thin_app_state_history(uuid) TO service_role;
