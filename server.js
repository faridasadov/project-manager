import { createServer } from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { dirname, extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ldap from "ldapjs";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

const rootDir = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
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
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, PUT, OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  response.end(JSON.stringify(payload));
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
  return nextState;
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

async function handleApi(request, response) {
  if (request.url?.startsWith("/api/") && request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, PUT, OPTIONS",
      "access-control-allow-headers": "content-type"
    });
    response.end();
    return true;
  }

  if (request.url === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.url === "/api/settings" && request.method === "GET") {
    try {
      sendJson(response, 200, await readSettings());
    } catch {
      sendJson(response, 500, { error: "Could not read settings" });
    }
    return true;
  }

  if (request.url === "/api/settings" && request.method === "PUT") {
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
      const settings = await readSettings();
      const ldapUser = await authenticateLdap(String(username || "").trim(), String(password || ""), settings);
      if (!ldapUser) {
        sendJson(response, 401, { ok: false, error: "Invalid LDAP credentials" });
        return true;
      }
      const state = await readState();
      const existingUser = state?.users?.find((user) => user.username === ldapUser.username);
      sendJson(response, 200, {
        ok: true,
        user: existingUser || {
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
        }
      });
    } catch {
      sendJson(response, 401, { ok: false, error: "LDAP login failed" });
    }
    return true;
  }

  if (request.url === "/api/mail/deadline-alerts" && request.method === "POST") {
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

  if (request.url === "/api/state" && request.method === "GET") {
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
    try {
      const payload = JSON.parse(await readBody(request));
      if (!validateState(payload)) {
        sendJson(response, 400, { error: "Invalid project manager state" });
        return true;
      }
      const nextState = await writeState(payload);
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
