window.PROJECT_MANAGER_SUPABASE = {
  url: "https://zvloggrzmcjgvmzuvnoz.supabase.co",
  anonKey: "sb_publishable_IcDwEp1opIKmdFnWgvIEWA_QVjX-J0c",
  // Dinamik: hazırkı domenin app kök URL-i (github.io, Cloudflare, custom domen — hamısı avtomatik).
  redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, ""),
  primaryBackend: true,
  storageBucket: "project-attachments",
  mailFunction: "project-manager-mail"
};
