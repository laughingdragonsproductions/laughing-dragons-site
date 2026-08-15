# Pattern Builder — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/pattern-builder/index.html` | Gate + landing + `#pattern-builder-root` |
| `assets/js/pattern-builder.js` | `initPatternBuilder()` — generator, choices, run state, win |
| `assets/js/pattern-builder-data.js` | Fruit pool + pattern type definitions |
| `assets/css/pattern-builder.css` | Row, choices, feedback |

## Pattern engine

```javascript
const TYPES = {
  AB: { unit: 2, label: "A B A B …" },
  ABA: { unit: 3, label: "A B A …" },
  ABC: { unit: 3, label: "A B C …" },
  AABB: { unit: 4, label: "A A B B …" },
};

function buildPuzzle(type, fruits, rowLength) {
  const alphabet = pickAlphabet(type, fruits);
  const sequence = expandPattern(type, alphabet, rowLength);
  const answer = nextInPattern(type, sequence);
  const choices = shuffle([answer, ...decoys(type, alphabet, answer)]);
  return { sequence, answer, choices, type };
}
```

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("pattern-builder-unlocked")) {
  window.location.replace("/games/whack-a-fruit/");
}
```

## Clear hook

```javascript
if (puzzlesSolved >= 8) {
  window.KIDS_UNLOCKS.markCleared("pattern-builder");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("pattern-builder"));
}
```

Do not auto-grant `maze-generator-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] Pattern generator (AB, ABA, ABC, AABB)
- [ ] Row + ? slot rendering
- [ ] 3-choice UI + decoy logic
- [ ] Wrong retry same puzzle
- [ ] 8-puzzle Pattern Run
- [ ] Practice + type filter
- [ ] Win overlay + MAZE-PATH-12
- [ ] Keyboard 1/2/3 optional

## Art

- Reuse fruit sprites from color-match / whack-a-fruit pool
- `?` slot CSS-only v1

## Out of scope v1

- ABBC generator unless time — spec includes Hard; implement if trivial else defer to v1.1 with Normal clear unchanged
