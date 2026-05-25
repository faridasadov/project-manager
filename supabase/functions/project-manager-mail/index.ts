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

  const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
  const mailFrom = Deno.env.get("MAIL_FROM") || "Project Manager <onboarding@resend.dev>";
  if (!resendApiKey) {
    return Response.json({ skipped: true, reason: "RESEND_API_KEY is not configured" }, { headers: corsHeaders });
  }

  const payload = await req.json() as MailPayload;
  const to = recipients(payload.recipients || "");
  if (!to.length) {
    return Response.json({ skipped: true, reason: "No recipients configured" }, { headers: corsHeaders });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: mailFrom,
      to,
      subject: payload.subject || "Project Manager",
      text: renderText(payload)
    })
  });

  const body = await response.text();
  if (!response.ok) {
    return Response.json({ error: body || "Mail provider failed" }, { status: 502, headers: corsHeaders });
  }

  return Response.json({ ok: true, provider: "resend", result: body ? JSON.parse(body) : null }, { headers: corsHeaders });
});
