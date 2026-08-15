# Coloring Page Studio — Game Overview

**Slug:** `coloring-viewer`  
**Site path:** `/games/coloring-viewer/`  
**Status:** in production  
**Unlock:** requires `coloring-viewer-unlocked` · reward code *(none — final game in chain)*  
**Audience:** Kids ~3–10 + parents/teachers  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Click-to-color SVG Fruit Friends pages — more creative tool than score chase. Open a character outline, fill regions with the palette, undo mistakes, and print finished art for fridge or classroom. Parents and teachers search for printable coloring constantly; this keeps that traffic inside the games hub and caps the unlock chain as a relaxing finale.

## Core loop

1. Gallery landing shows available coloring pages (Fruit Friends + dragons)
2. Player picks a page → SVG loads in editor viewport
3. Tap a region → fills with active palette color
4. Palette, undo, and clear tools available at all times
5. **Complete** one page (≥ **80%** of colorable regions filled) → mark page done
6. Finish **3 pages** in one **Studio Session** → clear → win overlay *(no next-game code — chain end)*

## Modes (v1)

| Mode | Description |
|------|-------------|
| Studio Session (default) | Complete 3 pages at ≥80% fill, counts toward clear |
| Free Color | Any page, no progress tracking |

## Page roster (v1 minimum)

| Page id | Title | Regions |
|---------|-------|---------|
| `adam-apple` | Adam Apple | ~12 |
| `benjamin-banana` | Benjamin Banana | ~12 |
| `laughing-dragon` | Laughing Dragon | ~16 |
| `carlos-coconut` | Carlos Coconut | ~14 |
| `diana-dragonfruit` | Diana Dragonfruit | ~14 |

Ship 5 pages at launch; more added without code changes via data file.

## Palette (v1)

12 colors + eraser (transparent / white fill): red, orange, yellow, green, blue, purple, pink, brown, black, gray, white, dragon gold `#E8B923`.

Default swatch: dragon green. Key active color: `ldp-coloring-viewer-color`.

## Out of scope v1

- Freehand brush drawing
- Upload custom SVG
- Next-game unlock code *(terminal chain ends here)*
- Save to cloud / account
- Magic wand fill (flood fill) — tap region only v1

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "coloring-viewer"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
