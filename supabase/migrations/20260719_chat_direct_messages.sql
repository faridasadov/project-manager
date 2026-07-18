-- Chat: direct (1-to-1) messages alongside project group chat.
-- recipient_id NULL → project group message; SET → private DM.
alter table public.project_messages add column if not exists recipient_id uuid;
alter table public.project_messages alter column project_id drop not null;

create index if not exists idx_project_messages_dm
  on public.project_messages(workspace_id, sender_id, recipient_id, created_at);

drop policy if exists "Read messages in workspace" on public.project_messages;
create policy "Read messages in workspace"
on public.project_messages for select
using (
  (
    public.pm_same_workspace(workspace_id)
    and (recipient_id is null or sender_id = auth.uid() or recipient_id = auth.uid())
  )
  or public.pm_is_super_admin()
);
-- Qeyd: recipient_id-də profiles FK YOXDUR — komanda üzvləri app_state-də saxlanıla bilər (app id = uuid).
