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

// Task detal: fayl əlavələri. Deps: escapeHtml, fileSizeLabel.
function renderAttachments(task) {
  const attachments = task.attachments || [];
  if (!attachments.length) return "";
  return `
    <div class="attachment-list">
      ${attachments.map((attachment) => `
        <a class="attachment-chip" href="${escapeHtml(attachment.dataUrl)}" download="${escapeHtml(attachment.name)}" title="${escapeHtml(attachment.name)} (${fileSizeLabel(Number(attachment.size) || 0)})">
          <span>${escapeHtml(attachment.name)}</span>
        </a>
      `).join("")}
    </div>
  `;
}

// Şərh əlavələri (kompakt). Deps: escapeHtml, fileSizeLabel.
function renderCommentAttachments(comment) {
  const attachments = comment.attachments || [];
  if (!attachments.length) return "";
  return `
    <div class="attachment-list compact-attachments">
      ${attachments.map((attachment) => `
        <a class="attachment-chip" href="${escapeHtml(attachment.dataUrl)}" download="${escapeHtml(attachment.name)}" title="${escapeHtml(attachment.name)} (${fileSizeLabel(Number(attachment.size) || 0)})">
          <span>${escapeHtml(attachment.name)}</span>
        </a>
      `).join("")}
    </div>
  `;
}

// Task əlaqələri (parent / asılılıq / bloklayan). Deps: taskNameById (dependencies.js),
//   incompleteDependencies (dependencies.js), text, escapeHtml.
function renderTaskRelations(task) {
  const parent = task.parentTaskId ? taskNameById(task.parentTaskId) : "";
  const dependencies = (task.dependencyIds || []).map(taskNameById).filter(Boolean);
  const blockers = incompleteDependencies(task).map((item) => item.name).filter(Boolean);
  if (!parent && !dependencies.length) return "";
  return `
    <div class="task-relations">
      ${parent ? `<span>${text("parentTask")}: ${escapeHtml(parent)}</span>` : ""}
      ${dependencies.length ? `<span>${text("dependsOn")}: ${escapeHtml(dependencies.join(", "))}</span>` : ""}
      ${blockers.length ? `<span class="blocked-relation">${text("blockedBy")}: ${escapeHtml(blockers.join(", "))}</span>` : ""}
    </div>
  `;
}

// Vaxt girişləri + əlavə formu. Deps: escapeHtml, text, shortDate (format.js),
//   userDisplayLabel (lookups.js), isoDate (utils.js).
function renderTimeEntries(task) {
  const entries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  const items = entries.length ? entries.map((entry) => `
    <div class="comment-item time-entry-item">
      <div class="comment-head">
        <strong>${escapeHtml(entry.hours)} ${text("hours")}</strong>
        <time datetime="${escapeHtml(entry.date || "")}">${escapeHtml(shortDate(entry.date))}</time>
      </div>
      <span>${text("loggedBy")}: ${escapeHtml(userDisplayLabel(entry.user) || "-")}</span>
      ${entry.note ? `<span>${escapeHtml(entry.note)}</span>` : ""}
    </div>
  `).join("") : `<div class="comment-empty">${text("empty")}</div>`;

  const formHtml = task.status === "Bitib" ? "" : `
      <form class="time-entry-form" data-task-id="${task.id}">
        <div class="time-entry-grid">
          <input name="hours" type="number" min="0.25" step="0.25" placeholder="${text("hours")}" required>
          <input name="date" type="date" value="${isoDate(new Date())}" required>
        </div>
        <input name="note" type="text" placeholder="${text("timeEntryNote")}">
        <button type="submit">${text("addTimeEntry")}</button>
      </form>
  `;

  return `
    <div class="comments time-entries">
      <h4>${text("timeEntries")}</h4>
      ${items}
      ${formHtml}
    </div>
  `;
}

// Şərh sil düyməsi (icazə əsaslı). Deps: canDeleteTaskComment (script.js), escapeHtml, text.
function renderCommentDeleteButton(task, comment) {
  if (!canDeleteTaskComment(task)) return "";
  return `<button class="comment-delete" type="button" data-action="delete-comment" data-task-id="${escapeHtml(task.id)}" data-comment-id="${escapeHtml(comment.id)}" aria-label="${text("delete")}">${text("delete")}</button>`;
}

