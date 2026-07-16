-- Project Manager — Hesab təsdiq axını & müstəqil super-admin bootstrap.
-- Additive migration: heç bir mövcud data silinmir; mövcud tenant-lar grandfather olunur.
-- Qeyd: pm_status enum-u GENİŞLƏNMİR (Postgres enum-in-transaction məhdudiyyəti).
-- Bunun əvəzinə approval üçün ayrıca text+CHECK sütunu istifadə olunur.
-- Mövcud `status` (active/disabled) sütunu suspend/activate oxu üçün olduğu kimi qalır.

-- ── 1. workspaces cədvəlinə təsdiq sahələri ─────────────────────────────────
alter table public.workspaces
  add column if not exists approval_status text not null default 'pending'
    check (approval_status in ('pending', 'active', 'rejected')),
  add column if not exists email_verified boolean not null default false,
  add column if not exists approved_by uuid references auth.users(id) on delete set null,
  add column if not exists approved_at timestamptz,
  add column if not exists rejected_reason text,
  add column if not exists requested_at timestamptz not null default now();

create index if not exists idx_workspaces_approval_status
  on public.workspaces(approval_status);

-- ── 2. Grandfather: mövcud bütün workspace-lər aktiv & təsdiqli sayılır ──────
-- (Migration-dan əvvəl yaradılmış tenant-lar sınmamalıdır.)
update public.workspaces
set approval_status = 'active',
    email_verified = true,
    approved_at = coalesce(approved_at, now())
where approval_status = 'pending';

-- ── 3. Köməkçi funksiya: workspace təsdiqlənibmi? ───────────────────────────
create or replace function public.pm_workspace_approved()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspaces w
    where w.id = public.pm_workspace_id()
      and w.approval_status = 'active'
  )
$$;

-- ── 4. RLS: pending/rejected workspace öz data-sını oxuya/yaza bilməz ────────
-- app_state
drop policy if exists "Workspace app state read" on public.app_state;
create policy "Workspace app state read"
on public.app_state for select
using (
  (public.pm_same_workspace(workspace_id) and public.pm_workspace_approved())
  or public.pm_is_super_admin()
);

drop policy if exists "Admin writes app state" on public.app_state;
create policy "Admin writes app state"
on public.app_state for insert
with check (
  (public.pm_same_workspace(workspace_id) and public.pm_is_admin() and public.pm_workspace_approved())
  or public.pm_is_super_admin()
);

drop policy if exists "Admin updates app state" on public.app_state;
create policy "Admin updates app state"
on public.app_state for update
using (
  (public.pm_same_workspace(workspace_id) and public.pm_is_admin() and public.pm_workspace_approved())
  or public.pm_is_super_admin()
)
with check (
  (public.pm_same_workspace(workspace_id) and public.pm_is_admin() and public.pm_workspace_approved())
  or public.pm_is_super_admin()
);

-- app_settings
drop policy if exists "Workspace settings read" on public.app_settings;
create policy "Workspace settings read"
on public.app_settings for select
using (
  (public.pm_same_workspace(workspace_id) and public.pm_workspace_approved())
  or public.pm_is_super_admin()
);

drop policy if exists "Admin writes settings" on public.app_settings;
create policy "Admin writes settings"
on public.app_settings for all
using (
  (public.pm_same_workspace(workspace_id) and public.pm_is_admin() and public.pm_workspace_approved())
  or public.pm_is_super_admin()
)
with check (
  (public.pm_same_workspace(workspace_id) and public.pm_is_admin() and public.pm_workspace_approved())
  or public.pm_is_super_admin()
);

-- ── 5. RLS: workspaces — owner öz workspace-ini status daxil görə bilər ──────
-- (Mövcud "Read own workspace" policy artıq owner_id = auth.uid() daxil edir —
--  "gözləmədə" ekranı üçün kifayətdir, dəyişiklik lazım deyil.)

-- ── 6. RLS: "Create workspace" həmişə pending məcbur edir ────────────────────
-- (owner özünü aktiv edə bilməz — approval_status insert-də 'active' ola bilməz.)
drop policy if exists "Create workspace" on public.workspaces;
create policy "Create workspace"
on public.workspaces for insert
with check (
  owner_id = auth.uid()
  and approval_status = 'pending'
);

-- ── 7. RLS: yalnız super-admin approval_status-u dəyişə bilər ────────────────
-- Mövcud "Admin updates workspace" policy tenant admin-inə workspace update
-- verir (ad/status). approval_status-un yalnız super-admin tərəfindən
-- dəyişdirilməsini təmin etmək üçün ayrıca guard trigger istifadə edirik.
create or replace function public.pm_guard_approval_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.approval_status is distinct from old.approval_status
     and not public.pm_is_super_admin() then
    raise exception 'Yalnız super-admin approval_status dəyişə bilər';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_approval_change on public.workspaces;
create trigger trg_guard_approval_change
  before update on public.workspaces
  for each row
  execute function public.pm_guard_approval_change();

-- ── 8. supabase_health schema versiyasını yenilə ────────────────────────────
insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-07-16-account-approval')
on conflict (id) do update
set schema_version = excluded.schema_version;
