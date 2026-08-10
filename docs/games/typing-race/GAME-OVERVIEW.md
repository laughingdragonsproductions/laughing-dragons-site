# Typing Race — Game Overview

**Slug:** `typing-race`  
**Site path:** `/games/typing-race/`  
**Status:** in production  
**Unlock:** requires `typing-race-unlocked` · reward code `SORT-COLOR-6`  
**Audience:** Kids ~4–10  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

A bite-sized keyboard sprint in the Fruit Friends workroom. Letters pop onto the screen one at a time — type the matching key before the timer bar runs out. Same retro-terminal energy as Terminal Trainer, but shorter rounds and bigger visuals for kids building letter recognition and finger placement.

## Core loop

1. HUD shows score, streak, and round timer
2. A large letter (and optional Fruit Friend hint) appears in the play zone
3. Player presses the matching key on physical keyboard (or on-screen keys on tablet)
4. Correct → ding, score +1, streak +1, next letter spawns faster
5. Wrong or timeout → gentle miss, streak resets, same letter retries once then advances
6. After **20 successful types** in one Heat → round clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Heat (default) | Single continuous run — 20 correct letters to clear |
| Practice | Untimed letters A–Z cycle; no unlock progress |

## Difficulty

| Tier | Time per letter | Letter pool | On-screen keyboard |
|------|-----------------|-------------|-------------------|
| Easy | 5.0 s | A–M only | Always visible |
| Normal | 3.5 s | A–Z | Visible on tablet only |
| Hard | 2.5 s | A–Z + mixed case pairs (Aa) | Hidden — physical keyboard only |

Default: **Easy**. Persists in `ldp-typing-race-difficulty`.

## Out of scope v1

- Multiplayer or leaderboard
- Full words or sentences (letters only v1)
- Sound pack beyond one success/error blip
- Auto-grant Color Match — Terminal `LOGIN SORT-COLOR-6`
- Falling-letter animation (v1 uses center pop + fade timer bar; falling mode v2)

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "typing-race"`
- Tone reference: `assets/js/terminal-game.js` (workroom aesthetic, not mechanics clone)

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
