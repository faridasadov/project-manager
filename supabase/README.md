# Project Manager Supabase Test

This folder is a safe Supabase test layer for the Project Manager repository.
The current Node/MariaDB backend stays unchanged.

## Test steps

1. Create a free Supabase project.
2. Open Supabase Dashboard -> SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `supabase/config.example.js` to `supabase/supabase-config.js`.
5. Fill `url` and `anonKey` from Project Settings -> API.
6. Open `supabase/test-connection.html`.

If the schema was applied correctly, the test page returns `supabase_health` with `app_name: project-manager`.

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
