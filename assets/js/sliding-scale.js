function initSlidingScale() {
  const logic = window.SlidingScaleLogic;
  if (!logic) return;

  const {
    SLIDER_IMAGES,
    SLIDER_DIFFICULTIES,
    sliderEmptyTile,
    sliderShuffleBoard,
    sliderIsWin,
    sliderSlideToward,
    sliderIndexToRowCol,
    sliderTileBackgroundStyle,
    sliderPickRandomImage,
    sliderPickWinMessage,
    sliderCreateRng,
    sliderParseOptions,
  } = logic;

  const mount = document.getElementById("slider-puzzle-mount");
  if (!mount) return;

  const queryOpts = sliderParseOptions(window.location.search);

  mount.innerHTML = `
    <section class="ss-puzzle" aria-label="The Sliding Scale puzzle game">
      <div class="ss-puzzle-toolbar">
        <div class="ss-puzzle-difficulty" role="group" aria-label="Difficulty">
          ${Object.entries(SLIDER_DIFFICULTIES)
            .map(
              ([key, { label }]) =>
                `<button type="button" class="btn btn-soft ss-diff-btn" data-diff="${key}">${label}</button>`
            )
            .join("")}
        </div>
        <div class="ss-puzzle-actions">
          <button type="button" class="btn btn-primary" id="ss-shuffle">Shuffle</button>
        </div>
      </div>
      <div class="ss-puzzle-meta">
        <div class="ss-puzzle-stats-wrap">
          <p class="ss-puzzle-stats"><span id="ss-moves">0</span> moves</p>
          <p class="ss-puzzle-art" id="ss-art-label"></p>
        </div>
        <figure class="ss-puzzle-ref">
          <img id="ss-ref-img" src="" alt="Reference: completed puzzle image" width="192" height="108" loading="lazy" />
          <figcaption>Reference</figcaption>
        </figure>
      </div>
      <div class="ss-puzzle-board-wrap">
        <div id="ss-board" class="ss-puzzle-board" role="grid" aria-label="Puzzle board"></div>
        <div id="ss-win" class="ss-puzzle-win" hidden>
          <p class="ss-puzzle-win-title" id="ss-win-title"></p>
          <p class="ss-puzzle-win-body" id="ss-win-body"></p>
          <button type="button" class="btn btn-primary" id="ss-play-again">Play again</button>
        </div>
      </div>
      <p class="ss-puzzle-hint">Click tiles in the same row or column as the empty square to slide them into place. Tap farther from the open slot to move more tiles at once. Arrow keys move one tile at a time.</p>
    </section>
  `;

  const boardEl = document.getElementById("ss-board");
  const movesEl = document.getElementById("ss-moves");
  const winEl = document.getElementById("ss-win");
  const winTitleEl = document.getElementById("ss-win-title");
  const winBodyEl = document.getElementById("ss-win-body");
  const artLabelEl = document.getElementById("ss-art-label");
  const refImgEl = document.getElementById("ss-ref-img");
  const diffBtns = mount.querySelectorAll(".ss-diff-btn");

  let size = SLIDER_DIFFICULTIES.easy.size;
  let difficulty = queryOpts.difficulty || "easy";
  let currentImage = queryOpts.image || SLIDER_IMAGES[0];
  let rng = sliderCreateRng(queryOpts.seed);
  let state = [];
  let moves = 0;
  let solved = false;

  function emptyTile() {
    return sliderEmptyTile(size);
  }

  function resetStats() {
    moves = 0;
    solved = false;
    if (movesEl) movesEl.textContent = "0";
    if (winEl) winEl.hidden = true;
  }

  function updateImageUI() {
    if (artLabelEl) artLabelEl.textContent = `Art: ${currentImage.label}`;
    if (refImgEl) {
      refImgEl.src = currentImage.src;
      refImgEl.alt = `Reference: ${currentImage.label}`;
    }
  }

  function pickNextImage({ randomize = false } = {}) {
    if (queryOpts.image) {
      currentImage = queryOpts.image;
      return;
    }
    if (randomize || !currentImage) {
      currentImage = sliderPickRandomImage(SLIDER_IMAGES, rng, randomize ? currentImage?.id : null);
    }
  }

  function renderBoard() {
    if (!boardEl) return;

    boardEl.style.setProperty("--ss-size", String(size));
    boardEl.innerHTML = "";

    state.forEach((tile, position) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "ss-tile";
      cell.dataset.position = String(position);

      if (tile === emptyTile()) {
        cell.classList.add("ss-tile-empty");
        cell.setAttribute("aria-label", "Empty space");
        cell.disabled = true;
        cell.tabIndex = -1;
      } else {
        cell.style.cssText = sliderTileBackgroundStyle(tile, size, currentImage.src);
        cell.setAttribute("aria-label", `Tile ${tile + 1}`);
        cell.addEventListener("click", () => tryMove(position));
      }

      boardEl.appendChild(cell);
    });
  }

  function updateDifficultyUI() {
    diffBtns.forEach((btn) => {
      const active = btn.dataset.diff === difficulty;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function showWin() {
    solved = true;
    const winCopy = sliderPickWinMessage(currentImage.id, rng);
    if (winTitleEl) winTitleEl.textContent = winCopy.title;
    if (winBodyEl) winBodyEl.textContent = winCopy.body;
    if (winEl) winEl.hidden = false;

    const emptyCell = boardEl?.querySelector(".ss-tile-empty");
    if (emptyCell) {
      emptyCell.classList.remove("ss-tile-empty");
      emptyCell.disabled = false;
      emptyCell.style.cssText = sliderTileBackgroundStyle(emptyTile(), size, currentImage.src);
      emptyCell.setAttribute("aria-label", "Final tile");
    }
  }

  function applySlide(position) {
    if (solved) return;

    const result = sliderSlideToward(state, position, size);
    if (!result) return;

    state = result.state;
    moves += result.tilesMoved;
    if (movesEl) movesEl.textContent = String(moves);

    renderBoard();

    if (sliderIsWin(state)) showWin();
  }

  function tryMove(position) {
    applySlide(position);
  }

  function tryMoveFromKey(direction) {
    const emptyIdx = state.indexOf(emptyTile());
    const { row, col } = sliderIndexToRowCol(emptyIdx, size);
    let target = -1;

    if (direction === "up" && row < size - 1) target = emptyIdx + size;
    if (direction === "down" && row > 0) target = emptyIdx - size;
    if (direction === "left" && col < size - 1) target = emptyIdx + 1;
    if (direction === "right" && col > 0) target = emptyIdx - 1;

    if (target >= 0) applySlide(target);
  }

  function newGame(nextDifficulty, options = {}) {
    const { randomizeImage = false } = options;

    if (nextDifficulty) difficulty = nextDifficulty;
    size = SLIDER_DIFFICULTIES[difficulty].size;
    pickNextImage({ randomize: randomizeImage || !currentImage });
    updateImageUI();
    resetStats();
    state = sliderShuffleBoard(size, rng);
    updateDifficultyUI();
    renderBoard();
  }

  diffBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.diff;
      if (next && next !== difficulty) newGame(next, { randomizeImage: false });
    });
  });

  document.getElementById("ss-shuffle")?.addEventListener("click", () => newGame(undefined, { randomizeImage: !queryOpts.image }));
  document.getElementById("ss-play-again")?.addEventListener("click", () => newGame(undefined, { randomizeImage: !queryOpts.image }));

  document.addEventListener("keydown", (event) => {
    if (!document.getElementById("slider-puzzle-mount")) return;

    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const dir = keyMap[event.key];
    if (!dir) return;

    event.preventDefault();
    tryMoveFromKey(dir);
  });

  newGame(difficulty, { randomizeImage: !queryOpts.image });
}
