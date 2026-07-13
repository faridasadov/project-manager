// Project Manager — demo / seed data (templates, demo tenants, sample users)
// Classic script (no ES module). Loaded before script.js, shares global scope.
// Pure data. Depends only on md5() (crypto.js) — must load AFTER crypto.js.

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
