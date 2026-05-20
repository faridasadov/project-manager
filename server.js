import { createServer, request as httpRequest } from "http";
import { request as httpsRequest } from "https";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { stat } from "fs/promises";
import { createReadStream } from "fs";
import { dirname, extname, normalize, resolve } from "path";
import { fileURLToPath } from "url";
import ldap from "ldapjs";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

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
const pdfFontPath = process.env.PDF_FONT_PATH || "/usr/share/fonts/dejavu-sans-fonts/DejaVuSans.ttf";
const bootstrapUsers = [
  { id: "user-super-admin", username: "superadmin", passwordHash: md5("superadmin123"), role: "super_admin", managerId: "", companyId: "platform", profile: { fullName: "Platform Admin", email: "", fatherName: "", position: "Super Admin", phone: "", address: "", company: "Platform" } },
  { id: "user-admin", username: "adminklinika", passwordHash: md5("adminklinika123"), role: "admin", managerId: "", companyId: "company-default", profile: { fullName: "Klinika Admin", email: "", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Klinika" } },
  { id: "user-manager", username: "manager", passwordHash: md5("manager123"), role: "manager", managerId: "", companyId: "company-default", profile: { fullName: "Project Manager", email: "", fatherName: "", position: "Manager", phone: "", address: "", company: "Klinika" } },
  { id: "user-demo", username: "user", passwordHash: md5("user123"), role: "user", managerId: "user-manager", companyId: "company-default", profile: { fullName: "Demo User", email: "", fatherName: "", position: "User", phone: "", address: "", company: "Klinika" } }
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
    "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, authorization"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, body, contentType, filename) {
  response.writeHead(statusCode, {
    "content-type": contentType,
    "cache-control": "no-store",
    "access-control-allow-origin": corsOrigin,
    "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, authorization",
    ...(filename ? { "content-disposition": `attachment; filename="${filename}"` } : {})
  });
  response.end(body);
}

function md5(value) {
  return createHash("md5").update(String(value)).digest("hex");
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");
  return Buffer.from(padded, "base64");
}

function base64UrlJson(value) {
  return base64UrlEncode(JSON.stringify(value));
}

function signToken(payload) {
  const body = base64UrlJson(payload);
  const signature = base64UrlEncode(createHmac("sha256", authSecret).update(body).digest());
  return `${body}.${signature}`;
}

function verifyToken(token) {
  try {
    if (!token || !token.includes(".")) return null;
    const [body, signature] = token.split(".");
    const expected = base64UrlEncode(createHmac("sha256", authSecret).update(body).digest());
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) return null;
    const payload = JSON.parse(base64UrlDecode(body).toString("utf8"));
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
    companyId: user.companyId || "company-default",
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
    && (!payload.customers || Array.isArray(payload.customers))
    && (!payload.managedFiles || Array.isArray(payload.managedFiles))
    && Array.isArray(payload.members)
    && Array.isArray(payload.teams)
    && Array.isArray(payload.projectLinks)
    && (!payload.registers || Array.isArray(payload.registers))
    && Array.isArray(payload.users)
    && Array.isArray(payload.trash);
}

function createId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function blankState() {
  return {
    version: 1,
    tasks: [],
    projects: [],
    customers: [],
    managedFiles: [],
    members: [],
    teams: [],
    projectLinks: [],
    users: bootstrapUsers,
    trash: []
  };
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
    mailSubjectTemplate: "Project Manager deadline alerts",
    mailBodyTemplate: "{{alerts}}",
    testMailBody: "Project Manager mail ayarlari test edildi.",
    ldapEnabled: false,
    ldapUrl: "",
    ldapBaseDn: "",
    ldapUserFilter: "(uid={username})",
    ldapBindDn: "",
    ldapBindPassword: "",
    ldapGroupRoleMap: "",
    workflowStatuses: ["Plan", "Davam edir", "Bitib"],
    capacityHours: 40,
    companyRegistry: [],
    companyMailSettings: {}
  };
}

function publicSettings(settings, options = {}) {
  const merged = { ...defaultSettings(), ...(settings || {}) };
  return {
    emailEnabled: Boolean(merged.emailEnabled),
    emailRecipients: merged.emailRecipients || "",
    emailProvider: merged.emailProvider || "",
    mailSubjectTemplate: merged.mailSubjectTemplate || "Project Manager deadline alerts",
    mailBodyTemplate: merged.mailBodyTemplate || "{{alerts}}",
    testMailBody: merged.testMailBody || "Project Manager mail ayarlari test edildi.",
    ldapEnabled: Boolean(merged.ldapEnabled),
    ldapUrl: merged.ldapUrl || "",
    ldapBaseDn: merged.ldapBaseDn || "",
    ldapUserFilter: merged.ldapUserFilter || "(uid={username})",
    ldapBindDn: merged.ldapBindDn || "",
    ldapBindPassword: options.includeSecrets ? merged.ldapBindPassword || "" : "",
    ldapBindPasswordSet: Boolean(merged.ldapBindPassword || process.env.LDAP_BIND_PASSWORD),
    ldapGroupRoleMap: merged.ldapGroupRoleMap || "",
    capacityHours: Number(merged.capacityHours) || 40,
    companyRegistry: Array.isArray(merged.companyRegistry) ? merged.companyRegistry : [],
    companyMailSettings: options.includeSecrets ? merged.companyMailSettings || {} : {},
    workflowStatuses: Array.isArray(merged.workflowStatuses) && merged.workflowStatuses.length
      ? merged.workflowStatuses.map((status) => String(status || "").trim()).filter(Boolean)
      : ["Plan", "Davam edir", "Bitib"]
  };
}

async function readSettings() {
  const [rows] = await pool.execute("SELECT settings_json FROM app_settings WHERE id = 1");
  if (!rows.length) return defaultSettings();
  return { ...defaultSettings(), ...JSON.parse(rows[0].settings_json) };
}

async function writeSettings(settings) {
  const current = await readSettings();
  const nextSettings = {
    ...publicSettings({ ...current, ...settings }, { includeSecrets: true }),
    ldapBindPassword: settings.ldapBindPassword ? settings.ldapBindPassword : current.ldapBindPassword || "",
    companyMailSettings: settings.companyMailSettings || current.companyMailSettings || {}
  };
  await pool.execute(
    `INSERT INTO app_settings (id, settings_json)
     VALUES (1, ?)
     ON DUPLICATE KEY UPDATE settings_json = VALUES(settings_json)`,
    [JSON.stringify(nextSettings)]
  );
  return nextSettings;
}

function parseRoleMap(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function roleFromLdapGroups(entry, settings) {
  const memberOf = Array.isArray(entry.memberOf) ? entry.memberOf : [entry.memberOf].filter(Boolean);
  const map = parseRoleMap(settings.ldapGroupRoleMap || process.env.LDAP_GROUP_ROLE_MAP || "");
  for (const [groupNeedle, role] of Object.entries(map)) {
    if (memberOf.some((group) => String(group).toLowerCase().includes(groupNeedle.toLowerCase()))) {
      return ["super_admin", "admin", "manager", "user"].includes(role) ? role : "user";
    }
  }
  return "user";
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
    const bindDn = settings.ldapBindDn || process.env.LDAP_BIND_DN || "";
    const bindPassword = settings.ldapBindPassword || process.env.LDAP_BIND_PASSWORD || "";
    if (bindDn && bindPassword) await ldapBind(client, bindDn, bindPassword);
    const escapedUsername = username
      .split("\\").join("\\5c")
      .split("*").join("\\2a")
      .split("(").join("\\28")
      .split(")").join("\\29");
    const filter = (settings.ldapUserFilter || "(uid={username})").split("{username}").join(escapedUsername);
    const entries = await ldapSearch(client, settings.ldapBaseDn, filter);
    if (!entries.length || !entries[0].dn) return null;
    await ldapBind(client, entries[0].dn, password);
    return {
      username,
      fullName: entries[0].cn || entries[0].displayName || username,
      email: entries[0].mail || "",
      role: roleFromLdapGroups(entries[0], settings)
    };
  } finally {
    client.unbind();
  }
}

async function testLdapSettings(settings) {
  if (!settings.ldapEnabled || !settings.ldapUrl || !settings.ldapBaseDn) {
    return { ok: false, skipped: true, reason: "LDAP disabled or incomplete settings" };
  }
  const client = ldap.createClient({
    url: settings.ldapUrl,
    timeout: 5000,
    connectTimeout: 5000
  });
  try {
    const bindDn = settings.ldapBindDn || process.env.LDAP_BIND_DN || "";
    const bindPassword = settings.ldapBindPassword || process.env.LDAP_BIND_PASSWORD || "";
    if (bindDn && bindPassword) await ldapBind(client, bindDn, bindPassword);
    const entries = await ldapSearch(client, settings.ldapBaseDn, "(objectClass=*)");
    return { ok: true, entries: entries.length };
  } finally {
    client.unbind();
  }
}

function postJson(urlString, payload) {
  return new Promise((resolvePost, rejectPost) => {
    const url = new URL(urlString);
    const client = url.protocol === "https:" ? httpsRequest : httpRequest;
    const body = JSON.stringify(payload);
    const request = client(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": Buffer.byteLength(body)
      }
    }, (response) => {
      response.resume();
      response.on("end", () => resolvePost({
        ok: Boolean(response.statusCode && response.statusCode >= 200 && response.statusCode < 300),
        status: response.statusCode || 0
      }));
    });
    request.setTimeout(15000, () => request.destroy(new Error("HTTP mail provider timeout")));
    request.on("error", rejectPost);
    request.write(body);
    request.end();
  });
}

