# Simon Says Light Pad — Game Overview

**Slug:** `simon-says`  
**Site path:** `/games/simon-says/`  
**Status:** in production  
**Unlock:** requires `simon-says-unlocked` · reward code `HANG-FRUIT-9`  
**Audience:** Kids ~5–12  
**Brand:** Laughing Dragons / Fruit Friends

## Pitch

The classic memory sequence game on a dragon-themed light pad. Watch four colored pads flash in order — then repeat the pattern by tapping. Each successful round adds one more step. Simple canvas, high replay, and optional local high-score tracking for older siblings.

## Core loop

1. HUD shows current sequence length and round (e.g. Step **5** · Round **3** / **5**)
2. **Watch** phase: pads light up one at a time with tone + glow (800 ms each, 300 ms gap)
3. **Repeat** phase: player taps pads in the same order
4. Correct full sequence → next round adds one step
5. Wrong tap → round ends; retry from sequence length 1 or continue session per mode
6. Reach **sequence length 8** within a **5-round session** → clear → win overlay + reward code

## Modes (v1)

| Mode | Description |
|------|-------------|
| Memory Run (default) | 5 rounds; must hit length 8 at least once to clear |
| Endless | Single life — how long can you go? No unlock progress |
| Slow Practice | 1200 ms flash, 500 ms gap — learning mode |

## Difficulty

| Tier | Start length | Max in session | Flash speed | Lives per round |
|------|--------------|----------------|-------------|-----------------|
| Easy | 2 | 6 | 1000 ms | 2 retries on mistake |
| Normal | 3 | 8 | 800 ms | 1 retry |
| Hard | 3 | 10 | 600 ms | No retry — one wrong tap fails round |

Default: **Normal**. Key: `ldp-simon-says-difficulty`.

## Pad colors (canonical)

| Pad | Color | Tone (Web Audio) |
|-----|-------|------------------|
| 0 | Dragon green | C4 |
| 1 | Fruit red | E4 |
| 2 | Sky blue | G4 |
| 3 | Sun yellow | C5 |

Pads arranged 2×2 on desktop; vertical stack acceptable on narrow mobile.

## Out of scope v1

- Five or more pads
- Multiplayer pass-and-play
- Auto-grant Hangman Lite — Terminal `LOGIN HANG-FRUIT-9`
- MIDI export / custom sound packs

## References

- Unlock registry: `assets/js/kids-unlocks.js`
- Hub card: `assets/js/games.js` — `id: "simon-says"`

See also: `LEVELS.md`, `HUD.md`, `BUILD-PLAN.md`, `UNLOCK.md`
