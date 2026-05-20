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
    overdueTasks: "Gecikən task",
    riskFocus: "Risk fokus",
    myTasks: "Mənim tasklarım",
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
    platformCompanies: "Şirkətlər",
    companyStatus: "Status",
    companyPlan: "Plan",
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
    deadlineCalendar: "Deadline təqvimi",
    rangeStart: "Başlama",
    rangeEnd: "Bitmə",
    selectedDay: "Seçilən gün",
    projectAndTask: "Layihə və task",
    selectCalendarDay: "Təqvimdə gün seçin.",
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
    blockedTasks: "Bloklanmış task",
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
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
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
    statuses: { "Plan": "Plan", "Davam edir": "Davam edir", "Bitib": "Bitib" },
    priorities: { "Normal": "Normal", "Yüksək": "Yüksək", "Aşağı": "Aşağı" }
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
    overdueTasks: "Просроченные задачи",
    riskFocus: "Фокус на риске",
    myTasks: "Мои задачи",
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
    platformCompanies: "Компании",
    companyStatus: "Статус",
    companyPlan: "План",
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
    testMail: "Test email",
    mailTestSent: "Test email was sent.",
    mailTestSkipped: "Test email was not sent. Check email settings.",
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
    deadlineCalendar: "Календарь дедлайнов",
    rangeStart: "Начало",
    rangeEnd: "Конец",
    selectedDay: "Выбранный день",
    projectAndTask: "Проект и таск",
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
    blockedTasks: "Заблокированные задачи",
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
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
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
    statuses: { "Plan": "План", "Davam edir": "В работе", "Bitib": "Выполнено" },
    priorities: { "Normal": "Нормальный", "Yüksək": "Высокий", "Aşağı": "Низкий" }
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
    overdueTasks: "Overdue tasks",
    riskFocus: "Risk focus",
    myTasks: "My tasks",
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
    platformCompanies: "Companies",
    companyStatus: "Status",
    companyPlan: "Plan",
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
    deadlineCalendar: "Deadline calendar",
    rangeStart: "Start",
    rangeEnd: "End",
    selectedDay: "Selected day",
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
    blockedTasks: "Blocked tasks",
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
    exportData: "Backup",
    exportExcel: "Excel export",
    exportPdf: "PDF export",
    importData: "Import",
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
    statuses: { "Plan": "Plan", "Davam edir": "In progress", "Bitib": "Done" },
    priorities: { "Normal": "Normal", "Yüksək": "High", "Aşağı": "Low" }
  }
};

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function md5(input) {
  function add32(a, b) {
    return (a + b) & 0xffffffff;
  }

  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function md5Cycle(state, block) {
    let [a, b, c, d] = state;
    const oa = a;
    const ob = b;
    const oc = c;
    const od = d;

    a = ff(a, b, c, d, block[0], 7, -680876936);
    d = ff(d, a, b, c, block[1], 12, -389564586);
    c = ff(c, d, a, b, block[2], 17, 606105819);
    b = ff(b, c, d, a, block[3], 22, -1044525330);
    a = ff(a, b, c, d, block[4], 7, -176418897);
    d = ff(d, a, b, c, block[5], 12, 1200080426);
    c = ff(c, d, a, b, block[6], 17, -1473231341);
    b = ff(b, c, d, a, block[7], 22, -45705983);
    a = ff(a, b, c, d, block[8], 7, 1770035416);
    d = ff(d, a, b, c, block[9], 12, -1958414417);
    c = ff(c, d, a, b, block[10], 17, -42063);
    b = ff(b, c, d, a, block[11], 22, -1990404162);
    a = ff(a, b, c, d, block[12], 7, 1804603682);
    d = ff(d, a, b, c, block[13], 12, -40341101);
    c = ff(c, d, a, b, block[14], 17, -1502002290);
    b = ff(b, c, d, a, block[15], 22, 1236535329);

    a = gg(a, b, c, d, block[1], 5, -165796510);
    d = gg(d, a, b, c, block[6], 9, -1069501632);
    c = gg(c, d, a, b, block[11], 14, 643717713);
    b = gg(b, c, d, a, block[0], 20, -373897302);
    a = gg(a, b, c, d, block[5], 5, -701558691);
    d = gg(d, a, b, c, block[10], 9, 38016083);
    c = gg(c, d, a, b, block[15], 14, -660478335);
    b = gg(b, c, d, a, block[4], 20, -405537848);
    a = gg(a, b, c, d, block[9], 5, 568446438);
    d = gg(d, a, b, c, block[14], 9, -1019803690);
    c = gg(c, d, a, b, block[3], 14, -187363961);
    b = gg(b, c, d, a, block[8], 20, 1163531501);
    a = gg(a, b, c, d, block[13], 5, -1444681467);
    d = gg(d, a, b, c, block[2], 9, -51403784);
    c = gg(c, d, a, b, block[7], 14, 1735328473);
    b = gg(b, c, d, a, block[12], 20, -1926607734);

    a = hh(a, b, c, d, block[5], 4, -378558);
    d = hh(d, a, b, c, block[8], 11, -2022574463);
    c = hh(c, d, a, b, block[11], 16, 1839030562);
    b = hh(b, c, d, a, block[14], 23, -35309556);
    a = hh(a, b, c, d, block[1], 4, -1530992060);
    d = hh(d, a, b, c, block[4], 11, 1272893353);
    c = hh(c, d, a, b, block[7], 16, -155497632);
    b = hh(b, c, d, a, block[10], 23, -1094730640);
    a = hh(a, b, c, d, block[13], 4, 681279174);
    d = hh(d, a, b, c, block[0], 11, -358537222);
    c = hh(c, d, a, b, block[3], 16, -722521979);
    b = hh(b, c, d, a, block[6], 23, 76029189);
    a = hh(a, b, c, d, block[9], 4, -640364487);
    d = hh(d, a, b, c, block[12], 11, -421815835);
    c = hh(c, d, a, b, block[15], 16, 530742520);
    b = hh(b, c, d, a, block[2], 23, -995338651);

    a = ii(a, b, c, d, block[0], 6, -198630844);
    d = ii(d, a, b, c, block[7], 10, 1126891415);
    c = ii(c, d, a, b, block[14], 15, -1416354905);
    b = ii(b, c, d, a, block[5], 21, -57434055);
    a = ii(a, b, c, d, block[12], 6, 1700485571);
    d = ii(d, a, b, c, block[3], 10, -1894986606);
    c = ii(c, d, a, b, block[10], 15, -1051523);
    b = ii(b, c, d, a, block[1], 21, -2054922799);
    a = ii(a, b, c, d, block[8], 6, 1873313359);
    d = ii(d, a, b, c, block[15], 10, -30611744);
    c = ii(c, d, a, b, block[6], 15, -1560198380);
    b = ii(b, c, d, a, block[13], 21, 1309151649);
    a = ii(a, b, c, d, block[4], 6, -145523070);
    d = ii(d, a, b, c, block[11], 10, -1120210379);
    c = ii(c, d, a, b, block[2], 15, 718787259);
    b = ii(b, c, d, a, block[9], 21, -343485551);

    state[0] = add32(a, oa);
    state[1] = add32(b, ob);
    state[2] = add32(c, oc);
    state[3] = add32(d, od);
  }

  function blocks(bytes) {
    const result = [];
    for (let i = 0; i < bytes.length; i += 64) {
      const block = new Array(16).fill(0);
      for (let j = 0; j < 64 && i + j < bytes.length; j += 1) {
        block[j >> 2] |= bytes[i + j] << ((j % 4) << 3);
      }
      result.push(block);
    }
    return result;
  }

  const bytes = Array.from(new TextEncoder().encode(String(input)));
  const bitLength = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 0; i < 8; i += 1) {
    bytes.push((bitLength / (2 ** (8 * i))) & 0xff);
  }

  const state = [1732584193, -271733879, -1732584194, 271733878];
  blocks(bytes).forEach((block) => md5Cycle(state, block));
  return state.map((word) => {
    let hex = "";
    for (let i = 0; i < 4; i += 1) {
      hex += ((word >> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    }
    return hex;
  }).join("");
}

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
const dashboardCalendarStart = document.querySelector("#dashboardCalendarStart");
const dashboardCalendarEnd = document.querySelector("#dashboardCalendarEnd");
const calendarStart = document.querySelector("#calendarStart");
const calendarEnd = document.querySelector("#calendarEnd");
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
const projectNameInput = document.querySelector("#projectName");
const projectCustomerInput = document.querySelector("#projectCustomer");
const projectLeaderInput = document.querySelector("#projectLeader");
const projectTeamMembersInput = document.querySelector("#projectTeamMembers");
const addProjectTeamMembersButton = document.querySelector("#addProjectTeamMembers");
const selectedProjectTeamMembers = document.querySelector("#selectedProjectTeamMembers");
const projectStartDateInput = document.querySelector("#projectStartDate");
const projectEndDateInput = document.querySelector("#projectEndDate");
const projectStatusInput = document.querySelector("#projectStatus");
const projectPriorityInput = document.querySelector("#projectPriority");
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
const openAdminPanelButton = document.querySelector("#openAdminPanel");
const closeAdminPanelButton = document.querySelector("#closeAdminPanel");
const adminModal = document.querySelector("#adminModal");
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
let companyRegistry = [];

let tasks = loadTasks();
let members = loadMembers();
let teams = loadTeams();
let projects = loadProjects();
let projectLinks = loadProjectLinks();
let customers = loadCustomers();
let managedFiles = loadManagedFiles();
let registers = loadRegisters();
let users = loadUsers();
let trash = loadTrash();
let currentUser = loadSession();
let appSettings = loadSettings();
statuses = normalizeWorkflowStatuses(appSettings.workflowStatuses);
let currentFilter = "Hamısı";
let currentPriorityFilter = "Hamısı";
let currentSmartFilter = "Hamısı";
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
saveUsers();

function text(key) {
  return translations[currentLanguage][key] || translations.az[key] || key;
}

function statusLabel(status) {
  return translations[currentLanguage].statuses[status] || status;
}

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
    const priorities = ["Yüksək", "Normal", "Aşağı"];
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
  const currentClinicTasks = tasks
    .filter((task) => task.project === clinicPortfolioProject.name && clinicTaskNames.has(task.name))
    .map((task) => [task.name, task]);
  const currentClinicTaskMap = new Map(currentClinicTasks);

  tasks = createClinicPortfolioTasks().map((task) => {
    const existing = currentClinicTaskMap.get(task.name);
    return existing ? normalizeTask({ ...task, id: existing.id || task.id, comments: existing.comments || [], attachments: existing.attachments || [] }) : task;
  });
  members = [];
  teams = [];
  projects = [normalizeProject({ ...clinicPortfolioProject })];
  projectLinks = [];
  customers = [{ id: "customer-clinic", name: "Klinika", contact: "Klinika İT Şöbəsi", email: "" }];
  managedFiles = [];
  registers = [
    ...registers
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
  trash = [];
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

  tasks = tasks.filter((task) => task.project !== selectedProject);
  registers = registers.filter((item) => item.project !== selectedProject);
  projectLinks = projectLinks.filter((link) => link.project !== selectedProject);
  projects = projects.filter((project) => project.name !== selectedProject);
  saveTasks();
  saveResources();
  saveRegisters();
}

function enforceClinicOnlyState() {
  const before = JSON.stringify({ tasks, projects, members, teams, projectLinks, customers, managedFiles, registers, trash });
  loadClinicPortfolioState();
  return before !== JSON.stringify({ tasks, projects, members, teams, projectLinks, customers, managedFiles, registers, trash });
}

function ensureDemoData() {
  let changedTasks = false;
  let changedResources = false;
  let changedUsers = false;

  demoUsers.forEach((user) => {
    if (!users.some((item) => item.id === user.id || item.username === user.username)) {
      users.push(normalizeUser({ ...user }));
      changedUsers = true;
    }
  });

  demoCustomers.forEach((customer) => {
    if (!customers.some((item) => item.id === customer.id || item.name === customer.name)) {
      customers.push(normalizeCustomer({ ...customer }));
      changedResources = true;
    }
  });

  demoTeamTemplates.forEach((team) => {
    if (!teams.some((item) => item.id === team.id)) {
      teams.push({ ...team, memberIds: [...team.memberIds] });
      changedResources = true;
    }
  });

  demoProjects.forEach((project) => {
    if (!projects.some((item) => item.id === project.id || item.name === project.name)) {
      projects.push(normalizeProject({ ...project }));
      changedResources = true;
    }
  });

  demoProjectLinks.forEach((link) => {
    if (!projectLinks.some((item) => item.project === link.project && item.resource === link.resource)) {
      projectLinks.push({ ...link });
      changedResources = true;
    }
  });

  demoTaskTemplates.forEach((task) => {
    if (!tasks.some((item) => item.project === task.project && item.name === task.name)) {
      tasks.push(normalizeTask({ ...task, id: createId() }));
      changedTasks = true;
    }
  });

  if (changedTasks) saveTasks();
  if (changedResources) saveResources();
  if (changedUsers) saveUsers();
}

function loadJson(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback();
  try {
    return JSON.parse(stored);
  } catch {
    return fallback();
  }
}

function loadMembers() {
  return loadJson(membersKey, () => []);
}

function loadTeams() {
  return loadJson(teamsKey, () => []);
}

function loadProjects() {
  const stored = loadJson(projectsKey, () => []);
  if (stored.length) return stored.map(normalizeProject);
  return [normalizeProject({ ...clinicPortfolioProject })];
}

function loadProjectLinks() {
  return loadJson(projectLinksKey, () => []);
}

function loadCustomers() {
  return loadJson(customersKey, () => [{ id: "customer-clinic", name: "Klinika", contact: "Klinika İT Şöbəsi", email: "" }]).map(normalizeCustomer);
}

function loadManagedFiles() {
  return loadJson(managedFilesKey, () => []);
}

function loadUsers() {
  const stored = loadJson(usersKey, () => demoUsers.map((user) => ({ ...user })));
  const merged = [
    ...stored,
    ...demoUsers.filter((demoUser) => !stored.some((user) => user.username === demoUser.username))
  ];
  return merged.map(normalizeUser);
}

function companyIdFromName(name) {
  const slug = String(name || "workspace").trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return `company-${slug || createId()}`;
}

function slugFromName(name) {
  return String(name || "workspace").trim().toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 32) || "workspace";
}

