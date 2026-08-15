# Hangman Lite — HUD & UI copy

## Screen flow

```
Landing → Start Word Run → Letter taps → Word solved → (×5) → Win overlay
         ↘ Free Play (endless)
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Word Run** | Solve 5 words |
| **Free Play** | Endless mode |

Difficulty pills: Easy · Normal · Hard.

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Progress | `#hl-progress` | Words: **2** / **5** |
| Misses | `#hl-misses` | Misses left: **4** |
| Category | `#hl-category` | *A Fruit Friend* (Normal/Easy) |
| Quit | `#hl-quit` | *Menu* |

## Word display (center)

| Element | ID | Behavior |
|---------|-----|----------|
| Slots | `#hl-word` | `_ A _ A _ A` style — one box per letter |
| Guessed | `#hl-guessed` | *Guessed: A, E, N* (wrong letters in muted red) |
| Dragon | `#hl-dragon` | Friendly dragon SVG — loses hat/scarf/shield per miss (max 6 visual steps) |

## Letter keyboard (bottom)

| Element | ID | Layout |
|---------|-----|--------|
| A–Z grid | `#hl-keys` | 26 buttons, disabled after guess |
| Min touch | 44×44 px |

Correct: letter buttons stay green-disabled. Wrong: red-disabled.

## Feedback copy

| Event | Message |
|-------|---------|
| Correct letter | *"Yes! **B** is in the word!"* |
| Wrong letter | *"Not in this word."* |
| Word solved | *"You got it — **BANANA**!"* |
| Hint (Easy) | *"Here's the first letter!"* |
| Word failed | *"The word was **GRAPE**. Try the next one!"* |
| Run complete | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Word wizard!** |
| Body | You solved 5 Fruit Friend words letter by letter. |
| Flair | If par met: *Word wizard!* |
| Reward code | **WHACK-GRID-10** |
| Terminal hint | Type `LOGIN WHACK-GRID-10` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Play again** |

On show: `KIDS_UNLOCKS.markCleared("hangman-lite")`.

## Free Play HUD

Progress shows *Free Play*; no win overlay; **Done** returns to landing.

## Mobile / a11y

- On-screen A–Z grid primary; physical keyboard mirrors taps on desktop
- `aria-label` on letter buttons
- `aria-live="polite"` on word slots and feedback
- High contrast blank slots vs filled letters

## Visual tone

Dragon accessory loss only — no rope or scaffold imagery. Miss state uses disappointed dragon expression, not scary art.
