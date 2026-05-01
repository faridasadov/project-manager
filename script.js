const storageKey = "project-manager-tasks-v2";
const languageKey = "project-manager-language";
const membersKey = "project-manager-members-v1";
const teamsKey = "project-manager-teams-v1";
const projectLinksKey = "project-manager-project-links-v1";
const projectsKey = "project-manager-projects-v1";
const usersKey = "project-manager-users-v1";
const sessionKey = "project-manager-session-v1";
const authTokenKey = "project-manager-auth-token-v1";
const trashKey = "project-manager-trash-v1";
const settingsKey = "project-manager-settings-v1";
const registersKey = "project-manager-registers-v1";
const backupVersion = 1;
const defaultWorkflowStatuses = ["Plan", "Davam edir", "Bitib"];
const protectedWorkflowStatuses = new Set(defaultWorkflowStatuses);

const translations = {
  az: {
    locale: "az-AZ",
    appKicker: "Project workspace",
    appTitle: "Plan, task və icra paneli",
    clearDone: "Bitənləri təmizlə",
    resetDemo: "Demo yüklə",
    adminPanel: "Admin panel",
    close: "Bağla",
    settings: "Settings",
    new: "Yeni",
    appearanceSettings: "Görünüş",
    workflowSettings: "Workflow",
    mailSettings: "Mail",
    ldapSettings: "LDAP",
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
    emailProvider: "Mail provider/API",
    emailProviderPlaceholder: "Backend API URL",
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
    backgroundFocus: "Focus",
    backgroundPaper: "Kağız",
    backgroundSteel: "Steel",
    backgroundSunrise: "Sunrise",
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
    calendar: "Calendar",
    deadlineCalendar: "Deadline calendar",
    rangeStart: "Başlama",
    rangeEnd: "Bitmə",
    selectedDay: "Seçilən gün",
    projectAndTask: "Layihə və task",
    selectCalendarDay: "Calendar-da gün seçin.",
    noTaskOnDay: "Bu gün üçün task yoxdur.",
    parentTask: "Ana task",
    noParentTask: "Ana task yoxdur",
    taskDependencies: "Asılı tasklar",
    dependsOn: "Asılıdır",
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
    loginKicker: "Project access",
    loginTitle: "Daxil ol",
    username: "İstifadəçi adı",
    login: "Login",
    password: "Şifrə",
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
    adminRole: "Admin",
    managerRole: "Manager",
    userRole: "User",
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
    resetDemo: "Загрузить демо",
    adminPanel: "Админ панель",
    close: "Закрыть",
    settings: "Настройки",
    new: "Новое",
    appearanceSettings: "Внешний вид",
    workflowSettings: "Workflow",
    mailSettings: "Почта",
    ldapSettings: "LDAP",
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
    emailProvider: "Email provider/API",
    emailProviderPlaceholder: "Backend API URL",
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
    backgroundSteel: "Steel",
    backgroundSunrise: "Sunrise",
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
    adminRole: "Админ",
    managerRole: "Менеджер",
    userRole: "Пользователь",
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
    resetDemo: "Load demo",
    adminPanel: "Admin panel",
    close: "Close",
    settings: "Settings",
    new: "New",
    appearanceSettings: "Appearance",
    workflowSettings: "Workflow",
    mailSettings: "Mail",
    ldapSettings: "LDAP",
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
    emailProvider: "Email provider/API",
    emailProviderPlaceholder: "Backend API URL",
    workflowStatuses: "Workflow statuses",
    newWorkflowStatus: "New status",
    addWorkflowStatus: "Add status",
    requiredWorkflowStatus: "System status",
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
    adminRole: "Admin",
    managerRole: "Manager",
    userRole: "User",
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
  { id: "project-internal", name: "Internal portal", managerIds: ["user-manager"], teamMemberIds: ["user:user-aysel", "user:user-rashad"], start: "2026-05-01", end: "2026-05-16", status: "Davam edir", priority: "Yüksək", progress: 55 },
  { id: "project-customer", name: "Customer rollout", managerIds: ["user-manager"], teamMemberIds: ["member:member-farid", "member:member-nicat"], start: "2026-05-03", end: "2026-05-18", status: "Plan", priority: "Normal", progress: 0 },
  { id: "project-mobile", name: "Mobile banking", managerIds: ["user-manager", "user-manager-2"], teamMemberIds: ["user:user-aysel", "user:user-rashad"], start: "2026-05-06", end: "2026-05-24", status: "Davam edir", priority: "Yüksək", progress: 40 },
  { id: "project-erp", name: "Warehouse ERP", managerIds: ["user-manager-2"], teamMemberIds: ["user:user-rashad", "user:user-nigar"], start: "2026-05-09", end: "2026-05-25", status: "Davam edir", priority: "Yüksək", progress: 35 },
  { id: "project-analytics", name: "Analytics portal", managerIds: ["user-manager"], teamMemberIds: ["user:user-aysel", "member:member-leyla"], start: "2026-05-12", end: "2026-05-27", status: "Plan", priority: "Normal", progress: 0 }
];

const demoUsers = [
  { id: "user-admin", username: "admin", passwordHash: md5("admin123"), role: "admin", managerId: "", profile: { fullName: "Admin User", email: "", fatherName: "", position: "Admin", phone: "", address: "", company: "" } },
  { id: "user-manager", username: "manager", passwordHash: md5("manager123"), role: "manager", managerId: "", profile: { fullName: "Project Manager", email: "", fatherName: "", position: "Manager", phone: "", address: "", company: "" } },
  { id: "user-manager-2", username: "manager2", passwordHash: md5("manager123"), role: "manager", managerId: "", profile: { fullName: "Aysel Manager", email: "aysel.manager@example.com", fatherName: "", position: "Delivery Manager", phone: "", address: "", company: "PMO" } },
  { id: "user-demo", username: "user", passwordHash: md5("user123"), role: "user", managerId: "user-manager", profile: { fullName: "Demo User", email: "", fatherName: "", position: "User", phone: "", address: "", company: "" } },
  { id: "user-aysel", username: "aysel", passwordHash: md5("user123"), role: "user", managerId: "user-manager", profile: { fullName: "Aysel Mammadova", email: "aysel@example.com", fatherName: "", position: "Frontend developer", phone: "", address: "", company: "Digital" } },
  { id: "user-rashad", username: "rashad", passwordHash: md5("user123"), role: "user", managerId: "user-manager-2", profile: { fullName: "Rashad Aliyev", email: "rashad@example.com", fatherName: "", position: "Backend developer", phone: "", address: "", company: "Digital" } },
  { id: "user-nigar", username: "nigar", passwordHash: md5("user123"), role: "user", managerId: "user-manager-2", profile: { fullName: "Nigar Karimova", email: "nigar@example.com", fatherName: "", position: "QA engineer", phone: "", address: "", company: "Digital" } }
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
const reports = document.querySelector("#reports");
const kanban = document.querySelector("#kanban");
const dashboardCalendar = document.querySelector("#dashboardCalendar");
const calendarBoard = document.querySelector("#calendarBoard");
const calendarDetails = document.querySelector("#calendarDetails");
const dashboardCalendarStart = document.querySelector("#dashboardCalendarStart");
const dashboardCalendarEnd = document.querySelector("#dashboardCalendarEnd");
const calendarStart = document.querySelector("#calendarStart");
const calendarEnd = document.querySelector("#calendarEnd");
const taskList = document.querySelector("#taskList");
const statusFilters = document.querySelector("#statusFilters");
let filters = document.querySelectorAll(".filter");
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
const resetDemo = document.querySelector("#resetDemo");
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
const projectLeaderInput = document.querySelector("#projectLeader");
const projectTeamMembersInput = document.querySelector("#projectTeamMembers");
const addProjectTeamMembersButton = document.querySelector("#addProjectTeamMembers");
const selectedProjectTeamMembers = document.querySelector("#selectedProjectTeamMembers");
const projectStartDateInput = document.querySelector("#projectStartDate");
const projectEndDateInput = document.querySelector("#projectEndDate");
const projectStatusInput = document.querySelector("#projectStatus");
const projectPriorityInput = document.querySelector("#projectPriority");
const projectProgressInput = document.querySelector("#projectProgress");
const focusNewProjectButton = document.querySelector("#focusNewProject");
const projectList = document.querySelector("#projectList");
const projectCount = document.querySelector("#projectCount");
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
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginUsername = document.querySelector("#loginUsername");
const loginPassword = document.querySelector("#loginPassword");
const loginError = document.querySelector("#loginError");
const loginLanguageSelect = document.querySelector("#loginLanguageSelect");
const logoutButton = document.querySelector("#logoutButton");
const notifyButton = document.querySelector("#notifyButton");
const openTaskComposerButton = document.querySelector("#openTaskComposer");
const closeTaskComposerButton = document.querySelector("#closeTaskComposer");
const taskComposerModal = document.querySelector("#taskComposerModal");
const closeProjectComposerButton = document.querySelector("#closeProjectComposer");
const cancelProjectCreateButton = document.querySelector("#cancelProjectCreate");
const projectComposerModal = document.querySelector("#projectComposerModal");
const openAdminPanelButton = document.querySelector("#openAdminPanel");
const closeAdminPanelButton = document.querySelector("#closeAdminPanel");
const adminModal = document.querySelector("#adminModal");
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
const ldapEnabledInput = document.querySelector("#ldapEnabled");
const ldapUrlInput = document.querySelector("#ldapUrl");
const ldapBaseDnInput = document.querySelector("#ldapBaseDn");
const ldapUserFilterInput = document.querySelector("#ldapUserFilter");
const ldapBindDnInput = document.querySelector("#ldapBindDn");
const ldapBindPasswordInput = document.querySelector("#ldapBindPassword");
const ldapGroupRoleMapInput = document.querySelector("#ldapGroupRoleMap");
const saveSettingsButton = document.querySelector("#saveSettings");
const testMailButton = document.querySelector("#testMail");
const settingsStatus = document.querySelector("#settingsStatus");

let tasks = loadTasks();
let members = loadMembers();
let teams = loadTeams();
let projects = loadProjects();
let projectLinks = loadProjectLinks();
let registers = loadRegisters();
let users = loadUsers();
let trash = loadTrash();
let currentUser = loadSession();
let appSettings = loadSettings();
statuses = normalizeWorkflowStatuses(appSettings.workflowStatuses);
let currentFilter = "Hamısı";
let currentView = "dashboard";
let currentLanguage = localStorage.getItem(languageKey) || "az";
let activeManagerProjectId = "";
let selectedProjectTeamMemberIds = [];
let activeProjectEditId = "";
let selectedCalendarDay = "";
let calendarRange = { start: "2026-05-01", end: "2026-05-31" };
let backendSyncReady = false;
let backendSaveTimer = 0;
let authToken = localStorage.getItem(authTokenKey) || "";
ensureDemoData();
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
    `<button class="filter ${currentFilter === "Hamısı" ? "active" : ""}" data-filter="Hamısı" type="button">${text("all")}</button>`,
    ...statuses.map((status) => `<button class="filter ${currentFilter === status ? "active" : ""}" data-filter="${escapeHtml(status)}" type="button">${escapeHtml(statusLabel(status))}</button>`)
  ].join("");
  filters = document.querySelectorAll(".filter");
}

