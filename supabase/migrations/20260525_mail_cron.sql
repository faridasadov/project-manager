-- Project Manager: Daily deadline-alert mail via pg_cron + pg_net.
-- Runs every day at 08:00 UTC.
--
-- Mail is sent by the `project-manager-mail` edge function over SMTP (nodemailer).
-- SMTP credentials live as Edge Function secrets: SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT.
-- The anon key below is a public client key (safe to embed); no secret is stored here.

create extension if not exists pg_net;
create extension if not exists pg_cron;

select cron.unschedule(jobid) from cron.job where jobname = 'pm-deadline-alerts';

select cron.schedule(
  'pm-deadline-alerts', '0 8 * * *',
  $job$
    select net.http_post(
      url     := 'https://zvloggrzmcjgvmzuvnoz.supabase.co/functions/v1/project-manager-mail',
      headers := jsonb_build_object(
        'apikey',        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bG9nZ3J6bWNqZ3ZtenV2bm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDI5MTgsImV4cCI6MjA5NTIxODkxOH0.xATtx6O265TdPGih4aBuzx2KwOjTP6x6JJf_DCANCdw',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bG9nZ3J6bWNqZ3ZtenV2bm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDI5MTgsImV4cCI6MjA5NTIxODkxOH0.xATtx6O265TdPGih4aBuzx2KwOjTP6x6JJf_DCANCdw',
        'Content-Type',  'application/json'
      ),
      body := jsonb_build_object(
        'type', 'cron',
        'recipients', 'faridasadov@gmail.com',
        'subject', 'Deadline xeberdarliqlari',
        'template', '{{alerts}}'
      ),
      timeout_milliseconds := 25000
    );
  $job$
);
