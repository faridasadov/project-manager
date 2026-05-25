-- Project Manager Storage + mail queue support.
-- Safe for an existing online project: no application data is dropped.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-attachments',
  'project-attachments',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Workspace users upload project attachments" on storage.objects;
create policy "Workspace users upload project attachments"
on storage.objects for insert
with check (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);

drop policy if exists "Workspace users update project attachments" on storage.objects;
create policy "Workspace users update project attachments"
on storage.objects for update
using (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
)
with check (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);

drop policy if exists "Workspace users read project attachments" on storage.objects;
create policy "Workspace users read project attachments"
on storage.objects for select
using (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);

drop policy if exists "Workspace users delete project attachments" on storage.objects;
create policy "Workspace users delete project attachments"
on storage.objects for delete
using (
  bucket_id = 'project-attachments'
  and (public.pm_workspace_id()::text = (storage.foldername(name))[1] or public.pm_is_super_admin())
);

insert into public.supabase_health (id, app_name, schema_version)
values (1, 'project-manager', '2026-05-25-storage-mail')
on conflict (id) do update
set
  app_name = excluded.app_name,
  schema_version = excluded.schema_version;
