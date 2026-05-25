# Project Manager Supabase Test

This folder is a safe Supabase test layer for the Project Manager repository.
The current Node/MariaDB backend stays unchanged.

## Online-safe steps

1. Create a free Supabase project.
2. Open Supabase Dashboard -> SQL Editor.
3. For an online project with existing data, run `supabase/migrations/20260525_online_sync.sql`.
4. Copy `supabase/config.example.js` to `supabase/supabase-config.js`.
5. Fill `url` and `anonKey` from Project Settings -> API.
6. Open `supabase/test-connection.html`.

If the schema was applied correctly, the test page returns `supabase_health` with `app_name: project-manager`.

`supabase/schema.sql` is a reset/test file. It drops and recreates Project Manager objects, so do not run it against an online project that has real data.

For GitHub Pages, set Supabase Authentication -> URL Configuration:

- Site URL: `https://faridasadov.github.io/project-manager/`
- Redirect URL: `https://faridasadov.github.io/project-manager/`

## Why this project is a good test

- It already has GitHub Pages support.
- It already has a single `app_state` JSON model, so migration can start without rewriting the whole UI.
- The normalized tables let us test a cleaner future structure for projects, tasks, comments, attachments, notifications and audit logs.

## Migration order

1. Auth and workspace registration.
2. `app_state` read/write through Supabase.
3. Attachments through Supabase Storage.
4. Normalized project/task reads.
5. Mail notifications through Edge Functions or an external mail API.

## Current online backend mode

GitHub Pages is the public frontend. Supabase is the primary online backend for auth, workspace state, settings, audit/notification history and Storage uploads.

The local Node/MariaDB backend remains in the repository for development, backup and fallback only. When `supabase/supabase-config.js` has `primaryBackend: true`, the browser does not use the local Node API as its primary backend.

Run these online-safe SQL files in order:

1. `supabase/migrations/20260525_online_sync.sql`
2. `supabase/migrations/20260525_storage_mail.sql`

Mail uses the Edge Function in `supabase/functions/project-manager-mail`. Deploy it and set secrets:

```bash
supabase functions deploy project-manager-mail
supabase secrets set RESEND_API_KEY=... MAIL_FROM="Project Manager <mail@example.com>"
```
