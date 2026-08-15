# Whack-a-Fruit — Unlock integration

**Requires:** `whack-a-fruit-unlocked`  
**Earned by clearing:** `hangman-lite` → Terminal code `WHACK-GRID-10`  
**Reward code (shown on hub after clear):** `PATTERN-AB-11`  
**Unlocks next:** Pattern Builder via Terminal `LOGIN PATTERN-AB-11`

## Prerequisite chain (abbreviated)

… → Simon Says Light Pad → `HANG-FRUIT-9` → Hangman Lite → `WHACK-GRID-10` → **Whack-a-Fruit**

## Hub

`assets/js/games.js`:

- `id: "whack-a-fruit"`
- `title: "Whack-a-Fruit"`
- `requiresUnlock: "whack-a-fruit-unlocked"`
- `rewardCode: "PATTERN-AB-11"`
- `status: "in-production"`

## Terminal

```javascript
"WHACK-GRID-10": {
  unlockId: KEYS.whackAFruit,
  unlocksGameId: "whack-a-fruit",
  unlocksGameTitle: "Whack-a-Fruit",
  fromGameId: "hangman-lite",
},
"PATTERN-AB-11": {
  unlockId: KEYS.patternBuilder,
  unlocksGameId: "pattern-builder",
  unlocksGameTitle: "Pattern Builder",
  fromGameId: "whack-a-fruit",
},
```

## Clear condition

Complete one **Whack Round** — score ≥ **15** correct taps before 60 s expires → `KIDS_UNLOCKS.markCleared("whack-a-fruit")`.

## Win UI copy

**Headline:** Whack wizard!  
**Reward line:** Your code: **PATTERN-AB-11**  
**Hint:** Type `LOGIN PATTERN-AB-11` in Terminal Trainer to unlock Pattern Builder.
