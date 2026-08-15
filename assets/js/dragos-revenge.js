(() => {
  "use strict";

  const ASSET_BASE = "/assets/kids/games/dragos-revenge";
  const TILE_BASE = "/assets/kids/games/memory-matching/tiles";
  const ASSET_VERSION = "20260815b";
  const FLOOR_COLOR = "#9a9450";

  const asset = (file) => `${ASSET_BASE}/${file}?v=${ASSET_VERSION}`;
  const tileAsset = (file) => `${TILE_BASE}/${file}?v=${ASSET_VERSION}`;

  const STORAGE = { best: "ldp-dragos-revenge-best", difficulty: "ldp-dragos-revenge-difficulty" };

  const TILE = { FLOOR: 0, WALL: 1, SLIDABLE: 2, TOOTH: 3 };

  const HUNTER_STATE = { ACTIVE: "active", TRAPPED: "trapped" };

  const PICKUP_COLORS = ["green", "red", "blue", "purple", "orange", "pink", "teal", "charcoal"];

  const MODES = {
    easy: { id: "easy", moveInterval: 0.75, timeBonus: 30, label: "Easy" },
    hard: { id: "hard", moveInterval: 0.32, timeBonus: 0, label: "Hard" },
  };

  const DIRS_8 = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  const HUNTER_SLIDE_MS = 140;
  const HUNTER_BOB_HZ = 0.0055;
  const MAX_FRAME_DT = 0.05;

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

  /** @type {number[][]} */
  let grid = [];
  /** @type {{x:number,y:number}} */
  let player = { x: 0, y: 0 };
  /** @type {Array<object>} */
  let hunters = [];
  /** @type {Array<{x:number,y:number,color:string}>} */
  let pickups = [];
  let hunterIdSeq = 0;

  let keyRepeatTimer = 0;
  let heldDir = null;
  const KEY_REPEAT_MS = 140;
  let animFrameId = 0;
  let lastFrameTime = 0;

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
    const [drago, wallBorder, wallCorner, slidable, tooth, teethHunter] = await Promise.all([
      loadImage(asset("drago-player.png")),
      loadImage(asset("wall-border.png")),
      loadImage(asset("wall-corner.png")),
      loadFirstAvailable([asset("slidable.jpg"), asset("slidable-tile.png")]),
      loadFirstAvailable([asset("tooth-tile.png"), asset("wall-cluster.jpg")]),
      loadFirstAvailable([asset("teeth-hunter.png"), asset("teethsprite.png")]),
    ]);
    images = { drago, wallBorder, wallCorner, slidable, tooth, teethHunter };
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

  function hunterMoveInterval() {
    const def = getLevelDef();
    const mode = MODES[difficulty] || MODES.hard;
    if (def && def.hunterMoveInterval != null) return def.hunterMoveInterval;
    return mode.moveInterval;
  }

  function isFloorTile(x, y) {
    return staticAt(x, y) === TILE.FLOOR;
  }

  /** Pathfinding: goal tile always enterable; ignore other hunters. */
  function hunterCanEnterPath(x, y, goal) {
    if (!inBounds(x, y)) return false;
    if (x === goal.x && y === goal.y) return true;
    if (!isFloorTile(x, y)) return false;
    if (pickupAt(x, y)) return false;
    return true;
  }

  /** Movement / trap: empty floor only, no pickups. */
  function hunterCanEnterMove(x, y) {
    if (!inBounds(x, y)) return false;
    if (!isFloorTile(x, y)) return false;
    if (pickupAt(x, y)) return false;
    return true;
  }

  function hunterBlocksCell(h, x, y) {
    const other = hunterAt(x, y);
    return other && other !== h;
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
    updateHud();
    draw();
    startTimer();
    hideOverlays();
    screen = "play";
    lastFrameTime = performance.now();
    if (els.hud) els.hud.hidden = false;
    if (els.level) {
      els.level.hidden = false;
      els.level.classList.add("is-visible");
    }
    announce(`Level ${def.id}: ${def.name}`);
    startAnimLoop();
  }

  function makeHunter(x, y) {
    const interval = hunterMoveInterval();
    return {
      x,
      y,
      id: ++hunterIdSeq,
      state: HUNTER_STATE.ACTIVE,
      moveTimer: Math.random() * interval * 0.5,
      moveInterval: interval,
      fromX: x,
      fromY: y,
      moveStart: 0,
      facingX: 0,
      facingY: 1,
    };
  }

  function startAnimLoop() {
    stopAnimLoop();
    lastFrameTime = performance.now();
    const frame = (now) => {
      if (screen !== "play") return;
      const dt = Math.min(MAX_FRAME_DT, (now - lastFrameTime) / 1000);
      lastFrameTime = now;
      updateHunterSimulation(dt);
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
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
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

  function bfsPath8(start, goal) {
    const sk = cellKey(start.x, start.y);
    const gk = cellKey(goal.x, goal.y);
    if (sk === gk) return [start];

    const queue = [start];
    const cameFrom = new Map([[sk, null]]);

    while (queue.length > 0) {
      const current = queue.shift();
      const ck = cellKey(current.x, current.y);
      if (ck === gk) {
        const path = [];
        let cur = gk;
        while (cur) {
          const [px, py] = cur.split(",").map(Number);
          path.unshift({ x: px, y: py });
          cur = cameFrom.get(cur);
        }
        return path;
      }

      for (const [dx, dy] of DIRS_8) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        const nk = cellKey(nx, ny);
        if (cameFrom.has(nk)) continue;
        if (!hunterCanEnterPath(nx, ny, goal)) continue;
        cameFrom.set(nk, ck);
        queue.push({ x: nx, y: ny });
      }
    }

    return null;
  }

  function pathDistanceToPlayer(x, y) {
    const path = bfsPath8({ x, y }, player);
    return path ? path.length - 1 : Infinity;
  }

  function chooseNextBestNeighbor(h) {
    let bestDistance = Infinity;
    const candidates = [];

    for (const [dx, dy] of DIRS_8) {
      const nx = h.x + dx;
      const ny = h.y + dy;
      if (!hunterCanEnterMove(nx, ny)) continue;
      if (hunterBlocksCell(h, nx, ny)) continue;

      const dist = pathDistanceToPlayer(nx, ny);
      if (dist < bestDistance) {
        bestDistance = dist;
        candidates.length = 0;
        candidates.push({ x: nx, y: ny });
      } else if (dist === bestDistance) {
        candidates.push({ x: nx, y: ny });
      }
    }

    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function randomWander(h) {
    const moves = [];
    for (const [dx, dy] of DIRS_8) {
      const nx = h.x + dx;
      const ny = h.y + dy;
      if (!hunterCanEnterMove(nx, ny)) continue;
      if (hunterBlocksCell(h, nx, ny)) continue;
      moves.push({ x: nx, y: ny });
    }
    if (moves.length === 0) return null;
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function pickHunterTarget(h) {
    const path = bfsPath8({ x: h.x, y: h.y }, player);
    if (path && path.length > 1) {
      const target = path[1];
      if (target.x === player.x && target.y === player.y) {
        return { x: target.x, y: target.y, catchPlayer: true };
      }
      if (!hunterBlocksCell(h, target.x, target.y)) {
        return { x: target.x, y: target.y, catchPlayer: false };
      }
      const alt = chooseNextBestNeighbor(h);
      if (alt) return { x: alt.x, y: alt.y, catchPlayer: false };
      return null;
    }

    const wander = randomWander(h);
    if (!wander) return null;
    return { x: wander.x, y: wander.y, catchPlayer: false };
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

  function stepHunter(h) {
    if (h.state !== HUNTER_STATE.ACTIVE) return;

    const target = pickHunterTarget(h);
    if (!target) return;

    if (target.catchPlayer) {
      loseLife("The chattering teeth got Drago!");
      return;
    }

    moveHunter(h, target.x, target.y);

    if (h.x === player.x && h.y === player.y) {
      loseLife("The chattering teeth got Drago!");
    }
  }

  function updateHunterSimulation(dt) {
    if (screen !== "play" || hunters.length === 0) return;

    for (const h of hunters) {
      if (h.state !== HUNTER_STATE.ACTIVE) continue;
      h.moveTimer += dt;
      while (h.moveTimer >= h.moveInterval) {
        h.moveTimer -= h.moveInterval;
        stepHunter(h);
        if (screen !== "play") return;
      }
    }

    updateTrapStates();
    checkWin();
  }

  function getHunterClusters() {
    const unvisited = new Set(hunters.map((h) => h.id));
    const clusters = [];

    for (const h of hunters) {
      if (!unvisited.has(h.id)) continue;
      const cluster = [];
      const queue = [h];
      unvisited.delete(h.id);

      while (queue.length > 0) {
        const cur = queue.shift();
        cluster.push(cur);

        for (const [dx, dy] of DIRS_8) {
          const nx = cur.x + dx;
          const ny = cur.y + dy;
          const neighbor = hunterAt(nx, ny);
          if (!neighbor || !unvisited.has(neighbor.id)) continue;
          unvisited.delete(neighbor.id);
          queue.push(neighbor);
        }
      }

      clusters.push(cluster);
    }

    return clusters;
  }

  function clusterHasExit(cluster) {
    const clusterIds = new Set(cluster.map((h) => h.id));

    for (const h of cluster) {
      for (const [dx, dy] of DIRS_8) {
        const nx = h.x + dx;
        const ny = h.y + dy;
        if (!hunterCanEnterMove(nx, ny)) continue;
        const other = hunterAt(nx, ny);
        if (other && clusterIds.has(other.id)) continue;
        if (other) continue;
        return true;
      }
    }

    return false;
  }

  function updateTrapStates() {
    if (hunters.length === 0) return;

    const clusters = getHunterClusters();
    let trappedCount = 0;

    for (const cluster of clusters) {
      const trapped = !clusterHasExit(cluster);
      for (const h of cluster) {
        h.state = trapped ? HUNTER_STATE.TRAPPED : HUNTER_STATE.ACTIVE;
        if (trapped) trappedCount += 1;
      }
    }

    if (trappedCount === hunters.length) {
      convertAllTrappedToCheese();
    }
  }

  function convertAllTrappedToCheese() {
    hunters.forEach((h) => spawnPickup(h.x, h.y));
    hunters = [];
    announce("All teeth trapped — collect the dragon tiles!");
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

  function canPushOntoFloor(x, y) {
    if (!inBounds(x, y)) return false;
    if (!isFloorTile(x, y)) return false;
    if (pickupAt(x, y)) return false;
    return true;
  }

  function tryExecutePush(blocks, dx, dy) {
    const { tailX, tailY } = getSlidableChain(blocks[0].x, blocks[0].y, dx, dy);
    const hunter = hunterAt(tailX, tailY);

    if (hunter) {
      if (hunter.state === HUNTER_STATE.TRAPPED) return false;
      const beyondX = tailX + dx;
      const beyondY = tailY + dy;
      if (!canPushOntoFloor(beyondX, beyondY)) return false;
      if (hunterAt(beyondX, beyondY)) return false;
      moveHunter(hunter, beyondX, beyondY);
    } else {
      if (!canPushOntoFloor(tailX, tailY)) return false;
      if (hunterAt(tailX, tailY)) return false;
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
      const b = blocks[i];
      grid[b.y][b.x] = TILE.FLOOR;
      grid[b.y + dy][b.x + dx] = TILE.SLIDABLE;
    }

    return true;
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
      if (!tryExecutePush(blocks, dx, dy)) return;
      player.x = nx;
      player.y = ny;
    } else if (isPlayerWalkable(nx, ny)) {
      const h = hunterAt(nx, ny);
      if (h && h.state === HUNTER_STATE.ACTIVE) {
        loseLife("The chattering teeth got Drago!");
        return;
      }
      if (h) return;
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

    updateTrapStates();
    checkWin();
    updateHud();
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
    const trapped = h.state === HUNTER_STATE.TRAPPED;
    const bobHz = trapped ? HUNTER_BOB_HZ * 0.35 : HUNTER_BOB_HZ;
    const bobAmp = trapped ? 0.02 : 0.07;
    const bob = Math.sin(now * bobHz + h.id * 1.9) * bobAmp;
    const leanX = trapped ? 0 : (h.facingX || 0) * 0.05;
    const leanY = trapped ? 0 : (h.facingY || 0) * 0.03;
    return { px, py, bob, leanX, leanY, trapped };
  }

  function drawSpriteAt(img, px, py, size, offsetX, offsetY, alpha) {
    if (!img) return false;
    const x = px * size + offsetX;
    const y = py * size + offsetY;
    ctx.save();
    if (alpha != null && alpha < 1) ctx.globalAlpha = alpha;
    ctx.drawImage(img, x, y, size, size);
    ctx.restore();
    return true;
  }

  function drawHunterFallback(h, cx, cy, size, trapped) {
    const r = size * 0.32;
    ctx.fillStyle = trapped ? "#8a9a6a" : "#d4af37";
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = trapped ? "#4a5a3a" : "#5c4a1a";
    ctx.lineWidth = Math.max(1, size * 0.04);
    ctx.stroke();
  }

  function drawHunter(h, size, now) {
    const { px, py, bob, leanX, leanY, trapped } = hunterVisualPos(h, now);
    const leanPxX = leanX * size;
    const leanPxY = leanY * size + bob * size;
    const cx = px * size + size / 2 + leanPxX;
    const cy = py * size + size / 2 + leanPxY;

    const drew = drawSpriteAt(
      images.teethHunter,
      px,
      py,
      size,
      leanPxX,
      leanPxY,
      trapped ? 0.72 : 1
    );

    if (!drew) {
      drawHunterFallback(h, cx, cy, size, trapped);
    }

    if (trapped) {
      ctx.fillStyle = "rgba(74, 90, 58, 0.85)";
      ctx.font = `bold ${Math.max(8, size * 0.22)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("z", cx, cy - size * 0.18);
    }
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
