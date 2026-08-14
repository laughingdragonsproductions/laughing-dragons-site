# Drago's Revenge — Levels

## Grid

- **Size:** 20×20 cells (18×18 play + 1-cell pink wall ring)
- **Legend (ASCII in level data):**
  - `#` wall (border + pink leaf tile)
  - `.` floor (olive)
  - `G` slidable (green push block)
  - `T` tooth (1×1 inner unbreakable)
  - `P` Drago spawn (replaced with floor at runtime)
  - `H` hunter spawn (replaced with floor; hunters placed from level meta)

## Win condition

All hunters eliminated (trapped or crushed) **and** all dragon-tile pickups collected → advance to next level. Beat level 8 → victory screen; best score saved.

## Lives

3 lives. Lose one when: hunter touches Drago, or timer hits 0. Reset current level layout on life loss.

## Level table

| # | Name | Hunters | Timer (Hard) | Notes |
|---|------|---------|--------------|-------|
| 1 | Mockup | 2 | 120s | Transcribe `Boardwithgreen.png` — center column, framing rectangle, top/bottom teeth, mid 2×2 clusters |
| 2 | Open Arena | 2 | 110s | Sparse greens, teeth in corners, room to kite |
| 3 | Tight Lattice | 2 | 100s | Dense greens, narrow gaps |
| 4 | Twin Rooms | 3 | 100s | Teeth wall with gap; hunters in both halves |
| 5 | Cross | 3 | 90s | Plus-shaped green paths; teeth at inner corners |
| 6 | Ring | 3 | 90s | Hollow green square; teeth in center pocket |
| 7 | Asymmetric | 4 | 80s | Offset teeth, broken mirror symmetry |
| 8 | Gauntlet | 4 | 75s | Fragmented greens, scattered teeth, max pressure |

Easy mode: hunter moves every 3 player steps (Hard: 2), timer +30s.

## Scoring

| Event | Points |
|-------|--------|
| Trap hunter | 100 |
| Crush hunter | 75 |
| Collect dragon tile | 50 |
| Level clear bonus | 200 × level # |

## Level 1 — Mockup (reference layout)

```
####################
#........GGGG......#
#.GGGGGG.G..G.GGGG.#
#G......G.GGG.G....G#
#G.GGGG.G.G.G.GGGG.G#
#G.G..G...G...G..G.G#
#G.G.GGGGGGGG.G.GG.G#
#..G....P....G......#
#G.G.GGGGGGGG.G.GG.G#
#G.G..G...G...G..G.G#
#G.GGGG.G.G.G.GGGG.G#
#G......G.GGG.G....G#
#.GGGGGG.G..G.GGGG.#
#..TT........TT.....#
#........GGGG......#
#......TT....TT.....#
#H..............H...#
####################
```

(Adjustments at encode time — `H` and `P` on floor cells inside border.)

Levels 2–8: encoded in `assets/js/dragos-revenge-levels.js` per names above.
