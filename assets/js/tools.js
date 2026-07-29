/** Free browser tools — subpages under laughing-dragons.com/tools/ */
const TOOLS = [
  { href: "/tools/unit-converter.html", title: "Unit Converter", desc: "Length, weight, temperature, and more." },
  { href: "/tools/percentage-calculator.html", title: "Percentage Calculator", desc: "Find percentages, increases, and discounts." },
  { href: "/tools/tip-calculator.html", title: "Tip Calculator", desc: "Split bills and calculate tips fast." },
  { href: "/tools/word-counter.html", title: "Word Counter", desc: "Count words, characters, and reading time." },
  { href: "/tools/password-generator.html", title: "Password Generator", desc: "Create strong random passwords locally." },
  { href: "/tools/base64.html", title: "Base64 Encoder", desc: "Encode and decode Base64 in the browser." },
  { href: "/tools/json-formatter.html", title: "JSON Formatter", desc: "Pretty-print and validate JSON." },
  { href: "/tools/uuid-generator.html", title: "UUID Generator", desc: "Generate v4 UUIDs instantly." },
];

function renderToolsBackLink() {
  return `<p class="tool-back reveal"><a href="/tools/">&larr; All tools</a></p>`;
}

function renderToolGrid() {
  return `<section class="tool-grid reveal">
    ${TOOLS.map(
      (t) => `<a class="tool-card link-card" href="${t.href}">
        <h2>${t.title}</h2>
        <p>${t.desc}</p>
      </a>`
    ).join("")}
  </section>`;
}

function initToolPage({ title, description, content, adSlots = true }) {
  initPage({
    title,
    description,
    activePath: "/tools/",
    adSlots,
    content: `${renderToolsBackLink()}${content}`,
  });
}
