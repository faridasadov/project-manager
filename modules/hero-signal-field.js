// Welcome ekranı üçün "signal field" fon animasiyası.
//
// Dribbble "CoatAI motion design" şotundakı effektin canvas qarşılığı: qaranlıq
// fonda minlərlə kiçik yaşıl nöqtə axın sahəsi (flow field) boyunca sürüşür,
// silsilə/dalğa formaları yaradır, parlayıb sönür.
//
// Dizayn qərarları:
//   • Xarici kitabxana yoxdur — noise funksiyası da burada, ~40 sətir.
//   • Additive kompozisiya (lighter) → nöqtələr üst-üstə düşəndə parlaqlıq artır,
//     videodakı "közərən silsilə" görüntüsü məhz bundan alınır.
//   • Kadr başına canvas tam təmizlənmir: yarımşəffaf qara ilə örtülür →
//     zərrəciklərin arxasında təbii iz (trail) qalır, ayrıca trail massivi lazım deyil.
//   • Yalnız welcome görünəndə işləyir; login-dən sonra və tab arxa plana keçəndə
//     rAF dayanır (PWA-da boş yerə batareya yeməsin).
//   • prefers-reduced-motion: tək statik kadr çəkilir, animasiya yoxdur.

/* eslint-disable no-unused-vars */

function initHeroSignalField() {
  const canvas = document.querySelector("#heroSignalField");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // ── Value noise (ucuz, deterministik) ─────────────────────────────────────
  // Simplex/Perlin əvəzinə hash əsaslı value noise: kifayət qədər üzvi, çox ucuz.
  const hash = (x, y) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return n - Math.floor(n);
  };
  const smooth = (t) => t * t * (3 - 2 * t);
  const noise2 = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = smooth(xf), v = smooth(yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };

  let width = 0, height = 0, dpr = 1;
  let particles = [];
  let rafId = 0;
  let time = 0;
  let running = false;

  // Zərrəcik sayı ekran sahəsinə görə — mobil telefonu boğmasın.
  function particleCount() {
    const area = width * height;
    return Math.round(Math.min(1400, Math.max(320, area / 1600)));
  }

  function spawn() {
    // Zərrəciklər aşağı yarıda cəmlənir (videodakı kimi), yuxarıda seyrək.
    const bias = Math.pow(Math.random(), 0.55);
    return {
      x: Math.random() * width,
      y: height * (0.30 + 0.70 * bias),
      life: Math.random() * 260 + 90,
      size: Math.random() * 1.5 + 0.45,
      glow: Math.random() * 0.55 + 0.30
    };
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2); // 2-dən yuxarı fərq görünmür, yük artır
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#05080f";
    ctx.fillRect(0, 0, width, height);
    particles = Array.from({ length: particleCount() }, spawn);
    return true;
  }

  function draw() {
    // Tam silmək əvəzinə üstünü zəif qaraltmaq → iz effekti.
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(5, 8, 15, 0.13)";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";

    const scale = 0.0022;   // axın sahəsinin "yaxınlaşdırma" dərəcəsi
    const speed = 0.85;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Sahə bucağı: iki oktava → həm iri silsilələr, həm xırda burulğanlar.
      const n = noise2(p.x * scale + time, p.y * scale - time * 0.6)
              + noise2(p.x * scale * 2.7 - time * 0.4, p.y * scale * 2.7) * 0.5;
      const angle = n * Math.PI * 3.2;

      p.x += Math.cos(angle) * speed;
      p.y += Math.sin(angle) * speed * 0.55 - 0.06; // yüngül yuxarı sürüşmə
      p.life -= 1;

      if (p.life <= 0 || p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) {
        particles[i] = spawn();
        continue;
      }

      // Parlaqlıq: ömrün əvvəli/sonunda sönük (kəskin yaranma-yoxolma olmasın)
      // + aşağıya doğru daha parlaq, yuxarıda solğun.
      const fade = Math.min(1, p.life / 60) * Math.min(1, (260 - p.life) / 40 + 0.25);
      const depth = 0.25 + 0.75 * (p.y / height);
      const alpha = Math.max(0, Math.min(1, p.glow * fade * depth));
      if (alpha < 0.01) continue;

      // Yaşıl palitra: mərkəzdə açıq nanə, kənarda tünd zümrüd.
      const tone = noise2(p.x * 0.004, p.y * 0.004);
      const g = Math.round(190 + tone * 65);
      const r = Math.round(30 + tone * 70);
      const b = Math.round(90 + tone * 60);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
    time += 0.0016;
  }

  function loop() {
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  // Welcome görünmürsə (login olunub və ya hero ekranda deyil) işləməsin.
  function shouldRun() {
    if (document.hidden) return false;
    if (document.body.classList.contains("logged-in")) return false;
    const rect = canvas.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function sync() {
    if (shouldRun()) {
      if (!width && !resize()) return;
      start();
    } else {
      stop();
    }
  }

  if (!resize()) {
    // Hero hələ gizlidirsə ölçü 0-dır; görünəndə yenidən cəhd edilir.
    requestAnimationFrame(() => { resize(); sync(); });
  }

  if (reduceMotion) {
    draw(); // tək statik kadr
  } else {
    sync();
  }

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); sync(); }, 180);
  });
  document.addEventListener("visibilitychange", sync);

  // Login/logout body sinfini dəyişir → animasiyanı ona görə aç/bağla.
  new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ["class"] });
}
