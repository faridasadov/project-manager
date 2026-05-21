import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

const baseUrl = process.env.BASE_URL || "http://localhost";

async function request(path, options = {}) {
  const url = new URL(path, baseUrl);
  const transport = url.protocol === "https:" ? httpsRequest : httpRequest;
  const payload = options.body || "";
  return new Promise((resolve, reject) => {
    const req = transport(url, {
      method: options.method || "GET",
      headers: {
        ...(payload ? { "content-type": "application/json", "content-length": Buffer.byteLength(payload) } : {}),
        ...(options.token ? { authorization: `Bearer ${options.token}` } : {}),
        ...(options.headers || {})
      }
    }, (res) => {
      let raw = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { raw += chunk; });
      res.on("end", () => {
        const contentType = res.headers["content-type"] || "";
        const body = String(contentType).includes("application/json") && raw ? JSON.parse(raw) : raw;
        resolve({ response: { status: res.statusCode, headers: res.headers }, body });
      });
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function login(username, password) {
  const { response, body } = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
  assert.equal(response.status, 200, `${username} login failed`);
  assert.ok(body.token, `${username} token missing`);
  return body;
}

const health = await request("/api/health");
assert.equal(health.response.status, 200, "health endpoint failed");

const admin = await login("adminklinika", "adminklinika123");
const user = await login("user", "user123");
const superAdmin = await login("superadmin", "superadmin123");

const userStateWrite = await request("/api/state", {
  method: "PUT",
  token: user.token,
  body: JSON.stringify({
    tasks: [],
    projects: [],
    members: [],
    teams: [],
    customers: [],
    managedFiles: [],
    projectLinks: [],
    registers: [],
    users: [],
    trash: []
  })
});
assert.equal(userStateWrite.response.status, 401, "plain user must not save full state");

const state = await request("/api/state", { token: admin.token });
assert.equal(state.response.status, 200, "admin state read failed");
assert.ok(Array.isArray(state.body.projects), "state projects missing");

const companies = await request("/api/platform/companies", { token: superAdmin.token });
assert.equal(companies.response.status, 200, "superadmin company registry failed");
assert.ok(Array.isArray(companies.body), "company registry is not an array");

const audit = await request("/api/audit-logs", { token: superAdmin.token });
assert.equal(audit.response.status, 200, "superadmin audit read failed");

const csv = await request("/api/export/excel", { token: admin.token });
assert.equal(csv.response.status, 200, "CSV export failed");
assert.match(String(csv.body), /IPMA Score/, "CSV export does not include IPMA section");

const pdf = await request("/api/export/pdf", { token: admin.token });
assert.equal(pdf.response.status, 200, "PDF export failed");
assert.match(String(pdf.body).slice(0, 20), /%PDF/, "PDF export is not a PDF");

const jsonBackup = await request("/api/backup/json", { token: admin.token });
assert.equal(jsonBackup.response.status, 200, "JSON backup failed");
assert.equal(jsonBackup.body.type, "project-manager-json-backup", "JSON backup type mismatch");
assert.ok(Array.isArray(jsonBackup.body.state?.projects), "JSON backup projects missing");

console.log("Backend smoke tests passed.");
