# Whack-a-Fruit — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/whack-a-fruit/index.html` | Gate + landing + `#whack-a-fruit-root` |
| `assets/js/whack-a-fruit.js` | `initWhackAFruit()` — grid spawn loop, timer, scoring, win |
| `assets/js/whack-a-fruit-data.js` | Fruit Friend roster: `id`, `name`, `letter`, `sprite` |
| `assets/css/whack-a-fruit.css` | 3×3 grid, pop animations, HUD |

## Data shape

```javascript
export const FRUITS = [
  {
    id: "benjamin-banana",
    name: "Benjamin Banana",
    letter: "B",
    sprite: "/assets/kids/games/whack-a-fruit/banana.png",
  },
  // min 15 entries A–O for v1
];

export const GOAL_SCORE = 15;
export const ROUND_SECONDS = 60;
```

## Spawn loop

```javascript
function spawnWave() {
  const target = pickTarget();
  const targetCell = randomInt(0, 8);
  const decoyCells = pickDecoys(targetCell, decoyCount);
  showPop(targetCell, target);
  decoyCells.forEach((c) => showPop(c, randomDecoy(target)));
  scheduleHide(popDurationMs);
}
```

Use `requestAnimationFrame` or `setInterval` for timer; clear all timeouts on quit.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("whack-a-fruit-unlocked")) {
  window.location.replace("/games/hangman-lite/");
}
```

## Clear hook

```javascript
if (score >= GOAL_SCORE && timerRemaining > 0) {
  window.KIDS_UNLOCKS.markCleared("whack-a-fruit");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("whack-a-fruit"));
}
```

Do not auto-grant `pattern-builder-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] 3×3 grid + cell hit targets
- [ ] Wave spawn / hide timing
- [ ] Target prompt + letter/name modes
- [ ] Score + 60 s timer
- [ ] Wrong-tap penalty per tier
- [ ] Win at 15 / fail at 0 s
- [ ] Endless + high score
- [ ] Win overlay + PATTERN-AB-11

## Art

- Reuse Fruit Friends portraits (64×64 crop)
- Board frame CSS v1

## Out of scope v1

- Sound effects (optional v1.1)
- Combo multiplier