function uniqueUsername(base) {
  const cleanBase = slugFromName(base);
  if (!users.some((user) => user.username === cleanBase)) return cleanBase;
  let index = 2;
  while (users.some((user) => user.username === `${cleanBase}${index}`)) index += 1;
  return `${cleanBase}${index}`;
}

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
  if (user.passwordHash) {
    return normalized;
  }
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

function loadTrash() {
  return loadJson(trashKey, () => []);
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
    createdAt: item.createdAt || new Date().toISOString()
  };
}

function loadRegisters() {
  return loadJson(registersKey, () => []).map(normalizeRegisterItem);
}

function loadLocalAuditLogs() {
  return loadJson(localAuditKey, () => []);
}

function loadNotifications() {
  return loadJson(notificationsKey, () => []);
}

function saveLocalAuditLogs() {
  localStorage.setItem(localAuditKey, JSON.stringify(localAuditLogs.slice(0, 200)));
}

function saveNotifications() {
  localStorage.setItem(notificationsKey, JSON.stringify(notifications.slice(0, 200)));
}

function currentCompanyId() {
  return currentUser?.companyId || "company-default";
}

function isSameCompany(item) {
  return !item?.companyId || item.companyId === currentCompanyId();
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
  users.forEach((user) => {
    if (user.role === "super_admin") return;
    const companyId = user.companyId || "company-default";
    const list = usersByCompany.get(companyId) || [];
    list.push(user);
    usersByCompany.set(companyId, list);
  });
  const projectCounts = new Map();
  projects.forEach((project) => {
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
      createdAt: existing.get(companyId)?.createdAt || new Date().toISOString()
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

function defaultSettings() {
  return {
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
}

function loadSession() {
  const userId = localStorage.getItem(sessionKey);
  return userId ? users?.find((user) => user.id === userId) || null : null;
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
    timeEntries: Array.isArray(task.timeEntries) ? task.timeEntries.map(normalizeTimeEntry).filter(Boolean) : [],
    dateChangeRequests: Array.isArray(task.dateChangeRequests) ? task.dateChangeRequests : [],
    dependencyIds: Array.isArray(task.dependencyIds) ? task.dependencyIds : []
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

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  scheduleBackendSave();
}

function saveResources() {
  localStorage.setItem(membersKey, JSON.stringify(members));
  localStorage.setItem(teamsKey, JSON.stringify(teams));
  localStorage.setItem(projectsKey, JSON.stringify(projects));
  localStorage.setItem(projectLinksKey, JSON.stringify(projectLinks));
  localStorage.setItem(customersKey, JSON.stringify(customers));
  localStorage.setItem(managedFilesKey, JSON.stringify(managedFiles));
  scheduleBackendSave();
}

function saveUsers() {
  localStorage.setItem(usersKey, JSON.stringify(users));
  scheduleBackendSave();
}

function saveTrash() {
  localStorage.setItem(trashKey, JSON.stringify(trash));
  scheduleBackendSave();
}

function saveRegisters() {
  localStorage.setItem(registersKey, JSON.stringify(registers));
  scheduleBackendSave();
}

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function daysBetween(start, end) {
  return Math.round((parseDate(end) - parseDate(start)) / 86400000);
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

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

function todayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function daysUntil(value) {
  return Math.round((parseDate(value) - todayStart()) / 86400000);
}

function fileSizeLabel(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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

function readSelectedAttachments(input) {
  if (!input?.files?.length) return Promise.resolve([]);
  return Promise.all([...input.files].map(readFileAsAttachment));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function statusClass(status) {
  if (status === "Bitib") return "done";
  if (status !== "Plan") return "active";
  return "plan";
}

function priorityClass(priority) {
  return priority === "Yüksək" ? "high" : "";
}

function getProject(task) {
  return task.project || text("unassignedProject");
}

function projectExists(name) {
  return projects.some((project) => project.name === name);
}

function createProject(name, details = {}) {
  const cleanName = name.trim();
  const companyId = currentCompanyId();
  if (!cleanName || projects.some((project) => project.companyId === companyId && project.name.toLowerCase() === cleanName.toLowerCase())) return false;
  const defaultManagerId = currentUser?.role === "manager"
    ? currentUser.id
    : users.find((user) => user.role === "manager" && user.companyId === companyId)?.id || "";
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
    charter: details.charter || {}
  });
  projects.push(project);
  project.teamMemberIds.forEach((resource) => {
    if (!projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
      projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  recordAudit("project.created", "project", project.id, project.name);
  return project;
}

function updateProject(projectId, details = {}) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;
  const cleanName = details.name.trim();
  const companyId = project.companyId || currentCompanyId();
  if (!cleanName || projects.some((item) => item.id !== projectId && item.companyId === companyId && item.name.toLowerCase() === cleanName.toLowerCase())) return null;
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
  project.charter = { ...(project.charter || {}), ...(details.charter || {}) };
  if (previousName !== cleanName) {
    tasks = tasks.map((task) => task.project === previousName ? { ...task, project: cleanName } : task);
    projectLinks = projectLinks.map((link) => link.project === previousName ? { ...link, project: cleanName } : link);
    saveTasks();
  }
  projectLinks = projectLinks.filter((link) => link.project !== cleanName || !link.resource.startsWith("user:"));
  project.teamMemberIds.forEach((resource) => {
    if (!projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
    projectLinks.push({ id: createId(), companyId, project: cleanName, resource });
    }
  });
  saveResources();
  recordAudit("project.updated", "project", project.id, project.name);
  return project;
}

function projectGateError(payload) {
  const charter = payload.charter || {};
  const gateCount = Array.isArray(charter.gateChecklist) ? charter.gateChecklist.length : 0;
  if (["Execution", "Monitoring", "Closing", "Closed"].includes(payload.lifecycle)) {
    if (!charter.goal || !charter.scope || !charter.successCriteria || gateCount === 0) {
      return "Execution üçün charter, scope, success criteria və planning gate checklist doldurulmalıdır.";
    }
  }
  if (payload.lifecycle === "Closed" && !charter.closureNotes) {
    return "Closed mərhələsi üçün closure / lessons learned qeydi doldurulmalıdır.";
  }
  return "";
}

function parseGovernanceLines(value) {
  return String(value || "").split("\n").map((item) => item.trim()).filter(Boolean);
}

function governanceLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function managerUsers(managerId) {
  return users.filter((user) => user.managerId === managerId);
}

function projectManagers(project) {
  return users.filter((user) => (project.managerIds || []).includes(user.id));
}

function customerLabel(customerId) {
  if (!customerId) return text("empty");
  const customer = customers.find((item) => item.id === customerId);
  return customer?.name || text("empty");
}

function canSeeProject(project) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  if (project.companyId && project.companyId !== currentCompanyId()) return false;
  if (isAdmin()) return true;
  return projectHasRoleAccess(project)
    || projectHasResourceAccess(project.name)
    || tasks.some((task) => task.project === project.name && taskHasDirectAccess(task));
}

function visibleProjects() {
  return projects.filter((project) => !project.archived).filter(canSeeProject);
}

function canSeeTask(task) {
  if (!currentUser) return true;
  if (isSuperAdmin()) return false;
  const project = projects.find((item) => item.name === task.project);
  if (project?.companyId && project.companyId !== currentCompanyId() && !isAdmin()) return false;
  if (isAdmin() && (!project || isSameCompany(project))) return true;
  return projectHasRoleAccess(project)
    || taskHasDirectAccess(task)
    || projectHasResourceAccess(task.project);
}

function accessibleTasks() {
  return tasks.filter(canSeeTask);
}

function openProjectPage(projectName) {
  projectFilter.value = projectName;
  currentView = "list";
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === "list"));
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
    const user = users.find((item) => item.id === id);
    return user ? user.profile?.fullName || user.username : value;
  }
  if (type === "member") {
    const member = members.find((item) => item.id === id);
    return member ? member.name : value;
  }
  if (type === "team") {
    const team = teams.find((item) => item.id === id);
    return team ? team.name : value;
  }
  return value;
}

function userDisplayLabel(username) {
  const user = users.find((item) => item.username === username || item.id === username);
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
    ...users
      .filter((user) => user.role === "manager" && user.companyId === companyId)
      .map((user) => `<option value="${user.id}" ${user.id === selectedId ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
  ].join("");
}

function managerMultiOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return users
    .filter((user) => user.role === "manager" && user.companyId === companyId)
    .map((user) => `<option value="${user.id}" ${selectedIds.includes(user.id) ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
    .join("");
}

function allResourceOptions() {
  const companyId = currentCompanyId();
  return [
    ...users.filter((user) => !["admin", "super_admin"].includes(user.role) && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) })),
    ...teams.filter((team) => isSameCompany(team)).map((team) => ({ value: resourceValue("team", team.id), label: team.name, type: text("team") }))
  ];
}

function teamMemberOptions(selectedIds = []) {
  const companyId = currentCompanyId();
  return [
    ...users.filter((user) => !["admin", "super_admin"].includes(user.role) && user.companyId === companyId).map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: roleLabel(user.role) }))
  ].map((option) => `<option value="${option.value}" ${selectedIds.includes(option.value) ? "selected" : ""}>${option.type}: ${escapeHtml(option.label)}</option>`).join("");
}