function updateFilterLabels() {
  filters.forEach((button) => {
    button.textContent = button.dataset.filter === "Hamısı" ? text("all") : statusLabel(button.dataset.filter);
  });
}

function updateViewLabels() {
  viewTabs.forEach((button) => {
    if (button.dataset.view === "dashboard") button.textContent = text("dashboard");
    if (button.dataset.view === "projects") button.textContent = text("projects");
    if (button.dataset.view === "list") button.textContent = text("list");
    if (button.dataset.view === "kanban") button.textContent = text("kanban");
    if (button.dataset.view === "gantt") button.textContent = text("gantt");
    if (button.dataset.view === "reports") button.textContent = text("reports");
  });
}

function updateRoleLabels() {
  [...newUserRoleInput.options].forEach((option) => {
    if (option.value === "admin") option.textContent = text("adminRole");
    if (option.value === "manager") option.textContent = text("managerRole");
    if (option.value === "user") option.textContent = text("userRole");
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
  return loadJson(membersKey, () => demoMemberTemplates.map((member) => ({ ...member })));
}

function loadTeams() {
  return loadJson(teamsKey, () => demoTeamTemplates.map((team) => ({ ...team, memberIds: [...team.memberIds] })));
}

function loadProjects() {
  const stored = loadJson(projectsKey, () => []);
  if (stored.length) return stored.map(normalizeProject);
  const names = [...new Set([...demoProjects.map((project) => project.name), ...loadTasks().map((task) => task.project).filter(Boolean)])];
  return names.map((name) => normalizeProject(demoProjects.find((project) => project.name === name) || { id: createId(), name }));
}

function loadProjectLinks() {
  return loadJson(projectLinksKey, () => demoProjectLinks.map((link) => ({ ...link })));
}

function loadUsers() {
  return loadJson(usersKey, () => demoUsers.map((user) => ({ ...user }))).map(normalizeUser);
}

function normalizeUser(user) {
  const normalized = {
    id: user.id,
    username: user.username,
    passwordHash: user.passwordHash || md5(user.password || ""),
    role: user.role,
    managerId: user.managerId || "",
    profile: {
      fullName: "",
      fatherName: "",
      email: "",
      position: "",
      phone: "",
      address: "",
      company: "",
      ...(user.profile || {})
    }
  };
  if (user.passwordHash) {
    return normalized;
  }
  return normalized;
}

function loadTrash() {
  return loadJson(trashKey, () => []);
}

function normalizeRegisterItem(item) {
  return {
    id: item.id || createId(),
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
    ldapEnabled: false,
    ldapUrl: "",
    ldapBaseDn: "",
    ldapUserFilter: "(uid={username})",
    ldapBindDn: "",
    ldapBindPassword: "",
    ldapGroupRoleMap: ""
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
    return createDemoTasks();
  }

  try {
    return JSON.parse(stored).map(normalizeTask);
  } catch {
    return createDemoTasks();
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
    start: "",
    end: "",
    archived: false,
    status: "Plan",
    priority: "Normal",
    ...project,
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
  if (!cleanName || projects.some((project) => project.name.toLowerCase() === cleanName.toLowerCase())) return false;
  const defaultManagerId = currentUser?.role === "manager"
    ? currentUser.id
    : users.find((user) => user.role === "manager")?.id || "";
  const managerIds = details.managerId ? [details.managerId] : (defaultManagerId ? [defaultManagerId] : []);
  const progress = Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  const project = normalizeProject({
    id: createId(),
    name: cleanName,
    managerIds,
    teamMemberIds: details.teamMemberIds || [],
    start: details.start || "",
    end: details.end || "",
    status: details.status || "Plan",
    priority: details.priority || "Normal",
    progress: details.status === "Bitib" ? 100 : progress
  });
  projects.push(project);
  project.teamMemberIds.forEach((resource) => {
    if (!projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
      projectLinks.push({ id: createId(), project: cleanName, resource });
    }
  });
  saveResources();
  return project;
}

function updateProject(projectId, details = {}) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;
  const cleanName = details.name.trim();
  if (!cleanName || projects.some((item) => item.id !== projectId && item.name.toLowerCase() === cleanName.toLowerCase())) return null;
  const previousName = project.name;
  project.name = cleanName;
  project.managerIds = details.managerId ? [details.managerId] : [];
  project.teamMemberIds = details.teamMemberIds || [];
  project.start = details.start || "";
  project.end = details.end || "";
  project.status = details.status || "Plan";
  project.priority = details.priority || "Normal";
  project.progress = project.status === "Bitib" ? 100 : Math.min(100, Math.max(0, Number.parseInt(details.progress || "0", 10)));
  if (previousName !== cleanName) {
    tasks = tasks.map((task) => task.project === previousName ? { ...task, project: cleanName } : task);
    projectLinks = projectLinks.map((link) => link.project === previousName ? { ...link, project: cleanName } : link);
    saveTasks();
  }
  projectLinks = projectLinks.filter((link) => link.project !== cleanName || !link.resource.startsWith("user:"));
  project.teamMemberIds.forEach((resource) => {
    if (!projectLinks.some((link) => link.project === cleanName && link.resource === resource)) {
      projectLinks.push({ id: createId(), project: cleanName, resource });
    }
  });
  saveResources();
  return project;
}

function managerUsers(managerId) {
  return users.filter((user) => user.managerId === managerId);
}

function projectManagers(project) {
  return users.filter((user) => (project.managerIds || []).includes(user.id));
}

function canSeeProject(project) {
  if (!currentUser) return true;
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
  if (isAdmin()) return true;
  const project = projects.find((item) => item.name === task.project);
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
  if (role === "admin") return text("adminRole");
  if (role === "manager") return text("managerRole");
  return text("userRole");
}

function managerOptions(selectedId = "") {
  return [
    `<option value="">${text("noOwnerSelect")}</option>`,
    ...users
      .filter((user) => user.role === "manager")
      .map((user) => `<option value="${user.id}" ${user.id === selectedId ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
  ].join("");
}

function managerMultiOptions(selectedIds = []) {
  return users
    .filter((user) => user.role === "manager")
    .map((user) => `<option value="${user.id}" ${selectedIds.includes(user.id) ? "selected" : ""}>${escapeHtml(user.username)}</option>`)
    .join("");
}

function allResourceOptions() {
  return [
    ...users.filter((user) => user.role !== "admin").map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: text("userRole") })),
    ...teams.map((team) => ({ value: resourceValue("team", team.id), label: team.name, type: text("team") }))
  ];
}

function teamMemberOptions(selectedIds = []) {
  return [
    ...users.filter((user) => user.role !== "admin").map((user) => ({ value: resourceValue("user", user.id), label: user.profile?.fullName || user.username, type: text("userRole") }))
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
  if (isAdmin()) return users.map((user) => user.id);
  if (currentUser.role === "manager") return [currentUser.id, ...managerUsers(currentUser.id).map((user) => user.id)];
  return [currentUser.id];
}

function resourceInCurrentScope(resource) {
  return visibleUserIdsForCurrentUser().some((userId) => resourceIncludesUser(resource, userId));
}

function projectHasRoleAccess(project) {
  if (!project || !currentUser) return false;
  const managerIds = project.managerIds || [];
  if (currentUser.role === "manager") return managerIds.includes(currentUser.id);
  if (currentUser.role === "user") return Boolean(currentUser.managerId && managerIds.includes(currentUser.managerId));
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

function canManageTasks() {
  return ["admin", "manager"].includes(currentUser?.role);
}

function canApproveTask(task) {
  if (isAdmin()) return true;
  if (currentUser?.role !== "manager") return false;
  const project = projects.find((item) => item.name === task.project);
  return Boolean(project?.managerIds?.includes(currentUser.id));
}

function openAdminPanel() {
  if (!currentUser) return;
  adminModal.classList.add("open");
  adminModal.setAttribute("aria-hidden", "false");
  closeAdminPanelButton.focus();
}

function closeAdminPanel() {
  adminModal.classList.remove("open");
  adminModal.setAttribute("aria-hidden", "true");
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

function openTaskComposer() {
  if (!currentUser || !canManageTasks()) return;
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
  projectLeaderInput.value = currentUser?.role === "manager" ? currentUser.id : "";
  renderSelectedProjectTeamMembers();
}

function openProjectComposer() {
  if (!currentUser || !canManageTasks()) return;
  resetProjectForm();
  renderResourceControls();
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
  projectLeaderInput.value = project.managerIds?.[0] || "";
  projectStartDateInput.value = project.start || "";
  projectEndDateInput.value = project.end || "";
  projectStatusInput.value = project.status || "Plan";
  projectPriorityInput.value = project.priority || "Normal";
  projectProgressInput.value = Number(project.progress) || 0;
  renderSelectedProjectTeamMembers();
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
  document.body.classList.toggle("admin-role", isAdmin());
  document.body.classList.toggle("manager-role", currentUser?.role === "manager");
  document.body.classList.toggle("user-role", currentUser?.role === "user");
  currentUserBadge.textContent = currentUser ? `${currentUser.username} (${roleLabel(currentUser.role)})` : "";
}

function visibleTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedProject = projectFilter.value;

  return accessibleTasks()
    .filter((task) => currentFilter === "Hamısı" || task.status === currentFilter)
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
  const options = allResourceOptions();
  userCount.textContent = users.length;
  projectCount.textContent = projects.length;
  teamCount.textContent = teams.length;
  linkCount.textContent = projectLinks.length;
  trashCount.textContent = trash.length;
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
        <span><strong>${escapeHtml(project.name)}</strong>${taskCount} ${text("tasks")} · ${shortDate(project.start)} - ${shortDate(project.end)} · ${statusLabel(project.status)} · ${priorityLabel(project.priority)} · ${Number(project.progress) || 0}%</span>
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

  const shownUsers = isAdmin() ? users : users.filter((user) => user.managerId === currentUser?.id);
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
        <div class="password-form" data-user-id="${user.id}">
          <input type="password" name="password" placeholder="${text("newPassword")}" required>
          <button type="button" data-user-action="change-password" data-id="${user.id}">${text("changePassword")}</button>
        </div>
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
}

function renderSummary() {
  const shownTasks = accessibleTasks();
  if (sidebarCapacityLabel) sidebarCapacityLabel.textContent = `${Number(appSettings.capacityHours) || 40}h`;
  totalCount.textContent = shownTasks.length;
  activeCount.textContent = shownTasks.filter((task) => task.status !== "Bitib").length;
  doneCount.textContent = shownTasks.filter((task) => task.status === "Bitib").length;
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
    return `
      <article class="project-card">
        <div>
          <h3>${escapeHtml(project.name)}</h3>
          <div class="task-meta">
            <span>${text("projectLeader")}: ${escapeHtml(managerNames.join(", ") || text("noOwner"))}</span>
            <span>${text("projectTeamMembers")}: ${escapeHtml(memberNames.join(", ") || text("empty"))}</span>
            <span>${shortDate(project.start)} - ${shortDate(project.end)}</span>
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
        </div>
        <div class="project-card-actions">
          <button type="button" data-project-action="open" data-project="${escapeHtml(project.name)}">${text("openProject")}</button>
          <button type="button" data-project-action="edit" data-project="${escapeHtml(project.name)}">${text("editProject")}</button>
          <button type="button" data-project-action="archive" data-project="${escapeHtml(project.name)}">${text("archiveProject")}</button>
          <button type="button" data-project-action="delete" data-project="${escapeHtml(project.name)}">${text("delete")}</button>
          <button class="primary" type="button" data-project-action="add-task" data-project="${escapeHtml(project.name)}">${text("addTaskToProject")}</button>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty">${text("empty")}</div>`;
  renderArchivedProjects();
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

  taskList.innerHTML = shown.map((task) => `
    <article class="task-card">
      <div>
        <h3>${escapeHtml(task.name)}</h3>
        <div class="task-meta">
          <span class="badge ${statusClass(task.status)}">${statusLabel(task.status)}</span>
          <span class="badge ${priorityClass(task.priority)}">${priorityLabel(task.priority)}</span>
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
  `).join("");
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
  if (!parent && !dependencies.length) return "";
  return `
    <div class="task-relations">
      ${parent ? `<span>${text("parentTask")}: ${escapeHtml(parent)}</span>` : ""}
      ${dependencies.length ? `<span>${text("dependsOn")}: ${escapeHtml(dependencies.join(", "))}</span>` : ""}
    </div>
  `;
}

function renderTaskActions(task) {
  let actions = "";
  if (task.status === "Bitib") {
    actions = `
        <button class="action-button next-action" type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button class="action-button danger-action" type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  } else {
    const completionAction = task.completionRequestedAt
      ? `${canApproveTask(task) ? `<button class="action-button next-action" type="button" data-action="approve-done" data-id="${task.id}">${text("approveDone")}</button>` : `<span class="pending-label">${text("pendingDone")}</span>`}`
      : `<button class="action-button next-action" type="button" data-action="request-done" data-id="${task.id}">${text("doneRequest")}</button>`;
    actions = `
        <button class="action-button edit-action" type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button class="action-button next-action" type="button" data-action="next" data-id="${task.id}">${text("next")}</button>
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

function renderKanban() {
  const shown = visibleTasks();
  kanban.innerHTML = statuses.map((status) => {
    const columnTasks = shown.filter((task) => task.status === status);
    const cards = columnTasks.map((task) => `
      <article class="kanban-card">
        <strong>${escapeHtml(task.name)}</strong>
        <div class="task-meta">
          <span>${escapeHtml(getProject(task))}</span>
          <span>${shortDate(task.end)}</span>
          <span>${Number(task.progress) || 0}%</span>
        </div>
        ${renderComments(task)}
        ${renderAttachments(task)}
        ${renderKanbanActions(task)}
      </article>
    `).join("");

    return `
      <section class="kanban-column">
        <h2>${statusLabel(status)} (${columnTasks.length})</h2>
        ${cards || `<div class="empty">${text("empty")}</div>`}
      </section>
    `;
  }).join("");
}

function renderKanbanActions(task) {
  const actions = task.status === "Bitib"
    ? `
        <button type="button" data-action="reopen" data-id="${task.id}">${text("reopen")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `
    : `
        <button type="button" data-action="edit" data-id="${task.id}">${text("edit")}</button>
        <button type="button" data-action="next" data-id="${task.id}">${text("next")}</button>
        <button type="button" data-action="delete" data-id="${task.id}">${text("delete")}</button>
      `;
  return `<div class="kanban-actions">${actions}</div>`;
}

function renderGantt() {
  const shown = visibleTasks();
  if (!shown.length) {
    gantt.innerHTML = `<div class="empty">${text("noTaskFilter")}</div>`;
    return;
  }

  const starts = shown.map((task) => parseDate(task.start));
  const ends = shown.map((task) => parseDate(task.end));
  const minStart = new Date(Math.min(...starts));
  const maxEnd = new Date(Math.max(...ends));
  const days = Math.max(1, Math.round((maxEnd - minStart) / 86400000) + 1);
  const dayHeaders = Array.from({ length: days }, (_, index) => {
    const date = addDays(minStart, index);
    return `<div class="gantt-day">${shortDate(isoDate(date))}</div>`;
  }).join("");

  const rows = shown.map((task) => {
    const offset = daysBetween(isoDate(minStart), task.start);
    const span = Math.max(1, daysBetween(task.start, task.end) + 1);
    return `
      <div class="gantt-row">
        <div class="gantt-task-name" title="${escapeHtml(task.name)}">${escapeHtml(task.name)}</div>
        <div class="gantt-lane" style="--days:${days}; grid-template-columns: repeat(${days}, minmax(44px, 1fr));">
          <div class="bar ${statusClass(task.status)}" style="grid-column: ${offset + 1} / span ${span};">
            ${span} ${text("day")} - ${Number(task.progress) || 0}%
          </div>
        </div>
      </div>
    `;
  }).join("");

  gantt.innerHTML = `
    <div class="gantt-grid">
      <div class="gantt-header">
        <div class="gantt-label">Task</div>
        <div class="gantt-days" style="grid-template-columns: repeat(${days}, minmax(44px, 1fr));">${dayHeaders}</div>
      </div>
      ${rows}
    </div>
  `;
}

function renderReports() {
  const shownProjects = visibleProjects();
  reports.innerHTML = shownProjects.length ? shownProjects.map((project) => {
    const projectTasks = accessibleTasks().filter((task) => task.project === project.name)
      .sort((a, b) => parseDate(a.start) - parseDate(b.start));
    const rows = projectTasks.length ? projectTasks.map((task) => `
      <div class="report-row">
        <strong>${escapeHtml(task.name)}</strong>
        <span>${statusLabel(task.status)}</span>
        <span>${text("start")}: ${escapeHtml(shortDate(task.start))}</span>
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
}

function renderViews() {
  views.forEach((view) => view.classList.toggle("active-view", view.id === `${currentView}View`));
}

function render() {
  applyAppSettings();
  applyTranslations();
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
  renderViews();
}

function resetForm() {
  form.reset();
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
  if (nextStatus && nextStatus !== "Bitib") {
    task.status = nextStatus;
    const stepProgress = Math.round(((statuses.indexOf(nextStatus) + 1) / statuses.length) * 90);
    task.progress = Math.max(Number(task.progress) || 0, stepProgress);
    task.startedAt = task.startedAt || new Date().toISOString();
  }
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

  if (action === "next") {
    if (!canManageTasks()) return;
    moveForward(task);
    saveTasks();
    render();
  }

  if (action === "reopen") {
    if (!canManageTasks()) return;
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
    trash.push({ id: createId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
    tasks = tasks.filter((item) => item.id !== task.id);
    saveTrash();
    saveTasks();
    render();
  }
}

function backupPayload() {
  return {
    version: backupVersion,
    exportedAt: new Date().toISOString(),
    tasks,
    projects,
    members,
    teams,
    projectLinks,
    registers,
    users,
    trash
  };
}

function canUseBackend() {
  return typeof fetch === "function" && window.location?.protocol !== "file:";
}

function backendUrl(path) {
  const location = window.location;
  const sameOriginBackend = location?.port && location.port !== "80";
  const base = sameOriginBackend ? "" : `${location.protocol}//${location.hostname}:3000`;
  return `${base}${path}`;
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
  if (!canUseBackend()) return;
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
  if (!canUseBackend() || !isAdmin()) return;
  try {
    await fetch(backendUrl("/api/settings"), {
      method: "PUT",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({
        emailEnabled: appSettings.emailEnabled,
        emailRecipients: appSettings.emailRecipients,
        emailProvider: appSettings.emailProvider,
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
      ldapEnabled: Boolean(serverSettings.ldapEnabled),
      ldapUrl: serverSettings.ldapUrl || "",
      ldapBaseDn: serverSettings.ldapBaseDn || "",
      ldapUserFilter: serverSettings.ldapUserFilter || "(uid={username})",
      ldapBindDn: serverSettings.ldapBindDn || "",
      ldapBindPassword: "",
      ldapGroupRoleMap: serverSettings.ldapGroupRoleMap || "",
      workflowStatuses: normalizeWorkflowStatuses(serverSettings.workflowStatuses || appSettings.workflowStatuses),
      capacityHours: Number(serverSettings.capacityHours) || appSettings.capacityHours || 40
    };
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
  projects = Array.isArray(payload.projects) ? payload.projects : projects;
  members = Array.isArray(payload.members) ? payload.members : members;
  teams = Array.isArray(payload.teams) ? payload.teams : teams;
  projectLinks = Array.isArray(payload.projectLinks) ? payload.projectLinks : projectLinks;
  registers = Array.isArray(payload.registers) ? payload.registers.map(normalizeRegisterItem) : registers;
  users = Array.isArray(payload.users) ? payload.users.map(normalizeUser) : users;
  trash = Array.isArray(payload.trash) ? payload.trash : trash;
  saveTasks();
  saveResources();
  saveRegisters();
  saveUsers();
  saveTrash();
  render();
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
    await fetch(backendUrl("/api/mail/deadline-alerts"), {
      method: "POST",
      headers: authHeaders({ "content-type": "application/json" }),
      body: JSON.stringify({
        subject: "Project Manager deadline alerts",
        alerts: alerts.slice(0, 10).map(({ task, alert }) => ({
          label: alert.label,
          taskName: task.name,
          project: getProject(task),
          end: task.end
        }))
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
    body: JSON.stringify({ subject: "Project Manager test email" })
  });
  if (!response.ok) throw new Error("Mail test failed");
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

  const existingIndex = tasks.findIndex((item) => item.id === task.id);
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }

  if (task.project && task.projectResource && !projectLinks.some((link) => link.project === task.project && link.resource === task.projectResource)) {
    projectLinks.push({ id: createId(), project: task.project, resource: task.projectResource });
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

statusFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  currentFilter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle("active", item === button));
  render();
});

viewTabs.forEach((button) => {
  button.addEventListener("click", () => {
    currentView = button.dataset.view;
    viewTabs.forEach((item) => item.classList.toggle("active", item.dataset.view === currentView));
    renderViews();
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

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;
  const localUser = users.find((item) => item.username === username && item.passwordHash === md5(password));
  let user = localUser;
  if (!user) {
    user = await backendLogin(username, password);
  }
  if (user && !users.some((item) => item.id === user.id || item.username === user.username)) {
    users.push(user);
    saveUsers();
  }
  user = users.find((item) => item.username === user?.username) || user;
  if (!user) {
    loginError.textContent = text("loginError");
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
  if (event.key === "Escape" && adminModal.classList.contains("open")) closeAdminPanel();
  if (event.key === "Escape" && managerAssignModal.classList.contains("open")) closeManagerAssign();
  if (event.key === "Escape" && taskComposerModal.classList.contains("open")) closeTaskComposer();
});

exportDataButton.addEventListener("click", () => {
  if (!isAdmin()) return;
  downloadJson(`project-manager-backup-${isoDate(new Date())}.json`, backupPayload());
});

exportExcelButton.addEventListener("click", async () => {
  if (!isAdmin()) return;
  const ok = await downloadBackendFile("/api/export/excel", `project-manager-export-${isoDate(new Date())}.csv`);
  if (!ok) downloadJson(`project-manager-export-${isoDate(new Date())}.json`, backupPayload());
});

exportPdfButton.addEventListener("click", async () => {
  if (!isAdmin()) return;
  await downloadBackendFile("/api/export/pdf", `project-manager-report-${isoDate(new Date())}.pdf`);
});

importDataInput.addEventListener("change", () => {
  if (!isAdmin() || !importDataInput.files?.length) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      importBackup(JSON.parse(reader.result));
      importDataInput.value = "";
    } catch {
      alert(text("backupError"));
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
    emailEnabled: isAdmin() ? emailEnabledInput.checked : appSettings.emailEnabled,
    emailRecipients: isAdmin() ? emailRecipientsInput.value.trim() : appSettings.emailRecipients,
    emailProvider: isAdmin() ? emailProviderInput.value.trim() : appSettings.emailProvider,
    ldapEnabled: isAdmin() ? ldapEnabledInput.checked : appSettings.ldapEnabled,
    ldapUrl: isAdmin() ? ldapUrlInput.value.trim() : appSettings.ldapUrl,
    ldapBaseDn: isAdmin() ? ldapBaseDnInput.value.trim() : appSettings.ldapBaseDn,
    ldapUserFilter: isAdmin() ? ldapUserFilterInput.value.trim() || "(uid={username})" : appSettings.ldapUserFilter,
    ldapBindDn: isAdmin() ? ldapBindDnInput.value.trim() : appSettings.ldapBindDn,
    ldapBindPassword: isAdmin() ? ldapBindPasswordInput.value : appSettings.ldapBindPassword,
    ldapGroupRoleMap: isAdmin() ? ldapGroupRoleMapInput.value.trim() : appSettings.ldapGroupRoleMap,
    capacityHours: isAdmin() ? Number(capacityHoursInput.value) || 40 : appSettings.capacityHours,
    workflowStatuses: normalizeWorkflowStatuses(appSettings.workflowStatuses)
  };
  syncWorkflowStatuses();
  saveAppSettings();
  saveBackendSettings();
  applyAppSettings();
  settingsStatus.textContent = text("settingsSaved");
});

testMailButton.addEventListener("click", async () => {
  if (!isAdmin()) return;
  settingsStatus.textContent = "";
  try {
    const result = await sendBackendTestMail();
    settingsStatus.textContent = result.skipped ? text("mailTestSkipped") : text("mailTestSent");
  } catch {
    settingsStatus.textContent = text("mailTestSkipped");
  }
});

addWorkflowStatusButton.addEventListener("click", () => {
  if (!isAdmin()) return;
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
  if (!isAdmin()) return;
  const username = newUsernameInput.value.trim();
  const password = newUserPasswordInput.value;
  const role = newUserRoleInput.value;
  if (!username || !password || users.some((user) => user.username === username)) return;
  const managerId = role === "user" ? users.find((user) => user.role === "manager")?.id || "" : "";
  const user = normalizeUser({
    id: createId(),
    username,
    passwordHash: md5(password),
    role,
    managerId,
    profile: {
      fullName: newUserFullNameInput.value.trim() || username,
      position: newUserPositionInput.value.trim(),
      email: newUserEmailInput.value.trim(),
      address: newUserAddressInput.value.trim()
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
  render();
});

userList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.userAction === "change-password") {
    if (!isAdmin()) return;
    const row = button.closest(".password-form");
    const user = users.find((item) => item.id === button.dataset.id);
    const input = row?.querySelector("input[name='password']");
    const password = input?.value || "";
    if (!user || !password) return;
    user.passwordHash = md5(password);
    input.value = "";
    saveUsers();
    render();
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
    managerId: projectLeaderInput.value,
    teamMemberIds: selectedProjectTeamMemberIds,
    start: projectStartDateInput.value,
    end: projectEndDateInput.value,
    status: projectStatusInput.value,
    priority: projectPriorityInput.value,
    progress
  };
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
      trash.push({ id: createId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
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
    trash.push({ id: createId(), type: "projectRecord", data: { ...project }, deletedAt: new Date().toISOString() });
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
  teams.push({ id: createId(), name, memberIds });
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
    projectLinks.push({ id: createId(), project, resource });
  }
  linkProjectInput.value = "";
  saveResources();
  render();
});

addRegisterItemButton.addEventListener("click", () => {
  if (!canManageTasks()) return;
  const item = normalizeRegisterItem({
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
        trash.push({ id: createId(), type: "project", data: { ...link }, deletedAt: new Date().toISOString() });
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

resetDemo.addEventListener("click", () => {
  if (!isAdmin()) return;
  tasks = createDemoTasks();
  members = demoMemberTemplates.map((member) => ({ ...member }));
  teams = demoTeamTemplates.map((team) => ({ ...team, memberIds: [...team.memberIds] }));
  projects = demoProjects.map((project) => ({ ...project }));
  projectLinks = demoProjectLinks.map((link) => ({ ...link }));
  registers = [];
  trash = [];
  users = demoUsers.map((user) => ({ ...user }));
  currentUser = users.find((user) => user.role === "admin") || null;
  if (currentUser) localStorage.setItem(sessionKey, currentUser.id);
  saveTasks();
  saveResources();
  saveUsers();
  saveTrash();
  saveRegisters();
  resetForm();
  render();
});

clearDone.addEventListener("click", () => {
  if (!isAdmin()) return;
  const doneTasks = tasks.filter((task) => task.status === "Bitib");
  doneTasks.forEach((task) => {
    trash.push({ id: createId(), type: "task", data: { ...task }, deletedAt: new Date().toISOString() });
  });
  tasks = tasks.filter((task) => task.status !== "Bitib");
  saveTrash();
  saveTasks();
  render();
});

render();
syncBackendState();
syncBackendSettings();
