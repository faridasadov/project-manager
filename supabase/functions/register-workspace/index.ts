// register-workspace — qeydiyyat axını (join-or-create).
// Client company_key mövcudluğunu YOXLAYA bilmir (RLS başqa workspace-i gizlədir),
// başqa workspace-ə profil də əlavə edə bilmir. Ona görə qərarı service-role bu funksiya verir.
//
// Axın:
//   1) İstifadəçi əvvəlcə auth-signup edir (client), sessiya alır.
//   2) Bu funksiyaya JWT ilə müraciət edir.
//   3) company_key mövcuddursa → status='pending' profil (qoşulma sorğusu), giriş YOXDUR.
//      mövcud deyilsə → yeni workspace (approval_status='pending') + admin profil.
//
// verify_jwt=true — çağıranın kim olduğu JWT-dən götürülür.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS"
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });
}

// script.js/modules/ids.js companyIdFromName ilə eyni olmalıdır.
function companyIdFromName(name: string) {
  const slug = String(name || "workspace").trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return `company-${slug || crypto.randomUUID()}`;
}

async function admGet(path: string) {
  const r = await fetch(`${SUPABASE_URL}${path}`, { headers: { apikey: SERVICE_KEY, authorization: `Bearer ${SERVICE_KEY}` } });
  return { ok: r.ok, status: r.status, body: await r.json().catch(() => null) };
}
async function adm(path: string, method: string, payload?: unknown) {
  const r = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: { apikey: SERVICE_KEY, authorization: `Bearer ${SERVICE_KEY}`, "content-type": "application/json", Prefer: "return=representation" },
    body: payload ? JSON.stringify(payload) : undefined
  });
  return { ok: r.ok, status: r.status, body: await r.json().catch(() => null) };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!SERVICE_KEY) return json({ error: "Service role not configured" }, 500);

  const authz = req.headers.get("authorization") || "";
  const token = authz.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Auth tələb olunur" }, 401);
  const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: ANON_KEY, authorization: `Bearer ${token}` } });
  if (!who.ok) return json({ error: "Sessiya etibarsız" }, 401);
  const caller = await who.json();
  const callerId = caller?.id;
  const callerEmail = String(caller?.email || "").toLowerCase();
  if (!callerId) return json({ error: "İstifadəçi tapılmadı" }, 401);

  let p: any = {};
  try { p = await req.json(); } catch { /* empty */ }
  const companyName = String(p.companyName || "").trim();
  const subdomain = String(p.subdomain || "").trim();
  const username = String(p.username || "").trim() || callerEmail.split("@")[0];
  const fullName = String(p.fullName || "").trim() || username;
  const email = String(p.email || callerEmail).trim().toLowerCase();
  if (!companyName) return json({ error: "Şirkət adı tələb olunur" }, 400);

  // Artıq profili varsa — təkrar qeydiyyata icazə vermə.
  const existingProf = await admGet(`/rest/v1/profiles?id=eq.${callerId}&select=id,workspace_id,status`);
  if (Array.isArray(existingProf.body) && existingProf.body.length) {
    return json({ error: "Bu hesab artıq qeydiyyatdadır." }, 409);
  }

  const companyId = companyIdFromName(companyName);

  try {
    // company_key mövcud workspace-ə uyğun gəlirmi?
    const wsLookup = await admGet(`/rest/v1/workspaces?company_key=eq.${encodeURIComponent(companyId)}&select=id,name,status&limit=1`);
    const existingWs = Array.isArray(wsLookup.body) ? wsLookup.body[0] : null;

    if (existingWs?.id) {
      // ── JOIN: mövcud şirkətə qoşulma sorğusu (pending) ──
      const profIns = await adm(`/rest/v1/profiles`, "POST", {
        id: callerId,
        workspace_id: existingWs.id,
        role: "user",
        username,
        full_name: fullName,
        email,
        profile_json: { company: existingWs.name, join_request: true },
        status: "pending"
      });
      if (!profIns.ok) return json({ error: "Qoşulma sorğusu yaradılmadı", detail: profIns.body }, 502);
      return json({ ok: true, mode: "join", workspaceId: existingWs.id, companyName: existingWs.name });
    }

    // ── CREATE: yeni workspace + admin profil ──
    const wsIns = await adm(`/rest/v1/workspaces`, "POST", {
      company_key: companyId,
      name: companyName,
      owner_id: callerId,
      status: "active",
      approval_status: "pending",
      email_verified: false
    });
    if (!wsIns.ok) return json({ error: "Workspace yaradılmadı", detail: wsIns.body }, 502);
    const workspace = Array.isArray(wsIns.body) ? wsIns.body[0] : wsIns.body;

    const profIns = await adm(`/rest/v1/profiles`, "POST", {
      id: callerId,
      workspace_id: workspace.id,
      role: "admin",
      username,
      full_name: fullName,
      email,
      profile_json: { company: companyName, subdomain, position: "Company Admin" },
      status: "active"
    });
    if (!profIns.ok) return json({ error: "Profil yaradılmadı", detail: profIns.body }, 502);
    return json({ ok: true, mode: "create", workspaceId: workspace.id, companyName });
  } catch (err) {
    return json({ error: String((err as Error)?.message || err) }, 500);
  }
});
