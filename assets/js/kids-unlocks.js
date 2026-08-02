/**
 * Kids games — cross-game unlocks and Terminal Trainer rewards.
 * Used by terminal-game.js, kids.js hub, and gated game pages.
 */
(function () {
  const STORAGE_PREFIX = "ldp-kids-unlock-";

  const KEYS = {
    terminalComplete: "terminal-trainer-complete",
    memoryMatching: "memory-matching-unlocked",
  };

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
    grantMemoryMatchingDevUnlock() {
      return this.grant(KEYS.memoryMatching);
    },

    /** Called when Terminal Trainer level 3 is beaten. */
    grantTerminalWin() {
      this.grant(KEYS.terminalComplete);
      this.grant(KEYS.memoryMatching);
    },

    isMemoryMatchingUnlocked() {
      return this.has(KEYS.memoryMatching);
    },
  };

  window.KIDS_REWARDS = {
    terminalTrainer: {
      gameUnlockCode: "FORGE-GATE-7",
      unlocksGameId: "memory-matching",
      unlocksGameTitle: "Memory Matching Game",
      unlocksGameHref: "/kids/games/memory-matching/",
      couponCode: "DragonForge15",
      couponLabel: "15% off anything in-store",
      shopHref: "/shop/",
    },

    getShopUrl() {
      const links = window.SITE_CONFIG?.links || {};
      return links.shopify || links.etsy || this.terminalTrainer.shopHref;
    },
  };
})();
