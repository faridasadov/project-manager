// Project Manager — Service Worker
// Strategy: Cache-first for static assets, network-only for API calls

const CACHE = "pm-v8";
const STATIC = [
  "./",
  "./index.html",
  "./modules/ids.js",
  "./modules/crypto.js",
  "./modules/utils.js",
  "./modules/labels.js",
  "./modules/format.js",
  "./modules/normalize.js",
  "./modules/storage.js",
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

  // Cache-first for same-origin GET requests
  if (e.request.method !== "GET") return;
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
