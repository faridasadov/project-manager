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

// Layihə governance xülasəsi (IPMA). Deps: text, projectGovernanceAudit (governance.js), escapeHtml.
function renderProjectGovernance(project) {
  const checklist = project.charter?.gateChecklist || [];
  const audit = projectGovernanceAudit(project);
  const modules = [
    [text("stakeholderRegister"), project.charter?.stakeholders],
    [text("communicationPlan"), project.charter?.communicationPlan],
    [text("decisionLog"), project.charter?.decisionLog],
    [text("changeControl"), project.charter?.changeControl],
    [text("riskOpportunity"), project.charter?.riskOpportunity],
    [text("qualityChecklist"), project.charter?.qualityChecklist],
    [text("competenceMatrix"), project.charter?.competenceMatrix]
  ];
  const hasModules = modules.some(([, rows]) => rows?.length);
  if (!project.charter?.goal && !project.charter?.scope && !project.charter?.successCriteria && !checklist.length && !project.charter?.closureNotes && !hasModules) {
    // Still show gate status even without charter data
    const approvals = project.charter?.gateApprovals || {};
    const gates = ["Initiation", "Planning", "Execution", "Closing"];
    const approvedCount = gates.filter(g => approvals[g]?.approvedAt).length;
    return `
      <details class="governance-summary">
        <summary class="governance-score-line">
          <span class="gov-pill">IPMA</span>
          <strong>Governance</strong>
          <span class="gov-score">${audit.score}%</span>
          <span class="gov-gates">${approvedCount}/4 gate</span>
          ${audit.missing.length ? `<span class="governance-warning-pill">${audit.missing.length} çatışmır</span>` : ""}
        </summary>
        <div class="governance-detail">
          <div class="gate-status-row">
            ${gates.map(gate => `<span class="gate-chip ${approvals[gate]?.approvedAt ? "gate-ok" : "gate-pending"}">${gate}</span>`).join("")}
          </div>
        </div>
      </details>
    `;
  }
  const approvals = project.charter?.gateApprovals || {};
  const gates = ["Initiation", "Planning", "Execution", "Closing"];
  const approvedCount = gates.filter(g => approvals[g]?.approvedAt).length;
  return `
    <details class="governance-summary">
      <summary class="governance-score-line">
        <span class="gov-pill">IPMA</span>
        <strong>Governance</strong>
        <span class="gov-score">${audit.score}%</span>
        <span class="gov-gates">${approvedCount}/4 gate</span>
        ${audit.missing.length ? `<span class="governance-warning-pill">${audit.missing.length} çatışmır</span>` : ""}
      </summary>
      <div class="governance-detail">
        <div class="gate-status-row">
          ${gates.map(gate => `<span class="gate-chip ${approvals[gate]?.approvedAt ? "gate-ok" : "gate-pending"}">${gate}${approvals[gate]?.approvedAt ? " ✓" : ""}</span>`).join("")}
        </div>
        ${audit.missing.length ? `<div class="governance-warning">⚠ ${escapeHtml(audit.missing.slice(0, 4).join(" · "))}${audit.missing.length > 4 ? " ..." : ""}</div>` : ""}
        ${project.charter?.goal ? `<div><strong>${text("projectCharter")}:</strong> ${escapeHtml(project.charter.goal)}</div>` : ""}
        ${project.charter?.scope ? `<div><strong>${text("projectScope")}:</strong> ${escapeHtml(project.charter.scope)}</div>` : ""}
        ${modules.map(([label, rows]) => rows?.length ? `<div><strong>${label}:</strong> ${escapeHtml(rows.slice(0, 3).join(", "))}${rows.length > 3 ? " …" : ""}</div>` : "").join("")}
      </div>
    </details>
  `;
}

