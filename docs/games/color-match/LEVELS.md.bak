# Color Match Sort — Levels

## Structure

One **Sort Round** = 15 fruits sorted correctly. No numbered levels; difficulty tier adjusts pool and neutral items only.

## Round composition (Easy / default)

| Segment | Fruits | Color mix |
|---------|--------|-----------|
| Warm-up | 1–5 | One color repeated max 2×; large sprites |
| Mix | 6–12 | Even-ish spread across Red / Yellow / Green |
| Finish | 13–15 | Slightly faster spawn; celebration queued after 15 |

15 items ≈ 5 per bin on average (random, not enforced equal).

## Normal tier addition

Every 5th item (5, 10, 15) may be a **neutral** fruit (gray coconut) — player taps *Skip* instead of sorting. Still counts toward 15 processed items.

## Hard tier addition

- Orange → Red bin, Purple → Red bin (document in HUD hint once)
- Spawn delay −30% vs Easy
- Smaller drag hit targets (still ≥ 44 px)

## Win condition

Complete **15 correct sorts** (skips count as processed on Normal) in one Sort Round → `KIDS_UNLOCKS.markCleared("color-match")` → hub shows `COUNT-DRAG-7`.

Free Sort never triggers clear.

## Par

None required. Optional: zero wrong-bin drops on Easy → toast *Perfect sort!*

## Wrong-bin behavior

- Fruit animates back to pickup lane (300 ms ease)
- Does not increment progress counter
- Unlimited retries per fruit

## Session length target

~2–3 minutes for 15 items on Easy.
