-- Project Manager Supabase test schema
-- Run in Supabase Dashboard -> SQL Editor.
-- This is a side-channel test. It does not replace the current MariaDB backend yet.
-- Test reset: this file recreates only Project Manager test objects in public/storage.

create extension if not exists "pgcrypto";

drop policy if exists "Workspace users upload project attachments" on storage.objects;
drop policy if exists "Workspace users read project attachments" on storage.objects;

drop table if exists public.team_members cascade;
drop table if exists public.teams cascade;
drop table if exists public.registers cascade;
drop table if exists public.managed_files cascade;
drop table if exists public.attachments cascade;
drop table if exists public.comments cascade;
drop table if exists public.time_entries cascade;
drop table if exists public.task_dependencies cascade;
drop table if exists public.tasks cascade;
drop table if exists public.project_links cascade;
drop table if exists public.project_members cascade;
drop table if exists public.projects cascade;
drop table if exists public.customers cascade;
drop table if exists public.audit_logs cascade;
drop table if exists public.notifications cascade;
drop table if exists public.app_settings cascade;
drop table if exists public.app_state cascade;
drop table if exists public.supabase_health cascade;
drop table if exists public.profiles cascade;
drop table if exists public.workspaces cascade;

drop function if exists public.pm_same_workspace(uuid) cascade;
drop function if exists public.pm_is_super_admin() cascade;
drop function if exists public.pm_is_admin() cascade;
drop function if exists public.pm_role() cascade;
drop function if exists public.pm_workspace_id() cascade;

drop type if exists public.pm_role cascade;
drop type if exists public.pm_status cascade;

create type public.pm_role as enum ('super_admin', 'admin', 'manager', 'user');
create type public.pm_status as enum ('active', 'disabled');

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  company_key text unique,
  name text not null,
  owner_id uuid references auth.users(id) on delete set null,
  status pm_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  workspace_id uuid references public.workspaces(id) on delete set null,
  legacy_user_id text,
  role pm_role not null default 'user',
  username text not null,
  full_name text not null,
  email text not null,
  manager_id uuid references public.profiles(id) on delete set null,
  profile_json jsonb not null default '{}'::jsonb,
  status pm_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, username)
);