// Kanban kartı əməliyyat düymələri. Deps: isTaskBlocked (dependencies.js), text.
function renderKanbanActions(task) {
  const blocked = isTaskBlocked(task);
  const actions = task.status === "Bitib"
    ? `
        <button type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `
    : `
        <button type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button type="button" data-action="next" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("next")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  return `<div class="kanban-actions">${actions}</div>`;
}

// Gantt: milestone marker-ləri. Deps: appState.registers, daysBetween/isoDate (utils.js), escapeHtml.
function milestoneMarkers(project, minStart, days) {
  const projectMilestones = appState.registers
    .filter((item) => item.type === "milestone" && item.project === project.name && item.dueDate);
  const markers = projectMilestones.length ? projectMilestones : [{ title: project.name, dueDate: project.end }];
  return markers
    .map((item) => {
      const offset = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), item.dueDate)));
      return `<div class="gantt-milestone" style="grid-column:${offset + 1};" title="${escapeHtml(item.title)}"></div>`;
    })
    .join("");
}

// Gantt: asılılıq oxları. Deps: daysBetween/isoDate (utils.js), escapeHtml.
function dependencyArrows(task, projectTasks, minStart, days) {
  const dependencies = (task.dependencyIds || [])
    .map((id) => projectTasks.find((item) => item.id === id))
    .filter((item) => item?.end || item?.start);
  return dependencies.map((dependency) => {
    const fromDate = dependency.end || dependency.start;
    const toDate = task.start || task.end || fromDate;
    const from = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), fromDate)));
    const to = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), toDate)));
    const start = Math.min(from, to);
    const span = Math.max(1, Math.abs(to - from) + 1);
    return `<div class="gantt-dependency-arrow" style="grid-column:${start + 1} / span ${span};" title="${escapeHtml(dependency.name)} → ${escapeHtml(task.name)}"></div>`;
  }).join("");
}

// Hesabat: bir layihənin tam blok markup-ı (governance + task sətirləri + register-lər).
// renderReports-un per-project map gövdəsi. Deps: projectGovernanceAudit (governance.js),
//   visibleRegisters (scope.js), parseDate (utils.js), escapeHtml, statusLabel/priorityLabel/
//   registerTypeLabel/registerStatusLabel/impactLabel (labels.js), isTaskBlocked (dependencies.js),
//   text, shortDate/formatDateTime (format.js), resourceLabel (lookups.js),
//   plannedHoursForTask/actualHoursForTask (metrics.js).
function reportProjectMarkup(project, reportTasks) {
  const audit = projectGovernanceAudit(project);
  const projectTasks = reportTasks.filter((task) => task.project === project.name)
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));
  const rows = projectTasks.length ? projectTasks.map((task) => `
      <div class="report-row">
        <strong>${escapeHtml(task.name)}</strong>
        <span>${statusLabel(task.status)}</span>
        <span>${priorityLabel(task.priority)}</span>
        <span>${isTaskBlocked(task) ? text("blocked") : "-"}</span>
        <span>${text("start")}: ${escapeHtml(shortDate(task.start))}</span>
        <span>${text("end")}: ${escapeHtml(shortDate(task.end))}</span>
        <span>${text("executedBy")}: ${escapeHtml(resourceLabel(task.owner))}</span>
        <span>${text("plannedHours")}: ${plannedHoursForTask(task)}</span>
        <span>${text("actualHours")}: ${actualHoursForTask(task)}</span>
        <span>${text("requestedAt")}: ${escapeHtml(formatDateTime(task.completionRequestedAt) || "-")}</span>
        <span>${text("approvedAt")}: ${escapeHtml(formatDateTime(task.approvedAt) || "-")}</span>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
  const registerRows = visibleRegisters(project.name).length ? visibleRegisters(project.name).map((item) => `
      <div class="report-row">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${registerTypeLabel(item.type)}</span>
        <span>${registerStatusLabel(item.status)}</span>
        <span>${impactLabel(item.impact)}</span>
        <span>${shortDate(item.dueDate)}</span>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
  const governanceRows = `
      <div class="report-row">
        <strong>${text("ipmaScore")}: ${audit.score}%</strong>
        <span>${text("lifecycleStage")}: ${escapeHtml(project.lifecycle || "Initiation")}</span>
        <span>${text("governanceCoverage")}: ${audit.done}/${audit.total}</span>
        <span>${text("openGovernanceRisk")}: ${audit.openGovernanceRisks.length}</span>
        <span>${text("gateApprovals")}: ${audit.approvedGates.length}/4</span>
        <span>${text("governanceMissing")}: ${escapeHtml(audit.missing.join(" · ") || "-")}</span>
      </div>
    `;
  return `
      <article class="report-project">
        <h3>${escapeHtml(project.name)}</h3>
        <h3>${text("ipmaReport")}</h3>
        <div class="report-rows">${governanceRows}</div>
        <div class="report-rows">${rows}</div>
        <h3>${text("projectRegisters")}</h3>
        <div class="report-rows">${registerRows}</div>
      </article>
    `;
}

// Platform konsolu: əməliyyat xülasəsi kartları. Deps: escapeHtml, formatDateTime (format.js).
//   ops = platformOpsSummary(registry), auditCount = auditLogs.length + localAuditLogs.length.
function platformOpsMarkup(ops, auditCount) {
  return `
      <article>
        <span>Tenant health</span>
        <strong>${ops.averageHealth}%</strong>
        <small>${ops.riskCompanies} şirkət nəzarət tələb edir</small>
      </article>
      <article>
        <span>Risk siqnalları</span>
        <strong>${ops.overdueTotal + ops.blockedTotal}</strong>
        <small>${ops.overdueTotal} gecikən · ${ops.blockedTotal} blok</small>
      </article>
      <article>
        <span>Backup readiness</span>
        <strong>${ops.backupCount}</strong>
        <small>Son backup: ${escapeHtml(formatDateTime(ops.lastBackup) || "-")}</small>
      </article>
      <article>
        <span>Mail gateway</span>
        <strong>${ops.mailReady ? "Hazır" : "Yoxlanılmalıdır"}</strong>
        <small>${ops.mailReady ? "SMTP/API aktivdir" : "Provider və aktivlik yoxlanmalıdır"}</small>
      </article>
      <article>
        <span>Audit izi</span>
        <strong>${auditCount}</strong>
        <small>Son hadisə: ${escapeHtml(formatDateTime(ops.lastAudit) || "-")}</small>
      </article>
    `;
}

// Platform konsolu: bir şirkətin lifecycle kartı. Deps: escapeHtml, text.
function platformLifecycleCardMarkup(company) {
  return `
      <article class="platform-lifecycle-card" data-company-id="${escapeHtml(company.id)}">
        <div>
          <strong>${escapeHtml(company.name)}</strong>
          <small>${escapeHtml(company.status || "active")} · ${escapeHtml(company.plan || "standard")}</small>
        </div>
        <select data-lifecycle-field="plan">
          ${["standard", "pro", "enterprise"].map((plan) => `<option value="${plan}" ${company.plan === plan ? "selected" : ""}>${plan}</option>`).join("")}
        </select>
        <label><span>Trial bitir</span><input type="date" data-lifecycle-field="trialEndsAt" value="${escapeHtml(company.trialEndsAt || "")}"></label>
        <label><span>Abonement bitir</span><input type="date" data-lifecycle-field="subscriptionEndsAt" value="${escapeHtml(company.subscriptionEndsAt || "")}"></label>
        <input data-lifecycle-field="statusReason" type="text" placeholder="Status səbəbi">
        <div class="platform-card-actions">
          <button type="button" data-lifecycle-action="save">Yadda saxla</button>
          <button type="button" data-lifecycle-action="${company.status === "suspended" ? "activate" : "suspend"}">${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}</button>
        </div>
      </article>
    `;
}

// ── Manager paneli siyahı markup-ları (renderManagerPanel-dən). Deps: escapeHtml,
//    shortDate (format.js), roleLabel/resourceLabel (lookups.js),
//    registerTypeLabel/registerStatusLabel (labels.js), text. ─────────────────────
function mgrProjectListMarkup(myProjects) {
  return myProjects.length
    ? myProjects.map((p) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(p.name)}</strong>
              ${escapeHtml(p.status || "")} · ${p.progress || 0}% · ${shortDate(p.start)} → ${shortDate(p.end)}
            </span>
            <button type="button" data-mgr-open-project="${escapeHtml(p.name)}">Aç</button>
          </div>`).join("")
    : `<div class="empty">Sizə aid layihə yoxdur</div>`;
}

