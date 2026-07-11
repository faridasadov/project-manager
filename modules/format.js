// Project Manager — locale-aware date/time formatters.
//
// Classic <script> loaded after labels.js and before script.js. These use the
// shared `translations`/`currentLanguage` locale and the shared helpers
// parseDate() (utils.js) and todayStart() (script.js) at call time.

/* eslint-disable no-unused-vars */

function shortDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(translations[currentLanguage].locale, {
    day: "2-digit",
    month: "short"
  }).format(parseDate(value));
}

function formatDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat(translations[currentLanguage].locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function statusDurationLabel(value) {
  if (!value) return "-";
  const start = new Date(value);
  if (Number.isNaN(start.getTime())) return "-";
  const days = Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000));
  if (days === 0) return "bu gün";
  return `${days} gün`;
}

function daysUntil(value) {
  return Math.round((parseDate(value) - todayStart()) / 86400000);
}
