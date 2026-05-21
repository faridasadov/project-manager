import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const rootDir = dirname(fileURLToPath(import.meta.url));

class Element {
  constructor(selector) {
    this.selector = selector;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.id = selector.replace("#", "");
    this.dataset = {};
    this.options = [];
    this.selectedOptions = [];
    this.files = [];
    this.listeners = {};
    this.classList = {
      toggle: () => {},
      add: () => {},
      remove: () => {},
      contains: () => false
    };
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  addEventListener(type, callback) {
    this.listeners[type] = callback;
  }

  dispatch(type, event = {}) {
    this.listeners[type]?.(event);
  }

  appendChild(child) {
    child.parentElement = this;
    this.child = child;
    return child;
  }

  before(node) {
    node.after = this;
    node.parentElement = this.parentElement;
  }

  replaceWith(node) {
    node.parentElement = this.parentElement;
  }

  focus() {}

  reset() {
    Object.values(elements).forEach((element) => {
      if (element.formField) element.value = "";
    });
  }
}

const elements = {};
function element(selector, value = "") {
  const created = new Element(selector);
  created.value = value;
  elements[selector] = created;
  return created;
}

const ids = [
  "taskForm", "formTitle", "taskId", "taskName", "project", "startDate", "endDate",
  "projectResource", "status", "priority", "owner", "progress", "plannedHours", "actualHours", "notes", "parentTask", "taskDependencies", "cancelEdit", "gantt", "reports",
  "ganttControls", "ganttFit", "ganttZoomOut", "ganttZoomLabel", "ganttZoomIn",
  "kanban", "dashboardCalendar", "calendarBoard", "calendarDetails", "dashboardCalendarStart",
  "dashboardCalendarEnd", "calendarStart", "calendarEnd", "taskList", "searchInput", "projectFilter", "statusFilters", "smartFilters", "statusBars", "upcomingList",
  "deadlineAlerts", "workloadList", "portfolioHealth", "nextActions", "projectCards", "archivedProjectCards", "notifyButton", "notifyUnreadCount", "openTaskComposer", "closeTaskComposer", "taskComposerModal",
  "openAdminPanel", "closeAdminPanel", "adminModal", "managerAssignModal", "closeManagerAssign",
  "adminSectionModal", "adminSectionTitle", "adminSectionBody", "closeAdminSection",
  "cancelManagerAssign", "saveProjectManagers", "managerAssignTitle", "managerAssignList", "selectedManagersPreview",
  "exportData", "exportExcel", "exportPdf", "importData", "saveImportMapping", "importProjectColumn", "importTaskColumn", "importOwnerColumn", "importDependencyColumn",
  "createManualBackup", "restoreBackupInput", "backupList", "backupCount", "backupSummary",
  "totalCount", "activeCount", "doneCount", "dateRange", "hoursSummary", "resetDemo", "clearDone",
  "blockedCount", "riskCount", "loadClinicPortfolio", "priorityFilters",
  "languageSelect", "loginLanguageSelect", "teamName", "teamMembers",
  "addTeam", "teamList", "linkProject", "linkResource", "addProjectLink", "projectLinks",
  "teamCount", "linkCount", "projectForm", "projectName", "projectCustomer", "projectLeader", "projectTeamMembers",
  "addProjectTeamMembers", "selectedProjectTeamMembers",
  "projectStartDate", "projectEndDate", "projectStatus", "projectPriority", "projectProgress",
  "projectLifecycle", "projectGoal", "projectScope", "projectSuccessCriteria", "projectGateChecklist", "projectClosureNotes",
  "projectStakeholders", "projectCommunicationPlan", "projectDecisionLog", "projectChangeControl", "projectRiskOpportunity", "projectQualityChecklist", "projectCompetenceMatrix",
  "projectGovernanceScore",
  "focusNewProject", "closeProjectComposer", "cancelProjectCreate", "projectComposerModal", "projectList",
  "registerProject", "registerType", "registerTitle", "registerOwner", "registerStatus", "registerImpact", "registerDueDate", "registerMitigation", "addRegisterItem", "registerList", "registerCount",
  "projectCount", "customerName", "customerContact", "customerEmail", "addCustomer", "customerList", "customerCount", "managedFileInput", "managedFileStatus", "addManagedFiles", "managedFileList", "fileCount",
  "themeMode", "backgroundStyle", "accentColor", "workflowStatusName", "addWorkflowStatus", "workflowStatusList",
  "emailEnabled", "emailRecipients", "emailProvider", "mailSubjectTemplate", "mailBodyTemplate", "testMailBody", "ldapEnabled", "ldapUrl",
  "refreshAuditLogs", "refreshMailHistory", "auditLogList", "mailHistoryList",
  "capacityHours", "ldapBaseDn", "ldapUserFilter", "ldapBindDn", "ldapBindPassword", "ldapGroupRoleMap", "saveSettings", "testMail", "testLdap", "settingsStatus",
  "newUserFullName", "newUserPosition", "newUserEmail", "newUserAddress"
  , "loginScreen", "authPanel", "showLoginTab", "showRegisterTab", "loginForm", "loginUsername", "loginPassword", "loginError",
  "registerForm", "registerCompany", "registerSubdomain", "registerFullName", "registerUsername", "registerEmail", "registerPassword", "registerError",
  "logoutButton", "currentUserBadge", "newUsername", "newUserPassword",
  "newUserRole", "addUser", "userList", "userCount", "trashList", "trashCount",
  "dateRequestList", "dateRequestCount", "taskDetailModal", "taskDetailTitle", "taskDetailBody", "closeTaskDetail",
  "notificationModal", "notificationTitle", "notificationList", "closeNotificationPanel"
];

ids.forEach((id) => element(`#${id}`));
[
  "taskId", "taskName", "project", "projectResource", "startDate", "endDate", "status", "priority", "owner", "progress", "plannedHours", "actualHours", "notes", "parentTask", "taskDependencies",
  "projectName", "projectCustomer", "projectLeader", "projectTeamMembers", "projectStartDate", "projectEndDate", "projectStatus", "projectPriority", "projectProgress",
  "projectLifecycle", "projectGoal", "projectScope", "projectSuccessCriteria", "projectGateChecklist", "projectClosureNotes",
  "projectStakeholders", "projectCommunicationPlan", "projectDecisionLog", "projectChangeControl", "projectRiskOpportunity", "projectQualityChecklist", "projectCompetenceMatrix",
  "registerCompany", "registerSubdomain", "registerFullName", "registerUsername", "registerEmail", "registerPassword",
  "registerProject", "registerType", "registerTitle", "registerOwner", "registerStatus", "registerImpact", "registerDueDate", "registerMitigation"
].forEach((id) => {
  elements[`#${id}`].formField = true;
});

elements["#status"].value = "Plan";
elements["#status"].options = [{ value: "Plan" }, { value: "Davam edir" }, { value: "Bitib" }];
elements["#priority"].value = "Normal";
elements["#priority"].options = [{ value: "Normal" }, { value: "Yüksək" }, { value: "Aşağı" }];
elements["#progress"].value = "0";
elements["#plannedHours"].value = "0";
elements["#actualHours"].value = "0";
elements["#capacityHours"].value = "40";
elements["#projectStatus"].value = "Plan";
elements["#projectStatus"].options = [{ value: "Plan" }, { value: "Davam edir" }, { value: "Bitib" }];
elements["#projectPriority"].value = "Normal";
elements["#projectPriority"].options = [{ value: "Normal" }, { value: "Yüksək" }, { value: "Aşağı" }];
elements["#projectProgress"].value = "0";
elements["#projectLifecycle"].value = "Initiation";
elements["#projectLifecycle"].options = [{ value: "Initiation" }, { value: "Planning" }, { value: "Execution" }, { value: "Monitoring" }, { value: "Closing" }, { value: "Closed" }];
elements["#languageSelect"].value = "az";
elements["#loginLanguageSelect"].value = "az";
elements["#newUserRole"].value = "user";
elements["#newUserRole"].options = [{ value: "user" }, { value: "contributor" }, { value: "viewer" }, { value: "sponsor" }, { value: "manager" }, { value: "admin" }];
elements["#themeMode"].value = "light";
elements["#themeMode"].options = [{ value: "light" }, { value: "dark" }, { value: "system" }];
elements["#backgroundStyle"].value = "calm";
elements["#backgroundStyle"].options = [{ value: "calm" }, { value: "grid" }, { value: "plain" }, { value: "focus" }, { value: "paper" }, { value: "steel" }, { value: "sunrise" }, { value: "aurora" }, { value: "circuit" }, { value: "mist" }, { value: "carbon" }, { value: "canopy" }];
elements["#accentColor"].value = "teal";
elements["#accentColor"].options = [{ value: "teal" }, { value: "blue" }, { value: "green" }, { value: "amber" }, { value: "red" }, { value: "violet" }, { value: "slate" }];
elements["#registerType"].value = "risk";
elements["#registerStatus"].value = "Open";
elements["#registerImpact"].value = "Medium";

const filters = ["Hamısı", "Plan", "Davam edir", "Bitib"].map((filter) => {
  const button = new Element(`filter-${filter}`);
  button.dataset.filter = filter;
  return button;
});

const smartFilterButtons = ["Hamısı", "blocked", "overdue", "risk", "mine"].map((filter) => {
  const button = new Element(`smart-${filter}`);
  button.dataset.smartFilter = filter;
  return button;
});

const viewTabs = ["dashboard", "projects", "list", "kanban", "calendar", "gantt", "reports"].map((view) => {
  const button = new Element(`view-${view}`);
  button.dataset.view = view;
  return button;
});

const views = ["dashboardView", "projectsView", "listView", "kanbanView", "calendarView", "ganttView", "reportsView"].map((id) => {
  const view = new Element(`#${id}`);
  view.id = id;
  return view;
});

const authTabs = ["login", "register"].map((mode) => {
  const button = new Element(`auth-${mode}`);
  button.dataset.authTab = mode;
  return button;
});

const store = new Map();
let lastAlert = "";
const adminSections = ["settings", "users"].map((section) => {
  const node = new Element(`admin-section-${section}`);
  node.dataset.adminSection = section;
  node.dataset.adminTitle = section === "settings" ? "Settings" : "Userlər";
  return node;
});

const context = {
  console,
  Intl,
  TextEncoder,
  Date,
  Math,
  Number,
  String,
  alert: (message) => {
    lastAlert = message;
  },
  confirm: () => true,
  localStorage: {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key)
  },
  window: { scrollTo: () => {} },
  document: {
    body: { dataset: {}, classList: { toggle: () => {}, add: () => {}, remove: () => {} }, appendChild: (node) => node },
    documentElement: { lang: "az" },
    querySelector: (selector) => elements[selector],
    querySelectorAll: (selector) => {
      if (selector === ".filter") return filters;
      if (selector === "[data-smart-filter]") return smartFilterButtons;
      if (selector === "[data-admin-section]") return adminSections;
      if (selector === "[data-auth-tab]") return authTabs;
      if (selector === ".view-tab") return viewTabs;
      if (selector === ".view") return views;
      return [];
    },
    createComment: (value) => ({ value, replaceWith: () => {} }),
    addEventListener: () => {}
  }
};
context.document.documentElement = { lang: "az" };
context.globalThis = context;

