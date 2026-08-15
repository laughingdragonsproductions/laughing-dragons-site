# Maze Generator — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/maze-generator/index.html` | Gate + landing + `#maze-generator-root` |
| `assets/js/maze-generator.js` | `initMazeGenerator()` — generate, draw input, solve detect, win |
| `assets/js/maze-generator-algo.js` | Recursive backtracker + grid wall model |
| `assets/css/maze-generator.css` | Canvas, print styles, toolbar, overlays |

## Grid model

```javascript
// cell (x,y) has walls: { north, east, south, west }
export function generateMaze(cols, rows, seed) {
  // cols/rows odd for classic maze; 8×8 playable = 4×4 cells or 8×8 cell grid — pick one convention and document in code
  return { cells, start: { x: 0, y: 0 }, finish: { x: cols - 1, y: rows - 1 } };
}
```

Recommend **8×8 logical cells** (17×17 wall grid) for Small — adjust presets in config object.

## Path drawing

- Track `currentCell` on pointer move; snap to nearest cell center
- Append to path array if move is valid (adjacent + wall open)
- On entering finish cell → `onMazeSolved()`

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("maze-generator-unlocked")) {
  window.location.replace("/games/pattern-builder/");
}
```

## Clear hook

```javascript
if (mazesSolved >= 3) {
  window.KIDS_UNLOCKS.markCleared("maze-generator");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("maze-generator"));
}
```

Do not auto-grant `coloring-viewer-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Size preset + localStorage
- [ ] Maze generation (recursive backtracker)
- [ ] Canvas render walls + Start/Finish
- [ ] Pointer draw path + wall validation
- [ ] Clear path + New maze buttons
- [ ] Solve Run 3-maze counter
- [ ] Free Explore mode
- [ ] Print stylesheet + Print button
- [ ] Win overlay + COLOR-SVG-13

## Art

- Canvas stroke rendering only v1
- Optional Fruit Friend stamp at Finish in v1.1

## Out of scope v1

- Save maze PNG export
- Share link with seed
