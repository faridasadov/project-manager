# SPEC — Hesab Təsdiq Axını & Müstəqil Super-Admin Bootstrap

**Status:** Təsdiq gözləyir
**Tarix:** 2026-07-16
**Qərarlar:** Hibrid təsdiq (email + manual gate) · Kvota sonraya · Ayrı gizli super-admin bootstrap

---

## 1. Məqsəd
Platformanı tam müstəqil, təsdiq-nəzarətli multi-tenant SaaS-a çevirmək:
- Hər kəs qeydiyyatdan keçib öz bazasını yaradır → **email təsdiqi** → **super-admin təsdiqi** → aktiv.
- Super-admin heç bir tenant-a bağlı deyil, açıq qeydiyyatdan yaradıla bilməz, tenant DATA-sını görmür, yalnız metadata/statistikanı görür və hesabları təsdiq/rədd edir.

## 2. Scope
**Daxil:** pending status axını, email təsdiqi, super-admin təsdiq növbəsi, gizli super-admin bootstrap, login gate, onboarding email, təsdiq audit izi, mövcud tenant-ların grandfathering-i, owner rol fix.
**Xaric (sonraya):** plan/kvota enforcement, rate-limiting, soft-delete retention.

## 3. Data model dəyişiklikləri (Supabase migration)
Yeni migration: `supabase/migrations/2026XXXX_account_approval.sql`
- `pm_status` enum-a **`pending`** və **`rejected`** əlavə et (mövcud `active`/`disabled` qalır).
- `workspaces` cədvəlinə: `approval_status pm_status default 'pending'`, `email_verified boolean default false`, `approved_by uuid`, `approved_at timestamptz`, `rejected_reason text`, `requested_at timestamptz default now()`.
- **Grandfather:** migration mövcud bütün `workspaces`-i `approval_status='active'`, `email_verified=true` et (köhnə tenant-lar sınmasın).

## 4. RLS dəyişiklikləri
- **app_state / app_settings / notifications / audit_logs read+write:** yalnız `workspace.approval_status='active'` olduqda icazə ver (pending/rejected workspace öz data-sını yaza/oxuya bilməz).
- **workspaces read:** owner öz workspace-ini (status daxil) görə bilər ki, "gözləmədə" ekranını göstərsin.
- **Yeni "Super-admin approves workspace" update policy:** yalnız `pm_is_super_admin()` `approval_status`-u dəyişə bilər.
- **"Create workspace" insert:** həmişə `approval_status='pending'` məcbur (owner özünü aktiv edə bilməz).

## 5. Super-admin bootstrap (müstəqil, gizli)
- Super-admin **açıq qeydiyyatdan yaradıla bilməz** (registerForm heç vaxt `super_admin` rol verməz).
- Bootstrap yalnız iki yolla:
  1. **Supabase:** service-role ilə işləyən birdəfəlik SQL/edge-function seed (`SUPER_ADMIN_EMAIL` + secret). Migration-da super_admin `profiles` sətri `workspace_id=NULL` ilə yaradılır (tenant-a bağlı deyil).
  2. **Local/offline fallback:** seed-data.js-də super_admin yalnız env/secret flag ilə (mövcud davranış sərtləşdirilir).
- Super-admin `workspace_id=NULL` → heç bir tenant scope-una düşmür.

## 6. Frontend axını
### 6.1 Qeydiyyat
- registerForm → Supabase `signUp` (email confirmation ON) → workspace `approval_status='pending'`, `email_verified=false` yaradılır.
- Owner rolu **`admin`** olur (həm local, həm Supabase yolda — mövcud `manager` bug-u düzəldilir).
- İstifadəçiyə "Emailinizi təsdiqləyin" ekranı göstərilir.

### 6.2 Email təsdiqi
- Supabase auth email confirmation link. Təsdiqdən sonra `email_verified=true` (edge-function və ya auth hook).
- email_verified olan kimi workspace super-admin təsdiq növbəsinə düşür.

### 6.3 Login gate
- Login zamanı workspace `approval_status` yoxlanır:
  - `pending` + email_verified=false → "Email təsdiqi gözlənilir" ekranı.
  - `pending` + email_verified=true → "Super-admin təsdiqi gözlənilir" ekranı.
  - `rejected` → "Qeydiyyat rədd edildi: {səbəb}" ekranı.
  - `active` → normal daxilolma.
- super_admin bu gate-dən azaddır.

### 6.4 Platform Console — Təsdiq növbəsi (YENİ bölmə)
- Yeni panel: **"Gözləyən qeydiyyatlar"** — email_verified=true & approval_status=pending workspace-lər.
- Hər sətir: şirkət adı, owner email, requested_at, **[Təsdiqlə]** / **[Rədd et (səbəb)]**.
- Təsdiqlə → `approval_status='active'`, `approved_by`, `approved_at`; onboarding email göndər.
- Rədd et → `approval_status='rejected'`, `rejected_reason`.
- Hər əməliyyat `recordAudit("workspace.approved"/"workspace.rejected", ...)`.

### 6.5 Onboarding email
- Təsdiqdən sonra owner-ə "Hesabınız aktivdir" emaili (mövcud mail edge-function ilə).

## 7. Audit hadisələri
`workspace.registered`, `workspace.email_verified`, `workspace.approved`, `workspace.rejected`, `superadmin.bootstrap`.

## 8. Yoxlama planı
- **RLS testləri:** pending workspace app_state oxuya/yaza bilmir; başqa tenant görünmür; super-admin data görmür amma approval update edə bilir.
- **Playwright:** qeydiyyat → pending ekran → (mock email_verify) → super-admin login → təsdiq növbəsində görünür → təsdiqlə → owner login → daxil olur. Rədd axını ayrıca.
- **Prod-data qoruması:** real Supabase-ə qarşı test edərkən save funksiyalarını stub et, reload ilə təmizlə (mövcud CRUD test protokolu).
- **Grandfather yoxlaması:** mövcud tenant-lar migration-dan sonra `active` qalır, sınmır.

## 9. Deploy planı
1. Migration-ı əvvəlcə Supabase branch/staging-də tətbiq et, sonra prod.
2. Frontend dəyişiklikləri → GitHub push → Pages deploy (`?v=` bump, sw CACHE bump).
3. 1.69 maşın sync: `git pull --ff-only && systemctl restart project-manager.service`.
4. Super-admin bootstrap seed-i prod-da bir dəfə işə sal, təsdiqlə.

## 10. Risk & geri-dönmə
- Migration additive-dir (enum-a dəyər əlavə, sütun əlavə) — mövcud data itmir.
- Grandfathering ilə köhnə tenant-lar təsirlənmir.
- RLS dəyişikliyi əvvəlcə staging-də sınanır.
- Backup: hər addımda git commit, Supabase migration versiyalı.
