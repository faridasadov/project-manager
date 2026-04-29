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
- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_NAME=project_manager`
- `DB_USER=project_manager`
- `DB_PASSWORD=project_manager_2026`

API:

- `GET /api/health`
- `GET /api/state`
- `PUT /api/state`

## GitHub Pages

The `.github/workflows/pages.yml` workflow deploys the static site from the `main` branch. In the GitHub repository, enable Pages with **GitHub Actions** as the source.
