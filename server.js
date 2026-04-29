import { createServer } from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { dirname, extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

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
