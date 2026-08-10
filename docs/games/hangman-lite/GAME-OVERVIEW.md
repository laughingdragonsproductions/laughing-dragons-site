# Hangman Lite — Game Overview

**Slug:** `hangman-lite`  
**Site path:** `/games/hangman-lite/`  
**Status:** in production  
**Unlock:** requires `hangman-lite-unlocked` · reward code `WHACK-GRID-10`  
**Audience:** Kids ~6–12  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Classic hangman stripped to kid-safe essentials. Guess letters to reveal Fruit Friend names and short A–Z vocabulary words — no grim art, just a friendly dragon who loses hats instead of limbs. Classroom-friendly, minimal graphics, strong tie-in to letter learning from Alphabet Trace.

## Core loop

1. HUD shows blank word slots, guessed letters, and misses remaining
2. Word chosen from tier-appropriate pool (e.g. **BANANA**, **ADAM**)
3. Player taps A–Z letter buttons (or keyboard)
4. Correct letter → fills all matching slots + green flash
5. Wrong letter → miss counter −1 + gentle *"Not in this word"* + dragon loses one accessory
6. Win word → next word; lose all misses → round ends with encouragement retry
7. Solve **5 words** in one **Word Run** → clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Word Run (default) | 5 words solved, counts toward clear |
| Free Play | Endless words, no unlock progress |

## Difficulty

| Tier | Word pool | Max length | Misses allowed | Hints |
|------|-----------|------------|----------------|-------|
| Easy | 3–4 letter fruit names | 4 | 8 | Show first letter after 3 wrong |
| Normal | 4–6 letter names + fruit | 6 | 6 | Category hint: *"A Fruit Friend"* |
| Hard | 6–8 letter words | 8 | 5 | No hints |

Default: **Normal**. Key: `ldp-hangman-lite-difficulty`.

## Word pool (sample)

| Word | Category | Tier |
|------|----------|------|
| ADAM | Fruit Friend | Easy |
| BANANA | Fruit | Easy |
| DRAGON | Theme | Normal |
| GRAPE | Fruit | Normal |
| HONEYDEW | Fruit | Hard |
| LAUGHING | Theme | Hard |

Full list in data file — uppercase only, A–Z letters, no spaces or hyphens in v1.

## Out of scope v1

- Custom word entry
- Multiplayer
- Gruesome hangman art
- Auto-grant Whack-a-Fruit — Terminal `LOGIN WHACK-GRID-10`
- Phrase puzzles with spaces

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "hangman-lite"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
