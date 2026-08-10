# Pattern Builder — HUD & UI copy

## Screen flow

```
Landing → Start Pattern Run → Pattern row + choices → (×8) → Win overlay
         ↘ Practice (filter by type)
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Patterns** | 8-puzzle run |
| **Practice** | Endless + type filter dropdown |

Difficulty pills: Easy · Normal · Hard.

Practice filter: All · AB · ABA · ABC · AABB.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Progress | `#pb-progress` | Puzzle: **3** / **8** |
| Pattern type | `#pb-type` | *Repeating: A B A B …* (optional label Normal+) |
| Quit | `#pb-quit` | *Menu* |

## Pattern row (center)

| Element | ID | Behavior |
|---------|-----|----------|
| Row | `#pb-row` | Flex row of fruit icons + `?` slot |
| Icon size | 64×64 px min | Border on `?` slot pulsing gently |

First puzzle hint: *"What fruit comes next in the pattern?"*

## Choices (bottom)

| Element | ID | Layout |
|---------|-----|--------|
| Choices | `#pb-choices` | 3 large buttons with fruit sprites |
| Min touch | 72×72 px per choice |

Correct: green outline + advance. Wrong: red shake.

## Feedback copy

| Event | Message |
|-------|---------|
| Correct | *"Perfect pattern!"* |
| Wrong | *"Look at the pattern again!"* |
| Halfway | *"Halfway there!"* (puzzle 4) |
| Run complete | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Pattern pro!** |
| Body | You completed 8 Fruit Friend sequences. |
| Flair | If par met: *Pattern pro!* (same headline OK) |
| Reward code | **MAZE-PATH-12** |
| Terminal hint | Type `LOGIN MAZE-PATH-12` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Play again** |

On show: `KIDS_UNLOCKS.markCleared("pattern-builder")`.

## Practice HUD

Progress shows *Practice · ABA*; no win overlay; **Done** returns to landing.

## Mobile / a11y

- Pattern row wraps on narrow screens (scroll horizontal if needed)
- `aria-label` on choices: *Choose apple*
- `aria-live="polite"` on feedback toast
- Keyboard: 1/2/3 pick choice (desktop)

## Colors

Neutral row background; `?` slot uses dashed dragon-green border.
