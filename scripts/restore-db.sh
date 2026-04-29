#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 backup.sql" >&2
  exit 1
fi

DB_NAME="${DB_NAME:-project_manager}"
DB_USER="${DB_USER:-project_manager}"
DB_PASSWORD="${DB_PASSWORD:-project_manager_2026}"

mysql -u"${DB_USER}" -p"${DB_PASSWORD}" "${DB_NAME}" < "$1"
