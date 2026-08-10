# Color Match Sort — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/color-match/index.html` | Gate + landing + `#color-match-root` |
| `assets/js/color-match.js` | `initColorMatch()` — drag-drop, round state, win |
| `assets/js/color-match-data.js` | Fruit list with `colorBin: "red"|"yellow"|"green"|"neutral"` |
| `assets/css/color-match.css` | Bins, lane, drag states, overlays |

## Data shape

```javascript
export const FRUITS = [
  {
    id: "adam-apple",
    name: "Adam Apple",
    bin: "red",
    sprite: "/assets/kids/games/color-match/apple-red.png",
  },
  // …
];

export const ROUND_SIZE = 15;
export const NEUTRAL_EVERY_N = 5; // Normal tier
```

Spawn queue: shuffle with no more than 3 same-bin in a row (reshuffle if needed).

## Drag implementation (v1)

- Pointer events on `#cm-fruit`: `pointerdown` → track → `pointerup` over bin hit-test
- Or HTML5 drag-drop if simpler on desktop; **must** support pointer events for mobile
- On correct: increment counter, animate fruit into bin, spawn next
- On wrong: animate return to lane center

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("color-match-unlocked")) {
  window.location.replace("/games/typing-race/");
}
```

## Clear hook

```javascript
if (sortedCount >= ROUND_SIZE) {
  window.KIDS_UNLOCKS.markCleared("color-match");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("color-match"));
}
```

Do not auto-grant `count-the-dragons-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] Three bins + drop hit detection
- [ ] Drag fruit (touch + mouse)
- [ ] Correct / wrong feedback animations
- [ ] Normal tier neutral + Skip
- [ ] Hard tier orange/purple → red rule
- [ ] 15-item round + progress HUD
- [ ] Free Sort mode
- [ ] Win overlay + COUNT-DRAG-7
- [ ] Keyboard 1/2/3 optional sort

## Art

- Colored fruit sprites (can reuse Fruit Friends portraits with CSS color wash if needed)
- Bin panels can be pure CSS v1

## Out of scope v1

- Fourth bin (blue)
- Particle effects beyond CSS sparkle class