function mgrTeamListMarkup(myTeam) {
  return myTeam.length
    ? myTeam.map((u) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(u.profile?.fullName || u.username)}</strong>
              ${escapeHtml(roleLabel(u.role))} · ${escapeHtml(u.username)}
              ${u.profile?.position ? ` · ${escapeHtml(u.profile.position)}` : ""}
            </span>
          </div>`).join("")
    : `<div class="empty">Komanda üzvü yoxdur</div>`;
}

function mgrDateRequestListMarkup(myDateRequests) {
  return myDateRequests.length
    ? myDateRequests.map((r) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(r.taskName || r.taskId)}</strong>
              ${escapeHtml(r.requester || "")} · ${shortDate(r.newEnd)}
              ${r.reason ? `<small>${escapeHtml(r.reason)}</small>` : ""}
            </span>
            <div class="mini-actions">
              <button type="button" data-mgr-date-approve="${r.id}">Təsdiqlə</button>
              <button type="button" data-mgr-date-reject="${r.id}" class="danger">Rədd et</button>
            </div>
          </div>`).join("")
    : `<div class="empty">Gözləyən sorğu yoxdur</div>`;
}

function mgrRegisterListMarkup(myRegisters) {
  return myRegisters.length
    ? myRegisters.map((r) => `
          <div class="resource-item register-item ${escapeHtml(r.type)}">
            <span>
              <strong>${escapeHtml(r.title)}</strong>
              ${escapeHtml(r.project)} · ${registerTypeLabel(r.type)} · ${escapeHtml(registerStatusLabel(r.status))}
              ${r.mitigation ? `<small>${escapeHtml(r.mitigation)}</small>` : ""}
            </span>
            <button type="button" data-mgr-register-delete="${r.id}">${text("remove")}</button>
          </div>`).join("")
    : `<div class="empty">Aktiv register yoxdur</div>`;
}

