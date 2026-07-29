/** Laughing Dragons Kids Show — episodes, characters, printable files
 *
 * UPDATE WORKFLOW (see UPDATE.md):
 * - YouTube episode live: set youtubeUrl + status: "published" on the episode row
 * - New episode: add object to episodes[]
 * - STL ready: add printUrl to character row and update renderKidsPrintables when wired
 * - Character images: assets/kids/characters/{letter}.png (a.png through z.png)
 */
window.KIDS_DATA = {
  showTitle: "Laughing Dragons Kids Show",
  tagline: "ABCs with Fruit Friends!",
  episodes: [
    {
      letter: "A",
      title: "Letter A — Adam the Apple",
      status: "in-production",
      youtubeUrl: "",
      description: "Meet Adam — sweet, happy, and full of energy!",
    },
    {
      letter: "B",
      title: "Letter B — Benjamin the Banana",
      status: "coming-soon",
      youtubeUrl: "",
      description: "Benjamin is funny, energetic, and always optimistic.",
    },
    {
      letter: "C",
      title: "Letter C — Cheri the Cherry",
      status: "coming-soon",
      youtubeUrl: "",
      description: "Twin cherries who finish each other's sentences.",
    },
    {
      letter: "D",
      title: "Letter D — Drago the Dragon Fruit",
      status: "coming-soon",
      youtubeUrl: "",
      description: "Wise adventurer who guides friends on every journey.",
    },
  ],
  characters: [
    { letter: "A", name: "Adam the Apple", bio: "Sweet, happy, and full of energy!" },
    { letter: "B", name: "Benjamin the Banana", bio: "Funny, energetic, clumsy, and always optimistic." },
    { letter: "C", name: "Cheri the Cherry", bio: "Twin cherries who finish each other's sentences." },
    { letter: "D", name: "Drago the Dragon Fruit", bio: "Wise adventurer with colorful scales." },
    { letter: "E", name: "Eggy P the Eggplant", bio: "Quick-thinking, street-smart, and always ready with a joke." },
    { letter: "F", name: "Ficus the Fig", bio: "Calm, thoughtful, and kind — loves stories and nature." },
    { letter: "G", name: "Gary the Garlic", bio: "Clever, curious, and loves helping friends solve problems." },
    { letter: "H", name: "Harry the Huckleberry", bio: "Tiny but mighty — full of curiosity and courage." },
    { letter: "I", name: "Ikumi the Imbe", bio: "Cheerful, gentle, and curious about little surprises." },
    { letter: "J", name: "Julio the Jalapeño", bio: "Lively, playful, and a little spicy — always kind." },
    { letter: "K", name: "Kelsey the Kiwi", bio: "Cheerful, sweet, and loves sharing and singing." },
    { letter: "L", name: "Lonnie the Lemon", bio: "Bright and encouraging — helps friends stay sunny." },
    { letter: "M", name: "Manny the Mango", bio: "Warm, friendly, and always ready to help." },
    { letter: "N", name: "Natalie the Nectarine", bio: "Gentle, caring, and loves making friends feel welcome." },
    { letter: "O", name: "Oscar the Orange", bio: "Energetic, upbeat, and full of zest." },
    { letter: "P", name: "Perry the Pear", bio: "Thoughtful, kind, and a great listener." },
    { letter: "Q", name: "Quinn the Quinoa", bio: "Unique, curious, and proud to be different." },
    { letter: "R", name: "Riley the Raddish", bio: "Bold, brave, and always up for adventure." },
    { letter: "S", name: "Sherry the Strawberry", bio: "Sweet, playful, and loves spreading joy." },
    { letter: "T", name: "Tom the Tomato", bio: "Friendly, reliable, and always there for the crew." },
    { letter: "U", name: "Uriel the Ube", bio: "Creative, colorful, and full of imagination." },
    { letter: "V", name: "Verra the Vanilla", bio: "Calm, soothing, and brings comfort to friends." },
    { letter: "W", name: "Walter the Wasabi", bio: "Spunky, spirited, and surprisingly gentle." },
    { letter: "X", name: "Xena the Xigua", bio: "Adventurous, cool, and loves exploring." },
    { letter: "Y", name: "Yevette the Yam", bio: "Grounded, warm, and deeply caring." },
    { letter: "Z", name: "Zackary the Zucchini", bio: "Fun-loving, flexible, and ready for anything." },
  ],
  games: [
    {
      id: "memory-matching",
      title: "Memory Matching Game",
      description: "Flip cards and match Fruit Friends pairs.",
      href: "/kids/games/coming-soon/",
    },
    {
      id: "word-search",
      title: "Word Search Generator",
      description: "Printable word searches themed around the alphabet cast.",
      href: "/kids/games/coming-soon/",
    },
    {
      id: "maze-generator",
      title: "Maze Generator",
      description: "Mazes for kids to solve on screen or on paper.",
      href: "/kids/games/coming-soon/",
    },
  ],
};