vm.createContext(context);
vm.runInContext(readFileSync(join(rootDir, "script.js"), "utf8"), context);

assert.equal(elements["#totalCount"].textContent, 19, "clinic count renders");
assert.match(elements["#gantt"].innerHTML, /Klinika İT Portfeli/, "gantt renders project row first");
assert.match(elements["#gantt"].innerHTML, /gantt-detail-row/, "single project gantt opens task rows by default");
elements["#gantt"].dispatch("click", {
  target: { closest: () => ({ dataset: { ganttProject: "Klinika İT Portfeli" } }) }
});
assert.doesNotMatch(elements["#gantt"].innerHTML, /gantt-detail-row/, "gantt can collapse project task rows on click");
elements["#gantt"].dispatch("click", {
  target: { closest: () => ({ dataset: { ganttProject: "Klinika İT Portfeli" } }) }
});
assert.match(elements["#gantt"].innerHTML, /Əsas server otağı/, "gantt opens project task rows on click");
assert.match(elements["#gantt"].innerHTML, /gantt-task-track/, "gantt renders task tracks for every expanded row");
assert.match(elements["#gantt"].innerHTML, /gantt-milestone/, "gantt renders milestone markers");
assert.match(elements["#gantt"].innerHTML, /gantt-dependency-arrow/, "gantt renders dependency arrows");
assert.match(elements["#gantt"].innerHTML, /data-gantt-bar/, "gantt bars are draggable");
assert.match(elements["#gantt"].innerHTML, /gantt-month/, "gantt renders month timeline headers");
context.openGanttItem("task", "clinic-task-01");
assert.equal(elements["#taskComposerModal"].classList.contains?.("open") ?? elements["#taskComposerModal"].className === "open", false, "mock classList remains no-op");
assert.equal(elements["#taskId"].value, "clinic-task-01", "gantt task click opens task editor data");
context.resetForm();
elements["#ganttControls"].dispatch("click", { target: { closest: () => ({ dataset: { ganttZoom: "in" } }) } });
assert.equal(elements["#ganttZoomLabel"].textContent, "Compact", "gantt zoom in updates label");
assert.match(elements["#gantt"].innerHTML, /minmax\(5px, 1fr\)/, "gantt zoom in updates day width");
elements["#ganttControls"].dispatch("click", { target: { closest: () => ({ dataset: { ganttZoom: "fit" } }) } });
assert.equal(elements["#ganttZoomLabel"].textContent, "Fit", "gantt fit updates label");
assert.match(elements["#gantt"].innerHTML, /minmax\(3px, 1fr\)/, "gantt fit resets day width");
elements["#ganttControls"].dispatch("click", { target: { closest: () => ({ dataset: { ganttZoom: "day" } }) } });
assert.equal(elements["#ganttZoomLabel"].textContent, "Day", "gantt day preset updates label");
assert.match(elements["#gantt"].innerHTML, /minmax\(24px, 1fr\)/, "gantt day preset updates day width");
assert.match(elements["#kanban"].innerHTML, /Plan/, "kanban renders");
assert.match(elements["#calendarBoard"].innerHTML, /Klinika İT Portfeli|Radiologiya|Server avadanlıqları/, "calendar renders clinic project tasks");
assert.match(elements["#dashboardCalendar"].innerHTML, /data-calendar-day/, "dashboard calendar renders clickable days");
elements["#calendarStart"].value = "2026-05-15";
elements["#calendarEnd"].value = "2026-05-30";
elements["#calendarStart"].dispatch("change");
assert.match(elements["#calendarBoard"].innerHTML, /Klinika İT Portfeli/, "calendar range filters clinic tasks");
assert.doesNotMatch(elements["#calendarBoard"].innerHTML, /Smart Anons/, "calendar range excludes tasks outside selected period");
assert.match(elements["#statusBars"].innerHTML, /Davam edir/, "dashboard renders");
assert.match(elements["#portfolioHealth"].innerHTML, /Sağlamlıq balı/, "portfolio health renders");
assert.match(elements["#nextActions"].innerHTML, /Asılılığı aç|Deadline yaxınlaşır|Təcili addım yoxdur/, "next actions render");
assert.notEqual(elements["#blockedCount"].textContent, "", "blocked summary renders");
assert.notEqual(elements["#riskCount"].textContent, "", "risk summary renders");
assert.doesNotMatch(elements["#teamList"].innerHTML, /Core Team/, "old demo teams are removed");
assert.doesNotMatch(elements["#projectLinks"].innerHTML, /Internal portal/, "old demo project links are removed");
assert.match(elements["#projectList"].innerHTML, /Klinika İT Portfeli/, "clinic project renders");
assert.match(elements["#projectList"].innerHTML, /open-project-managers/, "project manager picker button renders");
assert.doesNotMatch(elements["#projectList"].innerHTML, /delete-project|project-manager-select/, "project list does not expose delete or inline manager select");

