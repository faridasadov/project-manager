CREATE TABLE IF NOT EXISTS app_state (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  state_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (JSON_VALID(state_json))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_settings (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
  settings_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (JSON_VALID(settings_json))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  username VARCHAR(190) NOT NULL UNIQUE,
  role VARCHAR(32) NOT NULL,
  manager_id VARCHAR(128) NULL,
  full_name VARCHAR(255) NULL,
  email VARCHAR(255) NULL,
  profile_json LONGTEXT NULL CHECK (profile_json IS NULL OR JSON_VALID(profile_json)),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(64) NOT NULL,
  priority VARCHAR(64) NOT NULL,
  progress INT NOT NULL DEFAULT 0,
  start_date DATE NULL,
  end_date DATE NULL,
  archived TINYINT(1) NOT NULL DEFAULT 0,
  payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json)),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_name (name),
  INDEX idx_projects_archived (archived)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_members (
  project_id VARCHAR(128) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  member_role VARCHAR(64) NOT NULL DEFAULT 'member',
  PRIMARY KEY (project_id, resource, member_role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(64) NOT NULL,
  priority VARCHAR(64) NOT NULL,
  owner VARCHAR(255) NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  progress INT NOT NULL DEFAULT 0,
  payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json)),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_tasks_project (project_name),
  INDEX idx_tasks_status (status),
  INDEX idx_tasks_end (end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS team_members (
  team_id VARCHAR(128) NOT NULL,
  member_resource VARCHAR(255) NOT NULL,
  PRIMARY KEY (team_id, member_resource)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS project_links (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  resource VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  task_id VARCHAR(128) NOT NULL,
  author VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME NULL,
  payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json)),
  INDEX idx_comments_task (task_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS attachments (
  id VARCHAR(128) NOT NULL PRIMARY KEY,
  task_id VARCHAR(128) NOT NULL,
  comment_id VARCHAR(128) NULL,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(255) NULL,
  file_size INT NOT NULL DEFAULT 0,
  data_url LONGTEXT NULL,
  created_at DATETIME NULL,
  INDEX idx_attachments_task (task_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(64) NOT NULL,
  recipient VARCHAR(255) NULL,
  subject VARCHAR(255) NULL,
  body TEXT NULL,
  status VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  actor VARCHAR(255) NULL,
  action VARCHAR(128) NOT NULL,
  entity_type VARCHAR(64) NULL,
  entity_id VARCHAR(128) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  details_json LONGTEXT NULL CHECK (details_json IS NULL OR JSON_VALID(details_json)),
  INDEX idx_audit_created (created_at),
  INDEX idx_audit_actor (actor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
