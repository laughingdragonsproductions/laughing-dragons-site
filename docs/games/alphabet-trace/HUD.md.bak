# Alphabet Trace — HUD & UI copy

## Screen flow

```
Landing (initGameChrome) → Mode picker overlay → Play (letter canvas) → Letter clear toast → Journey clear overlay
```

Free Pick returns to letter grid after each clear instead of advancing Journey.

## Landing (shared chrome)

Uses standard `initGameChrome` landing from `index.html`. Eyebrow: **In production**. Lead copy matches hub description.

**Primary CTA:** `Start Journey` — opens play mount, begins letter A.

**Secondary:** `Pick a Letter` — opens Free Pick grid.

## Mode picker (first visit only)

| Element | Copy / behavior |
|---------|-----------------|
| Title | Choose how to play |
| Journey card | **Letter Journey** — Trace A to J with the Fruit Friends |
| Free Pick card | **Free Pick** — Practice any letter you want |
| Difficulty row | Easy · Normal · Hard (pill toggle, default Easy) |

## Play HUD (top bar)

| Element | ID / class | Content |
|---------|------------|---------|
| Back link | `.at-back` | ← All games |
| Mode label | `#at-mode-label` | Journey or Free Pick |
| Progress | `#at-progress` | Letter **3** of **10** (Journey) or letter name (Free Pick) |
| Friend thumb | `#at-friend-thumb` | 48×48 portrait for current letter |
| Friend name | `#at-friend-name` | e.g. Benjamin Banana |
| Difficulty | `#at-difficulty-badge` | Easy / Normal / Hard (read-only during run) |

## Letter canvas (center)

| Element | Behavior |
|---------|----------|
| Letter SVG | Large outline; inactive strokes gray, active stroke gold |
| Trace layer | Captures pointer; draws player path in brand green |
| Guide dots | Numbered circles along active stroke |
| Hint text | `#at-hint` — *"Drag along the glowing line"* (first stroke only) |

## Feedback copy

| Event | Message | Duration |
|-------|---------|----------|
| Stroke start | *(none — visual only)* | — |
| Stroke success | *"Nice!"* | 0.8 s toast |
| Stroke fail | *"Stay on the line — try again!"* | until retry |
| Letter complete | *"You traced {letter}! {friend cheer line}"* | 1.5 s then advance |
| Journey complete | Win overlay (below) | until dismissed |

## Letter clear toast

Centered banner over canvas:

- Emoji: ✨
- Headline: **Letter {L} complete!**
- Sub: Friend cheer one-liner
- Auto-dismiss → next letter or win overlay if J done

## Journey clear overlay (win)

| Element | Copy |
|---------|------|
| Headline | **Journey complete!** |
| Body | You traced A through J. Typing Race is waiting! |
| Reward code | **TYPE-FAST-5** (monospace, copy-friendly) |
| Terminal hint | Type `LOGIN TYPE-FAST-5` in Terminal Trainer |
| Primary button | **Back to Games** → `/games/` |
| Secondary | **Practice More** → Free Pick grid |

On show: call `KIDS_UNLOCKS.markCleared("alphabet-trace")`.

## Free Pick grid

| Element | Copy / behavior |
|---------|-----------------|
| Title | Pick a letter |
| Grid | 26 tiles A–Z with mini friend icon |
| Tap tile | Loads that letter in play HUD |
| Done | **Back to Journey** if Journey incomplete; else **All games** |

## Mobile / a11y

- Minimum tap target 44×44 px on mode cards and letter grid
- Canvas supports touch and mouse; `touch-action: none` on trace area
- `aria-live="polite"` on `#at-hint` and toast region
- Letter announced: *"Trace letter B, Benjamin Banana"*

## Colors (Fruit Friends palette)

| Token | Use |
|-------|-----|
| `--at-stroke-active` | Gold `#f5c842` |
| `--at-stroke-done` | Green `#4caf50` |
| `--at-stroke-idle` | Light gray `#e0e0e0` |
| `--at-player-path` | Teal `#00897b` |
