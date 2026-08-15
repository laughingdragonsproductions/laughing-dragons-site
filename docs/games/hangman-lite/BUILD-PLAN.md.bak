# Hangman Lite — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/hangman-lite/index.html` | Gate + landing + `#hangman-lite-root` |
| `assets/js/hangman-lite.js` | `initHangmanLite()` — word state, keyboard, dragon misses, win |
| `assets/js/hangman-lite-words.js` | Word list with `text`, `category`, `tier`, `length` |
| `assets/css/hangman-lite.css` | Slots, keyboard, dragon states, overlays |

## Data shape

```javascript
export const WORDS = [
  { id: "adam", text: "ADAM", category: "Fruit Friend", tiers: ["easy", "normal"] },
  { id: "banana", text: "BANANA", category: "Fruit", tiers: ["easy", "normal", "hard"] },
  // …
];

export const RUN_SIZE = 5;

export const TIER_CONFIG = {
  easy: { maxLength: 4, misses: 8, hintAfterWrong: 3 },
  normal: { maxLength: 6, misses: 6, showCategory: true },
  hard: { maxLength: 8, misses: 5, showCategory: false },
};
```

## Word picker

Filter by tier → shuffle → pick 5 matching length slots per `LEVELS.md` table → no duplicates.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("hangman-lite-unlocked")) {
  window.location.replace("/games/simon-says/");
}
```

## Clear hook

```javascript
if (wordsSolved >= RUN_SIZE) {
  window.KIDS_UNLOCKS.markCleared("hangman-lite");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("hangman-lite"));
}
```

Do not auto-grant `whack-a-fruit-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] Word picker + slot rendering
- [ ] A–Z keyboard + physical keyboard
- [ ] Correct / wrong letter logic
- [ ] Miss counter + dragon visual steps
- [ ] Easy hint reveal
- [ ] Fail → retry same word
- [ ] 5-word Word Run + progress
- [ ] Free Play mode
- [ ] Win overlay + WHACK-GRID-10

## Art

- Simple inline SVG dragon with 6 accessory layers (CSS hide per miss)
- Word slots pure CSS

## Out of scope v1

- Unicode / apostrophe words
- Definition clues
