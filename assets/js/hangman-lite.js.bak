/** Hangman Lite - dragon words + limp stickman */
(function () {
  "use strict";

  const DIFF_KEY = "ldp-hangman-lite-difficulty";
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const LENGTH_BIAS = {
    easy: [3, 4, 4, 4, 4],
    normal: [4, 4, 5, 5, 6],
    hard: [6, 6, 7, 7, 8],
  };

  const PART_ORDER = ["head", "body", "arm-l", "arm-r", "leg-l", "leg-r"];

  const state = {
    mode: "menu",
    tier: "normal",
    wordsSolved: 0,
    runWords: [],
    wordIndex: 0,
    text: "",
    category: "",
    revealed: [],
    guessed: new Set(),
    wrongCount: 0,
    maxMisses: 6,
    hintShown: false,
    limp: false,
  };

  const els = {};

  function loadTier() {
    try {
      const v = localStorage.getItem(DIFF_KEY);
      if (v === "easy" || v === "normal" || v === "hard") return v;
    } catch {
      /* ignore */
    }
    return "normal";
  }

  function saveTier(tier) {
    try {
      localStorage.setItem(DIFF_KEY, tier);
    } catch {
      /* ignore */
    }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function tierConfig() {
    return window.HANGMAN_LITE_TIERS[state.tier] || window.HANGMAN_LITE_TIERS.normal;
  }

  function pickRunWords() {
    const pool = (window.HANGMAN_LITE_WORDS || []).filter((w) =>
      (w.tiers || []).includes(state.tier)
    );
    const biases = LENGTH_BIAS[state.tier] || LENGTH_BIAS.normal;
    const used = new Set();
    const picked = [];

    for (const targetLen of biases) {
      let candidates = pool.filter(
        (w) => !used.has(w.id) && w.text.length === targetLen
      );
      if (!candidates.length) {
        candidates = pool.filter(
          (w) =>
            !used.has(w.id) &&
            Math.abs(w.text.length - targetLen) <= 1 &&
            w.text.length <= tierConfig().maxLength
        );
      }
      if (!candidates.length) {
        candidates = pool.filter((w) => !used.has(w.id));
      }
      if (!candidates.length) break;
      const choice = shuffle(candidates)[0];
      used.add(choice.id);
      picked.push(choice);
    }

    while (picked.length < (window.HANGMAN_LITE_RUN_SIZE || 5) && pool.length) {
      const rest = shuffle(pool.filter((w) => !used.has(w.id)));
      if (!rest.length) break;
      used.add(rest[0].id);
      picked.push(rest[0]);
    }

    return picked;
  }

  function gallowsSvg() {
    return `
      <svg viewBox="0 0 120 160" aria-hidden="true">
        <line x1="20" y1="150" x2="100" y2="150" stroke="#9bb88a" stroke-width="4" />
        <line x1="36" y1="150" x2="36" y2="18" stroke="#9bb88a" stroke-width="4" />
        <line x1="36" y1="18" x2="78" y2="18" stroke="#9bb88a" stroke-width="4" />
        <line x1="78" y1="18" x2="78" y2="36" stroke="#9bb88a" stroke-width="3" />
        <circle class="hl-part hl-head" data-part="head" cx="78" cy="48" r="12" />
        <line class="hl-part hl-body hl-limb" data-part="body" x1="78" y1="60" x2="78" y2="98" />
        <line class="hl-part hl-arm-l hl-limb" data-part="arm-l" x1="78" y1="70" x2="58" y2="88" />
        <line class="hl-part hl-arm-r hl-limb" data-part="arm-r" x1="78" y1="70" x2="98" y2="88" />
        <line class="hl-part hl-leg-l hl-limb" data-part="leg-l" x1="78" y1="98" x2="62" y2="124" />
        <line class="hl-part hl-leg-r hl-limb" data-part="leg-r" x1="78" y1="98" x2="94" y2="124" />
      </svg>`;
  }

  function buildUi(root) {
    root.innerHTML = `
      <div class="hangman-menu" id="hl-menu">
        <p class="hangman-eyebrow">Laughing Dragons Games</p>
        <h2>Hangman Lite</h2>
        <p>Guess dragon words letter by letter. Miss too often and the stickman goes limp.</p>
        <fieldset class="hangman-difficulty" id="hl-difficulty">
          <legend>Difficulty</legend>
          <label class="hangman-radio"><input type="radio" name="hl-diff" value="easy" /> Easy</label>
          <label class="hangman-radio"><input type="radio" name="hl-diff" value="normal" checked /> Normal</label>
          <label class="hangman-radio"><input type="radio" name="hl-diff" value="hard" /> Hard</label>
        </fieldset>
        <div class="hangman-actions">
          <button type="button" class="btn btn-primary" id="hl-start-run">Start Word Run</button>
          <button type="button" class="btn" id="hl-start-free">Free Play</button>
        </div>
      </div>

      <div class="hangman-play" id="hl-play" hidden>
        <div class="hangman-hud">
          <p id="hl-progress">Words: <strong>0</strong> / <strong>5</strong></p>
          <p id="hl-misses">Misses left: <strong>6</strong></p>
          <p id="hl-category"></p>
          <button type="button" class="btn" id="hl-quit">Menu</button>
        </div>
        <div class="hangman-stage">
          <div class="hangman-gallows" id="hl-gallows">${gallowsSvg()}</div>
          <div class="hangman-word-panel">
            <div class="hangman-word" id="hl-word" aria-live="polite"></div>
            <p class="hangman-feedback" id="hl-feedback" aria-live="polite"></p>
            <p class="hangman-guessed" id="hl-guessed"></p>
          </div>
        </div>
        <div class="hangman-keys" id="hl-keys" role="group" aria-label="Letter keyboard"></div>
      </div>

      <div class="hangman-win" id="hl-win" hidden>
        <div class="hangman-win-card" role="dialog" aria-labelledby="hl-win-title">
          <h2 id="hl-win-title">Word wizard!</h2>
          <p>You solved 5 dragon words letter by letter.</p>
          <section>
            <p>Your code:</p>
            <code class="hangman-win-code" id="hl-win-code">WHACK-GRID-10</code>
            <p>Type <strong id="hl-win-login">LOGIN WHACK-GRID-10</strong> in
              <a href="/games/terminal/">Terminal Trainer</a> to unlock Whack-a-Fruit.</p>
          </section>
          <div class="hangman-win-actions">
            <a class="btn btn-primary" href="/games/">Back to Games</a>
            <button type="button" class="btn" id="hl-play-again">Play again</button>
          </div>
        </div>
      </div>
    `;

    els.menu = root.querySelector("#hl-menu");
    els.play = root.querySelector("#hl-play");
    els.win = root.querySelector("#hl-win");
    els.progress = root.querySelector("#hl-progress");
    els.misses = root.querySelector("#hl-misses");
    els.category = root.querySelector("#hl-category");
    els.gallows = root.querySelector("#hl-gallows");
    els.word = root.querySelector("#hl-word");
    els.feedback = root.querySelector("#hl-feedback");
    els.guessed = root.querySelector("#hl-guessed");
    els.keys = root.querySelector("#hl-keys");
    els.winCode = root.querySelector("#hl-win-code");
    els.winLogin = root.querySelector("#hl-win-login");

    LETTERS.forEach((letter) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hangman-key";
      btn.textContent = letter;
      btn.dataset.letter = letter;
      btn.setAttribute("aria-label", `Letter ${letter}`);
      btn.addEventListener("click", () => guessLetter(letter));
      els.keys.appendChild(btn);
    });

    root.querySelector("#hl-start-run").addEventListener("click", () => startSession("run"));
    root.querySelector("#hl-start-free").addEventListener("click", () => startSession("free"));
    root.querySelector("#hl-quit").addEventListener("click", showMenu);
    root.querySelector("#hl-play-again").addEventListener("click", () => {
      els.win.hidden = true;
      showMenu();
    });

    root.querySelectorAll('input[name="hl-diff"]').forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          state.tier = input.value;
          saveTier(state.tier);
        }
      });
    });

    window.addEventListener("keydown", onKeydown);
  }

  function onKeydown(e) {
    if (state.mode !== "play" || !els.win.hidden) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = String(e.key || "").toUpperCase();
    if (key.length === 1 && key >= "A" && key <= "Z") {
      e.preventDefault();
      guessLetter(key);
    }
  }

  function showMenu() {
    state.mode = "menu";
    els.menu.hidden = false;
    els.play.hidden = true;
    els.win.hidden = true;
    const tier = loadTier();
    state.tier = tier;
    rootDiffRadios(tier);
  }

  function rootDiffRadios(tier) {
    document.querySelectorAll('input[name="hl-diff"]').forEach((input) => {
      input.checked = input.value === tier;
    });
  }

  function startSession(mode) {
    state.mode = "play";
    state.sessionMode = mode;
    state.tier = loadTier();
    state.wordsSolved = 0;
    state.wordIndex = 0;
    state.usedWordIds = new Set();
    state.runWords = mode === "run" ? pickRunWords() : [];
    els.menu.hidden = true;
    els.play.hidden = false;
    els.win.hidden = true;
    beginWord(state.runWords[0] || pickRandomWord());
  }

  function wordPool() {
    return (window.HANGMAN_LITE_WORDS || []).filter((w) =>
      (w.tiers || []).includes(state.tier)
    );
  }

  function pickRandomWord() {
    const pool = wordPool();
    const fallback = { text: "DRAGON", category: "Dragon", id: "dragon" };
    if (!pool.length) return fallback;

    let candidates = pool.filter(
      (w) => w.text !== state.text && !state.usedWordIds.has(w.id)
    );
    if (!candidates.length) {
      candidates = pool.filter((w) => w.text !== state.text);
    }
    if (!candidates.length) candidates = pool;

    return shuffle(candidates)[0] || fallback;
  }

  function beginWord(entry) {
    const cfg = tierConfig();
    state.text = String(entry.text || "").toUpperCase();
    state.category = entry.category || "";
    if (entry.id) state.usedWordIds.add(entry.id);
    state.revealed = state.text.split("").map(() => false);
    state.guessed = new Set();
    state.wrongCount = 0;
    state.maxMisses = cfg.misses;
    state.hintShown = false;
    state.limp = false;
    els.gallows.classList.remove("is-limp");
    els.gallows.querySelectorAll(".hl-part").forEach((p) => p.classList.remove("is-shown"));
    els.keys.querySelectorAll(".hangman-key").forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("is-correct", "is-wrong");
    });
    setFeedback("");
    renderHud();
    renderWord();
    renderGuessed();
    renderParts();
  }

  function renderHud() {
    const runSize = window.HANGMAN_LITE_RUN_SIZE || 5;
    if (state.sessionMode === "free") {
      els.progress.innerHTML = "Free Play";
    } else {
      els.progress.innerHTML = `Words: <strong>${state.wordsSolved}</strong> / <strong>${runSize}</strong>`;
    }
    els.misses.innerHTML = `Misses left: <strong>${Math.max(0, state.maxMisses - state.wrongCount)}</strong>`;
    const cfg = tierConfig();
    if (cfg.showCategory && state.category) {
      els.category.textContent = state.category;
    } else {
      els.category.textContent = "";
    }
  }

  function renderWord() {
    els.word.innerHTML = "";
    state.text.split("").forEach((ch, i) => {
      const slot = document.createElement("span");
      slot.className = "hangman-slot";
      if (state.revealed[i]) {
        slot.textContent = ch;
        if (state.hintShown && i === 0 && !state.guessed.has(ch)) {
          slot.classList.add("is-hint");
        }
      } else {
        slot.textContent = "";
      }
      els.word.appendChild(slot);
    });
  }

  function renderGuessed() {
    const wrong = [...state.guessed].filter((l) => !state.text.includes(l)).sort();
    els.guessed.textContent = wrong.length ? `Guessed: ${wrong.join(", ")}` : "";
  }

  function renderParts() {
    const steps = PART_ORDER.length;
    const visible = Math.min(
      steps,
      Math.ceil((state.wrongCount / state.maxMisses) * steps)
    );
    PART_ORDER.forEach((name, i) => {
      const el = els.gallows.querySelector(`[data-part="${name}"]`);
      if (el) el.classList.toggle("is-shown", i < visible);
    });
  }

  function setFeedback(msg, bad) {
    els.feedback.textContent = msg || "";
    els.feedback.classList.toggle("is-bad", !!bad);
  }

  function guessLetter(letter) {
    if (state.mode !== "play" || state.limp) return;
    if (state.guessed.has(letter)) return;

    state.guessed.add(letter);
    const btn = els.keys.querySelector(`[data-letter="${letter}"]`);
    if (btn) btn.disabled = true;

    if (state.text.includes(letter)) {
      if (btn) btn.classList.add("is-correct");
      state.text.split("").forEach((ch, i) => {
        if (ch === letter) state.revealed[i] = true;
      });
      setFeedback(`Yes! ${letter} is in the word!`);
      renderWord();
      renderGuessed();
      if (state.revealed.every(Boolean)) onWordSolved();
      return;
    }

    if (btn) btn.classList.add("is-wrong");
    state.wrongCount += 1;
    setFeedback("Not in this word.", true);
    renderHud();
    renderGuessed();
    renderParts();

    const cfg = tierConfig();
    if (
      cfg.hintAfterWrong &&
      state.wrongCount >= cfg.hintAfterWrong &&
      !state.hintShown &&
      !state.revealed[0]
    ) {
      state.hintShown = true;
      state.revealed[0] = true;
      setFeedback("Here's the first letter!");
      renderWord();
      if (state.revealed.every(Boolean)) {
        onWordSolved();
        return;
      }
    }

    if (state.wrongCount >= state.maxMisses) onWordFailed();
  }

  function onWordSolved() {
    setFeedback(`You got it - ${state.text}!`);
    state.wordsSolved += 1;
    renderHud();

    if (state.sessionMode === "free") {
      setTimeout(() => beginWord(pickRandomWord()), 900);
      return;
    }

    const runSize = window.HANGMAN_LITE_RUN_SIZE || 5;
    if (state.wordsSolved >= runSize) {
      setTimeout(showWin, 700);
      return;
    }

    state.wordIndex += 1;
    setTimeout(() => {
      beginWord(state.runWords[state.wordIndex]);
    }, 900);
  }

  function onWordFailed() {
    state.limp = true;
    els.gallows.classList.add("is-limp");
    setFeedback(`The word was ${state.text}. Next word…`, true);
    setTimeout(() => beginWord(pickRandomWord()), 1400);
  }

  function showWin() {
    const code =
      window.KIDS_UNLOCKS?.getRewardCode?.("hangman-lite") || "WHACK-GRID-10";
    window.KIDS_UNLOCKS?.markCleared?.("hangman-lite");
    els.winCode.textContent = code;
    els.winLogin.textContent = `LOGIN ${code}`;
    els.win.hidden = false;
    state.mode = "win";
  }

  window.initHangmanLite = function initHangmanLite() {
    const root = document.getElementById("hangman-lite-root");
    if (!root) return;
    buildUi(root);
    showMenu();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.initHangmanLite?.());
  } else {
    window.initHangmanLite?.();
  }
})();
