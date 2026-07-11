# Archived / unused SQL

These files describe a **normalized relational** Supabase schema that the app
was never wired to. They are kept for reference only — **do not run them.**

The live app persists workspace data as a single JSON document in the
`app_state` table (see `supabase/migrations/20260525_online_sync.sql`). The
frontend only reads/writes these Supabase tables:

    workspaces · profiles · app_state · app_settings · notifications · audit_logs

## Files here

| File | What it was | Why archived |
|------|-------------|--------------|
| `schema.sql` | Full relational reset (projects, tasks, comments, teams, …) with ~45 RLS policies | Never referenced by `script.js`; also a destructive drop-and-recreate |
| `20260525_proper_schema.sql` | Second relational attempt (`task_comments`, `task_attachments`, …) | Superseded by the `app_state` JSON model; never wired to the UI |

If a future version moves to a normalized model, start from these as a draft —
but treat them as a rewrite, not a live migration.
