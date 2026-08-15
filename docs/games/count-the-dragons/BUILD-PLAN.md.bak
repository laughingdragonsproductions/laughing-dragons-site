# Count the Dragons — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/count-the-dragons/index.html` | Gate + landing + `#count-dragons-root` |
| `assets/js/count-the-dragons.js` | `initCountTheDragons()` — scene layout, pad, round state, win |
| `assets/js/count-the-dragons-data.js` | Character sprite list, decoy list, tier config |
| `assets/css/count-the-dragons.css` | Scene, pad, feedback, overlays |

## Data shape

```javascript
export const CHARACTERS = [
  {
    id: "laughing-dragon-green",
    sprite: "/assets/kids/games/count-the-dragons/dragon-green.png",
    width: 72,
    height: 72,
  },
  // Fruit Friends portraits as fallback
];

export const DECOYS = [
  { id: "cloud", sprite: "...", countable: false },
];

export const ROUND_SIZE = 10;

export const TIERS = {
  easy: { min: 1, max: 5, padMax: 5, decoys: false },
  normal: { min: 1, max: 10, padMax: 10, decoys: false },
  hard: { min: 1, max: 10, padMax: 10, decoys: true },
};
```

## Scene layout algorithm

1. Pick N from tier range (avoid same N twice in a row)
2. Pick N character sprites (with replacement allowed)
3. Place via rejection sampling inside `#ctd-scene` bounds — min 16 px gap between sprite centers
4. Hard: add 1–2 decoys using same placement rules

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("count-the-dragons-unlocked")) {
  window.location.replace("/games/color-match/");
}
```

## Clear hook

```javascript
if (correctRounds >= ROUND_SIZE) {
  window.KIDS_UNLOCKS.markCleared("count-the-dragons");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("count-the-dragons"));
}
```

Do not auto-grant `simon-says-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] Random N + sprite placement
- [ ] Number pad 1–10 (1–5 on Easy)
- [ ] Correct / wrong feedback
- [ ] Hard tier decoys + one-time hint
- [ ] 10-round session + progress HUD
- [ ] Practice mode
- [ ] Win overlay + SIMON-GLOW-8
- [ ] Keyboard number entry optional

## Art

- Reuse laughing dragon tiles from memory-matching where possible
- Decoys can be CSS shapes v1 (gray cloud ellipse, brown rock circle)

## Out of scope v1

- Animated character entrance
- Subitizing flash mode (show 2 s then hide)
