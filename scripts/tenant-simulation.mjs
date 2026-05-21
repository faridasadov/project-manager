import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

const baseUrl = process.env.BASE_URL || "http://localhost";

async function request(path, options = {}) {
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

async function login(username, password) {
  const result = await request("/api/auth/login", { method: "POST", body: { username, password } });
  assert.equal(result.status, 200, `${username} login failed`);
  assert.ok(result.body.token, `${username} token missing`);
  return result.body;
}

async function assertTenant(username, password, companyId, expectedProjects, forbiddenProjects) {
  const session = await login(username, password);
  const state = await request("/api/state", { token: session.token });
  assert.equal(state.status, 200, `${username} state failed`);
  assert.ok(state.body.projects.every((project) => project.companyId === companyId), `${username} received another company's project`);
  const projectNames = new Set(state.body.projects.map((project) => project.name));
  expectedProjects.forEach((name) => assert.ok(projectNames.has(name), `${username} missing ${name}`));
  forbiddenProjects.forEach((name) => assert.ok(!projectNames.has(name), `${username} leaked ${name}`));
  const backup = await request("/api/backup/json", { token: session.token });
  assert.equal(backup.status, 200, `${username} JSON backup failed`);
  assert.ok(backup.body.state.projects.every((project) => project.companyId === companyId), `${username} backup leaked another company`);
}

await assertTenant(
  "adminklinika",
  "adminklinika123",
  "company-default",
  ["Klinika İT Portfeli"],
  ["Digital CRM Rollout", "Logistika WMS Modernizasiya", "Campus Helpdesk Platform", "Retail POS Upgrade"]
);

await assertTenant(
  "admindigital",
  "admindigital123",
  "company-digital",
  ["Digital CRM Rollout"],
  ["Klinika İT Portfeli", "Logistika WMS Modernizasiya", "Campus Helpdesk Platform", "Retail POS Upgrade"]
);

await assertTenant(
  "adminlogistika",
  "adminlogistika123",
  "company-logistics",
  ["Logistika WMS Modernizasiya"],
  ["Klinika İT Portfeli", "Digital CRM Rollout", "Campus Helpdesk Platform", "Retail POS Upgrade"]
);

await assertTenant(
  "adminqarabag",
  "adminqarabag123",
  "company-qarabag",
  ["Campus Helpdesk Platform", "Dormitory Network Expansion"],
  ["Klinika İT Portfeli", "Digital CRM Rollout", "Logistika WMS Modernizasiya", "Retail POS Upgrade"]
);

await assertTenant(
  "adminretail",
  "adminretail123",
  "company-retail",
  ["Retail POS Upgrade", "Inventory Forecasting"],
  ["Klinika İT Portfeli", "Digital CRM Rollout", "Logistika WMS Modernizasiya", "Campus Helpdesk Platform"]
);

const superAdmin = await login("superadmin", "superadmin123");
const companies = await request("/api/platform/companies", { token: superAdmin.token });
assert.equal(companies.status, 200, "superadmin companies failed");
const companyIds = new Set(companies.body.map((company) => company.id));
["company-default", "company-digital", "company-logistics", "company-qarabag", "company-retail"].forEach((id) => {
  assert.ok(companyIds.has(id), `registry missing ${id}`);
});

console.log("Tenant simulation passed.");
