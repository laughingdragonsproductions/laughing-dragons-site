# Simon Says Light Pad — Levels

## Structure

No numbered levels. A **Memory Run** = up to 5 rounds. Each round builds a random sequence starting at tier start length and adding +1 step after each success within that round.

## Round flow (Normal / default)

| Round | Starting sequence | Goal within round |
|-------|-------------------|-------------------|
| 1 | 3 steps | Reach 5+ steps OR survive one full success |
| 2 | 3 steps | Same |
| 3 | 3 steps | Same |
| 4 | 3 steps | Same |
| 5 | 3 steps | **Must reach 8 steps** on any success in session |

**Session clear:** Hit sequence length **8** at least once during the 5-round Memory Run.

If player fails a round (after retries exhausted), next round still starts at tier start length — session continues until round 5 completes or clear achieved early.

## Easy tier

- Start length 2; session goal length **6**
- 2 retries per mistake within a round
- Slower flash (1000 ms)

## Hard tier

- Start length 3; session goal length **10**
- No retries — wrong tap ends round immediately
- Faster flash (600 ms)

## Sequence generation

- Each new step: random pad index 0–3
- Avoid same pad more than 3 times in a row (reshuffle if needed)
- Store current sequence in memory only — no persistence mid-round

## Win condition

Reach target sequence length (8 Normal, 6 Easy, 10 Hard) at least once in one Memory Run → `KIDS_UNLOCKS.markCleared("simon-says")` → hub shows `HANG-FRUIT-9`.

Endless and Slow Practice never trigger clear.

## Par

Optional: clear on first round that hits length 8 with zero mistakes in that round → toast *Flawless memory!*

## Wrong-tap behavior

- Pad flashes red + low buzz tone
- If retries remain: toast *"Try again from the start of your turn"* — player re-enters repeat phase from step 1 of current sequence
- If no retries: round ends, advance round counter

## Session length target

~4–6 minutes for a full 5-round Normal session.
