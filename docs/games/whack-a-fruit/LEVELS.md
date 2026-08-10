# Whack-a-Fruit — Levels

## Structure

One **Whack Round** = 60-second timed session. Clear when **score ≥ 15** (correct taps) before timer hits 0. No numbered levels.

## Wave cadence (Normal / default)

| Time block | Active cells | Target rotation |
|------------|--------------|-----------------|
| 0–20 s | 2–3 pops | Rotate A–M letters |
| 21–40 s | 3–4 pops | Full pool |
| 41–60 s | 4–5 pops | Slightly faster respawn |

New wave every 1.5–2.5 s (random interval). Only one target per wave.

## Easy tier

- Letter-only prompts
- 2.0 s pop visibility
- Max 2 decoy cells active
- Wrong taps ignored for scoring

## Hard tier

- Name-only prompts (no letter shown in target line)
- 1.2 s pop visibility
- Up to 6 decoys
- Wrong tap −1 score

## Win condition

Reach **15 correct taps** before 60 s expires → `KIDS_UNLOCKS.markCleared("whack-a-fruit")` → hub shows `PATTERN-AB-11`.

Endless mode never triggers clear.

## Fail condition

Timer reaches 0 with score < 15 → *"So close!"* overlay showing final score → **Try again** (no markCleared).

## Par

Optional: score ≥ 20 with zero wrong taps → toast *Whack wizard!*

## Session length target

Exactly 60 s per Whack Round attempt; expect 1–3 attempts for younger players.
