// Project Manager — task dependency & scheduling helpers
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Reads appState.tasks + utils.js date helpers; rescheduleDependentTasks calls
// addNotification/recordAudit (script.js) at runtime.

function taskNameById(id) {
  return appState.tasks.find((task) => task.id === id)?.name || "";
}

function incompleteDependencies(task) {
  return (task.dependencyIds || [])
    .map((id) => appState.tasks.find((item) => item.id === id))
    .filter((item) => item && item.status !== "Bitib");
}

function isTaskBlocked(task) {
  return task.status === "Plan" && incompleteDependencies(task).length > 0;
}

function canStartTask(task) {
  return incompleteDependencies(task).length === 0;
}

// Dövr (cycle) yoxlaması: taskId üçün verilən dependencyIds əlavə edilsə,
// asılılıq zənciri geriyə taskId-ə qayıdırsa → dövr yaranır.
function dependencyCreatesCycle(taskId, dependencyIds) {
  if (!taskId) return false;
  const visited = new Set();
  const stack = [...(dependencyIds || [])];
  while (stack.length) {
    const id = stack.pop();
    if (!id) continue;
    if (id === taskId) return true;
    if (visited.has(id)) continue;
    visited.add(id);
    const dep = appState.tasks.find((item) => item.id === id);
    if (dep) stack.push(...(dep.dependencyIds || []));
  }
  return false;
}

function shouldValidateDependencies(status) {
  return status && status !== "Plan";
}

function dependencyBlockedMessage(task) {
  const names = incompleteDependencies(task).map((item) => item.name).filter(Boolean);
  return names.length
    ? `${text("dependencyStartBlocked")} ${text("blockedBy")}: ${names.join(", ")}`
    : text("dependencyStartBlocked");
}

// Zəncirvari yenidən planlaşdırma: mənbə task-ın sonu dəyişəndə birbaşa VƏ
// dolayı (C→B→A) asılıları köçürür. Dövrlər #1-də bloklandığı üçün təhlükəsizdir,
// yenə də visited + guard ilə sonsuz döngüdən qorunur.
function rescheduleDependentTasks(sourceTask) {
  if (!sourceTask?.end) return 0;
  const byId = new Map(appState.tasks.map((task) => [task.id, task]));
  let changed = 0;
  const queue = [sourceTask.id];
  const enqueued = new Set([sourceTask.id]);
  let guard = 0;
  while (queue.length && guard < 10000) {
    guard += 1;
    const current = byId.get(queue.shift());
    if (!current?.end) continue;
    for (const task of appState.tasks) {
      if (task.id === current.id || !(task.dependencyIds || []).includes(current.id) || !task.start || !task.end) continue;
      if (parseDate(task.start) > parseDate(current.end)) continue;
      const duration = Math.max(0, daysBetween(task.start, task.end));
      task.start = isoDate(addDays(parseDate(current.end), 1));
      task.end = isoDate(addDays(parseDate(task.start), duration));
      changed += 1;
      if (!enqueued.has(task.id)) { queue.push(task.id); enqueued.add(task.id); }
    }
  }
  if (changed) {
    addNotification(`${text("dependencyRescheduled")}: ${sourceTask.name}`, "", { type: "dependency", taskId: sourceTask.id });
    recordAudit("dependency.rescheduled", "task", sourceTask.id, `${changed} dependent task`);
  }
  return changed;
}
