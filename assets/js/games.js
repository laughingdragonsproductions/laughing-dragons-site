/** Laughing Dragons browser games — registry, hub, unlock helpers */
window.GAMES_DATA = {
  tagline: "Free browser games",
  intro:
    "Laughing Dragons builds small browser games you can play instantly — no download, no account, no install. " +
    "Each game teaches something useful while feeling like a classic flash-era arcade experience: retro terminals, tile matching, hidden-object search, letter tracing, counting, sorting, and more. " +
    "Beat a game to earn an unlock code, then hack the next title open in Terminal Trainer with LOGIN. Progress saves in your browser — no account needed. " +
    "Live games include full how-to-play guides. Later titles stay Locked until you earn them; once unlocked, a game that is still being finished shows as In production until it ships. " +
    "The Fruit Friends Kids Show lives separately under Kids Show — same studio, different section. Characters from the show inspire art and themes, but game pages here are built for general audiences with real written guides, tips, and walkthroughs alongside the play area. " +
    "New games ship when they are complete, tested, and documented — not as empty stubs.",

  /** Ordered catalog — unlock order is internal; UI shows a games list. */
  path: [
    {
      id: "flappy-dragon",
      title: "Flappy Dragon",
      description:
        "Tap to fly your laughing dragon through stone pillars — always playable, no unlock needed. Choose Easy or Hard gravity and unlock all eight dragon colors.",
      longDescription:
        "Flappy Dragon is a classic tap-to-fly arcade game set against a scrolling Laughing Dragons sky. Tap, click, or press Space to flap upward, thread gaps between stone pillars, and chase a higher score each run. " +
        "Pick Easy for 15% lighter gravity and jump for more forgiving falls, or Hard for the standard challenge. The game speeds up as you climb. Start with the green dragon and unlock red, blue, purple, orange, pink, teal, and charcoal skins by beating score milestones — progress saves in your browser. " +
        "Always open from the Games hub; no Terminal Trainer code required.",
      href: "/games/flappy-dragon/",
      image: "/assets/kids/games/flappy-dragon/background-fly.png",
      status: "live",
    },
    {
      id: "dragon-vball",
      title: "Dragon Volleyball",
      description:
        "Beach Pong with laughing dragons — move up and down, bat the ball past the AI, first to 7 wins. Always playable.",
      longDescription:
        "Dragon Volleyball is a tropical beach Pong match on the Laughing Dragons court. Control your dragon on the left, track the glowing beach ball with mouse, touch, or keyboard, and score when it sails past the AI dragon on the right. First to seven points wins the match. " +
        "Pick Easy for a slower ball and a looser opponent, or Hard for faster rallies. Win matches to unlock all eight dragon colors — progress saves in your browser. Always open from the Games hub; no Terminal Trainer code required.",
      href: "/games/dragon-vball/",
      image: "/assets/kids/games/dragon-vball/court.png",
      status: "live",
    },
    {
      id: "terminal",
      title: "Terminal Trainer",
      description:
        "Retro DOS-style terminal on a workroom desk. Type HELP, DIR, CD, and more to learn real command-line basics across three hacking-themed levels.",
      longDescription:
        "Terminal Trainer drops you at a glowing CRT on the Laughing Dragons workroom desk. An intro video sets the scene, then you type commands exactly like a classic DOS prompt — HELP lists tools, DIR explores folders, CD moves between directories, TYPE reads files, and LOGIN cracks the final vault. " +
        "Level one teaches discovery: find SYSTEM tools and read NOTES for clues. Level two opens hidden MISSIONS with password-protected vaults. Level three is the true ending — finish it to unlock Memory Matching and earn a shop coupon code. " +
        "Hints appear in a sidebar; Tab autocompletes commands. Perfect for kids curious about how computers work and adults who miss the A:\\> prompt.",
      href: "/games/terminal/",
      image: "/assets/kids/games/terminal/desk-monitor-frame.png",
      status: "live",
      rewardCode: "FORGE-GATE-7",
    },
    {
      id: "memory-matching",
      title: "Memory Matching Game",
      description:
        "Flip dragon tiles on scenic maps, match every pair, and beat par for a better rating. Unlocked after beating Terminal Trainer.",
      longDescription:
        "Memory Matching is a concentration-style board game set on Laughing Dragons map art. Choose Easy (4 pairs) or Hard (8 pairs), flip two tiles per turn, and remember where each laughing dragon landed. " +
        "Match both tiles in a pair and they stay revealed; miss and they flip back. Clear the entire board to win — fewer moves means a better star rating. Par is 8 moves on Easy and 16 on Hard; beat par to unlock Fruit Search. " +
        "Best scores save in your browser. The game gate checks that you completed Terminal Trainer first — finish all three terminal levels to earn access.",
      href: "/games/memory-matching/",
      image: "/assets/kids/games/memory-matching/maps/map-1.png",
      status: "live",
      requiresUnlock: "memory-matching-unlocked",
      lockedDescription: "Beat Terminal Trainer (all three levels) to unlock Memory Matching.",
      unlockHint: "Finish the true ending in Terminal Trainer — complete Level 3.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Play Terminal Trainer",
      rewardCode: "FIND-WALDO-3",
    },
    {
      id: "fruit-search",
      title: "Fruit Search",
      description: "I-Spy style hidden-object maps — find the Fruit Friend you are looking for in busy scenes.",
      longDescription:
        "Fruit Search is a Where's-Waldo style finder built around the Fruit Friends A–Z cast. A prompt asks you to find a named character or a letter, then you scan a busy map and tap the right portrait. Wrong taps get a gentle try-again; correct finds celebrate and roll the next target. Difficulty scales from a few large sprites to crowded hard mode.",
      href: "/games/fruit-search/",
      image: "/assets/kids/games/fruit-search/maps/map-1.png",
      status: "live",
      requiresUnlock: "fruit-search-unlocked",
      lockedDescription: "Beat Memory Matching at or under par to unlock Fruit Search.",
      unlockHint: "Clear the board at Standard rating or better (par or under).",
      unlockHref: "/games/memory-matching/",
      unlockButtonLabel: "Play Memory Matching",
      rewardCode: "TRACE-A-Z-4",
    },
    {
      id: "alphabet-trace",
      title: "Alphabet Trace",
      description: "Trace A–Z letter paths with mouse or finger — handwriting practice that feels like a game.",
      longDescription:
        "Alphabet Trace puts each letter on screen as a guided path. Drag along the strokes to complete A through Z, with Fruit Friends themes for kids learning to write. Built for tablets and desktops; short rounds make it easy to practice one letter at a time.",
      status: "in-production",
      requiresUnlock: "alphabet-trace-unlocked",
      lockedDescription: "Clear Fruit Search to unlock Alphabet Trace.",
      unlockHint: "Finish Fruit Search once it ships — or LOGIN its code in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "TYPE-FAST-5",
    },
    {
      id: "typing-race",
      title: "Typing Race",
      description: "Letters appear on screen — type them before they vanish. A fast sibling to Terminal Trainer.",
      longDescription:
        "Typing Race is a short-session keyboard warm-up: letters fall or flash, and you type the matching key before time runs out. Same workroom energy as Terminal Trainer, but bite-sized for younger players building letter recognition and typing speed.",
      status: "in-production",
      requiresUnlock: "typing-race-unlocked",
      lockedDescription: "Clear Alphabet Trace to unlock Typing Race.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "SORT-COLOR-6",
    },
    {
      id: "color-match",
      title: "Color Match Sort",
      description: "Drag fruit into red, yellow, and green bins — classic preschool sorting with Fruit Friends art.",
      longDescription:
        "Color Match Sort is a drag-and-drop sorter: pick up fruit friends and drop them into matching color bins. Simple rules, immediate feedback, and art parents can share. A low-friction first game for preschoolers before the harder puzzle titles.",
      status: "in-production",
      requiresUnlock: "color-match-unlocked",
      lockedDescription: "Clear Typing Race to unlock Color Match Sort.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "COUNT-DRAG-7",
    },
    {
      id: "count-the-dragons",
      title: "Count the Dragons",
      description: "Count the Fruit Friends on screen and tap the right number from 1 to 10.",
      longDescription:
        "Count the Dragons shows a random group of characters and asks how many you see. Tap the correct number to score. Early math practice with search-friendly counting-game keywords, built for quick rounds and replay.",
      status: "in-production",
      requiresUnlock: "count-the-dragons-unlocked",
      lockedDescription: "Clear Color Match Sort to unlock Count the Dragons.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "SIMON-GLOW-8",
    },
    {
      id: "simon-says",
      title: "Simon Says Light Pad",
      description: "Repeat the color and sound sequence — one canvas, high replay, optional high scores.",
      longDescription:
        "Simon Says Light Pad is the classic memory sequence game: watch the pad light up, then repeat the pattern. Each round adds another step. Dragon-themed colors and sounds keep it on-brand without heavy art requirements.",
      status: "in-production",
      requiresUnlock: "simon-says-unlocked",
      lockedDescription: "Clear Count the Dragons to unlock Simon Says Light Pad.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "HANG-FRUIT-9",
    },
    {
      id: "hangman-lite",
      title: "Hangman Lite",
      description: "Guess Fruit Friend names and simple A–Z words, one letter at a time.",
      longDescription:
        "Hangman Lite uses character names and short fruit words from the kids show. Guess letters to reveal the word before misses run out. Minimal graphics, classroom-friendly, and a natural tie-in to letter learning.",
      status: "in-production",
      requiresUnlock: "hangman-lite-unlocked",
      lockedDescription: "Clear Simon Says Light Pad to unlock Hangman Lite.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "WHACK-GRID-10",
    },
    {
      id: "whack-a-fruit",
      title: "Whack-a-Fruit",
      description: "Fruit Friends pop in a 3×3 grid — tap the target letter before it ducks away.",
      longDescription:
        "Whack-a-Fruit is a fast reaction game on a nine-cell grid. Characters pop up; tap the one that matches the letter or name prompt. Mobile-friendly, high dopamine, short sessions that still teach letter recognition.",
      status: "in-production",
      requiresUnlock: "whack-a-fruit-unlocked",
      lockedDescription: "Clear Hangman Lite to unlock Whack-a-Fruit.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "PATTERN-AB-11",
    },
    {
      id: "pattern-builder",
      title: "Pattern Builder",
      description: "Complete the next fruit in the sequence — ABA, ABC, and growing pattern puzzles.",
      longDescription:
        "Pattern Builder lays out a row of Fruit Friends and asks what comes next. Start with simple ABA repeats, then step up to longer sequences. Educational without much code — clear rules, instant check, and endless shuffled rounds.",
      status: "in-production",
      requiresUnlock: "pattern-builder-unlocked",
      lockedDescription: "Clear Whack-a-Fruit to unlock Pattern Builder.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "MAZE-PATH-12",
    },
    {
      id: "maze-generator",
      title: "Maze Generator",
      description: "Printable and on-screen mazes for puzzle fans — draw a path from start to finish.",
      longDescription:
        "Maze Generator creates fresh labyrinths you can solve on screen or print for offline play. Difficulty presets change size and dead-ends. A classic puzzle format that pairs well with the Fruit Friends theme when themed skins land.",
      status: "in-production",
      requiresUnlock: "maze-generator-unlocked",
      lockedDescription: "Clear Pattern Builder to unlock Maze Generator.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "COLOR-SVG-13",
    },
    {
      id: "coloring-viewer",
      title: "Coloring Page Studio",
      description: "Click-to-color SVG Fruit Friends pages — printable fun for parents and classrooms.",
      longDescription:
        "Coloring Page Studio is a light creative tool more than a score chase: open a character outline, fill regions with color, and optionally print. Parents and teachers search for printable coloring constantly — this keeps that traffic inside the games hub.",
      status: "in-production",
      requiresUnlock: "coloring-viewer-unlocked",
      lockedDescription: "Clear Maze Generator to unlock Coloring Page Studio.",
      unlockHint: "Beat earlier games or LOGIN their codes in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
    },
  ],
};

