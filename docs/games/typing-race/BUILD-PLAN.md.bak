# Typing Race — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/typing-race/index.html` | Gate + landing + `#typing-race-root` |
| `assets/js/typing-race.js` | `initTypingRace()` — Heat loop, keyboard input, win |
| `assets/css/typing-race.css` | Workroom theme, letter stage, timer, OSK |

## Data

### Constants in `typing-race.js`

```javascript
const HEAT_TARGET = 20;
const TIER = {
  easy:   { ms: 5000, pool: "A-M" },
  normal: { ms: 3500, pool: "A-Z" },
  hard:   { ms: 2500, pool: "A-Z" },
};
const POOL_A_M = "ABCDEFGHIJKLM".split("");
const POOL_A_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
```

Optional `typing-race-data.js` for letter → friend map if file grows.

### localStorage

| Key | Value |
|-----|-------|
| `ldp-typing-race-difficulty` | `easy` \| `normal` \| `hard` |
| `ldp-typing-race-best-streak` | number (optional UX) |

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("typing-race-unlocked")) {
  window.location.replace("/games/alphabet-trace/");
}
```

## Input handling

- `keydown` on `window` — `event.key` length 1, compare `toUpperCase()` to current letter
- Ignore modifier combos
- On tablet: delegate clicks from `.tr-osk-key` with `data-key`
- Prevent default on game keys to avoid scroll

## Timer

- `requestAnimationFrame` or 50 ms interval decrement
- Reset on correct; on expiry trigger miss flow

## Clear hook

When `correctCount >= HEAT_TARGET`:

```javascript
window.KIDS_UNLOCKS.markCleared("typing-race");
// Display getRewardCode("typing-race") → SORT-COLOR-6
// Do NOT grant color-match-unlocked
```

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty picker + persistence
- [ ] Countdown + Heat loop (20 correct)
- [ ] Timer bar + miss/wrong feedback
- [ ] Physical keyboard + on-screen keyboard (tablet)
- [ ] Streak counter + milestone toasts
- [ ] Practice mode (no clear)
- [ ] Win overlay + reward code
- [ ] Pause / quit menu

## Out of scope v1

- Falling letters animation
- Words, shift, numbers
- Network leaderboard

## Dependencies

- Reuse workroom color tokens from terminal-game.css if shared, or duplicate minimal set in typing-race.css
