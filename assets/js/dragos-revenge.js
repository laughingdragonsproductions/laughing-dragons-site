(() => {
  "use strict";

  const ASSET_BASE = "/assets/kids/games/dragos-revenge";
  const TILE_BASE = "/assets/kids/games/memory-matching/tiles";
  const ASSET_VERSION = "20260814e";
  const FLOOR_COLOR = "#9a9450";

  const asset = (file) => `${ASSET_BASE}/${file}?v=${ASSET_VERSION}`;
  const tileAsset = (file) => `${TILE_BASE}/${file}?v=${ASSET_VERSION}`;

  const STORAGE = { best: "ldp-dragos-revenge-best", difficulty: "ldp-dragos-revenge-difficulty" };

  const TILE = { FLOOR: 0, WALL: 1, SLIDABLE: 2, TOOTH: 3 };

  const PICKUP_COLORS = ["green", "red", "blue", "purple", "orange", "pink", "teal", "charcoal"];

  const MODES = {
    easy: { id: "easy", hunterEvery: 2, timeBonus: 30, label: "Easy" },
    hard: { id: "hard", hunterEvery: 1, timeBonus: 0, label: "Hard" },
  };

  const HUNTER_SLIDE_MS = 140;
  const HUNTER_BOB_HZ = 0.0055;

  const SCORE = { trapCollect: 100, levelClear: 200 };

  const GRID_W = 20;
  const GRID_H = 20;
  const MAX_LIVES = 3;

  let canvas;
  let ctx;
  let els = {};
  let images = {};
  let pickupImages = {};
  let imagesReady = false;

  let screen = "menu";
  let difficulty = "hard";
  let levelIndex = 0;
  let lives = MAX_LIVES;
  let score = 0;
  let best = 0;
  let timeLeft = 0;
  let timerId = 0;
  let playerMoves = 0;

  /** @type {number[][]} */
  let grid = [];
  /** @type {{x:number,y:number}} */
  let player = { x: 0, y: 0 };
  /** @type {Array<{x:number,y:number,id:number}>} */
  let hunters = [];
  /** @type {Array<{x:number,y:number,color:string}>} */
  let pickups = [];
  let hunterIdSeq = 0;

  let keyRepeatTimer = 0;
  let heldDir = null;
  const KEY_REPEAT_MS = 140;
  let animFrameId = 0;

  function $(id) {
    return document.getElementById(id);
  }

  function announce(msg) {
    if (els.sr) els.sr.textContent = msg;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function loadFirstAvailable(urls) {
    for (const src of urls) {
      try {
        return await loadImage(src);
      } catch (_) {
        /* try next */
      }
    }
    throw new Error(`Failed to load assets: ${urls.join(", ")}`);
  }

  async function loadAssets() {
    const [drago, wallBorder, wallCorner, slidable, tooth] = await Promise.all([
      loadImage(asset("drago-player.png")),
      loadImage(asset("wall-border.png")),
      loadImage(asset("wall-corner.png")),
      loadFirstAvailable([asset("slidable.jpg"), asset("slidable-tile.png")]),
      loadFirstAvailable([asset("tooth-tile.png"), asset("wall-cluster.jpg")]),
    ]);
    images = { drago, wallBorder, wallCorner, slidable, tooth };
    await Promise.all(
      PICKUP_COLORS.map(async (c) => {
        pickupImages[c] = await loadImage(tileAsset(`${c}.png`));
      })
    );
    imagesReady = true;
  }

  function cellKey(x, y) {
    return `${x},${y}`;
  }

  function inBounds(x, y) {
    return x >= 0 && x < GRID_W && y >= 0 && y < GRID_H;
  }

  function staticAt(x, y) {
    if (!inBounds(x, y)) return TILE.WALL;
    return grid[y][x];
  }

  function hunterAt(x, y) {
    return hunters.find((h) => h.x === x && h.y === y);
  }

  function pickupAt(x, y) {
    return pickups.find((p) => p.x === x && p.y === y);
  }

  function isFloorWalkable(x, y) {
    const t = staticAt(x, y);
    if (t !== TILE.FLOOR) return false;
    if (hunterAt(x, y)) return false;
    if (pickupAt(x, y)) return false;
    return true;
  }

  function isPlayerWalkable(x, y) {
    const t = staticAt(x, y);
    if (t === TILE.WALL || t === TILE.TOOTH) return false;
    if (t === TILE.SLIDABLE) return false;
    if (hunterAt(x, y)) return false;
    return true;
  }

  function parseLevel(levelDef) {
    grid = [];
    hunters = [];
    pickups = [];
    hunterIdSeq = 0;
    const hunterSpawns = [];
    let spawnFound = false;

    for (let y = 0; y < GRID_H; y++) {
      const row = levelDef.ascii[y] || ".".repeat(GRID_W);
      grid[y] = [];
      for (let x = 0; x < GRID_W; x++) {
        const ch = row[x] || ".";
        switch (ch) {
          case "#":
            grid[y][x] = TILE.WALL;
            break;
          case "G":
            grid[y][x] = TILE.SLIDABLE;
            break;
          case "T":
            grid[y][x] = TILE.TOOTH;
            break;
          case "P":
            grid[y][x] = TILE.FLOOR;
            player = { x, y };
            spawnFound = true;
            break;
          case "H":
            grid[y][x] = TILE.FLOOR;
            hunterSpawns.push({ x, y });
            break;
          default:
            grid[y][x] = TILE.FLOOR;
        }
      }
    }

    hunterSpawns.forEach((s) => {
      hunters.push(makeHunter(s.x, s.y));
    });

    if (!spawnFound) {
      outer: for (let y = 1; y < GRID_H - 1; y++) {
        for (let x = 1; x < GRID_W - 1; x++) {
          if (staticAt(x, y) === TILE.FLOOR && !hunterAt(x, y)) {
            player = { x, y };
            break outer;
          }
        }
      }
    }
  }

  function getLevelDef() {
    const levels = window.DRAGOS_REVENGE_LEVELS || [];
    return levels[levelIndex] || levels[0];
  }

  function startLevel(idx) {
    levelIndex = idx;
    const def = getLevelDef();
    if (!def) return;
    parseLevel(def);
    const mode = MODES[difficulty] || MODES.hard;
    timeLeft = def.timeLimit + mode.timeBonus;
    playerMoves = 0;
    updateHud();
    draw();
    startTimer();
    hideOverlays();
    screen = "play";
    if (els.hud) els.hud.hidden = false;
    if (els.level) {
      els.level.hidden = false;
      els.level.classList.add("is-visible");
    }
    announce(`Level ${def.id}: ${def.name}`);
    startAnimLoop();
  }

  function makeHunter(x, y) {
    return {
      x,
      y,
      id: ++hunterIdSeq,
      fromX: x,
      fromY: y,
      moveStart: 0,
      facingX: 0,
      facingY: 1,
    };
  }

  function startAnimLoop() {
    stopAnimLoop();
    const frame = () => {
      if (screen !== "play") return;
      draw();
      animFrameId = requestAnimationFrame(frame);
    };
    animFrameId = requestAnimationFrame(frame);
  }

  function stopAnimLoop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = 0;
    }
  }

  function startTimer() {
    stopTimer();
    timerId = window.setInterval(() => {
      if (screen !== "play") return;
      timeLeft -= 1;
      updateHud();
      if (timeLeft <= 0) loseLife("Time's up!");
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
    stopAnimLoop();
  }

  function updateHud() {
    const def = getLevelDef();
    if (els.lives) {
      els.lives.textContent = "♥".repeat(Math.max(0, lives)) + "♡".repeat(Math.max(0, MAX_LIVES - lives));
    }
    if (els.timer) {
      const m = Math.floor(Math.max(0, timeLeft) / 60);
      const s = Math.max(0, timeLeft) % 60;
      els.timer.textContent = `${m}:${String(s).padStart(2, "0")}`;
    }
    if (els.score) els.score.textContent = String(score);
    if (els.level) els.level.textContent = `Level ${def ? def.id : 1} / ${(window.DRAGOS_REVENGE_LEVELS || []).length}`;
  }

  function hideOverlays() {
    ["menu", "howto", "levelClear", "victory", "gameOver"].forEach((id) => {
      const el = els[id];
      if (el) el.hidden = true;
    });
  }

  function spawnPickup(x, y) {
    const color = PICKUP_COLORS[pickups.length % PICKUP_COLORS.length];
    pickups.push({ x, y, color });
  }

  function removeHunter(h) {
    hunters = hunters.filter((x) => x.id !== h.id);
  }

  function hunterCanMove(x, y, self) {
    if (!isFloorWalkable(x, y)) return false;
    if (self && hunters.some((h) => h !== self && h.x === x && h.y === y)) return false;
    return true;
  }

  function pickHunterStep(h) {
    const dx = player.x - h.x;
    const dy = player.y - h.y;
    const steps = [];

    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx !== 0) steps.push([Math.sign(dx), 0]);
      if (dy !== 0) steps.push([0, Math.sign(dy)]);
    } else {
      if (dy !== 0) steps.push([0, Math.sign(dy)]);
      if (dx !== 0) steps.push([Math.sign(dx), 0]);
    }

    for (const [mx, my] of steps) {
      const nx = h.x + mx;
      const ny = h.y + my;
      if (hunterCanMove(nx, ny, h)) return [mx, my];
    }

    const wander = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    for (let i = wander.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wander[i], wander[j]] = [wander[j], wander[i]];
    }
    for (const [mx, my] of wander) {
      const nx = h.x + mx;
      const ny = h.y + my;
      if (hunterCanMove(nx, ny, h)) return [mx, my];
    }

    return [0, 0];
  }

  function moveHunter(h, nx, ny) {
    if (h.x === nx && h.y === ny) return;
    h.fromX = h.x;
    h.fromY = h.y;
    h.facingX = nx - h.x;
    h.facingY = ny - h.y;
    h.x = nx;
    h.y = ny;
    h.moveStart = performance.now();
  }

  function isHunterTrapped(h) {
    const dirs = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];
    return !dirs.some(([dx, dy]) => {
      const nx = h.x + dx;
      const ny = h.y + dy;
      if (!inBounds(nx, ny)) return false;
      const t = staticAt(nx, ny);
      return t === TILE.FLOOR && !hunterAt(nx, ny) && !pickupAt(nx, ny);
    });
  }

  function checkTrappedHunters() {
    hunters.slice().forEach((h) => {
      if (isHunterTrapped(h)) {
        spawnPickup(h.x, h.y);
        removeHunter(h);
        announce("Knight trapped — collect the tile!");
      }
    });
  }

  function getSlidableChain(nx, ny, dx, dy) {
    const blocks = [];
    let cx = nx;
    let cy = ny;
    while (inBounds(cx, cy) && staticAt(cx, cy) === TILE.SLIDABLE) {
      blocks.push({ x: cx, y: cy });
      cx += dx;
      cy += dy;
    }
    return { blocks, tailX: cx, tailY: cy };
  }

  function canPushChain(tailX, tailY) {
    if (!inBounds(tailX, tailY)) return false;
    if (staticAt(tailX, tailY) !== TILE.FLOOR) return false;
    if (pickupAt(tailX, tailY)) return false;
    if (hunterAt(tailX, tailY)) return false;
    return true;
  }

  function pushSlidableChain(blocks, dx, dy) {
    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      grid[b.y][b.x] = TILE.FLOOR;
      grid[b.y + dy][b.x + dx] = TILE.SLIDABLE;
    }
  }

  function tryMovePlayer(dx, dy) {
    if (screen !== "play") return;
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (!inBounds(nx, ny)) return;

    const target = staticAt(nx, ny);

    if (target === TILE.SLIDABLE) {
      const { blocks, tailX, tailY } = getSlidableChain(nx, ny, dx, dy);
      if (blocks.length === 0) return;
      if (!canPushChain(tailX, tailY)) return;
      pushSlidableChain(blocks, dx, dy);
      player.x = nx;
      player.y = ny;
    } else if (isPlayerWalkable(nx, ny)) {
      if (hunterAt(nx, ny)) {
        loseLife("A knight caught Drago!");
        return;
      }
      player.x = nx;
      player.y = ny;
      const pu = pickupAt(nx, ny);
      if (pu) {
        pickups = pickups.filter((p) => p !== pu);
        score += SCORE.trapCollect;
        announce("Dragon tile collected!");
      }
    } else {
      return;
    }

    playerMoves += 1;
    const def = getLevelDef();
    const mode = MODES[difficulty] || MODES.hard;
    const every = def.hunterEvery || mode.hunterEvery;
    if (playerMoves % every === 0) tickHunters();

    checkTrappedHunters();
    checkWin();
    updateHud();
  }

  function tickHunters() {
    hunters.slice().forEach((h) => {
      const [mx, my] = pickHunterStep(h);
      if (mx === 0 && my === 0) return;

      const nx = h.x + mx;
      const ny = h.y + my;

      if (nx === player.x && ny === player.y) {
        loseLife("A knight caught Drago!");
        return;
      }

      moveHunter(h, nx, ny);
    });
  }

  function checkWin() {
    if (hunters.length === 0 && pickups.length === 0) {
      const def = getLevelDef();
      score += SCORE.levelClear * (def ? def.id : 1);
      stopTimer();
      const levels = window.DRAGOS_REVENGE_LEVELS || [];
      if (levelIndex + 1 >= levels.length) {
        screen = "victory";
        if (score > best) {
          best = score;
          localStorage.setItem(STORAGE.best, String(best));
        }
        if (els.victory) els.victory.hidden = false;
        if (els.victoryScore) els.victoryScore.textContent = `Final score: ${score}`;
        announce("You cleared all levels!");
      } else {
        screen = "levelClear";
        if (els.levelClear) els.levelClear.hidden = false;
        if (els.levelClearMsg) els.levelClearMsg.textContent = `${def.name} cleared! +${SCORE.levelClear * def.id} points`;
        announce(`Level ${def.id} cleared!`);
      }
      updateHud();
      draw();
    }
  }

  function loseLife(reason) {
    lives -= 1;
    announce(reason || "Life lost");
    if (lives <= 0) {
      stopTimer();
      screen = "gameOver";
      if (els.gameOver) els.gameOver.hidden = false;
      if (els.gameOverScore) els.gameOverScore.textContent = `Score: ${score}`;
      if (score > best) {
        best = score;
        localStorage.setItem(STORAGE.best, String(best));
        if (els.gameOverBest) {
          els.gameOverBest.hidden = false;
          els.gameOverBest.textContent = "New best score!";
        }
      }
      draw();
      return;
    }
    startLevel(levelIndex);
  }

  function tileSize() {
    return Math.floor(Math.min(canvas.width / GRID_W, canvas.height / GRID_H));
  }

  function isWallCorner(x, y) {
    const onEdgeX = x === 0 || x === GRID_W - 1;
    const onEdgeY = y === 0 || y === GRID_H - 1;
    return onEdgeX && onEdgeY;
  }

  function drawTileImage(img, x, y, size) {
    if (!img) return;
    ctx.drawImage(img, x * size, y * size, size, size);
  }

  function drawTileRotated(img, x, y, size, rotation) {
    if (!img) return;
    const cx = x * size + size / 2;
    const cy = y * size + size / 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function cornerRotation(x, y) {
    if (x === 0 && y === 0) return 0;
    if (x === GRID_W - 1 && y === 0) return Math.PI / 2;
    if (x === 0 && y === GRID_H - 1) return -Math.PI / 2;
    if (x === GRID_W - 1 && y === GRID_H - 1) return Math.PI;
    return 0;
  }

  function edgeRotation(x, y) {
    if (y === 0) return 0;
    if (y === GRID_H - 1) return Math.PI;
    if (x === 0) return -Math.PI / 2;
    if (x === GRID_W - 1) return Math.PI / 2;
    return 0;
  }

  function drawWall(x, y, size) {
    if (isWallCorner(x, y)) {
      drawTileRotated(images.wallCorner, x, y, size, cornerRotation(x, y));
    } else {
      drawTileRotated(images.wallBorder, x, y, size, edgeRotation(x, y));
    }
  }

  function hunterVisualPos(h, now) {
    let px = h.x;
    let py = h.y;
    if (h.moveStart && now - h.moveStart < HUNTER_SLIDE_MS) {
      const t = Math.min(1, (now - h.moveStart) / HUNTER_SLIDE_MS);
      const ease = 1 - (1 - t) ** 2;
      px = h.fromX + (h.x - h.fromX) * ease;
      py = h.fromY + (h.y - h.fromY) * ease;
    }
    const bob = Math.sin(now * HUNTER_BOB_HZ + h.id * 1.9) * 0.07;
    const leanX = (h.facingX || 0) * 0.05;
    const leanY = (h.facingY || 0) * 0.03;
    return { px, py, bob, leanX, leanY };
  }

  function drawHunter(h, size, now) {
    const { px, py, bob, leanX, leanY } = hunterVisualPos(h, now);
    const cx = px * size + size / 2 + leanX * size;
    const cy = py * size + size / 2 + bob * size + leanY * size;
    const r = size * 0.32;
    const pulse = 1 + Math.sin(now * HUNTER_BOB_HZ * 1.4 + h.id) * 0.04;

    ctx.fillStyle = "#d4af37";
    ctx.beginPath();
    ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5c4a1a";
    ctx.lineWidth = Math.max(1, size * 0.04);
    ctx.stroke();
    ctx.fillStyle = "#333";
    ctx.fillRect(cx - r * 0.55, cy - r * 0.15, r * 1.1, r * 0.35);
  }

  function draw() {
    if (!ctx || !canvas) return;
    const size = tileSize();
    const boardW = size * GRID_W;
    const boardH = size * GRID_H;
    const ox = (canvas.width - boardW) / 2;
    const oy = (canvas.height - boardH) / 2;

    ctx.fillStyle = "#5a6b2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(ox, oy);
    ctx.imageSmoothingEnabled = false;

    for (let y = 0; y < GRID_H; y++) {
      for (let x = 0; x < GRID_W; x++) {
        const t = staticAt(x, y);

        if (t === TILE.FLOOR) {
          ctx.fillStyle = FLOOR_COLOR;
          ctx.fillRect(x * size, y * size, size, size);
        } else if (t === TILE.WALL) {
          drawWall(x, y, size);
        } else if (t === TILE.TOOTH) {
          drawTileImage(images.tooth, x, y, size);
        } else if (t === TILE.SLIDABLE) {
          drawTileImage(images.slidable, x, y, size);
        }
      }
    }

    pickups.forEach((p) => {
      if (staticAt(p.x, p.y) === TILE.SLIDABLE) return;
      const img = pickupImages[p.color];
      drawTileImage(img, p.x, p.y, size);
    });

    const now = performance.now();
    hunters.forEach((h) => drawHunter(h, size, now));

    drawTileImage(images.drago, player.x, player.y, size);

    ctx.restore();
  }

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    if (!wrap) return;
    const max = Math.min(wrap.clientWidth, 640);
    canvas.width = max;
    canvas.height = max;
    draw();
  }

  function handleKey(e) {
    if (screen === "menu" || screen === "howto") return;
    const map = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0],
    };
    const dir = map[e.key];
    if (!dir) return;
    e.preventDefault();
    if (e.repeat) return;
    tryMovePlayer(dir[0], dir[1]);
  }

  function bindTouch(btn, dx, dy) {
    if (!btn) return;
    const down = (e) => {
      e.preventDefault();
      tryMovePlayer(dx, dy);
      heldDir = `${dx},${dy}`;
      keyRepeatTimer = window.setInterval(() => tryMovePlayer(dx, dy), KEY_REPEAT_MS);
    };
    const up = () => {
      heldDir = null;
      if (keyRepeatTimer) {
        clearInterval(keyRepeatTimer);
        keyRepeatTimer = 0;
      }
    };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointerleave", up);
    btn.addEventListener("pointercancel", up);
  }

  function readStorage() {
    best = parseInt(localStorage.getItem(STORAGE.best) || "0", 10) || 0;
    difficulty = localStorage.getItem(STORAGE.difficulty) || "hard";
    if (!MODES[difficulty]) difficulty = "hard";
  }

  function bindUi() {
    els = {
      menu: $("dr-menu"),
      howto: $("dr-howto"),
      levelClear: $("dr-level-clear"),
      victory: $("dr-victory"),
      gameOver: $("dr-game-over"),
      hud: $("dr-hud"),
      lives: $("dr-lives"),
      timer: $("dr-timer"),
      score: $("dr-score"),
      level: $("dr-level"),
      best: $("dr-best"),
      levelClearMsg: $("dr-level-clear-msg"),
      victoryScore: $("dr-victory-score"),
      gameOverScore: $("dr-game-over-score"),
      gameOverBest: $("dr-game-over-best"),
      sr: $("dr-sr-announce"),
    };

    if (els.best) els.best.textContent = String(best);

    const diffEasy = $("dr-diff-easy");
    const diffHard = $("dr-diff-hard");
    if (difficulty === "easy" && diffEasy) diffEasy.checked = true;
    if (difficulty === "hard" && diffHard) diffHard.checked = true;

    $("dr-btn-play")?.addEventListener("click", () => {
      difficulty = diffHard?.checked ? "hard" : "easy";
      localStorage.setItem(STORAGE.difficulty, difficulty);
      lives = MAX_LIVES;
      score = 0;
      levelIndex = 0;
      hideOverlays();
      if (els.menu) els.menu.hidden = true;
      startLevel(0);
    });

    $("dr-btn-howto")?.addEventListener("click", () => {
      if (els.menu) els.menu.hidden = true;
      if (els.howto) els.howto.hidden = false;
    });

    $("dr-howto-back")?.addEventListener("click", () => {
      if (els.howto) els.howto.hidden = true;
      if (els.menu) els.menu.hidden = false;
    });

    $("dr-btn-next")?.addEventListener("click", () => {
      hideOverlays();
      startLevel(levelIndex + 1);
    });

    $("dr-btn-victory-retry")?.addEventListener("click", () => resetToMenu(true));
    $("dr-btn-retry")?.addEventListener("click", () => {
      lives = MAX_LIVES;
      score = 0;
      levelIndex = 0;
      hideOverlays();
      startLevel(0);
    });
    $("dr-btn-menu")?.addEventListener("click", () => resetToMenu(false));
    $("dr-btn-menu-go")?.addEventListener("click", () => resetToMenu(false));

    bindTouch($("dr-touch-up"), 0, -1);
    bindTouch($("dr-touch-down"), 0, 1);
    bindTouch($("dr-touch-left"), -1, 0);
    bindTouch($("dr-touch-right"), 1, 0);

    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", resizeCanvas);
  }

  function resetToMenu(fromVictory) {
    stopTimer();
    screen = "menu";
    hideOverlays();
    if (els.menu) els.menu.hidden = false;
    if (els.hud) els.hud.hidden = true;
    if (els.level) {
      els.level.hidden = true;
      els.level.classList.remove("is-visible");
    }
    if (els.best) els.best.textContent = String(best);
    draw();
    if (fromVictory) announce("Thanks for playing!");
  }

  window.initDragosRevenge = async function initDragosRevenge() {
    canvas = $("dr-canvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    readStorage();
    bindUi();

    try {
      await loadAssets();
    } catch (err) {
      console.warn("Drago's Revenge asset load issue:", err);
    }

    resizeCanvas();
    draw();
  };
})();
