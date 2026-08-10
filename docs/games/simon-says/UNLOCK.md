# Simon Says Light Pad — Unlock integration

**Requires:** `simon-says-unlocked`  
**Earned by clearing:** `count-the-dragons` → Terminal code `SIMON-GLOW-8`  
**Reward code (shown on hub after clear):** `HANG-FRUIT-9`  
**Unlocks next:** Hangman Lite via Terminal `LOGIN HANG-FRUIT-9`

## Prerequisite chain (abbreviated)

… → Color Match Sort → `COUNT-DRAG-7` → Count the Dragons → `SIMON-GLOW-8` → **Simon Says Light Pad**

## Hub

`assets/js/games.js`:

- `id: "simon-says"`
- `title: "Simon Says Light Pad"`
- `requiresUnlock: "simon-says-unlocked"`
- `rewardCode: "HANG-FRUIT-9"`
- `status: "in-production"`

## Terminal

```javascript
"SIMON-GLOW-8": {
  unlockId: KEYS.simonSays,
  unlocksGameId: "simon-says",
  unlocksGameTitle: "Simon Says Light Pad",
  fromGameId: "count-the-dragons",
},
"HANG-FRUIT-9": {
  unlockId: KEYS.hangmanLite,
  unlocksGameId: "hangman-lite",
  unlocksGameTitle: "Hangman Lite",
  fromGameId: "simon-says",
},
```

## Clear condition

Complete one **Memory Run** — reach sequence length **8** (Normal), **6** (Easy), or **10** (Hard) at least once → `KIDS_UNLOCKS.markCleared("simon-says")`.

## Win UI copy

**Headline:** Memory master!  
**Reward line:** Your code: **HANG-FRUIT-9**  
**Hint:** Type `LOGIN HANG-FRUIT-9` in Terminal Trainer to unlock Hangman Lite.
