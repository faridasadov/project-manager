// manage-user — komanda üzvü idarəetməsi (yalnız admin çağıra bilər).
// Actions:
//   invite  → real auth user (parolsuz) + active profil + dəvət/parol linki qaytarır
//   create  → real auth user (admin parolu təyin edir) + active profil → dərhal girə bilir
//   approve  → pending profili (self-register join sorğusu) status=active + rol
//   set-role → profiles.role-u yeniləyir (app-də rol dəyişəndə RLS ilə uyğun qalsın)
//   set-password → istifadəçinin GoTrue (auth) parolunu dəyişir
//   reject   → profili + auth user-i silir
// verify_jwt=true; çağıranın JWT-si yoxlanılır, profilindən workspace + admin rolu təsdiqlənir.

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

  // Çağıranı JWT-dən müəyyən et
  const authz = req.headers.get("authorization") || "";
  const token = authz.replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Auth tələb olunur" }, 401);
  const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: ANON_KEY, authorization: `Bearer ${token}` } });
  if (!who.ok) return json({ error: "Sessiya etibarsız" }, 401);
  const caller = await who.json();
  const callerId = caller?.id;
  if (!callerId) return json({ error: "İstifadəçi tapılmadı" }, 401);

  // Çağıranın profili — admin + workspace
  const prof = await admGet(`/rest/v1/profiles?id=eq.${callerId}&select=id,role,status,workspace_id`);
  const me = Array.isArray(prof.body) ? prof.body[0] : null;
  if (!me || !["admin", "super_admin"].includes(me.role) || me.status !== "active") {
    return json({ error: "Yalnız aktiv admin bu əməliyyatı edə bilər" }, 403);
  }
  const workspaceId = me.workspace_id;

  let p: any = {};
  try { p = await req.json(); } catch { /* empty */ }
  const action = p.action;

  try {
    // pm_role enum yalnız 4 dəyər dəstəkləyir; app-daxili incə rol (contributor/viewer/
    // sponsor) profile_json.appRole-da saxlanılır, login-də bərpa olunur.
    const toDbRole = (r: string) => (r === "admin" ? "admin" : r === "manager" ? "manager" : "user");

    if (action === "invite") {
      const email = String(p.email || "").trim().toLowerCase();
      const username = String(p.username || "").trim();
      const fullName = String(p.fullName || "").trim();
      const appRole = String(p.appRole || p.role || "user");
      const role = toDbRole(String(p.role || appRole));
      const redirectTo = String(p.redirectTo || "");
      if (!email || !username) return json({ error: "Email və istifadəçi adı tələb olunur" }, 400);
      if (!workspaceId) return json({ error: "Workspace tapılmadı" }, 400);

      // 1) Auth user yarat (təsdiqli, parolsuz — dəvət linki ilə quracaq)
      const created = await adm(`/auth/v1/admin/users`, "POST", {
        email, email_confirm: true,
        user_metadata: { username, full_name: fullName, company_key: workspaceId }
      });
      if (!created.ok) return json({ error: created.body?.msg || created.body?.error_description || "Auth user yaradılmadı", detail: created.body }, 502);
      const newId = created.body?.id || created.body?.user?.id;

      // 2) Profil (ADMIN dəvət edir → birbaşa active; parolsuz olduğu üçün link olmadan girə bilməz)
      const profIns = await adm(`/rest/v1/profiles`, "POST", {
        id: newId, workspace_id: workspaceId, role, username, full_name: fullName, email,
        status: "active", profile_json: { appRole }
      });
      if (!profIns.ok) return json({ error: "Profil yaradılmadı", detail: profIns.body }, 502);

      // 3) Dəvət/parol qurma linki
      const linkRes = await adm(`/auth/v1/admin/generate_link`, "POST", {
        type: "invite", email, options: redirectTo ? { redirect_to: redirectTo } : {}
      });
      const actionLink = linkRes.body?.action_link || linkRes.body?.properties?.action_link || null;
      return json({ ok: true, action: "invite", userId: newId, inviteLink: actionLink });
    }

    if (action === "create") {
      // Şirkət admini paneldən birbaşa hesab yaradır — parolu admin təyin edir,
      // hesab DƏRHAL active olur və email+parol ilə girə bilir.
      const email = String(p.email || "").trim().toLowerCase();
      const username = String(p.username || "").trim();
      const fullName = String(p.fullName || "").trim();
      const password = String(p.password || "");
      const appRole = String(p.appRole || p.role || "user");
      const role = toDbRole(String(p.role || appRole));
      if (!email || !username) return json({ error: "Email və istifadəçi adı tələb olunur" }, 400);
      if (password.length < 6) return json({ error: "Parol ən azı 6 simvol olmalıdır" }, 400);
      if (!workspaceId) return json({ error: "Workspace tapılmadı" }, 400);

      const created = await adm(`/auth/v1/admin/users`, "POST", {
        email, password, email_confirm: true,
        user_metadata: { username, full_name: fullName, company_key: workspaceId }
      });
      if (!created.ok) return json({ error: created.body?.msg || created.body?.error_description || "Auth user yaradılmadı", detail: created.body }, 502);
      const newId = created.body?.id || created.body?.user?.id;

      const profIns = await adm(`/rest/v1/profiles`, "POST", {
        id: newId, workspace_id: workspaceId, role, username, full_name: fullName, email,
        status: "active", profile_json: { appRole, position: String(p.position || "") }
      });
      if (!profIns.ok) return json({ error: "Profil yaradılmadı", detail: profIns.body }, 502);
      return json({ ok: true, action: "create", userId: newId, role: appRole });
    }

    if (action === "approve") {
      const profileId = String(p.profileId || "");
      const role = ["manager", "user", "admin"].includes(p.role) ? p.role : undefined;
      if (!profileId) return json({ error: "profileId tələb olunur" }, 400);
      // Yalnız öz workspace-indəki profili təsdiqlə
      const patch: Record<string, unknown> = { status: "active" };
      if (role) patch.role = role;
      const upd = await adm(`/rest/v1/profiles?id=eq.${profileId}&workspace_id=eq.${workspaceId}`, "PATCH", patch);
      if (!upd.ok) return json({ error: "Təsdiq alınmadı", detail: upd.body }, 502);
      if (!Array.isArray(upd.body) || !upd.body.length) return json({ error: "Profil bu workspace-də tapılmadı" }, 404);
      return json({ ok: true, action: "approve", profile: upd.body[0] });
    }

    if (action === "set-role") {
      // App-də rol dəyişəndə profiles.role də yenilənməlidir. Əks halda:
      //  • admin edilən adam RLS-də admin OLMUR → app_state yazıları 403 alır
      //    və dəyişiklikləri səssizcə itir
      //  • adminlikdən salınan adam RLS-də admin QALIR (təhlükəsizlik boşluğu)
      const profileId = String(p.profileId || "");
      const appRole = String(p.appRole || p.role || "user");
      if (!profileId) return json({ error: "profileId tələb olunur" }, 400);
      if (profileId === callerId) return json({ error: "Öz rolunuzu dəyişə bilməzsiniz" }, 400);

      const target = await admGet(`/rest/v1/profiles?id=eq.${profileId}&workspace_id=eq.${workspaceId}&select=id,role,profile_json`);
      const row = Array.isArray(target.body) ? target.body[0] : null;
      if (!row) return json({ error: "Profil bu workspace-də tapılmadı" }, 404);
      // super_admin-i buradan dəyişmək olmaz.
      if (row.role === "super_admin") return json({ error: "Super admin rolu dəyişdirilə bilməz" }, 403);

      const upd = await adm(`/rest/v1/profiles?id=eq.${profileId}&workspace_id=eq.${workspaceId}`, "PATCH", {
        role: toDbRole(appRole),
        profile_json: { ...(row.profile_json || {}), appRole }
      });
      if (!upd.ok) return json({ error: "Rol yenilənmədi", detail: upd.body }, 502);
      return json({ ok: true, action: "set-role", role: toDbRole(appRole), appRole });
    }

    if (action === "set-password") {
      // Admin başqa istifadəçinin parolunu dəyişir. ƏSAS: online giriş GoTrue ilə
      // yoxlanılır, ona görə parol MÜTLƏQ auth.users-də yenilənməlidir. Əvvəllər
      // app yalnız blob-dakı md5-i dəyişirdi → istifadəçi girə bilmirdi.
      const profileId = String(p.profileId || p.userId || "");
      const password = String(p.password || "");
      if (!profileId) return json({ error: "profileId tələb olunur" }, 400);
      if (password.length < 6) return json({ error: "Parol ən azı 6 simvol olmalıdır" }, 400);

      // Yalnız ÖZ workspace-indəki istifadəçi (super_admin toxunulmaz).
      const target = await admGet(`/rest/v1/profiles?id=eq.${profileId}&workspace_id=eq.${workspaceId}&select=id,role`);
      const row = Array.isArray(target.body) ? target.body[0] : null;
      if (!row) return json({ error: "Profil bu workspace-də tapılmadı" }, 404);
      if (row.role === "super_admin") return json({ error: "Super admin parolu dəyişdirilə bilməz" }, 403);

      const upd = await adm(`/auth/v1/admin/users/${profileId}`, "PUT", { password });
      if (!upd.ok) {
        return json({ error: upd.body?.msg || upd.body?.error_description || "Parol yenilənmədi", detail: upd.body }, 502);
      }
      return json({ ok: true, action: "set-password", userId: profileId });
    }

    if (action === "reject") {
      const profileId = String(p.profileId || "");
      if (!profileId) return json({ error: "profileId tələb olunur" }, 400);
      const check = await admGet(`/rest/v1/profiles?id=eq.${profileId}&workspace_id=eq.${workspaceId}&select=id`);
      if (!Array.isArray(check.body) || !check.body.length) return json({ error: "Profil tapılmadı" }, 404);
      await adm(`/rest/v1/profiles?id=eq.${profileId}`, "DELETE");
      await adm(`/auth/v1/admin/users/${profileId}`, "DELETE");
      return json({ ok: true, action: "reject" });
    }

    return json({ error: "Naməlum action" }, 400);
  } catch (err) {
    return json({ error: String((err as Error)?.message || err) }, 500);
  }
});
