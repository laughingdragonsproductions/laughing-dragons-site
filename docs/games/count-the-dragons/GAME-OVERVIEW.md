# Count the Dragons — Game Overview

**Slug:** `count-the-dragons`  
**Site path:** `/games/count-the-dragons/`  
**Status:** in production  
**Unlock:** requires `count-the-dragons-unlocked` · reward code `SIMON-GLOW-8`  
**Audience:** Kids ~3–8 (preschool / early K)  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

Early math disguised as a dragon hunt. A playful scene fills with laughing dragons and Fruit Friends — the player counts how many they see and taps the matching number from 1 to 10. Instant feedback, no reading required on Easy, and short rounds that parents can replay while dinner cooks.

## Core loop

1. HUD shows round progress (e.g. 3 / 10) and a prompt: *How many do you see?*
2. Scene renders N characters (1–10) scattered on a soft background
3. Number pad (1–10) appears below the scene
4. Player taps a number
5. Correct → sparkle, +1 score, next round
6. Wrong → gentle shake, *"Count again!"* — same scene, retry allowed
7. After **10 correct rounds** → round clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Count Round (default) | 10 rounds, mixed counts 1–10, counts toward clear |
| Practice | Endless rounds, no unlock progress, optional count range 1–5 only |

## Difficulty

| Tier | Count range | Scene complexity | Distractors |
|------|-------------|------------------|-------------|
| Easy | 1–5 only | Large sprites, wide spacing | None |
| Normal | 1–10 | Medium sprites, mild overlap OK | None |
| Hard | 1–10 | Smaller sprites, tighter clusters | 1–2 gray "decoy" shapes that do **not** count (clouds, rocks) — first round shows hint |

Default: **Easy**. Key: `ldp-count-dragons-difficulty`.

## Character pool

Use laughing dragon silhouettes and Fruit Friends portraits from existing art. Same character may appear twice in one scene (each instance counts). Minimum sprite size 64 px on Easy, 48 px on Hard.

## Out of scope v1

- Addition/subtraction prompts ("3 + 2 = ?")
- Timed countdown pressure
- Auto-grant Simon Says — Terminal `LOGIN SIMON-GLOW-8`
- Voice counting aloud

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "count-the-dragons"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
