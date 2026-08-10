# Maze Generator — HUD & UI copy

## Screen flow

```
Landing → Pick preset → Draw path → Finish → (×3) → Win overlay
         ↘ Free Explore / Print only
```

## Landing

Standard `initGameChrome`. Eyebrow: **In production**.

| CTA | Action |
|-----|--------|
| **Start Solve Run** | Track 3 finishes |
| **Free Explore** | Endless mazes |
| **Print a maze** | Generate Medium + print dialog |

Size pills: Small · Medium · Large (applies to next generated maze).

## Play HUD (top)

| Element | ID | Content |
|---------|-----|---------|
| Progress | `#mg-progress` | Mazes: **1** / **3** |
| Size | `#mg-size` | Medium (12×12) |
| Quit | `#mg-quit` | *Menu* |

## Maze canvas (center)

| Element | ID | Behavior |
|---------|-----|----------|
| Canvas | `#mg-canvas` | Wall grid + drawn path |
| Start | green cell + label **Start** | Top-left |
| Finish | gold cell + label **Finish** | Bottom-right |

Draw with pointer down → move → up. Touch supported.

## Toolbar (below canvas)

| Button | ID | Action |
|--------|-----|--------|
| Clear path | `#mg-clear` | Wipe line |
| New maze | `#mg-new` | Regenerate |
| Print | `#mg-print` | `window.print()` on print stylesheet |

## Feedback copy

| Event | Message |
|-------|---------|
| Invalid wall bump | *"That's a wall — try another way!"* |
| Finish reached | *"You found the path!"* |
| Maze 1 of 3 done | *"2 more mazes to go!"* |
| Run complete | Win overlay |

## Win overlay

| Element | Copy |
|---------|------|
| Headline | **Pathfinder pro!** |
| Body | You solved 3 dragon mazes from Start to Finish. |
| Flair | If par met: *Pathfinder pro!* |
| Reward code | **COLOR-SVG-13** |
| Terminal hint | Type `LOGIN COLOR-SVG-13` in Terminal Trainer |
| Primary | **Back to Games** → `/games/` |
| Secondary | **New run** |

On show: `KIDS_UNLOCKS.markCleared("maze-generator")`.

## Print stylesheet

`@media print` hides HUD chrome; maze fills page. Header: *Laughing Dragons — Maze Generator*.

## Mobile / a11y

- Canvas scales to container width; maintain min cell 24 px
- `touch-action: none` on canvas while drawing
- Keyboard optional v1.1: arrow keys move cursor cell
- `aria-label` on canvas: *Maze grid, draw path from Start to Finish*

## Colors

Walls dark gray; path dragon green; Start green; Finish gold.
