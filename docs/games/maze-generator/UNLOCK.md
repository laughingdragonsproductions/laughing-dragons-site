# Maze Generator — Unlock integration

**Requires:** `maze-generator-unlocked`  
**Earned by clearing:** `pattern-builder` → Terminal code `MAZE-PATH-12`  
**Reward code (shown on hub after clear):** `COLOR-SVG-13`  
**Unlocks next:** Coloring Page Studio via Terminal `LOGIN COLOR-SVG-13`

## Prerequisite chain (abbreviated)

… → Whack-a-Fruit → `PATTERN-AB-11` → Pattern Builder → `MAZE-PATH-12` → **Maze Generator**

## Hub

`assets/js/games.js`:

- `id: "maze-generator"`
- `title: "Maze Generator"`
- `requiresUnlock: "maze-generator-unlocked"`
- `rewardCode: "COLOR-SVG-13"`
- `status: "in-production"`

## Terminal

```javascript
"MAZE-PATH-12": {
  unlockId: KEYS.mazeGenerator,
  unlocksGameId: "maze-generator",
  unlocksGameTitle: "Maze Generator",
  fromGameId: "pattern-builder",
},
"COLOR-SVG-13": {
  unlockId: KEYS.coloringViewer,
  unlocksGameId: "coloring-viewer",
  unlocksGameTitle: "Coloring Page Studio",
  fromGameId: "maze-generator",
},
```

## Clear condition

Complete one **Solve Run** (3 mazes solved on screen) → `KIDS_UNLOCKS.markCleared("maze-generator")`.

## Win UI copy

**Headline:** Pathfinder pro!  
**Reward line:** Your code: **COLOR-SVG-13**  
**Hint:** Type `LOGIN COLOR-SVG-13` in Terminal Trainer to unlock Coloring Page Studio.
