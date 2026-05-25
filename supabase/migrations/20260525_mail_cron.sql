-- Project Manager: Daily deadline-alert mail via pg_cron + pg_net.
-- Runs every day at 08:00 UTC.
--
-- Before applying, set DB-level config (run once as superuser):
--   ALTER DATABASE postgres SET app.supabase_anon_key = 'sb_publishable_...';
--   ALTER DATABASE postgres SET app.admin_email = 'admin@yourdomain.com';

do $$
begin
  if not exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    raise notice 'pg_cron unavailable — skipping'; return;
  end if;
  if not exists (select 1 from pg_available_extensions where name = 'pg_net') then
    raise notice 'pg_net unavailable — skipping'; return;
  end if;

  create extension if not exists pg_cron;
  create extension if not exists pg_net;

  perform cron.unschedule(jobid) from cron.job where jobname = 'pm-deadline-alerts';

  perform cron.schedule(
    'pm-deadline-alerts', '0 8 * * *',
    $job$
      select net.http_post(
        url     := 'https://zvloggrzmcjgvmzuvnoz.supabase.co/functions/v1/project-manager-mail',
        headers := jsonb_build_object(
          'apikey',        current_setting('app.supabase_anon_key', true),
          'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key', true),
          'Content-Type',  'application/json'
        ),
        body := jsonb_build_object(
          'type', 'cron', 'recipients', current_setting('app.admin_email', true),
          'subject', 'Deadline xəbərdarlıqları', 'template', '{{alerts}}'
        )
      );
    $job$
  );
end $$;
