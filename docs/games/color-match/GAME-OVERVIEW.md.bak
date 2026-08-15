# Color Match Sort — Game Overview

**Slug:** `color-match`  
**Site path:** `/games/color-match/`  
**Status:** in production  
**Unlock:** requires `color-match-unlocked` · reward code `COUNT-DRAG-7`  
**Audience:** Kids ~4–10 (strong preschool fit)  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Classic color sorting with Fruit Friends charm. Drag smiling fruit from a conveyor belt into **Red**, **Yellow**, or **Green** bins — immediate snap feedback, wrong-bin bounce-back, and a cheerful crowd cheer when the round is done. Low friction, high replay, perfect for younger siblings watching an older kid play Terminal Trainer.

## Core loop

1. HUD shows bins (Red / Yellow / Green) and sort progress (e.g. 4 / 15)
2. One fruit item appears in the pickup lane ( draggable )
3. Player drags fruit to a bin
4. Correct bin → snap, sparkle, next fruit spawns
5. Wrong bin → fruit bounces back with *"Try another bin!"*
6. After **15 correct sorts** → round clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Sort Round (default) | 15 fruits, mixed colors, counts toward clear |
| Free Sort | Endless fruits, no unlock progress |

## Difficulty

| Tier | Fruit pool | Distractors | Bin labels |
|------|------------|-------------|------------|
| Easy | 3 primary fruit colors only | None — each fruit matches exactly one bin | Color + word + icon |
| Normal | Same pool | 1 gray/neutral fruit per 5 items → *"Skip — no bin!"* tap to dismiss | Color + word |
| Hard | Adds orange/purple fruits mapped to nearest bin (orange→Red, purple→Red) | Faster spawn cadence | Color swatch only |

Default: **Easy**. Key: `ldp-color-match-difficulty`.

## Color mapping (canonical)

| Fruit example | Bin |
|---------------|-----|
| Adam Apple, Diana Dragonfruit | Red |
| Benjamin Banana, Hannah Honeydew | Yellow |
| Carlos Coconut, Gary Grape (green variety) | Green |

Exact mapping lives in data file; art may use colored silhouettes if full roster unavailable.

## Out of scope v1

- More than three bins (blue/orange standalone bins → v2)
- Two-player competitive sort
- Auto-grant Count the Dragons — Terminal `LOGIN COUNT-DRAG-7`
- Voice-over color names

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "color-match"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
