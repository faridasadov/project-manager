// login-by-username — istifadəçi email VƏ YA username ilə giriş edə bilsin.
// Online rejimdə GoTrue yalnız email+parol qəbul edir; username-i burada
// (service-role) email-ə çeviririk, sonra token alırıq. Email cavabda sızmır.
// verify_jwt=false — bu, giriş (pre-auth) endpoint-idir.

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let p: any = {};
  try { p = await req.json(); } catch { /* empty */ }
  const login = String(p.login || "").trim();
  const password = String(p.password || "");
  if (!login || !password) return json({ error: "Giriş və parol tələb olunur" }, 400);

  // İstifadəçi adı HƏMİŞƏ əvvəlcə axtarılır — "@" olsa belə. Səbəb: bizdə adlar
  // özü email şəklindədir (məs. "RQurban@AZEDUNET.AZ"), amma auth email-i fərqli
  // domendə ola bilər (rqurban@azedunet.com). Əvvəl "@" görəndə axtarış atlanır
  // və giriş alınmırdı. İndi: 1) ad kimi axtar → 2) tapılmasa email kimi işlət.
  // Axtarış ilike ilədir → böyük/kiçik hərf fərqi giriş üçün maneə olmur.
  let email = "";
  if (SERVICE_KEY) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/profiles?username=ilike.${encodeURIComponent(login)}&select=email&limit=2`, {
      headers: { apikey: SERVICE_KEY, authorization: `Bearer ${SERVICE_KEY}` }
    });
    const rows = await r.json().catch(() => []);
    // Dəqiq bir uyğunluq olmalıdır (username workspace başına unikaldır, qlobal deyil).
    if (Array.isArray(rows) && rows.length === 1 && rows[0]?.email) {
      email = String(rows[0].email).toLowerCase();
    }
  }
  if (!email && login.includes("@")) email = login.toLowerCase();
  if (!email) {
    // Enumerasiyanı önləmək üçün ümumi mesaj.
    return json({ error: "İstifadəçi adı və ya parol yanlışdır" }, 401);
  }

  // GoTrue password login.
  const tokRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "content-type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const tok = await tokRes.json().catch(() => null);
  if (!tokRes.ok || !tok?.access_token) {
    return json({ error: "İstifadəçi adı və ya parol yanlışdır" }, 401);
  }
  return json(tok);
});
