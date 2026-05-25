/**
 * Task Templates — standalone module
 * Manages template CRUD in appSettings.taskTemplates.
 * Loaded via script.js (functions exposed globally).
 *
 * Template schema:
 * {
 *   name: string,          // template display name
 *   status?: string,       // default status key
 *   priority?: string,     // default priority key
 *   plannedHours?: number,
 *   notes?: string
 * }
 */

// These functions are defined in script.js appended block.
// This file documents the API and can be used standalone in future.
export function createTemplate(fields) {
  return { name: fields.name || "Yeni şablon", ...fields };
}

export function applyTemplate(tpl, formFields) {
  return Object.fromEntries(
    Object.entries(tpl).filter(([k]) => k in formFields)
  );
}
