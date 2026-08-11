import nodemailer from "npm:nodemailer@6.9.16";

// ── Types ─────────────────────────────────────────────────────────────────
type MailPayload = {
  type?: string;               // "digests" | "change-alert" | "deadline-alerts" | "cron" | "test"
  workspaceId?: string;        // direct-send: bu workspace-in öz SMTP-si üçün açar
  companyId?: string;
  recipients?: string;
  subject?: string;
  text?: string;
  template?: string;
  alerts?: Array<{ label?: string; taskName?: string; project?: string; end?: string }>;
};

// Workspace-in app_settings.settings_json içindəki mail konfiqi (yalnız SMTP lazımdır).
type WsSettings = { emailProvider?: string; [k: string]: unknown };

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
  comments?: Array<{ author?: string; text?: string; createdAt?: string }>;
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

// ── Per-workspace SMTP seçimi ─────────────────────────────────────────────
// Workspace-in öz SMTP serveri (emailProvider) varsa mail ONUN üzərindən gedir,
// platform SMTP-si həmin workspace üçün deaktiv olur. Yoxdursa platform default.
// provider formatı: smtps://user:pass@host:port — nodemailer birbaşa URL qəbul edir.
function transportFor(provider?: string) {
  const p = (provider || "").trim();
  if (p && /^smtps?:\/\//i.test(p)) {
    try {
      return { transporter: nodemailer.createTransport(p), from: fromFromProvider(p), custom: true };
    } catch { /* keçərsiz URL — platform default-a düş */ }
  }
  return { transporter: makeTransport(), from: smtpConfig().from, custom: false };
}
// Öz serveri işlədiləndə "from" — SMTP login email-dirsə ondan (server çox vaxt
// öz login ünvanını "from" kimi tələb edir), yoxsa platform "from"-a qayıt.
function fromFromProvider(provider: string): string {
  try {
    const u = new URL(provider);
    const user = decodeURIComponent(u.username || "");
    if (user.includes("@")) return `Project Manager <${user}>`;
  } catch { /* ignore */ }
  return smtpConfig().from;
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

// Task-ın ən son kommentini qaytarır (mətn boşdursa null). Çoxsətirli komment
// tək sətrə yığılır, uzunsa qısaldılır ki gündəlik mail dağınıq olmasın.
function latestComment(t: StateTask): { author: string; text: string } | null {
  const list = Array.isArray(t.comments) ? t.comments : [];
  if (!list.length) return null;
  const c = list.reduce((a, b) =>
    new Date(b.createdAt || 0).getTime() >= new Date(a.createdAt || 0).getTime() ? b : a);
  const text = String(c.text || "").replace(/\s+/g, " ").trim();
  if (!text) return null;
  const clipped = text.length > 160 ? text.slice(0, 157) + "…" : text;
  return { author: String(c.author || "").trim(), text: clipped };
}

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
    lastCommentLabel: "💬 Son komment",
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Səhər hesabatı — ${d}`,
    eveningSubject: (d: string) => `🌙 Gün sonu hesabatı — ${d}`,
    daySummary: (d: string) => `🌙 Günün yekunu — ${d}:`,
    completedToday: (n: number) => `✅ Bu gün tamamlanan: ${n}`,
    dueTodayOpen: (n: number) => `📌 Bu gün deadline olan (açıq): ${n}`,
    remaining: (n: number) => `Sabaha qalan açıq tapşırıq: ${n}`,
    teamWord: "komanda",
    status: { "Plan": "Plan", "Davam edir": "Davam edir", "Bitib": "Bitib" } as Record<string, string>
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
    lastCommentLabel: "💬 Последний комментарий",
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Утренний отчёт — ${d}`,
    eveningSubject: (d: string) => `🌙 Отчёт за день — ${d}`,
    daySummary: (d: string) => `🌙 Итоги дня — ${d}:`,
    completedToday: (n: number) => `✅ Выполнено сегодня: ${n}`,
    dueTodayOpen: (n: number) => `📌 Дедлайн сегодня (открытые): ${n}`,
    remaining: (n: number) => `Открытых задач на завтра: ${n}`,
    teamWord: "команда",
    status: { "Plan": "План", "Davam edir": "В работе", "Bitib": "Завершено" } as Record<string, string>
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
    lastCommentLabel: "💬 Latest comment",
    signature: "— Project Manager",
    morningSubject: (d: string) => `🌅 Morning report — ${d}`,
    eveningSubject: (d: string) => `🌙 End-of-day report — ${d}`,
    daySummary: (d: string) => `🌙 Day summary — ${d}:`,
    completedToday: (n: number) => `✅ Completed today: ${n}`,
    dueTodayOpen: (n: number) => `📌 Due today (open): ${n}`,
    remaining: (n: number) => `Open tasks remaining: ${n}`,
    teamWord: "team",
    status: { "Plan": "Planned", "Davam edir": "In progress", "Bitib": "Completed" } as Record<string, string>
  }
};
// Status kanonik AZ-dır ("Plan"/"Davam edir"/"Bitib"). Hesabat dilinə çevir;
// workspace-in xüsusi (custom) statusu tərcümədə yoxdursa xam qalır.
function localizeStatus(raw: string | undefined, L: Lang): string {
  if (!raw) return "-";
  return L.status[raw] || raw;
}
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
    lines.push(`  • ${t.name}${ownerTag(t, nameOf, L)} [${localizeStatus(t.status, L)}, ${t.progress ?? 0}%]${tail}`);
    // Son komment — varsa göstər, yoxdusa kommentsiz keç (Farid tələbi).
    const lc = latestComment(t);
    if (lc) lines.push(`      ${L.lastCommentLabel}: ${lc.author ? lc.author + " — " : ""}${lc.text}`);
  }
  if (overdue.length) { lines.push(""); lines.push(L.overdue(overdue.length)); }
  if (dueSoon.length) {
    lines.push(""); lines.push(L.upcoming);
    for (const t of dueSoon) lines.push(`  • ${t.name} — ${fmtDate(t.end)}`);
  }
  if (myProjects.length) {
    lines.push(""); lines.push(leadership ? L.companyProjects(myProjects.length) : L.myProjects(myProjects.length));
    for (const p of myProjects.slice(0, 20)) lines.push(`  • ${p.name} [${localizeStatus(p.status, L)}, ${projectPercent(p, mine)}%]`);
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

// ── Read all workspaces' app_state + app_settings (SMTP) via service role ──
type Workspace = { workspaceId: string; state: AppState; emailProvider: string };
function sbEnv() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
  return { url, key, headers: { apikey: key, authorization: `Bearer ${key}` } };
}
async function loadWorkspaces(): Promise<Workspace[]> {
  const { url, key, headers } = sbEnv();
  if (!url || !key) return [];
  const [stateRes, settingsRes] = await Promise.all([
    fetch(`${url}/rest/v1/app_state?select=workspace_id,state_json`, { headers }),
    fetch(`${url}/rest/v1/app_settings?select=workspace_id,settings_json`, { headers })
  ]);
  if (!stateRes.ok) return [];
  const stateRows = await stateRes.json() as Array<{ workspace_id: string; state_json: AppState }>;
  const settingsRows = settingsRes.ok
    ? await settingsRes.json() as Array<{ workspace_id: string; settings_json: WsSettings }>
    : [];
  const providerByWs = new Map<string, string>();
  for (const r of settingsRows) {
    const prov = (r.settings_json?.emailProvider || "").trim();
    if (prov) providerByWs.set(r.workspace_id, prov);
  }
  return stateRows
    .filter((r) => r.state_json)
    .map((r) => ({ workspaceId: r.workspace_id, state: r.state_json, emailProvider: providerByWs.get(r.workspace_id) || "" }));
}

