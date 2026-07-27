import nodemailer from "npm:nodemailer@6.9.16";

// ── Types ─────────────────────────────────────────────────────────────────
type MailPayload = {
  type?: string;               // "digests" | "change-alert" | "cron" | "test"
  recipients?: string;
  subject?: string;
  text?: string;
  template?: string;
  alerts?: Array<{ label?: string; taskName?: string; project?: string; end?: string }>;
};

type StateUser = {
  id?: string;
  username?: string;
  role?: string;
  profile?: {
    email?: string;
    fullName?: string;
    reportPrefs?: ReportPrefs;
  };
};

type ReportPrefs = {
  timezone?: string;
  language?: string;           // "az" | "ru" | "en" — hesabatın dili
  morning?: { enabled?: boolean; hour?: number };
  evening?: { enabled?: boolean; hour?: number };
  deadlineAlerts?: { enabled?: boolean; daysBefore?: number[] };
  changeAlerts?: { enabled?: boolean };
};

type StateTask = {
  id?: string; name?: string; owner?: string; end?: string; start?: string;
  status?: string; progress?: number; project?: string; completedAt?: string;
  priority?: string;
};

type StateProject = {
  id?: string; name?: string; end?: string; status?: string; archived?: boolean;
  managerIds?: string[]; teamMemberIds?: string[];
};

type StateTeam = {
  id?: string; name?: string; memberIds?: string[];
};

type AppState = {
  users?: StateUser[];
  tasks?: StateTask[];
  projects?: StateProject[];
  teams?: StateTeam[];
};

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "POST, OPTIONS"
};

// ── SMTP ──────────────────────────────────────────────────────────────────
function smtpConfig() {
  const user = Deno.env.get("SMTP_USER") || Deno.env.get("GMAIL_USER") || "";
  const pass = Deno.env.get("SMTP_PASS") || Deno.env.get("GMAIL_APP_PASSWORD") || "";
  const host = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
  const port = Number(Deno.env.get("SMTP_PORT") || "465");
  const from = Deno.env.get("MAIL_FROM") || (user ? `Project Manager <${user}>` : "");
  return { user, pass, host, port, from };
}

function makeTransport() {
  const c = smtpConfig();
  return nodemailer.createTransport({
    host: c.host, port: c.port, secure: c.port === 465,
    auth: { user: c.user, pass: c.pass }
  });
}

function recipientsOf(value = "") {
  return value.split(/[;,]/).map((s) => s.trim()).filter(Boolean);
}

function renderTemplate(payload: MailPayload) {
  if (payload.text) return payload.text;
  const lines = (payload.alerts || []).map((a) => `${a.label}: ${a.taskName} (${a.project}, ${a.end})`);
  return String(payload.template || "{{alerts}}").replaceAll("{{alerts}}", lines.join("\n"));
}

// ── Date / timezone helpers ───────────────────────────────────────────────
function hourInTz(tz: string): number {
  try {
    const s = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(new Date());
    return parseInt(s, 10) % 24;
  } catch { return new Date().getUTCHours(); }
}
function todayInTz(tz: string): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(new Date());
  } catch { return new Date().toISOString().slice(0, 10); }
}
function daysUntil(dateStr: string | undefined, today: string): number | null {
  if (!dateStr) return null;
  const d = new Date(dateStr.slice(0, 10) + "T00:00:00Z").getTime();
  const t = new Date(today + "T00:00:00Z").getTime();
  if (isNaN(d) || isNaN(t)) return null;
  return Math.round((d - t) / 86400000);
}
function isOpen(task: StateTask): boolean {
  if (task.completedAt) return false;
  if (typeof task.progress === "number" && task.progress >= 100) return false;
  const s = (task.status || "").toLowerCase();
  return !["completed", "done", "closed", "tamamlandı", "tamamlandi", "bağlı", "bagli"].includes(s);
}
function fmtDate(s?: string) { return s ? s.slice(0, 10) : "-"; }

