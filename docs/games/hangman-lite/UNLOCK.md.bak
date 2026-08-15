# Hangman Lite — Unlock integration

**Requires:** `hangman-lite-unlocked`  
**Earned by clearing:** `simon-says` → Terminal code `HANG-FRUIT-9`  
**Reward code (shown on hub after clear):** `WHACK-GRID-10`  
**Unlocks next:** Whack-a-Fruit via Terminal `LOGIN WHACK-GRID-10`

## Prerequisite chain (abbreviated)

… → Count the Dragons → `SIMON-GLOW-8` → Simon Says Light Pad → `HANG-FRUIT-9` → **Hangman Lite**

## Hub

`assets/js/games.js`:

- `id: "hangman-lite"`
- `title: "Hangman Lite"`
- `requiresUnlock: "hangman-lite-unlocked"`
- `rewardCode: "WHACK-GRID-10"`
- `status: "in-production"`

## Terminal

```javascript
"HANG-FRUIT-9": {
  unlockId: KEYS.hangmanLite,
  unlocksGameId: "hangman-lite",
  unlocksGameTitle: "Hangman Lite",
  fromGameId: "simon-says",
},
"WHACK-GRID-10": {
  unlockId: KEYS.whackAFruit,
  unlocksGameId: "whack-a-fruit",
  unlocksGameTitle: "Whack-a-Fruit",
  fromGameId: "hangman-lite",
},
```

## Clear condition

Complete one **Word Run** (5 words solved) → `KIDS_UNLOCKS.markCleared("hangman-lite")`.

## Win UI copy

**Headline:** Word wizard!  
**Reward line:** Your code: **WHACK-GRID-10**  
**Hint:** Type `LOGIN WHACK-GRID-10` in Terminal Trainer to unlock Whack-a-Fruit.
