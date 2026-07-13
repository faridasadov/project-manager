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
