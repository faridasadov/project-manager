#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-./backups}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-project_manager}"
DB_USER="${DB_USER:-project_manager}"
DB_PASSWORD="${DB_PASSWORD:-project_manager_2026}"
COMPRESS="${COMPRESS:-1}"
DB_CONTAINER="${DB_CONTAINER:-projects-mariadb}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUTPUT="${BACKUP_DIR}/project-manager-mariadb-${STAMP}.sql"

mkdir -p "${BACKUP_DIR}"

if command -v mariadb-dump >/dev/null 2>&1; then
  DUMP_BIN="mariadb-dump"
elif command -v mysqldump >/dev/null 2>&1; then
  DUMP_BIN="mysqldump"
elif command -v docker >/dev/null 2>&1 && docker ps --format '{{.Names}}' | grep -qx "${DB_CONTAINER}"; then
  export MYSQL_PWD="${DB_PASSWORD}"
  docker exec -e MYSQL_PWD="${DB_PASSWORD}" "${DB_CONTAINER}" mariadb-dump \
    --host=127.0.0.1 \
    --user="${DB_USER}" \
    --single-transaction \
    --quick \
    --routines \
    --triggers \
    --events \
    --default-character-set=utf8mb4 \
    "${DB_NAME}" > "${OUTPUT}"
  unset MYSQL_PWD
  DUMP_BIN=""
else
  echo "mariadb-dump or mysqldump not found. If MariaDB runs in Docker, set DB_CONTAINER=<container-name>." >&2
  exit 1
fi

if [[ -n "${DUMP_BIN}" ]]; then
  export MYSQL_PWD="${DB_PASSWORD}"
  "${DUMP_BIN}" \
    --host="${DB_HOST}" \
    --port="${DB_PORT}" \
    --user="${DB_USER}" \
    --single-transaction \
    --quick \
    --routines \
    --triggers \
    --events \
    --default-character-set=utf8mb4 \
    "${DB_NAME}" > "${OUTPUT}"
  unset MYSQL_PWD
fi

if [[ "${COMPRESS}" == "1" ]]; then
  gzip -f "${OUTPUT}"
  OUTPUT="${OUTPUT}.gz"
fi

echo "${OUTPUT}"
