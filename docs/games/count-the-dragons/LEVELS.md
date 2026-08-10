# Count the Dragons — Levels

## Structure

One **Count Round** = 10 correct answers. No numbered level map; difficulty tier adjusts count range and scene density only.

## Round sequence (Normal / default)

| Round | Count range | Notes |
|-------|-------------|-------|
| 1–3 | 1–4 | Warm-up — large sprites, generous spacing |
| 4–7 | 3–8 | Mixed mid-range counts |
| 8–10 | 5–10 | Slightly denser layout; celebration after round 10 |

Each round picks a random integer N within the tier's allowed range. Avoid repeating the same N on consecutive rounds when possible.

## Easy tier

- N always 1–5
- No decoy objects
- Number pad shows only buttons 1–5 (hide 6–10)

## Hard tier

- N always 1–10
- 1–2 non-countable decoys per scene (cloud, rock, bush) — player counts characters only
- One-time HUD banner explains decoys (see `HUD.md`)

## Win condition

Complete **10 correct answers** in one Count Round → `KIDS_UNLOCKS.markCleared("count-the-dragons")` → hub shows `SIMON-GLOW-8`.

Practice mode never triggers clear.

## Par

None required. Optional flair: zero wrong taps across all 10 rounds → toast *Perfect counter!*

## Wrong-answer behavior

- Number pad button shakes (200 ms)
- Toast: *"Count again!"*
- Same scene stays; unlimited retries per round
- Does not advance round counter

## Session length target

~3–4 minutes for 10 rounds on Easy.