/** Live playable entries (landing pages + hub Play now). */
window.GAMES_DATA.live = window.GAMES_DATA.path.filter((g) => g.status === "live");

function isGameUnlocked(game) {
  if (!game.requiresUnlock) return true;
  return window.KIDS_UNLOCKS?.has?.(game.requiresUnlock) === true;
}

function renderRewardCodeBlock(game) {
  const cleared = window.KIDS_UNLOCKS?.isCleared?.(game.id) === true;
  const code = game.rewardCode || window.KIDS_UNLOCKS?.getRewardCode?.(game.id);
  if (!cleared || !code) return "";

  return `<div class="game-reward-code">
    <p class="game-reward-code-label">Unlock code</p>
    <code class="game-reward-code-value">${code}</code>
    <p class="game-unlock-hint">Hack it in <a href="/games/terminal/">Terminal Trainer</a>: <strong>LOGIN ${code}</strong></p>
  </div>`;
}

function renderGameCard(game) {
  const unlocked = isGameUnlocked(game);
  const detail = game.longDescription
    ? `<p class="game-soon-detail">${game.longDescription}</p>`
    : "";
  const codeBlock = renderRewardCodeBlock(game);

  if (game.status === "live") {
    if (!unlocked) {
      return `<article class="episode-card episode-card-locked reveal" id="game-${game.id}">
        ${game.image ? `<img src="${game.image}" alt="" class="game-card-thumb" loading="lazy" width="320" height="180" />` : ""}
        <h2>${game.title}</h2>
        <p>${game.lockedDescription || game.description}</p>
        <span class="status-tag status-locked">Locked</span>
        <p class="game-unlock-hint">${game.unlockHint || ""}</p>
        <a class="btn btn-sm" href="${game.unlockHref || "/games/terminal/"}">${game.unlockButtonLabel || "Play Terminal Trainer"}</a>
      </article>`;
    }
    return `<a class="episode-card reveal" href="${game.href}" id="game-${game.id}">
      ${game.image ? `<img src="${game.image}" alt="" class="game-card-thumb" loading="lazy" width="320" height="180" />` : ""}
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <span class="status-tag status-published">Play now</span>
      ${codeBlock}
    </a>`;
  }

  if (unlocked) {
    return `<article class="episode-card episode-card-soon reveal" id="game-${game.id}">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      ${detail}
      <span class="status-tag status-in-production">In production</span>
      <p class="game-unlock-hint">You unlocked this game — the studio is finishing the playable build.</p>
    </article>`;
  }

  return `<article class="episode-card episode-card-locked reveal" id="game-${game.id}">
    <h2>${game.title}</h2>
    <p>${game.lockedDescription || game.description}</p>
    ${detail}
    <span class="status-tag status-locked">Locked</span>
    <p class="game-unlock-hint">${game.unlockHint || ""}</p>
    <a class="btn btn-sm" href="${game.unlockHref || "/games/terminal/"}">${game.unlockButtonLabel || "Open Terminal Trainer"}</a>
  </article>`;
}

