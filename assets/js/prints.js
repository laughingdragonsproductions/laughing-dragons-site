/** Prints hub - browse and buy on Lit Printz (litprintz.com) */

function litPrintzStoreUrl() {
  const links = window.SITE_CONFIG?.links || {};
  return links.litPrintz || links.shop || links.shopify || "https://litprintz.com";
}

function litPrintzCatalogUrl() {
  const links = window.SITE_CONFIG?.links || {};
  return links.litPrintzCatalog || `${litPrintzStoreUrl()}/collections/all`;
}

const LIT_PRINTZ_COLLECTION_COPY = {
  coozies: { title: "Coozies", desc: "3D-printed coozies and coolers - physical prints and digital 3MF files." },
  candleHolders: { title: "Candle Holders", desc: "Print-to-order candle holders sized for standard 3-wick jars." },
  rollingTrays: { title: "Rolling Trays", desc: "Rolling trays and matching jar sets from the Lit Printz shop." },
  notebooks: { title: "Notebooks", desc: "Horror-themed notebook kits and bundles." },
  horror: { title: "Horror", desc: "Horror coolers, trays, and decor from the Lit Printz workroom." },
  popCulture: { title: "Pop Culture", desc: "Pop culture coozies, trays, and fan-favorite designs." },
  bundleDeals: { title: "Bundle Deals", desc: "Save on horror bundle deals at Lit Printz checkout." },
  thisWeeksDrop: { title: "This Week's Drop", desc: "Weekly featured drops on the live Lit Printz store." },
};

function renderPrintsHub() {
  const catalog = litPrintzCatalogUrl();
  const store = litPrintzStoreUrl();
  const collections = window.SITE_CONFIG?.links?.litPrintzCollections || {};
  const featured = window.SITE_CONFIG?.links?.litPrintzFeaturedProduct || "";

  const tiles = Object.entries(collections)
    .map(([key, url]) => {
      const meta = LIT_PRINTZ_COLLECTION_COPY[key] || {
        title: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
        desc: "Browse this collection on Lit Printz.",
      };
      return `<a class="prints-category-card" href="${url}" target="_blank" rel="noopener noreferrer">
        <div class="prints-category-cover prints-category-cover-all" aria-hidden="true"><span>${meta.title.charAt(0)}</span></div>
        <div class="prints-category-copy">
          <h2>${meta.title}</h2>
          <p>${meta.desc}</p>
        </div>
      </a>`;
    })
    .join("");

  const featuredCard = featured
    ? `<a class="prints-category-card" href="${featured}" target="_blank" rel="noopener noreferrer">
        <div class="prints-category-cover prints-category-cover-all" aria-hidden="true"><span>★</span></div>
        <div class="prints-category-copy">
          <h2>Featured drop</h2>
          <p>THEM 1947 Alien Coozie - free STL download on Lit Printz.</p>
        </div>
      </a>`
    : "";

  return `<header class="page-header reveal">
      <p class="pillar-eyebrow">Lit Printz partner</p>
      <h1>Prints &amp; maker gear</h1>
      <p>Every sellable print, coozie, tray, and candle holder checks out on <strong>litprintz.com</strong>. Pick a collection below - links open the live Lit Printz shop.</p>
    </header>
    <section class="prints-category-grid reveal">
      ${featuredCard}
      ${tiles}
      <a class="prints-category-card" href="${catalog}" target="_blank" rel="noopener noreferrer">
        <div class="prints-category-cover prints-category-cover-all" aria-hidden="true"><span>All</span></div>
        <div class="prints-category-copy">
          <h2>All products</h2>
          <p>Full Lit Printz catalog - coozies, trays, candle holders, digital files, and more.</p>
        </div>
      </a>
      <a class="prints-category-card" href="${store}" target="_blank" rel="noopener noreferrer">
        <div class="prints-category-cover prints-category-cover-all" aria-hidden="true"><span>Shop</span></div>
        <div class="prints-category-copy">
          <h2>Lit Printz checkout</h2>
          <p>Go straight to litprintz.com for cart and checkout.</p>
        </div>
      </a>
    </section>
    <div class="prose reveal">
      <p>Looking for the Laughing Dragons shop hub? Visit <a href="/shop/">Shop</a> for partner links, laser engraving, and checkout paths.</p>
    </div>`;
}

function initPrintsPage({ title, description, activePath, content, adSlots = true }) {
  initPage({ title, description, activePath, content, adSlots });
  document.querySelectorAll(".page-main .reveal, .prints-category-grid").forEach((node) => {
    node.classList.add("is-visible");
  });
}
