// metrics.js — task & portfolio metrikaları (saf oxuma funksiyaları, DOM/mutasiya YOX).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Yalnız runtime-da (render/hesablama) çağırılır. Runtime globalları:
//   currentSmartFilter, currentUser, appSettings, accessibleTasks, visibleProjects (script.js),
//   isTaskBlocked (dependencies.js), daysUntil (utils.js),
//   projectHasOpenRisk/resourceInCurrentScope/visibleRegisters (scope.js),
//   projectGovernanceAudit (governance.js).

function taskMatchesSmartFilter(task) {
  if (currentSmartFilter === "Hamısı") return true;
  if (currentSmartFilter === "blocked") return isTaskBlocked(task);
  if (currentSmartFilter === "overdue") return task.status !== "Bitib" && daysUntil(task.end) < 0;
  if (currentSmartFilter === "risk") return task.priority === "Yüksək" || projectHasOpenRisk(task.project);
  if (currentSmartFilter === "mine") return !currentUser || [task.owner, task.projectResource].some(resourceInCurrentScope);
  return true;
}

function portfolioMetrics(sourceTasks = accessibleTasks()) {
  const activeTasks = sourceTasks.filter((task) => task.status !== "Bitib");
  const doneTasks = sourceTasks.filter((task) => task.status === "Bitib");
  const overdue = activeTasks.filter((task) => daysUntil(task.end) < 0).length;
  const blocked = activeTasks.filter(isTaskBlocked).length;
  const registerItems = visibleRegisters().filter((item) => item.status !== "Resolved");
  const risks = registerItems.filter((item) => item.type === "risk").length;
  const issues = registerItems.filter((item) => item.type === "issue").length;
  const highRisks = registerItems.filter((item) => item.type === "risk" && item.impact === "High").length;
  const completion = sourceTasks.length ? Math.round((doneTasks.length / sourceTasks.length) * 100) : 0;
  const projectAudits = visibleProjects().map(projectGovernanceAudit);
  const governanceScore = projectAudits.length ? Math.round(projectAudits.reduce((sum, audit) => sum + audit.score, 0) / projectAudits.length) : 100;
  const score = Math.max(0, Math.min(100, Math.round((100 - overdue * 8 - blocked * 7 - risks * 5 - issues * 4 - highRisks * 8) * 0.75 + governanceScore * 0.25)));
  return { active: activeTasks.length, done: doneTasks.length, overdue, blocked, risks, issues, highRisks, completion, governanceScore, score };
}

// ── İş saatı hesablaması ─────────────────────────────────────────────────────
// Plan və fakt saat tarixlərdən avtomat hesablanır, amma YALNIZ REAL İŞ
// GÜNLƏRİ sayılır: şənbə/bazar çıxılır. Gündəlik iş saatı həftəlik capacity-dən
// gəlir (Parametrlər → Capacity saat, defolt 40 → gündə 8 saat).
function dailyWorkHours() {
  return (Number(appSettings.capacityHours) || 40) / 5;
}

// Hər iki tarix daxil olmaqla aralıqdakı iş günlərinin sayı.
function workingDaysBetween(startIso, endIso) {
  if (!startIso || !endIso) return 0;
  const start = new Date(String(startIso).slice(0, 10) + "T00:00:00Z");
  const end = new Date(String(endIso).slice(0, 10) + "T00:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return 0;
  let days = 0;
  for (let d = start.getTime(); d <= end.getTime(); d += 86400000) {
    const dow = new Date(d).getUTCDay();
    if (dow !== 0 && dow !== 6) days += 1;
  }
  return days;
}

function workingHoursBetween(startIso, endIso) {
  return Math.round(workingDaysBetween(startIso, endIso) * dailyWorkHours() * 100) / 100;
}

// PLAN: başlama → bitmə tarixi arasındakı bütün iş saatları.
function autoPlannedHours(task) {
  return workingHoursBetween(task?.start, task?.end);
}

// FAKT: başlama → BU GÜN (tapşırıq bitibsə tamamlanma tarixi) arasında KEÇƏN
// iş saatları. Plan ilə eyni düsturdan hesablansaydı, fakt həmişə plana bərabər
// çıxardı və müqayisə mənasını itirərdi — ona görə son hədd fərqlidir.
function autoActualHours(task) {
  if (!task?.start) return 0;
  const today = isoDate(new Date());
  const finish = task.status === "Bitib"
    ? (String(task.completedAt || task.end || today).slice(0, 10))
    : today;
  if (finish < String(task.start).slice(0, 10)) return 0; // hələ başlamayıb
  return workingHoursBetween(task.start, finish);
}

// Əl ilə yazılmış dəyər varsa o üstündür — avtomat yalnız boş qalanda işləyir.
function plannedHoursForTask(task) {
  return Number(task.plannedHours) || autoPlannedHours(task);
}

// Üstünlük sırası: real vaxt qeydləri → əl ilə yazılmış fakt → avtomat keçən saat.
function actualHoursForTask(task) {
  const entries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  if (entries.length) {
    return Math.round(entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0) * 100) / 100;
  }
  return Number(task.actualHours) || autoActualHours(task);
}

function workloadRows() {
  const activeTasks = accessibleTasks().filter((task) => task.status !== "Bitib");
  const capacity = Number(appSettings.capacityHours) || 40;
  const rows = new Map();
  activeTasks.forEach((task) => {
    const owner = task.owner || task.projectResource || "";
    if (!owner) return;
    const current = rows.get(owner) || { owner, planned: 0, actual: 0, count: 0 };
    current.planned += plannedHoursForTask(task);
    current.actual += actualHoursForTask(task);
    current.count += 1;
    rows.set(owner, current);
  });
  return [...rows.values()]
    .map((row) => ({ ...row, capacity, load: capacity ? Math.round((row.planned / capacity) * 100) : 0 }))
    .sort((a, b) => b.load - a.load);
}
