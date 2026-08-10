# Typing Race — HUD & UI copy

## Screen flow

```
Landing → Difficulty + Start → Countdown (3-2-1) → Heat play → Win overlay
                              ↘ Practice (no countdown, no win)
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Heat** | Opens difficulty confirm if not set, then countdown |
| **Practice Letters** | Untimed loop, back button returns to landing |

## Pre-run strip (below HUD)

| Element | Content |
|---------|---------|
| Difficulty pills | Easy · Normal · Hard |
| Tip | *Use your keyboard — tap keys on screen if you're on a tablet* |

## Play HUD (top bar)

| Element | ID | Content |
|---------|-----|---------|
| Score | `#tr-score` | **12** / 20 |
| Streak | `#tr-streak` | 🔥 **5** (hidden until streak ≥ 3) |
| Timer bar | `#tr-timer` | Depletes per letter; green → yellow → red |
| Quit | `#tr-quit` | Pause menu → *Resume* / *Quit to menu* |

## Letter zone (center)

| Element | Behavior |
|---------|----------|
| Big letter | `#tr-letter` — 120px+ display font, Fruit Friends accent color |
| Friend hint | `#tr-friend` — small portrait + name, e.g. *"Like Carlos Coconut!"* |
| Miss flash | Red border pulse 300 ms on wrong key |

## On-screen keyboard (Easy + tablet Normal)

- Row layout QWERTY, single letters only (no shift row v1)
- Active key highlights on press
- Minimum key size 40×40 px

## Feedback copy

| Event | Message |
|-------|---------|
| Countdown | **3** · **2** · **1** · **Go!** |
| Correct | *(short chime)* optional toast: *"Yes!"* every 5th correct |
| Wrong key | *"Oops — that's {key}. Try {letter}!"* |
| Timeout | *"Time's up! Next letter…"* |
| Streak 5 | *"Five in a row!"* |
| Streak 8 | *"You're on fire!"* |

## Pause menu

| Button | Copy |
|--------|------|
| Resume | Keep racing |
| Quit | Back to menu (Heat progress lost) |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Heat complete!** |
| Stats line | 20 letters · best streak {n} · {time}s |
| Par flair | If under par: *Speedy fingers!* |
| Reward code | **SORT-COLOR-6** |
| Terminal hint | Type `LOGIN SORT-COLOR-6` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Race again** → new Heat |

On show: `KIDS_UNLOCKS.markCleared("typing-race")`.

## Practice mode HUD

Same letter zone; score shows *Practice* instead of x/20; no timer bar; **Done** returns to landing.

## Mobile / a11y

- On-screen keyboard required when `matchMedia("(pointer: coarse)")` and no physical keyboard detected
- `aria-live="polite"` on score and miss messages
- Focus trap not used (game is keyboard-driven)
- High contrast letter against `#1a1a2e` workroom background

## Visual tone

Match Terminal Trainer: dark panel, monospace accents for score, gold highlight on correct flash.
