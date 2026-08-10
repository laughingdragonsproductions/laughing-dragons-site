# Count the Dragons — HUD & UI copy

## Screen flow

```
Landing → Start Count Round → Scene + number pad → Round win overlay
         ↘ Practice (endless)
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Counting** | Begin 10-round session |
| **Practice** | Endless mode |

Difficulty pills below CTAs: Easy · Normal · Hard.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Progress | `#ctd-progress` | Round: **4** / **10** |
| Score streak | `#ctd-streak` | Streak: **3** (optional, hidden on Easy) |
| Difficulty | `#ctd-difficulty` | Easy / Normal / Hard |
| Quit | `#ctd-quit` | *Menu* → confirm quit |

## Scene (center)

| Element | Behavior |
|---------|----------|
| Playfield | `#ctd-scene` — absolute-positioned character sprites |
| Prompt | `#ctd-prompt` | *How many do you see?* |
| First-round hint | *Tap the number that matches how many dragons you count!* (dismiss after round 1) |

## Number pad (bottom)

| Element | ID | Layout |
|---------|-----|--------|
| Pad grid | `#ctd-pad` | Buttons **1**–**10** in two rows (Easy: 1–5 only) |
| Button min size | 48×48 px touch targets |

Correct tap: brief green flash on button + scene sparkle.  
Wrong tap: red shake on button only.

## Feedback copy

| Event | Message |
|-------|---------|
| Correct | *"Yes! There were **N**!"* |
| Wrong | *"Count again!"* |
| Round halfway | *"Halfway there!"* (at 5/10) |
| Round complete | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Counting champion!** |
| Body | You counted 10 groups of dragons and Fruit Friends. |
| Perfect flair | If zero wrong taps: *Perfect counter!* |
| Reward code | **SIMON-GLOW-8** |
| Terminal hint | Type `LOGIN SIMON-GLOW-8` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Count again** |

On show: `KIDS_UNLOCKS.markCleared("count-the-dragons")`.

## Hard mode one-time hint

Small banner on first Hard run:

*Clouds and rocks don't count — only dragons and Fruit Friends!*

Dismiss: **Got it**

## Practice HUD

Progress shows *Practice*; no win overlay; **Done** returns to landing.

## Mobile / a11y

- Full touch on number pad; no drag required
- `aria-label` on each pad button: *Answer 7*
- `aria-live="polite"` on prompt and feedback toast
- Keyboard: number keys 0–9 submit answer (desktop a11y bonus; 0 unused)

## Colors

Soft sky or meadow background; high-contrast number buttons with white labels.