function taskOptionItems(selectedIds = [], excludedId = "") {
  return tasks
    .filter((task) => task.id !== excludedId)
    .map((task) => `<option value="${task.id}" ${selectedIds.includes(task.id) ? "selected" : ""}>${escapeHtml(task.name)} (${escapeHtml(getProject(task))})</option>`)
    .join("");
}

function taskNameById(id) {
  return tasks.find((task) => task.id === id)?.name || "";
}

function incompleteDependencies(task) {
  return (task.dependencyIds || [])
    .map((id) => tasks.find((item) => item.id === id))
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

function linkedResourcesForProject(project) {
  const directLinks = projectLinks.filter((link) => link.project === project).map((link) => link.resource);
  const projectMembers = projects.find((item) => item.name === project)?.teamMemberIds || [];
  return [...new Set([...directLinks, ...projectMembers])];
}

function resourceIncludesUser(resource, userId) {
  if (!resource || !userId) return false;
  if (resource === resourceValue("user", userId)) return true;
  if (!resource.startsWith("team:")) return false;
  const teamId = resource.split(":")[1];
  const team = teams.find((item) => item.id === teamId);
  return Boolean(team?.memberIds?.some((memberId) => memberId === userId || memberId === resourceValue("user", userId)));
}

function visibleUserIdsForCurrentUser() {
  if (!currentUser) return [];
  if (isSuperAdmin()) return [];
  if (isAdmin()) return users.filter((user) => user.companyId === currentCompanyId()).map((user) => user.id);
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
  return registers.filter((item) => {
    if (projectName && item.project !== projectName) return false;
    const project = projects.find((candidate) => candidate.name === item.project);
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
  const score = Math.max(0, Math.min(100, 100 - overdue * 8 - blocked * 7 - risks * 5 - issues * 4 - highRisks * 8));
  return { active: activeTasks.length, done: doneTasks.length, overdue, blocked, risks, issues, highRisks, completion, score };
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

function isSuperAdmin() {
  return currentUser?.role === "super_admin";
}

function canOpenAdminPanel() {
  return isSuperAdmin() || isAdmin();
}

function canManagePlatformSettings() {
  return isSuperAdmin();
}

function canManageMailSettings() {
  return isSuperAdmin() || isAdmin();
}

function canManageTasks() {
  return ["admin", "manager"].includes(currentUser?.role);
}

function canContribute() {
  return ["admin", "manager", "user", "contributor"].includes(currentUser?.role);
}

function canApproveGovernance() {
  return ["admin", "manager", "sponsor"].includes(currentUser?.role);
}

function canApproveDateRequest(task) {
  if (isAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}

function canApproveTask(task) {
  if (isAdmin()) return true;
  if (!["manager", "sponsor"].includes(currentUser?.role)) return false;
  const project = projects.find((item) => item.name === task.project);
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
  const selected = users.filter((user) => selectedIds.includes(user.id));
  selectedManagersPreview.innerHTML = selected.length
    ? selected.map((user) => `<span class="selected-manager-chip">${escapeHtml(user.profile?.fullName || user.username)}</span>`).join("")
    : `<div class="empty">${text("noManagersSelected")}</div>`;
}

function managerChoiceItems(selectedIds = []) {
  const managers = users.filter((user) => user.role === "manager");
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
  const project = projects.find((item) => item.id === projectId);
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
  projectStatusInput.value = "Plan";
  projectPriorityInput.value = "Normal";
  projectProgressInput.value = 0;
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
  const project = projects.find((item) => item.name === projectName);
  if (!project || !canManageTasks()) return;
  activeProjectEditId = project.id;
  selectedProjectTeamMemberIds = [...(project.teamMemberIds || [])];
  renderResourceControls();
  projectFormTitle.textContent = text("editProject");
  projectNameInput.value = project.name;
  projectCustomerInput.value = project.customerId || "";
  projectLeaderInput.value = project.managerIds?.[0] || "";
  projectStartDateInput.value = project.start || "";
  projectEndDateInput.value = project.end || "";
  projectStatusInput.value = project.status || "Plan";
  projectPriorityInput.value = project.priority || "Normal";
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
    .filter((task) => {
      if (!query) return true;
      return [task.name, task.project, resourceLabel(task.owner), task.notes]
        .some((value) => String(value || "").toLowerCase().includes(query));
    })
    .sort((a, b) => parseDate(a.start) - parseDate(b.start));
}

function renderProjectFilter() {
  const selected = projectFilter.value || "Hamısı";
  const projectNames = [...new Set([...visibleProjects().map((project) => project.name), ...tasks.filter((task) => isAdmin()).map(getProject)])].sort();
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
    userCount.textContent = users.filter((user) => user.role === "super_admin").length;
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
    userList.innerHTML = users.filter((user) => user.role === "super_admin").map((user) => `
      <details class="user-profile-card">
        <summary><span><strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>${escapeHtml(roleLabel(user.role))} · ${escapeHtml(user.username)}</span></summary>
      </details>
    `).join("") || `<div class="empty">${text("empty")}</div>`;
    if (companyRegistryList) {
      companyRegistryList.innerHTML = registry.length ? registry.map((company) => `
        <div class="resource-item company-registry-item">
          <span>
            <strong>${escapeHtml(company.name)}</strong>
            ${escapeHtml(company.subdomain)} · ${escapeHtml(company.status)} · ${escapeHtml(company.plan)}
            <small>${escapeHtml(company.adminUsername || "")} · ${company.userCount || 0} user · ${company.projectCount || 0} project</small>
          </span>
          <button type="button" data-company-action="${company.status === "suspended" ? "activate" : "suspend"}" data-id="${escapeHtml(company.id)}">
            ${company.status === "suspended" ? text("activateCompany") : text("suspendCompany")}
          </button>
        </div>
      `).join("") : `<div class="empty">${text("empty")}</div>`;
    }
    return;
  }
  const options = allResourceOptions();
  userCount.textContent = users.length;
  projectCount.textContent = projects.length;
  customerCount.textContent = customers.length;
  fileCount.textContent = managedFiles.length;
  teamCount.textContent = teams.length;
  linkCount.textContent = projectLinks.length;
  trashCount.textContent = trash.length;
  if (adminLaunchCounts.dateRequests) adminLaunchCounts.dateRequests.textContent = pendingDateRequests().length;
  if (adminLaunchCounts.companies) adminLaunchCounts.companies.textContent = companyRegistry.length || companyRegistryFromLocalState().length;
  if (adminLaunchCounts.projects) adminLaunchCounts.projects.textContent = projects.length;
  if (adminLaunchCounts.users) adminLaunchCounts.users.textContent = users.length;
  if (adminLaunchCounts.customers) adminLaunchCounts.customers.textContent = customers.length;
  if (adminLaunchCounts.files) adminLaunchCounts.files.textContent = managedFiles.length;
  if (adminLaunchCounts.teams) adminLaunchCounts.teams.textContent = teams.length;
  if (adminLaunchCounts.links) adminLaunchCounts.links.textContent = projectLinks.length;
  if (adminLaunchCounts.registers) adminLaunchCounts.registers.textContent = registers.length;
  if (adminLaunchCounts.trash) adminLaunchCounts.trash.textContent = trash.length;
  const currentProject = projectInput.value;
  projectInput.innerHTML = [
    `<option value="">${text("selectProject")}</option>`,
    ...visibleProjects().map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)}</option>`)
  ].join("");
  projectInput.value = projects.some((project) => project.name === currentProject) ? currentProject : "";

  const currentOwner = ownerInput.value;
  ownerInput.innerHTML = [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...options.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
  ].join("");
  ownerInput.value = options.some((option) => option.value === currentOwner) ? currentOwner : "";

  const selectedProject = projectInput.value.trim();
  const linked = selectedProject ? linkedResourcesForProject(selectedProject) : [];
  const projectOptions = linked.length ? options.filter((option) => linked.includes(option.value)) : options;
  const currentProjectResource = projectResourceInput.value;
  projectResourceInput.innerHTML = [
    `<option value="">${text("noResource")}</option>`,
    ...projectOptions.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
  ].join("");
  projectResourceInput.value = projectOptions.some((option) => option.value === currentProjectResource) ? currentProjectResource : "";

  const editingTaskId = taskId.value;
  const currentParent = parentTaskInput.value;
  const currentDependencies = [...taskDependenciesInput.selectedOptions].map((option) => option.value);
  parentTaskInput.innerHTML = [
    `<option value="">${text("noParentTask")}</option>`,
    taskOptionItems([currentParent], editingTaskId)
  ].join("");
  parentTaskInput.value = tasks.some((task) => task.id === currentParent && task.id !== editingTaskId) ? currentParent : "";
  taskDependenciesInput.innerHTML = taskOptionItems(currentDependencies, editingTaskId);

  teamMembersInput.innerHTML = teamMemberOptions();
  const currentLeader = projectLeaderInput.value || (currentUser?.role === "manager" ? currentUser.id : "");
  const currentCustomer = projectCustomerInput.value;
  projectCustomerInput.innerHTML = [
    `<option value="">${text("empty")}</option>`,
    ...customers.map((customer) => `<option value="${escapeHtml(customer.id)}">${escapeHtml(customer.name)}</option>`)
  ].join("");
  projectCustomerInput.value = customers.some((customer) => customer.id === currentCustomer) ? currentCustomer : "";
  projectLeaderInput.innerHTML = managerOptions(currentLeader);
  projectLeaderInput.value = users.some((user) => user.id === currentLeader && user.role === "manager") ? currentLeader : "";
  projectTeamMembersInput.innerHTML = teamMemberOptions();
  renderSelectedProjectTeamMembers();

  linkResourceInput.innerHTML = options.map((option) => (
    `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`
  )).join("");

  const currentRegisterProject = registerProjectInput.value;
  registerProjectInput.innerHTML = visibleProjects().map((project) => `<option value="${escapeHtml(project.name)}">${escapeHtml(project.name)}</option>`).join("");
  registerProjectInput.value = projects.some((project) => project.name === currentRegisterProject) ? currentRegisterProject : visibleProjects()[0]?.name || "";

  const currentRegisterOwner = registerOwnerInput.value;
  registerOwnerInput.innerHTML = [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...options.map((option) => `<option value="${option.value}">${option.type}: ${escapeHtml(option.label)}</option>`)
  ].join("");
  registerOwnerInput.value = options.some((option) => option.value === currentRegisterOwner) ? currentRegisterOwner : "";
  registerCount.textContent = registers.length;

  projectList.innerHTML = projects.length ? projects.map((project) => {
    const taskCount = tasks.filter((task) => task.project === project.name).length;
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

  teamList.innerHTML = teams.length ? teams.map((team) => {
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

  projectLinksList.innerHTML = projectLinks.length ? projectLinks.map((link) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(link.project)}</strong>${resourceTypeLabel(link.resource)}: ${escapeHtml(resourceLabel(link.resource))}</span>
      <button type="button" data-resource-action="delete-link" data-id="${link.id}">${text("remove")}</button>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;

  registerList.innerHTML = registers.length ? registers.map((item) => `
    <div class="resource-item register-item ${escapeHtml(item.type)}">
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        ${escapeHtml(item.project)} · ${registerTypeLabel(item.type)} · ${escapeHtml(registerStatusLabel(item.status))} · ${impactLabel(item.impact)} · ${shortDate(item.dueDate)}
        ${item.owner ? ` · ${escapeHtml(resourceLabel(item.owner))}` : ""}
        ${item.mitigation ? `<small>${escapeHtml(item.mitigation)}</small>` : ""}
      </span>
      <button type="button" data-register-action="delete" data-id="${item.id}">${text("remove")}</button>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;

  const shownUsers = isSuperAdmin()
    ? users.filter((user) => user.role === "super_admin")
    : isAdmin()
      ? users.filter((user) => user.role !== "super_admin" && user.companyId === currentCompanyId())
    : users.filter((user) => user.companyId === currentCompanyId() && (currentUser?.role === "manager" || user.managerId === currentUser?.id || user.id === currentUser?.id));
  userList.innerHTML = shownUsers.map((user) => `
    <details class="user-profile-card">
      <summary>
        <span><strong>${escapeHtml(user.profile?.fullName || user.username)}</strong>${escapeHtml(user.profile?.position || roleLabel(user.role))} · ${escapeHtml(user.username)}${user.managerId ? ` · ${escapeHtml(users.find((item) => item.id === user.managerId)?.username || "")}` : ""}</span>
      </summary>
      <form class="user-profile-form" data-user-id="${user.id}">
        <label><span>${text("login")}</span><input name="username" value="${escapeHtml(user.username)}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fullName")}</span><input name="fullName" value="${escapeHtml(user.profile?.fullName || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("fatherName")}</span><input name="fatherName" value="${escapeHtml(user.profile?.fatherName || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("email")}</span><input name="email" type="email" value="${escapeHtml(user.profile?.email || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("position")}</span><input name="position" value="${escapeHtml(user.profile?.position || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("phone")}</span><input name="phone" value="${escapeHtml(user.profile?.phone || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("address")}</span><input name="address" value="${escapeHtml(user.profile?.address || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label><span>${text("company")}</span><input name="company" value="${escapeHtml(user.profile?.company || "")}" ${isAdmin() ? "" : "readonly"}></label>
        <label class="admin-only"><span>${text("manager")}</span><select name="managerId">${managerOptions(user.managerId || "")}</select></label>
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
        ${isAdmin() ? `<button class="primary" type="submit">${text("saveProfile")}</button>` : ""}
        </div>
      </form>
    </details>
  `).join("");

  trashList.innerHTML = trash.length ? trash.map((item) => {
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
  return tasks.flatMap((task) => (task.dateChangeRequests || [])
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
  customerList.innerHTML = customers.length ? customers.map((customer) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(customer.name)}</strong>${escapeHtml([customer.contact, customer.email].filter(Boolean).join(" · "))}</span>
      <div class="mini-actions">
        <button type="button" data-customer-action="delete" data-id="${escapeHtml(customer.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function renderManagedFileList() {
  managedFileList.innerHTML = managedFiles.length ? managedFiles.map((file) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(file.name)}</strong>${fileSizeLabel(Number(file.size) || 0)} · ${escapeHtml(formatDateTime(file.createdAt))}</span>
      <div class="mini-actions">
        <a class="attachment-chip" href="${escapeHtml(file.dataUrl)}" download="${escapeHtml(file.name)}">${text("download")}</a>
        <button type="button" data-file-action="delete" data-id="${escapeHtml(file.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
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
  const total = Math.max(1, shownTasks.length);
  statusBars.innerHTML = statuses.map((status) => {
    const count = shownTasks.filter((task) => task.status === status).length;
    const width = Math.round((count / total) * 100);
    return `
      <div class="status-line">
        <div><span>${statusLabel(status)}</span><strong>${count}</strong></div>
        <div class="meter"><span class="${statusClass(status)}" style="width:${width}%"></span></div>
      </div>
    `;
  }).join("") + (() => {
    const counts = registerCounts();
    return `
      <div class="status-line register-summary-line">
        <div><span>${text("registerSummary")}</span><strong>${counts.risks + counts.issues + counts.milestones}</strong></div>
        <div class="task-meta">
          <span>${text("riskRegister")}: ${counts.risks}</span>
          <span>${text("issueRegister")}: ${counts.issues}</span>
          <span>${text("milestoneRegister")}: ${counts.milestones}</span>
        </div>
      </div>
    `;
  })();

  const upcoming = shownTasks
    .filter((task) => task.status !== "Bitib")
    .sort((a, b) => parseDate(a.end) - parseDate(b.end))
    .slice(0, 5);

  upcomingList.innerHTML = upcoming.length ? upcoming.map((task) => `
    <div class="compact-item">
      <strong>${escapeHtml(task.name)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(getProject(task))}</span>
        <span>${shortDate(task.end)}</span>
        <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("noUpcoming")}</div>`;

  const rows = workloadRows().slice(0, 6);
  workloadList.innerHTML = rows.length ? rows.map((row) => `
    <div class="compact-item">
      <strong>${escapeHtml(resourceLabel(row.owner))}</strong>
      <div class="task-meta">
        <span>${row.count} ${text("tasks")}</span>
        <span>${text("plannedHours")}: ${row.planned}</span>
        <span>${text("actualHours")}: ${row.actual}</span>
        <span>${row.load}%</span>
      </div>
      <div class="progress-mini"><span style="width:${Math.min(100, row.load)}%"></span></div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;

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
    <div class="compact-item ${alert.type}">
      <strong>${escapeHtml(task.name)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(getProject(task))}</span>
        <span>${shortDate(task.end)}</span>
        <span class="badge ${alert.type === "danger" ? "high" : ""}">${escapeHtml(alert.label)}</span>
      </div>
    </div>
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
    </div>
  `;
}

function nextActionItems() {
  const taskActions = accessibleTasks()
    .filter((task) => task.status !== "Bitib")
    .flatMap((task) => {
      const actions = [];
      const days = daysUntil(task.end);
      if (isTaskBlocked(task)) actions.push({ type: "blocked", priority: 1, label: text("actionBlocked"), title: task.name, meta: dependencyBlockedMessage(task), target: "blocked" });
      if (days < 0) actions.push({ type: "danger", priority: 2, label: text("actionOverdue"), title: task.name, meta: `${getProject(task)} · ${shortDate(task.end)}`, target: "overdue" });
      if (days >= 0 && days <= 3) actions.push({ type: "warning", priority: 3, label: text("actionDueSoon"), title: task.name, meta: `${getProject(task)} · ${shortDate(task.end)}`, target: "overdue" });
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
    <button class="compact-item action-item ${escapeHtml(action.type)}" type="button" data-action-filter="${escapeHtml(action.target)}">
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
  [dashboardCalendarStart, calendarStart].forEach((input) => { input.value = calendarRange.start; });
  [dashboardCalendarEnd, calendarEnd].forEach((input) => { input.value = calendarRange.end; });
  dashboardCalendar.innerHTML = renderCalendarMarkup(true);
  calendarBoard.innerHTML = renderCalendarMarkup(false);
  renderCalendarDetails();
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
    const memberNames = (project.teamMemberIds || []).map(resourceLabel).filter(Boolean);
    const counts = registerCounts(project.name);
    const nextGate = nextGateForProject(project);
    return `
      <article class="project-card">
        <div>
          <h3>${escapeHtml(project.name)}</h3>
          <div class="task-meta">
            <span>${text("projectLeader")}: ${escapeHtml(managerNames.join(", ") || text("noOwner"))}</span>
            <span>${text("customer")}: ${escapeHtml(customerLabel(project.customerId))}</span>
            <span>${text("projectTeamMembers")}: ${escapeHtml(memberNames.join(", ") || text("empty"))}</span>
            <span>${shortDate(project.start)} - ${shortDate(project.end)}</span>
            <span>Lifecycle: ${escapeHtml(project.lifecycle || "Initiation")}</span>
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
            <span class="badge ${priorityClass(project.priority)}">${priorityLabel(project.priority)}</span>
            <span>${percent}%</span>
            <span>${projectTasks.length} ${text("tasks")}</span>
            <span>${active} ${text("activeTasks")}</span>
            <span>${text("riskRegister")}: ${counts.risks}</span>
            <span>${text("issueRegister")}: ${counts.issues}</span>
            <span>${text("milestoneRegister")}: ${counts.milestones}</span>
          </div>
          <div class="progress-mini"><span style="width:${percent}%"></span></div>
          ${renderProjectGovernance(project)}
        </div>
        <div class="project-card-actions">
          <button type="button" data-project-action="open" data-project="${escapeHtml(project.name)}">${text("openProject")}</button>
          <button type="button" data-project-action="edit" data-project="${escapeHtml(project.name)}">${text("editProject")}</button>
          <button type="button" data-project-action="archive" data-project="${escapeHtml(project.name)}">${text("archiveProject")}</button>
          <button type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
          ${nextGate ? `<button type="button" data-project-action="approve-gate" data-gate="${escapeHtml(nextGate)}" data-project="${escapeHtml(project.name)}">Gate təsdiq et: ${escapeHtml(nextGate)}</button>` : ""}
          <button class="primary" type="button" data-project-action="add-task" data-project="${escapeHtml(project.name)}">${text("addTaskToProject")}</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  renderArchivedProjects();
}

function renderProjectGovernance(project) {
  const checklist = project.charter?.gateChecklist || [];
  const modules = [
    ["Maraqlı tərəflər", project.charter?.stakeholders],
    ["Kommunikasiya", project.charter?.communicationPlan],
    ["Qərar jurnalı", project.charter?.decisionLog],
    ["Dəyişiklik kontrolu", project.charter?.changeControl],
    ["Risk və imkan", project.charter?.riskOpportunity],
    ["Keyfiyyət", project.charter?.qualityChecklist],
    ["Kompetensiya", project.charter?.competenceMatrix]
  ];
  const hasModules = modules.some(([, rows]) => rows?.length);
  if (!project.charter?.goal && !project.charter?.scope && !project.charter?.successCriteria && !checklist.length && !project.charter?.closureNotes && !hasModules) return "";
  const approvals = project.charter?.gateApprovals || {};
  return `
    <div class="governance-summary">
      ${project.charter?.goal ? `<span><strong>Charter:</strong> ${escapeHtml(project.charter.goal)}</span>` : ""}
      ${project.charter?.scope ? `<span><strong>Scope:</strong> ${escapeHtml(project.charter.scope)}</span>` : ""}
      ${project.charter?.successCriteria ? `<span><strong>Success:</strong> ${escapeHtml(project.charter.successCriteria)}</span>` : ""}
      ${checklist.length ? `<span><strong>Gate:</strong> ${escapeHtml(checklist.join(" · "))}</span>` : ""}
      ${project.charter?.closureNotes ? `<span><strong>Closure:</strong> ${escapeHtml(project.charter.closureNotes)}</span>` : ""}
      ${modules.map(([label, rows]) => rows?.length ? `<span><strong>${label}:</strong> ${escapeHtml(rows.slice(0, 3).join(" · "))}${rows.length > 3 ? " ..." : ""}</span>` : "").join("")}
      <span><strong>Gate təsdiqləri:</strong> ${["Initiation", "Planning", "Execution", "Closing"].map((gate) => `${gate}: ${approvals[gate]?.approvedAt ? "OK" : "Gözləyir"}`).join(" · ")}</span>
    </div>
  `;
}

function nextGateForProject(project) {
  const approvals = project.charter?.gateApprovals || {};
  return ["Initiation", "Planning", "Execution", "Closing"].find((gate) => !approvals[gate]?.approvedAt) || "";
}

function renderArchivedProjects() {
  const archived = projects.filter((project) => project.archived).filter(canSeeProject);
  archivedProjectCards.innerHTML = archived.length ? archived.map((project) => `
    <article class="project-card archived-project-card">
      <div>
        <h3>${escapeHtml(project.name)}</h3>
        <div class="task-meta">
          <span>${shortDate(project.start)} - ${shortDate(project.end)}</span>
          <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
          <span>${Number(project.progress) || 0}%</span>
        </div>
      </div>
      <div class="project-card-actions">
        <button type="button" data-project-action="restore-archive" data-project="${escapeHtml(project.name)}">${text("restoreProject")}</button>
        <button type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
      </div>
    </article>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function renderTaskList() {
  const shown = visibleTasks();
  if (!shown.length) {
    taskList.innerHTML = `<div class="empty">${text("noTask")}</div>`;
    return;
  }

  taskList.innerHTML = shown.map((task) => {
    const blocked = isTaskBlocked(task);
    return `
    <article class="task-card ${blocked ? "blocked-task" : ""}">
      <div>
        <h3>${escapeHtml(task.name)}</h3>
        <div class="task-meta">
          <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
          <span class="badge ${priorityClass(task.priority)}">${priorityLabel(task.priority)}</span>
          ${blocked ? `<span class="badge blocked">${text("blocked")}</span>` : ""}
          <span>${escapeHtml(getProject(task))}</span>
          <span>${shortDate(task.start)} - ${shortDate(task.end)}</span>
          <span>${escapeHtml(resourceLabel(task.owner))}</span>
          <span>${text("plannedHours")}: ${plannedHoursForTask(task)}</span>
          <span>${text("actualHours")}: ${actualHoursForTask(task)}</span>
        </div>
        ${renderTaskRelations(task)}
        ${task.notes ? `<p>${escapeHtml(task.notes)}</p>` : ""}
        <div class="progress-mini"><span style="width:${Number(task.progress) || 0}%"></span></div>
        ${renderAttachments(task)}
        ${renderTimeEntries(task)}
        ${renderComments(task)}
      </div>
      ${renderTaskActions(task)}
    </article>
  `;
  }).join("");
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
        <time datetime="${escapeHtml(comment.createdAt || "")}">${escapeHtml(formatDateTime(comment.createdAt))}</time>
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
  const task = tasks.find((item) => item.id === id);
  if (!task || !taskDetailModal) return;
  const project = projects.find((item) => item.name === task.project);
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
        ${renderComments(task)}
        ${renderAttachments(task)}
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
  const projectMilestones = registers
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
    ? projects.find((project) => project.id === id)
    : tasks.find((task) => task.id === id);
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
    .filter((project) => selectedProject !== "Hamısı" || reportTasks.some((task) => task.project === project.name));
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
    return `
      <article class="report-project">
        <h3>${escapeHtml(project.name)}</h3>
        <div class="report-rows">${rows}</div>
        <h3>${text("projectRegisters")}</h3>
        <div class="report-rows">${registerRows}</div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  reports.innerHTML = summary + reports.innerHTML;
}

function renderViews() {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${currentView}View`));
}

function setView(view) {
  currentView = view;
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
  render();
}

function applyStatusFilter(status) {
  currentFilter = status || "Hamısı";
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
  renderProjectFilter();
  renderResourceControls();
  renderSummary();
  renderDashboard();
  renderProjectsView();
  renderTaskList();
  renderKanban();
  renderCalendar();
  renderGantt();
  renderReports();
  renderActivityLists();
  renderViews();
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
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  if (action === "edit") {
    if (!canManageTasks()) return;
    taskId.value = task.id;
    taskName.value = task.name;
    projectInput.value = task.project || "";
    renderResourceControls();
    projectInput.value = task.project || "";
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
    trash.push({ id: createId(), companyId: currentCompanyId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
    tasks = tasks.filter((item) => item.id !== task.id);
    saveTrash();
    saveTasks();
    render();
  }
}

function editTask(id, options = {}) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;
  const readonly = Boolean(options.readonly || !canManageTasks());
  taskId.value = task.id;
  taskName.value = task.name;
  projectInput.value = task.project || "";
  renderResourceControls();
  projectInput.value = task.project || "";
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
  formTitle.textContent = readonly ? task.name : text("editTask");
  taskFormFields().forEach((field) => { field.disabled = readonly; });
  openTaskComposer();
}

function backupPayload() {
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    tasks,
    projects,
    members,
    teams,
    customers,
    managedFiles,
    projectLinks,
    registers,
    users,
    trash,
    companyRegistry: companyRegistryFromLocalState()
  };
}

function canUseBackend() {
  return typeof fetch === "function" && window.location?.protocol !== "file:";
}

function backendUrl(path) {
  const location = window.location;
  if (location?.protocol === "http:" || location?.protocol === "https:") return path;
  return `http://localhost:3003${path}`;
}

function authHeaders(extraHeaders = {}) {
  return {
    ...extraHeaders,
    ...(authToken ? { authorization: `Bearer ${authToken}` } : {})
  };
}

function scheduleBackendSave() {
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
  try {
    const response = await fetch(backendUrl("/api/state"), { cache: "no-store", headers: authHeaders() });
    if (response.ok) {
      importBackup(await response.json());
      if (isSuperAdmin()) {
        backendSyncReady = true;
        render();
        return;
      }
      const changed = enforceClinicOnlyState();
      backendSyncReady = true;
      if (changed) await saveBackendState();
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
  } catch (error) {
    console.warn("Backend settings sync failed", error);
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
  if (!canUseBackend() || !isAdmin()) return;
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
  if (!canUseBackend() || !isAdmin()) return;
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
  const header = [
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
  const rows = visibleTasks().map((task) => [
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
  return [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
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
  if (!payload || !Array.isArray(payload.tasks)) throw new Error(text("backupError"));
  tasks = payload.tasks.map(normalizeTask);
  projects = Array.isArray(payload.projects) ? payload.projects.map(normalizeProject) : projects;
  members = Array.isArray(payload.members) ? payload.members : members;
  teams = Array.isArray(payload.teams) ? payload.teams : teams;
  customers = Array.isArray(payload.customers) ? payload.customers.map(normalizeCustomer) : customers;
  managedFiles = Array.isArray(payload.managedFiles) ? payload.managedFiles : managedFiles;
  projectLinks = Array.isArray(payload.projectLinks) ? payload.projectLinks : projectLinks;
  registers = Array.isArray(payload.registers) ? payload.registers.map(normalizeRegisterItem) : registers;
  users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : users;
  trash = Array.isArray(payload.trash) ? payload.trash : trash;
  companyRegistry = Array.isArray(payload.companyRegistry) ? payload.companyRegistry : companyRegistry;
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
  const createdProjects = new Map(projects.map((project) => [project.name.toLowerCase(), project]));
  const createdTasks = [];
  rows.slice(1).forEach((row, index) => {
    const projectName = valueFromRow(row, headers, ["Project", "Project Name", "Layihə"]) || "Imported Project";
    const taskName = valueFromRow(row, headers, ["Task", "Task Name", "Name", "Task adı"]);
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
      projects.push(project);
      createdProjects.set(projectName.toLowerCase(), project);
    }
    const isMilestone = ["1", "yes", "true", "milestone"].includes(valueFromRow(row, headers, ["Milestone", "Type"]).toLowerCase());
    const task = normalizeTask({
      id: createId("task"),
      name: taskName,
      project: projectName,
      owner: valueFromRow(row, headers, ["Owner", "Resource", "Məsul şəxs"]),
      start: valueFromRow(row, headers, ["Start", "Start Date", "Başlama"]),
      end: valueFromRow(row, headers, ["End", "Finish", "End Date", "Bitmə"]),
      status: valueFromRow(row, headers, "Status") || "Plan",
      priority: valueFromRow(row, headers, "Priority") || "Normal",
      progress: valueFromRow(row, headers, "Progress") || 0,
      notes: valueFromRow(row, headers, ["Notes", "Qeyd"]),
      importDependencyNames: valueFromRow(row, headers, ["Dependencies", "Depends On", "Predecessors"])
    });
    tasks.push(task);
    createdTasks.push(task);
    if (isMilestone) {
      registers.push(normalizeRegisterItem({
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
      projects = projects.map((project) => {
        const projectTasks = tasks.filter((taskItem) => taskItem.project === project.name && taskItem.start && taskItem.end);
        if (!projectTasks.length) return project;
        return normalizeProject({
          ...project,
          start: project.start || projectTasks.map((taskItem) => taskItem.start).sort()[0],
          end: project.end || projectTasks.map((taskItem) => taskItem.end).sort().at(-1)
        });
      });
    }
  });
  const taskByName = new Map(tasks.map((task) => [task.name.toLowerCase(), task.id]));
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
  if (!projects.some((project) => project.name.toLowerCase() === projectName.toLowerCase())) {
    projects.push(normalizeProject({ id: createId("project"), name: projectName, start: isoDate(new Date()), end: isoDate(addDays(new Date(), 7)), status: "Plan", priority: "Normal", progress: 0 }));
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
    tasks.push(task);
    idByUid.set(uid, task.id);
    if (milestone) {
      registers.push(normalizeRegisterItem({ id: createId("register"), project: projectName, type: "milestone", title: name, dueDate: task.end || task.start }));
    }
  });
  tasks.forEach((task) => {
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
  if ("Notification" in window && Notification.permission === "granted") {
    alerts.slice(0, 3).forEach(({ task, alert }) => {
      new Notification(`${alert.label}: ${task.name}`, {
        body: `${getProject(task)} - ${shortDate(task.end)}`
      });
    });
  }
  sendBackendDeadlineEmail(alerts);
}

async function sendBackendDeadlineEmail(alerts) {
  if (!canUseBackend() || !appSettings.emailEnabled) return;
  try {
    const alertLines = alerts.slice(0, 10).map(({ task, alert }) => `${alert.label}: ${task.name} (${getProject(task)}, ${task.end})`).join("\n");
    await fetch(backendUrl("/api/mail/deadline-alerts"), {
      method: "POST",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({
        subject: appSettings.mailSubjectTemplate || "Project Manager deadline alerts",
        template: appSettings.mailBodyTemplate || "{{alerts}}",
        alerts: alerts.slice(0, 10).map(({ task, alert }) => ({
          label: alert.label,
          taskName: task.name,
          project: getProject(task),
          end: task.end
        })),
        alertLines
      })
    });
  } catch (error) {
    console.warn("Deadline email failed", error);
  }
}

async function sendBackendTestMail() {
  if (!canUseBackend()) return { skipped: true };
  const response = await fetch(backendUrl("/api/mail/test"), {
    method: "POST",
    headers: authHeaders({ "content-type": "application/json" }),
    body: JSON.stringify({
      subject: mailSubjectTemplateInput.value.trim() || "Project Manager test email",
      text: testMailBodyInput.value.trim() || "Project Manager mail ayarları test edildi."
    })
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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManageTasks()) return;

  if (parseDate(endDate.value) < parseDate(startDate.value)) {
    alert(text("invalidDate"));
    return;
  }

  const existingTask = tasks.find((item) => item.id === taskId.value);
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

  const existingIndex = tasks.findIndex((item) => item.id === task.id);
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
    recordAudit("task.updated", "task", task.id, task.name);
  } else {
    tasks.push(task);
    recordAudit("task.created", "task", task.id, task.name);
  }

  if (task.project && task.projectResource && !projectLinks.some((link) => link.project === task.project && link.resource === task.projectResource)) {
    projectLinks.push({ id: createId(), companyId: currentCompanyId(), project: task.project, resource: task.projectResource });
    saveResources();
  }

  saveTasks();
  resetForm();
  closeTaskComposer();
  render();
});

[taskList, kanban].forEach((container) => {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    handleTaskAction(button.dataset.action, button.dataset.id);
  });

  container.addEventListener("submit", async (event) => {
    const timeEntryForm = event.target.closest(".time-entry-form");
    if (timeEntryForm?.elements?.hours && currentUser) {
      event.preventDefault();
      if (!canContribute()) return;
      const task = tasks.find((item) => item.id === timeEntryForm.dataset.taskId);
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
      render();
      return;
    }

    const commentForm = event.target.closest(".comment-form");
    if (!commentForm || !currentUser) return;
    event.preventDefault();
    if (!canContribute()) return;
    const task = tasks.find((item) => item.id === commentForm.dataset.taskId);
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
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

priorityFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-priority-filter]");
  if (!button) return;
  currentPriorityFilter = button.dataset.priorityFilter;
  priorityFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
  render();
});

smartFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-smart-filter]");
  if (!button) return;
  currentSmartFilter = button.dataset.smartFilter || "Hamısı";
  smartFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
  render();
});

nextActions?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action-filter]");
  if (!button) return;
  currentSmartFilter = button.dataset.actionFilter || "Hamısı";
  currentView = currentSmartFilter === "risk" ? "reports" : "list";
  viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
  render();
});

refreshAuditLogsButton?.addEventListener("click", fetchAuditLogs);
refreshMailHistoryButton?.addEventListener("click", fetchMailHistory);

dateRequestList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-date-request-action]");
  if (!button) return;
  const task = tasks.find((item) => item.id === button.dataset.taskId);
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

searchInput.addEventListener("input", render);
projectFilter.addEventListener("change", render);
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
[
  { start: dashboardCalendarStart, end: dashboardCalendarEnd },
  { start: calendarStart, end: calendarEnd }
].forEach((source) => {
  source.start.addEventListener("change", () => syncCalendarRangeFromInputs(source));
  source.end.addEventListener("change", () => syncCalendarRangeFromInputs(source));
});
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

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;
  const localUser = users.find((item) => item.username === username && item.passwordHash === md5(password));
  let user = canUseBackend() ? await backendLogin(username, password) : null;
  if (!user) user = localUser;
  if (user && !users.some((item) => item.id === user.id || item.username === user.username)) {
    users.push(user);
    saveUsers();
  }
  user = users.find((item) => item.username === user?.username) || user;
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

registerForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const companyName = registerCompanyInput.value.trim();
  const subdomain = slugFromName(registerSubdomainInput?.value || companyName);
  const username = registerUsernameInput.value.trim() || `admin${subdomain}`;
  const password = registerPasswordInput.value || `admin${subdomain}123`;
  const fullName = registerFullNameInput.value.trim() || username;
  const email = registerEmailInput.value.trim();
  if (!companyName || !username || !password) return;
  if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
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
  users.push(user);
  companyRegistry = [
    ...companyRegistry.filter((company) => company.id !== companyId),
    { id: companyId, name: companyName, subdomain, status: "active", plan: "standard", adminUsername, userCount: 1, projectCount: 0, createdAt: new Date().toISOString(), lastLoginAt: "" }
  ];
  saveUsers();
  currentUser = user;
  localStorage.setItem(sessionKey, user.id);
  appSettings = loadSettings();
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

logoutButton.addEventListener("click", () => {
  currentUser = null;
  authToken = "";
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(authTokenKey);
  appSettings = loadSettings();
  closeAdminPanel();
  closeManagerAssign();
  closeTaskComposer();
  render();
});

notifyButton.addEventListener("click", enableNotifications);
openTaskComposerButton.addEventListener("click", () => {
  const selectedProject = projectFilter.value === "Hamısı" ? "" : projectFilter.value;
  openTaskComposerForProject(selectedProject);
});
closeTaskComposerButton.addEventListener("click", closeTaskComposer);
taskComposerModal.addEventListener("click", (event) => {
  if (event.target.dataset.taskModalClose) closeTaskComposer();
});
openAdminPanelButton.addEventListener("click", openAdminPanel);
closeAdminPanelButton.addEventListener("click", closeAdminPanel);
adminModal.addEventListener("click", (event) => {
  if (event.target.dataset.modalClose) closeAdminPanel();
  const button = event.target.closest("[data-admin-open-section]");
  if (button) openAdminSection(button.dataset.adminOpenSection);
});
closeAdminSectionButton.addEventListener("click", closeAdminSection);
adminSectionModal.addEventListener("click", (event) => {
  if (event.target.dataset.adminSectionClose) closeAdminSection();
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
  const project = projects.find((item) => item.id === activeManagerProjectId);
  if (!project || !isAdmin()) return;
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

exportDataButton.addEventListener("click", () => {
  if (!isAdmin()) return;
  downloadJson(`project-manager-backup-${isoDate(new Date())}.json`, backupPayload());
});

exportExcelButton.addEventListener("click", async () => {
  if (!isAdmin()) return;
  downloadText(`project-manager-report-${isoDate(new Date())}.csv`, filteredReportCsv(), "text/csv;charset=utf-8");
});

exportPdfButton.addEventListener("click", async () => {
  if (!isAdmin()) return;
  const ok = await downloadBackendFile("/api/export/pdf", `project-manager-report-${isoDate(new Date())}.pdf`);
  if (!ok) downloadText(`project-manager-report-${isoDate(new Date())}.html`, reports.innerHTML, "text/html;charset=utf-8");
});

importDataInput.addEventListener("change", () => {
  if (!isAdmin() || !importDataInput.files?.length) return;
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
    const result = await sendBackendTestMail();
    settingsStatus.textContent = result.skipped || result.ok === false ? text("mailTestSkipped") : text("mailTestSent");
  } catch {
    settingsStatus.textContent = text("mailTestSkipped");
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
  tasks = tasks.map((task) => task.status === status ? { ...task, status: "Plan" } : task);
  projects = projects.map((project) => project.status === status ? { ...project, status: "Plan" } : project);
  currentFilter = currentFilter === status ? "Hamısı" : currentFilter;
  syncWorkflowStatuses();
  saveAppSettings();
  saveResources();
  saveTasks();
  saveBackendSettings();
  render();
});

addUserButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const companySlug = slugFromName(currentUser?.profile?.company || currentCompanyId());
  const password = newUserPasswordInput.value;
  const role = newUserRoleInput.value;
  const username = newUsernameInput.value.trim() || uniqueUsername(`${role}${companySlug}`);
  const finalPassword = password || `${username}123`;
  if (!username || users.some((user) => user.username === username)) return;
  const managedRoles = ["user", "contributor", "viewer"];
  const managerId = managedRoles.includes(role) ? (currentUser?.role === "manager" ? currentUser.id : users.find((user) => user.role === "manager" && user.companyId === currentCompanyId())?.id || "") : "";
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
  users.push(user);
  newUsernameInput.value = "";
  newUserPasswordInput.value = "";
  newUserFullNameInput.value = "";
  newUserPositionInput.value = "";
  newUserEmailInput.value = "";
  newUserAddressInput.value = "";
  saveUsers();
  recordAudit("user.created", "user", user.id, username);
  render();
});

userList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.userAction === "change-password") {
    if (!isAdmin()) return;
    const row = button.closest(".password-form");
    const user = users.find((item) => item.id === button.dataset.id);
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
        const localUser = users.find((user) => user.id === currentUser.id);
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
    users = users.filter((user) => user.id !== button.dataset.id);
    projects = projects.map((project) => ({ ...project, managerIds: (project.managerIds || []).filter((id) => id !== button.dataset.id) }));
    users = users.map((user) => user.managerId === button.dataset.id ? { ...user, managerId: "" } : user);
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
  try {
    const updated = await updateBackendCompany(company.id, { status: nextStatus });
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? updated : item);
  } catch (error) {
    companyRegistry = (companyRegistry.length ? companyRegistry : companyRegistryFromLocalState()).map((item) => item.id === company.id ? { ...item, status: nextStatus } : item);
    saveBackendSettings();
  }
  render();
});

userList.addEventListener("submit", (event) => {
  if (!isAdmin()) return;
  const profileForm = event.target.closest(".user-profile-form");
  if (!profileForm) return;
  event.preventDefault();
  if (!profileForm.elements.fullName && profileForm.elements.password) {
    const user = users.find((item) => item.id === profileForm.dataset.userId);
    const password = profileForm.elements.password.value;
    if (!user || !password) return;
    user.passwordHash = md5(password);
    delete user.password;
    profileForm.elements.password.value = "";
    saveUsers();
    render();
    return;
  }
  const user = users.find((item) => item.id === profileForm.dataset.userId);
  if (!user) return;
  const nextUsername = profileForm.elements.username.value.trim();
  if (nextUsername && !users.some((item) => item.id !== user.id && item.username === nextUsername)) {
    user.username = nextUsername;
  }
  user.managerId = profileForm.elements.managerId?.value || "";
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
  if (!customer.name || customers.some((item) => item.name.toLowerCase() === customer.name.toLowerCase())) return;
  customers.push(customer);
  customerNameInput.value = "";
  customerContactInput.value = "";
  customerEmailInput.value = "";
  saveResources();
  render();
});

customerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-customer-action]");
  if (!button || !isAdmin()) return;
  customers = customers.filter((customer) => customer.id !== button.dataset.id);
  projects = projects.map((project) => project.customerId === button.dataset.id ? { ...project, customerId: "" } : project);
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
    managedFiles.push(...files.map((file) => ({
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

managedFileList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-file-action]");
  if (!button || !isAdmin()) return;
  managedFiles = managedFiles.filter((file) => file.id !== button.dataset.id);
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
  const payload = {
    name: projectNameInput.value,
    customerId: projectCustomerInput.value,
    managerId: projectLeaderInput.value,
    teamMemberIds: selectedProjectTeamMemberIds,
    start: projectStartDateInput.value,
    end: projectEndDateInput.value,
    status: projectStatusInput.value,
    priority: projectPriorityInput.value,
    progress,
    lifecycle: projectLifecycleInput.value,
    charter: {
      goal: projectGoalInput.value.trim(),
      scope: projectScopeInput.value.trim(),
      successCriteria: projectSuccessCriteriaInput.value.trim(),
      gateChecklist: parseGovernanceLines(projectGateChecklistInput.value),
      closureNotes: projectClosureNotesInput.value.trim(),
      stakeholders: parseGovernanceLines(projectStakeholdersInput.value),
      communicationPlan: parseGovernanceLines(projectCommunicationPlanInput.value),
      decisionLog: parseGovernanceLines(projectDecisionLogInput.value),
      changeControl: parseGovernanceLines(projectChangeControlInput.value),
      riskOpportunity: parseGovernanceLines(projectRiskOpportunityInput.value),
      qualityChecklist: parseGovernanceLines(projectQualityChecklistInput.value),
      competenceMatrix: parseGovernanceLines(projectCompetenceMatrixInput.value),
      gateApprovals: activeProjectEditId ? (projects.find((item) => item.id === activeProjectEditId)?.charter?.gateApprovals || {}) : {}
    }
  };
  const gateError = projectGateError(payload);
  if (gateError) {
    alert(gateError);
    return;
  }
  const project = activeProjectEditId
    ? updateProject(activeProjectEditId, payload)
    : createProject(projectNameInput.value, payload);
  if (!project) return;
  closeProjectComposer();
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
closeTaskDetailButton?.addEventListener("click", closeTaskDetail);
taskDetailModal?.addEventListener("click", (event) => {
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
    const project = projects.find((item) => item.name === projectName);
    if (project) {
      project.archived = true;
      saveResources();
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "approve-gate") {
    const project = projects.find((item) => item.name === projectName);
    if (project && canApproveGovernance()) {
      const gate = button.dataset.gate;
      project.charter = project.charter || {};
      project.charter.gateApprovals = project.charter.gateApprovals || {};
      project.charter.gateApprovals[gate] = {
        approvedBy: currentUser.username,
        approvedAt: new Date().toISOString()
      };
      saveResources();
      recordAudit("gate.approved", "project", project.id, `${project.name}: ${gate}`);
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "restore-archive") {
    const project = projects.find((item) => item.name === projectName);
    if (project) {
      project.archived = false;
      saveResources();
      render();
    }
    return;
  }
  if (button.dataset.projectAction === "delete") {
    const project = projects.find((item) => item.name === projectName);
    if (project) {
      trash.push({ id: createId(), companyId: currentCompanyId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
      projects = projects.filter((item) => item.id !== project.id);
      tasks = tasks.map((task) => task.project === projectName ? { ...task, project: "" } : task);
      projectLinks = projectLinks.filter((link) => link.project !== projectName);
      registers = registers.filter((item) => item.project !== projectName);
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
  const project = projects.find((item) => item.name === projectName);
  if (!project) return;
  if (button.dataset.projectAction === "restore-archive") {
    project.archived = false;
    saveResources();
    render();
    return;
  }
  if (button.dataset.projectAction === "delete") {
    trash.push({ id: createId(), companyId: currentCompanyId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
    projects = projects.filter((item) => item.id !== project.id);
    projectLinks = projectLinks.filter((link) => link.project !== projectName);
    registers = registers.filter((item) => item.project !== projectName);
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
  teams.push({ id: createId(), companyId: currentCompanyId(), name, memberIds });
  teamNameInput.value = "";
  saveResources();
  render();
});

addProjectLinkButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const project = linkProjectInput.value.trim();
  const resource = linkResourceInput.value;
  if (!project || !resource) return;
  if (!projectLinks.some((link) => link.project === project && link.resource === resource)) {
    projectLinks.push({ id: createId(), companyId: currentCompanyId(), project, resource });
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
  registers.push(item);
  registerTitleInput.value = "";
  registerMitigationInput.value = "";
  registerDueDateInput.value = "";
  registerStatusInput.value = "Open";
  registerImpactInput.value = "Medium";
  saveRegisters();
  render();
});

registerList.addEventListener("click", (event) => {
  if (!canManageTasks()) return;
  const button = event.target.closest("button[data-register-action]");
  if (!button) return;
  if (button.dataset.registerAction === "delete") {
    registers = registers.filter((item) => item.id !== button.dataset.id);
    saveRegisters();
    render();
  }
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
      teams = teams.filter((team) => team.id !== id);
      tasks = tasks.map((task) => task.owner === resourceValue("team", id) ? { ...task, owner: "" } : task);
      projectLinks = projectLinks.filter((link) => link.resource !== resourceValue("team", id));
      saveTasks();
    }

    if (action === "save-team") {
      const team = teams.find((item) => item.id === id);
      const nameInput = container.querySelector(`.team-edit-name[data-team-id="${id}"]`);
      const membersInput = container.querySelector(`.team-edit-members[data-team-id="${id}"]`);
      if (team && nameInput && membersInput) {
        team.name = nameInput.value.trim() || team.name;
        team.memberIds = [...membersInput.selectedOptions].map((option) => option.value);
      }
    }

    if (action === "delete-link") {
      const link = projectLinks.find((item) => item.id === id);
      if (link) {
        trash.push({ id: createId(), companyId: currentCompanyId(), type: "project", data: { ...link }, deletedAt: new Date().toISOString() });
      }
      projectLinks = projectLinks.filter((link) => link.id !== id);
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
  const item = trash.find((trashItem) => trashItem.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.trashAction === "restore") {
    if (item.type === "task" && !tasks.some((task) => task.id === item.data.id)) {
      tasks.push(item.data);
      saveTasks();
    }
    if (item.type === "project" && !projectLinks.some((link) => link.id === item.data.id)) {
      projectLinks.push(item.data);
      saveResources();
    }
    if (item.type === "projectRecord" && !projects.some((project) => project.id === item.data.id)) {
      projects.push(normalizeProject(item.data));
      saveResources();
    }
  }

  trash = trash.filter((trashItem) => trashItem.id !== item.id);
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
  const doneTasks = tasks.filter((task) => task.status === "Bitib");
  doneTasks.forEach((task) => {
    trash.push({ id: createId(), companyId: currentCompanyId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
  });
  tasks = tasks.filter((task) => task.status !== "Bitib");
  saveTrash();
  saveTasks();
  render();
});

render();
syncBackendState();
syncBackendSettings();
