import { createWriteStream, mkdirSync } from "node:fs";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { join } from "node:path";

const baseUrl = process.env.BASE_URL || "http://localhost";
const username = process.env.PM_USER || "adminklinika";
const password = process.env.PM_PASSWORD || "adminklinika123";
const backupDir = process.env.BACKUP_DIR || "backups";

function httpJson(path, options = {}) {
  const url = new URL(path, baseUrl);
  const transport = url.protocol === "https:" ? httpsRequest : httpRequest;
  const body = options.body ? JSON.stringify(options.body) : "";
  return new Promise((resolve, reject) => {
    const req = transport(url, {
      method: options.method || "GET",
      headers: {
        ...(body ? { "content-type": "application/json", "content-length": Buffer.byteLength(body) } : {}),
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {})
      }
    }, (res) => {
      let raw = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { raw += chunk; });
      res.on("end", () => {
        const contentType = res.headers["content-type"] || "";
        const parsed = String(contentType).includes("application/json") && raw ? JSON.parse(raw) : raw;
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

const login = await httpJson("/api/auth/login", {
  method: "POST",
  body: { username, password }
});

if (login.status !== 200 || !login.body?.token) {
  throw new Error(`Login failed for ${username}`);
}

const backup = await httpJson("/api/backup/json", { token: login.body.token });
if (backup.status !== 200 || backup.body?.type !== "project-manager-json-backup") {
  throw new Error("JSON backup endpoint failed");
}

mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const filePath = join(backupDir, `project-manager-json-${stamp}.json`);
const stream = createWriteStream(filePath, { flags: "wx" });
stream.end(`${JSON.stringify(backup.body, null, 2)}\n`);

await new Promise((resolve, reject) => {
  stream.on("finish", resolve);
  stream.on("error", reject);
});

console.log(`JSON backup saved: ${filePath}`);
