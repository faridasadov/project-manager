// "Glide to reveal" effekti (CodePen jh3y/JjxPKXz uyğunlaşdırması).
//
// Orijinalda hərflər blur + kiçildilmiş vəziyyətdədir; kursor bir hərfin üstünə
// gələndə o hərf tam kəskinləşir, qonşuları sinus ilə azalan dərəcədə. Pen sabit
// 6 simvol üçün qonşu selektorları (`+ .digit + .digit …`) işlədir — bizdə mətn
// dəyişkən uzunluqdadır, ona görə düşmə əyrisini kursor MƏSAFƏSİNDƏN hesablayırıq:
// həm hər uzunluqda işləyir, həm də keçid kəsik deyil, kəsilməzdir.
//
// İki yerdə tətbiq olunur:
//   1. Welcome hero başlığı — kursorla oxunur
//   2. Login/qeydiyyat/sıfırlama XANALARI — yazılan mətnin özü
//
// XANA necə işləyir: <input> daxilində ayrı-ayrı hərfləri stilləmək mümkün
// deyil, ona görə xananın üstünə "güzgü" qatı qoyulur — eyni şrift/ölçü/padding
// ilə hərflər <span>-lara bölünür. Əsl input-un mətni şəffaf edilir, kursor
// (caret) görünən qalır, seçim/autofill/klaviatura toxunulmaz qalır.
//
// Dil asılılığı yoxdur: güzgü yazılan DƏYƏRDƏN qurulur, tərcümədən yox.
// Azərbaycan (ə, ı, ş, ç, ğ, ö, ü), kiril və emoji üçün `for...of` işlədilir —
// kod nöqtələri düzgün bölünür, surroqat cütlər parçalanmır.
//
// prefers-reduced-motion → heç bir bölmə/blur tətbiq olunmur.

/* eslint-disable no-unused-vars */

(function () {
  const REDUCED = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  // Təsir radiusu şriftin ölçüsünə görə fərqlidir: başlıq iri, xana kiçikdir.
  const RADIUS_TITLE = 120;
  const RADIUS_FIELD = 46;
  const smoothstep = (t) => t * t * (3 - 2 * t);

  // ── Ortaq: mətni hərf-hərf <span>-lara böl ────────────────────────────────
  function buildChars(host, source) {
    host.textContent = "";
    const chars = [];
    for (const ch of source) {
      const span = document.createElement("span");
      span.className = "glide-char";
      // Simvol OLDUĞU KİMİ saxlanılır — boşluğu NBSP ilə əvəz etmək simvolu
      // dəyişir və enini bir az fərqləndirir. Eni `white-space: pre` qoruyur.
      span.textContent = ch;
      host.appendChild(span);
      chars.push(span);
    }
    return chars;
  }

  function applyFalloff(chars, centers, clientX, radius) {
    for (let i = 0; i < chars.length; i++) {
      const t = Math.max(0, 1 - Math.abs(clientX - centers[i]) / radius);
      chars[i].style.setProperty("--active", smoothstep(t).toFixed(3));
    }
  }

  const centersOf = (chars) => chars.map((c) => {
    const r = c.getBoundingClientRect();
    return r.left + r.width / 2;
  });

  // ── 1) Hero başlığı ───────────────────────────────────────────────────────
  function initHeroTitle() {
    const title = document.querySelector(".login-hero-title");
    if (!title || REDUCED) return;

    let chars = [];
    let centers = [];

    const split = () => {
      const source = title.dataset.glideText || title.textContent;
      title.dataset.glideText = source;
      chars = buildChars(title, source);
      title.dataset.glide = "on";
      centers = [];
      chars.forEach((c) => c.style.setProperty("--active", "0"));
    };

    split();
    title.classList.add("glide-title");

    title.addEventListener("pointermove", (event) => {
      if (!centers.length) centers = centersOf(chars);
      applyFalloff(chars, centers, event.clientX, RADIUS_TITLE);
    });
    title.addEventListener("pointerleave", () =>
      chars.forEach((c) => c.style.setProperty("--active", "0")));
    window.addEventListener("resize", () => { centers = []; }, { passive: true });

    // Dil dəyişəndə applyTranslations() textContent-i əvəz edir → yenidən böl.
    new MutationObserver(() => {
      if (title.querySelector(".glide-char")) return;
      delete title.dataset.glideText;
      split();
    }).observe(title, { childList: true });
  }

  // ── 2) Xanalar ────────────────────────────────────────────────────────────
  function initField(input) {
    if (input.dataset.glideField === "on") return;
    input.dataset.glideField = "on";

    const wrap = document.createElement("span");
    wrap.className = "glide-field";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const mirror = document.createElement("span");
    mirror.className = "glide-field-mirror";
    mirror.setAttribute("aria-hidden", "true");   // ekran oxuyucusu əsl input-u oxuyur
    wrap.appendChild(mirror);

    // Güzgü input ilə piksel-bərabər olmalıdır.
    const syncMetrics = () => {
      const cs = getComputedStyle(input);
      mirror.style.font = cs.font;
      mirror.style.letterSpacing = cs.letterSpacing;
      mirror.style.paddingLeft = cs.paddingLeft;
      mirror.style.paddingRight = cs.paddingRight;
      mirror.style.paddingTop = cs.paddingTop;
      mirror.style.paddingBottom = cs.paddingBottom;
      mirror.style.borderLeftWidth = cs.borderLeftWidth;
      mirror.style.lineHeight = cs.lineHeight;
    };

    let chars = [];
    let centers = [];

    const render = () => {
      const value = input.value;
      if (!value) {
        mirror.textContent = "";
        chars = [];
        wrap.classList.remove("has-value");
        return;
      }
      wrap.classList.add("has-value");
      chars = buildChars(mirror, value);
      centers = [];
      // Yeni yazılan simvol qısa açılışla görünür, sonra yenidən blur olur.
      chars.forEach((c, i) => c.style.setProperty("--active", i === chars.length - 1 ? "1" : "0"));
      if (chars.length) {
        const last = chars[chars.length - 1];
        setTimeout(() => last.style.setProperty("--active", "0"), 420);
      }
      mirror.style.transform = `translateX(${-input.scrollLeft}px)`;
    };

    syncMetrics();
    render();

    input.addEventListener("input", render);
    input.addEventListener("change", render);
    input.addEventListener("scroll", () => {
      mirror.style.transform = `translateX(${-input.scrollLeft}px)`;
      centers = [];
    });

    wrap.addEventListener("pointermove", (event) => {
      if (!chars.length) return;
      if (!centers.length) centers = centersOf(chars);
      applyFalloff(chars, centers, event.clientX, RADIUS_FIELD);
    });
    wrap.addEventListener("pointerleave", () =>
      chars.forEach((c) => c.style.setProperty("--active", "0")));

    window.addEventListener("resize", () => { syncMetrics(); centers = []; }, { passive: true });

    // Autofill dəyəri "input" hadisəsi yaratmaya bilər — bir dəfə sonra yoxla.
    setTimeout(render, 350);
  }

  function initFields() {
    if (REDUCED) return;
    // YALNIZ parol xanaları. İstifadəçi adı / email / şirkət adı statik qalır —
    // orada blur oxunuşu çətinləşdirir və heç nə "gizlətmir". Effektin mənası
    // (pen: "Glide To Reveal Secret Code") məhz gizli dəyər üçündür.
    document.querySelectorAll(
      "#loginForm input[type=password], #registerForm input[type=password], #resetPasswordForm input[type=password]"
    ).forEach(initField);
  }

  function init() {
    initHeroTitle();
    initFields();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
