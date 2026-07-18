import nodemailer from "npm:nodemailer@6.9.16";

type MailPayload = {
  type?: string;
  recipients?: string;
  subject?: string;
  text?: string;
  template?: string;
  alerts?: Array<{ label?: string; taskName?: string; project?: string; end?: string }>;
  workspaceId?: string;
  companyId?: string;
};

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS"
};

function recipients(value = "") {
  return value.split(/[;,]/).map((item) => item.trim()).filter(Boolean);
}

function renderText(payload: MailPayload) {
  if (payload.text) return payload.text;
  const lines = (payload.alerts || []).map((item) => `${item.label}: ${item.taskName} (${item.project}, ${item.end})`);
  return String(payload.template || "{{alerts}}").replaceAll("{{alerts}}", lines.join("\n"));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  // SMTP_USER/SMTP_PASS required; host+port configurable (default: Gmail).
  // GMAIL_USER/GMAIL_APP_PASSWORD accepted as aliases for backward compat.
  const smtpUser = Deno.env.get("SMTP_USER") || Deno.env.get("GMAIL_USER") || "";
  const smtpPass = Deno.env.get("SMTP_PASS") || Deno.env.get("GMAIL_APP_PASSWORD") || "";
  const smtpHost = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
  const smtpPort = Number(Deno.env.get("SMTP_PORT") || "465");
  const mailFrom = Deno.env.get("MAIL_FROM") || (smtpUser ? `Project Manager <${smtpUser}>` : "");
  if (!smtpUser || !smtpPass) {
    return Response.json({ skipped: true, reason: "SMTP_USER or SMTP_PASS is not configured" }, { headers: corsHeaders });
  }

  const payload = await req.json() as MailPayload;
  const to = recipients(payload.recipients || "");
  if (!to.length) {
    return Response.json({ skipped: true, reason: "No recipients configured" }, { headers: corsHeaders });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // implicit TLS for 465, STARTTLS otherwise
    auth: { user: smtpUser, pass: smtpPass }
  });

  try {
    const info = await transporter.sendMail({
      from: mailFrom,
      to: to.join(", "),
      subject: payload.subject || "Project Manager",
      text: renderText(payload)
    });
    return Response.json({ ok: true, provider: "smtp", messageId: info.messageId, recipients: to }, { headers: corsHeaders });
  } catch (err) {
    return Response.json({ error: String((err && err.message) || err) || "SMTP send failed" }, { status: 502, headers: corsHeaders });
  }
});
