import { createServer } from "node:http";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { dirname, extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ldap from "ldapjs";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

const rootDir = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const authSecret = process.env.AUTH_SECRET || "project-manager-change-this-secret";
const corsOrigin = process.env.CORS_ORIGIN || "*";
const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "project_manager",
  password: process.env.DB_PASSWORD || "project_manager_2026",
  database: process.env.DB_NAME || "project_manager",
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4"
};
const pool = mysql.createPool(dbConfig);
const bootstrapUsers = [
  { id: "user-admin", username: "admin", passwordHash: md5("admin123"), role: "admin", managerId: "", profile: { fullName: "Admin User", email: "", fatherName: "", position: "Admin", phone: "", address: "", company: "" } },
  { id: "user-manager", username: "manager", passwordHash: md5("manager123"), role: "manager", managerId: "", profile: { fullName: "Project Manager", email: "", fatherName: "", position: "Manager", phone: "", address: "", company: "" } },
  { id: "user-demo", username: "user", passwordHash: md5("user123"), role: "user", managerId: "user-manager", profile: { fullName: "Demo User", email: "", fatherName: "", position: "User", phone: "", address: "", company: "" } }
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": corsOrigin,
    "access-control-allow-methods": "GET, PUT, OPTIONS",
    "access-control-allow-headers": "content-type, authorization"
  });
  response.end(JSON.stringify(payload));
}

function md5(value) {
  return createHash("md5").update(String(value)).digest("hex");
}

function base64Url(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function signToken(payload) {
  const body = base64Url(payload);
  const signature = createHmac("sha256", authSecret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  try {
    if (!token || !token.includes(".")) return null;
    const [body, signature] = token.split(".");
    const expected = createHmac("sha256", authSecret).update(body).digest("base64url");
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function authPayload(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return verifyToken(token);
}

function requireAuth(request, response, roles = []) {
  const payload = authPayload(request);
  if (!payload || (roles.length && !roles.includes(payload.role))) {
    sendJson(response, 401, { error: "Unauthorized" });
    return null;
  }
  return payload;
}

function tokenForUser(user) {
  return signToken({
    sub: user.id,
    username: user.username,
    role: user.role || "user",
    exp: Date.now() + 12 * 60 * 60 * 1000
  });
}

function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8 * 1024 * 1024) {
        request.destroy();
        rejectBody(new Error("Payload too large"));
      }
    });
    request.on("end", () => resolveBody(body));
    request.on("error", rejectBody);
  });
}

function validateState(payload) {
  return payload
    && Array.isArray(payload.tasks)
    && Array.isArray(payload.projects)
    && Array.isArray(payload.members)
    && Array.isArray(payload.teams)
    && Array.isArray(payload.projectLinks)
    && Array.isArray(payload.users)
    && Array.isArray(payload.trash);
}