// Göndərilən digest-i notifications cədvəlinə də yaz (tarixçə üçün — əvvəllər
// yalnız console.log idi). Uğursuzluq mail axınını pozmamalıdır.
async function insertNotification(workspaceId: string, type: string, recipient: string, subject: string, body: string) {
  const { url, key, headers } = sbEnv();
  if (!url || !key || !workspaceId) return;
  try {
    await fetch(`${url}/rest/v1/notifications`, {
      method: "POST",
      headers: { ...headers, "content-type": "application/json", prefer: "return=minimal" },
      body: JSON.stringify({
        workspace_id: workspaceId,
        type,
        recipient,
        subject,
        body: (body || "").slice(0, 2000),
        status: "sent",
      }),
    });
  } catch { /* bildiriş yazısı uğursuz olsa mail axını davam etsin */ }
}

// Direct-send üçün tək workspace-in SMTP provider-i (payload.workspaceId ilə).
async function loadWorkspaceProvider(workspaceId: string): Promise<string> {
  const { url, key, headers } = sbEnv();
  if (!url || !key || !workspaceId) return "";
  const res = await fetch(
    `${url}/rest/v1/app_settings?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=settings_json&limit=1`,
    { headers }
  );
  if (!res.ok) return "";
  const rows = await res.json() as Array<{ settings_json: WsSettings }>;
  return (rows[0]?.settings_json?.emailProvider || "").trim();
}

// ── Digest run (called by hourly cron) ────────────────────────────────────
async function runDigests() {
  const workspaces = await loadWorkspaces();
  const sent: Array<{ email: string; kind: string }> = [];
  const errors: Array<{ email: string; error: string }> = [];

  for (const ws of workspaces) {
    const state = ws.state;
    // Bu workspace-in öz SMTP-si varsa onun üzərindən, yoxsa platform default.
    const { transporter, from } = transportFor(ws.emailProvider);
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
          await insertNotification(ws.workspaceId, `digest-${job.kind}`, email, job.subject, job.text);
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

  let payload: MailPayload = {};
  try { payload = await req.json() as MailPayload; } catch { /* empty body ok for digests */ }

  // Scheduled digest run (hourly cron) — hər workspace öz SMTP-si ilə (transportFor).
  if (payload.type === "digests") {
    try {
      const result = await runDigests();
      return Response.json(result, { headers: corsHeaders });
    } catch (err) {
      return Response.json({ error: String((err as Error)?.message || err) }, { status: 502, headers: corsHeaders });
    }
  }

  // Direct send: change-alert (client), deadline-alerts, cron (legacy), test
  const to = recipientsOf(payload.recipients || "");
  if (!to.length) {
    return Response.json({ skipped: true, reason: "No recipients configured" }, { headers: corsHeaders });
  }
  // Bu workspace-in öz SMTP serveri varsa mail ONUN üzərindən; yoxsa platform default.
  const provider = payload.workspaceId ? await loadWorkspaceProvider(payload.workspaceId) : "";
  const { transporter, from, custom } = transportFor(provider);
  const platform = smtpConfig();
  if (!custom && (!platform.user || !platform.pass)) {
    return Response.json({ skipped: true, reason: "SMTP is not configured" }, { headers: corsHeaders });
  }
  try {
    const info = await transporter.sendMail({
      from,
      to: to.join(", "),
      subject: payload.subject || "Project Manager",
      text: renderTemplate(payload)
    });
    return Response.json({ ok: true, provider: custom ? "workspace-smtp" : "platform-smtp", messageId: info.messageId, recipients: to }, { headers: corsHeaders });
  } catch (err) {
    return Response.json({ error: String((err as Error)?.message || err) || "SMTP send failed" }, { status: 502, headers: corsHeaders });
  }
});
