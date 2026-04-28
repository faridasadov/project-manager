import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

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
      remove: () => {}
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
  "projectResource", "status", "priority", "owner", "progress", "notes", "cancelEdit", "gantt",
  "kanban", "taskList", "searchInput", "projectFilter", "statusBars", "upcomingList",
  "deadlineAlerts", "projectCards", "notifyButton", "openAdminPanel", "closeAdminPanel", "adminModal", "exportData", "importData",
  "totalCount", "activeCount", "doneCount", "dateRange", "resetDemo", "clearDone",
  "languageSelect", "loginLanguageSelect", "teamName", "teamMembers",
  "addTeam", "teamList", "linkProject", "linkResource", "addProjectLink", "projectLinks",
  "teamCount", "linkCount", "quickProjectName", "quickAddProject", "projectList",
  "projectCount", "themeMode", "backgroundStyle", "accentColor",
  "emailEnabled", "emailRecipients", "emailProvider", "ldapEnabled", "ldapUrl",
  "ldapBaseDn", "ldapUserFilter", "saveSettings", "settingsStatus",
  "newUserFullName", "newUserPosition", "newUserEmail", "newUserAddress"
  , "loginScreen", "loginForm", "loginUsername", "loginPassword", "loginError",
  "logoutButton", "currentUserBadge", "newUsername", "newUserPassword",
  "newUserRole", "addUser", "userList", "userCount", "trashList", "trashCount"
];

ids.forEach((id) => element(`#${id}`));
["taskId", "taskName", "project", "projectResource", "startDate", "endDate", "status", "priority", "owner", "progress", "notes"].forEach((id) => {
  elements[`#${id}`].formField = true;
});

elements["#status"].value = "Plan";
elements["#status"].options = [{ value: "Plan" }, { value: "Davam edir" }, { value: "Bitib" }];
elements["#priority"].value = "Normal";
elements["#priority"].options = [{ value: "Normal" }, { value: "Yüksək" }, { value: "Aşağı" }];
elements["#progress"].value = "0";
elements["#languageSelect"].value = "az";
elements["#loginLanguageSelect"].value = "az";
elements["#newUserRole"].value = "user";
elements["#newUserRole"].options = [{ value: "user" }, { value: "admin" }];
elements["#themeMode"].value = "light";
elements["#themeMode"].options = [{ value: "light" }, { value: "dark" }, { value: "system" }];
elements["#backgroundStyle"].value = "calm";
elements["#backgroundStyle"].options = [{ value: "calm" }, { value: "grid" }, { value: "plain" }, { value: "focus" }, { value: "paper" }, { value: "steel" }, { value: "sunrise" }];
elements["#accentColor"].value = "teal";
elements["#accentColor"].options = [{ value: "teal" }, { value: "blue" }, { value: "green" }, { value: "amber" }, { value: "red" }, { value: "violet" }, { value: "slate" }];

const filters = ["Hamısı", "Plan", "Davam edir", "Bitib"].map((filter) => {
  const button = new Element(`filter-${filter}`);
  button.dataset.filter = filter;
  return button;
});

const viewTabs = ["dashboard", "projects", "list", "kanban", "gantt"].map((view) => {
  const button = new Element(`view-${view}`);
  button.dataset.view = view;
  return button;
});

const views = ["dashboardView", "projectsView", "listView", "kanbanView", "ganttView"].map((id) => {
  const view = new Element(`#${id}`);
  view.id = id;
  return view;
});

const store = new Map();
let lastAlert = "";

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
  localStorage: {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => store.set(key, value),
    removeItem: (key) => store.delete(key)
  },
  window: { scrollTo: () => {} },
  document: {
    body: { dataset: {}, classList: { toggle: () => {}, add: () => {}, remove: () => {} } },
    documentElement: { lang: "az" },
    querySelector: (selector) => elements[selector],
    querySelectorAll: (selector) => {
      if (selector === ".filter") return filters;
      if (selector === ".view-tab") return viewTabs;
      if (selector === ".view") return views;
      return [];
    },
    addEventListener: () => {}
  }
};
context.document.documentElement = { lang: "az" };
context.globalThis = context;

vm.createContext(context);
vm.runInContext(readFileSync("/root/project-manager/script.js", "utf8"), context);

assert.equal(elements["#totalCount"].textContent, 3, "demo count renders");
assert.match(elements["#gantt"].innerHTML, /Interface dizaynı/, "gantt renders");
assert.match(elements["#kanban"].innerHTML, /Plan/, "kanban renders");
assert.match(elements["#statusBars"].innerHTML, /Davam edir/, "dashboard renders");
assert.match(elements["#teamList"].innerHTML, /Core Team/, "team list renders");
assert.match(elements["#projectLinks"].innerHTML, /Internal portal/, "project links render");

elements["#loginUsername"].value = "admin";
elements["#loginPassword"].value = "admin123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(elements["#currentUserBadge"].textContent, /admin/, "admin can login");

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

elements["#quickProjectName"].value = "QA project";
elements["#quickAddProject"].dispatch("click");
assert.match(elements["#projectList"].innerHTML, /QA project/, "project can be created");

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
assert.equal(elements["#totalCount"].textContent, 4, "new task can be added");
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

elements["#logoutButton"].dispatch("click");
elements["#loginUsername"].value = "admin";
elements["#loginPassword"].value = "admin123";
elements["#loginForm"].dispatch("submit", { preventDefault: () => {} });
elements["#taskList"].dispatch("click", {
  target: { closest: () => ({ dataset: { action: "next", id: editedId } }) }
});
const doneTaskCard = elements["#taskList"].innerHTML.match(/<article class="task-card">[\s\S]*?Redaktə olunmuş task[\s\S]*?<\/article>/)?.[0] || "";
assert.doesNotMatch(doneTaskCard, /<textarea name="comment"/, "done tasks do not show comment form");
assert.doesNotMatch(doneTaskCard, />İrəli</, "done tasks do not show next button");
assert.match(doneTaskCard, />Sil</, "done tasks keep delete button");

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

elements["#searchInput"].value = "Customer";
elements["#searchInput"].dispatch("input");
assert.match(elements["#taskList"].innerHTML, /Customer rollout|Task yoxdur/, "search runs");

elements["#taskName"].value = "Yanlış tarix";
elements["#startDate"].value = "2026-05-20";
elements["#endDate"].value = "2026-05-10";
elements["#taskForm"].dispatch("submit", { preventDefault: () => {} });
assert.match(lastAlert, /Bitmə tarixi/, "invalid date blocked");

elements["#clearDone"].dispatch("click");
assert.equal(elements["#doneCount"].textContent, 0, "clear done works");

elements["#resetDemo"].dispatch("click");
assert.equal(elements["#totalCount"].textContent, 3, "demo reset works");

console.log("All project manager tests passed.");
