// Project Manager — ilk giriş üçün guided tour (onboarding).
// Classic script, script.js-dən əvvəl yüklənir, global scope-u paylaşır.
// Runtime-da currentUser / isSuperAdmin (script.js) çağırılır — problem yoxdur.

const ONBOARDING_VERSION = "v1";
let _tourIndex = 0;
let _tourStepsCache = [];
let _tourAutoChecked = false;

function onboardingSteps() {
  return [
    { sel: ".sidebar-menu", title: "Naviqasiya", text: "Sol menyu — bölmələr arasında keçid: Dashboard, Layihələr, Tasklar, Kanban, Təqvim, Gantt, Hesabat.", pos: "right" },
    { sel: '.view-tab[data-view="dashboard"]', title: "Dashboard", text: "Ümumi mənzərə: aktiv tasklar, gecikənlər, komanda yükü və yaxın deadline-lar bir ekranda.", pos: "right" },
    { sel: '.view-tab[data-view="projects"]', title: "Layihələr", text: "Layihələri yarat və idarə et — status, məsul menecerlər, governance göstəriciləri.", pos: "right" },
    { sel: '.view-tab[data-view="list"]', title: "Tasklar", text: "Bütün taskların siyahısı — filtrlə, axtar, statusu və məsul şəxsi dəyiş.", pos: "right" },
    { sel: '.view-tab[data-view="kanban"]', title: "Kanban", text: "Taskları sürüklə-burax lövhəsində status sütunları üzrə idarə et.", pos: "right" },
    { sel: '.view-tab[data-view="gantt"]', title: "Gantt & Təqvim", text: "Vaxt qrafiki və asılılıqlar — planı vizual izlə.", pos: "right" },
    { sel: "#openTaskComposer", title: "Task əlavə et", text: "Yeni task yarat — ad, layihə, tarix, məsul şəxs, prioritet və progres.", pos: "bottom" },
    { sel: "#searchInput", title: "Axtarış", text: "Task, layihə və ya məsul şəxs üzrə sürətli axtarış.", pos: "bottom" },
    { sel: "#notifyButton", title: "Bildirişlər", text: "Yeni tapşırıq, deadline və dəyişikliklər barədə bildirişlər buradadır.", pos: "bottom" },
    { sel: "#currentUserBadge", title: "Hesabın", text: "Cari istifadəçi və rolun. Sağdakı düymələrlə dili dəyiş və ya çıxış et.", pos: "bottom" }
  ];
}

function tourStorageKey() {
  return `pm-onboarding-${ONBOARDING_VERSION}-${(typeof currentUser !== "undefined" && currentUser?.id) || "anon"}`;
}

function tourIsSuperAdmin() {
  return typeof isSuperAdmin === "function" && isSuperAdmin();
}

function maybeAutoStartTour() {
  if (_tourAutoChecked) return;
  if (typeof currentUser === "undefined" || !currentUser || tourIsSuperAdmin()) return;
  _tourAutoChecked = true;
  try { if (localStorage.getItem(tourStorageKey())) return; } catch (e) {}
  setTimeout(() => startOnboardingTour(false), 700);
}

function startOnboardingTour(force = false) {
  if (typeof currentUser === "undefined" || !currentUser || tourIsSuperAdmin()) return;
  _tourStepsCache = onboardingSteps().filter((s) => document.querySelector(s.sel));
  if (!_tourStepsCache.length) return;
  _tourIndex = 0;
  buildTourDom();
  showTourStep(0);
}

function endOnboardingTour(markDone = true) {
  if (markDone) { try { localStorage.setItem(tourStorageKey(), "1"); } catch (e) {} }
  document.getElementById("pmTourOverlay")?.remove();
  document.getElementById("pmTourTip")?.remove();
  document.querySelectorAll(".pm-tour-highlight").forEach((el) => el.classList.remove("pm-tour-highlight"));
}

function buildTourDom() {
  endOnboardingTour(false);
  const overlay = document.createElement("div");
  overlay.id = "pmTourOverlay";
  overlay.addEventListener("click", () => endOnboardingTour(true));
  document.body.appendChild(overlay);

  const tip = document.createElement("div");
  tip.id = "pmTourTip";
  tip.innerHTML = `
    <div class="pm-tour-head">
      <span id="pmTourProgress" class="pm-tour-progress"></span>
      <button type="button" id="pmTourClose" class="pm-tour-close" aria-label="Bağla">×</button>
    </div>
    <h4 id="pmTourTitle"></h4>
    <p id="pmTourText"></p>
    <div class="pm-tour-actions">
      <button type="button" id="pmTourSkip" class="pm-tour-skip">Turu keç</button>
      <div class="pm-tour-nav">
        <button type="button" id="pmTourPrev">Geri</button>
        <button type="button" id="pmTourNext" class="primary">İrəli</button>
      </div>
    </div>`;
  document.body.appendChild(tip);

  tip.querySelector("#pmTourClose").addEventListener("click", () => endOnboardingTour(true));
  tip.querySelector("#pmTourSkip").addEventListener("click", () => endOnboardingTour(true));
  tip.querySelector("#pmTourPrev").addEventListener("click", () => showTourStep(_tourIndex - 1));
  tip.querySelector("#pmTourNext").addEventListener("click", () => {
    if (_tourIndex >= _tourStepsCache.length - 1) endOnboardingTour(true);
    else showTourStep(_tourIndex + 1);
  });
}

function showTourStep(i) {
  if (i < 0 || i >= _tourStepsCache.length) return;
  document.querySelectorAll(".pm-tour-highlight").forEach((el) => el.classList.remove("pm-tour-highlight"));
  const step = _tourStepsCache[i];
  const target = document.querySelector(step.sel);
  if (!target) { showTourStep(i > _tourIndex ? i + 1 : i - 1); return; }
  _tourIndex = i;
  target.classList.add("pm-tour-highlight");
  target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

  const tip = document.getElementById("pmTourTip");
  if (!tip) return;
  tip.querySelector("#pmTourTitle").textContent = step.title;
  tip.querySelector("#pmTourText").textContent = step.text;
  tip.querySelector("#pmTourProgress").textContent = `${i + 1} / ${_tourStepsCache.length}`;
  tip.querySelector("#pmTourPrev").style.visibility = i === 0 ? "hidden" : "visible";
  tip.querySelector("#pmTourNext").textContent = i === _tourStepsCache.length - 1 ? "Bitir" : "İrəli";
  // Mövqe render bitəndən sonra hesablanır (scroll + ölçü dəqiq olsun).
  setTimeout(() => positionTourTip(tip, target, step.pos), 220);
}

function positionTourTip(tip, target, pos) {
  const r = target.getBoundingClientRect();
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  const gap = 14;
  let top;
  let left;
  if (pos === "right") { left = r.right + gap; top = r.top; }
  else if (pos === "left") { left = r.left - tw - gap; top = r.top; }
  else if (pos === "top") { left = r.left; top = r.top - th - gap; }
  else { left = r.left; top = r.bottom + gap; }
  left = Math.max(12, Math.min(left, window.innerWidth - tw - 12));
  top = Math.max(12, Math.min(top, window.innerHeight - th - 12));
  tip.style.left = `${left}px`;
  tip.style.top = `${top}px`;
}

// Help düyməsi (header) turu yenidən başlatmaq üçün.
document.querySelector("#helpTourBtn")?.addEventListener("click", () => startOnboardingTour(true));
