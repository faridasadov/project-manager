// project-chat.js — proyekt daxili chat (manager ↔ komanda).
// Klassik <script>, script.js-dən əvvəl yüklənir → paylaşılan global scope.
// Runtime globalları: supabaseConfig, supabaseRequest, supabaseSession,
//   supabaseWorkspaceId, currentUser, appState, escapeHtml, text, projectManagers,
//   isSuperAdmin/isOrgAdmin (varsa), window.supabase (realtime üçün CDN client).
// Data: public.project_messages (workspace-səviyyə RLS); realtime publication-a əlavə olunub.

/* eslint-disable no-unused-vars */

const pmChat = {
  activeProjectId: null,
  channel: null,
  rtClient: null,
  ids: new Set(),
  pollTimer: null
};

// Cari istifadəçi bu layihənin chat-ını görə bilərmi?
function userCanChat(project) {
  if (!project || !currentUser) return false;
  const role = currentUser.role;
  if (role === "admin" || role === "super_admin") return true;
  const uid = currentUser.id;
  if ((project.managerIds || []).includes(uid)) return true;
  return (project.teamMemberIds || []).some((val) => {
    const id = String(val).includes(":") ? String(val).split(":")[1] : val;
    return id === uid;
  });
}

function pmChatCanUse() {
  return Boolean(supabaseConfig() && supabaseSession?.access_token && supabaseWorkspaceId);
}

function ensureChatContainer() {
  let box = document.getElementById("projectChat");
  if (box) return box;
  const bar = document.getElementById("projectDetailBar");
  if (!bar || !bar.parentNode) return null;
  box = document.createElement("section");
  box.id = "projectChat";
  box.className = "project-chat";
  box.hidden = true;
  bar.parentNode.insertBefore(box, bar.nextSibling);
  return box;
}

function chatMessageMarkup(m) {
  const mine = m.sender_id && currentUser && m.sender_id === currentUser.id;
  const who = escapeHtml(m.sender_name || "—");
  const time = new Date(m.created_at).toLocaleString("az-Latn-AZ", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  return `<div class="chat-msg${mine ? " chat-msg-mine" : ""}">
    <div class="chat-msg-head"><span class="chat-msg-who">${who}</span><span class="chat-msg-time">${time}</span></div>
    <div class="chat-msg-body">${escapeHtml(m.body).replace(/\n/g, "<br>")}</div>
  </div>`;
}

function renderChatShell() {
  const box = ensureChatContainer();
  if (!box) return null;
  box.innerHTML = `
    <div class="chat-head">
      <h3>${text("chatTitle")}</h3>
      <button type="button" class="chat-refresh" id="chatRefresh" title="${text("chatRefresh")}">⟳</button>
    </div>
    <div class="chat-scroll" id="chatScroll"><p class="chat-empty">${text("chatLoading")}</p></div>
    <form class="chat-form" id="chatForm">
      <textarea id="chatInput" rows="1" maxlength="4000" placeholder="${text("chatPlaceholder")}"></textarea>
      <button type="submit" class="primary">${text("chatSend")}</button>
    </form>`;
  box.hidden = false;
  box.querySelector("#chatForm").addEventListener("submit", onChatSubmit);
  box.querySelector("#chatRefresh").addEventListener("click", () => refreshChatMessages());
  const input = box.querySelector("#chatInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onChatSubmit(e); }
  });
  return box;
}

function paintMessages(messages) {
  const scroll = document.getElementById("chatScroll");
  if (!scroll) return;
  pmChat.ids = new Set(messages.map((m) => m.id));
  if (!messages.length) {
    scroll.innerHTML = `<p class="chat-empty">${text("chatEmpty")}</p>`;
    return;
  }
  scroll.innerHTML = messages.map(chatMessageMarkup).join("");
  scroll.scrollTop = scroll.scrollHeight;
}

