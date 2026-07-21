// lookups.js — domen axtarış / göstəriş-label helper-ləri (saf oxuma, DOM/mutasiya YOX).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Yalnız runtime-da çağırılır. Runtime globalları: text,
//   appState.projects/customers/users/members/teams.

function getProject(task) {
  return task.project || text("unassignedProject");
}

function projectExists(name) {
  return appState.projects.some((project) => project.name === name);
}

function customerLabel(customerId) {
  if (!customerId) return text("empty");
  const customer = appState.customers.find((item) => item.id === customerId);
  return customer?.name || text("empty");
}

// Silinmiş resurs üçün XAM id qaytarmaq olmaz: ekranda
// "helpdeskuser:9eb20b61-2725-..." kimi oxunmaz sətirlər çıxırdı.
function resourceLabel(value) {
  if (!value) return text("noOwner");
  const [type, id] = value.split(":");
  if (type === "user") {
    const user = appState.users.find((item) => item.id === id);
    return user ? user.profile?.fullName || user.username : text("deletedResource");
  }
  if (type === "member") {
    const member = appState.members.find((item) => item.id === id);
    return member ? member.name : text("deletedResource");
  }
  if (type === "team") {
    const team = appState.teams.find((item) => item.id === id);
    return team ? team.name : text("deletedResource");
  }
  return value;
}

// Mövcud olmayan (silinmiş) resursu süzür — siyahılarda "silinmiş" sətirlər
// yığılmasın deyə.
function resourceExists(value) {
  const [type, id] = String(value || "").split(":");
  if (type === "user") return appState.users.some((item) => item.id === id);
  if (type === "member") return appState.members.some((item) => item.id === id);
  if (type === "team") return appState.teams.some((item) => item.id === id);
  return false;
}

function userDisplayLabel(username) {
  const user = appState.users.find((item) => item.username === username || item.id === username);
  return user ? user.profile?.fullName || user.username : username || "";
}

function resourceTypeLabel(value) {
  if (value.startsWith("user:")) return text("userRole");
  return value.startsWith("team:") ? text("team") : text("member");
}

function roleLabel(role) {
  if (role === "super_admin") return text("superAdminRole");
  if (role === "admin") return text("adminRole");
  if (role === "manager") return text("managerRole");
  if (role === "contributor") return text("contributorRole");
  if (role === "viewer") return text("viewerRole");
  if (role === "sponsor") return text("sponsorRole");
  return text("userRole");
}
