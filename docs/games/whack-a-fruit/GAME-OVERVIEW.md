# Whack-a-Fruit — Game Overview

**Slug:** `whack-a-fruit`  
**Site path:** `/games/whack-a-fruit/`  
**Status:** in production  
**Unlock:** requires `whack-a-fruit-unlocked` · reward code `PATTERN-AB-11`  
**Audience:** Kids ~4–10  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Arcade reaction game on a 3×3 grid. Fruit Friends pop up — tap the one that matches the target letter or name before it ducks away. Fast, mobile-friendly, high dopamine, and still teaches letter recognition from Hangman and Alphabet Trace.

## Core loop

1. HUD shows score, timer, and target prompt (e.g. *Tap **B** — Benjamin Banana!*)
2. Random cells in the 3×3 grid spawn fruit portraits for 1.2–2.0 s
3. Exactly one cell per wave matches the target; others are decoys (different letters)
4. Correct tap → +1 score, sparkle, next wave
5. Wrong tap or timeout → no penalty on Easy; −1 score on Normal/Hard
6. Score **15** correct taps within **60 s** → round clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Whack Round (default) | 60 s timer, goal 15 correct, counts toward clear |
| Endless | No timer — 3 misses ends run; high score only |

## Difficulty

| Tier | Target type | Pop duration | Decoy count | Wrong tap |
|------|-------------|--------------|-------------|-----------|
| Easy | Letter only (*Tap **M***) | 2.0 s | 2 decoys max | No penalty |
| Normal | Letter + name hint | 1.5 s | 4 decoys | −1 score |
| Hard | Name only (*Find **Carlos***) | 1.2 s | 6 decoys | −1 score + brief grid shake |

Default: **Normal**. Key: `ldp-whack-a-fruit-difficulty`.

## Character mapping

Each Fruit Friend maps to a starting letter (A–Z subset used in v1 pool — 15 characters minimum). Decoys always show friends whose letter ≠ target.

## Out of scope v1

- 4×4 or 5×5 grids
- Power-ups / golden fruit
- Auto-grant Pattern Builder — Terminal `LOGIN PATTERN-AB-11`
- Multiplayer split screen

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "whack-a-fruit"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