function renderGamesHub() {
  const data = window.GAMES_DATA || {};
  const path = data.path || [];
  const live = path.filter((g) => g.status === "live");
  const more = path.filter((g) => g.status !== "live");

  const liveCards = live.map(renderGameCard).join("");
  const moreCards = more.map(renderGameCard).join("");

  return `
    <header class="page-header reveal">
      <p class="pillar-eyebrow">${data.tagline || "Games"}</p>
      <h1>Laughing Dragons Games</h1>
      <p class="page-lead">Free browser games from the workroom — play, earn codes, hack the next one open.</p>
    </header>
    <div class="prose reveal">
      <p>${data.intro || ""}</p>
    </div>
    <section class="kids-section reveal" id="live-games">
      <div class="kids-section-head">
        <h2>Play now</h2>
        <p>Finished games with full guides. Beat one to reveal its unlock code on the card.</p>
      </div>
      <div class="episode-grid">${liveCards}</div>
    </section>
    <section class="kids-section reveal" id="more-games">
      <div class="kids-section-head">
        <h2>More games</h2>
        <p>Locked until you earn them. In production means unlocked and still being built.</p>
      </div>
      <div class="episode-grid">${moreCards}</div>
    </section>
    <div class="prose reveal">
      <h2>How unlocks work</h2>
      <p><strong>Terminal Trainer</strong> is open to everyone — and it is also the hack console for the whole catalog. Beat a game and its unlock code appears on that game’s Play now card. Open Terminal Trainer, type <strong>LOGIN</strong> followed by the code, and the next game opens.</p>
      <p>Example: beat Terminal Trainer and you earn <strong>FORGE-GATE-7</strong> (Memory Matching is also granted automatically). Beat Memory Matching at or under par and you earn <strong>FIND-WALDO-3</strong> for Fruit Search. Codes stay on cleared cards so returning players can look them up anytime.</p>
      <p>Progress and codes save in your browser — no account needed.</p>
      <p>Watch the Fruit Friends Kids Show separately on our <a href="/kids/">Kids Show</a> pages — episodes, character sheets, and printable files live there without ads.</p>
    </div>`;
}

