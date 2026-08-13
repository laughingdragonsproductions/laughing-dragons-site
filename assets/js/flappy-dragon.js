(() => {
  "use strict";

  const TILE_BASE = "/assets/kids/games/memory-matching/tiles";
  const BACKDROP_SRC = "/assets/kids/games/flappy-dragon/background-fly.png";

  const STORAGE = {
    best: "ldp-flappy-best",
    unlocked: "ldp-flappy-unlocked",
    skin: "ldp-flappy-skin",
    difficulty: "ldp-flappy-difficulty",
  };

  const MODES = {
    easy: { id: "easy", label: "Easy", physicsScale: 0.85 },
    hard: { id: "hard", label: "Hard", physicsScale: 1 },
  };

  const DRAGONS = [
    { id: "green", name: "Green Dragon", src: `${TILE_BASE}/green.png`, unlockScore: 0 },
    { id: "red", name: "Red Dragon", src: `${TILE_BASE}/red.png`, unlockScore: 5 },
    { id: "blue", name: "Blue Dragon", src: `${TILE_BASE}/blue.png`, unlockScore: 10 },
    { id: "purple", name: "Purple Dragon", src: `${TILE_BASE}/purple.png`, unlockScore: 15 },
    { id: "orange", name: "Orange Dragon", src: `${TILE_BASE}/orange.png`, unlockScore: 25 },
    { id: "pink", name: "Pink Dragon", src: `${TILE_BASE}/pink.png`, unlockScore: 35 },
    { id: "teal", name: "Teal Dragon", src: `${TILE_BASE}/teal.png`, unlockScore: 50 },
    { id: "charcoal", name: "Charcoal Dragon", src: `${TILE_BASE}/charcoal.png`, unlockScore: 75 },
  ];

  const WORLD = {
    width: 400,
    height: 600,
    groundH: 48,
    ceilingPad: 8,
  };

  const BASE = {
    gravity: 0.42,
    flap: -7.8,
    pipeGap: 148,
    pipeWidth: 56,
    pipeSpacing: 210,
    scrollSpeed: 2.4,
    dragonSize: 44,
    dragonX: 88,
  };

  let canvas;
  let ctx;
  let els = {};
  let backdrop;
  let dragonImages = {};
  let imagesReady = false;

  let screen = "menu";
  let rafId = 0;
  let lastTs = 0;

  const state = {
    score: 0,
    best: 0,
    unlocked: ["green"],
    skinId: "green",
    dragonY: WORLD.height / 2,
    dragonVy: 0,
    rotation: 0,
    pipes: [],
    bgOffset: 0,
    pipeTimer: 0,
    newlyUnlocked: [],
    mode: "hard",
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${src}`));
      img.src = src;
    });
  }

  async function loadAssets() {
    const loads = [loadImage(BACKDROP_SRC).then((img) => { backdrop = img; })];
    for (const d of DRAGONS) {
      loads.push(
        loadImage(d.src).then((img) => {
          dragonImages[d.id] = img;
        })
      );
    }
    await Promise.all(loads);
    imagesReady = true;
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }

  function readBest() {
    try {
      return Number(localStorage.getItem(STORAGE.best) || 0);
    } catch {
      return 0;
    }
  }

  function writeBest(n) {
    try {
      localStorage.setItem(STORAGE.best, String(n));
    } catch {
      /* ignore */
    }
  }

  function loadProgress() {
    state.best = readBest();
    const savedUnlocked = readJson(STORAGE.unlocked, null);
    state.unlocked = Array.isArray(savedUnlocked) && savedUnlocked.length
      ? savedUnlocked.filter((id) => DRAGONS.some((d) => d.id === id))
      : ["green"];
    if (!state.unlocked.includes("green")) state.unlocked.unshift("green");

    const savedSkin = localStorage.getItem(STORAGE.skin) || "green";
    state.skinId = state.unlocked.includes(savedSkin) ? savedSkin : "green";
    syncUnlocksFromBest();
  }

  function saveProgress() {
    writeJson(STORAGE.unlocked, state.unlocked);
    try {
      localStorage.setItem(STORAGE.skin, state.skinId);
    } catch {
      /* ignore */
    }
  }

  function syncUnlocksFromBest() {
    const effectiveBest = Math.max(state.best, state.score);
    let changed = false;
    for (const d of DRAGONS) {
      if (d.unlockScore <= effectiveBest && !state.unlocked.includes(d.id)) {
        state.unlocked.push(d.id);
        changed = true;
      }
    }
    if (changed) saveProgress();
  }

  function isUnlocked(id) {
    return state.unlocked.includes(id);
  }

  function getPhysicsScale() {
    return MODES[state.mode]?.physicsScale ?? 1;
  }

  function getGravity() {
    return BASE.gravity * getPhysicsScale();
  }

  function getFlap() {
    return BASE.flap * getPhysicsScale();
  }

  function getDifficulty() {
    const s = state.score;
    return {
      scrollSpeed: BASE.scrollSpeed + Math.min(s * 0.06, 3.6),
      pipeGap: Math.max(BASE.pipeGap - Math.floor(s / 4) * 4, 108),
      pipeSpacing: Math.max(BASE.pipeSpacing - Math.floor(s / 6) * 6, 168),
    };
  }

  function announce(msg) {
    if (els.sr) els.sr.textContent = msg;
  }

  function setScreen(next) {
    screen = next;
    els.menu.hidden = next !== "menu";
    els.howto.hidden = next !== "howto";
    els.ready.hidden = next !== "ready";
    els.over.hidden = next !== "over";
    els.hud.hidden = next !== "playing" && next !== "ready";
  }

  function loadDifficulty() {
    try {
      const saved = localStorage.getItem(STORAGE.difficulty);
      state.mode = saved === "easy" ? "easy" : "hard";
    } catch {
      state.mode = "hard";
    }
  }

  function saveDifficulty() {
    try {
      localStorage.setItem(STORAGE.difficulty, state.mode);
    } catch {
      /* ignore */
    }
  }

  function syncDifficultyInputs() {
    if (els.diffEasy) els.diffEasy.checked = state.mode === "easy";
    if (els.diffHard) els.diffHard.checked = state.mode === "hard";
  }

  function updateMenuUI() {
    els.best.textContent = String(state.best);
    syncDifficultyInputs();
    renderSkinRow();
  }

  function renderSkinRow() {
    if (!els.skinsRow) return;
    els.skinsRow.innerHTML = DRAGONS.map((d) => {
      const locked = !isUnlocked(d.id);
      const selected = d.id === state.skinId;
      const lockLabel = locked ? `${d.unlockScore}+` : "";
      return `<button type="button"
        class="flappy-skin-btn${selected ? " is-selected" : ""}${locked ? " is-locked" : ""}"
        data-skin="${d.id}"
        data-lock-label="${lockLabel}"
        aria-label="${d.name}${locked ? ` — unlock at score ${d.unlockScore}` : ""}"
        aria-pressed="${selected}"
        ${locked ? "disabled" : ""}>
        <img src="${d.src}" alt="" width="52" height="52" loading="lazy" />
      </button>`;
    }).join("");

    els.skinsRow.querySelectorAll(".flappy-skin-btn:not(.is-locked)").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skinId = btn.dataset.skin;
        saveProgress();
        renderSkinRow();
      });
    });
  }

  function resetRun() {
    state.score = 0;
    state.dragonY = WORLD.height * 0.42;
    state.dragonVy = 0;
    state.rotation = 0;
    state.pipes = [];
    state.bgOffset = 0;
    state.pipeTimer = BASE.pipeSpacing * 0.55;
    state.newlyUnlocked = [];
    els.score.textContent = "0";
  }

  function spawnPipe() {
    const diff = getDifficulty();
    const minTop = WORLD.ceilingPad + 40;
    const maxTop = WORLD.height - WORLD.groundH - diff.pipeGap - 40;
    const topH = minTop + Math.random() * Math.max(maxTop - minTop, 1);
    state.pipes.push({
      x: WORLD.width + 20,
      topH,
      gap: diff.pipeGap,
      scored: false,
    });
  }

  function flap() {
    if (screen === "ready") {
      setScreen("playing");
      announce("Go!");
      state.dragonVy = getFlap();
      return;
    }
    if (screen !== "playing") return;
    state.dragonVy = getFlap();
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function getDragonBox() {
    const pad = 6;
    const size = BASE.dragonSize - pad * 2;
    return {
      x: BASE.dragonX + pad,
      y: state.dragonY + pad,
      w: size,
      h: size,
    };
  }

  function checkCollisions() {
    const box = getDragonBox();
    if (box.y <= WORLD.ceilingPad || box.y + box.h >= WORLD.height - WORLD.groundH) {
      return true;
    }
    for (const pipe of state.pipes) {
      const topRect = { x: pipe.x, y: 0, w: BASE.pipeWidth, h: pipe.topH };
      const bottomY = pipe.topH + pipe.gap;
      const bottomRect = {
        x: pipe.x,
        y: bottomY,
        w: BASE.pipeWidth,
        h: WORLD.height - WORLD.groundH - bottomY,
      };
      if (rectsOverlap(box, topRect) || rectsOverlap(box, bottomRect)) {
        return true;
      }
    }
    return false;
  }

  function endRun() {
    cancelAnimationFrame(rafId);
    rafId = 0;

    const prevBest = state.best;
    if (state.score > state.best) {
      state.best = state.score;
      writeBest(state.best);
    }

    const before = new Set(state.unlocked);
    syncUnlocksFromBest();
    state.newlyUnlocked = state.unlocked.filter((id) => !before.has(id));

    els.overScore.textContent = String(state.score);
    els.overBest.hidden = state.score <= prevBest || state.score === 0;
    if (state.newlyUnlocked.length) {
      const names = state.newlyUnlocked
        .map((id) => DRAGONS.find((d) => d.id === id)?.name)
        .filter(Boolean)
        .join(", ");
      els.unlockToast.textContent = `Unlocked: ${names}!`;
      els.unlockToast.hidden = false;
      announce(`Game over. Score ${state.score}. Unlocked ${names}.`);
    } else {
      els.unlockToast.hidden = true;
      announce(`Game over. Score ${state.score}.`);
    }

    updateMenuUI();
    setScreen("over");
  }

  function drawBackdrop(scroll) {
    if (!backdrop) {
      const grad = ctx.createLinearGradient(0, 0, 0, WORLD.height);
      grad.addColorStop(0, "#5eb8e8");
      grad.addColorStop(1, "#c8e8f8");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, WORLD.width, WORLD.height);
      return;
    }

    const imgW = backdrop.width;
    const imgH = backdrop.height;
    const drawH = WORLD.height;
    const drawW = (imgW / imgH) * drawH;
    const offset = scroll % drawW;

    ctx.drawImage(backdrop, -offset, 0, drawW, drawH);
    ctx.drawImage(backdrop, drawW - offset, 0, drawW, drawH);
  }

  function drawGround() {
    const y = WORLD.height - WORLD.groundH;
    const grad = ctx.createLinearGradient(0, y, 0, WORLD.height);
    grad.addColorStop(0, "#6b5344");
    grad.addColorStop(1, "#3d2e24");
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, WORLD.width, WORLD.groundH);

    ctx.fillStyle = "#4a7c3f";
    ctx.fillRect(0, y, WORLD.width, 10);
  }

  function drawPipe(x, topH, gap) {
    const bottomY = topH + gap;
    const bottomH = WORLD.height - WORLD.groundH - bottomY;
    const capH = 14;
    const bodyGrad = ctx.createLinearGradient(x, 0, x + BASE.pipeWidth, 0);
    bodyGrad.addColorStop(0, "#5a6a78");
    bodyGrad.addColorStop(0.5, "#8a9aaa");
    bodyGrad.addColorStop(1, "#4a5868");

    ctx.fillStyle = bodyGrad;

    ctx.fillRect(x, 0, BASE.pipeWidth, topH);
    ctx.fillRect(x, bottomY, BASE.pipeWidth, bottomH);

    ctx.fillStyle = "#a8bcc8";
    ctx.fillRect(x - 3, topH - capH, BASE.pipeWidth + 6, capH);
    ctx.fillRect(x - 3, bottomY, BASE.pipeWidth + 6, capH);

    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, 0, BASE.pipeWidth, topH);
    ctx.strokeRect(x, bottomY, BASE.pipeWidth, bottomH);
  }

  function drawDragon() {
    const img = dragonImages[state.skinId] || dragonImages.green;
    const size = BASE.dragonSize;
    const cx = BASE.dragonX + size / 2;
    const cy = state.dragonY + size / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(state.rotation);
    ctx.scale(-1, 1);
    if (img) {
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
    } else {
      ctx.fillStyle = "#82d645";
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFrame() {
    ctx.clearRect(0, 0, WORLD.width, WORLD.height);
    drawBackdrop(state.bgOffset);
    for (const pipe of state.pipes) {
      drawPipe(pipe.x, pipe.topH, pipe.gap);
    }
    drawGround();
    drawDragon();
  }

  function tick(ts) {
    if (screen !== "playing" && screen !== "ready") return;

    const dt = Math.min((ts - lastTs) / 16.67, 2.5);
    lastTs = ts;
    const diff = getDifficulty();

    if (screen === "ready") {
      state.bgOffset += BASE.scrollSpeed * 0.35 * dt;
      drawFrame();
      rafId = requestAnimationFrame(tick);
      return;
    }

    state.dragonVy += getGravity() * dt;
    state.dragonY += state.dragonVy * dt;
    state.rotation = Math.max(-0.45, Math.min(state.dragonVy * 0.06, 0.85));

    state.bgOffset += diff.scrollSpeed * dt;
    state.pipeTimer += diff.scrollSpeed * dt;

    if (state.pipeTimer >= diff.pipeSpacing) {
      spawnPipe();
      state.pipeTimer = 0;
    }

    for (const pipe of state.pipes) {
      pipe.x -= diff.scrollSpeed * dt;
      if (!pipe.scored && pipe.x + BASE.pipeWidth < BASE.dragonX) {
        pipe.scored = true;
        state.score += 1;
        els.score.textContent = String(state.score);
      }
    }
    state.pipes = state.pipes.filter((p) => p.x + BASE.pipeWidth > -20);

    if (checkCollisions()) {
      endRun();
      return;
    }

    drawFrame();
    rafId = requestAnimationFrame(tick);
  }

  function startPlayingLoop() {
    cancelAnimationFrame(rafId);
    lastTs = performance.now();
    drawFrame();
    rafId = requestAnimationFrame(tick);
  }

  function beginRun() {
    resetRun();
    els.overBest.hidden = true;
    els.unlockToast.hidden = true;
    setScreen("ready");
    startPlayingLoop();
  }

  function retryRun() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    beginRun();
  }

  function returnToMenu() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    els.overBest.hidden = true;
    els.unlockToast.hidden = true;
    setScreen("menu");
    drawFrame();
  }

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = WORLD.width * dpr;
    canvas.height = WORLD.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (screen === "menu" || screen === "howto" || screen === "over") {
      drawFrame();
    }
  }

  function bindInput() {
    const stage = canvas.parentElement;

    const onFlap = (e) => {
      if (e.target.closest("button")) return;
      if (e.type === "keydown" && e.repeat) return;
      if (e.type === "keydown" && ![" ", "ArrowUp"].includes(e.key)) return;
      if (e.type === "keydown") e.preventDefault();
      flap();
    };

    stage.addEventListener("pointerdown", onFlap);
    window.addEventListener("keydown", onFlap);

    els.btnPlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      beginRun();
    });
    els.btnHowto.addEventListener("click", (e) => {
      e.stopPropagation();
      setScreen("howto");
    });
    els.howtoBack.addEventListener("click", (e) => {
      e.stopPropagation();
      setScreen("menu");
    });
    els.btnRetry.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      retryRun();
    });
    els.btnMenu.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      returnToMenu();
    });

    els.diffEasy?.addEventListener("change", () => {
      if (els.diffEasy.checked) {
        state.mode = "easy";
        saveDifficulty();
      }
    });
    els.diffHard?.addEventListener("change", () => {
      if (els.diffHard.checked) {
        state.mode = "hard";
        saveDifficulty();
      }
    });

    window.addEventListener("resize", resizeCanvas);
  }

  function cacheElements() {
    els = {
      canvas: document.getElementById("flappy-canvas"),
      hud: document.getElementById("flappy-hud"),
      score: document.getElementById("flappy-score"),
      menu: document.getElementById("flappy-menu"),
      howto: document.getElementById("flappy-howto"),
      ready: document.getElementById("flappy-ready"),
      over: document.getElementById("flappy-over"),
      best: document.getElementById("flappy-best"),
      skinsRow: document.getElementById("flappy-skins-row"),
      btnPlay: document.getElementById("flappy-btn-play"),
      btnHowto: document.getElementById("flappy-btn-howto"),
      howtoBack: document.getElementById("flappy-howto-back"),
      btnRetry: document.getElementById("flappy-btn-retry"),
      btnMenu: document.getElementById("flappy-btn-menu"),
      overScore: document.getElementById("flappy-over-score"),
      overBest: document.getElementById("flappy-over-best"),
      unlockToast: document.getElementById("flappy-unlock-toast"),
      sr: document.getElementById("flappy-sr-announce"),
      diffEasy: document.getElementById("flappy-diff-easy"),
      diffHard: document.getElementById("flappy-diff-hard"),
    };
    canvas = els.canvas;
    ctx = canvas.getContext("2d");
  }

  window.initFlappyDragon = async function initFlappyDragon() {
    cacheElements();
    if (!canvas || !ctx) return;

    loadProgress();
    loadDifficulty();
    updateMenuUI();
    bindInput();
    setScreen("menu");

    try {
      await loadAssets();
    } catch (err) {
      console.warn("Flappy Dragon asset load issue:", err);
    }

    resizeCanvas();
    drawFrame();
  };
})();
