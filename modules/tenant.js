// Project Manager — tenant scoping & role helpers
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Reads the central `appState` (state.js) and the hoisted `currentUser` global
// from script.js at call time — this is exactly the kind of state-touching
// helper that only became module-extractable after the appState decoupling.

// ── Tenant (company) resolution ──────────────────────────────────────────────
function currentCompanyId() {
  return currentUser?.companyId || "company-default";
}

function projectCompanyId(project) {
  return project?.companyId || "company-default";
}

function taskCompanyId(task) {
  if (task?.companyId) return task.companyId;
  const project = appState.projects.find((item) => item.name === task?.project);
  return projectCompanyId(project);
}

function isSameCompany(item) {
  return projectCompanyId(item) === currentCompanyId();
}

// ── Role checks ──────────────────────────────────────────────────────────────
function isAdmin() {
  return currentUser?.role === "admin";
}

function isSuperAdmin() {
  return currentUser?.role === "super_admin";
}

// Rəhbərlik: bütün şirkət layihələrini və tapşırıqlarını GÖRÜR və oxuyur,
// komment yaza bilir — amma heç nəyi redaktə/idarə edə bilmir. Yəni admin
// səviyyəsində görünürlük + user səviyyəsindən də dar yazma hüququ.
// Görünürlük admin-lə eyni olduğu üçün canSeeProject/canSeeTask-da admin
// yoxlamasının yanında dayanır; idarəetmə gate-lərinə (canManageTasks,
// canManageProjects, canManageRegister və s.) QƏSDƏN əlavə edilmir.
function isRehberlik() {
  return currentUser?.role === "rehberlik";
}

// ── Visibility / access control ──────────────────────────────────────────────
// These reference resourceInCurrentScope / linkedResourcesForProject (hoisted
// globals still in script.js) at call time — cross-file runtime calls are fine.
function projectHasRoleAccess(project) {
  if (!project || !currentUser) return false;
  const managerIds = project.managerIds || [];
  if (["manager", "sponsor"].includes(currentUser.role)) return managerIds.includes(currentUser.id);
  if (["user", "contributor", "viewer"].includes(currentUser.role)) return Boolean(currentUser.managerId && managerIds.includes(currentUser.managerId));
  return false;
}

function taskHasDirectAccess(task) {
  return [task.owner, task.projectResource].some(resourceInCurrentScope);
}

function projectHasResourceAccess(projectName) {
  return linkedResourcesForProject(projectName).some(resourceInCurrentScope);
}

function canSeeProject(project) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (projectCompanyId(project) !== currentCompanyId()) return false;
  if (isAdmin() || isRehberlik()) return true;
  return projectHasRoleAccess(project)
    || projectHasResourceAccess(project.name)
    || appState.tasks.some((task) => task.project === project.name && taskHasDirectAccess(task));
}

function visibleProjects() {
  return appState.projects.filter((project) => !project.archived).filter(canSeeProject);
}

function canSeeTask(task) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (taskCompanyId(task) !== currentCompanyId()) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  if ((isAdmin() || isRehberlik()) && (!project || isSameCompany(project))) return true;
  return projectHasRoleAccess(project)
    || taskHasDirectAccess(task)
    || projectHasResourceAccess(task.project);
}

function accessibleTasks() {
  return appState.tasks.filter(canSeeTask);
}