async function ensureSchema() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS app_state (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      state_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CHECK (JSON_VALID(state_json))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS app_settings (
      id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
      settings_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CHECK (JSON_VALID(settings_json))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(128) NOT NULL PRIMARY KEY,
      username VARCHAR(190) NOT NULL UNIQUE,
      role VARCHAR(32) NOT NULL,
      manager_id VARCHAR(128) NULL,
      full_name VARCHAR(255) NULL,
      email VARCHAR(255) NULL,
      profile_json LONGTEXT NULL CHECK (profile_json IS NULL OR JSON_VALID(profile_json)),
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS project_members (
      project_id VARCHAR(128) NOT NULL,
      resource VARCHAR(255) NOT NULL,
      member_role VARCHAR(64) NOT NULL DEFAULT 'member',
      PRIMARY KEY (project_id, resource, member_role)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS teams (
      id VARCHAR(128) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS team_members (
      team_id VARCHAR(128) NOT NULL,
      member_resource VARCHAR(255) NOT NULL,
      PRIMARY KEY (team_id, member_resource)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS project_links (
      id VARCHAR(128) NOT NULL PRIMARY KEY,
      project_name VARCHAR(255) NOT NULL,
      resource VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id VARCHAR(128) NOT NULL PRIMARY KEY,
      task_id VARCHAR(128) NOT NULL,
      author VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      created_at DATETIME NULL,
      payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json)),
      INDEX idx_comments_task (task_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS notifications (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(64) NOT NULL,
      recipient VARCHAR(255) NULL,
      subject VARCHAR(255) NULL,
      body TEXT NULL,
      status VARCHAR(64) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      payload_json LONGTEXT NULL CHECK (payload_json IS NULL OR JSON_VALID(payload_json))
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function readState() {
  const [rows] = await pool.execute("SELECT state_json FROM app_state WHERE id = 1");
  if (!rows.length) return null;
  return JSON.parse(rows[0].state_json);
}

async function writeState(payload) {
  const nextState = {
    ...payload,
    version: Number(payload.version) || 1,
    savedAt: new Date().toISOString()
  };
  await pool.execute(
    `INSERT INTO app_state (id, state_json)
     VALUES (1, ?)
     ON DUPLICATE KEY UPDATE state_json = VALUES(state_json)`,
    [JSON.stringify(nextState)]
  );
  await syncRelationalState(nextState);
  return nextState;
}

function sqlDate(value) {
  return value || null;
}

function json(value) {
  return JSON.stringify(value || {});
}

async function syncRelationalState(state) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute("DELETE FROM attachments");
    await connection.execute("DELETE FROM comments");
    await connection.execute("DELETE FROM project_members");
    await connection.execute("DELETE FROM team_members");
    await connection.execute("DELETE FROM project_links");
    await connection.execute("DELETE FROM tasks");
    await connection.execute("DELETE FROM teams");
    await connection.execute("DELETE FROM projects");
    await connection.execute("DELETE FROM users");

    for (const user of state.users || []) {
      await connection.execute(
        `INSERT INTO users (id, username, role, manager_id, full_name, email, profile_json)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          user.username,
          user.role || "user",
          user.managerId || null,
          user.profile?.fullName || "",
          user.profile?.email || "",
          json(user.profile)
        ]
      );
    }

    for (const project of state.projects || []) {
      await connection.execute(
        `INSERT INTO projects (id, name, status, priority, progress, start_date, end_date, archived, payload_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project.id,
          project.name,
          project.status || "Plan",
          project.priority || "Normal",
          Number(project.progress) || 0,
          sqlDate(project.start),
          sqlDate(project.end),
          project.archived ? 1 : 0,
          json(project)
        ]
      );
      for (const managerId of project.managerIds || []) {
        await connection.execute(
          "INSERT INTO project_members (project_id, resource, member_role) VALUES (?, ?, 'manager')",
          [project.id, managerId]
        );
      }
      for (const resource of project.teamMemberIds || []) {
        await connection.execute(
          "INSERT INTO project_members (project_id, resource, member_role) VALUES (?, ?, 'member')",
          [project.id, resource]
        );
      }
    }

    for (const task of state.tasks || []) {
      await connection.execute(
        `INSERT INTO tasks (id, project_name, name, status, priority, owner, start_date, end_date, progress, payload_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          task.id,
          task.project || "",
          task.name,
          task.status || "Plan",
          task.priority || "Normal",
          task.owner || "",
          sqlDate(task.start),
          sqlDate(task.end),
          Number(task.progress) || 0,
          json(task)
        ]
      );
      for (const comment of task.comments || []) {
        await connection.execute(
          `INSERT INTO comments (id, task_id, author, body, created_at, payload_json)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            comment.id || `${task.id}:${comment.createdAt || Date.now()}`,
            task.id,
            comment.author || "",
            comment.text || "",
            comment.createdAt ? new Date(comment.createdAt) : null,
            json(comment)
          ]
        );
      }
      for (const attachment of task.attachments || []) {
        await connection.execute(
          `INSERT INTO attachments (id, task_id, comment_id, file_name, mime_type, file_size, data_url, created_at)
           VALUES (?, ?, NULL, ?, ?, ?, ?, ?)`,
          [
            attachment.id,
            task.id,
            attachment.name,
            attachment.type || "",
            Number(attachment.size) || 0,
            attachment.dataUrl || "",
            attachment.addedAt ? new Date(attachment.addedAt) : null
          ]
        );
      }
    }

    for (const team of state.teams || []) {
      await connection.execute(
        "INSERT INTO teams (id, name, payload_json) VALUES (?, ?, ?)",
        [team.id, team.name, json(team)]
      );
      for (const member of team.memberIds || []) {
        await connection.execute(
          "INSERT INTO team_members (team_id, member_resource) VALUES (?, ?)",
          [team.id, member]
        );
      }
    }

    for (const link of state.projectLinks || []) {
      await connection.execute(
        "INSERT INTO project_links (id, project_name, resource) VALUES (?, ?, ?)",
        [link.id, link.project, link.resource]
      );
    }

    await connection.execute(
      "INSERT INTO audit_logs (actor, action, entity_type, entity_id, details_json) VALUES (?, 'state_saved', 'state', '1', ?)",
      [state.savedBy || "system", JSON.stringify({ taskCount: state.tasks?.length || 0, projectCount: state.projects?.length || 0 })]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function defaultSettings() {
  return {
    emailEnabled: false,
    emailRecipients: "",
    emailProvider: "",
    ldapEnabled: false,
    ldapUrl: "",
    ldapBaseDn: "",
    ldapUserFilter: "(uid={username})"
  };
}

function publicSettings(settings) {
  const merged = { ...defaultSettings(), ...(settings || {}) };
  return {
    emailEnabled: Boolean(merged.emailEnabled),
    emailRecipients: merged.emailRecipients || "",
    emailProvider: merged.emailProvider || "",
    ldapEnabled: Boolean(merged.ldapEnabled),
    ldapUrl: merged.ldapUrl || "",
    ldapBaseDn: merged.ldapBaseDn || "",
    ldapUserFilter: merged.ldapUserFilter || "(uid={username})"
  };
}

async function readSettings() {
  const [rows] = await pool.execute("SELECT settings_json FROM app_settings WHERE id = 1");
  if (!rows.length) return defaultSettings();
  return publicSettings(JSON.parse(rows[0].settings_json));
}

async function writeSettings(settings) {
  const nextSettings = publicSettings(settings);
  await pool.execute(
    `INSERT INTO app_settings (id, settings_json)
     VALUES (1, ?)
     ON DUPLICATE KEY UPDATE settings_json = VALUES(settings_json)`,
    [JSON.stringify(nextSettings)]
  );
  return nextSettings;
}

function ldapSearch(client, baseDn, filter) {
  return new Promise((resolveSearch, rejectSearch) => {
    const entries = [];
    client.search(baseDn, { scope: "sub", filter, sizeLimit: 2 }, (error, result) => {
      if (error) {
        rejectSearch(error);
        return;
      }
      result.on("searchEntry", (entry) => entries.push(entry.object));
      result.on("error", rejectSearch);
      result.on("end", () => resolveSearch(entries));
    });
  });
}

function ldapBind(client, dn, password) {
  return new Promise((resolveBind, rejectBind) => {
    client.bind(dn, password, (error) => {
      if (error) rejectBind(error);
      else resolveBind();
    });
  });
}

async function authenticateLdap(username, password, settings) {
  if (!settings.ldapEnabled || !settings.ldapUrl || !settings.ldapBaseDn || !password) return null;
  const client = ldap.createClient({
    url: settings.ldapUrl,
    timeout: 5000,
    connectTimeout: 5000
  });
  try {
    const escapedUsername = username.replaceAll("\\", "\\5c").replaceAll("*", "\\2a").replaceAll("(", "\\28").replaceAll(")", "\\29");
    const filter = (settings.ldapUserFilter || "(uid={username})").replaceAll("{username}", escapedUsername);
    const entries = await ldapSearch(client, settings.ldapBaseDn, filter);
    if (!entries.length || !entries[0].dn) return null;
    await ldapBind(client, entries[0].dn, password);
    return {
      username,
      fullName: entries[0].cn || entries[0].displayName || username,
      email: entries[0].mail || ""
    };
  } finally {
    client.unbind();
  }
}

function recipientsFrom(value) {
  return String(value || "")
    .split(/[,\s;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function sendMailWithSettings(settings, message) {
  if (!settings.emailEnabled) return { skipped: true, reason: "Email disabled" };
  const to = recipientsFrom(settings.emailRecipients);
  if (!to.length) return { skipped: true, reason: "No recipients" };
  const provider = settings.emailProvider || process.env.SMTP_URL || "";
  if (!provider) return { skipped: true, reason: "No email provider configured" };

  if (provider.startsWith("http://") || provider.startsWith("https://")) {
    const response = await fetch(provider, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...message, to })
    });
    return { ok: response.ok, status: response.status };
  }

  const transport = nodemailer.createTransport(provider);
  const info = await transport.sendMail({
    from: process.env.MAIL_FROM || "project-manager@localhost",
    to,
    subject: message.subject,
    text: message.text
  });
  return { ok: true, messageId: info.messageId };
}

function daysUntil(value) {
  if (!value) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(`${value}T00:00:00`) - today) / 86400000);
}

function riskyTasks(state) {
  return (state?.tasks || [])
    .filter((task) => task.status !== "Bitib")
    .map((task) => {
      const days = daysUntil(task.end);
      if (days < 0) return { label: "Overdue", taskName: task.name, project: task.project, end: task.end };
      if (days === 0) return { label: "Due today", taskName: task.name, project: task.project, end: task.end };
      if (days <= 3) return { label: "Due soon", taskName: task.name, project: task.project, end: task.end };
      return null;
    })
    .filter(Boolean);
}

async function runDeadlineScheduler() {
  const state = await readState();
  const settings = await readSettings();
  const alerts = riskyTasks(state);
  if (!alerts.length) return;
  const lines = alerts.slice(0, 20).map((alert) => `- ${alert.label}: ${alert.taskName} (${alert.project}, ${alert.end})`);
  const result = await sendMailWithSettings(settings, {
    subject: "Project Manager deadline alerts",
    text: lines.join("\n")
  });
  await pool.execute(
    "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('deadline_email', ?, ?, ?, ?, ?)",
    [
      settings.emailRecipients || "",
      "Project Manager deadline alerts",
      lines.join("\n"),
      result.skipped ? "skipped" : "sent",
      JSON.stringify({ result, count: alerts.length })
    ]
  );
}

async function handleApi(request, response) {
  if (request.url?.startsWith("/api/") && request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, PUT, OPTIONS",
      "access-control-allow-headers": "content-type, authorization"
    });
    response.end();
    return true;
  }

  if (request.url === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.url === "/api/settings" && request.method === "GET") {
    if (!requireAuth(request, response)) return true;
    try {
      sendJson(response, 200, await readSettings());
    } catch {
      sendJson(response, 500, { error: "Could not read settings" });
    }
    return true;
  }

  if (request.url === "/api/audit-logs" && request.method === "GET") {
    if (!requireAuth(request, response, ["admin"])) return true;
    const [rows] = await pool.execute("SELECT actor, action, entity_type, entity_id, created_at, details_json FROM audit_logs ORDER BY id DESC LIMIT 100");
    sendJson(response, 200, rows);
    return true;
  }

  if (request.url === "/api/notifications" && request.method === "GET") {
    if (!requireAuth(request, response, ["admin", "manager"])) return true;
    const [rows] = await pool.execute("SELECT type, recipient, subject, status, created_at, payload_json FROM notifications ORDER BY id DESC LIMIT 100");
    sendJson(response, 200, rows);
    return true;
  }

  if (request.url === "/api/settings" && request.method === "PUT") {
    if (!requireAuth(request, response, ["admin"])) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      sendJson(response, 200, { ok: true, settings: await writeSettings(payload) });
    } catch {
      sendJson(response, 400, { error: "Could not save settings" });
    }
    return true;
  }

  if (request.url === "/api/auth/login" && request.method === "POST") {
    try {
      const { username, password } = JSON.parse(await readBody(request));
      const cleanUsername = String(username || "").trim();
      const cleanPassword = String(password || "");
      const state = await readState();
      const localUsers = state?.users?.length ? state.users : bootstrapUsers;
      const localUser = localUsers.find((user) => user.username === cleanUsername && user.passwordHash === md5(cleanPassword));
      if (localUser) {
        sendJson(response, 200, { ok: true, token: tokenForUser(localUser), user: localUser });
        return true;
      }
      const settings = await readSettings();
      const ldapUser = await authenticateLdap(cleanUsername, cleanPassword, settings);
      if (!ldapUser) {
        sendJson(response, 401, { ok: false, error: "Invalid credentials" });
        return true;
      }
      const existingUser = state?.users?.find((user) => user.username === ldapUser.username);
      const user = existingUser || {
        id: `ldap:${ldapUser.username}`,
        username: ldapUser.username,
        passwordHash: "",
        role: "user",
        managerId: "",
        profile: {
          fullName: ldapUser.fullName,
          email: ldapUser.email,
          fatherName: "",
          position: "",
          phone: "",
          address: "",
          company: ""
        }
      };
      sendJson(response, 200, {
        ok: true,
        token: tokenForUser(user),
        user
      });
    } catch {
      sendJson(response, 401, { ok: false, error: "LDAP login failed" });
    }
    return true;
  }

  if (request.url === "/api/mail/deadline-alerts" && request.method === "POST") {
    if (!requireAuth(request, response)) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      const alerts = Array.isArray(payload.alerts) ? payload.alerts : [];
      const settings = await readSettings();
      const lines = alerts.map((alert) => (
        `- ${alert.label}: ${alert.taskName} (${alert.project}, ${alert.end})`
      ));
      const result = await sendMailWithSettings(settings, {
        subject: payload.subject || "Project Manager deadline alerts",
        text: lines.length ? lines.join("\n") : "Deadline alert yoxdur."
      });
      sendJson(response, 200, result);
    } catch {
      sendJson(response, 500, { error: "Could not send email" });
    }
    return true;
  }

  if (request.url === "/api/mail/test" && request.method === "POST") {
    if (!requireAuth(request, response, ["admin"])) return true;
    try {
      const payload = JSON.parse(await readBody(request) || "{}");
      const settings = await readSettings();
      const result = await sendMailWithSettings(settings, {
        subject: payload.subject || "Project Manager test email",
        text: "Project Manager mail ayarlari test edildi."
      });
      await pool.execute(
        "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('test_email', ?, ?, ?, ?, ?)",
        [
          settings.emailRecipients || "",
          payload.subject || "Project Manager test email",
          "Project Manager mail ayarlari test edildi.",
          result.skipped ? "skipped" : "sent",
          JSON.stringify(result)
        ]
      );
      sendJson(response, 200, result);
    } catch {
      sendJson(response, 500, { error: "Could not send test email" });
    }
    return true;
  }

  if (request.url === "/api/state" && request.method === "GET") {
    if (!requireAuth(request, response)) return true;
    try {
      const state = await readState();
      if (!state) {
        sendJson(response, 404, { error: "State has not been created yet" });
        return true;
      }
      sendJson(response, 200, state);
    } catch (error) {
      sendJson(response, 500, { error: "Could not read state" });
    }
    return true;
  }

  if (request.url === "/api/state" && request.method === "PUT") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      if (!validateState(payload)) {
        sendJson(response, 400, { error: "Invalid project manager state" });
        return true;
      }
      const nextState = await writeState({ ...payload, savedBy: actor.username });
      sendJson(response, 200, { ok: true, savedAt: nextState.savedAt });
    } catch (error) {
      sendJson(response, 400, { error: "Could not save state" });
    }
    return true;
  }

  if (request.url?.startsWith("/api/")) {
    sendJson(response, 404, { error: "Not found" });
    return true;
  }

  return false;
}

async function serveStatic(request, response) {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requestedPath).replace(/^[/\\]+/, "").replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

await ensureSchema();

const server = createServer(async (request, response) => {
  if (await handleApi(request, response)) return;
  await serveStatic(request, response);
});

server.listen(port, () => {
  console.log(`Project Manager backend running on http://localhost:${port}`);
});

if (process.env.DEADLINE_SCHEDULER !== "off") {
  setInterval(() => {
    runDeadlineScheduler().catch((error) => console.error("Deadline scheduler failed", error));
  }, 6 * 60 * 60 * 1000);
}
