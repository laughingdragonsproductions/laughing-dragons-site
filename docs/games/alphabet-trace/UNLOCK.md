# Alphabet Trace — Unlock integration

**Requires:** `alphabet-trace-unlocked`  
**Earned by clearing:** `fruit-search` → Terminal code `TRACE-A-Z-4`  
**Reward code (shown on hub after clear):** `TYPE-FAST-5`  
**Unlocks next:** Typing Race via Terminal `LOGIN TYPE-FAST-5`

## Prerequisite paths

1. Beat Memory Matching at/under par → Fruit Search unlocks
2. Clear Fruit Search (one full round, 5 finds) → hub shows `TRACE-A-Z-4`
3. Terminal Trainer → `LOGIN TRACE-A-Z-4` → grants `alphabet-trace-unlocked`

## Hub

Entry in `assets/js/games.js`:

- `id: "alphabet-trace"`
- `requiresUnlock: "alphabet-trace-unlocked"`
- `rewardCode: "TYPE-FAST-5"`
- `status: "in-production"` until Brandon review

## Terminal

Code registered in `UNLOCK_CODES`:

```javascript
"TRACE-A-Z-4": {
  unlockId: KEYS.alphabetTrace,
  unlocksGameId: "alphabet-trace",
  unlocksGameTitle: "Alphabet Trace",
  fromGameId: "fruit-search",
},
```

Reward side (after clear):

```javascript
"TYPE-FAST-5": {
  unlockId: KEYS.typingRace,
  unlocksGameId: "typing-race",
  unlocksGameTitle: "Typing Race",
  fromGameId: "alphabet-trace",
},
```

## Clear condition

Complete Journey letters **A through J** → `KIDS_UNLOCKS.markCleared("alphabet-trace")`.

Do **not** call `KIDS_UNLOCKS.grant("typing-race-unlocked")` from game code.

## Win UI copy

**Headline:** Journey complete!  
**Reward line:** Your code: **TYPE-FAST-5**  
**Hint:** Type `LOGIN TYPE-FAST-5` in Terminal Trainer to unlock Typing Race.
