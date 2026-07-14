// project-crud.js — layihə domen mutasiyaları (create / update / gate validation).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Yalnız runtime-da (form submit handler-lərindən) çağırılır.
// ⚠ appState.tasks/projectLinks/registers-i REASSIGN edir — bu paylaşılan `const appState`
//    obyektinin property-sidir (bare `let` deyil) → cross-module təhlükəsiz; storage.js-dəki
//    save funksiyaları da eyni appState.X-i oxuyur.
// Runtime globalları: currentUser, currentCompanyId, normalizeProject (normalize.js),
//    createId (ids.js), saveResources/saveTasks/saveRegisters (storage.js),
//    syncGovernanceRisks (governance.js), recordAudit (notifications.js), text.

function createProject(name, details = {}) {
  const cleanName = name.trim();
  const companyId = currentCompanyId();
  if (!cleanName || appState.projects.some((project) => project.companyId === companyId && project.name.toLowerCase() === cleanName.toLowerCase())) return false;
  const defaultManagerId = currentUser?.role === "manager"
    ? currentUser.id
    : appState.users.find((user) => user.role === "manager" && user.companyId === companyId)?.id || "";
  const managerIds = details.managerId ? [details.managerId] : (defaultManagerId ? [defaultManagerId] : []);
  const progress = Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  const project = normalizeProject({
    id: createId(),
    name: cleanName,
    companyId,
    customerId: details.customerId || "",
    managerIds,
    teamMemberIds: details.teamMemberIds || [],
    start: details.start || "",
    end: details.end || "",
    status: details.status || "Plan",
    priority: details.priority || "Normal",
    progress: details.status === "Bitib" ? 100 : progress,
    lifecycle: details.lifecycle || "Initiation",
    description: details.description || "",
    budget: Math.max(0, Number(details.budget) || 0),
    charter: details.charter || {}
  });
  appState.projects.push(project);
  project.teamMemberIds.forEach((resource) => {
    if (!appState.projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
      appState.projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  syncGovernanceRisks(project);
  recordAudit("project.created", "project", project.id, project.name);
  return project;
}

function updateProject(projectId, details = {}) {
  const project = appState.projects.find((item) => item.id === projectId);
  if (!project) return null;
  const cleanName = details.name.trim();
  const companyId = project.companyId || currentCompanyId();
  if (!cleanName || appState.projects.some((item) => item.id !== projectId && item.companyId === companyId && item.name.toLowerCase() === cleanName.toLowerCase())) return null;
  const previousName = project.name;
  project.name = cleanName;
  project.customerId = details.customerId || "";
  project.managerIds = details.managerId ? [details.managerId] : [];
  project.teamMemberIds = details.teamMemberIds || [];
  project.start = details.start || "";
  project.end = details.end || "";
  project.status = details.status || "Plan";
  project.priority = details.priority || "Normal";
  project.progress = project.status === "Bitib" ? 100 : Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  project.lifecycle = details.lifecycle || project.lifecycle || "Initiation";
  project.description = String(details.description || "");
  project.budget = Math.max(0, Number(details.budget) || 0);
  project.charter = { ...(project.charter || {}), ...(details.charter || {}) };
  if (previousName !== cleanName) {
    appState.tasks = appState.tasks.map((task) => task.project === previousName ? { ...task, project: cleanName } : task);
    appState.projectLinks = appState.projectLinks.map((link) => link.project === previousName ? { ...link, project: cleanName } : link);
    appState.registers = appState.registers.map((item) => item.project === previousName ? { ...item, project: cleanName } : item);
    saveTasks();
    saveRegisters();
  }
  appState.projectLinks = appState.projectLinks.filter((link) => link.project !== cleanName || !link.resource.startsWith("user:"));
  project.teamMemberIds.forEach((resource) => {
    if (!appState.projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
    appState.projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  syncGovernanceRisks(project);
  recordAudit("project.updated", "project", project.id, project.name);
  return project;
}

function projectGateError(payload) {
  const charter = payload.charter || {};
  const gateCount = Array.isArray(charter.gateChecklist) ? charter.gateChecklist.length : 0;
  if (["Execution", "Monitoring", "Closing", "Closed"].includes(payload.lifecycle)) {
    if (!charter.goal || !charter.scope || !charter.successCriteria || gateCount === 0) {
      return text("gateExecutionError");
    }
  }
  if (payload.lifecycle === "Closed" && !charter.closureNotes) {
    return text("gateClosedError");
  }
  return "";
}
