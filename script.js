const storageKey = "project-manager-tasks-v2";
const languageKey = "project-manager-language";
const membersKey = "project-manager-members-v1";
const teamsKey = "project-manager-teams-v1";
const projectLinksKey = "project-manager-project-links-v1";
const projectsKey = "project-manager-projects-v1";
const customersKey = "project-manager-customers-v1";
const managedFilesKey = "project-manager-files-v1";
const usersKey = "project-manager-users-v1";
const sessionKey = "project-manager-session-v1";
const authTokenKey = "project-manager-auth-token-v1";
const trashKey = "project-manager-trash-v1";
const settingsKey = "project-manager-settings-v1";
const registersKey = "project-manager-registers-v1";
const localAuditKey = "project-manager-local-audit-v1";
const notificationsKey = "project-manager-notifications-v1";
const supabaseSessionKey = "project-manager-supabase-session-v1";
const supabaseWorkspaceKey = "project-manager-supabase-workspace-v1";
// Supabase-ə artıq göndərilmiş local log/bildiriş id-ləri. Yaddaşda saxlanmalıdır:
// əvvəllər yalnız RAM-da idi → hər səhifə yenilənişində eyni loglar təkrar
// göndərilirdi (bazada eyni sətir onlarla dəfə görünürdü).
const supabaseAuditSyncedKey = "project-manager-audit-synced-v1";
const supabaseNotificationSyncedKey = "project-manager-notify-synced-v1";
const backupVersion = 1;
const defaultWorkflowStatuses = ["Plan", "Davam edir", "Bitib"];
const protectedWorkflowStatuses = new Set(defaultWorkflowStatuses);

// translations (i18n az/ru/en) → modules/translations.js

// createId → modules/ids.js

// md5 → modules/crypto.js

// demo/seed data (templates, demo tenants, seed users) → modules/seed-data.js

let statuses = [...defaultWorkflowStatuses];

const form = document.querySelector("#taskForm");
const formTitle = document.querySelector("#formTitle");
const taskId = document.querySelector("#taskId");
const taskName = document.querySelector("#taskName");
const projectInput = document.querySelector("#project");
const projectResourceInput = document.querySelector("#projectResource");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const statusInput = document.querySelector("#status");
const priorityInput = document.querySelector("#priority");
const ownerInput = document.querySelector("#owner");
const progressInput = document.querySelector("#progress");
const plannedHoursInput = document.querySelector("#plannedHours");
const actualHoursInput = document.querySelector("#actualHours");
const notesInput = document.querySelector("#notes");
const parentTaskInput = document.querySelector("#parentTask");
const taskDependenciesInput = document.querySelector("#taskDependencies");
const taskExtraDetails = document.querySelector(".task-extra-details");
const cancelEdit = document.querySelector("#cancelEdit");
const gantt = document.querySelector("#gantt");
const ganttControls = document.querySelector("#ganttControls");
const ganttFitButton = document.querySelector("#ganttFit");
const ganttZoomOutButton = document.querySelector("#ganttZoomOut");
const ganttZoomInButton = document.querySelector("#ganttZoomIn");
const ganttZoomLabel = document.querySelector("#ganttZoomLabel");
const reports = document.querySelector("#reports");
const kanban = document.querySelector("#kanban");
const summaryCards = document.querySelectorAll(".summary-card");
const dashboardCalendar = document.querySelector("#dashboardCalendar");
const calendarBoard = document.querySelector("#calendarBoard");
const calendarDetails = document.querySelector("#calendarDetails");
const dashboardCalendarStart = null; // replaced by nav buttons
const dashboardCalendarEnd = null;   // replaced by nav buttons
const calendarStart = document.querySelector("#calendarStart");
const calendarEnd = document.querySelector("#calendarEnd");
const dashCalPrev = document.querySelector("#dashCalPrev");
const dashCalNext = document.querySelector("#dashCalNext");
const dashCalMonthLabel = document.querySelector("#dashCalMonthLabel");
const dashboardPanels = document.querySelectorAll("[data-dashboard-panel]");
const taskList = document.querySelector("#taskList");
const statusFilters = document.querySelector("#statusFilters");
const priorityFilters = document.querySelector("#priorityFilters");
const smartFilters = document.querySelector("#smartFilters");
let filters = document.querySelectorAll(".filter");
let priorityFilterButtons = document.querySelectorAll("[data-priority-filter]");
let smartFilterButtons = document.querySelectorAll("[data-smart-filter]");
const viewTabs = document.querySelectorAll(".view-tab");
const views = document.querySelectorAll(".view");
const searchInput = document.querySelector("#searchInput");
const projectFilter = document.querySelector("#projectFilter");
const projectContextBar = document.querySelector("#projectContextBar");
const contextProjectName = document.querySelector("#contextProjectName");
const backToProjectsBtn = document.querySelector("#backToProjects");
const contextAddTaskBtn = document.querySelector("#contextAddTask");
const contextEditProjectBtn = document.querySelector("#contextEditProject");
const projectCards = document.querySelector("#projectCards");
const archivedProjectCards = document.querySelector("#archivedProjectCards");
const statusBars = document.querySelector("#statusBars");
const upcomingList = document.querySelector("#upcomingList");
const deadlineAlerts = document.querySelector("#deadlineAlerts");
const workloadList = document.querySelector("#workloadList");
const sidebarCapacityLabel = document.querySelector("#sidebarCapacityLabel");
const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const doneCount = document.querySelector("#doneCount");
const dateRange = document.querySelector("#dateRange");
const hoursSummary = document.querySelector("#hoursSummary");
const blockedCount = document.querySelector("#blockedCount");
const riskCount = document.querySelector("#riskCount");
const portfolioHealth = document.querySelector("#portfolioHealth");
const nextActions = document.querySelector("#nextActions");
const resetDemo = document.querySelector("#resetDemo");
const loadClinicPortfolioButton = document.querySelector("#loadClinicPortfolio");
const clearDone = document.querySelector("#clearDone");
const languageSelect = document.querySelector("#languageSelect");
const teamNameInput = document.querySelector("#teamName");
const teamMembersInput = document.querySelector("#teamMembers");
const addTeamButton = document.querySelector("#addTeam");
const teamList = document.querySelector("#teamList");
const teamCount = document.querySelector("#teamCount");
const linkProjectInput = document.querySelector("#linkProject");
const linkResourceInput = document.querySelector("#linkResource");
const addProjectLinkButton = document.querySelector("#addProjectLink");
const projectLinksList = document.querySelector("#projectLinks");
const linkCount = document.querySelector("#linkCount");
const projectForm = document.querySelector("#projectForm");
const projectFormTitle = document.querySelector("#projectFormTitle");
const projectTemplateInput = document.querySelector("#projectTemplate");
const projectNameInput = document.querySelector("#projectName");
const projectDescriptionInput = document.querySelector("#projectDescription");
const projectCustomerInput = document.querySelector("#projectCustomer");
const toggleQuickCustomerBtn = document.querySelector("#toggleQuickCustomer");
const quickCustomerForm = document.querySelector("#quickCustomerForm");
const quickCustomerNameInput = document.querySelector("#quickCustomerName");
const quickCustomerContactInput = document.querySelector("#quickCustomerContact");
const quickCustomerSaveBtn = document.querySelector("#quickCustomerSave");
const quickCustomerCancelBtn = document.querySelector("#quickCustomerCancel");
const projectLeaderInput = document.querySelector("#projectLeader");
const toggleQuickManagerBtn = document.querySelector("#toggleQuickManager");
const quickManagerForm = document.querySelector("#quickManagerForm");
const quickManagerFullNameInput = document.querySelector("#quickManagerFullName");
const quickManagerUsernameInput = document.querySelector("#quickManagerUsername");
const quickManagerPasswordInput = document.querySelector("#quickManagerPassword");
const quickManagerEmailInput = document.querySelector("#quickManagerEmail");
const quickManagerRoleInput = document.querySelector("#quickManagerRole");
const quickManagerSaveBtn = document.querySelector("#quickManagerSave");
const quickManagerCancelBtn = document.querySelector("#quickManagerCancel");
const projectTeamMembersInput = document.querySelector("#projectTeamMembers");
const toggleQuickTeamBtn = document.querySelector("#toggleQuickTeam");
const quickTeamForm = document.querySelector("#quickTeamForm");
const quickTeamNameInput = document.querySelector("#quickTeamName");
const quickTeamMembersInput = document.querySelector("#quickTeamMembers");
const quickTeamSaveBtn = document.querySelector("#quickTeamSave");
const quickTeamCancelBtn = document.querySelector("#quickTeamCancel");
const addProjectTeamMembersButton = document.querySelector("#addProjectTeamMembers");
const selectedProjectTeamMembers = document.querySelector("#selectedProjectTeamMembers");
const projectStartDateInput = document.querySelector("#projectStartDate");
const projectEndDateInput = document.querySelector("#projectEndDate");
const projectStatusInput = document.querySelector("#projectStatus");
const projectPriorityInput = document.querySelector("#projectPriority");
const projectBudgetInput = document.querySelector("#projectBudget");
const projectProgressInput = document.querySelector("#projectProgress");
const projectLifecycleInput = document.querySelector("#projectLifecycle");
const projectGoalInput = document.querySelector("#projectGoal");
const projectScopeInput = document.querySelector("#projectScope");
const projectSuccessCriteriaInput = document.querySelector("#projectSuccessCriteria");
const projectGateChecklistInput = document.querySelector("#projectGateChecklist");
const projectClosureNotesInput = document.querySelector("#projectClosureNotes");
const projectStakeholdersInput = document.querySelector("#projectStakeholders");
const projectCommunicationPlanInput = document.querySelector("#projectCommunicationPlan");
const projectDecisionLogInput = document.querySelector("#projectDecisionLog");
const projectChangeControlInput = document.querySelector("#projectChangeControl");
const projectRiskOpportunityInput = document.querySelector("#projectRiskOpportunity");
const projectQualityChecklistInput = document.querySelector("#projectQualityChecklist");
const projectCompetenceMatrixInput = document.querySelector("#projectCompetenceMatrix");
const projectGovernanceScore = document.querySelector("#projectGovernanceScore");
const focusNewProjectButton = document.querySelector("#focusNewProject");
const projectList = document.querySelector("#projectList");
const projectCount = document.querySelector("#projectCount");
const customerNameInput = document.querySelector("#customerName");
const customerContactInput = document.querySelector("#customerContact");
const customerEmailInput = document.querySelector("#customerEmail");
const addCustomerButton = document.querySelector("#addCustomer");
const customerList = document.querySelector("#customerList");
const customerCount = document.querySelector("#customerCount");
const managedFileInput = document.querySelector("#managedFileInput");
const managedFileStatus = document.querySelector("#managedFileStatus");
const addManagedFilesButton = document.querySelector("#addManagedFiles");
const managedFileList = document.querySelector("#managedFileList");
const fileCount = document.querySelector("#fileCount");
const registerProjectInput = document.querySelector("#registerProject");
const registerTypeInput = document.querySelector("#registerType");
const registerTitleInput = document.querySelector("#registerTitle");
const registerOwnerInput = document.querySelector("#registerOwner");
const registerStatusInput = document.querySelector("#registerStatus");
const registerImpactInput = document.querySelector("#registerImpact");
const registerDueDateInput = document.querySelector("#registerDueDate");
const registerMitigationInput = document.querySelector("#registerMitigation");
const addRegisterItemButton = document.querySelector("#addRegisterItem");
const registerList = document.querySelector("#registerList");
const registerCount = document.querySelector("#registerCount");
const trashList = document.querySelector("#trashList");
const trashCount = document.querySelector("#trashCount");
const dateRequestList = document.querySelector("#dateRequestList");
const dateRequestCount = document.querySelector("#dateRequestCount");
const loginScreen = document.querySelector("#loginScreen");
const authPanel = document.querySelector("#authPanel");
const authTabs = document.querySelectorAll("[data-auth-tab]");
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");
const loginLanguageSelect = document.querySelector("#loginLanguageSelect");
const registerForm = document.querySelector("#registerForm");
const registerCompanyInput = document.querySelector("#registerCompany");
const registerSubdomainInput = document.querySelector("#registerSubdomain");
const registerFullNameInput = document.querySelector("#registerFullName");
const registerUsernameInput = document.querySelector("#registerUsername");
const registerEmailInput = document.querySelector("#registerEmail");
const registerPasswordInput = document.querySelector("#registerPassword");
const registerError = document.querySelector("#registerError");
const logoutButton = document.querySelector("#logoutButton");
const notifyButton = document.querySelector("#notifyButton");
const notifyUnreadCount = document.querySelector("#notifyUnreadCount");
const openTaskComposerButton = document.querySelector("#openTaskComposer");
const closeTaskComposerButton = document.querySelector("#closeTaskComposer");
const taskComposerModal = document.querySelector("#taskComposerModal");
const closeProjectComposerButton = document.querySelector("#closeProjectComposer");
const cancelProjectCreateButton = document.querySelector("#cancelProjectCreate");
const projectComposerModal = document.querySelector("#projectComposerModal");
const taskDetailModal = document.querySelector("#taskDetailModal");
const taskDetailTitle = document.querySelector("#taskDetailTitle");
const taskDetailBody = document.querySelector("#taskDetailBody");
const closeTaskDetailButton = document.querySelector("#closeTaskDetail");
const notificationModal = document.querySelector("#notificationModal");
const notificationList = document.querySelector("#notificationList");
const closeNotificationPanelButton = document.querySelector("#closeNotificationPanel");
const openAdminPanelButton = document.querySelector("#openAdminPanel");
const closeAdminPanelButton = document.querySelector("#closeAdminPanel");
const adminModal = document.querySelector("#adminModal");
const openManagerPanelButton = document.querySelector("#openManagerPanel");
const closeManagerPanelButton = document.querySelector("#closeManagerPanel");
const managerPanelModal = document.querySelector("#managerPanelModal");
const managerSectionModal = document.querySelector("#managerSectionModal");
const managerSectionTitle = document.querySelector("#managerSectionTitle");
const managerSectionBody = document.querySelector("#managerSectionBody");
const closeManagerSectionButton = document.querySelector("#closeManagerSection");
const adminSectionModal = document.querySelector("#adminSectionModal");
const adminSectionTitle = document.querySelector("#adminSectionTitle");
const adminSectionBody = document.querySelector("#adminSectionBody");
const closeAdminSectionButton = document.querySelector("#closeAdminSection");
const managerAssignModal = document.querySelector("#managerAssignModal");
const closeManagerAssignButton = document.querySelector("#closeManagerAssign");
const cancelManagerAssignButton = document.querySelector("#cancelManagerAssign");
const saveProjectManagersButton = document.querySelector("#saveProjectManagers");
const managerAssignTitle = document.querySelector("#managerAssignTitle");
const managerAssignList = document.querySelector("#managerAssignList");
const selectedManagersPreview = document.querySelector("#selectedManagersPreview");
const exportDataButton = document.querySelector("#exportData");
const exportExcelButton = document.querySelector("#exportExcel");
const exportPdfButton = document.querySelector("#exportPdf");
const importDataInput = document.querySelector("#importData");
const saveImportMappingButton = document.querySelector("#saveImportMapping");
const importProjectColumnInput = document.querySelector("#importProjectColumn");
const importTaskColumnInput = document.querySelector("#importTaskColumn");
const importOwnerColumnInput = document.querySelector("#importOwnerColumn");
const importDependencyColumnInput = document.querySelector("#importDependencyColumn");
const createManualBackupButton = document.querySelector("#createManualBackup");
const restoreBackupInput = document.querySelector("#restoreBackupInput");
const backupList = document.querySelector("#backupList");
const backupCount = document.querySelector("#backupCount");
const backupSummary = document.querySelector("#backupSummary");
const currentUserBadge = document.querySelector("#currentUserBadge");
const newUsernameInput = document.querySelector("#newUsername");
const newUserPasswordInput = document.querySelector("#newUserPassword");
const newUserRoleInput = document.querySelector("#newUserRole");
const newUserFullNameInput = document.querySelector("#newUserFullName");
const newUserPositionInput = document.querySelector("#newUserPosition");
const newUserEmailInput = document.querySelector("#newUserEmail");
const newUserAddressInput = document.querySelector("#newUserAddress");
const addUserButton = document.querySelector("#addUser");
const userList = document.querySelector("#userList");
const userCount = document.querySelector("#userCount");
const themeModeInput = document.querySelector("#themeMode");
const themeToggle = document.querySelector("#themeToggle");
const backgroundStyleInput = document.querySelector("#backgroundStyle");
const accentColorInput = document.querySelector("#accentColor");
const workflowStatusNameInput = document.querySelector("#workflowStatusName");
const addWorkflowStatusButton = document.querySelector("#addWorkflowStatus");
const workflowStatusList = document.querySelector("#workflowStatusList");
const capacityHoursInput = document.querySelector("#capacityHours");
const emailEnabledInput = document.querySelector("#emailEnabled");
const emailRecipientsInput = document.querySelector("#emailRecipients");
const emailProviderInput = document.querySelector("#emailProvider");
const mailSubjectTemplateInput = document.querySelector("#mailSubjectTemplate");
const mailBodyTemplateInput = document.querySelector("#mailBodyTemplate");
const testMailBodyInput = document.querySelector("#testMailBody");
const telegramEnabledInput = document.querySelector("#telegramEnabled");
const telegramBotTokenInput = document.querySelector("#telegramBotToken");
const telegramChatIdInput = document.querySelector("#telegramChatId");
const ldapEnabledInput = document.querySelector("#ldapEnabled");
const ldapUrlInput = document.querySelector("#ldapUrl");
const ldapBaseDnInput = document.querySelector("#ldapBaseDn");
const ldapUserFilterInput = document.querySelector("#ldapUserFilter");
const ldapBindDnInput = document.querySelector("#ldapBindDn");
const ldapBindPasswordInput = document.querySelector("#ldapBindPassword");
const ldapGroupRoleMapInput = document.querySelector("#ldapGroupRoleMap");
const saveSettingsButton = document.querySelector("#saveSettings");
const testMailButton = document.querySelector("#testMail");
const testLdapButton = document.querySelector("#testLdap");
const settingsStatus = document.querySelector("#settingsStatus");
const refreshAuditLogsButton = document.querySelector("#refreshAuditLogs");
const refreshMailHistoryButton = document.querySelector("#refreshMailHistory");
const auditLogList = document.querySelector("#auditLogList");
const mailHistoryList = document.querySelector("#mailHistoryList");
const adminLaunchCounts = {
  dateRequests: document.querySelector("#dateRequestLaunchCount"),
  companies: document.querySelector("#companyLaunchCount"),
  projects: document.querySelector("#projectLaunchCount"),
  users: document.querySelector("#userLaunchCount"),
  customers: document.querySelector("#customerLaunchCount"),
  files: document.querySelector("#fileLaunchCount"),
  teams: document.querySelector("#teamLaunchCount"),
  links: document.querySelector("#linkLaunchCount"),
  registers: document.querySelector("#registerLaunchCount"),
  trash: document.querySelector("#trashLaunchCount")
};
const companyCount = document.querySelector("#companyCount");
const companyRegistryList = document.querySelector("#companyRegistryList");
const platformConsole = document.querySelector("#platformConsole");
const platformStats = document.querySelector("#platformStats");
const platformApprovalQueue = document.querySelector("#platformApprovalQueue");
const platformOps = document.querySelector("#platformOps");
const platformLifecycle = document.querySelector("#platformLifecycle");
const platformCreateWizard = document.querySelector("#platformCreateWizard");
const platformMonitoring = document.querySelector("#platformMonitoring");
const platformBackupCenter = document.querySelector("#platformBackupCenter");
const platformGlobalSettings = document.querySelector("#platformGlobalSettings");
const platformSecurityCenter = document.querySelector("#platformSecurityCenter");
const platformNotificationCenter = document.querySelector("#platformNotificationCenter");
const platformCompanyGrid = document.querySelector("#platformCompanyGrid");
const platformTimeline = document.querySelector("#platformTimeline");
const refreshPlatformCompaniesButton = document.querySelector("#refreshPlatformCompanies");
const openPlatformAdminPanelButton = document.querySelector("#openPlatformAdminPanel");
let companyRegistry = [];

appState.tasks = loadTasks();
appState.members = loadMembers();
appState.teams = loadTeams();
appState.projects = loadProjects();
appState.projectLinks = loadProjectLinks();
appState.customers = loadCustomers();
appState.managedFiles = loadManagedFiles();
appState.registers = loadRegisters();
appState.users = loadUsers();
appState.trash = loadTrash();
let currentUser = loadSession();
let appSettings = loadSettings();
statuses = normalizeWorkflowStatuses(appSettings.workflowStatuses);
let currentFilter = "Hamısı";
let currentPriorityFilter = "Hamısı";
let currentSmartFilter = "Hamısı";
let currentOwnerFilter = ""; // set from workload click; "" means no filter
let taskListPage = 1;
const TASK_PAGE_SIZE = 20;
let selectedTaskIds = new Set();
let currentView = "dashboard";
let currentLanguage = localStorage.getItem(languageKey) || "az";
let activeManagerProjectId = "";
let selectedProjectTeamMemberIds = [];
let activeProjectEditId = "";
let selectedCalendarDay = "";
let expandedGanttProject = "";
let calendarRange = (() => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
  return { start: `${y}-${m}-01`, end: `${y}-${m}-${lastDay}` };
})();
let backendSyncReady = false;
let backendSaveTimer = 0;
let authToken = localStorage.getItem(authTokenKey) || "";
let supabaseSession = loadSupabaseSession();
let supabaseWorkspaceId = localStorage.getItem(supabaseWorkspaceKey) || "";
// Cari workspace kvota limiti (0 = limitsiz/local rejim). supabaseLoginWorkspace təyin edir.
let workspaceMaxUsers = 0;
let workspacePlan = "standard";
// RLS `profiles.role`-a və workspace təsdiqinə baxır, appRole-a YOX. Klient
// qoruması eyni şərtə baxmalıdır, əks halda uğursuz olacağı bəlli sorğular
// göndərilir və istifadəçi 403 səbəbini bilmədən dəyişikliklərini itirir.
let workspaceDbRole = "";        // profiles.role (admin / manager / user / super_admin)
let workspaceApproved = false;   // workspaces.approval_status === "active"
let workspaceMemberActive = false; // profiles.status === "active" (yazma icazəsi)
let supabaseSaveTimer = null;
// Remote app_state ən azı bir dəfə oxunana qədər HEÇ NƏ yazmırıq — əks halda
// boot-dakı yerli/demo state real datanı əzir.
let supabaseStateLoaded = false;
let supabaseRemoteTaskCount = 0;
let supabaseStateVersion = null;
let supabaseSettingsSaveTimer = null;
function loadSyncedIdSet(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}
function persistSyncedIdSet(key, set) {
  // Yalnız son 500 id saxlanılır — localStorage-i şişirtməmək üçün kifayətdir.
  try { localStorage.setItem(key, JSON.stringify([...set].slice(-500))); } catch { /* kvota */ }
}
let supabaseAuditSyncedIds = loadSyncedIdSet(supabaseAuditSyncedKey);
let supabaseNotificationSyncedIds = loadSyncedIdSet(supabaseNotificationSyncedKey);
let auditLogs = [];
let mailHistory = [];
let localAuditLogs = loadLocalAuditLogs();
let notifications = loadNotifications();
let draggedDashboardPanel = "";
let ganttDayWidth = Math.min(28, Math.max(2, Number(localStorage.getItem("project-manager-gantt-day-width") || 3)));
let ganttDragState = null;
let ganttManuallyCollapsed = false;
let activeAdminSection = null;
let activeAdminSectionPlaceholder = null;
// DİQQƏT: enforceClinicOnlyState() appState.projects-i YALNIZ Klinika layihəsinə
// (companyId "company-default") endirir. Supabase tenant-ında (məs. company-studentstay)
// bu layihə scope-dan kənarda qalır → backupPayload() bütün taskları süzüb ATIR və
// növbəti save app_state-i BOŞ yazır (data itkisi). Ona görə Supabase sessiyası varsa
// boot-da bu demo enforce-u işlətmirik — real state remote-dan yüklənəcək.
if (!supabaseSession?.access_token && !supabaseWorkspaceId) {
  enforceClinicOnlyState();
}
if (currentUser) ensureTenantSeedData();
saveUsers();

function text(key) {
  return translations[currentLanguage][key] || translations.az[key] || key;
}

// statusLabel → modules/labels.js

function normalizeWorkflowStatuses(values = defaultWorkflowStatuses) {
  const cleaned = (Array.isArray(values) ? values : defaultWorkflowStatuses)
    .map((status) => String(status || "").trim())
    .filter(Boolean);
  const unique = [...new Set([...cleaned, ...defaultWorkflowStatuses])];
  return unique.filter((status) => status !== "Bitib").concat("Bitib");
}

function normalizeDashboardPanelSizes(value = {}) {
  const allowed = new Set(["compact", "normal", "wide"]);
  return Object.fromEntries(
    Object.entries(value || {}).filter(([key, size]) => key && allowed.has(size))
  );
}

function applyDashboardPanelSizes() {
  const sizes = normalizeDashboardPanelSizes(appSettings.dashboardPanelSizes);
  dashboardPanels.forEach((panel) => {
    const wide = (sizes[panel.dataset.dashboardPanel] || "normal") === "wide";
    panel.classList.remove("panel-compact"); // köhnə compact vəziyyəti ləğv edildi
    panel.classList.toggle("panel-wide", wide);
    // Tək toggle düyməsi: geniş isə "kiçilt", normal isə "böyüt" göstərir (ikon CSS ilə dəyişir).
    const toggle = panel.querySelector("[data-panel-size-toggle]");
    if (toggle) {
      toggle.classList.toggle("active", wide);
      toggle.setAttribute("aria-pressed", String(wide));
      toggle.title = text(wide ? "panelCompact" : "panelWide");
      toggle.setAttribute("aria-label", toggle.title);
    }
  });
}

function normalizeDashboardPanelOrder(value = []) {
  const available = [...dashboardPanels].map((panel) => panel.dataset.dashboardPanel);
  const order = Array.isArray(value) ? value.filter((item) => available.includes(item)) : [];
  return [...new Set([...order, ...available])];
}

function applyDashboardPanelOrder() {
  const order = normalizeDashboardPanelOrder(appSettings.dashboardPanelOrder);
  dashboardPanels.forEach((panel) => {
    const index = order.indexOf(panel.dataset.dashboardPanel);
    panel.style.order = index >= 0 ? index : 0;
  });
}

function syncWorkflowStatuses() {
  statuses = normalizeWorkflowStatuses(appSettings.workflowStatuses);
  appSettings.workflowStatuses = statuses;
}

// priorityLabel, registerTypeLabel, impactLabel, registerStatusLabel → modules/labels.js

function applyTranslations() {
  syncWorkflowStatuses();
  renderStatusControls();
  document.documentElement.lang = currentLanguage;
  languageSelect.value = currentLanguage;
  loginLanguageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = text(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = text(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", text(node.dataset.i18nAria));
  });

  formTitle.textContent = taskId.value ? text("editTask") : text("newTask");
  updateSelectLabels();
  updateFilterLabels();
  updateViewLabels();
  updateRoleLabels();
  syncSettingsForm();
  renderWorkflowStatusList();
  if (typeof applyChatWidgetLang === "function") applyChatWidgetLang();
}

function applyAppSettings() {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const darkMode = appSettings.themeMode === "dark" || (appSettings.themeMode === "system" && prefersDark);
  document.body.classList.toggle("dark-mode", darkMode);
  document.body.dataset.background = appSettings.backgroundStyle;
  document.body.dataset.accent = appSettings.accentColor;
  // checked = işıqlı rejim (günəş), unchecked = qaranlıq (ay)
  if (themeToggle) themeToggle.checked = !darkMode;
}

function syncSettingsForm() {
  themeModeInput.value = appSettings.themeMode;
  backgroundStyleInput.value = appSettings.backgroundStyle;
  accentColorInput.value = appSettings.accentColor;
  emailEnabledInput.checked = Boolean(appSettings.emailEnabled);
  emailRecipientsInput.value = appSettings.emailRecipients;
  emailProviderInput.value = appSettings.emailProvider;
  mailSubjectTemplateInput.value = appSettings.mailSubjectTemplate || "Project Manager deadline alerts";
  mailBodyTemplateInput.value = appSettings.mailBodyTemplate || "{{alerts}}";
  testMailBodyInput.value = appSettings.testMailBody || "Project Manager mail ayarları test edildi.";
  if (telegramEnabledInput) telegramEnabledInput.checked = Boolean(appSettings.telegramEnabled);
  if (telegramBotTokenInput) telegramBotTokenInput.value = appSettings.telegramBotToken || "";
  if (telegramChatIdInput) telegramChatIdInput.value = appSettings.telegramChatId || "";
  ldapEnabledInput.checked = Boolean(appSettings.ldapEnabled);
  ldapUrlInput.value = appSettings.ldapUrl;
  ldapBaseDnInput.value = appSettings.ldapBaseDn;
  ldapUserFilterInput.value = appSettings.ldapUserFilter;
  ldapBindDnInput.value = appSettings.ldapBindDn || "";
  ldapBindPasswordInput.value = "";
  ldapGroupRoleMapInput.value = appSettings.ldapGroupRoleMap || "";
  capacityHoursInput.value = Number(appSettings.capacityHours) || 40;
  syncReportPrefsForm();
}

// ── Per-user report/notification preferences (stored in user.profile.reportPrefs) ──
const DEFAULT_REPORT_PREFS = {
  timezone: "Asia/Baku",
  language: "az",
  morning: { enabled: false, hour: 9 },
  evening: { enabled: false, hour: 18 },
  deadlineAlerts: { enabled: false, daysBefore: [3, 1] },
  changeAlerts: { enabled: false }
};

// Rəhbərlik rolu üçün gündəlik hesabat MƏCBURİDİR — hər günün əvvəli və sonu
// mütləq mail getməlidir, istifadəçi söndürə bilməz. Ona görə oxunuş burada,
// yazılış isə enforceRehberlikReportPrefs()-də məcbur edilir (blob-da da
// enabled:true durmalıdır, çünki mail edge function birbaşa blob-u oxuyur).
function reportsAreMandatory(user) {
  return user?.role === "rehberlik";
}

function getReportPrefs(user) {
  const p = user?.profile?.reportPrefs || {};
  const forced = reportsAreMandatory(user);
  return {
    timezone: p.timezone || DEFAULT_REPORT_PREFS.timezone,
    language: ["az", "ru", "en"].includes(p.language) ? p.language : "az",
    morning: { enabled: forced || Boolean(p.morning?.enabled), hour: Number(p.morning?.hour ?? 9) },
    evening: { enabled: forced || Boolean(p.evening?.enabled), hour: Number(p.evening?.hour ?? 18) },
    deadlineAlerts: { enabled: Boolean(p.deadlineAlerts?.enabled), daysBefore: Array.isArray(p.deadlineAlerts?.daysBefore) ? p.deadlineAlerts.daysBefore : [3, 1] },
    changeAlerts: { enabled: Boolean(p.changeAlerts?.enabled) }
  };
}

// Blob-dakı rəhbərlik istifadəçilərinin hesabat quşlarını məcburi açıq saxlayır.
// Mail göndərən edge function app_state blob-unu birbaşa oxuyur — orada
// enabled:false qalsa, UI "açıq" göstərsə də mail GETMƏZ. Rol dəyişəndən və
// serverdən state yüklənəndən sonra çağırılır. Dəyişiklik olubsa true qaytarır.
function enforceRehberlikReportPrefs() {
  let changed = false;
  appState.users = appState.users.map((user) => {
    if (!reportsAreMandatory(user)) return user;
    const prefs = user.profile?.reportPrefs || {};
    if (prefs.morning?.enabled && prefs.evening?.enabled) return user;
    changed = true;
    return {
      ...user,
      profile: {
        ...(user.profile || {}),
        reportPrefs: {
          timezone: prefs.timezone || DEFAULT_REPORT_PREFS.timezone,
          language: prefs.language || DEFAULT_REPORT_PREFS.language,
          morning: { enabled: true, hour: Number(prefs.morning?.hour ?? 9) },
          evening: { enabled: true, hour: Number(prefs.evening?.hour ?? 18) },
          deadlineAlerts: prefs.deadlineAlerts || { ...DEFAULT_REPORT_PREFS.deadlineAlerts },
          changeAlerts: prefs.changeAlerts || { ...DEFAULT_REPORT_PREFS.changeAlerts }
        }
      }
    };
  });
  if (changed && currentUser && reportsAreMandatory(currentUser)) {
    const stored = appState.users.find((user) => user.id === currentUser.id);
    if (stored) currentUser = stored;
  }
  return changed;
}

function fillHourOptions(select, selected) {
  if (!select || select.dataset.filled) return;
  select.innerHTML = "";
  for (let h = 0; h < 24; h++) {
    const opt = document.createElement("option");
    opt.value = String(h);
    opt.textContent = `${String(h).padStart(2, "0")}:00`;
    select.appendChild(opt);
  }
  select.dataset.filled = "1";
  if (selected != null) select.value = String(selected);
}

// `currentUser` appState.users massivindən AYRI obyekt ola bilər: importBackup()
// massivi blob-dan tam əvəz edir və sessiya obyekti massivdən qopur. Onda
// currentUser.profile-a yazılan hər şey (hesabat bildiriş quşları, email və s.)
// saveUsers()-ə DÜŞMÜR — istifadəçi "yadda saxlandı" görür, növbəti render-də
// isə hər şey sıfırlanır. Bu funksiya sessiya obyektini massivə geri yazır.
function commitCurrentUser() {
  if (!currentUser) return;
  appState.users = [...appState.users.filter((user) => user.id !== currentUser.id), currentUser];
}

function syncReportPrefsForm() {
  const emailInput = document.querySelector("#reportEmail");
  if (!emailInput || !currentUser) return;
  const prefs = getReportPrefs(currentUser);
  emailInput.value = currentUser.profile?.email || "";
  fillHourOptions(document.querySelector("#reportMorningHour"), prefs.morning.hour);
  fillHourOptions(document.querySelector("#reportEveningHour"), prefs.evening.hour);
  document.querySelector("#reportMorningHour").value = String(prefs.morning.hour);
  document.querySelector("#reportEveningHour").value = String(prefs.evening.hour);
  const morningBox = document.querySelector("#reportMorningEnabled");
  const eveningBox = document.querySelector("#reportEveningEnabled");
  morningBox.checked = prefs.morning.enabled;
  eveningBox.checked = prefs.evening.enabled;
  document.querySelector("#reportDeadlineEnabled").checked = prefs.deadlineAlerts.enabled;
  document.querySelector("#reportChangeEnabled").checked = prefs.changeAlerts.enabled;
  const langSelect = document.querySelector("#reportLanguage");
  if (langSelect) langSelect.value = prefs.language;

  // Rəhbərlik gündəlik hesabatı söndürə bilmir — quşlar açıq və deaktivdir.
  // Saat seçimi açıq qalır: "nə vaxt" dəyişdirilə bilər, "göndərilsinmi" yox.
  const forced = reportsAreMandatory(currentUser);
  [morningBox, eveningBox].forEach((box) => {
    box.disabled = forced;
    box.title = forced ? text("reportMandatoryHint") : "";
  });
  const hint = document.querySelector("#reportMandatoryHint");
  if (hint) hint.hidden = !forced;
}

function saveReportPrefs() {
  if (!currentUser) return;
  const emailInput = document.querySelector("#reportEmail");
  const status = document.querySelector("#reportPrefsStatus");
  const email = emailInput.value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (status) status.textContent = text("reportEmailInvalid");
    return;
  }
  const prev = getReportPrefs(currentUser);
  // disabled checkbox-un .checked-inə güvənmirik — məcburi rolda həmişə true.
  const forced = reportsAreMandatory(currentUser);
  currentUser.profile = {
    ...(currentUser.profile || {}),
    email,
    reportPrefs: {
      timezone: prev.timezone || "Asia/Baku",
      language: document.querySelector("#reportLanguage")?.value || prev.language || "az",
      morning: { enabled: forced || document.querySelector("#reportMorningEnabled").checked, hour: Number(document.querySelector("#reportMorningHour").value) },
      evening: { enabled: forced || document.querySelector("#reportEveningEnabled").checked, hour: Number(document.querySelector("#reportEveningHour").value) },
      deadlineAlerts: { enabled: document.querySelector("#reportDeadlineEnabled").checked, daysBefore: prev.deadlineAlerts.daysBefore },
      changeAlerts: { enabled: document.querySelector("#reportChangeEnabled").checked }
    }
  };
  commitCurrentUser();
  saveUsers();
  if (status) {
    status.textContent = text("reportPrefsSaved");
    setTimeout(() => { if (status) status.textContent = ""; }, 3000);
  }
}

// ── Instant change alerts (mühüm task/layihə dəyişikliyi → anlıq mail) ──
// Qərar: "Mühümlər anlıq, qalanı digest". Yalnız istifadəçidən asılı hissə
// (məsul şəxs, deadline/status, komanda üzvlüyü) dəyişəndə mail göndərilir.
function userDisplayName(id) {
  const u = appState.users.find((user) => user.id === id);
  return u?.profile?.fullName || u?.username || id;
}

function projectForTask(task) {
  return appState.projects.find((p) => p.id === task.project || p.name === task.project) || null;
}

// Verilmiş id dəstindən changeAlerts aktiv + email olan istifadəçilərin mail-ları.
function alertRecipientsFromIds(ids, excludeUserId) {
  const set = new Set(ids);
  set.delete(excludeUserId);
  return appState.users
    .filter((u) => set.has(u.id) && u.profile?.email && getReportPrefs(u).changeAlerts.enabled)
    .map((u) => u.profile.email.trim())
    .filter(Boolean);
}

function sendChangeAlert(recipients, subject, body) {
  const list = [...new Set(recipients)].filter(Boolean);
  if (!list.length) return;
  callSupabaseFunction(supabaseConfig().mailFunction, {
    type: "change-alert",
    recipients: list.join(","),
    subject,
    text: body
  }).catch((err) => console.warn("change-alert göndərilmədi", err));
}

// Task-ın istifadəçidən asılı mühüm dəyişiklikləri (məsul şəxs, deadline, status).
function importantTaskChanges(oldTask, newTask) {
  if (!oldTask) return null;
  const changes = [];
  if ((oldTask.owner || "") !== (newTask.owner || "")) {
    changes.push(`Məsul şəxs: ${oldTask.owner || "—"} → ${newTask.owner || "—"}`);
  }
  if ((oldTask.end || "") !== (newTask.end || "")) {
    changes.push(`Bitmə tarixi (deadline): ${oldTask.end || "—"} → ${newTask.end || "—"}`);
  }
  if ((oldTask.status || "") !== (newTask.status || "")) {
    changes.push(`Status: ${statusLabel(oldTask.status) || "—"} → ${statusLabel(newTask.status) || "—"}`);
  }
  return changes.length ? changes : null;
}

function notifyTaskChange(oldTask, newTask) {
  try {
    const changes = importantTaskChanges(oldTask, newTask);
    if (!changes) return;
    const project = projectForTask(newTask);
    if (!project) return;
    const recipients = alertRecipientsFromIds(
      [...(project.managerIds || []), ...(project.teamMemberIds || [])],
      currentUser?.id
    );
    if (!recipients.length) return;
    const body = [
      `Tapşırıqda dəyişiklik: ${newTask.name}`,
      `Layihə: ${project.name}`,
      "",
      ...changes.map((c) => `• ${c}`),
      "",
      `Dəyişikliyi edən: ${currentUser?.profile?.fullName || currentUser?.username || "—"}`,
      "",
      "— Project Manager"
    ].join("\n");
    sendChangeAlert(recipients, `🔔 Dəyişiklik: ${newTask.name}`, body);
  } catch (err) {
    console.warn("notifyTaskChange", err);
  }
}

function notifyProjectChange(before, project) {
  try {
    if (!before || !project) return;
    const oldTeam = new Set([...(before.managerIds || []), ...(before.teamMemberIds || [])]);
    const newTeam = new Set([...(project.managerIds || []), ...(project.teamMemberIds || [])]);
    const added = [...newTeam].filter((id) => !oldTeam.has(id));
    const removed = [...oldTeam].filter((id) => !newTeam.has(id));
    const changes = [];
    if ((before.end || "") !== (project.end || "")) {
      changes.push(`Bitmə tarixi (deadline): ${before.end || "—"} → ${project.end || "—"}`);
    }
    if ((before.status || "") !== (project.status || "")) {
      changes.push(`Status: ${before.status || "—"} → ${project.status || "—"}`);
    }
    if (added.length) changes.push(`Komandaya əlavə olundu: ${added.map(userDisplayName).join(", ")}`);
    if (removed.length) changes.push(`Komandadan çıxarıldı: ${removed.map(userDisplayName).join(", ")}`);
    if (!changes.length) return;
    // Cari üzvlər + çıxarılanlar (çıxarılan da xəbər tutsun), dəyişikliyi edən istisna.
    const recipients = alertRecipientsFromIds([...newTeam, ...removed], currentUser?.id);
    if (!recipients.length) return;
    const body = [
      `Layihədə dəyişiklik: ${project.name}`,
      "",
      ...changes.map((c) => `• ${c}`),
      "",
      `Dəyişikliyi edən: ${currentUser?.profile?.fullName || currentUser?.username || "—"}`,
      "",
      "— Project Manager"
    ].join("\n");
    sendChangeAlert(recipients, `🔔 Layihə dəyişikliyi: ${project.name}`, body);
  } catch (err) {
    console.warn("notifyProjectChange", err);
  }
}

function changeLanguage(language) {
  currentLanguage = language;
  localStorage.setItem(languageKey, currentLanguage);
  render();
}

function updateSelectLabels() {
  [...statusInput.options].forEach((option) => {
    option.textContent = statusLabel(option.value);
  });
  [...priorityInput.options].forEach((option) => {
    option.textContent = priorityLabel(option.value);
  });
  [...projectStatusInput.options].forEach((option) => {
    option.textContent = statusLabel(option.value);
  });
  [...projectPriorityInput.options].forEach((option) => {
    option.textContent = priorityLabel(option.value);
  });
}

function renderStatusControls() {
  const taskStatus = statusInput.value || "Plan";
  const projectStatus = projectStatusInput.value || "Plan";
  statusInput.innerHTML = statuses.map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(statusLabel(status))}</option>`).join("");
  projectStatusInput.innerHTML = statuses.map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(statusLabel(status))}</option>`).join("");
  statusInput.value = statuses.includes(taskStatus) ? taskStatus : "Plan";
  projectStatusInput.value = statuses.includes(projectStatus) ? projectStatus : "Plan";

  const counts = filterCounts();

  statusFilters.innerHTML = filterMenuMarkup({
    groupLabel: text("status"),
    attr: "data-filter",
    dataKey: "status",
    activeValue: currentFilter,
    activeLabel: currentFilter === "Hamısı" ? text("all") : statusLabel(currentFilter),
    totalCount: counts.status(currentFilter),
    items: [
      { value: "Hamısı", label: text("all"), count: counts.status("Hamısı") },
      ...statuses.map((status) => ({ value: status, label: statusLabel(status), count: counts.status(status) }))
    ]
  });

  if (priorityFilters) {
    const priorities = ["Kritik", "Yüksək", "Normal", "Aşağı"];
    priorityFilters.innerHTML = filterMenuMarkup({
      groupLabel: text("priority"),
      attr: "data-priority-filter",
      dataKey: "priority",
      activeValue: currentPriorityFilter,
      activeLabel: currentPriorityFilter === "Hamısı" ? text("all") : priorityLabel(currentPriorityFilter),
      totalCount: counts.priority(currentPriorityFilter),
      items: [
        { value: "Hamısı", label: text("all"), count: counts.priority("Hamısı") },
        ...priorities.map((priority) => ({ value: priority, label: priorityLabel(priority), count: counts.priority(priority) }))
      ]
    });
  }

  if (smartFilters) {
    const smartItems = [
      ["Hamısı", text("all")],
      ["blocked", text("blockedTasks")],
      ["overdue", text("overdueTasks")],
      ["risk", text("riskFocus")],
      ["mine", text("myTasks")]
    ];
    const smartLabel = (smartItems.find(([value]) => value === currentSmartFilter) || smartItems[0])[1];
    smartFilters.innerHTML = filterMenuMarkup({
      groupLabel: text("smartFilters"),
      attr: "data-smart-filter",
      dataKey: "smart",
      activeValue: currentSmartFilter,
      activeLabel: smartLabel,
      totalCount: counts.smart(currentSmartFilter),
      items: smartItems.map(([value, label]) => ({ value, label, count: counts.smart(value) }))
    });
  }
  renderActiveFilterBar();
  filters = document.querySelectorAll(".filter");
  priorityFilterButtons = document.querySelectorAll("[data-priority-filter]");
  smartFilterButtons = document.querySelectorAll("[data-smart-filter]");
}

// Dil dəyişəndə YALNIZ etiket span-ı yenilənir — sayğac span-ı olduğu kimi
// qalır. Əvvəl bütün button.textContent əvəz olunurdu, bu isə sayğacları silərdi.
function setChipLabel(button, label) {
  const labelNode = button.querySelector(".filter-label");
  if (labelNode) labelNode.textContent = label;
  else button.textContent = label;
}

function updateFilterLabels() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    setChipLabel(button, button.dataset.filter === "Hamısı" ? text("all") : statusLabel(button.dataset.filter));
  });
  document.querySelectorAll("[data-priority-filter]").forEach((button) => {
    setChipLabel(button, button.dataset.priorityFilter === "Hamısı" ? text("all") : priorityLabel(button.dataset.priorityFilter));
  });
  document.querySelectorAll("[data-smart-filter]").forEach((button) => {
    const labels = {
      "Hamısı": text("all"),
      blocked: text("blockedTasks"),
      overdue: text("overdueTasks"),
      risk: text("riskFocus"),
      mine: text("myTasks")
    };
    setChipLabel(button, labels[button.dataset.smartFilter] || button.dataset.smartFilter);
  });
}

// Aktiv filtrlərin xülasəsi + tək kliklə təmizləmə. Yalnız nəsə seçiləndə
// görünür — heç nə seçilməyəndə panel yer tutmasın.
function renderActiveFilterBar() {
  const bar = document.querySelector("#activeFilterBar");
  if (!bar) return;
  const smartLabels = {
    blocked: text("blockedTasks"), overdue: text("overdueTasks"),
    risk: text("riskFocus"), mine: text("myTasks")
  };
  const chips = [];
  if (currentFilter !== "Hamısı") chips.push([text("status"), statusLabel(currentFilter), "status"]);
  if (currentPriorityFilter !== "Hamısı") chips.push([text("priority"), priorityLabel(currentPriorityFilter), "priority"]);
  if (currentSmartFilter !== "Hamısı") chips.push([text("smartFilters"), smartLabels[currentSmartFilter] || currentSmartFilter, "smart"]);
  if (projectFilter.value && projectFilter.value !== "Hamısı") chips.push([text("project"), projectFilter.value, "project"]);
  if (searchInput.value.trim()) chips.push([text("searchLabel"), `"${searchInput.value.trim()}"`, "search"]);

  bar.hidden = chips.length === 0;
  if (!chips.length) { bar.innerHTML = ""; return; }
  bar.innerHTML = [
    `<span class="active-filter-count">${visibleTasks().length} / ${accessibleTasks().length}</span>`,
    ...chips.map(([group, value, key]) => `
      <span class="active-filter-chip">
        <span class="active-filter-group">${escapeHtml(group)}</span>
        <span class="active-filter-value">${escapeHtml(value)}</span>
        <button type="button" class="active-filter-remove" data-clear-filter="${key}" aria-label="${escapeHtml(group)} filtrini götür">×</button>
      </span>`),
    `<button type="button" class="active-filter-reset" data-clear-filter="all">${text("clearFilters")}</button>`
  ].join("");
}

function updateViewLabels() {
  const labels = {
    dashboard: text("dashboard"),
    projects: text("projects"),
    list: text("list"),
    kanban: text("kanban"),
    calendar: text("calendar"),
    gantt: text("gantt"),
    reports: text("reports")
  };
  viewTabs.forEach((button) => {
    const label = labels[button.dataset.view];
    if (!label) return;
    const iconNode = button.querySelector?.(".menu-icon");
    if (iconNode?.dataset?.menuIcon) iconNode.textContent = iconNode.dataset.menuIcon;
    const labelNode = button.querySelector?.("span:last-child");
    if (labelNode) {
      labelNode.textContent = label;
    } else {
      button.textContent = label;
    }
  });
}

function updateRoleLabels() {
  [...newUserRoleInput.options].forEach((option) => {
    if (option.value === "admin") option.textContent = text("adminRole");
    if (option.value === "super_admin") option.textContent = text("superAdminRole");
    if (option.value === "manager") option.textContent = text("managerRole");
    if (option.value === "rehberlik") option.textContent = text("rehberlikRole");
    if (option.value === "user") option.textContent = text("userRole");
    if (option.value === "contributor") option.textContent = text("contributorRole");
    if (option.value === "viewer") option.textContent = text("viewerRole");
    if (option.value === "sponsor") option.textContent = text("sponsorRole");
  });
}

function renderWorkflowStatusList() {
  if (!workflowStatusList) return;
  workflowStatusList.innerHTML = statuses.map((status) => `
    <span class="workflow-status-chip">
      ${escapeHtml(statusLabel(status))}
      ${protectedWorkflowStatuses.has(status)
        ? `<small>${text("requiredWorkflowStatus")}</small>`
        : `<button type="button" data-workflow-remove="${escapeHtml(status)}">${text("remove")}</button>`}
    </span>
  `).join("");
}

function createDemoTasks() {
  return demoTaskTemplates.map((task) => ({ ...task, id: createId() }));
}

function createClinicPortfolioTasks() {
  const normalized = clinicPortfolioTasks.map((task, index) => normalizeTask({
    id: `clinic-task-${String(index + 1).padStart(2, "0")}`,
    project: clinicPortfolioProject.name,
    status: Number(task.progress) >= 100 ? "Bitib" : (Number(task.progress) > 0 ? "Davam edir" : "Plan"),
    plannedHours: 0,
    actualHours: 0,
    ...task
  }));
  const taskByName = new Map(normalized.map((task) => [task.name, task.id]));
  return normalized.map((task) => ({
    ...task,
    dependencyIds: [
      ...new Set([
        ...(task.dependencyIds || []),
        ...(clinicDependencyMap[task.name] || []).map((name) => taskByName.get(name)).filter(Boolean)
      ])
    ]
  }));
}

function loadClinicPortfolioState() {
  const clinicTaskNames = new Set(clinicPortfolioTasks.map((task) => task.name));
  const currentClinicTasks = appState.tasks
    .filter((task) => task.project === clinicPortfolioProject.name && clinicTaskNames.has(task.name))
    .map((task) => [task.name, task]);
  const currentClinicTaskMap = new Map(currentClinicTasks);

  appState.tasks = createClinicPortfolioTasks().map((task) => {
    const existing = currentClinicTaskMap.get(task.name);
    return existing ? normalizeTask({ ...task, id: existing.id || task.id, comments: existing.comments || [], attachments: existing.attachments || [] }) : task;
  });
  appState.members = [];
  appState.teams = [];
  appState.projects = [normalizeProject({ ...clinicPortfolioProject })];
  appState.projectLinks = [];
  appState.customers = [{ id: "customer-clinic", name: "Klinika", contact: "Klinika İT Şöbəsi", email: "" }];
  appState.managedFiles = [];
  appState.registers = [
    ...appState.registers
      .filter((item) => item.project === clinicPortfolioProject.name && item.type !== "milestone")
      .map(normalizeRegisterItem),
    ...clinicMilestones.map((item, index) => normalizeRegisterItem({
      id: `clinic-milestone-${String(index + 1).padStart(2, "0")}`,
      project: clinicPortfolioProject.name,
      type: "milestone",
      title: item.title,
      status: "Open",
      impact: item.impact,
      dueDate: item.dueDate,
      mitigation: ""
    }))
  ];
  appState.trash = [];
  saveTasks();
  saveResources();
  saveTrash();
  saveRegisters();
}

function resetSelectedProjectState() {
  const selectedProject = projectFilter.value === "Hamısı" ? clinicPortfolioProject.name : projectFilter.value;
  if (!selectedProject || selectedProject === clinicPortfolioProject.name) {
    loadClinicPortfolioState();
    projectFilter.value = clinicPortfolioProject.name;
    return;
  }

  appState.tasks = appState.tasks.filter((task) => task.project !== selectedProject);
  appState.registers = appState.registers.filter((item) => item.project !== selectedProject);
  appState.projectLinks = appState.projectLinks.filter((link) => link.project !== selectedProject);
  appState.projects = appState.projects.filter((project) => project.name !== selectedProject);
  saveTasks();
  saveResources();
  saveRegisters();
}

function enforceClinicOnlyState() {
  const before = JSON.stringify({ tasks: appState.tasks, projects: appState.projects, members: appState.members, teams: appState.teams, projectLinks: appState.projectLinks, customers: appState.customers, managedFiles: appState.managedFiles, registers: appState.registers, trash: appState.trash });
  loadClinicPortfolioState();
  return before !== JSON.stringify({ tasks: appState.tasks, projects: appState.projects, members: appState.members, teams: appState.teams, projectLinks: appState.projectLinks, customers: appState.customers, managedFiles: appState.managedFiles, registers: appState.registers, trash: appState.trash });
}

function ensureDemoData() {
  let changedTasks = false;
  let changedResources = false;
  let changedUsers = false;

  demoUsers.forEach((user) => {
    if (!appState.users.some((item) => item.id === user.id || item.username === user.username)) {
      appState.users.push(normalizeUser({ ...user }));
      changedUsers = true;
    }
  });

  demoCustomers.forEach((customer) => {
    if (!appState.customers.some((item) => item.id === customer.id || item.name === customer.name)) {
      appState.customers.push(normalizeCustomer({ ...customer }));
      changedResources = true;
    }
  });

  demoTeamTemplates.forEach((team) => {
    if (!appState.teams.some((item) => item.id === team.id)) {
      appState.teams.push({ ...team, memberIds: [...team.memberIds] });
      changedResources = true;
    }
  });

  demoProjects.forEach((project) => {
    if (!appState.projects.some((item) => item.id === project.id || item.name === project.name)) {
      appState.projects.push(normalizeProject({ ...project }));
      changedResources = true;
    }
  });

  demoProjectLinks.forEach((link) => {
    if (!appState.projectLinks.some((item) => item.project === link.project && item.resource === link.resource)) {
      appState.projectLinks.push({ ...link });
      changedResources = true;
    }
  });

  demoTaskTemplates.forEach((task) => {
    if (!appState.tasks.some((item) => item.project === task.project && item.name === task.name)) {
      appState.tasks.push(normalizeTask({ ...task, id: createId() }));
      changedTasks = true;
    }
  });

  if (changedTasks) saveTasks();
  if (changedResources) saveResources();
  if (changedUsers) saveUsers();
}

function ensureTenantSeedData() {
  let changedTasks = false;
  let changedResources = false;
  let changedUsers = false;

  // TENANT İZOLYASİYASI: seed massivləri BÜTÜN nümunə şirkətlərin datasını
  // saxlayır. Əvvəllər hamısı fərq qoyulmadan appState-ə əlavə edilirdi →
  // bir şirkət digərlərinin sifarişçilərini/layihələrini görürdü.
  // İndi yalnız cari şirkətə aid sətirlər əlavə olunur.
  const companyId = currentCompanyId();
  const mine = (item) => (item?.companyId || "company-default") === companyId;
  const seedProjectNames = new Set(tenantSeedProjects.filter(mine).map((p) => p.name));

  tenantSeedUsers.filter(mine).forEach((user) => {
    if (!appState.users.some((item) => item.id === user.id || item.username === user.username)) {
      appState.users.push(normalizeUser({ ...user }));
      changedUsers = true;
    }
  });

  tenantSeedCustomers.filter(mine).forEach((customer) => {
    if (!appState.customers.some((item) => item.id === customer.id || item.name === customer.name)) {
      appState.customers.push(normalizeCustomer({ ...customer }));
      changedResources = true;
    }
  });

  tenantSeedProjects.filter(mine).forEach((project) => {
    if (!appState.projects.some((item) => item.id === project.id || item.name === project.name)) {
      appState.projects.push(normalizeProject({ ...project }));
      changedResources = true;
    }
  });

  // Tasklarda companyId yoxdur — layihə adı ilə cari şirkətə bağlayırıq.
  tenantSeedTasks.filter((task) => seedProjectNames.has(task.project)).forEach((task) => {
    if (!appState.tasks.some((item) => item.id === task.id || (item.project === task.project && item.name === task.name))) {
      appState.tasks.push(normalizeTask({ ...task }));
      changedTasks = true;
    }
  });

  if (changedTasks) saveTasks();
  if (changedResources) saveResources();
  if (changedUsers) saveUsers();
  return changedTasks || changedResources || changedUsers;
}

// loadJson → modules/storage.js

// loadMembers → modules/storage.js

// loadTeams → modules/storage.js

function loadProjects() {
  const stored = loadJson(projectsKey, () => []);
  if (stored.length) return stored.map(normalizeProject);
  return [normalizeProject({ ...clinicPortfolioProject })];
}

// loadProjectLinks → modules/storage.js

function loadCustomers() {
  // Default BOŞ olmalıdır. Əvvəllər burada demo "Klinika" sifarişçisi vardı və
  // companyId-siz olduğu üçün istənilən tenant-ın state-inə düşüb onun adına
  // möhürlənirdi (faridasadov şirkətində "Klinika" məhz belə peyda olmuşdu).
  return loadJson(customersKey, () => []).map(normalizeCustomer);
}

// loadManagedFiles → modules/storage.js

function loadUsers() {
  const stored = loadJson(usersKey, () => demoUsers.map((user) => ({ ...user })));
  const merged = [
    ...stored,
    ...[...demoUsers, ...tenantSeedUsers].filter((demoUser) => !stored.some((user) => user.username === demoUser.username))
  ];
  return merged.map((user) => {
    const normalized = normalizeUser(user);
    const tenantMigration = tenantUserCompanyMigrations[normalized.username];
    return tenantMigration
      ? { ...normalized, companyId: tenantMigration.companyId, profile: { ...(normalized.profile || {}), company: tenantMigration.company } }
      : normalized;
  });
}

// companyIdFromName → modules/ids.js

// slugFromName → modules/ids.js

function uniqueUsername(base) {
  const cleanBase = slugFromName(base);
  if (!appState.users.some((user) => user.username === cleanBase)) return cleanBase;
  let index = 2;
  while (appState.users.some((user) => user.username === `${cleanBase}${index}`)) index += 1;
  return `${cleanBase}${index}`;
}

// normalizeUser → modules/normalize.js

// normalizeCustomer → modules/normalize.js

// loadTrash → modules/storage.js

// normalizeRegisterItem → modules/normalize.js

function loadRegisters() {
  return loadJson(registersKey, () => []).map(normalizeRegisterItem);
}

// loadLocalAuditLogs → modules/storage.js

// loadNotifications → modules/storage.js

// saveLocalAuditLogs / saveNotifications → modules/notifications.js


// currentCompanyId / projectCompanyId / taskCompanyId / isSameCompany → modules/tenant.js

// recordAudit → modules/notifications.js


// companyRegistryFromLocalState → modules/company.js

// addNotification / visibleNotifications / renderNotificationBadge → modules/notifications.js

function defaultSettings() {
  return {
    appName: "Project Manager",
    appLogo: "PM",
    defaultLanguage: "az",
    defaultTheme: "light",
    maintenanceMode: false,
    themeMode: "light",
    backgroundStyle: "calm",
    accentColor: "teal",
    workflowStatuses: [...defaultWorkflowStatuses],
    capacityHours: 40,
    emailEnabled: false,
    emailRecipients: "",
    emailProvider: "",
    mailSubjectTemplate: "Project Manager deadline alerts",
    mailBodyTemplate: "{{alerts}}",
    testMailBody: "Project Manager mail ayarları test edildi.",
    dashboardPanelSizes: {},
    dashboardPanelOrder: [],
    importColumnMap: {},
    backups: [],
    ldapEnabled: false,
    ldapUrl: "",
    ldapBaseDn: "",
    ldapUserFilter: "(uid={username})",
    ldapBindDn: "",
    ldapBindPassword: "",
    ldapGroupRoleMap: "",
    companyRegistry: []
  };
}

function loadSettings() {
  const key = currentUser ? `${settingsKey}-${currentUser.id}` : settingsKey;
  return { ...defaultSettings(), ...loadJson(key, defaultSettings) };
}

function saveAppSettings() {
  const key = currentUser ? `${settingsKey}-${currentUser.id}` : settingsKey;
  localStorage.setItem(key, JSON.stringify(appSettings));
  scheduleSupabaseSettingsSave();
}

function loadSession() {
  if (isSupabasePrimaryMode() && !loadSupabaseSession()?.access_token) {
    localStorage.removeItem(sessionKey);
    return null;
  }
  const userId = localStorage.getItem(sessionKey);
  return userId ? appState.users?.find((user) => user.id === userId) || null : null;
}

function loadTasks() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) {
    return createClinicPortfolioTasks();
  }

  try {
    return JSON.parse(stored).map(normalizeTask);
  } catch {
    return createClinicPortfolioTasks();
  }
}

// normalizeTask → modules/normalize.js

// normalizeComment → modules/normalize.js

// normalizeTimeEntry → modules/normalize.js

// normalizeProject → modules/normalize.js

// saveTasks → modules/storage.js

// saveResources → modules/storage.js

// saveUsers → modules/storage.js

// saveTrash → modules/storage.js

// saveRegisters → modules/storage.js

// parseDate, daysBetween, addDays, isoDate → modules/utils.js
// shortDate, formatDateTime, statusDurationLabel → modules/format.js

// companyStatusMeta / companyProjectNames / companyOperationsMeta / platformOpsSummary → modules/company.js

function companyBackupPayload(companyId = "") {
  const projectScope = companyId ? appState.projects.filter((project) => (project.companyId || "company-default") === companyId) : appState.projects;
  // Backup faylı da layihəsiz/silinmiş layihəli taskları atmamalıdır — belə
  // backup natamam olur və bərpa zamanı itki yaradır. Yalnız başqa şirkətin
  // layihəsinə aid tasklar kənarlaşdırılır.
  const foreignNames = new Set(
    companyId ? appState.projects.filter((project) => (project.companyId || "company-default") !== companyId).map((project) => project.name) : []
  );
  const notForeign = (name) => !foreignNames.has(name);
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    companyId: companyId || "platform",
    company: companyId ? (companyRegistryFromLocalState().find((item) => item.id === companyId)?.name || companyId) : "All tenants",
    tasks: appState.tasks.filter((task) => notForeign(task.project)),
    projects: projectScope,
    members: companyId ? appState.members.filter((member) => !member.companyId || member.companyId === companyId) : appState.members,
    teams: companyId ? appState.teams.filter((team) => !team.companyId || team.companyId === companyId) : appState.teams,
    customers: companyId ? appState.customers.filter((customer) => !customer.companyId || customer.companyId === companyId) : appState.customers,
    managedFiles: companyId ? appState.managedFiles.filter((file) => !file.companyId || file.companyId === companyId) : appState.managedFiles,
    projectLinks: appState.projectLinks.filter((link) => notForeign(link.project)),
    registers: appState.registers.filter((item) => notForeign(item.project)),
    users: companyId ? appState.users.filter((user) => user.companyId === companyId) : appState.users,
    companyRegistry: companyId ? companyRegistryFromLocalState().filter((company) => company.id === companyId) : companyRegistryFromLocalState()
  };
}

function storageSizeLabel(value) {
  return fileSizeLabel(new Blob([JSON.stringify(value || {})]).size);
}

function platformAuditRows(actions = []) {
  return [...auditLogs, ...localAuditLogs].filter((item) => !actions.length || actions.some((action) => String(item.action || "").includes(action)));
}

function todayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// daysUntil → modules/format.js

// fileSizeLabel → modules/utils.js

function readFileAsAttachment(file) {
  const maxFileSize = 800 * 1024;
  if (file.size > maxFileSize) {
    return Promise.reject(new Error(text("fileTooLarge")));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve({
        id: createId(),
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        dataUrl: reader.result,
        addedAt: new Date().toISOString()
      });
    });
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

// safeStorageName → modules/utils.js

function readSelectedAttachments(input) {
  if (!input?.files?.length) return Promise.resolve([]);
  if (canUseSupabaseStorage()) return Promise.all([...input.files].map(uploadSupabaseAttachment));
  return Promise.all([...input.files].map(readFileAsAttachment));
}

// escapeHtml, statusClass → modules/utils.js

function priorityClass(priority) {
  if (priority === "Kritik") return "critical";
  if (priority === "Yüksək") return "high";
  if (priority === "Aşağı") return "low";
  return "";
}

// domen lookup / label: getProject, projectExists, customerLabel, resourceLabel,
// userDisplayLabel, resourceTypeLabel, roleLabel → modules/lookups.js

// layihə domen mutasiyaları (createProject, updateProject, projectGateError)
// → modules/project-crud.js

// governance charter logic (parseGovernanceLines, governanceLines, gateRequirementKeys,
// charterFieldComplete, gateRequirementMissing, syncGovernanceRisks, projectGovernanceAudit)
// → modules/governance.js

function projectGovernancePayloadFromForm() {
  const fieldValue = (input) => input?.value || "";
  const trimmedValue = (input) => fieldValue(input).trim();
  return {
    name: fieldValue(projectNameInput),
    lifecycle: fieldValue(projectLifecycleInput) || "Initiation",
    charter: {
      goal: trimmedValue(projectGoalInput),
      scope: trimmedValue(projectScopeInput),
      successCriteria: trimmedValue(projectSuccessCriteriaInput),
      gateChecklist: parseGovernanceLines(fieldValue(projectGateChecklistInput)),
      closureNotes: trimmedValue(projectClosureNotesInput),
      stakeholders: parseGovernanceLines(fieldValue(projectStakeholdersInput)),
      communicationPlan: parseGovernanceLines(fieldValue(projectCommunicationPlanInput)),
      decisionLog: parseGovernanceLines(fieldValue(projectDecisionLogInput)),
      changeControl: parseGovernanceLines(fieldValue(projectChangeControlInput)),
      riskOpportunity: parseGovernanceLines(fieldValue(projectRiskOpportunityInput)),
      qualityChecklist: parseGovernanceLines(fieldValue(projectQualityChecklistInput)),
      competenceMatrix: parseGovernanceLines(fieldValue(projectCompetenceMatrixInput)),
      gateApprovals: activeProjectEditId ? (appState.projects.find((item) => item.id === activeProjectEditId)?.charter?.gateApprovals || {}) : {}
    }
  };
}

function updateGovernanceScorePreview() {
  if (!projectGovernanceScore) return;
  const audit = projectGovernanceAudit(projectGovernancePayloadFromForm());
  projectGovernanceScore.textContent = `${text("ipmaScore")}: ${audit.score}%`;
}

function managerUsers(managerId) {
  return appState.users.filter((user) => user.managerId === managerId);
}

function projectManagers(project) {
  return appState.users.filter((user) => (project.managerIds || []).includes(user.id));
}

// customerLabel → modules/lookups.js

// canSeeProject / visibleProjects / canSeeTask / accessibleTasks → modules/tenant.js

function openProjectPage(projectName) {
  projectFilter.value = projectName;
  const targetView = ["list", "kanban", "calendar", "gantt"].includes(currentView) ? currentView : "list";
  currentView = targetView;
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === targetView));
  projectInput.value = projectName;
  renderResourceControls();
  render();
}

function openTaskComposerForProject(projectName = "") {
  resetForm();
  if (projectName && projectExists(projectName)) {
    projectInput.value = projectName;
    renderResourceControls();
    projectInput.value = projectName;
  }
  openTaskComposer();
}

function resourceValue(type, id) {
  return `${type}:${id}`;
}

// resourceLabel / userDisplayLabel / resourceTypeLabel / roleLabel → modules/lookups.js

// <option> HTML-string / resurs siyahısı qurucuları (managerOptions,
// managerMultiOptions, allResourceOptions, teamMemberOptions, taskOptionItems)
// → modules/option-builders.js

function ensureSelectOption(select, value, label = "") {
  if (!select || !value || [...select.options].some((option) => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label || value;
  select.appendChild(option);
}

// taskNameById / incompleteDependencies / isTaskBlocked / canStartTask / shouldValidateDependencies / dependencyBlockedMessage / rescheduleDependentTasks → modules/dependencies.js

// linkedResourcesForProject / resourceIncludesUser / visibleUserIdsForCurrentUser / resourceInCurrentScope → modules/scope.js

// projectHasRoleAccess / taskHasDirectAccess / projectHasResourceAccess → modules/tenant.js

// visibleRegisters / registerCounts / projectHasOpenRisk → modules/scope.js

// task & portfolio metrics (taskMatchesSmartFilter, portfolioMetrics,
// plannedHoursForTask, actualHoursForTask, workloadRows) → modules/metrics.js

// isAdmin → modules/tenant.js

// ─── Telebe-Hotel Role Modeli (Seçim A) ──────────────────────────────────────
// superadmin  →  super_admin  (platform — bütün şirkətlər)
// org admin   →  admin        (şirkət — öz tenant-ini tam idarə edir)
// moderator   →  manager      (layihə/tapşırıq idarəsi, istifadəçi idarə edə bilməz)
// support     →  contributor  (yalnız tapşırıqlara kömək)
// student     →  user         (son istifadəçi)
// ─────────────────────────────────────────────────────────────────────────────

// Telebe-Hotel: requireOrgAdmin middleware ekvivalenti
// Öz şirkətini tam idarə edir: istifadəçilər, parametrlər, layihələr
function isOrgAdmin() {
  return currentUser?.role === "admin";
}

// isSuperAdmin → modules/tenant.js

// rol əsaslı icazə gate-ləri (canOpenAdminPanel, canManagePlatformSettings,
// canManageOrgSettings, canManageMailSettings, canManageOrgUsers, canManageProjects,
// canManageTasks, canContribute, canApproveGovernance, canManageRegister,
// canChangeRegisterStatus, canApproveDateRequest, canApproveTask) → modules/permissions.js

function openAdminPanel() {
  if (!currentUser || !canOpenAdminPanel()) return;
  closeAdminSection();
  raiseModal(adminModal);
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden", "false");
  closeAdminPanelButton.focus();
  const companyInput = document.querySelector("#companyNameInput");
  if (companyInput) companyInput.value = currentCompanyName();
  fetchAuditLogs();
  fetchMailHistory();
}

function currentCompanyName() {
  const registry = companyRegistry.length ? companyRegistry : companyRegistryFromLocalState();
  const reg = registry.find((c) => c.id === currentCompanyId());
  return reg?.name || currentUser?.profile?.company || "";
}

async function saveCompanyName() {
  if (!currentUser || !(isAdmin() || isSuperAdmin())) return;
  const input = document.querySelector("#companyNameInput");
  const newName = (input?.value || "").trim();
  if (!newName) { showToast("Şirkət adı boş ola bilməz"); return; }
  const btn = document.querySelector("#saveCompanyNameBtn");
  if (btn) btn.disabled = true;
  try {
    if (canUseSupabase() && supabaseWorkspaceId) {
      await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(supabaseWorkspaceId)}`, {
        method: "PATCH",
        body: JSON.stringify({ name: newName })
      });
    }
    const cid = currentCompanyId();
    const base = companyRegistry.length ? companyRegistry : companyRegistryFromLocalState();
    companyRegistry = base.map((c) => (c.id === cid ? { ...c, name: newName } : c));
    appSettings.companyRegistry = companyRegistry;
    if (currentUser.profile) currentUser.profile.company = newName;
    saveUsers();
    saveAppSettings();
    recordAudit("company.renamed", "company", cid, newName);
    showToast("Şirkət adı yeniləndi: " + newName);
    render();
  } catch (error) {
    showToast("Alınmadı: " + (error?.message || ""));
  } finally {
    if (btn) btn.disabled = false;
  }
}

function closeAdminPanel() {
  closeAdminSection();
  adminModal.classList.remove("open");
  adminModal.setAttribute("aria-hidden", "true");
}

// ─── Manager Paneli ───────────────────────────────────────────────────────────
function openManagerPanel() {
  if (!currentUser || currentUser.role !== "manager") return;
  renderManagerPanel();
  raiseModal(managerPanelModal);
  managerPanelModal.classList.add("open");
  managerPanelModal.setAttribute("aria-hidden", "false");
  closeManagerPanelButton?.focus();
}

function closeManagerPanel() {
  closeManagerSection();
  managerPanelModal.classList.remove("open");
  managerPanelModal.setAttribute("aria-hidden", "true");
}

// ─── Şəxsi Parametrlər (hər rol üçün) ────────────────────────────────────────
// Report/bildiriş VƏ görünüş (tema/fon/rəng) kartları admin Settings blokundan
// bura köçürülür və bağlananda geri qaytarılır. Beləcə user/manager/admin —
// hamısı öz report vaxtını VƏ temasını təyin edə bilir, DOM/ID tək nüsxə qalır
// (duplikat forma buq mənbəyidir). Kartlar array-lə idarə olunur.
const PERSONAL_SETTINGS_CARDS = ["reportPrefsCard", "appearanceCard", "passwordCard"];
let personalSettingsPlaceholders = [];
function openPersonalSettings() {
  if (!currentUser) return;
  const modal = document.querySelector("#personalSettingsModal");
  const body = document.querySelector("#personalSettingsBody");
  if (!modal || !body) return;
  PERSONAL_SETTINGS_CARDS.forEach((id) => {
    const card = document.getElementById(id);
    if (!card) return;
    if (!personalSettingsPlaceholders.some((p) => p.id === id)) {
      const ph = document.createComment("personal-settings:" + id);
      card.before(ph);
      personalSettingsPlaceholders.push({ id, ph });
    }
    body.appendChild(card);
  });
  syncReportPrefsForm();
  // Görünüş selektlərini cari appSettings-dən sinxronla (admin sahələrinə toxunmadan).
  if (themeModeInput) themeModeInput.value = appSettings.themeMode;
  if (backgroundStyleInput) backgroundStyleInput.value = appSettings.backgroundStyle;
  if (accentColorInput) accentColorInput.value = appSettings.accentColor;
  raiseModal(modal);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#closePersonalSettings")?.focus();
}
function closePersonalSettings() {
  const modal = document.querySelector("#personalSettingsModal");
  personalSettingsPlaceholders.forEach(({ ph, id }) => {
    const card = document.getElementById(id);
    if (card && ph.parentNode) ph.replaceWith(card);
  });
  personalSettingsPlaceholders = [];
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

let activeMgrSection = null;
let activeMgrSectionPlaceholder = null;

function openManagerSection(id) {
  if (!id || !managerSectionBody) return;
  const section = document.getElementById(id);
  if (!section) return;
  // Əvvəlki section-ı bərpa et
  closeManagerSection();
  activeMgrSection = section;
  activeMgrSectionPlaceholder = document.createComment(`mgr-section:${id}`);
  section.before(activeMgrSectionPlaceholder);
  section.open = true;
  managerSectionTitle.textContent = section.querySelector("summary span")?.textContent || "Bölmə";
  managerSectionBody.appendChild(section);
  raiseModal(managerSectionModal);
  managerSectionModal.classList.add("open");
  managerSectionModal.setAttribute("aria-hidden", "false");
  closeManagerSectionButton?.focus();
}

function closeManagerSection() {
  if (!activeMgrSection || !activeMgrSectionPlaceholder) return;
  activeMgrSectionPlaceholder.replaceWith(activeMgrSection);
  activeMgrSectionPlaceholder = null;
  activeMgrSection = null;
  if (managerSectionModal) {
    managerSectionModal.classList.remove("open");
    managerSectionModal.setAttribute("aria-hidden", "true");
  }
}

function renderManagerPanel() {
  const companyId = currentCompanyId();
  const myProjects = visibleProjects().filter((p) =>
    (p.managerIds || []).includes(currentUser.id)
  );
  const myTeam = appState.users.filter(
    (u) => u.managerId === currentUser.id && u.companyId === companyId
  );
  const myRegisters = visibleRegisters().filter((r) => r.status !== "Resolved");
  const myTeamGroups = appState.teams.filter((t) => isSameCompany(t));
  const myCustomers = appState.customers.filter((c) => (c.companyId || "company-default") === companyId);
  const myLinks = appState.projectLinks.filter((l) => isSameCompany(l));
  const myTrash = appState.trash.filter((t) => !t.companyId || t.companyId === companyId);
  const myDateRequests = (appSettings.dateRequests || []).filter(
    (r) => r.status === "pending"
  );

  // Badge-ləri yenilə
  const setCount = (id, count) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.textContent = count;
  };
  setCount("mgrProjectCount", `${myProjects.length} layihə`);
  setCount("mgrTeamCount", `${myTeam.length} üzv`);
  setCount("mgrDateRequestCount", myDateRequests.length);
  setCount("mgrRegisterCount", myRegisters.length);
  setCount("mgrTeamGroupCount", myTeamGroups.length);
  setCount("mgrCustomerCount", myCustomers.length);
  setCount("mgrLinkCount", myLinks.length);
  setCount("mgrTrashCount", myTrash.length);
  setCount("mgrProjectCountBadge", myProjects.length);
  setCount("mgrTeamCountBadge", myTeam.length);
  setCount("mgrDateRequestCountBadge", myDateRequests.length);
  setCount("mgrRegisterCountBadge", myRegisters.length);
  setCount("mgrTeamGroupCountBadge", myTeamGroups.length);
  setCount("mgrCustomerCountBadge", myCustomers.length);
  setCount("mgrLinkCountBadge", myLinks.length);
  setCount("mgrTrashCountBadge", myTrash.length);

  // Siyahı markup-ları → modules/render-markup.js (mgr*ListMarkup)
  const setHtml = (id, html) => { const el = document.querySelector(`#${id}`); if (el) el.innerHTML = html; };
  setHtml("mgrProjectList", mgrProjectListMarkup(myProjects));
  setHtml("mgrTeamList", mgrTeamListMarkup(myTeam));
  setHtml("mgrDateRequestList", mgrDateRequestListMarkup(myDateRequests));
  setHtml("mgrRegisterList", mgrRegisterListMarkup(myRegisters));
  setHtml("mgrRegisterProject", myProjects.map((p) => `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)}</option>`).join(""));
  setHtml("mgrTeamGroupList", mgrTeamGroupListMarkup(myTeamGroups));
  setHtml("mgrNewTeamMembers", appState.users
    .filter((u) => !["admin", "super_admin"].includes(u.role) && u.companyId === companyId)
    .map((u) => `<option value="${u.id}">${escapeHtml(u.profile?.fullName || u.username)}</option>`).join(""));
  setHtml("mgrCustomerList", mgrCustomerListMarkup(myCustomers));
  setHtml("mgrLinkList", mgrLinkListMarkup(myLinks));
  setHtml("mgrTrashList", mgrTrashListMarkup(myTrash));
}
// ─────────────────────────────────────────────────────────────────────────────

function adminSectionLabel(section) {
  const title = section?.dataset.adminTitle || section?.querySelector("summary span")?.textContent || text("adminPanel");
  return title.trim();
}

function restoreAdminSection() {
  if (!activeAdminSection || !activeAdminSectionPlaceholder) return;
  activeAdminSectionPlaceholder.replaceWith(activeAdminSection);
  activeAdminSectionPlaceholder = null;
  activeAdminSection = null;
}

function openAdminSection(key) {
  if (!currentUser || !key) return;
  const section = [...document.querySelectorAll("[data-admin-section]")].find((item) => item.dataset.adminSection === key);
  if (!section) return;
  // Rola görə gizlədilmiş bölmə (məs. .platform-only) açılmamalıdır: CSS içini
  // gizlədir, amma modal başlıqla birlikdə BOŞ açılırdı.
  if (getComputedStyle(section).display === "none") return;
  restoreAdminSection();
  activeAdminSection = section;
  activeAdminSectionPlaceholder = document.createComment(`admin-section:${key}`);
  section.before(activeAdminSectionPlaceholder);
  section.open = true;
  adminSectionTitle.textContent = adminSectionLabel(section);
  adminSectionBody.appendChild(section);
  raiseModal(adminSectionModal);
  adminSectionModal.classList.add("open");
  adminSectionModal.setAttribute("aria-hidden", "false");
  closeAdminSectionButton.focus();
}

function closeAdminSection() {
  if (!adminSectionModal) return;
  restoreAdminSection();
  adminSectionModal.classList.remove("open");
  adminSectionModal.setAttribute("aria-hidden", "true");
}

function managerPickerIds() {
  return [...managerAssignList.querySelectorAll("input[name='projectManager']:checked")].map((input) => input.value);
}

function updateSelectedManagersPreview(selectedIds = managerPickerIds()) {
  const selected = appState.users.filter((user) => selectedIds.includes(user.id));
  selectedManagersPreview.innerHTML = selected.length
    ? selected.map((user) => `<span class="selected-manager-chip">${escapeHtml(user.profile?.fullName || user.username)}</span>`).join("")
    : `<div class="empty">${text("noManagersSelected")}</div>`;
}

// managerChoiceItems → modules/render-markup.js

function openManagerAssign(projectId) {
  if (!isAdmin()) return;
  const project = appState.projects.find((item) => item.id === projectId);
  if (!project) return;
  activeManagerProjectId = project.id;
  managerAssignTitle.textContent = project.name;
  managerAssignList.innerHTML = managerChoiceItems(project.managerIds || []);
  updateSelectedManagersPreview(project.managerIds || []);
  managerAssignModal.classList.add("open");
  managerAssignModal.setAttribute("aria-hidden", "false");
  closeManagerAssignButton.focus();
}

function closeManagerAssign() {
  activeManagerProjectId = "";
  managerAssignModal.classList.remove("open");
  managerAssignModal.setAttribute("aria-hidden", "true");
}

function raiseModal(modal) {
  if (modal?.parentElement !== document.body && typeof document.body?.appendChild === "function") {
    document.body.appendChild(modal);
  }
}

function openTaskComposer() {
  if (!currentUser) return;
  raiseModal(taskComposerModal);
  taskComposerModal.classList.add("open");
  taskComposerModal.setAttribute("aria-hidden", "false");
  taskName.focus();
}

function closeTaskComposer() {
  taskComposerModal.classList.remove("open");
  taskComposerModal.setAttribute("aria-hidden", "true");
}

function renderSelectedProjectTeamMembers() {
  selectedProjectTeamMembers.innerHTML = selectedProjectTeamMemberIds.length
    ? selectedProjectTeamMemberIds.map((id) => `
      <span class="selected-manager-chip project-team-chip">
        ${escapeHtml(resourceLabel(id))}
        <button type="button" data-project-team-remove="${escapeHtml(id)}">${text("removeTeamMember")}</button>
      </span>
    `).join("")
    : `<div class="empty">${text("empty")}</div>`;
}

function resetProjectForm() {
  projectForm.reset();
  activeProjectEditId = "";
  selectedProjectTeamMemberIds = [];
  projectFormTitle.textContent = text("newProject");
  projectTemplateInput.value = "";
  projectStatusInput.value = "Plan";
  projectPriorityInput.value = "Normal";
  projectBudgetInput.value = "";
  projectProgressInput.value = 0;
  projectDescriptionInput.value = "";
  quickCustomerForm.hidden = true;
  quickCustomerNameInput.value = "";
  quickCustomerContactInput.value = "";
  quickManagerForm.hidden = true;
  quickManagerFullNameInput.value = "";
  quickManagerUsernameInput.value = "";
  quickManagerPasswordInput.value = "";
  projectCustomerInput.value = "";
  projectLeaderInput.value = currentUser?.role === "manager" ? currentUser.id : "";
  projectLifecycleInput.value = "Initiation";
  projectGoalInput.value = "";
  projectScopeInput.value = "";
  projectSuccessCriteriaInput.value = "";
  projectGateChecklistInput.value = "";
  projectClosureNotesInput.value = "";
  projectStakeholdersInput.value = "";
  projectCommunicationPlanInput.value = "";
  projectDecisionLogInput.value = "";
  projectChangeControlInput.value = "";
  projectRiskOpportunityInput.value = "";
  projectQualityChecklistInput.value = "";
  projectCompetenceMatrixInput.value = "";
  renderSelectedProjectTeamMembers();
  updateGovernanceScorePreview();
}

function openProjectComposer() {
  if (!currentUser || !canManageTasks()) return;
  resetProjectForm();
  renderResourceControls();
  // Yeni layihədə IPMA / governance tələbləri görünsün deyə bölməni aç
  document.querySelector(".project-governance-details")?.setAttribute("open", "");
  raiseModal(projectComposerModal);
  projectComposerModal.classList.add("open");
  projectComposerModal.setAttribute("aria-hidden", "false");
  projectNameInput.focus();
}

function openProjectEditor(projectName) {
  const project = appState.projects.find((item) => item.name === projectName);
  if (!project || !canManageTasks()) return;
  activeProjectEditId = project.id;
  selectedProjectTeamMemberIds = [...(project.teamMemberIds || [])];
  renderResourceControls();
  projectFormTitle.textContent = text("editProject");
  projectTemplateInput.value = "";
  projectNameInput.value = project.name;
  projectDescriptionInput.value = project.description || "";
  projectCustomerInput.value = project.customerId || "";
  projectLeaderInput.value = project.managerIds?.[0] || "";
  projectStartDateInput.value = project.start || "";
  projectEndDateInput.value = project.end || "";
  projectStatusInput.value = project.status || "Plan";
  projectPriorityInput.value = project.priority || "Normal";
  projectBudgetInput.value = project.budget || "";
  projectProgressInput.value = Number(project.progress) || 0;
  projectLifecycleInput.value = project.lifecycle || "Initiation";
  projectGoalInput.value = project.charter?.goal || "";
  projectScopeInput.value = project.charter?.scope || "";
  projectSuccessCriteriaInput.value = project.charter?.successCriteria || "";
  projectGateChecklistInput.value = (project.charter?.gateChecklist || []).join("\n");
  projectClosureNotesInput.value = project.charter?.closureNotes || "";
  projectStakeholdersInput.value = governanceLines(project.charter?.stakeholders);
  projectCommunicationPlanInput.value = governanceLines(project.charter?.communicationPlan);
  projectDecisionLogInput.value = governanceLines(project.charter?.decisionLog);
  projectChangeControlInput.value = governanceLines(project.charter?.changeControl);
  projectRiskOpportunityInput.value = governanceLines(project.charter?.riskOpportunity);
  projectQualityChecklistInput.value = governanceLines(project.charter?.qualityChecklist);
  projectCompetenceMatrixInput.value = governanceLines(project.charter?.competenceMatrix);
  renderSelectedProjectTeamMembers();
  updateGovernanceScorePreview();
  raiseModal(projectComposerModal);
  projectComposerModal.classList.add("open");
  projectComposerModal.setAttribute("aria-hidden", "false");
  projectNameInput.focus();
}

function closeProjectComposer() {
  projectComposerModal.classList.remove("open");
  projectComposerModal.setAttribute("aria-hidden", "true");
  activeProjectEditId = "";
}

// Login → app keçidində app-ın giriş animasiyasını (viewEnter/panelRise) yenidən oynat.
// Refresh-də animasiya görünür, çünki view birbaşa render olunur; login-də isə view
// auth ekranının arxasında "keçib" gedir — ona görə reflow ilə məcburi replay edirik.
function replayAppEntrance() {
  requestAnimationFrame(() => {
    const view = document.querySelector(".active-view");
    if (!view) return;
    [view, ...view.querySelectorAll(".dashboard-panel")].forEach((el) => {
      el.style.animation = "none";
      void el.offsetWidth; // reflow
      el.style.animation = "";
    });
  });
}

// Giriş/yüklənmə splash-ı (kinetic loader) — refresh-də olduğu kimi login-dən
// sonra da göstərilir. Ən azı 700ms görünür ki, "loading" hissi tam olsun,
// sonra app giriş animasiyası (replayAppEntrance) ilə açılır.
function beginAuthSplash() {
  document.documentElement.classList.add("auth-restoring");
  const shownAt = Date.now();
  return () => {
    const wait = Math.max(0, 700 - (Date.now() - shownAt));
    setTimeout(() => {
      document.documentElement.classList.remove("auth-restoring");
      replayAppEntrance();
    }, wait);
  };
}

function syncAuthView() {
  const wasLoggedIn = document.body.classList.contains("logged-in");
  document.body.classList.toggle("logged-in", Boolean(currentUser));
  document.body.classList.toggle("logged-out", !currentUser);
  if (currentUser && !wasLoggedIn) replayAppEntrance();
  document.body.classList.toggle("super-admin-role", isSuperAdmin());
  document.body.classList.toggle("admin-role", isAdmin());
  document.body.classList.toggle("manager-role", currentUser?.role === "manager");
  document.body.classList.toggle("user-role", currentUser?.role === "user");
  document.body.classList.toggle("contributor-role", currentUser?.role === "contributor");
  document.body.classList.toggle("viewer-role", currentUser?.role === "viewer");
  document.body.classList.toggle("sponsor-role", currentUser?.role === "sponsor");
  document.body.classList.toggle("readonly-role", ["viewer", "sponsor"].includes(currentUser?.role));
  document.body.classList.toggle("non-manager-role", Boolean(currentUser) && !canManageTasks());
  currentUserBadge.textContent = currentUser ? `${currentUser.username} (${roleLabel(currentUser.role)})` : "";
}

// ── Filtr sayğacları (faceted counts) ────────────────────────────────────────
// Hər çipin yanındakı rəqəm "bu variantı seçsəm neçə task qalacaq" deməkdir.
// Ona görə sayğac ÖZ ölçüsündən başqa bütün aktiv filtrləri tətbiq edir —
// klassik faset axtarışı. Əks halda bir status seçilən kimi qalan statusların
// hamısı 0 görünərdi və panel yanıldıcı olardı.
function facetTasks(ignore = "") {
  const query = searchInput.value.trim().toLowerCase();
  const selectedProject = projectFilter.value;
  return accessibleTasks()
    .filter((task) => ignore === "status" || currentFilter === "Hamısı" || task.status === currentFilter)
    .filter((task) => ignore === "priority" || currentPriorityFilter === "Hamısı" || task.priority === currentPriorityFilter)
    .filter((task) => ignore === "smart" || taskMatchesSmartFilter(task))
    .filter((task) => selectedProject === "Hamısı" || getProject(task) === selectedProject)
    .filter((task) => !currentOwnerFilter || task.owner === currentOwnerFilter || task.projectResource === currentOwnerFilter)
    .filter((task) => {
      if (!query) return true;
      return [task.name, task.project, resourceLabel(task.owner), task.notes]
        .some((value) => String(value || "").toLowerCase().includes(query));
    });
}

function filterCounts() {
  const byStatus = facetTasks("status");
  const byPriority = facetTasks("priority");
  const bySmart = facetTasks("smart");
  const count = (list, predicate) => list.filter(predicate).length;
  return {
    status: (value) => value === "Hamısı" ? byStatus.length : count(byStatus, (task) => task.status === value),
    priority: (value) => value === "Hamısı" ? byPriority.length : count(byPriority, (task) => task.priority === value),
    smart: (value) => value === "Hamısı" ? bySmart.length : count(bySmart, (task) => taskMatchesSmartValue(task, value))
  };
}

// Çip markupu — etiket və sayğac ayrı span-lardadır ki, dil dəyişəndə
// updateFilterLabels() yalnız etiketi əvəz etsin, sayğacı silməsin.
function filterChipMarkup(attr, value, label, count, isActive) {
  const classes = ["filter", isActive ? "active" : "", count === 0 ? "filter-empty" : ""].filter(Boolean).join(" ");
  return `<button class="${classes}" ${attr}="${escapeHtml(value)}" type="button">`
    + `<span class="filter-label">${escapeHtml(label)}</span>`
    + `<span class="filter-count">${count}</span>`
    + `</button>`;
}

// Filtr qrupu artıq bütün variantları sətirdə yaymır — bir düymə göstərir,
// klikləyəndə variantlar açılır. Beləliklə axtarış + bütün filtrlər tək sətrə
// yerləşir və panel səhifə boyu uzanmır.
// Variantların data-atributları əvvəlki kimidir, ona görə mövcud klik
// işləyiciləri (statusFilters/priorityFilters/smartFilters) dəyişmədən işləyir.
function filterMenuMarkup({ groupLabel, attr, items, activeValue, activeLabel, totalCount, dataKey }) {
  const isFiltered = activeValue !== "Hamısı";
  return [
    `<div class="filter-menu-wrap" data-filter-menu="${dataKey}">`,
    `<button type="button" class="filter-trigger ${isFiltered ? "is-filtered" : ""}" aria-haspopup="true" aria-expanded="false">`,
    `<span class="filter-trigger-group">${escapeHtml(groupLabel)}</span>`,
    `<span class="filter-trigger-value">${escapeHtml(activeLabel)}</span>`,
    `<span class="filter-count">${totalCount}</span>`,
    `<svg class="filter-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,
    `</button>`,
    `<div class="filter-menu" hidden role="menu">`,
    ...items.map(({ value, label, count }) => filterChipMarkup(attr, value, label, count, activeValue === value)),
    `</div>`,
    `</div>`
  ].join("");
}

function visibleTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedProject = projectFilter.value;

  return accessibleTasks()
    .filter((task) => currentFilter === "Hamısı" || task.status === currentFilter)
    .filter((task) => currentPriorityFilter === "Hamısı" || task.priority === currentPriorityFilter)
    .filter(taskMatchesSmartFilter)
    .filter((task) => selectedProject === "Hamısı" || getProject(task) === selectedProject)
    .filter((task) => !currentOwnerFilter || task.owner === currentOwnerFilter || task.projectResource === currentOwnerFilter)
    .filter((task) => {
      if (!query) return true;
      return [task.name, task.project, resourceLabel(task.owner), task.notes]
        .some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));
}

function renderProjectContextBar() {
  if (!projectContextBar) return;
  const selected = projectFilter.value;
  const inProjectView = ["list", "kanban", "calendar", "gantt"].includes(currentView);
  const hasProject = selected && selected !== "Hamısı";
  projectContextBar.hidden = !(inProjectView && hasProject);
  if (hasProject && contextProjectName) contextProjectName.textContent = selected;
}

function renderProjectFilter() {
  const selected = projectFilter.value || "Hamısı";
  const projectNames = [...new Set([
    ...visibleProjects().map((project) => project.name),
    ...accessibleTasks().map(getProject)
  ])].sort();
  projectFilter.innerHTML = [
    `<option value="Hamısı">${text("allProjects")}</option>`,
    ...projectNames.map((project) => `<option value="${escapeHtml(project)}">${escapeHtml(project)}</option>`)
  ].join("");
  projectFilter.value = projectNames.includes(selected) ? selected : "Hamısı";
}

function renderResourceControls() {
  if (isSuperAdmin()) {
    const registry = companyRegistry.length ? companyRegistry : companyRegistryFromLocalState();
    if (companyCount) companyCount.textContent = registry.length;
    userCount.textContent = appState.users.filter((user) => user.role === "super_admin").length;
    projectCount.textContent = 0;
    customerCount.textContent = 0;
    fileCount.textContent = 0;
    teamCount.textContent = 0;
    linkCount.textContent = 0;
    trashCount.textContent = 0;
    Object.entries(adminLaunchCounts).forEach(([key, node]) => {
      if (node) node.textContent = key === "users" ? userCount.textContent : key === "companies" ? registry.length : 0;
    });
    projectInput.innerHTML = `<option value="">${text("selectProject")}</option>`;
    ownerInput.innerHTML = `<option value="">${text("noOwnerSelect")}</option>`;
    projectResourceInput.innerHTML = `<option value="">${text("noResource")}</option>`;
    parentTaskInput.innerHTML = `<option value="">${text("noParentTask")}</option>`;
    taskDependenciesInput.innerHTML = "";
    teamMembersInput.innerHTML = "";
    projectCustomerInput.innerHTML = `<option value="">${text("empty")}</option>`;
    projectLeaderInput.innerHTML = "";
    registerProjectInput.innerHTML = "";
    customerList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    fileList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    teamList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    projectLinksList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    registerList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    projectList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    trashList.innerHTML = `<div class="empty">${text("empty")}</div>`;
    userList.innerHTML = appState.users.filter((user) => user.role === "super_admin").map((user) => `
      <details class="user-profile-card">
        <summary><span><strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>${escapeHtml(roleLabel(user.role))} · ${escapeHtml(user.username)}</span></summary>
      </details>
    `).join("") || `<div class="empty">${text("empty")}</div>`;
    if (companyRegistryList) {
      companyRegistryList.innerHTML = registry.length ? registry.map((company) => {
        const statusMeta = companyStatusMeta(company);
        return `
          <div class="resource-item company-registry-item">
            <span>
              <strong>${escapeHtml(company.name)}</strong>
              ${escapeHtml(company.subdomain)} · ${escapeHtml(company.status)} · ${escapeHtml(company.plan)}
              <small>${escapeHtml(company.adminUsername || "")} · ${company.userCount || 0} user · ${company.projectCount || 0} project</small>
              <small>${statusMeta.label}: ${escapeHtml(formatDateTime(statusMeta.changedAt) || "-")} · ${statusMeta.duration}</small>
            </span>
            <button type="button" data-company-action="${company.status === "suspended" ? "activate" : "suspend"}" data-id="${escapeHtml(company.id)}">
              ${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}
            </button>
          </div>
        `;
      }).join("") : `<div class="empty">${text("empty")}</div>`;
    }
    return;
  }
  const options = allResourceOptions();
  const scopedProjects = appState.projects.filter(canSeeProject);
  const scopedVisibleProjects = scopedProjects.filter((project) => !project.archived);
  const scopedProjectNames = new Set(scopedProjects.map((project) => project.name));
  const scopedTasks = accessibleTasks();
  const scopedCustomers = appState.customers.filter(isSameCompany);
  const scopedFiles = appState.managedFiles.filter(isSameCompany);
  const scopedTeams = appState.teams.filter(isSameCompany);
  const scopedLinks = appState.projectLinks.filter((link) => (
    link.companyId ? isSameCompany(link) : scopedProjectNames.has(link.project)
  ));
  const scopedRegisters = appState.registers.filter((item) => scopedProjectNames.has(item.project));
  const scopedTrash = appState.trash.filter(isSameCompany);
  const scopedUsers = isAdmin()
    ? appState.users.filter((user) => user.role !== "super_admin" && user.companyId === currentCompanyId())
    : appState.users.filter((user) => user.companyId === currentCompanyId() && (currentUser?.role === "manager" || user.managerId === currentUser?.id || user.id === currentUser?.id));

  userCount.textContent = scopedUsers.length;
  projectCount.textContent = scopedProjects.length;
  customerCount.textContent = scopedCustomers.length;
  fileCount.textContent = scopedFiles.length;
  teamCount.textContent = scopedTeams.length;
  linkCount.textContent = scopedLinks.length;
  trashCount.textContent = scopedTrash.length;
  if (adminLaunchCounts.dateRequests) adminLaunchCounts.dateRequests.textContent = pendingDateRequests().length;
  if (adminLaunchCounts.companies) adminLaunchCounts.companies.textContent = companyRegistry.length || companyRegistryFromLocalState().length;
  if (adminLaunchCounts.projects) adminLaunchCounts.projects.textContent = scopedProjects.length;
  if (adminLaunchCounts.users) adminLaunchCounts.users.textContent = scopedUsers.length;
  if (adminLaunchCounts.customers) adminLaunchCounts.customers.textContent = scopedCustomers.length;
  if (adminLaunchCounts.files) adminLaunchCounts.files.textContent = scopedFiles.length;
  if (adminLaunchCounts.teams) adminLaunchCounts.teams.textContent = scopedTeams.length;
  if (adminLaunchCounts.links) adminLaunchCounts.links.textContent = scopedLinks.length;
  if (adminLaunchCounts.registers) adminLaunchCounts.registers.textContent = scopedRegisters.length;
  if (adminLaunchCounts.trash) adminLaunchCounts.trash.textContent = scopedTrash.length;
  const currentProject = projectInput.value;
  projectInput.innerHTML = [
    `<option value="">${text("selectProject")}</option>`,
    ...scopedVisibleProjects.map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)}</option>`)
  ].join("");
  projectInput.value = scopedVisibleProjects.some((project) => project.name === currentProject) ? currentProject : "";

  const currentOwner = ownerInput.value;
  ownerInput.innerHTML = [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...options.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
  ].join("");
  ensureSelectOption(ownerInput, currentOwner, resourceLabel(currentOwner));
  ownerInput.value = options.some((option) => option.value === currentOwner) ? currentOwner : "";
  if (currentOwner && ownerInput.value !== currentOwner) ownerInput.value = currentOwner;
  // Sahib (məsul şəxs) YALNIZ manager/admin tərəfindən təyin olunur (Farid).
  // Müdafiə qatı: composer hər hansı yolla açılsa belə, owner selekti adi user
  // üçün deaktivdir. Submit onsuz da canManageTasks ilə qorunur.
  ownerInput.disabled = !canManageTasks();

  // Layihə resursunda ŞİRKƏTİN BÜTÜN resursları görünür (rəhbərlik daxil).
  // Əvvəl siyahı yalnız layihəyə bağlı olanlarla məhdudlaşırdı və layihəyə hələ
  // bağlanmamış adamı seçmək mümkün deyildi. İndi hamısı var, sadəcə layihəyə
  // bağlı olanlar ayrıca qrupda yuxarıda dayanır ki, seçim asan olsun.
  const selectedProject = projectInput.value.trim();
  const linked = new Set(selectedProject ? linkedResourcesForProject(selectedProject) : []);
  const projectOptions = options;
  const optionMarkup = (option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`;
  const linkedOptions = options.filter((option) => linked.has(option.value));
  const otherOptions = options.filter((option) => !linked.has(option.value));
  const currentProjectResource = projectResourceInput.value;
  projectResourceInput.innerHTML = [
    `<option value="">${text("noResource")}</option>`,
    linkedOptions.length ? `<optgroup label="${text("linkedToProject")}">${linkedOptions.map(optionMarkup).join("")}</optgroup>` : "",
    otherOptions.length
      ? (linkedOptions.length ? `<optgroup label="${text("otherCompanyResources")}">${otherOptions.map(optionMarkup).join("")}</optgroup>` : otherOptions.map(optionMarkup).join(""))
      : ""
  ].join("");
  ensureSelectOption(projectResourceInput, currentProjectResource, resourceLabel(currentProjectResource));
  projectResourceInput.value = projectOptions.some((option) => option.value === currentProjectResource) ? currentProjectResource : "";
  if (currentProjectResource && projectResourceInput.value !== currentProjectResource) projectResourceInput.value = currentProjectResource;

  const editingTaskId = taskId.value;
  const currentParent = parentTaskInput.value;
  const currentDependencies = [...taskDependenciesInput.selectedOptions].map((option) => option.value);
  parentTaskInput.innerHTML = [
    `<option value="">${text("noParentTask")}</option>`,
    taskOptionItems([currentParent], editingTaskId)
  ].join("");
  parentTaskInput.value = appState.tasks.some((task) => task.id === currentParent && task.id !== editingTaskId) ? currentParent : "";
  taskDependenciesInput.innerHTML = taskOptionItems(currentDependencies, editingTaskId);

  teamMembersInput.innerHTML = teamMemberOptions();
  const currentLeader = projectLeaderInput.value || (currentUser?.role === "manager" ? currentUser.id : "");
  const currentCustomer = projectCustomerInput.value;
  projectCustomerInput.innerHTML = [
    `<option value="">${text("empty")}</option>`,
    ...scopedCustomers.map((customer) => `<option value="${escapeHtml(customer.id)}">${escapeHtml(customer.name)}</option>`)
  ].join("");
  projectCustomerInput.value = scopedCustomers.some((customer) => customer.id === currentCustomer) ? currentCustomer : "";
  projectLeaderInput.innerHTML = managerOptions(currentLeader);
  projectLeaderInput.value = appState.users.some((user) => user.id === currentLeader && user.role === "manager") ? currentLeader : "";
  projectTeamMembersInput.innerHTML = teamMemberOptions();
  renderSelectedProjectTeamMembers();

  linkResourceInput.innerHTML = options.map((option) => (
    `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`
  )).join("");

  const currentRegisterProject = registerProjectInput.value;
  registerProjectInput.innerHTML = scopedVisibleProjects.map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)}</option>`).join("");
  registerProjectInput.value = scopedVisibleProjects.some((project) => project.name === currentRegisterProject) ? currentRegisterProject : scopedVisibleProjects[0]?.name || "";

  const currentRegisterOwner = registerOwnerInput.value;
  registerOwnerInput.innerHTML = [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...options.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
  ].join("");
  registerOwnerInput.value = options.some((option) => option.value === currentRegisterOwner) ? currentRegisterOwner : "";
  registerCount.textContent = scopedRegisters.length;

  // Siyahı markup-ları → modules/render-markup.js: resource*ListMarkup
  projectList.innerHTML = resourceProjectListMarkup(scopedProjects, scopedTasks);
  teamList.innerHTML = resourceTeamListMarkup(scopedTeams);
  projectLinksList.innerHTML = resourceLinksListMarkup(scopedLinks);
  registerList.innerHTML = resourceRegisterListMarkup(scopedRegisters);
  userList.innerHTML = resourceUserListMarkup(scopedUsers);
  trashList.innerHTML = resourceTrashListMarkup(scopedTrash);
  renderDateRequests();
  renderCustomerList();
  renderManagedFileList();
  renderTeamSupabasePanels();
}

function pendingDateRequests() {
  return appState.tasks.flatMap((task) => (task.dateChangeRequests || [])
    .filter((request) => request.status === "pending")
    .map((request) => ({ task, request })))
    .filter(({ task }) => canApproveDateRequest(task));
}

function renderDateRequests() {
  if (!dateRequestList || !dateRequestCount) return;
  const requests = pendingDateRequests();
  dateRequestCount.textContent = requests.length;
  dateRequestList.innerHTML = dateRequestsMarkup(requests);
}

// markup (saf data→HTML) → modules/render-markup.js: customerListMarkup, managedFileListMarkup
function renderCustomerList() {
  const scopedCustomers = appState.customers.filter(isSameCompany);
  customerList.innerHTML = customerListMarkup(scopedCustomers);
}

function renderManagedFileList() {
  const scopedFiles = appState.managedFiles.filter(isSameCompany);
  managedFileList.innerHTML = managedFileListMarkup(scopedFiles);
}

function renderRoleMatrix() {
  const matrixContainer = document.querySelector("#roleMatrixTable");
  const userMgmtContainer = document.querySelector("#roleUserMgmt");
  const roleUserCount = document.querySelector("#roleUserCount");
  if (!matrixContainer || !userMgmtContainer) return;

  // ─── İstifadəçi rol siyahısı (əsas hissə — yuxarıda) ────────────────────────
  if (!isOrgAdmin()) {
    userMgmtContainer.innerHTML = "";
  } else {
    const companyId = currentCompanyId();
    const scopedUsers = appState.users.filter((u) => u.companyId === companyId && u.role !== "super_admin");
    if (roleUserCount) roleUserCount.textContent = scopedUsers.length;

    const roleOptions = ["admin", "manager", "rehberlik", "contributor", "sponsor", "viewer", "user"];
    const roleAccent = { admin: "var(--teal)", manager: "var(--blue,#2563eb)", rehberlik: "#b45309", contributor: "#16a34a", sponsor: "#7c3aed", viewer: "var(--muted)", user: "var(--text)" };

    // markup → render-markup.js: roleUserListMarkup
    userMgmtContainer.innerHTML = roleUserListMarkup(scopedUsers, roleOptions, roleAccent, currentUser?.id);

    // Open/close dropdown on chip click
    userMgmtContainer.querySelectorAll(".role-chip-editable").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const wrap = chip.closest(".role-chip-wrap");
        const dropdown = wrap?.querySelector(".role-chip-dropdown");
        if (!dropdown) return;
        // Close all others
        userMgmtContainer.querySelectorAll(".role-chip-dropdown").forEach((d) => {
          if (d !== dropdown) d.hidden = true;
        });
        dropdown.hidden = !dropdown.hidden;
      });
    });

    // Role option click → auto-save
    userMgmtContainer.querySelectorAll(".role-opt").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const wrap = opt.closest(".role-chip-wrap");
        const userId = wrap?.dataset.userId;
        const newRole = opt.dataset.setRole;
        if (!userId || !newRole) return;
        const targetUser = appState.users.find((u) => u.id === userId);
        if (!targetUser || targetUser.id === currentUser?.id) return;
        const previousRole = targetUser.role;
        targetUser.role = newRole;
        // Rəhbərlik olan kimi gündəlik hesabat quşları blob-da da açılmalıdır.
        enforceRehberlikReportPrefs();
        saveUsers();
        renderRoleMatrix();
        render();
        // Baza uğursuz olsa geri qaytar — UI ilə DB fərqli qalmasın.
        syncRoleToDatabase(userId, newRole).then((ok) => {
          if (ok) { recordAudit("user.role_changed", "user", userId, `${previousRole} → ${newRole}`); return; }
          targetUser.role = previousRole;
          saveUsers();
          renderRoleMatrix();
          render();
        });
      });
    });

    // Close dropdown on outside click (each render rebinds once)
    const closeDropdowns = (e) => {
      if (!e.target.closest(".role-chip-wrap")) {
        userMgmtContainer.querySelectorAll(".role-chip-dropdown").forEach((d) => { d.hidden = true; });
      }
    };
    document.addEventListener("mousedown", closeDropdowns, { once: false });
    // Remove listener when section closes or re-renders
    userMgmtContainer._closeDropdowns && document.removeEventListener("mousedown", userMgmtContainer._closeDropdowns);
    userMgmtContainer._closeDropdowns = closeDropdowns;
  }

  // ─── İcazə cədvəli (arayış üçün — aşağıda) ───────────────────────────────────
  const displayRoles = ["admin", "manager", "rehberlik", "contributor", "sponsor", "viewer", "user"];
  const roleColors = { admin: "var(--teal)", manager: "var(--blue,#2563eb)", rehberlik: "#b45309", contributor: "#16a34a", sponsor: "#7c3aed", viewer: "var(--muted)", user: "var(--text)" };
  const perms = [
    { label: "Bütün layihələri idarə et",  roles: ["admin"] },
    { label: "Öz layihələrini idarə et",   roles: ["admin", "manager"] },
    { label: "Tapşırıqları idarə et",       roles: ["admin", "manager"] },
    { label: "İstifadəçiləri idarə et",    roles: ["admin"] },
    { label: "Rol dəyişdir",               roles: ["admin"] },
    { label: "Müştəriləri idarə et",       roles: ["admin"] },
    { label: "Register idarə et",          roles: ["admin", "manager"] },
    { label: "Müştəri sorğuları",          roles: ["admin", "manager"] },
    { label: "Hesabata bax",               roles: ["admin", "manager", "rehberlik", "sponsor"] },
    { label: "Bütün şirkət layihələrinə bax", roles: ["admin", "rehberlik"] },
    { label: "Layihə/taskə bax",           roles: ["admin", "manager", "rehberlik", "contributor", "sponsor", "viewer", "user"] },
    { label: "Komment yaz",                roles: ["admin", "manager", "rehberlik", "contributor", "user"] },
    { label: "Tarix sorğusu göndər",       roles: ["user", "contributor", "viewer"] },
    { label: "Gündəlik hesabat (məcburi)", roles: ["rehberlik"] },
    { label: "Şirkət ayarları",            roles: ["admin"] },
    { label: "Fayl/backup idarəsi",        roles: ["admin"] },
  ];

  // markup → render-markup.js: permMatrixMarkup
  matrixContainer.innerHTML = permMatrixMarkup(displayRoles, roleColors, perms);
}

function renderSummary() {
  const shownTasks = accessibleTasks();
  const metrics = portfolioMetrics(shownTasks);
  totalCount.textContent = shownTasks.length;
  activeCount.textContent = shownTasks.filter((task) => task.status !== "Bitib").length;
  doneCount.textContent = shownTasks.filter((task) => task.status === "Bitib").length;
  if (blockedCount) blockedCount.textContent = metrics.blocked;
  if (riskCount) riskCount.textContent = metrics.risks + metrics.issues;
  const planned = shownTasks.reduce((sum, task) => sum + plannedHoursForTask(task), 0);
  const actual = shownTasks.reduce((sum, task) => sum + actualHoursForTask(task), 0);
  hoursSummary.textContent = `${planned} / ${actual}`;
  // Sidebar "Komanda yüklənməsi" — statik 40h deyil, cari şirkətin real plan saat yükü.
  if (sidebarCapacityLabel) sidebarCapacityLabel.textContent = `${planned}h`;

  if (!shownTasks.length) {
    dateRange.textContent = "-";
    return;
  }

  const starts = shownTasks.map((task) => parseDate(task.start));
  const ends = shownTasks.map((task) => parseDate(task.end));
  const minStart = new Date(Math.min(...starts));
  const maxEnd = new Date(Math.max(...ends));
  const totalDays = Math.max(1, Math.round((maxEnd - minStart) / 86400000) + 1);
  dateRange.textContent = `${totalDays} ${text("day")}`;
}

// KPI rəqəmlərini 0-dan hədəfə "sayaraq" artır — vanilla Motion (framer-motion sibling).
// window.motionAnimate yoxdursa və ya reduced-motion isə: rəqəm dərhal görünür (fallback).
function animateKpiCountUp(container) {
  if (!container) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  container.querySelectorAll(".kpi-num").forEach((el) => {
    const raw = el.textContent.trim();
    const m = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const suffix = m[2] || "";
    const decimals = (m[1].split(".")[1] || "").length;
    if (reduce || !window.motionAnimate || !isFinite(target)) { el.textContent = raw; return; }
    el.textContent = (0).toFixed(decimals) + suffix;
    window.motionAnimate(0, target, {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => { el.textContent = v.toFixed(decimals) + suffix; },
    });
  });
}

// Peşəkar SVG line-ikonlar (Feather üslubu) — emoji əvəzinə.
function dashIcon(name) {
  const s = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">';
  const paths = {
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    block: '<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.12"/>'
  };
  return `${s}${paths[name] || ""}</svg>`;
}

function renderDashboard() {
  const shownTasks = accessibleTasks();
  const totalReal = shownTasks.length;
  const total = Math.max(1, totalReal);
  const activeTasks = shownTasks.filter((t) => t.status !== "Bitib");
  const doneTasks = shownTasks.filter((t) => t.status === "Bitib");
  const overdueItems = riskyTasks().filter((i) => i.alert.type === "danger");
  const blockedItems = shownTasks.filter(isTaskBlocked);
  const metrics = portfolioMetrics();
  const planned = shownTasks.reduce((sum, t) => sum + plannedHoursForTask(t), 0);
  const actual = shownTasks.reduce((sum, t) => sum + actualHoursForTask(t), 0);
  const doneRatio = Math.round((doneTasks.length / total) * 100);

  // ── KPI strip ──────────────────────────────────────────────────────────────
  const dashKpi = document.querySelector("#dashKpi");
  if (dashKpi) {
    dashKpi.innerHTML = `
      <div class="dash-kpi">
        <span class="kpi-icon">${dashIcon("list")}</span>
        <div class="kpi-body">
          <strong class="kpi-num">${totalReal}</strong>
          <span class="kpi-label">Cəmi task</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,var(--panel))">${dashIcon("activity")}</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:var(--teal)">${activeTasks.length}</strong>
          <span class="kpi-label">Aktiv task</span>
          <div class="kpi-bar"><span style="width:${Math.round(activeTasks.length/total*100)}%;background:var(--teal)"></span></div>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="color:var(--green);background:color-mix(in srgb,var(--green) 12%,var(--panel))">${dashIcon("check")}</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:var(--green)">${doneTasks.length}</strong>
          <span class="kpi-label">Tamamlandı · ${doneRatio}%</span>
          <div class="kpi-bar"><span style="width:${doneRatio}%;background:var(--green)"></span></div>
        </div>
      </div>
      <div class="dash-kpi ${overdueItems.length ? 'kpi-alert' : ''}">
        <span class="kpi-icon" style="color:${overdueItems.length ? 'var(--red)' : 'var(--muted)'};background:color-mix(in srgb,var(--red) 10%,var(--panel))">${dashIcon("clock")}</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:${overdueItems.length ? 'var(--red)' : 'var(--muted)'}">${overdueItems.length}</strong>
          <span class="kpi-label">Gecikmiş</span>
        </div>
      </div>
      <div class="dash-kpi ${blockedItems.length ? 'kpi-warn' : ''}">
        <span class="kpi-icon" style="color:${blockedItems.length ? 'var(--amber)' : 'var(--muted)'};background:color-mix(in srgb,var(--amber) 12%,var(--panel))">${dashIcon("block")}</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:${blockedItems.length ? 'var(--amber)' : 'var(--muted)'}">${blockedItems.length}</strong>
          <span class="kpi-label">Bloklanmış</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon">${dashIcon("timer")}</span>
        <div class="kpi-body">
          <strong class="kpi-num">${planned}</strong>
          <span class="kpi-label">Plan saat · ${actual} fakt</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,var(--panel))">${dashIcon("award")}</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:var(--teal)">${metrics.governanceScore}%</strong>
          <span class="kpi-label">IPMA balı</span>
        </div>
      </div>
    `;
    animateKpiCountUp(dashKpi);
  }

  // ── Status bars — richer ───────────────────────────────────────────────────
  const counts = registerCounts();
  // markup → modules/render-markup.js: statusBarsMarkup, upcomingListMarkup, workloadListMarkup
  statusBars.innerHTML = statusBarsMarkup(statuses, shownTasks, total, counts);

  const upcoming = shownTasks
    .filter((task) => task.status !== "Bitib")
    .sort((a, b) => parseDate(a.end) - parseDate(b.end))
    .slice(0, 6);
  upcomingList.innerHTML = upcomingListMarkup(upcoming);

  workloadList.innerHTML = workloadListMarkup(workloadRows().slice(0, 6));

  renderDeadlineAlerts();
  renderPortfolioHealth();
  renderNextActions();
}

function deadlineAlertType(task) {
  const days = daysUntil(task.end);
  if (task.status === "Bitib") return null;
  if (days < 0) return { type: "danger", label: text("overdue"), days };
  if (days === 0) return { type: "warning", label: text("dueToday"), days };
  if (days <= 3) return { type: "warning", label: text("dueSoon"), days };
  return null;
}

function riskyTasks() {
  return accessibleTasks()
    .map((task) => ({ task, alert: deadlineAlertType(task) }))
    .filter((item) => item.alert)
    .sort((a, b) => daysUntil(a.task.end) - daysUntil(b.task.end));
}

// markup → render-markup.js: deadlineAlertsMarkup, portfolioHealthMarkup
function renderDeadlineAlerts() {
  deadlineAlerts.innerHTML = deadlineAlertsMarkup(riskyTasks().slice(0, 6));
}

function renderPortfolioHealth() {
  if (!portfolioHealth) return;
  portfolioHealth.innerHTML = portfolioHealthMarkup(portfolioMetrics());
}

function nextActionItems() {
  const taskActions = accessibleTasks()
    .filter((task) => task.status !== "Bitib")
    .flatMap((task) => {
      const actions = [];
      const days = daysUntil(task.end);
      if (isTaskBlocked(task)) actions.push({ type: "blocked", priority: 1, label: text("actionBlocked"), title: task.name, meta: dependencyBlockedMessage(task), target: "blocked", taskId: task.id });
      if (days < 0) actions.push({ type: "danger", priority: 2, label: text("actionOverdue"), title: task.name, meta: `${getProject(task)} · ${shortDate(task.end)}`, target: "overdue", taskId: task.id });
      if (days >= 0 && days <= 3) actions.push({ type: "warning", priority: 3, label: text("actionDueSoon"), title: task.name, meta: `${getProject(task)} · ${shortDate(task.end)}`, target: "overdue", taskId: task.id });
      return actions;
    });
  const registerActions = visibleRegisters()
    .filter((item) => item.status !== "Resolved" && item.type === "risk" && item.impact === "High")
    .map((item) => ({ type: "danger", priority: 0, label: text("actionHighRisk"), title: item.title, meta: `${item.project} · ${shortDate(item.dueDate)}`, target: "risk" }));
  return [...registerActions, ...taskActions].sort((a, b) => a.priority - b.priority).slice(0, 7);
}

function renderNextActions() {
  if (!nextActions) return;
  nextActions.innerHTML = nextActionsMarkup(nextActionItems());
}

// markup → render-markup.js: auditLogMarkup, mailHistoryMarkup
function renderActivityLists() {
  if (auditLogList) {
    const visibleLocalAudit = localAuditLogs.filter((item) => isAdmin() || !item.companyId || item.companyId === currentCompanyId());
    const combinedAudit = [...visibleLocalAudit, ...auditLogs].slice(0, 80);
    auditLogList.innerHTML = auditLogMarkup(combinedAudit);
  }
  if (mailHistoryList) {
    mailHistoryList.innerHTML = mailHistoryMarkup(mailHistory);
  }
}

function renderNotificationCenter() {
  if (!notificationList) return;
  notificationList.innerHTML = notificationCenterMarkup(visibleNotifications().slice(0, 80));
}

function renderBackupPanel() {
  const backups = Array.isArray(appSettings.backups) ? appSettings.backups : [];
  if (backupCount) backupCount.textContent = backups.length;
  // Launcher badge-i digər kafellərlə eyni formatda (rəqəm) olsun — əvvəllər
  // burada tarix, boş halda isə "-" görünürdü və sıradan çıxmış dəyər kimi oxunurdu.
  if (backupSummary) backupSummary.textContent = String(backups.length);
  if (!backupList) return;
  backupList.innerHTML = backups.length ? backups.slice(0, 10).map((backup) => `
    <div class="resource-item">
      <span>
        <strong>${escapeHtml(formatDateTime(backup.createdAt) || "-")}</strong>
        ${backup.taskCount || 0} task · ${backup.projectCount || 0} project
      </span>
      <button type="button" data-backup-download="${escapeHtml(backup.id)}">${text("download")}</button>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function renderImportMappingControls() {
  const map = appSettings.importColumnMap || {};
  if (importProjectColumnInput) importProjectColumnInput.value = map.project || "";
  if (importTaskColumnInput) importTaskColumnInput.value = map.task || "";
  if (importOwnerColumnInput) importOwnerColumnInput.value = map.owner || "";
  if (importDependencyColumnInput) importDependencyColumnInput.value = map.dependencies || "";
}

function isoDateFromParts(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function calendarBounds() {
  const start = calendarRange.start || "2026-05-01";
  const end = calendarRange.end || "2026-05-31";
  return start <= end ? { start, end } : { start: end, end: start };
}

function calendarDays() {
  const { start, end } = calendarBounds();
  const days = [];
  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [endYear, endMonth, endDay] = end.split("-").map(Number);
  const cursor = new Date(startYear, startMonth - 1, startDay);
  const limit = new Date(endYear, endMonth - 1, endDay);
  while (cursor <= limit) {
    days.push(isoDateFromParts(cursor.getFullYear(), cursor.getMonth() + 1, cursor.getDate()));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function calendarTasksForDate(date) {
  return accessibleTasks().filter((task) => {
    const start = task.start || task.end;
    const end = task.end || task.start;
    if (!start && !end) return false;
    return date >= (start <= end ? start : end) && date <= (start <= end ? end : start);
  });
}

const AZ_WEEKDAYS = ["Bazar", "B.e", "Ç.a", "Çərş", "C.a", "Cümə", "Şənbə"];
function renderCalendarMarkup(compact = false) {
  return calendarDays().map((date) => {
    const dayTasks = calendarTasksForDate(date);
    const selected = date === selectedCalendarDay;
    const day = Number(date.slice(-2));
    const dow = new Date(date + "T00:00:00").getDay();
    const weekday = currentLanguage === "az"
      ? AZ_WEEKDAYS[dow]
      : new Date(date + "T00:00:00").toLocaleDateString(translations[currentLanguage].locale, { weekday: "short" });
    const isWeekend = dow === 0 || dow === 6;
    return `
      <button class="calendar-day ${compact ? "compact" : ""} ${selected ? "selected" : ""} ${isWeekend ? "weekend" : ""}" type="button" data-calendar-day="${date}">
        <strong>${day}</strong>
        <em>${escapeHtml(weekday)}</em>
        ${dayTasks.length ? `<span>${dayTasks.length} ${text("tasks")}</span><small>${escapeHtml(getProject(dayTasks[0]))}</small>` : `<span>${text("empty")}</span>`}
      </button>
    `;
  }).join("");
}

function renderCalendarDetails() {
  if (!selectedCalendarDay) {
    calendarDetails.innerHTML = `<div class="empty">${text("selectCalendarDay")}</div>`;
    return;
  }
  const dayTasks = calendarTasksForDate(selectedCalendarDay);
  calendarDetails.innerHTML = dayTasks.length ? dayTasks.map((task) => `
    <div class="compact-item">
      <strong>${escapeHtml(getProject(task))}</strong>
      <div class="task-meta">
        <span>${escapeHtml(task.name)}</span>
        <span>${shortDate(task.end)}</span>
        <span>${escapeHtml(resourceLabel(task.owner))}</span>
        <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("noTaskOnDay")}</div>`;
}

function renderCalendar() {
  [calendarStart].forEach((input) => { if (input) input.value = calendarRange.start; });
  [calendarEnd].forEach((input) => { if (input) input.value = calendarRange.end; });
  dashboardCalendar.innerHTML = renderCalendarMarkup(true);
  calendarBoard.innerHTML = renderCalendarMarkup(false);
  renderCalendarDetails();
  // update month label in dashboard nav (az üçün açıq ay adı, "M07" yox)
  if (dashCalMonthLabel && calendarRange.start) {
    const d = new Date(calendarRange.start + "T00:00:00");
    const table = GANTT_MONTH_NAMES[currentLanguage];
    dashCalMonthLabel.textContent = table
      ? `${table.long[d.getMonth()]} ${d.getFullYear()}`
      : d.toLocaleDateString(translations[currentLanguage].locale, { month: "long", year: "numeric" });
  }
}

// per-project card markup → modules/render-markup.js: projectCardMarkup
function renderProjectsView() {
  const shownProjects = visibleProjects();
  projectCards.innerHTML = shownProjects.length
    ? shownProjects.map(projectCardMarkup).join("")
    : `<div class="empty">${text("empty")}</div>`;
  renderArchivedProjects();
}

// renderProjectGovernance → modules/render-markup.js

function nextGateForProject(project) {
  const approvals = project.charter?.gateApprovals || {};
  return ["Initiation", "Planning", "Execution", "Closing"].find((gate) => !approvals[gate]?.approvedAt) || "";
}

function renderArchivedProjects() {
  const archived = appState.projects.filter((project) => project.archived).filter(canSeeProject);
  archivedProjectCards.innerHTML = archivedProjectsMarkup(archived);
}

// Layihə adından deterministik rəng çaları (hue). Eyni layihə → həmişə eyni rəng.
function projectHue(name) {
  const s = String(name || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

function renderTaskList() {
  const shown = visibleTasks();

  // Owner filter active banner
  const ownerBanner = currentOwnerFilter ? `
    <div class="owner-filter-banner">
      <span><strong>${escapeHtml(resourceLabel(currentOwnerFilter))}</strong> — tapşırıqları göstərilir</span>
      <button type="button" class="owner-filter-clear" id="clearOwnerFilter">✕ Filtri sil</button>
    </div>
  ` : "";

  if (!shown.length) {
    taskList.innerHTML = ownerBanner + `<div class="empty">${text("noTask")}</div>`;
    document.querySelector("#clearOwnerFilter")?.addEventListener("click", () => { currentOwnerFilter = ""; render(); });
    return;
  }

  // Birdən çox layihə varsa: tapşırıqları layihəyə görə qruplaşdır ki, hansı task
  // hansı layihəyə aid olduğu ilk baxışdan bilinsin. Tək layihə (və ya filtr) → düz siyahı.
  const distinctProjects = [...new Set(shown.map((t) => getProject(t) || ""))];
  const grouped = distinctProjects.length > 1;

  // Qruplaşdırma zamanı eyni layihənin taskları bitişik olsun deyə əvvəlcə
  // layihə adına, sonra başlama tarixinə görə sırala.
  const ordered = grouped
    ? [...shown].sort((a, b) => {
        const pa = getProject(a) || "", pb = getProject(b) || "";
        if (pa !== pb) return pa.localeCompare(pb, "az");
        return parseDate(a.start) - parseDate(b.start);
      })
    : shown;

  const paged = ordered.slice(0, taskListPage * TASK_PAGE_SIZE);
  const hasMore = paged.length < ordered.length;
  const countLabel = ordered.length > TASK_PAGE_SIZE
    ? `<div class="task-list-count">${text("showingOf")(paged.length, ordered.length)}</div>` : "";
  const loadMoreBtn = hasMore
    ? `<button class="load-more-btn" type="button" id="taskLoadMore">${text("loadMore")} (${ordered.length - paged.length})</button>` : "";

  // per-task card markup → modules/render-markup.js: taskCardMarkup
  let body;
  if (grouped) {
    const groups = [];
    let cur = null;
    for (const task of paged) {
      const name = getProject(task) || text("noProject");
      if (!cur || cur.name !== name) { cur = { name, tasks: [] }; groups.push(cur); }
      cur.tasks.push(task);
    }
    body = groups.map((g) => `
      <section class="task-group" style="--proj-hue:${projectHue(g.name)}">
        <header class="task-group-head">
          <span class="task-group-dot"></span>
          <span class="task-group-name">${escapeHtml(g.name)}</span>
          <span class="task-group-count">${g.tasks.length}</span>
        </header>
        <div class="task-group-body">${g.tasks.map(taskCardMarkup).join("")}</div>
      </section>
    `).join("");
  } else {
    body = paged.map(taskCardMarkup).join("");
  }

  taskList.innerHTML = ownerBanner + countLabel + body + loadMoreBtn;

  document.querySelector("#clearOwnerFilter")?.addEventListener("click", () => { currentOwnerFilter = ""; taskListPage = 1; render(); });
  document.querySelector("#taskLoadMore")?.addEventListener("click", () => { taskListPage++; renderTaskList(); });
}

// renderAttachments / renderCommentAttachments → modules/render-markup.js

function canDeleteTaskComment(task) {
  return Boolean(task && currentUser && (isAdmin() || currentUser.role === "manager") && canSeeTask(task));
}

// renderCommentDeleteButton → modules/render-markup.js

function deleteTaskComment(taskId, commentId) {
  const task = appState.tasks.find((item) => item.id === taskId);
  if (!task || !commentId || !canDeleteTaskComment(task)) return false;
  task.comments = (task.comments || []).filter((comment) => comment.id !== commentId);
  saveTasks();
  flushSupabaseSave().catch((error) => console.warn("Supabase save failed", error));
  return true;
}

// renderTaskInlineComments → modules/render-markup.js

// renderTaskRelations → modules/render-markup.js

// renderTaskActions → modules/render-markup.js

// renderTimeEntries → modules/render-markup.js

// renderComments → modules/render-markup.js

function openTaskDetail(id) {
  const task = appState.tasks.find((item) => item.id === id);
  if (!task || !taskDetailModal) return;
  const project = appState.projects.find((item) => item.name === task.project);
  taskDetailTitle.textContent = task.name;
  taskDetailBody.innerHTML = `
    <div class="task-detail-grid">
      <span><strong>Layihə</strong>${escapeHtml(task.project || "-")}</span>
      <span><strong>${text("lifecycleStage")}</strong>${escapeHtml(lifecycleLabel(project?.lifecycle))}</span>
      <span><strong>Status</strong>${escapeHtml(statusLabel(task.status))}</span>
      <span><strong>Tarix</strong>${shortDate(task.start)} - ${shortDate(task.end)}</span>
      <span><strong>Plan/Fakt saat</strong>${plannedHoursForTask(task)} / ${actualHoursForTask(task)}</span>
      <span><strong>Progress</strong>${Number(task.progress) || 0}%</span>
    </div>
    ${renderTaskRelations(task)}
    ${task.acceptanceCriteria ? `<div class="task-detail-section"><h3>${text("acceptanceCriteria")}</h3><p>${escapeHtml(task.acceptanceCriteria)}</p></div>` : ""}
    ${task.notes ? `<div class="task-detail-section"><h3>Qeyd</h3><p>${escapeHtml(task.notes)}</p></div>` : ""}
    <div class="task-detail-section"><h3>Comments</h3>${renderComments(task)}</div>
    <div class="task-detail-section"><h3>Time log</h3>${renderTimeEntries(task)}</div>
  `;
  raiseModal(taskDetailModal);
  taskDetailModal.classList.add("open");
  taskDetailModal.setAttribute("aria-hidden", "false");
}

function closeTaskDetail() {
  taskDetailModal?.classList.remove("open");
  taskDetailModal?.setAttribute("aria-hidden", "true");
}

function renderKanban() {
  const shown = visibleTasks();
  kanban.innerHTML = statuses.map((status) => {
    const columnTasks = shown.filter((task) => task.status === status);
    const cards = columnTasks.map((task) => {
      const blocked = isTaskBlocked(task);
      return `
      <article class="kanban-card kb-${statusClass(status)} ${blocked ? "blocked-task" : ""}">
        <strong>${escapeHtml(task.name)}</strong>
        <div class="task-meta">
          ${blocked ? `<span class="badge blocked">${text("blocked")}</span>` : ""}
          <span>${escapeHtml(getProject(task))}</span>
          <span>${shortDate(task.end)}</span>
          <span>${Number(task.progress) || 0}%</span>
        </div>
        ${renderTaskRelations(task)}
        ${renderKanbanActions(task)}
      </article>
    `;
    }).join("");

    return `
      <section class="kanban-column kb-col-${statusClass(status)}">
        <h2><span class="kb-dot"></span>${statusLabel(status)}<span class="kb-count">${columnTasks.length}</span></h2>
        ${cards || `<div class="empty">${text("empty")}</div>`}
      </section>
    `;
  }).join("");
}

// renderKanbanActions / milestoneMarkers / dependencyArrows → modules/render-markup.js

function todayMarker(minStart, days) {
  const today = isoDate(new Date());
  const offset = daysBetween(isoDate(minStart), today);
  if (offset < 0 || offset >= days) return "";
  return `<div class="gantt-today-line" style="grid-column:${offset + 1};" title="Today"></div>`;
}

function ganttColumns(days) {
  return `repeat(${days}, minmax(${ganttDayWidth}px, 1fr))`;
}

function ganttZoomText() {
  if (ganttDayWidth <= 3) return "Fit";
  if (ganttDayWidth <= 9) return "Compact";
  if (ganttDayWidth <= 17) return "Week";
  return "Day";
}

function setGanttZoom(width) {
  ganttDayWidth = Math.min(28, Math.max(2, Number(width) || 3));
  localStorage.setItem("project-manager-gantt-day-width", String(ganttDayWidth));
  if (ganttZoomLabel) ganttZoomLabel.textContent = ganttZoomText();
  renderGantt();
}

// Bəzi mühitlərdə az-AZ üçün toLocaleDateString "M01/M02" qaytarır — açıq massiv işlədirik.
const GANTT_MONTH_NAMES = {
  az: {
    long: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
    short: ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt", "Noy", "Dek"]
  }
};
function ganttMonthLabel(date, wide) {
  const lang = currentLanguage;
  const m = date.getMonth();
  const y2 = String(date.getFullYear()).slice(-2);
  const table = GANTT_MONTH_NAMES[lang];
  if (table) return wide ? `${table.long[m]} ${y2}` : table.short[m];
  const loc = translations[lang].locale;
  return wide
    ? date.toLocaleDateString(loc, { month: "long", year: "2-digit" })
    : date.toLocaleDateString(loc, { month: "short" });
}

function ganttMonthHeaders(minStart, days) {
  const headers = [];
  let cursor = new Date(minStart);
  cursor.setDate(1);
  const endDate = addDays(minStart, days - 1);
  while (cursor <= endDate) {
    const monthStart = new Date(cursor);
    const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const startOffset = Math.max(0, daysBetween(isoDate(minStart), isoDate(monthStart)));
    const endOffset = Math.min(days - 1, daysBetween(isoDate(minStart), isoDate(monthEnd)));
    const span = Math.max(1, endOffset - startOffset + 1);
    // Sütun kifayət qədər genişdirsə tam ay adı, yoxsa qısaltma
    const wide = span * ganttDayWidth >= 64;
    const label = ganttMonthLabel(cursor, wide);
    headers.push(`<div class="gantt-month" style="grid-column:${startOffset + 1} / span ${span};" title="${escapeHtml(ganttMonthLabel(cursor, true))}">${escapeHtml(label)}</div>`);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }
  return headers.join("");
}

function draggableGanttBar(type, item, className, offset, span, label) {
  return `
    <div class="bar ${className}" data-gantt-bar="${escapeHtml(type)}" data-id="${escapeHtml(item.id)}" style="grid-column: ${offset + 1} / span ${span};">
      <span class="gantt-resize-handle left" data-gantt-resize="start"></span>
      <span class="gantt-bar-label">${label}</span>
      <span class="gantt-resize-handle right" data-gantt-resize="end"></span>
    </div>
  `;
}

function renderGantt() {
  if (ganttZoomLabel) ganttZoomLabel.textContent = ganttZoomText();
  const selectedProject = projectFilter.value;
  const shownProjects = visibleProjects()
    .filter((project) => selectedProject === "Hamısı" || project.name === selectedProject)
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));
  if (!shownProjects.length) {
    gantt.innerHTML = `<div class="empty">${text("noTaskFilter")}</div>`;
    return;
  }

  const visibleProjectNames = new Set(shownProjects.map((project) => project.name));
  if (expandedGanttProject && !visibleProjectNames.has(expandedGanttProject)) expandedGanttProject = "";
  if (!expandedGanttProject && shownProjects.length === 1 && !ganttManuallyCollapsed) expandedGanttProject = shownProjects[0].name;

  const detailTasks = expandedGanttProject
    ? visibleTasks().filter((task) => task.project === expandedGanttProject)
    : [];
  const timelineItems = [
    ...shownProjects.map((project) => ({ type: "project", item: project, start: project.start, end: project.end })),
    ...detailTasks.map((task) => {
      const parentProject = shownProjects.find((project) => project.name === task.project);
      return {
        type: "task",
        item: task,
        start: task.start || parentProject?.start,
        end: task.end || parentProject?.end
      };
    })
  ].filter((entry) => entry.start && entry.end);

  if (!timelineItems.length) {
    gantt.innerHTML = `<div class="empty">${text("noTaskFilter")}</div>`;
    return;
  }

  const starts = timelineItems.map((entry) => parseDate(entry.start));
  const ends = timelineItems.map((entry) => parseDate(entry.end));
  const minStart = new Date(Math.min(...starts));
  const maxEnd = new Date(Math.max(...ends));
  const days = Math.max(1, Math.round((maxEnd - minStart) / 86400000) + 1);
  const monthHeaders = ganttMonthHeaders(minStart, days);

  const projectRows = shownProjects.map((project) => {
    const offset = daysBetween(isoDate(minStart), project.start);
    const span = Math.max(1, daysBetween(project.start, project.end) + 1);
    const expanded = expandedGanttProject === project.name;
    return `
      <div class="gantt-row gantt-project-row">
        <button class="gantt-task-name gantt-project-name" type="button" data-gantt-project="${escapeHtml(project.name)}" aria-expanded="${expanded ? "true" : "false"}" title="${escapeHtml(project.name)}">
          <span>${expanded ? "−" : "+"}</span>
          ${escapeHtml(project.name)}
        </button>
        <div class="gantt-lane" style="--days:${days}; grid-template-columns: ${ganttColumns(days)};">
          ${todayMarker(minStart, days)}
          ${milestoneMarkers(project, minStart, days)}
          ${draggableGanttBar("project", project, `project-bar ${statusClass(project.status)}`, offset, span, `${span} ${text("day")} - ${Number(project.progress) || 0}%`)}
        </div>
      </div>
    `;
  }).join("");

  const taskRows = expandedGanttProject ? (detailTasks.length ? detailTasks.map((task) => {
    const parentProject = shownProjects.find((project) => project.name === task.project);
    const start = task.start || parentProject?.start || isoDate(minStart);
    const end = task.end || parentProject?.end || start;
    const offset = Math.max(0, daysBetween(isoDate(minStart), start));
    const span = Math.max(1, daysBetween(start, end) + 1);
    const trackStart = parentProject?.start || start;
    const trackEnd = parentProject?.end || end;
    const trackOffset = Math.max(0, daysBetween(isoDate(minStart), trackStart));
    const trackSpan = Math.max(1, daysBetween(trackStart, trackEnd) + 1);
    const blocked = isTaskBlocked(task);
    const inferredTimeline = !task.start || !task.end;
    return `
      <div class="gantt-row gantt-detail-row">
        <div class="gantt-task-name" title="${escapeHtml(task.name)}">
          ${blocked ? `<span class="badge blocked">${text("blocked")}</span>` : ""}
          ${escapeHtml(task.name)}
        </div>
        <div class="gantt-lane" style="--days:${days}; grid-template-columns: ${ganttColumns(days)};">
          ${todayMarker(minStart, days)}
          <div class="gantt-task-track" style="grid-column: ${trackOffset + 1} / span ${trackSpan};"></div>
          ${dependencyArrows(task, detailTasks, minStart, days)}
          ${draggableGanttBar("task", task, `${statusClass(task.status)} ${inferredTimeline ? "inferred-bar" : ""}`, offset, span, `${inferredTimeline ? text("projectDuration") : `${span} ${text("day")}`} - ${Number(task.progress) || 0}%`)}
        </div>
      </div>
    `;
  }).join("") : `<div class="empty gantt-detail-empty">${text("noTaskFilter")}</div>`) : "";

  gantt.innerHTML = `
    <div class="gantt-grid" style="--gantt-day-width:${ganttDayWidth}px;">
      <div class="gantt-header">
        <div class="gantt-label">Task</div>
        <div class="gantt-months" style="grid-template-columns: ${ganttColumns(days)};">${monthHeaders}</div>
      </div>
      ${projectRows}
      ${taskRows}
    </div>
  `;
}

function ganttItem(type, id) {
  return type === "project"
    ? appState.projects.find((project) => project.id === id)
    : appState.tasks.find((task) => task.id === id);
}

function shiftIsoDate(value, delta) {
  return isoDate(addDays(parseDate(value), delta));
}

function applyGanttDateChange(state, deltaDays) {
  const item = ganttItem(state.type, state.id);
  if (!item || !state.start || !state.end || !deltaDays) return false;
  const next = { start: state.start, end: state.end };
  if (state.mode === "move") {
    next.start = shiftIsoDate(state.start, deltaDays);
    next.end = shiftIsoDate(state.end, deltaDays);
  } else if (state.mode === "start") {
    const nextStart = shiftIsoDate(state.start, deltaDays);
    next.start = nextStart <= state.end ? nextStart : state.end;
  } else if (state.mode === "end") {
    const nextEnd = shiftIsoDate(state.end, deltaDays);
    next.end = nextEnd >= state.start ? nextEnd : state.start;
  }
  if (!canManageTasks()) {
    if (state.type !== "task" || !canContribute()) return false;
    item.dateChangeRequests = item.dateChangeRequests || [];
    item.dateChangeRequests.push({
      id: createId("date-request"),
      oldStart: state.start,
      oldEnd: state.end,
      newStart: next.start,
      newEnd: next.end,
      mode: state.mode,
      status: "pending",
      requestedBy: currentUser.username,
      requestedAt: new Date().toISOString()
    });
    saveTasks();
    alert(text("dateChangeRequested"));
    return true;
  }
  item.start = next.start;
  item.end = next.end;
  if (state.type === "project") saveResources();
  else saveTasks();
  return true;
}

function openGanttItem(type, id) {
  const item = ganttItem(type, id);
  if (!item) return;
  if (type === "task") {
    editTask(item.id, { readonly: !canManageTasks() });
    return;
  }
  if (!canManageTasks()) {
    setView("projects");
    projectFilter.value = item.name;
    render();
    return;
  }
  editProject(item.id);
}

function ganttDeltaDays(event, state) {
  const lane = state.lane;
  const rect = lane?.getBoundingClientRect?.();
  const cellWidth = rect?.width ? rect.width / Math.max(1, Number(lane.style.getPropertyValue("--days")) || 1) : ganttDayWidth;
  return Math.round((event.clientX - state.startX) / Math.max(12, cellWidth));
}

function renderReports() {
  const selectedProject = projectFilter.value;
  const reportTasks = visibleTasks();
  const shownProjects = visibleProjects()
    .filter((project) => selectedProject === "Hamısı" || project.name === selectedProject)
    .filter((project) => selectedProject !== "Hamısı" || reportTasks.some((task) => task.project === project.name) || visibleRegisters(project.name).length || projectGovernanceAudit(project).done);
  const totalPlanned = reportTasks.reduce((sum, task) => sum + plannedHoursForTask(task), 0);
  const totalActual = reportTasks.reduce((sum, task) => sum + actualHoursForTask(task), 0);
  const blockedCount = reportTasks.filter(isTaskBlocked).length;
  const summary = `
    <section class="report-summary">
      <article><span>${reportTasks.length}</span><p>${text("filteredTasks")}</p></article>
      <article><span>${reportTasks.filter((task) => task.status !== "Bitib").length}</span><p>${text("activeTasks")}</p></article>
      <article><span>${reportTasks.filter((task) => task.status === "Bitib").length}</span><p>${text("doneTasks")}</p></article>
      <article><span>${blockedCount}</span><p>${text("blockedTasks")}</p></article>
      <article><span>${totalPlanned} / ${totalActual}</span><p>${text("hoursSummary")}</p></article>
    </section>
  `;
  // per-project report markup → modules/render-markup.js: reportProjectMarkup
  reports.innerHTML = shownProjects.length
    ? shownProjects.map((project) => reportProjectMarkup(project, reportTasks)).join("")
    : `<div class="empty">${text("empty")}</div>`;
  // ── Weekly hours bar chart ─────────────────────────────────────────
  const weekStart = (() => {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // Monday
    return d;
  })();
  const weekEnd = new Date(weekStart.getTime() + 7 * 86400000);

  // Collect per-owner hours: prefer timeEntries (entry_date in current week),
  // fall back to task.actual if task.end falls this week
  const ownerHours = {};
  reportTasks.forEach((task) => {
    const entries = task.timeEntries || [];
    if (entries.length) {
      entries.forEach((entry) => {
        const d = new Date(entry.date || entry.entry_date || "");
        if (d >= weekStart && d < weekEnd) {
          const key = entry.userId || entry.user_id || task.owner || "?";
          ownerHours[key] = (ownerHours[key] || 0) + Number(entry.hours || 0);
        }
      });
    } else {
      const end = parseDate(task.end);
      if (end && end >= weekStart && end < weekEnd) {
        const key = task.owner || "?";
        ownerHours[key] = (ownerHours[key] || 0) + actualHoursForTask(task);
      }
    }
  });

  const chartRows = Object.entries(ownerHours).sort((a, b) => b[1] - a[1]);
  const maxHours = chartRows.length ? Math.max(...chartRows.map((r) => r[1])) : 0;
  const timeChartHtml = chartRows.length ? `
    <section class="time-chart-section">
      <h3 class="time-chart-title">${text("timeChart")} — ${text("timeWeek")}</h3>
      <div class="time-chart">
        ${chartRows.map(([owner, hours]) => {
          const pct = maxHours ? Math.round((hours / maxHours) * 100) : 0;
          return `
          <div class="time-chart-row">
            <span class="time-chart-label">${escapeHtml(resourceLabel(owner))}</span>
            <div class="time-chart-bar-wrap">
              <div class="time-chart-bar" style="width:${pct}%"></div>
            </div>
            <span class="time-chart-val">${hours.toFixed(1)}h</span>
          </div>`;
        }).join("")}
      </div>
    </section>
  ` : "";

  reports.innerHTML = timeChartHtml + summary + reports.innerHTML;
}

// #21 — Layihə açılış detal banneri: task görünüşündə konkret layihə seçiləndə
// layihə haqqında məlumat, istifadəçilər və vaxt göstərilir.
function renderProjectDetailBar() {
  const bar = document.getElementById("projectDetailBar");
  if (!bar) return;
  const name = projectFilter.value;
  const inTaskView = ["list", "kanban", "calendar", "gantt"].includes(currentView);
  const project = appState.projects.find((p) => p.name === name);
  if (!inTaskView || !name || name === "Hamısı" || !project) {
    bar.hidden = true;
    bar.innerHTML = "";
    return;
  }
  const tasks = accessibleTasks().filter((t) => t.project === project.name);
  const done = tasks.filter((t) => t.status === "Bitib").length;
  const active = tasks.length - done;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : (Number(project.progress) || 0);
  const managers = projectManagers(project).map((u) => u.profile?.fullName || u.username);
  const teamUsers = (project.teamMemberIds || [])
    .map((val) => {
      const id = String(val).includes(":") ? String(val).split(":")[1] : val;
      const u = appState.users.find((x) => x.id === id);
      return u ? (u.profile?.fullName || u.username) : null;
    })
    .filter(Boolean);
  const customer = appState.customers.find((c) => c.id === project.customerId)?.name || "";
  const audit = typeof projectGovernanceAudit === "function" ? projectGovernanceAudit(project) : null;
  const field = (label, value) => value
    ? `<div class="pdb-field"><span class="pdb-label">${label}</span><span class="pdb-value">${escapeHtml(String(value))}</span></div>`
    : "";
  bar.innerHTML = `
    <div class="pdb-head">
      <div class="pdb-title">
        <h2>${escapeHtml(project.name)}</h2>
        <div class="pdb-badges">
          <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
          <span class="badge ${priorityClass(project.priority)}">${priorityLabel(project.priority)}</span>
          <span class="lifecycle-tag lifecycle-${(project.lifecycle || "Initiation").toLowerCase()}">${escapeHtml(lifecycleLabel(project.lifecycle))}</span>
        </div>
      </div>
      <div class="pdb-progress">
        <div class="pdb-progress-num">${pct}%</div>
        <div class="progress-mini pdb-progress-mini"><span style="width:${pct}%"></span></div>
      </div>
    </div>
    ${project.description ? `<p class="pdb-desc">${escapeHtml(project.description)}</p>` : ""}
    <div class="pdb-fields">
      ${field(text("customer"), customer)}
      ${field(text("projectLeader"), managers.join(", "))}
      ${field(text("projectTeamMembers"), teamUsers.length ? teamUsers.join(", ") : "—")}
      ${field(`${text("start")} – ${text("end")}`, `${shortDate(project.start)} – ${shortDate(project.end)}`)}
      ${field(text("tasks"), `${tasks.length} · ${active} / ${done} ✓`)}
      ${audit ? field(text("ipmaScore"), `${audit.score}% · ${audit.approvedGates.length}/4 ${text("gatesWord")}`) : ""}
    </div>
  `;
  bar.hidden = false;
}

function renderViews() {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${currentView}View`));
  document.body.dataset.view = currentView;
  renderProjectDetailBar();
  // Başlıq görünüşə uyğunlaşsın — Komandalar səhifəsində "Plan, task və icra
  // paneli" yazısı yanlış kontekst verirdi.
  const shellTitle = document.querySelector('.top-shell h1[data-i18n="appTitle"]');
  if (shellTitle) {
    const perView = { teams: "teamsViewTitle" };
    const key = perView[currentView];
    shellTitle.textContent = key ? text(key) : text("appTitle");
  }
  if (currentView === "teams") renderTeamsView();
  if (typeof ensureChatWidget === "function") ensureChatWidget();
}

// ── Toast bildirişi (self-contained; DOM/CSS asılılığı yoxdur) ───────────────
function showToast(message, timeout = 3200) {
  try {
    let host = document.getElementById("pmToastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "pmToastHost";
      document.body.appendChild(host);
    }
    const toast = document.createElement("div");
    toast.className = "pm-toast";
    toast.textContent = String(message);
    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  } catch (error) { console.warn("toast error:", error?.message); }
}

// ── Təsdiq növbəsi (Supabase pending workspaces) ─────────────────────────────
let platformPendingCache = [];

async function refreshPlatformApprovalQueue() {
  if (!isSuperAdmin() || !canUseSupabase()) { platformPendingCache = []; return; }
  try {
    const ws = await supabaseRequest("/rest/v1/workspaces?approval_status=eq.pending&select=id,name,company_key,owner_id,requested_at,email_verified&order=requested_at.asc");
    const list = Array.isArray(ws) ? ws : [];
    let owners = [];
    if (list.length) {
      const ids = list.map((w) => w.id).join(",");
      const profs = await supabaseRequest(`/rest/v1/profiles?workspace_id=in.(${ids})&select=workspace_id,email,username,full_name,role`);
      owners = Array.isArray(profs) ? profs : [];
    }
    platformPendingCache = list.map((w) => {
      const owner = owners.find((p) => p.workspace_id === w.id && p.role === "admin")
        || owners.find((p) => p.workspace_id === w.id);
      return { ...w, ownerEmail: owner?.email || "", ownerName: owner?.full_name || owner?.username || "" };
    });
  } catch (error) {
    console.warn("Təsdiq növbəsi yüklənmədi:", error?.message);
    platformPendingCache = [];
  }
}

// Super-admin üçün BÜTÜN tenant-ları Supabase workspaces cədvəlindən çək —
// lokal companyRegistry Supabase super-admin-də boş olur, ona görə mənbə buradır.
let _platformCompaniesLoaded = false;

async function refreshPlatformCompanies() {
  if (!isSuperAdmin() || !canUseSupabase()) return;
  _platformCompaniesLoaded = true;
  try {
    const ws = await supabaseRequest("/rest/v1/workspaces?deleted_at=is.null&select=id,company_key,name,status,approval_status,email_verified,plan,max_users,created_at,requested_at&order=created_at");
    const list = Array.isArray(ws) ? ws : [];
    let profs = [];
    try {
      const p = await supabaseRequest("/rest/v1/profiles?select=workspace_id,role,email");
      profs = Array.isArray(p) ? p : [];
    } catch (e) { /* profil sayı olmasa da şirkətlər göstərilsin */ }
    companyRegistry = list.map((w) => {
      const users = profs.filter((p) => p.workspace_id === w.id);
      const admin = users.find((p) => p.role === "admin");
      const status = w.status === "disabled" ? "suspended"
        : w.approval_status === "active" ? "active"
        : w.approval_status; // pending / rejected
      return {
        id: w.company_key || w.id,
        workspaceId: w.id,
        name: w.name,
        subdomain: slugFromName(w.name || ""),
        status,
        approvalStatus: w.approval_status,
        emailVerified: w.email_verified,
        plan: w.plan || "standard",
        maxUsers: Number(w.max_users) || 0,
        adminUsername: admin?.email || "",
        userCount: users.length,
        projectCount: 0,
        createdAt: w.created_at,
        requestedAt: w.requested_at
      };
    });
  } catch (error) {
    console.warn("Platform şirkətləri yüklənmədi:", error?.message);
  }
  renderPlatformConsole();
}

function renderPlatformApprovalQueue() {
  if (!platformApprovalQueue) return;
  const online = canUseSupabase();
  const rows = platformPendingCache;
  platformApprovalQueue.innerHTML = `
    <div class="platform-section-head">
      <div><p class="kicker">Təsdiq növbəsi</p><h3>Gözləyən qeydiyyatlar${rows.length ? ` · ${rows.length}` : ""}</h3></div>
      <button type="button" id="refreshApprovalQueue">Yenilə</button>
    </div>
    ${!online
      ? `<div class="empty">Online rejim aktiv deyil — təsdiq növbəsi yalnız Supabase ilə işləyir.</div>`
      : rows.length
        ? `<div class="platform-table approval-table">${rows.map((w) => `
            <div class="approval-row">
              <strong>${escapeHtml(w.name || "-")}</strong>
              <span>${escapeHtml(w.ownerEmail || "-")}</span>
              <span>${escapeHtml(formatDateTime(w.requested_at) || "-")}</span>
              <span class="approval-badge ${w.email_verified ? "ok" : "wait"}">${w.email_verified ? "email ✓" : "email gözləyir"}</span>
              <span class="approval-actions">
                <button type="button" class="approve-btn" data-approval-action="approve" data-id="${escapeHtml(w.id)}">Təsdiqlə</button>
                <button type="button" class="reject-btn" data-approval-action="reject" data-id="${escapeHtml(w.id)}">Rədd et</button>
              </span>
            </div>`).join("")}</div>`
        : `<div class="empty">Gözləyən qeydiyyat yoxdur</div>`}
  `;
}

function renderPlatformConsole() {
  if (!platformConsole) return;
  if (!isSuperAdmin()) {
    platformConsole.classList.remove("active");
    return;
  }
  // İlk dəfə: bütün tenant-ları Supabase-dən yüklə (sonra re-render olunacaq).
  if (canUseSupabase() && !_platformCompaniesLoaded) {
    refreshPlatformCompanies();
  }
  const registry = companyRegistry.length ? companyRegistry : companyRegistryFromLocalState();
  const activeCount = registry.filter((company) => company.status !== "suspended").length;
  const suspendedCount = registry.filter((company) => company.status === "suspended").length;
  const usersTotal = registry.reduce((sum, company) => sum + (Number(company.userCount) || 0), 0);
  const projectsTotal = registry.reduce((sum, company) => sum + (Number(company.projectCount) || 0), 0);
  const lastStatusChange = registry
    .map((company) => companyStatusMeta(company).changedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  platformConsole.classList.add("active");
  platformStats.innerHTML = [
    ["Şirkət", registry.length],
    ["Aktiv", activeCount],
    ["Dayanıb", suspendedCount],
    ["User", usersTotal],
    ["Layihə", projectsTotal],
    ["Son status", formatDateTime(lastStatusChange) || "-"]
  ].map(([label, value]) => `<article class="${typeof value === "string" && value.length > 8 ? "compact-stat" : ""}"><span>${value}</span><p>${label}</p></article>`).join("");
  // Təsdiq növbəsi: əvvəlcə cache-dən render et, sonra Supabase-dən təzələ.
  renderPlatformApprovalQueue();
  refreshPlatformApprovalQueue().then(renderPlatformApprovalQueue);
  const ops = platformOpsSummary(registry);
  // markup → render-markup.js: platformOpsMarkup, platformLifecycleCardMarkup
  if (platformOps) {
    platformOps.innerHTML = platformOpsMarkup(ops, auditLogs.length + localAuditLogs.length);
  }
  if (platformLifecycle) {
    platformLifecycle.innerHTML = registry.map(platformLifecycleCardMarkup).join("");
  }
  if (platformCreateWizard) {
    platformCreateWizard.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Workspace wizard</p><h3>Şirkət yarat</h3></div></div>
      <form id="platformCreateCompanyForm" class="platform-form">
        <input name="name" placeholder="Şirkət adı" required>
        <input name="subdomain" placeholder="subdomain">
        <input name="adminUsername" placeholder="admin username">
        <input name="adminPassword" placeholder="admin password">
        <select name="plan"><option value="standard">standard</option><option value="pro">pro</option><option value="enterprise">enterprise</option></select>
        <select name="template"><option value="starter">İlkin template</option><option value="empty">Boş workspace</option></select>
        <button type="submit">Yarat</button>
      </form>
    `;
  }
  if (platformMonitoring) {
    platformMonitoring.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Tenant monitorinq</p><h3>İstifadə, resurs və sessiyalar</h3></div></div>
      <div class="platform-table">
        ${registry.map((company) => {
          const opsMeta = companyOperationsMeta(company);
          const payload = companyBackupPayload(company.id);
          return `<div>
            <strong>${escapeHtml(company.name)}</strong>
            <span>${Number(company.projectCount) || 0} layihə</span>
            <span>${opsMeta.taskCount} task</span>
            <span>${storageSizeLabel(payload)} DB/export</span>
            <span>${mailHistory.filter((item) => JSON.stringify(item).includes(company.id)).length} mail</span>
            <span>${opsMeta.lastLoginAt ? "aktiv sessiya" : "passiv"}</span>
          </div>`;
        }).join("")}
      </div>
    `;
  }
  if (platformBackupCenter) {
    platformBackupCenter.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Backup mərkəzi</p><h3>Export, download və restore</h3></div></div>
      <div class="platform-backup-actions">
        <button type="button" data-platform-backup="all">Bütün şirkətləri export et</button>
        <label class="import-button">Restore JSON<input id="platformRestoreInput" type="file" accept="application/json,.json"></label>
      </div>
      <div class="platform-table">
        ${registry.map((company) => `<div>
          <strong>${escapeHtml(company.name)}</strong>
          <span>${storageSizeLabel(companyBackupPayload(company.id))}</span>
          <span>Son backup: ${escapeHtml(formatDateTime(appSettings.backups?.find((item) => item.companyId === company.id)?.createdAt) || "-")}</span>
          <button type="button" data-platform-backup="${escapeHtml(company.id)}">Download</button>
        </div>`).join("")}
      </div>
    `;
  }
  if (platformGlobalSettings) {
    platformGlobalSettings.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Global ayarlar</p><h3>Sistem davranışı</h3></div></div>
      <form id="platformGlobalSettingsForm" class="platform-form">
        <input name="appName" value="${escapeHtml(appSettings.appName || "Project Manager")}" placeholder="App adı">
        <input name="appLogo" value="${escapeHtml(appSettings.appLogo || "PM")}" placeholder="Logo mətni">
        <select name="defaultLanguage"><option value="az" ${appSettings.defaultLanguage === "az" ? "selected" : ""}>AZ</option><option value="en" ${appSettings.defaultLanguage === "en" ? "selected" : ""}>EN</option><option value="ru" ${appSettings.defaultLanguage === "ru" ? "selected" : ""}>RU</option></select>
        <select name="defaultTheme"><option value="light" ${appSettings.defaultTheme === "light" ? "selected" : ""}>Light</option><option value="dark" ${appSettings.defaultTheme === "dark" ? "selected" : ""}>Dark</option><option value="system" ${appSettings.defaultTheme === "system" ? "selected" : ""}>System</option></select>
        <input name="emailProvider" value="${escapeHtml(appSettings.emailProvider || "")}" placeholder="Mail provider">
        <label class="toggle-row"><input name="maintenanceMode" type="checkbox" ${appSettings.maintenanceMode ? "checked" : ""}><span>Maintenance mode</span></label>
        <button type="submit">Saxla</button>
      </form>
    `;
  }
  if (platformSecurityCenter) {
    const securityRows = platformAuditRows(["auth.", "password", "company.updated"]);
    platformSecurityCenter.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Audit və təhlükəsizlik</p><h3>Login, parol və lifecycle izləri</h3></div></div>
      <div class="platform-table">${securityRows.slice(0, 12).map((item) => `<div><strong>${escapeHtml(item.action || "-")}</strong><span>${escapeHtml(item.actor || "-")}</span><span>${escapeHtml(formatDateTime(item.created_at || item.createdAt) || "-")}</span></div>`).join("") || `<div class="empty">${text("empty")}</div>`}</div>
    `;
  }
  if (platformNotificationCenter) {
    const alerts = [
      ...registry.filter((company) => company.status === "suspended").map((company) => `${company.name}: dayandırılıb`),
      ...(ops.overdueTotal ? [`${ops.overdueTotal} gecikən task var`] : []),
      ...(ops.blockedTotal ? [`${ops.blockedTotal} bloklanmış task var`] : []),
      ...(!ops.mailReady ? ["Mail provider yoxlanılmalıdır"] : []),
      ...(!ops.backupCount ? ["Backup yaradılmayıb"] : [])
    ];
    platformNotificationCenter.innerHTML = `
      <div class="platform-section-head"><div><p class="kicker">Bildiriş mərkəzi</p><h3>Sistem xəbərdarlıqları</h3></div></div>
      <div class="platform-alert-list">${alerts.length ? alerts.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : "<span>Aktiv sistem xəbərdarlığı yoxdur</span>"}</div>
    `;
  }
  platformCompanyGrid.innerHTML = registry.length ? registry.map((company) => {
    const statusMeta = companyStatusMeta(company);
    const opsMeta = companyOperationsMeta(company);
    const healthTone = opsMeta.healthScore >= 85 ? "good" : opsMeta.healthScore >= 65 ? "warn" : "bad";
    return `
      <article class="platform-company-card ${company.status === "suspended" ? "suspended" : ""}">
        <div>
          <strong>${escapeHtml(company.name)}</strong>
          <span>${escapeHtml(company.subdomain)} · ${escapeHtml(company.plan || "standard")}</span>
        </div>
        <div class="platform-company-health ${healthTone}">
          <span>Health ${opsMeta.healthScore}%</span>
          <strong>${escapeHtml(opsMeta.riskLevel)}</strong>
          <div><i style="width:${opsMeta.healthScore}%"></i></div>
        </div>
        <dl>
          <div><dt>Admin</dt><dd>${escapeHtml(company.adminUsername || "-")}</dd></div>
          <div><dt>Status</dt><dd>${escapeHtml(company.status || "active")}</dd></div>
          <div><dt>User</dt><dd>${Number(company.userCount) || 0}</dd></div>
          <div><dt>Project</dt><dd>${Number(company.projectCount) || 0}</dd></div>
          <div><dt>Task</dt><dd>${opsMeta.taskCount}</dd></div>
          <div><dt>Aktiv task</dt><dd>${opsMeta.activeTasks}</dd></div>
          <div><dt>Gecikən</dt><dd>${opsMeta.overdue}</dd></div>
          <div><dt>Blok</dt><dd>${opsMeta.blocked}</dd></div>
          <div><dt>Son login</dt><dd>${escapeHtml(formatDateTime(opsMeta.lastLoginAt) || "-")}</dd></div>
          <div><dt>Trial</dt><dd>${escapeHtml(formatDateTime(company.trialEndsAt) || "-")}</dd></div>
          <div><dt>Abonement</dt><dd>${escapeHtml(formatDateTime(company.subscriptionEndsAt) || "-")}</dd></div>
          <div><dt>${statusMeta.label}</dt><dd>${escapeHtml(formatDateTime(statusMeta.changedAt) || "-")}</dd></div>
          <div><dt>Bu statusda</dt><dd>${escapeHtml(statusMeta.duration)}</dd></div>
          <div><dt>${text("statusChangedBy")}</dt><dd>${escapeHtml(statusMeta.changedBy || "-")}</dd></div>
          <div><dt>${text("statusReason")}</dt><dd>${escapeHtml(statusMeta.reason || "-")}</dd></div>
          <div><dt>Son aktiv</dt><dd>${escapeHtml(formatDateTime(statusMeta.activatedAt) || "-")}</dd></div>
          <div><dt>Son dayandırma</dt><dd>${escapeHtml(formatDateTime(statusMeta.suspendedAt) || "-")}</dd></div>
        </dl>
        <div class="platform-company-actions">
          <button type="button" data-company-action="${company.status === "suspended" ? "activate" : "suspend"}" data-id="${escapeHtml(company.id)}">
            ${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}
          </button>
          ${company.workspaceId ? `<button type="button" class="offboard-btn" data-company-offboard="${escapeHtml(company.workspaceId)}" data-name="${escapeHtml(company.name || "")}">Offboard</button>` : ""}
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  if (platformTimeline) {
    const platformAudit = [...auditLogs, ...localAuditLogs]
      .filter((item) => ["company.updated", "company.mail_settings_saved", "workspace.registered"].includes(item.action) || item.entity_type === "company")
      .slice(0, 12);
    platformTimeline.innerHTML = platformAudit.length ? platformAudit.map((item) => `
      <div class="platform-timeline-item">
        <span>
          <strong>${escapeHtml(item.action || "-")}</strong>
          ${escapeHtml([item.actor, item.entity_id].filter(Boolean).join(" · "))}
        </span>
        <small>${escapeHtml(formatDateTime(item.created_at || item.createdAt) || "-")}</small>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
  }
}

// #3 Sol panel — sürüşən aktiv göstərici: pill aktiv menyu bəndinə köçür.
function positionNavIndicator() {
  const menu = document.querySelector(".sidebar-menu");
  if (!menu) return;
  const indicator = menu.querySelector(".nav-indicator");
  if (!indicator) return;
  const active = menu.querySelector(".view-tab.active");
  if (!active) { indicator.style.opacity = "0"; return; }
  indicator.style.opacity = "1";
  indicator.style.height = active.offsetHeight + "px";
  indicator.style.transform = "translateY(" + active.offsetTop + "px)";
}

function setView(view) {
  // #6 Görünüşlər arası keçid (View Transitions API). Yalnız aktiv görünüş
  // konteyneri (.active-view) animasiya olunur — header/sidebar sabit qalır
  // (CSS-də view-transition-name). Dəstəklənməyən brauzer və ya reduced-motion
  // olduqda birbaşa tətbiq (fallback). Eyni görünüşə keçiddə də render lazımdır.
  const apply = () => {
    currentView = view;
    document.body.dataset.view = view;
    viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
    positionNavIndicator();
    if (view === "projects") projectFilter.value = "Hamısı";
    render();
  };
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const sameView = view === currentView;
  if (!sameView && !reduce && typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

// Test mühitində window stub-dur (addEventListener olmaya bilər) → müdafiəli.
window.addEventListener?.("resize", positionNavIndicator);
window.addEventListener?.("load", positionNavIndicator);

function applyStatusFilter(status) {
  currentFilter = status || "Hamısı";
  currentOwnerFilter = ""; // clear owner drill-down when status filter changes
  renderStatusControls();
}

function activateSummaryCard(card) {
  const target = card.dataset.summaryTarget;
  if (!target) return;
  if (target === "list") applyStatusFilter(card.dataset.summaryStatus || "Hamısı");
  if (card.dataset.summarySmart) {
    currentSmartFilter = card.dataset.summarySmart;
    renderStatusControls();
  }
  setView(target);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  applyAppSettings();
  applyTranslations();
  applyDashboardPanelSizes();
  applyDashboardPanelOrder();
  syncAuthView();
  renderNotificationCenter();
  renderNotificationBadge();
  renderBackupPanel();
  renderImportMappingControls();
  if (isSuperAdmin()) {
    renderPlatformConsole();
    renderActivityLists();
    return;
  }
  renderProjectFilter();
  renderResourceControls();
  renderProjectContextBar();
  renderSummary();
  renderDashboard();
  renderProjectsView();
  renderTaskList();
  renderKanban();
  renderCalendar();
  renderGantt();
  renderReports();
  renderActivityLists();
  renderPlatformConsole();
  renderViews();
  renderRoleMatrix();
  if (typeof maybeAutoStartTour === "function") maybeAutoStartTour();
}

// Plan/fakt saatı forma tarixlərindən avtomat doldurur.
// Plan saat: başlama → bitmə (bütün iş saatları) — istifadəçi əl ilə dəyişə bilər,
// dəyişdiyi anda "manual" işarələnir və sonrakı tarix dəyişikliyi onu əzmir.
// Fakt saat: başlama → bu gün (bitibsə tamamlanma) — yalnız oxunur, çünki o,
// hesablanan kəmiyyətdir; real dəqiq rəqəm üçün tapşırığa vaxt qeydi yazılır.
function syncHourFieldsFromDates() {
  if (!plannedHoursInput || !actualHoursInput) return;
  const draft = {
    start: startDate.value,
    end: endDate.value,
    status: statusInput.value,
    completedAt: editingTaskCompletedAt
  };
  const planHint = document.querySelector("#plannedHoursHint");
  const factHint = document.querySelector("#actualHoursHint");

  const autoPlan = autoPlannedHours(draft);
  if (plannedHoursInput.dataset.manual !== "1") {
    plannedHoursInput.value = autoPlan;
  }
  if (planHint) {
    const days = workingDaysBetween(draft.start, draft.end);
    planHint.textContent = days
      ? `${days} iş günü × ${dailyWorkHours()} saat = ${autoPlan} saat${plannedHoursInput.dataset.manual === "1" ? " (əl ilə dəyişilib)" : ""}`
      : "Tarixləri seçin — avtomat hesablanacaq";
  }

  const entries = Array.isArray(editingTaskTimeEntries) ? editingTaskTimeEntries : [];
  if (entries.length) {
    const sum = Math.round(entries.reduce((total, entry) => total + (Number(entry.hours) || 0), 0) * 100) / 100;
    actualHoursInput.value = sum;
    if (factHint) factHint.textContent = `${entries.length} vaxt qeydinin cəmi`;
  } else {
    const autoFact = autoActualHours(draft);
    actualHoursInput.value = autoFact;
    if (factHint) {
      factHint.textContent = draft.start
        ? (draft.status === "Bitib" ? `Başlama → tamamlanma: ${autoFact} saat` : `Başlama → bu gün: ${autoFact} saat (keçən)`)
        : "Başlama tarixi seçilməyib";
    }
  }
}

// Formada redaktə olunan taskın hesablama üçün lazım olan sahələri.
// Forma inputlarında qarşılığı yoxdur, ona görə ayrıca saxlanılır.
let editingTaskCompletedAt = "";
let editingTaskTimeEntries = [];
// Məsul şəxs (owner) əl ilə seçilibmi? Avtomat təklifi (resursun rəhbəri) yalnız
// TASK daxilində keçərlidir; əl ilə dəyişilərsə, resurs sonradan dəyişsə belə
// avtomat onu ƏZMİR. Bu, avtomatı əl seçimindən izolyasiya edir və heç vaxt
// daimi user.managerId-ə toxunmur — sadəcə həmin taskın owner sahəsidir.
let ownerManuallySet = false;

function taskFormFields() {
  return [
    taskName, projectInput, projectResourceInput, startDate, endDate, statusInput, priorityInput,
    ownerInput, progressInput, plannedHoursInput, actualHoursInput, notesInput, parentTaskInput,
    taskDependenciesInput
  ].filter(Boolean);
}

function resetForm() {
  form.reset();
  taskFormFields().forEach((field) => { field.disabled = false; });
  taskId.value = "";
  formTitle.textContent = text("newTask");
  projectResourceInput.value = "";
  ownerInput.value = "";
  ownerManuallySet = false;
  statusInput.value = "Plan";
  priorityInput.value = "Normal";
  progressInput.value = 0;
  plannedHoursInput.value = 0;
  actualHoursInput.value = 0;
  delete plannedHoursInput.dataset.manual;
  editingTaskCompletedAt = "";
  editingTaskTimeEntries = [];
  parentTaskInput.value = "";
  taskDependenciesInput.innerHTML = taskOptionItems();
  if (taskExtraDetails) taskExtraDetails.open = false;
  syncHourFieldsFromDates();
}

function moveForward(task) {
  const currentIndex = statuses.indexOf(task.status);
  const nextStatus = statuses[Math.min(statuses.length - 1, Math.max(0, currentIndex) + 1)];
  if (shouldValidateDependencies(nextStatus) && !canStartTask(task)) {
    alert(dependencyBlockedMessage(task));
    return false;
  }
  if (nextStatus && nextStatus !== "Bitib") {
    task.status = nextStatus;
    const stepProgress = Math.round(((statuses.indexOf(nextStatus) + 1) / statuses.length) * 90);
    task.progress = Math.max(Number(task.progress) || 0, stepProgress);
    task.startedAt = task.startedAt || new Date().toISOString();
  }
  return true;
}

function handleTaskAction(action, id) {
  if (!currentUser) return;
  const task = appState.tasks.find((item) => item.id === id);
  if (!task) return;

  if (action === "edit") {
    if (!canManageTasks()) return;
    taskId.value = task.id;
    taskName.value = task.name;
    projectInput.value = task.project || "";
    renderResourceControls();
    ensureSelectOption(projectResourceInput, task.projectResource, resourceLabel(task.projectResource));
    ensureSelectOption(ownerInput, task.owner, resourceLabel(task.owner));
    projectResourceInput.value = task.projectResource || "";
    startDate.value = task.start;
    endDate.value = task.end;
    statusInput.value = task.status;
    priorityInput.value = task.priority;
    ownerInput.value = task.owner;
    ownerManuallySet = !!task.owner;
    progressInput.value = Number(task.progress) || 0;
    editingTaskCompletedAt = task.completedAt || "";
    editingTaskTimeEntries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
    // Saxlanılmış plan saat avtomat hesablanandan fərqlidirsə, demək əl ilə
    // qoyulub — tarix dəyişəndə onu əzməmək üçün "manual" işarələnir.
    plannedHoursInput.value = Number(task.plannedHours) || 0;
    if (Number(task.plannedHours) && Number(task.plannedHours) !== autoPlannedHours(task)) {
      plannedHoursInput.dataset.manual = "1";
    } else {
      delete plannedHoursInput.dataset.manual;
    }
    syncHourFieldsFromDates();
    notesInput.value = task.notes;
    { const ac = document.querySelector("#taskAcceptance"); if (ac) ac.value = task.acceptanceCriteria || ""; }
    parentTaskInput.value = task.parentTaskId || "";
    taskDependenciesInput.innerHTML = taskOptionItems(task.dependencyIds || [], task.id);
    formTitle.textContent = text("editTask");
    openTaskComposer();
  }

  if (action === "view") {
    openTaskDetail(task.id);
  }

  if (action === "next") {
    if (!canManageTasks()) return;
    if (!moveForward(task)) return;
    saveTasks();
    render();
  }

  if (action === "reopen") {
    if (!canManageTasks()) return;
    if (!canStartTask(task)) {
      alert(dependencyBlockedMessage(task));
      return;
    }
    task.status = "Davam edir";
    task.progress = Math.min(Number(task.progress) || 65, 95);
    task.completedAt = "";
    task.completedBy = "";
    task.approvedAt = "";
    task.approvedBy = "";
    task.completionRequestedAt = "";
    task.completionRequestedBy = "";
    saveTasks();
    render();
  }

  if (action === "request-done") {
    if (!canContribute()) return;
    if (!canStartTask(task)) {
      alert(dependencyBlockedMessage(task));
      return;
    }
    if (!confirm(text("confirmDone"))) return;
    const now = new Date().toISOString();
    task.status = task.status === "Plan" ? "Davam edir" : task.status;
    task.startedAt = task.startedAt || now;
    task.completionRequestedAt = now;
    task.completionRequestedBy = currentUser.username;
    task.progress = Math.max(Number(task.progress) || 0, 95);
    saveTasks();
    render();
  }

  if (action === "approve-done") {
    if (!canApproveTask(task)) return;
    if (!canStartTask(task)) {
      alert(dependencyBlockedMessage(task));
      return;
    }
    const now = new Date().toISOString();
    task.status = "Bitib";
    task.progress = 100;
    task.completedAt = task.completionRequestedAt || now;
    task.completedBy = task.completionRequestedBy || currentUser.username;
    task.approvedAt = now;
    task.approvedBy = currentUser.username;
    saveTasks();
    render();
  }

  if (action === "delete") {
    if (!canManageTasks()) return;
    appState.trash.push({ id: createId(), companyId: currentCompanyId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
    appState.tasks = appState.tasks.filter((item) => item.id !== task.id);
    saveTrash();
    saveTasks();
    render();
  }
}

function editTask(id, options = {}) {
  const task = appState.tasks.find((item) => item.id === id);
  if (!task) return;
  const readonly = Boolean(options.readonly || !canManageTasks());
  taskId.value = task.id;
  taskName.value = task.name;
  projectInput.value = task.project || "";
  renderResourceControls();
  projectInput.value = task.project || "";
  ensureSelectOption(projectResourceInput, task.projectResource, resourceLabel(task.projectResource));
  ensureSelectOption(ownerInput, task.owner, resourceLabel(task.owner));
  projectResourceInput.value = task.projectResource || "";
  startDate.value = task.start;
  endDate.value = task.end;
  statusInput.value = task.status;
  priorityInput.value = task.priority;
  ownerInput.value = task.owner;
  ownerManuallySet = !!task.owner;
  progressInput.value = Number(task.progress) || 0;
  editingTaskCompletedAt = task.completedAt || "";
  editingTaskTimeEntries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  plannedHoursInput.value = Number(task.plannedHours) || 0;
  if (Number(task.plannedHours) && Number(task.plannedHours) !== autoPlannedHours(task)) {
    plannedHoursInput.dataset.manual = "1";
  } else {
    delete plannedHoursInput.dataset.manual;
  }
  syncHourFieldsFromDates();
  notesInput.value = task.notes;
  { const ac = document.querySelector("#taskAcceptance"); if (ac) ac.value = task.acceptanceCriteria || ""; }
  parentTaskInput.value = task.parentTaskId || "";
  taskDependenciesInput.innerHTML = taskOptionItems(task.dependencyIds || [], task.id);
  if (taskExtraDetails && (task.parentTaskId || (task.dependencyIds || []).length || task.projectResource || task.acceptanceCriteria)) {
    taskExtraDetails.open = true;
  }
  formTitle.textContent = readonly ? task.name : text("editTask");
  taskFormFields().forEach((field) => { field.disabled = readonly; });
  openTaskComposer();
}

// ── Auto-snapshot (localStorage, max 5 kept) ─────────────────────────────
const AUTO_SNAP_KEY = "pm_auto_snapshots";
const AUTO_SNAP_MAX = 5;

function saveAutoSnapshot() {
  if (!appState.tasks.length && !appState.projects.length) return; // nothing to save
  try {
    const snaps = JSON.parse(localStorage.getItem(AUTO_SNAP_KEY) || "[]");
    snaps.unshift({ savedAt: new Date().toISOString(), payload: backupPayload() });
    if (snaps.length > AUTO_SNAP_MAX) snaps.length = AUTO_SNAP_MAX;
    localStorage.setItem(AUTO_SNAP_KEY, JSON.stringify(snaps));
    // Toast qəsdən göstərilmir: istifadəçinin edə biləcəyi bir şey yoxdur və
    // əsl backup artıq serverdədir (app_state_history). Bu lokal nüsxə yalnız
    // offline hal üçün ehtiyatdır.
  } catch (e) {
    console.warn("Auto-snapshot failed:", e.message);
  }
}

function listAutoSnapshots() {
  try { return JSON.parse(localStorage.getItem(AUTO_SNAP_KEY) || "[]"); }
  catch { return []; }
}

function backupPayload() {
  const companyId = currentCompanyId();
  // TENANT İZOLYASİYASI: `!x.companyId ||` şərti companyId-siz sətri HƏR şirkətə
  // sızdırırdı və bu payload birbaşa app_state-ə yazıldığı üçün sızma qalıcı olurdu.
  // İndi isSameCompany ilə eyni qayda: companyId yoxdursa "company-default" sayılır.
  const owns = (item) => (item?.companyId || "company-default") === companyId;
  const scopedProjects = isSuperAdmin() ? [] : appState.projects.filter(owns);
  // Tasklarda companyId YOXDUR — layihəyə yalnız adı ilə bağlıdırlar. Burada
  // əvvəl "layihə adı siyahıda yoxdursa taskı at" filtri vardı; bu, SERVERƏ
  // YAZILAN payload olduğu üçün layihəsi silinmiş / adı dəyişmiş / layihəsiz
  // taskları həmişəlik məhv edirdi (2026-07-21 data itkisi). İndi yalnız
  // BAŞQA şirkətə aid layihənin taskları atılır.
  const foreignProjectNames = new Set(
    appState.projects.filter((project) => !owns(project)).map((project) => project.name)
  );
  const notForeign = (name) => !foreignProjectNames.has(name);
  const scopedUsers = isSuperAdmin()
    ? appState.users.filter((user) => user.role === "super_admin" && user.id === currentUser?.id)
    : appState.users.filter((user) => user.role !== "super_admin" && owns(user));
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    tasks: isSuperAdmin() ? [] : appState.tasks.filter((task) => notForeign(task.project)),
    projects: scopedProjects,
    members: isSuperAdmin() ? [] : appState.members.filter(owns),
    teams: isSuperAdmin() ? [] : appState.teams.filter(owns),
    customers: isSuperAdmin() ? [] : appState.customers.filter(owns),
    managedFiles: isSuperAdmin() ? [] : appState.managedFiles.filter(owns),
    projectLinks: isSuperAdmin() ? [] : appState.projectLinks.filter((link) => notForeign(link.project)),
    registers: isSuperAdmin() ? [] : appState.registers.filter((item) => notForeign(item.project)),
    users: scopedUsers,
    trash: isSuperAdmin() ? [] : appState.trash.filter(owns),
    companyRegistry: isSuperAdmin() ? companyRegistryFromLocalState() : companyRegistryFromLocalState().filter((company) => company.id === companyId)
  };
}

function canUseBackend() {
  if (isSupabasePrimaryMode()) return false;
  const host = window.location?.hostname || "";
  return typeof fetch === "function"
    && window.location?.protocol !== "file:"
    && host !== "faridasadov.github.io"
    && !host.endsWith(".github.io");
}

function backendUrl(path) {
  const location = window.location;
  if (location?.protocol === "http:" || location?.protocol === "https:") return path;
  return `http://localhost:3000${path}`;
}

let _sseSource = null;
let _sseReconnectTimer = null;

function supabaseConfig() {
  const cfg = window.PROJECT_MANAGER_SUPABASE || {};
  if (!cfg.url || !cfg.anonKey || String(cfg.anonKey).includes("YOUR_PUBLIC_ANON_KEY")) return null;
  return {
    url: String(cfg.url).replace(/\/+$/, ""),
    anonKey: cfg.anonKey,
    redirectTo: cfg.redirectTo || (window.location.origin + window.location.pathname.replace(/[^/]*$/, "")),
    primaryBackend: cfg.primaryBackend !== false,
    storageBucket: cfg.storageBucket || "project-attachments",
    mailFunction: cfg.mailFunction || "project-manager-mail"
  };
}

function canUseSupabase() {
  return Boolean(supabaseConfig()) && typeof fetch === "function";
}

function isSupabasePrimaryMode() {
  const cfg = supabaseConfig();
  return Boolean(cfg && cfg.primaryBackend !== false && typeof fetch === "function");
}

// loadSupabaseSession → modules/storage.js

function saveSupabaseSession(session) {
  supabaseSession = session || null;
  if (supabaseSession) localStorage.setItem(supabaseSessionKey, JSON.stringify(supabaseSession));
  else localStorage.removeItem(supabaseSessionKey);
}

function supabaseUserFromAccessToken(accessToken) {
  try {
    const body = String(accessToken || "").split(".")[1];
    if (!body) return null;
    return JSON.parse(atob(body.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

async function supabaseRequest(path, options = {}) {
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase config yoxdur");
  const headers = {
    apikey: cfg.anonKey,
    ...(options.skipJsonContentType ? {} : { "content-type": "application/json" }),
    ...(options.auth === false ? {} : { authorization: `Bearer ${options.token || supabaseSession?.access_token || cfg.anonKey}` }),
    ...(options.headers || {})
  };
  let response;
  try {
    response = await fetch(`${cfg.url}${path}`, { ...options, headers });
  } catch (networkErr) {
    // Offline — return cached local state for read-only GET requests
    if (!options.method || options.method === "GET") {
      console.warn("Offline — supabaseRequest falling back to local state:", path);
      // __offline: versiya nömrəsi bilinmir — save zamanı serverdən təzələnməlidir,
      // yoxsa köhnə/uydurma versiya ilə yazıb serverdəkini əzərik.
      if (path.includes("/app_state")) return [{ state_json: backupPayload(), __offline: true }];
      return [];
    }
    throw new Error("Offline: " + networkErr.message);
  }
  const textBody = await response.text();
  const payload = textBody ? JSON.parse(textBody) : null;
  if (!response.ok) {
    const message = payload?.msg || payload?.message || payload?.error_description || payload?.error || `Supabase xətası (${response.status})`;
    throw new Error(message);
  }
  return payload;
}

function canUseSupabaseStorage() {
  return Boolean(supabaseConfig()?.storageBucket && supabaseSession?.access_token && supabaseWorkspaceId && typeof fetch === "function");
}

async function createSupabaseSignedUrl(path, expiresIn = 604800) {
  const cfg = supabaseConfig();
  const payload = await supabaseRequest(`/storage/v1/object/sign/${encodeURIComponent(cfg.storageBucket)}/${path}`, {
    method: "POST",
    body: JSON.stringify({ expiresIn })
  });
  const signedPath = payload?.signedURL || payload?.signedUrl || "";
  return signedPath ? `${cfg.url}${signedPath}` : "";
}

// Storage-a göndəriləcək təhlükəsiz content-type. İcra oluna bilən tiplər
// (html/svg/xhtml) signed URL ilə açılanda skript işlədə bilər — onları
// octet-stream kimi saxlayırıq (yüklənən fayl, açılan səhifə yox). Naməlum/boş
// tip də octet-stream olur; bucket allowlist-ində octet-stream var, ona görə
// hər fayl keçir (əvvəl message/rfc822 kimi tiplər rədd olunurdu).
function safeUploadContentType(file) {
  const risky = ["text/html", "image/svg+xml", "application/xhtml+xml", "text/xml", "application/xml"];
  const t = (file.type || "").toLowerCase();
  if (!t || risky.includes(t)) return "application/octet-stream";
  return file.type;
}

async function uploadSupabaseAttachment(file) {
  const maxFileSize = 10 * 1024 * 1024;
  if (file.size > maxFileSize) throw new Error(text("fileTooLarge"));
  const cfg = supabaseConfig();
  const id = createId();
  const path = `${supabaseWorkspaceId}/${id}-${safeStorageName(file.name)}`;
  const response = await fetch(`${cfg.url}/storage/v1/object/${encodeURIComponent(cfg.storageBucket)}/${path}`, {
    method: "POST",
    headers: {
      apikey: cfg.anonKey,
      authorization: `Bearer ${supabaseSession.access_token}`,
      "content-type": safeUploadContentType(file),
      "x-upsert": "true"
    },
    body: file
  });
  if (!response.ok) {
    let message = "Supabase Storage upload failed";
    try {
      const payload = await response.json();
      message = payload?.message || payload?.error || message;
    } catch {}
    throw new Error(message);
  }
  const signedUrl = await createSupabaseSignedUrl(path);
  return {
    id,
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size,
    storageProvider: "supabase",
    storageBucket: cfg.storageBucket,
    storagePath: path,
    dataUrl: signedUrl,
    addedAt: new Date().toISOString()
  };
}

async function deleteSupabaseObject(path) {
  const cfg = supabaseConfig();
  if (!cfg || !path || !supabaseSession?.access_token) return;
  await fetch(`${cfg.url}/storage/v1/object/${encodeURIComponent(cfg.storageBucket)}/${path}`, {
    method: "DELETE",
    headers: {
      apikey: cfg.anonKey,
      authorization: `Bearer ${supabaseSession.access_token}`
    }
  });
}

async function callSupabaseFunction(name, payload) {
  const cfg = supabaseConfig();
  if (!cfg || !supabaseSession?.access_token) return { skipped: true, reason: "Supabase session yoxdur" };
  const response = await fetch(`${cfg.url}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      apikey: cfg.anonKey,
      authorization: `Bearer ${supabaseSession.access_token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const textBody = await response.text();
  const body = textBody ? JSON.parse(textBody) : {};
  if (!response.ok) throw new Error(body?.error || body?.message || `Supabase function xətası (${response.status})`);
  return body;
}

async function supabaseSignUp(email, password, metadata) {
  const cfg = supabaseConfig();
  const redirect = encodeURIComponent(cfg?.redirectTo || (window.location.origin + window.location.pathname.replace(/[^/]*$/, "")));
  return supabaseRequest(`/auth/v1/signup?redirect_to=${redirect}`, {
    method: "POST",
    auth: false,
    body: JSON.stringify({
      email,
      password,
      data: metadata
    })
  });
}

async function supabasePasswordLogin(email, password) {
  const payload = await supabaseRequest("/auth/v1/token?grant_type=password", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email, password })
  });
  if (!payload?.access_token) throw new Error("Supabase sessiyası alınmadı");
  saveSupabaseSession(payload);
  return payload;
}

// Email VƏ YA istifadəçi adı ilə giriş. Email deyilsə, login-by-username edge
// function username-i (service-role) email-ə çevirib token qaytarır.
async function supabaseResolveLogin(login, password) {
  if (String(login).includes("@")) return supabasePasswordLogin(login, password);
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase config yoxdur");
  const res = await fetch(`${cfg.url}/functions/v1/login-by-username`, {
    method: "POST",
    headers: { apikey: cfg.anonKey, "content-type": "application/json" },
    body: JSON.stringify({ login: String(login).trim(), password })
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body?.access_token) throw new Error(body?.error || "İstifadəçi adı və ya parol yanlışdır");
  saveSupabaseSession(body);
  return body;
}

async function supabaseCreateWorkspaceProfile({ userId, companyName, companyId, subdomain, username, fullName, email }) {
  const workspaceRows = await supabaseRequest("/rest/v1/workspaces", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      company_key: companyId,
      name: companyName,
      owner_id: userId,
      status: "active",
      approval_status: "pending",
      email_verified: false
    })
  });
  const workspace = Array.isArray(workspaceRows) ? workspaceRows[0] : workspaceRows;
  if (!workspace?.id) throw new Error("Workspace yaradılmadı");
  await supabaseRequest("/rest/v1/profiles", {
    method: "POST",
    body: JSON.stringify({
      id: userId,
      workspace_id: workspace.id,
      role: "admin",
      username,
      full_name: fullName,
      email,
      profile_json: { company: companyName, subdomain, position: "Company Admin" },
      status: "active"
    })
  });
  supabaseWorkspaceId = workspace.id;
  localStorage.setItem(supabaseWorkspaceKey, supabaseWorkspaceId);
  return workspace;
}

function applySupabaseWorkspaceSession({ userId, email, username, fullName, companyName, companyId, workspaceId, role = "admin" }) {
  const normalized = normalizeUser({
    id: userId,
    username,
    passwordHash: "",
    role,
    managerId: "",
    companyId,
    profile: {
      fullName,
      email,
      position: role === "admin" ? "Company Admin" : roleLabel(role),
      company: companyName
    }
  });
  appState.users = [
    ...appState.users.filter((user) => user.id !== normalized.id && user.username !== normalized.username),
    normalized
  ];
  // Super-admin heç bir tenant deyil — saxta şirkət registry-yə düşməməlidir.
  if (role !== "super_admin") {
    // Mövcud qeydi qoru: burada plan "standard" hardcode edilirdi, ona görə
    // super-adminin verdiyi "pro" HƏR girişdə geri "standard" olurdu.
    const prior = companyRegistry.find((company) => company.id === companyId);
    companyRegistry = [
      ...companyRegistry.filter((company) => company.id !== companyId),
      {
        ...(prior || {}),
        id: companyId,
        name: companyName,
        subdomain: slugFromName(companyName),
        status: prior?.status || "active",
        plan: workspacePlan || prior?.plan || "standard",
        adminUsername: username,
        userCount: 1,
        projectCount: 0,
        createdAt: new Date().toISOString(),
        activatedAt: new Date().toISOString(),
        statusChangedAt: new Date().toISOString()
      }
    ];
    appSettings.companyRegistry = companyRegistry;
  }
  supabaseWorkspaceId = workspaceId;
  localStorage.setItem(supabaseWorkspaceKey, workspaceId);
  currentUser = normalized;
  localStorage.setItem(sessionKey, normalized.id);
  saveUsers();
  saveAppSettings();
  return normalized;
}

async function supabaseLoadSettings(workspaceId = supabaseWorkspaceId) {
  if (!workspaceId || !supabaseSession?.access_token) return null;
  const rows = await supabaseRequest(`/rest/v1/app_settings?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=settings_json&limit=1`);
  const settings = Array.isArray(rows) ? rows[0]?.settings_json : null;
  if (settings) {
    appSettings = { ...defaultSettings(), ...settings };
    companyRegistry = Array.isArray(appSettings.companyRegistry) ? appSettings.companyRegistry : companyRegistry;
    statuses = normalizeWorkflowStatuses(appSettings.workflowStatuses);
    localStorage.setItem(currentUser ? `${settingsKey}-${currentUser.id}` : settingsKey, JSON.stringify(appSettings));
  }
  return settings;
}

function scheduleSupabaseSettingsSave() {
  if (!canWriteWorkspaceData()) return;
  clearTimeout(supabaseSettingsSaveTimer);
  supabaseSettingsSaveTimer = setTimeout(() => {
    supabaseSaveSettings().catch((error) => console.warn("Supabase settings save failed", error));
  }, 600);
}

async function supabaseSaveSettings() {
  if (!canWriteWorkspaceData()) return;
  await supabaseRequest("/rest/v1/app_settings?on_conflict=workspace_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      workspace_id: supabaseWorkspaceId,
      settings_json: appSettings,
      updated_by: currentUser?.id || null,
      updated_at: new Date().toISOString()
    })
  });
}

async function syncSupabaseAuditLogs() {
  // Audit sinxronu KÖMƏKÇİ əməliyyatdır — login yolunda await olunur, ona görə
  // xətası heç vaxt yuxarı qalxmamalıdır (əks halda istifadəçi girə bilmir).
  try {
    await syncSupabaseAuditLogsInner();
  } catch (error) {
    console.warn("Audit log sinxronu alınmadı:", error?.message || error);
  }
}

async function syncSupabaseAuditLogsInner() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return;
  const pending = localAuditLogs
    .filter((entry) => entry?.id && !supabaseAuditSyncedIds.has(entry.id))
    .slice(0, 25);
  if (!pending.length) return;
  // legacy_id + on_conflict → təkrar göndərilən log XƏTA vermir, sadəcə atlanır.
  // (Əvvəllər unikal indeks 409 qaytarırdı və istifadəçi girişdə xəbərdarlıq görürdü.)
  await supabaseRequest("/rest/v1/audit_logs?on_conflict=workspace_id,legacy_id", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates" },
    body: JSON.stringify(pending.map((entry) => ({
      workspace_id: supabaseWorkspaceId,
      legacy_id: entry.id,
      actor_id: currentUser?.id || null,
      actor_label: entry.actor || currentUser?.username || "system",
      action: entry.action || "local.audit",
      entity_type: entry.entity_type || entry.entityType || "",
      entity_id: String(entry.entity_id || entry.entityId || "").match(/^[0-9a-f-]{36}$/i) ? entry.entity_id || entry.entityId : null,
      details_json: { ...entry, legacy_id: entry.id, detail: entry.detail || "" },
      created_at: entry.created_at || entry.createdAt || new Date().toISOString()
    })))
  });
  pending.forEach((entry) => supabaseAuditSyncedIds.add(entry.id));
  persistSyncedIdSet(supabaseAuditSyncedKey, supabaseAuditSyncedIds);
}

async function syncSupabaseNotifications() {
  try {
    await syncSupabaseNotificationsInner();
  } catch (error) {
    console.warn("Bildiriş sinxronu alınmadı:", error?.message || error);
  }
}

async function syncSupabaseNotificationsInner() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return;
  const pending = notifications
    .filter((entry) => entry?.id && !supabaseNotificationSyncedIds.has(entry.id))
    .slice(0, 25);
  if (!pending.length) return;
  await supabaseRequest("/rest/v1/notifications", {
    method: "POST",
    body: JSON.stringify(pending.map((entry) => ({
      workspace_id: supabaseWorkspaceId,
      type: entry.type || "app",
      recipient: entry.targetUserId || "",
      subject: entry.message || "Project Manager",
      body: entry.message || "",
      status: entry.read ? "read" : "unread",
      payload_json: { ...entry, legacy_id: entry.id },
      created_at: entry.createdAt || new Date().toISOString()
    })))
  });
  pending.forEach((entry) => supabaseNotificationSyncedIds.add(entry.id));
  persistSyncedIdSet(supabaseNotificationSyncedKey, supabaseNotificationSyncedIds);
}

async function supabaseFetchAuditLogs() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return false;
  const rows = await supabaseRequest(`/rest/v1/audit_logs?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&select=actor_label,action,entity_type,entity_id,created_at,details_json&order=created_at.desc&limit=100`);
  auditLogs = (Array.isArray(rows) ? rows : []).map((row) => ({
    actor: row.actor_label,
    action: row.action,
    entity_type: row.entity_type,
    entity_id: row.entity_id,
    created_at: row.created_at,
    details_json: row.details_json
  }));
  renderActivityLists();
  return true;
}

async function supabaseFetchNotifications() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return false;
  const rows = await supabaseRequest(`/rest/v1/notifications?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&select=type,recipient,subject,status,created_at,payload_json&order=created_at.desc&limit=100`);
  mailHistory = (Array.isArray(rows) ? rows : []).map((row) => ({
    type: row.type,
    recipient: row.recipient,
    subject: row.subject,
    status: row.status,
    created_at: row.created_at,
    payload_json: row.payload_json
  }));
  renderActivityLists();
  return true;
}

async function supabaseRegisterWorkspace({ companyName, subdomain, username, password, fullName, email }) {
  if (!canUseSupabase()) throw new Error("Supabase config aktiv deyil");
  const companyId = companyIdFromName(companyName);
  const signup = await supabaseSignUp(email, password, {
    full_name: fullName,
    username,
    company_name: companyName,
    company_key: companyId
  });
  const session = signup.session || signup;
  if (!session?.access_token) {
    throw new Error("Qeydiyyat yaradıldı. Supabase email təsdiqini tamamlayın, sonra email ilə daxil olun.");
  }
  saveSupabaseSession(session);
  // Join-or-create qərarını server verir (service-role):
  //  • Şirkət adı bazadakı mövcud şirkətlə üst-üstə düşürsə → pending qoşulma sorğusu.
  //  • Yeni şirkətdirsə → yeni workspace (super-admin təsdiqini gözləyir).
  let result;
  try {
    result = await callSupabaseFunction("register-workspace", { companyName, subdomain, username, fullName, email });
  } catch (err) {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    currentUser = null;
    throw err;
  }
  // Hər iki halda app-a giriş etmirik — sessiyanı bağlayırıq.
  saveSupabaseSession(null);
  supabaseWorkspaceId = "";
  localStorage.removeItem(supabaseWorkspaceKey);
  currentUser = null;
  if (result?.mode === "join") {
    recordAudit("workspace.join_requested", "company", companyId, companyName);
    throw new Error(`Qoşulma sorğunuz “${result.companyName || companyName}” şirkətinə göndərildi — şirkət admini təsdiqindən sonra daxil ola bilərsiniz.`);
  }
  recordAudit("workspace.registered", "company", companyId, companyName);
  throw new Error("Qeydiyyat yaradıldı. Hesabınız super-admin təsdiqini gözləyir — təsdiqdən sonra email ilə daxil ola bilərsiniz.");
}

async function supabaseLoadWorkspaceState(workspaceId) {
  const rows = await supabaseRequest(`/rest/v1/app_state?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=state_json,state_version&limit=1`);
  const row = Array.isArray(rows) ? rows[0] : null;
  const state = row?.state_json || null;
  // Optimistik kilid üçün oxuduğumuz versiya. null = sətir hələ yoxdur (ilk
  // yazılış), "unknown" = offline fallback, save-dən əvvəl serverdən təzələnir.
  supabaseStateVersion = !row ? null : row.__offline ? "unknown" : Number(row.state_version) || 0;
  // Serverdə NEÇƏ task olduğunu yadda saxlayırıq — save zamanı "hamısı yoxa çıxdı"
  // ssenarisini bloklamaq üçün yeganə etibarlı ölçü budur.
  supabaseRemoteTaskCount = Array.isArray(state?.tasks) ? state.tasks.length : 0;
  if (state?.tasks) importBackup(state);
  // Yalnız uğurlu oxumadan sonra yazmağa icazə veririk (sorğu atarsa flag qalxmır).
  supabaseStateLoaded = true;
  await supabaseMergeProfilesIntoUsers(workspaceId);
}

// `profiles` cədvəli — istifadəçilər üçün HƏQİQƏT MƏNBƏYİDİR. Əvvəl istifadəçi
// siyahısı yalnız app_state blob-undan gəlirdi: admin panel real auth hesabı
// yaradırdı (profiles-a düşürdü), amma blob yalnız həmin admin brauzerindən
// yazıldığı üçün yeni adam öz sessiyasında siyahıda YOX idi → giriş edə bilmirdi.
// İndi hər yükləmədə baza blob-un üstünə merge olunur (heç kim silinmir).
async function supabaseMergeProfilesIntoUsers(workspaceId) {
  if (!workspaceId) return;
  let rows = null;
  try {
    rows = await supabaseRequest(`/rest/v1/profiles?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=id,username,full_name,email,role,status,profile_json`);
  } catch (error) {
    console.warn("Profiles merge atlandı:", error?.message || error);
    return;
  }
  if (!Array.isArray(rows) || !rows.length) return;
  const companyId = currentCompanyId();
  const byId = new Map(appState.users.map((user) => [user.id, user]));
  let changed = false;
  rows.forEach((row) => {
    if (row.role === "super_admin" || row.status === "disabled") return;
    const existing = byId.get(row.id);
    const appRole = row.profile_json?.appRole || row.role || "user";
    const merged = normalizeUser({
      ...(existing || {}),
      id: row.id,
      username: existing?.username || row.username || row.email,
      passwordHash: existing?.passwordHash || "",
      role: appRole,
      managerId: existing?.managerId || "",
      companyId,
      profile: {
        ...(existing?.profile || {}),
        fullName: existing?.profile?.fullName || row.full_name || row.username || "",
        email: row.email || existing?.profile?.email || "",
        position: row.profile_json?.position || existing?.profile?.position || ""
      }
    });
    if (!existing || JSON.stringify(existing) !== JSON.stringify(merged)) changed = true;
    byId.set(row.id, merged);
  });
  // Online rejimdə `profiles` YEGANƏ həqiqət mənbəyidir: bazada olmayan adam
  // blob-da qalmamalıdır. Əks halda bir cihazdan silinən istifadəçi digər
  // cihazların blob-unda "zombi" kimi yaşayır və növbəti yazılışla geri qayıdır.
  // RLS: workspace üzvü bütün workspace profillərini oxuyur → siyahı tamdır.
  const dbIds = new Set(rows.map((row) => row.id));
  const survivors = [...byId.values()].filter((user) => (
    dbIds.has(user.id) ||
    user.id === currentUser?.id ||
    (user.companyId || "company-default") !== companyId
  ));
  if (survivors.length !== byId.size) changed = true;
  if (!changed) return;
  appState.users = survivors;
  saveUsers();
}

async function supabaseLoginWorkspace(email, password) {
  if (!canUseSupabase()) return null;
  const session = await supabaseResolveLogin(email, password);
  const userId = session.user?.id;
  if (!userId) throw new Error("Supabase istifadəçisi tapılmadı");
  const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,workspace_id,username,full_name,email,role,status,profile_json`);
  let profile = Array.isArray(profiles) ? profiles[0] : null;
  // Super-admin heç bir tenant-a bağlı deyil (workspace_id=NULL) → platforma sessiyası.
  if (profile?.role === "super_admin") {
    applySupabaseWorkspaceSession({
      userId,
      email: profile.email || email,
      username: profile.username || email,
      fullName: profile.full_name || profile.username || email,
      companyName: "Platform",
      companyId: "platform",
      workspaceId: "",
      role: "super_admin"
    });
    await syncSupabaseAuditLogs();
    return currentUser;
  }
  if (!profile?.workspace_id) {
    const meta = session.user?.user_metadata || {};
    const emailPrefix = email.split("@")[0];
    // OAuth istifadəçiləri üçün şirkət adı email-in @-dən əvvəlki hissəsi.
    const companyName = meta.company_name || meta.company || emailPrefix;
    const companyId = meta.company_key || `${companyIdFromName(companyName)}-${String(userId).slice(0, 8)}`;
    const username = meta.username || emailPrefix;
    const fullName = meta.full_name || meta.name || username;
    const workspace = await supabaseCreateWorkspaceProfile({
      userId,
      companyName,
      companyId,
      subdomain: slugFromName(companyName),
      username,
      fullName,
      email
    });
    profile = {
      id: userId,
      workspace_id: workspace.id,
      username,
      full_name: fullName,
      email,
      role: "admin",
      profile_json: { company: companyName }
    };
  }
  // Üzvlük gate — pending (qoşulma sorğusu) / invited (dəvət, parol gözləyir) girişi bloklanır.
  if (profile.status === "pending" || profile.status === "invited") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error(profile.status === "pending"
      ? "Hesabınız şirkət admininin təsdiqini gözləyir — təsdiqdən sonra daxil ola biləcəksiniz."
      : "Dəvətiniz hələ aktivləşməyib — dəvət linkindən parolunuzu qurun.");
  }
  if (profile.status === "disabled") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Hesabınız deaktiv edilib. Şirkət admininizlə əlaqə saxlayın.");
  }
  const workspaces = await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(profile.workspace_id)}&select=id,company_key,name,status,approval_status,email_verified,rejected_reason,max_users,plan`);
  const workspace = Array.isArray(workspaces) ? workspaces[0] : null;
  if (!workspace?.id) throw new Error("Workspace oxunmadı");
  workspaceMaxUsers = Number(workspace.max_users) || 0;
  workspacePlan = workspace.plan || "standard";
  workspaceDbRole = profile.role || "";
  workspaceMemberActive = profile.status ? profile.status === "active" : true;
  workspaceApproved = workspace.approval_status === "active";
  // Təsdiq gate — super-admin bu yola düşmür (yuxarıda idarə olunur).
  if (workspace.approval_status === "rejected") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Qeydiyyat rədd edildi" + (workspace.rejected_reason ? ": " + workspace.rejected_reason : "") + ".");
  }
  if (workspace.approval_status && workspace.approval_status !== "active") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Hesabınız super-admin təsdiqini gözləyir — təsdiqdən sonra daxil ola biləcəksiniz.");
  }
  const companyName = workspace.name || profile.profile_json?.company || profile.username;
  const companyId = workspace.company_key || companyIdFromName(companyName);
  applySupabaseWorkspaceSession({
    userId,
    email: profile.email || email,
    username: profile.username || email,
    fullName: profile.full_name || profile.username || email,
    companyName,
    companyId,
    workspaceId: workspace.id,
    role: profile.profile_json?.appRole || profile.role || "admin"
  });
  await supabaseLoadWorkspaceState(workspace.id);
  await supabaseLoadSettings(workspace.id);
  await syncSupabaseAuditLogs();
  await syncSupabaseNotifications();
  supabaseRealtimeConnect(workspace.id);
  return currentUser;
}

// ── Supabase Realtime — live workspace sync ──────────────────────────────
// ── Supabase Realtime via official JS client (@supabase/supabase-js v2) ──
let _supabaseClient = null;
let _realtimeChannel = null;

function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;
  const cfg = supabaseConfig();
  if (!cfg || typeof supabase === "undefined") return null;
  _supabaseClient = supabase.createClient(cfg.url, cfg.anonKey, {
    auth: { persistSession: false },
    realtime: { params: { eventsPerSecond: 2 } }
  });
  return _supabaseClient;
}

function supabaseRealtimeConnect(workspaceId) {
  if (!canUseSupabase() || !workspaceId) return;
  const client = getSupabaseClient();
  if (!client) return;

  // Set auth token so Realtime respects RLS
  if (supabaseSession?.access_token) {
    client.realtime.setAuth(supabaseSession.access_token);
  }

  // Remove previous subscription
  if (_realtimeChannel) { client.removeChannel(_realtimeChannel); _realtimeChannel = null; }

  _realtimeChannel = client
    .channel("pm-workspace-" + workspaceId)
    .on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "app_state",
      filter: `workspace_id=eq.${workspaceId}`
    }, (payload) => {
      const record = payload.new;
      if (!record?.state_json?.tasks) return;
      const remoteTs = record.state_json.meta?.savedAt || 0;
      const localTs  = appData?.meta?.savedAt || 0;
      if (remoteTs > localTs) {
        // Realtime ilə gələn versiyanı da qeyd et, yoxsa optimistik kilid
        // köhnə versiya nömrəsi ilə hər yazılışda konflikt verər.
        if (record.state_version != null) supabaseStateVersion = Number(record.state_version) || 0;
        importBackup(record.state_json);
        render();
        showToast(text("realtimeConnected") || "↺ Realtime sync");
      }
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") console.log("Realtime: subscribed to workspace", workspaceId);
    });
}

async function supabaseCompleteSession(session) {
  if (!session?.access_token) return null;
  const tokenUser = session.user || supabaseUserFromAccessToken(session.access_token);
  const userId = tokenUser?.id || tokenUser?.sub;
  const email = tokenUser?.email || "";
  if (!userId || !email) throw new Error("Supabase təsdiq sessiyası oxunmadı");
  saveSupabaseSession({ ...session, user: tokenUser });
  const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,workspace_id,username,full_name,email,role,status,profile_json`);
  let profile = Array.isArray(profiles) ? profiles[0] : null;
  // Super-admin heç bir tenant-a bağlı deyil → platforma sessiyası.
  if (profile?.role === "super_admin") {
    applySupabaseWorkspaceSession({
      userId,
      email: profile.email || email,
      username: profile.username || email,
      fullName: profile.full_name || profile.username || email,
      companyName: "Platform",
      companyId: "platform",
      workspaceId: "",
      role: "super_admin"
    });
    await syncSupabaseAuditLogs();
    return currentUser;
  }
  if (!profile?.workspace_id) {
    const meta = tokenUser.user_metadata || {};
    const emailPrefix = email.split("@")[0];
    const username = meta.username || emailPrefix;
    const fullName = meta.full_name || meta.name || username;
    const typedCompany = meta.company_name || meta.company;
    if (typedCompany) {
      // Email/parol qeydiyyatı — join-or-create qərarını server (service-role) verir:
      //  • Şirkət adı mövcud workspace-lə üst-üstə düşürsə → pending qoşulma sorğusu (giriş yox).
      //  • Yeni şirkətdirsə → yeni workspace + admin profil (super-admin təsdiqini gözləyir).
      let prov;
      try {
        prov = await callSupabaseFunction("register-workspace", {
          companyName: typedCompany, subdomain: slugFromName(typedCompany), username, fullName, email
        });
      } catch (err) {
        saveSupabaseSession(null); supabaseWorkspaceId = "";
        throw err;
      }
      if (prov?.mode === "join") {
        saveSupabaseSession(null); supabaseWorkspaceId = "";
        throw new Error(`Qoşulma sorğunuz “${prov.companyName || typedCompany}” şirkətinə göndərildi — şirkət admini təsdiqindən sonra daxil ola bilərsiniz.`);
      }
      // create → profil indi mövcuddur, yenidən oxu və aşağıdakı təsdiq gate-inə burax.
      const re = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,workspace_id,username,full_name,email,role,status,profile_json`);
      profile = Array.isArray(re) ? re[0] : null;
      if (!profile?.workspace_id) throw new Error("Profil yaradılmadı");
    } else {
      // OAuth (Google) — company adı yoxdur; email prefiksi ilə unikal workspace yarat.
      const companyName = emailPrefix;
      const companyId = meta.company_key || `${companyIdFromName(companyName)}-${String(userId).slice(0, 8)}`;
      const workspace = await supabaseCreateWorkspaceProfile({
        userId, companyName, companyId, subdomain: slugFromName(companyName), username, fullName, email
      });
      profile = {
        id: userId, workspace_id: workspace.id, username, full_name: fullName, email,
        role: "admin", status: "active", profile_json: { company: companyName }
      };
    }
  }
  // Üzvlük gate — pending (qoşulma sorğusu) / invited (dəvət, parol gözləyir) girişi bloklanır.
  if (profile.status === "pending" || profile.status === "invited") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error(profile.status === "pending"
      ? "Hesabınız şirkət admininin təsdiqini gözləyir — təsdiqdən sonra daxil ola biləcəksiniz."
      : "Dəvətiniz hələ aktivləşməyib — dəvət linkindən parolunuzu qurun.");
  }
  if (profile.status === "disabled") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Hesabınız deaktiv edilib. Şirkət admininizlə əlaqə saxlayın.");
  }
  const workspaces = await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(profile.workspace_id)}&select=id,company_key,name,status,approval_status,email_verified,rejected_reason,max_users,plan`);
  const workspace = Array.isArray(workspaces) ? workspaces[0] : null;
  if (!workspace?.id) throw new Error("Workspace oxunmadı");
  workspaceMaxUsers = Number(workspace.max_users) || 0;
  workspacePlan = workspace.plan || "standard";
  workspaceDbRole = profile.role || "";
  workspaceMemberActive = profile.status ? profile.status === "active" : true;
  workspaceApproved = workspace.approval_status === "active";
  // Email təsdiqləndi — workspace-i email_verified=true et ki, təsdiq növbəsinə düşsün.
  if (!workspace.email_verified) {
    try {
      await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(workspace.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ email_verified: true })
      });
      workspace.email_verified = true;
    } catch (error) { console.warn("email_verified yenilənmədi:", error?.message); }
  }
  // Təsdiq gate — email təsdiqlənsə də super-admin təsdiqi lazımdır.
  if (workspace.approval_status === "rejected") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Qeydiyyat rədd edildi" + (workspace.rejected_reason ? ": " + workspace.rejected_reason : "") + ".");
  }
  if (workspace.approval_status && workspace.approval_status !== "active") {
    saveSupabaseSession(null);
    supabaseWorkspaceId = "";
    throw new Error("Emailiniz təsdiqləndi. Hesabınız super-admin təsdiqini gözləyir — təsdiqdən sonra daxil ola biləcəksiniz.");
  }
  const companyName = workspace.name || profile.profile_json?.company || "Project Manager";
  const companyId = workspace.company_key || companyIdFromName(companyName);
  applySupabaseWorkspaceSession({
    userId,
    email: profile.email || email,
    username: profile.username || email.split("@")[0],
    fullName: profile.full_name || profile.username || email,
    companyName,
    companyId,
    workspaceId: workspace.id,
    role: profile.profile_json?.appRole || profile.role || "admin"
  });
  await supabaseLoadWorkspaceState(workspace.id);
  await supabaseLoadSettings(workspace.id);
  await syncSupabaseAuditLogs();
  await syncSupabaseNotifications();
  supabaseRealtimeConnect(workspace.id);
  return currentUser;
}

function isSupabaseTokenExpired(session) {
  if (!session?.access_token) return true;
  // expires_at is Unix timestamp in seconds; refresh 60s before actual expiry
  if (session.expires_at) return Date.now() / 1000 > session.expires_at - 60;
  // Fallback: decode JWT exp claim
  try {
    const body = JSON.parse(atob(session.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return body.exp ? Date.now() / 1000 > body.exp - 60 : false;
  } catch { return false; }
}

async function refreshSupabaseToken() {
  const token = supabaseSession?.refresh_token;
  if (!token) return false;
  try {
    const payload = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ refresh_token: token })
    });
    if (!payload?.access_token) return false;
    saveSupabaseSession(payload);
    return true;
  } catch (err) {
    console.warn("Token refresh failed:", err.message);
    return false;
  }
}

async function resumeSupabaseSession() {
  if (!canUseSupabase() || !supabaseSession?.access_token) return false;

  // Refresh expired token before doing anything else
  if (isSupabaseTokenExpired(supabaseSession)) {
    const refreshed = await refreshSupabaseToken();
    if (!refreshed) {
      saveSupabaseSession(null);
      return false;
    }
  }

  // If user/workspace not in memory yet, reload profile from Supabase
  if (!currentUser || !supabaseWorkspaceId) {
    try {
      await supabaseCompleteSession(supabaseSession);
    } catch (err) {
      console.warn("Session profile reload failed:", err.message);
      return false;
    }
    return true;
  }

  // KRİTİK: bu qol (sessiya localStorage-dan bərpa olunub) əvvəl gate
  // dəyişənlərini QURMURDU — workspaceDbRole="" və workspaceApproved=false
  // qalırdı, deməli canWriteWorkspaceData() false idi və səhifə yeniləndikdən
  // sonra HEÇ NƏ serverə yazılmırdı (hər şey yalnız localStorage-da qalıb
  // növbəti importBackup ilə itirdi).
  await refreshWorkspaceGate(supabaseWorkspaceId);
  await supabaseLoadWorkspaceState(supabaseWorkspaceId);
  await supabaseLoadSettings(supabaseWorkspaceId);
  await syncSupabaseAuditLogs();
  await syncSupabaseNotifications();
  supabaseRealtimeConnect(supabaseWorkspaceId);
  return true;
}

// profiles.role + workspaces.approval_status/plan/max_users dəyərlərini
// serverdən oxuyub yazma icazəsi dəyişənlərini qurur.
async function refreshWorkspaceGate(workspaceId) {
  const userId = currentUser?.id;
  if (!userId || !workspaceId) return false;
  try {
    const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=role,status`);
    const profile = Array.isArray(profiles) ? profiles[0] : null;
    const workspaces = await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(workspaceId)}&select=approval_status,plan,max_users`);
    const workspace = Array.isArray(workspaces) ? workspaces[0] : null;
    if (!profile || !workspace) return false;
    workspaceDbRole = profile.status === "active" ? (profile.role || "") : "";
    workspaceMemberActive = profile.status === "active";
    workspaceApproved = workspace.approval_status === "active";
    workspacePlan = workspace.plan || "standard";
    workspaceMaxUsers = Number(workspace.max_users) || 0;
    return true;
  } catch (error) {
    console.warn("Workspace gate oxunmadı:", error?.message || error);
    return false;
  }
}

async function handleSupabaseAuthRedirect() {
  if (!canUseSupabase() || !window.location?.hash?.includes("access_token=")) return false;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const session = {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
    expires_at: Number(params.get("expires_at")) || 0,
    expires_in: Number(params.get("expires_in")) || 0,
    token_type: params.get("token_type") || "bearer",
    type: params.get("type") || ""
  };
  window.history?.replaceState?.(null, document.title, window.location.pathname + window.location.search);
  try {
    await supabaseCompleteSession(session);
    loginError.textContent = "";
    registerError.textContent = "";
    render();
    // Recovery email linki: sessiya quruldu, indi istifadəçi yeni parol təyin etməlidir.
    if (session.type === "recovery") openRecoveryPasswordModal();
    return true;
  } catch (error) {
    loginError.textContent = error.message;
    registerError.textContent = error.message;
    render();
    // Gate blokladı (pending/rejected) — mesaj görünsün deyə auth panelini aç
    // və toast göstər, əks halda istifadəçi səbəbini görmədən welcome ekranına qayıdır.
    openAuthPanel("login");
    showToast(error.message, 6000);
    return false;
  }
}

// ── Google OAuth (GoTrue implicit flow → hash → handleSupabaseAuthRedirect) ──
function supabaseGoogleAuth() {
  const cfg = supabaseConfig();
  if (!cfg) {
    const msg = "Online rejim aktiv deyil — Google girişi üçün Supabase konfiqi lazımdır.";
    if (loginError) loginError.textContent = msg;
    if (registerError) registerError.textContent = msg;
    return;
  }
  const redirectTo = cfg.redirectTo || (window.location.origin + window.location.pathname);
  window.location.href = `${cfg.url}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
}

// Yazma icazəsi — RLS şərtinin klient güzgüsü:
//   pm_same_workspace AND pm_is_active_member() AND pm_workspace_approved()
// Əvvəl burada (və RLS-də) admin tələb olunurdu: manager/user task yaradırdı,
// ekranda görürdü, amma yazı 403 alıb SƏSSİZCƏ itirdi. İndi iş sahəsinin
// aktiv üzvü yaza bilir; köhnə vəziyyətin əzilməsinin qarşısını
// state_version optimistik kilidi alır.
function canWriteWorkspaceData() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return false;
  if (isSuperAdmin()) return false;               // super-admin tenant datası yazmır
  if (!workspaceMemberActive) return false;       // profiles.status === "active"
  if (!workspaceApproved) return false;
  return true;
}

function scheduleSupabaseSave() {
  if (!canWriteWorkspaceData()) return;
  clearTimeout(supabaseSaveTimer);
  supabaseSaveTimer = setTimeout(() => {
    supabaseSaveState().catch((error) => console.warn("Supabase save failed", error));
  }, 500);
}

async function flushSupabaseSave() {
  if (!canWriteWorkspaceData()) return;
  clearTimeout(supabaseSaveTimer);
  await supabaseSaveState();
}

// Saxlamalar SIRA ilə getməlidir. Paralel iki save eyni state_version-u oxuyur,
// ikincisi qaçılmaz olaraq "konflikt" alır və istifadəçiyə yalançı xəbərdarlıq
// çıxır. Bu növbə yalnız ÖZ sorğularımızı sıralayır — başqa cihazın yazısı
// yenə də real konflikt kimi tutulur.
let supabaseSaveQueue = Promise.resolve();
function supabaseSaveState() {
  const run = () => supabaseSaveStateInner();
  supabaseSaveQueue = supabaseSaveQueue.then(run, run);
  return supabaseSaveQueue;
}

async function supabaseSaveStateInner() {
  if (!canWriteWorkspaceData()) return;
  // Remote state hələ oxunmayıbsa yazma — boot state real datanı əzərdi.
  if (!supabaseStateLoaded) {
    console.warn("Supabase save atlandı: remote state hələ yüklənməyib");
    return;
  }
  const payload = backupPayload();
  // TƏHLÜKƏSİZLİK KLAPANI: yaddaşda data var, amma scope filtri hər şeyi süzüb atıbsa
  // (məs. layihələrin companyId-si cari tenant ilə uyğun gəlmirsə) BOŞ payload yazmırıq.
  const payloadEmpty = !payload.tasks.length && !payload.projects.length;
  const memoryHasData = appState.tasks.length > 0 || appState.projects.length > 0;
  if (payloadEmpty && memoryHasData) {
    console.error("Supabase save BLOKLANDI: boş payload real datanı əzəcəkdi.",
      { memoryTasks: appState.tasks.length, memoryProjects: appState.projects.length, companyId: currentCompanyId() });
    return;
  }
  // İKİNCİ KLAPAN: serverdə tasklar var idisə, sıfır task yazmaq həmişə xətadır.
  // (Köhnə klapan yalnız tasks VƏ projects birlikdə boş olanda işləyirdi — 1 layihə
  // qalmışdısa 19 taskın silinməsini buraxırdı.) Real toplu silmə istəyi varsa
  // istifadəçi təsdiqləyir.
  if (supabaseRemoteTaskCount > 0 && !payload.tasks.length) {
    const ok = confirm(
      `DİQQƏT: serverdə ${supabaseRemoteTaskCount} task var, indi 0 task yazılacaq — hamısı silinəcək.\n\n` +
      `Bunu həqiqətən istəyirsinizsə OK basın. Əmin deyilsinizsə LƏĞV edin (data qorunacaq).`
    );
    if (!ok) {
      console.error("Supabase save BLOKLANDI: bütün tasklar silinəcəkdi.", { remote: supabaseRemoteTaskCount });
      return;
    }
  }
  const body = {
    state_json: payload,
    saved_by: currentUser?.id || null,
    updated_at: new Date().toISOString()
  };
  // Offline oxunubsa versiya bilinmir — yazmadan əvvəl serverdən götürürük.
  if (supabaseStateVersion === "unknown") await supabaseRefreshStateVersion();
  // İlk yazılış (sətir yoxdur) → adi upsert.
  if (supabaseStateVersion === null) {
    await supabaseRequest("/rest/v1/app_state?on_conflict=workspace_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify({ workspace_id: supabaseWorkspaceId, ...body })
    });
    await supabaseRefreshStateVersion();
    supabaseRemoteTaskCount = payload.tasks.length;
    return;
  }
  // OPTİMİSTİK KİLİD: yalnız oxuduğumuz versiya hələ də serverdədirsə yazırıq.
  // Əks halda başqa tab/cihaz aradan dəyişiklik edib — onu əzmək köhnə
  // vəziyyəti geri qaytarır (silinən komanda/istifadəçi "dirilir").
  const updated = await supabaseRequest(
    `/rest/v1/app_state?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&state_version=eq.${supabaseStateVersion}`,
    { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(body) }
  );
  if (Array.isArray(updated) && updated.length) {
    supabaseStateVersion = Number(updated[0].state_version) || supabaseStateVersion + 1;
    supabaseRemoteTaskCount = payload.tasks.length;
    return;
  }
  // Konflikt: heç bir sətir yenilənmədi.
  const keepMine = confirm(
    "Bu iş sahəsi başqa bir sessiyada (digər tab və ya cihaz) dəyişdirilib.\n\n" +
    "OK — sizin cari vəziyyətiniz yazılsın (digər dəyişikliklər itə bilər)\n" +
    "Ləğv et — serverdəki son vəziyyət yüklənsin (sizin son dəyişikliyiniz itə bilər)"
  );
  if (keepMine) {
    await supabaseRefreshStateVersion();
    if (supabaseStateVersion === null) return;
    await supabaseRequest(`/rest/v1/app_state?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}`, {
      method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(body)
    });
    await supabaseRefreshStateVersion();
    supabaseRemoteTaskCount = payload.tasks.length;
    return;
  }
  await supabaseLoadWorkspaceState(supabaseWorkspaceId);
  render();
  if (typeof showToast === "function") showToast("Serverdəki son vəziyyət yükləndi");
}

async function supabaseRefreshStateVersion() {
  try {
    const rows = await supabaseRequest(`/rest/v1/app_state?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&select=state_version&limit=1`);
    const row = Array.isArray(rows) ? rows[0] : null;
    supabaseStateVersion = row ? Number(row.state_version) || 0 : null;
  } catch { /* növbəti yükləmədə düzələcək */ }
}

function connectSSE() {
  if (!canUseBackend() || !authToken || _sseSource) return;
  const url = backendUrl("/api/events") + "?token=" + encodeURIComponent(authToken);
  try {
    _sseSource = new EventSource(url);
    _sseSource.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "state_updated") {
          syncFromBackend().catch(() => {});
        }
      } catch {}
    });
    _sseSource.addEventListener("error", () => {
      disconnectSSE();
      _sseReconnectTimer = setTimeout(connectSSE, 15000);
    });
  } catch {}
}

function disconnectSSE() {
  clearTimeout(_sseReconnectTimer);
  if (_sseSource) { try { _sseSource.close(); } catch {} _sseSource = null; }
}

function authHeaders(extraHeaders = {}) {
  return {
    ...extraHeaders,
    ...(authToken ? { authorization: `Bearer ${authToken}` } : {})
  };
}

function scheduleBackendSave() {
  scheduleSupabaseSave();
  if (!backendSyncReady || !canUseBackend()) return;
  clearTimeout(backendSaveTimer);
  backendSaveTimer = setTimeout(() => {
    saveBackendState();
  }, 350);
}

async function saveBackendState() {
  if (!canUseBackend() || isSuperAdmin()) return;
  try {
    await fetch(backendUrl("/api/state"), {
      method: "PUT",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify(backupPayload())
    });
  } catch (error) {
    console.warn("Backend save failed", error);
  }
}

async function syncBackendState() {
  if (!canUseBackend()) return;
  if (isSuperAdmin()) {
    backendSyncReady = true;
    render();
    return;
  }
  try {
    const response = await fetch(backendUrl("/api/state"), { cache: "no-store", headers: authHeaders() });
    if (response.ok) {
      importBackup(await response.json());
      const changed = enforceClinicOnlyState();
      const seeded = ensureTenantSeedData();
      backendSyncReady = true;
      if (changed || seeded) await saveBackendState();
      render();
      return;
    } else if (response.status === 404) {
      backendSyncReady = true;
      await saveBackendState();
      return;
    }
  } catch (error) {
    console.warn("Backend sync failed", error);
  }
  backendSyncReady = true;
}

async function saveBackendSettings() {
  if (!canUseBackend() || !canManageMailSettings()) return;
  try {
    await fetch(backendUrl("/api/settings"), {
      method: "PUT",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({
        emailEnabled: appSettings.emailEnabled,
        emailRecipients: appSettings.emailRecipients,
        emailProvider: appSettings.emailProvider,
        appName: appSettings.appName,
        appLogo: appSettings.appLogo,
        defaultLanguage: appSettings.defaultLanguage,
        defaultTheme: appSettings.defaultTheme,
        maintenanceMode: appSettings.maintenanceMode,
        mailSubjectTemplate: appSettings.mailSubjectTemplate,
        mailBodyTemplate: appSettings.mailBodyTemplate,
        testMailBody: appSettings.testMailBody,
        ldapEnabled: appSettings.ldapEnabled,
        ldapUrl: appSettings.ldapUrl,
        ldapBaseDn: appSettings.ldapBaseDn,
        ldapUserFilter: appSettings.ldapUserFilter,
        ldapBindDn: appSettings.ldapBindDn,
        ldapBindPassword: appSettings.ldapBindPassword,
        ldapGroupRoleMap: appSettings.ldapGroupRoleMap,
        workflowStatuses: appSettings.workflowStatuses,
        capacityHours: appSettings.capacityHours
      })
    });
  } catch (error) {
    console.warn("Backend settings save failed", error);
  }
}

async function syncBackendSettings() {
  if (!canUseBackend() || !currentUser) return;
  try {
    const response = await fetch(backendUrl("/api/settings"), { cache: "no-store", headers: authHeaders() });
    if (!response.ok) return;
    const serverSettings = await response.json();
    appSettings = {
      ...appSettings,
      emailEnabled: Boolean(serverSettings.emailEnabled),
      emailRecipients: serverSettings.emailRecipients || "",
      emailProvider: serverSettings.emailProvider || "",
      mailSubjectTemplate: serverSettings.mailSubjectTemplate || appSettings.mailSubjectTemplate || "Project Manager deadline alerts",
      mailBodyTemplate: serverSettings.mailBodyTemplate || appSettings.mailBodyTemplate || "{{alerts}}",
      testMailBody: serverSettings.testMailBody || appSettings.testMailBody || "Project Manager mail ayarları test edildi.",
      appName: serverSettings.appName || appSettings.appName || "Project Manager",
      appLogo: serverSettings.appLogo || appSettings.appLogo || "PM",
      defaultLanguage: serverSettings.defaultLanguage || appSettings.defaultLanguage || "az",
      defaultTheme: serverSettings.defaultTheme || appSettings.defaultTheme || "light",
      maintenanceMode: Boolean(serverSettings.maintenanceMode),
      ldapEnabled: Boolean(serverSettings.ldapEnabled),
      ldapUrl: serverSettings.ldapUrl || "",
      ldapBaseDn: serverSettings.ldapBaseDn || "",
      ldapUserFilter: serverSettings.ldapUserFilter || "(uid={username})",
      ldapBindDn: serverSettings.ldapBindDn || "",
      ldapBindPassword: "",
      ldapGroupRoleMap: serverSettings.ldapGroupRoleMap || "",
      companyRegistry: Array.isArray(serverSettings.companyRegistry) ? serverSettings.companyRegistry : [],
      workflowStatuses: normalizeWorkflowStatuses(serverSettings.workflowStatuses || appSettings.workflowStatuses),
      capacityHours: Number(serverSettings.capacityHours) || appSettings.capacityHours || 40
    };
    companyRegistry = appSettings.companyRegistry;
    syncWorkflowStatuses();
    saveAppSettings();
    render();
    if (isSuperAdmin()) await fetchPlatformCompanies();
  } catch (error) {
    console.warn("Backend settings sync failed", error);
  }
}

async function fetchPlatformCompanies() {
  if (!canUseBackend() || !isSuperAdmin()) return;
  try {
    const response = await fetch(backendUrl("/api/platform/companies"), { cache: "no-store", headers: authHeaders() });
    if (!response.ok) return;
    const registry = await response.json();
    if (!Array.isArray(registry)) return;
    companyRegistry = registry;
    appSettings.companyRegistry = registry;
    saveAppSettings();
    fetchAuditLogs();
    renderPlatformConsole();
    renderActivityLists();
  } catch (error) {
    console.warn("Platform companies sync failed", error);
  }
}

async function backendLogin(username, password) {
  if (!canUseBackend()) return null;
  try {
    const response = await fetch(backendUrl("/api/auth/login"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) return null;
    const payload = await response.json();
    if (payload.token) {
      authToken = payload.token;
      localStorage.setItem(authTokenKey, authToken);
      setTimeout(connectSSE, 500);
    }
    return payload.user ? normalizeUser(payload.user) : null;
  } catch (error) {
    console.warn("Backend login failed", error);
    return null;
  }
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadText(filename, body, type = "text/plain;charset=utf-8") {
  const blob = new Blob([body], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function fetchAuditLogs() {
  try {
    if (await supabaseFetchAuditLogs()) return;
  } catch (error) {
    console.warn("Supabase audit fetch failed", error);
  }
  if (!canUseBackend() || (!isAdmin() && !isSuperAdmin())) return;
  try {
    const response = await fetch(backendUrl("/api/audit-logs"), { cache: "no-store", headers: authHeaders() });
    auditLogs = response.ok ? await response.json() : [];
    renderActivityLists();
  } catch {
    auditLogs = [];
    renderActivityLists();
  }
}

async function fetchMailHistory() {
  try {
    if (await supabaseFetchNotifications()) return;
  } catch (error) {
    console.warn("Supabase notification fetch failed", error);
  }
  if (!canUseBackend() || (!isAdmin() && !isSuperAdmin())) return;
  try {
    const response = await fetch(backendUrl("/api/notifications"), { cache: "no-store", headers: authHeaders() });
    mailHistory = response.ok ? await response.json() : [];
    renderActivityLists();
  } catch {
    mailHistory = [];
    renderActivityLists();
  }
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function filteredReportCsv() {
  const taskHeader = [
    "Project",
    "Task",
    "Status",
    "Priority",
    "Blocked",
    "Owner",
    "Start",
    "End",
    "Progress",
    "Planned hours",
    "Actual hours",
    "Dependencies",
    "Notes"
  ];
  const taskRows = visibleTasks().map((task) => [
    task.project,
    task.name,
    statusLabel(task.status),
    priorityLabel(task.priority),
    isTaskBlocked(task) ? text("blocked") : "",
    resourceLabel(task.owner),
    task.start,
    task.end,
    Number(task.progress) || 0,
    plannedHoursForTask(task),
    actualHoursForTask(task),
    (task.dependencyIds || []).map(taskNameById).filter(Boolean).join("; "),
    task.notes || ""
  ]);
  const governanceHeader = ["Project", "Lifecycle", "IPMA score", "Coverage", "Approved gates", "Open risks/issues", "Missing IPMA fields"];
  const governanceRows = visibleProjects().map((project) => {
    const audit = projectGovernanceAudit(project);
    return [
      project.name,
      project.lifecycle || "Initiation",
      `${audit.score}%`,
      `${audit.done}/${audit.total}`,
      `${audit.approvedGates.length}/4`,
      audit.openGovernanceRisks.length,
      audit.missing.join("; ")
    ];
  });
  return [
    [text("ipmaReport")],
    governanceHeader,
    ...governanceRows,
    [],
    ["Tasks"],
    taskHeader,
    ...taskRows
  ].map((row) => row.map(csvCell).join(",")).join("\n");
}

async function downloadBackendFile(path, fallbackFilename) {
  if (!canUseBackend()) return false;
  const response = await fetch(backendUrl(path), { headers: authHeaders() });
  if (!response.ok) return false;
  const blob = await response.blob();
  const disposition = response.headers.get("content-disposition") || "";
  const filename = disposition.match(/filename="([^"]+)"/)?.[1] || fallbackFilename;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
  return true;
}

function importBackup(payload) {
  if (payload?.type === "project-manager-json-backup" && payload.state) {
    payload = payload.state;
  }
  if (!payload || !Array.isArray(payload.tasks)) throw new Error(text("backupError"));
  const companyId = currentCompanyId();
  appState.tasks = payload.tasks.map(normalizeTask);
  appState.projects = Array.isArray(payload.projects) ? payload.projects.map(normalizeProject) : appState.projects;
  appState.members = Array.isArray(payload.members) ? payload.members : appState.members;
  appState.teams = Array.isArray(payload.teams) ? payload.teams : appState.teams;
  appState.customers = Array.isArray(payload.customers) ? payload.customers.map(normalizeCustomer) : appState.customers;
  appState.managedFiles = Array.isArray(payload.managedFiles) ? payload.managedFiles : appState.managedFiles;
  appState.projectLinks = Array.isArray(payload.projectLinks) ? payload.projectLinks : appState.projectLinks;
  appState.registers = Array.isArray(payload.registers) ? payload.registers.map(normalizeRegisterItem) : appState.registers;
  appState.users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : appState.users;
  appState.trash = Array.isArray(payload.trash) ? payload.trash : appState.trash;
  companyRegistry = Array.isArray(payload.companyRegistry) ? payload.companyRegistry : companyRegistry;
  if (currentUser && !isSuperAdmin()) {
    // TENANT İZOLYASİYASI: əvvəllər burada HƏR sətrə cari companyId "möhürlənir",
    // sonra süzülürdü — yəni yad şirkətin sətri atılmır, MƏNİMSƏNİLİRDİ və sızma
    // qalıcı olurdu. İndi:
    //   • companyId YOXDURSA → köhnə data sayılır, cari şirkətə bağlanır
    //   • companyId BAŞQA şirkətindirsə → ATILIR
    const adopt = (item) => (item?.companyId ? item : { ...item, companyId });
    const ownsRaw = (item) => !item?.companyId || item.companyId === companyId;
    const scopeList = (list, normalizer) => list
      .filter(ownsRaw)
      .map((item) => (normalizer ? normalizer(adopt(item)) : adopt(item)));

    // Tasklarda companyId YOXDUR — layihəyə yalnız ADI ilə bağlıdırlar. Əvvəl
    // burada "layihə adı siyahıda yoxdursa → taskı sil" məntiqi vardı; o, hər
    // login-də layihəsi silinmiş / adı dəyişmiş / layihəsiz taskları səssizcə
    // məhv edirdi (2026-07-21: bütün tasklar itdi). İndi task YALNIZ öz layihəsi
    // SÜBUT OLUNMUŞ şəkildə başqa şirkətə aid olanda atılır.
    const foreignProjectNames = new Set(
      (Array.isArray(payload.projects) ? payload.projects : [])
        .filter((project) => project?.companyId && project.companyId !== companyId)
        .map((project) => project.name)
    );
    appState.projects = scopeList(appState.projects, normalizeProject);
    appState.tasks = appState.tasks.filter((task) => !foreignProjectNames.has(task.project));
    appState.members = scopeList(appState.members);
    appState.teams = scopeList(appState.teams);
    appState.customers = scopeList(appState.customers, normalizeCustomer);
    appState.managedFiles = scopeList(appState.managedFiles);
    appState.projectLinks = appState.projectLinks.filter((link) => !foreignProjectNames.has(link.project));
    appState.registers = appState.registers.filter((item) => !foreignProjectNames.has(item.project));
    appState.users = appState.users.filter((user) => user.role !== "super_admin" && ownsRaw(user));
    // Sessiya obyektini massivə geri bağla: blob-dakı şəxsi ayarları (reportPrefs
    // və s.) götür, sessiyanın rolunu/emailini qoru. Bu olmadan currentUser
    // massivdən qopur və ona yazılan hər şey itir.
    if (currentUser) {
      const stored = appState.users.find((user) => user.id === currentUser.id);
      if (stored) {
        currentUser = normalizeUser({
          ...stored,
          role: currentUser.role,
          profile: {
            ...(stored.profile || {}),
            ...(currentUser.profile || {}),
            reportPrefs: stored.profile?.reportPrefs || currentUser.profile?.reportPrefs
          }
        });
      }
      appState.users = [...appState.users.filter((user) => user.id !== currentUser.id), currentUser];
    }
    appState.trash = scopeList(appState.trash);
    companyRegistry = companyRegistryFromLocalState().filter((company) => company.id === companyId);
  }
  enforceRehberlikReportPrefs();
  saveTasks();
  saveResources();
  saveRegisters();
  saveUsers();
  saveTrash();
  render();
}

function parseDelimitedRows(textBody) {
  const delimiter = textBody.includes("\t") ? "\t" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < textBody.length; index += 1) {
    const char = textBody[index];
    const next = textBody[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function valueFromRow(row, headers, names) {
  const keys = Array.isArray(names) ? names : [names];
  const normalized = headers.map((header) => header.toLowerCase().replaceAll(/\s+/g, ""));
  const index = keys
    .map((name) => normalized.indexOf(String(name).toLowerCase().replaceAll(/\s+/g, "")))
    .find((item) => item >= 0);
  return index >= 0 ? row[index] || "" : "";
}

function importTabularProject(textBody) {
  const rows = parseDelimitedRows(textBody);
  if (rows.length < 2) throw new Error(text("backupError"));
  const headers = rows[0];
  const columnMap = appSettings.importColumnMap || {};
  const createdProjects = new Map(appState.projects.map((project) => [project.name.toLowerCase(), project]));
  const createdTasks = [];
  rows.slice(1).forEach((row, index) => {
    const projectName = valueFromRow(row, headers, [columnMap.project, "Project", "Project Name", "Layihə"].filter(Boolean)) || "Imported Project";
    const taskName = valueFromRow(row, headers, [columnMap.task, "Task", "Task Name", "Name", "Task adı"].filter(Boolean));
    if (!taskName) return;
    if (!createdProjects.has(projectName.toLowerCase())) {
      const project = normalizeProject({
        id: createId("project"),
        name: projectName,
        start: valueFromRow(row, headers, ["Start", "Start Date", "Başlama"]) || isoDate(new Date()),
        end: valueFromRow(row, headers, ["End", "Finish", "End Date", "Bitmə"]) || isoDate(addDays(new Date(), 7)),
        status: valueFromRow(row, headers, "Status") || "Plan",
        priority: valueFromRow(row, headers, "Priority") || "Normal",
        progress: valueFromRow(row, headers, "Progress") || 0
      });
      appState.projects.push(project);
      createdProjects.set(projectName.toLowerCase(), project);
    }
    const isMilestone = ["1", "yes", "true", "milestone"].includes(valueFromRow(row, headers, ["Milestone", "Type"]).toLowerCase());
    const task = normalizeTask({
      id: createId("task"),
      name: taskName,
      project: projectName,
      owner: valueFromRow(row, headers, [columnMap.owner, "Owner", "Resource", "Məsul şəxs"].filter(Boolean)),
      start: valueFromRow(row, headers, ["Start", "Start Date", "Başlama"]),
      end: valueFromRow(row, headers, ["End", "Finish", "End Date", "Bitmə"]),
      status: valueFromRow(row, headers, "Status") || "Plan",
      priority: valueFromRow(row, headers, "Priority") || "Normal",
      progress: valueFromRow(row, headers, "Progress") || 0,
      notes: valueFromRow(row, headers, ["Notes", "Qeyd"]),
      importDependencyNames: valueFromRow(row, headers, [columnMap.dependencies, "Dependencies", "Depends On", "Predecessors"].filter(Boolean))
    });
    appState.tasks.push(task);
    createdTasks.push(task);
    if (isMilestone) {
      appState.registers.push(normalizeRegisterItem({
        id: createId("register"),
        project: projectName,
        type: "milestone",
        title: taskName,
        owner: task.owner,
        status: "Open",
        impact: "Medium",
        dueDate: task.end || task.start
      }));
    }
    if (index === rows.length - 2) {
      appState.projects = appState.projects.map((project) => {
        const projectTasks = appState.tasks.filter((taskItem) => taskItem.project === project.name && taskItem.start && taskItem.end);
        if (!projectTasks.length) return project;
        return normalizeProject({
          ...project,
          start: project.start || projectTasks.map((taskItem) => taskItem.start).sort()[0],
          end: project.end || projectTasks.map((taskItem) => taskItem.end).sort().at(-1)
        });
      });
    }
  });
  const taskByName = new Map(appState.tasks.map((task) => [task.name.toLowerCase(), task.id]));
  createdTasks.forEach((task) => {
    if (!task.importDependencyNames) return;
    task.dependencyIds = String(task.importDependencyNames)
      .split(/[;|,]/)
      .map((name) => taskByName.get(name.trim().toLowerCase()))
      .filter(Boolean);
    delete task.importDependencyNames;
  });
  saveTasks();
  saveResources();
  saveRegisters();
  render();
}

function tagValue(block, tag) {
  return block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1]?.replaceAll(/<!\[CDATA\[|\]\]>/g, "").trim() || "";
}

function importMsProjectXml(textBody) {
  const projectName = tagValue(textBody, "Title") || "MS Project import";
  if (!appState.projects.some((project) => project.name.toLowerCase() === projectName.toLowerCase())) {
    appState.projects.push(normalizeProject({ id: createId("project"), name: projectName, start: isoDate(new Date()), end: isoDate(addDays(new Date(), 7)), status: "Plan", priority: "Normal", progress: 0 }));
  }
  const taskBlocks = [...textBody.matchAll(/<Task>([\s\S]*?)<\/Task>/gi)].map((match) => match[1]);
  const idByUid = new Map();
  taskBlocks.forEach((block) => {
    const name = tagValue(block, "Name");
    if (!name || tagValue(block, "Summary") === "1") return;
    const uid = tagValue(block, "UID") || createId("ms");
    const start = tagValue(block, "Start").slice(0, 10);
    const finish = tagValue(block, "Finish").slice(0, 10);
    const percent = Number(tagValue(block, "PercentComplete")) || 0;
    const milestone = tagValue(block, "Milestone") === "1";
    const task = normalizeTask({
      id: createId("task"),
      name,
      project: projectName,
      start,
      end: finish || start,
      status: percent >= 100 ? "Bitib" : (percent > 0 ? "Davam edir" : "Plan"),
      progress: percent,
      priority: "Normal",
      importPredecessors: [...block.matchAll(/<PredecessorUID>(.*?)<\/PredecessorUID>/gi)].map((match) => match[1])
    });
    appState.tasks.push(task);
    idByUid.set(uid, task.id);
    if (milestone) {
      appState.registers.push(normalizeRegisterItem({ id: createId("register"), project: projectName, type: "milestone", title: name, dueDate: task.end || task.start }));
    }
  });
  appState.tasks.forEach((task) => {
    if (!task.importPredecessors) return;
    task.dependencyIds = task.importPredecessors.map((uid) => idByUid.get(uid)).filter(Boolean);
    delete task.importPredecessors;
  });
  saveTasks();
  saveResources();
  saveRegisters();
  render();
}

function importProjectFile(filename, body) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".json")) return importBackup(JSON.parse(body));
  if (lower.endsWith(".xml") || body.trim().startsWith("<")) return importMsProjectXml(body);
  return importTabularProject(body);
}

function sendDeadlineNotifications() {
  const alerts = riskyTasks();
  if (!alerts.length) return;
  alerts.slice(0, 5).forEach(({ task, alert }) => {
    addNotification(`${alert.label}: ${task.name}`, "", { type: "deadline", taskId: task.id, status: alert.type });
  });
  if ("Notification" in window && Notification.permission === "granted") {
    alerts.slice(0, 3).forEach(({ task, alert }) => {
      new Notification(`${alert.label}: ${task.name}`, {
        body: `${getProject(task)} - ${shortDate(task.end)}`
      });
    });
  }
  sendOnlineDeadlineEmail(alerts);
}

async function sendOnlineDeadlineEmail(alerts) {
  if (!appSettings.emailEnabled) return;
  try {
    const alertLines = alerts.slice(0, 10).map(({ task, alert }) => `${alert.label}: ${task.name} (${getProject(task)}, ${task.end})`).join("\n");
    const payload = {
      type: "deadline-alerts",
      workspaceId: supabaseWorkspaceId || "",
      companyId: currentCompanyId(),
      recipients: appSettings.emailRecipients || "",
      subject: appSettings.mailSubjectTemplate || "Project Manager deadline alerts",
      template: appSettings.mailBodyTemplate || "{{alerts}}",
      text: alertLines,
      alerts: alerts.slice(0, 10).map(({ task, alert }) => ({
        label: alert.label,
        taskName: task.name,
        project: getProject(task),
        end: task.end
      }))
    };
    if (canUseSupabase() && supabaseSession?.access_token) {
      await callSupabaseFunction(supabaseConfig().mailFunction, payload);
      return;
    }
    if (!canUseBackend()) return;
    await fetch(backendUrl("/api/mail/deadline-alerts"), {
      method: "POST",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({ ...payload, alertLines })
    });
  } catch (error) {
    console.warn("Deadline email failed", error);
  }
}

async function sendOnlineTestMail() {
  const payload = {
    type: "test",
    workspaceId: supabaseWorkspaceId || "",
    companyId: currentCompanyId(),
    recipients: appSettings.emailRecipients || "",
    subject: mailSubjectTemplateInput.value.trim() || "Project Manager test email",
    text: testMailBodyInput.value.trim() || "Project Manager mail ayarları test edildi."
  };
  if (canUseSupabase() && supabaseSession?.access_token) {
    return callSupabaseFunction(supabaseConfig().mailFunction, payload);
  }
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl("/api/mail/test"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Mail test failed");
  return response.json();
}

async function sendBackendTestLdap() {
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl("/api/ldap/test"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({})
  });
  if (!response.ok) throw new Error("LDAP test failed");
  return response.json();
}

async function requestBackendPasswordChange(newPassword) {
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl("/api/auth/password-change/request"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ newPassword })
  });
  if (!response.ok) throw new Error("Password change request failed");
  return response.json();
}

async function confirmBackendPasswordChange(token) {
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl("/api/auth/password-change/confirm"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ token })
  });
  if (!response.ok) throw new Error("Password change confirmation failed");
  return response.json();
}

async function updateBackendCompany(companyId, payload) {
  if (!canUseBackend()) return null;
  const response = await fetch(backendUrl(`/api/platform/companies/${encodeURIComponent(companyId)}`), {
    method: "PATCH",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Company update failed");
  return response.json();
}

async function createBackendCompany(payload) {
  if (!canUseBackend()) return null;
  const response = await fetch(backendUrl("/api/platform/companies"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Company create failed");
  return response.json();
}

async function savePlatformState() {
  if (!canUseBackend() || !isSuperAdmin()) return { skipped: true };
  const response = await fetch(backendUrl("/api/state"), {
    method: "PUT",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({
      version: backupVersion,
      tasks: appState.tasks,
      projects: appState.projects,
      members: appState.members,
      teams: appState.teams,
      customers: appState.customers,
      managedFiles: appState.managedFiles,
      projectLinks: appState.projectLinks,
      registers: appState.registers,
      users: appState.users,
      trash: appState.trash
    })
  });
  if (!response.ok) throw new Error("Platform state save failed");
  return response.json();
}

// Admin başqa istifadəçinin parolunu dəyişir.
// KRİTİK: online giriş Supabase auth (GoTrue) ilə yoxlanılır. Əvvəllər burada
// yalnız self-hosted backend çağırılırdı; cloud-da o əlçatan olmadığı üçün
// parol DƏYİŞMİRDİ — blob-dakı md5 yenilənirdi, istifadəçi isə girə bilmirdi.
// İndi Supabase aktivdirsə parol MÜTLƏQ auth-da yenilənir.
async function changeBackendUserPassword(userId, password) {
  if (supabaseSession?.access_token) {
    return callSupabaseFunction("manage-user", { action: "set-password", profileId: userId, password });
  }
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl(`/api/users/${encodeURIComponent(userId)}/password`), {
    method: "PUT",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({ password })
  });
  if (!response.ok) throw new Error("User password change failed");
  return response.json();
}

async function enableNotifications() {
  if (!("Notification" in window)) {
    sendDeadlineNotifications();
    alert(text("notificationsBlocked"));
    return;
  }
  const permission = Notification.permission === "default"
    ? await Notification.requestPermission()
    : Notification.permission;
  if (permission !== "granted") {
    sendDeadlineNotifications();
    alert(text("notificationsBlocked"));
    return;
  }
  alert(text("notificationsEnabled"));
  sendDeadlineNotifications();
}

function openNotificationPanel() {
  renderNotificationCenter();
  raiseModal(notificationModal);
  notificationModal?.classList.add("open");
  notificationModal?.setAttribute("aria-hidden", "false");
}

function closeNotificationPanel() {
  notificationModal?.classList.remove("open");
  notificationModal?.setAttribute("aria-hidden", "true");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManageTasks()) return;

  if (parseDate(endDate.value) < parseDate(startDate.value)) {
    alert(text("invalidDate"));
    return;
  }

  const existingTask = appState.tasks.find((item) => item.id === taskId.value);
  const progress = Math.min(100, Math.max(0, Number.parseInt(progressInput.value || "0", 10)));
  const task = {
    id: taskId.value || createId(),
    name: taskName.value.trim(),
    project: projectInput.value.trim(),
    projectResource: projectResourceInput.value,
    start: startDate.value,
    end: endDate.value,
    status: statusInput.value,
    priority: priorityInput.value,
    owner: ownerInput.value.trim(),
    progress: statusInput.value === "Bitib" ? 100 : progress,
    plannedHours: Number(plannedHoursInput.value) || 0,
    actualHours: Number(actualHoursInput.value) || 0,
    notes: notesInput.value.trim(),
    acceptanceCriteria: (document.querySelector("#taskAcceptance")?.value || "").trim(),
    parentTaskId: parentTaskInput.value,
    dependencyIds: [...taskDependenciesInput.selectedOptions].map((option) => option.value).filter((id) => id !== taskId.value),
    timeEntries: existingTask?.timeEntries || [],
    comments: existingTask?.comments || [],
    attachments: existingTask?.attachments || []
  };
  if (!projectExists(task.project)) return;
  if (dependencyCreatesCycle(task.id, task.dependencyIds)) {
    alert("Asılılıq dövrü aşkarlandı: seçilmiş asılılıq dairəvi zəncir (məs. A→B→A) yaradır. Bu asılılığı silin.");
    return;
  }
  if (shouldValidateDependencies(task.status) && !canStartTask(task)) {
    alert(dependencyBlockedMessage(task));
    return;
  }

  const existingIndex = appState.tasks.findIndex((item) => item.id === task.id);
  if (existingIndex >= 0) {
    appState.tasks[existingIndex] = task;
    recordAudit("task.updated", "task", task.id, task.name);
  } else {
    appState.tasks.push(task);
    recordAudit("task.created", "task", task.id, task.name);
  }

  if (task.project && task.projectResource && !appState.projectLinks.some((link) => link.project === task.project && link.resource === task.projectResource)) {
    appState.projectLinks.push({ id: createId(), companyId: currentCompanyId(), project: task.project, resource: task.projectResource });
    saveResources();
  }

  rescheduleDependentTasks(task);
  saveTasks();
  if (supabaseSession?.access_token && supabaseWorkspaceId) {
    await flushSupabaseSave().catch((error) => console.warn("Supabase save failed", error));
  }
  if (existingIndex >= 0) notifyTaskChange(existingTask, task);
  resetForm();
  closeTaskComposer();
  render();
});

async function submitTaskComment(event) {
  const commentForm = event.target.closest(".comment-form");
  if (!commentForm || !currentUser) return;
  event.preventDefault();
  const task = appState.tasks.find((item) => item.id === commentForm.dataset.taskId);
  if (!task) return;
  // Task-a görə icazə: yalnız öz/komanda taskında (adi user) və ya nəzarət
  // rollarında (manager öz layihəsi, admin/rəhbərlik hamısı) komment olar.
  if (!canComment(task)) return;
  const input = commentForm.elements.comment;
  const value = input.value.trim();
  if (!value) return;
  const attachmentInput = commentForm.elements.attachments;
  let attachments = [];
  if (attachmentInput?.files?.length) {
    try {
      attachments = await readSelectedAttachments(attachmentInput);
    } catch (error) {
      alert(error.message || text("fileTooLarge"));
      return;
    }
  }
  task.comments = task.comments || [];
  task.comments.push({
    id: createId(),
    author: currentUser.username,
    text: value,
    attachments,
    createdAt: new Date().toISOString()
  });
  input.value = "";
  if (attachmentInput) attachmentInput.value = "";
  saveTasks();
  if (supabaseSession?.access_token && supabaseWorkspaceId) {
    await flushSupabaseSave().catch((error) => console.warn("Supabase save failed", error));
  }
  // Task detal modalı açıqdırsa, şərh siyahısını təzələ
  if (taskDetailModal && taskDetailModal.getAttribute("aria-hidden") === "false" && typeof openTaskDetail === "function") {
    openTaskDetail(task.id);
  }
  render();
}

[taskList, kanban].forEach((container) => {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.action === "delete-comment") {
      if (deleteTaskComment(button.dataset.taskId, button.dataset.commentId)) render();
      return;
    }
    if (button.dataset.action === "expand-comment") {
      const form = button.closest(".task-inline-comment-form");
      if (form) {
        form.classList.add("is-expanded");
        form.querySelector("textarea")?.focus();
      }
      return;
    }
    if (button.dataset.action === "collapse-comment") {
      const form = button.closest(".task-inline-comment-form");
      if (form) {
        form.classList.remove("is-expanded");
        const ta = form.querySelector("textarea");
        if (ta) ta.value = "";
        const fileInput = form.querySelector(".comment-attachment-input");
        if (fileInput) fileInput.value = "";
        const status = form.querySelector(".file-picker-status");
        if (status) status.textContent = "";
      }
      return;
    }
    handleTaskAction(button.dataset.action, button.dataset.id);
  });

  container.addEventListener("submit", async (event) => {
    const timeEntryForm = event.target.closest(".time-entry-form");
    if (timeEntryForm?.elements?.hours && currentUser) {
      event.preventDefault();
      if (!canContribute()) return;
      const task = appState.tasks.find((item) => item.id === timeEntryForm.dataset.taskId);
      const hours = Number(timeEntryForm.elements.hours.value) || 0;
      const date = timeEntryForm.elements.date?.value || isoDate(new Date());
      const note = timeEntryForm.elements.note?.value?.trim() || "";
      if (!task || hours <= 0) return;
      task.timeEntries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
      task.timeEntries.push({
        id: createId(),
        user: currentUser.username,
        hours,
        date,
        note,
        createdAt: new Date().toISOString()
      });
      task.actualHours = actualHoursForTask(task);
      saveTasks();
      if (supabaseSession?.access_token && supabaseWorkspaceId) {
        await flushSupabaseSave().catch((error) => console.warn("Supabase save failed", error));
      }
      render();
      return;
    }

    await submitTaskComment(event);
  });

  container.addEventListener("change", (event) => {
    const input = event.target.closest(".comment-attachment-input");
    if (!input) return;
    const formNode = input.closest(".comment-form");
    const status = formNode?.querySelector(".file-picker-status");
    if (!status) return;
    status.textContent = input.files?.length
      ? `${input.files.length} ${text("filesSelected")}`
      : text("noFilesSelected");
  });
});

gantt.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-gantt-project]");
  if (!button) return;
  const willCollapse = expandedGanttProject === button.dataset.ganttProject;
  expandedGanttProject = willCollapse ? "" : button.dataset.ganttProject;
  ganttManuallyCollapsed = willCollapse;
  renderGantt();
});

gantt.addEventListener("pointerdown", (event) => {
  const bar = event.target.closest("[data-gantt-bar]");
  if (!bar || event.target.closest("button")) return;
  const item = ganttItem(bar.dataset.ganttBar, bar.dataset.id);
  if (!item?.start || !item?.end) return;
  event.preventDefault();
  bar.setPointerCapture?.(event.pointerId);
  ganttDragState = {
    type: bar.dataset.ganttBar,
    id: bar.dataset.id,
    mode: event.target.dataset.ganttResize || "move",
    startX: event.clientX,
    start: item.start,
    end: item.end,
    lane: bar.closest(".gantt-lane"),
    delta: 0,
    moved: false,
    bar
  };
  bar.classList.add("dragging");
});

gantt.addEventListener("pointermove", (event) => {
  if (!ganttDragState) return;
  ganttDragState.delta = ganttDeltaDays(event, ganttDragState);
  ganttDragState.moved = Math.abs(ganttDragState.delta) > 0;
  ganttDragState.bar.style.transform = `translateX(${ganttDragState.delta * ganttDayWidth}px)`;
});

gantt.addEventListener("pointerup", (event) => {
  if (!ganttDragState) return;
  const state = ganttDragState;
  state.bar.classList.remove("dragging");
  state.bar.style.transform = "";
  ganttDragState = null;
  if (!state.moved) {
    openGanttItem(state.type, state.id);
    return;
  }
  if (applyGanttDateChange(state, state.delta)) render();
});

gantt.addEventListener("pointercancel", () => {
  if (!ganttDragState) return;
  ganttDragState.bar.classList.remove("dragging");
  ganttDragState.bar.style.transform = "";
  ganttDragState = null;
});

ganttControls?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-gantt-zoom]");
  if (!button) return;
  const action = button.dataset.ganttZoom;
  if (action === "fit") setGanttZoom(3);
  if (action === "month") setGanttZoom(5);
  if (action === "week") setGanttZoom(12);
  if (action === "day") setGanttZoom(24);
  if (action === "out") setGanttZoom(ganttDayWidth - 2);
  if (action === "in") setGanttZoom(ganttDayWidth + 2);
});

dashboardPanels.forEach((panel) => {
  panel.addEventListener("dragstart", (event) => {
    draggedDashboardPanel = panel.dataset.dashboardPanel;
    event.dataTransfer?.setData("text/plain", draggedDashboardPanel);
    panel.classList.add("dragging");
  });
  panel.addEventListener("dragend", () => {
    draggedDashboardPanel = "";
    panel.classList.remove("dragging");
  });
  panel.addEventListener("dragover", (event) => {
    if (!draggedDashboardPanel || draggedDashboardPanel === panel.dataset.dashboardPanel) return;
    event.preventDefault();
  });
  panel.addEventListener("drop", (event) => {
    event.preventDefault();
    const source = draggedDashboardPanel || event.dataTransfer?.getData("text/plain");
    const target = panel.dataset.dashboardPanel;
    if (!source || source === target) return;
    const order = normalizeDashboardPanelOrder(appSettings.dashboardPanelOrder);
    const sourceIndex = order.indexOf(source);
    const targetIndex = order.indexOf(target);
    order.splice(sourceIndex, 1);
    order.splice(targetIndex, 0, source);
    appSettings = { ...appSettings, dashboardPanelOrder: order };
    saveAppSettings();
    applyDashboardPanelOrder();
  });
  panel.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-panel-size-toggle]");
    if (!button) return;
    const panelKey = panel.dataset.dashboardPanel;
    const currentSizes = normalizeDashboardPanelSizes(appSettings.dashboardPanelSizes);
    currentSizes[panelKey] = currentSizes[panelKey] === "wide" ? "normal" : "wide";
    appSettings = { ...appSettings, dashboardPanelSizes: currentSizes };
    saveAppSettings();
    applyDashboardPanelSizes();
  });
});

statusFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  currentFilter = button.dataset.filter;
  taskListPage = 1;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

priorityFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-priority-filter]");
  if (!button) return;
  currentPriorityFilter = button.dataset.priorityFilter;
  taskListPage = 1;
  priorityFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
  render();
});

smartFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-smart-filter]");
  if (!button) return;
  currentSmartFilter = button.dataset.smartFilter || "Hamısı";
  taskListPage = 1;
  smartFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
  render();
});

// ── Filtr menyularının açılıb-bağlanması ─────────────────────────────────────
function closeFilterMenus(except = null) {
  document.querySelectorAll(".filter-menu-wrap").forEach((wrap) => {
    if (wrap === except) return;
    wrap.querySelector(".filter-menu")?.setAttribute("hidden", "");
    wrap.querySelector(".filter-trigger")?.setAttribute("aria-expanded", "false");
  });
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".filter-trigger");
  if (trigger) {
    const wrap = trigger.closest(".filter-menu-wrap");
    const menu = wrap?.querySelector(".filter-menu");
    if (!menu) return;
    const willOpen = menu.hasAttribute("hidden");
    closeFilterMenus(wrap);
    if (willOpen) { menu.removeAttribute("hidden"); trigger.setAttribute("aria-expanded", "true"); }
    else { menu.setAttribute("hidden", ""); trigger.setAttribute("aria-expanded", "false"); }
    return;
  }
  // Variant seçiləndə render() menyunu onsuz da yenidən qurur; kənara
  // klikləndikdə isə açıq menyu bağlanmalıdır.
  if (!event.target.closest(".filter-menu")) closeFilterMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeFilterMenus();
});

// Aktiv filtr xülasəsində "×" və "Təmizlə" düymələri.
document.querySelector("#activeFilterBar")?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-clear-filter]");
  if (!button) return;
  const target = button.dataset.clearFilter;
  if (target === "status" || target === "all") currentFilter = "Hamısı";
  if (target === "priority" || target === "all") currentPriorityFilter = "Hamısı";
  if (target === "smart" || target === "all") currentSmartFilter = "Hamısı";
  if (target === "project" || target === "all") projectFilter.value = "Hamısı";
  if (target === "search" || target === "all") searchInput.value = "";
  if (target === "all") currentOwnerFilter = "";
  taskListPage = 1;
  render();
});

// Shared handler: navigate to task list and scroll/highlight the task card
function handleDashboardTaskClick(event) {
  const btn = event.target.closest("button[data-open-task]");
  if (!btn) return false;
  const taskId = btn.dataset.openTask;
  // Reset filters so the task is visible
  currentFilter = "Hamısı";
  currentPriorityFilter = "Hamısı";
  currentSmartFilter = "Hamısı";
  currentOwnerFilter = "";
  taskListPage = 1;
  setView("list");
  // After render, scroll to and briefly highlight the card
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-task-card-id="${CSS.escape(taskId)}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.add("highlight-flash");
      setTimeout(() => card.classList.remove("highlight-flash"), 1800);
    }
  });
  return true;
}

// ── Dashboard axtarışı ───────────────────────────────────────────────────────
// Dashboard filtrlərə tabe deyil (renderDashboard bütün portfeli göstərir), ona
// görə burada filtr paneli yoxdur — yalnız axtarış. Nəticəyə klikləyəndə
// Tasklar görünüşünə keçib həmin kart işıqlandırılır.
const dashSearchInput = document.querySelector("#dashSearchInput");
const dashSearchResults = document.querySelector("#dashSearchResults");

function openTaskFromDashboard(taskId) {
  currentFilter = "Hamısı";
  currentPriorityFilter = "Hamısı";
  currentSmartFilter = "Hamısı";
  currentOwnerFilter = "";
  taskListPage = 1;
  setView("list");
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-task-card-id="${CSS.escape(taskId)}"]`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.add("highlight-flash");
    setTimeout(() => card.classList.remove("highlight-flash"), 1800);
  });
}

function renderDashSearchResults() {
  if (!dashSearchInput || !dashSearchResults) return;
  const query = dashSearchInput.value.trim().toLowerCase();
  if (query.length < 2) {
    dashSearchResults.hidden = true;
    dashSearchResults.innerHTML = "";
    dashSearchInput.setAttribute("aria-expanded", "false");
    return;
  }
  const matches = accessibleTasks().filter((task) => (
    [task.name, task.project, resourceLabel(task.owner), task.notes]
      .some((value) => String(value || "").toLowerCase().includes(query))
  ));
  dashSearchResults.hidden = false;
  dashSearchInput.setAttribute("aria-expanded", "true");
  if (!matches.length) {
    dashSearchResults.innerHTML = `<p class="dash-search-empty">${text("noResults")}</p>`;
    return;
  }
  dashSearchResults.innerHTML = matches.slice(0, 8).map((task) => `
    <button type="button" class="dash-search-item" data-open-task="${escapeHtml(task.id)}" role="option">
      <span class="dash-search-name">${escapeHtml(task.name)}</span>
      <span class="dash-search-meta">${escapeHtml(getProject(task))}${task.owner ? " · " + escapeHtml(resourceLabel(task.owner)) : ""}</span>
    </button>
  `).join("") + (matches.length > 8
    ? `<button type="button" class="dash-search-more" data-search-all="1">${matches.length} nəticənin hamısına bax</button>`
    : "");
}

dashSearchInput?.addEventListener("input", renderDashSearchResults);

dashSearchResults?.addEventListener("click", (event) => {
  const all = event.target.closest("button[data-search-all]");
  if (all) {
    // Bütün nəticələr: sorğunu əsas axtarışa köçürüb Tasklar görünüşünə keç.
    searchInput.value = dashSearchInput.value;
    dashSearchResults.hidden = true;
    taskListPage = 1;
    setView("list");
    return;
  }
  const item = event.target.closest("button[data-open-task]");
  if (!item) return;
  dashSearchResults.hidden = true;
  openTaskFromDashboard(item.dataset.openTask);
});

dashSearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { dashSearchResults.hidden = true; dashSearchInput.setAttribute("aria-expanded", "false"); return; }
  if (event.key !== "Enter") return;
  event.preventDefault();
  const first = dashSearchResults?.querySelector("button[data-open-task]");
  if (first) { dashSearchResults.hidden = true; openTaskFromDashboard(first.dataset.openTask); }
});

document.addEventListener("click", (event) => {
  if (!dashSearchResults || dashSearchResults.hidden) return;
  if (event.target.closest(".dash-search-wrap")) return;
  dashSearchResults.hidden = true;
  dashSearchInput?.setAttribute("aria-expanded", "false");
});

deadlineAlerts?.addEventListener("click", (event) => { handleDashboardTaskClick(event); });
upcomingList?.addEventListener("click", (event) => { handleDashboardTaskClick(event); });

nextActions?.addEventListener("click", (event) => {
  if (handleDashboardTaskClick(event)) return;
  const button = event.target.closest("button[data-action-filter]");
  if (!button) return;
  currentSmartFilter = button.dataset.actionFilter || "Hamısı";
  currentView = currentSmartFilter === "risk" ? "reports" : "list";
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
  render();
});

workloadList?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-owner]");
  if (!button) return;
  const owner = button.dataset.owner;
  currentOwnerFilter = owner;
  currentFilter = "Hamısı";
  currentPriorityFilter = "Hamısı";
  currentSmartFilter = "Hamısı";
  setView("list");
});

// ── Tam səhifə "Komandalar" görünüşü ────────────────────────────────────────
// Komanda kartları + sərbəst istifadəçi hovuzu. Üzvü hovuzdan karta sürüşdürmək
// komandaya əlavə edir, kartdan hovuza sürüşdürmək çıxarır (drag & drop).
// Klaviatura/toxunma üçün hər üzv çipində ✕ düyməsi də var.

let teamsDragPayload = null;   // { value, fromTeamId }
let teamsOpenTeamId = "";      // açıq kartda mini-dashboard göstərilir

function teamsScoped() {
  return appState.teams.filter((team) => !team.companyId || team.companyId === currentCompanyId());
}

// Komandaya təyin oluna bilən adamlar: resurs üzvləri + şirkət istifadəçiləri.
function teamsAssignablePeople() {
  const companyId = currentCompanyId();
  const people = [];
  appState.members
    .filter((m) => (m.companyId || "company-default") === companyId)
    .forEach((m) => people.push({ value: resourceValue("member", m.id), label: m.name || "" }));
  appState.users
    .filter((u) => u.role !== "super_admin" && (u.companyId || "company-default") === companyId)
    .forEach((u) => people.push({
      value: resourceValue("user", u.id),
      label: u.profile?.fullName || u.username || ""
    }));
  return people.filter((p) => p.label);
}

function teamsMemberValues(team) {
  return (team.memberIds || []).map((id) => (id.includes(":") ? id : resourceValue("member", id)));
}

// Komandanın taskları = üzvlərə təyin olunanlar + BİRBAŞA KOMANDAYA təyin
// olunanlar. Task sahibi "team:<id>" ola bilər (layihə formasında komanda
// seçiləndə belə yazılır) — əvvəllər bunlar sayılmırdı və kartda "0 task"
// görünürdü, halbuki komandanın taskı vardı.
function teamsOwnerSet(team) {
  return new Set([...teamsMemberValues(team), resourceValue("team", team.id)]);
}

function teamsTaskCount(team) {
  const set = teamsOwnerSet(team);
  return appState.tasks.filter((task) => set.has(task.owner)).length;
}

function teamsStatusBreakdown(team) {
  const set = teamsOwnerSet(team);
  const counts = {};
  appState.tasks.filter((task) => set.has(task.owner))
    .forEach((task) => { counts[task.status] = (counts[task.status] || 0) + 1; });
  return counts;
}

function teamsInitial(label) {
  return escapeHtml((String(label).trim().charAt(0) || "?").toUpperCase());
}

function teamsPersonChip(person, teamId) {
  // teamId boşdursa hovuz çipidir; əks halda komanda üzvüdür (çıxarıla bilər).
  // Adi user üçün komanda oxu-rejimidir: nə çıxarma düyməsi, nə də sürükləmə.
  const editable = canManageTeams();
  const action = teamId && editable
    ? `<button type="button" class="team-chip-x" data-team-remove="${escapeHtml(teamId)}" data-value="${escapeHtml(person.value)}" aria-label="Komandadan çıxar" title="Komandadan çıxar">✕</button>`
    : "";
  return `
    <div class="team-chip" draggable="${editable ? "true" : "false"}" data-value="${escapeHtml(person.value)}" data-from-team="${escapeHtml(teamId || "")}" title="${escapeHtml(person.label)}">
      <span class="team-chip-avatar">${teamsInitial(person.label)}</span>
      <span class="team-chip-name">${escapeHtml(person.label)}</span>
      ${action}
    </div>`;
}

function renderTeamsView() {
  const grid = document.querySelector("#teamsGrid");
  const pool = document.querySelector("#teamsPool");
  if (!grid || !pool) return;

  const teams = teamsScoped();
  const people = teamsAssignablePeople();
  const labelOf = new Map(people.map((p) => [p.value, p.label]));

  grid.innerHTML = teams.length ? teams.map((team) => {
    const values = teamsMemberValues(team);
    const members = values
      .map((v) => ({ value: v, label: labelOf.get(v) || resourceLabel(v) }))
      .filter((m) => m.label);
    const open = teamsOpenTeamId === team.id;
    let dash = "";
    if (open) {
      const breakdown = teamsStatusBreakdown(team);
      const cells = Object.entries(breakdown)
        .map(([status, n]) => `<span class="team-dash-cell"><strong>${n}</strong>${escapeHtml(statusLabel(status))}</span>`)
        .join("");
      dash = `<div class="team-card-dash">${cells || `<span class="team-dash-empty">${text("empty")}</span>`}</div>`;
    }
    return `
      <article class="team-card${open ? " open" : ""}" data-team-id="${escapeHtml(team.id)}">
        <button type="button" class="team-card-head" data-team-open="${escapeHtml(team.id)}">
          <span class="team-card-avatar">${teamsInitial(team.name)}</span>
          <span class="team-card-titles">
            <strong>${escapeHtml(team.name)}</strong>
            <small>${members.length} üzv · ${teamsTaskCount(team)} task</small>
          </span>
          <span class="team-card-chevron" aria-hidden="true">›</span>
        </button>
        ${dash}
        <div class="team-card-drop" data-team-drop="${escapeHtml(team.id)}">
          ${members.length
            ? members.map((m) => teamsPersonChip(m, team.id)).join("")
            : `<p class="team-card-empty">${text("empty")}</p>`}
        </div>
        ${isAdmin() ? `<div class="team-card-foot">
          <button type="button" class="small danger" data-team-delete="${escapeHtml(team.id)}">Sil</button>
        </div>` : ""}
      </article>`;
  }).join("") : `<p class="empty-hint">${text("empty")}</p>`;

  const assigned = new Set(teams.flatMap(teamsMemberValues));
  const free = people.filter((p) => !assigned.has(p.value));
  pool.innerHTML = free.length
    ? free.map((p) => teamsPersonChip(p, "")).join("")
    : `<p class="team-card-empty">${text("empty")}</p>`;

  // Komanda yaratma/istifadəçi düymələri yalnız admin-də; sürüşdürmə ipucu
  // yalnız redaktə hüququ olanda mənalıdır (adi user üçün oxu-rejimi).
  const actions = document.querySelector("#teamsView .teams-actions");
  if (actions) actions.hidden = !isAdmin();
  const poolHint = document.querySelector("#teamsView .freeUsersHint, #teamsView .teams-pool-head small");
  if (poolHint) poolHint.hidden = !canManageTeams();
}

function teamsSetMembership(value, targetTeamId, fromTeamId) {
  if (!canManageTeams()) return;
  if (targetTeamId === fromTeamId) return;
  let changed = false;
  appState.teams = appState.teams.map((team) => {
    const values = teamsMemberValues(team);
    if (team.id === fromTeamId && values.includes(value)) {
      changed = true;
      return { ...team, memberIds: values.filter((v) => v !== value) };
    }
    if (team.id === targetTeamId && !values.includes(value)) {
      changed = true;
      return { ...team, memberIds: [...values, value] };
    }
    return team;
  });
  if (!changed) return;
  saveResources();
  recordAudit("team.membership_changed", "team", targetTeamId || fromTeamId, resourceLabel(value));
  renderTeamsView();
}

// ── Drag & drop ─────────────────────────────────────────────────────────────
document.addEventListener("dragstart", (event) => {
  const chip = event.target.closest?.(".team-chip");
  if (!chip) return;
  teamsDragPayload = { value: chip.dataset.value, fromTeamId: chip.dataset.fromTeam || "" };
  chip.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  // Firefox sürükləməni yalnız data təyin ediləndə başladır.
  event.dataTransfer.setData("text/plain", chip.dataset.value);
});

document.addEventListener("dragend", (event) => {
  event.target.closest?.(".team-chip")?.classList.remove("dragging");
  document.querySelectorAll(".drop-hover").forEach((el) => el.classList.remove("drop-hover"));
  teamsDragPayload = null;
});

document.addEventListener("dragover", (event) => {
  if (!teamsDragPayload) return;
  const zone = event.target.closest?.("[data-team-drop], #teamsPool");
  if (!zone) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  if (!zone.classList.contains("drop-hover")) {
    document.querySelectorAll(".drop-hover").forEach((el) => el.classList.remove("drop-hover"));
    zone.classList.add("drop-hover");
  }
});

document.addEventListener("drop", (event) => {
  if (!teamsDragPayload) return;
  const zone = event.target.closest?.("[data-team-drop], #teamsPool");
  if (!zone) return;
  event.preventDefault();
  zone.classList.remove("drop-hover");
  // #teamsPool-a buraxmaq = komandadan çıxarmaq (hədəf komanda yoxdur).
  const targetTeamId = zone.dataset.teamDrop || "";
  teamsSetMembership(teamsDragPayload.value, targetTeamId, teamsDragPayload.fromTeamId);
  teamsDragPayload = null;
});

// ── Kliklər ─────────────────────────────────────────────────────────────────
document.querySelector("#teamsGrid")?.addEventListener("click", (event) => {
  const openBtn = event.target.closest("[data-team-open]");
  if (openBtn) {
    const id = openBtn.dataset.teamOpen;
    teamsOpenTeamId = teamsOpenTeamId === id ? "" : id;
    renderTeamsView();
    return;
  }
  const removeBtn = event.target.closest("[data-team-remove]");
  if (removeBtn) {
    teamsSetMembership(removeBtn.dataset.value, "", removeBtn.dataset.teamRemove);
    return;
  }
  const delBtn = event.target.closest("[data-team-delete]");
  if (delBtn) {
    if (!isAdmin()) return;
    const team = appState.teams.find((t) => t.id === delBtn.dataset.teamDelete);
    if (!team || !confirm(`"${team.name}" komandası silinsin?`)) return;
    appState.teams = appState.teams.filter((t) => t.id !== team.id);
    saveResources();
    recordAudit("team.deleted", "team", team.id, team.name);
    renderTeamsView();
  }
});

// Komanda/istifadəçi yaratma admin paneldə ARTIQ tam funksionaldır (validasiya,
// rol seçimi, Supabase inteqrasiyası). Burada ikinci forma qurmuruq — eyni datanı
// iki yerdən idarə etmək buq mənbəyidir. Mövcud openAdminSection() ilə həmin
// bölməni açırıq və qayıdanda siyahını yeniləyirik.
function openAdminSectionForTeams(key) {
  if (!isAdmin()) return;
  openAdminSection(key);
}

document.querySelector("#teamsAddTeam")?.addEventListener("click", () => openAdminSectionForTeams("teams"));
document.querySelector("#teamsAddUser")?.addEventListener("click", () => openAdminSectionForTeams("users"));

refreshAuditLogsButton?.addEventListener("click", fetchAuditLogs);
refreshAuditLogsButton?.addEventListener("click", fetchAuditLogs);
refreshMailHistoryButton?.addEventListener("click", fetchMailHistory);
refreshPlatformCompaniesButton?.addEventListener("click", () => {
  if (canUseSupabase() && isSuperAdmin()) {
    _platformCompaniesLoaded = false;
    refreshPlatformCompanies();
    refreshPlatformApprovalQueue().then(renderPlatformApprovalQueue);
  }
  fetchPlatformCompanies();
  fetchAuditLogs();
  fetchMailHistory();
});

// #8 Offboarding (soft-delete): super-admin şirkəti arxivləyir.
platformCompanyGrid?.addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const btn = event.target.closest("button[data-company-offboard]");
  if (!btn) return;
  const workspaceId = btn.dataset.companyOffboard;
  const name = btn.dataset.name || "şirkət";
  if (!workspaceId || !canUseSupabase()) return;
  if (!confirm(`"${name}" şirkətini offboard etmək (arxivləmək)? İstifadəçilərin data-ya çıxışı dayanacaq. Geri qaytarmaq üçün deleted_at sıfırlanmalıdır.`)) return;
  btn.disabled = true;
  try {
    await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(workspaceId)}`, {
      method: "PATCH",
      body: JSON.stringify({ deleted_at: new Date().toISOString(), status: "disabled" })
    });
    recordAudit("workspace.offboarded", "company", workspaceId, name);
    showToast(`${name} offboard edildi`);
    _platformCompaniesLoaded = false;
    refreshPlatformCompanies();
  } catch (error) {
    alert("Offboard alınmadı: " + (error?.message || ""));
    btn.disabled = false;
  }
});

dateRequestList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-date-request-action]");
  if (!button) return;
  const task = appState.tasks.find((item) => item.id === button.dataset.taskId);
  const request = task?.dateChangeRequests?.find((item) => item.id === button.dataset.requestId);
  if (!task || !request || !canApproveDateRequest(task)) return;
  request.status = button.dataset.dateRequestAction === "approve" ? "approved" : "rejected";
  request.reviewedBy = currentUser.username;
  request.reviewedAt = new Date().toISOString();
  if (request.status === "approved") {
    task.start = request.newStart;
    task.end = request.newEnd;
  }
  recordAudit(`date-change.${request.status}`, "task", task.id, `${task.name}: ${request.oldStart}-${request.oldEnd} -> ${request.newStart}-${request.newEnd}`);
  addNotification(`${task.name} tarix sorğusu ${request.status}`, "", { taskId: task.id });
  saveTasks();
  render();
});

viewTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setView(button.dataset.view);
  });
});

summaryCards.forEach((card) => {
  card.addEventListener("click", () => activateSummaryCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateSummaryCard(card);
  });
});

searchInput.addEventListener("input", () => { taskListPage = 1; render(); });
projectFilter.addEventListener("change", render);

backToProjectsBtn?.addEventListener("click", () => {
  const projectName = projectFilter.value;
  setView("projects");
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-project="${CSS.escape(projectName)}"]`);
    if (card) card.closest("article")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

contextAddTaskBtn?.addEventListener("click", () => {
  openTaskComposerForProject(projectFilter.value);
});

contextEditProjectBtn?.addEventListener("click", () => {
  openProjectEditor(projectFilter.value);
});
function handleCalendarClick(event) {
  const button = event.target.closest("[data-calendar-day]");
  if (!button) return;
  selectedCalendarDay = button.dataset.calendarDay;
  renderCalendar();
}
function syncCalendarRangeFromInputs(source) {
  calendarRange = {
    start: source.start.value || calendarRange.start,
    end: source.end.value || calendarRange.end
  };
  selectedCalendarDay = "";
  renderCalendar();
}
dashboardCalendar.addEventListener("click", handleCalendarClick);
calendarBoard.addEventListener("click", handleCalendarClick);
[{ start: calendarStart, end: calendarEnd }].forEach((source) => {
  source.start?.addEventListener("change", () => syncCalendarRangeFromInputs(source));
  source.end?.addEventListener("change", () => syncCalendarRangeFromInputs(source));
});
// Dashboard calendar nav buttons (prev/next month)
function shiftDashboardCalendarMonth(delta) {
  const d = new Date(calendarRange.start + "T00:00:00");
  d.setMonth(d.getMonth() + delta, 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(y, d.getMonth() + 1, 0).getDate();
  calendarRange = { start: `${y}-${m}-01`, end: `${y}-${m}-${lastDay}` };
  renderCalendar();
}
dashCalPrev?.addEventListener("click", () => shiftDashboardCalendarMonth(-1));
dashCalNext?.addEventListener("click", () => shiftDashboardCalendarMonth(1));
cancelEdit.addEventListener("click", () => {
  resetForm();
  closeTaskComposer();
});
languageSelect.addEventListener("change", () => {
  changeLanguage(languageSelect.value);
});
loginLanguageSelect.addEventListener("change", () => {
  changeLanguage(loginLanguageSelect.value);
});

authTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.authTab || "login";
    authPanel.dataset.authMode = mode;
    authTabs.forEach((item) => item.classList.toggle("active", item === button));
  });
});

// ── Hero CTA buttons → open auth panel ───────────────────────────────────
function openAuthPanel(mode = "login") {
  loginScreen.classList.add("show-auth");
  authPanel.dataset.authMode = mode;
  authTabs.forEach((item) => item.classList.toggle("active", item.dataset.authTab === mode));
  // Focus first input
  setTimeout(() => {
    const inp = authPanel.querySelector("input");
    if (inp) inp.focus();
  }, 320);
}

function closeAuthPanel() {
  loginScreen.classList.remove("show-auth");
}

document.querySelector("#heroLoginBtn")?.addEventListener("click", (e) => { e.stopPropagation(); openAuthPanel("login"); });
document.querySelector("#heroRegisterBtn")?.addEventListener("click", (e) => { e.stopPropagation(); openAuthPanel("register"); });
document.querySelector("#authBackBtn")?.addEventListener("click", closeAuthPanel);

// ── Password reset ────────────────────────────────────────────────────────
async function supabaseResetPassword(email) {
  const cfg = supabaseConfig();
  if (!cfg) return false;
  // redirect_to: recovery email-dəki link app-ə qayıtsın → openRecoveryPasswordModal açılsın.
  const redirect = encodeURIComponent(cfg.redirectTo);
  try {
    const r = await fetch(`${cfg.url}/auth/v1/recover?redirect_to=${redirect}`, {
      method: "POST",
      headers: { apikey: cfg.anonKey, "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return r.ok;
  } catch (err) {
    console.error("supabaseResetPassword:", err);
    return false;
  }
}

document.querySelector("#forgotPasswordLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  authPanel.dataset.authMode = "reset";
  document.querySelector("#resetEmail").value = "";
  document.querySelector("#resetMsg").textContent = "";
});

document.querySelector("#backToLoginLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  authPanel.dataset.authMode = "login";
});

document.querySelector("#resetPasswordForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#resetEmail").value.trim();
  const msgEl = document.querySelector("#resetMsg");
  msgEl.style.color = "var(--muted)";
  msgEl.textContent = "…";
  const ok = await supabaseResetPassword(email);
  if (ok) {
    msgEl.style.color = "var(--teal)";
    msgEl.textContent = text("resetPasswordSent");
  } else {
    msgEl.style.color = "var(--danger)";
    msgEl.textContent = text("resetPasswordError");
  }
});

// ── Öz parolunu dəyiş (self-service) ────────────────────────────────────────
// GoTrue: daxil olmuş (və ya recovery sessiyalı) istifadəçi öz parolunu sessiya
// token-i ilə dəyişir. Current parol tələb olunmur — GoTrue sessiya ilə təsdiq edir.
async function supabaseUpdateOwnPassword(newPassword) {
  const cfg = supabaseConfig();
  if (!cfg) throw new Error("Supabase konfiqurasiyası yoxdur");
  const token = supabaseSession?.access_token;
  if (!token) throw new Error("Sessiya yoxdur — yenidən daxil olun");
  const r = await fetch(`${cfg.url}/auth/v1/user`, {
    method: "PUT",
    headers: { apikey: cfg.anonKey, authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ password: newPassword })
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body?.msg || body?.error_description || body?.error || "Parol yenilənmədi");
  return body;
}

function validateNewPasswordPair(pw1, pw2) {
  if (pw1.length < 6) return text("passwordTooShort");
  if (pw1 !== pw2) return text("passwordMismatch");
  return "";
}

// Personal panel → "Parol" kartı: öz parolunu dəyiş
document.querySelector("#saveOwnPassword")?.addEventListener("click", async () => {
  const pw1 = document.querySelector("#ownNewPassword")?.value || "";
  const pw2 = document.querySelector("#ownNewPassword2")?.value || "";
  const status = document.querySelector("#ownPasswordStatus");
  const setStatus = (color, msg) => { if (status) { status.style.color = color; status.textContent = msg; } };
  const err = validateNewPasswordPair(pw1, pw2);
  if (err) { setStatus("var(--danger)", err); return; }
  setStatus("var(--muted)", "…");
  try {
    await supabaseUpdateOwnPassword(pw1);
    setStatus("var(--teal)", text("passwordChanged"));
    document.querySelector("#ownNewPassword").value = "";
    document.querySelector("#ownNewPassword2").value = "";
    setTimeout(() => setStatus("var(--muted)", ""), 3000);
  } catch (e) {
    setStatus("var(--danger)", e.message);
  }
});

// Recovery email linkindən gələndə: məcburi "yeni parol" modalı
function openRecoveryPasswordModal() {
  const modal = document.querySelector("#recoveryPasswordModal");
  if (!modal) return;
  raiseModal(modal);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => document.querySelector("#recoveryNewPassword")?.focus(), 50);
}
document.querySelector("#saveRecoveryPassword")?.addEventListener("click", async () => {
  const pw1 = document.querySelector("#recoveryNewPassword")?.value || "";
  const pw2 = document.querySelector("#recoveryNewPassword2")?.value || "";
  const status = document.querySelector("#recoveryPasswordStatus");
  const setStatus = (color, msg) => { if (status) { status.style.color = color; status.textContent = msg; } };
  const err = validateNewPasswordPair(pw1, pw2);
  if (err) { setStatus("var(--danger)", err); return; }
  setStatus("var(--muted)", "…");
  try {
    await supabaseUpdateOwnPassword(pw1);
    const modal = document.querySelector("#recoveryPasswordModal");
    if (modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
    if (typeof showToast === "function") showToast(text("passwordChanged"));
    render();
  } catch (e) {
    setStatus("var(--danger)", e.message);
  }
});

// Close auth panel when clicking the dimmed hero backdrop
document.querySelector(".login-hero")?.addEventListener("click", () => {
  if (loginScreen.classList.contains("show-auth")) closeAuthPanel();
});

// Hero language switcher
document.querySelectorAll(".hero-lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.heroLang;
    changeLanguage(lang);
    document.querySelectorAll(".hero-lang-btn").forEach((b) => b.classList.toggle("active", b === btn));
  });
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;
  // Online rejimdə həm email, həm də istifadəçi adı ilə giriş dəstəklənir
  // (username → email çevrilməsi login-by-username edge function ilə).
  if (canUseSupabase()) {
    const endSplash = beginAuthSplash();
    try {
      const user = await supabaseLoginWorkspace(username, password);
      if (user) {
        loginError.textContent = "";
        loginPassword.value = "";
        appSettings = loadSettings();
        ensureTenantSeedData();
        render();
        endSplash();
        return;
      }
      document.documentElement.classList.remove("auth-restoring");
    } catch (error) {
      document.documentElement.classList.remove("auth-restoring");
      loginError.textContent = error.message;
      return;
    }
  }
  if (isSupabasePrimaryMode()) {
    loginError.textContent = "Supabase login alınmadı. Dəyişikliklər online yadda qalması üçün email login vacibdir.";
    return;
  }
  const localUser = appState.users.find((item) => item.username === username && item.passwordHash === md5(password));
  let user = canUseBackend() ? await backendLogin(username, password) : null;
  if (!user) user = localUser;
  if (user && !appState.users.some((item) => item.id === user.id || item.username === user.username)) {
    appState.users.push(user);
    saveUsers();
  }
  user = appState.users.find((item) => item.username === user?.username) || user;
  if (!user) {
    loginError.textContent = text("loginError");
    return;
  }
  const company = companyRegistryFromLocalState().find((item) => item.id === user.companyId);
  if (user.role !== "super_admin" && company?.status === "suspended" && !canUseBackend()) {
    loginError.textContent = text("companySuspended");
    return;
  }
  currentUser = user;
  localStorage.setItem(sessionKey, user.id);
  appSettings = loadSettings();
  ensureTenantSeedData();
  loginError.textContent = "";
  loginPassword.value = "";
  const endSplashLocal = beginAuthSplash();
  render();
  endSplashLocal();
  if (localUser && canUseBackend()) {
    backendLogin(username, password).then(() => {
      syncBackendState();
      syncBackendSettings();
    });
  } else {
    syncBackendState();
    syncBackendSettings();
  }
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  // #6 Rate-limit: eyni brauzerdən çox tez-tez qeydiyyatın qarşısını al (60s cooldown).
  // Server tərəfdə Supabase Auth-un öz signup rate-limiti də var.
  const lastReg = Number(localStorage.getItem("pm-last-register") || 0);
  const waitMs = 60000 - (Date.now() - lastReg);
  if (waitMs > 0) {
    registerError.textContent = `Çox tez-tez cəhd. ${Math.ceil(waitMs / 1000)} saniyə sonra yenidən cəhd edin.`;
    return;
  }
  localStorage.setItem("pm-last-register", String(Date.now()));
  const companyName = registerCompanyInput.value.trim();
  const subdomain = slugFromName(registerSubdomainInput?.value || companyName);
  const username = registerUsernameInput.value.trim() || `admin${subdomain}`;
  const password = registerPasswordInput.value || `admin${subdomain}123`;
  const fullName = registerFullNameInput.value.trim() || username;
  const email = registerEmailInput.value.trim();
  if (!companyName || !username || !password) return;
  if (canUseSupabase() && email && password) {
    try {
      registerError.textContent = "Supabase qeydiyyatı yaradılır...";
      await supabaseRegisterWorkspace({ companyName, subdomain, username, password, fullName, email });
      registerError.textContent = "";
      if (registerSubdomainInput) registerSubdomainInput.value = "";
      registerPasswordInput.value = "";
      render();
      return;
    } catch (error) {
      registerError.textContent = error.message;
      return;
    }
  }
  if (appState.users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    registerError.textContent = "Bu istifadəçi adı artıq var.";
    return;
  }
  const companyId = companyIdFromName(companyName);
  const adminUsername = username;
  const user = normalizeUser({
    id: createId(),
    username,
    passwordHash: md5(password),
    role: "admin",
    managerId: "",
    companyId,
    profile: {
      fullName,
      email,
      position: "Company Admin",
      company: companyName
    }
  });
  appState.users.push(user);
  companyRegistry = [
    ...companyRegistry.filter((company) => company.id !== companyId),
    { id: companyId, name: companyName, subdomain, status: "active", plan: "standard", adminUsername, userCount: 1, projectCount: 0, createdAt: new Date().toISOString(), lastLoginAt: "" }
  ];
  saveUsers();
  currentUser = user;
  localStorage.setItem(sessionKey, user.id);
  appSettings = loadSettings();
  ensureTenantSeedData();
  registerError.textContent = "";
  if (registerSubdomainInput) registerSubdomainInput.value = "";
  registerPasswordInput.value = "";
  recordAudit("workspace.registered", "company", companyId, companyName);
  render();
});

document.querySelector("#googleLoginBtn")?.addEventListener("click", supabaseGoogleAuth);
document.querySelector("#googleRegisterBtn")?.addEventListener("click", supabaseGoogleAuth);

registerCompanyInput?.addEventListener("input", () => {
  if (registerSubdomainInput && !registerSubdomainInput.value.trim()) {
    registerSubdomainInput.placeholder = slugFromName(registerCompanyInput.value || "klinika");
  }
  const subdomain = slugFromName(registerSubdomainInput?.value || registerCompanyInput.value);
  if (!registerUsernameInput.value.trim()) registerUsernameInput.placeholder = `admin${subdomain}`;
  if (!registerPasswordInput.value.trim()) registerPasswordInput.placeholder = `admin${subdomain}123`;
});

registerSubdomainInput?.addEventListener("input", () => {
  const subdomain = slugFromName(registerSubdomainInput.value || registerCompanyInput.value);
  if (!registerUsernameInput.value.trim()) registerUsernameInput.placeholder = `admin${subdomain}`;
  if (!registerPasswordInput.value.trim()) registerPasswordInput.placeholder = `admin${subdomain}123`;
});

logoutButton.addEventListener("click", async () => {
  disconnectSSE();
  saveSupabaseSession(null);
  supabaseWorkspaceId = "";
  localStorage.removeItem(supabaseWorkspaceKey);
  if (canUseBackend() && authToken) {
    fetch(backendUrl("/api/auth/logout"), { method: "POST", headers: authHeaders() }).catch(() => {});
  }
  currentUser = null;
  authToken = "";
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(authTokenKey);
  appSettings = loadSettings();
  closeAdminPanel();
  closeManagerPanel();
  closeManagerAssign();
  closeTaskComposer();
  render();
});

notifyButton.addEventListener("click", openNotificationPanel);
closeNotificationPanelButton?.addEventListener("click", closeNotificationPanel);
notificationModal?.addEventListener("click", (event) => {
  if (event.target.closest("[data-notification-close]")) closeNotificationPanel();
  const button = event.target.closest("[data-notification-action]");
  if (button?.dataset.notificationAction === "mark-read") {
    const visibleIds = new Set(visibleNotifications().map((item) => item.id));
    notifications = notifications.map((item) => visibleIds.has(item.id) ? { ...item, read: true } : item);
    saveNotifications();
    renderNotificationCenter();
  } else if (button?.dataset.notificationAction === "enable") {
    enableNotifications();
  }
});
openTaskComposerButton.addEventListener("click", () => {
  const selectedProject = projectFilter.value === "Hamısı" ? "" : projectFilter.value;
  openTaskComposerForProject(selectedProject);
});
closeTaskComposerButton.addEventListener("click", closeTaskComposer);
taskComposerModal.addEventListener("click", (event) => {
  if (event.target.dataset.taskModalClose) closeTaskComposer();
});
openAdminPanelButton.addEventListener("click", openAdminPanel);
document.querySelector("#openPersonalSettings")?.addEventListener("click", openPersonalSettings);
document.querySelector("#closePersonalSettings")?.addEventListener("click", closePersonalSettings);
document.querySelector("#personalSettingsModal")?.addEventListener("click", (event) => {
  if (event.target.dataset.personalSettingsClose) closePersonalSettings();
});
document.querySelector("#saveCompanyNameBtn")?.addEventListener("click", saveCompanyName);
openPlatformAdminPanelButton?.addEventListener("click", openAdminPanel);
closeAdminPanelButton.addEventListener("click", closeAdminPanel);
adminModal.addEventListener("click", (event) => {
  if (event.target.dataset.modalClose) closeAdminPanel();
  const button = event.target.closest("[data-admin-open-section]");
  if (button) openAdminSection(button.dataset.adminOpenSection);
});

// ─── Manager Panel listeners ─────────────────────────────────────────────────
openManagerPanelButton?.addEventListener("click", openManagerPanel);
closeManagerPanelButton?.addEventListener("click", closeManagerPanel);
managerPanelModal?.addEventListener("click", (event) => {
  // Backdrop-a basılsa bağla
  if (event.target.dataset.mgrPanelClose) { closeManagerPanel(); return; }

  // Bölmə kartına basılsa popup aç
  const sectionBtn = event.target.closest("[data-mgr-open-section]");
  if (sectionBtn) { openManagerSection(sectionBtn.dataset.mgrOpenSection); return; }

  // Layihəni aç
  const openBtn = event.target.closest("[data-mgr-open-project]");
  if (openBtn) {
    closeManagerPanel();
    projectFilter.value = openBtn.dataset.mgrOpenProject;
    setView("list");
    return;
  }

  // Tarix sorğusu: təsdiqlə
  const approveBtn = event.target.closest("[data-mgr-date-approve]");
  if (approveBtn) {
    const id = approveBtn.dataset.mgrDateApprove;
    const req = (appSettings.dateRequests || []).find((r) => r.id === id);
    if (req) {
      const task = appState.tasks.find((t) => t.id === req.taskId);
      if (task) { task.end = req.newEnd; saveTasks(); }
      appSettings.dateRequests = (appSettings.dateRequests || []).map((r) =>
        r.id === id ? { ...r, status: "approved" } : r
      );
      saveAppSettings();
      renderManagerPanel();
    }
    return;
  }

  // Tarix sorğusu: rədd et
  const rejectBtn = event.target.closest("[data-mgr-date-reject]");
  if (rejectBtn) {
    const id = rejectBtn.dataset.mgrDateReject;
    appSettings.dateRequests = (appSettings.dateRequests || []).map((r) =>
      r.id === id ? { ...r, status: "rejected" } : r
    );
    saveAppSettings();
    renderManagerPanel();
    return;
  }

  // Register sil
  const regDeleteBtn = event.target.closest("[data-mgr-register-delete]");
  if (regDeleteBtn) {
    const id = regDeleteBtn.dataset.mgrRegisterDelete;
    appState.registers = appState.registers.filter((r) => r.id !== id);
    saveResources();
    renderManagerPanel();
    render();
    return;
  }

  // Komanda sil
  const teamDeleteBtn = event.target.closest("[data-mgr-team-delete]");
  if (teamDeleteBtn) {
    const id = teamDeleteBtn.dataset.mgrTeamDelete;
    appState.teams = appState.teams.filter((t) => t.id !== id);
    saveResources();
    renderManagerPanel();
    render();
    return;
  }

  // Link sil
  const linkDeleteBtn = event.target.closest("[data-mgr-link-delete]");
  if (linkDeleteBtn) {
    const id = linkDeleteBtn.dataset.mgrLinkDelete;
    appState.projectLinks = appState.projectLinks.filter((l) => l.id !== id);
    saveResources();
    renderManagerPanel();
    render();
    return;
  }

  // Zibil: bərpa et
  const trashRestoreBtn = event.target.closest("[data-mgr-trash-restore]");
  if (trashRestoreBtn) {
    const id = trashRestoreBtn.dataset.mgrTrashRestore;
    const item = appState.trash.find((t) => t.id === id);
    if (item) {
      if (item.type === "task") appState.tasks.push(item.data);
      else if (item.type === "projectRecord") appState.projectLinks.push(item.data);
      else appState.projects.push(item.data);
      appState.trash = appState.trash.filter((t) => t.id !== id);
      saveResources();
      saveTasks();
      renderManagerPanel();
      render();
    }
    return;
  }

  // Zibil: həmişəlik sil
  const trashDeleteBtn = event.target.closest("[data-mgr-trash-delete]");
  if (trashDeleteBtn) {
    const id = trashDeleteBtn.dataset.mgrTrashDelete;
    appState.trash = appState.trash.filter((t) => t.id !== id);
    saveResources();
    renderManagerPanel();
    return;
  }
});

// Register əlavə et
document.querySelector("#mgrAddRegister")?.addEventListener("click", () => {
  const title = document.querySelector("#mgrRegisterTitle")?.value.trim();
  const type = document.querySelector("#mgrRegisterType")?.value || "risk";
  const project = document.querySelector("#mgrRegisterProject")?.value;
  if (!title || !project) return;
  const reg = { id: createId("reg"), title, type, project, status: "Open", impact: "Medium", mitigation: "", owner: "", dueDate: "" };
  appState.registers.push(reg);
  saveResources();
  document.querySelector("#mgrRegisterTitle").value = "";
  renderManagerPanel();
  render();
});

// Komanda əlavə et
document.querySelector("#mgrAddTeam")?.addEventListener("click", () => {
  const name = document.querySelector("#mgrNewTeamName")?.value.trim();
  const memberSelect = document.querySelector("#mgrNewTeamMembers");
  const memberIds = memberSelect ? [...memberSelect.selectedOptions].map((o) => o.value) : [];
  if (!name) return;
  const team = { id: createId("team"), name, memberIds, companyId: currentCompanyId() };
  appState.teams.push(team);
  saveResources();
  document.querySelector("#mgrNewTeamName").value = "";
  renderManagerPanel();
  render();
});
// ─────────────────────────────────────────────────────────────────────────────
closeAdminSectionButton.addEventListener("click", closeAdminSection);
adminSectionModal.addEventListener("click", (event) => {
  if (event.target.dataset.adminSectionClose) closeAdminSection();
});
closeManagerSectionButton?.addEventListener("click", closeManagerSection);
managerSectionModal?.addEventListener("click", (event) => {
  if (event.target.dataset.mgrSectionClose) closeManagerSection();
});
closeManagerAssignButton.addEventListener("click", closeManagerAssign);
cancelManagerAssignButton.addEventListener("click", closeManagerAssign);
managerAssignModal.addEventListener("click", (event) => {
  if (event.target.dataset.managerModalClose) closeManagerAssign();
});
managerAssignList.addEventListener("change", () => {
  updateSelectedManagersPreview();
});
saveProjectManagersButton.addEventListener("click", () => {
  const project = appState.projects.find((item) => item.id === activeManagerProjectId);
  // Telebe-Hotel: admin + manager (moderator) layihəyə menecer təyin edə bilər
  if (!project || !canManageProjects()) return;
  project.managerIds = managerPickerIds();
  saveResources();
  closeManagerAssign();
  render();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (adminSectionModal.classList.contains("open")) closeAdminSection();
  else if (adminModal.classList.contains("open")) closeAdminPanel();
  if (managerAssignModal.classList.contains("open")) closeManagerAssign();
  if (taskComposerModal.classList.contains("open")) closeTaskComposer();
});

exportDataButton.addEventListener("click", async () => {
  if (!isOrgAdmin()) return;
  const ok = await downloadBackendFile("/api/backup/json", `project-manager-backup-${isoDate(new Date())}.json`);
  if (ok) return;
  downloadJson(`project-manager-backup-${isoDate(new Date())}.json`, backupPayload());
});

exportExcelButton.addEventListener("click", async () => {
  if (!isOrgAdmin()) return;
  downloadText(`project-manager-report-${isoDate(new Date())}.csv`, filteredReportCsv(), "text/csv;charset=utf-8");
});

exportPdfButton.addEventListener("click", async () => {
  if (!isOrgAdmin()) return;
  const ok = await downloadBackendFile("/api/export/pdf", `project-manager-report-${isoDate(new Date())}.pdf`);
  if (!ok) downloadText(`project-manager-report-${isoDate(new Date())}.html`, reports.innerHTML, "text/html;charset=utf-8");
});

importDataInput.addEventListener("change", () => {
  if (!isOrgAdmin() || !importDataInput.files?.length) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      importProjectFile(importDataInput.files[0].name || "import.csv", String(reader.result || ""));
      alert(text("importDone"));
      importDataInput.value = "";
    } catch (error) {
      alert(error.message || text("backupError"));
    }
  });
  reader.addEventListener("error", () => alert(text("backupError")));
  reader.readAsText(importDataInput.files[0]);
});

saveImportMappingButton?.addEventListener("click", () => {
  if (!isOrgAdmin()) return;
  appSettings = {
    ...appSettings,
    importColumnMap: {
      project: importProjectColumnInput?.value.trim() || "",
      task: importTaskColumnInput?.value.trim() || "",
      owner: importOwnerColumnInput?.value.trim() || "",
      dependencies: importDependencyColumnInput?.value.trim() || ""
    }
  };
  saveAppSettings();
  renderImportMappingControls();
});

createManualBackupButton?.addEventListener("click", () => {
  if (!isOrgAdmin()) return;
  const payload = backupPayload();
  const backup = {
    id: createId("backup"),
    createdAt: new Date().toISOString(),
    taskCount: appState.tasks.length,
    projectCount: appState.projects.length,
    payload
  };
  appSettings = {
    ...appSettings,
    backups: [backup, ...(appSettings.backups || [])].slice(0, 10)
  };
  saveAppSettings();
  addNotification(text("backupCreated"), "", { type: "backup", status: "ok" });
  renderBackupPanel();
});

backupList?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-backup-download]");
  if (!button || !isOrgAdmin()) return;
  const backup = (appSettings.backups || []).find((item) => item.id === button.dataset.backupDownload);
  if (!backup) return;
  downloadJson(`project-manager-backup-${isoDate(new Date(backup.createdAt))}.json`, backup.payload);
});

restoreBackupInput?.addEventListener("change", () => {
  if (!isOrgAdmin() || !restoreBackupInput.files?.length) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      importBackup(JSON.parse(String(reader.result || "{}")));
      restoreBackupInput.value = "";
      alert(text("importDone"));
    } catch (error) {
      alert(error.message || text("backupError"));
    }
  });
  reader.addEventListener("error", () => alert(text("backupError")));
  reader.readAsText(restoreBackupInput.files[0]);
});

// Backup bölməsindəki yeni düymələr
document.querySelector("#exportDataBtn")?.addEventListener("click", () => document.querySelector("#exportData")?.click());
document.querySelector("#exportExcelBtn")?.addEventListener("click", () => document.querySelector("#exportExcel")?.click());
document.querySelector("#exportPdfBtn")?.addEventListener("click", () => document.querySelector("#exportPdf")?.click());
document.querySelector("#clearDoneBtn")?.addEventListener("click", () => document.querySelector("#clearDone")?.click());
document.querySelector("#importDataBtn")?.addEventListener("change", (e) => {
  const importData = document.querySelector("#importData");
  if (importData && e.target.files?.length) {
    const dt = new DataTransfer();
    dt.items.add(e.target.files[0]);
    importData.files = dt.files;
    importData.dispatchEvent(new Event("change"));
  }
});

[themeModeInput, backgroundStyleInput, accentColorInput].forEach((input) => {
  input.addEventListener("change", () => {
    appSettings = {
      ...appSettings,
      themeMode: themeModeInput.value,
      backgroundStyle: backgroundStyleInput.value,
      accentColor: accentColorInput.value
    };
    saveAppSettings();
    applyAppSettings();
  });
});

// Ay ⇄ günəş tema keçidi. checked = işıqlı rejim.
themeToggle?.addEventListener("change", () => {
  appSettings = { ...appSettings, themeMode: themeToggle.checked ? "light" : "dark" };
  saveAppSettings();
  applyAppSettings();
  if (themeModeInput) themeModeInput.value = appSettings.themeMode;
});

saveSettingsButton.addEventListener("click", () => {
  if (!currentUser) return;
  appSettings = {
    ...appSettings,
    themeMode: themeModeInput.value,
    backgroundStyle: backgroundStyleInput.value,
    accentColor: accentColorInput.value,
    emailEnabled: canManageMailSettings() ? emailEnabledInput.checked : appSettings.emailEnabled,
    emailRecipients: canManageMailSettings() ? emailRecipientsInput.value.trim() : appSettings.emailRecipients,
    emailProvider: canManageMailSettings() ? emailProviderInput.value.trim() : appSettings.emailProvider,
    mailSubjectTemplate: canManageMailSettings() ? mailSubjectTemplateInput.value.trim() || "Project Manager deadline alerts" : appSettings.mailSubjectTemplate,
    mailBodyTemplate: canManageMailSettings() ? mailBodyTemplateInput.value.trim() || "{{alerts}}" : appSettings.mailBodyTemplate,
    testMailBody: canManageMailSettings() ? testMailBodyInput.value.trim() || "Project Manager mail ayarları test edildi." : appSettings.testMailBody,
    telegramEnabled: canManageMailSettings() ? telegramEnabledInput?.checked ?? appSettings.telegramEnabled : appSettings.telegramEnabled,
    telegramBotToken: canManageMailSettings() ? telegramBotTokenInput?.value.trim() || appSettings.telegramBotToken : appSettings.telegramBotToken,
    telegramChatId: canManageMailSettings() ? telegramChatIdInput?.value.trim() || appSettings.telegramChatId : appSettings.telegramChatId,
    ldapEnabled: canManagePlatformSettings() ? ldapEnabledInput.checked : appSettings.ldapEnabled,
    ldapUrl: canManagePlatformSettings() ? ldapUrlInput.value.trim() : appSettings.ldapUrl,
    ldapBaseDn: canManagePlatformSettings() ? ldapBaseDnInput.value.trim() : appSettings.ldapBaseDn,
    ldapUserFilter: canManagePlatformSettings() ? ldapUserFilterInput.value.trim() || "(uid={username})" : appSettings.ldapUserFilter,
    ldapBindDn: canManagePlatformSettings() ? ldapBindDnInput.value.trim() : appSettings.ldapBindDn,
    ldapBindPassword: canManagePlatformSettings() ? ldapBindPasswordInput.value : appSettings.ldapBindPassword,
    ldapGroupRoleMap: canManagePlatformSettings() ? ldapGroupRoleMapInput.value.trim() : appSettings.ldapGroupRoleMap,
    capacityHours: canManagePlatformSettings() ? Number(capacityHoursInput.value) || 40 : appSettings.capacityHours,
    workflowStatuses: normalizeWorkflowStatuses(appSettings.workflowStatuses)
  };
  syncWorkflowStatuses();
  saveAppSettings();
  saveBackendSettings();
  applyAppSettings();
  settingsStatus.textContent = text("settingsSaved");
});

testMailButton.addEventListener("click", async () => {
  if (!canManageMailSettings()) return;
  settingsStatus.textContent = "";
  appSettings = {
    ...appSettings,
    emailEnabled: emailEnabledInput.checked,
    emailRecipients: emailRecipientsInput.value.trim(),
    emailProvider: emailProviderInput.value.trim(),
    mailSubjectTemplate: mailSubjectTemplateInput.value.trim() || "Project Manager deadline alerts",
    mailBodyTemplate: mailBodyTemplateInput.value.trim() || "{{alerts}}",
    testMailBody: testMailBodyInput.value.trim() || "Project Manager mail ayarları test edildi."
  };
  saveAppSettings();
  await saveBackendSettings();
  try {
    const result = await sendOnlineTestMail();
    settingsStatus.textContent = result.skipped || result.ok === false ? text("mailTestSkipped") : text("mailTestSent");
  } catch {
    settingsStatus.textContent = text("mailTestSkipped");
  }
});

document.querySelector("#saveReportPrefs")?.addEventListener("click", saveReportPrefs);

document.querySelector("#testTelegram")?.addEventListener("click", async () => {
  if (!canManageMailSettings()) return;
  const token = telegramBotTokenInput?.value.trim() || appSettings.telegramBotToken || "";
  const chatId = telegramChatIdInput?.value.trim() || appSettings.telegramChatId || "";
  if (!token || !chatId) { settingsStatus.textContent = "Token və Chat ID tələb olunur"; return; }
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: "✅ Project Manager Telegram testi uğurludur." }),
    });
    settingsStatus.textContent = r.ok ? "✅ Telegram test göndərildi" : `❌ Telegram xəta: ${r.status}`;
  } catch (e) {
    settingsStatus.textContent = `❌ ${e.message}`;
  }
});

testLdapButton.addEventListener("click", async () => {
  if (!canManagePlatformSettings()) return;
  settingsStatus.textContent = "";
  try {
    const result = await sendBackendTestLdap();
    settingsStatus.textContent = result.ok ? text("ldapTestOk") : text("ldapTestFailed");
  } catch {
    settingsStatus.textContent = text("ldapTestFailed");
  }
});

addWorkflowStatusButton.addEventListener("click", () => {
  if (!canManagePlatformSettings()) return;
  const nextStatus = workflowStatusNameInput.value.trim();
  if (!nextStatus || statuses.some((status) => status.toLowerCase() === nextStatus.toLowerCase())) return;
  const withoutDone = statuses.filter((status) => status !== "Bitib");
  appSettings.workflowStatuses = normalizeWorkflowStatuses([...withoutDone, nextStatus, "Bitib"]);
  syncWorkflowStatuses();
  workflowStatusNameInput.value = "";
  saveAppSettings();
  saveBackendSettings();
  render();
});

workflowStatusList.addEventListener("click", (event) => {
  if (!isAdmin()) return;
  const button = event.target.closest("button[data-workflow-remove]");
  if (!button) return;
  const status = button.dataset.workflowRemove;
  if (protectedWorkflowStatuses.has(status)) return;
  appSettings.workflowStatuses = normalizeWorkflowStatuses(statuses.filter((item) => item !== status));
  appState.tasks = appState.tasks.map((task) => task.status === status ? { ...task, status: "Plan" } : task);
  appState.projects = appState.projects.map((project) => project.status === status ? { ...project, status: "Plan" } : project);
  currentFilter = currentFilter === status ? "Hamısı" : currentFilter;
  syncWorkflowStatuses();
  saveAppSettings();
  saveResources();
  saveTasks();
  saveBackendSettings();
  render();
});

// Online rejimdə paneldən birbaşa hesab: real Supabase auth user (dərhal active,
// email+parol ilə girə bilir) + appState.users-ə əlavə (siyahıda görünsün).
// Rol dəyişikliyini BAZAYA da yazır. Yalnız local blob-u yeniləmək kifayət
// deyil: RLS `profiles.role`-a baxır, ona görə local admin ≠ DB admin olur və
// həmin adamın bütün app_state yazıları 403 alıb səssizcə itir (əks halda isə
// adminlikdən salınan adam DB-də admin qalır — təhlükəsizlik boşluğu).
async function syncRoleToDatabase(userId, appRole) {
  if (!teamSupabaseActive()) return true;
  try {
    await callSupabaseFunction("manage-user", { action: "set-role", profileId: userId, appRole });
    return true;
  } catch (error) {
    // Yalnız local istifadəçidirsə (Supabase profili yoxdur) 404 normaldır.
    if (/tapılmadı|not found|404/i.test(String(error?.message || error))) return true;
    alert("Rol bazada yenilənmədi: " + (error?.message || error));
    return false;
  }
}

async function onlineCreateUser() {
  const companySlug = slugFromName(currentUser?.profile?.company || currentCompanyId());
  const role = newUserRoleInput.value;
  const username = newUsernameInput.value.trim() || uniqueUsername(`${role}${companySlug}`);
  const email = newUserEmailInput.value.trim().toLowerCase();
  const password = newUserPasswordInput.value;
  const fullName = newUserFullNameInput.value.trim() || username;
  const position = newUserPositionInput.value.trim();
  if (!email) { alert("Online rejimdə email tələb olunur — istifadəçi bu email ilə giriş edəcək."); return; }
  if (!password || password.length < 6) { alert("Parol ən azı 6 simvol olmalıdır."); return; }
  if (appState.users.some((u) => u.username === username)) { alert("Bu istifadəçi adı artıq mövcuddur."); return; }
  const orig = addUserButton.textContent;
  addUserButton.disabled = true;
  addUserButton.textContent = text("inviteSending");
  try {
    const res = await callSupabaseFunction("manage-user", { action: "create", email, password, username, fullName, role, appRole: role, position });
    const newId = res?.userId || createId();
    const managedRoles = ["user", "contributor", "viewer"];
    const managerId = managedRoles.includes(role) ? (currentUser?.role === "manager" ? currentUser.id : appState.users.find((u) => u.role === "manager" && u.companyId === currentCompanyId())?.id || "") : "";
    const user = normalizeUser({
      id: newId, username, passwordHash: "", role, managerId, companyId: currentCompanyId(),
      profile: { fullName, position, email, address: newUserAddressInput.value.trim(), company: currentUser?.profile?.company || "" }
    });
    appState.users = [...appState.users.filter((u) => u.id !== newId && u.username !== username), user];
    newUsernameInput.value = ""; newUserPasswordInput.value = ""; newUserFullNameInput.value = "";
    newUserPositionInput.value = ""; newUserEmailInput.value = ""; newUserAddressInput.value = "";
    saveUsers();
    recordAudit("user.created", "user", newId, username);
    render();
    if (typeof showToast === "function") showToast(`${username} yaradıldı — email + parol ilə girə bilər.`);
  } catch (err) {
    alert(text("inviteError") + ": " + (err?.message || err));
  } finally {
    addUserButton.disabled = false;
    addUserButton.textContent = orig;
  }
}

addUserButton.addEventListener("click", () => {
  // Telebe-Hotel: yalnız org admin istifadəçi əlavə edə bilər (manager/moderator yox)
  if (!canManageOrgUsers()) return;
  // #5 kvota: workspace istifadəçi limitini keçmə (0 = limitsiz/local rejim).
  if (workspaceMaxUsers > 0) {
    const currentCount = appState.users.filter((u) => (u.companyId || "company-default") === currentCompanyId()).length;
    if (currentCount >= workspaceMaxUsers) {
      alert(`İstifadəçi limiti dolub (${workspaceMaxUsers} / plan: ${workspacePlan}). Yeni istifadəçi üçün planı yüksəldin və ya mövcud istifadəçini silin.`);
      return;
    }
  }
  // Online (Supabase) rejim: real, girə bilən hesab yarat.
  if (teamSupabaseActive()) { onlineCreateUser(); return; }
  // Supabase əsas rejimdirsə, aşağıdakı lokal yol YALNIZ blob-da user yaradır —
  // auth hesabı olmadığı üçün həmin adam heç vaxt giriş edə bilmir. Səssiz
  // yaratmaqdansa səbəbi deyirik.
  if (isSupabasePrimaryMode()) {
    alert("İstifadəçi yaradıla bilmədi: online sessiya yoxdur və ya sizdə admin hüququ yoxdur.\nYalnız lokal qeyd yaratmaq həmin şəxsin giriş edə bilməməsi deməkdir — ona görə dayandırıldı.");
    return;
  }
  const companySlug = slugFromName(currentUser?.profile?.company || currentCompanyId());
  const password = newUserPasswordInput.value;
  const role = newUserRoleInput.value;
  const username = newUsernameInput.value.trim() || uniqueUsername(`${role}${companySlug}`);
  const finalPassword = password || `${username}123`;
  if (!username || appState.users.some((user) => user.username === username)) return;
  const managedRoles = ["user", "contributor", "viewer"];
  const managerId = managedRoles.includes(role) ? (currentUser?.role === "manager" ? currentUser.id : appState.users.find((user) => user.role === "manager" && user.companyId === currentCompanyId())?.id || "") : "";
  const user = normalizeUser({
    id: createId(),
    username,
    passwordHash: md5(finalPassword),
    role,
    managerId,
    companyId: currentCompanyId(),
    profile: {
      fullName: newUserFullNameInput.value.trim() || username,
      position: newUserPositionInput.value.trim(),
      email: newUserEmailInput.value.trim(),
      address: newUserAddressInput.value.trim(),
      company: currentUser?.profile?.company || ""
    }
  });
  appState.users.push(user);
  newUsernameInput.value = "";
  newUserPasswordInput.value = "";
  newUserFullNameInput.value = "";
  newUserPositionInput.value = "";
  newUserEmailInput.value = "";
  newUserAddressInput.value = "";
  saveUsers();
  recordAudit("user.created", "user", user.id, username);
  render();
  // Send welcome email via platform mail if user has an email address
  if (user.profile?.email && canUseBackend()) {
    fetch(backendUrl("/api/auth/send-welcome"), {
      method: "POST",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({ userId: user.id, password: finalPassword })
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (data.ok) console.info(`Welcome email sent to ${user.profile.email}`);
      else console.info(`Welcome email skipped: ${data.reason || "unknown"}`);
    }).catch(() => {});
  }
});

// ── Komanda (Supabase) — dəvət + gözləyən üzvlərin təsdiqi ─────────────────
function teamSupabaseActive() {
  return isSupabasePrimaryMode() && Boolean(supabaseWorkspaceId) && ["admin", "super_admin"].includes(currentUser?.role);
}

function renderTeamSupabasePanels() {
  const inviteCard = document.querySelector("#teamInviteCard");
  const pendingCard = document.querySelector("#pendingMembersCard");
  if (!inviteCard || !pendingCard) return;
  const active = teamSupabaseActive();
  inviteCard.hidden = !active;
  pendingCard.hidden = !active;
  if (active) loadPendingMembers();
}

async function loadPendingMembers() {
  const listEl = document.querySelector("#pendingMembersList");
  const countEl = document.querySelector("#pendingCount");
  if (!listEl) return;
  try {
    const rows = await supabaseRequest(`/rest/v1/profiles?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}&status=in.(pending,invited)&select=id,username,full_name,email,role,status&order=created_at.desc`);
    const members = Array.isArray(rows) ? rows : [];
    if (countEl) countEl.textContent = members.length;
    if (!members.length) {
      listEl.innerHTML = `<p class="empty-hint">${text("pendingEmpty")}</p>`;
      return;
    }
    const roleOpts = (selected) => ["user", "manager", "rehberlik", "admin"]
      .map((r) => `<option value="${r}"${r === selected ? " selected" : ""}>${roleLabel(r)}</option>`).join("");
    listEl.innerHTML = members.map((m) => {
      const label = m.status === "pending" ? text("statusPending") : text("statusInvited");
      const name = m.full_name || m.username || m.email || m.id;
      return `<div class="pending-member" data-id="${escapeHtml(m.id)}">
        <div class="pending-member-info">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(m.email || "")} · <span class="pending-badge pending-badge-${escapeHtml(m.status)}">${escapeHtml(label)}</span></small>
        </div>
        <div class="pending-member-actions">
          <select data-role-for="${escapeHtml(m.id)}" aria-label="${escapeHtml(text("role"))}">${roleOpts(m.role || "user")}</select>
          <button type="button" class="primary small" data-member-action="approve" data-id="${escapeHtml(m.id)}">${escapeHtml(text("approve"))}</button>
          <button type="button" class="ghost small danger" data-member-action="reject" data-id="${escapeHtml(m.id)}">${escapeHtml(text("reject"))}</button>
        </div>
      </div>`;
    }).join("");
  } catch (err) {
    listEl.innerHTML = `<p class="empty-hint">${escapeHtml(err?.message || "Xəta")}</p>`;
  }
}

document.querySelector("#inviteMemberBtn")?.addEventListener("click", async () => {
  if (!teamSupabaseActive()) return;
  const emailEl = document.querySelector("#inviteEmail");
  const fullNameEl = document.querySelector("#inviteFullName");
  const roleEl = document.querySelector("#inviteRole");
  const btn = document.querySelector("#inviteMemberBtn");
  const email = (emailEl?.value || "").trim().toLowerCase();
  const fullName = (fullNameEl?.value || "").trim();
  const role = roleEl?.value || "user";
  if (!email) { alert(text("inviteNeedEmail")); return; }
  const username = (email.split("@")[0] || "user").replace(/[^a-z0-9._-]/gi, "") || "user";
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = text("inviteSending");
  try {
    const cfg = supabaseConfig();
    const res = await callSupabaseFunction("manage-user", { action: "invite", email, username, fullName, role, redirectTo: cfg?.redirectTo });
    const linkField = document.querySelector("#inviteLinkField");
    const resultBox = document.querySelector("#inviteResult");
    if (res?.inviteLink && linkField && resultBox) {
      linkField.value = res.inviteLink;
      resultBox.hidden = false;
    }
    if (emailEl) emailEl.value = "";
    if (fullNameEl) fullNameEl.value = "";
    recordAudit("user.invited", "user", res?.userId || "", email);
    loadPendingMembers();
  } catch (err) {
    alert(text("inviteError") + ": " + (err?.message || err));
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
});

document.querySelector("#copyInviteLink")?.addEventListener("click", async () => {
  const field = document.querySelector("#inviteLinkField");
  const btn = document.querySelector("#copyInviteLink");
  if (!field?.value) return;
  try {
    await navigator.clipboard.writeText(field.value);
  } catch {
    field.select();
    try { document.execCommand("copy"); } catch { /* ignore */ }
  }
  const orig = btn.textContent;
  btn.textContent = text("copied");
  setTimeout(() => { btn.textContent = orig; }, 1500);
});

document.querySelector("#pendingMembersList")?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-member-action]");
  if (!button || !teamSupabaseActive()) return;
  const id = button.dataset.id;
  const action = button.dataset.memberAction;
  // Uğurdan sonra sətri dərhal DOM-dan sil (PostgREST replica read-lag-a görə
  // re-fetch bəzən köhnə sətri qaytarır) + sayğacı yenilə, sonra reconcile.
  const dropRow = () => {
    button.closest(".pending-member")?.remove();
    const countEl = document.querySelector("#pendingCount");
    if (countEl) countEl.textContent = String(Math.max(0, (parseInt(countEl.textContent, 10) || 1) - 1));
    const list = document.querySelector("#pendingMembersList");
    if (list && !list.querySelector(".pending-member")) list.innerHTML = `<p class="empty-hint">${text("pendingEmpty")}</p>`;
  };
  if (action === "reject") {
    if (!confirm(text("rejectConfirm"))) return;
    button.disabled = true;
    try {
      await callSupabaseFunction("manage-user", { action: "reject", profileId: id });
      recordAudit("user.rejected", "user", id, "");
      dropRow();
      setTimeout(loadPendingMembers, 1200);
    } catch (err) { alert(err?.message || err); button.disabled = false; }
    return;
  }
  if (action === "approve") {
    const roleSel = document.querySelector(`select[data-role-for="${CSS.escape(id)}"]`);
    const role = roleSel?.value || "user";
    button.disabled = true;
    try {
      await callSupabaseFunction("manage-user", { action: "approve", profileId: id, role });
      recordAudit("user.approved", "user", id, role);
      dropRow();
      setTimeout(loadPendingMembers, 1200);
    } catch (err) { alert(err?.message || err); button.disabled = false; }
  }
});

userList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.userAction === "change-password") {
    // Telebe-Hotel: yalnız org admin başqasının şifrəsini dəyişə bilər
    if (!canManageOrgUsers()) return;
    const row = button.closest(".password-form");
    const user = appState.users.find((item) => item.id === button.dataset.id);
    const input = row?.querySelector("input[name='password']");
    const password = input?.value || "";
    if (!user || user.role === "super_admin" || user.id === currentUser?.id || user.companyId !== currentCompanyId() || !password) return;
    // Xəta ARTIQ udulmur: əvvəllər burada səssiz catch var idi və admin
    // "dəyişdi" sanırdı, halbuki auth parolu köhnə qalırdı → giriş alınmırdı.
    try {
      const res = await changeBackendUserPassword(user.id, password);
      if (res?.skipped) {
        alert(text("passwordChangeSkipped"));
      }
    } catch (error) {
      alert(`${text("passwordChangeSkipped")}\n\n${error?.message || error}`);
      return; // blob-u da dəyişmirik ki, UI ilə auth arasında uyğunsuzluq yaranmasın
    }
    user.passwordHash = md5(password);
    input.value = "";
    saveUsers();
    render();
  }
  if (button.dataset.userAction === "request-own-password") {
    const row = button.closest(".password-form");
    const input = row?.querySelector("input[name='password']");
    const password = input?.value || "";
    if (!password || button.dataset.id !== currentUser?.id) return;
    try {
      const result = await requestBackendPasswordChange(password);
      alert(result.skipped ? text("passwordChangeSkipped") : text("passwordChangeSent"));
    } catch (error) {
      alert(text("passwordChangeSkipped"));
    }
  }
  if (button.dataset.userAction === "confirm-own-password") {
    const row = button.closest(".password-form");
    const tokenInput = row?.querySelector("input[name='token']");
    const passwordInput = row?.querySelector("input[name='password']");
    const token = tokenInput?.value || "";
    if (!token || button.dataset.id !== currentUser?.id) return;
    try {
      await confirmBackendPasswordChange(token);
      if (passwordInput?.value) {
        currentUser.passwordHash = md5(passwordInput.value);
        const localUser = appState.users.find((user) => user.id === currentUser.id);
        if (localUser) localUser.passwordHash = currentUser.passwordHash;
      }
      if (tokenInput) tokenInput.value = "";
      if (passwordInput) passwordInput.value = "";
      saveUsers();
      alert(text("passwordChanged"));
      render();
    } catch (error) {
      alert(text("passwordChangeSkipped"));
    }
  }
  if (button.dataset.userAction === "delete-user") {
    if (!isAdmin()) return;
    const delId = button.dataset.id;
    const target = appState.users.find((u) => u.id === delId);
    if (target?.role === "super_admin" || delId === currentUser?.id) return;
    if (!confirm(`“${target?.profile?.fullName || target?.username || delId}” həm siyahıdan, həm də bazadan (login hesabı) silinsin?`)) return;
    // Online rejim: real Supabase auth user + profili də sil (yoxsa email bazada qalır).
    if (teamSupabaseActive()) {
      button.disabled = true;
      try {
        await callSupabaseFunction("manage-user", { action: "reject", profileId: delId });
      } catch (err) {
        // Profil yoxdursa (yalnız local user) 404 → normaldır; başqa xətada dayan.
        if (!/tapılmadı|not found|404/i.test(String(err?.message || err))) {
          alert("Bazadan silinmədi: " + (err?.message || err));
          button.disabled = false;
          return;
        }
      }
    }
    appState.users = appState.users.filter((user) => user.id !== delId);
    // Silinən adam layihələrə/komandalara/tasklara resurs kimi bağlı qalırdı:
    // "Layihəyə bağla" siyahısında və resurs seçimlərində silinmiş test
    // istifadəçiləri görünməyə davam edirdi. İndi bütün istinadlar təmizlənir.
    const delResource = resourceValue("user", delId);
    appState.projects = appState.projects.map((project) => ({
      ...project,
      managerIds: (project.managerIds || []).filter((id) => id !== delId),
      teamMemberIds: (project.teamMemberIds || []).filter((id) => id !== delResource && id !== delId)
    }));
    appState.projectLinks = appState.projectLinks.filter((link) => link.resource !== delResource);
    appState.teams = appState.teams.map((team) => ({
      ...team,
      memberIds: (team.memberIds || []).filter((id) => id !== delResource && id !== delId)
    }));
    appState.tasks = appState.tasks.map((task) => ({
      ...task,
      owner: task.owner === delResource ? "" : task.owner,
      projectResource: task.projectResource === delResource ? "" : task.projectResource
    }));
    appState.users = appState.users.map((user) => user.managerId === delId ? { ...user, managerId: "" } : user);
    saveResources();
    saveTasks();
    saveUsers();
    recordAudit("user.deleted", "user", delId, target?.username || "");
    render();
  }
});

companyRegistryList?.addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("button[data-company-action]");
  if (!button) return;
  const company = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).find((item) => item.id === button.dataset.id);
  if (!company) return;
  const nextStatus = button.dataset.companyAction === "activate" ? "active" : "suspended";
  const statusReason = `${nextStatus === "active" ? text("activateCompany") : text("suspendCompany")} · ${currentUser?.username || "system"}`;
  try {
    const updated = await updateBackendCompany(company.id, { status: nextStatus, statusReason });
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? updated : item);
  } catch (error) {
    const now = new Date().toISOString();
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? {
      ...item,
      status: nextStatus,
      statusChangedAt: now,
      activatedAt: nextStatus === "active" ? now : item.activatedAt,
      suspendedAt: nextStatus === "suspended" ? now : item.suspendedAt,
      statusChangedBy: currentUser?.username || "",
      statusReason
    } : item);
    saveBackendSettings();
  }
  render();
});

platformCompanyGrid?.addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const button = event.target.closest("button[data-company-action]");
  if (!button) return;
  const company = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).find((item) => item.id === button.dataset.id);
  if (!company) return;
  const nextStatus = button.dataset.companyAction === "activate" ? "active" : "suspended";
  const statusReason = `${nextStatus === "active" ? text("activateCompany") : text("suspendCompany")} · ${currentUser?.username || "system"}`;
  try {
    const updated = await updateBackendCompany(company.id, { status: nextStatus, statusReason });
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? updated : item);
  } catch (error) {
    const now = new Date().toISOString();
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? {
      ...item,
      status: nextStatus,
      statusChangedAt: now,
      activatedAt: nextStatus === "active" ? now : item.activatedAt,
      suspendedAt: nextStatus === "suspended" ? now : item.suspendedAt,
      statusChangedBy: currentUser?.username || "",
      statusReason
    } : item);
    saveBackendSettings();
  }
  render();
});

platformApprovalQueue?.addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  if (event.target.closest("#refreshApprovalQueue")) {
    await refreshPlatformApprovalQueue();
    renderPlatformApprovalQueue();
    return;
  }
  const button = event.target.closest("button[data-approval-action]");
  if (!button) return;
  const workspaceId = button.dataset.id;
  const action = button.dataset.approvalAction;
  const item = platformPendingCache.find((w) => w.id === workspaceId);
  if (!workspaceId) return;
  button.disabled = true;
  try {
    if (action === "approve") {
      await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(workspaceId)}`, {
        method: "PATCH",
        body: JSON.stringify({
          approval_status: "active",
          approved_by: currentUser?.id || null,
          approved_at: new Date().toISOString()
        })
      });
      recordAudit("workspace.approved", "company", item?.company_key || workspaceId, item?.name || "");
      // Onboarding bildirişi (best-effort — mail edge-function bunu emal edə bilər).
      try {
        await supabaseRequest("/rest/v1/notifications", {
          method: "POST",
          body: JSON.stringify({
            workspace_id: workspaceId,
            type: "onboarding",
            recipient: item?.ownerEmail || "",
            subject: "Hesabınız aktivdir",
            body: "Qeydiyyatınız təsdiqləndi. Artıq email ilə daxil ola bilərsiniz.",
            status: "queued"
          })
        });
      } catch (mailError) { console.warn("Onboarding bildirişi göndərilmədi:", mailError?.message); }
      // Real email (Resend edge-function; RESEND_API_KEY yoxdursa gracefully skip olunur).
      if (item?.ownerEmail) {
        try {
          await callSupabaseFunction(supabaseConfig().mailFunction, {
            type: "onboarding",
            workspaceId,
            recipients: item.ownerEmail,
            subject: "Hesabınız aktivdir — Project Manager",
            text: `Salam,\n\n"${item.name || "workspace"}" hesabınız super-admin tərəfindən təsdiqləndi. Artıq email ilə daxil ola bilərsiniz.\n\nProject Manager`
          });
        } catch (sendError) { console.warn("Onboarding email göndərilmədi:", sendError?.message); }
      }
      showToast(`${item?.name || "Workspace"} təsdiqləndi`);
    } else if (action === "reject") {
      const raw = prompt("Rədd səbəbi:", "");
      if (raw === null) { button.disabled = false; return; }
      await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(workspaceId)}`, {
        method: "PATCH",
        body: JSON.stringify({ approval_status: "rejected", rejected_reason: raw.trim() })
      });
      recordAudit("workspace.rejected", "company", item?.company_key || workspaceId, raw.trim());
      showToast(`${item?.name || "Workspace"} rədd edildi`);
    }
    await refreshPlatformApprovalQueue();
    renderPlatformApprovalQueue();
    // Şirkət grid-i də yenilənsin ki, təsdiqlənən şirkət "active" görünsün.
    _platformCompaniesLoaded = false;
    refreshPlatformCompanies();
  } catch (error) {
    alert("Əməliyyat alınmadı: " + (error?.message || ""));
    button.disabled = false;
  }
});

platformConsole?.addEventListener("click", async (event) => {
  if (!isSuperAdmin()) return;
  const lifecycleButton = event.target.closest("button[data-lifecycle-action]");
  if (lifecycleButton) {
    const card = lifecycleButton.closest("[data-company-id]");
    const companyId = card?.dataset.companyId;
    const company = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).find((item) => item.id === companyId);
    if (!company) return;
    const payload = {
      plan: card.querySelector('[data-lifecycle-field="plan"]')?.value || company.plan || "standard",
      trialEndsAt: card.querySelector('[data-lifecycle-field="trialEndsAt"]')?.value || "",
      subscriptionEndsAt: card.querySelector('[data-lifecycle-field="subscriptionEndsAt"]')?.value || "",
      statusReason: card.querySelector('[data-lifecycle-field="statusReason"]')?.value || "Lifecycle update"
    };
    if (lifecycleButton.dataset.lifecycleAction === "activate") payload.status = "active";
    if (lifecycleButton.dataset.lifecycleAction === "suspend") payload.status = "suspended";
    // Supabase rejimi: plan/status BAZAYA yazılmalıdır. Əvvəl yalnız köhnə Node
    // backend-inə (updateBackendCompany) gedirdi; o əlçatmaz olduğu üçün catch
    // bloku yalnız lokal blob-u yeniləyirdi və "pro" növbəti girişdə yenidən
    // "standard" görünürdü (workspaces.plan heç vaxt dəyişmirdi).
    if (isSupabasePrimaryMode() && company.workspaceId) {
      const planLimits = { standard: 10, pro: 50, enterprise: 0 };
      const patch = { plan: payload.plan, max_users: planLimits[payload.plan] ?? 10 };
      if (payload.status === "active") patch.status = "active";
      if (payload.status === "suspended") patch.status = "disabled";
      try {
        await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(company.workspaceId)}`, {
          method: "PATCH",
          body: JSON.stringify(patch)
        });
        recordAudit("workspace.plan_changed", "company", company.id, `${company.plan || "standard"} → ${payload.plan}`);
        showToast(`${company.name}: plan “${payload.plan}” yadda saxlanıldı (limit: ${patch.max_users || "limitsiz"})`);
      } catch (error) {
        alert("Plan bazada yenilənmədi: " + (error?.message || error));
        return;
      }
      _platformCompaniesLoaded = false;
      await refreshPlatformCompanies();
      render();
      return;
    }
    try {
      const updated = await updateBackendCompany(company.id, payload);
      companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? updated : item);
    } catch (error) {
      companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? { ...item, ...payload, status: payload.status || item.status } : item);
      appSettings.companyRegistry = companyRegistry;
      saveAppSettings();
    }
    render();
    return;
  }
  const backupButton = event.target.closest("button[data-platform-backup]");
  if (backupButton) {
    const companyId = backupButton.dataset.platformBackup === "all" ? "" : backupButton.dataset.platformBackup;
    const payload = companyBackupPayload(companyId);
    const filename = companyId ? `project-manager-${companyId}-backup-${isoDate(new Date())}.json` : `project-manager-all-tenants-${isoDate(new Date())}.json`;
    appSettings.backups = [{ id: createId("backup"), companyId: companyId || "all", createdAt: new Date().toISOString(), taskCount: payload.tasks.length, projectCount: payload.projects.length }, ...(appSettings.backups || [])].slice(0, 30);
    saveAppSettings();
    await saveBackendSettings();
    downloadText(filename, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
    render();
  }
});

platformConsole?.addEventListener("submit", async (event) => {
  if (!isSuperAdmin()) return;
  const createForm = event.target.closest("#platformCreateCompanyForm");
  const settingsForm = event.target.closest("#platformGlobalSettingsForm");
  if (!createForm && !settingsForm) return;
  event.preventDefault();
  if (createForm) {
    const formData = new FormData(createForm);
    const payload = Object.fromEntries(formData.entries());
    payload.adminUsername = payload.adminUsername || `admin${slugFromName(payload.subdomain || payload.name)}`;
    payload.adminPassword = payload.adminPassword || `${payload.adminUsername}123`;
    try {
      const created = await createBackendCompany(payload);
      if (created) companyRegistry = [...companyRegistry.filter((item) => item.id !== created.id), created].sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      const companyId = companyIdFromName(payload.name);
      appState.users.push(normalizeUser({ id: createId(), username: payload.adminUsername, passwordHash: md5(payload.adminPassword), role: "admin", managerId: "", companyId, profile: { fullName: payload.adminUsername, email: "", position: "Company Admin", company: payload.name } }));
      companyRegistry = [...companyRegistry.filter((item) => item.id !== companyId), { id: companyId, name: payload.name, subdomain: slugFromName(payload.subdomain || payload.name), status: "active", plan: payload.plan || "standard", adminUsername: payload.adminUsername, userCount: 1, projectCount: 0, createdAt: new Date().toISOString(), activatedAt: new Date().toISOString(), statusChangedAt: new Date().toISOString() }];
      saveUsers();
      appSettings.companyRegistry = companyRegistry;
      saveAppSettings();
    }
    createForm.reset();
    await fetchPlatformCompanies();
    render();
  }
  if (settingsForm) {
    const formData = new FormData(settingsForm);
    appSettings = {
      ...appSettings,
      appName: String(formData.get("appName") || "Project Manager").trim(),
      appLogo: String(formData.get("appLogo") || "PM").trim(),
      defaultLanguage: String(formData.get("defaultLanguage") || "az"),
      defaultTheme: String(formData.get("defaultTheme") || "light"),
      emailProvider: String(formData.get("emailProvider") || "").trim(),
      maintenanceMode: Boolean(formData.get("maintenanceMode"))
    };
    saveAppSettings();
    await saveBackendSettings();
    render();
  }
});

platformConsole?.addEventListener("change", async (event) => {
  if (!isSuperAdmin() || event.target.id !== "platformRestoreInput") return;
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    appState.tasks = Array.isArray(payload.tasks) ? payload.tasks.map(normalizeTask) : appState.tasks;
    appState.projects = Array.isArray(payload.projects) ? payload.projects.map(normalizeProject) : appState.projects;
    appState.members = Array.isArray(payload.members) ? payload.members.map(normalizeMember) : appState.members;
    appState.teams = Array.isArray(payload.teams) ? payload.teams.map(normalizeTeam) : appState.teams;
    appState.customers = Array.isArray(payload.customers) ? payload.customers.map(normalizeCustomer) : appState.customers;
    appState.managedFiles = Array.isArray(payload.managedFiles) ? payload.managedFiles : appState.managedFiles;
    appState.projectLinks = Array.isArray(payload.projectLinks) ? payload.projectLinks : appState.projectLinks;
    appState.registers = Array.isArray(payload.registers) ? payload.registers.map(normalizeRegisterItem) : appState.registers;
    appState.users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : appState.users;
    companyRegistry = Array.isArray(payload.companyRegistry) ? payload.companyRegistry : companyRegistry;
    saveTasks(); saveResources(); saveUsers(); saveRegisters();
    appSettings.companyRegistry = companyRegistry;
    saveAppSettings();
    await savePlatformState();
    render();
  } catch {
    alert(text("backupError"));
  } finally {
    event.target.value = "";
  }
});

userList.addEventListener("submit", (event) => {
  if (!isAdmin()) return;
  const profileForm = event.target.closest(".user-profile-form");
  if (!profileForm) return;
  event.preventDefault();
  if (!profileForm.elements.fullName && profileForm.elements.password) {
    const user = appState.users.find((item) => item.id === profileForm.dataset.userId);
    const password = profileForm.elements.password.value;
    if (!user || !password) return;
    user.passwordHash = md5(password);
    delete user.password;
    profileForm.elements.password.value = "";
    saveUsers();
    render();
    return;
  }
  const user = appState.users.find((item) => item.id === profileForm.dataset.userId);
  if (!user) return;
  const nextUsername = profileForm.elements.username.value.trim();
  if (nextUsername && !appState.users.some((item) => item.id !== user.id && item.username === nextUsername)) {
    user.username = nextUsername;
  }
  user.managerId = profileForm.elements.managerId?.value || "";
  if (isOrgAdmin() && user.id !== currentUser?.id && profileForm.elements.role?.value) {
    const nextRole = profileForm.elements.role.value;
    if (nextRole !== user.role) {
      const previousRole = user.role;
      user.role = nextRole;
      syncRoleToDatabase(user.id, nextRole).then((ok) => {
        if (ok) { recordAudit("user.role_changed", "user", user.id, `${previousRole} → ${nextRole}`); return; }
        user.role = previousRole;
        saveUsers();
        render();
      });
    }
  }
  user.profile = {
    ...(user.profile || {}),
    fullName: profileForm.elements.fullName.value.trim(),
    fatherName: profileForm.elements.fatherName.value.trim(),
    email: profileForm.elements.email.value.trim(),
    position: profileForm.elements.position.value.trim(),
    phone: profileForm.elements.phone.value.trim(),
    address: profileForm.elements.address.value.trim(),
    company: profileForm.elements.company.value.trim()
  };
  // Rəhbərlik seçilibsə gündəlik hesabat quşları burada da məcburi açılmalıdır.
  enforceRehberlikReportPrefs();
  saveUsers();
  render();
});

addCustomerButton.addEventListener("click", () => {
  if (!isAdmin()) return;
  const customer = normalizeCustomer({
    companyId: currentCompanyId(),
    name: customerNameInput.value,
    contact: customerContactInput.value,
    email: customerEmailInput.value
  });
  if (!customer.name || appState.customers.some((item) => item.name.toLowerCase() === customer.name.toLowerCase())) return;
  appState.customers.push(customer);
  customerNameInput.value = "";
  customerContactInput.value = "";
  customerEmailInput.value = "";
  saveResources();
  render();
});

customerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-customer-action]");
  if (!button || !isAdmin()) return;
  appState.customers = appState.customers.filter((customer) => customer.id !== button.dataset.id);
  appState.projects = appState.projects.map((project) => project.customerId === button.dataset.id ? { ...project, customerId: "" } : project);
  saveResources();
  render();
});

managedFileInput.addEventListener("change", () => {
  managedFileStatus.textContent = managedFileInput.files?.length
    ? `${managedFileInput.files.length} ${text("filesSelected")}`
    : text("noFilesSelected");
});

addManagedFilesButton.addEventListener("click", async () => {
  if (!isAdmin() || !managedFileInput.files?.length) return;
  try {
    const files = await readSelectedAttachments(managedFileInput);
    appState.managedFiles.push(...files.map((file) => ({
      ...file,
      id: createId(),
      companyId: currentCompanyId(),
      uploadedBy: currentUser?.username || "",
      createdAt: new Date().toISOString()
    })));
    managedFileInput.value = "";
    managedFileStatus.textContent = text("noFilesSelected");
    saveResources();
    render();
  } catch (error) {
    alert(error.message || text("fileTooLarge"));
  }
});

managedFileList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-file-action]");
  if (!button || !isAdmin()) return;
  const file = appState.managedFiles.find((item) => item.id === button.dataset.id);
  if (file?.storageProvider === "supabase") {
    deleteSupabaseObject(file.storagePath).catch((error) => console.warn("Supabase file delete failed", error));
  }
  appState.managedFiles = appState.managedFiles.filter((file) => file.id !== button.dataset.id);
  saveResources();
  render();
});

projectInput.addEventListener("change", renderResourceControls);
// Tarix/status dəyişdikcə plan və fakt saat yenidən hesablanır.
[startDate, endDate, statusInput].forEach((field) => {
  field?.addEventListener("change", syncHourFieldsFromDates);
});
// İstifadəçi plan saatı əl ilə yazarsa, avtomat hesablama onu artıq əzmir.
plannedHoursInput?.addEventListener("input", () => {
  plannedHoursInput.dataset.manual = "1";
  const hint = document.querySelector("#plannedHoursHint");
  if (hint) hint.textContent = `Əl ilə dəyişilib — avtomat: ${autoPlannedHours({ start: startDate.value, end: endDate.value })} saat`;
});

// Layihə resursu = işi GÖRƏN (icraçı). Məsul şəxs = ona NƏZARƏT EDƏN (cavabdeh).
// Əvvəl bura sadəcə eyni dəyəri kopyalayırdı — iki sahə var idi, məlumat isə bir.
// İndi icraçının rəhbəri (user.managerId) məsul şəxs kimi təklif olunur:
// məs. Fuad seçilirsə, məsul şəxsə onun rəhbəri Zaur düşür.
// Rəhbər təyin olunmayıbsa və ya komanda seçilibsə, köhnə davranış qalır.
function supervisorResourceFor(resourceValueString) {
  if (!resourceValueString || !resourceValueString.startsWith("user:")) return resourceValueString;
  const userId = resourceValueString.split(":")[1];
  const user = appState.users.find((item) => item.id === userId);
  if (!user?.managerId) return resourceValueString;
  const manager = appState.users.find((item) => item.id === user.managerId);
  return manager ? resourceValue("user", manager.id) : resourceValueString;
}

projectResourceInput.addEventListener("change", () => {
  if (!projectResourceInput.value) return;
  // Əl ilə seçilmiş məsul şəxsi əzmirik — avtomat yalnız boş/avtomat dəyəri doldurur.
  if (ownerManuallySet && ownerInput.value) return;
  const supervisor = supervisorResourceFor(projectResourceInput.value);
  ensureSelectOption(ownerInput, supervisor, resourceLabel(supervisor));
  ownerInput.value = supervisor;
});

// İstifadəçi məsul şəxsi əl ilə seçəndə bunu qeyd edirik ki, sonrakı resurs
// dəyişikliyi onu əzməsin. Bu dəyişiklik yalnız TASK daxilindədir — user.managerId
// dəyişmir (o, yalnız istifadəçi profilindən idarə olunur).
ownerInput.addEventListener("change", () => { ownerManuallySet = true; });

focusNewProjectButton.addEventListener("click", () => {
  currentView = "projects";
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === "projects"));
  renderViews();
  openProjectComposer();
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManageTasks()) return;

  if (parseDate(projectEndDateInput.value) < parseDate(projectStartDateInput.value)) {
    alert(text("invalidDate"));
    return;
  }

  const progress = Math.min(100, Math.max(0, Number.parseInt(projectProgressInput.value || "0", 10)));
  const governancePayload = projectGovernancePayloadFromForm();
  const payload = {
    name: projectNameInput.value,
    description: projectDescriptionInput?.value || "",
    customerId: projectCustomerInput?.value || "",
    managerId: projectLeaderInput?.value || "",
    teamMemberIds: selectedProjectTeamMemberIds,
    start: projectStartDateInput.value,
    end: projectEndDateInput.value,
    status: projectStatusInput.value,
    priority: projectPriorityInput.value,
    budget: Number(projectBudgetInput?.value) || 0,
    progress,
    lifecycle: governancePayload.lifecycle,
    charter: governancePayload.charter
  };
  const gateError = projectGateError(payload);
  if (gateError) {
    alert(gateError);
    return;
  }
  const isNew = !activeProjectEditId;
  const beforeProject = isNew ? null : appState.projects.find((p) => p.id === activeProjectEditId);
  const beforeSnapshot = beforeProject ? {
    managerIds: [...(beforeProject.managerIds || [])],
    teamMemberIds: [...(beforeProject.teamMemberIds || [])],
    end: beforeProject.end,
    status: beforeProject.status
  } : null;
  const project = isNew
    ? createProject(projectNameInput.value, payload)
    : updateProject(activeProjectEditId, payload);
  if (!project) return;
  if (beforeSnapshot) notifyProjectChange(beforeSnapshot, project);
  const selectedTemplate = isNew ? projectTemplateInput?.value || "" : "";
  closeProjectComposer();
  if (selectedTemplate && canUseBackend() && authToken) {
    fetch(backendUrl(`/api/projects/${encodeURIComponent(project.id)}/apply-template`), {
      method: "POST",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ templateId: selectedTemplate, startDate: project.start })
    }).then((r) => r.ok ? syncFromBackend() : null).catch(() => {});
  }
  openProjectPage(project.name);
});

addProjectTeamMembersButton.addEventListener("click", () => {
  const selected = [...projectTeamMembersInput.selectedOptions].map((option) => option.value);
  selectedProjectTeamMemberIds = [...new Set([...selectedProjectTeamMemberIds, ...selected])];
  [...projectTeamMembersInput.options].forEach((option) => {
    option.selected = false;
  });
  renderSelectedProjectTeamMembers();
});

selectedProjectTeamMembers.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-project-team-remove]");
  if (!button) return;
  selectedProjectTeamMemberIds = selectedProjectTeamMemberIds.filter((id) => id !== button.dataset.projectTeamRemove);
  renderSelectedProjectTeamMembers();
});

closeProjectComposerButton.addEventListener("click", closeProjectComposer);
cancelProjectCreateButton.addEventListener("click", closeProjectComposer);
projectComposerModal.addEventListener("click", (event) => {
  if (event.target.dataset.projectModalClose) closeProjectComposer();
});
[
  projectNameInput,
  projectLifecycleInput,
  projectGoalInput,
  projectScopeInput,
  projectSuccessCriteriaInput,
  projectGateChecklistInput,
  projectClosureNotesInput,
  projectStakeholdersInput,
  projectCommunicationPlanInput,
  projectDecisionLogInput,
  projectChangeControlInput,
  projectRiskOpportunityInput,
  projectQualityChecklistInput,
  projectCompetenceMatrixInput
].forEach((input) => input?.addEventListener("input", updateGovernanceScorePreview));
projectLifecycleInput?.addEventListener("change", updateGovernanceScorePreview);

toggleQuickCustomerBtn?.addEventListener("click", () => {
  quickCustomerForm.hidden = !quickCustomerForm.hidden;
  if (!quickCustomerForm.hidden) quickCustomerNameInput.focus();
});
quickCustomerCancelBtn?.addEventListener("click", () => {
  quickCustomerForm.hidden = true;
  quickCustomerNameInput.value = "";
  quickCustomerContactInput.value = "";
});
quickCustomerSaveBtn?.addEventListener("click", () => {
  const name = quickCustomerNameInput.value.trim();
  if (!name) { quickCustomerNameInput.focus(); return; }
  if (appState.customers.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
    const existing = appState.customers.find((c) => c.name.toLowerCase() === name.toLowerCase());
    projectCustomerInput.value = existing.id;
    quickCustomerForm.hidden = true;
    quickCustomerNameInput.value = "";
    quickCustomerContactInput.value = "";
    return;
  }
  const customer = normalizeCustomer({
    companyId: currentCompanyId(),
    name,
    contact: quickCustomerContactInput.value.trim(),
    email: ""
  });
  appState.customers.push(customer);
  saveResources();
  renderResourceControls();
  projectCustomerInput.value = customer.id;
  quickCustomerForm.hidden = true;
  quickCustomerNameInput.value = "";
  quickCustomerContactInput.value = "";
});

toggleQuickManagerBtn?.addEventListener("click", () => {
  quickManagerForm.hidden = !quickManagerForm.hidden;
  if (!quickManagerForm.hidden) quickManagerFullNameInput.focus();
});
quickManagerCancelBtn?.addEventListener("click", () => {
  quickManagerForm.hidden = true;
  quickManagerFullNameInput.value = "";
  quickManagerUsernameInput.value = "";
  quickManagerPasswordInput.value = "";
});
const QUICK_ROLE_POSITIONS = {
  manager: "Project Manager",
  rehberlik: "Rəhbərlik",
  contributor: "Contributor",
  user: "İcraçı",
  viewer: "İzləyici",
  sponsor: "Sponsor"
};
quickManagerSaveBtn?.addEventListener("click", async () => {
  if (!isAdmin()) { alert("İstifadəçi yaratmaq üçün admin icazəsi tələb olunur."); return; }
  const username = quickManagerUsernameInput.value.trim();
  const email = (quickManagerEmailInput?.value || "").trim().toLowerCase();
  const password = quickManagerPasswordInput.value;
  const fullName = quickManagerFullNameInput.value.trim();
  const role = quickManagerRoleInput?.value || "manager";
  if (!username || !password) { quickManagerUsernameInput.focus(); return; }
  if (appState.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    alert(`"${username}" artıq mövcuddur`);
    return;
  }
  const companyId = currentCompanyId();
  const companyName = appState.customers.find((c) => c.companyId === companyId)?.name || "";
  // Bu sürətli forma əvvəl YALNIZ lokal qeyd yaradırdı (md5 parol, createId):
  // auth hesabı olmadığı üçün belə istifadəçi HEÇ VAXT giriş edə bilmirdi.
  // Online rejimdə admin panelindəki ilə eyni yolla real hesab yaradılır.
  let newId = createId();
  if (teamSupabaseActive()) {
    if (!email) { alert("Online rejimdə email tələb olunur — istifadəçi bu email ilə giriş edəcək."); quickManagerEmailInput?.focus(); return; }
    if (password.length < 6) { alert("Parol ən azı 6 simvol olmalıdır."); return; }
    quickManagerSaveBtn.disabled = true;
    try {
      const res = await callSupabaseFunction("manage-user", {
        action: "create", email, password, username, fullName: fullName || username,
        role, appRole: role, position: QUICK_ROLE_POSITIONS[role] || ""
      });
      newId = res?.userId || newId;
    } catch (err) {
      alert("İstifadəçi yaradılmadı: " + (err?.message || err));
      return;
    } finally {
      quickManagerSaveBtn.disabled = false;
    }
  } else if (isSupabasePrimaryMode()) {
    alert("İstifadəçi yaradıla bilmədi: online sessiya yoxdur və ya admin hüququnuz yoxdur.\nLokal qeyd yaratmaq həmin şəxsin giriş edə bilməməsi deməkdir — ona görə dayandırıldı.");
    return;
  }
  const newUser = normalizeUser({
    id: newId,
    username,
    passwordHash: teamSupabaseActive() ? "" : md5(password),
    role,
    managerId: role === "user" ? (currentUser?.role === "manager" ? currentUser.id : "") : "",
    companyId,
    profile: { fullName: fullName || username, position: QUICK_ROLE_POSITIONS[role] || "", company: companyName, email, fatherName: "", phone: "", address: "" }
  });
  appState.users.push(newUser);
  saveUsers();
  recordAudit("user.created", "user", newUser.id, `${username} (${role})`);
  saveResources();
  renderResourceControls();
  // Manager → layihə rəhbəri seç; digər rollar → komanda seçiminə əlavə et
  if (role === "manager") {
    projectLeaderInput.value = newUser.id;
  } else {
    const val = resourceValue("user", newUser.id);
    if (!selectedProjectTeamMemberIds.includes(val)) selectedProjectTeamMemberIds.push(val);
    renderSelectedProjectTeamMembers();
  }
  quickManagerForm.hidden = true;
  quickManagerFullNameInput.value = "";
  quickManagerUsernameInput.value = "";
  quickManagerPasswordInput.value = "";
  if (quickManagerEmailInput) quickManagerEmailInput.value = "";
  if (quickManagerRoleInput) quickManagerRoleInput.value = "manager";
  if (typeof showToast === "function" && teamSupabaseActive()) {
    showToast(`${username} yaradıldı — ${email} + parol ilə girə bilər.`);
  }
});

// ── #20 Layihə formasında sürətli komanda yaratma (sifarişçidəki kimi) ──
toggleQuickTeamBtn?.addEventListener("click", () => {
  quickTeamForm.hidden = !quickTeamForm.hidden;
  if (!quickTeamForm.hidden) {
    if (typeof teamMemberOptions === "function") quickTeamMembersInput.innerHTML = teamMemberOptions();
    quickTeamNameInput.focus();
  }
});
quickTeamCancelBtn?.addEventListener("click", () => {
  quickTeamForm.hidden = true;
  quickTeamNameInput.value = "";
});
quickTeamSaveBtn?.addEventListener("click", () => {
  const name = quickTeamNameInput.value.trim();
  if (!name) { quickTeamNameInput.focus(); return; }
  const companyId = currentCompanyId();
  if (appState.teams.some((t) => t.name.toLowerCase() === name.toLowerCase() && (!t.companyId || t.companyId === companyId))) {
    alert(`"${name}" komandası artıq mövcuddur`);
    return;
  }
  // seçilmiş üzvlər: quickTeamMembers dəyərləri "user:<id>" formatındadır
  const memberValues = [...quickTeamMembersInput.selectedOptions].map((o) => o.value);
  // Üzvlər "user:<id>" formatında saxlanılmalıdır — bütün digər yerlər (komanda
  // paneli, resurs uyğunlaşdırma, task sayğacı) bu formatı gözləyir. Burada
  // ":"-dən sonrakı hissə çıxarılıb xam id yazılırdı, ona görə bu formadan
  // yaradılan komanda "0 task" göstərirdi və üzvləri tanınmırdı.
  const team = { id: createId(), companyId, name, memberIds: memberValues };
  appState.teams.push(team);
  recordAudit("team.created", "team", team.id, name);
  saveResources();
  renderResourceControls();
  // komanda üzvlərini layihə seçiminə əlavə et
  memberValues.forEach((val) => {
    if (!selectedProjectTeamMemberIds.includes(val)) selectedProjectTeamMemberIds.push(val);
  });
  renderSelectedProjectTeamMembers();
  quickTeamForm.hidden = true;
  quickTeamNameInput.value = "";
});

closeTaskDetailButton?.addEventListener("click", closeTaskDetail);
taskDetailModal?.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("button[data-action='delete-comment']");
  if (deleteButton) {
    if (deleteTaskComment(deleteButton.dataset.taskId, deleteButton.dataset.commentId)) {
      openTaskDetail(deleteButton.dataset.taskId);
      render();
    }
    return;
  }
  if (event.target.closest("[data-task-detail-close]")) closeTaskDetail();
});
taskDetailModal?.addEventListener("submit", submitTaskComment);
taskDetailModal?.addEventListener("change", (event) => {
  const input = event.target.closest(".comment-attachment-input");
  if (!input) return;
  const formNode = input.closest(".comment-form");
  const status = formNode?.querySelector(".file-picker-status");
  if (!status) return;
  status.textContent = input.files?.length
    ? `${input.files.length} ${text("filesSelected")}`
    : text("noFilesSelected");
});

projectCards.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const projectName = button.dataset.project;
  if (!projectName) return;
  // İcazə gate-ləri: əvvəl bu əməliyyatların HEÇ BİRİNDƏ yoxlama yox idi —
  // adi istifadəçi layihəni redaktə (status daxil), arxiv və hətta SİLƏ bilirdi.
  if (button.dataset.projectAction === "add-task") {
    if (!canManageTasks()) return;
    openTaskComposerForProject(projectName);
    return;
  }
  if (button.dataset.projectAction === "edit") {
    if (!canManageProjects()) return;
    openProjectEditor(projectName);
    return;
  }
  if (button.dataset.projectAction === "archive") {
    if (!canManageProjects()) return;
    const project = appState.projects.find((item) => item.name === projectName);
    if (project) {
      project.archived = true;
      saveResources();
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "approve-gate") {
    const project = appState.projects.find((item) => item.name === projectName);
    if (project && canApproveGovernance()) {
      const gate = button.dataset.gate;
      const missing = gateRequirementMissing(project, gate);
      if (missing.length) {
        alert(`${text("gateRequirementError")}\n${missing.join("\n")}`);
        return;
      }
      project.charter = project.charter || {};
      project.charter.gateApprovals = project.charter.gateApprovals || {};
      project.charter.gateApprovals[gate] = {
        approvedBy: currentUser.username,
        approvedRole: currentUser.role,
        approvedAt: new Date().toISOString()
      };
      saveResources();
      recordAudit("gate.approved", "project", project.id, `${project.name}: ${gate}`);
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "restore-archive") {
    if (!canManageProjects()) return;
    const project = appState.projects.find((item) => item.name === projectName);
    if (project) {
      project.archived = false;
      saveResources();
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "delete") {
    if (!canManageOrgUsers()) return; // silmə yalnız admin
    const project = appState.projects.find((item) => item.name === projectName);
    if (project) {
      appState.trash.push({ id: createId(), companyId: currentCompanyId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
      appState.projects = appState.projects.filter((item) => item.id !== project.id);
      appState.tasks = appState.tasks.map((task) => task.project === projectName ? { ...task, project: "" } : task);
      appState.projectLinks = appState.projectLinks.filter((link) => link.project !== projectName);
      appState.registers = appState.registers.filter((item) => item.project !== projectName);
      saveTrash();
      saveTasks();
      saveResources();
      saveRegisters();
      render();
    }
    return;
  }
  openProjectPage(projectName);
});

archivedProjectCards.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const projectName = button.dataset.project;
  const project = appState.projects.find((item) => item.name === projectName);
  if (!project) return;
  if (button.dataset.projectAction === "restore-archive") {
    if (!canManageProjects()) return;
    project.archived = false;
    saveResources();
    render();
    return;
  }
  if (button.dataset.projectAction === "delete") {
    if (!canManageOrgUsers()) return; // silmə yalnız admin
    appState.trash.push({ id: createId(), companyId: currentCompanyId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
    appState.projects = appState.projects.filter((item) => item.id !== project.id);
    appState.projectLinks = appState.projectLinks.filter((link) => link.project !== projectName);
    appState.registers = appState.registers.filter((item) => item.project !== projectName);
    saveTrash();
    saveResources();
    saveRegisters();
    render();
  }
});

addTeamButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const name = teamNameInput.value.trim();
  const memberIds = [...teamMembersInput.selectedOptions].map((option) => option.value);
  if (!name) return;
  appState.teams.push({ id: createId(), companyId: currentCompanyId(), name, memberIds });
  teamNameInput.value = "";
  saveResources();
  render();
});

addProjectLinkButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const project = linkProjectInput.value.trim();
  const resource = linkResourceInput.value;
  if (!project || !resource) return;
  if (!appState.projectLinks.some((link) => link.project === project && link.resource === resource)) {
    appState.projectLinks.push({ id: createId(), companyId: currentCompanyId(), project, resource });
  }
  linkProjectInput.value = "";
  saveResources();
  render();
});

addRegisterItemButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const item = normalizeRegisterItem({
    companyId: currentCompanyId(),
    project: registerProjectInput.value,
    type: registerTypeInput.value,
    title: registerTitleInput.value.trim(),
    owner: registerOwnerInput.value,
    status: registerStatusInput.value,
    impact: registerImpactInput.value,
    dueDate: registerDueDateInput.value,
    mitigation: registerMitigationInput.value.trim()
  });
  if (!item.project || !item.title) return;
  appState.registers.push(item);
  registerTitleInput.value = "";
  registerMitigationInput.value = "";
  registerDueDateInput.value = "";
  registerStatusInput.value = "Open";
  registerImpactInput.value = "Medium";
  saveRegisters();
  render();
});

registerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-register-action]");
  if (!button) return;
  const id = button.dataset.id;
  const item = appState.registers.find((r) => r.id === id);
  if (!item) return;

  if (button.dataset.registerAction === "delete") {
    if (!canManageRegister(item)) return;
    appState.registers = appState.registers.filter((r) => r.id !== id);
    saveRegisters();
    render();
  }

  if (button.dataset.registerAction === "status") {
    if (!canChangeRegisterStatus(item)) return;
    item.status = button.dataset.next || "Open";
    saveRegisters();
    render();
  }
});

registerList.addEventListener("change", (event) => {
  const el = event.target.closest("[data-register-field]");
  if (!el) return;
  const id = el.dataset.id;
  const field = el.dataset.registerField;
  const item = appState.registers.find((r) => r.id === id);
  if (!item || !canManageRegister(item)) return;
  item[field] = el.value;
  saveRegisters();
});

registerList.addEventListener("input", (event) => {
  const el = event.target.closest("input[data-register-field='mitigation']");
  if (!el) return;
  const id = el.dataset.id;
  const item = appState.registers.find((r) => r.id === id);
  if (!item || !canManageRegister(item)) return;
  item.mitigation = el.value;
  saveRegisters();
});

[projectList, teamList, projectLinksList].forEach((container) => {
  container.addEventListener("click", (event) => {
    if (!canManageTasks()) return;
    const button = event.target.closest("button");
    if (!button) return;
    const action = button.dataset.resourceAction;
    const id = button.dataset.id;

    if (action === "open-project-managers") {
      openManagerAssign(id);
      return;
    }

    if (action === "delete-team") {
      appState.teams = appState.teams.filter((team) => team.id !== id);
      appState.tasks = appState.tasks.map((task) => task.owner === resourceValue("team", id) ? { ...task, owner: "" } : task);
      appState.projectLinks = appState.projectLinks.filter((link) => link.resource !== resourceValue("team", id));
      saveTasks();
    }

    if (action === "save-team") {
      const team = appState.teams.find((item) => item.id === id);
      const nameInput = container.querySelector(`.team-edit-name[data-team-id="${id}"]`);
      const membersInput = container.querySelector(`.team-edit-members[data-team-id="${id}"]`);
      if (team && nameInput && membersInput) {
        team.name = nameInput.value.trim() || team.name;
        team.memberIds = [...membersInput.selectedOptions].map((option) => option.value);
      }
    }

    if (action === "delete-link") {
      const link = appState.projectLinks.find((item) => item.id === id);
      if (link) {
        appState.trash.push({ id: createId(), companyId: currentCompanyId(), type: "project", data: { ...link }, deletedAt: new Date().toISOString() });
      }
      appState.projectLinks = appState.projectLinks.filter((link) => link.id !== id);
    }

    saveResources();
    saveTrash();
    render();
  });
});

trashList.addEventListener("click", (event) => {
  if (!canManageTasks()) return;
  const button = event.target.closest("button");
  if (!button) return;
  const item = appState.trash.find((trashItem) => trashItem.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.trashAction === "restore") {
    if (item.type === "task" && !appState.tasks.some((task) => task.id === item.data.id)) {
      appState.tasks.push(item.data);
      saveTasks();
    }
    if (item.type === "project" && !appState.projectLinks.some((link) => link.id === item.data.id)) {
      appState.projectLinks.push(item.data);
      saveResources();
    }
    if (item.type === "projectRecord" && !appState.projects.some((project) => project.id === item.data.id)) {
      appState.projects.push(normalizeProject(item.data));
      saveResources();
    }
  }

  appState.trash = appState.trash.filter((trashItem) => trashItem.id !== item.id);
  saveTrash();
  render();
});

loadClinicPortfolioButton?.addEventListener("click", () => {
  if (!isAdmin()) return;
  loadClinicPortfolioState();
  projectFilter.value = clinicPortfolioProject.name;
  resetForm();
  render();
});

resetDemo.addEventListener("click", () => {
  if (!isAdmin()) return;
  resetSelectedProjectState();
  resetForm();
  render();
});

clearDone.addEventListener("click", () => {
  if (!isAdmin()) return;
  const doneTasks = appState.tasks.filter((task) => task.status === "Bitib");
  doneTasks.forEach((task) => {
    appState.trash.push({ id: createId(), companyId: currentCompanyId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
  });
  appState.tasks = appState.tasks.filter((task) => task.status !== "Bitib");
  saveTrash();
  saveTasks();
  render();
});

async function bootApp() {
  try {
    if (window.location?.hash?.includes("access_token=")) {
      await handleSupabaseAuthRedirect();
    } else if (isSupabasePrimaryMode() && loadSupabaseSession()?.access_token) {
      // Always attempt session restore; resumeSupabaseSession handles token refresh internally
      await resumeSupabaseSession().catch((error) => console.warn("Supabase resume failed", error));
    }
  } finally {
    render();
    // Auth həll olundu → splash-ı gizlət (welcome flash-ının qarşısı alınır)
    document.documentElement.classList.remove("auth-restoring");
  }
  syncBackendState();
  syncBackendSettings();
  // Auto-snapshot once per session after data is loaded
  setTimeout(saveAutoSnapshot, 3000);
}

bootApp();

// ════════════════════════════════════════════════════════════════════
// #4 — Bulk operations
// ════════════════════════════════════════════════════════════════════

function updateBulkBar() {
  const bar = document.querySelector("#bulkBar");
  const countEl = document.querySelector("#bulkCount");
  if (!bar) return;
  const n = selectedTaskIds.size;
  bar.style.display = n > 0 ? "flex" : "none";
  if (countEl) countEl.textContent = `${n} seçildi`;
}

document.querySelector("#taskList")?.addEventListener("change", (e) => {
  const cb = e.target.closest(".task-select-cb");
  if (!cb) return;
  const id = cb.dataset.taskId;
  if (cb.checked) selectedTaskIds.add(id); else selectedTaskIds.delete(id);
  updateBulkBar();
});

document.querySelector("#bulkClear")?.addEventListener("click", () => {
  selectedTaskIds.clear();
  document.querySelectorAll(".task-select-cb").forEach(cb => cb.checked = false);
  updateBulkBar();
});

document.querySelector("#bulkDelete")?.addEventListener("click", () => {
  if (!selectedTaskIds.size) return;
  if (!confirm(`${selectedTaskIds.size} task silinsin?`)) return;
  appState.tasks = appState.tasks.filter(t => !selectedTaskIds.has(t.id));
  selectedTaskIds.clear();
  saveState(); render(); updateBulkBar();
});

document.querySelector("#bulkStatus")?.addEventListener("click", () => {
  if (!selectedTaskIds.size) return;
  const opts = statuses.map(s => s.name);
  const chosen = prompt(`Yeni status seçin:\n${opts.map((s,i)=>`${i+1}. ${s}`).join("\n")}`);
  const idx = parseInt(chosen) - 1;
  if (isNaN(idx) || !opts[idx]) return;
  appState.tasks.forEach(t => { if (selectedTaskIds.has(t.id)) t.status = opts[idx]; });
  selectedTaskIds.clear(); saveState(); render(); updateBulkBar();
});

document.querySelector("#bulkOwner")?.addEventListener("click", () => {
  if (!selectedTaskIds.size) return;
  const opts = appState.members.map(m => m.name || m.username || m.id);
  const ids  = appState.members.map(m => m.id);
  const chosen = prompt(`Sahib seçin:\n${opts.map((n,i)=>`${i+1}. ${n}`).join("\n")}`);
  const idx = parseInt(chosen) - 1;
  if (isNaN(idx) || !ids[idx]) return;
  appState.tasks.forEach(t => { if (selectedTaskIds.has(t.id)) t.owner = ids[idx]; });
  selectedTaskIds.clear(); saveState(); render(); updateBulkBar();
});

// ════════════════════════════════════════════════════════════════════
// #5 — Keyboard shortcuts
// ════════════════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  const active = document.activeElement;
  const typing = active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT" || active.isContentEditable);
  if (typing) return;

  const key = e.key;

  // View switching: 1–7
  const viewMap = { "1":"dashboard","2":"projects","3":"list","4":"kanban","5":"calendar","6":"gantt","7":"reports" };
  if (viewMap[key] && !e.ctrlKey && !e.metaKey) { e.preventDefault(); setView(viewMap[key]); return; }

  switch (key) {
    case "n": case "N":
      e.preventDefault();
      document.querySelector("#openTaskComposer")?.click();
      break;
    case "Escape":
      document.querySelector(".modal-shell.active")?.querySelector(".modal-close")?.click();
      document.querySelector("#bulkClear")?.click();
      break;
    case "/":
      e.preventDefault();
      document.querySelector("#searchInput")?.focus();
      break;
    case "?":
      showKeyboardHelp();
      break;
    case "d": case "D":
      if (!e.ctrlKey) { e.preventDefault(); setView("dashboard"); }
      break;
  }
});

let _kbHelpVisible = false;
function showKeyboardHelp() {
  if (_kbHelpVisible) { document.querySelector("#kbHelp")?.remove(); _kbHelpVisible = false; return; }
  _kbHelpVisible = true;
  const el = document.createElement("div");
  el.id = "kbHelp";
  el.className = "kb-help-overlay";
  el.innerHTML = `
    <div class="kb-help-box">
      <h3>⌨️ Qısa yollar</h3>
      <div class="kb-grid">
        <kbd>1</kbd><span>Dashboard</span>
        <kbd>2</kbd><span>Layihələr</span>
        <kbd>3</kbd><span>Tasklar</span>
        <kbd>4</kbd><span>Kanban</span>
        <kbd>5</kbd><span>Təqvim</span>
        <kbd>6</kbd><span>Gantt</span>
        <kbd>7</kbd><span>Hesabat</span>
        <kbd>N</kbd><span>Yeni task</span>
        <kbd>/</kbd><span>Axtarış</span>
        <kbd>Esc</kbd><span>Bağla / Ləğv</span>
        <kbd>?</kbd><span>Bu panel</span>
      </div>
      <button class="primary" style="margin-top:14px;width:100%" id="kbClose">Bağla</button>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener("click", (ev) => { if (ev.target === el || ev.target.id === "kbClose") { el.remove(); _kbHelpVisible = false; } });
}

// ════════════════════════════════════════════════════════════════════
// #2 — Snapshot restore UI
// ════════════════════════════════════════════════════════════════════
// Bərpa paneli. Əsas mənbə SERVER arxividir (app_state_history — hər yazılışda
// bir versiya, workspace başına son 200). Lokal localStorage nüsxələri (cəmi 5,
// yalnız bu brauzerdə) yalnız offline / server oxunmayan halda göstərilir.
const snapshotEmptyMarkup = '<em style="color:var(--muted);font-size:.83rem">Snapshot yoxdur</em>';
let snapshotRows = [];

async function fetchServerSnapshots() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return null;
  try {
    const rows = await supabaseRequest(
      `/rest/v1/app_state_history?workspace_id=eq.${encodeURIComponent(supabaseWorkspaceId)}` +
      `&select=id,archived_at,task_count,project_count,user_count&order=id.desc&limit=200`
    );
    return Array.isArray(rows) ? rows : null;
  } catch (error) {
    console.warn("Server arxivi oxunmadı:", error?.message || error);
    return null;
  }
}

async function restoreServerSnapshot(id) {
  const rows = await supabaseRequest(
    `/rest/v1/app_state_history?id=eq.${encodeURIComponent(id)}&select=state_json&limit=1`
  );
  const state = Array.isArray(rows) ? rows[0]?.state_json : null;
  if (!state) throw new Error("Versiya oxunmadı");
  importBackup(state);
  await flushSupabaseSave();
  render();
}

async function renderSnapshotList() {
  const container = document.querySelector("#snapshotList");
  if (!container) return;
  container.innerHTML = '<em style="color:var(--muted);font-size:.83rem">Yüklənir…</em>';
  const server = await fetchServerSnapshots();
  const local = listAutoSnapshots();
  const isServer = Array.isArray(server) && server.length > 0;
  snapshotRows = isServer
    ? server.map((row) => ({
        source: "server", id: row.id, at: row.archived_at,
        tasks: row.task_count || 0, projects: row.project_count || 0, users: row.user_count || 0
      }))
    : local.map((snap, index) => ({
        source: "local", id: index, at: snap.savedAt,
        tasks: snap.payload?.tasks?.length || 0,
        projects: snap.payload?.projects?.length || 0,
        users: snap.payload?.users?.length || 0
      }));
  if (!snapshotRows.length) { container.innerHTML = snapshotEmptyMarkup; return; }
  const enKohne = snapshotRows.length ? new Date(snapshotRows[snapshotRows.length - 1].at) : null;
  const gunFerqi = enKohne ? Math.max(1, Math.round((Date.now() - enKohne.getTime()) / 86400000)) : 0;
  const badge = isServer
    ? `<p class="field-hint" style="margin:0 0 8px">Server arxivi · ${snapshotRows.length} versiya · son ${gunFerqi} gün</p>`
    : `<p class="field-hint" style="margin:0 0 8px">Yalnız bu brauzerin lokal nüsxələri (${snapshotRows.length})</p>`;
  container.innerHTML = badge + snapshotRows.map((row, index) => `
    <div class="snapshot-item">
      <span class="snapshot-date">${new Date(row.at).toLocaleString("az-AZ")}</span>
      <span class="snapshot-meta">${row.tasks} task · ${row.projects} layihə · ${row.users} user</span>
      <button class="snapshot-restore-btn" data-snap="${index}" type="button">Bərpa et</button>
    </div>`).join("");
}

document.querySelector("#snapshotList")?.addEventListener("click", async (event) => {
  const btn = event.target.closest(".snapshot-restore-btn");
  if (!btn) return;
  const row = snapshotRows[Number(btn.dataset.snap)];
  if (!row) return;
  if (!confirm(
    `Bu versiya bərpa edilsin?\n\n${new Date(row.at).toLocaleString("az-AZ")}\n` +
    `${row.tasks} task · ${row.projects} layihə · ${row.users} user\n\n` +
    "Cari vəziyyət bununla əvəz olunacaq (cari vəziyyət də arxivdə qalır)."
  )) return;
  btn.disabled = true;
  try {
    if (row.source === "server") {
      await restoreServerSnapshot(row.id);
    } else {
      const snap = listAutoSnapshots()[row.id];
      if (!snap?.payload) throw new Error("Lokal nüsxə tapılmadı");
      importBackup(snap.payload);
      await flushSupabaseSave();
      render();
    }
    showToast("✅ Bərpa edildi");
    renderSnapshotList();
  } catch (error) {
    alert("Bərpa alınmadı: " + (error?.message || error));
  } finally {
    btn.disabled = false;
  }
});

// Re-render snapshot list whenever settings view opens
const _origSetView = setView;
// Patch setView to refresh snapshot list when settings is opened
const _patchedSetView = function(view) {
  _origSetView(view);
  if (view === "settings") setTimeout(renderSnapshotList, 50);
};
// Override global
window.setView = _patchedSetView;

// ════════════════════════════════════════════════════════════════════
// #6 — Task templates
// ════════════════════════════════════════════════════════════════════
function getTaskTemplates() {
  return appSettings.taskTemplates || [];
}

function renderTemplateSelector() {
  const sel = document.querySelector("#templateSelect");
  const row = document.querySelector("#templateSelectorRow");
  if (!sel || !row) return;
  const tpls = getTaskTemplates();
  if (!tpls.length) { row.style.display = "none"; return; }
  row.style.display = "";
  sel.innerHTML = '<option value="">— şablon seç —</option>' +
    tpls.map((t, i) => `<option value="${i}">${escapeHtml(t.name)}</option>`).join("");
}

document.querySelector("#templateSelect")?.addEventListener("change", (e) => {
  const idx = parseInt(e.target.value);
  if (isNaN(idx)) return;
  const tpl = getTaskTemplates()[idx];
  if (!tpl) return;
  const f = (id) => document.querySelector(`#${id}`);
  if (tpl.name)         f("taskName").value         = tpl.name;
  if (tpl.status)       f("statusInput").value       = tpl.status;
  if (tpl.priority)     f("priorityInput").value     = tpl.priority;
  if (tpl.plannedHours) f("plannedHours").value      = tpl.plannedHours;
  if (tpl.notes)        f("taskNotes").value         = tpl.notes;
  e.target.value = ""; // reset selector
  showToast("📋 Şablon tətbiq edildi");
});

// Expose template add from admin settings (called from settings save handler)
function addTaskTemplate(tpl) {
  if (!tpl?.name) return;
  appSettings.taskTemplates = [...(appSettings.taskTemplates || []), tpl];
  saveAppSettings();
  renderTemplateSelector();
}

// ════════════════════════════════════════════════════════════════════
// #7 — PDF & Excel export
// ════════════════════════════════════════════════════════════════════
function exportToExcel() {
  if (typeof XLSX === "undefined") { showToast("⏳ Excel kitabxanası yüklənir…"); return; }
  const shown = visibleTasks();
  const rows = shown.map(t => ({
    "Ad":          t.name,
    "Status":      statusLabel(t.status),
    "Prioritet":   priorityLabel(t.priority),
    "Sahib":       resourceLabel(t.owner),
    "Layihə":      t.project || "",
    "Başlanğıc":   shortDate(t.start),
    "Bitmə":       shortDate(t.end),
    "İrəliləyiş":  `${t.progress || 0}%`,
    "Plan saat":   plannedHoursForTask(t),
    "Fakt saat":   actualHoursForTask(t),
    "Qeydlər":     t.notes || ""
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Tasklar");
  XLSX.writeFile(wb, `pm-tasklar-${new Date().toISOString().slice(0,10)}.xlsx`);
}

function exportToPDF() {
  if (typeof window.jspdf === "undefined" && typeof jsPDF === "undefined") {
    showToast("⏳ PDF kitabxanası yüklənir…"); return;
  }
  const { jsPDF: PDF } = window.jspdf || { jsPDF };
  const doc = new PDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const shown = visibleTasks();
  doc.setFont("helvetica");
  doc.setFontSize(14);
  doc.text("Project Manager — Task Hesabatı", 14, 14);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleString(), 14, 20);

  const cols = ["Ad","Status","Prioritet","Sahib","Layihə","Başlanğıc","Bitmə","Irəliləyiş"];
  const rows = shown.map(t => [
    (t.name || "").slice(0,40),
    statusLabel(t.status), priorityLabel(t.priority),
    resourceLabel(t.owner), (t.project||"").slice(0,20),
    shortDate(t.start), shortDate(t.end), `${t.progress||0}%`
  ]);

  let y = 28, rowH = 7;
  const colW = [60,22,20,28,28,20,20,18];
  // Header
  doc.setFillColor(79,70,229); doc.setTextColor(255,255,255);
  let x = 14;
  cols.forEach((c,i) => { doc.rect(x,y,colW[i],rowH,"F"); doc.text(c, x+2, y+5); x+=colW[i]; });
  y += rowH;
  doc.setTextColor(20,20,20);
  rows.forEach((row, ri) => {
    if (y > 185) { doc.addPage(); y = 14; }
    doc.setFillColor(ri%2===0?245:255,ri%2===0?246:255,ri%2===0?255:255);
    x = 14;
    row.forEach((cell,i) => {
      doc.rect(x,y,colW[i],rowH,"F");
      doc.text(String(cell).slice(0,30), x+2, y+5);
      x+=colW[i];
    });
    y += rowH;
  });
  doc.save(`pm-hesabat-${new Date().toISOString().slice(0,10)}.pdf`);
}

// Load export libraries lazily on first use
function lazyLoadExportLibs(cb) {
  const loaded = () => typeof XLSX !== "undefined" && (typeof window.jspdf !== "undefined" || typeof jsPDF !== "undefined");
  if (loaded()) { cb(); return; }
  const xlsxSrc = "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
  const pdfSrc  = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  let pending = 2;
  const done = () => { if (--pending === 0) cb(); };
  [xlsxSrc, pdfSrc].forEach(src => {
    const s = document.createElement("script");
    s.src = src; s.onload = done; s.onerror = done;
    document.head.appendChild(s);
  });
}

// Wire export buttons (added dynamically to reports header)
function injectExportButtons() {
  const reports = document.querySelector("#reportsView .section-head, #reportsView h2, #reportsView");
  if (!reports || document.querySelector("#exportExcelBtn")) return;
  const wrap = document.createElement("div");
  wrap.className = "export-btn-row";
  wrap.innerHTML = `
    <button type="button" id="exportExcelBtn" class="export-btn">Excel</button>
    <button type="button" id="exportPdfBtn"   class="export-btn">PDF</button>`;
  reports.prepend(wrap);
  document.querySelector("#exportExcelBtn").addEventListener("click", () => lazyLoadExportLibs(exportToExcel));
  document.querySelector("#exportPdfBtn").addEventListener("click",   () => lazyLoadExportLibs(exportToPDF));
}

// ════════════════════════════════════════════════════════════════════
// #9 — Service Worker registration
// ════════════════════════════════════════════════════════════════════
if ("serviceWorker" in navigator) {
  // Qeyd: controllerchange-də AVTOMATİK reload ETMİRİK — o, yeni SW aktivləşəndə
  // gözlənilməz səhifə yüklənməsinə (login/welcome 1s flash) səbəb olurdu.
  // Network-first HTML strategiyası onsuz da hər normal yükləmədə təzə versiyanı
  // gətirir, ona görə əlavə reload lazım deyil.
  navigator.serviceWorker.register("./sw.js", { scope: "./" })
    .then((r) => { console.log("SW registered:", r.scope); r.update?.(); })
    .catch(e => console.warn("SW registration failed:", e));
}

// ════════════════════════════════════════════════════════════════════
// Boot hooks: render template selector + export buttons on view change
// ════════════════════════════════════════════════════════════════════
(function patchRender() {
  // Patch render() to inject export buttons after reports render
  const _r = render;
  window.render = function() {
    _r();
    if (currentView === "reports") injectExportButtons();
    if (currentView === "list" || currentView === "settings") {
      if (currentView === "list") renderTemplateSelector();
      if (currentView === "settings") renderSnapshotList();
    }
  };
})();

// Welcome ekranının canvas fon animasiyası (modules/hero-signal-field.js).
if (typeof initHeroSignalField === "function") initHeroSignalField();
