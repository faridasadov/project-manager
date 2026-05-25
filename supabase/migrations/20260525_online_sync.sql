-- Project Manager online Supabase migration.
-- Safe for an existing online project: no application data is dropped.
-- Run this in Supabase Dashboard -> SQL Editor when GitHub code changes need
-- the current Supabase core tables, RLS helpers, and policies.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'pm_role') then
    create type public.pm_role as enum ('super_admin', 'admin', 'manager', 'user');
  end if;
  if not exists (select 1 from pg_type where typnamespace = 'public'::regnamespace and typname = 'pm_status') then
    create type public.pm_status as enum ('active', 'disabled');
  end if;
end $$;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  company_key text unique,
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  status public.pm_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  legacy_user_id text,
  role public.pm_role not null default 'user',
  username text not null,
  full_name text not null,
  email text not null,
  manager_id uuid references public.profiles(id) on delete set null,
  profile_json jsonb not null default '{}'::jsonb,
  status public.pm_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, username)
);

create table if not exists public.app_state (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  state_json jsonb not null,
  saved_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  settings_json jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  type text not null,
  recipient text,
  subject text,
  body text,
  status text not null,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  actor_label text,
  action text not null,
  entity_type text,
  entity_id uuid,
  details_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.supabase_health (
  id integer primary key default 1,
  app_name text not null default 'project-manager',
  schema_version text not null default '2026-05-25-online-sync',
  created_at timestamptz not null default now(),
  check (id = 1)
);

create index if not exists idx_profiles_workspace on public.profiles(workspace_id);
create index if not exists idx_workspaces_company_key on public.workspaces(company_key);
create index if not exists idx_audit_workspace_created on public.audit_logs(workspace_id, created_at desc);

create or replace function public.pm_workspace_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select workspace_id from public.profiles where id = auth.uid()
$$;

create or replace function public.pm_role()
returns public.pm_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.pm_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin') and status = 'active'
  )
$$;

create or replace function public.pm_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin' and status = 'active'
  )
$$;

create or replace function public.pm_same_workspace(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target is not null and target = public.pm_workspace_id()
$$;

alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.app_state enable row level security;
alter table public.app_settings enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.supabase_health enable row level security;

drop policy if exists "Anyone reads health check" on public.supabase_health;
create policy "Anyone reads health check"
on public.supabase_health for select
using (true);

drop policy if exists "Read own workspace" on public.workspaces;
create policy "Read own workspace"
on public.workspaces for select
using (id = public.pm_workspace_id() or owner_id = auth.uid() or public.pm_is_super_admin());

drop policy if exists "Create workspace" on public.workspaces;
create policy "Create workspace"
on public.workspaces for insert
with check (owner_id = auth.uid());

drop policy if exists "Admin updates workspace" on public.workspaces;
create policy "Admin updates workspace"
on public.workspaces for update
using ((id = public.pm_workspace_id() and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((id = public.pm_workspace_id() and public.pm_is_admin()) or public.pm_is_super_admin());

drop policy if exists "Read profiles in workspace" on public.profiles;
create policy "Read profiles in workspace"
on public.profiles for select
using (id = auth.uid() or public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "Create own profile" on public.profiles;
create policy "Create own profile"
on public.profiles for insert
with check (
  id = auth.uid()
  and role = 'admin'
  and exists (
    select 1 from public.workspaces w
    where w.id = workspace_id and w.owner_id = auth.uid()
  )
);

drop policy if exists "User updates own profile" on public.profiles;
create policy "User updates own profile"
on public.profiles for update
using (id = auth.uid())
with check (
  id = auth.uid()
  and workspace_id = public.pm_workspace_id()
  and role = public.pm_role()
);

drop policy if exists "Admin manages profiles" on public.profiles;
create policy "Admin manages profiles"
on public.profiles for update
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

drop policy if exists "Workspace app state read" on public.app_state;
create policy "Workspace app state read"
on public.app_state for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "Admin writes app state" on public.app_state;
create policy "Admin writes app state"
on public.app_state for insert
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

drop policy if exists "Admin updates app state" on public.app_state;
create policy "Admin updates app state"
on public.app_state for update
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

drop policy if exists "Workspace settings read" on public.app_settings;
create policy "Workspace settings read"
on public.app_settings for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "Admin writes settings" on public.app_settings;
create policy "Admin writes settings"
on public.app_settings for all
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

drop policy if exists "Workspace read notifications" on public.notifications;
create policy "Workspace read notifications"
on public.notifications for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "System or admin writes notifications" on public.notifications;
create policy "System or admin writes notifications"
on public.notifications for insert
with check (workspace_id is null or ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin()));

drop policy if exists "Workspace read audit logs" on public.audit_logs;
create policy "Workspace read audit logs"
on public.audit_logs for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "Workspace writes audit logs" on public.audit_logs;
create policy "Workspace writes audit logs"
on public.audit_logs for insert
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-05-25-online-sync')
on conflict (id) do update
set
  app_name = excluded.app_name,
  schema_version = excluded.schema_version;
