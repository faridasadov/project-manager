// Project Manager — localStorage read/write helpers.
//
// Classic <script> loaded before script.js. loadJson is the shared primitive;
// each accessor reads one storage key (the *Key consts live in script.js and
// resolve at call time in the shared global scope). No behavior change.

/* eslint-disable no-unused-vars */

function loadJson(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback();
  try {
    return JSON.parse(stored);
  } catch {
    return fallback();
  }
}

function loadMembers() {
  return loadJson(membersKey, () => []);
}

function loadTeams() {
  return loadJson(teamsKey, () => []);
}

function loadProjectLinks() {
  return loadJson(projectLinksKey, () => []);
}

function loadManagedFiles() {
  return loadJson(managedFilesKey, () => []);
}

function loadTrash() {
  return loadJson(trashKey, () => []);
}

function loadLocalAuditLogs() {
  return loadJson(localAuditKey, () => []);
}

function loadNotifications() {
  return loadJson(notificationsKey, () => []);
}

function loadSupabaseSession() {
  try {
    const value = JSON.parse(localStorage.getItem(supabaseSessionKey) || "null");
    return value && value.access_token ? value : null;
  } catch {
    return null;
  }
}

// --- Writers ---
// Persist a mutable state global to localStorage and trigger the background
// backend sync. They read the shared state (tasks/users/... — let in script.js)
// and call scheduleBackendSave (a hoisted global in script.js) at call time.

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  scheduleBackendSave();
}

function saveResources() {
  localStorage.setItem(membersKey, JSON.stringify(appState.members));
  localStorage.setItem(teamsKey, JSON.stringify(appState.teams));
  localStorage.setItem(projectsKey, JSON.stringify(projects));
  localStorage.setItem(projectLinksKey, JSON.stringify(projectLinks));
  localStorage.setItem(customersKey, JSON.stringify(customers));
  localStorage.setItem(managedFilesKey, JSON.stringify(appState.managedFiles));
  scheduleBackendSave();
}

function saveUsers() {
  localStorage.setItem(usersKey, JSON.stringify(users));
  scheduleBackendSave();
}

function saveTrash() {
  localStorage.setItem(trashKey, JSON.stringify(trash));
  scheduleBackendSave();
}

function saveRegisters() {
  localStorage.setItem(registersKey, JSON.stringify(registers));
  scheduleBackendSave();
}
