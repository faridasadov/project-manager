// governance.js — IPMA governance / charter məntiqi (saf funksiyalar).
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Yalnız runtime-da çağırılır; script.js/digər modulların hoisted globallarını oxuyur:
//   text, currentCompanyId, appState.registers, normalizeRegisterItem, createId,
//   saveRegisters (storage.js), visibleRegisters (scope.js).
// DOM-a bağlı projectGovernancePayloadFromForm / updateGovernanceScorePreview
// script.js-də qalır (form input globallarını oxuyur).

function parseGovernanceLines(value) {
  return String(value || "").split("\n").map((item) => item.trim()).filter(Boolean);
}

function governanceLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function gateRequirementKeys(gate) {
  const requirements = {
    Initiation: ["goal", "scope", "successCriteria", "stakeholders"],
    Planning: ["goal", "scope", "successCriteria", "gateChecklist", "stakeholders", "communicationPlan", "riskOpportunity"],
    Execution: ["goal", "scope", "successCriteria", "gateChecklist", "stakeholders", "communicationPlan", "decisionLog", "changeControl", "riskOpportunity", "qualityChecklist"],
    Closing: ["goal", "scope", "successCriteria", "gateChecklist", "closureNotes", "qualityChecklist", "competenceMatrix"]
  };
  return requirements[gate] || [];
}

function charterFieldComplete(charter = {}, key) {
  const value = charter[key];
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function gateRequirementMissing(project, gate) {
  const charter = project?.charter || {};
  const labels = {
    goal: text("projectCharter"),
    scope: text("projectScope"),
    successCriteria: text("successCriteria"),
    gateChecklist: text("planningGateChecklist"),
    closureNotes: text("closureLessons"),
    stakeholders: text("stakeholderRegister"),
    communicationPlan: text("communicationPlan"),
    decisionLog: text("decisionLog"),
    changeControl: text("changeControl"),
    riskOpportunity: text("riskOpportunity"),
    qualityChecklist: text("qualityChecklist"),
    competenceMatrix: text("competenceMatrix")
  };
  return gateRequirementKeys(gate)
    .filter((key) => !charterFieldComplete(charter, key))
    .map((key) => labels[key] || key);
}

function syncGovernanceRisks(project) {
  const lines = project?.charter?.riskOpportunity || [];
  const companyId = project?.companyId || currentCompanyId();
  const existingKeys = new Set(appState.registers.map((item) => item.sourceKey).filter(Boolean));
  lines.forEach((line) => {
    const title = line.split("|")[0]?.trim() || line.trim();
    if (!title) return;
    const sourceKey = `${project.id || project.name}:risk:${title.toLowerCase()}`;
    if (existingKeys.has(sourceKey) || appState.registers.some((item) => item.project === project.name && item.type === "risk" && item.title.toLowerCase() === title.toLowerCase())) return;
    appState.registers.push(normalizeRegisterItem({
      id: createId("register"),
      companyId,
      project: project.name,
      type: "risk",
      title,
      status: "Open",
      impact: line.toLowerCase().includes("high") || line.toLowerCase().includes("yüksək") ? "High" : "Medium",
      mitigation: line,
      source: "ipma-risk-opportunity",
      sourceKey
    }));
  });
  saveRegisters();
}

function projectGovernanceAudit(project) {
  const charter = project?.charter || {};
  const checks = [
    ["goal", text("projectCharter"), Boolean(charter.goal)],
    ["scope", text("projectScope"), Boolean(charter.scope)],
    ["successCriteria", text("successCriteria"), Boolean(charter.successCriteria)],
    ["gateChecklist", text("planningGateChecklist"), Boolean(charter.gateChecklist?.length)],
    ["stakeholders", text("stakeholderRegister"), Boolean(charter.stakeholders?.length)],
    ["communicationPlan", text("communicationPlan"), Boolean(charter.communicationPlan?.length)],
    ["decisionLog", text("decisionLog"), Boolean(charter.decisionLog?.length)],
    ["changeControl", text("changeControl"), Boolean(charter.changeControl?.length)],
    ["riskOpportunity", text("riskOpportunity"), Boolean(charter.riskOpportunity?.length || visibleRegisters(project?.name).some((item) => item.type === "risk"))],
    ["qualityChecklist", text("qualityChecklist"), Boolean(charter.qualityChecklist?.length)],
    ["competenceMatrix", text("competenceMatrix"), Boolean(charter.competenceMatrix?.length)]
  ];
  const done = checks.filter(([, , ok]) => ok).length;
  const score = Math.round((done / checks.length) * 100);
  const approvals = project?.charter?.gateApprovals || {};
  const approvedGates = ["Initiation", "Planning", "Execution", "Closing"].filter((gate) => approvals[gate]?.approvedAt);
  const openGovernanceRisks = visibleRegisters(project?.name).filter((item) => item.status !== "Resolved" && ["risk", "issue"].includes(item.type));
  return {
    score,
    done,
    total: checks.length,
    missing: checks.filter(([, , ok]) => !ok).map(([, label]) => label),
    approvedGates,
    openGovernanceRisks
  };
}
