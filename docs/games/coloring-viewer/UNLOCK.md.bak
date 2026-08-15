# Coloring Page Studio — Unlock integration

**Requires:** `coloring-viewer-unlocked`  
**Earned by clearing:** `maze-generator` → Terminal code `MAZE-PATH-12`  
**Reward code (shown on hub after clear):** *(none — final game in chain)*  
**Unlocks next:** *(none)*

## Prerequisite chain (abbreviated)

… → Pattern Builder → `MAZE-PATH-12` → Maze Generator → `COLOR-SVG-13` → **Coloring Page Studio**

## Hub

`assets/js/games.js`:

- `id: "coloring-viewer"`
- `title: "Coloring Page Studio"`
- `requiresUnlock: "coloring-viewer-unlocked"`
- `rewardCode` — omitted (no next game)
- `status: "in-production"`

## Terminal

```javascript
"COLOR-SVG-13": {
  unlockId: KEYS.coloringViewer,
  unlocksGameId: "coloring-viewer",
  unlocksGameTitle: "Coloring Page Studio",
  fromGameId: "maze-generator",
},
```

No entry in `REWARD_CODES_BY_GAME` for `coloring-viewer` — confirmed in `kids-unlocks.js`.

## Clear condition

Complete one **Studio Session** (3 distinct pages at ≥80% fill) → `KIDS_UNLOCKS.markCleared("coloring-viewer")`.

## Win UI copy

**Headline:** Master colorist!  
**Body:** You finished 3 coloring pages and completed the full Laughing Dragons unlock path.  
**Hint:** *(no LOGIN code)* — Return to the Games hub to replay any title.

## Chain completion

When cleared, hub card may show badge *Path complete* (Dave optional polish) — design-only note, not required v1.
