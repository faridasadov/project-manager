// Project Manager — resource-scope & register-visibility helpers
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Pairs with tenant.js: these resolve which resources/registers the current
// user may see. They call appState + tenant.js helpers (isAdmin/canSeeProject)
// + script.js globals (resourceValue/managerUsers/currentUser) at call time.

// ── Resource scope ───────────────────────────────────────────────────────────
function linkedResourcesForProject(project) {
  const directLinks = appState.projectLinks.filter((link) => link.project === project).map((link) => link.resource);
  const record = appState.projects.find((item) => item.name === project);
  const projectMembers = record?.teamMemberIds || [];
  // Layihə menecerləri də resursdur. Əvvəl yalnız teamMemberIds sayılırdı, ona
  // görə task formasında "Resurs" siyahısında yalnız adi userlər görünürdü —
  // menecer seçmək mümkün deyildi.
  const projectManagers = (record?.managerIds || []).map((id) => resourceValue("user", id));
  return [...new Set([...directLinks, ...projectMembers, ...projectManagers])];
}

function resourceIncludesUser(resource, userId) {
  if (!resource || !userId) return false;
  if (resource === resourceValue("user", userId)) return true;
  if (!resource.startsWith("team:")) return false;
  const teamId = resource.split(":")[1];
  const team = appState.teams.find((item) => item.id === teamId);
  return Boolean(team?.memberIds?.some((memberId) => memberId === userId || memberId === resourceValue("user", userId)));
}

function visibleUserIdsForCurrentUser() {
  if (!currentUser) return [];
  if (isSuperAdmin()) return [];
  // Rəhbərlik bütün şirkəti görür — resurs süzgəcləri də admin kimi geniş olmalıdır,
  // yoxsa task siyahısı görünsə də resurs adları "öz sahəsi" ilə məhdudlaşardı.
  if (isAdmin() || isRehberlik()) return appState.users.filter((user) => user.companyId === currentCompanyId()).map((user) => user.id);
  if (currentUser.role === "manager") return [currentUser.id, ...managerUsers(currentUser.id).map((user) => user.id)];
  return [currentUser.id];
}

function resourceInCurrentScope(resource) {
  return visibleUserIdsForCurrentUser().some((userId) => resourceIncludesUser(resource, userId));
}

// ── Register visibility ──────────────────────────────────────────────────────
function visibleRegisters(projectName = "") {
  return appState.registers.filter((item) => {
    if (projectName && item.project !== projectName) return false;
    const project = appState.projects.find((candidate) => candidate.name === item.project);
    return !project || canSeeProject(project);
  });
}

function registerCounts(projectName = "") {
  const items = visibleRegisters(projectName).filter((item) => item.status !== "Resolved");
  return {
    risks: items.filter((item) => item.type === "risk").length,
    issues: items.filter((item) => item.type === "issue").length,
    milestones: items.filter((item) => item.type === "milestone").length
  };
}

function projectHasOpenRisk(projectName) {
  return visibleRegisters(projectName).some((item) => item.status !== "Resolved" && ["risk", "issue"].includes(item.type));
}