// Task kartında inline şərhlər (son 2). Deps: escapeHtml, text, formatDateTime,
//   renderCommentDeleteButton, renderCommentAttachments.
function renderTaskInlineComments(task) {
  const comments = task.comments || [];
  const recent = comments.slice(-2);
  const items = recent.length ? recent.map((comment) => `
    <div class="comment-item task-inline-comment">
      <div class="comment-head">
        <strong>${escapeHtml(comment.author)}</strong>
        <span class="comment-tools">
          <time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatDateTime(comment.createdAt))}</time>
          ${renderCommentDeleteButton(task, comment)}
        </span>
      </div>
      <span>${escapeHtml(comment.text)}</span>
      ${renderCommentAttachments(comment)}
    </div>
  `).join("") : "";
  const more = comments.length > recent.length
    ? `<button class="inline-link" type="button" data-action="view" data-id="${task.id}">${comments.length} ${text("comments")}</button>`
    : "";
  const formHtml = task.status === "Bitib" ? "" : `
    <form class="comment-form task-inline-comment-form" data-task-id="${task.id}">
      <button class="comment-compose-trigger" type="button" data-action="expand-comment" aria-label="${text("commentPlaceholder")}">
        <span>💬</span> ${text("commentPlaceholder")}…
      </button>
      <div class="comment-body">
        <textarea name="comment" rows="2" placeholder="${text("commentPlaceholder")}" required></textarea>
        <div class="inline-comment-actions">
          <button class="comment-send-btn" type="submit">${text("addComment")}</button>
          <button class="comment-cancel-btn" type="button" data-action="collapse-comment">${text("cancel")}</button>
          <label class="comment-attach-btn" title="${text("attachments")}">
            📎
            <input class="comment-attachment-input" name="attachments" type="file" multiple aria-label="${text("attachments")}">
          </label>
          <small class="file-picker-status"></small>
        </div>
      </div>
    </form>
  `;
  return `
    <div class="comments task-inline-comments">
      <div class="task-inline-comments-head">
        <h4>${text("comments")}</h4>
        ${more}
      </div>
      ${items}
      ${formHtml}
    </div>
  `;
}

// Task kartı əməliyyat düymələri. Deps: escapeHtml(dolayı), text, isTaskBlocked (dependencies.js),
//   canApproveTask (permissions.js).
function renderTaskActions(task) {
  let actions = "";
  if (task.status === "Bitib") {
    actions = `
        <button class="action-button" type="button" data-action="view" data-id="${task.id}">Bax</button>
        <button class="action-button next-action" type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button class="action-button danger-action" type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  } else {
    const blocked = isTaskBlocked(task);
    const completionAction = task.completionRequestedAt
      ? `${canApproveTask(task) ? `<button class="action-button next-action" type="button" data-action="approve-done" data-id="${task.id}">${text("approveDone")}</button>` : `<span class="pending-label">${text("pendingDone")}</span>`}`
      : `<button class="action-button next-action" type="button" data-action="request-done" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("doneRequest")}</button>`;
    actions = `
        <button class="action-button" type="button" data-action="view" data-id="${task.id}">Bax</button>
        <button class="action-button edit-action" type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button class="action-button next-action" type="button" data-action="next" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("next")}</button>
        ${completionAction}
        <button class="action-button danger-action" type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  }
  return `<div class="task-actions">${actions}</div>`;
}

// Task detal: tam şərh siyahısı + form. Deps: escapeHtml, text, formatDateTime,
//   renderCommentDeleteButton, renderCommentAttachments.
function renderComments(task) {
  const comments = task.comments || [];
  const items = comments.length ? comments.map((comment) => `
    <div class="comment-item">
      <div class="comment-head">
        <strong>${escapeHtml(comment.author)}</strong>
        <span class="comment-tools">
          <time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatDateTime(comment.createdAt))}</time>
          ${renderCommentDeleteButton(task, comment)}
        </span>
      </div>
      <span>${escapeHtml(comment.text)}</span>
      ${renderCommentAttachments(comment)}
    </div>
  `).join("") : `<div class="comment-empty">${text("noComments")}</div>`;

  const formHtml = task.status === "Bitib" ? "" : `
      <form class="comment-form" data-task-id="${task.id}">
        <textarea name="comment" rows="3" placeholder="${text("commentPlaceholder")}" required></textarea>
        <label class="file-picker">
          <span>${text("chooseFiles")}</span>
          <input class="comment-attachment-input" name="attachments" type="file" multiple aria-label="${text("attachments")}">
        </label>
        <small class="file-picker-status">${text("noFilesSelected")}</small>
        <button type="submit">${text("addComment")}</button>
      </form>
  `;

  return `
    <div class="comments">
      <h4>${text("comments")}</h4>
      ${items}
      ${formHtml}
    </div>
  `;
}
