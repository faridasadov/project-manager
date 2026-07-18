// project-chat.js — üzən (floating) daxili söhbət widget-i.
// İki rejim: 📁 layihə (qrupa/hamıya) və 👤 birbaşa (istifadəçiyə private).
// Şirkət (workspace) daxilində — RLS: group=workspace, DM=yalnız sender/recipient.
// Klassik <script>, script.js-dən əvvəl yüklənir → paylaşılan global scope.
// Runtime globalları: supabaseConfig, supabaseRequest, supabaseSession, supabaseWorkspaceId,
//   currentUser, appState, escapeHtml, text, visibleProjects, showToast, window.supabase.

/* eslint-disable no-unused-vars */

const pmChat = {
  mounted: false,
  open: false,
  channelKey: null,        // "project:<id>" | "dm:<userId>"
  rtClient: null,
  rtChannel: null,
  ids: new Set(),
  unread: 0
};

function pmChatCanUse() {
  return Boolean(supabaseConfig() && supabaseSession?.access_token && supabaseWorkspaceId && currentUser);
}

// Şirkət daxili siyahılar
function pmChatProjects() {
  const list = (typeof visibleProjects === "function") ? visibleProjects() : (appState.projects || []);
  return list.filter((p) => p && p.id && !p.archived);
}
function pmChatPeople() {
  const me = currentUser?.id;
  const comp = currentUser?.companyId;
  return (appState.users || []).filter((u) =>
    u.id && u.id !== me && u.role !== "super_admin" && (!comp || u.companyId === comp));
}
function pmUserName(id) {
  const u = (appState.users || []).find((x) => x.id === id);
  return u ? (u.profile?.fullName || u.username) : "—";
}

// ── SVG ikonlar ────────────────────────────────────────────────────────────
const PM_ICON_CHAT = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.9-5.4A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>`;
const PM_ICON_SEND = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`;
const PM_ICON_CLOSE = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;

function pmChatChannelLabel(key) {
  if (!key) return text("chatPickChannel");
  if (key.startsWith("project:")) {
    const p = pmChatProjects().find((x) => x.id === key.slice(8));
    return `📁 ${p ? p.name : "—"}`;
  }
  if (key.startsWith("dm:")) return `👤 ${pmUserName(key.slice(3))}`;
  return text("chatPickChannel");
}

function buildChannelOptions() {
  const projects = pmChatProjects();
  const people = pmChatPeople();
  const opt = (v, label) => `<option value="${v}"${v === pmChat.channelKey ? " selected" : ""}>${escapeHtml(label)}</option>`;
  let html = `<option value="">${escapeHtml(text("chatPickChannel"))}</option>`;
  if (projects.length) {
    html += `<optgroup label="${escapeHtml(text("chatProjects"))}">` +
      projects.map((p) => opt(`project:${p.id}`, p.name)).join("") + `</optgroup>`;
  }
  if (people.length) {
    html += `<optgroup label="${escapeHtml(text("chatDirect"))}">` +
      people.map((u) => opt(`dm:${u.id}`, u.profile?.fullName || u.username)).join("") + `</optgroup>`;
  }
  return html;
}

// ── DOM ──────────────────────────────────────────────────────────────────
function ensureChatWidget() {
  if (!pmChatCanUse()) { removeChatWidget(); return; }
  if (pmChat.mounted) { refreshChannelOptions(); return; }

  const fab = document.createElement("button");
  fab.id = "pmChatFab";
  fab.type = "button";
  fab.className = "pm-chat-fab";
  fab.setAttribute("aria-label", text("chatTitle"));
  fab.innerHTML = `${PM_ICON_CHAT}<span class="pm-chat-badge" id="pmChatBadge" hidden>0</span>`;
  fab.addEventListener("click", toggleChatPanel);

  const panel = document.createElement("section");
  panel.id = "pmChatPanel";
  panel.className = "pm-chat-panel";
  panel.hidden = true;
  panel.innerHTML = `
    <header class="pm-chat-head">
      <div class="pm-chat-head-main">
        <span class="pm-chat-dot"></span>
        <strong id="pmChatTitle">${escapeHtml(text("chatTitle"))}</strong>
      </div>
      <button type="button" class="pm-chat-x" id="pmChatClose" aria-label="${escapeHtml(text("chatClose"))}">${PM_ICON_CLOSE}</button>
    </header>
    <div class="pm-chat-channel">
      <select id="pmChatChannel" aria-label="${escapeHtml(text("chatPickChannel"))}">${buildChannelOptions()}</select>
    </div>
    <div class="pm-chat-scroll" id="pmChatScroll"><p class="pm-chat-hint">${escapeHtml(text("chatPickHint"))}</p></div>
    <form class="pm-chat-form" id="pmChatForm">
      <textarea id="pmChatInput" rows="1" maxlength="4000" placeholder="${escapeHtml(text("chatPlaceholder"))}" disabled></textarea>
      <button type="submit" class="pm-chat-send" aria-label="${escapeHtml(text("chatSend"))}" disabled>${PM_ICON_SEND}</button>
    </form>`;

  document.body.appendChild(panel);
  document.body.appendChild(fab);
  pmChat.mounted = true;

  panel.querySelector("#pmChatClose").addEventListener("click", () => toggleChatPanel(false));
  panel.querySelector("#pmChatChannel").addEventListener("change", (e) => selectChannel(e.target.value));
  panel.querySelector("#pmChatForm").addEventListener("submit", onChatSubmit);
  const input = panel.querySelector("#pmChatInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onChatSubmit(e); }
  });
  input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 110) + "px"; });

  ensureRealtime();
}

