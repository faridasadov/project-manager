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

function shouldValidateDependencies(status) {
  return status && status !== "Plan";
}

function dependencyBlockedMessage(task) {
  const names = incompleteDependencies(task).map((item) => item.name).filter(Boolean);
  return names.length
    ? `${text("dependencyStartBlocked")} ${text("blockedBy")}: ${names.join(", ")}`
    : text("dependencyStartBlocked");
}

function rescheduleDependentTasks(sourceTask) {
  if (!sourceTask?.end) return 0;
  let changed = 0;
  appState.tasks = appState.tasks.map((task) => {
    if (task.id === sourceTask.id || !(task.dependencyIds || []).includes(sourceTask.id) || !task.start || !task.end) return task;
    if (parseDate(task.start) > parseDate(sourceTask.end)) return task;
    const duration = Math.max(0, daysBetween(task.start, task.end));
    const nextStart = isoDate(addDays(parseDate(sourceTask.end), 1));
    const nextEnd = isoDate(addDays(parseDate(nextStart), duration));
    changed += 1;
    return { ...task, start: nextStart, end: nextEnd };
  });
  if (changed) {
    addNotification(`${text("dependencyRescheduled")}: ${sourceTask.name}`, "", { type: "dependency", taskId: sourceTask.id });
    recordAudit("dependency.rescheduled", "task", sourceTask.id, `${changed} dependent task`);
  }
  return changed;
}
