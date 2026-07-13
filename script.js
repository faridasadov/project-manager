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
const backupVersion = 1;
const defaultWorkflowStatuses = ["Plan", "Davam edir", "Bitib"];
const protectedWorkflowStatuses = new Set(defaultWorkflowStatuses);

const translations = {
  az: {
    locale: "az-AZ",
    appKicker: "Layihə mühiti",
    appTitle: "Plan, task və icra paneli",
    clearDone: "Bitənləri təmizlə",
    resetDemo: "Seçilmiş layihəni resetlə",
    loadClinicPortfolio: "Layihəyə yüklə",
    adminPanel: "Admin panel",
    close: "Bağla",
    settings: "Settings",
    new: "Yeni",
    appearanceSettings: "Görünüş",
    workflowSettings: "Workflow",
    mailSettings: "Mail",
    ldapSettings: "LDAP",
    customer: "Sifarişçi",
    customers: "Sifarişçilər",
    customerName: "Sifarişçi adı",
    customerNamePlaceholder: "Şirkət adı",
    contactPerson: "Əlaqədar şəxs",
    addCustomer: "Sifarişçi əlavə et",
    fileManager: "File manager",
    filters: "Filterlər",
    filtersScope: "Task, Kanban, Gantt və Hesabat üçün tətbiq olunur",
    smartFilters: "Ağıllı",
    overdueTasks: "Gecikən",
    riskFocus: "Risk",
    myTasks: "Mənim",
    portfolioHealth: "Sağlamlıq",
    portfolioHealthTitle: "Portfolio vəziyyəti",
    nextActions: "Addımlar",
    nextActionsTitle: "Növbəti işlər",
    healthScore: "Sağlamlıq balı",
    completionRate: "Tamamlanma",
    riskLoad: "Risk yükü",
    openIssueLoad: "Açıq issue",
    noActionNeeded: "Təcili addım yoxdur.",
    actionBlocked: "Asılılığı aç",
    actionOverdue: "Gecikməni bağla",
    actionDueSoon: "Deadline yaxınlaşır",
    actionHighRisk: "Yüksək riski izlə",
    addFiles: "Fayl əlavə et",
    download: "Yüklə",
    testLdap: "LDAP test et",
    ldapTestOk: "LDAP testi uğurludur.",
    ldapTestFailed: "LDAP testi alınmadı. Ayarları yoxlayın.",
    themeMode: "Görünüş modu",
    lightMode: "Light",
    darkMode: "Dark",
    systemMode: "System",
    backgroundStyle: "Fon",
    backgroundCalm: "Sakit",
    backgroundGrid: "Grid",
    backgroundPlain: "Sadə",
    accentColor: "Əsas rəng",
    accentTeal: "Teal",
    accentBlue: "Blue",
    accentGreen: "Green",
    emailNotifications: "Mail bildirişləri",
    emailRecipients: "Mail alanlar",
    emailRecipientsPlaceholder: "admin@example.com",
    emailProvider: "SMTP və ya API endpoint",
    emailProviderPlaceholder: "smtps://user:app-password@smtp.gmail.com:465",
    emailProviderHint: "Gmail üçün App Password yaradın və smtps://user:app-password@smtp.gmail.com:465 formatında yazın.",
    mailSubjectTemplate: "Deadline mövzusu",
    mailBodyTemplate: "Deadline şablonu",
    testMailBody: "Test mail mətni",
    ipmaGovernance: "IPMA / Governance",
    ipmaScore: "IPMA balı",
    lifecycleStage: "Lifecycle mərhələsi",
    projectCharter: "Project charter / Məqsəd",
    projectScope: "Scope",
    successCriteria: "Success criteria",
    planningGateChecklist: "Planning gate checklist",
    closureLessons: "Closure / lessons learned",
    stakeholderRegister: "Maraqlı tərəflər registeri",
    communicationPlan: "Kommunikasiya planı",
    decisionLog: "Qərar jurnalı",
    changeControl: "Dəyişiklik kontrolu",
    riskOpportunity: "Risk və imkanlar",
    qualityChecklist: "Keyfiyyət checklist-i",
    competenceMatrix: "Kompetensiya matrisi",
    governanceCoverage: "Governance tamamlanma",
    governanceMissing: "Çatışmayan IPMA sahələri",
    gateApprovals: "Gate təsdiqləri",
    openGovernanceRisk: "Açıq governance riskləri",
    ipmaReport: "IPMA hesabatı",
    gateExecutionError: "Execution üçün charter, scope, success criteria və planning gate checklist doldurulmalıdır.",
    gateClosedError: "Closed mərhələsi üçün closure / lessons learned qeydi doldurulmalıdır.",
    gateRequirementError: "Bu gate üçün tələb olunan IPMA sahələri tamamlanmayıb.",
    platformCompanies: "Şirkətlər",
    companyStatus: "Status",
    companyPlan: "Plan",
    statusReason: "Səbəb",
    statusChangedBy: "Dəyişən",
    suspendCompany: "Dayandır",
    activateCompany: "Aktiv et",
    companySuspended: "Şirkət dayandırılıb.",
    projectImport: "Proyekt import",
    projectImportHint: "Import düyməsi JSON backup, Excel CSV və MS Project XML fayllarını qəbul edir. CSV başlıqları: Project, Task, Start, End, Status, Priority, Progress, Owner, Dependencies, Milestone.",
    adminActivity: "Admin aktivliyi",
    auditLogs: "Audit logs",
    mailHistory: "Mail history",
    refresh: "Yenilə",
    importDone: "Import tamamlandı.",
    panelCompact: "Kiçilt",
    panelWide: "Böyüt",
    workflowStatuses: "Workflow statusları",
    newWorkflowStatus: "Yeni status",
    addWorkflowStatus: "Status əlavə et",
    requiredWorkflowStatus: "Sistem statusu",
    testMail: "Mail test et",
    mailTestSent: "Mail testi göndərildi.",
    mailTestSkipped: "Mail testi göndərilmədi. Mail ayarlarını yoxlayın.",
    ldapEnabled: "LDAP aktivdir",
    ldapUrl: "LDAP URL",
    ldapBaseDn: "Base DN",
    ldapUserFilter: "User filter",
    ldapBindDn: "Bind DN",
    ldapBindPassword: "Bind şifrəsi",
    ldapGroupRoleMap: "Group-role mapping",
    saveSettings: "Settings saxla",
    settingsSaved: "Settings saxlandı.",
    newTask: "Yeni task",
    editTask: "Taskı redaktə et",
    taskFormAria: "Task forması",
    taskName: "Task adı",
    taskNamePlaceholder: "Məsələn: Router konfiqurasiyası",
    project: "Layihə",
    projectPlaceholder: "Məsələn: Network upgrade",
    selectProject: "Layihə seç",
    projects: "Layihələr",
    newProject: "Yeni layihə",
    projectNamePlaceholder: "Layihə adı",
    template: "Şablon",
    budget: "Büdcə (AZN)",
    projectDescription: "Qısa açıqlama",
    addProject: "Layihə yarat",
    editProject: "Layihəni redaktə et",
    archiveProject: "Arxivlə",
    archivedProjects: "Arxiv layihələr",
    restoreProject: "Bərpa et",
    projectFormAria: "Layihə forması",
    projectName: "Layihənin adı",
    projectLeader: "Layihə rəhbəri",
    projectTeamMembers: "Komanda üzvləri",
    addSelectedTeamMembers: "Komandaya əlavə et",
    removeTeamMember: "Çıxar",
    createProjectFirst: "Əvvəl layihə yarat",
    projectPages: "Layihə səhifələri",
    openProject: "Layihəni aç",
    addTaskToProject: "Task əlavə et",
    backgroundFocus: "Fokus",
    backgroundPaper: "Kağız",
    backgroundSteel: "Polad",
    backgroundSunrise: "Gün doğumu",
    backgroundAurora: "Şimal işığı",
    backgroundCircuit: "Texniki xəritə",
    backgroundMist: "Səhər dumanı",
    backgroundCarbon: "Karbon",
    backgroundCanopy: "Yaşıl örtük",
    accentAmber: "Amber",
    accentRed: "Red",
    accentViolet: "Violet",
    accentSlate: "Slate",
    fatherName: "Ata adı",
    fullName: "Ad soyad",
    email: "Mail",
    position: "Vəzifə",
    phone: "Telefon",
    address: "Ünvan",
    company: "Şirkət adı",
    manager: "Manager",
    userProfile: "İstifadəçi blankı",
    saveProfile: "Blankı saxla",
    responsibleManagers: "Cavabdeh şəxslər",
    selectManagers: "Manager seç",
    selectedManagers: "Seçilən managerlər",
    noManagersSelected: "Manager seçilməyib",
    saveManagers: "Managerləri saxla",
    projectResource: "Layihə resursu",
    noResource: "Resurs seçilməyib",
    start: "Başlama",
    end: "Bitmə",
    status: "Status",
    priority: "Prioritet",
    priorityFilterAria: "Prioritet filteri",
    owner: "Məsul şəxs",
    noOwnerSelect: "Seçilməyib",
    ownerPlaceholder: "Ad və ya komanda",
    progress: "Progress %",
    plannedHours: "Plan saat",
    actualHours: "Fakt saat",
    hoursSummary: "Saat plan/fakt",
    workload: "Workload",
    teamCapacity: "Komanda yüklənməsi",
    capacityHours: "Capacity saat",
    timeEntries: "Vaxt logları",
    addTimeEntry: "Vaxt əlavə et",
    timeEntryNote: "Qeyd",
    loggedBy: "Qeyd edən",
    hours: "Saat",
    notes: "Qeyd",
    notesPlaceholder: "Qısa qeyd yaz",
    save: "Yadda saxla",
    cancel: "Ləğv et",
    viewsAria: "Görünüşlər",
    dashboard: "Dashboard",
    list: "Tasklar",
    taskListTitle: "Tasklar siyahısı",
    kanban: "Kanban",
    calendar: "Təqvim",
    deadlineCalendar: "Təqvim",
    rangeStart: "Başlama",
    rangeEnd: "Bitmə",
    selectedDay: "Seçilən gün",
    projectAndTask: "Layihə və task",
    selectCalendarDay: "Təqvimdə gün seçin.",
    advanced: "Ətraflı parametrlər",
    noTaskOnDay: "Bu gün üçün task yoxdur.",
    parentTask: "Ana task",
    noParentTask: "Ana task yoxdur",
    taskDependencies: "Asılı tasklar",
    dependsOn: "Asılıdır",
    blocked: "Bloklanıb",
    blockedBy: "Bloklayan",
    dependencyStartBlocked: "Bu task başlamazdan əvvəl asılı tasklar bitməlidir.",
    gantt: "Gantt",
    searchPlaceholder: "Task, layihə, məsul şəxs axtar",
    allProjects: "Bütün layihələr",
    totalTasks: "Cəmi task",
    activeTasks: "Aktiv task",
    doneTasks: "Bitmiş task",
    projectDuration: "Layihə müddəti",
    executionStatus: "İcra vəziyyəti",
    upcomingTasks: "Yaxın tasklar",
    tasks: "Tasklar",
    statusFilterAria: "Status filteri",
    ganttChart: "Gantt cədvəli",
    noUpcoming: "Yaxın deadline yoxdur.",
    noTask: "Task yoxdur. Formadan yeni task əlavə et.",
    noTaskFilter: "Bu filterdə task yoxdur.",
    empty: "Boşdur",
    noOwner: "Məsul şəxs yoxdur",
    edit: "Redaktə",
    next: "İrəli",
    reopen: "Davam etdir",
    doneRequest: "Bitdi",
    approveDone: "Təsdiq et",
    pendingDone: "Təsdiq gözləyir",
    confirmDone: "Taskın bitdiyinə əminsiniz?",
    reports: "Hesabat",
    projectReports: "Layihə hesabatları",
    reportSummary: "Hesabat xülasəsi",
    filteredTasks: "Filterlənmiş task",
    blockedTasks: "Bloklanmış",
    requestedAt: "Bitmə sorğusu",
    approvedAt: "Təsdiq tarixi",
    executedBy: "İcraçı",
    saveTeam: "Komandanı saxla",
    linkedUser: "Bağlı user",
    delete: "Sil",
    day: "gün",
    invalidDate: "Bitmə tarixi başlama tarixindən əvvəl ola bilməz.",
    unassignedProject: "Layihəsiz",
    resources: "Resurslar",
    newMember: "Yeni məsul şəxs",
    memberNamePlaceholder: "Ad Soyad",
    addMember: "Şəxs əlavə et",
    newTeam: "Yeni komanda",
    teamNamePlaceholder: "Komanda adı",
    teamMembers: "Komanda üzvləri",
    addTeam: "Komanda əlavə et",
    linkProject: "Layihəyə bağla",
    linkProjectPlaceholder: "Layihə adı",
    resource: "Resurs",
    addProjectLink: "Bağla",
    remove: "Sil",
    member: "Şəxs",
    team: "Komanda",
    loginKicker: "Layihəyə giriş",
    loginTitle: "Daxil ol",
    username: "İstifadəçi adı",
    login: "Login",
    password: "Şifrə",
    subdomain: "Subdomain",
    confirmationCode: "Təsdiq kodu",
    requestPasswordChange: "Mail təsdiqi göndər",
    confirmPasswordChange: "Parolu təsdiqlə",
    passwordChangeSent: "Təsdiq kodu mailə göndərildi.",
    passwordChangeSkipped: "Mail göndərilmədi. Mail və SMTP ayarlarını yoxlayın.",
    passwordChanged: "Parol dəyişdirildi.",
    loginButton: "Daxil ol",
    register: "Qeydiyyat",
    authBack: "Geri",
    heroCta: "Daxil ol",
    heroRegisterCta: "Qeydiyyatdan keç",
    heroEyebrow: "IPMA uyğun · Öz serverinizdə",
    heroTitle: "Layihələrinizi tam nəzarət altına alın",
    heroSub: "Komandanız, tapşırıqlarınız, müddətləriniz — hamısı bir platformada. Şəffaf, sürətli, etibarlı.",
    heroF1Title: "Çoxlu görünüş", heroF1Desc: "Gantt, Kanban, Kalendar və Cədvəl — seçim sizindir",
    heroF2Title: "Rol sistemi", heroF2Desc: "Admin, Manager, Contributor, Viewer, Sponsor — hər kəsə öz icazəsi",
    heroF3Title: "Avtomatik bildirişlər", heroF3Desc: "Deadline yaxınlaşanda komanda mail alır, heç nə atlanmır",
    heroF4Title: "Çox şirkətli platforma", heroF4Desc: "Hər workspace tamamilə izolyasiyalı, öz adminliyi ilə",
    heroF5Title: "Öz serveriniz", heroF5Desc: "Məlumatlarınız heç bir üçüncü tərəflə paylaşılmır",
    heroIpmaTitle: "IPMA standartı ilə uyğun",
    heroIpmaDesc: "Platforma IPMA ICB 4.0 kompetensiya çərçivəsinə uyğun qurulub: hər layihənin öz Gate yoxlaması, IPMA balı, Governance bölməsi və sponsor nəzarəti mövcuddur.",
    heroIpmaP1: "Gate / Milestone nəzarəti", heroIpmaP2: "Sponsor, Manager, Contributor rolları",
    heroIpmaP3: "IPMA Balı & Hesabat", heroIpmaP4: "Governance & Risk izləmə",
    heroStat1: "Layihə & tapşırıq", heroStat2: "Rol səviyyəsi", heroStat3: "Öz serverinizdə",
    logout: "Çıxış",
    loginError: "İstifadəçi adı və ya şifrə yanlışdır.",
    manageUsers: "Userlər",
    newUser: "Yeni user",
    usernamePlaceholder: "username",
    passwordPlaceholder: "password",
    role: "Rol",
    addUser: "User əlavə et",
    changePassword: "Parolu dəyiş",
    newPassword: "Yeni parol",
    superAdminRole: "Super admin",
    adminRole: "Şirkət admini",
    managerRole: "Manager",
    userRole: "User",
    contributorRole: "Contributor",
    viewerRole: "Viewer",
    sponsorRole: "Sponsor",
    comment: "Komment",
    comments: "Kommentlər",
    addComment: "Komment yaz",
    commentPlaceholder: "Komment yaz",
    noComments: "Komment yoxdur",
    trash: "Zibil qutusu",
    restore: "Bərpa et",
    deleteForever: "Tam sil",
    deletedTask: "Silinmiş task",
    deletedProject: "Silinmiş layihə",
    attachments: "Fayllar",
    chooseFiles: "Fayl seç",
    noFilesSelected: "Fayl seçilməyib",
    filesSelected: "fayl seçildi",
    notify: "Bildirişlər",
    notificationsEnabled: "Bildirişlər aktivdir",
    notificationsBlocked: "Bildiriş icazəsi verilmədi.",
    notificationCenter: "Bildiriş mərkəzi",
    markAllRead: "Hamısını oxundu et",
    enableBrowserNotifications: "Browser bildirişlərini aktiv et",
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
    backupPanel: "Backup / Restore",
    createBackup: "Backup yarat",
    restoreBackup: "Backup bərpa et",
    saveImportMapping: "Mapping saxla",
    backupCreated: "Backup yaradıldı.",
    dependencyRescheduled: "Asılı taskların tarixləri yeniləndi.",
    backupError: "Backup faylı oxunmadı.",
    risk: "Risk",
    projectRegisters: "Layihə registerləri",
    registerType: "Tip",
    riskRegister: "Risk",
    issueRegister: "Issue",
    milestoneRegister: "Milestone",
    registerTitle: "Başlıq",
    registerTitlePlaceholder: "Məsələn: Go-live riski",
    impact: "Impact",
    impactLow: "Aşağı",
    impactMedium: "Orta",
    impactHigh: "Yüksək",
    dueDate: "Due date",
    mitigation: "Mitigation / qeyd",
    registerOpen: "Open",
    registerMonitoring: "Monitoring",
    registerResolved: "Resolved",
    addRegisterItem: "Registerə əlavə et",
    registerSummary: "Register xülasəsi",
    deadlineAlerts: "Deadline xəbərdarlıqları",
    overdue: "Gecikir",
    dueSoon: "Yaxın deadline",
    dueToday: "Bu gün bitir",
    noDeadlineAlerts: "Riskli deadline yoxdur.",
    dateChangeRequests: "Tarix dəyişiklik sorğuları",
    dateChangeRequested: "Tarix dəyişikliyi manager təsdiqinə göndərildi.",
    approveDateChange: "Təsdiq et",
    rejectDateChange: "Rədd et",
    noDateRequests: "Açıq tarix sorğusu yoxdur.",
    roleMatrix: "Rol icazələri",
    fileTooLarge: "Fayl çox böyükdür. Hər fayl maksimum 800 KB ola bilər.",
    all: "Hamısı",
    loadMore: "Daha çox yüklə",
    showingOf: (n, t) => `${n} / ${t} task`,
    resetPassword: "Şifrəni sıfırla",
    resetPasswordEmail: "E-poçt ünvanı",
    resetPasswordSend: "Sıfırlama linki göndər",
    resetPasswordSent: "Sıfırlama linki e-poçtunuza göndərildi.",
    resetPasswordError: "Göndərmə xətası. E-poçtu yoxlayın.",
    backToLogin: "Loginə qayıt",
    telegramSettings: "Telegram bildirişləri",
    telegramEnabled: "Telegram aktiv",
    telegramBotToken: "Bot Token",
    telegramChatId: "Chat ID",
    telegramHint: "BotFather-dən token alın, bota /start göndərin, chat ID-ni @userinfobot ilə öyrənin.",
    testTelegram: "Telegram test et",
    templates: "Şablonlar",
    newTemplate: "Yeni şablon",
    templateName: "Şablon adı",
    saveTemplate: "Şablon saxla",
    applyTemplate: "Şablon tətbiq et",
    deleteTemplate: "Şablon sil",
    noTemplates: "Şablon yoxdur. Mövcud taskları şablon kimi saxlaya bilərsiniz.",
    templateTaskCount: (n) => `${n} task`,
    templateApplied: "Şablon tətbiq edildi.",
    timeWeek: "Bu həftə",
    timeChart: "Vaxt analizi",
    totalHours: "Cəmi saat",
    realtimeConnected: "Canlı sinxronizasiya aktiv",
    realtimeDisconnected: "Offline — dəyişikliklər avtomatik sinxronizasiya olunmayacaq",
    autoSnapshotSaved: "Avtomatik snapshot saxlanıldı",
    statuses: { "Plan": "Plan", "Davam edir": "Davam edir", "Bitib": "Bitib" },
    priorities: { "Kritik": "Kritik", "Normal": "Normal", "Yüksək": "Yüksək", "Aşağı": "Aşağı" }
  },
  ru: {
    locale: "ru-RU",
    appKicker: "Рабочее пространство",
    appTitle: "План, таски и панель контроля",
    clearDone: "Очистить выполненные",
    resetDemo: "Сбросить выбранный проект",
    loadClinicPortfolio: "Загрузить в проект",
    adminPanel: "Админ панель",
    close: "Закрыть",
    settings: "Настройки",
    new: "Новое",
    appearanceSettings: "Внешний вид",
    workflowSettings: "Workflow",
    mailSettings: "Почта",
    ldapSettings: "LDAP",
    customer: "Заказчик",
    customers: "Заказчики",
    customerName: "Название заказчика",
    customerNamePlaceholder: "Название компании",
    contactPerson: "Контактное лицо",
    addCustomer: "Добавить заказчика",
    fileManager: "File manager",
    filters: "Фильтры",
    filtersScope: "Применяется к задачам, Kanban, Gantt и отчетам",
    smartFilters: "Умные",
    overdueTasks: "Просроч.",
    riskFocus: "Риск",
    myTasks: "Мои",
    portfolioHealth: "Здоровье",
    portfolioHealthTitle: "Состояние портфеля",
    nextActions: "Действия",
    nextActionsTitle: "Следующие шаги",
    healthScore: "Индекс здоровья",
    completionRate: "Завершение",
    riskLoad: "Рисковая нагрузка",
    openIssueLoad: "Открытые issue",
    noActionNeeded: "Срочных действий нет.",
    actionBlocked: "Разблокировать зависимость",
    actionOverdue: "Закрыть просрочку",
    actionDueSoon: "Срок приближается",
    actionHighRisk: "Контролировать высокий риск",
    addFiles: "Добавить файлы",
    download: "Скачать",
    testLdap: "Проверить LDAP",
    ldapTestOk: "LDAP test successful.",
    ldapTestFailed: "LDAP test failed. Check settings.",
    themeMode: "Режим интерфейса",
    lightMode: "Светлый",
    darkMode: "Темный",
    systemMode: "Системный",
    backgroundStyle: "Фон",
    backgroundCalm: "Спокойный",
    backgroundGrid: "Сетка",
    backgroundPlain: "Простой",
    accentColor: "Основной цвет",
    accentTeal: "Teal",
    accentBlue: "Синий",
    accentGreen: "Зеленый",
    emailNotifications: "Email уведомления",
    emailRecipients: "Получатели",
    emailRecipientsPlaceholder: "admin@example.com",
    emailProvider: "SMTP или API endpoint",
    emailProviderPlaceholder: "smtps://user:app-password@smtp.gmail.com:465",
    emailProviderHint: "Для Gmail создайте App Password и укажите smtps://user:app-password@smtp.gmail.com:465.",
    mailSubjectTemplate: "Тема deadline",
    mailBodyTemplate: "Шаблон deadline",
    testMailBody: "Текст тестового письма",
    ipmaGovernance: "IPMA / Governance",
    ipmaScore: "IPMA балл",
    lifecycleStage: "Lifecycle этап",
    projectCharter: "Project charter / цель",
    projectScope: "Scope",
    successCriteria: "Success criteria",
    planningGateChecklist: "Planning gate checklist",
    closureLessons: "Closure / lessons learned",
    stakeholderRegister: "Реестр stakeholders",
    communicationPlan: "План коммуникации",
    decisionLog: "Журнал решений",
    changeControl: "Change control",
    riskOpportunity: "Риски и возможности",
    qualityChecklist: "Quality checklist",
    competenceMatrix: "Матрица компетенций",
    governanceCoverage: "Governance готовность",
    governanceMissing: "Недостающие IPMA поля",
    gateApprovals: "Gate approvals",
    openGovernanceRisk: "Открытые governance риски",
    ipmaReport: "IPMA отчет",
    gateExecutionError: "Для Execution нужно заполнить charter, scope, success criteria и planning gate checklist.",
    gateClosedError: "Для Closed нужно заполнить closure / lessons learned.",
    gateRequirementError: "Для этого gate не заполнены обязательные IPMA поля.",
    platformCompanies: "Компании",
    companyStatus: "Статус",
    companyPlan: "План",
    statusReason: "Причина",
    statusChangedBy: "Изменил",
    suspendCompany: "Остановить",
    activateCompany: "Активировать",
    companySuspended: "Компания приостановлена.",
    projectImport: "Импорт проекта",
    projectImportHint: "Import принимает JSON backup, Excel CSV и MS Project XML. CSV headers: Project, Task, Start, End, Status, Priority, Progress, Owner, Dependencies, Milestone.",
    adminActivity: "Активность admin",
    auditLogs: "Audit logs",
    mailHistory: "Mail history",
    refresh: "Обновить",
    importDone: "Import completed.",
    panelCompact: "Уменьшить",
    panelWide: "Увеличить",
    workflowStatuses: "Статусы workflow",
    newWorkflowStatus: "Новый статус",
    addWorkflowStatus: "Добавить статус",
    requiredWorkflowStatus: "Системный статус",
    testMail: "Проверить email",
    mailTestSent: "Тестовое письмо отправлено.",
    mailTestSkipped: "Тестовое письмо не отправлено. Проверьте настройки email.",
    ldapEnabled: "LDAP включен",
    ldapUrl: "LDAP URL",
    ldapBaseDn: "Base DN",
    ldapUserFilter: "User filter",
    ldapBindDn: "Bind DN",
    ldapBindPassword: "Bind password",
    ldapGroupRoleMap: "Group-role mapping",
    saveSettings: "Сохранить настройки",
    settingsSaved: "Настройки сохранены.",
    newTask: "Новый таск",
    editTask: "Редактировать таск",
    taskFormAria: "Форма таска",
    taskName: "Название таска",
    taskNamePlaceholder: "Например: настройка роутера",
    project: "Проект",
    projectPlaceholder: "Например: Network upgrade",
    selectProject: "Выберите проект",
    projects: "Проекты",
    newProject: "Новый проект",
    projectNamePlaceholder: "Название проекта",
    template: "Шаблон",
    budget: "Бюджет (AZN)",
    projectDescription: "Краткое описание",
    addProject: "Создать проект",
    editProject: "Редактировать проект",
    archiveProject: "Архив",
    archivedProjects: "Архивные проекты",
    restoreProject: "Восстановить",
    projectFormAria: "Форма проекта",
    projectName: "Название проекта",
    projectLeader: "Руководитель проекта",
    projectTeamMembers: "Участники команды",
    addSelectedTeamMembers: "Добавить в команду",
    removeTeamMember: "Убрать",
    createProjectFirst: "Сначала создайте проект",
    projectPages: "Страницы проектов",
    openProject: "Открыть проект",
    addTaskToProject: "Добавить таск",
    backgroundFocus: "Фокус",
    backgroundPaper: "Бумага",
    backgroundSteel: "Сталь",
    backgroundSunrise: "Рассвет",
    backgroundAurora: "Северное сияние",
    backgroundCircuit: "Техническая карта",
    backgroundMist: "Утренний туман",
    backgroundCarbon: "Карбон",
    backgroundCanopy: "Зеленый покров",
    accentAmber: "Янтарный",
    accentRed: "Красный",
    accentViolet: "Фиолетовый",
    accentSlate: "Slate",
    fatherName: "Отчество",
    fullName: "Имя Фамилия",
    email: "Email",
    position: "Должность",
    phone: "Телефон",
    address: "Адрес",
    company: "Компания",
    manager: "Менеджер",
    userProfile: "Профиль пользователя",
    saveProfile: "Сохранить профиль",
    responsibleManagers: "Ответственные менеджеры",
    selectManagers: "Выбрать менеджера",
    selectedManagers: "Выбранные менеджеры",
    noManagersSelected: "Менеджер не выбран",
    saveManagers: "Сохранить менеджеров",
    projectResource: "Ресурс проекта",
    noResource: "Ресурс не выбран",
    start: "Начало",
    end: "Окончание",
    status: "Статус",
    priority: "Приоритет",
    priorityFilterAria: "Фильтр приоритета",
    owner: "Ответственный",
    noOwnerSelect: "Не выбрано",
    ownerPlaceholder: "Имя или команда",
    progress: "Прогресс %",
    plannedHours: "План часов",
    actualHours: "Факт часов",
    hoursSummary: "Часы план/факт",
    workload: "Workload",
    teamCapacity: "Загрузка команды",
    capacityHours: "Capacity часов",
    timeEntries: "Логи времени",
    addTimeEntry: "Добавить время",
    timeEntryNote: "Заметка",
    loggedBy: "Автор",
    hours: "Часы",
    notes: "Заметка",
    notesPlaceholder: "Короткая заметка",
    save: "Сохранить",
    cancel: "Отмена",
    viewsAria: "Виды",
    dashboard: "Панель",
    list: "Таски",
    taskListTitle: "Список тасков",
    kanban: "Канбан",
    calendar: "Календарь",
    deadlineCalendar: "Календарь",
    rangeStart: "Начало",
    rangeEnd: "Конец",
    selectedDay: "Выбранный день",
    projectAndTask: "Проект и таск",
    advanced: "Дополнительно",
    selectCalendarDay: "Выберите день в календаре.",
    noTaskOnDay: "На этот день тасков нет.",
    parentTask: "Родительский таск",
    noParentTask: "Нет родительского таска",
    taskDependencies: "Зависимости таска",
    dependsOn: "Зависит от",
    blocked: "Заблокировано",
    blockedBy: "Блокирует",
    dependencyStartBlocked: "Перед стартом этой задачи зависимые задачи должны быть выполнены.",
    gantt: "Гантт",
    searchPlaceholder: "Поиск по таску, проекту, ответственному",
    allProjects: "Все проекты",
    totalTasks: "Всего тасков",
    activeTasks: "Активные таски",
    doneTasks: "Выполненные таски",
    projectDuration: "Длительность проекта",
    executionStatus: "Статус выполнения",
    upcomingTasks: "Ближайшие таски",
    tasks: "Таски",
    statusFilterAria: "Фильтр статуса",
    ganttChart: "Диаграмма Гантта",
    noUpcoming: "Ближайших дедлайнов нет.",
    noTask: "Тасков нет. Добавьте новый таск через форму слева.",
    noTaskFilter: "По этому фильтру тасков нет.",
    empty: "Пусто",
    noOwner: "Ответственный не указан",
    edit: "Редактировать",
    next: "Далее",
    reopen: "Вернуть в работу",
    doneRequest: "Готово",
    approveDone: "Подтвердить",
    pendingDone: "Ждет подтверждения",
    confirmDone: "Вы уверены, что таск завершен?",
    reports: "Отчет",
    projectReports: "Отчеты по проектам",
    reportSummary: "Сводка отчета",
    filteredTasks: "Отфильтрованные задачи",
    blockedTasks: "Блокирован.",
    requestedAt: "Запрос завершения",
    approvedAt: "Дата подтверждения",
    executedBy: "Исполнитель",
    saveTeam: "Сохранить команду",
    linkedUser: "Связанный user",
    delete: "Удалить",
    day: "дн.",
    invalidDate: "Дата окончания не может быть раньше даты начала.",
    unassignedProject: "Без проекта",
    resources: "Ресурсы",
    newMember: "Новый ответственный",
    memberNamePlaceholder: "Имя Фамилия",
    addMember: "Добавить сотрудника",
    newTeam: "Новая команда",
    teamNamePlaceholder: "Название команды",
    teamMembers: "Участники команды",
    addTeam: "Добавить команду",
    linkProject: "Привязать к проекту",
    linkProjectPlaceholder: "Название проекта",
    resource: "Ресурс",
    addProjectLink: "Привязать",
    remove: "Удалить",
    member: "Сотрудник",
    team: "Команда",
    loginKicker: "Доступ к проекту",
    loginTitle: "Войти",
    username: "Имя пользователя",
    login: "Логин",
    password: "Пароль",
    subdomain: "Subdomain",
    confirmationCode: "Код подтверждения",
    requestPasswordChange: "Отправить email код",
    confirmPasswordChange: "Подтвердить пароль",
    passwordChangeSent: "Код подтверждения отправлен на email.",
    passwordChangeSkipped: "Email не отправлен. Проверьте email и SMTP настройки.",
    passwordChanged: "Пароль изменен.",
    loginButton: "Войти",
    register: "Регистрация",
    authBack: "Назад",
    heroCta: "Войти",
    heroRegisterCta: "Зарегистрироваться",
    heroEyebrow: "Соответствует IPMA · На вашем сервере",
    heroTitle: "Управляйте проектами полностью",
    heroSub: "Ваша команда, задачи, дедлайны — всё в одной платформе. Прозрачно, быстро, надёжно.",
    heroF1Title: "Несколько видов", heroF1Desc: "Gantt, Kanban, Календарь и Таблица — выбор за вами",
    heroF2Title: "Система ролей", heroF2Desc: "Admin, Manager, Contributor, Viewer, Sponsor — каждому свои права",
    heroF3Title: "Автоматические уведомления", heroF3Desc: "Когда дедлайн близко — команда получает email, ничего не упускается",
    heroF4Title: "Мультитенантная платформа", heroF4Desc: "Каждый workspace полностью изолирован, со своим администратором",
    heroF5Title: "Ваш сервер", heroF5Desc: "Данные не передаются третьим лицам",
    heroIpmaTitle: "Соответствие стандарту IPMA",
    heroIpmaDesc: "Платформа построена по стандарту IPMA ICB 4.0: Gate-проверки по каждому проекту, оценка IPMA, раздел Governance и контроль спонсора.",
    heroIpmaP1: "Контроль Gate / Milestone", heroIpmaP2: "Роли Sponsor, Manager, Contributor",
    heroIpmaP3: "IPMA-балл и отчёт", heroIpmaP4: "Governance и мониторинг рисков",
    heroStat1: "Проекты & задачи", heroStat2: "Уровней ролей", heroStat3: "На вашем сервере",
    logout: "Выйти",
    loginError: "Неверное имя пользователя или пароль.",
    manageUsers: "Пользователи",
    newUser: "Новый пользователь",
    usernamePlaceholder: "username",
    passwordPlaceholder: "password",
    role: "Роль",
    addUser: "Добавить пользователя",
    changePassword: "Сменить пароль",
    newPassword: "Новый пароль",
    superAdminRole: "Супер админ",
    adminRole: "Админ компании",
    managerRole: "Менеджер",
    userRole: "Пользователь",
    contributorRole: "Участник",
    viewerRole: "Наблюдатель",
    sponsorRole: "Спонсор",
    comment: "Комментарий",
    comments: "Комментарии",
    addComment: "Добавить комментарий",
    commentPlaceholder: "Написать комментарий",
    noComments: "Комментариев нет",
    trash: "Корзина",
    restore: "Восстановить",
    deleteForever: "Удалить навсегда",
    deletedTask: "Удаленный таск",
    deletedProject: "Удаленный проект",
    attachments: "Файлы",
    chooseFiles: "Выбрать файл",
    noFilesSelected: "Файл не выбран",
    filesSelected: "файл(ов) выбрано",
    notify: "Уведомления",
    notificationsEnabled: "Уведомления включены",
    notificationsBlocked: "Разрешение на уведомления не выдано.",
    notificationCenter: "Центр уведомлений",
    markAllRead: "Отметить все прочитанными",
    enableBrowserNotifications: "Включить уведомления браузера",
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
    backupPanel: "Backup / Restore",
    createBackup: "Создать backup",
    restoreBackup: "Восстановить backup",
    saveImportMapping: "Сохранить mapping",
    backupCreated: "Backup создан.",
    dependencyRescheduled: "Даты зависимых задач обновлены.",
    backupError: "Backup файл не прочитан.",
    risk: "Риск",
    projectRegisters: "Реестры проекта",
    registerType: "Тип",
    riskRegister: "Риск",
    issueRegister: "Issue",
    milestoneRegister: "Milestone",
    registerTitle: "Заголовок",
    registerTitlePlaceholder: "Например: риск go-live",
    impact: "Impact",
    impactLow: "Низкий",
    impactMedium: "Средний",
    impactHigh: "Высокий",
    dueDate: "Due date",
    mitigation: "Mitigation / заметка",
    registerOpen: "Open",
    registerMonitoring: "Monitoring",
    registerResolved: "Resolved",
    addRegisterItem: "Добавить в реестр",
    registerSummary: "Сводка реестров",
    deadlineAlerts: "Предупреждения по срокам",
    overdue: "Просрочено",
    dueSoon: "Скоро срок",
    dueToday: "Срок сегодня",
    noDeadlineAlerts: "Рискованных сроков нет.",
    dateChangeRequests: "Запросы изменения дат",
    dateChangeRequested: "Изменение дат отправлено менеджеру на подтверждение.",
    approveDateChange: "Подтвердить",
    rejectDateChange: "Отклонить",
    noDateRequests: "Нет открытых запросов дат.",
    roleMatrix: "Права ролей",
    fileTooLarge: "Файл слишком большой. Максимум 800 KB на файл.",
    all: "Все",
    loadMore: "Загрузить ещё",
    showingOf: (n, t) => `${n} / ${t} задач`,
    resetPassword: "Сбросить пароль",
    resetPasswordEmail: "E-mail адрес",
    resetPasswordSend: "Отправить ссылку для сброса",
    resetPasswordSent: "Ссылка для сброса отправлена на ваш e-mail.",
    resetPasswordError: "Ошибка отправки. Проверьте e-mail.",
    backToLogin: "Назад к входу",
    telegramSettings: "Уведомления Telegram",
    telegramEnabled: "Telegram включён",
    telegramBotToken: "Bot Token",
    telegramChatId: "Chat ID",
    telegramHint: "Получите токен у BotFather, отправьте /start боту, узнайте chat ID через @userinfobot.",
    testTelegram: "Тест Telegram",
    templates: "Шаблоны",
    newTemplate: "Новый шаблон",
    templateName: "Название шаблона",
    saveTemplate: "Сохранить шаблон",
    applyTemplate: "Применить шаблон",
    deleteTemplate: "Удалить шаблон",
    noTemplates: "Шаблонов нет. Можно сохранить текущие задачи как шаблон.",
    templateTaskCount: (n) => `${n} задач`,
    templateApplied: "Шаблон применён.",
    timeWeek: "На этой неделе",
    timeChart: "Анализ времени",
    totalHours: "Всего часов",
    realtimeConnected: "Синхронизация в реальном времени активна",
    realtimeDisconnected: "Офлайн — изменения не синхронизируются автоматически",
    autoSnapshotSaved: "Автоматический снимок сохранён",
    statuses: { "Plan": "План", "Davam edir": "В работе", "Bitib": "Выполнено" },
    priorities: { "Kritik": "Критический", "Normal": "Нормальный", "Yüksək": "Высокий", "Aşağı": "Низкий" }
  },
  en: {
    locale: "en-US",
    appKicker: "Project workspace",
    appTitle: "Plan, tasks and execution board",
    clearDone: "Clear done",
    resetDemo: "Reset selected project",
    loadClinicPortfolio: "Load to project",
    adminPanel: "Admin panel",
    close: "Close",
    settings: "Settings",
    new: "New",
    appearanceSettings: "Appearance",
    workflowSettings: "Workflow",
    mailSettings: "Mail",
    ldapSettings: "LDAP",
    customer: "Customer",
    customers: "Customers",
    customerName: "Customer name",
    customerNamePlaceholder: "Company name",
    contactPerson: "Contact person",
    addCustomer: "Add customer",
    fileManager: "File manager",
    filters: "Filters",
    filtersScope: "Applies to Tasks, Kanban, Gantt and Reports",
    smartFilters: "Smart",
    overdueTasks: "Overdue",
    riskFocus: "Risk",
    myTasks: "Mine",
    portfolioHealth: "Health",
    portfolioHealthTitle: "Portfolio health",
    nextActions: "Actions",
    nextActionsTitle: "Next actions",
    healthScore: "Health score",
    completionRate: "Completion",
    riskLoad: "Risk load",
    openIssueLoad: "Open issues",
    noActionNeeded: "No urgent action needed.",
    actionBlocked: "Clear dependency",
    actionOverdue: "Close overdue item",
    actionDueSoon: "Deadline is near",
    actionHighRisk: "Monitor high risk",
    addFiles: "Add files",
    download: "Download",
    testLdap: "Test LDAP",
    ldapTestOk: "LDAP test successful.",
    ldapTestFailed: "LDAP test failed. Check settings.",
    themeMode: "Theme mode",
    lightMode: "Light",
    darkMode: "Dark",
    systemMode: "System",
    backgroundStyle: "Background",
    backgroundCalm: "Calm",
    backgroundGrid: "Grid",
    backgroundPlain: "Plain",
    accentColor: "Accent color",
    accentTeal: "Teal",
    accentBlue: "Blue",
    accentGreen: "Green",
    emailNotifications: "Email notifications",
    emailRecipients: "Recipients",
    emailRecipientsPlaceholder: "admin@example.com",
    emailProvider: "SMTP or API endpoint",
    emailProviderPlaceholder: "smtps://user:app-password@smtp.gmail.com:465",
    emailProviderHint: "For Gmail, create an App Password and use smtps://user:app-password@smtp.gmail.com:465.",
    mailSubjectTemplate: "Deadline subject",
    mailBodyTemplate: "Deadline template",
    testMailBody: "Test mail body",
    ipmaGovernance: "IPMA / Governance",
    ipmaScore: "IPMA score",
    lifecycleStage: "Lifecycle stage",
    projectCharter: "Project charter / goal",
    projectScope: "Scope",
    successCriteria: "Success criteria",
    planningGateChecklist: "Planning gate checklist",
    closureLessons: "Closure / lessons learned",
    stakeholderRegister: "Stakeholder register",
    communicationPlan: "Communication plan",
    decisionLog: "Decision log",
    changeControl: "Change control",
    riskOpportunity: "Risks and opportunities",
    qualityChecklist: "Quality checklist",
    competenceMatrix: "Competence matrix",
    governanceCoverage: "Governance coverage",
    governanceMissing: "Missing IPMA fields",
    gateApprovals: "Gate approvals",
    openGovernanceRisk: "Open governance risks",
    ipmaReport: "IPMA report",
    gateExecutionError: "Execution requires charter, scope, success criteria and planning gate checklist.",
    gateClosedError: "Closed requires closure / lessons learned.",
    gateRequirementError: "Required IPMA fields for this gate are not complete.",
    platformCompanies: "Companies",
    companyStatus: "Status",
    companyPlan: "Plan",
    statusReason: "Reason",
    statusChangedBy: "Changed by",
    suspendCompany: "Suspend",
    activateCompany: "Activate",
    companySuspended: "Company is suspended.",
    projectImport: "Project import",
    projectImportHint: "Import accepts JSON backup, Excel CSV and MS Project XML files. CSV headers: Project, Task, Start, End, Status, Priority, Progress, Owner, Dependencies, Milestone.",
    adminActivity: "Admin activity",
    auditLogs: "Audit logs",
    mailHistory: "Mail history",
    refresh: "Refresh",
    importDone: "Import completed.",
    panelCompact: "Compact",
    panelWide: "Wide",
    workflowStatuses: "Workflow statuses",
    newWorkflowStatus: "New status",
    addWorkflowStatus: "Add status",
    requiredWorkflowStatus: "System status",
    testMail: "Test email",
    mailTestSent: "Test email was sent.",
    mailTestSkipped: "Test email was not sent. Check email settings.",
    ldapEnabled: "LDAP enabled",
    ldapUrl: "LDAP URL",
    ldapBaseDn: "Base DN",
    ldapUserFilter: "User filter",
    ldapBindDn: "Bind DN",
    ldapBindPassword: "Bind password",
    ldapGroupRoleMap: "Group-role mapping",
    saveSettings: "Save settings",
    settingsSaved: "Settings saved.",
    newTask: "New task",
    editTask: "Edit task",
    taskFormAria: "Task form",
    taskName: "Task name",
    taskNamePlaceholder: "Example: Router configuration",
    project: "Project",
    projectPlaceholder: "Example: Network upgrade",
    selectProject: "Select project",
    projects: "Projects",
    newProject: "New project",
    projectNamePlaceholder: "Project name",
    template: "Template",
    budget: "Budget (AZN)",
    projectDescription: "Short description",
    addProject: "Create project",
    editProject: "Edit project",
    archiveProject: "Archive",
    archivedProjects: "Archived projects",
    restoreProject: "Restore",
    projectFormAria: "Project form",
    projectName: "Project name",
    projectLeader: "Project leader",
    projectTeamMembers: "Team members",
    addSelectedTeamMembers: "Add to team",
    removeTeamMember: "Remove",
    createProjectFirst: "Create project first",
    projectPages: "Project pages",
    openProject: "Open project",
    addTaskToProject: "Add task",
    backgroundFocus: "Focus",
    backgroundPaper: "Paper",
    backgroundSteel: "Steel",
    backgroundSunrise: "Sunrise",
    backgroundAurora: "Aurora",
    backgroundCircuit: "Circuit",
    backgroundMist: "Morning mist",
    backgroundCarbon: "Carbon",
    backgroundCanopy: "Canopy",
    accentAmber: "Amber",
    accentRed: "Red",
    accentViolet: "Violet",
    accentSlate: "Slate",
    fatherName: "Father name",
    fullName: "Full name",
    email: "Email",
    position: "Position",
    phone: "Phone",
    address: "Address",
    company: "Company",
    manager: "Manager",
    userProfile: "User profile",
    saveProfile: "Save profile",
    responsibleManagers: "Responsible managers",
    selectManagers: "Select manager",
    selectedManagers: "Selected managers",
    noManagersSelected: "No manager selected",
    saveManagers: "Save managers",
    projectResource: "Project resource",
    noResource: "No resource selected",
    start: "Start",
    end: "End",
    status: "Status",
    priority: "Priority",
    priorityFilterAria: "Priority filter",
    owner: "Owner",
    noOwnerSelect: "Not selected",
    ownerPlaceholder: "Name or team",
    progress: "Progress %",
    plannedHours: "Planned hours",
    actualHours: "Actual hours",
    hoursSummary: "Hours plan/actual",
    workload: "Workload",
    teamCapacity: "Team capacity",
    capacityHours: "Capacity hours",
    timeEntries: "Time entries",
    addTimeEntry: "Add time",
    timeEntryNote: "Note",
    loggedBy: "Logged by",
    hours: "Hours",
    notes: "Notes",
    notesPlaceholder: "Write a short note",
    save: "Save",
    cancel: "Cancel",
    viewsAria: "Views",
    dashboard: "Dashboard",
    list: "Tasks",
    taskListTitle: "Task list",
    kanban: "Kanban",
    calendar: "Calendar",
    deadlineCalendar: "Calendar",
    rangeStart: "Start",
    rangeEnd: "End",
    selectedDay: "Selected day",
    advanced: "Advanced",
    projectAndTask: "Project and task",
    selectCalendarDay: "Select a day in the calendar.",
    noTaskOnDay: "No task for this day.",
    parentTask: "Parent task",
    noParentTask: "No parent task",
    taskDependencies: "Task dependencies",
    dependsOn: "Depends on",
    blocked: "Blocked",
    blockedBy: "Blocked by",
    dependencyStartBlocked: "This task cannot start until its dependency tasks are done.",
    gantt: "Gantt",
    searchPlaceholder: "Search task, project, owner",
    allProjects: "All projects",
    totalTasks: "Total tasks",
    activeTasks: "Active tasks",
    doneTasks: "Done tasks",
    projectDuration: "Project duration",
    executionStatus: "Execution status",
    upcomingTasks: "Upcoming tasks",
    tasks: "Tasks",
    statusFilterAria: "Status filter",
    ganttChart: "Gantt chart",
    noUpcoming: "No upcoming deadlines.",
    noTask: "No tasks. Add a new task from the form on the left.",
    noTaskFilter: "No tasks for this filter.",
    empty: "Empty",
    noOwner: "No owner",
    edit: "Edit",
    next: "Next",
    reopen: "Reopen",
    doneRequest: "Done",
    approveDone: "Approve",
    pendingDone: "Pending approval",
    confirmDone: "Are you sure this task is done?",
    reports: "Reports",
    projectReports: "Project reports",
    reportSummary: "Report summary",
    filteredTasks: "Filtered tasks",
    blockedTasks: "Blocked",
    requestedAt: "Done requested",
    approvedAt: "Approved at",
    executedBy: "Executor",
    saveTeam: "Save team",
    linkedUser: "Linked user",
    delete: "Delete",
    day: "days",
    invalidDate: "End date cannot be earlier than start date.",
    unassignedProject: "No project",
    resources: "Resources",
    newMember: "New owner",
    memberNamePlaceholder: "Full name",
    addMember: "Add person",
    newTeam: "New team",
    teamNamePlaceholder: "Team name",
    teamMembers: "Team members",
    addTeam: "Add team",
    linkProject: "Link to project",
    linkProjectPlaceholder: "Project name",
    resource: "Resource",
    addProjectLink: "Link",
    remove: "Remove",
    member: "Person",
    team: "Team",
    loginKicker: "Project access",
    loginTitle: "Sign in",
    username: "Username",
    login: "Login",
    password: "Password",
    subdomain: "Subdomain",
    confirmationCode: "Confirmation code",
    requestPasswordChange: "Send email confirmation",
    confirmPasswordChange: "Confirm password",
    passwordChangeSent: "Confirmation code was sent by email.",
    passwordChangeSkipped: "Email was not sent. Check user email and SMTP settings.",
    passwordChanged: "Password was changed.",
    loginButton: "Sign in",
    register: "Register",
    authBack: "Back",
    heroCta: "Sign in",
    heroRegisterCta: "Get started",
    heroEyebrow: "IPMA-aligned · Self-hosted",
    heroTitle: "Take full control of your projects",
    heroSub: "Your team, tasks and deadlines — all in one platform. Transparent, fast, reliable.",
    heroF1Title: "Multiple views", heroF1Desc: "Gantt, Kanban, Calendar and Table — your choice",
    heroF2Title: "Role system", heroF2Desc: "Admin, Manager, Contributor, Viewer, Sponsor — right access for everyone",
    heroF3Title: "Automatic notifications", heroF3Desc: "When a deadline approaches, your team gets an email — nothing is missed",
    heroF4Title: "Multi-tenant platform", heroF4Desc: "Every workspace is fully isolated with its own administration",
    heroF5Title: "Your own server", heroF5Desc: "Your data is never shared with any third parties",
    heroIpmaTitle: "Aligned with IPMA standard",
    heroIpmaDesc: "The platform is built around IPMA ICB 4.0: every project has its own Gate review, IPMA score, Governance section and sponsor oversight.",
    heroIpmaP1: "Gate / Milestone control", heroIpmaP2: "Sponsor, Manager, Contributor roles",
    heroIpmaP3: "IPMA Score & Report", heroIpmaP4: "Governance & Risk tracking",
    heroStat1: "Projects & tasks", heroStat2: "Role levels", heroStat3: "On your server",
    logout: "Logout",
    loginError: "Username or password is incorrect.",
    manageUsers: "Users",
    newUser: "New user",
    usernamePlaceholder: "username",
    passwordPlaceholder: "password",
    role: "Role",
    addUser: "Add user",
    changePassword: "Change password",
    newPassword: "New password",
    superAdminRole: "Super admin",
    adminRole: "Company admin",
    managerRole: "Manager",
    userRole: "User",
    contributorRole: "Contributor",
    viewerRole: "Viewer",
    sponsorRole: "Sponsor",
    comment: "Comment",
    comments: "Comments",
    addComment: "Add comment",
    commentPlaceholder: "Write a comment",
    noComments: "No comments",
    trash: "Trash",
    restore: "Restore",
    deleteForever: "Delete forever",
    deletedTask: "Deleted task",
    deletedProject: "Deleted project",
    attachments: "Files",
    chooseFiles: "Choose file",
    noFilesSelected: "No file selected",
    filesSelected: "file(s) selected",
    notify: "Notifications",
    notificationsEnabled: "Notifications enabled",
    notificationsBlocked: "Notification permission was not granted.",
    notificationCenter: "Notification center",
    markAllRead: "Mark all read",
    enableBrowserNotifications: "Enable browser notifications",
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
    backupPanel: "Backup / Restore",
    createBackup: "Create backup",
    restoreBackup: "Restore backup",
    saveImportMapping: "Save mapping",
    backupCreated: "Backup created.",
    dependencyRescheduled: "Dependent task dates were updated.",
    backupError: "Backup file could not be read.",
    risk: "Risk",
    projectRegisters: "Project registers",
    registerType: "Type",
    riskRegister: "Risk",
    issueRegister: "Issue",
    milestoneRegister: "Milestone",
    registerTitle: "Title",
    registerTitlePlaceholder: "Example: Go-live risk",
    impact: "Impact",
    impactLow: "Low",
    impactMedium: "Medium",
    impactHigh: "High",
    dueDate: "Due date",
    mitigation: "Mitigation / note",
    registerOpen: "Open",
    registerMonitoring: "Monitoring",
    registerResolved: "Resolved",
    addRegisterItem: "Add to register",
    registerSummary: "Register summary",
    deadlineAlerts: "Deadline alerts",
    overdue: "Overdue",
    dueSoon: "Due soon",
    dueToday: "Due today",
    noDeadlineAlerts: "No risky deadlines.",
    dateChangeRequests: "Date change requests",
    dateChangeRequested: "Date change was sent for manager approval.",
    approveDateChange: "Approve",
    rejectDateChange: "Reject",
    noDateRequests: "No open date requests.",
    roleMatrix: "Role permissions",
    fileTooLarge: "File is too large. Each file can be up to 800 KB.",
    all: "All",
    loadMore: "Load more",
    showingOf: (n, t) => `${n} / ${t} tasks`,
    resetPassword: "Reset password",
    resetPasswordEmail: "Email address",
    resetPasswordSend: "Send reset link",
    resetPasswordSent: "A password reset link has been sent to your email.",
    resetPasswordError: "Failed to send. Check the email address.",
    backToLogin: "Back to login",
    telegramSettings: "Telegram notifications",
    telegramEnabled: "Telegram enabled",
    telegramBotToken: "Bot Token",
    telegramChatId: "Chat ID",
    telegramHint: "Get a token from BotFather, send /start to your bot, find chat ID via @userinfobot.",
    testTelegram: "Test Telegram",
    templates: "Templates",
    newTemplate: "New template",
    templateName: "Template name",
    saveTemplate: "Save template",
    applyTemplate: "Apply template",
    deleteTemplate: "Delete template",
    noTemplates: "No templates yet. Save current tasks as a template.",
    templateTaskCount: (n) => `${n} tasks`,
    templateApplied: "Template applied.",
    timeWeek: "This week",
    timeChart: "Time analysis",
    totalHours: "Total hours",
    realtimeConnected: "Live sync active",
    realtimeDisconnected: "Offline — changes won't sync automatically",
    autoSnapshotSaved: "Auto-snapshot saved",
    statuses: { "Plan": "Plan", "Davam edir": "In progress", "Bitib": "Done" },
    priorities: { "Kritik": "Critical", "Normal": "Normal", "Yüksək": "High", "Aşağı": "Low" }
  }
};

