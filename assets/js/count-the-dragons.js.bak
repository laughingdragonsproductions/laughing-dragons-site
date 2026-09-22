/** Count the Dragons - dragons hidden in Fruit Search crowds */
(function () {
  "use strict";

  const DIFF_KEY = "ldp-count-dragons-difficulty";
  const MIN_GAP = 14;

  const state = {
    mode: "menu",
    session: "round",
    tier: "easy",
    correctRounds: 0,
    answer: 0,
    lastN: 0,
    hardHintShown: false,
  };

  const els = {};

  function data() {
    return window.COUNT_DRAGONS_DATA || { ROUND_SIZE: 10, CHARACTERS: [], TIERS: {}, SCENES: {} };
  }

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

  function tierCfg() {
    return data().TIERS[state.tier] || data().TIERS.easy;
  }

  function sceneCfg() {
    return data().SCENES?.[state.tier] || data().SCENES?.easy || {};
  }

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function buildUi(root) {
    root.innerHTML = `
      <div class="ctd-menu" id="ctd-menu">
        <p class="ctd-eyebrow">Laughing Dragons Games</p>
        <h2>Count the Dragons</h2>
        <p>Find the laughing dragons hiding in busy Fruit Search scenes. Tap the matching number.</p>
        <fieldset class="ctd-difficulty">
          <legend>Difficulty</legend>
          <label class="ctd-radio"><input type="radio" name="ctd-diff" value="easy" checked /> Easy (1-5)</label>
          <label class="ctd-radio"><input type="radio" name="ctd-diff" value="normal" /> Normal (1-10)</label>
          <label class="ctd-radio"><input type="radio" name="ctd-diff" value="hard" /> Hard (+ decoys)</label>
        </fieldset>
        <div class="ctd-actions">
          <button type="button" class="btn btn-primary" id="ctd-start-round">Start Count Round</button>
          <button type="button" class="btn" id="ctd-start-practice">Practice</button>
        </div>
      </div>

      <div class="ctd-play" id="ctd-play" hidden>
        <div class="ctd-hud">
          <p id="ctd-progress">Round: <strong>0</strong> / <strong>10</strong></p>
          <button type="button" class="btn" id="ctd-quit">Menu</button>
        </div>
        <p class="ctd-prompt">How many <strong>dragons</strong> do you see?</p>
        <p class="ctd-hint" id="ctd-hint" hidden>Only laughing dragons count - Fruit Friends are just background!</p>
        <div class="ctd-scene" id="ctd-scene" aria-label="Counting scene">
          <img class="ctd-map" id="ctd-map" alt="" />
          <div class="ctd-crowd" id="ctd-crowd" aria-hidden="true"></div>
          <div class="ctd-dragons" id="ctd-dragons"></div>
        </div>
        <p class="ctd-feedback" id="ctd-feedback" aria-live="polite"></p>
        <div class="ctd-pad" id="ctd-pad" role="group" aria-label="Number pad"></div>
      </div>

      <div class="ctd-win" id="ctd-win" hidden>
        <div class="ctd-win-card" role="dialog" aria-labelledby="ctd-win-title">
          <h2 id="ctd-win-title">Counting champ!</h2>
          <p>You counted 10 rounds of dragons.</p>
          <p>Your code:</p>
          <code class="ctd-win-code" id="ctd-win-code">SIMON-GLOW-8</code>
          <p>Type <strong id="ctd-win-login">LOGIN SIMON-GLOW-8</strong> in
            <a href="/games/terminal/">Terminal Trainer</a> to unlock Simon Says Light Pad.</p>
          <div class="ctd-win-actions">
            <a class="btn btn-primary" href="/games/">Back to Games</a>
            <button type="button" class="btn" id="ctd-play-again">Play again</button>
          </div>
        </div>
      </div>
    `;

    els.menu = root.querySelector("#ctd-menu");
    els.play = root.querySelector("#ctd-play");
    els.win = root.querySelector("#ctd-win");
    els.progress = root.querySelector("#ctd-progress");
    els.scene = root.querySelector("#ctd-scene");
    els.map = root.querySelector("#ctd-map");
    els.crowd = root.querySelector("#ctd-crowd");
    els.dragons = root.querySelector("#ctd-dragons");
    els.feedback = root.querySelector("#ctd-feedback");
    els.pad = root.querySelector("#ctd-pad");
    els.hint = root.querySelector("#ctd-hint");
    els.winCode = root.querySelector("#ctd-win-code");
    els.winLogin = root.querySelector("#ctd-win-login");

    root.querySelector("#ctd-start-round").addEventListener("click", () => startSession("round"));
    root.querySelector("#ctd-start-practice").addEventListener("click", () => startSession("practice"));
    root.querySelector("#ctd-quit").addEventListener("click", showMenu);
    root.querySelector("#ctd-play-again").addEventListener("click", () => {
      els.win.hidden = true;
      showMenu();
    });

    root.querySelectorAll('input[name="ctd-diff"]').forEach((input) => {
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
    const n = Number(e.key);
    if (!Number.isInteger(n) || n < 1) return;
    const max = tierCfg().padMax;
    if (n > max) return;
    e.preventDefault();
    guess(n);
  }

  function showMenu() {
    state.mode = "menu";
    els.menu.hidden = false;
    els.play.hidden = true;
    els.win.hidden = true;
    state.tier = loadTier();
    document.querySelectorAll('input[name="ctd-diff"]').forEach((input) => {
      input.checked = input.value === state.tier;
    });
  }

  function startSession(session) {
    state.session = session;
    state.tier = loadTier();
    state.correctRounds = 0;
    state.lastN = 0;
    state.hardHintShown = false;
    state.mode = "play";
    els.menu.hidden = true;
    els.play.hidden = false;
    els.win.hidden = true;
    els.feedback.textContent = "";
    els.feedback.classList.remove("is-bad");
    buildPad();
    renderHud();
    nextRound();
  }

  function buildPad() {
    const max = tierCfg().padMax;
    els.pad.innerHTML = "";
    for (let i = 1; i <= max; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ctd-pad-btn";
      btn.textContent = String(i);
      btn.setAttribute("aria-label", `Number ${i}`);
      btn.addEventListener("click", () => guess(i));
      els.pad.appendChild(btn);
    }
  }

  function renderHud() {
    const size = data().ROUND_SIZE || 10;
    if (state.session === "practice") {
      els.progress.innerHTML = `Practice · Solved: <strong>${state.correctRounds}</strong>`;
    } else {
      els.progress.innerHTML = `Round: <strong>${state.correctRounds}</strong> / <strong>${size}</strong>`;
    }
  }

  function buildCrowd(scene) {
    const letters = data().FRUIT_LETTERS || [];
    const imgFn = data().CHARACTER_IMG;
    const count = Math.min(
      randInt(scene.crowdMin, scene.crowdMax),
      scene.spawns.length
    );
    const pickedLetters = shuffle(letters).slice(0, count);
    const slots = shuffle(scene.spawns).slice(0, count);
    return slots.map((slot, index) => ({
      letter: pickedLetters[index],
      x: slot.x,
      y: slot.y,
      scale: scene.crowdScalePercent,
    }));
  }

  function placeDragonPoints(count, width, height, sizePx, crowdPoints) {
    const points = [];
    const pad = sizePx / 2 + 6;
    let attempts = 0;
    const minGap = MIN_GAP + sizePx * 0.25;

    while (points.length < count && attempts < count * 120) {
      attempts += 1;
      const x = randInt(pad, Math.max(pad, width - pad));
      const y = randInt(pad, Math.max(pad, height - pad));

      const okDragons = points.every((p) => Math.hypot(p.x - x, p.y - y) >= minGap);
      if (!okDragons) continue;

      const tooCloseCrowd = crowdPoints.some((p) => {
        const crowdPx = (p.scale / 100) * width * 0.5;
        const cx = p.xPct * width * 0.01;
        const cy = p.yPct * height * 0.01;
        return Math.hypot(cx - x, cy - y) < crowdPx * 0.35;
      });
      if (tooCloseCrowd && Math.random() > 0.35) continue;

      points.push({ x, y, rot: randInt(-18, 18) });
    }

    while (points.length < count) {
      points.push({
        x: randInt(pad, Math.max(pad, width - pad)),
        y: randInt(pad, Math.max(pad, height - pad)),
        rot: randInt(-18, 18),
      });
    }
    return points;
  }

  function renderCrowd(placements) {
    const imgFn = data().CHARACTER_IMG;
    els.crowd.replaceChildren();
    placements.forEach((p) => {
      const wrap = document.createElement("div");
      wrap.className = "ctd-crowd-sprite";
      wrap.style.left = `${p.x}%`;
      wrap.style.top = `${p.y}%`;
      wrap.style.width = `${p.scale}%`;
      wrap.style.transform = `translate(-50%, -50%) rotate(${randInt(-12, 12)}deg)`;
      const img = document.createElement("img");
      img.src = imgFn(p.letter);
      img.alt = "";
      img.draggable = false;
      wrap.appendChild(img);
      els.crowd.appendChild(wrap);
    });
  }

  function renderDragons(n, points, w, h, sizePx) {
    const chars = data().CHARACTERS || [];
    els.dragons.replaceChildren();

    for (let i = 0; i < n; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)] || chars[0];
      if (!char) continue;
      const p = points[i];
      const img = document.createElement("img");
      img.className = "ctd-sprite";
      img.src = char.sprite;
      img.alt = "";
      img.style.width = `${sizePx}px`;
      img.style.height = `${sizePx}px`;
      img.style.left = `${(p.x / w) * 100}%`;
      img.style.top = `${(p.y / h) * 100}%`;
      img.style.transform = `translate(-50%, -50%) rotate(${p.rot}deg)`;
      els.dragons.appendChild(img);
    }
  }

  function renderDecoys(count, points, w, h, startIndex) {
    for (let i = 0; i < count; i++) {
      const p = points[startIndex + i];
      if (!p) continue;
      const decoy = document.createElement("div");
      decoy.className =
        "ctd-decoy " + (i % 2 === 0 ? "ctd-decoy-cloud" : "ctd-decoy-rock");
      decoy.style.left = `${(p.x / w) * 100}%`;
      decoy.style.top = `${(p.y / h) * 100}%`;
      els.dragons.appendChild(decoy);
    }
  }

  function nextRound() {
    const cfg = tierCfg();
    const scene = sceneCfg();

    let n = randInt(cfg.min, cfg.max);
    if (n === state.lastN && cfg.max > cfg.min) {
      n = n === cfg.max ? cfg.min : n + 1;
    }
    state.lastN = n;
    state.answer = n;

    const rect = els.scene.getBoundingClientRect();
    const w = rect.width || 640;
    const h = rect.height || 360;
    const dragonSize = cfg.dragonScale || 52;

    els.scene.classList.remove("is-shake");
    if (els.map && scene.map) els.map.src = scene.map;

    const crowdPlacements = buildCrowd(scene);
    renderCrowd(crowdPlacements);

    const crowdForPlacement = crowdPlacements.map((p) => ({
      xPct: p.x,
      yPct: p.y,
      scale: p.scale,
    }));

    const showDecoys = cfg.decoys;
    const decoyCount = showDecoys ? randInt(1, 2) : 0;
    const dragonPoints = placeDragonPoints(n + decoyCount, w, h, dragonSize, crowdForPlacement);

    renderDragons(n, dragonPoints, w, h, dragonSize);
    if (decoyCount) renderDecoys(decoyCount, dragonPoints, w, h, n);

    if (!state.hardHintShown) {
      els.hint.hidden = false;
      state.hardHintShown = true;
    }

    els.feedback.textContent = "";
    els.feedback.classList.remove("is-bad");
  }

  function guess(n) {
    if (state.mode !== "play") return;
    if (n === state.answer) {
      els.feedback.textContent = "Yes!";
      els.feedback.classList.remove("is-bad");
      state.correctRounds += 1;
      renderHud();
      const size = data().ROUND_SIZE || 10;
      if (state.session === "round" && state.correctRounds >= size) {
        setTimeout(showWin, 500);
        return;
      }
      setTimeout(nextRound, 450);
      return;
    }

    els.feedback.textContent = "Count again!";
    els.feedback.classList.add("is-bad");
    els.scene.classList.remove("is-shake");
    void els.scene.offsetWidth;
    els.scene.classList.add("is-shake");
  }

  function showWin() {
    const code =
      window.KIDS_UNLOCKS?.getRewardCode?.("count-the-dragons") || "SIMON-GLOW-8";
    window.KIDS_UNLOCKS?.markCleared?.("count-the-dragons");
    els.winCode.textContent = code;
    els.winLogin.textContent = `LOGIN ${code}`;
    els.win.hidden = false;
    state.mode = "win";
  }

  window.initCountTheDragons = function initCountTheDragons() {
    const root = document.getElementById("count-dragons-root");
    if (!root) return;
    buildUi(root);
    showMenu();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.initCountTheDragons?.());
  } else {
    window.initCountTheDragons?.();
  }
})();