function renderTerminalLanding() {
  return `
    <article class="game-landing prose reveal">
      <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
      <p class="pillar-eyebrow">Live game</p>
      <h1>Terminal Trainer</h1>
      <p class="page-lead">A retro DOS-style terminal on the Laughing Dragons workroom desk. Learn real command-line basics while playing through three hacking-themed levels.</p>
      <p>Terminal Trainer teaches how computers organize files and folders using text commands — the same ideas behind every modern operating system. You sit at a CRT monitor, type at an A:\\> prompt, and explore an in-memory filesystem. No mouse required: discovery, reading clue files, and typing the right command at the right time is the whole game.</p>
      <h2>What you will learn</h2>
      <ul>
        <li><strong>HELP</strong> — list available programs in the current directory</li>
        <li><strong>DIR</strong> — see files and folders; use <strong>DIR /W</strong> for a wide list</li>
        <li><strong>CD</strong> — change directory; <strong>CD ..</strong> goes up one level</li>
        <li><strong>TYPE</strong> or <strong>READ</strong> — display text file contents</li>
        <li><strong>CLS</strong> — clear the screen; <strong>ECHO</strong> — print text</li>
        <li><strong>LOGIN</strong> — authenticate with passwords and game unlock codes</li>
      </ul>
      <h2>Level overview</h2>
      <p><strong>Level 1 — First Contact:</strong> Explore A:\\, find SYSTEM tools, read WELCOME.TXT in NOTES, and learn that directories hold executable programs. A fake ending teases completion — keep digging for hidden folders.</p>
      <p><strong>Level 2 — The Vault:</strong> MISSIONS opens after the secret unlock. Follow LEVEL2.TXT into VAULT, find the password FRUIT-42, and breach the vault with LOGIN.</p>
      <p><strong>Level 3 — True ending:</strong> Read FINAL\\CLUE.TXT for passphrase LAUGHING-DRAGONS, finish the last LOGIN, and win. Rewards include Memory Matching unlock plus shop coupon code DragonForge15.</p>
      <h2>Game unlock codes</h2>
      <p>After you beat other Laughing Dragons games, their unlock codes work here too. Type <strong>LOGIN</strong> followed by any code you earned — for example <strong>LOGIN FORGE-GATE-7</strong> opens Memory Matching.</p>
      <h2>Tips</h2>
      <p>Press <kbd>↑</kbd> to recall your last command. Press <kbd>Tab</kbd> to autocomplete command and folder names. Open the Hints panel on mobile for the current walkthrough step. Skip or replay the intro video anytime.</p>
      <p><a class="btn btn-primary" href="#game-play">Play now ↓</a></p>
    </article>`;
}

