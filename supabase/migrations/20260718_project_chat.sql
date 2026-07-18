-- Project internal chat: manager ↔ team messages inside a project.
-- Workspace-level RLS (mirrors app_state): any active member of the workspace
-- can read/post; project-membership filtering is enforced client-side.

create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id text not null,
  sender_id uuid references public.profiles(id) on delete set null,
  sender_name text,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists idx_project_messages_ws_proj
  on public.project_messages(workspace_id, project_id, created_at);

alter table public.project_messages enable row level security;

drop policy if exists "Read messages in workspace" on public.project_messages;
create policy "Read messages in workspace"
on public.project_messages for select
using (public.pm_same_workspace(workspace_id) or public.pm_is_super_admin());

drop policy if exists "Post message in workspace" on public.project_messages;
create policy "Post message in workspace"
on public.project_messages for insert
with check (public.pm_same_workspace(workspace_id) and sender_id = auth.uid());

drop policy if exists "Delete own or admin" on public.project_messages;
create policy "Delete own or admin"
on public.project_messages for delete
using (
  sender_id = auth.uid()
  or (public.pm_same_workspace(workspace_id) and public.pm_is_admin())
  or public.pm_is_super_admin()
);

-- Live updates via Supabase Realtime.
alter publication supabase_realtime add table public.project_messages;
