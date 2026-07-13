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