// User-dependent scope: projects the user manages / is a member of,
// plus every task belonging to those projects. task.project may reference the
// project id OR its name; task.owner is a free-text resource label (not a user).
function userProjects(projects: StateProject[], uid: string): StateProject[] {
  return projects.filter((p) => !p.archived &&
    ((p.managerIds || []).includes(uid) || (p.teamMemberIds || []).includes(uid)));
}
// Rəhbərlik bütün şirkət layihələrini görür — gündəlik hesabatı da bütün
// portfel üzrə olmalıdır, yalnız üzvü olduğu layihələr üzrə deyil.
// isLeadership → hesabat MƏCBURİDİR (söndürülə bilməz, boş gündə də gedir).
function isLeadership(user: StateUser): boolean {
  return user.role === "rehberlik";
}
// isWholePortfolio → hesabatın ƏHATƏSİ bütün şirkətdir. Admin bütün iş sahəsini
// idarə etdiyi üçün (heç bir layihədə üzv olmasa da) hesabatı bütün portfeli
// əhatə etməlidir; rəhbərlik də eyni. Fərq: admin öz açarını (enabled) saxlayır,
// rəhbərlik məcburidir.
function isWholePortfolio(user: StateUser): boolean {
  return user.role === "rehberlik" || user.role === "admin";
}
function userTasks(tasks: StateTask[], myProjects: StateProject[], uid: string): StateTask[] {
  const keys = new Set<string>();
  for (const p of myProjects) { if (p.id) keys.add(p.id); if (p.name) keys.add(p.name); }
  return tasks.filter((t) => (t.project && keys.has(t.project)) || t.owner === uid);
}
// Məsul resursunu (owner) oxunaqlı ada çevirir: "user:<id>" → tam ad / username,
// "team:<id>" → komanda adı (dil şəkilçisi ownerTag-də əlavə olunur).
type NameOf = (owner?: string) => string;
function buildNameOf(users: StateUser[], teams: StateTeam[]): NameOf {
  const byUser = new Map<string, string>();
  for (const u of users) if (u.id) byUser.set(u.id, u.profile?.fullName || u.username || u.id);
  const byTeam = new Map<string, string>();
  for (const t of teams) if (t.id) byTeam.set(t.id, t.name || t.id);
  return (owner?: string) => {
    if (!owner) return "";
    if (owner.startsWith("user:")) return byUser.get(owner.slice(5)) || owner;
    if (owner.startsWith("team:")) return byTeam.get(owner.slice(5)) || owner;
    return byUser.get(owner) || owner;
  };
}
// Layihə tamamlanma faizi — UI-dəki projectCompletion ilə eyni məntiq:
// status "Bitib" → 100; əks halda layihənin task-larının progress ortalaması;
// task yoxdursa manual project.progress sahəsi (köhnə davranış). task.project
// layihənin id-nə VƏ YA adına istinad edə bilər.
function projectPercent(p: StateProject, tasks: StateTask[]): number {
  if (p.status === "Bitib") return 100;
  const pt = tasks.filter((t) => t.project && (t.project === p.id || t.project === p.name));
  if (pt.length) {
    const sum = pt.reduce((acc, t) => {
      const v = Number(t.progress);
      const val = Number.isFinite(v) ? v : (t.status === "Bitib" ? 100 : 0);
      return acc + Math.max(0, Math.min(100, val));
    }, 0);
    return Math.round(sum / pt.length);
  }
  const manual = Number((p as { progress?: number }).progress);
  return Number.isFinite(manual) ? Math.min(100, Math.max(0, manual)) : 0;
}

function ownerTag(t: StateTask, nameOf: NameOf, L: Lang) {
  const n = nameOf(t.owner);
  if (!n) return "";
  const suffix = t.owner?.startsWith("team:") ? ` (${L.teamWord})` : "";
  return ` (${n}${suffix})`;
}

