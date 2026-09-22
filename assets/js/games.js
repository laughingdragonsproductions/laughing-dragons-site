/** Laughing Dragons browser games - registry, hub, unlock helpers */
window.GAMES_DATA = {
  tagline: "Free browser games",
  intro:
    "Laughing Dragons builds small browser games you can play instantly - no download, no account, no install. " +
    "Each game teaches something useful while feeling like a classic flash-era arcade experience: retro terminals, tile matching, hidden-object search, letter tracing, counting, sorting, and more. " +
    "Beat a game to earn an unlock code, then hack the next title open in Terminal Trainer with LOGIN. Progress saves in your browser - no account needed. " +
    "Live games include full how-to-play guides. Later titles stay Locked until you earn them; once unlocked, a game that is still being finished shows as In production until it ships. " +
    "These are original Laughing Dragons studio products. Games here ship with real written guides, tips, and walkthroughs alongside the play area. " +
    "New games ship when they are complete, tested, and documented - not as empty stubs.",

  /** Shown first in the New games hub section (newest first). */
  newGameIds: ["count-the-dragons", "typing-race", "hangman-lite"],

  /** Ordered catalog - unlock order is internal; UI shows a games list. */
  path: [
    {
      id: "count-the-dragons",
      title: "Count the Dragons",
      description:
        "Count laughing dragons hiding in busy Fruit Search scenes - tap the right number. Always playable.",
      longDescription:
        "Count the Dragons drops dragon tiles into colorful Fruit Search maps crowded with Fruit Friends. Only the dragons count - scan the scene and tap 1-10. Easy uses 1-5; Hard packs in more crowd and decoys. Clear 10 rounds to earn SIMON-GLOW-8. Always open - no unlock required.",
      href: "/games/count-the-dragons/",
      image: "/assets/kids/games/fruit-search/maps/map-2.png",
      status: "live",
      rewardCode: "SIMON-GLOW-8",
    },
    {
      id: "typing-race",
      title: "Typing Race",
      description:
        "Letters appear on screen - type them before they vanish. Always playable keyboard warm-up.",
      longDescription:
        "Typing Race is a short-session keyboard warm-up: letters flash on screen, and you type the matching key before time runs out. Same workroom energy as Terminal Trainer, but bite-sized for younger players building letter recognition and typing speed. Clear a Heat of 20 correct letters to earn SORT-COLOR-6. Always open - no unlock required.",
      href: "/games/typing-race/",
      image: "/assets/kids/games/terminal/desk-monitor-frame.png",
      status: "live",
      rewardCode: "SORT-COLOR-6",
    },
    {
      id: "hangman-lite",
      title: "Hangman Lite",
      description:
        "Guess dragon words one letter at a time - miss too often and the stickman goes limp. Always playable.",
      longDescription:
        "Hangman Lite is classic hangman with dragon-themed words - FIRE, DRAGON, TALON, LAUGHING, and more. Guess letters to reveal the word before misses run out. A simple stickman fills in on wrong guesses; lose a word and the figure goes limp before a new random word appears. Clear a 5-word Word Run to earn WHACK-GRID-10 for Terminal Trainer. Always open - no unlock required.",
      href: "/games/hangman-lite/",
      image: "/assets/kids/games/memory-matching/tiles/green.png",
      status: "live",
      rewardCode: "WHACK-GRID-10",
    },
    {
      id: "sliding-scale",
      title: "The Sliding Scale",
      description:
        "Workroom slider puzzle - rebuild workshop photos and brand art. Easy 3×3, Med 4×4, or Hard 5×5. Always playable.",
      longDescription:
        "The Sliding Scale is a classic sliding-tile puzzle set on the Laughing Dragons workroom floor. Click tiles in the same row or column as the empty square to slide them into place - tap farther from the gap to move more tiles at once. Choose Easy (3×3), Med (4×4), or Hard (5×5), shuffle for a fresh scramble, and rebuild workshop photos, the workroom banner, or the Laughing Dragons logo. Arrow keys move one tile at a time. Always open from the Games hub - no Terminal Trainer code required.",
      href: "/games/sliding-scale/",
      image: "/assets/kids/games/sliding-scale/workshop.png",
      status: "live",
    },
    {
      id: "flappy-dragon",
      title: "Flappy Dragon",
      description:
        "Tap to fly your laughing dragon through stone pillars - always playable, no unlock needed. Choose Easy or Hard gravity and unlock all eight dragon colors.",
      longDescription:
        "Flappy Dragon is a classic tap-to-fly arcade game set against a scrolling Laughing Dragons sky. Tap, click, or press Space to flap upward, thread gaps between stone pillars, and chase a higher score each run. " +
        "Pick Easy for 15% lighter gravity and jump for more forgiving falls, or Hard for the standard challenge. The game speeds up as you climb. Start with the green dragon and unlock red, blue, purple, orange, pink, teal, and charcoal skins by beating score milestones - progress saves in your browser. " +
        "Always open from the Games hub; no Terminal Trainer code required.",
      href: "/games/flappy-dragon/",
      image: "/assets/kids/games/flappy-dragon/background-fly.png",
      status: "live",
    },
    {
      id: "dragon-vball",
      title: "Dragon-Ball V",
      description:
        "Forest Pong with dragons - move your paddle and rally the ball. First to 3 wins. Always playable.",
      longDescription:
        "Dragon-Ball V is classic Pong in a sunlit forest clearing. Move your dragon up and down with arrow keys or drag on the screen. " +
        "The ball bounces off both paddles automatically - keep it in play and send it past the AI to score. First to three wins the match. Eight paddle hits in a row ignites the fireball. Win matches to unlock all eight dragon colors - progress saves in your browser.",
      href: "/games/dragon-vball/",
      image: "/assets/kids/games/dragon-vball/background.png",
      status: "live",
    },
    {
      id: "dragos-revenge",
      title: "Drago's Revenge",
      description:
        "Push green blocks, trap knights, and collect dragon tiles - Drago the Dragon Fruit in a Rodent's Revenge-style puzzle. Always playable.",
      longDescription:
        "Drago's Revenge is a grid puzzle starring Drago the Dragon Fruit. Push slidable green blocks across an olive board, trap chasing knights, and collect laughing-dragon tile pickups. Eight hand-built levels, three lives, countdown timer, and Easy or Hard modes. Always open from the Games hub - no Terminal Trainer code required.",
      href: "/games/dragos-revenge/",
      image: "/assets/kids/games/dragos-revenge/board-with-green.png",
      status: "live",
    },
    {
      id: "terminal",
      title: "Terminal Trainer",
      description:
        "Retro DOS-style terminal on a workroom desk. Type HELP, DIR, CD, and more to learn real command-line basics across three hacking-themed levels.",
      longDescription:
        "Terminal Trainer drops you at a glowing CRT on the Laughing Dragons workroom desk. An intro video sets the scene, then you type commands exactly like a classic DOS prompt - HELP lists tools, DIR explores folders, CD moves between directories, TYPE reads files, and LOGIN cracks the final vault. " +
        "Level one teaches discovery: find SYSTEM tools and read NOTES for clues. Level two opens hidden MISSIONS with password-protected vaults. Level three is the true ending - finish it to unlock Memory Matching and earn a shop coupon code. " +
        "Hints appear in a sidebar; Tab autocompletes commands. Great for anyone curious about how computers work - from first-time explorers to adults who miss the A:\\> prompt.",
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
        "Match both tiles in a pair and they stay revealed; miss and they flip back. Clear the entire board to win - fewer moves means a better star rating. Par is 8 moves on Easy and 16 on Hard; beat par to unlock Fruit Search. " +
        "Best scores save in your browser. The game gate checks that you completed Terminal Trainer first - finish all three terminal levels to earn access.",
      href: "/games/memory-matching/",
      image: "/assets/kids/games/memory-matching/maps/map-1.png",
      status: "live",
      requiresUnlock: "memory-matching-unlocked",
      lockedDescription: "Beat Terminal Trainer (all three levels) to unlock Memory Matching.",
      unlockHint: "Finish the true ending in Terminal Trainer - complete Level 3.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Play Terminal Trainer",
      rewardCode: "FIND-WALDO-3",
    },
    {
      id: "fruit-search",
      title: "Fruit Search",
      description: "I-Spy style hidden-object maps - find the character you are looking for in busy scenes.",
      longDescription:
        "Fruit Search is a Where's-Waldo style finder built around the Fruit Friends A-Z cast. A prompt asks you to find a named character or a letter, then you scan a busy map and tap the right portrait. Wrong taps get a gentle try-again; correct finds celebrate and roll the next target. Difficulty scales from a few large sprites to crowded hard mode. Part of the Laughing Dragons Games catalog - a standalone hidden-object title with a full landing guide.",
      href: "/games/fruit-search/",
      image: "/assets/kids/games/fruit-search/ISpyFruit1.png",
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
      description: "Trace A-Z letter paths with mouse or finger - handwriting practice that feels like a game.",
      longDescription:
        "Alphabet Trace puts each letter on screen as a guided path. Drag along the strokes to complete A through Z, with Fruit Friends-themed art. Built for tablets and desktops; short rounds make it easy to practice one letter at a time.",
      status: "in-production",
      requiresUnlock: "alphabet-trace-unlocked",
      lockedDescription: "Clear Fruit Search to unlock Alphabet Trace.",
      unlockHint: "Finish Fruit Search once it ships - or LOGIN its code in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "TYPE-FAST-5",
    },
    {
      id: "color-match",
      title: "Color Match Sort",
      description: "Drag fruit into red, yellow, and green bins - classic color sorting with Fruit Friends art.",
      longDescription:
        "Color Match Sort is a drag-and-drop sorter: pick up fruit characters and drop them into matching color bins. Simple rules, immediate feedback, and bright art. A low-friction sorting puzzle before the harder titles in the catalog.",
      status: "in-production",
      requiresUnlock: "color-match-unlocked",
      lockedDescription: "Clear Typing Race or LOGIN SORT-COLOR-6 in Terminal Trainer to unlock Color Match Sort.",
      unlockHint: "Beat Typing Race (always open) or LOGIN SORT-COLOR-6 in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "COUNT-DRAG-7",
    },
    {
      id: "simon-says",
      title: "Simon Says Light Pad",
      description: "Repeat the color and sound sequence - one canvas, high replay, optional high scores.",
      longDescription:
        "Simon Says Light Pad is the classic memory sequence game: watch the pad light up, then repeat the pattern. Each round adds another step. Dragon-themed colors and sounds keep it on-brand without heavy art requirements.",
      status: "in-production",
      requiresUnlock: "simon-says-unlocked",
      lockedDescription: "Clear Count the Dragons or LOGIN SIMON-GLOW-8 in Terminal Trainer to unlock Simon Says Light Pad.",
      unlockHint: "Beat Count the Dragons (always open) or LOGIN SIMON-GLOW-8 in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "HANG-FRUIT-9",
    },
    {
      id: "whack-a-fruit",
      title: "Whack-a-Fruit",
      description: "Fruit Friends pop in a 3×3 grid - tap the target letter before it ducks away.",
      longDescription:
        "Whack-a-Fruit is a fast reaction game on a nine-cell grid. Characters pop up; tap the one that matches the letter or name prompt. Mobile-friendly, high dopamine, short sessions that still teach letter recognition.",
      status: "in-production",
      requiresUnlock: "whack-a-fruit-unlocked",
      lockedDescription: "Clear Hangman Lite or LOGIN WHACK-GRID-10 in Terminal Trainer to unlock Whack-a-Fruit.",
      unlockHint: "Beat Hangman Lite (always open) or LOGIN WHACK-GRID-10 in Terminal Trainer.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Open Terminal Trainer",
      rewardCode: "PATTERN-AB-11",
    },
    {
      id: "pattern-builder",
      title: "Pattern Builder",
      description: "Complete the next fruit in the sequence - ABA, ABC, and growing pattern puzzles.",
      longDescription:
        "Pattern Builder lays out a row of Fruit Friends and asks what comes next. Start with simple ABA repeats, then step up to longer sequences. Educational without much code - clear rules, instant check, and endless shuffled rounds.",
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
      description: "Printable and on-screen mazes for puzzle fans - draw a path from start to finish.",
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
      description: "Click-to-color SVG Fruit Friends pages - printable creative pages from the Games hub.",
      longDescription:
        "Coloring Page Studio is a light creative tool more than a score chase: open a character outline, fill regions with color, and optionally print. A creative break inside the Laughing Dragons Games catalog.",
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

function isNewGame(game) {
  return (window.GAMES_DATA?.newGameIds || []).includes(game.id);
}

function liveStatusTag(game) {
  if (isNewGame(game)) {
    return `<span class="status-tag status-new">New</span>`;
  }
  return `<span class="status-tag status-published">Play now</span>`;
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
      ${liveStatusTag(game)}
      ${codeBlock}
    </a>`;
  }

  if (unlocked) {
    return `<article class="episode-card episode-card-soon reveal" id="game-${game.id}">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      ${detail}
      <span class="status-tag status-in-production">In production</span>
      <p class="game-unlock-hint">You unlocked this game - the studio is finishing the playable build.</p>
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
  const newIds = data.newGameIds || [];
  const newGames = newIds
    .map((id) => path.find((g) => g.id === id))
    .filter((g) => g && g.status === "live");
  const live = path.filter((g) => g.status === "live" && !newIds.includes(g.id));
  const more = path.filter((g) => g.status !== "live");

  const newCards = newGames.map(renderGameCard).join("");
  const liveCards = live.map(renderGameCard).join("");
  const moreCards = more.map(renderGameCard).join("");

  const newSection = newGames.length
    ? `<section class="kids-section reveal" id="new-games">
      <div class="kids-section-head">
        <h2>New games</h2>
        <p>Three fresh titles - always open, no unlock needed. Jump in and play.</p>
      </div>
      <div class="episode-grid">${newCards}</div>
    </section>`
    : "";

  return `
    <header class="page-header reveal">
      <p class="pillar-eyebrow">${data.tagline || "Games"}</p>
      <h1>Laughing Dragons Games</h1>
      <p class="page-lead">Free browser games from the workroom - play, earn codes, hack the next one open.</p>
    </header>
    <div class="prose reveal">
      <p>${data.intro || ""}</p>
    </div>
    ${newSection}
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
      <p><strong>Terminal Trainer</strong> is open to everyone - and it is also the hack console for the whole catalog. Beat a game and its unlock code appears on that game’s Play now card. Open Terminal Trainer, type <strong>LOGIN</strong> followed by the code, and the next game opens.</p>
      <p>Example: beat Terminal Trainer and you earn <strong>FORGE-GATE-7</strong> (Memory Matching is also granted automatically). Beat Memory Matching at or under par and you earn <strong>FIND-WALDO-3</strong> for Fruit Search. Codes stay on cleared cards so returning players can look them up anytime.</p>
      <p>Progress and codes save in your browser - no account needed.</p>
    </div>`;
}

function renderTerminalLanding() {
  return `
    <article class="game-landing prose reveal">
  <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
  <p class="pillar-eyebrow">Laughing Dragons Games</p>
  <h1>Terminal Trainer</h1>
  <p class="page-lead">Retro DOS commands on a workroom CRT — HELP, DIR, CD, TYPE, and LOGIN across three levels.</p>
  <p>Terminal Trainer puts you at a glowing CRT on the Laughing Dragons desk. Type real command-line basics across three hacking-themed levels. Beat Level 3 to unlock Memory Matching and earn FORGE-GATE-7 plus DragonForge15.</p>
  <p><a class="btn btn-primary" href="#game-play">Play now ↓</a> · <a href="#game-guide">Full guide ↓</a></p>
</article>`;
}

function renderMemoryLanding() {
  return `
    <article class="game-landing prose reveal">
  <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
  <p class="pillar-eyebrow">Laughing Dragons Games</p>
  <h1>Memory Matching Game</h1>
  <p class="page-lead">Flip dragon tiles on scenic maps, match every pair, and beat par for a better star rating.</p>
  <p>Memory Matching is concentration on Laughing Dragons map art. Flip two tiles per turn, clear the board, and finish at or under par to unlock Fruit Search. Requires beating Terminal Trainer first.</p>
  <p><a class="btn btn-primary" href="#game-play">Play now ↓</a> · <a href="#game-guide">Full guide ↓</a></p>
</article>`;
}
