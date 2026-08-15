# Color Match Sort — HUD & UI copy

## Screen flow

```
Landing → Start Sort Round → Drag play → Item clear / skip → Round win overlay
         ↘ Free Sort (endless)
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Sorting** | Begin 15-item round |
| **Free Sort** | Endless mode |

Difficulty pills below CTAs: Easy · Normal · Hard.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Progress | `#cm-progress` | Sorted: **8** / **15** |
| Difficulty | `#cm-difficulty` | Easy / Normal / Hard |
| Quit | `#cm-quit` | *Menu* → confirm quit |

## Bins (bottom row, 3 columns)

| Bin | Label | Visual |
|-----|-------|--------|
| Red | **Red** | Red panel + apple icon |
| Yellow | **Yellow** | Yellow panel + banana icon |
| Green | **Green** | Green panel + grape icon |

Drop zones highlight on drag-over (dashed border + scale 1.05).

## Pickup lane (center)

| Element | Behavior |
|---------|----------|
| Current fruit | `#cm-fruit` — draggable sprite 96×96 min |
| Skip button | `#cm-skip` — visible only for neutral items (Normal+): *Skip this one* |
| Hint (first item) | *Drag the fruit to the matching color bin!* |

## Feedback copy

| Event | Message |
|-------|---------|
| Correct sort | *"Perfect!"* + sparkle |
| Wrong bin | *"Try another bin!"* |
| Neutral shown | *"This one's not red, yellow, or green — tap Skip!"* |
| Round halfway | *"Halfway there!"* (at 8/15) |
| Round complete | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Sorting star!** |
| Body | You sorted 15 Fruit Friends into color bins. |
| Perfect flair | If zero wrong drops: *Perfect sort!* |
| Reward code | **COUNT-DRAG-7** |
| Terminal hint | Type `LOGIN COUNT-DRAG-7` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Sort again** |

On show: `KIDS_UNLOCKS.markCleared("color-match")`.

## Hard mode one-time hint

Small banner on first Hard run:

*Orange and purple fruits go in the **Red** bin in hard mode.*

Dismiss: **Got it**

## Free Sort HUD

Progress shows *Free Sort*; no win overlay; **Done** returns to landing.

## Mobile / a11y

- Full touch drag support; `touch-action: none` on fruit
- Bins are valid drop targets with 48 px min height
- `aria-label` on bins: *Red bin*, *Yellow bin*, *Green bin*
- `aria-live="polite"` on progress and feedback toast
- Keyboard: number keys 1/2/3 sort current fruit (desktop a11y bonus)

## Colors

Use saturated kid-safe bin colors with white labels; fruit sprites retain detail at 96 px.
