-- Project Manager: per-user daily digests via pg_cron + pg_net.
-- Hourly tick (08:00-style precision): the edge function checks each user's
-- chosen morning/evening hour (in their timezone) and sends only when it matches.
-- Users configure prefs in-app; they are stored in app_state.users[].profile.reportPrefs.
--
-- Mail is sent by the `project-manager-mail` edge function over SMTP (nodemailer).
-- SMTP credentials live as Edge Function secrets: SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT.
-- The anon key below is a public client key (safe to embed); no secret is stored here.

create extension if not exists pg_net;
create extension if not exists pg_cron;

select cron.unschedule(jobid) from cron.job where jobname in ('pm-deadline-alerts', 'pm-digests');

select cron.schedule(
  'pm-digests', '0 * * * *',
  $job$
    select net.http_post(
      url     := 'https://zvloggrzmcjgvmzuvnoz.supabase.co/functions/v1/project-manager-mail',
      headers := jsonb_build_object(
        'apikey',        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bG9nZ3J6bWNqZ3ZtenV2bm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDI5MTgsImV4cCI6MjA5NTIxODkxOH0.xATtx6O265TdPGih4aBuzx2KwOjTP6x6JJf_DCANCdw',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bG9nZ3J6bWNqZ3ZtenV2bm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDI5MTgsImV4cCI6MjA5NTIxODkxOH0.xATtx6O265TdPGih4aBuzx2KwOjTP6x6JJf_DCANCdw',
        'Content-Type',  'application/json'
      ),
      body := jsonb_build_object('type', 'digests'),
      timeout_milliseconds := 30000
    );
  $job$
);
