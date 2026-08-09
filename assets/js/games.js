/** Laughing Dragons browser games — registry, hub, unlock helpers */
window.GAMES_DATA = {
  tagline: "Free browser games",
  intro:
    "Laughing Dragons builds small browser games you can play instantly — no download, no account, no install. " +
    "Each game teaches something useful while feeling like a classic flash-era arcade experience: retro terminals, tile matching, and more on the way. " +
    "Games are free to play on laughing-dragons.com. Some titles unlock after you beat the previous one — a light progression path that rewards finishing what you start. " +
    "We keep finished games on this page with full how-to-play guides. Titles still in development appear below as coming soon — they are not playable yet and never show ads until launch. " +
    "The Fruit Friends Kids Show lives separately under Kids Show — same studio, different section. Characters from the show inspire art and themes, but game pages here are built for general audiences with real written guides, tips, and walkthroughs alongside the play area. " +
    "New games ship when they are complete, tested, and documented — not as empty stubs.",

  live: [
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
    },
    {
      id: "memory-matching",
      title: "Memory Matching Game",
      description:
        "Flip dragon tiles on scenic maps, match every pair, and beat par for a better rating. Unlocked after beating Terminal Trainer.",
      longDescription:
        "Memory Matching is a concentration-style board game set on Laughing Dragons map art. Choose Easy (4 pairs) or Hard (8 pairs), flip two tiles per turn, and remember where each laughing dragon landed. " +
        "Match both tiles in a pair and they stay revealed; miss and they flip back. Clear the entire board to win — fewer moves means a better star rating. Par is 8 moves on Easy and 16 on Hard; beat par to unlock Fruit Search when that game ships. " +
        "Best scores save in your browser. The game gate checks that you completed Terminal Trainer first — finish all three terminal levels to earn access.",
      href: "/games/memory-matching/",
      image: "/assets/kids/games/memory-matching/maps/map-1.png",
      status: "live",
      requiresUnlock: "memory-matching-unlocked",
      lockedDescription: "Beat Terminal Trainer (all three levels) to unlock Memory Matching.",
      unlockHint: "Finish the true ending in Terminal Trainer — complete Level 3.",
      unlockHref: "/games/terminal/",
      unlockButtonLabel: "Play Terminal Trainer",
    },
  ],

  inDevelopment: [
    {
      id: "fruit-search",
      title: "Fruit Search",
      description: "I-Spy style hidden-object maps — find the Fruit Friend you are looking for in busy scenes.",
    },
    {
      id: "maze-generator",
      title: "Maze Generator",
      description: "Printable and on-screen mazes for puzzle fans — coming after Fruit Search.",
    },
  ],
};

function isGameUnlocked(game) {
  if (!game.requiresUnlock) return true;
  return window.KIDS_UNLOCKS?.has?.(game.requiresUnlock) === true;
}

function renderGamesHub() {
  const data = window.GAMES_DATA || {};
  const live = data.live || [];
  const inDev = data.inDevelopment || [];

  const liveCards = live
    .map((game) => {
      const locked = Boolean(game.requiresUnlock) && !isGameUnlocked(game);
      if (locked) {
        return `<article class="episode-card episode-card-locked reveal">
          <img src="${game.image}" alt="" class="game-card-thumb" loading="lazy" width="320" height="180" />
          <h2>${game.title}</h2>
          <p>${game.lockedDescription || game.description}</p>
          <span class="status-tag status-locked">Locked</span>
          <p class="game-unlock-hint">${game.unlockHint || ""}</p>
          <a class="btn btn-sm" href="${game.unlockHref || "/games/terminal/"}">${game.unlockButtonLabel || "Unlock path"}</a>
        </article>`;
      }
      return `<a class="episode-card reveal" href="${game.href}">
        <img src="${game.image}" alt="" class="game-card-thumb" loading="lazy" width="320" height="180" />
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <span class="status-tag status-published">Play now</span>
      </a>`;
    })
    .join("");

  const devCards = inDev
    .map(
      (game) => `<article class="episode-card episode-card-soon reveal">
        <h2>${game.title}</h2>
        <p>${game.description}</p>
        <span class="status-tag status-coming-soon">In development</span>
      </article>`
    )
    .join("");

  return `
    <header class="page-header reveal">
      <p class="pillar-eyebrow">${data.tagline || "Games"}</p>
      <h1>Laughing Dragons Games</h1>
      <p class="page-lead">Free browser games from the workroom — play now, no signup required.</p>
    </header>
    <div class="prose reveal">
      <p>${data.intro || ""}</p>
    </div>
    <section class="kids-section reveal" id="live-games">
      <div class="kids-section-head">
        <h2>Play now</h2>
        <p>Finished games with full guides and playable builds.</p>
      </div>
      <div class="episode-grid">${liveCards}</div>
    </section>
    <section class="kids-section reveal" id="coming-soon">
      <div class="kids-section-head">
        <h2>Coming soon</h2>
        <p>In development — not playable yet. We list them here so you know what is next.</p>
      </div>
      <div class="episode-grid">${devCards}</div>
    </section>
    <div class="prose reveal">
      <h2>How unlocks work</h2>
      <p>Terminal Trainer is open to everyone. Beat all three levels to unlock Memory Matching. Beat par on Memory Matching to earn early access to Fruit Search when it launches. Progress saves in your browser — no account needed.</p>
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
        <li><strong>LOGIN</strong> — authenticate with passwords found in mission files</li>
      </ul>
      <h2>Level overview</h2>
      <p><strong>Level 1 — First Contact:</strong> Explore A:\\, find SYSTEM tools, read WELCOME.TXT in NOTES, and learn that directories hold executable programs. A fake ending teases completion — keep digging for hidden folders.</p>
      <p><strong>Level 2 — The Vault:</strong> MISSIONS opens after the secret unlock. Follow LEVEL2.TXT into VAULT, find the password FRUIT-42, and breach the vault with LOGIN.</p>
      <p><strong>Level 3 — True ending:</strong> Read FINAL\\CLUE.TXT for passphrase LAUGHING-DRAGONS, finish the last LOGIN, and win. Rewards include Memory Matching unlock plus shop coupon code DragonForge15.</p>
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
      <p><strong>Easy</strong> uses 4 pairs (8 tiles). Par is 8 moves. <strong>Hard</strong> uses 8 pairs (16 tiles). Par is 16 moves. Ratings above par earn better stars; beating par on Hard unlocks Fruit Search when that title launches.</p>
      <h2>Unlock requirement</h2>
      <p>Complete Terminal Trainer first — finish all three levels and reach the true ending. Your browser stores the unlock; then Memory Matching opens from the <a href="/games/">Games hub</a>.</p>
      <p><a class="btn btn-primary" href="#game-play">Play now ↓</a></p>
    </article>`;
}
