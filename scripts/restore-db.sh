#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 backup.sql[.gz]" >&2
  exit 1
fi

BACKUP_FILE="$1"
if [[ ! -f "${BACKUP_FILE}" ]]; then
  echo "Backup file not found: ${BACKUP_FILE}" >&2
  exit 1
fi

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-project_manager}"
DB_USER="${DB_USER:-project_manager}"
DB_PASSWORD="${DB_PASSWORD:-project_manager_2026}"
FORCE="${FORCE:-0}"
DB_CONTAINER="${DB_CONTAINER:-projects-mariadb}"

if command -v mariadb >/dev/null 2>&1; then
  MYSQL_BIN="mariadb"
elif command -v mysql >/dev/null 2>&1; then
  MYSQL_BIN="mysql"
elif command -v docker >/dev/null 2>&1 && docker ps --format '{{.Names}}' | grep -qx "${DB_CONTAINER}"; then
  MYSQL_BIN=""
else
  echo "mariadb or mysql client not found. If MariaDB runs in Docker, set DB_CONTAINER=<container-name>." >&2
  exit 1
fi

if [[ "${FORCE}" != "1" ]]; then
  echo "This will restore ${BACKUP_FILE} into ${DB_NAME} on ${DB_HOST}:${DB_PORT}." >&2
  echo "Set FORCE=1 to confirm." >&2
  exit 1
fi

export MYSQL_PWD="${DB_PASSWORD}"
if [[ -z "${MYSQL_BIN}" ]]; then
  if [[ "${BACKUP_FILE}" == *.gz ]]; then
    gzip -dc "${BACKUP_FILE}" | docker exec -i -e MYSQL_PWD="${DB_PASSWORD}" "${DB_CONTAINER}" mariadb --host=127.0.0.1 --user="${DB_USER}" "${DB_NAME}"
  else
    docker exec -i -e MYSQL_PWD="${DB_PASSWORD}" "${DB_CONTAINER}" mariadb --host=127.0.0.1 --user="${DB_USER}" "${DB_NAME}" < "${BACKUP_FILE}"
  fi
elif [[ "${BACKUP_FILE}" == *.gz ]]; then
  gzip -dc "${BACKUP_FILE}" | "${MYSQL_BIN}" --host="${DB_HOST}" --port="${DB_PORT}" --user="${DB_USER}" "${DB_NAME}"
else
  "${MYSQL_BIN}" --host="${DB_HOST}" --port="${DB_PORT}" --user="${DB_USER}" "${DB_NAME}" < "${BACKUP_FILE}"
fi
unset MYSQL_PWD
