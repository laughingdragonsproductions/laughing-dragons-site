# Drago's Revenge — HUD & UI copy

## Screen flow

```
Landing → Menu (difficulty) → Play → Level clear → Next level / Victory → Menu
         ↘ How to Play overlay
Life lost → Same level reset (lives HUD updates)
Game over → Play Again / Menu
```

## Landing

Standard `initGameChrome` from `games/dragos-revenge/index.html`.

| Element | Copy |
|---------|------|
| Eyebrow | Laughing Dragons Games |
| Lead | Push blocks, trap hunters, collect dragon tiles — Drago's Revenge. |
| Note | Always playable — no unlock code needed. |

## Menu overlay

| Element | ID | Copy |
|---------|-----|------|
| Title | `#dr-title` | **Drago's Revenge** |
| Tagline | — | Push green blocks. Trap the knights. Collect the dragons. |
| Best score | `#dr-best` | Best score: **0** |
| Difficulty | `#dr-difficulty` | Easy / Hard radio |
| Play | `#dr-btn-play` | **Play** |
| How to | `#dr-btn-howto` | **How to Play** |

## Play HUD (fruit bar — matches mockup)

Top bar above canvas:

| Element | ID | Content |
|---------|-----|---------|
| Lives | `#dr-lives` | 3 whole dragon-fruit icons (Drago mini) |
| Timer | `#dr-timer` | Countdown mm:ss (center — sliced fruit motif in CSS) |
| Score | `#dr-score` | **0** |
| Level | `#dr-level` | Level **1** / 8 |

## How to Play

| # | Copy |
|---|------|
| 1 | Move **Drago** with **arrow keys** or the on-screen D-pad — one square at a time. |
| 2 | Walk into a **green block** to push it if the space behind it is empty. |
| 3 | **Knights** chase you. Trap them with blocks so they cannot move, or crush them by pushing a block onto them. |
| 4 | Trapped knights turn into **dragon tiles** — walk over them to collect points. |
| 5 | Clear the level when every knight is gone and every tile is collected. |
| 6 | You have **3 lives**. Lose a life if a knight catches you or the timer runs out. |
| 7 | **Easy** gives slower knights and extra time; **Hard** is classic speed. |

## Overlays

| Screen | Title | Primary CTA |
|--------|-------|-------------|
| Level clear | Level clear! | **Next level** |
| Victory | You win! | **Play again** |
| Game over | Game over | **Try again** / **Menu** |

## Accessibility

- `#dr-sr-announce` — aria-live for level clear, life lost, pickup
- Canvas `aria-label="Drago's Revenge game board"`
