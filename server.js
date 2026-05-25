import { createServer, request as httpRequest } from "http";
import { request as httpsRequest } from "https";
import { createHash, createHmac, timingSafeEqual, scryptSync, randomBytes } from "crypto";
import { stat, mkdir, writeFile } from "fs/promises";
import { createReadStream } from "fs";
import { dirname, extname, normalize, resolve, join } from "path";
import { fileURLToPath } from "url";
import ldap from "ldapjs";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

const rootDir = dirname(fileURLToPath(import.meta.url));
const uploadsDir = join(rootDir, "uploads");
const port = Number(process.env.PORT || 3000);
const authSecret = process.env.AUTH_SECRET || "project-manager-change-this-secret";
if (authSecret === "project-manager-change-this-secret") {
  console.warn("[SECURITY] AUTH_SECRET is using the default value. Set AUTH_SECRET in your .env file before deploying.");
}
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
const tenantSeedState = {
  users: [
    { id: "user-admin-digital", username: "admindigital", passwordHash: md5("admindigital123"), role: "admin", managerId: "", companyId: "company-digital", profile: { fullName: "Digital Admin", email: "admin@digital.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Digital Solutions" } },
    { id: "user-manager-2", username: "manager2", passwordHash: md5("manager123"), role: "manager", managerId: "", companyId: "company-digital", profile: { fullName: "Aysel Manager", email: "aysel.manager@example.com", fatherName: "", position: "Delivery Manager", phone: "", address: "", company: "Digital Solutions" } },
    { id: "user-admin-logistics", username: "adminlogistika", passwordHash: md5("adminlogistika123"), role: "admin", managerId: "", companyId: "company-logistics", profile: { fullName: "Logistika Admin", email: "admin@logistika.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Logistika Group" } },
    { id: "user-manager-logistics", username: "managerlogistika", passwordHash: md5("managerlogistika123"), role: "manager", managerId: "", companyId: "company-logistics", profile: { fullName: "Logistika Manager", email: "manager@logistika.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Logistika Group" } },
    { id: "user-admin-qarabag", username: "adminqarabag", passwordHash: md5("adminqarabag123"), role: "admin", managerId: "", companyId: "company-qarabag", profile: { fullName: "Qarabag Admin", email: "admin@qarabag.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Qarabag University" } },
    { id: "user-manager-qarabag", username: "managerqarabag", passwordHash: md5("managerqarabag123"), role: "manager", managerId: "", companyId: "company-qarabag", profile: { fullName: "Qarabag Manager", email: "manager@qarabag.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Qarabag University" } },
    { id: "user-admin-retail", username: "adminretail", passwordHash: md5("adminretail123"), role: "admin", managerId: "", companyId: "company-retail", profile: { fullName: "Retail Admin", email: "admin@retail.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Retail Group" } },
    { id: "user-manager-retail", username: "managerretail", passwordHash: md5("managerretail123"), role: "manager", managerId: "", companyId: "company-retail", profile: { fullName: "Retail Manager", email: "manager@retail.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Retail Group" } }
  ],
  customers: [
    { id: "customer-digital-solutions", companyId: "company-digital", name: "Digital Solutions", contact: "Digital PMO", email: "pmo@digital.local" },
    { id: "customer-logistics-group", companyId: "company-logistics", name: "Logistika Group", contact: "Operations Office", email: "ops@logistika.local" },
    { id: "customer-qarabag-university", companyId: "company-qarabag", name: "Qarabag University", contact: "Campus Operations", email: "ops@qarabag.local" },
    { id: "customer-retail-group", companyId: "company-retail", name: "Retail Group", contact: "Store Operations", email: "ops@retail.local" }
  ],
  projects: [
    { id: "project-digital-crm", companyId: "company-digital", name: "Digital CRM Rollout", customerId: "customer-digital-solutions", managerIds: ["user-manager-2"], teamMemberIds: [], start: "2026-06-01", end: "2026-08-15", status: "Davam edir", priority: "Yüksək", progress: 28 },
    { id: "project-logistics-wms", companyId: "company-logistics", name: "Logistika WMS Modernizasiya", customerId: "customer-logistics-group", managerIds: ["user-manager-logistics"], teamMemberIds: [], start: "2026-06-10", end: "2026-09-30", status: "Plan", priority: "Normal", progress: 0 },
    { id: "project-qarabag-helpdesk", companyId: "company-qarabag", name: "Campus Helpdesk Platform", customerId: "customer-qarabag-university", managerIds: ["user-manager-qarabag"], teamMemberIds: [], start: "2026-07-01", end: "2026-10-15", status: "Plan", priority: "Yüksək", progress: 0 },
    { id: "project-qarabag-network", companyId: "company-qarabag", name: "Dormitory Network Expansion", customerId: "customer-qarabag-university", managerIds: ["user-manager-qarabag"], teamMemberIds: [], start: "2026-07-10", end: "2026-11-30", status: "Plan", priority: "Normal", progress: 0 },
    { id: "project-retail-pos", companyId: "company-retail", name: "Retail POS Upgrade", customerId: "customer-retail-group", managerIds: ["user-manager-retail"], teamMemberIds: [], start: "2026-06-20", end: "2026-09-20", status: "Davam edir", priority: "Yüksək", progress: 18 },
    { id: "project-retail-inventory", companyId: "company-retail", name: "Inventory Forecasting", customerId: "customer-retail-group", managerIds: ["user-manager-retail"], teamMemberIds: [], start: "2026-08-01", end: "2026-12-10", status: "Plan", priority: "Normal", progress: 0 }
  ],
  tasks: [
    { id: "task-digital-crm-01", project: "Digital CRM Rollout", name: "Tenant CRM scope", owner: "user:user-manager-2", start: "2026-06-01", end: "2026-06-12", status: "Davam edir", priority: "Yüksək", progress: 35, notes: "Digital şirkəti üçün CRM modulları və rollar dəqiqləşdirilir." },
    { id: "task-digital-crm-02", project: "Digital CRM Rollout", name: "Migration rehearsal", owner: "user:user-manager-2", start: "2026-06-15", end: "2026-06-28", status: "Plan", priority: "Normal", progress: 0, dependencyIds: ["task-digital-crm-01"], notes: "Müştəri datalarının test mühitinə köçürülməsi." },
    { id: "task-logistics-wms-01", project: "Logistika WMS Modernizasiya", name: "Anbar proses xəritəsi", owner: "user:user-manager-logistics", start: "2026-06-10", end: "2026-06-24", status: "Plan", priority: "Normal", progress: 0, notes: "Qəbul, yerləşdirmə, picking və dispatch prosesləri toplanır." },
    { id: "task-logistics-wms-02", project: "Logistika WMS Modernizasiya", name: "Barcode pilot", owner: "user:user-manager-logistics", start: "2026-06-25", end: "2026-07-08", status: "Plan", priority: "Yüksək", progress: 0, dependencyIds: ["task-logistics-wms-01"], notes: "Pilot anbar üçün barcode avadanlıq və test ssenariləri." },
    { id: "task-qarabag-helpdesk-01", project: "Campus Helpdesk Platform", name: "Ticket workflow", owner: "user:user-manager-qarabag", start: "2026-07-01", end: "2026-07-18", status: "Plan", priority: "Yüksək", progress: 0, notes: "Tələbə və əməkdaş müraciət axınları modelləşdirilir." },
    { id: "task-qarabag-network-01", project: "Dormitory Network Expansion", name: "Switch placement plan", owner: "user:user-manager-qarabag", start: "2026-07-10", end: "2026-07-28", status: "Plan", priority: "Normal", progress: 0, notes: "Yataqxana mərtəbələri üzrə switch və fiber xəritəsi hazırlanır." },
    { id: "task-retail-pos-01", project: "Retail POS Upgrade", name: "Pilot store rollout", owner: "user:user-manager-retail", start: "2026-06-20", end: "2026-07-05", status: "Davam edir", priority: "Yüksək", progress: 25, notes: "İlk mağazada POS terminal və receipt printer sınaqları." },
    { id: "task-retail-inventory-01", project: "Inventory Forecasting", name: "Sales data mapping", owner: "user:user-manager-retail", start: "2026-08-01", end: "2026-08-14", status: "Plan", priority: "Normal", progress: 0, notes: "Satış və stok tarixçəsi forecast modeli üçün xəritələnir." }
  ]
};