// createId → modules/ids.js

// md5 → modules/crypto.js

const demoTaskTemplates = [
  {
    name: "Tələbləri toplamaq",
    project: "Internal portal",
    start: "2026-04-27",
    end: "2026-04-29",
    status: "Bitib",
    priority: "Yüksək",
    owner: "team:team-core",
    progress: 100,
    notes: "Layihənin məqsədləri və ekranları qeyd olunur."
  },
  {
    name: "Interface dizaynı",
    project: "Internal portal",
    start: "2026-04-30",
    end: "2026-05-05",
    status: "Davam edir",
    priority: "Yüksək",
    owner: "member:member-leyla",
    progress: 55,
    notes: "Əsas ekran, task forması və Gantt görünüşü hazırlanır."
  },
  {
    name: "Test və təhvil",
    project: "Customer rollout",
    start: "2026-05-06",
    end: "2026-05-09",
    status: "Plan",
    priority: "Normal",
    owner: "member:member-farid",
    progress: 0,
    notes: "Son yoxlamalar və istifadəçi testləri."
  },
  {
    name: "API gateway planı",
    project: "Mobile banking",
    start: "2026-05-01",
    end: "2026-05-04",
    status: "Davam edir",
    priority: "Yüksək",
    owner: "user:user-aysel",
    progress: 40,
    notes: "Mobile banking layihəsi üçün API gateway və security flow hazırlanır."
  },
  {
    name: "Notification service",
    project: "Mobile banking",
    start: "2026-05-05",
    end: "2026-05-08",
    status: "Plan",
    priority: "Normal",
    owner: "user:user-rashad",
    progress: 0,
    notes: "Push, email və deadline reminder bildirişləri bağlanır."
  },
  {
    name: "Inventory schema",
    project: "Warehouse ERP",
    start: "2026-05-02",
    end: "2026-05-06",
    status: "Davam edir",
    priority: "Yüksək",
    owner: "team:team-erp",
    progress: 35,
    notes: "Məhsul, anbar, hərəkət və audit cədvəlləri modelləşdirilir."
  },
  {
    name: "Barcode testləri",
    project: "Warehouse ERP",
    start: "2026-05-07",
    end: "2026-05-11",
    status: "Plan",
    priority: "Normal",
    owner: "user:user-nigar",
    progress: 0,
    notes: "Mobil scan və qəbul/təhvil workflow testləri."
  },
  {
    name: "Executive dashboard",
    project: "Analytics portal",
    start: "2026-05-03",
    end: "2026-05-09",
    status: "Plan",
    priority: "Yüksək",
    owner: "team:team-analytics",
    progress: 0,
    notes: "Rəhbərlik üçün KPI, overdue və performans dashboard-u."
  },
  {
    name: "Data export API",
    project: "Analytics portal",
    start: "2026-05-10",
    end: "2026-05-14",
    status: "Plan",
    priority: "Normal",
    owner: "user:user-aysel",
    progress: 0,
    notes: "PDF/Excel export endpoint-ləri və permission yoxlamaları."
  }
];

