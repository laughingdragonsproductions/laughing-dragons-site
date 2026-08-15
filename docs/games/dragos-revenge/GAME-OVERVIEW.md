# Drago's Revenge — Game overview

**Slug:** `dragos-revenge`  
**Brand:** Laughing Dragons / Fruit Friends (Drago the Dragon Fruit)  
**Inspiration:** Rodent's Revenge (Windows 3.x)  
**Unlock:** Always playable — standalone like Flappy Dragon and Dragon-Ball V  

## Pitch

Push green dragon-fruit slidables across an olive board, trap knights (hunters), and collect laughing-dragon tiles. You play as **Drago the Dragon Fruit** — not the generic dragon tiles. Classic grid puzzle, Fruit Friends art.

## Audience

Retro puzzle fans, Kids Show parents, anyone who remembers pushing blocks to trap cats.

## Hunter AI (canonical)

Full cat/knight behavior spec: [CAT-AI.md](CAT-AI.md) — real-time 8-way BFS pursuit, cluster trapping, batch cheese conversion.

## Core loop

1. Move Drago one cell at a time (arrows / D-pad).
2. Push green slidables; blocks can push an active knight if the tile behind it is empty.
3. Knights move on their **own timer** (independent of player steps), including **diagonal** pursuit via BFS.
4. Trap **all** knights (8-way, cluster-aware) — they convert to dragon tiles **together**.
5. Walk over collectables to score; clear the level when every tile is collected.
6. Eight levels; 3 lives; countdown timer; score persists best run.

## Modes

| Mode | Hunters | Timer |
|------|---------|-------|
| Easy | ~0.75s per tile, +30s timer | Forgiving |
| Hard | ~0.32s per tile, standard timer | Classic |

## Art

- Player: `Drago the Dragon Fruit-jukebox-bg-removed.png`
- Board: pink leaf walls, green slidables, olive floor — from `Game sprites/Drago's Revenge/`
- Pickups: memory-matching dragon tiles (8 colors)
- Hunters: canvas knights v1

## Out of scope v1

Holes/pits, procedural mazes, unlock chain, hunter sprite sheet, MIDI.
