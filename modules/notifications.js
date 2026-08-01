// Project Manager — notification & audit-log helpers
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Mutate the shared localAuditLogs / notifications arrays IN PLACE (unshift) —
// never reassign — so cross-file mutation of script.js globals stays correct.
// Call createId (ids.js), tenant helpers, Supabase sync + DOM refs (script.js)
// at runtime.

// ── Persistence ──────────────────────────────────────────────────────────────
function saveLocalAuditLogs() {
  localStorage.setItem(localAuditKey, JSON.stringify(localAuditLogs.slice(0, 200)));
  syncSupabaseAuditLogs().catch((error) => console.warn("Supabase audit sync failed", error));
}

function saveNotifications() {
  localStorage.setItem(notificationsKey, JSON.stringify(notifications.slice(0, 200)));
  renderNotificationBadge();
  syncSupabaseNotifications().catch((error) => console.warn("Supabase notification sync failed", error));
}

// ── Audit ────────────────────────────────────────────────────────────────────
function recordAudit(action, entityType, entityId, detail = "") {
  const entry = {
    id: createId(),
    action,
    actor: currentUser?.username || "system",
    companyId: currentCompanyId(),
    entity_type: entityType,
    entity_id: entityId,
    detail,
    created_at: new Date().toISOString()
  };
  localAuditLogs.unshift(entry);
  saveLocalAuditLogs();
  return entry;
}

// ── Notifications ────────────────────────────────────────────────────────────
function addNotification(message, targetUserId = "", meta = {}) {
  notifications.unshift({
    id: createId(),
    message,
    targetUserId,
    companyId: currentCompanyId(),
    read: false,
    createdAt: new Date().toISOString(),
    ...meta
  });
  saveNotifications();
}

// Kommentdə @qeyd olunan istifadəçilərə bildiriş göndər (#9).
// @token username, ada (tam və ya ilk söz) görə uyğunlaşdırılır. Özünü qeyd etmə sayılmır.
function notifyMentions(rawText, task) {
  const tokens = (String(rawText || "").match(/@([\p{L}0-9_.\-]+)/gu) || []).map((t) => t.slice(1).toLowerCase());
  if (!tokens.length) return [];
  const notified = new Set();
  (appState.users || []).forEach((user) => {
    if (!user.id || user.id === currentUser?.id) return;
    const uname = String(user.username || "").toLowerCase();
    const fname = String(user.profile?.fullName || "").toLowerCase();
    const firstName = fname.split(/\s+/)[0] || "";
    const compact = fname.replace(/\s+/g, "");
    const hit = tokens.some((tok) => tok && (tok === uname || tok === firstName || tok === compact));
    if (hit && !notified.has(user.id)) {
      notified.add(user.id);
      addNotification(
        `${currentUser?.username || "Kimsə"} sizi "${task?.name || "tapşırıq"}" tapşırığında qeyd etdi`,
        user.id,
        { type: "mention", taskId: task?.id }
      );
    }
  });
  return [...notified];
}

// #8 İzləyicilərə bildiriş göndər (komment/status dəyişimində). exclude — artıq
// xəbərdar edilmişlər (məs. qeyd olunanlar) və hərəkəti edən özü.
function notifyWatchers(task, message, exclude = []) {
  const watchers = Array.isArray(task?.watchers) ? task.watchers : [];
  const skip = new Set([...(exclude || []), currentUser?.id].filter(Boolean));
  watchers.forEach((uid) => {
    if (skip.has(uid)) return;
    addNotification(message, uid, { type: "watch", taskId: task?.id });
  });
}

// İdarəçilərə (admin + manager) xəbərdarlıq — istifadəçi komment yazanda və ya
// taskda dəyişiklik edəndə. Hərəkəti edən özü istisna (özünə bildiriş getmir).
// Broadcast deyil: hər idarəçiyə targetli bildiriş → yalnız onlar görür.
function notifyManagers(message, meta = {}) {
  const seen = new Set();
  (appState.users || []).forEach((user) => {
    if (!user.id || user.id === currentUser?.id) return;
    if (!["admin", "manager"].includes(user.role)) return;
    if (user.companyId && user.companyId !== currentCompanyId()) return;
    if (seen.has(user.id)) return;
    seen.add(user.id);
    addNotification(message, user.id, { type: "activity", ...meta });
  });
}

// Resurs sətrindən ("user:<id>" və ya "team:<id>") istifadəçi id-lərini çıxar.
function usersInResource(resource) {
  if (!resource) return [];
  const r = String(resource);
  if (r.startsWith("team:")) {
    const team = (appState.teams || []).find((t) => `team:${t.id}` === r);
    return (team?.memberIds || []).map((m) => String(m).replace(/^user:/, ""));
  }
  return [r.replace(/^user:/, "")];
}

// Task/layihəyə təyin olunan istifadəçi(lər)ə bildiriş (admin/manager təyin
// edəndə). Hərəkəti edən özü istisna. Komanda resursu halında hər üzvə gedir.
function notifyAssignment(userIds, message, meta = {}) {
  const seen = new Set();
  (userIds || []).forEach((uid) => {
    const id = String(uid || "");
    if (!id || id === currentUser?.id || seen.has(id)) return;
    seen.add(id);
    addNotification(message, id, { type: "assignment", ...meta });
  });
}

function visibleNotifications() {
  const companyId = currentCompanyId();
  return notifications.filter((item) => {
    const sameCompany = !item.companyId || item.companyId === companyId;
    const sameTarget = !item.targetUserId || item.targetUserId === currentUser?.id;
    return sameCompany && sameTarget;
  });
}

function renderNotificationBadge() {
  if (!notifyUnreadCount) return;
  const unreadCount = visibleNotifications().filter((item) => !item.read).length;
  notifyUnreadCount.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
  notifyUnreadCount.hidden = unreadCount === 0;
  notifyButton?.setAttribute("aria-label", unreadCount ? `${text("notify")}: ${unreadCount}` : text("notify"));
}
