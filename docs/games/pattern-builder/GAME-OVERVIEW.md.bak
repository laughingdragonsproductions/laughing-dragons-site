# Pattern Builder — Game Overview

**Slug:** `pattern-builder`  
**Site path:** `/games/pattern-builder/`  
**Status:** in production  
**Unlock:** requires `pattern-builder-unlocked` · reward code `MAZE-PATH-12`  
**Audience:** Kids ~4–9  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Complete-the-sequence puzzles with Fruit Friends. A row shows a repeating or growing pattern — ABA, ABC, AABB — and the player picks what comes next from three choices. Clear rules, instant check, shuffled rounds, and real early-math pattern skills without heavy art.

## Core loop

1. HUD shows puzzle progress (e.g. Puzzle **4** / **8**)
2. Pattern row renders 4–6 fruit icons + empty slot at end
3. Three answer choices appear below (one correct, two plausible decoys)
4. Player taps a choice
5. Correct → green flash, next puzzle
6. Wrong → shake, *"Look at the pattern again!"* — retry same puzzle
7. Solve **8 puzzles** in one **Pattern Run** → clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Pattern Run (default) | 8 puzzles, mixed pattern types, counts toward clear |
| Practice | Endless puzzles, single pattern type filter |

## Difficulty

| Tier | Pattern types | Row length | Decoy quality |
|------|---------------|------------|---------------|
| Easy | ABA, AB only | 4 icons + slot | Obvious wrong choices |
| Normal | ABA, ABC, AABB | 5 icons + slot | Same-color decoys |
| Hard | ABC, AABB, ABBC | 6 icons + slot | Decoys match partial sub-pattern |

Default: **Normal**. Key: `ldp-pattern-builder-difficulty`.

## Pattern types (v1)

| Type | Example (letters) | Example (fruit ids) |
|------|-------------------|---------------------|
| AB | A B A B ? → A | apple, banana, apple, banana, ? → apple |
| ABA | A B A ? → B | apple, banana, apple, ? → banana |
| ABC | A B C A ? → B | apple, banana, cherry, apple, ? → banana |
| AABB | A A B B ? → A | apple, apple, banana, banana, ? → apple |

Fruit icons use colored silhouettes or roster portraits — pattern is by **fruit id**, not color alone.

## Out of scope v1

- Player-built custom patterns
- Numeric-only patterns (1-2-3) — v2
- Auto-grant Maze Generator — Terminal `LOGIN MAZE-PATH-12`
- Timed pressure

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "pattern-builder"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
