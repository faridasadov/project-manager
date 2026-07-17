# Project Manager

Multi-workspace project management app. Frontend is hosted on GitHub Pages; Supabase is the primary backend (Auth, database, storage, email). The local Node.js/MariaDB server remains in the repo for development and backup only.

**Live app:** https://faridasadov.github.io/project-manager/

## Architecture

| Layer | Technology |
|-------|-----------|
| Frontend | GitHub Pages (static HTML/CSS/JS) |
| Auth | Supabase Auth (email + password) |
| Database | Supabase Postgres with RLS |
| File storage | Supabase Storage (`project-attachments` bucket) |
| Email | Supabase Edge Function → Resend API |
| Local dev | Node.js + MariaDB (`server.js`) |

## Demo accounts

These are Supabase auth accounts created for the test workspace:

| Role | Email |
|------|-------|
| Manager | `manager@project-manager.az` |
| User | `user@project-manager.az` |

Passwords are set in the Supabase Dashboard under **Authentication → Users**.

## Supabase setup

### 1. Create a Supabase project

Go to https://supabase.com and create a new project.

### 2. Run migrations

In **Supabase Dashboard → SQL Editor**, run the migration files in order:

```
supabase/migrations/20260525_online_sync.sql
supabase/migrations/20260525_storage_mail.sql
```

Optional — for daily deadline-alert email via `pg_cron`:

```
supabase/migrations/20260525_mail_cron.sql
```

> **Data model:** the app stores each workspace as one JSON document in the
> `app_state` table. The frontend only uses `workspaces`, `profiles`,
> `app_state`, `app_settings`, `notifications` and `audit_logs`. An older
> normalized relational schema was never adopted and is kept, unused, in
> `supabase/archive/` — do not run those files.

### 3. Configure the frontend

Edit `supabase/supabase-config.js`:

```js
window.PROJECT_MANAGER_SUPABASE = {
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",          // Project Settings → API → anon/public
  redirectTo: "https://YOUR_GITHUB_USER.github.io/project-manager/",
  primaryBackend: true,
  storageBucket: "project-attachments",
  mailFunction: "project-manager-mail"
};
```

> **Note:** The `anonKey` is a **public publishable key** (prefix `sb_publishable_`). It is safe to commit and expose — Supabase enforces security through Row Level Security (RLS) policies, not by keeping the anon key secret.

### 4. Deploy the mail Edge Function

```bash
supabase functions deploy project-manager-mail --project-ref YOUR_PROJECT_REF
supabase secrets set RESEND_API_KEY=re_... MAIL_FROM="Project Manager <noreply@yourdomain.com>"
```

> `MAIL_FROM` must use a domain verified in Resend. Until then, the default `onboarding@resend.dev` is used and mail may not be delivered.

### 5. Create auth users

In **Supabase Dashboard → Authentication → Users**, create accounts for each workspace member and assign roles via the `profiles` table.

## GitHub Pages deployment

Push to `main` — the `.github/workflows/pages.yml` action deploys automatically.

In the GitHub repository settings, enable **Pages → Source → GitHub Actions**.

## Local development (optional)

The Node.js server connects to a local MariaDB instance and does not require Supabase. Useful for offline development, testing, and backup.

### Run locally

```bash
cp .env.example .env   # fill in the values
npm install
npm start              # http://localhost:3000
```

### Environment variables (`.env`)

```
PORT=3000
AUTH_SECRET=change-this-long-random-secret
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=project_manager
DB_USER=project_manager
DB_PASSWORD=your-db-password
SMTP_URL=smtp://user:password@mail.example.com:587
MAIL_FROM=project-manager@example.com
DEADLINE_SCHEDULER=on
```

### Local API endpoints

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | — |
| POST | `/api/auth/login` | — |
| GET | `/api/state` | Bearer token |
| PUT | `/api/state` | Bearer token |
| GET | `/api/settings` | Bearer token |
| PUT | `/api/settings` | Admin token |
| POST | `/api/mail/deadline-alerts` | Bearer token |
| GET | `/api/backup/json` | Admin token |

### Tests

```bash
npm test                  # syntax check + unit tests
npm run test:backend      # smoke test (server must be running)
npm run backup:json       # export app state as JSON
```

## Operations

### Server install (Alma/RHEL)

```bash
sudo APP_DIR=/opt/project-manager DB_PASSWORD='change-this' scripts/install-server.sh
```

### Database backup and restore

```bash
# Backup
DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=project_manager \
  DB_USER=project_manager DB_PASSWORD='change-this' npm run backup:db

# Restore
FORCE=1 DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=project_manager \
  DB_USER=project_manager DB_PASSWORD='change-this' \
  scripts/restore-db.sh backups/project-manager-mariadb-YYYYMMDD-HHMMSS.sql.gz
```

### App state backup (no MariaDB)

```bash
BASE_URL=http://localhost PM_USER=<your-admin-user> PM_PASSWORD=<your-admin-password> npm run backup:json
```

### In-app backup (Admin Panel)

- **Manual backup** — keeps the last 10 JSON snapshots in app settings.
- **Download** — export a snapshot as a file.
- **Restore JSON** — import a previously exported snapshot.
- **Excel import** — map custom column names for project, task, owner, and dependencies.
