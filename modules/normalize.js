// Project Manager — entity normalizers.
//
// Classic <script> loaded after ids/crypto/utils and before script.js. Each
// takes a raw object and returns a normalized shape. They call the shared
// helpers createId/companyIdFromName (ids.js), isoDate (utils.js), md5
// (crypto.js) and resourceValue (script.js, a hoisted global) at call time.

/* eslint-disable no-unused-vars */

function normalizeUser(user) {
  if (user.id === "user-admin" && user.username === "admin") {
    user = {
      ...user,
      username: "adminklinika",
      passwordHash: user.passwordHash === md5("admin123") ? md5("adminklinika123") : user.passwordHash,
      companyId: user.companyId || "company-default",
      profile: { ...(user.profile || {}), fullName: user.profile?.fullName || "Klinika Admin", position: user.profile?.position || "Company Admin", company: user.profile?.company || "Klinika" }
    };
  }
  const profile = user.profile || {};
  const company = profile.company || user.companyName || "";
  const normalized = {
    id: user.id,
    username: user.username,
    passwordHash: user.passwordHash || md5(user.password || ""),
    role: user.role,
    managerId: user.managerId || "",
    companyId: user.companyId || (company ? companyIdFromName(company) : "company-default"),
    profile: {
      fullName: "",
      fatherName: "",
      email: "",
      position: "",
      phone: "",
      address: "",
      company: "",
      ...profile
    }
  };
  return normalized;
}

function normalizeCustomer(customer = {}) {
  return {
    id: customer.id || createId(),
    companyId: customer.companyId || "company-default",
    name: String(customer.name || "").trim(),
    contact: String(customer.contact || "").trim(),
    email: String(customer.email || "").trim()
  };
}

function normalizeRegisterItem(item) {
  return {
    id: item.id || createId(),
    companyId: item.companyId || "company-default",
    project: item.project || "",
    type: item.type || "risk",
    title: item.title || "",
    owner: item.owner || "",
    status: item.status || "Open",
    impact: item.impact || "Medium",
    dueDate: item.dueDate || "",
    mitigation: item.mitigation || "",
    source: item.source || "",
    sourceKey: item.sourceKey || "",
    createdAt: item.createdAt || new Date().toISOString()
  };
}

function normalizeTask(task) {
  return {
    project: "",
    projectResource: "",
    comments: [],
    attachments: [],
    parentTaskId: "",
    dependencyIds: [],
    plannedHours: 0,
    actualHours: 0,
    timeEntries: [],
    completionRequestedAt: "",
    completionRequestedBy: "",
    dateChangeRequests: [],
    completedAt: "",
    completedBy: "",
    approvedAt: "",
    approvedBy: "",
    startedAt: task.status === "Davam edir" ? new Date().toISOString() : "",
    progress: task.status === "Bitib" ? 100 : 0,
    ...task,
    plannedHours: Number(task.plannedHours) || 0,
    actualHours: Number(task.actualHours) || 0,
    comments: Array.isArray(task.comments) ? task.comments.map(normalizeComment) : [],
    timeEntries: Array.isArray(task.timeEntries) ? task.timeEntries.map(normalizeTimeEntry).filter(Boolean) : [],
    dateChangeRequests: Array.isArray(task.dateChangeRequests) ? task.dateChangeRequests : [],
    dependencyIds: Array.isArray(task.dependencyIds) ? task.dependencyIds : []
  };
}

function normalizeComment(comment) {
  return {
    id: comment?.id || createId(),
    author: comment?.author || "",
    text: comment?.text || "",
    attachments: Array.isArray(comment?.attachments) ? comment.attachments : [],
    createdAt: comment?.createdAt || new Date().toISOString()
  };
}

function normalizeTimeEntry(entry) {
  const hours = Number(entry?.hours) || 0;
  if (!hours) return null;
  return {
    id: entry.id || createId(),
    user: entry.user || "",
    hours,
    date: entry.date || isoDate(new Date()),
    note: entry.note || "",
    createdAt: entry.createdAt || new Date().toISOString()
  };
}

function normalizeProject(project) {
  const progress = Math.min(100, Math.max(0, Number.parseInt(project.progress || "0", 10)));
  const teamMemberIds = (project.teamMemberIds || []).map((id) => id.includes(":") ? id : resourceValue("member", id));
  return {
    managerIds: [],
    teamMemberIds: [],
    companyId: "company-default",
    lifecycle: "Initiation",
    description: "",
    budget: 0,
    charter: {
      goal: "",
      scope: "",
      successCriteria: "",
      gateChecklist: [],
      closureNotes: "",
      stakeholders: [],
      communicationPlan: [],
      decisionLog: [],
      changeControl: [],
      riskOpportunity: [],
      qualityChecklist: [],
      competenceMatrix: [],
      gateApprovals: {}
    },
    start: "",
    end: "",
    customerId: "",
    archived: false,
    status: "Plan",
    priority: "Normal",
    ...project,
    description: String(project.description || ""),
    budget: Math.max(0, Number(project.budget) || 0),
    charter: {
      goal: "",
      scope: "",
      successCriteria: "",
      gateChecklist: [],
      closureNotes: "",
      stakeholders: [],
      communicationPlan: [],
      decisionLog: [],
      changeControl: [],
      riskOpportunity: [],
      qualityChecklist: [],
      competenceMatrix: [],
      gateApprovals: {},
      ...(project.charter || {})
    },
    teamMemberIds,
    progress: project.status === "Bitib" ? 100 : progress
  };
}
