# Typing Race — Unlock integration

**Requires:** `typing-race-unlocked`  
**Earned by clearing:** `alphabet-trace` → Terminal code `TYPE-FAST-5`  
**Reward code (shown on hub after clear):** `SORT-COLOR-6`  
**Unlocks next:** Color Match Sort via Terminal `LOGIN SORT-COLOR-6`

## Prerequisite chain (abbreviated)

Fruit Search → `TRACE-A-Z-4` → Alphabet Trace → `TYPE-FAST-5` → **Typing Race**

## Hub

`assets/js/games.js`:

- `id: "typing-race"`
- `requiresUnlock: "typing-race-unlocked"`
- `rewardCode: "SORT-COLOR-6"`
- `status: "in-production"`

## Terminal

```javascript
"TYPE-FAST-5": {
  unlockId: KEYS.typingRace,
  unlocksGameId: "typing-race",
  unlocksGameTitle: "Typing Race",
  fromGameId: "alphabet-trace",
},
"SORT-COLOR-6": {
  unlockId: KEYS.colorMatch,
  unlocksGameId: "color-match",
  unlocksGameTitle: "Color Match Sort",
  fromGameId: "typing-race",
},
```

## Clear condition

Complete one **Heat** (20 correct letters) → `KIDS_UNLOCKS.markCleared("typing-race")`.

## Win UI copy

**Headline:** Heat complete!  
**Reward line:** Your code: **SORT-COLOR-6**  
**Hint:** Type `LOGIN SORT-COLOR-6` in Terminal Trainer to unlock Color Match Sort.
