// permissions.js — rol əsaslı icazə gate-ləri (saf funksiyalar).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Yalnız runtime-da çağırılır; hoisted globalları oxuyur:
//   currentUser, isSuperAdmin/isOrgAdmin (tenant.js), appState.projects (state.js).
// DOM-a bağlı openAdminPanel/openManagerPanel və s. script.js-də qalır.

function canOpenAdminPanel() {
  return isSuperAdmin() || isOrgAdmin();
}

// Platform parametrləri: yalnız super_admin
// Telebe-Hotel: requireSuperAdminAuth
function canManagePlatformSettings() {
  return isSuperAdmin();
}

// Şirkət/mail parametrləri: super_admin + org admin
// Telebe-Hotel: requireOrgAdmin
function canManageOrgSettings() {
  return isSuperAdmin() || isOrgAdmin();
}

function canManageMailSettings() {
  return canManageOrgSettings();
}

// İstifadəçi idarəsi: yalnız super_admin + org admin
// Telebe-Hotel: moderator istifadəçi əlavə/silə BİLMƏZ
function canManageOrgUsers() {
  return isSuperAdmin() || isOrgAdmin();
}

// Layihə idarəsi: org admin + manager (telebe-hotel: admin + moderator)
function canManageProjects() {
  return ["admin", "manager"].includes(currentUser?.role);
}

// Tapşırıq idarəsi: org admin + manager (əvvəlki kimi)
function canManageTasks() {
  return ["admin", "manager"].includes(currentUser?.role);
}

function canContribute() {
  return ["admin", "manager", "user", "contributor"].includes(currentUser?.role);
}

function canApproveGovernance() {
  return ["admin", "manager", "sponsor"].includes(currentUser?.role);
}

// Register idarəsi: admin (bütün şirkət), manager (öz layihəsi)
function canManageRegister(item) {
  if (!currentUser) return false;
  if (isSuperAdmin()) return false;
  if (isOrgAdmin()) return true;
  if (currentUser.role === "manager") {
    const project = appState.projects.find((p) => p.name === item.project);
    return !!(project?.managerIds?.includes(currentUser.id));
  }
  return false;
}

// Status dəyişikliyi: admin + manager (öz layihəsi) + sponsor (öz layihəsi)
function canChangeRegisterStatus(item) {
  if (!currentUser) return false;
  if (isOrgAdmin()) return true;
  if (["manager", "sponsor"].includes(currentUser.role)) {
    const project = appState.projects.find((p) => p.name === item.project);
    return !!(project?.managerIds?.includes(currentUser.id));
  }
  return false;
}

function canApproveDateRequest(task) {
  if (isOrgAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}

function canApproveTask(task) {
  if (isOrgAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}
