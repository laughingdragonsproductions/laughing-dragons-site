/** Free browser tools — subpages under laughing-dragons.com/tools/
 *
 * UPDATE WORKFLOW (see UPDATE.md):
 * - New tool: copy tools/word-counter.html, add TOOLS entry below, add URL to sitemap.xml, push
 */
const TOOLS = [
  { href: "/tools/unit-converter.html", title: "Unit Converter", desc: "Length, weight, temperature, and more." },
  { href: "/tools/percentage-calculator.html", title: "Percentage Calculator", desc: "Find percentages, increases, and discounts." },
  { href: "/tools/tip-calculator.html", title: "Tip Calculator", desc: "Split bills and calculate tips fast." },
  { href: "/tools/word-counter.html", title: "Word Counter", desc: "Count words, characters, and reading time." },
  { href: "/tools/syllable-counter.html", title: "Syllable Counter", desc: "Count syllables per line for lyrics and poetry." },
  { href: "/tools/password-generator.html", title: "Password Generator", desc: "Create strong random passwords locally." },
  { href: "/tools/base64.html", title: "Base64 Encoder", desc: "Encode and decode Base64 in the browser." },
  { href: "/tools/json-formatter.html", title: "JSON Formatter", desc: "Pretty-print and validate JSON." },
  { href: "/tools/uuid-generator.html", title: "UUID Generator", desc: "Generate v4 UUIDs instantly." },
];

const TOOLS_COMING_SOON = [
  { title: "Alphabet Tracer", desc: "Drawable letter printouts for tablets and parents." },
  { title: "Mad Lib Story Builder", desc: "Fill-in story templates for kids and literacy practice." },
  { title: "Reading Timer", desc: "Simple read-aloud session timer for parents." },
  { title: "Vocabulary Flashcards", desc: "Fruit Friends themed flashcard decks." },
  { title: "Dragon Character Creator", desc: "Build a simple dragon avatar in the browser." },
  { title: "Fantasy Name Generator", desc: "Dragon and fantasy name ideas on demand." },
  { title: "Dragon Dice Roller", desc: "Themed dice for games and tabletop play." },
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

function renderToolsComingSoon() {
  return `<section class="reveal">
    <h2 class="tools-section-title">Coming soon</h2>
    <div class="tool-grid">
      ${TOOLS_COMING_SOON.map(
        (t) => `<a class="tool-card link-card tool-card-soon" href="/tools/coming-soon.html">
          <h2>${t.title}</h2>
          <p>${t.desc}</p>
          <span class="status-tag status-coming-soon">Coming soon</span>
        </a>`
      ).join("")}
    </div>
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

function countWordSyllables(word) {
  const cleaned = word.toLowerCase().replace(/[^a-z']/g, "");
  if (!cleaned) return 0;

  const vowels = "aeiouy";
  let count = 0;
  let prevVowel = false;

  for (const ch of cleaned) {
    const isVowel = vowels.includes(ch);
    if (isVowel && !prevVowel) count += 1;
    prevVowel = isVowel;
  }

  if (cleaned.endsWith("e") && count > 1) count -= 1;
  return Math.max(1, count);
}

function countLineSyllables(line) {
  const words = line.trim() ? line.trim().split(/\s+/) : [];
  return words.reduce((sum, word) => sum + countWordSyllables(word), 0);
}

function formatSyllableLine(line) {
  if (!line.trim()) return line;
  return `${line} [${countLineSyllables(line)}]`;
}

function countTextSyllables(text) {
  const lines = text.split(/\r?\n/);
  const formatted = lines.map(formatSyllableLine);
  const total = lines.reduce((sum, line) => sum + countLineSyllables(line), 0);
  return { formatted: formatted.join("\n"), total, lines: lines.length };
}
