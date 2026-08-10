# Pattern Builder — Unlock integration

**Requires:** `pattern-builder-unlocked`  
**Earned by clearing:** `whack-a-fruit` → Terminal code `WHACK-GRID-10`  
**Reward code (shown on hub after clear):** `MAZE-PATH-12`  
**Unlocks next:** Maze Generator via Terminal `LOGIN MAZE-PATH-12`

## Prerequisite chain (abbreviated)

… → Hangman Lite → `WHACK-GRID-10` → Whack-a-Fruit → `PATTERN-AB-11` → **Pattern Builder**

## Hub

`assets/js/games.js`:

- `id: "pattern-builder"`
- `title: "Pattern Builder"`
- `requiresUnlock: "pattern-builder-unlocked"`
- `rewardCode: "MAZE-PATH-12"`
- `status: "in-production"`

## Terminal

```javascript
"PATTERN-AB-11": {
  unlockId: KEYS.patternBuilder,
  unlocksGameId: "pattern-builder",
  unlocksGameTitle: "Pattern Builder",
  fromGameId: "whack-a-fruit",
},
"MAZE-PATH-12": {
  unlockId: KEYS.mazeGenerator,
  unlocksGameId: "maze-generator",
  unlocksGameTitle: "Maze Generator",
  fromGameId: "pattern-builder",
},
```

## Clear condition

Complete one **Pattern Run** (8 puzzles solved) → `KIDS_UNLOCKS.markCleared("pattern-builder")`.

## Win UI copy

**Headline:** Pattern pro!  
**Reward line:** Your code: **MAZE-PATH-12**  
**Hint:** Type `LOGIN MAZE-PATH-12` in Terminal Trainer to unlock Maze Generator.
