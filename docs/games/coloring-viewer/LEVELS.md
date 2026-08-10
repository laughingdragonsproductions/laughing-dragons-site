# Coloring Page Studio — Levels

## Structure

No numbered levels. A **Studio Session** = **3 pages completed** at ≥ **80%** fill threshold.

## Completion threshold

Each SVG path/group with class `color-region` counts toward total. Filled = region has a user-applied fill color ≠ default outline white.

```
fillPercent = filledRegions / totalRegions
complete = fillPercent >= 0.80
```

Show subtle progress ring on gallery card after partial coloring (saved in sessionStorage per page).

## Studio Session flow

| Step | Requirement |
|------|-------------|
| 1 | Pick any page from gallery |
| 2 | Color until ≥80% → toast *Page complete!* (1/3) |
| 3 | Return to gallery; pick another page (no repeats required but encouraged) |
| 4 | Third page complete → win overlay |

Same page cannot count twice in one session.

## Free Color mode

No threshold tracking; no `markCleared`. Progress persists in `sessionStorage` for undo/back navigation only.

## Win condition

Complete **3 distinct pages** at ≥80% in one Studio Session → `KIDS_UNLOCKS.markCleared("coloring-viewer")`.

No reward code displayed — final game in unlock chain. Win overlay celebrates full catalog completion.

## Par

Optional: all 3 pages at 100% fill → toast *Master colorist!*

## Session length target

~10–15 minutes for 3 pages (parent-led).

## Print

Print uses current fills via print CSS; does not affect completion logic.
