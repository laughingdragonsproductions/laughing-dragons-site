/** Fruit Search — I-Spy Fruit Friends */
(function () {
  "use strict";

  const ASSET_BASE = "/assets/kids/games/fruit-search";
  const CHARACTER_IMG = (letter) => `/assets/kids/characters/${letter.toLowerCase()}.png`;
  const FINDS_TO_CLEAR = 5;
  const MODE_KEY = "ldp-fruit-search-mode";
  const MAP_KEY = "ldp-fruit-search-map";

  const CHARACTERS = [
    { letter: "A", name: "Adam the Apple" },
    { letter: "B", name: "Benjamin the Banana" },
    { letter: "C", name: "Cheri the Cherry" },
    { letter: "D", name: "Drago the Dragon Fruit" },
    { letter: "E", name: "Eggy P the Eggplant" },
    { letter: "F", name: "Ficus the Fig" },
    { letter: "G", name: "Gary the Garlic" },
    { letter: "H", name: "Harry the Huckleberry" },
    { letter: "I", name: "Ikumi the Imbe" },
    { letter: "J", name: "Julio the Jalapeño" },
    { letter: "K", name: "Kelsey the Kiwi" },
    { letter: "L", name: "Lonnie the Lemon" },
    { letter: "M", name: "Manny the Mango" },
    { letter: "N", name: "Natalie the Nectarine" },
    { letter: "O", name: "Oscar the Orange" },
    { letter: "P", name: "Perry the Pear" },
    { letter: "Q", name: "Quinn the Quinoa" },
    { letter: "R", name: "Riley the Raddish" },
    { letter: "S", name: "Sherry the Strawberry" },
    { letter: "T", name: "Tom the Tomato" },
    { letter: "U", name: "Uriel the Ube" },
    { letter: "V", name: "Verra the Vanilla" },
    { letter: "W", name: "Walter the Wasabi" },
    { letter: "X", name: "Xena the Xigua" },
    { letter: "Y", name: "Yevette the Yam" },
    { letter: "Z", name: "Zackary the Zucchini" },
  ];

  const LEVELS = [
    {
      id: "easy",
      name: "Easy Orchard",
      map: `${ASSET_BASE}/maps/map-1.png`,
      crowdMin: 6,
      crowdMax: 8,
      spriteScalePercent: 14,
      spawns: [
        { x: 12, y: 28 },
        { x: 28, y: 55 },
        { x: 45, y: 22 },
        { x: 58, y: 62 },
        { x: 72, y: 35 },
        { x: 85, y: 58 },
        { x: 38, y: 72 },
        { x: 18, y: 78 },
      ],
    },
    {
      id: "medium",
      name: "Busy Market",
      map: `${ASSET_BASE}/maps/map-2.png`,
      crowdMin: 10,
      crowdMax: 14,
      spriteScalePercent: 10,
      spawns: [
        { x: 8, y: 20 },
        { x: 18, y: 48 },
        { x: 28, y: 30 },
        { x: 35, y: 68 },
        { x: 42, y: 18 },
        { x: 48, y: 52 },
        { x: 55, y: 78 },
        { x: 62, y: 28 },
        { x: 70, y: 55 },
        { x: 78, y: 22 },
        { x: 85, y: 65 },
        { x: 92, y: 40 },
        { x: 22, y: 82 },
        { x: 50, y: 40 },
      ],
    },
    {
      id: "hard",
      name: "Hidden Grove",
      map: `${ASSET_BASE}/maps/map-3.png`,
      crowdMin: 16,
      crowdMax: 22,
      spriteScalePercent: 7,
      spawns: [
        { x: 6, y: 18 },
        { x: 12, y: 42 },
        { x: 16, y: 68 },
        { x: 22, y: 28 },
        { x: 28, y: 55 },
        { x: 34, y: 15 },
        { x: 38, y: 78 },
        { x: 44, y: 36 },
        { x: 48, y: 58 },
        { x: 52, y: 22 },
        { x: 56, y: 72 },
        { x: 62, y: 44 },
        { x: 66, y: 18 },
        { x: 70, y: 62 },
        { x: 74, y: 32 },
        { x: 78, y: 78 },
        { x: 82, y: 48 },
        { x: 86, y: 24 },
        { x: 90, y: 58 },
        { x: 94, y: 38 },
        { x: 40, y: 48 },
        { x: 60, y: 68 },
      ],
    },
  ];

  const charByLetter = Object.fromEntries(CHARACTERS.map((c) => [c.letter, c]));

  const els = {};
  const prefs = { mode: "name", mapId: "easy" };
  const state = {
    finds: 0,
    lock: false,
    level: LEVELS[0],
    placements: [],
    targetLetter: "A",
    lastTarget: null,
  };

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function getLevel(id) {
    return LEVELS.find((lvl) => lvl.id === id) || LEVELS[0];
  }

  function loadPrefs() {
    const storedMode = localStorage.getItem(MODE_KEY);
    if (storedMode === "name" || storedMode === "letter") {
      prefs.mode = storedMode;
    }
    const storedMap = localStorage.getItem(MAP_KEY);
    if (LEVELS.some((lvl) => lvl.id === storedMap)) {
      prefs.mapId = storedMap;
    }
  }

  function savePrefs() {
    localStorage.setItem(MODE_KEY, prefs.mode);
    localStorage.setItem(MAP_KEY, prefs.mapId);
  }

  function announce(message) {
    if (!els.srAnnounce) return;
    els.srAnnounce.textContent = "";
    requestAnimationFrame(() => {
      els.srAnnounce.textContent = message;
    });
  }

  function setStatus(message) {
    if (els.status) els.status.textContent = message;
  }

  function getCharacter(letter) {
    return charByLetter[letter] || { letter, name: letter };
  }

  function buildCrowd(level) {
    const count = Math.min(
      randomInt(level.crowdMin, level.crowdMax),
      level.spawns.length
    );
    const letters = shuffle(CHARACTERS.map((c) => c.letter)).slice(0, count);
    const slots = shuffle(level.spawns).slice(0, count);
    return slots.map((slot, index) => ({
      letter: letters[index],
      x: slot.x,
      y: slot.y,
    }));
  }

  function pickTarget() {
    const pool = state.placements.map((p) => p.letter);
    if (pool.length === 1) return pool[0];
    let next = pool[Math.floor(Math.random() * pool.length)];
    let guard = 0;
    while (next === state.lastTarget && guard < 12) {
      next = pool[Math.floor(Math.random() * pool.length)];
      guard += 1;
    }
    return next;
  }

  function promptForTarget(letter) {
    const ch = getCharacter(letter);
    if (prefs.mode === "letter") {
      return `Find the fruit that starts with <strong>${letter}</strong>!`;
    }
    return `Find <strong>${ch.name}</strong>!`;
  }

  function updateHud() {
    if (els.score) els.score.textContent = String(state.finds);
    if (els.prompt) {
      els.prompt.innerHTML = promptForTarget(state.targetLetter);
    }
    if (els.targetPortrait) {
      const ch = getCharacter(state.targetLetter);
      els.targetPortrait.src = CHARACTER_IMG(ch.letter);
      els.targetPortrait.alt = ch.name;
    }
    if (els.targetLetterBadge) {
      els.targetLetterBadge.textContent = state.targetLetter;
      const showLetter = prefs.mode === "letter";
      els.targetLetterBadge.hidden = !showLetter;
      els.targetLetterBadge.setAttribute("aria-hidden", showLetter ? "false" : "true");
    }
    if (els.modeName) els.modeName.checked = prefs.mode === "name";
    if (els.modeLetter) els.modeLetter.checked = prefs.mode === "letter";
    if (els.mapSelect) els.mapSelect.value = prefs.mapId;
    if (els.levelLabel) {
      els.levelLabel.textContent = state.level.name;
    }
  }

  function renderSprites() {
    if (!els.spriteLayer) return;
    els.spriteLayer.replaceChildren();
    const scale = state.level.spriteScalePercent;

    state.placements.forEach((placement) => {
      const ch = getCharacter(placement.letter);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fruit-search-sprite";
      btn.dataset.letter = placement.letter;
      btn.style.left = `${placement.x}%`;
      btn.style.top = `${placement.y}%`;
      btn.style.width = `${scale}%`;
      btn.style.setProperty("--sprite-scale", `${scale}%`);
      btn.setAttribute(
        "aria-label",
        prefs.mode === "letter" ? `Fruit friend ${placement.letter}` : ch.name
      );
      btn.innerHTML = `<img src="${CHARACTER_IMG(ch.letter)}" alt="" draggable="false" />`;
      btn.addEventListener("click", () => onSpriteClick(btn, placement.letter));
      els.spriteLayer.appendChild(btn);
    });
  }

  function renderStage() {
    if (els.stageMap) {
      els.stageMap.src = state.level.map;
    }
    renderSprites();
    updateHud();
  }

  function onSpriteClick(btn, letter) {
    if (state.lock) return;

    if (letter === state.targetLetter) {
      state.lock = true;
      btn.classList.add("is-found");
      const ch = getCharacter(letter);
      announce(`Found ${ch.name}!`);
      setStatus(`Nice! You found ${ch.name}.`);

      window.setTimeout(() => {
        state.finds += 1;
        updateHud();

        if (state.finds >= FINDS_TO_CLEAR) {
          showWin();
          state.lock = false;
          return;
        }

        state.lastTarget = state.targetLetter;
        state.targetLetter = pickTarget();
        updateHud();
        setStatus("Keep looking for the next friend!");
        state.lock = false;
      }, 520);
      return;
    }

    btn.classList.add("is-wrong");
    announce("Not that friend — keep looking!");
    setStatus("Not that friend — keep looking!");
    window.setTimeout(() => btn.classList.remove("is-wrong"), 480);
  }

  function startRound() {
    hideWin();
    state.level = getLevel(prefs.mapId);
    state.finds = 0;
    state.lock = false;
    state.placements = buildCrowd(state.level);
    state.lastTarget = null;
    state.targetLetter = pickTarget();
    renderStage();
    setStatus("Tap the Fruit Friend shown in the prompt.");
    announce("New round started");
  }

  function showWin() {
    const rewards = window.KIDS_REWARDS?.fruitSearch || {};
    window.KIDS_UNLOCKS?.markCleared?.("fruit-search");

    if (els.winFinds) {
      els.winFinds.textContent = String(FINDS_TO_CLEAR);
    }
    if (els.winUnlockGameName) {
      els.winUnlockGameName.textContent = rewards.unlocksGameTitle || "Alphabet Trace";
    }
    if (els.winUnlockCode) {
      els.winUnlockCode.textContent =
        rewards.rewardCode || window.KIDS_UNLOCKS?.getRewardCode?.("fruit-search") || "TRACE-A-Z-4";
    }
    if (els.winUnlockLink) {
      els.winUnlockLink.href = rewards.unlocksGameHref || "/games/#more-games";
    }

    if (els.win) els.win.hidden = false;
    announce(`Round cleared! Code: ${els.winUnlockCode?.textContent || "TRACE-A-Z-4"}`);
    setStatus("You found them all!");
  }

  function hideWin() {
    if (els.win) els.win.hidden = true;
  }

  function bindControls() {
    els.modeName?.addEventListener("change", () => {
      if (!els.modeName.checked) return;
      prefs.mode = "name";
      savePrefs();
      updateHud();
      renderSprites();
    });

    els.modeLetter?.addEventListener("change", () => {
      if (!els.modeLetter.checked) return;
      prefs.mode = "letter";
      savePrefs();
      updateHud();
      renderSprites();
    });

    els.mapSelect?.addEventListener("change", () => {
      prefs.mapId = els.mapSelect.value;
      savePrefs();
      startRound();
    });

    els.newRoundBtn?.addEventListener("click", startRound);
    els.playAgainBtn?.addEventListener("click", startRound);

    els.win?.addEventListener("click", (event) => {
      if (event.target === els.win) hideWin();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && els.win && !els.win.hidden) {
        hideWin();
      }
    });
  }

  function cacheElements(root) {
    els.root = root;
    els.prompt = root.querySelector("#fruit-search-prompt");
    els.score = root.querySelector("#fruit-search-score");
    els.targetPortrait = root.querySelector("#fruit-search-target-portrait");
    els.targetLetterBadge = root.querySelector("#fruit-search-target-letter");
    els.levelLabel = root.querySelector("#fruit-search-level-label");
    els.stageMap = root.querySelector("#fruit-search-map");
    els.spriteLayer = root.querySelector("#fruit-search-sprites");
    els.status = root.querySelector("#fruit-search-status");
    els.modeName = root.querySelector("#fruit-search-mode-name");
    els.modeLetter = root.querySelector("#fruit-search-mode-letter");
    els.mapSelect = root.querySelector("#fruit-search-map-select");
    els.newRoundBtn = root.querySelector("#fruit-search-new-round");

    els.win = document.getElementById("fruit-search-win");
    els.winFinds = document.getElementById("fruit-search-win-finds");
    els.winUnlockGameName = document.getElementById("fruit-search-win-unlock-game");
    els.winUnlockCode = document.getElementById("fruit-search-win-unlock-code");
    els.winUnlockLink = document.getElementById("fruit-search-win-unlock-link");
    els.playAgainBtn = document.getElementById("fruit-search-play-again");
    els.srAnnounce = document.getElementById("fruit-search-sr-announce");
  }

  function initFruitSearch() {
    const root = document.getElementById("fruit-search-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fruit-search-app">
        <header class="fruit-search-hud">
          <div class="fruit-search-target">
            <img
              class="fruit-search-target-portrait"
              id="fruit-search-target-portrait"
              src="${CHARACTER_IMG("A")}"
              alt="Target Fruit Friend"
              width="96"
              height="96"
            />
            <span class="fruit-search-target-letter" id="fruit-search-target-letter" hidden aria-hidden="true">A</span>
          </div>
          <div class="fruit-search-hud-main">
            <p class="fruit-search-prompt" id="fruit-search-prompt">Find the Fruit Friend!</p>
            <p class="fruit-search-score">Finds: <strong id="fruit-search-score">0</strong> / ${FINDS_TO_CLEAR}</p>
            <p class="fruit-search-level">Map: <strong id="fruit-search-level-label">Easy Orchard</strong></p>
          </div>
          <div class="fruit-search-controls">
            <fieldset class="fruit-search-fieldset">
              <legend class="visually-hidden">Prompt mode</legend>
              <label class="fruit-search-radio">
                <input type="radio" name="fruit-search-mode" value="name" id="fruit-search-mode-name" checked />
                <span>Name</span>
              </label>
              <label class="fruit-search-radio">
                <input type="radio" name="fruit-search-mode" value="letter" id="fruit-search-mode-letter" />
                <span>Letter</span>
              </label>
            </fieldset>
            <label class="fruit-search-map-pick">
              <span class="visually-hidden">Map difficulty</span>
              <select id="fruit-search-map-select" aria-label="Map difficulty">
                <option value="easy">Easy Orchard</option>
                <option value="medium">Busy Market</option>
                <option value="hard">Hidden Grove</option>
              </select>
            </label>
            <button type="button" class="btn" id="fruit-search-new-round">New round</button>
          </div>
        </header>

        <div class="fruit-search-stage-wrap">
          <div class="fruit-search-stage" id="fruit-search-stage">
            <img
              class="fruit-search-map"
              id="fruit-search-map"
              src="${ASSET_BASE}/maps/map-1.png"
              alt=""
              width="1672"
              height="941"
            />
            <div class="fruit-search-sprites" id="fruit-search-sprites" aria-hidden="false"></div>
          </div>
        </div>

        <p class="fruit-search-status" id="fruit-search-status" aria-live="polite">Tap the Fruit Friend shown in the prompt.</p>
      </div>
    `;

    cacheElements(root);
    loadPrefs();
    bindControls();
    startRound();
  }

  window.initFruitSearch = initFruitSearch;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFruitSearch);
  } else {
    initFruitSearch();
  }
})();