function characterImageSrc(letter) {
  return `/assets/kids/characters/${letter.toLowerCase()}.png`;
}

function renderCharacterImage(ch, className = "character-image") {
  return `<img src="${characterImageSrc(ch.letter)}" alt="${ch.name}" class="${className}" loading="lazy" width="400" height="400" />`;
}

function getCharacterByLetter(letter) {
  const key = String(letter || "").toUpperCase();
  return (window.KIDS_DATA?.characters || []).find((ch) => ch.letter === key) || null;
}

function renderKidsSubnav(active) {
  const items = [
    { id: "episodes", label: "Episodes" },
    { id: "characters", label: "Characters" },
    { id: "games", label: "Games" },
    { id: "printables", label: "3D Print Files" },
  ];
  return `<nav class="kids-subnav reveal" aria-label="Kids sections">
    ${items
      .map(
        (item) =>
          `<a href="#${item.id}" class="kids-subnav-link${active === item.id ? " active" : ""}">${item.label}</a>`
      )
      .join("")}
  </nav>`;
}

function episodeStatusLabel(status) {
  if (status === "published") return "Watch on YouTube";
  if (status === "in-production") return "In production";
  return "Coming soon";
}

function renderKidsEpisodes() {
  const episodes = window.KIDS_DATA?.episodes || [];
  return `<section class="kids-section" id="episodes">
    <div class="kids-section-head reveal">
      <p class="pillar-eyebrow">Watch</p>
      <h2>Episodes</h2>
      <p>Every letter gets its own episode on YouTube. Links appear here as episodes go live.</p>
    </div>
    <div class="episode-grid reveal">
      ${episodes
        .map((ep) => {
          const watchable = ep.youtubeUrl && ep.status === "published";
          const tag = `<span class="status-tag status-${ep.status}">${episodeStatusLabel(ep.status)}</span>`;
          if (watchable) {
            return `<a class="episode-card" href="${ep.youtubeUrl}" target="_blank" rel="noopener">
              <span class="episode-letter">${ep.letter}</span>
              <h3>${ep.title}</h3>
              <p>${ep.description}</p>
              ${tag}
            </a>`;
          }
          return `<article class="episode-card episode-card-soon">
            <span class="episode-letter">${ep.letter}</span>
            <h3>${ep.title}</h3>
            <p>${ep.description}</p>
            ${tag}
          </article>`;
        })
        .join("")}
    </div>
    <p class="kids-note reveal">More letters A–Z will be added as episodes publish. Short clips may also appear on <a href="/media/">Media</a>.</p>
  </section>`;
}

function renderKidsCharacters() {
  const characters = window.KIDS_DATA?.characters || [];
  const firstHalf = characters.filter((ch) => ch.letter <= "M");
  const secondHalf = characters.filter((ch) => ch.letter > "M");

  function renderCharacterCards(list) {
    return list
      .map(
        (ch) => `<a class="character-card" href="/kids/characters/${ch.letter.toLowerCase()}/" id="character-${ch.letter.toLowerCase()}">
            ${renderCharacterImage(ch)}
            <span class="character-letter">${ch.letter}</span>
            <h3>${ch.name}</h3>
            <p>${ch.bio}</p>
          </a>`
      )
      .join("");
  }

  return `<section class="kids-section" id="characters">
    <div class="kids-section-head reveal">
      <p class="pillar-eyebrow">Meet the cast</p>
      <h2>Fruit Friends A–Z</h2>
      <p>Twenty-six characters — one for every letter of the alphabet. Click a tile for the full character sheet.</p>
    </div>
    <div class="character-range reveal">
      <h3 class="character-range-title">A – M</h3>
      <div class="character-grid">${renderCharacterCards(firstHalf)}</div>
    </div>
    <div class="character-range reveal">
      <h3 class="character-range-title">N – Z</h3>
      <div class="character-grid">${renderCharacterCards(secondHalf)}</div>
    </div>
  </section>`;
}

