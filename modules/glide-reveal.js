// "Glide to reveal" effekti (CodePen jh3y/JjxPKXz uyğunlaşdırması).
//
// Orijinalda hərflər blur + kiçildilmiş vəziyyətdədir; kursor bir hərfin üstünə
// gələndə o hərf tam kəskinləşir, qonşuları sinus ilə azalan dərəcədə. Pen sabit
// 6 simvol üçün qonşu selektorları (`+ .digit + .digit …`) işlədir — bizdə mətn
// dəyişkən uzunluqdadır (üç dil), ona görə düşmə əyrisini kursor MƏSAFƏSİNDƏN
// hesablayırıq: həm hər uzunluqda işləyir, həm də keçid kəsik deyil, kəsilməzdir.
//
// İki yerdə tətbiq olunur:
//   1. Welcome hero başlığı — kursorla oxunur
//   2. Login formasının etiketləri — sahə fokuslananda pillələnmiş açılış
//
// prefers-reduced-motion → hərflər bölünmür, heç nə blur olunmur.

/* eslint-disable no-unused-vars */

(function () {
  const REDUCED = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Mətni hərf-hərf <span>-lara bölür. Boşluqlar ayrıca saxlanılır ki, sətir
  // sonu qırılması təbii qalsın. data-glide təkrar bölünmənin qarşısını alır.
  function splitChars(el) {
    if (!el) return [];
    const source = el.dataset.glideText || el.textContent;
    el.dataset.glideText = source;           // dil dəyişəndə orijinal mətn lazımdır
    el.textContent = "";
    const chars = [];
    for (const ch of source) {
      if (ch === " ") {
        el.appendChild(document.createTextNode(" "));
        continue;
      }
      const span = document.createElement("span");
      span.className = "glide-char";
      span.textContent = ch;
      el.appendChild(span);
      chars.push(span);
    }
    el.dataset.glide = "on";
    return chars;
  }

  // ── 1) Hero başlığı: kursora görə kəsilməz açılış ─────────────────────────
  function initHeroTitle() {
    const title = document.querySelector(".login-hero-title");
    if (!title || REDUCED) return;

    let chars = splitChars(title);
    let centers = [];

    const measure = () => {
      centers = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return r.left + r.width / 2;
      });
    };

    const clear = () => chars.forEach((c) => c.style.setProperty("--active", "0"));

    const onMove = (event) => {
      if (!centers.length) measure();
      // Təsir radiusu: təxminən 4 hərf eni. Bundan uzaqda hərf tam blur qalır.
      const radius = 120;
      for (let i = 0; i < chars.length; i++) {
        const d = Math.abs(event.clientX - centers[i]);
        const t = Math.max(0, 1 - d / radius);
        // Kosinus yumşaltma — xətti düşmədən daha təbii görünür.
        chars[i].style.setProperty("--active", (t * t * (3 - 2 * t)).toFixed(3));
      }
    };

    title.classList.add("glide-title");
    title.addEventListener("pointermove", onMove);
    title.addEventListener("pointerleave", clear);
    window.addEventListener("resize", () => { centers = []; }, { passive: true });
    clear();

    // Dil dəyişəndə applyTranslations() textContent-i əvəz edir → yenidən böl.
    const observer = new MutationObserver(() => {
      if (title.dataset.glide === "on" && title.querySelector(".glide-char")) return;
      delete title.dataset.glideText;
      chars = splitChars(title);
      centers = [];
      clear();
    });
    observer.observe(title, { childList: true });
  }

  // ── 2) Login etiketləri: fokusda pillələnmiş açılış ───────────────────────
  function initFieldLabels() {
    if (REDUCED) return;
    document.querySelectorAll("#loginForm label, #registerForm label, #resetPasswordForm label")
      .forEach((label) => {
        const span = label.querySelector("span");
        const field = label.querySelector("input, select");
        if (!span || !field) return;

        const play = () => {
          const chars = span.dataset.glide === "on"
            ? [...span.querySelectorAll(".glide-char")]
            : splitChars(span);
          span.classList.add("glide-label");
          // Gecikməni CSS dəyişəni ilə veririk: `animation` qısayolunu sıfırlamaq
          // animation-delay-i də silir, ona görə inline delay işləmirdi.
          chars.forEach((c, i) => c.style.setProperty("--i", String(i)));
          span.classList.remove("glide-playing");
          void span.offsetWidth;                      // reflow → animasiya yenidən oynasın
          span.classList.add("glide-playing");
        };

        field.addEventListener("focus", play);
      });
  }

  function init() {
    initHeroTitle();
    initFieldLabels();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