create table public.app_state (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  state_json jsonb not null,
  saved_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.app_settings (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  settings_json jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_customer_id text,
  name text not null,
  contact_person text,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_project_id text,
  customer_id uuid references public.customers(id) on delete set null,
  name text not null,
  status text not null default 'Plan',
  priority text not null default 'Normal',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  start_date date,
  end_date date,
  archived boolean not null default false,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  member_role text not null default 'member',
  primary key (project_id, profile_id, member_role)
);

create table public.project_links (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  legacy_link_id text,
  resource text not null,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_task_id text,
  project_id uuid references public.projects(id) on delete cascade,
  parent_task_id uuid references public.tasks(id) on delete set null,
  name text not null,
  status text not null default 'Plan',
  priority text not null default 'Normal',
  owner_id uuid references public.profiles(id) on delete set null,
  start_date date,
  end_date date,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  planned_hours numeric(8,2) not null default 0,
  actual_hours numeric(8,2) not null default 0,
  notes text,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_dependencies (
  task_id uuid not null references public.tasks(id) on delete cascade,
  depends_on_task_id uuid not null references public.tasks(id) on delete cascade,
  primary key (task_id, depends_on_task_id)
);

create table public.time_entries (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  hours numeric(8,2) not null check (hours > 0),
  entry_date date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.attachments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  comment_id uuid references public.comments(id) on delete cascade,
  file_name text not null,
  mime_type text,
  file_size integer not null default 0,
  storage_path text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.managed_files (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_file_id text,
  file_name text not null,
  mime_type text,
  file_size integer not null default 0,
  storage_path text,
  payload_json jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_team_id text,
  name text not null,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (team_id, profile_id)
);

create table public.registers (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  legacy_register_id text,
  project_id uuid references public.projects(id) on delete cascade,
  type text not null,
  title text not null,
  owner_id uuid references public.profiles(id) on delete set null,
  status text not null default 'Open',
  impact text,
  due_date date,
  mitigation text,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
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

create table public.audit_logs (
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

create table public.supabase_health (
  id integer primary key default 1,
  app_name text not null default 'project-manager',
  schema_version text not null default '2026-05-24-test',
  created_at timestamptz not null default now(),
  check (id = 1)
);

insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-05-24-test')
on conflict (id) do update
set schema_version = excluded.schema_version;

create index idx_profiles_workspace on public.profiles(workspace_id);
create index idx_workspaces_company_key on public.workspaces(company_key);
create index idx_projects_workspace on public.projects(workspace_id);
create index idx_projects_archived on public.projects(archived);
create index idx_project_links_workspace on public.project_links(workspace_id);
create index idx_tasks_workspace on public.tasks(workspace_id);
create index idx_tasks_project on public.tasks(project_id);
create index idx_tasks_status on public.tasks(status);
create index idx_tasks_end on public.tasks(end_date);
create index idx_comments_task on public.comments(task_id);
create index idx_attachments_task on public.attachments(task_id);
create index idx_managed_files_workspace on public.managed_files(workspace_id);
create index idx_audit_workspace_created on public.audit_logs(workspace_id, created_at desc);

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
returns pm_role
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
alter table public.customers enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_links enable row level security;
alter table public.tasks enable row level security;
alter table public.task_dependencies enable row level security;
alter table public.time_entries enable row level security;
alter table public.comments enable row level security;
alter table public.attachments enable row level security;
alter table public.managed_files enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.registers enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;
alter table public.supabase_health enable row level security;

create policy "Anyone reads health check"
on public.supabase_health for select
using (true);

create policy "Read own workspace"
on public.workspaces for select
using (id = public.pm_workspace_id() or owner_id = auth.uid() or public.pm_is_super_admin());

create policy "Create workspace"
on public.workspaces for insert
with check (owner_id = auth.uid());

create policy "Admin updates workspace"
on public.workspaces for update
using ((id = public.pm_workspace_id() and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((id = public.pm_workspace_id() and public.pm_is_admin()) or public.pm_is_super_admin());

create policy "Read profiles in workspace"
on public.profiles for select
using (id = auth.uid() or public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

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

create policy "User updates own profile"
on public.profiles for update
using (id = auth.uid())
with check (
  id = auth.uid()
  and workspace_id = public.pm_workspace_id()
  and role = public.pm_role()
);

create policy "Admin manages profiles"
on public.profiles for update
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

create policy "Workspace app state read"
on public.app_state for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Admin writes app state"
on public.app_state for insert
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

create policy "Admin updates app state"
on public.app_state for update
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

create policy "Workspace settings read"
on public.app_settings for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Admin writes settings"
on public.app_settings for all
using ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin());

create policy "Workspace read customers"
on public.customers for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Managers write customers"
on public.customers for all
using ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin());

create policy "Workspace read projects"
on public.projects for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Managers write projects"
on public.projects for all
using ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin());

create policy "Workspace read project members"
on public.project_members for select
using (exists (
  select 1 from public.projects p
  where p.id = project_id and (public.pm_same_workspace(p.workspace_id) or public.pm_is_super_admin())
));

create policy "Managers write project members"
on public.project_members for all
using (
  (public.pm_role() in ('super_admin', 'admin', 'manager') or public.pm_is_super_admin())
  and exists (select 1 from public.projects p where p.id = project_id and (public.pm_same_workspace(p.workspace_id) or public.pm_is_super_admin()))
)
with check (
  (public.pm_role() in ('super_admin', 'admin', 'manager') or public.pm_is_super_admin())
  and exists (select 1 from public.projects p where p.id = project_id and (public.pm_same_workspace(p.workspace_id) or public.pm_is_super_admin()))
);

create policy "Workspace read project links"
on public.project_links for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Managers write project links"
on public.project_links for all
using ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin());

create policy "Workspace read tasks"
on public.tasks for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace write tasks"
on public.tasks for all
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin())
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace read dependencies"
on public.task_dependencies for select
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace write dependencies"
on public.task_dependencies for all
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
))
with check (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace read time entries"
on public.time_entries for select
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace write time entries"
on public.time_entries for all
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
))
with check (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace read comments"
on public.comments for select
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace write comments"
on public.comments for all
using (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
))
with check (exists (
  select 1 from public.tasks t
  where t.id = task_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Workspace read attachments"
on public.attachments for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace write attachments"
on public.attachments for all
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin())
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace read managed files"
on public.managed_files for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace write managed files"
on public.managed_files for all
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin())
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace read teams"
on public.teams for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Managers write teams"
on public.teams for all
using ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin())
with check ((public.pm_same_workspace(workspace_id) and public.pm_role() in ('super_admin', 'admin', 'manager')) or public.pm_is_super_admin());

create policy "Workspace read team members"
on public.team_members for select
using (exists (
  select 1 from public.teams t
  where t.id = team_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin())
));

create policy "Managers write team members"
on public.team_members for all
using (
  (public.pm_role() in ('super_admin', 'admin', 'manager') or public.pm_is_super_admin())
  and exists (select 1 from public.teams t where t.id = team_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin()))
)
with check (
  (public.pm_role() in ('super_admin', 'admin', 'manager') or public.pm_is_super_admin())
  and exists (select 1 from public.teams t where t.id = team_id and (public.pm_same_workspace(t.workspace_id) or public.pm_is_super_admin()))
);

create policy "Workspace read registers"
on public.registers for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace write registers"
on public.registers for all
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin())
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace read notifications"
on public.notifications for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "System or admin writes notifications"
on public.notifications for insert
with check (workspace_id is null or ((public.pm_same_workspace(workspace_id) and public.pm_is_admin()) or public.pm_is_super_admin()));

create policy "Workspace read audit logs"
on public.audit_logs for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

create policy "Workspace writes audit logs"
on public.audit_logs for insert
with check (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-attachments',
  'project-attachments',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']
)
on conflict (id) do nothing;

create policy "Workspace users upload project attachments"
on storage.objects for insert
with check (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);

create policy "Workspace users read project attachments"
on storage.objects for select
using (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);
