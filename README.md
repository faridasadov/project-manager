# Project Manager

Project management workspace with login roles, tasks, resources, comments, attachments, backup/import, deadline alerts and a small Node.js backend.

The frontend still keeps a localStorage fallback, but when it is opened through the backend it syncs all app data to MariaDB.

## Demo users

- `admin / admin123`
- `manager / manager123`
- `user / user123`

## Local test

```bash
npm test
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

Mail settings use `emailProvider` as either an SMTP URL or an HTTP endpoint that accepts a JSON payload.
LDAP login uses `ldapUrl`, `ldapBaseDn`, and `ldapUserFilter`; the default filter is `(uid={username})`.
If the database has no state yet, `POST /api/auth/login` accepts the demo admin credentials so the first browser session can bootstrap the state.

## Operations

Install on a fresh Alma/RHEL-style server:

```bash
sudo APP_DIR=/opt/project-manager DB_PASSWORD='change-this' scripts/install-server.sh
```

Database backup and restore:

```bash
scripts/backup-db.sh
scripts/restore-db.sh backups/project-manager-YYYYMMDD-HHMMSS.sql
```

The backend keeps the compatibility `app_state` JSON document and also syncs normalized MariaDB tables for users, projects, tasks, teams, comments, attachments, notifications, and audit logs.

## GitHub Pages

The `.github/workflows/pages.yml` workflow deploys the static site from the `main` branch. In the GitHub repository, enable Pages with **GitHub Actions** as the source.
