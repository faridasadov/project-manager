window.PROJECT_MANAGER_SUPABASE = {
  url: "https://YOUR_PROJECT_REF.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY",
  // Boş buraxsan avtomatik hazırkı domendən götürülür; ya da öz domenini yaz.
  redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, ""),
  primaryBackend: true,
  storageBucket: "project-attachments",
  mailFunction: "project-manager-mail"
};
