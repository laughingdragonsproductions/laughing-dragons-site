# Simon Says Light Pad — Build plan (Dave)

## Files to create

| Path | Purpose |
|------|---------|
| `games/simon-says/index.html` | Gate + landing + `#simon-says-root` |
| `assets/js/simon-says.js` | `initSimonSays()` — sequence engine, phases, audio, win |
| `assets/css/simon-says.css` | Pad grid, glow animations, overlays |

## State machine

```javascript
// phases: "idle" | "watch" | "repeat" | "round-end" | "session-win"
const state = {
  sequence: [],      // number[]
  playerIndex: 0,
  round: 1,
  maxRounds: 5,
  goalLength: 8,
  retriesLeft: 1,
  tier: "normal",
};
```

## Watch / repeat implementation

1. **watchSequence:** iterate sequence with `setTimeout` — flash pad CSS class + `playTone(padIndex)`
2. **onPadTap(padIndex):** compare to `sequence[playerIndex]`; increment or handle wrong
3. On full repeat success: push random next step, increment length, check goal

## Audio (v1)

Web Audio API oscillators — short sine bursts per pad (no external files required). Mute toggle in HUD footer.

## Gate

```javascript
if (!window.KIDS_UNLOCKS?.has?.("simon-says-unlocked")) {
  window.location.replace("/games/count-the-dragons/");
}
```

## Clear hook

```javascript
if (maxSequenceReached >= goalLength) {
  window.KIDS_UNLOCKS.markCleared("simon-says");
  showWinOverlay(KIDS_UNLOCKS.getRewardCode("simon-says"));
}
```

Do not auto-grant `hangman-lite-unlocked`.

## v1 checklist

- [ ] Gate + initGameChrome landing
- [ ] Difficulty tier + localStorage
- [ ] 4-pad grid + flash animation
- [ ] Web Audio tones per pad
- [ ] Watch / repeat phases
- [ ] Retry logic per tier
- [ ] 5-round Memory Run + goal length tracking
- [ ] Endless + Slow Practice modes
- [ ] Endless high score localStorage
- [ ] Win overlay + HANG-FRUIT-9
- [ ] Keyboard Q/W/E/R optional

## Art

- Pure CSS pads v1 — no image assets required
- Optional dragon scale texture overlay later

## Out of scope v1

- Canvas renderer (DOM buttons sufficient)
- Share score to social
