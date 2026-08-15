# The Sliding Scale — HUD

**Slug:** `sliding-scale`  
**Page:** `games/sliding-scale/index.html` — `initGameChrome` + `#slider-puzzle-mount`

## Landing (above play area)

- Back link to `/games/`
- Eyebrow: Laughing Dragons Games
- Title: The Sliding Scale
- Lead: workroom slider puzzle copy
- Note: always playable, no unlock code

## Toolbar

| Control | id / class | Action |
|---------|------------|--------|
| Easy / Med / Hard | `.ss-diff-btn[data-diff]` | Switch grid size and re-shuffle |
| Shuffle | `#ss-shuffle` | New scramble; randomizes image unless `?image=` is set |

## Meta row

| Element | id | Content |
|---------|-----|---------|
| Move counter | `#ss-moves` | `{n} moves` |
| Art label | `#ss-art-label` | `Art: {image label}` |
| Reference | `#ss-ref-img` | Completed puzzle thumbnail |

## Board

- Grid: `#ss-board.ss-puzzle-board` — CSS variable `--ss-size`
- Tiles: `.ss-tile` with background-position slices; `.ss-tile-empty` for gap
- Win overlay: `#ss-win` with `#ss-win-title`, `#ss-win-body`, `#ss-play-again`

## Hint (footer)

Click/tap row-or-column slide rules + arrow key note.

## Win copy

Per-image messages in `assets/js/sliding-scale-logic.js` (`SLIDER_WIN_MESSAGES`) — maker / workroom tone.

## Files

- `assets/js/sliding-scale-logic.js` — board logic, images, win messages
- `assets/js/sliding-scale.js` — `initSlidingScale()` UI
- `assets/css/sliding-scale.css` — LD dark/neon theme
