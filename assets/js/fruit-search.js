/** Fruit Search — I-Spy Fruit Friends (WIP scaffold) */
(function () {
  "use strict";

  const ASSET_BASE = "/assets/kids/games/fruit-search";
  const FINDS_TO_CLEAR = 5;

  function initFruitSearch() {
    const root = document.getElementById("fruit-search-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fruit-search-hud">
        <p class="fruit-search-prompt" id="fruit-search-prompt">Find the Fruit Friend!</p>
        <p class="fruit-search-score">Finds: <strong id="fruit-search-score">0</strong> / ${FINDS_TO_CLEAR}</p>
      </div>
      <div class="fruit-search-stage" id="fruit-search-stage">
        <p class="fruit-search-wip">Game build in progress — map and sprites loading next.</p>
      </div>
    `;
  }

  window.initFruitSearch = initFruitSearch;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFruitSearch);
  } else {
    initFruitSearch();
  }
})();
