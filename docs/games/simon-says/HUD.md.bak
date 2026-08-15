# Simon Says Light Pad — HUD & UI copy

## Screen flow

```
Landing → Start Memory Run → Watch → Repeat → (success/fail) → Round win overlay
         ↘ Endless / Slow Practice
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Memory Run** | 5-round session toward clear |
| **Endless** | Single-life high score |
| **Slow Practice** | Longer flashes, no clear |

Difficulty pills: Easy · Normal · Hard.

High score line (Endless only): *Best: **12** steps* — key `ldp-simon-says-hiscore`.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Phase | `#ss-phase` | *Watch…* / *Your turn!* |
| Sequence | `#ss-length` | Steps: **5** |
| Round | `#ss-round` | Round: **2** / **5** |
| Goal | `#ss-goal` | Reach **8** to win! |
| Quit | `#ss-quit` | *Menu* |

## Light pad (center)

| Element | ID | Layout |
|---------|-----|--------|
| Pad grid | `#ss-pad` | 2×2 colored buttons, min 80×80 px each |
| Pad 0–3 | `#ss-pad-0` … | `data-pad="0"` etc. |

Watch phase: pads non-interactive (`pointer-events: none`).  
Repeat phase: pads active; highlight on tap.

## Feedback copy

| Event | Message |
|-------|---------|
| Watch start | *Watch the pattern…* |
| Repeat start | *Your turn! Repeat the pattern.* |
| Step correct | (subtle pad pulse only) |
| Step wrong | *"Oops!"* + red flash |
| Round success | *"Nice! Next pattern is longer."* |
| Length milestone (5, 8) | *"Amazing — **N** steps!"* |
| Session clear | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Memory master!** |
| Body | You repeated an **8**-step dragon light pattern. |
| Flair | If flawless final round: *Flawless memory!* |
| Reward code | **HANG-FRUIT-9** |
| Terminal hint | Type `LOGIN HANG-FRUIT-9` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Play again** |

On show: `KIDS_UNLOCKS.markCleared("simon-says")`.

## Endless HUD

Shows *Steps: **N*** instead of round; on game over:

| Element | Copy |
|---------|------|
| Headline | **Game over** |
| Body | You reached **N** steps. Best: **B** |
| Primary | **Try again** |
| Secondary | **Menu** |

## Mobile / a11y

- Pads stack 2×2 or 1×4 on narrow screens — maintain 64 px min touch
- `aria-label` on pads: *Green pad*, *Red pad*, etc.
- `aria-live="polite"` on phase label
- Keyboard: keys Q/W/E/R map to pads 0–3 (desktop)

## Colors

Saturated pad fills with darker active state; inactive pads at 70% brightness during repeat phase.