// ── Hesabat dilləri (az/ru/en) — istifadəçinin reportPrefs.language seçimi ──
type Lang = typeof L10N["az"];
const L10N = {
  az: {
    greeting: (name: string) => `Salam, ${name}!`,
    openTasks: (n: number) => `📋 Üzərində qalan tapşırıqlar: ${n}`,
    overdueBy: (d: number) => ` — ⛔ ${d} gün gecikib`,
    dueTodayTail: " — ⚠️ bu gün deadline",
    daysLeft: (d: number) => ` — ${d} gün qalıb`,
    overdue: (n: number) => `⛔ Gecikmiş: ${n}`,
    upcoming: "⏰ Yaxın deadline-lar:",
    companyProjects: (n: number) => `📁 Şirkət layihələri: ${n}`,
    myProjects: (n: number) => `📁 Aid olduğun layihələr: ${n}`,
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Səhər hesabatı — ${d}`,
    eveningSubject: (d: string) => `🌙 Gün sonu hesabatı — ${d}`,
    daySummary: (d: string) => `🌙 Günün yekunu — ${d}:`,
    completedToday: (n: number) => `✅ Bu gün tamamlanan: ${n}`,
    dueTodayOpen: (n: number) => `📌 Bu gün deadline olan (açıq): ${n}`,
    remaining: (n: number) => `Sabaha qalan açıq tapşırıq: ${n}`,
    teamWord: "komanda"
  },
  ru: {
    greeting: (name: string) => `Здравствуйте, ${name}!`,
    openTasks: (n: number) => `📋 Открытые задачи: ${n}`,
    overdueBy: (d: number) => ` — ⛔ просрочено на ${d} дн.`,
    dueTodayTail: " — ⚠️ дедлайн сегодня",
    daysLeft: (d: number) => ` — осталось ${d} дн.`,
    overdue: (n: number) => `⛔ Просроченные: ${n}`,
    upcoming: "⏰ Ближайшие дедлайны:",
    companyProjects: (n: number) => `📁 Проекты компании: ${n}`,
    myProjects: (n: number) => `📁 Ваши проекты: ${n}`,
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Утренний отчёт — ${d}`,
    eveningSubject: (d: string) => `🌙 Отчёт за день — ${d}`,
    daySummary: (d: string) => `🌙 Итоги дня — ${d}:`,
    completedToday: (n: number) => `✅ Выполнено сегодня: ${n}`,
    dueTodayOpen: (n: number) => `📌 Дедлайн сегодня (открытые): ${n}`,
    remaining: (n: number) => `Открытых задач на завтра: ${n}`,
    teamWord: "команда"
  },
  en: {
    greeting: (name: string) => `Hello, ${name}!`,
    openTasks: (n: number) => `📋 Open tasks: ${n}`,
    overdueBy: (d: number) => ` — ⛔ ${d} day(s) overdue`,
    dueTodayTail: " — ⚠️ due today",
    daysLeft: (d: number) => ` — ${d} day(s) left`,
    overdue: (n: number) => `⛔ Overdue: ${n}`,
    upcoming: "⏰ Upcoming deadlines:",
    companyProjects: (n: number) => `📁 Company projects: ${n}`,
    myProjects: (n: number) => `📁 Your projects: ${n}`,
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Morning report — ${d}`,
    eveningSubject: (d: string) => `🌙 End-of-day report — ${d}`,
    daySummary: (d: string) => `🌙 Day summary — ${d}:`,
    completedToday: (n: number) => `✅ Completed today: ${n}`,
    dueTodayOpen: (n: number) => `📌 Due today (open): ${n}`,
    remaining: (n: number) => `Open tasks remaining: ${n}`,
    teamWord: "team"
  }
};
function langOf(prefs?: ReportPrefs): Lang {
  const l = prefs?.language;
  return (l === "ru" || l === "en") ? L10N[l] : L10N.az;
}

// ── Digest builders (Azerbaijani) ─────────────────────────────────────────
// Portfel gövdəsi — həm səhər, həm axşam hesabatı üçün ortaq: açıq tapşırıqlar,
// gecikmişlər, yaxın deadline-lar və layihələr.
function portfolioLines(mine: StateTask[], myProjects: StateProject[], today: string, daysBefore: number[], nameOf: NameOf, leadership: boolean, L: Lang) {
  const open = mine.filter(isOpen);
  const soon = (daysBefore && daysBefore.length ? daysBefore : [3, 1]);
  const maxSoon = Math.max(...soon);
  const dueSoon = open.filter((t) => { const d = daysUntil(t.end, today); return d !== null && d <= maxSoon && d >= 0; });
  const overdue = open.filter((t) => { const d = daysUntil(t.end, today); return d !== null && d < 0; });

  const lines: string[] = [];
  lines.push(L.openTasks(open.length));
  for (const t of open.slice(0, 30)) {
    const d = daysUntil(t.end, today);
    const tail = d === null ? "" : d < 0 ? L.overdueBy(Math.abs(d)) : d === 0 ? L.dueTodayTail : L.daysLeft(d);
    lines.push(`  • ${t.name}${ownerTag(t, nameOf, L)} [${t.status || "-"}, ${t.progress ?? 0}%]${tail}`);
  }
  if (overdue.length) { lines.push(""); lines.push(L.overdue(overdue.length)); }
  if (dueSoon.length) {
    lines.push(""); lines.push(L.upcoming);
    for (const t of dueSoon) lines.push(`  • ${t.name} — ${fmtDate(t.end)}`);
  }
  if (myProjects.length) {
    lines.push(""); lines.push(leadership ? L.companyProjects(myProjects.length) : L.myProjects(myProjects.length));
    for (const p of myProjects.slice(0, 20)) lines.push(`  • ${p.name} [${p.status || "-"}, ${projectPercent(p, mine)}%]`);
  }
  return { lines, open };
}

function morningDigest(user: StateUser, mine: StateTask[], myProjects: StateProject[], today: string, daysBefore: number[], nameOf: NameOf, leadership: boolean, L: Lang) {
  const { lines: body, open } = portfolioLines(mine, myProjects, today, daysBefore, nameOf, leadership, L);
  const lines = [L.greeting(user.profile?.fullName || user.username || ""), "", ...body, "", L.signature];
  return { subject: L.morningSubject(today), text: lines.join("\n"), empty: open.length === 0 && myProjects.length === 0 };
}

// Axşam hesabatı da səhər kimi tam informativdir; günün yekunu (tamamlanan,
// bu gün deadline, sabaha qalan) sonda ayrıca blokda gəlir.
function eveningDigest(user: StateUser, mine: StateTask[], myProjects: StateProject[], today: string, daysBefore: number[], nameOf: NameOf, leadership: boolean, L: Lang) {
  const { lines: body, open } = portfolioLines(mine, myProjects, today, daysBefore, nameOf, leadership, L);
  const completedToday = mine.filter((t) => t.completedAt && t.completedAt.slice(0, 10) === today);
  const dueToday = open.filter((t) => t.end && t.end.slice(0, 10) === today);

  const lines = [L.greeting(user.profile?.fullName || user.username || ""), "", ...body, ""];
  lines.push("──────────────────────────");
  lines.push(L.daySummary(today));
  lines.push("");
  lines.push(L.completedToday(completedToday.length));
  for (const t of completedToday.slice(0, 30)) lines.push(`  • ${t.name}${ownerTag(t, nameOf, L)}`);
  lines.push("");
  lines.push(L.dueTodayOpen(dueToday.length));
  for (const t of dueToday.slice(0, 30)) lines.push(`  • ${t.name}${ownerTag(t, nameOf, L)} [${t.progress ?? 0}%]`);
  lines.push("");
  lines.push(L.remaining(open.length));
  lines.push(""); lines.push(L.signature);
  return { subject: L.eveningSubject(today), text: lines.join("\n"), empty: open.length === 0 && myProjects.length === 0 && completedToday.length === 0 };
}

// ── Read all workspaces' app_state via service role ───────────────────────
async function loadStates(): Promise<AppState[]> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
  if (!url || !key) return [];
  const res = await fetch(`${url}/rest/v1/app_state?select=state_json`, {
    headers: { apikey: key, authorization: `Bearer ${key}` }
  });
  if (!res.ok) return [];
  const rows = await res.json() as Array<{ state_json: AppState }>;
  return rows.map((r) => r.state_json).filter(Boolean);
}

// ── Digest run (called by hourly cron) ────────────────────────────────────
async function runDigests() {
  const states = await loadStates();
  const transporter = makeTransport();
  const sent: Array<{ email: string; kind: string }> = [];
  const errors: Array<{ email: string; error: string }> = [];
  const from = smtpConfig().from;

  for (const state of states) {
    const users = state.users || [];
    const tasks = state.tasks || [];
    const projects = state.projects || [];
    const teams = state.teams || [];
    const nameOf = buildNameOf(users, teams);

    for (const user of users) {
      const email = user.profile?.email?.trim();
      // Rəhbərlik üçün hesabat məcburidir: reportPrefs ümumiyyətlə yoxdursa da
      // (məsələn rol təzəcə verilib, blob hələ yenilənməyib) mail getməlidir.
      const forced = isLeadership(user);
      const wide = isWholePortfolio(user);
      const prefs = user.profile?.reportPrefs;
      if (!email || (!prefs && !forced)) continue;
      const tz = prefs?.timezone || "Asia/Baku";
      const hour = hourInTz(tz);
      const today = todayInTz(tz);

      const wantMorning = (forced || prefs?.morning?.enabled) && hour === (prefs?.morning?.hour ?? 9);
      const wantEvening = (forced || prefs?.evening?.enabled) && hour === (prefs?.evening?.hour ?? 18);
      if (!wantMorning && !wantEvening) continue;

      const myProjects = wide
        ? projects.filter((p) => !p.archived)
        : userProjects(projects, user.id!);
      const mine = userTasks(tasks, myProjects, user.id!);

      const jobs: Array<{ kind: string; subject: string; text: string; empty: boolean }> = [];
      const daysBefore = prefs?.deadlineAlerts?.daysBefore || [3, 1];
      const L = langOf(prefs);
      if (wantMorning) {
        jobs.push({ kind: "morning", ...morningDigest(user, mine, myProjects, today, daysBefore, nameOf, wide, L) });
      }
      if (wantEvening) {
        jobs.push({ kind: "evening", ...eveningDigest(user, mine, myProjects, today, daysBefore, nameOf, wide, L) });
      }

      for (const job of jobs) {
        // Boş hesabat göndərilmir — AMMA rəhbərlik üçün hesabat məcburidir:
        // "bu gün açıq iş yoxdur" məlumatı da rəhbərlik üçün nəticədir.
        if (job.empty && !forced) continue;
        try {
          await transporter.sendMail({ from, to: email, subject: job.subject, text: job.text });
          sent.push({ email, kind: job.kind });
        } catch (err) {
          errors.push({ email, error: String((err as Error)?.message || err) });
        }
      }
    }
  }
  // Görünmə üçün log — cron cavabı atır, ona görə nəticə burada qeyd olunur.
  console.log(`[digests] sent=${sent.length} errors=${errors.length}` +
    (sent.length ? ` → ${sent.map((s) => `${s.email}:${s.kind}`).join(", ")}` : "") +
    (errors.length ? ` ⛔ ${errors.map((e) => `${e.email}:${e.error}`).join(" | ")}` : ""));
  return { ok: true, mode: "digests", sent, errors };
}

// ── HTTP entrypoint ───────────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  const c = smtpConfig();
  if (!c.user || !c.pass) {
    return Response.json({ skipped: true, reason: "SMTP_USER or SMTP_PASS is not configured" }, { headers: corsHeaders });
  }

  let payload: MailPayload = {};
  try { payload = await req.json() as MailPayload; } catch { /* empty body ok for digests */ }

  // Scheduled digest run (hourly cron)
  if (payload.type === "digests") {
    try {
      const result = await runDigests();
      return Response.json(result, { headers: corsHeaders });
    } catch (err) {
      return Response.json({ error: String((err as Error)?.message || err) }, { status: 502, headers: corsHeaders });
    }
  }

  // Direct send: change-alert (client), cron (legacy), test
  const to = recipientsOf(payload.recipients || "");
  if (!to.length) {
    return Response.json({ skipped: true, reason: "No recipients configured" }, { headers: corsHeaders });
  }
  try {
    const info = await makeTransport().sendMail({
      from: c.from,
      to: to.join(", "),
      subject: payload.subject || "Project Manager",
      text: renderTemplate(payload)
    });
    return Response.json({ ok: true, provider: "smtp", messageId: info.messageId, recipients: to }, { headers: corsHeaders });
  } catch (err) {
    return Response.json({ error: String((err as Error)?.message || err) || "SMTP send failed" }, { status: 502, headers: corsHeaders });
  }
});