const tenantUserCompanyMigrations = {
  manager2: { companyId: "company-digital", company: "Digital Solutions" },
  rashad: { companyId: "company-digital", company: "Digital Solutions" },
  nigar: { companyId: "company-digital", company: "Digital Solutions" }
};

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

const sseClients = new Set();

function broadcastStateChange(companyId) {
  const payload = `data: ${JSON.stringify({ type: "state_updated", companyId, ts: Date.now() })}\n\n`;
  for (const client of sseClients) {
    if (client.companyId === companyId || companyId === "platform") {
      try { client.response.write(payload); } catch {}
    }
  }
}

const PROJECT_TEMPLATES = [
  {
    id: "software",
    name: "Software Development",
    description: "Agile sprint tsikli: analiz, inkişaf, test, deployment",
    category: "IT",
    tasks: [
      { name: "Tələblər analizi", status: "Plan", priority: "Yüksək", offsetDays: 0, durationDays: 5 },
      { name: "Arxitektura dizaynı", status: "Plan", priority: "Yüksək", offsetDays: 5, durationDays: 5 },
      { name: "Backend inkişafı", status: "Plan", priority: "Yüksək", offsetDays: 10, durationDays: 20 },
      { name: "Frontend inkişafı", status: "Plan", priority: "Normal", offsetDays: 10, durationDays: 20 },
      { name: "Unit testlər", status: "Plan", priority: "Normal", offsetDays: 25, durationDays: 7 },
      { name: "İnteqrasiya testləri", status: "Plan", priority: "Yüksək", offsetDays: 30, durationDays: 5 },
      { name: "UAT və müştəri qəbulu", status: "Plan", priority: "Yüksək", offsetDays: 35, durationDays: 5 },
      { name: "Production deployment", status: "Plan", priority: "Kritik", offsetDays: 40, durationDays: 2 },
      { name: "Sənədləşmə", status: "Plan", priority: "Aşağı", offsetDays: 38, durationDays: 7 }
    ]
  },
  {
    id: "infrastructure",
    name: "IT İnfrastruktur",
    description: "Server, şəbəkə, avadanlıq layihəsi",
    category: "IT",
    tasks: [
      { name: "Mövcud infrastruktur audit", status: "Plan", priority: "Yüksək", offsetDays: 0, durationDays: 5 },
      { name: "Texniki dizayn sənədi", status: "Plan", priority: "Yüksək", offsetDays: 5, durationDays: 7 },
      { name: "Avadanlıq satınalma", status: "Plan", priority: "Normal", offsetDays: 10, durationDays: 14 },
      { name: "Server otağı hazırlığı", status: "Plan", priority: "Normal", offsetDays: 14, durationDays: 7 },
      { name: "Avadanlıq qurulumu", status: "Plan", priority: "Yüksək", offsetDays: 24, durationDays: 10 },
      { name: "Şəbəkə konfiqurasiyası", status: "Plan", priority: "Yüksək", offsetDays: 30, durationDays: 7 },
      { name: "Sistem testləri", status: "Plan", priority: "Yüksək", offsetDays: 37, durationDays: 5 },
      { name: "İstifadəçi təlimi", status: "Plan", priority: "Normal", offsetDays: 40, durationDays: 3 },
      { name: "Təhvilat", status: "Plan", priority: "Normal", offsetDays: 43, durationDays: 2 }
    ]
  },
  {
    id: "marketing",
    name: "Marketinq Kampaniyası",
    description: "Brendinq, kontent, launch tsikli",
    category: "Marketing",
    tasks: [
      { name: "Bazar araşdırması", status: "Plan", priority: "Yüksək", offsetDays: 0, durationDays: 7 },
      { name: "Kampaniya strategiyası", status: "Plan", priority: "Yüksək", offsetDays: 7, durationDays: 5 },
      { name: "Kreativ brief", status: "Plan", priority: "Normal", offsetDays: 10, durationDays: 3 },
      { name: "Kontent istehsalı", status: "Plan", priority: "Normal", offsetDays: 14, durationDays: 14 },
      { name: "Dizayn materialları", status: "Plan", priority: "Normal", offsetDays: 14, durationDays: 10 },
      { name: "Media planlaması", status: "Plan", priority: "Yüksək", offsetDays: 20, durationDays: 5 },
      { name: "Soft launch", status: "Plan", priority: "Yüksək", offsetDays: 28, durationDays: 3 },
      { name: "Tam başlanğıc", status: "Plan", priority: "Kritik", offsetDays: 31, durationDays: 1 },
      { name: "Performans analizi", status: "Plan", priority: "Normal", offsetDays: 32, durationDays: 7 }
    ]
  },
  {
    id: "basic",
    name: "Sadə Layihə",
    description: "Ümumi məqsədli boş layihə şablonu",
    category: "General",
    tasks: [
      { name: "Layihə başlanğıcı", status: "Plan", priority: "Normal", offsetDays: 0, durationDays: 3 },
      { name: "Planlaşdırma", status: "Plan", priority: "Normal", offsetDays: 3, durationDays: 5 },
      { name: "İcra", status: "Plan", priority: "Normal", offsetDays: 8, durationDays: 14 },
      { name: "Yekun", status: "Plan", priority: "Normal", offsetDays: 22, durationDays: 3 }
    ]
  }
];

function hashPassword(plain) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(plain), salt, 32, { N: 16384, r: 8, p: 1 }).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(plain, stored) {
  if (String(stored || "").startsWith("scrypt:")) {
    const parts = stored.split(":");
    if (parts.length !== 3) return false;
    const [, salt, hash] = parts;
    try {
      const attempt = scryptSync(String(plain), salt, 32, { N: 16384, r: 8, p: 1 }).toString("hex");
      const hashBuf = Buffer.from(hash, "hex");
      const attemptBuf = Buffer.from(attempt, "hex");
      return hashBuf.length === attemptBuf.length && timingSafeEqual(hashBuf, attemptBuf);
    } catch {
      return false;
    }
  }
  return md5(plain) === stored;
}

