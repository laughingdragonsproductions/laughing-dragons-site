(() => {
  "use strict";

  const TILE_BASE = "/assets/kids/games/memory-matching/tiles";
  const COURT_SRC = "/assets/kids/games/dragon-vball/background.png";
  const BALL_SRC = "/assets/kids/games/dragon-vball/ball.png";
  const FIREBALL_SRC = "/assets/kids/games/dragon-vball/fireball.png";

  const FIREBALL_HITS = 8;
  const FIREBALL_ANGLE_OFFSET = (5 * Math.PI) / 4;

  const STORAGE = {
    wins: "ldp-vball-wins",
    bestStreak: "ldp-vball-best-streak",
    unlocked: "ldp-vball-unlocked",
    skin: "ldp-vball-skin",
    difficulty: "ldp-vball-difficulty",
  };

  const WIN_SCORE = 3;

  const MODES = {
    easy: {
      id: "easy",
      label: "Easy",
      aiSpeed: 2.0,
      aiError: 130,
      ballSpeed: 5.0,
      aiReactAt: 0.68,
      aiEffort: 0.58,
      aiMissChance: 0.22,
    },
    hard: {
      id: "hard",
      label: "Hard",
      aiSpeed: 4.6,
      aiError: 42,
      ballSpeed: 6.5,
      aiReactAt: 0.52,
      aiEffort: 0.88,
      aiMissChance: 0.06,
    },
  };

  const DRAGONS = [
    { id: "green", name: "Green Dragon", src: `${TILE_BASE}/green.png`, unlockWins: 0 },
    { id: "red", name: "Red Dragon", src: `${TILE_BASE}/red.png`, unlockWins: 1 },
    { id: "blue", name: "Blue Dragon", src: `${TILE_BASE}/blue.png`, unlockWins: 3 },
    { id: "purple", name: "Purple Dragon", src: `${TILE_BASE}/purple.png`, unlockWins: 5 },
    { id: "orange", name: "Orange Dragon", src: `${TILE_BASE}/orange.png`, unlockWins: 10 },
    { id: "pink", name: "Pink Dragon", src: `${TILE_BASE}/pink.png`, unlockWins: 15 },
    { id: "teal", name: "Teal Dragon", src: `${TILE_BASE}/teal.png`, unlockWins: 25 },
    { id: "charcoal", name: "Charcoal Dragon", src: `${TILE_BASE}/charcoal.png`, unlockWins: 40 },
  ];

  const WORLD = {
    width: 960,
    height: 540,
    topPad: 52,
    bottomPad: 72,
    netX: 480,
    serveDelayMs: 900,
  };

  const BASE = {
    dragonSize: 72,
    playerX: 72,
    ballRadius: 30,
  };

  let canvas;
  let ctx;
  let els = {};
  let courtImg;
  let ballImg;
  let fireballImg;
  let dragonImages = {};
  let imagesReady = false;

  let hitStreak = 0;
  let ballOnFire = false;
  let lastBallAngle = 0;

  let screen = "menu";
  let rafId = 0;
  let lastTs = 0;
  let serveTimer = 0;
  let waitingServe = false;
  let serveToward = "player";

  const input = {
    pointerY: null,
    pointerActive: false,
    up: false,
    down: false,
  };

  const state = {
    playerScore: 0,
    aiScore: 0,
    totalWins: 0,
    bestStreak: 0,
    matchWinStreak: 0,
    unlocked: ["green"],
    skinId: "green",
    mode: "hard",
    newlyUnlocked: [],
    winner: null,
  };

  const player = { y: 0 };
  const ai = { y: 0 };
  const ball = { x: 0, y: 0, vx: 0, vy: 0, r: BASE.ballRadius };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${src}`));
      img.src = src;
    });
  }

  async function loadBallWithAlpha(src) {
    const img = await loadImage(src);
    const off = document.createElement("canvas");
    off.width = img.width;
    off.height = img.height;
    const octx = off.getContext("2d");
    octx.drawImage(img, 0, 0);
    const data = octx.getImageData(0, 0, off.width, off.height);
    for (let i = 0; i < data.data.length; i += 4) {
      const r = data.data[i];
      const g = data.data[i + 1];
      const b = data.data[i + 2];
      if (r < 32 && g < 32 && b < 32) {
        data.data[i + 3] = 0;
      }
    }
    octx.putImageData(data, 0, 0);
    const keyed = new Image();
    keyed.src = off.toDataURL("image/png");
    await new Promise((resolve, reject) => {
      keyed.onload = () => resolve(keyed);
      keyed.onerror = reject;
    });
    return keyed;
  }

  async function loadAssets() {
    const loads = [
      loadImage(COURT_SRC).then((img) => { courtImg = img; }),
      loadBallWithAlpha(BALL_SRC).then((img) => { ballImg = img; }),
      loadBallWithAlpha(FIREBALL_SRC).then((img) => { fireballImg = img; }),
    ];
    for (const d of DRAGONS) {
      loads.push(loadImage(d.src).then((img) => { dragonImages[d.id] = img; }));
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

  function readNum(key, fallback = 0) {
    try {
      return Number(localStorage.getItem(key) || fallback);
    } catch {
      return fallback;
    }
  }

  function writeNum(key, n) {
    try {
      localStorage.setItem(key, String(n));
    } catch {
      /* ignore */
    }
  }

  function getMode() {
    return MODES[state.mode] || MODES.hard;
  }

  function playBounds() {
    return {
      top: WORLD.topPad,
      bottom: WORLD.height - WORLD.bottomPad,
    };
  }

  function clampY(y, size) {
    const b = playBounds();
    return Math.max(b.top, Math.min(y, b.bottom - size));
  }

  function getAiX() {
    return WORLD.width - BASE.playerX - BASE.dragonSize;
  }

  function getDragonBox(side) {
    const x = side === "player" ? BASE.playerX : getAiX();
    const y = side === "player" ? player.y : ai.y;
    const pad = 8;
    return { x: x + pad, y: y + pad, w: BASE.dragonSize - pad * 2, h: BASE.dragonSize - pad * 2 };
  }

  function loadProgress() {
    state.totalWins = readNum(STORAGE.wins, 0);
    state.bestStreak = readNum(STORAGE.bestStreak, 0);
    const savedUnlocked = readJson(STORAGE.unlocked, null);
    state.unlocked = Array.isArray(savedUnlocked) && savedUnlocked.length
      ? savedUnlocked.filter((id) => DRAGONS.some((d) => d.id === id))
      : ["green"];
    if (!state.unlocked.includes("green")) state.unlocked.unshift("green");

    const savedSkin = localStorage.getItem(STORAGE.skin) || "green";
    state.skinId = state.unlocked.includes(savedSkin) ? savedSkin : "green";
    syncUnlocksFromWins();
  }

  function saveProgress() {
    writeNum(STORAGE.wins, state.totalWins);
    writeNum(STORAGE.bestStreak, state.bestStreak);
    writeJson(STORAGE.unlocked, state.unlocked);
    try {
      localStorage.setItem(STORAGE.skin, state.skinId);
    } catch {
      /* ignore */
    }
  }

  function syncUnlocksFromWins() {
    let changed = false;
    for (const d of DRAGONS) {
      if (d.unlockWins <= state.totalWins && !state.unlocked.includes(d.id)) {
        state.unlocked.push(d.id);
        changed = true;
      }
    }
    if (changed) saveProgress();
  }

  function isUnlocked(id) {
    return state.unlocked.includes(id);
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

  function updateScoreHUD() {
    if (els.playerScore) els.playerScore.textContent = String(state.playerScore);
    if (els.aiScore) els.aiScore.textContent = String(state.aiScore);
  }

  function syncDifficultyInputs() {
    if (els.diffEasy) els.diffEasy.checked = state.mode === "easy";
    if (els.diffHard) els.diffHard.checked = state.mode === "hard";
  }

  function updateMenuUI() {
    if (els.best) els.best.textContent = String(state.bestStreak);
    if (els.wins) els.wins.textContent = String(state.totalWins);
    syncDifficultyInputs();
    renderSkinRow();
  }

  function renderSkinRow() {
    if (!els.skinsRow) return;
    els.skinsRow.innerHTML = DRAGONS.map((d) => {
      const locked = !isUnlocked(d.id);
      const selected = d.id === state.skinId;
      const lockLabel = locked ? `${d.unlockWins}W` : "";
      return `<button type="button"
        class="vball-skin-btn${selected ? " is-selected" : ""}${locked ? " is-locked" : ""}"
        data-skin="${d.id}"
        data-lock-label="${lockLabel}"
        aria-label="${d.name}${locked ? ` — unlock at ${d.unlockWins} wins` : ""}"
        aria-pressed="${selected}"
        ${locked ? "disabled" : ""}>
        <img src="${d.src}" alt="" width="52" height="52" loading="lazy" />
      </button>`;
    }).join("");

    els.skinsRow.querySelectorAll(".vball-skin-btn:not(.is-locked)").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.skinId = btn.dataset.skin;
        saveProgress();
        renderSkinRow();
      });
    });
  }

  function resetPositions() {
    const midY = (playBounds().top + playBounds().bottom - BASE.dragonSize) / 2;
    player.y = midY;
    ai.y = midY;
    ball.x = WORLD.netX;
    ball.y = WORLD.height / 2;
    ball.vx = 0;
    ball.vy = 0;
    input.pointerY = null;
    input.pointerActive = false;
  }

  function resetRallyFire() {
    hitStreak = 0;
    ballOnFire = false;
  }

  function resetMatch() {
    state.playerScore = 0;
    state.aiScore = 0;
    state.winner = null;
    state.newlyUnlocked = [];
    waitingServe = false;
    serveTimer = 0;
    resetRallyFire();
    resetPositions();
    updateScoreHUD();
  }

  function getBallSpeed() {
    return getMode().ballSpeed;
  }

  function normalizeBallSpeed() {
    const speed = getBallSpeed();
    const mag = Math.hypot(ball.vx, ball.vy) || 1;
    ball.vx = (ball.vx / mag) * speed;
    ball.vy = (ball.vy / mag) * speed;
  }

  function scheduleServe(toward) {
    waitingServe = true;
    serveToward = toward;
    serveTimer = WORLD.serveDelayMs;
    resetRallyFire();
    ball.x = WORLD.netX;
    ball.y = WORLD.height / 2;
    ball.vx = 0;
    ball.vy = 0;
  }

  function doServe() {
    waitingServe = false;
    const speed = getBallSpeed();
    const angle = (Math.random() - 0.5) * 0.6;
    ball.vx = (serveToward === "player" ? -1 : 1) * speed * Math.cos(angle);
    ball.vy = speed * Math.sin(angle);
    normalizeBallSpeed();
  }

  function circleRectCollide(cx, cy, r, box) {
    const closestX = Math.max(box.x, Math.min(cx, box.x + box.w));
    const closestY = Math.max(box.y, Math.min(cy, box.y + box.h));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy < r * r;
  }

  function bounceOffDragon(side) {
    const box = getDragonBox(side);
    const centerY = box.y + box.h / 2;
    const hitOffset = Math.max(-1, Math.min(1, (ball.y - centerY) / (box.h / 2)));
    const speed = getBallSpeed();
    ball.vx = (side === "player" ? 1 : -1) * Math.abs(ball.vx || speed);
    ball.vy = hitOffset * speed * 0.85;
    normalizeBallSpeed();

    if (side === "player") {
      ball.x = box.x + box.w + ball.r + 1;
    } else {
      ball.x = box.x - ball.r - 1;
    }

    hitStreak += 1;
    if (hitStreak >= FIREBALL_HITS && !ballOnFire) {
      ballOnFire = true;
      announce("Fireball!");
    }
  }

  function updatePlayer(dt) {
    let moveY = 0;
    if (input.up) moveY -= 1;
    if (input.down) moveY += 1;

    if (moveY !== 0) {
      input.pointerY = null;
      input.pointerActive = false;
      player.y += moveY * 7.5 * dt;
    } else if (input.pointerActive && input.pointerY != null) {
      player.y = clampY(input.pointerY - BASE.dragonSize / 2, BASE.dragonSize);
    }

    player.y = clampY(player.y, BASE.dragonSize);
  }

  function predictBallYAtX(targetX) {
    let x = ball.x;
    let y = ball.y;
    let vx = ball.vx;
    let vy = ball.vy;
    const b = playBounds();
    const top = b.top + ball.r;
    const bottom = b.bottom - ball.r;

    for (let step = 0; step < 10; step += 1) {
      if (Math.abs(vx) < 0.01) return y;

      const tReach = (targetX - x) / vx;
      if (tReach > 0 && tReach < 200) {
        return y + vy * tReach;
      }

      let tWall = Infinity;
      if (vy < 0) {
        const t = (top - y) / vy;
        if (t > 0) tWall = Math.min(tWall, t);
      }
      if (vy > 0) {
        const t = (bottom - y) / vy;
        if (t > 0) tWall = Math.min(tWall, t);
      }
      if (!Number.isFinite(tWall)) break;

      x += vx * tWall;
      y += vy * tWall;
      vy = -vy;
    }

    return y;
  }

  function updateAi(dt) {
    const mode = getMode();
    const box = getDragonBox("ai");
    const centerY = box.y + box.h / 2;
    const b = playBounds();
    const midCourt = (b.top + b.bottom) / 2;
    const reactLine = WORLD.width * mode.aiReactAt;
    const aiFaceX = getAiX() + BASE.dragonSize / 2;

    let targetY = midCourt;

    if (!waitingServe && ball.vx > 0 && ball.x > reactLine) {
      if (Math.random() < mode.aiMissChance) {
        targetY = midCourt + (Math.random() - 0.5) * (b.bottom - b.top) * 0.55;
      } else if (mode.id === "hard") {
        targetY = predictBallYAtX(aiFaceX) + (Math.random() - 0.5) * mode.aiError;
      } else {
        targetY = ball.y + (Math.random() - 0.5) * mode.aiError;
        targetY += Math.sign(ball.vy || 1) * Math.abs(ball.vy) * 6;
      }
    } else if (!waitingServe && ball.vx > 0) {
      targetY = ball.y + (Math.random() - 0.5) * mode.aiError * 1.4;
    }

    const diff = targetY - centerY;
    const maxStep = mode.aiSpeed * mode.aiEffort * dt;
    ai.y += Math.sign(diff) * Math.min(Math.abs(diff), maxStep);
    ai.y = clampY(ai.y, BASE.dragonSize);
  }

  function updateBall(dt) {
    if (waitingServe) return;

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    const b = playBounds();
    if (ball.y - ball.r <= b.top) {
      ball.y = b.top + ball.r;
      ball.vy = Math.abs(ball.vy);
    }
    if (ball.y + ball.r >= b.bottom) {
      ball.y = b.bottom - ball.r;
      ball.vy = -Math.abs(ball.vy);
    }

    if (ball.vx < 0 && circleRectCollide(ball.x, ball.y, ball.r, getDragonBox("player"))) {
      bounceOffDragon("player");
    }
    if (ball.vx > 0 && circleRectCollide(ball.x, ball.y, ball.r, getDragonBox("ai"))) {
      bounceOffDragon("ai");
    }

    if (ball.x - ball.r < 0) {
      scorePoint("ai");
    } else if (ball.x + ball.r > WORLD.width) {
      scorePoint("player");
    }
  }

  function scorePoint(who) {
    if (state.winner) return;

    resetRallyFire();

    if (who === "player") {
      state.playerScore += 1;
      announce(`You scored! ${state.playerScore} to ${state.aiScore}`);
    } else {
      state.aiScore += 1;
      announce(`AI scored. ${state.playerScore} to ${state.aiScore}`);
    }
    updateScoreHUD();

    if (state.playerScore >= WIN_SCORE || state.aiScore >= WIN_SCORE) {
      endMatch(who === "player" ? "player" : "ai");
      return;
    }

    scheduleServe(who === "player" ? "ai" : "player");
  }

  function endMatch(winner) {
    cancelAnimationFrame(rafId);
    rafId = 0;
    state.winner = winner;
    waitingServe = true;

    if (winner === "player") {
      state.totalWins += 1;
      state.matchWinStreak += 1;
      if (state.matchWinStreak > state.bestStreak) {
        state.bestStreak = state.matchWinStreak;
      }
    } else {
      state.matchWinStreak = 0;
    }

    const before = new Set(state.unlocked);
    syncUnlocksFromWins();
    state.newlyUnlocked = state.unlocked.filter((id) => !before.has(id));
    saveProgress();

    const won = winner === "player";
    els.overTitle.textContent = won ? "You Win!" : "AI Wins";
    els.overScore.textContent = `${state.playerScore} – ${state.aiScore}`;

    if (won && state.matchWinStreak > 1) {
      els.overBest.textContent = `Win streak: ${state.matchWinStreak}`;
      els.overBest.hidden = false;
    } else {
      els.overBest.hidden = true;
    }

    if (state.newlyUnlocked.length) {
      const names = state.newlyUnlocked
        .map((id) => DRAGONS.find((d) => d.id === id)?.name)
        .filter(Boolean)
        .join(", ");
      els.unlockToast.textContent = `Unlocked: ${names}!`;
      els.unlockToast.hidden = false;
      announce(won ? `You win! Unlocked ${names}.` : `AI wins.`);
    } else {
      els.unlockToast.hidden = true;
      announce(won ? "You win the match!" : "AI wins the match.");
    }

    updateMenuUI();
    setScreen("over");
  }

  function drawCourt() {
    if (courtImg && imagesReady) {
      ctx.drawImage(courtImg, 0, 0, WORLD.width, WORLD.height);
      return;
    }
    const grad = ctx.createLinearGradient(0, 0, 0, WORLD.height);
    grad.addColorStop(0, "#87ceeb");
    grad.addColorStop(0.55, "#f4d03f");
    grad.addColorStop(1, "#e8c547");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
  }

  function drawDragon(side) {
    const x = side === "player" ? BASE.playerX : getAiX();
    const y = side === "player" ? player.y : ai.y;
    const img = side === "player"
      ? (dragonImages[state.skinId] || dragonImages.green)
      : (dragonImages.red || dragonImages.green);
    const size = BASE.dragonSize;
    const cx = x + size / 2;
    const cy = y + size / 2;

    ctx.save();
    ctx.translate(cx, cy);
    // Tile art faces left by default; flip toward the ball on either side.
    const flipX = ball.x >= cx ? -1 : 1;
    ctx.scale(flipX, 1);
    if (img) {
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
    } else {
      ctx.fillStyle = side === "player" ? "#82d645" : "#e74c3c";
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawBall() {
    const onFire = ballOnFire && fireballImg && imagesReady;
    const img = onFire ? fireballImg : ballImg;
    const scale = onFire ? 1.35 : 1;
    const size = ball.r * 2 * scale;

    if (img && imagesReady) {
      ctx.save();
      ctx.translate(ball.x, ball.y);
      const speed = Math.hypot(ball.vx, ball.vy);
      if (speed >= 0.5) {
        lastBallAngle = Math.atan2(ball.vy, ball.vx);
      }
      if (onFire) {
        ctx.rotate(lastBallAngle + FIREBALL_ANGLE_OFFSET);
      }
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.fillStyle = onFire ? "#ff6b00" : "#39ff14";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, WORLD.width, WORLD.height);
    drawCourt();
    drawDragon("player");
    drawDragon("ai");
    drawBall();

    if (waitingServe && screen === "playing" && !state.winner) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.font = "600 22px Segoe UI, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Get ready…", WORLD.width / 2, WORLD.height / 2 - 40);
    }
  }

  function tick(ts) {
    if (screen !== "playing" && screen !== "ready") return;

    const dtMs = Math.min(ts - lastTs, 50);
    const dt = Math.min(dtMs / 16.67, 2.5);
    lastTs = ts;

    if (screen === "ready") {
      drawFrame();
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (waitingServe && serveTimer > 0) {
      serveTimer -= dtMs;
      if (serveTimer <= 0) doServe();
    }

    updatePlayer(dt);
    updateAi(dt);
    updateBall(dt);
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
    resetMatch();
    els.overBest.hidden = true;
    els.unlockToast.hidden = true;
    setScreen("ready");
    startPlayingLoop();
  }

  function startMatch() {
    setScreen("playing");
    scheduleServe(Math.random() < 0.5 ? "player" : "ai");
    announce("Match started!");
  }

  function retryRun() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    beginRun();
    startMatch();
  }

  function returnToMenu() {
    cancelAnimationFrame(rafId);
    rafId = 0;
    els.overBest.hidden = true;
    els.unlockToast.hidden = true;
    setScreen("menu");
    resetMatch();
    drawFrame();
  }

  function detectMobileLayout() {
    const mobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
    document.body.classList.toggle("vball-mobile", mobile);
  }

  function resizeCanvas() {
    const wrap = els.playfield;
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

  function pointerToWorldY(clientY) {
    const rect = canvas.getBoundingClientRect();
    const relY = (clientY - rect.top) / rect.height;
    return relY * WORLD.height;
  }

  function bindTouchButton(btn, onDown, onUp) {
    if (!btn) return;
    const down = (e) => {
      e.preventDefault();
      onDown();
    };
    const up = (e) => {
      e.preventDefault();
      onUp();
    };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointercancel", up);
    btn.addEventListener("pointerleave", up);
  }

  function bindInput() {
    const stage = els.stageWrap;
    if (!stage) return;

    const onReadyStart = (e) => {
      if (screen !== "ready") return;
      if (e.target.closest("button") && !e.target.closest(".vball-touch-controls")) return;
      if (e.type === "keydown" && ![" ", "Enter", "ArrowUp", "ArrowDown", "w", "W", "s", "S"].includes(e.key)) return;
      if (e.type === "keydown") e.preventDefault();
      startMatch();
    };

    stage.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button") && !e.target.closest(".vball-touch-controls")) return;
      if (screen === "ready") {
        onReadyStart(e);
        return;
      }
      if (screen !== "playing") return;
      input.pointerActive = true;
      input.pointerY = pointerToWorldY(e.clientY);
    });

    stage.addEventListener("pointermove", (e) => {
      if (screen !== "playing" || !input.pointerActive) return;
      if (e.buttons === 0 && e.pointerType === "mouse") return;
      input.pointerY = pointerToWorldY(e.clientY);
    });

    const endPointerDrag = () => {
      input.pointerActive = false;
      input.pointerY = null;
    };

    stage.addEventListener("pointerup", endPointerDrag);
    stage.addEventListener("pointercancel", endPointerDrag);

    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;
      if (["ArrowUp", "w", "W"].includes(e.key)) input.up = true;
      if (["ArrowDown", "s", "S"].includes(e.key)) input.down = true;
      if (screen === "ready") onReadyStart(e);
    });

    window.addEventListener("keyup", (e) => {
      if (["ArrowUp", "w", "W"].includes(e.key)) input.up = false;
      if (["ArrowDown", "s", "S"].includes(e.key)) input.down = false;
    });

    bindTouchButton(els.touchUp, () => { input.up = true; }, () => { input.up = false; });
    bindTouchButton(els.touchDown, () => { input.down = true; }, () => { input.down = false; });

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

    window.addEventListener("resize", () => {
      detectMobileLayout();
      resizeCanvas();
    });
  }

  function cacheElements() {
    els = {
      canvas: document.getElementById("vball-canvas"),
      stageWrap: document.querySelector(".vball-stage-wrap"),
      playfield: document.querySelector(".vball-playfield"),
      hud: document.getElementById("vball-hud"),
      playerScore: document.getElementById("vball-player-score"),
      aiScore: document.getElementById("vball-ai-score"),
      menu: document.getElementById("vball-menu"),
      howto: document.getElementById("vball-howto"),
      ready: document.getElementById("vball-ready"),
      over: document.getElementById("vball-over"),
      best: document.getElementById("vball-best"),
      wins: document.getElementById("vball-wins"),
      skinsRow: document.getElementById("vball-skins-row"),
      btnPlay: document.getElementById("vball-btn-play"),
      btnHowto: document.getElementById("vball-btn-howto"),
      howtoBack: document.getElementById("vball-howto-back"),
      btnRetry: document.getElementById("vball-btn-retry"),
      btnMenu: document.getElementById("vball-btn-menu"),
      overTitle: document.getElementById("vball-over-title"),
      overScore: document.getElementById("vball-over-score"),
      overBest: document.getElementById("vball-over-best"),
      unlockToast: document.getElementById("vball-unlock-toast"),
      sr: document.getElementById("vball-sr-announce"),
      diffEasy: document.getElementById("vball-diff-easy"),
      diffHard: document.getElementById("vball-diff-hard"),
      touchUp: document.getElementById("vball-touch-up"),
      touchDown: document.getElementById("vball-touch-down"),
    };
    canvas = els.canvas;
    ctx = canvas.getContext("2d");
  }

  window.initDragonVball = async function initDragonVball() {
    cacheElements();
    if (!canvas || !ctx) return;

    detectMobileLayout();
    loadProgress();
    loadDifficulty();
    resetPositions();
    updateMenuUI();
    bindInput();
    setScreen("menu");

    try {
      await loadAssets();
    } catch (err) {
      console.warn("Dragon V-ball asset load issue:", err);
    }

    resizeCanvas();
    drawFrame();
  };
})();