function normalizeTaskPayload(payload = {}) {
  const progress = Math.min(100, Math.max(0, Number.parseInt(payload.progress || "0", 10)));
  const timeEntries = Array.isArray(payload.timeEntries)
    ? payload.timeEntries.map(normalizeTimeEntry).filter(Boolean)
    : [];
  return {
    id: payload.id || createId("task"),
    name: String(payload.name || "").trim(),
    project: String(payload.project || "").trim(),
    projectResource: payload.projectResource || "",
    start: payload.start || "",
    end: payload.end || "",
    status: payload.status || "Plan",
    priority: payload.priority || "Normal",
    owner: payload.owner || "",
    progress: payload.status === "Bitib" ? 100 : progress,
    notes: payload.notes || "",
    plannedHours: Number(payload.plannedHours) || 0,
    actualHours: Number(payload.actualHours) || 0,
    timeEntries,
    parentTaskId: payload.parentTaskId || "",
    dependencyIds: Array.isArray(payload.dependencyIds) ? payload.dependencyIds : [],
    comments: Array.isArray(payload.comments) ? payload.comments : [],
    attachments: Array.isArray(payload.attachments) ? payload.attachments : []
  };
}

function normalizeTimeEntry(entry = {}) {
  const hours = Number(entry.hours) || 0;
  if (!hours) return null;
  return {
    id: entry.id || createId("time"),
    user: entry.user || "",
    hours,
    date: entry.date || new Date().toISOString().slice(0, 10),
    note: entry.note || "",
    createdAt: entry.createdAt || new Date().toISOString()
  };
}

function actualHoursFromTask(task = {}) {
  const entries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  if (!entries.length) return Number(task.actualHours) || 0;
  return Math.round(entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0) * 100) / 100;
}

function normalizeProjectPayload(payload = {}) {
  const progress = Math.min(100, Math.max(0, Number.parseInt(payload.progress || "0", 10)));
  return {
    id: payload.id || createId("project"),
    name: String(payload.name || "").trim(),
    companyId: payload.companyId || "company-default",
    customerId: payload.customerId || "",
    managerIds: Array.isArray(payload.managerIds) ? payload.managerIds : (payload.managerId ? [payload.managerId] : []),
    teamMemberIds: Array.isArray(payload.teamMemberIds) ? payload.teamMemberIds : [],
    start: payload.start || "",
    end: payload.end || "",
    status: payload.status || "Plan",
    priority: payload.priority || "Normal",
    progress: payload.status === "Bitib" ? 100 : progress,
    archived: Boolean(payload.archived)
  };
}

