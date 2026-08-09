const NAV = [
  { href: "/games/", label: "Games" },
  { href: "/kids/", label: "Kids Show" },
  { href: "/tools/", label: "Tools" },
  { href: "/shop/", label: "Shop" },
  { href: "/prints/", label: "Prints" },
  { href: "/laser/", label: "Laser" },
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
              (item.href === "/tools/" && (activePath === "/tools/" || (activePath && activePath.startsWith("/tools/")))) ||
              (item.href === "/prints/" && (activePath === "/prints/" || (activePath && activePath.startsWith("/prints/")))) ||
              (item.href === "/laser/" && (activePath === "/laser/" || (activePath && activePath.startsWith("/laser/")))) ||
              (item.href === "/games/" &&
                (activePath === "/games/" || (activePath && activePath.startsWith("/games/")))) ||
              (item.href === "/kids/" &&
                (activePath === "/kids/" || (activePath && activePath.startsWith("/kids/"))));
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
      </nav>
      <nav class="footer-nav" aria-label="Legal">
        <strong>Legal</strong>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact Us</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>&copy; ${year} ${cfg.legalName || "Laughing Dragons Productions"}. All rights reserved.</p>
    </div>
  </footer>`;
}

function hasConfiguredAdSlots() {
  const slots = window.SITE_CONFIG?.adsense?.slots || {};
  return Object.values(slots).some((id) => Boolean(id));
}

function adSlotWrap(slotKey, wrapClass, unitClass = "ad-unit") {
  const inner = renderAdSlot(slotKey, unitClass);
  return inner ? `<div class="ad-slot ${wrapClass}">${inner}</div>` : "";
}

function renderAdSlot(key, className = "ad-unit") {
  const cfg = window.SITE_CONFIG?.adsense || {};
  const slot = cfg.slots?.[key];
  if (!cfg.publisherId || !slot) {
    return "";
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

const ADSENSE_ALLOW_PREFIXES = ["/games/"];

const ADSENSE_BLOCK_SEGMENTS = ["fruit-search", "coming-soon"];

function isMonetizablePath(path) {
  const p = path || window.location.pathname || "";
  if (!ADSENSE_ALLOW_PREFIXES.some((prefix) => p.startsWith(prefix))) return false;
  if (ADSENSE_BLOCK_SEGMENTS.some((seg) => p.includes(seg))) return false;
  return true;
}

function loadAdSenseScript() {
  if (!hasConfiguredAdSlots()) return;
  if (!isMonetizablePath(window.location.pathname)) return;
  if (document.querySelector("script[data-ld-adsense]")) return;
  const pub = window.SITE_CONFIG?.adsense?.publisherId;
  if (!pub) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`;
  s.crossOrigin = "anonymous";
  s.dataset.ldAdsense = "1";
  document.head.appendChild(s);
}

function resolveAdSlots(adSlots, activePath) {
  const path = window.location.pathname || activePath || "";
  if (path.startsWith("/kids/")) return false;
  if (!isMonetizablePath(path)) return false;
  return adSlots;
}

function initGameChrome({ title, description, activePath, landingHtml }) {
  const cfg = window.SITE_CONFIG || {};
  document.title = title ? `${title} | ${cfg.name}` : cfg.name;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.content = description;

  const headerMount = document.getElementById("game-header-mount");
  if (headerMount) headerMount.innerHTML = renderHeader(activePath);

  const landingMount = document.getElementById("game-landing-mount");
  if (landingMount && landingHtml) landingMount.innerHTML = landingHtml;

  const monetize = isMonetizablePath(window.location.pathname);
  const adTop = document.getElementById("game-ad-top");
  const adBottom = document.getElementById("game-ad-bottom");
  if (monetize && adTop) adTop.innerHTML = adSlotWrap("header", "ad-top");
  if (monetize && adBottom) adBottom.innerHTML = adSlotWrap("footer", "ad-bottom");

  const footerMount = document.getElementById("game-footer-mount");
  if (footerMount) footerMount.innerHTML = renderFooter();

  loadAdSenseScript();
  if (monetize && hasConfiguredAdSlots()) pushAds();
  bindNav();
  bindReveal();
}

function renderHero() {
  return renderMediaHero({
    ariaLabel: "Welcome",
    videoSrc: "/assets/brand/ldp-hero.mp4",
    posterSrc: "/assets/brand/ldp-workroom-banner.png",
    eyebrow: "PRODUCTIONS",
    title: "Laughing Dragons",
    subline: "Free browser games, the Fruit Friends Kids Show, learning tools, and maker gear from the workroom floor.",
    ctas: [
      { href: "/games/", label: "Play games", primary: true },
      { href: "/kids/", label: "Kids Show", primary: true },
      { href: "#explore", label: "Explore everything", ghost: true },
    ],
  });
}

