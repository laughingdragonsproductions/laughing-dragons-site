/**
 * Kids games — cross-game unlocks and Terminal Trainer rewards.
 * Used by terminal-game.js, kids.js hub, and gated game pages.
 */
(function () {
  const STORAGE_PREFIX = "ldp-kids-unlock-";

  const KEYS = {
    terminalComplete: "terminal-trainer-complete",
    memoryMatching: "memory-matching-unlocked",
    fruitSearch: "fruit-search-unlocked",
  };

  function migrateUnlockKeys() {
    try {
      if (localStorage.getItem(STORAGE_PREFIX + "word-search-unlocked") === "1") {
        localStorage.setItem(STORAGE_PREFIX + KEYS.fruitSearch, "1");
        localStorage.removeItem(STORAGE_PREFIX + "word-search-unlocked");
      }
    } catch {
      /* ignore */
    }
  }

  window.KIDS_UNLOCKS = {
    keys: KEYS,

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

    /** Hidden dev backdoor — Terminal Trainer CD A:\\Dev\\unlockmatch */
    grantHiddenDevUnlock() {
      return this.grantTerminalWin();
    },

    /** Called when Terminal Trainer level 3 is beaten. */
    grantTerminalWin() {
      this.grant(KEYS.terminalComplete);
      this.grant(KEYS.memoryMatching);
    },

    isMemoryMatchingUnlocked() {
      return this.has(KEYS.memoryMatching);
    },

    isFruitSearchUnlocked() {
      return this.has(KEYS.fruitSearch);
    },

    /** Called when Memory Matching is cleared at or under par. */
    grantFruitSearchUnlock() {
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
      unlocksGameId: "fruit-search",
      unlocksGameTitle: "Fruit Search",
      unlocksGameHref: "/games/#coming-soon",
    },

    getShopUrl() {
      const links = window.SITE_CONFIG?.links || {};
      return links.shopify || links.etsy || this.terminalTrainer.shopHref;
    },
  };

  migrateUnlockKeys();
})();
