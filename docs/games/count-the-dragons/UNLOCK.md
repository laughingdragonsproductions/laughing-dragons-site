# Count the Dragons — Unlock integration

**Requires:** `count-the-dragons-unlocked`  
**Earned by clearing:** `color-match` → Terminal code `COUNT-DRAG-7`  
**Reward code (shown on hub after clear):** `SIMON-GLOW-8`  
**Unlocks next:** Simon Says Light Pad via Terminal `LOGIN SIMON-GLOW-8`

## Prerequisite chain (abbreviated)

… → Typing Race → `SORT-COLOR-6` → Color Match Sort → `COUNT-DRAG-7` → **Count the Dragons**

## Hub

`assets/js/games.js`:

- `id: "count-the-dragons"`
- `title: "Count the Dragons"`
- `requiresUnlock: "count-the-dragons-unlocked"`
- `rewardCode: "SIMON-GLOW-8"`
- `status: "in-production"`

## Terminal

```javascript
"COUNT-DRAG-7": {
  unlockId: KEYS.countTheDragons,
  unlocksGameId: "count-the-dragons",
  unlocksGameTitle: "Count the Dragons",
  fromGameId: "color-match",
},
"SIMON-GLOW-8": {
  unlockId: KEYS.simonSays,
  unlocksGameId: "simon-says",
  unlocksGameTitle: "Simon Says Light Pad",
  fromGameId: "count-the-dragons",
},
```

## Clear condition

Complete one **Count Round** (10 correct answers) → `KIDS_UNLOCKS.markCleared("count-the-dragons")`.

## Win UI copy

**Headline:** Counting champion!  
**Reward line:** Your code: **SIMON-GLOW-8**  
**Hint:** Type `LOGIN SIMON-GLOW-8` in Terminal Trainer to unlock Simon Says Light Pad.
