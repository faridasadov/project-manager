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

// Viewer və sponsor: bütün şirkət task/layihələrini GÖRÜR (yalnız oxu) — amma
// heç nə redaktə edə və komment yaza bilmir (Farid: "viewer və sponsor bütün
// task və layihələri görür amma heç nə redaktə edib və komment yaza bilmir,
// amma oxuya bilir"). Görünürlük admin/rəhbərlik səviyyəsindədir; idarəetmə və
// komment gate-lərinə QƏSDƏN daxil edilmir (canManageTasks/canComment onları
// onsuz da kənarda saxlayır).
function isReadonlyObserver() {
  return ["viewer", "sponsor"].includes(currentUser?.role);
}

// Bütün şirkəti oxuya bilən rollar: admin, rəhbərlik, viewer, sponsor.
function canReadWholeCompany() {
  return isAdmin() || isRehberlik() || isReadonlyObserver();
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
  if (canReadWholeCompany()) return true;
  return projectHasRoleAccess(project)
    || projectHasResourceAccess(project.name)
    || appState.tasks.some((task) => task.project === project.name && taskHasDirectAccess(task));
}

function visibleProjects() {
  return appState.projects.filter((project) => !project.archived).filter(canSeeProject);
}

// Task görünürlüyü rola görə DAR-dan GENİŞ-ə:
//   • adi istifadəçi (user/contributor/viewer) → YALNIZ öz taskları
//     (məsul şəxs və ya layihə resursu özü/komandasıdır)
//   • manager/sponsor → idarə etdiyi layihənin bütün taskları + öz taskları
//   • admin/rəhbərlik → şirkətin hamısı
// Əvvəl adi istifadəçi üçün də projectHasRoleAccess/projectHasResourceAccess
// işləyirdi: manageri layihə meneceri olan (və ya layihəyə bağlı hər hansı
// resurs onun scope-una düşən) adam LAYİHƏNİN BÜTÜN tasklarını görürdü.
function canSeeTask(task) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (taskCompanyId(task) !== currentCompanyId()) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  if (canReadWholeCompany() && (!project || isSameCompany(project))) return true;
  if (currentUser.role === "manager") {
    return projectHasRoleAccess(project) || taskHasDirectAccess(task);
  }
  return taskHasDirectAccess(task);
}

function accessibleTasks() {
  return appState.tasks.filter(canSeeTask);
}
