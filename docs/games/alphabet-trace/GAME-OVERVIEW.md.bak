# Alphabet Trace — Game Overview

**Slug:** `alphabet-trace`  
**Site path:** `/games/alphabet-trace/`  
**Status:** in production  
**Unlock:** requires `alphabet-trace-unlocked` · reward code `TYPE-FAST-5`  
**Audience:** Kids ~4–10  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Handwriting practice disguised as a Fruit Friends adventure. Each letter appears as a big, friendly outline with a glowing path to follow — drag a finger or mouse along the strokes until the letter lights up. Kids who loved finding friends in Fruit Search now learn to *write* their namesake letters, one celebration at a time.

## Core loop

1. HUD shows current letter, Fruit Friend mascot, and progress (e.g. "Letter 3 of 10")
2. Player sees a large letter outline with numbered stroke guides
3. Drag along the active stroke; stay inside the tolerance band
4. Stroke complete → next stroke or letter complete → sparkle + friend cheer
5. Letter complete → short celebration, auto-advance to next letter in Journey
6. After letter **J** (10 letters) → round clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Journey (default) | Letters A→J in order; clearing this path counts as game clear |
| Free Pick | Letter picker grid A–Z; practice any letter, no unlock progress |

## Difficulty

| Tier | Stroke tolerance | Guide dots | Letter size |
|------|------------------|------------|-------------|
| Easy | Wide (18 px) | Large numbered dots on every stroke | 80% of play area |
| Normal | Medium (12 px) | Dots on start + corners only | 65% of play area |
| Hard | Narrow (8 px) | Start dot only | 50% of play area |

Default on first visit: **Easy**. Difficulty persists in `localStorage` key `ldp-alphabet-trace-difficulty`.

## Fruit Friends tie-in

Each letter pairs with its cast member from the A–Z roster (Adam Apple → A, Benjamin Banana → B, …). Portrait thumbnail in HUD; on letter clear, friend says a one-line cheer (text only v1): *"Great J, like Jenny Jackfruit!"*

## Out of scope v1

- Audio voice-over and stroke sound effects
- Cursive or lowercase-only mode
- Parent progress report / export
- Auto-granting Typing Race — kid uses Terminal `LOGIN TYPE-FAST-5`
- Full A–Z Journey required for clear (v1 clear stops at J; K–Z playable in Free Pick only)

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "alphabet-trace"`
- Prior chain: Fruit Search → `TRACE-A-Z-4` unlocks this game

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
