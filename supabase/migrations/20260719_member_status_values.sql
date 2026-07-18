-- Komanda üzvlüyü axını üçün profil statusları.
-- pending  → mövcud şirkətə qoşulma sorğusu (admin təsdiqi gözləyir)
-- invited  → admin tərəfindən dəvət olunub (parol qurulmasını gözləyir)
alter type public.pm_status add value if not exists 'pending';
alter type public.pm_status add value if not exists 'invited';
