-- Project Manager: Proper normalized schema (additive — no data loss).
-- Apply in: Supabase Dashboard → SQL Editor
-- Safe to re-run: CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS.

create extension if not exists "pgcrypto";

create or replace function public.pm_set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- projects
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name        text not null,
  lifecycle   text not null default 'Initiation',
  budget      numeric(14,2) not null default 0,
  progress    integer not null default 0 check (progress >= 0 and progress <= 100),
  archived    boolean not null default false,
  state_json  jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists idx_projects_workspace on public.projects(workspace_id);

-- tasks
create table if not exists public.tasks (
  id             uuid primary key default gen_random_uuid(),
  workspace_id   uuid not null references public.workspaces(id) on delete cascade,
  name           text not null,
  status         text not null default 'Plan',
  priority       text not null default 'Normal',
  owner_id       uuid,
  project        text,
  start_date     date,
  end_date       date,
  progress       integer not null default 0 check (progress >= 0 and progress <= 100),
  planned_hours  numeric(10,2) not null default 0,
  actual_hours   numeric(10,2) not null default 0,
  notes          text,
  parent_task_id uuid references public.tasks(id) on delete set null,
  state_json     jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_tasks_workspace on public.tasks(workspace_id);
create index if not exists idx_tasks_status   on public.tasks(status);
create index if not exists idx_tasks_end_date on public.tasks(end_date);

-- task_comments
create table if not exists public.task_comments (
  id           uuid primary key default gen_random_uuid(),
  task_id      uuid not null references public.tasks(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  author       text,
  body         text not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_task_comments_task on public.task_comments(task_id);

-- task_attachments
create table if not exists public.task_attachments (
  id           uuid primary key default gen_random_uuid(),
  task_id      uuid not null references public.tasks(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name         text not null,
  size         bigint not null default 0,
  storage_path text not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_task_attachments_task on public.task_attachments(task_id);

-- time_entries
create table if not exists public.time_entries (
  id           uuid primary key default gen_random_uuid(),
  task_id      uuid not null references public.tasks(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id      uuid,
  hours        numeric(10,2) not null,
  entry_date   date not null default current_date,
  note         text,
  created_at   timestamptz not null default now()
);
create index if not exists idx_time_entries_task on public.time_entries(task_id);
create index if not exists idx_time_entries_date on public.time_entries(entry_date);

-- updated_at triggers
drop trigger if exists trg_tasks_updated_at    on public.tasks;
create trigger trg_tasks_updated_at    before update on public.tasks    for each row execute function public.pm_set_updated_at();
drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects for each row execute function public.pm_set_updated_at();

-- RLS
alter table public.tasks           enable row level security;
alter table public.projects        enable row level security;
alter table public.task_comments   enable row level security;
alter table public.task_attachments enable row level security;
alter table public.time_entries    enable row level security;

drop policy if exists "workspace members" on public.tasks;
create policy "workspace members" on public.tasks for all
  using      (workspace_id = (select workspace_id from public.profiles where id = auth.uid()))
  with check (workspace_id = (select workspace_id from public.profiles where id = auth.uid()));

drop policy if exists "workspace members" on public.projects;
create policy "workspace members" on public.projects for all
  using      (workspace_id = (select workspace_id from public.profiles where id = auth.uid()))
  with check (workspace_id = (select workspace_id from public.profiles where id = auth.uid()));

drop policy if exists "workspace members" on public.task_comments;
create policy "workspace members" on public.task_comments for all
  using      (workspace_id = (select workspace_id from public.profiles where id = auth.uid()))
  with check (workspace_id = (select workspace_id from public.profiles where id = auth.uid()));

drop policy if exists "workspace members" on public.task_attachments;
create policy "workspace members" on public.task_attachments for all
  using      (workspace_id = (select workspace_id from public.profiles where id = auth.uid()))
  with check (workspace_id = (select workspace_id from public.profiles where id = auth.uid()));

drop policy if exists "workspace members" on public.time_entries;
create policy "workspace members" on public.time_entries for all
  using      (workspace_id = (select workspace_id from public.profiles where id = auth.uid()))
  with check (workspace_id = (select workspace_id from public.profiles where id = auth.uid()));

insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-05-25-proper-schema')
on conflict (id) do update set schema_version = excluded.schema_version;