function renderKidsGames() {
  const games = window.KIDS_DATA?.games || [];
  return `<section class="kids-section" id="games">
    <div class="kids-section-head reveal">
      <p class="pillar-eyebrow">Play</p>
      <h2>Games</h2>
      <p>Browser games for Fruit Friends fans — matching, word search, mazes, and more as we build them.</p>
    </div>
    <div class="episode-grid reveal">
      ${games
        .map(
          (game) => `<a class="episode-card" href="${game.href}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <span class="status-tag status-coming-soon">Coming soon</span>
          </a>`
        )
        .join("")}
    </div>
  </section>`;
}

function renderCharacterDetail(letter) {
  const ch = getCharacterByLetter(letter);
  if (!ch) {
    return `<p class="reveal">Character not found. <a href="/kids/#characters">Back to characters</a>.</p>`;
  }
  return `<p class="print-back reveal"><a href="/kids/#characters">&larr; All characters</a></p>
    <article class="character-detail reveal">
      <img src="${characterImageSrc(ch.letter)}" alt="${ch.name} character sheet" class="character-detail-image" width="1247" height="1254" />
      <div class="character-detail-head">
        <span class="character-letter">${ch.letter}</span>
        <h1>${ch.name}</h1>
        <p class="character-detail-bio">${ch.bio}</p>
      </div>
    </article>`;
}

function initCharacterPage(letter) {
  const ch = getCharacterByLetter(letter);
  initPage({
    title: ch ? ch.name : "Character",
    description: ch ? `${ch.name} — Fruit Friends character from the Laughing Dragons Kids Show.` : "Fruit Friends character",
    activePath: "/kids/",
    content: renderCharacterDetail(letter),
  });
}

function renderKidsPrintables() {
  const characters = window.KIDS_DATA?.characters || [];
  return `<section class="kids-section" id="printables">
    <div class="kids-section-head reveal">
      <p class="pillar-eyebrow">Maker corner</p>
      <h2>3D printable character files</h2>
      <p>Downloadable STL files for each Fruit Friend — print your own cast at home. Files drop here as they are ready.</p>
    </div>
    <div class="printable-grid reveal">
      ${characters
        .map(
          (ch) => `<article class="printable-card">
            ${renderCharacterImage(ch, "printable-image")}
            <span class="character-letter">${ch.letter}</span>
            <h3>${ch.name}</h3>
            <span class="status-tag status-coming-soon">STL coming soon</span>
          </article>`
        )
        .join("")}
    </div>
    <p class="kids-note reveal">Physical prints and finished models are available in our <a href="/prints/">3D print catalog</a> and through the <a href="/shop/">shop</a> when listed.</p>
  </section>`;
}

function renderKidsHub() {
  const data = window.KIDS_DATA || {};
  return `
    <header class="kids-hero reveal">
      <p class="pillar-eyebrow">${data.tagline || "Kids Show"}</p>
      <h1>${data.showTitle || "Kids Show"}</h1>
      <p>Episodes, characters, games, and 3D printable files — the home for everything Fruit Friends.</p>
    </header>
    ${renderKidsSubnav("episodes")}
    ${renderKidsEpisodes()}
    ${renderKidsCharacters()}
    ${renderKidsGames()}
    ${renderKidsPrintables()}
    <div class="prose reveal kids-credits">
      <p>Created by Brandon Sparks. Voice character and principal photography by Vinny Vincent.</p>
      <p>&copy; Laughing Dragons Productions</p>
    </div>
  `;
}
