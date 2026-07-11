// Project Manager — id / slug helpers.
//
// Classic <script> loaded before script.js. Pure helpers (companyIdFromName
// calls the shared createId defined here) — same global scope, no imports.

/* eslint-disable no-unused-vars */

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function companyIdFromName(name) {
  const slug = String(name || "workspace").trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return `company-${slug || createId()}`;
}

function slugFromName(name) {
  return String(name || "workspace").trim().toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 32) || "workspace";
}