function ensureStateShape(state) {
  const shaped = { ...blankState(), ...(state || {}) };
  const users = Array.isArray(shaped.users) ? shaped.users : [];
  shaped.users = [
    ...users.map((user) => {
      if (user.id === "user-admin" && user.username === "admin") {
        return {
          ...user,
          username: "adminklinika",
          passwordHash: user.passwordHash === md5("admin123") ? md5("adminklinika123") : user.passwordHash,
          companyId: user.companyId || "company-default",
          profile: { ...(user.profile || {}), fullName: user.profile?.fullName || "Klinika Admin", position: user.profile?.position || "Company Admin", company: user.profile?.company || "Klinika" }
        };
      }
      return user;
    })
  ];
  bootstrapUsers.forEach((bootstrapUser) => {
    if (!shaped.users.some((user) => user.id === bootstrapUser.id || user.username === bootstrapUser.username)) {
      shaped.users.push({ ...bootstrapUser });
    }
  });
  return shaped;
}

function actorCompanyId(actor) {
  return actor?.companyId || "company-default";
}

function itemCompanyId(item) {
  return item?.companyId || "company-default";
}

function sameCompany(item, companyId) {
  return itemCompanyId(item) === companyId;
}

function slugFromName(name) {
  return String(name || "workspace").trim().toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 32) || "workspace";
}

function companyIdFromName(name) {
  const slug = String(name || "workspace").trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return `company-${slug || createId()}`;
}

function projectCompanyMap(state) {
  return new Map((state.projects || []).map((project) => [project.name, itemCompanyId(project)]));
}

function stateForActor(state, actor) {
  const source = ensureStateShape(state);
  if (actor?.role === "super_admin") {
    return {
      version: source.version || 1,
      savedAt: source.savedAt || "",
      tasks: [],
      projects: [],
      customers: [],
      managedFiles: [],
      members: [],
      teams: [],
      projectLinks: [],
      registers: [],
      users: (source.users || []).filter((user) => user.role === "super_admin"),
      trash: []
    };
  }

  const companyId = actorCompanyId(actor);
  const ownProjects = (source.projects || []).filter((project) => sameCompany(project, companyId));
  const ownProjectNames = new Set(ownProjects.map((project) => project.name));
  const ownCustomerIds = new Set(ownProjects.map((project) => project.customerId).filter(Boolean));
  const ownResourceIds = new Set([
    ...(source.members || []).filter((item) => sameCompany(item, companyId)).map((item) => `member:${item.id}`),
    ...(source.teams || []).filter((item) => sameCompany(item, companyId)).map((item) => `team:${item.id}`),
    ...(source.users || []).filter((user) => user.role !== "super_admin" && sameCompany(user, companyId)).map((user) => `user:${user.id}`)
  ]);

  return {
    ...source,
    projects: ownProjects,
    tasks: (source.tasks || []).filter((task) => ownProjectNames.has(task.project)),
    customers: (source.customers || []).filter((customer) => sameCompany(customer, companyId) || ownCustomerIds.has(customer.id)),
    managedFiles: (source.managedFiles || []).filter((file) => sameCompany(file, companyId)),
    members: (source.members || []).filter((member) => sameCompany(member, companyId)),
    teams: (source.teams || []).filter((team) => sameCompany(team, companyId)),
    projectLinks: (source.projectLinks || []).filter((link) => ownProjectNames.has(link.project) || ownResourceIds.has(link.resource)),
    registers: (source.registers || []).filter((item) => ownProjectNames.has(item.project)),
    users: (source.users || []).filter((user) => user.role !== "super_admin" && sameCompany(user, companyId)),
    trash: (source.trash || []).filter((item) => sameCompany(item, companyId))
  };
}

function withCompany(items, companyId) {
  return (items || []).map((item) => ({ ...item, companyId: itemCompanyId(item) === "company-default" ? companyId : itemCompanyId(item) }));
}

function mergeActorState(currentState, incomingState, actor) {
  if (actor?.role === "super_admin") {
    const error = new Error("Super admin cannot modify company state");
    error.statusCode = 403;
    throw error;
  }

  const companyId = actorCompanyId(actor);
  const current = ensureStateShape(currentState);
  const incoming = ensureStateShape(incomingState);
  const currentProjectCompanies = projectCompanyMap(current);
  const incomingProjects = withCompany(incoming.projects, companyId).filter((project) => itemCompanyId(project) === companyId);
  const incomingProjectNames = new Set(incomingProjects.map((project) => project.name));
  const incomingCustomerIds = new Set(incomingProjects.map((project) => project.customerId).filter(Boolean));
  const currentCompanyProjectNames = new Set((current.projects || []).filter((project) => sameCompany(project, companyId)).map((project) => project.name));
  const belongsToCompanyProject = (item) => currentCompanyProjectNames.has(item.project) || incomingProjectNames.has(item.project);

  return {
    ...current,
    ...incoming,
    projects: [
      ...(current.projects || []).filter((project) => !sameCompany(project, companyId)),
      ...incomingProjects
    ],
    tasks: [
      ...(current.tasks || []).filter((task) => !belongsToCompanyProject(task)),
      ...(incoming.tasks || []).filter((task) => incomingProjectNames.has(task.project))
    ],
    customers: [
      ...(current.customers || []).filter((customer) => !sameCompany(customer, companyId) && !incomingCustomerIds.has(customer.id)),
      ...withCompany(incoming.customers, companyId).filter((customer) => sameCompany(customer, companyId) || incomingCustomerIds.has(customer.id))
    ],
    managedFiles: [
      ...(current.managedFiles || []).filter((file) => !sameCompany(file, companyId)),
      ...withCompany(incoming.managedFiles, companyId).filter((file) => sameCompany(file, companyId))
    ],
    members: [
      ...(current.members || []).filter((member) => !sameCompany(member, companyId)),
      ...withCompany(incoming.members, companyId).filter((member) => sameCompany(member, companyId))
    ],
    teams: [
      ...(current.teams || []).filter((team) => !sameCompany(team, companyId)),
      ...withCompany(incoming.teams, companyId).filter((team) => sameCompany(team, companyId))
    ],
    projectLinks: [
      ...(current.projectLinks || []).filter((link) => !currentCompanyProjectNames.has(link.project)),
      ...(incoming.projectLinks || []).filter((link) => incomingProjectNames.has(link.project))
    ],
    registers: [
      ...(current.registers || []).filter((item) => !belongsToCompanyProject(item)),
      ...(incoming.registers || []).filter((item) => incomingProjectNames.has(item.project))
    ],
    users: [
      ...(current.users || []).filter((user) => user.role === "super_admin" || !sameCompany(user, companyId)),
      ...withCompany(incoming.users, companyId).filter((user) => user.role !== "super_admin" && sameCompany(user, companyId))
    ],
    trash: [
      ...(current.trash || []).filter((item) => !sameCompany(item, companyId)),
      ...withCompany(incoming.trash, companyId).filter((item) => sameCompany(item, companyId))
    ],
    savedBy: actor.username
  };
}

