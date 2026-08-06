// Project Manager — Service Worker
// Strategy: Cache-first for static assets, network-only for API calls

const CACHE = "pm-v185";
const STATIC = [
  "./",
  "./index.html",
  "./modules/state.js",
  "./modules/translations.js",
  "./modules/ids.js",
  "./modules/crypto.js",
  "./modules/seed-data.js",
  "./modules/utils.js",
  "./modules/labels.js",
  "./modules/format.js",
  "./modules/normalize.js",
  "./modules/storage.js",
  "./modules/tenant.js",
  "./modules/scope.js",
  "./modules/dependencies.js",
  "./modules/notifications.js",
  "./modules/company.js",
  "./modules/governance.js",
  "./modules/permissions.js",
  "./modules/project-crud.js",
  "./modules/metrics.js",
  "./modules/lookups.js",
  "./modules/option-builders.js",
  "./modules/render-markup.js",
  "./modules/project-chat.js",
  "./modules/hero-signal-field.js",
  "./modules/glide-reveal.js",
  "./modules/vendor/motion.js",
  "./script.js",
  "./styles.css",
  "./manifest.json",
  "./supabase/supabase-config.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Network-only: Supabase, Telegram, Resend — always live
  if (
    url.hostname.includes("supabase.co") ||
    url.hostname.includes("telegram.org") ||
    url.hostname.includes("resend.com")
  ) return;

  if (e.request.method !== "GET") return;

  // HTML naviqasiyası (index.html) → NETWORK-FIRST.
  // Səbəb: cache-first index.html köhnə qalır və deploy-lar görünmür (istifadəçilər
  // köhnə versiyada ilişir). İndi hər açılışda təzə index.html gəlir → təzə ?v= assetlər.
  // Offline olduqda cache-ə düşürük.
  const isNavigation = e.request.mode === "navigate" ||
    (e.request.destination === "document") ||
    url.pathname === "/" || url.pathname.endsWith("/index.html");
  if (isNavigation) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put("./index.html", clone));
        return res;
      }).catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Versiyalı statik assetlər (?v=) URL başına dəyişməzdir → cache-first.
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
