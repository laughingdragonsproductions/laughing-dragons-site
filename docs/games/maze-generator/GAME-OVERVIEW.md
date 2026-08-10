# Maze Generator — Game Overview

**Slug:** `maze-generator`  
**Site path:** `/games/maze-generator/`  
**Status:** in production  
**Unlock:** requires `maze-generator-unlocked` · reward code `COLOR-SVG-13`  
**Audience:** Kids ~6–12 + parents/teachers  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Fresh printable and on-screen mazes every visit. Draw a path from **Start** to **Finish** with finger or mouse — or print the PDF-friendly page for offline puzzle time. Difficulty presets change grid size and dead-end density. A classic puzzle format that pairs with Fruit Friends theming when skins land.

## Core loop

1. Player picks size preset (Small / Medium / Large) on landing
2. Generator builds a perfect maze (single solution) on canvas or SVG grid
3. Player drags from Start cell through open passages to Finish
4. Valid move → highlight path; invalid wall cross → gentle bump feedback
5. Reach Finish → celebration + option to **Print**, **New maze**, or continue **Solve Run**
6. Complete **3 mazes** in one **Solve Run** → clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Solve Run (default) | 3 mazes solved (any preset), counts toward clear |
| Free Explore | Endless new mazes, no unlock progress |
| Print only | Generate + open print dialog, no solve tracking |

## Difficulty (size presets)

| Preset | Grid | Cell px (screen) | Dead-end feel |
|--------|------|------------------|---------------|
| Small | 8×8 | 32 | Few branches — good for ages 6–7 |
| Medium | 12×12 | 28 | Balanced |
| Large | 16×16 | 24 | More dead ends — ages 9+ |

Default preset: **Medium**. Key: `ldp-maze-generator-size`.

Solve Run may mix presets — player chooses before each maze.

## Generation algorithm (v1)

Recursive backtracker on odd-sized cell grid; render walls as thick strokes. Start top-left, Finish bottom-right. Seed from `Date.now()` for variety; optional daily seed later.

## Out of scope v1

- 3D mazes
- Multiplayer race
- Auto-grant Coloring Page Studio — Terminal `LOGIN COLOR-SVG-13`
- Themed wall textures (dragon scales) — CSS solid walls v1

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "maze-generator"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
