# Project Manager

Project management workspace with login roles, tasks, resources, comments, attachments, backup/import, deadline alerts and a small Node.js backend.

The frontend still keeps a localStorage fallback, but when it is opened through the backend it syncs all app data to MariaDB.

## Demo users

- `adminklinika / adminklinika123`
- `manager / manager123`
- `user / user123`

## Local test

```bash
npm test
```

Backend smoke test, when the app is already running:

```bash
npm run test:backend
BASE_URL=http://localhost:3015 npm run test:tenant
```

By default it checks `http://localhost`. To point it at another local port:

```bash
BASE_URL=http://localhost:3015 npm run test:backend
```

## Backend

```bash
npm start
```

Default URL: `http://localhost:3000`

Environment:

- `PORT=3000` changes the server port.
- `AUTH_SECRET=change-this-long-random-secret`
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_NAME=project_manager`
- `DB_USER=project_manager`
- `DB_PASSWORD=project_manager_2026`
- `SMTP_URL=smtp://user:password@mail.example.com:587`
- `MAIL_FROM=project-manager@example.com`
- `DEADLINE_SCHEDULER=on`

API:

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/state` requires `Authorization: Bearer <token>`
- `PUT /api/state` requires `Authorization: Bearer <token>`
- `GET /api/settings` requires `Authorization: Bearer <token>`
- `PUT /api/settings` requires admin token
- `POST /api/mail/deadline-alerts`
- `GET /api/backup/json` exports a scoped JSON backup without using `mysqldump`.

Mail settings use `emailProvider` as either an SMTP URL or an HTTP endpoint that accepts a JSON payload.
LDAP login uses `ldapUrl`, `ldapBaseDn`, and `ldapUserFilter`; the default filter is `(uid={username})`.
If the database has no state yet, `POST /api/auth/login` accepts the demo admin credentials so the first browser session can bootstrap the state.

## cPanel / shared hosting

The backend is compatible with Node.js `14.21.3+` and does not require Docker. For OUR Host or a similar cPanel provider, create a Node.js application with:

- startup file: `server.js`
- application root: the uploaded project directory
- Node.js version: `14.21.3` minimum, preferably `18` or `20`
- environment variables: `PORT`, `AUTH_SECRET`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

Create the MariaDB/MySQL database and user in cPanel first, then put those values into the Node.js app environment. Run `npm install --omit=dev` from the app terminal or cPanel Node.js screen, then start/restart the application.

If the host requires a manual database import, load `db/schema.sql` into the MariaDB/MySQL database before starting the app. The server also runs schema checks on startup, but the SQL file is useful for cPanel/phpMyAdmin setups and deployment reviews.

## Operations

Install on a fresh Alma/RHEL-style server:

```bash
sudo APP_DIR=/opt/project-manager DB_PASSWORD='change-this' scripts/install-server.sh
```

Database backup and restore:

```bash
DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=project_manager DB_USER=project_manager DB_PASSWORD='change-this' npm run backup:db
FORCE=1 DB_HOST=127.0.0.1 DB_PORT=3306 DB_NAME=project_manager DB_USER=project_manager DB_PASSWORD='change-this' scripts/restore-db.sh backups/project-manager-mariadb-YYYYMMDD-HHMMSS.sql.gz
```

MariaDB backup uses `mariadb-dump` when available, otherwise `mysqldump`. If the database is running in Docker and the host has no dump client, set `DB_CONTAINER` or use the default `projects-mariadb` container name. It includes routines, triggers, and events, uses a single transaction, and writes compressed `.sql.gz` files by default. Set `COMPRESS=0` if a plain `.sql` file is required.

JSON app-state backup without MariaDB dump:

```bash
BASE_URL=http://localhost PM_USER=adminklinika PM_PASSWORD=adminklinika123 npm run backup:json
```

The backend keeps the compatibility `app_state` JSON document and also syncs normalized MariaDB tables for users, projects, tasks, teams, comments, attachments, notifications, and audit logs.

Admin panel backup/restore:

- Use **Manual backup** to keep the last 10 JSON snapshots inside app settings.
- Use **Download** on a backup row to export a snapshot.
- Use **Restore JSON** to import a previously exported app snapshot.
- Use the Excel import mapping fields when clinic spreadsheets use custom column names for project, task, owner, or dependencies.

## GitHub Pages

The `.github/workflows/pages.yml` workflow deploys the static site from the `main` branch. In the GitHub repository, enable Pages with **GitHub Actions** as the source.

## Supabase free backend test

The `supabase/` folder contains a safe test layer for trying GitHub Pages + Supabase without replacing the current MariaDB backend.

- `supabase/schema.sql` creates workspaces, profiles, projects, tasks, comments, attachments, notifications, audit logs and RLS policies.
- `supabase/test-connection.html` checks a Supabase URL and anon key from `supabase/supabase-config.js`.
- `supabase/supabase-config.js` is ignored by Git so real keys do not get committed.
