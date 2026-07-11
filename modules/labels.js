// Project Manager — i18n label helpers.
//
// Classic <script> loaded after utils.js and before script.js. These read the
// shared globals `translations` / `currentLanguage` and call the shared `text()`
// helper (all defined in script.js) at call time — same global scope, no imports.

/* eslint-disable no-unused-vars */

function statusLabel(status) {
  return translations[currentLanguage].statuses[status] || status;
}

function priorityLabel(priority) {
  return translations[currentLanguage].priorities[priority] || priority;
}

function registerTypeLabel(type) {
  if (type === "issue") return text("issueRegister");
  if (type === "milestone") return text("milestoneRegister");
  return text("riskRegister");
}

function impactLabel(impact) {
  if (impact === "High") return text("impactHigh");
  if (impact === "Low") return text("impactLow");
  return text("impactMedium");
}

function registerStatusLabel(status) {
  if (status === "Resolved") return text("registerResolved");
  if (status === "Monitoring") return text("registerMonitoring");
  return text("registerOpen");
}
