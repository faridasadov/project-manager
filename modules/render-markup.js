// render-markup.js — render funksiyalarının SAF markup (data → HTML-string) hissələri.
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Bu funksiyalar yalnız verilən data-dan HTML string qaytarır — DOM oxumur/yazmır,
// appState-ə toxunmur (data-nı render wrapper ötürür). DOM-a yazan nazik render
// wrapper-ləri (customerList.innerHTML = ...) script.js-də qalır.
// Runtime globalları (saf helper-lər): escapeHtml (utils.js), text,
//   fileSizeLabel (utils.js), formatDateTime (format.js).
// Render fazasının pilot modulu — gələcək markup çıxarışları buraya əlavə olunur.

function customerListMarkup(scopedCustomers) {
  return scopedCustomers.length ? scopedCustomers.map((customer) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(customer.name)}</strong>${escapeHtml([customer.contact, customer.email].filter(Boolean).join(" · "))}</span>
      <div class="mini-actions">
        <button type="button" data-customer-action="delete" data-id="${escapeHtml(customer.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function managedFileListMarkup(scopedFiles) {
  return scopedFiles.length ? scopedFiles.map((file) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(file.name)}</strong>${fileSizeLabel(Number(file.size) || 0)} · ${escapeHtml(formatDateTime(file.createdAt))}</span>
      <div class="mini-actions">
        <a class="attachment-chip" href="${escapeHtml(file.dataUrl)}" download="${escapeHtml(file.name)}">${text("download")}</a>
        <button type="button" data-file-action="delete" data-id="${escapeHtml(file.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

// Dashboard: deadline xəbərdarlıqları. Deps: escapeHtml, getProject, shortDate, text.
function deadlineAlertsMarkup(alerts) {
  return alerts.length ? alerts.map(({ task, alert }) => `
    <button class="compact-item ${alert.type}" type="button" data-open-task="${escapeHtml(task.id)}" title="${escapeHtml(task.name)}">
      <strong>${escapeHtml(task.name)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(getProject(task))}</span>
        <span>${shortDate(task.end)}</span>
        <span class="badge ${alert.type === "danger" ? "high" : ""}">${escapeHtml(alert.label)}</span>
      </div>
    </button>
  `).join("") : `<div class="empty">${text("noDeadlineAlerts")}</div>`;
}

// Dashboard: portfolio sağlamlıq paneli. Deps: text (metrics saf ədədlərdir → escape lazım deyil).
function portfolioHealthMarkup(metrics) {
  return `
    <div class="health-score">
      <strong>${metrics.score}</strong>
      <span>${text("healthScore")}</span>
    </div>
    <div class="health-meter"><span style="width:${metrics.score}%"></span></div>
    <div class="health-grid">
      <span><strong>${metrics.completion}%</strong>${text("completionRate")}</span>
      <span><strong>${metrics.overdue}</strong>${text("overdueTasks")}</span>
      <span><strong>${metrics.blocked}</strong>${text("blockedTasks")}</span>
      <span><strong>${metrics.risks}</strong>${text("riskLoad")}</span>
      <span><strong>${metrics.issues}</strong>${text("openIssueLoad")}</span>
      <span><strong>${metrics.governanceScore}%</strong>${text("ipmaScore")}</span>
    </div>
  `;
}

// Dashboard: növbəti işlər siyahısı. Deps: escapeHtml, text.
function nextActionsMarkup(actions) {
  return actions.length ? actions.map((action) => `
    <button class="compact-item action-item ${escapeHtml(action.type)}" type="button"
      ${action.taskId ? `data-open-task="${escapeHtml(action.taskId)}"` : `data-action-filter="${escapeHtml(action.target)}"`}>
      <strong>${escapeHtml(action.label)}</strong>
      <span>${escapeHtml(action.title)}</span>
      <small>${escapeHtml(action.meta || "")}</small>
    </button>
  `).join("") : `<div class="empty">${text("noActionNeeded")}</div>`;
}

// Manager paneli: tarix dəyişikliyi sorğuları. Deps: escapeHtml, text, formatDateTime.
function dateRequestsMarkup(requests) {
  return requests.length ? requests.map(({ task, request }) => `
    <div class="resource-item date-request-item">
      <span>
        <strong>${escapeHtml(task.name)}</strong>
        ${escapeHtml(task.project || "")}
        <small>${escapeHtml(request.oldStart)} - ${escapeHtml(request.oldEnd)} -> ${escapeHtml(request.newStart)} - ${escapeHtml(request.newEnd)}</small>
        <small>${escapeHtml(request.requestedBy || "")} · ${escapeHtml(formatDateTime(request.requestedAt))}</small>
      </span>
      <div class="mini-actions">
        <button type="button" data-date-request-action="approve" data-task-id="${escapeHtml(task.id)}" data-request-id="${escapeHtml(request.id)}">${text("approveDateChange")}</button>
        <button type="button" data-date-request-action="reject" data-task-id="${escapeHtml(task.id)}" data-request-id="${escapeHtml(request.id)}">${text("rejectDateChange")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("noDateRequests")}</div>`;
}

// Admin: audit log siyahısı. Deps: escapeHtml, text, formatDateTime.
function auditLogMarkup(combinedAudit) {
  return combinedAudit.length ? combinedAudit.map((item) => `
      <div class="resource-item activity-item">
        <span>
          <strong>${escapeHtml(item.action || "-")}</strong>
          ${escapeHtml([item.actor, item.entity_type, item.entity_id].filter(Boolean).join(" · "))}
          ${item.detail ? `<small>${escapeHtml(item.detail)}</small>` : ""}
        </span>
        <small>${escapeHtml(formatDateTime(item.created_at || item.createdAt))}</small>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
}

// Admin: mail tarixçəsi siyahısı. Deps: escapeHtml, text, formatDateTime.
function mailHistoryMarkup(mailHistory) {
  return mailHistory.length ? mailHistory.map((item) => `
      <div class="resource-item activity-item">
        <span>
          <strong>${escapeHtml(item.subject || "-")}</strong>
          ${escapeHtml([item.type, item.recipient, item.status].filter(Boolean).join(" · "))}
        </span>
        <small>${escapeHtml(formatDateTime(item.created_at))}</small>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
}

// Bildiriş mərkəzi. Deps: escapeHtml, text, formatDateTime.
function notificationCenterMarkup(rows) {
  return rows.length ? `
    <div class="notification-actions">
      <button type="button" data-notification-action="mark-read">${text("markAllRead")}</button>
      <button type="button" data-notification-action="enable">${text("enableBrowserNotifications")}</button>
    </div>
    ${rows.map((item) => `
      <div class="notification-item ${item.read ? "read" : ""}">
        <span>
          <strong>${escapeHtml(item.message || item.subject || "-")}</strong>
          <small>${escapeHtml([item.type, item.status].filter(Boolean).join(" · "))}</small>
        </span>
        <small>${escapeHtml(formatDateTime(item.createdAt || item.created_at) || "-")}</small>
      </div>
    `).join("")}
  ` : `<div class="empty">${text("empty")}</div>`;
}

// Arxivlənmiş layihələr. Deps: escapeHtml, text, statusClass, statusLabel, shortDate.
function archivedProjectsMarkup(archived) {
  return archived.length ? archived.map((project) => `
    <article class="project-card archived-project-card">
      <div class="project-card-header">
        <div class="project-card-titlerow">
          <h3>${escapeHtml(project.name)}</h3>
          <div class="project-card-badges">
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
            <span>${shortDate(project.start)} – ${shortDate(project.end)}</span>
          </div>
        </div>
        <div class="project-card-pct"><strong>${Number(project.progress) || 0}%</strong></div>
      </div>
      <div class="project-card-actions">
        <button class="proj-btn proj-secondary" type="button" data-project-action="restore-archive" data-project="${escapeHtml(project.name)}">${text("restoreProject")}</button>
        <button class="proj-btn proj-danger" type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
      </div>
    </article>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}
