#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/project-manager}"
DB_NAME="${DB_NAME:-project_manager}"
DB_USER="${DB_USER:-project_manager}"
DB_PASSWORD="${DB_PASSWORD:-change-this-db-password}"
AUTH_SECRET="${AUTH_SECRET:-$(openssl rand -hex 32)}"

dnf install -y nodejs npm mariadb-server
systemctl enable --now mariadb

mysql -uroot <<SQL
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

mkdir -p "${APP_DIR}"
rsync -a --exclude .git --exclude node_modules ./ "${APP_DIR}/"
cd "${APP_DIR}"
npm install --omit=dev

cat >/etc/project-manager.env <<ENV
PORT=3000
AUTH_SECRET=${AUTH_SECRET}
CORS_ORIGIN=*
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DEADLINE_SCHEDULER=on
ENV

cp deploy/project-manager.service /etc/systemd/system/project-manager.service
systemctl daemon-reload
systemctl enable --now project-manager.service

if command -v firewall-cmd >/dev/null 2>&1; then
  firewall-cmd --permanent --add-port=3000/tcp || true
  firewall-cmd --reload || true
fi
