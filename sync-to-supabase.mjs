#!/usr/bin/env node
/**
 * sync-to-supabase.mjs
 * ─────────────────────────────────────────────────────────────
 * Lokal MariaDB state-ini Supabase-ə push edir.
 *
 * İstifadə:
 *   node sync-to-supabase.mjs           # state sync et
 *   node sync-to-supabase.mjs --status  # Supabase-dəki state haqqında məlumat
 *   node sync-to-supabase.mjs --init    # İlk dəfə: workspace + profile yarat
 *
 * Workflow:
 *   1. Lokal dəyişikliklər et (Node.js + MariaDB)
 *   2. Test et, yoxla
 *   3. node sync-to-supabase.mjs
 *   4. git add -A && git commit && git push
 * ─────────────────────────────────────────────────────────────
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { request as httpsReq } from "https";
import { request as httpReq }  from "http";

const __dir = dirname(fileURLToPath(import.meta.url));

// ── .env oxu ──────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(join(__dir, ".env"), "utf8");
    const env = {};
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)/);
      if (m) env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, "");
    }
    return env;
  } catch { return {}; }
}

const env = { ...process.env, ...loadEnv() };

const SB_URL    = (env.SUPABASE_URL    || "").replace(/\/+$/, "");
const SB_ANON   = env.SUPABASE_ANON_KEY || "";
const SB_EMAIL  = env.SUPABASE_EMAIL    || "";
const SB_PASS   = env.SUPABASE_PASSWORD || "";
const LOCAL_URL = `http://localhost:${env.PORT || 3000}`;
const LOCAL_USER = env.SYNC_LOCAL_USER || "adminklinika";
const LOCAL_PASS = env.SYNC_LOCAL_PASS || "adminklinika123";

if (!SB_URL || !SB_ANON) {
  console.error("❌  SUPABASE_URL və SUPABASE_ANON_KEY .env-də tapılmadı");
  process.exit(1);
}

// ── HTTP helper (Node 16 uyumlu) ──────────────────────────────
function httpRequest(urlStr, options = {}, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const isHttps = url.protocol === "https:";
    const reqFn = isHttps ? httpsReq : httpReq;
    const data = body !== undefined ? JSON.stringify(body) : undefined;
    const req = reqFn({
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(data ? { "Content-Length": Buffer.byteLength(data) } : {}),
        ...options.headers
      }
    }, (res) => {
      let chunks = "";
      res.on("data", c => chunks += c);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, ok: res.statusCode < 300, data: JSON.parse(chunks) }); }
        catch { resolve({ status: res.statusCode, ok: res.statusCode < 300, data: chunks }); }
      });
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

// ── Supabase requests ─────────────────────────────────────────
async function sbReq(path, options = {}) {
  const { token, method = "GET", body, headers = {} } = options;
  return httpRequest(SB_URL + path, {
    method,
    headers: {
      "apikey": SB_ANON,
      "Authorization": `Bearer ${token || SB_ANON}`,
      ...headers
    }
  }, body);
}

async function sbLogin() {
  if (!SB_EMAIL || !SB_PASS) throw new Error("SUPABASE_EMAIL / SUPABASE_PASSWORD .env-də yoxdur");
  const { ok, status, data } = await sbReq("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: { email: SB_EMAIL, password: SB_PASS }
  });
  if (!ok || !data?.access_token) {
    const msg = data?.msg || data?.error_description || JSON.stringify(data);
    throw new Error(`Supabase login uğursuz (${status}): ${msg}`);
  }
  return { token: data.access_token, userId: data.user?.id, email: data.user?.email };
}

// ── Local backend ─────────────────────────────────────────────
async function localLogin() {
  const { ok, data } = await httpRequest(`${LOCAL_URL}/api/auth/login`, {
    method: "POST"
  }, { username: LOCAL_USER, password: LOCAL_PASS });
  if (!ok || !data?.token) throw new Error("Lokal login uğursuz: " + JSON.stringify(data));
  return data.token;
}

async function localState(token) {
  const { ok, status, data } = await httpRequest(`${LOCAL_URL}/api/state`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!ok) throw new Error(`State oxunmadı: HTTP ${status}`);
  return data;
}

// ── Workspace / profile ───────────────────────────────────────
async function ensureWorkspace(token, userId, email) {
  const { data: wsRows } = await sbReq(
    `/rest/v1/workspaces?owner_id=eq.${userId}&select=id,company_key,name`,
    { token }
  );
  if (Array.isArray(wsRows) && wsRows[0]) {
    return wsRows[0];
  }

  console.log("   → Workspace yaranır...");
  const { ok, status, data } = await sbReq("/rest/v1/workspaces", {
    token, method: "POST",
    headers: { Prefer: "return=representation" },
    body: { company_key: "klinika", name: "Klinika", owner_id: userId, status: "active" }
  });
  if (!ok || !Array.isArray(data)) throw new Error(`Workspace yaranmadı (${status}): ${JSON.stringify(data)}`);
  const workspace = data[0];
  console.log("   ✅  Workspace yarandı:", workspace.id);

  // Profile
  const { data: profRows } = await sbReq(
    `/rest/v1/profiles?id=eq.${userId}&select=id`, { token }
  );
  if (!Array.isArray(profRows) || !profRows[0]) {
    await sbReq("/rest/v1/profiles", {
      token, method: "POST",
      headers: { Prefer: "return=representation" },
      body: {
        id: userId, workspace_id: workspace.id,
        role: "admin", username: "adminklinika",
        full_name: "Admin Klinika", email, status: "active"
      }
    });
    console.log("   ✅  Profile yarandı");
  }
  return workspace;
}

// ── Push state ────────────────────────────────────────────────
async function pushState(token, userId, workspaceId, state) {
  const { ok, status, data } = await sbReq(
    "/rest/v1/app_state?on_conflict=workspace_id",
    {
      token, method: "POST",
      headers: { Prefer: "resolution=merge-duplicates" },
      body: {
        workspace_id: workspaceId,
        state_json: state,
        saved_by: userId,
        updated_at: new Date().toISOString()
      }
    }
  );
  if (!ok) throw new Error(`Push uğursuz (${status}): ${JSON.stringify(data)}`);
}

// ── Commands ──────────────────────────────────────────────────
async function cmdStatus() {
  console.log("📊  Supabase vəziyyəti yoxlanır...\n");
  try {
    const { token, userId } = await sbLogin();
    console.log("🔐  Login: OK  (user:", userId, ")");

    const { data: ws } = await sbReq(
      `/rest/v1/workspaces?owner_id=eq.${userId}&select=id,name,company_key,created_at`,
      { token }
    );
    const workspace = Array.isArray(ws) ? ws[0] : null;
    if (!workspace) { console.log("⚠️   Workspace yoxdur → `npm run sync:init`"); return; }
    console.log("🏢  Workspace:", workspace.name, `(${workspace.company_key})`);

    const { data: stRows } = await sbReq(
      `/rest/v1/app_state?workspace_id=eq.${workspace.id}&select=state_json,updated_at`,
      { token }
    );
    const row = Array.isArray(stRows) ? stRows[0] : null;
    if (!row) {
      console.log("📦  app_state: boşdur — hələ sync edilməyib");
    } else {
      const s = row.state_json;
      console.log("📦  Son sync:", row.updated_at);
      console.log("    Tasks:", s?.tasks?.length ?? 0,
                  "| Projects:", s?.projects?.length ?? 0,
                  "| Users:", s?.users?.length ?? 0);
    }
  } catch (err) {
    console.error("❌ ", err.message);
    if (err.message.includes("login")) {
      console.log("💡  E-mail təsdiqlənməyib? faridasadov@gmail.com-a gələn maili aç.");
    }
  }
}

async function cmdSync() {
  console.log("🔄  Sync: Lokal → Supabase\n");

  process.stdout.write("🔐  Supabase login...");
  let sbToken, userId, email;
  try {
    ({ token: sbToken, userId, email } = await sbLogin());
    console.log(" OK");
  } catch (err) {
    console.log(" XƏTA\n❌ ", err.message);
    if (err.message.includes("login")) {
      console.log("💡  faridasadov@gmail.com-a gələn təsdiq mailini aç, sonra yenidən cəhd et.");
    }
    process.exit(1);
  }

  process.stdout.write("🏢  Workspace...");
  let workspace;
  try {
    workspace = await ensureWorkspace(sbToken, userId, email);
    console.log(` OK (${workspace.name})`);
  } catch (err) {
    console.log(" XƏTA\n❌ ", err.message);
    process.exit(1);
  }

  process.stdout.write("📥  Lokal state oxunur...");
  let state;
  try {
    const localToken = await localLogin();
    state = await localState(localToken);
    console.log(` OK  (${state.tasks?.length ?? 0} task, ${state.projects?.length ?? 0} layihə)`);
  } catch (err) {
    console.log(" XƏTA\n❌ ", err.message);
    process.exit(1);
  }

  process.stdout.write("📤  Supabase-ə push edilir...");
  try {
    await pushState(sbToken, userId, workspace.id, state);
    console.log(" OK");
  } catch (err) {
    console.log(" XƏTA\n❌ ", err.message);
    process.exit(1);
  }

  console.log("\n✅  Sync tamamlandı →", new Date().toLocaleString("az-AZ"));
  console.log("   Workspace:", workspace.name, `(${workspace.id})`);
  console.log("   Tasks:", state.tasks?.length ?? 0, "| Projects:", state.projects?.length ?? 0);
  console.log("\n📌  Növbəti addım:  git add -A && git commit && git push");
}

// ── Main ──────────────────────────────────────────────────────
const arg = process.argv[2];
if (arg === "--status") await cmdStatus();
else                    await cmdSync();
