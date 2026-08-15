# Coloring Page Studio — HUD & UI copy

## Screen flow

```
Landing gallery → Pick page → Color editor → Page complete toast → Gallery (×3) → Win overlay
         ↘ Free Color
```

## Landing gallery

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Studio Session** | Track 3 page completions |
| **Free Color** | Editor without session tracking |

Session progress banner when active: *Pages completed: **1** / **3***.

## Gallery grid

| Element | ID | Content |
|---------|-----|---------|
| Grid | `#cv-gallery` | Thumbnail cards per page |
| Card | `.cv-page-card` | Thumbnail, title, progress ring if partial |

Locked pages: none in v1 — all 5 open once game unlocked.

## Editor HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Title | `#cv-title` | Adam Apple |
| Fill progress | `#cv-fill` | **62%** colored |
| Back | `#cv-back` | *Gallery* |
| Quit | `#cv-quit` | *Menu* |

## Editor viewport (center)

| Element | ID | Behavior |
|---------|-----|----------|
| SVG host | `#cv-svg` | Inline SVG; regions clickable |
| Active region | `.color-region.is-active` | Brief outline on hover/tap |

Tap region → apply `#cv-palette` active color fill.

## Tools (bottom)

| Control | ID | Action |
|---------|-----|--------|
| Palette | `#cv-palette` | 12 swatches + eraser |
| Undo | `#cv-undo` | Pop last fill action |
| Clear page | `#cv-clear` | Reset to outline (confirm) |
| Print | `#cv-print` | Print current art |

## Feedback copy

| Event | Message |
|-------|---------|
| Region filled | (silent — visual only) |
| 80% reached | *"Page complete! **N** / **3** in this session."* |
| Session done | Win overlay |
| Clear confirm | *"Erase all colors on this page?"* |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Master colorist!** |
| Body | You finished 3 Fruit Friends coloring pages — you cleared the whole Laughing Dragons game path! |
| Flair | If 100% on all 3: *Master colorist!* |
| Reward line | *(no code — chain complete)* |
| Subtext | Show every reward code you earned on the <a href="/games/">Games hub</a> anytime. |
| Primary | **Back to Games** → `/games/` |
| Secondary | **Color more** |

On show: `KIDS_UNLOCKS.markCleared("coloring-viewer")`.

## Free Color HUD

No session banner; fill % still shown for fun; **Done** returns to gallery.

## Mobile / a11y

- Palette horizontal scroll on narrow screens; swatches min 44×44 px
- Pinch zoom on SVG optional (double-tap reset)
- `aria-label` on regions: *Color apple cheek*
- `aria-live="polite"` on fill progress and completion toast
- High contrast focus ring on active swatch

## Print stylesheet

Hide palette/tools; white background; SVG centered full width.

## Colors

Outline black `#222`; default fill white; palette matches brand kid-safe set.
