(() => {
  "use strict";

  const ASSET_BASE = "/assets/kids/games/memory-matching";

  const TILES = [
    { id: "green", name: "Green Dragon", src: `${ASSET_BASE}/tiles/green.png` },
    { id: "red", name: "Red Dragon", src: `${ASSET_BASE}/tiles/red.png` },
    { id: "blue", name: "Blue Dragon", src: `${ASSET_BASE}/tiles/blue.png` },
    { id: "purple", name: "Purple Dragon", src: `${ASSET_BASE}/tiles/purple.png` },
    { id: "orange", name: "Orange Dragon", src: `${ASSET_BASE}/tiles/orange.png` },
    { id: "pink", name: "Pink Dragon", src: `${ASSET_BASE}/tiles/pink.png` },
    { id: "teal", name: "Teal Dragon", src: `${ASSET_BASE}/tiles/teal.png` },
    { id: "charcoal", name: "Charcoal Dragon", src: `${ASSET_BASE}/tiles/charcoal.png` },
  ];

  const MAP_LIST = [
    `${ASSET_BASE}/maps/map-1.png`,
    `${ASSET_BASE}/maps/map-2.png`,
    `${ASSET_BASE}/maps/map-3.png`,
  ];

  const DIFFICULTY_KEY = "ldp-memory-difficulty";
  const MAP_CYCLE_KEY = "ldp-memory-map-cycle";
  const BEST_KEYS = {
    easy: "ldp-memory-game-best-moves-easy",
    hard: "ldp-memory-game-best-moves-hard",
  };

  const DIFFICULTY_CONFIG = {
    easy: {
      label: "Easy",
      pairCount: 4,
      boardClass: "board--easy",
      par: 8,
      ratings: [
        { label: "Excellent", min: 4, max: 6 },
        { label: "Great", min: 7, max: 8 },
        { label: "Standard", min: 9, max: 10 },
        { label: "Needs improvement", min: 11, max: Infinity },
      ],
    },
    hard: {
      label: "Hard",
      pairCount: 8,
      boardClass: "board--hard",
      par: 16,
      ratings: [
        { label: "Excellent", min: 8, max: 12 },
        { label: "Great", min: 13, max: 15 },
        { label: "Standard", min: 16, max: 18 },
        { label: "Needs improvement", min: 19, max: Infinity },
      ],
    },
  };

  const FLIP_MS = 420;
  const MISMATCH_MS = 780;

  const menuShellEl = document.getElementById("menu-shell");
  const playAppEl = document.getElementById("play-app");
  const panelMenuEl = document.getElementById("panel-menu");
  const panelDifficultyEl = document.getElementById("panel-difficulty");
  const panelHowtoEl = document.getElementById("panel-howto");
  const menuStageMapEl = document.getElementById("menu-stage-map");
  const bestEasyEl = document.getElementById("best-easy");
  const bestHardEl = document.getElementById("best-hard");
  const btnStartEl = document.getElementById("btn-start");
  const btnDifficultyEl = document.getElementById("btn-difficulty");
  const btnHowtoEl = document.getElementById("btn-howto");
  const btnDifficultyBackEl = document.getElementById("btn-difficulty-back");
  const btnHowtoBackEl = document.getElementById("btn-howto-back");
  const diffEasyEl = document.getElementById("diff-easy");
  const diffHardEl = document.getElementById("diff-hard");
  const btnMenuEl = document.getElementById("btn-menu");
  const winMenuBtn = document.getElementById("win-menu");

  const boardEl = document.getElementById("board");
  const movesEl = document.getElementById("moves");
  const pairsEl = document.getElementById("pairs");
  const pairsTotalEl = document.getElementById("pairs-total");
  const hudDifficultyEl = document.getElementById("hud-difficulty");
  const statusEl = document.getElementById("status");
  const stageMapEl = document.getElementById("stage-map");
  const newGameBtn = document.getElementById("new-game");
  const winEl = document.getElementById("win");
  const winMovesEl = document.getElementById("win-moves");
  const winParEl = document.getElementById("win-par");
  const winRatingEl = document.getElementById("win-rating");
  const winBestNoteEl = document.getElementById("win-best-note");
  const winUnlockEl = document.getElementById("win-unlock");
  const winUnlockGameNameEl = document.getElementById("win-unlock-game-name");
  const winUnlockLinkEl = document.getElementById("win-unlock-link");
  const playAgainBtn = document.getElementById("play-again");
  const srAnnounceEl = document.getElementById("sr-announce");

  const prefs = {
    difficulty: "hard",
  };

  const state = {
    screen: "menu",
    deck: [],
    flipped: [],
    lock: false,
    moves: 0,
    matches: 0,
    totalPairs: 8,
    activeTiles: TILES,
    mapCycleIndex: 0,
  };

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getDifficultyConfig() {
    return DIFFICULTY_CONFIG[prefs.difficulty] || DIFFICULTY_CONFIG.hard;
  }

  function getActiveTiles() {
    const config = getDifficultyConfig();
    return TILES.slice(0, config.pairCount);
  }

  function getRating(moves, difficulty) {
    const config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.hard;
    return config.ratings.find((band) => moves >= band.min && moves <= band.max) || config.ratings.at(-1);
  }

  function normalizeMapIndex(index) {
    const n = Number(index);
    if (!Number.isFinite(n)) return 0;
    return ((n % MAP_LIST.length) + MAP_LIST.length) % MAP_LIST.length;
  }

  function loadMapCycleIndex() {
    state.mapCycleIndex = normalizeMapIndex(localStorage.getItem(MAP_CYCLE_KEY));
  }

  function saveMapCycleIndex() {
    localStorage.setItem(MAP_CYCLE_KEY, String(state.mapCycleIndex));
  }

  function applyMapIndex(index) {
    const safeIndex = normalizeMapIndex(index);
    const src = MAP_LIST[safeIndex];
    const targets = [menuStageMapEl, stageMapEl];

    targets.forEach((el) => el.classList.add("is-fading"));
    window.setTimeout(() => {
      targets.forEach((el) => {
        el.src = src;
        el.classList.remove("is-fading");
      });
    }, 220);

    state.mapCycleIndex = safeIndex;
  }

  function previewNextMap() {
    applyMapIndex(state.mapCycleIndex);
  }

  function cycleMapForNewGame() {
    const index = state.mapCycleIndex;
    applyMapIndex(index);
    state.mapCycleIndex = normalizeMapIndex(index + 1);
    saveMapCycleIndex();
  }

  function loadPrefs() {
    const storedDiff = localStorage.getItem(DIFFICULTY_KEY);
    if (storedDiff === "easy" || storedDiff === "hard") {
      prefs.difficulty = storedDiff;
    }
    loadMapCycleIndex();
  }

  function savePrefs() {
    localStorage.setItem(DIFFICULTY_KEY, prefs.difficulty);
  }

  function syncDifficultyUI() {
    diffEasyEl.checked = prefs.difficulty === "easy";
    diffHardEl.checked = prefs.difficulty === "hard";
  }

  function formatBest(difficulty) {
    const best = Number(localStorage.getItem(BEST_KEYS[difficulty]) || "0");
    if (!best) return "—";
    const config = DIFFICULTY_CONFIG[difficulty];
    const rating = getRating(best, difficulty);
    return `${best} (${rating.label})`;
  }

  function updateBestScoresDisplay() {
    bestEasyEl.textContent = formatBest("easy");
    bestHardEl.textContent = formatBest("hard");
  }

  function showMenuPanel(panel) {
    panelMenuEl.hidden = panel !== "menu";
    panelDifficultyEl.hidden = panel !== "difficulty";
    panelHowtoEl.hidden = panel !== "howto";
    state.screen = panel;
  }

  function showMainMenu() {
    hideWin();
    playAppEl.hidden = true;
    menuShellEl.hidden = false;
    showMenuPanel("menu");
    updateBestScoresDisplay();
    syncDifficultyUI();
    previewNextMap();
    announce("Main menu");
  }

  function startPlay() {
    hideWin();
    menuShellEl.hidden = true;
    playAppEl.hidden = false;
    state.screen = "play";
    newGame();
  }

  function announce(message) {
    srAnnounceEl.textContent = "";
    requestAnimationFrame(() => {
      srAnnounceEl.textContent = message;
    });
  }

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function updateHud() {
    const config = getDifficultyConfig();
    movesEl.textContent = String(state.moves);
    pairsEl.textContent = String(state.matches);
    pairsTotalEl.textContent = String(state.totalPairs);
    hudDifficultyEl.textContent = config.label;
  }

  function applyBoardLayout() {
    const config = getDifficultyConfig();
    boardEl.classList.remove("board--easy", "board--hard");
    boardEl.classList.add(config.boardClass);
  }

  function buildDeck() {
    const tiles = getActiveTiles();
    const pairs = tiles.flatMap((tile) => [
      { ...tile, uid: `${tile.id}-a` },
      { ...tile, uid: `${tile.id}-b` },
    ]);
    return shuffle(pairs);
  }

  function renderBoard() {
    boardEl.replaceChildren();
    state.deck.forEach((tile, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tile";
      btn.dataset.uid = tile.uid;
      btn.dataset.pair = tile.id;
      btn.setAttribute("aria-label", `Hidden tile ${index + 1}`);
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = `
        <span class="tile-inner">
          <span class="tile-face tile-back" aria-hidden="true"></span>
          <span class="tile-face tile-front">
            <img src="${tile.src}" alt="" width="256" height="256" draggable="false" />
          </span>
        </span>
      `;
      btn.addEventListener("click", () => onTileClick(btn));
      boardEl.appendChild(btn);
    });
  }

  function flipOpen(btn) {
    btn.classList.add("is-flipped");
    btn.setAttribute("aria-pressed", "true");
    const pair = btn.dataset.pair;
    const tile = state.activeTiles.find((t) => t.id === pair);
    btn.setAttribute("aria-label", tile ? tile.name : "Dragon tile");
  }

  function flipClosed(btn) {
    btn.classList.remove("is-flipped", "is-mismatch");
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Hidden tile");
  }

  function onTileClick(btn) {
    if (state.lock) return;
    if (btn.classList.contains("is-flipped") || btn.classList.contains("is-matched")) return;
    if (state.flipped.includes(btn)) return;

    flipOpen(btn);
    state.flipped.push(btn);

    if (state.flipped.length === 1) {
      setStatus("Pick one more tile…");
      return;
    }

    if (state.flipped.length !== 2) return;

    state.moves += 1;
    updateHud();
    state.lock = true;

    const [a, b] = state.flipped;
    const matched = a.dataset.pair === b.dataset.pair;

    if (matched) {
      window.setTimeout(() => resolveMatch(a, b), FLIP_MS);
    } else {
      a.classList.add("is-mismatch");
      b.classList.add("is-mismatch");
      window.setTimeout(() => resolveMismatch(a, b), MISMATCH_MS);
    }
  }

  function resolveMatch(a, b) {
    a.classList.add("is-matched", "is-locked");
    b.classList.add("is-matched", "is-locked");
    a.setAttribute("aria-label", "Matched and removed");
    b.setAttribute("aria-label", "Matched and removed");
    state.matches += 1;
    state.flipped = [];
    state.lock = false;
    updateHud();

    const name = state.activeTiles.find((t) => t.id === a.dataset.pair)?.name || "pair";
    announce(`Match! ${name}`);
    setStatus(`Nice! ${name} matched.`);

    if (state.matches >= state.totalPairs) {
      window.setTimeout(showWin, 520);
    }
  }

  function resolveMismatch(a, b) {
    flipClosed(a);
    flipClosed(b);
    state.flipped = [];
    state.lock = false;
    announce("No match — tiles flipped back");
    setStatus("Not a match — try again!");
  }

  function beatPar(moves, difficulty) {
    const par = DIFFICULTY_CONFIG[difficulty]?.par ?? DIFFICULTY_CONFIG.hard.par;
    return moves <= par;
  }

  function showWin() {
    const config = getDifficultyConfig();
    const rating = getRating(state.moves, prefs.difficulty);
    const bestKey = BEST_KEYS[prefs.difficulty];
    const previousBest = Number(localStorage.getItem(bestKey) || "0");
    const isNewBest = !previousBest || state.moves < previousBest;
    const atOrUnderPar = beatPar(state.moves, prefs.difficulty);
    const rewards = window.KIDS_REWARDS?.memoryMatching || {};
    const wasFruitSearchUnlocked = window.KIDS_UNLOCKS?.isFruitSearchUnlocked?.() === true;
    let newlyUnlockedFruitSearch = false;

    if (atOrUnderPar && window.KIDS_UNLOCKS?.grantFruitSearchUnlock) {
      window.KIDS_UNLOCKS.grantFruitSearchUnlock();
      newlyUnlockedFruitSearch = !wasFruitSearchUnlocked;
    }

    winMovesEl.textContent = String(state.moves);
    winParEl.textContent = String(config.par);
    winRatingEl.textContent = rating.label;
    winRatingEl.dataset.tier = rating.label.toLowerCase().replace(/\s+/g, "-");
    winBestNoteEl.hidden = !isNewBest;

    if (winUnlockEl) {
      winUnlockEl.hidden = !newlyUnlockedFruitSearch;
    }
    if (winUnlockGameNameEl) {
      winUnlockGameNameEl.textContent = rewards.unlocksGameTitle || "Fruit Search";
    }
    if (winUnlockLinkEl) {
      winUnlockLinkEl.href = rewards.unlocksGameHref || "/games/#path";
    }

    if (isNewBest) {
      localStorage.setItem(bestKey, String(state.moves));
    }

    winEl.hidden = false;
    const unlockMsg = newlyUnlockedFruitSearch
      ? ` Fruit Search unlocked!`
      : "";
    announce(`You matched them all in ${state.moves} moves. Rating: ${rating.label}.${unlockMsg}`);
    setStatus(newlyUnlockedFruitSearch ? "Board cleared — new game unlocked!" : "Board cleared!");
    updateBestScoresDisplay();
  }

  function hideWin() {
    winEl.hidden = true;
    winBestNoteEl.hidden = true;
    if (winUnlockEl) winUnlockEl.hidden = true;
  }

  function newGame() {
    hideWin();
    state.activeTiles = getActiveTiles();
    state.totalPairs = state.activeTiles.length;
    state.deck = buildDeck();
    state.flipped = [];
    state.lock = false;
    state.moves = 0;
    state.matches = 0;
    applyBoardLayout();
    cycleMapForNewGame();
    updateHud();
    renderBoard();
    setStatus("Flip two tiles. Match the laughing dragons!");
    announce("New game started");
  }

  btnStartEl.addEventListener("click", startPlay);
  btnDifficultyEl.addEventListener("click", () => showMenuPanel("difficulty"));
  btnHowtoEl.addEventListener("click", () => showMenuPanel("howto"));
  btnDifficultyBackEl.addEventListener("click", () => showMenuPanel("menu"));
  btnHowtoBackEl.addEventListener("click", () => showMenuPanel("menu"));
  btnMenuEl.addEventListener("click", showMainMenu);
  winMenuBtn.addEventListener("click", showMainMenu);

  diffEasyEl.addEventListener("change", () => {
    if (diffEasyEl.checked) {
      prefs.difficulty = "easy";
      savePrefs();
    }
  });

  diffHardEl.addEventListener("change", () => {
    if (diffHardEl.checked) {
      prefs.difficulty = "hard";
      savePrefs();
    }
  });

  newGameBtn.addEventListener("click", newGame);
  playAgainBtn.addEventListener("click", newGame);

  winEl.addEventListener("click", (event) => {
    if (event.target === winEl) hideWin();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!winEl.hidden) {
      hideWin();
      return;
    }
    if (state.screen === "play") {
      showMainMenu();
      return;
    }
    if (state.screen === "difficulty" || state.screen === "howto") {
      showMenuPanel("menu");
    }
  });

  loadPrefs();
  syncDifficultyUI();
  previewNextMap();
  updateBestScoresDisplay();
  showMainMenu();
})();
