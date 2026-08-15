# Color Match Sort — Unlock integration

**Requires:** `color-match-unlocked`  
**Earned by clearing:** `typing-race` → Terminal code `SORT-COLOR-6`  
**Reward code (shown on hub after clear):** `COUNT-DRAG-7`  
**Unlocks next:** Count the Dragons via Terminal `LOGIN COUNT-DRAG-7`

## Prerequisite chain (abbreviated)

… → Alphabet Trace → `TYPE-FAST-5` → Typing Race → `SORT-COLOR-6` → **Color Match Sort**

## Hub

`assets/js/games.js`:

- `id: "color-match"`
- `title: "Color Match Sort"`
- `requiresUnlock: "color-match-unlocked"`
- `rewardCode: "COUNT-DRAG-7"`
- `status: "in-production"`

## Terminal

```javascript
"SORT-COLOR-6": {
  unlockId: KEYS.colorMatch,
  unlocksGameId: "color-match",
  unlocksGameTitle: "Color Match Sort",
  fromGameId: "typing-race",
},
"COUNT-DRAG-7": {
  unlockId: KEYS.countTheDragons,
  unlocksGameId: "count-the-dragons",
  unlocksGameTitle: "Count the Dragons",
  fromGameId: "color-match",
},
```

## Clear condition

Complete one **Sort Round** (15 correct sorts) → `KIDS_UNLOCKS.markCleared("color-match")`.

## Win UI copy

**Headline:** Sorting star!  
**Reward line:** Your code: **COUNT-DRAG-7**  
**Hint:** Type `LOGIN COUNT-DRAG-7` in Terminal Trainer to unlock Count the Dragons.
