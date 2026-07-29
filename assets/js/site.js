const NAV = [
  { href: "/kids/", label: "Kids" },
  { href: "/tools/", label: "Tools" },
  { href: "/shop/", label: "Shop" },
  { href: "/apps/", label: "Apps" },
  { href: "/media/", label: "Media" },
  { href: "/about/", label: "About" },
];

function renderHeader(activePath) {
  const cfg = window.SITE_CONFIG || {};
  return `<header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="${cfg.legalName || "Laughing Dragons"} home">
        <img src="/assets/brand/ldp-logo.png" alt="${cfg.legalName || "Laughing Dragons Productions"}" class="brand-logo" width="160" height="160" />
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" class="site-nav" aria-label="Primary">
        ${NAV.map(
          (item) => {
            const active =
              activePath === item.href ||
              (item.href === "/tools/" && (activePath === "/tools/" || (activePath && activePath.startsWith("/tools/"))));
            return `<a href="${item.href}" class="nav-link${active ? " active" : ""}">${item.label}</a>`;
          }
        ).join("")}
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const cfg = window.SITE_CONFIG || {};
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="/assets/brand/ldp-logo.png" alt="" class="footer-logo" width="120" height="120" loading="lazy" />
        <p class="footer-tagline">${cfg.tagline || ""}</p>
      </div>
      <nav class="footer-nav" aria-label="Explore">
        <strong>Explore</strong>
        ${NAV.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
        <a href="/blog/">Blog</a>
        <a href="/contact/">Contact</a>
      </nav>
      <nav class="footer-nav" aria-label="Legal">
        <strong>Legal</strong>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/about/">About</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>&copy; ${year} ${cfg.legalName || "Laughing Dragons Productions"}. All rights reserved.</p>
    </div>
  </footer>`;
}

function renderAdSlot(key, className = "ad-unit") {
  const cfg = window.SITE_CONFIG?.adsense || {};
  const slot = cfg.slots?.[key];
  if (!cfg.publisherId || !slot) {
    return `<div class="${className} ad-placeholder" aria-hidden="true">Ad space</div>`;
  }
  return `<ins class="adsbygoogle ${className}"
    style="display:block"
    data-ad-client="${cfg.publisherId}"
    data-ad-slot="${slot}"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>`;
}

function pushAds() {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (_) {
    /* AdSense not loaded yet */
  }
}

function renderHero() {
  return `<section class="hero" aria-label="Welcome">
    <div class="hero-media">
      <video class="hero-video" autoplay muted loop playsinline preload="metadata"
        poster="/assets/brand/ldp-workroom-banner.png">
        <source src="/assets/brand/ldp-hero.mp4" type="video/mp4" />
      </video>
      <img class="hero-fallback" src="/assets/brand/ldp-workroom-banner.png" alt="" />
      <div class="hero-scrim"></div>
    </div>
    <div class="hero-content container">
      <p class="hero-eyebrow">PRODUCTIONS</p>
      <h1 class="hero-title">Laughing Dragons</h1>
      <p class="hero-subline">Kids show, free learning tools, maker gear, 3D prints, and everything we build from the workroom floor.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="/kids/">Kids Show</a>
        <a class="btn btn-primary" href="/shop/">Shop the floor</a>
        <a class="btn btn-ghost" href="#explore">Explore everything</a>
      </div>
    </div>
  </section>`;
}

function renderPillar({ id, eyebrow, title, body, href, cta, reverse = false }) {
  return `<section class="pillar${reverse ? " pillar-reverse" : ""}" id="${id}">
    <div class="container pillar-inner">
      <div class="pillar-copy reveal">
        <p class="pillar-eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
        <p>${body}</p>
        <a class="text-link" href="${href}">${cta} &rarr;</a>
      </div>
      <div class="pillar-visual reveal" aria-hidden="true">
        <div class="pillar-frame"></div>
      </div>
    </div>
  </section>`;
}

function initPage({ title, description, activePath, content, hero = false, adSlots = true }) {
  const cfg = window.SITE_CONFIG || {};
  document.title = title ? `${title} | ${cfg.name}` : cfg.name;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.content = description;

  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    ${renderHeader(activePath)}
    ${hero ? renderHero() : ""}
    <main class="${hero ? "page-main" : "container page-main page-inner"}">
      ${!hero && adSlots ? `<div class="ad-slot ad-top">${renderAdSlot("header", "ad-unit")}</div>` : ""}
      ${content}
      ${adSlots ? `<div class="ad-slot ad-bottom">${renderAdSlot("footer", "ad-unit")}</div>` : ""}
    </main>
    ${renderFooter()}
  `;

  if (adSlots) pushAds();
  bindNav();
  bindReveal();
  bindReducedMotionVideo();
}

function bindNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function bindReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  nodes.forEach((n) => io.observe(n));
}

function bindReducedMotionVideo() {
  const video = document.querySelector(".hero-video");
  if (!video) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const apply = () => {
    if (reduce.matches) {
      video.pause();
      video.style.display = "none";
    } else {
      video.style.display = "";
      video.play().catch(() => {});
    }
  };
  apply();
  reduce.addEventListener("change", apply);
}
