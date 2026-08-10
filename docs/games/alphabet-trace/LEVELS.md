# Alphabet Trace — Levels

## Structure

Alphabet Trace has no traditional "levels." Progress is measured in **letters traced** within a **Journey run**.

- **Journey run:** sequential letters A through J (10 letters)
- **Free Pick:** any single letter A–Z; does not advance Journey or trigger clear
- Each letter has 1–3 strokes defined in data (see BUILD-PLAN)
- Failed stroke → gentle retry on same stroke; no lives or game-over

## Letter table (Journey A–J)

| # | Letter | Fruit Friend | Strokes | Notes |
|---|--------|--------------|---------|-------|
| 1 | A | Adam Apple | 2 | Diagonal pair + crossbar |
| 2 | B | Benjamin Banana | 3 | Stem + two bowls |
| 3 | C | Carlos Coconut | 1 | Single open curve |
| 4 | D | Diana Dragonfruit | 2 | Stem + bowl |
| 5 | E | Eddie Eggplant | 4 | Stem + three bars |
| 6 | F | Fiona Fig | 3 | Stem + two bars |
| 7 | G | Gary Grape | 2 | C-shape + tail |
| 8 | H | Hannah Honeydew | 3 | Two stems + crossbar |
| 9 | I | Ivan Iceberg | 3 | Top serif, stem, bottom serif |
| 10 | J | Jenny Jackfruit | 2 | Hook + bottom curve |

Letters K–Z exist in Free Pick with same stroke data; not required for v1 clear.

## Win condition

Complete **Journey letters A through J** (all 10) on any difficulty → `KIDS_UNLOCKS.markCleared("alphabet-trace")` → hub shows reward code `TYPE-FAST-5`.

## Par

None for v1. Any completed A–J Journey counts as clear regardless of retries per stroke.

## Retry rules

- Stroke leaves tolerance band → path resets, copy: *"Stay on the line — try again!"*
- No penalty; unlimited retries per stroke
- "Skip letter" button hidden in Journey until v2 (keeps clear meaningful)

## Session length target

~3–5 minutes for A–J on Easy (parent-friendly single sitting).
