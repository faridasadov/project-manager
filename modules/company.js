// Project Manager — company registry & platform-metrics helpers
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Pure logic: derive the tenant registry and per-company/platform health
// metrics from appState + appSettings + audit logs. Call format.js (statusDuration
// Label/daysUntil), dependencies.js (isTaskBlocked) and script.js globals at runtime.

// ── Tenant registry (derived from local state) ───────────────────────────────
function companyRegistryFromLocalState() {
  const existing = new Map((companyRegistry || []).map((company) => [company.id, { ...company }]));
  const usersByCompany = new Map();
  appState.users.forEach((user) => {
    if (user.role === "super_admin") return;
    const companyId = user.companyId || "company-default";
    const list = usersByCompany.get(companyId) || [];
    list.push(user);
    usersByCompany.set(companyId, list);
  });
  const projectCounts = new Map();
  appState.projects.forEach((project) => {
    const companyId = project.companyId || "company-default";
    projectCounts.set(companyId, (projectCounts.get(companyId) || 0) + 1);
  });
  const companyIds = new Set([...usersByCompany.keys(), ...projectCounts.keys(), ...existing.keys()].filter((id) => id && id !== "platform"));
  return [...companyIds].map((companyId) => {
    const companyUsers = usersByCompany.get(companyId) || [];
    const admin = companyUsers.find((user) => user.role === "admin");
    const name = existing.get(companyId)?.name || admin?.profile?.company || companyUsers[0]?.profile?.company || companyId.replace(/^company-/, "");
    const subdomain = existing.get(companyId)?.subdomain || slugFromName(name);
    return {
      id: companyId,
      name,
      subdomain,
      status: existing.get(companyId)?.status || "active",
      plan: existing.get(companyId)?.plan || "standard",
      adminUsername: admin?.username || existing.get(companyId)?.adminUsername || `admin${subdomain}`,
      userCount: companyUsers.length,
      projectCount: projectCounts.get(companyId) || 0,
      lastLoginAt: existing.get(companyId)?.lastLoginAt || "",
      createdAt: existing.get(companyId)?.createdAt || new Date().toISOString(),
      trialEndsAt: existing.get(companyId)?.trialEndsAt || "",
      subscriptionEndsAt: existing.get(companyId)?.subscriptionEndsAt || "",
      statusChangedAt: existing.get(companyId)?.statusChangedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      activatedAt: existing.get(companyId)?.activatedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      suspendedAt: existing.get(companyId)?.suspendedAt || ""
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

// ── Per-company & platform metrics ───────────────────────────────────────────
function companyStatusMeta(company) {
  const isSuspended = company.status === "suspended";
  const changedAt = company.statusChangedAt || (isSuspended ? company.suspendedAt : company.activatedAt) || company.createdAt;
  return {
    label: isSuspended ? "Dayandırılıb" : "Aktiv edilib",
    changedAt,
    activatedAt: company.activatedAt || company.createdAt || "",
    suspendedAt: company.suspendedAt || "",
    changedBy: company.statusChangedBy || "",
    reason: company.statusReason || "",
    duration: statusDurationLabel(changedAt)
  };
}

function companyProjectNames(companyId) {
  return new Set(appState.projects.filter((project) => (project.companyId || "company-default") === companyId).map((project) => project.name));
}

function companyOperationsMeta(company) {
  const projectNames = companyProjectNames(company.id);
  const companyTasks = appState.tasks.filter((task) => {
    if (task.companyId) return task.companyId === company.id;
    return projectNames.has(task.project);
  });
  const activeTasks = companyTasks.filter((task) => task.status !== "Bitib");
  const overdue = activeTasks.filter((task) => daysUntil(task.end) < 0).length;
  const blocked = activeTasks.filter(isTaskBlocked).length;
  const statusPenalty = company.status === "suspended" ? 25 : 0;
  const adminPenalty = company.adminUsername ? 0 : 15;
  const projectPenalty = Number(company.projectCount) ? 0 : 8;
  const healthScore = Math.max(0, Math.min(100, 100 - statusPenalty - adminPenalty - projectPenalty - overdue * 8 - blocked * 7));
  return {
    healthScore,
    taskCount: companyTasks.length,
    activeTasks: activeTasks.length,
    overdue,
    blocked,
    lastLoginAt: company.lastLoginAt || "",
    riskLevel: healthScore >= 85 ? "Stabil" : healthScore >= 65 ? "Nəzarət" : "Risk"
  };
}

function platformOpsSummary(registry) {
  const metas = registry.map((company) => companyOperationsMeta(company));
  const averageHealth = metas.length ? Math.round(metas.reduce((sum, item) => sum + item.healthScore, 0) / metas.length) : 100;
  const overdueTotal = metas.reduce((sum, item) => sum + item.overdue, 0);
  const blockedTotal = metas.reduce((sum, item) => sum + item.blocked, 0);
  const riskCompanies = metas.filter((item) => item.healthScore < 85 || item.overdue || item.blocked).length;
  const backups = Array.isArray(appSettings.backups) ? appSettings.backups : [];
  const lastBackup = backups[0]?.createdAt || "";
  const lastAudit = [...auditLogs, ...localAuditLogs].map((item) => item.created_at || item.createdAt).filter(Boolean).sort().at(-1);
  return {
    averageHealth,
    overdueTotal,
    blockedTotal,
    riskCompanies,
    lastBackup,
    backupCount: backups.length,
    lastAudit,
    mailReady: Boolean(appSettings.emailEnabled && appSettings.emailProvider)
  };
}