function mgrTeamGroupListMarkup(myTeamGroups) {
  return myTeamGroups.length
    ? myTeamGroups.map((t) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(t.name)}</strong>
              ${(t.memberIds || []).length} üzv
            </span>
            <button type="button" data-mgr-team-delete="${t.id}">${text("remove")}</button>
          </div>`).join("")
    : `<div class="empty">Komanda yoxdur</div>`;
}

function mgrCustomerListMarkup(myCustomers) {
  return myCustomers.length
    ? myCustomers.map((c) => `
          <div class="resource-item">
            <span><strong>${escapeHtml(c.name)}</strong>${c.contact ? ` · ${escapeHtml(c.contact)}` : ""}</span>
          </div>`).join("")
    : `<div class="empty">Sifarişçi yoxdur</div>`;
}

function mgrLinkListMarkup(myLinks) {
  return myLinks.length
    ? myLinks.map((l) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(l.project)}</strong> → ${escapeHtml(resourceLabel(l.resource))}
            </span>
            <button type="button" data-mgr-link-delete="${l.id}">${text("remove")}</button>
          </div>`).join("")
    : `<div class="empty">Bağlantı yoxdur</div>`;
}

function mgrTrashListMarkup(myTrash) {
  return myTrash.length
    ? myTrash.map((t) => {
        const title = t.type === "task" ? t.data.name : (t.data.project || t.data.name);
        return `
            <div class="resource-item">
              <span><strong>${escapeHtml(title)}</strong>${t.type === "task" ? " — tapşırıq" : " — layihə"}</span>
              <div class="mini-actions">
                <button type="button" data-mgr-trash-restore="${t.id}">${text("restore")}</button>
                <button type="button" data-mgr-trash-delete="${t.id}" class="danger">${text("deleteForever")}</button>
              </div>
            </div>`;
      }).join("")
    : `<div class="empty">Zibil qutusu boşdur</div>`;
}

