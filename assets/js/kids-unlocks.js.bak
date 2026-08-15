/**
 * Kids games — cross-game unlocks, reward codes, and Terminal Trainer rewards.
 * Used by terminal-game.js, games.js hub, and gated game pages.
 */
(function () {
  const STORAGE_PREFIX = "ldp-kids-unlock-";
  const CLEARED_PREFIX = "ldp-kids-cleared-";

  const KEYS = {
    terminalComplete: "terminal-trainer-complete",
    memoryMatching: "memory-matching-unlocked",
    fruitSearch: "fruit-search-unlocked",
    alphabetTrace: "alphabet-trace-unlocked",
    typingRace: "typing-race-unlocked",
    colorMatch: "color-match-unlocked",
    countTheDragons: "count-the-dragons-unlocked",
    simonSays: "simon-says-unlocked",
    hangmanLite: "hangman-lite-unlocked",
    whackAFruit: "whack-a-fruit-unlocked",
    patternBuilder: "pattern-builder-unlocked",
    mazeGenerator: "maze-generator-unlocked",
    coloringViewer: "coloring-viewer-unlocked",
  };

  /** Code typed in Terminal LOGIN → unlock next game seat. */
  const UNLOCK_CODES = {
    "FORGE-GATE-7": {
      unlockId: KEYS.memoryMatching,
      unlocksGameId: "memory-matching",
      unlocksGameTitle: "Memory Matching Game",
      fromGameId: "terminal",
    },
    "FIND-WALDO-3": {
      unlockId: KEYS.fruitSearch,
      unlocksGameId: "fruit-search",
      unlocksGameTitle: "Fruit Search",
      fromGameId: "memory-matching",
    },
    "TRACE-A-Z-4": {
      unlockId: KEYS.alphabetTrace,
      unlocksGameId: "alphabet-trace",
      unlocksGameTitle: "Alphabet Trace",
      fromGameId: "fruit-search",
    },
    "TYPE-FAST-5": {
      unlockId: KEYS.typingRace,
      unlocksGameId: "typing-race",
      unlocksGameTitle: "Typing Race",
      fromGameId: "alphabet-trace",
    },
    "SORT-COLOR-6": {
      unlockId: KEYS.colorMatch,
      unlocksGameId: "color-match",
      unlocksGameTitle: "Color Match Sort",
      fromGameId: "typing-race",
    },
    "COUNT-DRAG-7": {
      unlockId: KEYS.countTheDragons,
      unlocksGameId: "count-the-dragons",
      unlocksGameTitle: "Count the Dragons",
      fromGameId: "color-match",
    },
    "SIMON-GLOW-8": {
      unlockId: KEYS.simonSays,
      unlocksGameId: "simon-says",
      unlocksGameTitle: "Simon Says Light Pad",
      fromGameId: "count-the-dragons",
    },
    "HANG-FRUIT-9": {
      unlockId: KEYS.hangmanLite,
      unlocksGameId: "hangman-lite",
      unlocksGameTitle: "Hangman Lite",
      fromGameId: "simon-says",
    },
    "WHACK-GRID-10": {
      unlockId: KEYS.whackAFruit,
      unlocksGameId: "whack-a-fruit",
      unlocksGameTitle: "Whack-a-Fruit",
      fromGameId: "hangman-lite",
    },
    "PATTERN-AB-11": {
      unlockId: KEYS.patternBuilder,
      unlocksGameId: "pattern-builder",
      unlocksGameTitle: "Pattern Builder",
      fromGameId: "whack-a-fruit",
    },
    "MAZE-PATH-12": {
      unlockId: KEYS.mazeGenerator,
      unlocksGameId: "maze-generator",
      unlocksGameTitle: "Maze Generator",
      fromGameId: "pattern-builder",
    },
    "COLOR-SVG-13": {
      unlockId: KEYS.coloringViewer,
      unlocksGameId: "coloring-viewer",
      unlocksGameTitle: "Coloring Page Studio",
      fromGameId: "maze-generator",
    },
  };

  /** Reward code shown on hub tile after clearing each game. */
  const REWARD_CODES_BY_GAME = {
    terminal: "FORGE-GATE-7",
    "memory-matching": "FIND-WALDO-3",
    "fruit-search": "TRACE-A-Z-4",
    "alphabet-trace": "TYPE-FAST-5",
    "typing-race": "SORT-COLOR-6",
    "color-match": "COUNT-DRAG-7",
    "count-the-dragons": "SIMON-GLOW-8",
    "simon-says": "HANG-FRUIT-9",
    "hangman-lite": "WHACK-GRID-10",
    "whack-a-fruit": "PATTERN-AB-11",
    "pattern-builder": "MAZE-PATH-12",
    "maze-generator": "COLOR-SVG-13",
  };

  function normalizeCode(code) {
    return String(code || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "-");
  }

  function migrateUnlockKeys() {
    try {
      if (localStorage.getItem(STORAGE_PREFIX + "word-search-unlocked") === "1") {
        localStorage.setItem(STORAGE_PREFIX + KEYS.fruitSearch, "1");
        localStorage.removeItem(STORAGE_PREFIX + "word-search-unlocked");
      }
      if (localStorage.getItem(STORAGE_PREFIX + KEYS.terminalComplete) === "1") {
        localStorage.setItem(CLEARED_PREFIX + "terminal", "1");
      }
      if (localStorage.getItem(STORAGE_PREFIX + KEYS.fruitSearch) === "1") {
        localStorage.setItem(CLEARED_PREFIX + "memory-matching", "1");
      }
    } catch {
      /* ignore */
    }
  }

  window.KIDS_UNLOCKS = {
    keys: KEYS,
    codes: UNLOCK_CODES,
    rewardCodesByGame: REWARD_CODES_BY_GAME,

    has(unlockId) {
      try {
        return localStorage.getItem(STORAGE_PREFIX + unlockId) === "1";
      } catch {
        return false;
      }
    },

    grant(unlockId) {
      try {
        localStorage.setItem(STORAGE_PREFIX + unlockId, "1");
        window.dispatchEvent(
          new CustomEvent("ldp-kids-unlock-changed", { detail: { unlockId } })
        );
        return true;
      } catch {
        return false;
      }
    },

    markCleared(gameId) {
      try {
        localStorage.setItem(CLEARED_PREFIX + gameId, "1");
        return true;
      } catch {
        return false;
      }
    },

    isCleared(gameId) {
      try {
        return localStorage.getItem(CLEARED_PREFIX + gameId) === "1";
      } catch {
        return false;
      }
    },

    getRewardCode(gameId) {
      return REWARD_CODES_BY_GAME[gameId] || null;
    },

    /** Redeem a code in Terminal Trainer LOGIN. */
    grantByCode(rawCode) {
      const code = normalizeCode(rawCode);
      const entry = UNLOCK_CODES[code];
      if (!entry) return { ok: false };

      const already = this.has(entry.unlockId);
      if (!already) this.grant(entry.unlockId);

      return {
        ok: true,
        already,
        title: entry.unlocksGameTitle,
        gameId: entry.unlocksGameId,
      };
    },

    /** Hidden dev backdoor — Terminal Trainer CD A:\\Dev\\unlockmatch */
    grantHiddenDevUnlock() {
      return this.grantTerminalWin();
    },

    /** Called when Terminal Trainer level 3 is beaten. */
    grantTerminalWin() {
      this.grant(KEYS.terminalComplete);
      this.grant(KEYS.memoryMatching);
      this.markCleared("terminal");
    },

    isMemoryMatchingUnlocked() {
      return this.has(KEYS.memoryMatching);
    },

    isFruitSearchUnlocked() {
      return this.has(KEYS.fruitSearch);
    },

    /** Called when Memory Matching is cleared at or under par. */
    grantFruitSearchUnlock() {
      this.markCleared("memory-matching");
      return this.grant(KEYS.fruitSearch);
    },
  };

  window.KIDS_REWARDS = {
    terminalTrainer: {
      gameUnlockCode: "FORGE-GATE-7",
      unlocksGameId: "memory-matching",
      unlocksGameTitle: "Memory Matching Game",
      unlocksGameHref: "/games/memory-matching/",
      couponCode: "DragonForge15",
      couponLabel: "15% off anything in-store",
      shopHref: "/shop/",
    },

    memoryMatching: {
      rewardCode: "FIND-WALDO-3",
      unlocksGameId: "fruit-search",
      unlocksGameTitle: "Fruit Search",
      unlocksGameHref: "/games/fruit-search/",
    },

    fruitSearch: {
      rewardCode: "TRACE-A-Z-4",
      unlocksGameId: "alphabet-trace",
      unlocksGameTitle: "Alphabet Trace",
      unlocksGameHref: "/games/#more-games",
    },

    getShopUrl() {
      const links = window.SITE_CONFIG?.links || {};
      return links.shopify || links.etsy || this.terminalTrainer.shopHref;
    },
  };

  migrateUnlockKeys();
})();
