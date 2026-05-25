// Project Manager — multi-channel notification edge function.
// Channels: Resend email + Telegram Bot API.
//
// Secrets (Supabase Dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY      — Resend API key
//   MAIL_FROM           — "Project Manager <noreply@yourdomain.com>"
//   TELEGRAM_BOT_TOKEN  — from BotFather
//   TELEGRAM_CHAT_ID    — default chat/channel ID

type NotifyPayload = {
  channel: "email" | "telegram" | "all";
  recipients?: string;     // semicolon-separated emails
  subject?: string;
  body?: string;
  telegramChatId?: string; // override TELEGRAM_CHAT_ID secret
};

const cors: HeadersInit = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "content-type": "application/json" } });

function parseEmails(s = "") {
  return s.split(/[;,]/).map(e => e.trim()).filter(Boolean);
}

async function sendEmail(p: NotifyPayload, errors: string[]): Promise<boolean> {
  const key  = Deno.env.get("RESEND_API_KEY") ?? "";
  const from = Deno.env.get("MAIL_FROM") ?? "Project Manager <onboarding@resend.dev>";
  if (!key)  { errors.push("email: RESEND_API_KEY not set"); return false; }
  const to = parseEmails(p.recipients ?? "");
  if (!to.length) { errors.push("email: no recipients"); return false; }
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to, subject: p.subject ?? "Project Manager", text: p.body ?? "" }),
    });
    if (!r.ok) { errors.push(`email: ${r.status} ${(await r.text()).slice(0, 200)}`); return false; }
    return true;
  } catch (e) { errors.push(`email: ${(e as Error).message}`); return false; }
}

async function sendTelegram(p: NotifyPayload, errors: string[]): Promise<boolean> {
  const token  = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
  const chatId = p.telegramChatId?.trim() || Deno.env.get("TELEGRAM_CHAT_ID") ?? "";
  if (!token)  { errors.push("telegram: TELEGRAM_BOT_TOKEN not set"); return false; }
  if (!chatId) { errors.push("telegram: chat id not configured"); return false; }
  const text = [p.subject, p.body].filter(Boolean).join("\n\n");
  if (!text) { errors.push("telegram: empty body"); return false; }
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    if (!r.ok) { errors.push(`telegram: ${r.status} ${(await r.text()).slice(0, 200)}`); return false; }
    return true;
  } catch (e) { errors.push(`telegram: ${(e as Error).message}`); return false; }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST")   return json({ error: "Method not allowed" }, 405);
  let p: NotifyPayload;
  try { p = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  const ch = p.channel ?? "email";
  if (!["email", "telegram", "all"].includes(ch)) return json({ error: `Bad channel: ${ch}` }, 400);
  const result = { email: false, telegram: false, errors: [] as string[] };
  await Promise.all([
    (ch === "email"    || ch === "all") ? sendEmail(p, result.errors).then(ok => { result.email = ok; })       : Promise.resolve(),
    (ch === "telegram" || ch === "all") ? sendTelegram(p, result.errors).then(ok => { result.telegram = ok; }) : Promise.resolve(),
  ]);
  return json(result, result.email || result.telegram ? 200 : 502);
});
