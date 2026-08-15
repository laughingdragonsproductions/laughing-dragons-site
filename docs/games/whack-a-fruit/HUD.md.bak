# Whack-a-Fruit — HUD & UI copy

## Screen flow

```
Landing → Start Whack Round → 60 s grid play → Win / fail overlay
         ↘ Endless
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Whacking** | 60 s Whack Round |
| **Endless** | Miss-based survival |

Difficulty pills: Easy · Normal · Hard.

Endless high score: *Best: **42*** — key `ldp-whack-a-fruit-hiscore`.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Score | `#waf-score` | Score: **8** / **15** |
| Timer | `#waf-timer` | **0:42** |
| Target | `#waf-target` | Tap **B** — Benjamin Banana! |
| Quit | `#waf-quit` | *Menu* |

## Grid (center)

| Element | ID | Layout |
|---------|-----|--------|
| Board | `#waf-grid` | 3×3 cells, equal flex squares |
| Cell | `.waf-cell` | Hidden by default; `.waf-pop` shows fruit sprite |

Pop animation: scale 0 → 1 + bounce. Hide: scale down or duck below rim.

## Feedback copy

| Event | Message |
|-------|---------|
| Correct tap | *"Got it!"* + sparkle |
| Wrong tap | *"Wrong fruit!"* (Normal/Hard) |
| Target change | Brief banner flash on `#waf-target` |
| 10 s left | *"10 seconds!"* |
| Win | Win overlay |
| Fail | *"Time's up! You scored **N**. Need 15 to win."* |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Whack wizard!** |
| Body | You whacked **15** correct Fruit Friends in 60 seconds. |
| Flair | If score ≥ 20 no wrong: *Whack wizard!* |
| Reward code | **PATTERN-AB-11** |
| Terminal hint | Type `LOGIN PATTERN-AB-11` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Play again** |

On show: `KIDS_UNLOCKS.markCleared("whack-a-fruit")`.

## Endless HUD

No timer; shows *Misses: **0** / **3***. Game over at 3 misses.

## Mobile / a11y

- Grid fills width; cells min 72×72 px
- `touch-action: manipulation` on cells
- `aria-label` on active pop: *Benjamin Banana, letter B*
- `aria-live="polite"` on target and score

## Colors

Wood-tone board frame; bright fruit portraits on green cell backgrounds.
