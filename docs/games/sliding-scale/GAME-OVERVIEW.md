# The Sliding Scale — game overview

**Slug:** `sliding-scale`  
**Path:** `/games/sliding-scale/`  
**Type:** Pre-pipeline standalone (always playable, outside Terminal unlock chain)

## Pitch

A workroom slider puzzle — slide tiles to rebuild Laughing Dragons workshop photos, the workroom banner, and the studio logo. Easy 3×3, Med 4×4, or Hard 5×5.

## Audience

General audiences on the Games hub; casual puzzle players who want a quick brain break between arcade titles.

## Core loop

1. Pick difficulty (Easy / Med / Hard).
2. Shuffle scrambles the board; a reference thumbnail shows the target image.
3. Click tiles in the same row or column as the empty square to slide them (multi-tile slides supported).
4. Arrow keys move one adjacent tile at a time.
5. Win when every tile is in order; overlay celebrates with maker-themed copy.

## Modes

| Mode | Grid | Label |
|------|------|-------|
| Easy | 3×3 | Easy |
| Med | 4×4 | Med |
| Hard | 5×5 | Hard |

## Puzzle art

| id | Label | Asset |
|----|-------|-------|
| workshop | Glowforge workshop | `assets/kids/games/sliding-scale/workshop.png` |
| workroom | Workroom banner | `assets/kids/games/sliding-scale/workroom-banner.png` |
| logo | Laughing Dragons logo | `assets/kids/games/sliding-scale/logo.png` |

## Query params

- `?diff=easy|med|hard` — starting difficulty
- `?image=workshop|workroom|logo` — fixed puzzle image
- `?seed=N` — deterministic shuffle RNG

## Out of scope (v1)

- Terminal LOGIN / unlock codes
- Score persistence or leaderboards
- Timer or move par ratings
