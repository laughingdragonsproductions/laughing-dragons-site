/** Typing Race - letter heat loop */
(function () {
  "use strict";

  const HEAT_TARGET = 20;
  const DIFF_KEY = "ldp-typing-race-difficulty";
  const STREAK_KEY = "ldp-typing-race-best-streak";
  const POOL_A_M = "ABCDEFGHIJKLM".split("");
  const POOL_A_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const TIER = {
    easy: { ms: 5000, pool: "A-M" },
    normal: { ms: 3500, pool: "A-Z" },
    hard: { ms: 2500, pool: "A-Z" },
  };

  const state = {
    mode: "menu",
    session: "heat",
    tier: "easy",
    correct: 0,
    streak: 0,
    bestStreak: 0,
    letter: "",
    deadline: 0,
    duration: 5000,
    raf: 0,
    retrySame: false,
  };

  const els = {};

  function loadTier() {
    try {
      const v = localStorage.getItem(DIFF_KEY);
      if (v === "easy" || v === "normal" || v === "hard") return v;
    } catch {
      /* ignore */
    }
    return "easy";
  }

  function saveTier(tier) {
    try {
      localStorage.setItem(DIFF_KEY, tier);
    } catch {
      /* ignore */
    }
  }

  function loadBest() {
    try {
      return Number(localStorage.getItem(STREAK_KEY) || 0) || 0;
    } catch {
      return 0;
    }
  }

  function saveBest(n) {
    try {
      localStorage.setItem(STREAK_KEY, String(n));
    } catch {
      /* ignore */
    }
  }

  function isTablet() {
    return window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  }

  function poolForTier() {
    const cfg = TIER[state.tier] || TIER.easy;
    return cfg.pool === "A-M" ? POOL_A_M : POOL_A_Z;
  }

  function pickLetter() {
    const pool = poolForTier();
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && next === state.letter) {
      next = pool[Math.floor(Math.random() * pool.length)];
    }
    return next;
  }

  function buildUi(root) {
    const oskKeys = POOL_A_Z.map(
      (l) =>
        `<button type="button" class="tr-osk-key" data-key="${l}" aria-label="Key ${l}">${l}</button>`
    ).join("");

    root.innerHTML = `
      <div class="tr-menu" id="tr-menu">
        <p class="tr-eyebrow">Laughing Dragons Games</p>
        <h2>Typing Race</h2>
        <p>Letters pop up - type them before the timer runs out. Best streak: <strong id="tr-best">0</strong></p>
        <fieldset class="tr-difficulty">
          <legend>Difficulty</legend>
          <label class="tr-radio"><input type="radio" name="tr-diff" value="easy" checked /> Easy (A-M)</label>
          <label class="tr-radio"><input type="radio" name="tr-diff" value="normal" /> Normal (A-Z)</label>
          <label class="tr-radio"><input type="radio" name="tr-diff" value="hard" /> Hard (faster)</label>
        </fieldset>
        <div class="tr-actions">
          <button type="button" class="btn btn-primary" id="tr-start-heat">Start Heat</button>
          <button type="button" class="btn" id="tr-start-practice">Practice</button>
        </div>
      </div>

      <div class="tr-play" id="tr-play" hidden>
        <div class="tr-hud">
          <p id="tr-score">Correct: <strong>0</strong> / <strong>${HEAT_TARGET}</strong></p>
          <p id="tr-streak">Streak: <strong>0</strong></p>
          <button type="button" class="btn" id="tr-quit">Menu</button>
        </div>
        <div class="tr-timer-wrap" aria-hidden="true"><div class="tr-timer-bar" id="tr-timer"></div></div>
        <div class="tr-stage"><p class="tr-letter" id="tr-letter">A</p></div>
        <p class="tr-feedback" id="tr-feedback" aria-live="polite"></p>
        <div class="tr-osk is-tablet" id="tr-osk">${oskKeys}</div>
      </div>

      <div class="tr-win" id="tr-win" hidden>
        <div class="tr-win-card" role="dialog" aria-labelledby="tr-win-title">
          <h2 id="tr-win-title">Heat cleared!</h2>
          <p>You typed ${HEAT_TARGET} letters in time.</p>
          <p>Your code:</p>
          <code class="tr-win-code" id="tr-win-code">SORT-COLOR-6</code>
          <p>Type <strong id="tr-win-login">LOGIN SORT-COLOR-6</strong> in
            <a href="/games/terminal/">Terminal Trainer</a> to unlock Color Match Sort.</p>
          <div class="tr-win-actions">
            <a class="btn btn-primary" href="/games/">Back to Games</a>
            <button type="button" class="btn" id="tr-play-again">Play again</button>
          </div>
        </div>
      </div>
    `;

    els.menu = root.querySelector("#tr-menu");
    els.play = root.querySelector("#tr-play");
    els.win = root.querySelector("#tr-win");
    els.best = root.querySelector("#tr-best");
    els.score = root.querySelector("#tr-score");
    els.streak = root.querySelector("#tr-streak");
    els.letter = root.querySelector("#tr-letter");
    els.timer = root.querySelector("#tr-timer");
    els.feedback = root.querySelector("#tr-feedback");
    els.osk = root.querySelector("#tr-osk");
    els.winCode = root.querySelector("#tr-win-code");
    els.winLogin = root.querySelector("#tr-win-login");

    root.querySelector("#tr-start-heat").addEventListener("click", () => startSession("heat"));
    root.querySelector("#tr-start-practice").addEventListener("click", () => startSession("practice"));
    root.querySelector("#tr-quit").addEventListener("click", showMenu);
    root.querySelector("#tr-play-again").addEventListener("click", () => {
      els.win.hidden = true;
      showMenu();
    });

    root.querySelectorAll('input[name="tr-diff"]').forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          state.tier = input.value;
          saveTier(state.tier);
        }
      });
    });

    els.osk.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-key]");
      if (!btn || state.mode !== "play") return;
      handleInput(btn.dataset.key);
    });

    window.addEventListener("keydown", onKeydown);
  }

  function onKeydown(e) {
    if (state.mode !== "play" || !els.win.hidden) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = String(e.key || "");
    if (key.length !== 1) return;
    const upper = key.toUpperCase();
    if (upper < "A" || upper > "Z") return;
    e.preventDefault();
    handleInput(upper);
  }

  function showMenu() {
    stopLoop();
    state.mode = "menu";
    els.menu.hidden = false;
    els.play.hidden = true;
    els.win.hidden = true;
    state.tier = loadTier();
    state.bestStreak = loadBest();
    els.best.textContent = String(state.bestStreak);
    document.querySelectorAll('input[name="tr-diff"]').forEach((input) => {
      input.checked = input.value === state.tier;
    });
    updateOskVisibility();
  }

  function updateOskVisibility() {
    const show = state.tier === "easy" || isTablet();
    els.osk.classList.toggle("is-visible", show);
    els.osk.classList.toggle("is-tablet", isTablet());
    if (state.tier === "hard" && !isTablet()) {
      els.osk.classList.remove("is-visible");
    }
  }

  function startSession(session) {
    state.session = session;
    state.tier = loadTier();
    state.correct = 0;
    state.streak = 0;
    state.retrySame = false;
    state.mode = "play";
    els.menu.hidden = true;
    els.play.hidden = false;
    els.win.hidden = true;
    els.feedback.textContent = session === "practice" ? "Practice mode - no unlock progress." : "Go!";
    updateOskVisibility();
    renderHud();
    spawnLetter(true);
    startLoop();
  }

  function spawnLetter(fresh) {
    if (fresh || !state.retrySame) {
      state.letter = pickLetter();
    }
    state.retrySame = false;
    const cfg = TIER[state.tier] || TIER.easy;
    state.duration = state.session === "practice" ? 999999 : cfg.ms;
    state.deadline = performance.now() + state.duration;
    els.letter.textContent = state.letter;
    els.letter.classList.remove("is-miss", "is-hit");
    els.timer.style.transform = "scaleX(1)";
    els.timer.classList.remove("is-low");
  }

  function renderHud() {
    if (state.session === "practice") {
      els.score.innerHTML = `Correct: <strong>${state.correct}</strong>`;
    } else {
      els.score.innerHTML = `Correct: <strong>${state.correct}</strong> / <strong>${HEAT_TARGET}</strong>`;
    }
    els.streak.innerHTML = `Streak: <strong>${state.streak}</strong>`;
  }

  function startLoop() {
    stopLoop();
    const tick = (now) => {
      if (state.mode !== "play") return;
      if (state.session !== "practice") {
        const left = Math.max(0, state.deadline - now);
        const ratio = left / state.duration;
        els.timer.style.transform = `scaleX(${ratio})`;
        els.timer.classList.toggle("is-low", ratio < 0.25);
        if (left <= 0) {
          onMiss("Time!");
          return;
        }
      } else {
        els.timer.style.transform = "scaleX(1)";
      }
      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
  }

  function handleInput(letter) {
    if (state.mode !== "play") return;
    if (letter === state.letter) {
      state.correct += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) {
        state.bestStreak = state.streak;
        saveBest(state.bestStreak);
      }
      els.letter.classList.add("is-hit");
      els.feedback.textContent =
        state.streak > 0 && state.streak % 5 === 0
          ? `Streak ${state.streak}!`
          : "Nice!";
      renderHud();
      if (state.session === "heat" && state.correct >= HEAT_TARGET) {
        stopLoop();
        showWin();
        return;
      }
      spawnLetter(true);
      return;
    }
    onMiss("Wrong key");
  }

  function onMiss(msg) {
    els.letter.classList.add("is-miss");
    els.feedback.textContent = msg;
    state.streak = 0;
    renderHud();
    if (state.retrySame) {
      state.retrySame = false;
      spawnLetter(true);
    } else {
      state.retrySame = true;
      spawnLetter(false);
    }
    startLoop();
  }

  function showWin() {
    const code =
      window.KIDS_UNLOCKS?.getRewardCode?.("typing-race") || "SORT-COLOR-6";
    window.KIDS_UNLOCKS?.markCleared?.("typing-race");
    els.winCode.textContent = code;
    els.winLogin.textContent = `LOGIN ${code}`;
    els.win.hidden = false;
    state.mode = "win";
  }

  window.initTypingRace = function initTypingRace() {
    const root = document.getElementById("typing-race-root");
    if (!root) return;
    buildUi(root);
    showMenu();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.initTypingRace?.());
  } else {
    window.initTypingRace?.();
  }
})();