function removeChatWidget() {
  teardownRealtime();
  document.getElementById("pmChatFab")?.remove();
  document.getElementById("pmChatPanel")?.remove();
  pmChat.mounted = false;
  pmChat.open = false;
  pmChat.channelKey = null;
}

function refreshChannelOptions() {
  const sel = document.getElementById("pmChatChannel");
  if (sel) sel.innerHTML = buildChannelOptions();
}

function toggleChatPanel(force) {
  const panel = document.getElementById("pmChatPanel");
  const fab = document.getElementById("pmChatFab");
  if (!panel) return;
  pmChat.open = typeof force === "boolean" ? force : !pmChat.open;
  panel.hidden = !pmChat.open;
  fab?.classList.toggle("open", pmChat.open);
  if (pmChat.open) {
    pmChat.unread = 0;
    updateBadge();
    if (pmChat.channelKey) refreshMessages();
  }
}

function updateBadge() {
  const b = document.getElementById("pmChatBadge");
  if (!b) return;
  b.textContent = String(pmChat.unread);
  b.hidden = pmChat.unread <= 0;
}

// ── Kanal seçimi + mesajlar ────────────────────────────────────────────────
function setComposerEnabled(on) {
  const input = document.getElementById("pmChatInput");
  const btn = document.querySelector("#pmChatForm .pm-chat-send");
  if (input) input.disabled = !on;
  if (btn) btn.disabled = !on;
}

function selectChannel(key) {
  pmChat.channelKey = key || null;
  const title = document.getElementById("pmChatTitle");
  if (title) title.textContent = key ? pmChatChannelLabel(key) : text("chatTitle");
  setComposerEnabled(Boolean(key));
  pmChat.ids = new Set();
  const scroll = document.getElementById("pmChatScroll");
  if (!key) { if (scroll) scroll.innerHTML = `<p class="pm-chat-hint">${escapeHtml(text("chatPickHint"))}</p>`; return; }
  if (scroll) scroll.innerHTML = `<p class="pm-chat-hint">${escapeHtml(text("chatLoading"))}</p>`;
  refreshMessages();
}

function msgQueryFor(key) {
  const ws = encodeURIComponent(supabaseWorkspaceId);
  const cols = "select=id,sender_id,sender_name,body,created_at,recipient_id,project_id&order=created_at.asc&limit=200";
  if (key.startsWith("project:")) {
    return `/rest/v1/project_messages?workspace_id=eq.${ws}&project_id=eq.${encodeURIComponent(key.slice(8))}&recipient_id=is.null&${cols}`;
  }
  const me = currentUser.id, other = key.slice(3);
  // PostgREST OR — uuid dəyərləri təhlükəsizdir, parantez/vergül kodlanmır.
  return `/rest/v1/project_messages?workspace_id=eq.${ws}&or=(and(sender_id.eq.${me},recipient_id.eq.${other}),and(sender_id.eq.${other},recipient_id.eq.${me}))&${cols}`;
}

function msgInCurrentChannel(m) {
  const key = pmChat.channelKey;
  if (!key) return false;
  if (key.startsWith("project:")) return !m.recipient_id && m.project_id === key.slice(8);
  const me = currentUser.id, other = key.slice(3);
  return Boolean(m.recipient_id) && ((m.sender_id === me && m.recipient_id === other) || (m.sender_id === other && m.recipient_id === me));
}