elements["#loginUsername"].value = "adminklinika";
elements["#loginPassword"].value = "adminklinika123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#currentUserBadge"].textContent, /admin/, "admin can login");
elements["#adminModal"].dispatch("click", {
  target: {
    dataset: {},
    closest: () => ({ dataset: { adminOpenSection: "settings" } })
  }
});
assert.equal(elements["#adminSectionTitle"].textContent, "Settings", "admin sections open in a separate modal");

elements["#newUsername"].value = "commenter";
elements["#newUserPassword"].value = "comment123";
elements["#newUserRole"].value = "user";
elements["#addUser"].dispatch("click");
assert.match(elements["#userList"].innerHTML, /commenter/, "admin can add a user");
assert.doesNotMatch(store.get("project-manager-users-v1"), /comment123/, "new user password is stored as hash");

const commenterId = JSON.parse(store.get("project-manager-users-v1")).find((user) => user.username === "commenter").id;
const changedPasswordInput = { value: "newComment123" };
elements["#userList"].dispatch("submit", {
  preventDefault: () => {},
  target: {
    closest: () => ({ dataset: { userId: commenterId }, elements: { password: changedPasswordInput } })
  }
});
assert.doesNotMatch(store.get("project-manager-users-v1"), /newComment123/, "changed password is stored as hash");

