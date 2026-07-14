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
