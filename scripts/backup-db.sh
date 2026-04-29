#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-./backups}"
DB_NAME="${DB_NAME:-project_manager}"
DB_USER="${DB_USER:-project_manager}"
DB_PASSWORD="${DB_PASSWORD:-project_manager_2026}"
STAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "${BACKUP_DIR}"
mysqldump -u"${DB_USER}" -p"${DB_PASSWORD}" "${DB_NAME}" > "${BACKUP_DIR}/project-manager-${STAMP}.sql"
echo "${BACKUP_DIR}/project-manager-${STAMP}.sql"
