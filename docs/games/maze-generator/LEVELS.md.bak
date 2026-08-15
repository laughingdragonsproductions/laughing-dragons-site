# Maze Generator — Levels

## Structure

No numbered levels. A **Solve Run** = **3 mazes completed** (path reaches Finish). Each maze can use any size preset.

## Solve Run flow (default)

| Maze # | Suggested preset | Notes |
|--------|------------------|-------|
| 1 | Small or Medium | First Finish triggers *"Great path!"* |
| 2 | Player choice | |
| 3 | Player choice | Win overlay after Finish |

Preset choice is player-driven — no forced escalation.

## Win condition

Reach **Finish** on **3 generated mazes** within one Solve Run session → `KIDS_UNLOCKS.markCleared("maze-generator")` → hub shows `COLOR-SVG-13`.

Free Explore and Print-only never trigger clear.

## Path validation

- Player draws polyline through cell centers
- Move to adjacent cell only if wall between is open
- Backtracking allowed (path recolors)
- Finish detected when path enters Finish cell

## Undo / reset

| Action | Behavior |
|--------|----------|
| **Clear path** | Wipes drawn line; keeps same maze |
| **New maze** | Regenerates grid; resets path; counts as new maze only after prior Finish |

Starting a new maze before Finish does not increment solve count.

## Par

Optional: all 3 mazes on Medium or Large with zero invalid wall bumps → toast *Pathfinder pro!*

## Session length target

~6–10 minutes for 3 Medium mazes.

## Print behavior

Print layout: maze centered, title *Laughing Dragons Maze*, Start/Finish labels, footer URL. Print does not count toward Solve Run unless player also solves on screen.