const demoMemberTemplates = [
  { id: "member-farid", name: "Farid Asadov" },
  { id: "member-leyla", name: "Leyla Aliyeva" },
  { id: "member-nicat", name: "Nicat Karimov" }
];

const demoTeamTemplates = [
  { id: "team-core", name: "Core Team", memberIds: ["member-farid", "member-leyla"] },
  { id: "team-network", name: "Network Team", memberIds: ["member-farid", "member-nicat"] },
  { id: "team-erp", name: "ERP Team", memberIds: ["user:user-rashad", "user:user-nigar"] },
  { id: "team-analytics", name: "Analytics Team", memberIds: ["user:user-aysel", "member-leyla"] }
];

const demoProjectLinks = [
  { id: "link-internal-core", project: "Internal portal", resource: "team:team-core" },
  { id: "link-customer-network", project: "Customer rollout", resource: "team:team-network" },
  { id: "link-mobile-aysel", project: "Mobile banking", resource: "user:user-aysel" },
  { id: "link-mobile-rashad", project: "Mobile banking", resource: "user:user-rashad" },
  { id: "link-erp-team", project: "Warehouse ERP", resource: "team:team-erp" },
  { id: "link-analytics-team", project: "Analytics portal", resource: "team:team-analytics" }
];

const demoProjects = [
  { id: "project-internal", name: "Internal portal", customerId: "customer-internal", managerIds: ["user-manager"], teamMemberIds: ["user:user-aysel", "user:user-rashad"], start: "2026-05-01", end: "2026-05-16", status: "Davam edir", priority: "Yüksək", progress: 55 },
  { id: "project-customer", name: "Customer rollout", customerId: "customer-azercell", managerIds: ["user-manager"], teamMemberIds: ["member:member-farid", "member:member-nicat"], start: "2026-05-03", end: "2026-05-18", status: "Plan", priority: "Normal", progress: 0 },
  { id: "project-mobile", name: "Mobile banking", customerId: "customer-bank", managerIds: ["user-manager", "user-manager-2"], teamMemberIds: ["user:user-aysel", "user:user-rashad"], start: "2026-05-06", end: "2026-05-24", status: "Davam edir", priority: "Yüksək", progress: 40 },
  { id: "project-erp", name: "Warehouse ERP", customerId: "customer-logistics", managerIds: ["user-manager-2"], teamMemberIds: ["user:user-rashad", "user:user-nigar"], start: "2026-05-09", end: "2026-05-25", status: "Davam edir", priority: "Yüksək", progress: 35 },
  { id: "project-analytics", name: "Analytics portal", customerId: "customer-internal", managerIds: ["user-manager"], teamMemberIds: ["user:user-aysel", "member:member-leyla"], start: "2026-05-12", end: "2026-05-27", status: "Plan", priority: "Normal", progress: 0 }
];

const clinicPortfolioProject = {
  id: "project-clinic-it-portfolio",
  name: "Klinika İT Portfeli",
  customerId: "customer-clinic",
  managerIds: ["user-manager"],
  teamMemberIds: [],
  start: "2025-10-15",
  end: "2026-12-31",
  status: "Davam edir",
  priority: "Yüksək",
  progress: 52
};