// Layihəyə manager təyini üçün seçim siyahısı. Deps: appState.users, escapeHtml, text.
function managerChoiceItems(selectedIds = []) {
  const managers = appState.users.filter((user) => user.role === "manager");
  return managers.length ? managers.map((user) => `
    <label class="manager-choice">
      <input type="checkbox" name="projectManager" value="${user.id}" ${selectedIds.includes(user.id) ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>
        <small>${escapeHtml(user.username)}</small>
      </span>
    </label>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

// Rol matrisi: istifadəçi rol siyahısı (renderRoleMatrix-dən). Deps: escapeHtml, roleLabel.
//   Event listener-lər (dropdown/rol dəyiş) script.js wrapper-də qalır.
function roleUserListMarkup(scopedUsers, roleOptions, roleAccent, currentUserId) {
  return `
      <div class="role-user-list">
        ${scopedUsers.map((user) => `
          <div class="role-user-row" data-uid="${user.id}">
            <div class="role-user-info">
              <strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>
              <span class="muted">${escapeHtml(user.username)}</span>
            </div>
            ${user.id === currentUserId
              ? `<span class="role-chip role-chip-locked" style="--chip-color:${roleAccent[user.role] || "var(--teal)"}">
                   ${roleLabel(user.role)}
                   <small class="role-self-note">Özünüz</small>
                 </span>`
              : `<div class="role-chip-wrap" data-user-id="${user.id}">
                   <button type="button" class="role-chip role-chip-editable" style="--chip-color:${roleAccent[user.role] || "var(--teal)"}" data-user-id="${user.id}" title="Rolu dəyiş">
                     ${roleLabel(user.role)}
                     <svg class="role-chip-caret" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
                   </button>
                   <div class="role-chip-dropdown" hidden>
                     ${roleOptions.map((r) => `
                       <button type="button" class="role-opt ${user.role === r ? "role-opt-active" : ""}" data-set-role="${r}" style="--opt-color:${roleAccent[r] || "var(--text)"}">
                         ${roleLabel(r)}
                         ${user.role === r ? `<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
                       </button>
                     `).join("")}
                   </div>
                 </div>`
            }
          </div>
        `).join("")}
      </div>
    `;
}

// Rol matrisi: icazə cədvəli (arayış). Deps: roleLabel.
function permMatrixMarkup(displayRoles, roleColors, perms) {
  return `
    <details class="perm-matrix-details">
      <summary class="role-section-head perm-matrix-toggle">İcazə cədvəli</summary>
      <div class="perm-table-wrap">
        <table class="perm-table">
          <thead>
            <tr>
              <th class="perm-th-perm">İcazə</th>
              ${displayRoles.map((r) => `<th style="color:${roleColors[r]}">${roleLabel(r)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${perms.map((p) => `
              <tr>
                <td class="perm-td-label">${p.label}</td>
                ${displayRoles.map((r) => `<td class="perm-cell ${p.roles.includes(r) ? "perm-yes" : "perm-no"}">${p.roles.includes(r) ? "✓" : "—"}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </details>
  `;
}

// Layihələr görünüşü: bir layihə kartı (data-prep daxil). Deps: accessibleTasks,
//   projectManagers, registerCounts (scope.js), nextGateForProject (script.js),
//   renderProjectGovernance, escapeHtml, statusClass/statusLabel/priorityClass/
//   priorityLabel (labels.js+utils.js), shortDate (format.js), text.
function projectCardMarkup(project) {
  const projectTasks = accessibleTasks().filter((task) => task.project === project.name);
  const done = projectTasks.filter((task) => task.status === "Bitib").length;
  const active = projectTasks.length - done;
  const fallbackPercent = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0;
  const percent = Number.isFinite(Number(project.progress)) ? Number(project.progress) : fallbackPercent;
  const managerNames = projectManagers(project).map((user) => user.profile?.fullName || user.username);
  const counts = registerCounts(project.name);
  const nextGate = nextGateForProject(project);
  const lifecycle = project.lifecycle || "Initiation";
  const hasAlerts = counts.risks > 0 || counts.issues > 0;
  return `
      <article class="project-card">
        <div class="project-card-header">
          <div class="project-card-titlerow">
            <h3>${escapeHtml(project.name)}</h3>
            <div class="project-card-badges">
              <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
              <span class="badge ${priorityClass(project.priority)}">${priorityLabel(project.priority)}</span>
              <span class="lifecycle-tag lifecycle-${lifecycle.toLowerCase()}">${lifecycle}</span>
            </div>
          </div>
          <div class="project-card-pct">
            <strong>${percent}%</strong>
            <span>tamamlandı</span>
          </div>
        </div>
        <div class="project-card-meta">
          <span>👤 ${escapeHtml(managerNames.join(", ") || text("noOwner"))}</span>
          <span>📅 ${shortDate(project.start)} – ${shortDate(project.end)}</span>
          <span>📋 ${projectTasks.length} task · ${active} aktiv · ${done} bitmiş</span>
          ${hasAlerts ? `<span class="proj-meta-alert">⚠ Risk: ${counts.risks} &nbsp; Issue: ${counts.issues}</span>` : ""}
        </div>
        <div class="progress-mini project-progress"><span style="width:${percent}%"></span></div>
        ${renderProjectGovernance(project)}
        <div class="project-card-actions">
          <button class="proj-btn proj-primary" type="button" data-project-action="open" data-project="${escapeHtml(project.name)}">${text("openProject")}</button>
          <button class="proj-btn proj-add" type="button" data-project-action="add-task" data-project="${escapeHtml(project.name)}">${text("addTaskToProject")}</button>
          <button class="proj-btn proj-secondary" type="button" data-project-action="edit" data-project="${escapeHtml(project.name)}">${text("editProject")}</button>
          ${nextGate ? `<button class="proj-btn proj-gate" type="button" data-project-action="approve-gate" data-gate="${escapeHtml(nextGate)}" data-project="${escapeHtml(project.name)}">✓ Gate: ${escapeHtml(nextGate)}</button>` : ""}
          <button class="proj-btn proj-archive" type="button" data-project-action="archive" data-project="${escapeHtml(project.name)}">${text("archiveProject")}</button>
          <button class="proj-btn proj-danger" type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
        </div>
      </article>
    `;
}

// Task siyahısı: bir task kartı (data-prep daxil). Deps: isTaskBlocked (dependencies.js),
//   getProject/resourceLabel (lookups.js), escapeHtml, statusClass/priorityClass (utils.js),
//   statusLabel/priorityLabel (labels.js), shortDate (format.js),
//   plannedHoursForTask/actualHoursForTask (metrics.js), renderTaskRelations/
//   renderTaskInlineComments/renderTaskActions, selectedTaskIds (script.js global Set), text.
function taskCardMarkup(task) {
  const blocked = isTaskBlocked(task);
  const commentCount = (task.comments || []).length;
  const fileCount = (task.attachments || []).length;
  const timeEntryCount = (task.timeEntries || []).length;
  const projectName = getProject(task);
  const infoChips = [
    commentCount ? `💬 ${commentCount}` : "",
    fileCount ? `📎 ${fileCount}` : "",
    timeEntryCount ? `⏱ ${timeEntryCount} giriş` : "",
  ].filter(Boolean);
  return `
    <article class="task-card ${blocked ? "blocked-task" : ""}" data-task-card-id="${escapeHtml(task.id)}">
      <label class="task-cb-wrap" title="Seç" aria-label="Seç">
        <input type="checkbox" class="task-select-cb" data-task-id="${escapeHtml(task.id)}" ${selectedTaskIds.has(task.id) ? "checked" : ""}>
      </label>
      ${projectName ? `<div class="task-project-tag">📁 ${escapeHtml(projectName)}</div>` : ""}
      <h3>${escapeHtml(task.name)}</h3>
      <div class="task-meta">
        <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
        <span class="badge ${priorityClass(task.priority)}">${priorityLabel(task.priority)}</span>
        ${blocked ? `<span class="badge blocked">${text("blocked")}</span>` : ""}
        <span>📅 ${shortDate(task.start)} – ${shortDate(task.end)}</span>
        <span>👤 ${escapeHtml(resourceLabel(task.owner))}</span>
        <span>⏱ ${plannedHoursForTask(task)}h plan · ${actualHoursForTask(task)}h fakt</span>
        ${infoChips.length ? `<span class="task-info-chips">${infoChips.join(" &nbsp;")}</span>` : ""}
      </div>
      ${renderTaskRelations(task)}
      ${task.notes ? `<p class="task-notes-preview">${escapeHtml(task.notes)}</p>` : ""}
      <div class="progress-mini"><span style="width:${Number(task.progress) || 0}%"></span></div>
      ${renderTaskInlineComments(task)}
      ${renderTaskActions(task)}
    </article>
  `;
}

// ── renderResourceControls admin siyahı markup-ları. Deps: escapeHtml, text,
//    projectManagers/customerLabel/resourceLabel/roleLabel (lookups+script), shortDate,
//    statusLabel/priorityLabel/registerTypeLabel/registerStatusLabel/impactLabel (labels.js),
//    resourceValue/resourceTypeLabel, teamMemberOptions/managerOptions (option-builders.js),
//    canManageRegister/canChangeRegisterStatus (permissions.js), isOrgAdmin (tenant.js),
//    appState.users, currentUser. ────────────────────────────────────────────────────
function resourceProjectListMarkup(scopedProjects, scopedTasks) {
  return scopedProjects.length ? scopedProjects.map((project) => {
    const taskCount = scopedTasks.filter((task) => task.project === project.name).length;
    const managerNames = projectManagers(project).map((user) => user.username);
    const memberNames = (project.teamMemberIds || []).map(resourceLabel).filter(Boolean);
    return `
      <div class="resource-item">
        <span><strong>${escapeHtml(project.name)}</strong>${text("customer")}: ${escapeHtml(customerLabel(project.customerId))} · ${taskCount} ${text("tasks")} · ${shortDate(project.start)} - ${shortDate(project.end)} · ${statusLabel(project.status)} · ${priorityLabel(project.priority)} · ${Number(project.progress) || 0}%</span>
        <div class="user-actions">
          <span class="manager-summary"><strong>${text("responsibleManagers")}</strong>${escapeHtml(managerNames.join(", ") || text("noManagersSelected"))}</span>
          <span class="manager-summary"><strong>${text("projectTeamMembers")}</strong>${escapeHtml(memberNames.join(", ") || text("empty"))}</span>
          <div class="mini-actions">
            <button type="button" data-resource-action="open-project-managers" data-id="${project.id}">${text("selectManagers")}</button>
          </div>
        </div>
      </div>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
}

function resourceTeamListMarkup(scopedTeams) {
  return scopedTeams.length ? scopedTeams.map((team) => {
    const values = (team.memberIds || []).map((id) => id.includes(":") ? id : resourceValue("member", id));
    const names = values.map(resourceLabel).filter(Boolean);
    return `
      <details class="user-profile-card">
        <summary><span><strong>${escapeHtml(team.name)}</strong>${escapeHtml(names.join(", ") || text("empty"))}</span></summary>
        <div class="resource-body">
          <label>
            <span>${text("newTeam")}</span>
            <input class="team-edit-name" data-team-id="${team.id}" value="${escapeHtml(team.name)}">
          </label>
          <label>
            <span>${text("teamMembers")}</span>
            <select class="team-edit-members" data-team-id="${team.id}" multiple size="5">${teamMemberOptions(values)}</select>
          </label>
          <div class="mini-actions">
            <button type="button" data-resource-action="save-team" data-id="${team.id}">${text("saveTeam")}</button>
            <button type="button" data-resource-action="delete-team" data-id="${team.id}">${text("remove")}</button>
          </div>
        </div>
      </details>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
}

function resourceLinksListMarkup(scopedLinks) {
  return scopedLinks.length ? scopedLinks.map((link) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(link.project)}</strong>${resourceTypeLabel(link.resource)}: ${escapeHtml(resourceLabel(link.resource))}</span>
      <button type="button" data-resource-action="delete-link" data-id="${link.id}">${text("remove")}</button>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function resourceRegisterListMarkup(scopedRegisters) {
  return scopedRegisters.length ? scopedRegisters.map((item) => {
    const canMgr = canManageRegister(item);
    const canStatus = canChangeRegisterStatus(item);
    const statusCycle = { Open: "Monitoring", Monitoring: "Resolved", Resolved: "Open" };
    const statusNext = statusCycle[item.status] || "Open";
    const statusLabel = { Open: "👁 Monitor et", Monitoring: "✓ Həll et", Resolved: "↺ Yenidən aç" };
    return `
    <div class="resource-item register-item ${escapeHtml(item.type)}">
      <div class="register-main">
        <div class="register-header">
          <span class="reg-type-badge reg-${escapeHtml(item.type)}">${registerTypeLabel(item.type)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <span class="reg-project">${escapeHtml(item.project)}</span>
        </div>
        <div class="register-meta">
          ${canMgr ? `
            <label class="reg-inline-label">Status
              <select data-register-field="status" data-id="${item.id}">
                <option value="Open" ${item.status === "Open" ? "selected" : ""}>Open</option>
                <option value="Monitoring" ${item.status === "Monitoring" ? "selected" : ""}>Monitoring</option>
                <option value="Resolved" ${item.status === "Resolved" ? "selected" : ""}>Resolved</option>
              </select>
            </label>
            <label class="reg-inline-label">Impact
              <select data-register-field="impact" data-id="${item.id}">
                <option value="Low" ${item.impact === "Low" ? "selected" : ""}>Low</option>
                <option value="Medium" ${item.impact === "Medium" ? "selected" : ""}>Medium</option>
                <option value="High" ${item.impact === "High" ? "selected" : ""}>High</option>
              </select>
            </label>
            ${item.dueDate ? `<span class="reg-meta-chip">📅 ${shortDate(item.dueDate)}</span>` : ""}
            ${item.owner ? `<span class="reg-meta-chip">👤 ${escapeHtml(resourceLabel(item.owner))}</span>` : ""}
          ` : `
            <span class="reg-status-chip reg-status-${escapeHtml(item.status)}">${escapeHtml(registerStatusLabel(item.status))}</span>
            <span class="reg-impact-chip">${impactLabel(item.impact)}</span>
            ${item.dueDate ? `<span class="reg-meta-chip">📅 ${shortDate(item.dueDate)}</span>` : ""}
            ${item.owner ? `<span class="reg-meta-chip">👤 ${escapeHtml(resourceLabel(item.owner))}</span>` : ""}
          `}
        </div>
        ${canMgr
          ? `<input class="reg-mitigation-input" type="text" placeholder="Azaldıcı tədbirlər..." value="${escapeHtml(item.mitigation || "")}" data-register-field="mitigation" data-id="${item.id}">`
          : item.mitigation ? `<small class="reg-mitigation-text">${escapeHtml(item.mitigation)}</small>` : ""}
      </div>
      <div class="register-actions">
        ${canStatus ? `<button type="button" class="reg-status-btn" data-register-action="status" data-id="${item.id}" data-next="${statusNext}">${statusLabel[item.status] || "Status"}</button>` : ""}
        ${canMgr ? `<button type="button" class="danger" data-register-action="delete" data-id="${item.id}">${text("remove")}</button>` : ""}
      </div>
    </div>`;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
}

function resourceUserListMarkup(scopedUsers) {
  return scopedUsers.map((user) => {
    const displayName = user.profile?.fullName || user.username;
    const initials = displayName.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase() || "?";
    return `
    <details class="user-profile-card">
      <summary data-initials="${escapeHtml(initials)}">
        <span><strong>${escapeHtml(displayName)}</strong> · ${escapeHtml(user.profile?.position || roleLabel(user.role))} · ${escapeHtml(user.username)}${user.managerId ? ` · ${escapeHtml(appState.users.find((item) => item.id === user.managerId)?.username || "")}` : ""}</span>
      </summary>
      <form class="user-profile-form" data-user-id="${user.id}">
        <label><span>${text("login")}</span><input name="username" value="${escapeHtml(user.username)}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fullName")}</span><input name="fullName" value="${escapeHtml(user.profile?.fullName || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fatherName")}</span><input name="fatherName" value="${escapeHtml(user.profile?.fatherName || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("email")}</span><input name="email" type="email" value="${escapeHtml(user.profile?.email || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("position")}</span><input name="position" value="${escapeHtml(user.profile?.position || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("phone")}</span><input name="phone" value="${escapeHtml(user.profile?.phone || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("address")}</span><input name="address" value="${escapeHtml(user.profile?.address || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("company")}</span><input name="company" value="${escapeHtml(user.profile?.company || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label class="admin-only"><span>${text("manager")}</span><select name="managerId">${managerOptions(user.managerId || "")}</select></label>
        ${isOrgAdmin() && user.id !== currentUser?.id ? `
        <label><span>Rol</span>
          <select name="role">
            <option value="user" ${user.role === "user" ? "selected" : ""}>${roleLabel("user")}</option>
            <option value="contributor" ${user.role === "contributor" ? "selected" : ""}>${roleLabel("contributor")}</option>
            <option value="viewer" ${user.role === "viewer" ? "selected" : ""}>${roleLabel("viewer")}</option>
            <option value="sponsor" ${user.role === "sponsor" ? "selected" : ""}>${roleLabel("sponsor")}</option>
            <option value="manager" ${user.role === "manager" ? "selected" : ""}>${roleLabel("manager")}</option>
            <option value="admin" ${user.role === "admin" ? "selected" : ""}>${roleLabel("admin")}</option>
          </select>
        </label>
        ` : ""}
        <div class="user-actions">
        ${user.id === currentUser?.id ? `
          <div class="password-form" data-user-id="${user.id}">
            <input type="password" name="password" placeholder="${text("newPassword")}" required>
            <button type="button" data-user-action="request-own-password" data-id="${user.id}">${text("requestPasswordChange")}</button>
            <input type="text" name="token" placeholder="${text("confirmationCode")}">
            <button type="button" data-user-action="confirm-own-password" data-id="${user.id}">${text("confirmPasswordChange")}</button>
          </div>
        ` : `
          <div class="password-form" data-user-id="${user.id}">
            <input type="password" name="password" placeholder="${text("newPassword")}" required>
            <button type="button" data-user-action="change-password" data-id="${user.id}">${text("changePassword")}</button>
          </div>
        `}
        ${user.id === currentUser?.id ? "" : `<button type="button" data-user-action="delete-user" data-id="${user.id}">${text("remove")}</button>`}
        ${isOrgAdmin() ? `<button class="primary" type="submit">${text("saveProfile")}</button>` : ""}
        </div>
      </form>
    </details>
  `;
  }).join("");
}

function resourceTrashListMarkup(scopedTrash) {
  return scopedTrash.length ? scopedTrash.map((item) => {
    const title = item.type === "task" ? item.data.name : (item.data.project || item.data.name);
    const subtitle = item.type === "task"
      ? text("deletedTask")
      : item.type === "projectRecord" ? text("deletedProject") : `${text("deletedProject")} - ${resourceLabel(item.data.resource)}`;
    return `
      <div class="resource-item">
        <span><strong>${escapeHtml(title)}</strong>${escapeHtml(subtitle)}</span>
        <div class="mini-actions">
          <button type="button" data-trash-action="restore" data-id="${item.id}">${text("restore")}</button>
          <button type="button" data-trash-action="delete-forever" data-id="${item.id}">${text("deleteForever")}</button>
        </div>
      </div>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
}