function chatMessageMarkup(m) {
  const mine = m.sender_id && m.sender_id === currentUser.id;
  const time = new Date(m.created_at).toLocaleString("az-Latn-AZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  return `<div class="pm-msg${mine ? " pm-msg-mine" : ""}">
    ${mine ? "" : `<span class="pm-msg-who">${escapeHtml(m.sender_name || "—")}</span>`}
    <div class="pm-msg-bubble">${escapeHtml(m.body).replace(/\n/g, "<br>")}</div>
    <span class="pm-msg-time">${time}</span>
  </div>`;
}

function paintMessages(rows) {
  const scroll = document.getElementById("pmChatScroll");
  if (!scroll) return;
  pmChat.ids = new Set(rows.map((m) => m.id));
  scroll.innerHTML = rows.length ? rows.map(chatMessageMarkup).join("") : `<p class="pm-chat-hint">${escapeHtml(text("chatEmpty"))}</p>`;
  scroll.scrollTop = scroll.scrollHeight;
}

function appendMessage(m) {
  if (!m || pmChat.ids.has(m.id)) return;
  const scroll = document.getElementById("pmChatScroll");
  if (!scroll) return;
  scroll.querySelector(".pm-chat-hint")?.remove();
  pmChat.ids.add(m.id);
  scroll.insertAdjacentHTML("beforeend", chatMessageMarkup(m));
  scroll.scrollTop = scroll.scrollHeight;
}

async function refreshMessages() {
  const key = pmChat.channelKey;
  if (!key || !pmChatCanUse()) return;
  try {
    const rows = await supabaseRequest(msgQueryFor(key));
    if (Array.isArray(rows)) paintMessages(rows);
  } catch (err) {
    console.warn("chat load", err);
    const scroll = document.getElementById("pmChatScroll");
    if (scroll) scroll.innerHTML = `<p class="pm-chat-hint">${escapeHtml(text("chatError"))}</p>`;
  }
}

async function onChatSubmit(event) {
  event.preventDefault();
  const key = pmChat.channelKey;
  const input = document.getElementById("pmChatInput");
  if (!key || !input || !pmChatCanUse()) return;
  const body = input.value.trim();
  if (!body) return;
  input.value = "";
  input.style.height = "auto";
  const row = {
    workspace_id: supabaseWorkspaceId,
    sender_id: currentUser.id,
    sender_name: currentUser?.profile?.fullName || currentUser?.username || "—",
    body,
    project_id: key.startsWith("project:") ? key.slice(8) : null,
    recipient_id: key.startsWith("dm:") ? key.slice(3) : null
  };
  try {
    const res = await supabaseRequest("/rest/v1/project_messages", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(row)
    });
    if (Array.isArray(res) && res[0]) appendMessage(res[0]);
  } catch (err) {
    console.warn("chat send", err);
    input.value = body;
    if (typeof showToast === "function") showToast(text("chatSendError"));
  }
}

// ── Realtime (workspace-wide, klient tərəfdə kanal/oxunmamış filtri) ────────
function ensureRealtime() {
  if (pmChat.rtChannel) return;
  const cfg = supabaseConfig();
  if (!cfg || !window.supabase?.createClient) return;
  try {
    if (!pmChat.rtClient) {
      pmChat.rtClient = window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
      pmChat.rtClient.realtime.setAuth(supabaseSession.access_token);
    }
    pmChat.rtChannel = pmChat.rtClient
      .channel(`pm-chat-ws-${supabaseWorkspaceId}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "project_messages",
        filter: `workspace_id=eq.${supabaseWorkspaceId}`
      }, (payload) => onRealtimeInsert(payload.new))
      .subscribe();
  } catch (err) {
    console.warn("chat realtime", err);
  }
}

function teardownRealtime() {
  try {
    if (pmChat.rtChannel && pmChat.rtClient) pmChat.rtClient.removeChannel(pmChat.rtChannel);
  } catch { /* noop */ }
  pmChat.rtChannel = null;
}

function onRealtimeInsert(m) {
  if (!m || m.sender_id === currentUser.id) return; // öz mesajım artıq göstərilib
  if (pmChat.open && msgInCurrentChannel(m)) { appendMessage(m); return; }
  // Mənə aid (qrup və ya mənə DM) amma açıq kanalda deyil → oxunmamış
  const relevant = !m.recipient_id || m.recipient_id === currentUser.id;
  if (relevant) { pmChat.unread += 1; updateBadge(); }
}