elements["#teamName"].value = "Test Team";
elements["#teamMembers"].selectedOptions = [{ value: "user:user-demo" }];
elements["#addTeam"].dispatch("click");
assert.match(elements["#teamList"].innerHTML, /Test Team/, "team can be added");

elements["#linkProject"].value = "QA project";
elements["#linkResource"].value = "member:member-farid";
elements["#addProjectLink"].dispatch("click");
assert.match(elements["#projectLinks"].innerHTML, /QA project/, "resource can be linked to project");

elements["#projectName"].value = "QA project";
elements["#projectLeader"].value = "user-manager";
elements["#projectTeamMembers"].selectedOptions = [{ value: "user:user-demo" }];
elements["#addProjectTeamMembers"].dispatch("click");
assert.match(elements["#selectedProjectTeamMembers"].innerHTML, /Demo User/, "selected member can be added to project team");
elements["#projectStartDate"].value = "2026-05-10";
elements["#projectEndDate"].value = "2026-05-20";
elements["#projectStatus"].value = "Plan";
elements["#projectPriority"].value = "Yüksək";
elements["#projectProgress"].value = "15";
elements["#projectLifecycle"].value = "Planning";
elements["#projectGoal"].value = "IPMA charter goal";
elements["#projectScope"].value = "Scope boundary";
elements["#projectSuccessCriteria"].value = "Sponsor sign-off";
elements["#projectGateChecklist"].value = "WBS hazırdır\nRisk register var";
elements["#projectStakeholders"].value = "Sponsor | high | weekly";
elements["#projectCommunicationPlan"].value = "Weekly report | Friday";
elements["#projectDecisionLog"].value = "2026-05-19 | Start approved";
elements["#projectChangeControl"].value = "Scope change | pending";
elements["#projectRiskOpportunity"].value = "Opportunity | reuse template";
elements["#projectQualityChecklist"].value = "Acceptance | sign-off";
elements["#projectCompetenceMatrix"].value = "Manager | leadership | strong";
elements["#projectForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#projectList"].innerHTML, /QA project/, "project can be created");
assert.match(elements["#projectCards"].innerHTML, /15%/, "project metadata renders");
assert.match(elements["#projectCards"].innerHTML, /Planning/, "project lifecycle renders");
assert.match(elements["#projectCards"].innerHTML, /IPMA charter goal/, "project charter renders");
assert.match(elements["#projectCards"].innerHTML, /Maraqlı tərəflər/, "project stakeholder register renders");
assert.match(elements["#projectCards"].innerHTML, /Gate təsdiqləri/, "project gate approvals render");
assert.match(elements["#projectCards"].innerHTML, /IPMA balı: 100%/, "project governance score renders");
assert.match(elements["#registerList"].innerHTML, /Opportunity/, "IPMA risk lines sync into register");
elements["#newUserRole"].value = "viewer";
elements["#newUsername"].value = "viewer1";
elements["#newUserPassword"].value = "viewer123";
elements["#addUser"].dispatch("click");
let viewer = JSON.parse(store.get("project-manager-users-v1")).find((user) => user.username === "viewer1");
assert.equal(viewer.role, "viewer", "viewer role can be created");
elements["#newUserRole"].value = "contributor";
elements["#newUsername"].value = "contributor1";
elements["#newUserPassword"].value = "contributor123";
elements["#addUser"].dispatch("click");
let contributor = JSON.parse(store.get("project-manager-users-v1")).find((user) => user.username === "contributor1");
assert.equal(contributor.role, "contributor", "contributor role can be created");
elements["#projectCards"].dispatch("click", {
  target: { closest: () => ({ dataset: { projectAction: "archive", project: "QA project" } }) }
});
assert.match(elements["#archivedProjectCards"].innerHTML, /QA project/, "archived project is visible");
elements["#archivedProjectCards"].dispatch("click", {
  target: { closest: () => ({ dataset: { projectAction: "restore-archive", project: "QA project" } }) }
});
assert.match(elements["#projectCards"].innerHTML, /QA project/, "archived project can be restored");