const loginAttempts = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  loginAttempts.set(ip, { ...entry, count: entry.count + 1 });
  return true;
}

function clearRateLimit(ip) {
  loginAttempts.delete(ip);
}

const revokedTokens = new Set();

setInterval(() => {
  const now = Date.now();
  for (const key of revokedTokens) {
    const exp = Number(key.split(":")[1] || 0);
    if (exp && exp < now) revokedTokens.delete(key);
  }
}, 60 * 60 * 1000);

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
    if (revokedTokens.has(`${payload.sub}:${payload.exp}`)) return null;
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
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS schema_version (
      version INT NOT NULL PRIMARY KEY
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id VARCHAR(128) NOT NULL PRIMARY KEY,
      user_id VARCHAR(128) NOT NULL,
      token_hash VARCHAR(64) NOT NULL,
      expires_at DATETIME NOT NULL,
      used TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_pr_user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function runMigrations() {
  const [versionRows] = await pool.execute("SELECT COALESCE(MAX(version), 0) AS v FROM schema_version");
  let currentVersion = Number(versionRows[0]?.v ?? 0);

  if (currentVersion < 1) {
    const [ccol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'comments' AND CONSTRAINT_NAME = 'fk_comments_task_id'"
    );
    if (!ccol[0].cnt) {
      await pool.execute("ALTER TABLE comments ADD CONSTRAINT fk_comments_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE");
    }
    const [acol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'attachments' AND CONSTRAINT_NAME = 'fk_attachments_task_id'"
    );
    if (!acol[0].cnt) {
      await pool.execute("ALTER TABLE attachments ADD CONSTRAINT fk_attachments_task_id FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE");
    }
    const [pmcol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'project_members' AND CONSTRAINT_NAME = 'fk_pm_project_id'"
    );
    if (!pmcol[0].cnt) {
      await pool.execute("ALTER TABLE project_members ADD CONSTRAINT fk_pm_project_id FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE");
    }
    const [tmcol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'team_members' AND CONSTRAINT_NAME = 'fk_tm_team_id'"
    );
    if (!tmcol[0].cnt) {
      await pool.execute("ALTER TABLE team_members ADD CONSTRAINT fk_tm_team_id FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE");
    }
    const [pidcol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'tasks' AND COLUMN_NAME = 'project_id'"
    );
    if (!pidcol[0].cnt) {
      await pool.execute("ALTER TABLE tasks ADD COLUMN project_id VARCHAR(128) NULL, ADD INDEX idx_tasks_project_id (project_id)");
    }
    await pool.execute("INSERT IGNORE INTO schema_version (version) VALUES (1)");
    currentVersion = 1;
    console.log("[migration] v1: FK constraints and project_id column added");
  }

  if (currentVersion < 2) {
    const [budgetCol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'budget'"
    );
    if (!budgetCol[0].cnt) {
      await pool.execute("ALTER TABLE projects ADD COLUMN budget DECIMAL(15,2) NOT NULL DEFAULT 0");
    }
    const [descCol] = await pool.execute(
      "SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'projects' AND COLUMN_NAME = 'description'"
    );
    if (!descCol[0].cnt) {
      await pool.execute("ALTER TABLE projects ADD COLUMN description TEXT NULL DEFAULT NULL");
    }
    await pool.execute("INSERT IGNORE INTO schema_version (version) VALUES (2)");
    currentVersion = 2;
    console.log("[migration] v2: budget and description columns added to projects");
  }
}

async function readState() {
  const [rows] = await pool.execute("SELECT state_json FROM app_state WHERE id = 1");
  if (!rows.length) return null;
  return JSON.parse(rows[0].state_json);
}

async function writeState(payload, broadcastCompanyId = null) {
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
  if (broadcastCompanyId) broadcastStateChange(broadcastCompanyId);
  return nextState;
}

function recalcProjectProgress(state, projectName) {
  if (!projectName) return state;
  const idx = state.projects.findIndex((p) => p.name === projectName);
  if (idx < 0) return state;
  const projectTasks = state.tasks.filter((t) => t.project === projectName);
  if (!projectTasks.length) return state;
  const avg = Math.round(projectTasks.reduce((sum, t) => sum + (Number(t.progress) || 0), 0) / projectTasks.length);
  state.projects[idx] = { ...state.projects[idx], progress: avg };
  return state;
}

function validateTaskDates(task) {
  if (task.start && task.end && task.start > task.end) {
    return "Start date cannot be after end date";
  }
  return null;
}

function validateTaskOwner(task, state) {
  if (!task.owner || !task.owner.startsWith("user:")) return null;
  const userId = task.owner.slice(5);
  const inState = state.users.some((u) => u.id === userId);
  const inBootstrap = bootstrapUsers.some((u) => u.id === userId);
  if (!inState && !inBootstrap) return `Owner user '${userId}' not found`;
  return null;
}

function validateTaskDependencies(task, state) {
  const depIds = task.dependencyIds || [];
  if (!depIds.length || task.status === "Plan") return null;
  const incomplete = depIds.filter((id) => {
    const dep = state.tasks.find((t) => t.id === id);
    return dep && dep.status !== "Bitib";
  });
  if (!incomplete.length) return null;
  const names = incomplete.map((id) => state.tasks.find((t) => t.id === id)?.name || id);
  return `Dependencies not complete: ${names.join(", ")}`;
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
    appName: "Project Manager",
    appLogo: "PM",
    defaultLanguage: "az",
    defaultTheme: "light",
    maintenanceMode: false,
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
    appName: merged.appName || "Project Manager",
    appLogo: merged.appLogo || "PM",
    defaultLanguage: merged.defaultLanguage || "az",
    defaultTheme: merged.defaultTheme || "light",
    maintenanceMode: Boolean(merged.maintenanceMode),
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
  const charter = payload.charter || {};
  const start = payload.start || "";
  const end = payload.end || "";
  if (start && end && start > end) {
    const err = new Error("Project start date cannot be after end date");
    err.statusCode = 400;
    throw err;
  }
  return {
    id: payload.id || createId("project"),
    name: String(payload.name || "").trim(),
    companyId: payload.companyId || "company-default",
    customerId: payload.customerId || "",
    managerIds: Array.isArray(payload.managerIds) ? payload.managerIds : (payload.managerId ? [payload.managerId] : []),
    teamMemberIds: Array.isArray(payload.teamMemberIds) ? payload.teamMemberIds : [],
    start,
    end,
    status: payload.status || "Plan",
    priority: payload.priority || "Normal",
    progress: payload.status === "Bitib" ? 100 : progress,
    archived: Boolean(payload.archived),
    lifecycle: payload.lifecycle || "Initiation",
    description: String(payload.description || ""),
    budget: Math.max(0, Number(payload.budget) || 0),
    charter: {
      goal: charter.goal || "",
      scope: charter.scope || "",
      successCriteria: charter.successCriteria || "",
      gateChecklist: Array.isArray(charter.gateChecklist) ? charter.gateChecklist : [],
      closureNotes: charter.closureNotes || "",
      stakeholders: Array.isArray(charter.stakeholders) ? charter.stakeholders : [],
      communicationPlan: Array.isArray(charter.communicationPlan) ? charter.communicationPlan : [],
      decisionLog: Array.isArray(charter.decisionLog) ? charter.decisionLog : [],
      changeControl: Array.isArray(charter.changeControl) ? charter.changeControl : [],
      riskOpportunity: Array.isArray(charter.riskOpportunity) ? charter.riskOpportunity : [],
      qualityChecklist: Array.isArray(charter.qualityChecklist) ? charter.qualityChecklist : [],
      competenceMatrix: Array.isArray(charter.competenceMatrix) ? charter.competenceMatrix : [],
      gateApprovals: charter.gateApprovals || {}
    }
  };
}

function ensureStateShape(state) {
  const shaped = { ...blankState(), ...(state || {}) };
  const users = Array.isArray(shaped.users) ? shaped.users : [];
  shaped.customers = Array.isArray(shaped.customers) ? shaped.customers : [];
  shaped.projects = Array.isArray(shaped.projects) ? shaped.projects : [];
  shaped.tasks = Array.isArray(shaped.tasks) ? shaped.tasks : [];
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
      const tenantMigration = tenantUserCompanyMigrations[user.username];
      if (tenantMigration) {
        return {
          ...user,
          companyId: tenantMigration.companyId,
          profile: { ...(user.profile || {}), company: tenantMigration.company }
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
  tenantSeedState.users.forEach((seedUser) => {
    if (!shaped.users.some((user) => user.id === seedUser.id || user.username === seedUser.username)) {
      shaped.users.push({ ...seedUser });
    }
  });
  tenantSeedState.customers.forEach((seedCustomer) => {
    if (!shaped.customers.some((customer) => customer.id === seedCustomer.id || customer.name === seedCustomer.name)) {
      shaped.customers.push({ ...seedCustomer });
    }
  });
  tenantSeedState.projects.forEach((seedProject) => {
    if (!shaped.projects.some((project) => project.id === seedProject.id || project.name === seedProject.name)) {
      shaped.projects.push({ ...seedProject });
    }
  });
  tenantSeedState.tasks.forEach((seedTask) => {
    if (!shaped.tasks.some((task) => task.id === seedTask.id || (task.project === seedTask.project && task.name === seedTask.name))) {
      shaped.tasks.push({ ...seedTask });
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

function jsonBackupForActor(state, actor) {
  const scopedState = stateForActor(ensureStateShape(state), actor);
  return {
    version: 1,
    type: "project-manager-json-backup",
    exportedAt: new Date().toISOString(),
    exportedBy: actor?.username || "system",
    role: actor?.role || "",
    companyId: actorCompanyId(actor),
    state: scopedState
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
      createdAt: existing.get(companyId)?.createdAt || new Date().toISOString(),
      trialEndsAt: existing.get(companyId)?.trialEndsAt || "",
      subscriptionEndsAt: existing.get(companyId)?.subscriptionEndsAt || "",
      statusChangedAt: existing.get(companyId)?.statusChangedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      activatedAt: existing.get(companyId)?.activatedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      suspendedAt: existing.get(companyId)?.suspendedAt || "",
      statusChangedBy: existing.get(companyId)?.statusChangedBy || "",
      statusReason: existing.get(companyId)?.statusReason || ""
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

function projectGovernanceAuditFromState(state, project = {}) {
  const charter = project.charter || {};
  const projectRegisters = (state.registers || []).filter((item) => item.project === project.name);
  const checks = [
    ["Project charter", Boolean(charter.goal)],
    ["Scope", Boolean(charter.scope)],
    ["Success criteria", Boolean(charter.successCriteria)],
    ["Planning gate checklist", Boolean(charter.gateChecklist?.length)],
    ["Stakeholder register", Boolean(charter.stakeholders?.length)],
    ["Communication plan", Boolean(charter.communicationPlan?.length)],
    ["Decision log", Boolean(charter.decisionLog?.length)],
    ["Change control", Boolean(charter.changeControl?.length)],
    ["Risk and opportunity", Boolean(charter.riskOpportunity?.length || projectRegisters.some((item) => item.type === "risk"))],
    ["Quality checklist", Boolean(charter.qualityChecklist?.length)],
    ["Competence matrix", Boolean(charter.competenceMatrix?.length)]
  ];
  const done = checks.filter(([, ok]) => ok).length;
  const approvals = charter.gateApprovals || {};
  const approvedGates = ["Initiation", "Planning", "Execution", "Closing"].filter((gate) => approvals[gate]?.approvedAt);
  const openGovernanceRisks = projectRegisters.filter((item) => item.status !== "Resolved" && ["risk", "issue"].includes(item.type));
  return {
    score: Math.round((done / checks.length) * 100),
    done,
    total: checks.length,
    missing: checks.filter(([, ok]) => !ok).map(([label]) => label),
    approvedGates,
    openGovernanceRisks
  };
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
    ["Type", "Project", "Lifecycle", "IPMA Score", "Coverage", "Approved Gates", "Open Risks/Issues", "Missing IPMA Fields"],
    ...(state.projects || []).map((project) => {
      const audit = projectGovernanceAuditFromState(state, project);
      return [
        "IPMA",
        project.name,
        project.lifecycle || "Initiation",
        `${audit.score}%`,
        `${audit.done}/${audit.total}`,
        `${audit.approvedGates.length}/4`,
        audit.openGovernanceRisks.length,
        audit.missing.join(" | ")
      ];
    }),
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

  drawPdfSectionTitle(document, "IPMA / Governance");
  drawPdfRow(document, ["Layihə", "Lifecycle", "IPMA", "Coverage", "Gate", "Risk", "Çatışmayan sahələr"], [95, 65, 45, 60, 45, 45, 160]);
  (state.projects || []).forEach((project) => {
    const audit = projectGovernanceAuditFromState(state, project);
    drawPdfRow(document, [
      project.name,
      project.lifecycle || "Initiation",
      `${audit.score}%`,
      `${audit.done}/${audit.total}`,
      `${audit.approvedGates.length}/4`,
      audit.openGovernanceRisks.length,
      audit.missing.join(", ") || "-"
    ], [95, 65, 45, 60, 45, 45, 160]);
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

// Platform mail — only uses .env SMTP, never org settings
function platformMailSettings() {
  return {
    emailEnabled: Boolean(process.env.SMTP_URL),
    emailProvider: process.env.SMTP_URL || "",
    emailRecipients: "",
    mailFrom: process.env.MAIL_FROM || "project-manager@localhost"
  };
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
    sendJson(response, 200, { ok: true, clients: sseClients.size });
    return true;
  }

  if (pathname === "/api/events" && request.method === "GET") {
    const queryToken = url.searchParams.get("token") || "";
    const actor = queryToken ? verifyToken(queryToken) : authPayload(request);
    if (!actor) { sendJson(response, 401, { error: "Unauthorized" }); return true; }
    response.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      "connection": "keep-alive",
      "x-accel-buffering": "no",
      "access-control-allow-origin": corsOrigin
    });
    response.flushHeaders();
    response.write(": connected\n\n");
    const client = { response, companyId: actorCompanyId(actor) };
    sseClients.add(client);
    const heartbeat = setInterval(() => { try { response.write(": ping\n\n"); } catch {} }, 25000);
    request.on("close", () => { clearInterval(heartbeat); sseClients.delete(client); });
    return true;
  }

  if (pathname === "/api/project-templates" && request.method === "GET") {
    if (!requireAuth(request, response)) return true;
    sendJson(response, 200, PROJECT_TEMPLATES);
    return true;
  }

  if (pathname === "/api/upload" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const body = JSON.parse(await readBody(request));
      const name = String(body.name || "file").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
      const type = String(body.type || "application/octet-stream");
      const dataUrl = String(body.data || "");
      if (!dataUrl.startsWith("data:")) {
        sendJson(response, 400, { error: "data must be a base64 data URL" });
        return true;
      }
      const base64Data = dataUrl.split(",")[1] || "";
      const buffer = Buffer.from(base64Data, "base64");
      if (buffer.length > 20 * 1024 * 1024) {
        sendJson(response, 413, { error: "File exceeds 20 MB limit" });
        return true;
      }
      const fileId = createId("file");
      const filename = `${fileId}_${name}`;
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(join(uploadsDir, filename), buffer);
      sendJson(response, 201, {
        id: fileId,
        name,
        type,
        size: buffer.length,
        url: `/api/uploads/${encodeURIComponent(filename)}`
      });
    } catch {
      sendJson(response, 500, { error: "Could not save file" });
    }
    return true;
  }

  const uploadFileMatch = pathname.match(/^\/api\/uploads\/([^/]+)$/);
  if (uploadFileMatch && request.method === "GET") {
    const filename = decodeURIComponent(uploadFileMatch[1]).replace(/[/\\]/g, "");
    const filePath = join(uploadsDir, filename);
    if (!filePath.startsWith(uploadsDir)) {
      sendJson(response, 403, { error: "Forbidden" });
      return true;
    }
    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) throw new Error();
      const ext = extname(filename).toLowerCase();
      const mimeMap = { ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".txt": "text/plain", ".csv": "text/csv", ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
      response.writeHead(200, {
        "content-type": mimeMap[ext] || "application/octet-stream",
        "content-length": fileStat.size,
        "cache-control": "private, max-age=86400"
      });
      createReadStream(filePath).pipe(response);
    } catch {
      sendJson(response, 404, { error: "File not found" });
    }
    return true;
  }

  if (pathname === "/api/auth/forgot-password" && request.method === "POST") {
    try {
      const { username } = JSON.parse(await readBody(request));
      const cleanUsername = String(username || "").trim();
      const state = ensureStateShape(await readState());
      const user = state.users.find((u) => u.username === cleanUsername && u.role !== "super_admin");
      if (!user || !user.profile?.email) {
        sendJson(response, 200, { ok: true, sent: false, reason: "User not found or no email configured" });
        return true;
      }
      const token = passwordChangeToken();
      const tokenHash = md5(token);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await pool.execute(
        "INSERT INTO password_resets (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)",
        [createId("pr"), user.id, tokenHash, expiresAt]
      );
      const baseUrl = `${request.headers["x-forwarded-proto"] || "http"}://${request.headers.host}`;
      const resetLink = `${baseUrl}/#reset-password?token=${encodeURIComponent(token)}&uid=${encodeURIComponent(user.id)}`;
      const result = await sendMailWithSettings(platformMailSettings(), {
        subject: "Şifrə sıfırlama — Project Manager",
        text: `Şifrənizi sıfırlamaq üçün aşağıdakı linki açın:\n\n${resetLink}\n\nLink 1 saat ərzində etibarlıdır.`
      });
      await recordAuditLog(cleanUsername, "auth.forgot_password", "user", user.id, { sent: !result.skipped });
      sendJson(response, 200, { ok: true, sent: !result.skipped && result.ok !== false, reason: result.reason || "" });
    } catch {
      sendJson(response, 500, { error: "Could not process request" });
    }
    return true;
  }

  if (pathname === "/api/auth/reset-password" && request.method === "POST") {
    try {
      const { token, userId, newPassword } = JSON.parse(await readBody(request));
      const cleanPassword = String(newPassword || "");
      if (cleanPassword.length < 8) {
        sendJson(response, 400, { error: "Password is too short" });
        return true;
      }
      const tokenHash = md5(String(token || "").trim());
      const [rows] = await pool.execute(
        "SELECT * FROM password_resets WHERE user_id = ? AND token_hash = ? AND used = 0 AND expires_at > NOW()",
        [String(userId || ""), tokenHash]
      );
      if (!rows.length) {
        sendJson(response, 400, { error: "Invalid or expired reset token" });
        return true;
      }
      const state = ensureStateShape(await readState());
      const userIndex = state.users.findIndex((u) => u.id === userId && u.role !== "super_admin");
      if (userIndex < 0) {
        sendJson(response, 404, { error: "User not found" });
        return true;
      }
      state.users[userIndex] = { ...state.users[userIndex], passwordHash: hashPassword(cleanPassword) };
      delete state.users[userIndex].passwordChange;
      await writeState({ ...state, savedBy: `system:password-reset:${state.users[userIndex].username}` });
      await pool.execute("UPDATE password_resets SET used = 1 WHERE id = ?", [rows[0].id]);
      await recordAuditLog(state.users[userIndex].username, "auth.password_reset", "user", userId, {});
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 500, { error: "Could not reset password" });
    }
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
    if (!requireAuth(request, response, ["super_admin", "admin"])) return true;
    const [rows] = await pool.execute("SELECT actor, action, entity_type, entity_id, created_at, details_json FROM audit_logs ORDER BY id DESC LIMIT 100");
    sendJson(response, 200, rows);
    return true;
  }

  if (pathname === "/api/notifications" && request.method === "GET") {
    if (!requireAuth(request, response, ["super_admin", "admin", "manager"])) return true;
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

  if (pathname === "/api/platform/companies" && request.method === "POST") {
    const actor = requireAuth(request, response, ["super_admin"]);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request) || "{}");
      const name = String(payload.name || "").trim();
      const subdomain = slugFromName(payload.subdomain || name);
      const username = String(payload.adminUsername || `admin${subdomain}`).trim();
      const password = String(payload.adminPassword || `${username}123`);
      if (!name || !username || !password) {
        sendJson(response, 400, { error: "Company name, admin username and password are required" });
        return true;
      }
      const companyId = `company-${subdomain}`;
      const state = ensureStateShape(await readState());
      if (state.users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
        sendJson(response, 409, { error: "Username already exists" });
        return true;
      }
      if (state.users.some((user) => user.companyId === companyId)) {
        sendJson(response, 409, { error: "Company already exists" });
        return true;
      }
      const adminUser = {
        id: createId("user"),
        username,
        passwordHash: hashPassword(password),
        role: "admin",
        managerId: "",
        companyId,
        profile: {
          fullName: payload.adminFullName || username,
          email: payload.adminEmail || "",
          fatherName: "",
          position: "Company Admin",
          phone: "",
          address: "",
          company: name
        }
      };
      state.users.push(adminUser);
      if (payload.template && payload.template !== "empty") {
        const projectName = `${name} Başlanğıc layihəsi`;
        state.projects.push(normalizeProjectPayload({
          id: createId("project"),
          companyId,
          name: projectName,
          customerId: "",
          managerIds: [adminUser.id],
          start: new Date().toISOString().slice(0, 10),
          end: "",
          status: "Plan",
          priority: "Normal",
          progress: 0
        }));
      }
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      const settings = await readSettings();
      const registry = companyRegistryFromState(ensureStateShape(await readState()), settings).map((company) => company.id === companyId ? {
        ...company,
        plan: ["standard", "pro", "enterprise"].includes(payload.plan) ? payload.plan : "standard",
        trialEndsAt: payload.trialEndsAt || "",
        subscriptionEndsAt: payload.subscriptionEndsAt || "",
        createdAt: new Date().toISOString(),
        statusChangedAt: new Date().toISOString(),
        activatedAt: new Date().toISOString(),
        statusChangedBy: actor.username,
        statusReason: "Company created"
      } : company);
      await writeSettings({ ...settings, companyRegistry: registry });
      await recordAuditLog(actor.username, "workspace.registered", "company", companyId, { name, subdomain, plan: payload.plan || "standard" });
      // Welcome email to new workspace admin via platform mail
      if (adminUser.profile.email) {
        const baseUrl = `${request.headers["x-forwarded-proto"] || "http"}://${request.headers.host}`;
        await sendMailWithSettings(platformMailSettings(), {
          to: adminUser.profile.email,
          subject: `Project Manager — "${name}" workspace hazırdır`,
          text: [
            `Salam, ${adminUser.profile.fullName || username}!`,
            "",
            `"${name}" workspace-iniz uğurla yaradıldı.`,
            "",
            `Giriş məlumatları:`,
            `  İstifadəçi adı : ${username}`,
            `  Şifrə          : ${password}`,
            `  Link           : ${baseUrl}/`,
            "",
            "Daxil olduqdan sonra şifrənizi dəyişməyinizi tövsiyə edirik.",
            "",
            "— Project Manager platformu"
          ].join("\n")
        }).catch(() => {});
      }
      sendJson(response, 201, registry.find((company) => company.id === companyId));
    } catch {
      sendJson(response, 400, { error: "Could not create company" });
    }
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
      const nextStatus = ["active", "suspended"].includes(payload.status) ? payload.status : registry[index].status;
      const statusChanged = nextStatus !== registry[index].status;
      const now = new Date().toISOString();
      registry[index] = {
        ...registry[index],
        name: payload.name ? String(payload.name).trim() : registry[index].name,
        subdomain: payload.subdomain ? slugFromName(payload.subdomain) : registry[index].subdomain,
        status: nextStatus,
        plan: payload.plan ? String(payload.plan).trim() : registry[index].plan,
        trialEndsAt: payload.trialEndsAt !== undefined ? String(payload.trialEndsAt || "").trim() : registry[index].trialEndsAt || "",
        subscriptionEndsAt: payload.subscriptionEndsAt !== undefined ? String(payload.subscriptionEndsAt || "").trim() : registry[index].subscriptionEndsAt || "",
        statusChangedAt: statusChanged ? now : registry[index].statusChangedAt,
        activatedAt: statusChanged && nextStatus === "active" ? now : registry[index].activatedAt,
        suspendedAt: statusChanged && nextStatus === "suspended" ? now : registry[index].suspendedAt,
        statusChangedBy: statusChanged ? actor.username : registry[index].statusChangedBy,
        statusReason: statusChanged ? String(payload.statusReason || "Platform action").trim() : registry[index].statusReason
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
    const clientIp = (request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown").split(",")[0].trim();
    if (!checkRateLimit(clientIp)) {
      sendJson(response, 429, { ok: false, error: "Too many login attempts. Please wait 15 minutes." });
      return true;
    }
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
      const localUser = localUsers.find((user) => user.username === cleanUsername && verifyPassword(cleanPassword, user.passwordHash));
      if (localUser) {
        const settings = await readSettings();
        const company = localUser.role === "super_admin" ? null : companyRegistryEntry(settings, actorCompanyId(localUser));
        if (company?.status === "suspended") {
          await recordAuditLog(cleanUsername, "auth.login_blocked", "company", actorCompanyId(localUser), { reason: "Company suspended" });
          sendJson(response, 403, { ok: false, error: "Company suspended" });
          return true;
        }
        if (localUser.passwordHash && !localUser.passwordHash.startsWith("scrypt:")) {
          const upgraded = hashPassword(cleanPassword);
          const userIndex = state.users.findIndex((u) => u.id === localUser.id);
          if (userIndex >= 0) {
            state.users[userIndex] = { ...state.users[userIndex], passwordHash: upgraded };
            await writeState({ ...state, savedBy: "system:hash-upgrade" });
          }
        }
        clearRateLimit(clientIp);
        await recordAuditLog(cleanUsername, "auth.login_success", "user", localUser.id, { role: localUser.role, companyId: actorCompanyId(localUser) });
        const { passwordHash: _h1, passwordChange: _pc1, ...safeLocalUser } = localUser;
        sendJson(response, 200, { ok: true, token: tokenForUser(localUser), user: safeLocalUser });
        return true;
      }
      const settings = await readSettings();
      const ldapUser = await authenticateLdap(cleanUsername, cleanPassword, settings);
      if (!ldapUser) {
        await recordAuditLog(cleanUsername || "anonymous", "auth.login_failed", "user", cleanUsername || "-", {});
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
      clearRateLimit(clientIp);
      const { passwordHash: _h2, passwordChange: _pc2, ...safeUser } = user;
      await recordAuditLog(cleanUsername, "auth.login_success", "user", user.id, { role: user.role, provider: "ldap" });
      sendJson(response, 200, {
        ok: true,
        token: tokenForUser(user),
        user: safeUser
      });
    } catch {
      sendJson(response, 401, { ok: false, error: "LDAP login failed" });
    }
    return true;
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    const actor = authPayload(request);
    if (actor?.sub && actor?.exp) {
      revokedTokens.add(`${actor.sub}:${actor.exp}`);
    }
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/auth/refresh" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    const stateUsers = state?.users?.length ? state.users : [];
    const allUsers = [
      ...stateUsers,
      ...bootstrapUsers.filter((b) => !stateUsers.some((u) => u.username === b.username))
    ];
    const user = allUsers.find((u) => u.id === actor.sub);
    if (!user) {
      sendJson(response, 404, { error: "User not found" });
      return true;
    }
    revokedTokens.add(`${actor.sub}:${actor.exp}`);
    sendJson(response, 200, { ok: true, token: tokenForUser(user) });
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
          passwordHash: hashPassword(cleanPassword),
          expiresAt: Date.now() + 30 * 60 * 1000
        }
      };
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      const result = await sendPasswordConfirmation(platformMailSettings(), state.users[userIndex], token);
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
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
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
      target.passwordHash = hashPassword(cleanPassword);
      delete target.password;
      delete target.passwordChange;
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      await recordAuditLog(actor.username, "user.password_changed", "user", target.id, { companyId: actorCompanyId(actor), targetUsername: target.username });
      sendJson(response, 200, { ok: true });
    } catch {
      sendJson(response, 400, { error: "Could not change password" });
    }
    return true;
  }

  // Send welcome email to a newly created user (org admin → platform mail)
  if (pathname === "/api/auth/send-welcome" && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    if (!["admin", "super_admin"].includes(actor.role)) {
      sendJson(response, 403, { error: "Only admins can send welcome emails" });
      return true;
    }
    try {
      const { userId, password } = JSON.parse(await readBody(request));
      const state = ensureStateShape(await readState());
      const user = state.users.find((u) => u.id === userId && u.companyId === actorCompanyId(actor));
      if (!user) {
        sendJson(response, 404, { error: "User not found" });
        return true;
      }
      const email = String(user.profile?.email || "").trim();
      if (!email) {
        sendJson(response, 200, { ok: false, skipped: true, reason: "User has no email address" });
        return true;
      }
      const baseUrl = `${request.headers["x-forwarded-proto"] || "http"}://${request.headers.host}`;
      const result = await sendMailWithSettings(platformMailSettings(), {
        to: email,
        subject: "Project Manager — Hesabınız hazırdır",
        text: [
          `Salam, ${user.profile?.fullName || user.username}!`,
          "",
          "Sizin üçün Project Manager hesabı yaradılmışdır.",
          "",
          `  İstifadəçi adı : ${user.username}`,
          `  Şifrə          : ${password || "(admin tərəfindən verildi)"}`,
          `  Link           : ${baseUrl}/`,
          "",
          "Daxil olduqdan sonra Profil bölməsindən şifrənizi dəyişin.",
          "",
          "— Project Manager platformu"
        ].join("\n")
      });
      await recordAuditLog(actor.username, "user.welcome_sent", "user", userId, { email, sent: !result.skipped });
      sendJson(response, 200, { ok: !result.skipped && result.ok !== false, skipped: Boolean(result.skipped), reason: result.reason || "" });
    } catch {
      sendJson(response, 500, { error: "Could not send welcome email" });
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
    const q = (url.searchParams.get("q") || "").toLowerCase().trim();
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") || 50)));
    const archivedParam = url.searchParams.get("archived");
    let projects = stateForActor(state, actor).projects || [];
    if (archivedParam === "false") projects = projects.filter((p) => !p.archived);
    else if (archivedParam === "true") projects = projects.filter((p) => p.archived);
    if (q) projects = projects.filter((p) => p.name.toLowerCase().includes(q) || (p.status || "").toLowerCase().includes(q));
    const total = projects.length;
    const items = projects.slice((page - 1) * limit, page * limit);
    const isPaged = url.searchParams.has("page") || url.searchParams.has("limit");
    sendJson(response, 200, isPaged ? { items, total, page, limit, pages: Math.ceil(total / limit) } : projects);
    return true;
  }

  if (pathname === "/api/projects" && request.method === "POST") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    try {
      const state = ensureStateShape(await readState());
      let project;
      try {
        project = normalizeProjectPayload({ ...JSON.parse(await readBody(request)), companyId: actorCompanyId(actor) });
      } catch (e) {
        sendJson(response, e.statusCode || 400, { error: e.message || "Invalid project data" });
        return true;
      }
      if (!project.name || state.projects.some((item) => sameCompany(item, actorCompanyId(actor)) && item.name.toLowerCase() === project.name.toLowerCase())) {
        sendJson(response, 400, { error: "Invalid project" });
        return true;
      }
      state.projects.push(project);
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
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
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      sendJson(response, 200, { ok: true });
      return true;
    }
    try {
      const previous = state.projects[projectIndex];
      let nextProject;
      try {
        nextProject = normalizeProjectPayload({ ...previous, ...JSON.parse(await readBody(request)), id: previous.id, companyId: previous.companyId || actorCompanyId(actor) });
      } catch (e) {
        sendJson(response, e.statusCode || 400, { error: e.message || "Invalid project data" });
        return true;
      }
      if (!nextProject.name || state.projects.some((item) => item.id !== previous.id && sameCompany(item, actorCompanyId(actor)) && item.name.toLowerCase() === nextProject.name.toLowerCase())) {
        sendJson(response, 400, { error: "Invalid project" });
        return true;
      }
      state.projects[projectIndex] = nextProject;
      if (previous.name !== nextProject.name) {
        state.tasks = state.tasks.map((task) => task.project === previous.name ? { ...task, project: nextProject.name } : task);
        state.projectLinks = state.projectLinks.map((link) => link.project === previous.name ? { ...link, project: nextProject.name } : link);
      }
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
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
    const q = (url.searchParams.get("q") || "").toLowerCase().trim();
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = Math.min(500, Math.max(1, Number(url.searchParams.get("limit") || 100)));
    let tasks = project ? (scoped.tasks || []).filter((task) => task.project === project) : scoped.tasks || [];
    if (q) tasks = tasks.filter((task) => task.name.toLowerCase().includes(q) || task.project.toLowerCase().includes(q) || (task.owner || "").toLowerCase().includes(q));
    if (status) tasks = tasks.filter((task) => task.status === status);
    if (priority) tasks = tasks.filter((task) => task.priority === priority);
    const total = tasks.length;
    const isPaged = url.searchParams.has("page") || url.searchParams.has("limit");
    const items = isPaged ? tasks.slice((page - 1) * limit, page * limit) : tasks;
    sendJson(response, 200, isPaged ? { items, total, page, limit, pages: Math.ceil(total / limit) } : tasks);
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
      const dateErr = validateTaskDates(task);
      if (dateErr) { sendJson(response, 400, { error: dateErr }); return true; }
      const ownerErr = validateTaskOwner(task, state);
      if (ownerErr) { sendJson(response, 400, { error: ownerErr }); return true; }
      state.tasks.push(task);
      recalcProjectProgress(state, task.project);
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      sendJson(response, 201, task);
    } catch {
      sendJson(response, 400, { error: "Could not create task" });
    }
    return true;
  }

  const applyTemplateMatch = pathname.match(/^\/api\/projects\/([^/]+)\/apply-template$/);
  if (applyTemplateMatch && request.method === "POST") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    try {
      const projectId = decodeURIComponent(applyTemplateMatch[1]);
      const body = JSON.parse(await readBody(request));
      const templateId = String(body.templateId || "");
      const template = PROJECT_TEMPLATES.find((t) => t.id === templateId);
      if (!template) { sendJson(response, 404, { error: "Template not found" }); return true; }
      const state = ensureStateShape(await readState());
      const project = state.projects.find((p) => p.id === projectId && sameCompany(p, actorCompanyId(actor)));
      if (!project) { sendJson(response, 404, { error: "Project not found" }); return true; }
      const startDate = body.startDate || project.start || new Date().toISOString().slice(0, 10);
      const base = new Date(startDate);
      const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r.toISOString().slice(0, 10); };
      const createdTasks = template.tasks.map((tmpl) => ({
        id: createId("task"),
        name: tmpl.name,
        project: project.name,
        projectResource: "",
        start: addDays(base, tmpl.offsetDays),
        end: addDays(base, tmpl.offsetDays + tmpl.durationDays),
        status: tmpl.status || "Plan",
        priority: tmpl.priority || "Normal",
        owner: "",
        progress: 0,
        plannedHours: 0,
        actualHours: 0,
        notes: "",
        parentTaskId: "",
        dependencyIds: [],
        comments: [],
        attachments: []
      }));
      state.tasks.push(...createdTasks);
      recalcProjectProgress(state, project.name);
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      sendJson(response, 201, { ok: true, count: createdTasks.length, tasks: createdTasks });
    } catch {
      sendJson(response, 400, { error: "Could not apply template" });
    }
    return true;
  }

  const taskAttachmentsMatch = pathname.match(/^\/api\/tasks\/([^/]+)\/attachments$/);
  if (taskAttachmentsMatch && request.method === "POST") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    try {
      const taskId = decodeURIComponent(taskAttachmentsMatch[1]);
      const body = JSON.parse(await readBody(request));
      const state = ensureStateShape(await readState());
      const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex < 0) { sendJson(response, 404, { error: "Task not found" }); return true; }
      const attachment = {
        id: createId("att"),
        name: String(body.name || "file"),
        type: String(body.type || "application/octet-stream"),
        size: Number(body.size) || 0,
        url: String(body.url || ""),
        dataUrl: String(body.dataUrl || body.url || ""),
        addedAt: new Date().toISOString(),
        addedBy: actor.username
      };
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        attachments: [...(state.tasks[taskIndex].attachments || []), attachment]
      };
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
      sendJson(response, 201, attachment);
    } catch {
      sendJson(response, 400, { error: "Could not add attachment" });
    }
    return true;
  }

  const commentDeleteMatch = pathname.match(/^\/api\/comments\/([^/]+)$/);
  if (commentDeleteMatch && request.method === "DELETE") {
    const actor = requireAuth(request, response, ["admin", "manager", "user"]);
    if (!actor) return true;
    const commentId = decodeURIComponent(commentDeleteMatch[1]);
    const state = ensureStateShape(await readState());
    let found = false;
    state.tasks = state.tasks.map((task) => {
      const idx = (task.comments || []).findIndex((c) => c.id === commentId && (c.author === actor.username || ["admin", "manager"].includes(actor.role)));
      if (idx < 0) return task;
      found = true;
      return { ...task, comments: task.comments.filter((_, i) => i !== idx) };
    });
    if (!found) {
      sendJson(response, 404, { error: "Comment not found or not allowed" });
      return true;
    }
    await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
    sendJson(response, 200, { ok: true });
    return true;
  }

  const taskCommentsMatch = pathname.match(/^\/api\/tasks\/([^/]+)\/comments$/);
  if (taskCommentsMatch) {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    const taskId = decodeURIComponent(taskCommentsMatch[1]);
    const state = ensureStateShape(await readState());
    const scoped = stateForActor(state, actor);
    const task = scoped.tasks?.find((t) => t.id === taskId);
    if (!task) {
      sendJson(response, 404, { error: "Task not found" });
      return true;
    }
    if (request.method === "GET") {
      sendJson(response, 200, task.comments || []);
      return true;
    }
    if (request.method === "POST") {
      const body = JSON.parse(await readBody(request));
      const text = String(body.text || "").trim();
      if (!text) {
        sendJson(response, 400, { error: "Comment text is required" });
        return true;
      }
      const comment = {
        id: createId("comment"),
        author: actor.username,
        text,
        createdAt: new Date().toISOString()
      };
      const fullState = ensureStateShape(await readState());
      const taskIndex = fullState.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex < 0) {
        sendJson(response, 404, { error: "Task not found" });
        return true;
      }
      fullState.tasks[taskIndex] = {
        ...fullState.tasks[taskIndex],
        comments: [...(fullState.tasks[taskIndex].comments || []), comment]
      };
      await writeState({ ...fullState, savedBy: actor.username }, actorCompanyId(actor));
      sendJson(response, 201, comment);
      return true;
    }
  }

  const taskMatch = pathname.match(/^\/api\/tasks\/([^/]+)$/);
  if (taskMatch && request.method === "GET") {
    const actor = requireAuth(request, response);
    if (!actor) return true;
    const taskId = decodeURIComponent(taskMatch[1]);
    const state = ensureStateShape(await readState());
    const task = stateForActor(state, actor).tasks?.find((t) => t.id === taskId);
    if (!task) {
      sendJson(response, 404, { error: "Task not found" });
      return true;
    }
    sendJson(response, 200, task);
    return true;
  }

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
      recalcProjectProgress(state, task.project);
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
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
      const dateErr = validateTaskDates(task);
      if (dateErr) { sendJson(response, 400, { error: dateErr }); return true; }
      const ownerErr = validateTaskOwner(task, state);
      if (ownerErr) { sendJson(response, 400, { error: ownerErr }); return true; }
      const depErr = validateTaskDependencies(task, state);
      if (depErr) { sendJson(response, 422, { error: depErr }); return true; }
      state.tasks[taskIndex] = task;
      recalcProjectProgress(state, task.project);
      if (previous.project !== task.project) recalcProjectProgress(state, previous.project);
      await writeState({ ...state, savedBy: actor.username }, actorCompanyId(actor));
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

  if (pathname === "/api/backup/json" && request.method === "GET") {
    const actor = requireAuth(request, response, ["admin", "manager"]);
    if (!actor) return true;
    const state = ensureStateShape(await readState());
    const backup = jsonBackupForActor(state, actor);
    const date = new Date().toISOString().slice(0, 10);
    sendText(response, 200, JSON.stringify(backup, null, 2), "application/json; charset=utf-8", `project-manager-json-backup-${date}.json`);
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
    const actor = requireAuth(request, response, ["super_admin", "admin", "manager"]);
    if (!actor) return true;
    try {
      const payload = JSON.parse(await readBody(request));
      if (!validateState(payload)) {
        sendJson(response, 400, { error: "Invalid project manager state" });
        return true;
      }
      const currentState = ensureStateShape(await readState());
      const nextState = actor.role === "super_admin"
        ? await writeState({ ...ensureStateShape(payload), savedBy: actor.username }, "platform")
        : await writeState(mergeActorState(currentState, payload, actor), actorCompanyId(actor));
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
await runMigrations();
await mkdir(uploadsDir, { recursive: true });

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
