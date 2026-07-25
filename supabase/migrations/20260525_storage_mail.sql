-- Project Manager Storage + mail queue support.
-- Safe for an existing online project: no application data is dropped.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-attachments',
  'project-attachments',
  false,
  10485760,
  array[
    'image/jpeg','image/png','image/webp','image/gif','image/bmp','image/tiff','image/heic','image/heif',
    'application/pdf',
    'application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/rtf',
    'application/vnd.oasis.opendocument.text','application/vnd.oasis.opendocument.spreadsheet','application/vnd.oasis.opendocument.presentation',
    'text/plain','text/csv','text/markdown','text/tab-separated-values',
    'application/zip','application/x-zip-compressed','application/x-rar-compressed','application/vnd.rar','application/x-7z-compressed','application/gzip','application/x-tar',
    'message/rfc822','application/vnd.ms-outlook',
    'application/json',
    'audio/mpeg','audio/wav','audio/ogg','video/mp4','video/webm','video/quicktime',
    'application/octet-stream'
  ]
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
