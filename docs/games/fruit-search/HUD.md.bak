# Fruit Search — HUD & UI copy

## Screen flow

```
Landing → Play (map + HUD) → Correct toast → Wrong flash → Round clear overlay → Play again
```

Mode toggle (Name / Letter) lives in HUD before first tap each round.

## Landing

Standard `initGameChrome` from `games/fruit-search/index.html`.

| Element | Copy |
|---------|------|
| Eyebrow | In production |
| Lead | Find Fruit Friends hidden in busy scenes — Where's Waldo meets the ABC cast. |
| Note | Unlocked after beating par on Memory Matching. |

**Primary CTA:** Start finding (scrolls to `#game-play` or hides landing — match site pattern when wired).

## Play HUD (top bar)

| Element | ID / class | Content |
|---------|------------|---------|
| Prompt | `#fruit-search-prompt` | **Find Benjamin the Banana!** or **Find the fruit that starts with M!** |
| Score | `#fruit-search-score` | Finds: **2** / **5** |
| Mode toggle | `.fruit-search-mode` | **Names** · **Letters** (pill toggle) |
| Map label | `.fruit-search-map-tag` | Easy / Medium / Hard (set at round start) |

## Map stage

| Element | Behavior |
|---------|----------|
| Map image | `#fruit-search-stage` — scrollable on mobile |
| Sprites | Percent-positioned hitboxes over map |
| Wrong tap | Brief red ring at tap point + toast |
| Correct tap | Sprite bounce + confetti class 600 ms |

## Difficulty picker (round start)

Shown before first find if not yet chosen this session:

| Tier | Label | Copy |
|------|-------|------|
| Easy | **Easy map** | Few friends, big pictures |
| Medium | **Medium map** | More crowded |
| Hard | **Hard map** | Super busy! |

Default last choice from `localStorage` key `ldp-fruit-search-difficulty`.

## Feedback copy

| Event | Message |
|-------|---------|
| Round start | Prompt updates with target name or letter |
| Correct find | *"You found {name}!"* |
| Wrong tap | *"Try again!"* |
| 4th find | *"One more!"* |
| Round clear | Overlay (below) |

Keep wrong-tap copy gentle — no penalty, unlimited tries.

## Round clear overlay (win)

| Element | Copy |
|---------|------|
| Headline | **Round complete!** |
| Body | You found 5 Fruit Friends. Alphabet Trace is next! |
| Reward code | **TRACE-A-Z-4** |
| Terminal hint | Type `LOGIN TRACE-A-Z-4` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Find again** — new round, same or new difficulty |

On first clear ever: `KIDS_UNLOCKS.markCleared("fruit-search")`.

Do not auto-grant alphabet-trace.

## Letter mode prompt templates

| Template | Example |
|----------|---------|
| Name mode | Find **{Full Name}**! |
| Letter mode | Find the fruit that starts with **{L}**! |

Letter mode still accepts tap on any sprite whose cast letter matches (only one correct per crowd).

## Mobile / a11y

- Map stage: `overflow: auto`, `-webkit-overflow-scrolling: touch`
- Sprite hitboxes ≥ 44×44 px effective (scale sprites up on Easy)
- `aria-live="polite"` on `#fruit-search-prompt`
- Mode toggle: `role="tablist"` with `aria-selected`

## Visual tokens

| Token | Use |
|-------|-----|
| `.fruit-search-hud` | Sticky top bar over map |
| `.fruit-search-prompt` | Large friendly font, dark text on cream panel |
| `.fruit-search-score` | Smaller secondary line |

Matches `assets/css/fruit-search.css` scaffold.
