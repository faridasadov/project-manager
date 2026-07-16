-- Project Manager — kvota, soft-delete (offboarding) və email_verified server-tərəfi.
-- Additive migration.

-- #2 email_verified server-tərəfi: auth.users təsdiqlənəndə owner workspace-i email_verified=true.
create or replace function public.pm_sync_email_verified()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and old.email_confirmed_at is null then
    update public.workspaces set email_verified = true, updated_at = now()
    where owner_id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_email_verified on auth.users;
create trigger trg_sync_email_verified
  after update on auth.users
  for each row
  execute function public.pm_sync_email_verified();

-- #5 plan + kvota (istifadəçi limiti)
alter table public.workspaces
  add column if not exists plan text not null default 'standard'
    check (plan in ('standard', 'pro', 'enterprise')),
  add column if not exists max_users integer not null default 10;

-- #8/#10 soft-delete (offboarding)
alter table public.workspaces
  add column if not exists deleted_at timestamptz;

create index if not exists idx_workspaces_deleted_at on public.workspaces(deleted_at);

-- Silinmiş (deleted) workspace data-ya çıxış edə bilməz.
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
      and w.deleted_at is null
  )
$$;

insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-07-16-quota-softdelete')
on conflict (id) do update set schema_version = excluded.schema_version;
