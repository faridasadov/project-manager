// option-builders.js — <option> HTML-string / resurs siyahısı qurucuları (saf oxuma).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// String (və ya obyekt massivi) qaytarır — DOM element YARATMIR, mutasiya YOX.
// DOM-a toxunan ensureSelectOption (document.createElement) script.js-də qaldı.
// Runtime globalları: currentCompanyId, appState.users/teams, accessibleTasks,
//   escapeHtml (utils.js), text, resourceValue, isSameCompany (tenant.js),
//   roleLabel/getProject (lookups.js).

function managerOptions(selectedId = "") {
  const companyId = currentCompanyId();
  return [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...appState.users
      .filter((user) => user.role === "manager" && user.companyId === companyId)
      .map((user) => {
        const label = user.profile?.fullName ? `${user.profile.fullName} (${user.username})` : user.username;
        return `<option value="${user.id}" ${user.id === selectedId ? "selected" : ""}>${escapeHtml(label)}</option>`;
      })
  ].join("");
}

function managerMultiOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return appState.users
    .filter((user) => user.role === "manager" && user.companyId === companyId)
    .map((user) => `<option value="${user.id}" ${selectedIds.includes(user.id) ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
    .join("");
}

function allResourceOptions() {
  const companyId = currentCompanyId();
  return [
    ...appState.users.filter((user) => user.role !== "super_admin" && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) })),
    ...appState.teams.filter((team) => isSameCompany(team)).map((team) => ({ value: resourceValue("team", team.id), label: team.name, type: text("team") }))
  ];
}

function teamMemberOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return [
    ...appState.users.filter((user) => user.role !== "super_admin" && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) }))
  ].map((option) => `<option value="${option.value}" ${selectedIds.includes(option.value) ? "selected" : ""}>${option.type}: ${escapeHtml(option.label)}</option>`).join("");
}

function taskOptionItems(selectedIds = [], excludedId = "") {
  return accessibleTasks()
    .filter((task) => task.id !== excludedId)
    .map((task) => `<option value="${task.id}" ${selectedIds.includes(task.id) ? "selected" : ""}>${escapeHtml(task.name)} (${escapeHtml(getProject(task))})</option>`)
    .join("");
}
