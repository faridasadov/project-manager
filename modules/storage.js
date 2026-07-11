// Project Manager — localStorage read helpers.
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