elements["#languageSelect"].value = "ru";
elements["#languageSelect"].dispatch("change");
assert.match(elements["#statusBars"].innerHTML, /В работе/, "Russian language renders status labels");
elements["#languageSelect"].value = "en";
elements["#languageSelect"].dispatch("change");
assert.match(elements["#statusBars"].innerHTML, /In progress/, "English language renders status labels");
elements["#languageSelect"].value = "az";
elements["#languageSelect"].dispatch("change");

elements["#taskName"].value = "Yeni yoxlama taskı";
elements["#project"].value = "QA project";
elements["#startDate"].value = "2026-05-10";
elements["#endDate"].value = "2026-05-12";
elements["#status"].value = "Plan";
elements["#priority"].value = "Normal";
elements["#owner"].value = "QA";
elements["#progress"].value = "10";
elements["#notes"].value = "Əlavə etmə testi";
elements["#taskForm"].dispatch("submit", { preventDefault: () => {} });
assert.equal(elements["#totalCount"].textContent, 20, "new task can be added");
assert.match(elements["#taskList"].innerHTML, /Yeni yoxlama taskı/, "new task appears");

const addedId = elements["#taskList"].innerHTML.match(/data-id="([^"]+)">Redaktə<\/button>/)?.[1];
assert.ok(addedId, "task id is rendered");

elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "edit", id: addedId } }) }
});
assert.equal(elements["#formTitle"].textContent, "Taskı redaktə et", "edit opens");
elements["#taskName"].value = "Redaktə olunmuş task";
elements["#taskForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#taskList"].innerHTML, /Redaktə olunmuş task/, "edit saves");

const editedId = elements["#taskList"].innerHTML.match(/data-id="([^"]+)">Redaktə<\/button>/)?.[1];
elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "next", id: editedId } }) }
});
assert.match(elements["#taskList"].innerHTML, /Davam edir|Bitib/, "status moves forward");
assert.match(elements["#taskList"].innerHTML, /<textarea name="comment"/, "active tasks have comment textarea");

elements["#logoutButton"].dispatch("click");
elements["#loginUsername"].value = "commenter";
elements["#loginPassword"].value = "newComment123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#taskList"].innerHTML, /Redaktə olunmuş task/, "user sees tasks from their manager projects");
const commentInput = { value: "User comment" };
elements["#taskList"].dispatch("submit", {
  preventDefault: () => {},
  target: {
    closest: () => ({ dataset: { taskId: editedId }, elements: { comment: commentInput } })
  }
});
assert.match(elements["#taskList"].innerHTML, /User comment/, "user can add comments");
assert.match(elements["#taskList"].innerHTML, /<time datetime="/, "comment date is rendered");
const secondCommentInput = { value: "Second user comment" };
elements["#taskList"].dispatch("submit", {
  preventDefault: () => {},
  target: {
    closest: () => ({ dataset: { taskId: editedId }, elements: { comment: secondCommentInput } })
  }
});
assert.match(elements["#taskList"].innerHTML, /Second user comment/, "same user can add multiple comments");
const userTask = JSON.parse(store.get("project-manager-tasks-v2")).find((task) => task.id === editedId);
context.applyGanttDateChange({ type: "task", id: editedId, mode: "move", start: userTask.start, end: userTask.end }, 2);
const requestedTask = JSON.parse(store.get("project-manager-tasks-v2")).find((task) => task.id === editedId);
assert.equal(requestedTask.start, userTask.start, "user gantt drag does not directly change dates");
assert.equal(requestedTask.dateChangeRequests?.[0]?.status, "pending", "user gantt drag creates date request");

elements["#logoutButton"].dispatch("click");
elements["#loginUsername"].value = "manager";
elements["#loginPassword"].value = "manager123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#taskList"].innerHTML, /Redaktə olunmuş task/, "manager sees tasks from assigned projects");
assert.match(elements["#dateRequestList"].innerHTML, /Redaktə olunmuş task/, "manager sees date change request");
const requestId = JSON.parse(store.get("project-manager-tasks-v2")).find((task) => task.id === editedId).dateChangeRequests[0].id;
elements["#dateRequestList"].dispatch("click", {
  target: { closest: () => ({ dataset: { dateRequestAction: "approve", taskId: editedId, requestId } }) }
});
const approvedTask = JSON.parse(store.get("project-manager-tasks-v2")).find((task) => task.id === editedId);
assert.equal(approvedTask.dateChangeRequests[0].status, "approved", "manager approves date request");
assert.notEqual(approvedTask.start, userTask.start, "approved date request changes task start");