function renderMemoryLanding() {
  return `
    <article class="game-landing prose reveal">
      <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
      <p class="pillar-eyebrow">Live game</p>
      <h1>Memory Matching Game</h1>
      <p class="page-lead">Flip laughing dragon tiles on scenic maps, match every pair, and chase par for a better rating.</p>
      <p>Memory Matching is a classic concentration game built for quick sessions. Tiles hide dragon art from the Laughing Dragons universe; your job is to remember locations and clear the board in as few moves as possible. The game runs entirely in your browser — scores save locally so you can beat your own best runs.</p>
      <h2>How to play</h2>
      <ol>
        <li>Tap a tile to flip it and reveal a dragon.</li>
        <li>Tap a second tile — if they match, both stay up until the pair clears.</li>
        <li>If they do not match, both flip back. Remember where each dragon was.</li>
        <li>Clear every pair to win. Fewer total moves means a better star rating.</li>
      </ol>
      <h2>Difficulty and par</h2>
      <p><strong>Easy</strong> uses 4 pairs (8 tiles). Par is 8 moves. <strong>Hard</strong> uses 8 pairs (16 tiles). Par is 16 moves. Ratings above par earn better stars; beating par unlocks Fruit Search and reveals code <strong>FIND-WALDO-3</strong> for Terminal Trainer.</p>
      <h2>Unlock requirement</h2>
      <p>Complete Terminal Trainer first — finish all three levels and reach the true ending. Your browser stores the unlock; then Memory Matching opens from the <a href="/games/">Games hub</a>.</p>
      <p><a class="btn btn-primary" href="#game-play">Play now ↓</a></p>
    </article>`;
}