function appendMessage(m) {
  if (!m || pmChat.ids.has(m.id)) return;
  const scroll = document.getElementById("chatScroll");
  if (!scroll) return;
  const empty = scroll.querySelector(".chat-empty");
  if (empty) scroll.innerHTML = "";
  pmChat.ids.add(m.id);
  scroll.insertAdjacentHTML("beforeend", chatMessageMarkup(m));
  scroll.scrollTop = scroll.scrollHeight;
}

async function refreshChatMessages() {
  const projectId = pmChat.activeProjectId;
  if (!projectId || !pmChatCanUse()) return;
  try {
    const rows = await supabaseRequest(
      `/rest/v1/project_messages?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&project_id=eq.${encodeURIComponent(projectId)}&select=id,sender_id,sender_name,body,created_at&order=created_at.asc&limit=200`
    );
    if (Array.isArray(rows)) paintMessages(rows);
  } catch (err) {
    console.warn("chat load", err);
    const scroll = document.getElementById("chatScroll");
    if (scroll) scroll.innerHTML = `<p class="chat-empty">${text("chatError")}</p>`;
  }
}

async function onChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const projectId = pmChat.activeProjectId;
  if (!input || !projectId || !pmChatCanUse()) return;
  const body = input.value.trim();
  if (!body) return;
  input.value = "";
  const senderName = currentUser?.profile?.fullName || currentUser?.username || "—";
  try {
    const rows = await supabaseRequest("/rest/v1/project_messages", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        workspace_id: supabaseWorkspaceId,
        project_id: projectId,
        sender_id: currentUser.id,
        sender_name: senderName,
        body
      })
    });
    // Realtime çatmasa belə dərhal göstər (dedupe id ilə).
    if (Array.isArray(rows) && rows[0]) appendMessage(rows[0]);
  } catch (err) {
    console.warn("chat send", err);
    input.value = body; // uğursuz olsa mətni qaytar
    if (typeof showToast === "function") showToast(text("chatSendError"));
  }
}

function getChatRtClient() {
  if (pmChat.rtClient) return pmChat.rtClient;
  const cfg = supabaseConfig();
  if (!cfg || !window.supabase?.createClient) return null;
  try {
    pmChat.rtClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
    pmChat.rtClient.realtime.setAuth(supabaseSession.access_token);
  } catch (err) {
    console.warn("chat realtime client", err);
    pmChat.rtClient = null;
  }
  return pmChat.rtClient;
}

function subscribeChat(projectId) {
  const client = getChatRtClient();
  if (!client) { startChatPoll(); return; }
  try {
    pmChat.channel = client
      .channel(`pm-chat-${projectId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "project_messages",
        filter: `project_id=eq.${projectId}`
      }, (payload) => appendMessage(payload.new))
      .subscribe((status) => {
        // Realtime qoşulmasa poll-a keç.
        if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") startChatPoll();
      });
  } catch (err) {
    console.warn("chat subscribe", err);
    startChatPoll();
  }
}

function startChatPoll() {
  if (pmChat.pollTimer) return;
  pmChat.pollTimer = setInterval(() => refreshChatMessages(), 12000);
}

function stopChatPoll() {
  if (pmChat.pollTimer) { clearInterval(pmChat.pollTimer); pmChat.pollTimer = null; }
}

function closeProjectChat() {
  stopChatPoll();
  if (pmChat.channel && pmChat.rtClient) {
    try { pmChat.rtClient.removeChannel(pmChat.channel); } catch { /* noop */ }
  }
  pmChat.channel = null;
  pmChat.activeProjectId = null;
  pmChat.ids = new Set();
  const box = document.getElementById("projectChat");
  if (box) { box.hidden = true; box.innerHTML = ""; }
}

// renderProjectDetailBar-dan çağırılır. Idempotent: eyni layihə açıqdırsa heç nə etmir.
function openProjectChat(project) {
  if (!project || !userCanChat(project) || !pmChatCanUse()) { closeProjectChat(); return; }
  if (pmChat.activeProjectId === project.id) return; // artıq açıqdır
  closeProjectChat();
  pmChat.activeProjectId = project.id;
  renderChatShell();
  refreshChatMessages();
  subscribeChat(project.id);
}