elements["#logoutButton"].dispatch("click");
elements["#loginUsername"].value = "adminklinika";
elements["#loginPassword"].value = "adminklinika123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "request-done", id: editedId } }) }
});
assert.match(elements["#taskList"].innerHTML, /Təsdiq et/, "done request waits for approval");
elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "approve-done", id: editedId } }) }
});
const doneTaskCard = elements["#taskList"].innerHTML.match(/<article class="task-card[^"]*">[\s\S]*?Redaktə olunmuş task[\s\S]*?<\/article>/)?.[0] || "";
assert.doesNotMatch(doneTaskCard, /<textarea name="comment"/, "done tasks do not show comment form");
assert.doesNotMatch(doneTaskCard, />İrəli</, "done tasks do not show next button");
assert.match(doneTaskCard, />Sil</, "done tasks keep delete button");
assert.match(elements["#reports"].innerHTML, /Redaktə olunmuş task/, "reports include completed task");

elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "delete", id: editedId } }) }
});
assert.match(elements["#trashList"].innerHTML, /Redaktə olunmuş task/, "deleted task goes to trash");
assert.equal(elements["#trashCount"].textContent, 1, "trash count updates");
const trashedTaskId = elements["#trashList"].innerHTML.match(/data-id="([^"]+)">Bərpa et/)?.[1];
assert.ok(trashedTaskId, "trash restore action is rendered");
elements["#trashList"].dispatch("click", {
  target: { closest: () => ({ dataset: { trashAction: "restore", id: trashedTaskId } }) }
});
assert.match(elements["#taskList"].innerHTML, /Redaktə olunmuş task/, "trash restore returns task");

elements["#taskName"].value = "Bloklanan task";
elements["#project"].value = "QA project";
elements["#startDate"].value = "2026-05-13";
elements["#endDate"].value = "2026-05-14";
elements["#status"].value = "Plan";
elements["#priority"].value = "Yüksək";
elements["#owner"].value = "QA";
elements["#progress"].value = "0";
elements["#notes"].value = "Dependency testi";
elements["#taskDependencies"].selectedOptions = [{ value: "clinic-task-01" }];
elements["#taskForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#taskList"].innerHTML, /Bloklanan task/, "dependent task can be saved as planned");
assert.match(elements["#taskList"].innerHTML, /Bloklanıb/, "dependent task renders blocked badge");
elements["#smartFilters"].dispatch("click", {
  target: { closest: () => ({ dataset: { smartFilter: "blocked" } }) }
});
assert.match(elements["#taskList"].innerHTML, /Bloklanan task/, "blocked smart filter shows blocked tasks");
assert.doesNotMatch(elements["#taskList"].innerHTML, /<h3>Radiologiya avadanlıqları<\/h3>/, "blocked smart filter hides unblocked tasks");
elements["#smartFilters"].dispatch("click", {
  target: { closest: () => ({ dataset: { smartFilter: "Hamısı" } }) }
});
const blockedId = JSON.parse(store.get("project-manager-tasks-v2")).find((task) => task.name === "Bloklanan task")?.id;
assert.ok(blockedId, "blocked task action id is rendered");
lastAlert = "";
elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "next", id: blockedId } }) }
});
assert.match(lastAlert, /asılı tasklar bitməlidir/, "blocked task cannot start before dependency is done");

elements["#searchInput"].value = "Klinika";
elements["#searchInput"].dispatch("input");
assert.match(elements["#taskList"].innerHTML, /Klinika İT Portfeli|Task yoxdur/, "search runs");

elements["#taskName"].value = "Yanlış tarix";
elements["#startDate"].value = "2026-05-20";
elements["#endDate"].value = "2026-05-10";
elements["#taskForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(lastAlert, /Bitmə tarixi/, "invalid date blocked");

elements["#clearDone"].dispatch("click");
assert.equal(elements["#doneCount"].textContent, 0, "clear done works");

elements["#resetDemo"].dispatch("click");
assert.equal(elements["#totalCount"].textContent, 19, "clinic reset works");

console.log("All project manager tests passed.");