function renderMediaHero({ ariaLabel, videoSrc, posterSrc, eyebrow, title, subline, ctas = [] }) {
  const ctaHtml = ctas
    .map((c) => {
      const cls = c.ghost ? "btn btn-ghost" : "btn btn-primary";
      return `<a class="${cls}" href="${c.href}">${c.label}</a>`;
    })
    .join("");
  return `<section class="hero" aria-label="${ariaLabel}">
    <div class="hero-media">
      <video class="hero-video" autoplay muted loop playsinline preload="metadata"
        poster="${posterSrc}">
        <source src="${videoSrc}" type="video/mp4" />
      </video>
      <img class="hero-fallback" src="${posterSrc}" alt="" />
      <div class="hero-scrim"></div>
    </div>
    <div class="hero-content container">
      <p class="hero-eyebrow">${eyebrow}</p>
      <h1 class="hero-title">${title}</h1>
      <p class="hero-subline">${subline}</p>
      ${ctaHtml ? `<div class="hero-cta">${ctaHtml}</div>` : ""}
    </div>
  </section>`;
}

function renderPillar({ id, eyebrow, title, body, href, cta, reverse = false, image = null }) {
  const frameClass = image ? "pillar-frame pillar-frame-photo" : "pillar-frame";
  const frameStyle = image ? ` style="background-image:url('${image}')"` : "";
  return `<section class="pillar${reverse ? " pillar-reverse" : ""}" id="${id}">
    <div class="container pillar-inner">
      <div class="pillar-copy reveal">
        <p class="pillar-eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
        <p>${body}</p>
        <a class="text-link" href="${href}">${cta} &rarr;</a>
      </div>
      <div class="pillar-visual reveal" aria-hidden="true">
        <div class="${frameClass}"${frameStyle}></div>
      </div>
    </div>
  </section>`;
}

function initPage({ title, description, activePath, content, hero = false, mediaHero = null, adSlots = true }) {
  const cfg = window.SITE_CONFIG || {};
  const path = window.location.pathname || activePath || "";
  adSlots = resolveAdSlots(adSlots, activePath);
  document.title = title ? `${title} | ${cfg.name}` : cfg.name;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.content = description;

  const root = document.getElementById("app");
  if (!root) return;

  const hasFullBleedHero = hero || mediaHero;
  root.innerHTML = `
    ${renderHeader(activePath)}
    ${mediaHero || (hero ? renderHero() : "")}
    <main class="${hasFullBleedHero ? "page-main" : "container page-main page-inner"}">
      ${!hero && adSlots ? adSlotWrap("header", "ad-top") : ""}
      ${content}
      ${adSlots ? adSlotWrap("footer", "ad-bottom") : ""}
    </main>
    ${renderFooter()}
  `;

  loadAdSenseScript();
  if (adSlots && hasConfiguredAdSlots()) pushAds();
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
  const viewportH = window.innerHeight || document.documentElement.clientHeight || 800;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -5% 0px" }
  );
  nodes.forEach((n) => {
    if (n.classList.contains("print-grid") || n.classList.contains("print-pagination")) {
      n.classList.add("is-visible");
      return;
    }
    if (n.scrollHeight > viewportH * 1.15) {
      n.classList.add("is-visible");
      return;
    }
    io.observe(n);
  });
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

function renderContactForm({ intro = "" } = {}) {
  return `
    <div class="prose reveal">
      ${intro ? `<p>${intro}</p>` : ""}
      <form class="contact-form" id="contact-form" novalidate>
        <input type="checkbox" name="botcheck" class="contact-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div class="form-field">
          <label for="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" required autocomplete="name" maxlength="80" />
        </div>
        <div class="form-field">
          <label for="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="contact-subject">Subject <span class="optional">(optional)</span></label>
          <input type="text" id="contact-subject" name="subject" maxlength="120" />
        </div>
        <div class="form-field">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" required rows="6" maxlength="5000"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send message</button>
        <p class="form-status" id="contact-form-status" role="status" aria-live="polite"></p>
      </form>
    </div>`;
}

function bindContactForm(options = {}) {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("contact-form-status");
  const cfg = window.SITE_CONFIG || {};
  const accessKey = cfg.web3formsAccessKey;
  const subjectPrefix = options.subjectPrefix || cfg.legalName || cfg.name || "Website";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!accessKey) {
      if (statusEl) {
        statusEl.textContent = "Contact form is not configured yet. Please try again later.";
        statusEl.className = "form-status form-status-error";
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (statusEl) {
      statusEl.textContent = "Sending…";
      statusEl.className = "form-status form-status-pending";
    }

    const fd = new FormData(form);
    fd.append("access_key", accessKey);
    fd.append("from_name", subjectPrefix);
    const subject = fd.get("subject");
    fd.set("subject", subject ? `${subjectPrefix}: ${subject}` : `${subjectPrefix} — Contact form`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        const redirectUrl = `${cfg.domain || "https://laughing-dragons.com"}/submissionsent/`;
        window.location.href = redirectUrl;
        return;
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = err.message || "Could not send your message. Please try again.";
        statusEl.className = "form-status form-status-error";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
