# Alphabet Trace — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/alphabet-trace/index.html` | Gate + landing + `#alphabet-trace-root` mount |
| `assets/js/alphabet-trace.js` | `initAlphabetTrace()` — modes, canvas trace, win hook |
| `assets/js/alphabet-trace-data.js` | Letter stroke paths (SVG coords), friend metadata A–Z |
| `assets/css/alphabet-trace.css` | HUD, canvas, overlays, Free Pick grid |

## Data shapes

### `alphabet-trace-data.js`

```javascript
export const LETTERS = {
  A: {
    friend: { name: "Adam Apple", thumb: "/assets/kids/fruit-friends/adam-apple.png" },
    strokes: [
      { points: [[x,y], ...], direction: "cw" },  // normalized 0–100 viewBox
    ],
  },
  // B … Z
};

export const JOURNEY_LETTERS = ["A","B","C","D","E","F","G","H","I","J"];
export const TOLERANCE = { easy: 18, normal: 12, hard: 8 };
```

Stroke points can be hand-authored in a 100×100 viewBox per letter, or imported from SVG path samples later.

### localStorage keys

| Key | Value |
|-----|-------|
| `ldp-alphabet-trace-difficulty` | `"easy"` \| `"normal"` \| `"hard"` |
| `ldp-alphabet-trace-journey-done` | `"1"` after first clear (optional UX flag) |

Uses existing `KIDS_UNLOCKS` cleared prefix: `ldp-kids-cleared-alphabet-trace`.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("alphabet-trace-unlocked")) {
  window.location.replace("/games/fruit-search/");
}
```

Redirect target can fall back to `/games/` if fruit-search page unavailable.

## Trace algorithm (v1)

1. Project pointer to SVG coords
2. Sample active stroke polyline; find closest segment
3. Track progress along stroke (0→1); require ≥85% coverage before success
4. Distance to polyline must stay ≤ tolerance px (scaled to viewport)
5. On success, mark stroke done, advance to next stroke or letter

## Clear hook

On Journey letter J complete:

```javascript
window.KIDS_UNLOCKS.markCleared("alphabet-trace");
// Do NOT auto-grant typing-race-unlocked — Terminal LOGIN TYPE-FAST-5
```

Win overlay displays `KIDS_UNLOCKS.getRewardCode("alphabet-trace")`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Mode picker (Journey / Free Pick) + difficulty toggle
- [ ] SVG letter render + stroke state machine
- [ ] Pointer trace with tolerance + retry feedback
- [ ] Journey A–J progression + friend HUD
- [ ] Free Pick letter grid
- [ ] Win overlay + reward code `TYPE-FAST-5`
- [ ] Mobile touch (`touch-action: none`, 44px targets)
- [ ] `aria-live` on hints and toasts

## Out of scope v1

- Stroke sound FX, TTS cheer lines
- K–Z in Journey path (Free Pick only)
- SVG export of kid's traced letter

## Art dependencies

- Fruit Friend thumbnails A–Z (reuse `/assets/kids/fruit-friends/` if present; placeholder colored circles OK for scaffold)
