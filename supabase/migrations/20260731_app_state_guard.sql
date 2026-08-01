-- #15 Server-tərəfi yazı validasiyası — app_state üçün qoruyucu trigger.
-- RLS yalnız "kim yaza bilər"i yoxlayır (admin). Bu trigger "NƏ yazıla bilər"i
-- yoxlayır: əvvəl data var idisə, tapşırıq VƏ layihələrin hamısını eyni anda
-- sıfıra endirən yazını rədd edir. 2026-07-21 və 2026-07-28 data itkilərinin
-- (köhnə sessiya boş blobu üzərinə yazır) kök qorumasıdır — klientdəki
-- "boş-payload klapanı"nın server-tərəf güzgüsü, ona görə buggy/köhnə klient də
-- datanı silə bilməz. Şərt çox mühafizəkardır: yalnız TAM silinmə (hər ikisi
-- >0 → 0) bloklanır; normal saxlamalar toxunulmur.

create or replace function public.pm_guard_app_state()
returns trigger
language plpgsql
as $$
declare
  old_tasks    int := coalesce(jsonb_array_length(OLD.state_json->'tasks'), 0);
  new_tasks    int := coalesce(jsonb_array_length(NEW.state_json->'tasks'), 0);
  old_projects int := coalesce(jsonb_array_length(OLD.state_json->'projects'), 0);
  new_projects int := coalesce(jsonb_array_length(NEW.state_json->'projects'), 0);
begin
  if old_tasks > 0 and new_tasks = 0 and old_projects > 0 and new_projects = 0 then
    raise exception 'pm_guard: bosh state yazisi bloklandi (evvel % task / % layihe var idi)',
      old_tasks, old_projects
      using errcode = 'check_violation';
  end if;
  return NEW;
end
$$;

drop trigger if exists pm_guard_app_state_trg on public.app_state;
create trigger pm_guard_app_state_trg
  before update on public.app_state
  for each row
  execute function public.pm_guard_app_state();