function visibleUserForActor(state, actor, userId) {
  const user = (state.users || []).find((item) => item.id === userId);
  if (!user || user.role === "super_admin") return null;
  if (actor?.role === "admin" && sameCompany(user, actorCompanyId(actor))) return user;
  return null;
}

function passwordChangeToken() {
  return base64UrlEncode(`${Date.now()}:${Math.random()}:${createId("pwd")}`);
}

function companyRegistryFromState(state, settings = {}) {
  const existing = new Map((settings.companyRegistry || []).map((company) => [company.id, { ...company }]));
  const usersByCompany = new Map();
  (state.users || []).forEach((user) => {
    if (user.role === "super_admin") return;
    const companyId = itemCompanyId(user);
    const list = usersByCompany.get(companyId) || [];
    list.push(user);
    usersByCompany.set(companyId, list);
  });
  const projectsByCompany = new Map();
  (state.projects || []).forEach((project) => {
    const companyId = itemCompanyId(project);
    projectsByCompany.set(companyId, (projectsByCompany.get(companyId) || 0) + 1);
  });
  const companyIds = new Set([...usersByCompany.keys(), ...projectsByCompany.keys(), ...existing.keys()].filter((id) => id && id !== "platform"));
  return [...companyIds].map((companyId) => {
    const users = usersByCompany.get(companyId) || [];
    const admin = users.find((user) => user.role === "admin");
    const name = existing.get(companyId)?.name || admin?.profile?.company || users[0]?.profile?.company || companyId.replace(/^company-/, "");
    const subdomain = existing.get(companyId)?.subdomain || slugFromName(name);
    return {
      id: companyId,
      name,
      subdomain,
      status: existing.get(companyId)?.status || "active",
      plan: existing.get(companyId)?.plan || "standard",
      adminUsername: admin?.username || existing.get(companyId)?.adminUsername || `admin${subdomain}`,
      userCount: users.length,
      projectCount: projectsByCompany.get(companyId) || 0,
      lastLoginAt: existing.get(companyId)?.lastLoginAt || "",
      createdAt: existing.get(companyId)?.createdAt || new Date().toISOString()
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function companyRegistryEntry(settings, companyId) {
  return (settings.companyRegistry || []).find((company) => company.id === companyId);
}

function companyMailSettings(settings, companyId) {
  const companySettings = settings.companyMailSettings?.[companyId] || {};
  return {
    ...settings,
    ...companySettings,
    emailEnabled: Boolean(companySettings.emailEnabled),
    emailRecipients: companySettings.emailRecipients || "",
    emailProvider: companySettings.emailProvider || "",
    mailSubjectTemplate: companySettings.mailSubjectTemplate || settings.mailSubjectTemplate || "Project Manager deadline alerts",
    mailBodyTemplate: companySettings.mailBodyTemplate || settings.mailBodyTemplate || "{{alerts}}",
    testMailBody: companySettings.testMailBody || settings.testMailBody || "Project Manager mail ayarlari test edildi.",
    mailFrom: companySettings.mailFrom || settings.mailFrom || process.env.MAIL_FROM || "project-manager@localhost"
  };
}

async function recordAuditLog(actor, action, entityType, entityId, details = {}) {
  await pool.execute(
    "INSERT INTO audit_logs (actor, action, entity_type, entity_id, details_json) VALUES (?, ?, ?, ?, ?)",
    [actor || "system", action, entityType || "", entityId || "", JSON.stringify(details)]
  );
}

async function sendPasswordConfirmation(settings, user, token) {
  const email = String(user.profile?.email || "").trim();
  if (!email) return { skipped: true, reason: "User email is empty" };
  return sendMailWithSettings(settings, {
    to: email,
    subject: "Project Manager password confirmation",
    text: [
      "Parol deyisikliyini tesdiq etmek ucun kod:",
      token,
      "",
      "Bu kod 30 deqiqe etibarlidir."
    ].join("\n")
  });
}

function csvCell(value) {
  return `"${String(value ?? "").split('"').join('""')}"`;
}

function stateToCsv(state) {
  const taskRows = [
    ["Type", "ID", "Name", "Project", "Status", "Priority", "Owner", "Start", "End", "Progress", "Planned Hours", "Actual Hours", "Parent", "Dependencies", "Notes"],
    ...(state.tasks || []).map((task) => [
      "Task",
      task.id,
      task.name,
      task.project,
      task.status,
      task.priority,
      task.owner,
      task.start,
      task.end,
      task.progress,
      task.plannedHours || 0,
      actualHoursFromTask(task),
      task.parentTaskId || "",
      (task.dependencyIds || []).join(" | "),
      task.notes || ""
    ]),
    [],
    ["Type", "ID", "Name", "Customer", "Status", "Priority", "Start", "End", "Progress", "Archived", "Managers", "Team"],
    ...(state.projects || []).map((project) => [
      "Project",
      project.id,
      project.name,
      customerLabelFromState(state, project.customerId),
      project.status,
      project.priority,
      project.start,
      project.end,
      project.progress,
      project.archived ? "Yes" : "No",
      (project.managerIds || []).join(" | "),
      (project.teamMemberIds || []).join(" | ")
    ]),
    [],
    ["Type", "ID", "Project", "Register Type", "Title", "Status", "Impact", "Owner", "Due Date", "Mitigation"],
    ...(state.registers || []).map((item) => [
      "Register",
      item.id,
      item.project,
      item.type,
      item.title,
      item.status,
      item.impact,
      item.owner,
      item.dueDate,
      item.mitigation
    ])
  ];
  return taskRows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function resourceLabelFromState(state, value) {
  if (!value) return "-";
  const [type, id] = String(value).split(":");
  if (type === "user") {
    const user = (state.users || []).find((item) => item.id === id);
    return user?.profile?.fullName || user?.username || value;
  }
  if (type === "member") {
    return (state.members || []).find((item) => item.id === id)?.name || value;
  }
  if (type === "team") {
    return (state.teams || []).find((item) => item.id === id)?.name || value;
  }
  return value;
}

function customerLabelFromState(state, customerId) {
  if (!customerId) return "-";
  return (state.customers || []).find((item) => item.id === customerId)?.name || "-";
}

function pdfBuffer(document) {
  return new Promise((resolvePdf, rejectPdf) => {
    const chunks = [];
    document.on("data", (chunk) => chunks.push(chunk));
    document.on("end", () => resolvePdf(Buffer.concat(chunks)));
    document.on("error", rejectPdf);
  });
}

function drawPdfSectionTitle(document, title) {
  document.moveDown(1);
  document.fontSize(14).fillColor("#111827").text(title, { continued: false });
  document.moveDown(0.3);
  document.moveTo(document.x, document.y).lineTo(555, document.y).strokeColor("#d1d5db").stroke();
  document.moveDown(0.5);
}

function drawPdfRow(document, columns, widths) {
  const startX = document.x;
  const heights = columns.map((column, index) => document.heightOfString(String(column ?? ""), { width: widths[index] - 8 }));
  const rowHeight = Math.max(22, ...heights) + 8;
  if (document.y + rowHeight > 780) {
    document.addPage();
  }
  const rowY = document.y;
  widths.reduce((x, width, index) => {
    document.rect(x, rowY, width, rowHeight).strokeColor("#e5e7eb").stroke();
    document.fillColor("#111827").fontSize(8).text(String(columns[index] ?? ""), x + 4, rowY + 4, { width: width - 8 });
    return x + width;
  }, startX);
  document.x = startX;
  document.y = rowY + rowHeight;
}

async function stateToPdf(state) {
  const document = new PDFDocument({ margin: 40, size: "A4", bufferPages: true });
  const done = pdfBuffer(document);
  try {
    document.font(pdfFontPath);
  } catch {
    document.font("Helvetica");
  }

  document.fontSize(18).fillColor("#111827").text("Project Manager hesabatı");
  document.fontSize(9).fillColor("#6b7280").text(`Generated: ${new Date().toISOString()}`);

  drawPdfSectionTitle(document, "Layihələr");
  drawPdfRow(document, ["Ad", "Sifarişçi", "Status", "Prioritet", "Başlama", "Bitmə", "Progress"], [115, 95, 70, 60, 60, 60, 55]);
  (state.projects || []).forEach((project) => {
    drawPdfRow(document, [
      project.name,
      customerLabelFromState(state, project.customerId),
      project.status,
      project.priority,
      project.start || "-",
      project.end || "-",
      `${project.progress || 0}%`
    ], [115, 95, 70, 60, 60, 60, 55]);
  });

  drawPdfSectionTitle(document, "Tasklar");
  drawPdfRow(document, ["Ad", "Layihə", "Status", "İcraçı", "Saat P/F", "Progress"], [125, 95, 65, 75, 80, 75]);
  (state.tasks || []).forEach((task) => {
    drawPdfRow(document, [
      task.name,
      task.project || "-",
      task.status,
      resourceLabelFromState(state, task.owner),
      `${task.plannedHours || 0}/${actualHoursFromTask(task)}`,
      `${task.progress || 0}%`
    ], [125, 95, 65, 75, 80, 75]);
  });

  drawPdfSectionTitle(document, "Registerlər");
  drawPdfRow(document, ["Layihə", "Tip", "Başlıq", "Status", "Impact", "Due"], [105, 65, 150, 70, 60, 65]);
  (state.registers || []).forEach((item) => {
    drawPdfRow(document, [
      item.project || "-",
      item.type || "-",
      item.title || "-",
      item.status || "-",
      item.impact || "-",
      item.dueDate || "-"
    ], [105, 65, 150, 70, 60, 65]);
  });

  document.end();
  return done;
}

function recipientsFrom(value) {
  return String(value || "")
    .split(/[,\s;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function applyMailTemplate(template, values) {
  return String(template || "{{alerts}}").replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => String(values[key] ?? ""));
}

async function sendMailWithSettings(settings, message) {
  if (!settings.emailEnabled) return { skipped: true, reason: "Email disabled" };
  const to = recipientsFrom(message.to || settings.emailRecipients);
  if (!to.length) return { skipped: true, reason: "No recipients" };
  const provider = String(settings.emailProvider || process.env.SMTP_URL || "").trim();
  if (!provider) return { skipped: true, reason: "No email provider configured" };

  if (provider.startsWith("http://") || provider.startsWith("https://")) {
    const response = await postJson(provider, { ...message, to });
    return { ok: response.ok, skipped: !response.ok, status: response.status };
  }

  const transport = nodemailer.createTransport(provider);
  const info = await transport.sendMail({
    from: settings.mailFrom || process.env.MAIL_FROM || "project-manager@localhost",
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
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const pathname = url.pathname;
  if (request.url?.startsWith("/api/") && request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "access-control-allow-headers": "content-type, authorization"
    });
    response.end();
    return true;
  }

  if (pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/settings" && request.method === "GET") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const settings = await readSettings();
      const state = ensureStateShape(await readState());
      const payload = publicSettings(settings);
      if (actor.role === "super_admin") {
        payload.companyRegistry = companyRegistryFromState(state, settings);
      } else {
        const mail = companyMailSettings(settings, actorCompanyId(actor));
        Object.assign(payload, {
          emailEnabled: mail.emailEnabled,
          emailRecipients: mail.emailRecipients,
          emailProvider: mail.emailProvider,
          mailSubjectTemplate: mail.mailSubjectTemplate,
          mailBodyTemplate: mail.mailBodyTemplate,
          testMailBody: mail.testMailBody,
          companyRegistry: []
        });
      }
      sendJson(response, 200, payload);
    } catch {
      sendJson(response, 500, { error: "Could not read settings" });
    }
    return true;
  }

  if (pathname === "/api/audit-logs" && request.method === "GET") {
    if (!requireAuth(request, response, ["admin"])) return true;
    const [rows] = await pool.execute("SELECT actor, action, entity_type, entity_id, created_at, details_json FROM audit_logs ORDER BY id DESC LIMIT 100");
    sendJson(response, 200, rows);
    return true;
  }

  if (pathname === "/api/notifications" && request.method === "GET") {
    if (!requireAuth(request, response, ["admin", "manager"])) return true;
    const [rows] = await pool.execute("SELECT type, recipient, subject, status, created_at, payload_json FROM notifications ORDER BY id DESC LIMIT 100");
    sendJson(response, 200, rows);
    return true;
  }

  if (pathname === "/api/settings" && request.method === "PUT") {
    const actor = requireAuth(request, response, ["super_admin", "admin"]);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      if (actor.role === "admin") {
        const current = await readSettings();
        const companyId = actorCompanyId(actor);
        const companyMail = {
          emailEnabled: Boolean(payload.emailEnabled),
          emailRecipients: payload.emailRecipients || "",
          emailProvider: payload.emailProvider || "",
          mailSubjectTemplate: payload.mailSubjectTemplate || "Project Manager deadline alerts",
          mailBodyTemplate: payload.mailBodyTemplate || "{{alerts}}",
          testMailBody: payload.testMailBody || "Project Manager mail ayarlari test edildi.",
          mailFrom: payload.mailFrom || ""
        };
        const settings = await writeSettings({
          ...current,
          companyMailSettings: { ...(current.companyMailSettings || {}), [companyId]: companyMail }
        });
        await recordAuditLog(actor.username, "company.mail_settings_saved", "company", companyId, { emailEnabled: companyMail.emailEnabled, emailProviderSet: Boolean(companyMail.emailProvider) });
        sendJson(response, 200, { ok: true, settings: companyMail });
        return true;
      }
      sendJson(response, 200, { ok: true, settings: publicSettings(await writeSettings(payload)) });
    } catch {
      sendJson(response, 400, { error: "Could not save settings" });
    }
    return true;
  }

  if (pathname === "/api/platform/companies" && request.method === "GET") {
    if (!requireAuth(request, response, ["super_admin"])) return true;
    const state = ensureStateShape(await readState());
    const settings = await readSettings();
    sendJson(response, 200, companyRegistryFromState(state, settings));
    return true;
  }

  const companyMatch = pathname.match(/^\/api\/platform\/companies\/([^/]+)$/);
  if (companyMatch && request.method === "PATCH") {
    const actor = requireAuth(request, response, ["super_admin"]);
    if (!actor) return true;
    try {
      const companyId = decodeURIComponent(companyMatch[1]);
      const payload = JSON.parse(await readBody(request) || "{}");
      const settings = await readSettings();
      const registry = companyRegistryFromState(ensureStateShape(await readState()), settings);
      const index = registry.findIndex((company) => company.id === companyId);
      if (index < 0) {
        sendJson(response, 404, { error: "Company not found" });
        return true;
      }
      registry[index] = {
        ...registry[index],
        name: payload.name ? String(payload.name).trim() : registry[index].name,
        subdomain: payload.subdomain ? slugFromName(payload.subdomain) : registry[index].subdomain,
        status: ["active", "suspended"].includes(payload.status) ? payload.status : registry[index].status,
        plan: payload.plan ? String(payload.plan).trim() : registry[index].plan
      };
      await writeSettings({ ...settings, companyRegistry: registry });
      await recordAuditLog(actor.username, "company.updated", "company", companyId, registry[index]);
      sendJson(response, 200, registry[index]);
    } catch {
      sendJson(response, 400, { error: "Could not update company" });
    }
    return true;
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    try {
      const { username, password } = JSON.parse(await readBody(request));
      const cleanUsername = String(username || "").trim();
      const cleanPassword = String(password || "");
      const state = ensureStateShape(await readState());
      const stateUsers = state?.users?.length ? state.users : [];
      const localUsers = [
        ...stateUsers,
        ...bootstrapUsers.filter((bootstrapUser) => !stateUsers.some((user) => user.username === bootstrapUser.username))
      ];
      const localUser = localUsers.find((user) => user.username === cleanUsername && user.passwordHash === md5(cleanPassword));
      if (localUser) {
        const settings = await readSettings();
        const company = localUser.role === "super_admin" ? null : companyRegistryEntry(settings, actorCompanyId(localUser));
        if (company?.status === "suspended") {
          sendJson(response, 403, { ok: false, error: "Company suspended" });
          return true;
        }
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
        role: ldapUser.role || "user",
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

  if (pathname === "/api/auth/password-change/request" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    if (actor.role === "super_admin") {
      sendJson(response, 403, { error: "Super admin password is managed outside company workspace" });
      return true;
    }
    try {
      const { newPassword } = JSON.parse(await readBody(request));
      const cleanPassword = String(newPassword || "");
      if (cleanPassword.length < 8) {
        sendJson(response, 400, { error: "Password is too short" });
        return true;
      }
      const state = ensureStateShape(await readState());
      const userIndex = state.users.findIndex((user) => user.id === actor.sub && user.role !== "super_admin");
      if (userIndex < 0) {
        sendJson(response, 404, { error: "User not found" });
        return true;
      }
      const token = passwordChangeToken();
      state.users[userIndex] = {
        ...state.users[userIndex],
        passwordChange: {
          tokenHash: md5(token),
          passwordHash: md5(cleanPassword),
          expiresAt: Date.now() + 30 * 60 * 1000
        }
      };
      await writeState({ ...state, savedBy: actor.username });
      const settings = await readSettings();
      const result = await sendPasswordConfirmation(companyMailSettings(settings, actorCompanyId(actor)), state.users[userIndex], token);
      await pool.execute(
        "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('password_change', ?, ?, ?, ?, ?)",
        [
          state.users[userIndex].profile?.email || actor.username,
          "Password confirmation",
          result.skipped ? result.reason || "Password confirmation was not sent." : "Password confirmation was sent.",
          result.skipped ? "skipped" : (result.ok === false ? "failed" : "sent"),
          JSON.stringify({ result, userId: actor.sub })
        ]
      );
      sendJson(response, 200, { ok: true, sent: !result.skipped && result.ok !== false, skipped: Boolean(result.skipped), reason: result.reason || "" });
    } catch {
      sendJson(response, 400, { error: "Could not request password change" });
    }
    return true;
  }

  if (pathname === "/api/auth/password-change/confirm" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    if (actor.role === "super_admin") {
      sendJson(response, 403, { error: "Super admin password is managed outside company workspace" });
      return true;
    }
    try {
      const { token } = JSON.parse(await readBody(request));
      const state = ensureStateShape(await readState());
      const userIndex = state.users.findIndex((user) => user.id === actor.sub && user.role !== "super_admin");
      const user = state.users[userIndex];
      const requestState = user?.passwordChange;
      if (!user || !requestState || requestState.expiresAt < Date.now() || requestState.tokenHash !== md5(String(token || "").trim())) {
        sendJson(response, 400, { error: "Invalid confirmation token" });
        return true;
      }
      const { passwordChange, ...nextUser } = user;
      state.users[userIndex] = { ...nextUser, passwordHash: requestState.passwordHash };
      await writeState({ ...state, savedBy: actor.username });
      await recordAuditLog(actor.username, "user.password_confirmed", "user", actor.sub, { companyId: actorCompanyId(actor) });
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { error: "Could not confirm password change" });
    }
    return true;
  }

  const passwordMatch = pathname.match(/^\/api\/users\/([^/]+)\/password$/);
  if (passwordMatch && request.method === "PUT") {
    const actor = requireAuth(request, response, ["admin"]);
    if (!actor) return true;
    try {
      const { password } = JSON.parse(await readBody(request));
      const cleanPassword = String(password || "");
      if (cleanPassword.length < 8) {
        sendJson(response, 400, { error: "Password is too short" });
        return true;
      }
      const userId = decodeURIComponent(passwordMatch[1]);
      if (userId === actor.sub) {
        sendJson(response, 403, { error: "Use email confirmation for your own password" });
        return true;
      }
      const state = ensureStateShape(await readState());
      const target = visibleUserForActor(state, actor, userId);
      if (!target) {
        sendJson(response, 404, { error: "User not found" });
        return true;
      }
      target.passwordHash = md5(cleanPassword);
      delete target.password;
      delete target.passwordChange;
      await writeState({ ...state, savedBy: actor.username });
      await recordAuditLog(actor.username, "user.password_changed", "user", target.id, { companyId: actorCompanyId(actor), targetUsername: target.username });
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { error: "Could not change password" });
    }
    return true;
  }

  if (pathname === "/api/mail/deadline-alerts" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      const alerts = Array.isArray(payload.alerts) ? payload.alerts : [];
      const settings = companyMailSettings(await readSettings(), actorCompanyId(actor));
      const lines = alerts.map((alert) => (
        `- ${alert.label}: ${alert.taskName} (${alert.project}, ${alert.end})`
      ));
      const alertText = lines.length ? lines.join("\n") : "Deadline alert yoxdur.";
      const subject = payload.subject || settings.mailSubjectTemplate || "Project Manager deadline alerts";
      const body = applyMailTemplate(payload.template || settings.mailBodyTemplate || "{{alerts}}", {
        alerts: alertText,
        count: alerts.length,
        date: new Date().toISOString().slice(0, 10)
      });
      const result = await sendMailWithSettings(settings, {
        subject,
        text: body
      });
      await pool.execute(
        "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('deadline_email', ?, ?, ?, ?, ?)",
        [
          settings.emailRecipients || "",
          subject,
          body,
          result.skipped ? "skipped" : (result.ok === false ? "failed" : "sent"),
          JSON.stringify({ result, count: alerts.length })
        ]
      );
      sendJson(response, 200, result);
    } catch {
      sendJson(response, 500, { error: "Could not send email" });
    }
    return true;
  }

  if (pathname === "/api/mail/test" && request.method === "POST") {
    const actor = requireAuth(request, response, ["super_admin", "admin"]);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request) || "{}");
      const settings = actor.role === "admin" ? companyMailSettings(await readSettings(), actorCompanyId(actor)) : await readSettings();
      const subject = payload.subject || "Project Manager test email";
      const body = payload.text || settings.testMailBody || "Project Manager mail ayarlari test edildi.";
      const result = await sendMailWithSettings(settings, {
        subject,
        text: body
      });
      await pool.execute(
        "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('test_email', ?, ?, ?, ?, ?)",
        [
          settings.emailRecipients || "",
          subject,
          body,
          result.skipped ? "skipped" : (result.ok === false ? "failed" : "sent"),
          JSON.stringify(result)
        ]
      );
      sendJson(response, 200, result);
    } catch {
      sendJson(response, 500, { error: "Could not send test email" });
    }
    return true;
  }

  if (pathname === "/api/ldap/test" && request.method === "POST") {
    if (!requireAuth(request, response, ["super_admin"])) return true;
    try {
      const settings = await readSettings();
      const result = await testLdapSettings(settings);
      await pool.execute(
        "INSERT INTO notifications (type, recipient, subject, body, status, payload_json) VALUES ('ldap_test', ?, 'LDAP test', ?, ?, ?)",
        [
          settings.ldapUrl || "",
          result.ok ? "LDAP settings test succeeded." : result.reason || "LDAP settings test failed.",
          result.ok ? "ok" : "failed",
          JSON.stringify(result)
        ]
      );
      sendJson(response, result.ok ? 200 : 400, result);
    } catch (error) {
      sendJson(response, 500, { ok: false, error: "Could not test LDAP" });
    }
    return true;
  }

  if (pathname === "/api/projects" && request.method === "GET") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    sendJson(response, 200, stateForActor(state, actor).projects || []);
    return true;
  }

  if (pathname === "/api/projects" && request.method === "POST") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    try {
      const state = ensureStateShape(await readState());
      const project = normalizeProjectPayload({ ...JSON.parse(await readBody(request)), companyId: actorCompanyId(actor) });
      if (!project.name || state.projects.some((item) => sameCompany(item, actorCompanyId(actor)) && item.name.toLowerCase() === project.name.toLowerCase())) {
        sendJson(response, 400, { error: "Invalid project" });
        return true;
      }
      state.projects.push(project);
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 201, project);
    } catch {
      sendJson(response, 400, { error: "Could not create project" });
    }
    return true;
  }

  const projectMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
  if (projectMatch && ["PUT", "PATCH", "DELETE"].includes(request.method || "")) {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    const projectId = decodeURIComponent(projectMatch[1]);
    const state = ensureStateShape(await readState());
    const projectIndex = state.projects.findIndex((item) => item.id === projectId);
    if (projectIndex < 0 || !sameCompany(state.projects[projectIndex], actorCompanyId(actor))) {
      sendJson(response, 404, { error: "Project not found" });
      return true;
    }
    if (request.method === "DELETE") {
      const [project] = state.projects.splice(projectIndex, 1);
      state.trash.push({ id: createId("trash"), type: "projectRecord", data: project, deletedAt: new Date().toISOString(), deletedBy: actor.username });
      state.tasks = state.tasks.map((task) => task.project === project.name ? { ...task, project: "" } : task);
      state.projectLinks = state.projectLinks.filter((link) => link.project !== project.name);
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 200, { ok: true });
      return true;
    }
    try {
      const previous = state.projects[projectIndex];
      const nextProject = normalizeProjectPayload({ ...previous, ...JSON.parse(await readBody(request)), id: previous.id, companyId: previous.companyId || actorCompanyId(actor) });
      if (!nextProject.name || state.projects.some((item) => item.id !== previous.id && sameCompany(item, actorCompanyId(actor)) && item.name.toLowerCase() === nextProject.name.toLowerCase())) {
        sendJson(response, 400, { error: "Invalid project" });
        return true;
      }
      state.projects[projectIndex] = nextProject;
      if (previous.name !== nextProject.name) {
        state.tasks = state.tasks.map((task) => task.project === previous.name ? { ...task, project: nextProject.name } : task);
        state.projectLinks = state.projectLinks.map((link) => link.project === previous.name ? { ...link, project: nextProject.name } : link);
      }
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 200, nextProject);
    } catch {
      sendJson(response, 400, { error: "Could not update project" });
    }
    return true;
  }

  if (pathname === "/api/tasks" && request.method === "GET") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    const scoped = stateForActor(state, actor);
    const project = url.searchParams.get("project");
    const tasks = project ? (scoped.tasks || []).filter((task) => task.project === project) : scoped.tasks || [];
    sendJson(response, 200, tasks);
    return true;
  }

  if (pathname === "/api/tasks" && request.method === "POST") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    try {
      const state = ensureStateShape(await readState());
      const task = normalizeTaskPayload(JSON.parse(await readBody(request)));
      if (!task.name || (task.project && !state.projects.some((project) => project.name === task.project && sameCompany(project, actorCompanyId(actor))))) {
        sendJson(response, 400, { error: "Invalid task" });
        return true;
      }
      state.tasks.push(task);
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 201, task);
    } catch {
      sendJson(response, 400, { error: "Could not create task" });
    }
    return true;
  }

  const taskMatch = pathname.match(/^\/api\/tasks\/([^/]+)$/);
  if (taskMatch && ["PUT", "PATCH", "DELETE"].includes(request.method || "")) {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    const taskId = decodeURIComponent(taskMatch[1]);
    const state = ensureStateShape(await readState());
    const taskIndex = state.tasks.findIndex((item) => item.id === taskId);
    const taskProject = state.projects.find((project) => project.name === state.tasks[taskIndex]?.project);
    if (taskIndex < 0 || !sameCompany(taskProject, actorCompanyId(actor))) {
      sendJson(response, 404, { error: "Task not found" });
      return true;
    }
    if (request.method === "DELETE") {
      const [task] = state.tasks.splice(taskIndex, 1);
      state.trash.push({ id: createId("trash"), type: "task", data: task, deletedAt: new Date().toISOString(), deletedBy: actor.username });
      state.tasks = state.tasks.map((item) => ({
        ...item,
        parentTaskId: item.parentTaskId === task.id ? "" : item.parentTaskId,
        dependencyIds: (item.dependencyIds || []).filter((id) => id !== task.id)
      }));
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 200, { ok: true });
      return true;
    }
    try {
      const previous = state.tasks[taskIndex];
      const task = normalizeTaskPayload({ ...previous, ...JSON.parse(await readBody(request)), id: previous.id });
      if (!task.name || (task.project && !state.projects.some((project) => project.name === task.project && sameCompany(project, actorCompanyId(actor))))) {
        sendJson(response, 400, { error: "Invalid task" });
        return true;
      }
      state.tasks[taskIndex] = task;
      await writeState({ ...state, savedBy: actor.username });
      sendJson(response, 200, task);
    } catch {
      sendJson(response, 400, { error: "Could not update task" });
    }
    return true;
  }

  if (pathname === "/api/export/excel" && request.method === "GET") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    sendText(response, 200, stateToCsv(stateForActor(state, actor)), "text/csv; charset=utf-8", "project-manager-export.csv");
    return true;
  }

  if (pathname === "/api/export/pdf" && request.method === "GET") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    sendText(response, 200, await stateToPdf(stateForActor(state, actor)), "application/pdf", "project-manager-report.pdf");
    return true;
  }

  if (pathname === "/api/state" && request.method === "GET") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const state = await readState();
      if (!state) {
        sendJson(response, 404, { error: "State has not been created yet" });
        return true;
      }
      sendJson(response, 200, stateForActor(state, actor));
    } catch (error) {
      sendJson(response, 500, { error: "Could not read state" });
    }
    return true;
  }

  if (pathname === "/api/state" && request.method === "PUT") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      if (!validateState(payload)) {
        sendJson(response, 400, { error: "Invalid project manager state" });
        return true;
      }
      const currentState = ensureStateShape(await readState());
      const nextState = await writeState(mergeActorState(currentState, payload, actor));
      sendJson(response, 200, { ok: true, savedAt: nextState.savedAt });
    } catch (error) {
      sendJson(response, error.statusCode || 400, { error: "Could not save state" });
    }
    return true;
  }

  if (pathname.startsWith("/api/")) {
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
