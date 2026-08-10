# Pattern Builder — Levels

## Structure

One **Pattern Run** = **8 puzzles solved**. Difficulty tier controls pattern types and row length.

## Puzzle sequence (Normal / default)

| Puzzle # | Pattern types allowed | Row length |
|----------|----------------------|------------|
| 1–2 | AB, ABA | 4 + slot |
| 3–5 | ABA, ABC | 5 + slot |
| 6–8 | ABC, AABB | 5–6 + slot |

No duplicate exact pattern within one run (same type + same fruit ids).

## Easy tier

- AB and ABA only
- Row length 4 + slot
- Decoys: fruits not in pattern at all

## Hard tier

- ABC, AABB, ABBC (A-B-B-C → next A)
- Row length 6 + slot
- Decoys: fruits that match first half but break second half

## Puzzle generation

1. Pick pattern type from tier pool
2. Pick 2–3 distinct fruit ids for pattern alphabet
3. Extend row to required length; last cell is `?`
4. Compute correct answer id
5. Generate 2 decoys per tier rules; shuffle choice order

## Win condition

Solve **8 puzzles** in one Pattern Run → `KIDS_UNLOCKS.markCleared("pattern-builder")` → hub shows `MAZE-PATH-12`.

Practice mode never triggers clear.

## Wrong-answer behavior

- Choice button shakes
- Toast: *"Look at the pattern again!"*
- Same puzzle; unlimited retries
- Does not advance puzzle counter

## Par

Optional: all 8 solved on first try each → toast *Pattern pro!*

## Session length target

~4–5 minutes for 8 puzzles on Normal.