const clinicPortfolioTasks = [
  { name: "Əsas server otağı", owner: "SH-İnşaat", start: "2026-03-15", end: "2026-08-30", progress: 10, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Divarların hörgüsü tamamlanmışdır. Soyutma sisteminin və yanğınsöndürmə planlanması mərhələsi gedir. Soyutma sistemlərin çatdırılması sifariş verildikdən sonra 10-12 həftə ərzində olacağı deyilir. Əlavə təklif alınıb.\n\nElektrik və zəif axın xətləri yoxdur. Oda davamlı və standartlara cavab verən qapı yoxdur.\n\n15.05.2026 Valeh müəllim Vüsal müəllimlə tamamlanmanı danışacaq." },
  { name: "Digər server və kommunikasiya otaqları, Kabelləşmə və qurulum", owner: "SH-İnşaat", start: "2025-10-15", end: "2026-12-31", progress: 60, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Deadline qeydi: Davam edir. Planlaşdırılmış sahələrin cəmi 13 mərkəz, 5 əsas mərkəzi vardır. Mərkəzlərin problemləri qeyd olunaraq ƏTTİ -ə e-mail vasitəsi ilə bildirilib. Optik xətlərinin çəkilməsi gecikir. Bütün mərkəzlər mərtəbə elektrik açarlarına qoşulub. İş görülərkən mərkəzlər sönür. Mərkəzlər üçün nəzərdə tutulmuş UPS-lər rack kabinə yerləşmədiyindən dəyişdirilməsi gözlənilir.\n\n15.05.2026 Valeh müəllim Vüsal müəllimlə tamamlanmanı danışacaq." },
  { name: "Kabelləşmə və testlər qurulum", owner: "AZVOLT", start: "2026-03-23", end: "2026-12-31", progress: 80, priority: "Aşağı", notes: "Excel statusu: YAŞIL. Excel deadline serialı: 46028. Klinika və Tədris binası yekunlaşmaq üzrədir. Restoran binası test olundu. Smeta hazırlanır. Təcili yardım və Radiologiya testi sonlandırılıb. Binalar arası fiber optik kabellərin çəkilməsi gecikir.\n\n15.05.2026 Valeh müəllim Vüsal müəllimlə tamamlanmanı danışacaq." },
  { name: "Enerji və UPS", owner: "Azedunet + Klinika İT dept", start: "2026-03-23", end: "2026-12-31", progress: 55, priority: "Normal", notes: "Excel statusu: SARI. Excel deadline serialı: 46028. Kiçik UPS-lər mərkəzlərə quraşdırılır. Əsas server otağının UPS gözləmədə. Server otaqlarının enerjisinə dəstək üçün günəş paneli layihəsinə enerji sərfiyyatı ölçüldükdən sonra start veriləcək.\n\n05.05.2026 Kiçik UPS-lər (3Kva) dəyişilməlidir." },
  { name: "Şəbəkə və Təhlükəsizlik avadanlıqları", owner: "Klinika İT Şöbəsi + Azedunet", start: "2026-01-02", end: "2026-04-30", progress: 70, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Şəbəkə avadanlıqları qismən Bakıdadır.\n\nGecikir. Hissə-hissə göndərilməyə başlanılıb." },
  { name: "İnternet", owner: "Klinika İT dept", start: "2026-04-20", end: "2026-12-31", progress: 50, priority: "Normal", notes: "Excel statusu: SARI. Hal-hazırda Qarabağ Universitetinin müqaviləsinə əsasən fəaliyyət göstərir. 700 Mbps\n\nAylıq qiymətlər aşağıdakı kimidir:\n1. Əsas internet:\n  a. Azedunet: 8000 AZN\\Ay (1Gbps)\n  b. Aztelekom 5600 AZN\\Ay (1Gbps)\n  c. Azintelnet: 7000 AZN\\Ay (1Gbps) + Xəttin çəkilməsi 7500 AZN\n2. Backup İnternet:\n  a. Azedunet (Starlink 500 GB): 499,90 AZN\\Ay + Quraşdırılma və avadanlıq 1500 AZN\n  b. Azintelnet (Starlink 500 GB): 425 AZN\\Ay + Quraşdırılma və avadanlıq 1700 AZN\n  c. Starlink 500 GB: 204 AZN\\Ay + Quraşdırılma və avadanlıq 1110 AZN\n\nSamir Müəllimdən seçim gözlənilir." },
  { name: "Server avadanlıqları", owner: "Klinika İT Şöbəsi + Azedunet", start: "2026-01-02", end: "2026-05-30", progress: 75, priority: "Normal", notes: "Excel statusu: SARI. Server avadanlıqları May ayının sonu çatdırılması planlaşdırılıb." },
  { name: "Pusula + PACS server", owner: "Klinika İT Dept + Pusula", start: "2026-06-15", end: "2026-07-15", progress: 30, priority: "Normal", notes: "Excel statusu: SARI. Server otağı hazır olmasa belə avadanlıqlar təyin olunduğu zamanda çatdırılarsa, müvəqqəti digər server otaqlarında quraşdırılma ediləcək və Pusulanın quraşdırılması üçün şərait yaradılacaq. Pusuladan minimum tələb gözlənilir. Server planlaması aparılıb, lazımi server lisenziyaları alınıb lakin MS365 tenant gözləməsindədir. Əlavə otaqların hazırlanması üçün mövcud kondisionerlərin quraşdırılması lazımdır." },
  { name: "1C", owner: "Klinika İT dept + Təchizatçı", start: "2026-06-15", end: "2026-12-31", progress: 0, priority: "Normal", notes: "Excel statusu: SARI. İnfrastruktura tam qurulmasını gözləməlidir. Serverlər gəldikdə müəyyən güclə razılaşsalar tez başlatmaq olar.\n\nUpdate: Təchizatçı şirkət öz serveri üzərində hazırlamağa başlayacaq. NDA müqaviləsi hazırlanır." },
  { name: "Klinik Avadanlıqların inteqrasiyası", owner: "Klinika İT dept + Biomedikal + Pusula", start: "2026-06-15", end: "2026-07-15", progress: 30, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Klinikada olan tibbi avadanlıqların son durumu (sayı, adı), lisenziya durumu, avadanlıq tərəfinin sazlanması üçün biomedikal məlumatları işləməlidir. Şəbəkəyə qoşulma İT şöbəsi tərəfindən təmin olunacaqdır.\n\n13.05.2026 Təchizatçıya yeni tibbi avadanlıqlar inteqrasiyanın analizi göndərildi." },
  { name: "Radiologiya", owner: "Azedunet", start: "2026-01-05", end: "2026-05-15", progress: 15, priority: "Normal", notes: "Excel statusu: SARI. Şəbəkə testi yekunlaşmaq üzrədir." },
  { name: "Təcili Yardım", owner: "Azedunet + SH-İnşaat", start: "2026-01-03", end: "2026-12-31", progress: 45, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Deadline qeydi: Təmir davam edir. Təmirin bitməsi gözlənilir. Təmir prosesi gecikir (False floor, elektrik, havalandırma, qapı işləri yekunlaşmayıb). Kabellərin testi yekunlaşıb. Anons sistemi, növbə avadanlığı və RFİD izləmə sistemlərinin təklifləri hazırdır təqdim olunub." },
  { name: "Simulyasiya", owner: "Klinika İT dept + EMS", start: "2026-02-23", end: "2026-06-30", progress: 85, priority: "Normal", notes: "Excel statusu: SARI. İnfrastruktura tam qurulmasını gözləməlidir. Serverlərin son tənzimləmələri qalıb tam fəaliyyət üçün." },
  { name: "Zəng mərkəzi", owner: "Azedunet", start: "2026-01-08", end: "2026-10-08", progress: 50, priority: "Aşağı", notes: "Excel statusu: YAŞIL. Zənglərin qəbulu, seçimlər, zənglərin qeydiyyatı. Lisenziyaların qiymətləri deyilməlidir. Azedunetdən təklif gözlənilir." },
  { name: "Smart Anons", owner: "Klinika İT dept + ƏTTİ", start: "2026-12-03", end: "2026-12-31", progress: 75, priority: "Normal", notes: "Excel statusu: SARI. Deadline qeydi: Təsdiq gözlənilir. Mərkəzi paging sistemi planlanması hazırlanıb və Əşrəf bəyə təqdim olunub. Təcili yardım və Tədris binası ilk mərkəzə qoşulacaq. Avadanlıqlar sifarişdən 10 həftə ərzində çatdırılıb quraşdırılacaqdır." },
  { name: "Receptionlar üçün növbə", owner: "Klinika İT dept + ƏTTİ", start: "2026-03-28", end: "2026-12-31", progress: 60, priority: "Normal", notes: "Excel statusu: SARI. Deadline qeydi: Təsdiq gözlənilir. Mərkəzi sistem planı və təklifi hazırlanmışdır. Klinka giriş və təcili yardım üçün təklif göndərilib. Əşrəf bəyə təqdim olunub." },
  { name: "Restoran - Otel", owner: "Azedunet", start: "2026-04-24", end: "2026-12-31", progress: 30, priority: "Aşağı", notes: "Excel statusu: YAŞIL. Deadline qeydi: Smeta hazırlanıb. Otel-Restoran binasının İT infrastrukturu tam testə girdikdən sonra görüləcək işlər planlanacaqdır və smeta hazırlanacaqdır. Restoran idarəetmə sistemi seçilib (İİKOO). İP telefoniya və VİFİ şəbəkəsi təyin olunub. Smeta hazırdır." },
  { name: "RFİD invertar və izləmə", owner: "Klinika İT dept + ƏTTİ", start: "2026-02-19", end: "2026-12-31", progress: 40, priority: "Yüksək", notes: "Excel statusu: QIRMIZI. Deadline qeydi: Təsdiq gözlənilir. Mərkəzi sistem planı və təklifi hazırlanmışdır. Təcili yardım üçün təklif göndərilib. Əşrəf bəyə təqdim olunub. ƏTTİ komandasına yönləndirilib." },
  { name: "Layihə İdarəetməsi və Kommunikasiya", owner: "Klinika İT Şöbə Müdiri", start: "2026-01-01", end: "2026-12-31", progress: 48, priority: "Normal", notes: "Excel statusu: SARI. Başlama qeydi: Davamlı. Deadline qeydi: Davamlı. Daimi vendorlar və təchizatlarla (Azedunet, SH-İnşaat, AzVolt, Glassdoor, VİVA, Spectrum, ProAudio, MUK, Pusula və s.) görüşlər keçirilir. Xəstəxanalar və Universitetlə görüşlər keçirilir. Podratçıların gündəlik işlərinə nəzarət olunur və səhvlər aradan qaldırılır. Gündəlik tasklar vaxtında yerinə yetirilir." }
];

const clinicDependencyMap = {
  "Server avadanlıqları": ["Əsas server otağı", "Şəbəkə və Təhlükəsizlik avadanlıqları"],
  "Pusula + PACS server": ["Server avadanlıqları"],
  "1C": ["Server avadanlıqları"],
  "Klinik Avadanlıqların inteqrasiyası": ["Pusula + PACS server", "Şəbəkə və Təhlükəsizlik avadanlıqları"],
  "Smart Anons": ["İnternet", "Şəbəkə və Təhlükəsizlik avadanlıqları"],
  "Receptionlar üçün növbə": ["İnternet", "Şəbəkə və Təhlükəsizlik avadanlıqları"],
  "RFİD invertar və izləmə": ["Şəbəkə və Təhlükəsizlik avadanlıqları"]
};

const clinicMilestones = [
  { title: "Şəbəkə avadanlıqları ilkin çatdırılma", dueDate: "2026-04-30", impact: "High" },
  { title: "Server avadanlıqları çatdırılması", dueDate: "2026-05-30", impact: "Medium" },
  { title: "Pusula + PACS hazır mühit", dueDate: "2026-07-15", impact: "High" },
  { title: "Əsas server otağı yekun plan", dueDate: "2026-08-30", impact: "High" },
  { title: "Klinika İT portfeli yekun", dueDate: "2026-12-31", impact: "High" }
];

const demoCustomers = [
  { id: "customer-internal", name: "Internal", contact: "PMO", email: "pmo@example.com" },
  { id: "customer-azercell", name: "Azercell", contact: "Customer Office", email: "customer@example.com" },
  { id: "customer-bank", name: "Bank Client", contact: "Digital Banking", email: "bank@example.com" },
  { id: "customer-logistics", name: "Logistics Client", contact: "Operations", email: "ops@example.com" },
  { id: "customer-clinic", name: "Klinika", contact: "Klinika İT Şöbəsi", email: "" }
];

const demoUsers = [
  { id: "user-super-admin", username: "superadmin", passwordHash: md5("superadmin123"), role: "super_admin", managerId: "", companyId: "platform", profile: { fullName: "Platform Admin", email: "", fatherName: "", position: "Super Admin", phone: "", address: "", company: "Platform" } },
  { id: "user-admin", username: "adminklinika", passwordHash: md5("adminklinika123"), role: "admin", managerId: "", companyId: "company-default", profile: { fullName: "Klinika Admin", email: "", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Klinika" } },
  { id: "user-manager", username: "manager", passwordHash: md5("manager123"), role: "manager", managerId: "", companyId: "company-default", profile: { fullName: "Project Manager", email: "", fatherName: "", position: "Manager", phone: "", address: "", company: "Klinika" } },
  { id: "user-manager-2", username: "manager2", passwordHash: md5("manager123"), role: "manager", managerId: "", companyId: "company-digital", profile: { fullName: "Aysel Manager", email: "aysel.manager@example.com", fatherName: "", position: "Delivery Manager", phone: "", address: "", company: "Digital" } },
  { id: "user-demo", username: "user", passwordHash: md5("user123"), role: "user", managerId: "user-manager", companyId: "company-default", profile: { fullName: "Demo User", email: "", fatherName: "", position: "User", phone: "", address: "", company: "Klinika" } },
  { id: "user-aysel", username: "aysel", passwordHash: md5("user123"), role: "user", managerId: "user-manager", companyId: "company-default", profile: { fullName: "Aysel Mammadova", email: "aysel@example.com", fatherName: "", position: "Frontend developer", phone: "", address: "", company: "Klinika" } },
  { id: "user-rashad", username: "rashad", passwordHash: md5("user123"), role: "user", managerId: "user-manager-2", companyId: "company-digital", profile: { fullName: "Rashad Aliyev", email: "rashad@example.com", fatherName: "", position: "Backend developer", phone: "", address: "", company: "Digital" } },
  { id: "user-nigar", username: "nigar", passwordHash: md5("user123"), role: "user", managerId: "user-manager-2", companyId: "company-digital", profile: { fullName: "Nigar Karimova", email: "nigar@example.com", fatherName: "", position: "QA engineer", phone: "", address: "", company: "Digital" } }
];

const tenantSeedUsers = [
  { id: "user-admin-digital", username: "admindigital", passwordHash: md5("admindigital123"), role: "admin", managerId: "", companyId: "company-digital", profile: { fullName: "Digital Admin", email: "admin@digital.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Digital Solutions" } },
  { id: "user-admin-logistics", username: "adminlogistika", passwordHash: md5("adminlogistika123"), role: "admin", managerId: "", companyId: "company-logistics", profile: { fullName: "Logistika Admin", email: "admin@logistika.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Logistika Group" } },
  { id: "user-manager-logistics", username: "managerlogistika", passwordHash: md5("managerlogistika123"), role: "manager", managerId: "", companyId: "company-logistics", profile: { fullName: "Logistika Manager", email: "manager@logistika.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Logistika Group" } },
  { id: "user-admin-qarabag", username: "adminqarabag", passwordHash: md5("adminqarabag123"), role: "admin", managerId: "", companyId: "company-qarabag", profile: { fullName: "Qarabag Admin", email: "admin@qarabag.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Qarabag University" } },
  { id: "user-manager-qarabag", username: "managerqarabag", passwordHash: md5("managerqarabag123"), role: "manager", managerId: "", companyId: "company-qarabag", profile: { fullName: "Qarabag Manager", email: "manager@qarabag.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Qarabag University" } },
  { id: "user-admin-retail", username: "adminretail", passwordHash: md5("adminretail123"), role: "admin", managerId: "", companyId: "company-retail", profile: { fullName: "Retail Admin", email: "admin@retail.local", fatherName: "", position: "Company Admin", phone: "", address: "", company: "Retail Group" } },
  { id: "user-manager-retail", username: "managerretail", passwordHash: md5("managerretail123"), role: "manager", managerId: "", companyId: "company-retail", profile: { fullName: "Retail Manager", email: "manager@retail.local", fatherName: "", position: "Project Manager", phone: "", address: "", company: "Retail Group" } }
];

const tenantSeedCustomers = [
  { id: "customer-digital-solutions", companyId: "company-digital", name: "Digital Solutions", contact: "Digital PMO", email: "pmo@digital.local" },
  { id: "customer-logistics-group", companyId: "company-logistics", name: "Logistika Group", contact: "Operations Office", email: "ops@logistika.local" },
  { id: "customer-qarabag-university", companyId: "company-qarabag", name: "Qarabag University", contact: "Campus Operations", email: "ops@qarabag.local" },
  { id: "customer-retail-group", companyId: "company-retail", name: "Retail Group", contact: "Store Operations", email: "ops@retail.local" }
];

const tenantSeedProjects = [
  { id: "project-digital-crm", companyId: "company-digital", name: "Digital CRM Rollout", customerId: "customer-digital-solutions", managerIds: ["user-manager-2"], teamMemberIds: ["user:user-rashad", "user:user-nigar"], start: "2026-06-01", end: "2026-08-15", status: "Davam edir", priority: "Yüksək", progress: 28 },
  { id: "project-logistics-wms", companyId: "company-logistics", name: "Logistika WMS Modernizasiya", customerId: "customer-logistics-group", managerIds: ["user-manager-logistics"], teamMemberIds: [], start: "2026-06-10", end: "2026-09-30", status: "Plan", priority: "Normal", progress: 0 },
  { id: "project-qarabag-helpdesk", companyId: "company-qarabag", name: "Campus Helpdesk Platform", customerId: "customer-qarabag-university", managerIds: ["user-manager-qarabag"], teamMemberIds: [], start: "2026-07-01", end: "2026-10-15", status: "Plan", priority: "Yüksək", progress: 0 },
  { id: "project-qarabag-network", companyId: "company-qarabag", name: "Dormitory Network Expansion", customerId: "customer-qarabag-university", managerIds: ["user-manager-qarabag"], teamMemberIds: [], start: "2026-07-10", end: "2026-11-30", status: "Plan", priority: "Normal", progress: 0 },
  { id: "project-retail-pos", companyId: "company-retail", name: "Retail POS Upgrade", customerId: "customer-retail-group", managerIds: ["user-manager-retail"], teamMemberIds: [], start: "2026-06-20", end: "2026-09-20", status: "Davam edir", priority: "Yüksək", progress: 18 },
  { id: "project-retail-inventory", companyId: "company-retail", name: "Inventory Forecasting", customerId: "customer-retail-group", managerIds: ["user-manager-retail"], teamMemberIds: [], start: "2026-08-01", end: "2026-12-10", status: "Plan", priority: "Normal", progress: 0 }
];

const tenantSeedTasks = [
  { id: "task-digital-crm-01", project: "Digital CRM Rollout", name: "Tenant CRM scope", owner: "user:user-manager-2", start: "2026-06-01", end: "2026-06-12", status: "Davam edir", priority: "Yüksək", progress: 35, notes: "Digital şirkəti üçün CRM modulları və rollar dəqiqləşdirilir." },
  { id: "task-digital-crm-02", project: "Digital CRM Rollout", name: "Migration rehearsal", owner: "user:user-manager-2", start: "2026-06-15", end: "2026-06-28", status: "Plan", priority: "Normal", progress: 0, dependencyIds: ["task-digital-crm-01"], notes: "Müştəri datalarının test mühitinə köçürülməsi." },
  { id: "task-logistics-wms-01", project: "Logistika WMS Modernizasiya", name: "Anbar proses xəritəsi", owner: "user:user-manager-logistics", start: "2026-06-10", end: "2026-06-24", status: "Plan", priority: "Normal", progress: 0, notes: "Qəbul, yerləşdirmə, picking və dispatch prosesləri toplanır." },
  { id: "task-logistics-wms-02", project: "Logistika WMS Modernizasiya", name: "Barcode pilot", owner: "user:user-manager-logistics", start: "2026-06-25", end: "2026-07-08", status: "Plan", priority: "Yüksək", progress: 0, dependencyIds: ["task-logistics-wms-01"], notes: "Pilot anbar üçün barcode avadanlıq və test ssenariləri." },
  { id: "task-qarabag-helpdesk-01", project: "Campus Helpdesk Platform", name: "Ticket workflow", owner: "user:user-manager-qarabag", start: "2026-07-01", end: "2026-07-18", status: "Plan", priority: "Yüksək", progress: 0, notes: "Tələbə və əməkdaş müraciət axınları modelləşdirilir." },
  { id: "task-qarabag-network-01", project: "Dormitory Network Expansion", name: "Switch placement plan", owner: "user:user-manager-qarabag", start: "2026-07-10", end: "2026-07-28", status: "Plan", priority: "Normal", progress: 0, notes: "Yataqxana mərtəbələri üzrə switch və fiber xəritəsi hazırlanır." },
  { id: "task-retail-pos-01", project: "Retail POS Upgrade", name: "Pilot store rollout", owner: "user:user-manager-retail", start: "2026-06-20", end: "2026-07-05", status: "Davam edir", priority: "Yüksək", progress: 25, notes: "İlk mağazada POS terminal və receipt printer sınaqları." },
  { id: "task-retail-inventory-01", project: "Inventory Forecasting", name: "Sales data mapping", owner: "user:user-manager-retail", start: "2026-08-01", end: "2026-08-14", status: "Plan", priority: "Normal", progress: 0, notes: "Satış və stok tarixçəsi forecast modeli üçün xəritələnir." }
];

const tenantUserCompanyMigrations = {
  manager2: { companyId: "company-digital", company: "Digital Solutions" },
  rashad: { companyId: "company-digital", company: "Digital Solutions" },
  nigar: { companyId: "company-digital", company: "Digital Solutions" }
};

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
const quickManagerSaveBtn = document.querySelector("#quickManagerSave");
const quickManagerCancelBtn = document.querySelector("#quickManagerCancel");
const projectTeamMembersInput = document.querySelector("#projectTeamMembers");
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
let calendarRange = { start: "2026-05-01", end: "2026-05-31" };
let backendSyncReady = false;
let backendSaveTimer = 0;
let authToken = localStorage.getItem(authTokenKey) || "";
let supabaseSession = loadSupabaseSession();
let supabaseWorkspaceId = localStorage.getItem(supabaseWorkspaceKey) || "";
let supabaseSaveTimer = null;
let supabaseSettingsSaveTimer = null;
let supabaseAuditSyncedIds = new Set();
let supabaseNotificationSyncedIds = new Set();
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
enforceClinicOnlyState();
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
    const size = sizes[panel.dataset.dashboardPanel] || "normal";
    panel.classList.toggle("panel-compact", size === "compact");
    panel.classList.toggle("panel-wide", size === "wide");
    panel.querySelectorAll("[data-panel-size]").forEach((button) => {
      const active = button.dataset.panelSize === size;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.title = text(button.dataset.panelSize === "compact" ? "panelCompact" : "panelWide");
    });
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
}

function applyAppSettings() {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  const darkMode = appSettings.themeMode === "dark" || (appSettings.themeMode === "system" && prefersDark);
  document.body.classList.toggle("dark-mode", darkMode);
  document.body.dataset.background = appSettings.backgroundStyle;
  document.body.dataset.accent = appSettings.accentColor;
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

  statusFilters.innerHTML = [
    `<span class="filter-group-label">${text("status")}</span>`,
    `<button class="filter ${currentFilter === "Hamısı" ? "active" : ""}" data-filter="Hamısı" type="button">${text("all")}</button>`,
    ...statuses.map((status) => `<button class="filter ${currentFilter === status ? "active" : ""}" data-filter="${escapeHtml(status)}" type="button">${escapeHtml(statusLabel(status))}</button>`)
  ].join("");
  if (priorityFilters) {
    const priorities = ["Kritik", "Yüksək", "Normal", "Aşağı"];
    priorityFilters.innerHTML = [
      `<span class="filter-group-label">${text("priority")}</span>`,
      `<button class="filter ${currentPriorityFilter === "Hamısı" ? "active" : ""}" data-priority-filter="Hamısı" type="button">${text("all")}</button>`,
      ...priorities.map((priority) => `<button class="filter ${currentPriorityFilter === priority ? "active" : ""}" data-priority-filter="${escapeHtml(priority)}" type="button">${escapeHtml(priorityLabel(priority))}</button>`)
    ].join("");
  }
  if (smartFilters) {
    const smartItems = [
      ["Hamısı", text("all")],
      ["blocked", text("blockedTasks")],
      ["overdue", text("overdueTasks")],
      ["risk", text("riskFocus")],
      ["mine", text("myTasks")]
    ];
    smartFilters.innerHTML = [
      `<span class="filter-group-label">${text("smartFilters")}</span>`,
      ...smartItems.map(([value, label]) => `<button class="filter ${currentSmartFilter === value ? "active" : ""}" data-smart-filter="${escapeHtml(value)}" type="button">${escapeHtml(label)}</button>`)
    ].join("");
  }
  filters = document.querySelectorAll(".filter");
  priorityFilterButtons = document.querySelectorAll("[data-priority-filter]");
  smartFilterButtons = document.querySelectorAll("[data-smart-filter]");
}

function updateFilterLabels() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.textContent = button.dataset.filter === "Hamısı" ? text("all") : statusLabel(button.dataset.filter);
  });
  document.querySelectorAll("[data-priority-filter]").forEach((button) => {
    button.textContent = button.dataset.priorityFilter === "Hamısı" ? text("all") : priorityLabel(button.dataset.priorityFilter);
  });
  document.querySelectorAll("[data-smart-filter]").forEach((button) => {
    const labels = {
      "Hamısı": text("all"),
      blocked: text("blockedTasks"),
      overdue: text("overdueTasks"),
      risk: text("riskFocus"),
      mine: text("myTasks")
    };
    button.textContent = labels[button.dataset.smartFilter] || button.dataset.smartFilter;
  });
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

  tenantSeedUsers.forEach((user) => {
    if (!appState.users.some((item) => item.id === user.id || item.username === user.username)) {
      appState.users.push(normalizeUser({ ...user }));
      changedUsers = true;
    }
  });

  tenantSeedCustomers.forEach((customer) => {
    if (!appState.customers.some((item) => item.id === customer.id || item.name === customer.name)) {
      appState.customers.push(normalizeCustomer({ ...customer }));
      changedResources = true;
    }
  });

  tenantSeedProjects.forEach((project) => {
    if (!appState.projects.some((item) => item.id === project.id || item.name === project.name)) {
      appState.projects.push(normalizeProject({ ...project }));
      changedResources = true;
    }
  });

  tenantSeedTasks.forEach((task) => {
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
  return loadJson(customersKey, () => [{ id: "customer-clinic", name: "Klinika", contact: "Klinika İT Şöbəsi", email: "" }]).map(normalizeCustomer);
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

function saveLocalAuditLogs() {
  localStorage.setItem(localAuditKey, JSON.stringify(localAuditLogs.slice(0, 200)));
  syncSupabaseAuditLogs().catch((error) => console.warn("Supabase audit sync failed", error));
}

function saveNotifications() {
  localStorage.setItem(notificationsKey, JSON.stringify(notifications.slice(0, 200)));
  renderNotificationBadge();
  syncSupabaseNotifications().catch((error) => console.warn("Supabase notification sync failed", error));
}

function currentCompanyId() {
  return currentUser?.companyId || "company-default";
}

function projectCompanyId(project) {
  return project?.companyId || "company-default";
}

function taskCompanyId(task) {
  if (task?.companyId) return task.companyId;
  const project = appState.projects.find((item) => item.name === task?.project);
  return projectCompanyId(project);
}

function isSameCompany(item) {
  return projectCompanyId(item) === currentCompanyId();
}

function recordAudit(action, entityType, entityId, detail = "") {
  const entry = {
    id: createId(),
    action,
    actor: currentUser?.username || "system",
    companyId: currentCompanyId(),
    entity_type: entityType,
    entity_id: entityId,
    detail,
    created_at: new Date().toISOString()
  };
  localAuditLogs.unshift(entry);
  saveLocalAuditLogs();
  return entry;
}

function companyRegistryFromLocalState() {
  const existing = new Map((companyRegistry || []).map((company) => [company.id, { ...company }]));
  const usersByCompany = new Map();
  appState.users.forEach((user) => {
    if (user.role === "super_admin") return;
    const companyId = user.companyId || "company-default";
    const list = usersByCompany.get(companyId) || [];
    list.push(user);
    usersByCompany.set(companyId, list);
  });
  const projectCounts = new Map();
  appState.projects.forEach((project) => {
    const companyId = project.companyId || "company-default";
    projectCounts.set(companyId, (projectCounts.get(companyId) || 0) + 1);
  });
  const companyIds = new Set([...usersByCompany.keys(), ...projectCounts.keys(), ...existing.keys()].filter((id) => id && id !== "platform"));
  return [...companyIds].map((companyId) => {
    const companyUsers = usersByCompany.get(companyId) || [];
    const admin = companyUsers.find((user) => user.role === "admin");
    const name = existing.get(companyId)?.name || admin?.profile?.company || companyUsers[0]?.profile?.company || companyId.replace(/^company-/, "");
    const subdomain = existing.get(companyId)?.subdomain || slugFromName(name);
    return {
      id: companyId,
      name,
      subdomain,
      status: existing.get(companyId)?.status || "active",
      plan: existing.get(companyId)?.plan || "standard",
      adminUsername: admin?.username || existing.get(companyId)?.adminUsername || `admin${subdomain}`,
      userCount: companyUsers.length,
      projectCount: projectCounts.get(companyId) || 0,
      lastLoginAt: existing.get(companyId)?.lastLoginAt || "",
      createdAt: existing.get(companyId)?.createdAt || new Date().toISOString(),
      trialEndsAt: existing.get(companyId)?.trialEndsAt || "",
      subscriptionEndsAt: existing.get(companyId)?.subscriptionEndsAt || "",
      statusChangedAt: existing.get(companyId)?.statusChangedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      activatedAt: existing.get(companyId)?.activatedAt || existing.get(companyId)?.createdAt || new Date().toISOString(),
      suspendedAt: existing.get(companyId)?.suspendedAt || ""
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function addNotification(message, targetUserId = "", meta = {}) {
  notifications.unshift({
    id: createId(),
    message,
    targetUserId,
    companyId: currentCompanyId(),
    read: false,
    createdAt: new Date().toISOString(),
    ...meta
  });
  saveNotifications();
}

function visibleNotifications() {
  const companyId = currentCompanyId();
  return notifications.filter((item) => {
    const sameCompany = !item.companyId || item.companyId === companyId;
    const sameTarget = !item.targetUserId || item.targetUserId === currentUser?.id;
    return sameCompany && sameTarget;
  });
}

function renderNotificationBadge() {
  if (!notifyUnreadCount) return;
  const unreadCount = visibleNotifications().filter((item) => !item.read).length;
  notifyUnreadCount.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
  notifyUnreadCount.hidden = unreadCount === 0;
  notifyButton?.setAttribute("aria-label", unreadCount ? `${text("notify")}: ${unreadCount}` : text("notify"));
}

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

function companyStatusMeta(company) {
  const isSuspended = company.status === "suspended";
  const changedAt = company.statusChangedAt || (isSuspended ? company.suspendedAt : company.activatedAt) || company.createdAt;
  return {
    label: isSuspended ? "Dayandırılıb" : "Aktiv edilib",
    changedAt,
    activatedAt: company.activatedAt || company.createdAt || "",
    suspendedAt: company.suspendedAt || "",
    changedBy: company.statusChangedBy || "",
    reason: company.statusReason || "",
    duration: statusDurationLabel(changedAt)
  };
}

function companyProjectNames(companyId) {
  return new Set(appState.projects.filter((project) => (project.companyId || "company-default") === companyId).map((project) => project.name));
}

function companyOperationsMeta(company) {
  const projectNames = companyProjectNames(company.id);
  const companyTasks = appState.tasks.filter((task) => {
    if (task.companyId) return task.companyId === company.id;
    return projectNames.has(task.project);
  });
  const activeTasks = companyTasks.filter((task) => task.status !== "Bitib");
  const overdue = activeTasks.filter((task) => daysUntil(task.end) < 0).length;
  const blocked = activeTasks.filter(isTaskBlocked).length;
  const statusPenalty = company.status === "suspended" ? 25 : 0;
  const adminPenalty = company.adminUsername ? 0 : 15;
  const projectPenalty = Number(company.projectCount) ? 0 : 8;
  const healthScore = Math.max(0, Math.min(100, 100 - statusPenalty - adminPenalty - projectPenalty - overdue * 8 - blocked * 7));
  return {
    healthScore,
    taskCount: companyTasks.length,
    activeTasks: activeTasks.length,
    overdue,
    blocked,
    lastLoginAt: company.lastLoginAt || "",
    riskLevel: healthScore >= 85 ? "Stabil" : healthScore >= 65 ? "Nəzarət" : "Risk"
  };
}

function platformOpsSummary(registry) {
  const metas = registry.map((company) => companyOperationsMeta(company));
  const averageHealth = metas.length ? Math.round(metas.reduce((sum, item) => sum + item.healthScore, 0) / metas.length) : 100;
  const overdueTotal = metas.reduce((sum, item) => sum + item.overdue, 0);
  const blockedTotal = metas.reduce((sum, item) => sum + item.blocked, 0);
  const riskCompanies = metas.filter((item) => item.healthScore < 85 || item.overdue || item.blocked).length;
  const backups = Array.isArray(appSettings.backups) ? appSettings.backups : [];
  const lastBackup = backups[0]?.createdAt || "";
  const lastAudit = [...auditLogs, ...localAuditLogs].map((item) => item.created_at || item.createdAt).filter(Boolean).sort().at(-1);
  return {
    averageHealth,
    overdueTotal,
    blockedTotal,
    riskCompanies,
    lastBackup,
    backupCount: backups.length,
    lastAudit,
    mailReady: Boolean(appSettings.emailEnabled && appSettings.emailProvider)
  };
}

function companyBackupPayload(companyId = "") {
  const projectScope = companyId ? appState.projects.filter((project) => (project.companyId || "company-default") === companyId) : appState.projects;
  const projectNames = new Set(projectScope.map((project) => project.name));
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    companyId: companyId || "platform",
    company: companyId ? (companyRegistryFromLocalState().find((item) => item.id === companyId)?.name || companyId) : "All tenants",
    tasks: appState.tasks.filter((task) => projectNames.has(task.project) || (!companyId && task.project)),
    projects: projectScope,
    members: companyId ? appState.members.filter((member) => !member.companyId || member.companyId === companyId) : appState.members,
    teams: companyId ? appState.teams.filter((team) => !team.companyId || team.companyId === companyId) : appState.teams,
    customers: companyId ? appState.customers.filter((customer) => !customer.companyId || customer.companyId === companyId) : appState.customers,
    managedFiles: companyId ? appState.managedFiles.filter((file) => !file.companyId || file.companyId === companyId) : appState.managedFiles,
    projectLinks: appState.projectLinks.filter((link) => projectNames.has(link.project) || !companyId),
    registers: appState.registers.filter((item) => projectNames.has(item.project) || !companyId),
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

function getProject(task) {
  return task.project || text("unassignedProject");
}

function projectExists(name) {
  return appState.projects.some((project) => project.name === name);
}

function createProject(name, details = {}) {
  const cleanName = name.trim();
  const companyId = currentCompanyId();
  if (!cleanName || appState.projects.some((project) => project.companyId === companyId && project.name.toLowerCase() === cleanName.toLowerCase())) return false;
  const defaultManagerId = currentUser?.role === "manager"
    ? currentUser.id
    : appState.users.find((user) => user.role === "manager" && user.companyId === companyId)?.id || "";
  const managerIds = details.managerId ? [details.managerId] : (defaultManagerId ? [defaultManagerId] : []);
  const progress = Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  const project = normalizeProject({
    id: createId(),
    name: cleanName,
    companyId,
    customerId: details.customerId || "",
    managerIds,
    teamMemberIds: details.teamMemberIds || [],
    start: details.start || "",
    end: details.end || "",
    status: details.status || "Plan",
    priority: details.priority || "Normal",
    progress: details.status === "Bitib" ? 100 : progress,
    lifecycle: details.lifecycle || "Initiation",
    description: details.description || "",
    budget: Math.max(0, Number(details.budget) || 0),
    charter: details.charter || {}
  });
  appState.projects.push(project);
  project.teamMemberIds.forEach((resource) => {
    if (!appState.projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
      appState.projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  syncGovernanceRisks(project);
  recordAudit("project.created", "project", project.id, project.name);
  return project;
}

function updateProject(projectId, details = {}) {
  const project = appState.projects.find((item) => item.id === projectId);
  if (!project) return null;
  const cleanName = details.name.trim();
  const companyId = project.companyId || currentCompanyId();
  if (!cleanName || appState.projects.some((item) => item.id !== projectId && item.companyId === companyId && item.name.toLowerCase() === cleanName.toLowerCase())) return null;
  const previousName = project.name;
  project.name = cleanName;
  project.customerId = details.customerId || "";
  project.managerIds = details.managerId ? [details.managerId] : [];
  project.teamMemberIds = details.teamMemberIds || [];
  project.start = details.start || "";
  project.end = details.end || "";
  project.status = details.status || "Plan";
  project.priority = details.priority || "Normal";
  project.progress = project.status === "Bitib" ? 100 : Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  project.lifecycle = details.lifecycle || project.lifecycle || "Initiation";
  project.description = String(details.description || "");
  project.budget = Math.max(0, Number(details.budget) || 0);
  project.charter = { ...(project.charter || {}), ...(details.charter || {}) };
  if (previousName !== cleanName) {
    appState.tasks = appState.tasks.map((task) => task.project === previousName ? { ...task, project: cleanName } : task);
    appState.projectLinks = appState.projectLinks.map((link) => link.project === previousName ? { ...link, project: cleanName } : link);
    appState.registers = appState.registers.map((item) => item.project === previousName ? { ...item, project: cleanName } : item);
    saveTasks();
    saveRegisters();
  }
  appState.projectLinks = appState.projectLinks.filter((link) => link.project !== cleanName || !link.resource.startsWith("user:"));
  project.teamMemberIds.forEach((resource) => {
    if (!appState.projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
    appState.projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  syncGovernanceRisks(project);
  recordAudit("project.updated", "project", project.id, project.name);
  return project;
}

function projectGateError(payload) {
  const charter = payload.charter || {};
  const gateCount = Array.isArray(charter.gateChecklist) ? charter.gateChecklist.length : 0;
  if (["Execution", "Monitoring", "Closing", "Closed"].includes(payload.lifecycle)) {
    if (!charter.goal || !charter.scope || !charter.successCriteria || gateCount === 0) {
      return text("gateExecutionError");
    }
  }
  if (payload.lifecycle === "Closed" && !charter.closureNotes) {
    return text("gateClosedError");
  }
  return "";
}

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

function customerLabel(customerId) {
  if (!customerId) return text("empty");
  const customer = appState.customers.find((item) => item.id === customerId);
  return customer?.name || text("empty");
}

function canSeeProject(project) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (projectCompanyId(project) !== currentCompanyId()) return false;
  if (isAdmin()) return true;
  return projectHasRoleAccess(project)
    || projectHasResourceAccess(project.name)
    || appState.tasks.some((task) => task.project === project.name && taskHasDirectAccess(task));
}

function visibleProjects() {
  return appState.projects.filter((project) => !project.archived).filter(canSeeProject);
}

function canSeeTask(task) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (taskCompanyId(task) !== currentCompanyId()) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  if (isAdmin() && (!project || isSameCompany(project))) return true;
  return projectHasRoleAccess(project)
    || taskHasDirectAccess(task)
    || projectHasResourceAccess(task.project);
}

function accessibleTasks() {
  return appState.tasks.filter(canSeeTask);
}

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

function resourceLabel(value) {
  if (!value) return text("noOwner");
  const [type, id] = value.split(":");
  if (type === "user") {
    const user = appState.users.find((item) => item.id === id);
    return user ? user.profile?.fullName || user.username : value;
  }
  if (type === "member") {
    const member = appState.members.find((item) => item.id === id);
    return member ? member.name : value;
  }
  if (type === "team") {
    const team = appState.teams.find((item) => item.id === id);
    return team ? team.name : value;
  }
  return value;
}

function userDisplayLabel(username) {
  const user = appState.users.find((item) => item.username === username || item.id === username);
  return user ? user.profile?.fullName || user.username : username || "";
}

function resourceTypeLabel(value) {
  if (value.startsWith("user:")) return text("userRole");
  return value.startsWith("team:") ? text("team") : text("member");
}

function roleLabel(role) {
  if (role === "super_admin") return text("superAdminRole");
  if (role === "admin") return text("adminRole");
  if (role === "manager") return text("managerRole");
  if (role === "contributor") return text("contributorRole");
  if (role === "viewer") return text("viewerRole");
  if (role === "sponsor") return text("sponsorRole");
  return text("userRole");
}

function managerOptions(selectedId = "") {
  const companyId = currentCompanyId();
  return [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...appState.users
      .filter((user) => user.role === "manager" && user.companyId === companyId)
      .map((user) => {
        const label = user.profile?.fullName ? `${user.profile.fullName} (${user.username})` : user.username;
        return `<option value="${user.id}" ${user.id === selectedId ? "selected" : ""}>${escapeHtml(label)}</option>`;
      })
  ].join("");
}

function managerMultiOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return appState.users
    .filter((user) => user.role === "manager" && user.companyId === companyId)
    .map((user) => `<option value="${user.id}" ${selectedIds.includes(user.id) ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
    .join("");
}

function allResourceOptions() {
  const companyId = currentCompanyId();
  return [
    ...appState.users.filter((user) => !["admin", "super_admin"].includes(user.role) && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) })),
    ...appState.teams.filter((team) => isSameCompany(team)).map((team) => ({ value: resourceValue("team", team.id), label: team.name, type: text("team") }))
  ];
}

function teamMemberOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return [
    ...appState.users.filter((user) => !["admin", "super_admin"].includes(user.role) && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) }))
  ].map((option) => `<option value="${option.value}" ${selectedIds.includes(option.value) ? "selected" : ""}>${option.type}: ${escapeHtml(option.label)}</option>`).join("");
}

function taskOptionItems(selectedIds = [], excludedId = "") {
  return accessibleTasks()
    .filter((task) => task.id !== excludedId)
    .map((task) => `<option value="${task.id}" ${selectedIds.includes(task.id) ? "selected" : ""}>${escapeHtml(task.name)} (${escapeHtml(getProject(task))})</option>`)
    .join("");
}

function ensureSelectOption(select, value, label = "") {
  if (!select || !value || [...select.options].some((option) => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label || value;
  select.appendChild(option);
}

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

function linkedResourcesForProject(project) {
  const directLinks = appState.projectLinks.filter((link) => link.project === project).map((link) => link.resource);
  const projectMembers = appState.projects.find((item) => item.name === project)?.teamMemberIds || [];
  return [...new Set([...directLinks, ...projectMembers])];
}

function resourceIncludesUser(resource, userId) {
  if (!resource || !userId) return false;
  if (resource === resourceValue("user", userId)) return true;
  if (!resource.startsWith("team:")) return false;
  const teamId = resource.split(":")[1];
  const team = appState.teams.find((item) => item.id === teamId);
  return Boolean(team?.memberIds?.some((memberId) => memberId === userId || memberId === resourceValue("user", userId)));
}

function visibleUserIdsForCurrentUser() {
  if (!currentUser) return [];
  if (isSuperAdmin()) return [];
  if (isAdmin()) return appState.users.filter((user) => user.companyId === currentCompanyId()).map((user) => user.id);
  if (currentUser.role === "manager") return [currentUser.id, ...managerUsers(currentUser.id).map((user) => user.id)];
  return [currentUser.id];
}

function resourceInCurrentScope(resource) {
  return visibleUserIdsForCurrentUser().some((userId) => resourceIncludesUser(resource, userId));
}

function projectHasRoleAccess(project) {
  if (!project || !currentUser) return false;
  const managerIds = project.managerIds || [];
  if (["manager", "sponsor"].includes(currentUser.role)) return managerIds.includes(currentUser.id);
  if (["user", "contributor", "viewer"].includes(currentUser.role)) return Boolean(currentUser.managerId && managerIds.includes(currentUser.managerId));
  return false;
}

function taskHasDirectAccess(task) {
  return [task.owner, task.projectResource].some(resourceInCurrentScope);
}

function projectHasResourceAccess(projectName) {
  return linkedResourcesForProject(projectName).some(resourceInCurrentScope);
}

function visibleRegisters(projectName = "") {
  return appState.registers.filter((item) => {
    if (projectName && item.project !== projectName) return false;
    const project = appState.projects.find((candidate) => candidate.name === item.project);
    return !project || canSeeProject(project);
  });
}

function registerCounts(projectName = "") {
  const items = visibleRegisters(projectName).filter((item) => item.status !== "Resolved");
  return {
    risks: items.filter((item) => item.type === "risk").length,
    issues: items.filter((item) => item.type === "issue").length,
    milestones: items.filter((item) => item.type === "milestone").length
  };
}

function projectHasOpenRisk(projectName) {
  return visibleRegisters(projectName).some((item) => item.status !== "Resolved" && ["risk", "issue"].includes(item.type));
}

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

function plannedHoursForTask(task) {
  return Number(task.plannedHours) || 0;
}

function actualHoursForTask(task) {
  const entries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  if (!entries.length) return Number(task.actualHours) || 0;
  return Math.round(entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0) * 100) / 100;
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

function isAdmin() {
  return currentUser?.role === "admin";
}

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

function isSuperAdmin() {
  return currentUser?.role === "super_admin";
}

function canOpenAdminPanel() {
  return isSuperAdmin() || isOrgAdmin();
}

// Platform parametrləri: yalnız super_admin
// Telebe-Hotel: requireSuperAdminAuth
function canManagePlatformSettings() {
  return isSuperAdmin();
}

// Şirkət/mail parametrləri: super_admin + org admin
// Telebe-Hotel: requireOrgAdmin
function canManageOrgSettings() {
  return isSuperAdmin() || isOrgAdmin();
}

function canManageMailSettings() {
  return canManageOrgSettings();
}

// İstifadəçi idarəsi: yalnız super_admin + org admin
// Telebe-Hotel: moderator istifadəçi əlavə/silə BİLMƏZ
function canManageOrgUsers() {
  return isSuperAdmin() || isOrgAdmin();
}

// Layihə idarəsi: org admin + manager (telebe-hotel: admin + moderator)
function canManageProjects() {
  return ["admin", "manager"].includes(currentUser?.role);
}

// Tapşırıq idarəsi: org admin + manager (əvvəlki kimi)
function canManageTasks() {
  return ["admin", "manager"].includes(currentUser?.role);
}

function canContribute() {
  return ["admin", "manager", "user", "contributor"].includes(currentUser?.role);
}

function canApproveGovernance() {
  return ["admin", "manager", "sponsor"].includes(currentUser?.role);
}

// Register idarəsi: admin (bütün şirkət), manager (öz layihəsi)
function canManageRegister(item) {
  if (!currentUser) return false;
  if (isSuperAdmin()) return false;
  if (isOrgAdmin()) return true;
  if (currentUser.role === "manager") {
    const project = appState.projects.find((p) => p.name === item.project);
    return !!(project?.managerIds?.includes(currentUser.id));
  }
  return false;
}

// Status dəyişikliyi: admin + manager (öz layihəsi) + sponsor (öz layihəsi)
function canChangeRegisterStatus(item) {
  if (!currentUser) return false;
  if (isOrgAdmin()) return true;
  if (["manager", "sponsor"].includes(currentUser.role)) {
    const project = appState.projects.find((p) => p.name === item.project);
    return !!(project?.managerIds?.includes(currentUser.id));
  }
  return false;
}

function canApproveDateRequest(task) {
  if (isOrgAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}

function canApproveTask(task) {
  if (isOrgAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = appState.projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}

function openAdminPanel() {
  if (!currentUser || !canOpenAdminPanel()) return;
  closeAdminSection();
  raiseModal(adminModal);
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden", "false");
  closeAdminPanelButton.focus();
  fetchAuditLogs();
  fetchMailHistory();
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
  const myCustomers = appState.customers.filter((c) => !c.companyId || c.companyId === companyId);
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

  // Layihələrim
  const mgrProjectList = document.querySelector("#mgrProjectList");
  if (mgrProjectList) {
    mgrProjectList.innerHTML = myProjects.length
      ? myProjects.map((p) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(p.name)}</strong>
              ${escapeHtml(p.status || "")} · ${p.progress || 0}% · ${shortDate(p.start)} → ${shortDate(p.end)}
            </span>
            <button type="button" data-mgr-open-project="${escapeHtml(p.name)}">Aç</button>
          </div>`).join("")
      : `<div class="empty">Sizə aid layihə yoxdur</div>`;
  }

  // Komanda üzvlərim
  const mgrTeamList = document.querySelector("#mgrTeamList");
  if (mgrTeamList) {
    mgrTeamList.innerHTML = myTeam.length
      ? myTeam.map((u) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(u.profile?.fullName || u.username)}</strong>
              ${escapeHtml(roleLabel(u.role))} · ${escapeHtml(u.username)}
              ${u.profile?.position ? ` · ${escapeHtml(u.profile.position)}` : ""}
            </span>
          </div>`).join("")
      : `<div class="empty">Komanda üzvü yoxdur</div>`;
  }

  // Tarix sorğuları
  const mgrDateRequestList = document.querySelector("#mgrDateRequestList");
  if (mgrDateRequestList) {
    mgrDateRequestList.innerHTML = myDateRequests.length
      ? myDateRequests.map((r) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(r.taskName || r.taskId)}</strong>
              ${escapeHtml(r.requester || "")} · ${shortDate(r.newEnd)}
              ${r.reason ? `<small>${escapeHtml(r.reason)}</small>` : ""}
            </span>
            <div class="mini-actions">
              <button type="button" data-mgr-date-approve="${r.id}">Təsdiqlə</button>
              <button type="button" data-mgr-date-reject="${r.id}" class="danger">Rədd et</button>
            </div>
          </div>`).join("")
      : `<div class="empty">Gözləyən sorğu yoxdur</div>`;
  }

  // Registerlar
  const mgrRegisterList = document.querySelector("#mgrRegisterList");
  if (mgrRegisterList) {
    mgrRegisterList.innerHTML = myRegisters.length
      ? myRegisters.map((r) => `
          <div class="resource-item register-item ${escapeHtml(r.type)}">
            <span>
              <strong>${escapeHtml(r.title)}</strong>
              ${escapeHtml(r.project)} · ${registerTypeLabel(r.type)} · ${escapeHtml(registerStatusLabel(r.status))}
              ${r.mitigation ? `<small>${escapeHtml(r.mitigation)}</small>` : ""}
            </span>
            <button type="button" data-mgr-register-delete="${r.id}">${text("remove")}</button>
          </div>`).join("")
      : `<div class="empty">Aktiv register yoxdur</div>`;
  }

  // Register project seçimi
  const mgrRegisterProject = document.querySelector("#mgrRegisterProject");
  if (mgrRegisterProject) {
    mgrRegisterProject.innerHTML = myProjects.map((p) =>
      `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)}</option>`
    ).join("");
  }

  // Komandalar
  const mgrTeamGroupList = document.querySelector("#mgrTeamGroupList");
  if (mgrTeamGroupList) {
    mgrTeamGroupList.innerHTML = myTeamGroups.length
      ? myTeamGroups.map((t) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(t.name)}</strong>
              ${(t.memberIds || []).length} üzv
            </span>
            <button type="button" data-mgr-team-delete="${t.id}">${text("remove")}</button>
          </div>`).join("")
      : `<div class="empty">Komanda yoxdur</div>`;
  }

  // Team members for new team select
  const mgrNewTeamMembers = document.querySelector("#mgrNewTeamMembers");
  if (mgrNewTeamMembers) {
    mgrNewTeamMembers.innerHTML = appState.users
      .filter((u) => !["admin", "super_admin"].includes(u.role) && u.companyId === companyId)
      .map((u) => `<option value="${u.id}">${escapeHtml(u.profile?.fullName || u.username)}</option>`)
      .join("");
  }

  // Sifarişçilər
  const mgrCustomerList = document.querySelector("#mgrCustomerList");
  if (mgrCustomerList) {
    mgrCustomerList.innerHTML = myCustomers.length
      ? myCustomers.map((c) => `
          <div class="resource-item">
            <span><strong>${escapeHtml(c.name)}</strong>${c.contact ? ` · ${escapeHtml(c.contact)}` : ""}</span>
          </div>`).join("")
      : `<div class="empty">Sifarişçi yoxdur</div>`;
  }

  // Layihə bağlantıları
  const mgrLinkList = document.querySelector("#mgrLinkList");
  if (mgrLinkList) {
    mgrLinkList.innerHTML = myLinks.length
      ? myLinks.map((l) => `
          <div class="resource-item">
            <span>
              <strong>${escapeHtml(l.project)}</strong> → ${escapeHtml(resourceLabel(l.resource))}
            </span>
            <button type="button" data-mgr-link-delete="${l.id}">${text("remove")}</button>
          </div>`).join("")
      : `<div class="empty">Bağlantı yoxdur</div>`;
  }

  // Zibil qutusu
  const mgrTrashList = document.querySelector("#mgrTrashList");
  if (mgrTrashList) {
    mgrTrashList.innerHTML = myTrash.length
      ? myTrash.map((t) => {
          const title = t.type === "task" ? t.data.name : (t.data.project || t.data.name);
          return `
            <div class="resource-item">
              <span><strong>${escapeHtml(title)}</strong>${t.type === "task" ? " — tapşırıq" : " — layihə"}</span>
              <div class="mini-actions">
                <button type="button" data-mgr-trash-restore="${t.id}">${text("restore")}</button>
                <button type="button" data-mgr-trash-delete="${t.id}" class="danger">${text("deleteForever")}</button>
              </div>
            </div>`;
        }).join("")
      : `<div class="empty">Zibil qutusu boşdur</div>`;
  }
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

function managerChoiceItems(selectedIds = []) {
  const managers = appState.users.filter((user) => user.role === "manager");
  return managers.length ? managers.map((user) => `
    <label class="manager-choice">
      <input type="checkbox" name="projectManager" value="${user.id}" ${selectedIds.includes(user.id) ? "checked" : ""}>
      <span>
        <strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>
        <small>${escapeHtml(user.username)}</small>
      </span>
    </label>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

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

function syncAuthView() {
  document.body.classList.toggle("logged-in", Boolean(currentUser));
  document.body.classList.toggle("logged-out", !currentUser);
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

  const selectedProject = projectInput.value.trim();
  const linked = selectedProject ? linkedResourcesForProject(selectedProject) : [];
  const projectOptions = linked.length ? options.filter((option) => linked.includes(option.value)) : options;
  const currentProjectResource = projectResourceInput.value;
  projectResourceInput.innerHTML = [
    `<option value="">${text("noResource")}</option>`,
    ...projectOptions.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
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

  projectList.innerHTML = scopedProjects.length ? scopedProjects.map((project) => {
    const taskCount = scopedTasks.filter((task) => task.project === project.name).length;
    const managerNames = projectManagers(project).map((user) => user.username);
    const memberNames = (project.teamMemberIds || []).map(resourceLabel).filter(Boolean);
    return `
      <div class="resource-item">
        <span><strong>${escapeHtml(project.name)}</strong>${text("customer")}: ${escapeHtml(customerLabel(project.customerId))} · ${taskCount} ${text("tasks")} · ${shortDate(project.start)} - ${shortDate(project.end)} · ${statusLabel(project.status)} · ${priorityLabel(project.priority)} · ${Number(project.progress) || 0}%</span>
        <div class="user-actions">
          <span class="manager-summary"><strong>${text("responsibleManagers")}</strong>${escapeHtml(managerNames.join(", ") || text("noManagersSelected"))}</span>
          <span class="manager-summary"><strong>${text("projectTeamMembers")}</strong>${escapeHtml(memberNames.join(", ") || text("empty"))}</span>
          <div class="mini-actions">
            <button type="button" data-resource-action="open-project-managers" data-id="${project.id}">${text("selectManagers")}</button>
          </div>
        </div>
      </div>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;

  teamList.innerHTML = scopedTeams.length ? scopedTeams.map((team) => {
    const values = (team.memberIds || []).map((id) => id.includes(":") ? id : resourceValue("member", id));
    const names = values.map(resourceLabel).filter(Boolean);
    return `
      <details class="user-profile-card">
        <summary><span><strong>${escapeHtml(team.name)}</strong>${escapeHtml(names.join(", ") || text("empty"))}</span></summary>
        <div class="resource-body">
          <label>
            <span>${text("newTeam")}</span>
            <input class="team-edit-name" data-team-id="${team.id}" value="${escapeHtml(team.name)}">
          </label>
          <label>
            <span>${text("teamMembers")}</span>
            <select class="team-edit-members" data-team-id="${team.id}" multiple size="5">${teamMemberOptions(values)}</select>
          </label>
          <div class="mini-actions">
            <button type="button" data-resource-action="save-team" data-id="${team.id}">${text("saveTeam")}</button>
            <button type="button" data-resource-action="delete-team" data-id="${team.id}">${text("remove")}</button>
          </div>
        </div>
      </details>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;

  projectLinksList.innerHTML = scopedLinks.length ? scopedLinks.map((link) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(link.project)}</strong>${resourceTypeLabel(link.resource)}: ${escapeHtml(resourceLabel(link.resource))}</span>
      <button type="button" data-resource-action="delete-link" data-id="${link.id}">${text("remove")}</button>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;

  registerList.innerHTML = scopedRegisters.length ? scopedRegisters.map((item) => {
    const canMgr = canManageRegister(item);
    const canStatus = canChangeRegisterStatus(item);
    const statusCycle = { Open: "Monitoring", Monitoring: "Resolved", Resolved: "Open" };
    const statusNext = statusCycle[item.status] || "Open";
    const statusLabel = { Open: "👁 Monitor et", Monitoring: "✓ Həll et", Resolved: "↺ Yenidən aç" };
    return `
    <div class="resource-item register-item ${escapeHtml(item.type)}">
      <div class="register-main">
        <div class="register-header">
          <span class="reg-type-badge reg-${escapeHtml(item.type)}">${registerTypeLabel(item.type)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <span class="reg-project">${escapeHtml(item.project)}</span>
        </div>
        <div class="register-meta">
          ${canMgr ? `
            <label class="reg-inline-label">Status
              <select data-register-field="status" data-id="${item.id}">
                <option value="Open" ${item.status === "Open" ? "selected" : ""}>Open</option>
                <option value="Monitoring" ${item.status === "Monitoring" ? "selected" : ""}>Monitoring</option>
                <option value="Resolved" ${item.status === "Resolved" ? "selected" : ""}>Resolved</option>
              </select>
            </label>
            <label class="reg-inline-label">Impact
              <select data-register-field="impact" data-id="${item.id}">
                <option value="Low" ${item.impact === "Low" ? "selected" : ""}>Low</option>
                <option value="Medium" ${item.impact === "Medium" ? "selected" : ""}>Medium</option>
                <option value="High" ${item.impact === "High" ? "selected" : ""}>High</option>
              </select>
            </label>
            ${item.dueDate ? `<span class="reg-meta-chip">📅 ${shortDate(item.dueDate)}</span>` : ""}
            ${item.owner ? `<span class="reg-meta-chip">👤 ${escapeHtml(resourceLabel(item.owner))}</span>` : ""}
          ` : `
            <span class="reg-status-chip reg-status-${escapeHtml(item.status)}">${escapeHtml(registerStatusLabel(item.status))}</span>
            <span class="reg-impact-chip">${impactLabel(item.impact)}</span>
            ${item.dueDate ? `<span class="reg-meta-chip">📅 ${shortDate(item.dueDate)}</span>` : ""}
            ${item.owner ? `<span class="reg-meta-chip">👤 ${escapeHtml(resourceLabel(item.owner))}</span>` : ""}
          `}
        </div>
        ${canMgr
          ? `<input class="reg-mitigation-input" type="text" placeholder="Azaldıcı tədbirlər..." value="${escapeHtml(item.mitigation || "")}" data-register-field="mitigation" data-id="${item.id}">`
          : item.mitigation ? `<small class="reg-mitigation-text">${escapeHtml(item.mitigation)}</small>` : ""}
      </div>
      <div class="register-actions">
        ${canStatus ? `<button type="button" class="reg-status-btn" data-register-action="status" data-id="${item.id}" data-next="${statusNext}">${statusLabel[item.status] || "Status"}</button>` : ""}
        ${canMgr ? `<button type="button" class="danger" data-register-action="delete" data-id="${item.id}">${text("remove")}</button>` : ""}
      </div>
    </div>`;
  }).join("") : `<div class="empty">${text("empty")}</div>`;

  userList.innerHTML = scopedUsers.map((user) => {
    const displayName = user.profile?.fullName || user.username;
    const initials = displayName.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase() || "?";
    return `
    <details class="user-profile-card">
      <summary data-initials="${escapeHtml(initials)}">
        <span><strong>${escapeHtml(displayName)}</strong> · ${escapeHtml(user.profile?.position || roleLabel(user.role))} · ${escapeHtml(user.username)}${user.managerId ? ` · ${escapeHtml(appState.users.find((item) => item.id === user.managerId)?.username || "")}` : ""}</span>
      </summary>
      <form class="user-profile-form" data-user-id="${user.id}">
        <label><span>${text("login")}</span><input name="username" value="${escapeHtml(user.username)}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fullName")}</span><input name="fullName" value="${escapeHtml(user.profile?.fullName || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fatherName")}</span><input name="fatherName" value="${escapeHtml(user.profile?.fatherName || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("email")}</span><input name="email" type="email" value="${escapeHtml(user.profile?.email || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("position")}</span><input name="position" value="${escapeHtml(user.profile?.position || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("phone")}</span><input name="phone" value="${escapeHtml(user.profile?.phone || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("address")}</span><input name="address" value="${escapeHtml(user.profile?.address || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label><span>${text("company")}</span><input name="company" value="${escapeHtml(user.profile?.company || "")}" ${isOrgAdmin() ? "" : "readonly"}></label>
        <label class="admin-only"><span>${text("manager")}</span><select name="managerId">${managerOptions(user.managerId || "")}</select></label>
        ${isOrgAdmin() && user.id !== currentUser?.id ? `
        <label><span>Rol</span>
          <select name="role">
            <option value="user" ${user.role === "user" ? "selected" : ""}>${roleLabel("user")}</option>
            <option value="contributor" ${user.role === "contributor" ? "selected" : ""}>${roleLabel("contributor")}</option>
            <option value="viewer" ${user.role === "viewer" ? "selected" : ""}>${roleLabel("viewer")}</option>
            <option value="sponsor" ${user.role === "sponsor" ? "selected" : ""}>${roleLabel("sponsor")}</option>
            <option value="manager" ${user.role === "manager" ? "selected" : ""}>${roleLabel("manager")}</option>
            <option value="admin" ${user.role === "admin" ? "selected" : ""}>${roleLabel("admin")}</option>
          </select>
        </label>
        ` : ""}
        <div class="user-actions">
        ${user.id === currentUser?.id ? `
          <div class="password-form" data-user-id="${user.id}">
            <input type="password" name="password" placeholder="${text("newPassword")}" required>
            <button type="button" data-user-action="request-own-password" data-id="${user.id}">${text("requestPasswordChange")}</button>
            <input type="text" name="token" placeholder="${text("confirmationCode")}">
            <button type="button" data-user-action="confirm-own-password" data-id="${user.id}">${text("confirmPasswordChange")}</button>
          </div>
        ` : `
          <div class="password-form" data-user-id="${user.id}">
            <input type="password" name="password" placeholder="${text("newPassword")}" required>
            <button type="button" data-user-action="change-password" data-id="${user.id}">${text("changePassword")}</button>
          </div>
        `}
        ${user.id === currentUser?.id ? "" : `<button type="button" data-user-action="delete-user" data-id="${user.id}">${text("remove")}</button>`}
        ${isOrgAdmin() ? `<button class="primary" type="submit">${text("saveProfile")}</button>` : ""}
        </div>
      </form>
    </details>
  `;
  }).join("");

  trashList.innerHTML = scopedTrash.length ? scopedTrash.map((item) => {
    const title = item.type === "task" ? item.data.name : (item.data.project || item.data.name);
    const subtitle = item.type === "task"
      ? text("deletedTask")
      : item.type === "projectRecord" ? text("deletedProject") : `${text("deletedProject")} - ${resourceLabel(item.data.resource)}`;
    return `
      <div class="resource-item">
        <span><strong>${escapeHtml(title)}</strong>${escapeHtml(subtitle)}</span>
        <div class="mini-actions">
          <button type="button" data-trash-action="restore" data-id="${item.id}">${text("restore")}</button>
          <button type="button" data-trash-action="delete-forever" data-id="${item.id}">${text("deleteForever")}</button>
        </div>
      </div>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  renderDateRequests();
  renderCustomerList();
  renderManagedFileList();
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
  dateRequestList.innerHTML = requests.length ? requests.map(({ task, request }) => `
    <div class="resource-item date-request-item">
      <span>
        <strong>${escapeHtml(task.name)}</strong>
        ${escapeHtml(task.project || "")}
        <small>${escapeHtml(request.oldStart)} - ${escapeHtml(request.oldEnd)} -> ${escapeHtml(request.newStart)} - ${escapeHtml(request.newEnd)}</small>
        <small>${escapeHtml(request.requestedBy || "")} · ${escapeHtml(formatDateTime(request.requestedAt))}</small>
      </span>
      <div class="mini-actions">
        <button type="button" data-date-request-action="approve" data-task-id="${escapeHtml(task.id)}" data-request-id="${escapeHtml(request.id)}">${text("approveDateChange")}</button>
        <button type="button" data-date-request-action="reject" data-task-id="${escapeHtml(task.id)}" data-request-id="${escapeHtml(request.id)}">${text("rejectDateChange")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("noDateRequests")}</div>`;
}

function renderCustomerList() {
  const scopedCustomers = appState.customers.filter(isSameCompany);
  customerList.innerHTML = scopedCustomers.length ? scopedCustomers.map((customer) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(customer.name)}</strong>${escapeHtml([customer.contact, customer.email].filter(Boolean).join(" · "))}</span>
      <div class="mini-actions">
        <button type="button" data-customer-action="delete" data-id="${escapeHtml(customer.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function renderManagedFileList() {
  const scopedFiles = appState.managedFiles.filter(isSameCompany);
  managedFileList.innerHTML = scopedFiles.length ? scopedFiles.map((file) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(file.name)}</strong>${fileSizeLabel(Number(file.size) || 0)} · ${escapeHtml(formatDateTime(file.createdAt))}</span>
      <div class="mini-actions">
        <a class="attachment-chip" href="${escapeHtml(file.dataUrl)}" download="${escapeHtml(file.name)}">${text("download")}</a>
        <button type="button" data-file-action="delete" data-id="${escapeHtml(file.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
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

    const roleOptions = ["admin", "manager", "contributor", "sponsor", "viewer", "user"];
    const roleAccent = { admin: "var(--teal)", manager: "var(--blue,#2563eb)", contributor: "#16a34a", sponsor: "#7c3aed", viewer: "var(--muted)", user: "var(--text)" };

    userMgmtContainer.innerHTML = `
      <div class="role-user-list">
        ${scopedUsers.map((user) => `
          <div class="role-user-row" data-uid="${user.id}">
            <div class="role-user-info">
              <strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>
              <span class="muted">${escapeHtml(user.username)}</span>
            </div>
            ${user.id === currentUser?.id
              ? `<span class="role-chip role-chip-locked" style="--chip-color:${roleAccent[user.role] || "var(--teal)"}">
                   ${roleLabel(user.role)}
                   <small class="role-self-note">Özünüz</small>
                 </span>`
              : `<div class="role-chip-wrap" data-user-id="${user.id}">
                   <button type="button" class="role-chip role-chip-editable" style="--chip-color:${roleAccent[user.role] || "var(--teal)"}" data-user-id="${user.id}" title="Rolu dəyiş">
                     ${roleLabel(user.role)}
                     <svg class="role-chip-caret" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
                   </button>
                   <div class="role-chip-dropdown" hidden>
                     ${roleOptions.map((r) => `
                       <button type="button" class="role-opt ${user.role === r ? "role-opt-active" : ""}" data-set-role="${r}" style="--opt-color:${roleAccent[r] || "var(--text)"}">
                         ${roleLabel(r)}
                         ${user.role === r ? `<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
                       </button>
                     `).join("")}
                   </div>
                 </div>`
            }
          </div>
        `).join("")}
      </div>
    `;

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
        targetUser.role = newRole;
        saveUsers();
        renderRoleMatrix();
        render();
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
  const displayRoles = ["admin", "manager", "contributor", "sponsor", "viewer", "user"];
  const roleColors = { admin: "var(--teal)", manager: "var(--blue,#2563eb)", contributor: "#16a34a", sponsor: "#7c3aed", viewer: "var(--muted)", user: "var(--text)" };
  const perms = [
    { label: "Bütün layihələri idarə et",  roles: ["admin"] },
    { label: "Öz layihələrini idarə et",   roles: ["admin", "manager"] },
    { label: "Tapşırıqları idarə et",       roles: ["admin", "manager"] },
    { label: "İstifadəçiləri idarə et",    roles: ["admin"] },
    { label: "Rol dəyişdir",               roles: ["admin"] },
    { label: "Müştəriləri idarə et",       roles: ["admin"] },
    { label: "Register idarə et",          roles: ["admin", "manager"] },
    { label: "Müştəri sorğuları",          roles: ["admin", "manager"] },
    { label: "Hesabata bax",               roles: ["admin", "manager", "sponsor"] },
    { label: "Layihə/taskə bax",           roles: ["admin", "manager", "contributor", "sponsor", "viewer", "user"] },
    { label: "Komment yaz",                roles: ["admin", "manager", "contributor", "user"] },
    { label: "Tarix sorğusu göndər",       roles: ["user", "contributor", "viewer"] },
    { label: "Şirkət ayarları",            roles: ["admin"] },
    { label: "Fayl/backup idarəsi",        roles: ["admin"] },
  ];

  matrixContainer.innerHTML = `
    <details class="perm-matrix-details">
      <summary class="role-section-head perm-matrix-toggle">İcazə cədvəli</summary>
      <div class="perm-table-wrap">
        <table class="perm-table">
          <thead>
            <tr>
              <th class="perm-th-perm">İcazə</th>
              ${displayRoles.map((r) => `<th style="color:${roleColors[r]}">${roleLabel(r)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${perms.map((p) => `
              <tr>
                <td class="perm-td-label">${p.label}</td>
                ${displayRoles.map((r) => `<td class="perm-cell ${p.roles.includes(r) ? "perm-yes" : "perm-no"}">${p.roles.includes(r) ? "✓" : "—"}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </details>
  `;
}

function renderSummary() {
  const shownTasks = accessibleTasks();
  const metrics = portfolioMetrics(shownTasks);
  if (sidebarCapacityLabel) sidebarCapacityLabel.textContent = `${Number(appSettings.capacityHours) || 40}h`;
  totalCount.textContent = shownTasks.length;
  activeCount.textContent = shownTasks.filter((task) => task.status !== "Bitib").length;
  doneCount.textContent = shownTasks.filter((task) => task.status === "Bitib").length;
  if (blockedCount) blockedCount.textContent = metrics.blocked;
  if (riskCount) riskCount.textContent = metrics.risks + metrics.issues;
  const planned = shownTasks.reduce((sum, task) => sum + plannedHoursForTask(task), 0);
  const actual = shownTasks.reduce((sum, task) => sum + actualHoursForTask(task), 0);
  hoursSummary.textContent = `${planned} / ${actual}`;

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
        <span class="kpi-icon">📋</span>
        <div class="kpi-body">
          <strong class="kpi-num">${totalReal}</strong>
          <span class="kpi-label">Cəmi task</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="background:color-mix(in srgb,var(--blue) 14%,var(--panel))">🔵</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:var(--blue)">${activeTasks.length}</strong>
          <span class="kpi-label">Aktiv task</span>
          <div class="kpi-bar"><span style="width:${Math.round(activeTasks.length/total*100)}%;background:var(--blue)"></span></div>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="background:color-mix(in srgb,var(--green) 14%,var(--panel))">✅</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:var(--green)">${doneTasks.length}</strong>
          <span class="kpi-label">Tamamlandı · ${doneRatio}%</span>
          <div class="kpi-bar"><span style="width:${doneRatio}%;background:var(--green)"></span></div>
        </div>
      </div>
      <div class="dash-kpi ${overdueItems.length ? 'kpi-alert' : ''}">
        <span class="kpi-icon" style="background:color-mix(in srgb,var(--red) 12%,var(--panel))">⏰</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:${overdueItems.length ? 'var(--red)' : 'var(--muted)'}">${overdueItems.length}</strong>
          <span class="kpi-label">Gecikmiş</span>
        </div>
      </div>
      <div class="dash-kpi ${blockedItems.length ? 'kpi-warn' : ''}">
        <span class="kpi-icon" style="background:color-mix(in srgb,var(--amber) 14%,var(--panel))">🚧</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:${blockedItems.length ? 'var(--amber)' : 'var(--muted)'}">${blockedItems.length}</strong>
          <span class="kpi-label">Bloklanmış</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon">⏱</span>
        <div class="kpi-body">
          <strong class="kpi-num">${planned}</strong>
          <span class="kpi-label">Plan saat · ${actual} fakt</span>
        </div>
      </div>
      <div class="dash-kpi">
        <span class="kpi-icon" style="background:color-mix(in srgb,#f59e0b 14%,var(--panel))">🏆</span>
        <div class="kpi-body">
          <strong class="kpi-num" style="color:#d97706">${metrics.governanceScore}%</strong>
          <span class="kpi-label">IPMA balı</span>
        </div>
      </div>
    `;
  }

  // ── Status bars — richer ───────────────────────────────────────────────────
  const counts = registerCounts();
  statusBars.innerHTML = statuses.map((status) => {
    const count = shownTasks.filter((task) => task.status === status).length;
    const width = Math.round((count / total) * 100);
    return `
      <div class="status-line">
        <div class="status-line-head">
          <span class="status-dot ${statusClass(status)}"></span>
          <span class="status-name">${statusLabel(status)}</span>
          <strong class="status-count">${count}</strong>
          <span class="status-pct">${width}%</span>
        </div>
        <div class="meter thick-meter"><span class="${statusClass(status)}" style="width:${width}%"></span></div>
      </div>
    `;
  }).join("") + `
    <div class="register-badges">
      <span class="reg-badge reg-risk">⚠ Risk: ${counts.risks}</span>
      <span class="reg-badge reg-issue">🔴 Issue: ${counts.issues}</span>
      <span class="reg-badge reg-milestone">🎯 Milestone: ${counts.milestones}</span>
    </div>
  `;

  // ── Upcoming tasks ─────────────────────────────────────────────────────────
  const upcoming = shownTasks
    .filter((task) => task.status !== "Bitib")
    .sort((a, b) => parseDate(a.end) - parseDate(b.end))
    .slice(0, 6);

  upcomingList.innerHTML = upcoming.length ? upcoming.map((task) => {
    const days = daysUntil(task.end);
    const urgency = days < 0 ? "danger" : days <= 3 ? "warning" : "";
    const daysLabel = days < 0 ? `${Math.abs(days)} gün gecikdi` : days === 0 ? "Bu gün" : `${days} gün qaldı`;
    return `
    <button class="compact-item ${urgency}" type="button" data-open-task="${escapeHtml(task.id)}" title="${escapeHtml(task.name)}">
      <strong>${escapeHtml(task.name)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(getProject(task))}</span>
        <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
        <span style="color:${urgency === 'danger' ? 'var(--red)' : urgency === 'warning' ? 'var(--amber)' : 'var(--muted)'}">${daysLabel}</span>
      </div>
    </button>
  `;}).join("") : `<div class="empty">${text("noUpcoming")}</div>`;

  const rows = workloadRows().slice(0, 6);
  workloadList.innerHTML = rows.length ? rows.map((row) => {
    const loadClass = row.load > 85 ? "danger" : row.load > 60 ? "warning" : "";
    const barColor = row.load > 85 ? "var(--red)" : row.load > 60 ? "var(--amber)" : "var(--green)";
    return `
    <button class="compact-item workload-item ${loadClass}" type="button" data-owner="${escapeHtml(row.owner)}" title="Tasklara bax: ${escapeHtml(resourceLabel(row.owner))}">
      <div class="workload-row">
        <strong>${escapeHtml(resourceLabel(row.owner))}</strong>
        <span class="workload-pct" style="color:${barColor}">${row.load}%</span>
      </div>
      <div class="progress-mini workload-bar"><span style="width:${Math.min(100, row.load)}%; background:${barColor}"></span></div>
      <div class="task-meta">
        <span>${row.count} ${text("tasks")}</span>
        <span>${text("plannedHours")}: ${row.planned} / ${row.actual}</span>
      </div>
    </button>
  `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;

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

function renderDeadlineAlerts() {
  const alerts = riskyTasks().slice(0, 6);
  deadlineAlerts.innerHTML = alerts.length ? alerts.map(({ task, alert }) => `
    <button class="compact-item ${alert.type}" type="button" data-open-task="${escapeHtml(task.id)}" title="${escapeHtml(task.name)}">
      <strong>${escapeHtml(task.name)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(getProject(task))}</span>
        <span>${shortDate(task.end)}</span>
        <span class="badge ${alert.type === "danger" ? "high" : ""}">${escapeHtml(alert.label)}</span>
      </div>
    </button>
  `).join("") : `<div class="empty">${text("noDeadlineAlerts")}</div>`;
}

function renderPortfolioHealth() {
  if (!portfolioHealth) return;
  const metrics = portfolioMetrics();
  portfolioHealth.innerHTML = `
    <div class="health-score">
      <strong>${metrics.score}</strong>
      <span>${text("healthScore")}</span>
    </div>
    <div class="health-meter"><span style="width:${metrics.score}%"></span></div>
    <div class="health-grid">
      <span><strong>${metrics.completion}%</strong>${text("completionRate")}</span>
      <span><strong>${metrics.overdue}</strong>${text("overdueTasks")}</span>
      <span><strong>${metrics.blocked}</strong>${text("blockedTasks")}</span>
      <span><strong>${metrics.risks}</strong>${text("riskLoad")}</span>
      <span><strong>${metrics.issues}</strong>${text("openIssueLoad")}</span>
      <span><strong>${metrics.governanceScore}%</strong>${text("ipmaScore")}</span>
    </div>
  `;
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
  const actions = nextActionItems();
  nextActions.innerHTML = actions.length ? actions.map((action) => `
    <button class="compact-item action-item ${escapeHtml(action.type)}" type="button"
      ${action.taskId ? `data-open-task="${escapeHtml(action.taskId)}"` : `data-action-filter="${escapeHtml(action.target)}"`}>
      <strong>${escapeHtml(action.label)}</strong>
      <span>${escapeHtml(action.title)}</span>
      <small>${escapeHtml(action.meta || "")}</small>
    </button>
  `).join("") : `<div class="empty">${text("noActionNeeded")}</div>`;
}

function renderActivityLists() {
  if (auditLogList) {
    const visibleLocalAudit = localAuditLogs.filter((item) => isAdmin() || !item.companyId || item.companyId === currentCompanyId());
    const combinedAudit = [...visibleLocalAudit, ...auditLogs].slice(0, 80);
    auditLogList.innerHTML = combinedAudit.length ? combinedAudit.map((item) => `
      <div class="resource-item activity-item">
        <span>
          <strong>${escapeHtml(item.action || "-")}</strong>
          ${escapeHtml([item.actor, item.entity_type, item.entity_id].filter(Boolean).join(" · "))}
          ${item.detail ? `<small>${escapeHtml(item.detail)}</small>` : ""}
        </span>
        <small>${escapeHtml(formatDateTime(item.created_at || item.createdAt))}</small>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
  }
  if (mailHistoryList) {
    mailHistoryList.innerHTML = mailHistory.length ? mailHistory.map((item) => `
      <div class="resource-item activity-item">
        <span>
          <strong>${escapeHtml(item.subject || "-")}</strong>
          ${escapeHtml([item.type, item.recipient, item.status].filter(Boolean).join(" · "))}
        </span>
        <small>${escapeHtml(formatDateTime(item.created_at))}</small>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
  }
}

function renderNotificationCenter() {
  if (!notificationList) return;
  const rows = visibleNotifications().slice(0, 80);
  notificationList.innerHTML = rows.length ? `
    <div class="notification-actions">
      <button type="button" data-notification-action="mark-read">${text("markAllRead")}</button>
      <button type="button" data-notification-action="enable">${text("enableBrowserNotifications")}</button>
    </div>
    ${rows.map((item) => `
      <div class="notification-item ${item.read ? "read" : ""}">
        <span>
          <strong>${escapeHtml(item.message || item.subject || "-")}</strong>
          <small>${escapeHtml([item.type, item.status].filter(Boolean).join(" · "))}</small>
        </span>
        <small>${escapeHtml(formatDateTime(item.createdAt || item.created_at) || "-")}</small>
      </div>
    `).join("")}
  ` : `<div class="empty">${text("empty")}</div>`;
}

function renderBackupPanel() {
  const backups = Array.isArray(appSettings.backups) ? appSettings.backups : [];
  if (backupCount) backupCount.textContent = backups.length;
  if (backupSummary) backupSummary.textContent = backups[0]?.createdAt ? formatDateTime(backups[0].createdAt) : "-";
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
  return accessibleTasks().filter((task) => task.end === date);
}

function renderCalendarMarkup(compact = false) {
  return calendarDays().map((date) => {
    const dayTasks = calendarTasksForDate(date);
    const selected = date === selectedCalendarDay;
    const day = Number(date.slice(-2));
    return `
      <button class="calendar-day ${compact ? "compact" : ""} ${selected ? "selected" : ""}" type="button" data-calendar-day="${date}">
        <strong>${day}</strong>
        <em>${date.slice(5, 7)}/${date.slice(0, 4)}</em>
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
  // update month label in dashboard nav
  if (dashCalMonthLabel && calendarRange.start) {
    const d = new Date(calendarRange.start + "T00:00:00");
    dashCalMonthLabel.textContent = d.toLocaleDateString("az-AZ", { month: "long", year: "numeric" });
  }
}

function renderProjectsView() {
  const shownProjects = visibleProjects();
  projectCards.innerHTML = shownProjects.length ? shownProjects.map((project) => {
    const projectTasks = accessibleTasks().filter((task) => task.project === project.name);
    const done = projectTasks.filter((task) => task.status === "Bitib").length;
    const active = projectTasks.length - done;
    const fallbackPercent = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0;
    const percent = Number.isFinite(Number(project.progress)) ? Number(project.progress) : fallbackPercent;
    const managerNames = projectManagers(project).map((user) => user.profile?.fullName || user.username);
    const counts = registerCounts(project.name);
    const nextGate = nextGateForProject(project);
    const lifecycle = project.lifecycle || "Initiation";
    const hasAlerts = counts.risks > 0 || counts.issues > 0;
    return `
      <article class="project-card">
        <div class="project-card-header">
          <div class="project-card-titlerow">
            <h3>${escapeHtml(project.name)}</h3>
            <div class="project-card-badges">
              <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
              <span class="badge ${priorityClass(project.priority)}">${priorityLabel(project.priority)}</span>
              <span class="lifecycle-tag lifecycle-${lifecycle.toLowerCase()}">${lifecycle}</span>
            </div>
          </div>
          <div class="project-card-pct">
            <strong>${percent}%</strong>
            <span>tamamlandı</span>
          </div>
        </div>
        <div class="project-card-meta">
          <span>👤 ${escapeHtml(managerNames.join(", ") || text("noOwner"))}</span>
          <span>📅 ${shortDate(project.start)} – ${shortDate(project.end)}</span>
          <span>📋 ${projectTasks.length} task · ${active} aktiv · ${done} bitmiş</span>
          ${hasAlerts ? `<span class="proj-meta-alert">⚠ Risk: ${counts.risks} &nbsp; Issue: ${counts.issues}</span>` : ""}
        </div>
        <div class="progress-mini project-progress"><span style="width:${percent}%"></span></div>
        ${renderProjectGovernance(project)}
        <div class="project-card-actions">
          <button class="proj-btn proj-primary" type="button" data-project-action="open" data-project="${escapeHtml(project.name)}">${text("openProject")}</button>
          <button class="proj-btn proj-add" type="button" data-project-action="add-task" data-project="${escapeHtml(project.name)}">${text("addTaskToProject")}</button>
          <button class="proj-btn proj-secondary" type="button" data-project-action="edit" data-project="${escapeHtml(project.name)}">${text("editProject")}</button>
          ${nextGate ? `<button class="proj-btn proj-gate" type="button" data-project-action="approve-gate" data-gate="${escapeHtml(nextGate)}" data-project="${escapeHtml(project.name)}">✓ Gate: ${escapeHtml(nextGate)}</button>` : ""}
          <button class="proj-btn proj-archive" type="button" data-project-action="archive" data-project="${escapeHtml(project.name)}">${text("archiveProject")}</button>
          <button class="proj-btn proj-danger" type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  renderArchivedProjects();
}

function renderProjectGovernance(project) {
  const checklist = project.charter?.gateChecklist || [];
  const audit = projectGovernanceAudit(project);
  const modules = [
    [text("stakeholderRegister"), project.charter?.stakeholders],
    [text("communicationPlan"), project.charter?.communicationPlan],
    [text("decisionLog"), project.charter?.decisionLog],
    [text("changeControl"), project.charter?.changeControl],
    [text("riskOpportunity"), project.charter?.riskOpportunity],
    [text("qualityChecklist"), project.charter?.qualityChecklist],
    [text("competenceMatrix"), project.charter?.competenceMatrix]
  ];
  const hasModules = modules.some(([, rows]) => rows?.length);
  if (!project.charter?.goal && !project.charter?.scope && !project.charter?.successCriteria && !checklist.length && !project.charter?.closureNotes && !hasModules) {
    // Still show gate status even without charter data
    const approvals = project.charter?.gateApprovals || {};
    const gates = ["Initiation", "Planning", "Execution", "Closing"];
    const approvedCount = gates.filter(g => approvals[g]?.approvedAt).length;
    return `
      <details class="governance-summary">
        <summary class="governance-score-line">
          <span class="gov-pill">IPMA</span>
          <strong>Governance</strong>
          <span class="gov-score">${audit.score}%</span>
          <span class="gov-gates">${approvedCount}/4 gate</span>
          ${audit.missing.length ? `<span class="governance-warning-pill">${audit.missing.length} çatışmır</span>` : ""}
        </summary>
        <div class="governance-detail">
          <div class="gate-status-row">
            ${gates.map(gate => `<span class="gate-chip ${approvals[gate]?.approvedAt ? "gate-ok" : "gate-pending"}">${gate}</span>`).join("")}
          </div>
        </div>
      </details>
    `;
  }
  const approvals = project.charter?.gateApprovals || {};
  const gates = ["Initiation", "Planning", "Execution", "Closing"];
  const approvedCount = gates.filter(g => approvals[g]?.approvedAt).length;
  return `
    <details class="governance-summary">
      <summary class="governance-score-line">
        <span class="gov-pill">IPMA</span>
        <strong>Governance</strong>
        <span class="gov-score">${audit.score}%</span>
        <span class="gov-gates">${approvedCount}/4 gate</span>
        ${audit.missing.length ? `<span class="governance-warning-pill">${audit.missing.length} çatışmır</span>` : ""}
      </summary>
      <div class="governance-detail">
        <div class="gate-status-row">
          ${gates.map(gate => `<span class="gate-chip ${approvals[gate]?.approvedAt ? "gate-ok" : "gate-pending"}">${gate}${approvals[gate]?.approvedAt ? " ✓" : ""}</span>`).join("")}
        </div>
        ${audit.missing.length ? `<div class="governance-warning">⚠ ${escapeHtml(audit.missing.slice(0, 4).join(" · "))}${audit.missing.length > 4 ? " ..." : ""}</div>` : ""}
        ${project.charter?.goal ? `<div><strong>${text("projectCharter")}:</strong> ${escapeHtml(project.charter.goal)}</div>` : ""}
        ${project.charter?.scope ? `<div><strong>${text("projectScope")}:</strong> ${escapeHtml(project.charter.scope)}</div>` : ""}
        ${modules.map(([label, rows]) => rows?.length ? `<div><strong>${label}:</strong> ${escapeHtml(rows.slice(0, 3).join(", "))}${rows.length > 3 ? " …" : ""}</div>` : "").join("")}
      </div>
    </details>
  `;
}

function nextGateForProject(project) {
  const approvals = project.charter?.gateApprovals || {};
  return ["Initiation", "Planning", "Execution", "Closing"].find((gate) => !approvals[gate]?.approvedAt) || "";
}

function renderArchivedProjects() {
  const archived = appState.projects.filter((project) => project.archived).filter(canSeeProject);
  archivedProjectCards.innerHTML = archived.length ? archived.map((project) => `
    <article class="project-card archived-project-card">
      <div class="project-card-header">
        <div class="project-card-titlerow">
          <h3>${escapeHtml(project.name)}</h3>
          <div class="project-card-badges">
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
            <span>${shortDate(project.start)} – ${shortDate(project.end)}</span>
          </div>
        </div>
        <div class="project-card-pct"><strong>${Number(project.progress) || 0}%</strong></div>
      </div>
      <div class="project-card-actions">
        <button class="proj-btn proj-secondary" type="button" data-project-action="restore-archive" data-project="${escapeHtml(project.name)}">${text("restoreProject")}</button>
        <button class="proj-btn proj-danger" type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
      </div>
    </article>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function renderTaskList() {
  const shown = visibleTasks();

  // Owner filter active banner
  const ownerBanner = currentOwnerFilter ? `
    <div class="owner-filter-banner">
      <span>👤 <strong>${escapeHtml(resourceLabel(currentOwnerFilter))}</strong> — tapşırıqları göstərilir</span>
      <button type="button" class="owner-filter-clear" id="clearOwnerFilter">✕ Filtri sil</button>
    </div>
  ` : "";

  if (!shown.length) {
    taskList.innerHTML = ownerBanner + `<div class="empty">${text("noTask")}</div>`;
    document.querySelector("#clearOwnerFilter")?.addEventListener("click", () => { currentOwnerFilter = ""; render(); });
    return;
  }

  const paged = shown.slice(0, taskListPage * TASK_PAGE_SIZE);
  const hasMore = paged.length < shown.length;
  const countLabel = shown.length > TASK_PAGE_SIZE
    ? `<div class="task-list-count">${text("showingOf")(paged.length, shown.length)}</div>` : "";
  const loadMoreBtn = hasMore
    ? `<button class="load-more-btn" type="button" id="taskLoadMore">${text("loadMore")} (${shown.length - paged.length})</button>` : "";

  taskList.innerHTML = ownerBanner + countLabel + paged.map((task) => {
    const blocked = isTaskBlocked(task);
    const commentCount = (task.comments || []).length;
    const fileCount = (task.attachments || []).length;
    const timeEntryCount = (task.timeEntries || []).length;
    const projectName = getProject(task);
    const infoChips = [
      commentCount ? `💬 ${commentCount}` : "",
      fileCount ? `📎 ${fileCount}` : "",
      timeEntryCount ? `⏱ ${timeEntryCount} giriş` : "",
    ].filter(Boolean);
    return `
    <article class="task-card ${blocked ? "blocked-task" : ""}" data-task-card-id="${escapeHtml(task.id)}">
      <label class="task-cb-wrap" title="Seç" aria-label="Seç">
        <input type="checkbox" class="task-select-cb" data-task-id="${escapeHtml(task.id)}" ${selectedTaskIds.has(task.id) ? "checked" : ""}>
      </label>
      ${projectName ? `<div class="task-project-tag">📁 ${escapeHtml(projectName)}</div>` : ""}
      <h3>${escapeHtml(task.name)}</h3>
      <div class="task-meta">
        <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
        <span class="badge ${priorityClass(task.priority)}">${priorityLabel(task.priority)}</span>
        ${blocked ? `<span class="badge blocked">${text("blocked")}</span>` : ""}
        <span>📅 ${shortDate(task.start)} – ${shortDate(task.end)}</span>
        <span>👤 ${escapeHtml(resourceLabel(task.owner))}</span>
        <span>⏱ ${plannedHoursForTask(task)}h plan · ${actualHoursForTask(task)}h fakt</span>
        ${infoChips.length ? `<span class="task-info-chips">${infoChips.join(" &nbsp;")}</span>` : ""}
      </div>
      ${renderTaskRelations(task)}
      ${task.notes ? `<p class="task-notes-preview">${escapeHtml(task.notes)}</p>` : ""}
      <div class="progress-mini"><span style="width:${Number(task.progress) || 0}%"></span></div>
      ${renderTaskInlineComments(task)}
      ${renderTaskActions(task)}
    </article>
  `;
  }).join("") + loadMoreBtn;

  document.querySelector("#clearOwnerFilter")?.addEventListener("click", () => { currentOwnerFilter = ""; taskListPage = 1; render(); });
  document.querySelector("#taskLoadMore")?.addEventListener("click", () => { taskListPage++; renderTaskList(); });
}

function renderAttachments(task) {
  const attachments = task.attachments || [];
  if (!attachments.length) return "";
  return `
    <div class="attachment-list">
      ${attachments.map((attachment) => `
        <a class="attachment-chip" href="${escapeHtml(attachment.dataUrl)}" download="${escapeHtml(attachment.name)}" title="${escapeHtml(attachment.name)} (${fileSizeLabel(Number(attachment.size) || 0)})">
          <span>${escapeHtml(attachment.name)}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function renderCommentAttachments(comment) {
  const attachments = comment.attachments || [];
  if (!attachments.length) return "";
  return `
    <div class="attachment-list compact-attachments">
      ${attachments.map((attachment) => `
        <a class="attachment-chip" href="${escapeHtml(attachment.dataUrl)}" download="${escapeHtml(attachment.name)}" title="${escapeHtml(attachment.name)} (${fileSizeLabel(Number(attachment.size) || 0)})">
          <span>${escapeHtml(attachment.name)}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function canDeleteTaskComment(task) {
  return Boolean(task && currentUser && (isAdmin() || currentUser.role === "manager") && canSeeTask(task));
}

function renderCommentDeleteButton(task, comment) {
  if (!canDeleteTaskComment(task)) return "";
  return `<button class="comment-delete" type="button" data-action="delete-comment" data-task-id="${escapeHtml(task.id)}" data-comment-id="${escapeHtml(comment.id)}" aria-label="${text("delete")}">${text("delete")}</button>`;
}

function deleteTaskComment(taskId, commentId) {
  const task = appState.tasks.find((item) => item.id === taskId);
  if (!task || !commentId || !canDeleteTaskComment(task)) return false;
  task.comments = (task.comments || []).filter((comment) => comment.id !== commentId);
  saveTasks();
  flushSupabaseSave().catch((error) => console.warn("Supabase save failed", error));
  return true;
}

function renderTaskInlineComments(task) {
  const comments = task.comments || [];
  const recent = comments.slice(-2);
  const items = recent.length ? recent.map((comment) => `
    <div class="comment-item task-inline-comment">
      <div class="comment-head">
        <strong>${escapeHtml(comment.author)}</strong>
        <span class="comment-tools">
          <time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatDateTime(comment.createdAt))}</time>
          ${renderCommentDeleteButton(task, comment)}
        </span>
      </div>
      <span>${escapeHtml(comment.text)}</span>
      ${renderCommentAttachments(comment)}
    </div>
  `).join("") : "";
  const more = comments.length > recent.length
    ? `<button class="inline-link" type="button" data-action="view" data-id="${task.id}">${comments.length} ${text("comments")}</button>`
    : "";
  const formHtml = task.status === "Bitib" ? "" : `
    <form class="comment-form task-inline-comment-form" data-task-id="${task.id}">
      <button class="comment-compose-trigger" type="button" data-action="expand-comment" aria-label="${text("commentPlaceholder")}">
        <span>💬</span> ${text("commentPlaceholder")}…
      </button>
      <div class="comment-body">
        <textarea name="comment" rows="2" placeholder="${text("commentPlaceholder")}" required></textarea>
        <div class="inline-comment-actions">
          <button class="comment-send-btn" type="submit">${text("addComment")}</button>
          <button class="comment-cancel-btn" type="button" data-action="collapse-comment">${text("cancel")}</button>
          <label class="comment-attach-btn" title="${text("attachments")}">
            📎
            <input class="comment-attachment-input" name="attachments" type="file" multiple aria-label="${text("attachments")}">
          </label>
          <small class="file-picker-status"></small>
        </div>
      </div>
    </form>
  `;
  return `
    <div class="comments task-inline-comments">
      <div class="task-inline-comments-head">
        <h4>${text("comments")}</h4>
        ${more}
      </div>
      ${items}
      ${formHtml}
    </div>
  `;
}

function renderTaskRelations(task) {
  const parent = task.parentTaskId ? taskNameById(task.parentTaskId) : "";
  const dependencies = (task.dependencyIds || []).map(taskNameById).filter(Boolean);
  const blockers = incompleteDependencies(task).map((item) => item.name).filter(Boolean);
  if (!parent && !dependencies.length) return "";
  return `
    <div class="task-relations">
      ${parent ? `<span>${text("parentTask")}: ${escapeHtml(parent)}</span>` : ""}
      ${dependencies.length ? `<span>${text("dependsOn")}: ${escapeHtml(dependencies.join(", "))}</span>` : ""}
      ${blockers.length ? `<span class="blocked-relation">${text("blockedBy")}: ${escapeHtml(blockers.join(", "))}</span>` : ""}
    </div>
  `;
}

function renderTaskActions(task) {
  let actions = "";
  if (task.status === "Bitib") {
    actions = `
        <button class="action-button" type="button" data-action="view" data-id="${task.id}">Bax</button>
        <button class="action-button next-action" type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button class="action-button danger-action" type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  } else {
    const blocked = isTaskBlocked(task);
    const completionAction = task.completionRequestedAt
      ? `${canApproveTask(task) ? `<button class="action-button next-action" type="button" data-action="approve-done" data-id="${task.id}">${text("approveDone")}</button>` : `<span class="pending-label">${text("pendingDone")}</span>`}`
      : `<button class="action-button next-action" type="button" data-action="request-done" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("doneRequest")}</button>`;
    actions = `
        <button class="action-button" type="button" data-action="view" data-id="${task.id}">Bax</button>
        <button class="action-button edit-action" type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button class="action-button next-action" type="button" data-action="next" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("next")}</button>
        ${completionAction}
        <button class="action-button danger-action" type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  }
  return `<div class="task-actions">${actions}</div>`;
}

function renderTimeEntries(task) {
  const entries = Array.isArray(task.timeEntries) ? task.timeEntries : [];
  const items = entries.length ? entries.map((entry) => `
    <div class="comment-item time-entry-item">
      <div class="comment-head">
        <strong>${escapeHtml(entry.hours)} ${text("hours")}</strong>
        <time datetime="${escapeHtml(entry.date || "")}">${escapeHtml(shortDate(entry.date))}</time>
      </div>
      <span>${text("loggedBy")}: ${escapeHtml(userDisplayLabel(entry.user) || "-")}</span>
      ${entry.note ? `<span>${escapeHtml(entry.note)}</span>` : ""}
    </div>
  `).join("") : `<div class="comment-empty">${text("empty")}</div>`;

  const formHtml = task.status === "Bitib" ? "" : `
      <form class="time-entry-form" data-task-id="${task.id}">
        <div class="time-entry-grid">
          <input name="hours" type="number" min="0.25" step="0.25" placeholder="${text("hours")}" required>
          <input name="date" type="date" value="${isoDate(new Date())}" required>
        </div>
        <input name="note" type="text" placeholder="${text("timeEntryNote")}">
        <button type="submit">${text("addTimeEntry")}</button>
      </form>
  `;

  return `
    <div class="comments time-entries">
      <h4>${text("timeEntries")}</h4>
      ${items}
      ${formHtml}
    </div>
  `;
}

function renderComments(task) {
  const comments = task.comments || [];
  const items = comments.length ? comments.map((comment) => `
    <div class="comment-item">
      <div class="comment-head">
        <strong>${escapeHtml(comment.author)}</strong>
        <span class="comment-tools">
          <time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatDateTime(comment.createdAt))}</time>
          ${renderCommentDeleteButton(task, comment)}
        </span>
      </div>
      <span>${escapeHtml(comment.text)}</span>
      ${renderCommentAttachments(comment)}
    </div>
  `).join("") : `<div class="comment-empty">${text("noComments")}</div>`;

  const formHtml = task.status === "Bitib" ? "" : `
      <form class="comment-form" data-task-id="${task.id}">
        <textarea name="comment" rows="3" placeholder="${text("commentPlaceholder")}" required></textarea>
        <label class="file-picker">
          <span>${text("chooseFiles")}</span>
          <input class="comment-attachment-input" name="attachments" type="file" multiple aria-label="${text("attachments")}">
        </label>
        <small class="file-picker-status">${text("noFilesSelected")}</small>
        <button type="submit">${text("addComment")}</button>
      </form>
  `;

  return `
    <div class="comments">
      <h4>${text("comments")}</h4>
      ${items}
      ${formHtml}
    </div>
  `;
}

function openTaskDetail(id) {
  const task = appState.tasks.find((item) => item.id === id);
  if (!task || !taskDetailModal) return;
  const project = appState.projects.find((item) => item.name === task.project);
  taskDetailTitle.textContent = task.name;
  taskDetailBody.innerHTML = `
    <div class="task-detail-grid">
      <span><strong>Layihə</strong>${escapeHtml(task.project || "-")}</span>
      <span><strong>Lifecycle</strong>${escapeHtml(project?.lifecycle || "Initiation")}</span>
      <span><strong>Status</strong>${escapeHtml(statusLabel(task.status))}</span>
      <span><strong>Tarix</strong>${shortDate(task.start)} - ${shortDate(task.end)}</span>
      <span><strong>Plan/Fakt saat</strong>${plannedHoursForTask(task)} / ${actualHoursForTask(task)}</span>
      <span><strong>Progress</strong>${Number(task.progress) || 0}%</span>
    </div>
    ${renderTaskRelations(task)}
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
      <article class="kanban-card ${blocked ? "blocked-task" : ""}">
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
      <section class="kanban-column">
        <h2>${statusLabel(status)} (${columnTasks.length})</h2>
        ${cards || `<div class="empty">${text("empty")}</div>`}
      </section>
    `;
  }).join("");
}

function renderKanbanActions(task) {
  const blocked = isTaskBlocked(task);
  const actions = task.status === "Bitib"
    ? `
        <button type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `
    : `
        <button type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button type="button" data-action="next" data-id="${task.id}" ${blocked ? "disabled" : ""}>${text("next")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  return `<div class="kanban-actions">${actions}</div>`;
}

function milestoneMarkers(project, minStart, days) {
  const projectMilestones = appState.registers
    .filter((item) => item.type === "milestone" && item.project === project.name && item.dueDate);
  const markers = projectMilestones.length ? projectMilestones : [{ title: project.name, dueDate: project.end }];
  return markers
    .map((item) => {
      const offset = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), item.dueDate)));
      return `<div class="gantt-milestone" style="grid-column:${offset + 1};" title="${escapeHtml(item.title)}"></div>`;
    })
    .join("");
}

function dependencyArrows(task, projectTasks, minStart, days) {
  const dependencies = (task.dependencyIds || [])
    .map((id) => projectTasks.find((item) => item.id === id))
    .filter((item) => item?.end || item?.start);
  return dependencies.map((dependency) => {
    const fromDate = dependency.end || dependency.start;
    const toDate = task.start || task.end || fromDate;
    const from = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), fromDate)));
    const to = Math.max(0, Math.min(days - 1, daysBetween(isoDate(minStart), toDate)));
    const start = Math.min(from, to);
    const span = Math.max(1, Math.abs(to - from) + 1);
    return `<div class="gantt-dependency-arrow" style="grid-column:${start + 1} / span ${span};" title="${escapeHtml(dependency.name)} → ${escapeHtml(task.name)}"></div>`;
  }).join("");
}

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
    const label = cursor.toLocaleDateString(translations[currentLanguage].locale, { month: "short", year: "2-digit" });
    headers.push(`<div class="gantt-month" style="grid-column:${startOffset + 1} / span ${span};">${escapeHtml(label)}</div>`);
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
  reports.innerHTML = shownProjects.length ? shownProjects.map((project) => {
    const audit = projectGovernanceAudit(project);
    const projectTasks = reportTasks.filter((task) => task.project === project.name)
      .sort((a, b) => parseDate(a.start) - parseDate(b.start));
    const rows = projectTasks.length ? projectTasks.map((task) => `
      <div class="report-row">
        <strong>${escapeHtml(task.name)}</strong>
        <span>${statusLabel(task.status)}</span>
        <span>${priorityLabel(task.priority)}</span>
        <span>${isTaskBlocked(task) ? text("blocked") : "-"}</span>
        <span>${text("start")}: ${escapeHtml(shortDate(task.start))}</span>
        <span>${text("end")}: ${escapeHtml(shortDate(task.end))}</span>
        <span>${text("executedBy")}: ${escapeHtml(resourceLabel(task.owner))}</span>
        <span>${text("plannedHours")}: ${plannedHoursForTask(task)}</span>
        <span>${text("actualHours")}: ${actualHoursForTask(task)}</span>
        <span>${text("requestedAt")}: ${escapeHtml(formatDateTime(task.completionRequestedAt) || "-")}</span>
        <span>${text("approvedAt")}: ${escapeHtml(formatDateTime(task.approvedAt) || "-")}</span>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
    const registerRows = visibleRegisters(project.name).length ? visibleRegisters(project.name).map((item) => `
      <div class="report-row">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${registerTypeLabel(item.type)}</span>
        <span>${registerStatusLabel(item.status)}</span>
        <span>${impactLabel(item.impact)}</span>
        <span>${shortDate(item.dueDate)}</span>
      </div>
    `).join("") : `<div class="empty">${text("empty")}</div>`;
    const governanceRows = `
      <div class="report-row">
        <strong>${text("ipmaScore")}: ${audit.score}%</strong>
        <span>${text("lifecycleStage")}: ${escapeHtml(project.lifecycle || "Initiation")}</span>
        <span>${text("governanceCoverage")}: ${audit.done}/${audit.total}</span>
        <span>${text("openGovernanceRisk")}: ${audit.openGovernanceRisks.length}</span>
        <span>${text("gateApprovals")}: ${audit.approvedGates.length}/4</span>
        <span>${text("governanceMissing")}: ${escapeHtml(audit.missing.join(" · ") || "-")}</span>
      </div>
    `;
    return `
      <article class="report-project">
        <h3>${escapeHtml(project.name)}</h3>
        <h3>${text("ipmaReport")}</h3>
        <div class="report-rows">${governanceRows}</div>
        <div class="report-rows">${rows}</div>
        <h3>${text("projectRegisters")}</h3>
        <div class="report-rows">${registerRows}</div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
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
      <h3 class="time-chart-title">⏱ ${text("timeChart")} — ${text("timeWeek")}</h3>
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

function renderViews() {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${currentView}View`));
  document.body.dataset.view = currentView;
}

function renderPlatformConsole() {
  if (!platformConsole) return;
  if (!isSuperAdmin()) {
    platformConsole.classList.remove("active");
    return;
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
  const ops = platformOpsSummary(registry);
  if (platformOps) {
    platformOps.innerHTML = `
      <article>
        <span>Tenant health</span>
        <strong>${ops.averageHealth}%</strong>
        <small>${ops.riskCompanies} şirkət nəzarət tələb edir</small>
      </article>
      <article>
        <span>Risk siqnalları</span>
        <strong>${ops.overdueTotal + ops.blockedTotal}</strong>
        <small>${ops.overdueTotal} gecikən · ${ops.blockedTotal} blok</small>
      </article>
      <article>
        <span>Backup readiness</span>
        <strong>${ops.backupCount}</strong>
        <small>Son backup: ${escapeHtml(formatDateTime(ops.lastBackup) || "-")}</small>
      </article>
      <article>
        <span>Mail gateway</span>
        <strong>${ops.mailReady ? "Hazır" : "Yoxlanılmalıdır"}</strong>
        <small>${ops.mailReady ? "SMTP/API aktivdir" : "Provider və aktivlik yoxlanmalıdır"}</small>
      </article>
      <article>
        <span>Audit izi</span>
        <strong>${auditLogs.length + localAuditLogs.length}</strong>
        <small>Son hadisə: ${escapeHtml(formatDateTime(ops.lastAudit) || "-")}</small>
      </article>
    `;
  }
  if (platformLifecycle) {
    platformLifecycle.innerHTML = registry.map((company) => `
      <article class="platform-lifecycle-card" data-company-id="${escapeHtml(company.id)}">
        <div>
          <strong>${escapeHtml(company.name)}</strong>
          <small>${escapeHtml(company.status || "active")} · ${escapeHtml(company.plan || "standard")}</small>
        </div>
        <select data-lifecycle-field="plan">
          ${["standard", "pro", "enterprise"].map((plan) => `<option value="${plan}" ${company.plan === plan ? "selected" : ""}>${plan}</option>`).join("")}
        </select>
        <label><span>Trial bitir</span><input type="date" data-lifecycle-field="trialEndsAt" value="${escapeHtml(company.trialEndsAt || "")}"></label>
        <label><span>Abonement bitir</span><input type="date" data-lifecycle-field="subscriptionEndsAt" value="${escapeHtml(company.subscriptionEndsAt || "")}"></label>
        <input data-lifecycle-field="statusReason" type="text" placeholder="Status səbəbi">
        <div class="platform-card-actions">
          <button type="button" data-lifecycle-action="save">Yadda saxla</button>
          <button type="button" data-lifecycle-action="${company.status === "suspended" ? "activate" : "suspend"}">${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}</button>
        </div>
      </article>
    `).join("");
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
        <button type="button" data-company-action="${company.status === "suspended" ? "activate" : "suspend"}" data-id="${escapeHtml(company.id)}">
          ${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}
        </button>
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

function setView(view) {
  currentView = view;
  document.body.dataset.view = view;
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
  if (view === "projects") projectFilter.value = "Hamısı";
  render();
}

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
}

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
  statusInput.value = "Plan";
  priorityInput.value = "Normal";
  progressInput.value = 0;
  plannedHoursInput.value = 0;
  actualHoursInput.value = 0;
  parentTaskInput.value = "";
  taskDependenciesInput.innerHTML = taskOptionItems();
  if (taskExtraDetails) taskExtraDetails.open = false;
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
    progressInput.value = Number(task.progress) || 0;
    plannedHoursInput.value = Number(task.plannedHours) || 0;
    actualHoursInput.value = Number(task.actualHours) || 0;
    notesInput.value = task.notes;
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
  progressInput.value = Number(task.progress) || 0;
  plannedHoursInput.value = Number(task.plannedHours) || 0;
  actualHoursInput.value = Number(task.actualHours) || 0;
  notesInput.value = task.notes;
  parentTaskInput.value = task.parentTaskId || "";
  taskDependenciesInput.innerHTML = taskOptionItems(task.dependencyIds || [], task.id);
  if (taskExtraDetails && (task.parentTaskId || (task.dependencyIds || []).length || task.projectResource)) {
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
    showToast(text("autoSnapshotSaved"));
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
  const scopedProjects = isSuperAdmin() ? [] : appState.projects.filter((project) => !project.companyId || project.companyId === companyId);
  const projectNames = new Set(scopedProjects.map((project) => project.name));
  const scopedUsers = isSuperAdmin()
    ? appState.users.filter((user) => user.role === "super_admin" && user.id === currentUser?.id)
    : appState.users.filter((user) => user.role !== "super_admin" && (!user.companyId || user.companyId === companyId));
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    tasks: appState.tasks.filter((task) => projectNames.has(task.project)),
    projects: scopedProjects,
    members: isSuperAdmin() ? [] : appState.members.filter((member) => !member.companyId || member.companyId === companyId),
    teams: isSuperAdmin() ? [] : appState.teams.filter((team) => !team.companyId || team.companyId === companyId),
    customers: isSuperAdmin() ? [] : appState.customers.filter((customer) => !customer.companyId || customer.companyId === companyId),
    managedFiles: isSuperAdmin() ? [] : appState.managedFiles.filter((file) => !file.companyId || file.companyId === companyId),
    projectLinks: isSuperAdmin() ? [] : appState.projectLinks.filter((link) => projectNames.has(link.project)),
    registers: isSuperAdmin() ? [] : appState.registers.filter((item) => projectNames.has(item.project)),
    users: scopedUsers,
    trash: isSuperAdmin() ? [] : appState.trash.filter((item) => !item.companyId || item.companyId === companyId),
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
    redirectTo: cfg.redirectTo || "https://faridasadov.github.io/project-manager/",
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
      if (path.includes("/app_state")) return [{ state_json: backupPayload() }];
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
      "content-type": file.type || "application/octet-stream",
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
  const redirect = encodeURIComponent(cfg?.redirectTo || "https://faridasadov.github.io/project-manager/");
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

async function supabaseCreateWorkspaceProfile({ userId, companyName, companyId, subdomain, username, fullName, email }) {
  const workspaceRows = await supabaseRequest("/rest/v1/workspaces", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      company_key: companyId,
      name: companyName,
      owner_id: userId,
      status: "active"
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
  companyRegistry = [
    ...companyRegistry.filter((company) => company.id !== companyId),
    {
      id: companyId,
      name: companyName,
      subdomain: slugFromName(companyName),
      status: "active",
      plan: "standard",
      adminUsername: username,
      userCount: 1,
      projectCount: 0,
      createdAt: new Date().toISOString(),
      activatedAt: new Date().toISOString(),
      statusChangedAt: new Date().toISOString()
    }
  ];
  appSettings.companyRegistry = companyRegistry;
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
  if (!supabaseSession?.access_token || !supabaseWorkspaceId || isSuperAdmin()) return;
  clearTimeout(supabaseSettingsSaveTimer);
  supabaseSettingsSaveTimer = setTimeout(() => {
    supabaseSaveSettings().catch((error) => console.warn("Supabase settings save failed", error));
  }, 600);
}

async function supabaseSaveSettings() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId || isSuperAdmin()) return;
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
  if (!supabaseSession?.access_token || !supabaseWorkspaceId) return;
  const pending = localAuditLogs
    .filter((entry) => entry?.id && !supabaseAuditSyncedIds.has(entry.id))
    .slice(0, 25);
  if (!pending.length) return;
  await supabaseRequest("/rest/v1/audit_logs", {
    method: "POST",
    body: JSON.stringify(pending.map((entry) => ({
      workspace_id: supabaseWorkspaceId,
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
}

async function syncSupabaseNotifications() {
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
  const userId = signup.user?.id || session.user?.id;
  const workspace = await supabaseCreateWorkspaceProfile({ userId, companyName, companyId, subdomain, username, fullName, email });
  applySupabaseWorkspaceSession({ userId, email, username, fullName, companyName, companyId, workspaceId: workspace.id });
  await supabaseSaveState();
  recordAudit("workspace.supabase_registered", "company", companyId, companyName);
  return currentUser;
}

async function supabaseLoadWorkspaceState(workspaceId) {
  const rows = await supabaseRequest(`/rest/v1/app_state?workspace_id=eq.${encodeURIComponent(workspaceId)}&select=state_json&limit=1`);
  const state = Array.isArray(rows) ? rows[0]?.state_json : null;
  if (state?.tasks) importBackup(state);
}

async function supabaseLoginWorkspace(email, password) {
  if (!canUseSupabase()) return null;
  const session = await supabasePasswordLogin(email, password);
  const userId = session.user?.id;
  if (!userId) throw new Error("Supabase istifadəçisi tapılmadı");
  const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,workspace_id,username,full_name,email,role,profile_json`);
  let profile = Array.isArray(profiles) ? profiles[0] : null;
  if (!profile?.workspace_id) {
    const meta = session.user?.user_metadata || {};
    const companyName = meta.company_name || "Workspace";
    const companyId = meta.company_key || companyIdFromName(companyName);
    const username = meta.username || email.split("@")[0];
    const fullName = meta.full_name || username;
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
  const workspaces = await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(profile.workspace_id)}&select=id,company_key,name,status`);
  const workspace = Array.isArray(workspaces) ? workspaces[0] : null;
  if (!workspace?.id) throw new Error("Workspace oxunmadı");
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
    role: profile.role || "admin"
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
  const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,workspace_id,username,full_name,email,role,profile_json`);
  let profile = Array.isArray(profiles) ? profiles[0] : null;
  if (!profile?.workspace_id) {
    const meta = tokenUser.user_metadata || {};
    const companyName = meta.company_name || meta.company || "Project Manager";
    const companyId = meta.company_key || companyIdFromName(companyName);
    const username = meta.username || email.split("@")[0];
    const fullName = meta.full_name || username;
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
  const workspaces = await supabaseRequest(`/rest/v1/workspaces?id=eq.${encodeURIComponent(profile.workspace_id)}&select=id,company_key,name,status`);
  const workspace = Array.isArray(workspaces) ? workspaces[0] : null;
  if (!workspace?.id) throw new Error("Workspace oxunmadı");
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
    role: profile.role || "admin"
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

  await supabaseLoadWorkspaceState(supabaseWorkspaceId);
  await supabaseLoadSettings(supabaseWorkspaceId);
  await syncSupabaseAuditLogs();
  await syncSupabaseNotifications();
  supabaseRealtimeConnect(supabaseWorkspaceId);
  return true;
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
    return true;
  } catch (error) {
    loginError.textContent = error.message;
    registerError.textContent = error.message;
    render();
    return false;
  }
}

function scheduleSupabaseSave() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId || isSuperAdmin()) return;
  clearTimeout(supabaseSaveTimer);
  supabaseSaveTimer = setTimeout(() => {
    supabaseSaveState().catch((error) => console.warn("Supabase save failed", error));
  }, 500);
}

async function flushSupabaseSave() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId || isSuperAdmin()) return;
  clearTimeout(supabaseSaveTimer);
  await supabaseSaveState();
}

async function supabaseSaveState() {
  if (!supabaseSession?.access_token || !supabaseWorkspaceId || isSuperAdmin()) return;
  const payload = backupPayload();
  await supabaseRequest("/rest/v1/app_state?on_conflict=workspace_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({
      workspace_id: supabaseWorkspaceId,
      state_json: payload,
      saved_by: currentUser?.id || null,
      updated_at: new Date().toISOString()
    })
  });
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
    appState.projects = appState.projects.map((project) => ({ ...project, companyId })).filter((project) => project.companyId === companyId);
    const projectNames = new Set(appState.projects.map((project) => project.name));
    appState.tasks = appState.tasks.filter((task) => projectNames.has(task.project));
    appState.members = appState.members.map((member) => ({ ...member, companyId })).filter((member) => member.companyId === companyId);
    appState.teams = appState.teams.map((team) => ({ ...team, companyId })).filter((team) => team.companyId === companyId);
    appState.customers = appState.customers.map((customer) => normalizeCustomer({ ...customer, companyId })).filter((customer) => customer.companyId === companyId);
    appState.managedFiles = appState.managedFiles.map((file) => ({ ...file, companyId })).filter((file) => file.companyId === companyId);
    appState.projectLinks = appState.projectLinks.filter((link) => projectNames.has(link.project));
    appState.registers = appState.registers.filter((item) => projectNames.has(item.project));
    appState.users = appState.users.filter((user) => user.role !== "super_admin" && user.companyId === companyId);
    appState.trash = appState.trash.map((item) => ({ ...item, companyId })).filter((item) => item.companyId === companyId);
    companyRegistry = companyRegistryFromLocalState().filter((company) => company.id === companyId);
  }
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

async function changeBackendUserPassword(userId, password) {
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
    parentTaskId: parentTaskInput.value,
    dependencyIds: [...taskDependenciesInput.selectedOptions].map((option) => option.value).filter((id) => id !== taskId.value),
    timeEntries: existingTask?.timeEntries || [],
    comments: existingTask?.comments || [],
    attachments: existingTask?.attachments || []
  };
  if (!projectExists(task.project)) return;
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
  resetForm();
  closeTaskComposer();
  render();
});

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

    const commentForm = event.target.closest(".comment-form");
    if (!commentForm || !currentUser) return;
    event.preventDefault();
    if (!canContribute()) return;
    const task = appState.tasks.find((item) => item.id === commentForm.dataset.taskId);
    const input = commentForm.elements.comment;
    const value = input.value.trim();
    if (!task || !value) return;
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
    render();
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
    const button = event.target.closest("button[data-panel-size]");
    if (!button) return;
    const panelKey = panel.dataset.dashboardPanel;
    const currentSizes = normalizeDashboardPanelSizes(appSettings.dashboardPanelSizes);
    const requestedSize = button.dataset.panelSize;
    currentSizes[panelKey] = currentSizes[panelKey] === requestedSize ? "normal" : requestedSize;
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

refreshAuditLogsButton?.addEventListener("click", fetchAuditLogs);
refreshMailHistoryButton?.addEventListener("click", fetchMailHistory);
refreshPlatformCompaniesButton?.addEventListener("click", () => {
  fetchPlatformCompanies();
  fetchAuditLogs();
  fetchMailHistory();
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
  const r = await fetch(`${SUPABASE_URL}/auth/v1/recover`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "content-type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return r.ok;
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
  if (isSupabasePrimaryMode() && !username.includes("@")) {
    loginError.textContent = "Online rejimdə dəyişikliklərin yadda qalması üçün email ilə Supabase login edin.";
    return;
  }
  if (canUseSupabase()) {
    try {
      const user = await supabaseLoginWorkspace(username, password);
      if (user) {
        loginError.textContent = "";
        loginPassword.value = "";
        appSettings = loadSettings();
        ensureTenantSeedData();
        render();
        return;
      }
    } catch (error) {
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
  render();
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
    role: "manager",
    managerId: "",
    companyId,
    profile: {
      fullName,
      email,
      position: "Project Manager",
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

addUserButton.addEventListener("click", () => {
  // Telebe-Hotel: yalnız org admin istifadəçi əlavə edə bilər (manager/moderator yox)
  if (!canManageOrgUsers()) return;
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
    try {
      await changeBackendUserPassword(user.id, password);
    } catch (error) {
      console.warn("Backend user password change failed", error);
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
    appState.users = appState.users.filter((user) => user.id !== button.dataset.id);
    appState.projects = appState.projects.map((project) => ({ ...project, managerIds: (project.managerIds || []).filter((id) => id !== button.dataset.id) }));
    appState.users = appState.users.map((user) => user.managerId === button.dataset.id ? { ...user, managerId: "" } : user);
    saveResources();
    saveUsers();
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
    user.role = profileForm.elements.role.value;
  }
  user.profile = {
    fullName: profileForm.elements.fullName.value.trim(),
    fatherName: profileForm.elements.fatherName.value.trim(),
    email: profileForm.elements.email.value.trim(),
    position: profileForm.elements.position.value.trim(),
    phone: profileForm.elements.phone.value.trim(),
    address: profileForm.elements.address.value.trim(),
    company: profileForm.elements.company.value.trim()
  };
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
projectResourceInput.addEventListener("change", () => {
  if (projectResourceInput.value) {
    ownerInput.value = projectResourceInput.value;
  }
});

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
  const project = isNew
    ? createProject(projectNameInput.value, payload)
    : updateProject(activeProjectEditId, payload);
  if (!project) return;
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
quickManagerSaveBtn?.addEventListener("click", () => {
  if (!isAdmin()) { alert("Manager yaratmaq üçün admin icazəsi tələb olunur."); return; }
  const username = quickManagerUsernameInput.value.trim();
  const password = quickManagerPasswordInput.value;
  const fullName = quickManagerFullNameInput.value.trim();
  if (!username || !password) { quickManagerUsernameInput.focus(); return; }
  if (appState.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    alert(`"${username}" artıq mövcuddur`);
    return;
  }
  const companyId = currentCompanyId();
  const companyName = appState.customers.find((c) => c.companyId === companyId)?.name || "";
  const newManager = normalizeUser({
    id: createId(),
    username,
    passwordHash: md5(password),
    role: "manager",
    managerId: "",
    companyId,
    profile: { fullName: fullName || username, position: "Project Manager", company: companyName, email: "", fatherName: "", phone: "", address: "" }
  });
  appState.users.push(newManager);
  saveResources();
  renderResourceControls();
  projectLeaderInput.value = newManager.id;
  quickManagerForm.hidden = true;
  quickManagerFullNameInput.value = "";
  quickManagerUsernameInput.value = "";
  quickManagerPasswordInput.value = "";
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

projectCards.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const projectName = button.dataset.project;
  if (!projectName) return;
  if (button.dataset.projectAction === "add-task") {
    openTaskComposerForProject(projectName);
    return;
  }
  if (button.dataset.projectAction === "edit") {
    openProjectEditor(projectName);
    return;
  }
  if (button.dataset.projectAction === "archive") {
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
    const project = appState.projects.find((item) => item.name === projectName);
    if (project) {
      project.archived = false;
      saveResources();
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "delete") {
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
    project.archived = false;
    saveResources();
    render();
    return;
  }
  if (button.dataset.projectAction === "delete") {
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
  if (window.location?.hash?.includes("access_token=")) {
    await handleSupabaseAuthRedirect();
  } else if (isSupabasePrimaryMode() && loadSupabaseSession()?.access_token) {
    // Always attempt session restore; resumeSupabaseSession handles token refresh internally
    await resumeSupabaseSession().catch((error) => console.warn("Supabase resume failed", error));
  }
  render();
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
function renderSnapshotList() {
  const container = document.querySelector("#snapshotList");
  if (!container) return;
  const snaps = listAutoSnapshots();
  if (!snaps.length) { container.innerHTML = '<em style="color:var(--muted);font-size:.83rem">Snapshot yoxdur</em>'; return; }
  container.innerHTML = snaps.map((s, i) => `
    <div class="snapshot-item">
      <span class="snapshot-date">${new Date(s.savedAt).toLocaleString("az-AZ")}</span>
      <span class="snapshot-meta">${(s.payload?.tasks?.length || 0)} task · ${(s.payload?.projects?.length || 0)} layihə</span>
      <button class="snapshot-restore-btn" data-snap="${i}" type="button">Bərpa et</button>
    </div>`).join("");
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".snapshot-restore-btn");
    if (!btn) return;
    const snap = snaps[parseInt(btn.dataset.snap)];
    if (!snap?.payload) return;
    if (!confirm("Bu snapshot bərpa edilsin? Cari data əvəz olunacaq.")) return;
    importBackup(snap.payload);
    saveState(); render();
    showToast("✅ Snapshot bərpa edildi");
  }, { once: true });
}

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
    <button type="button" id="exportExcelBtn" class="export-btn">📊 Excel</button>
    <button type="button" id="exportPdfBtn"   class="export-btn">📄 PDF</button>`;
  reports.prepend(wrap);
  document.querySelector("#exportExcelBtn").addEventListener("click", () => lazyLoadExportLibs(exportToExcel));
  document.querySelector("#exportPdfBtn").addEventListener("click",   () => lazyLoadExportLibs(exportToPDF));
}

// ════════════════════════════════════════════════════════════════════
// #9 — Service Worker registration
// ════════════════════════════════════════════════════════════════════
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" })
    .then(r => console.log("SW registered:", r.scope))
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
