# Laughing Dragons - Games pipeline (Agent Town)

**Repo:** `G:\LocalAIagent\laughing-dragons-site`  
**Hub:** `/games/` - registry in `assets/js/games.js`, unlock codes in `assets/js/kids-unlocks.js`  
**Hack console:** Terminal Trainer - kids type `LOGIN <code>` to unlock the next game.

## Agent roles

| Agent | Seat | Owns |
|-------|------|------|
| **Alice** | seat-0 | Queue order, handoffs, STATUS.md updates, unblock Dave/Carol |
| **Carol** | seat-2 | Full game design per slug: overview, levels, HUD, win/unlock, BUILD-PLAN |
| **Dave** | seat-3 | Site folders, HTML/JS/CSS scaffolds, gates, `markCleared` hooks |

**Communication:** Every agent updates [`docs/games/STATUS.md`](games/STATUS.md) when starting or finishing work. Carol writes specs before Dave codes. Dave does not invent design - he implements Carol's spec.

## Pre-pipeline (always playable)

Standalone arcade titles - **outside** the Terminal unlock chain. Listed first in `assets/js/games.js` (`status: "live"`, no `requiresUnlock`, no reward code). Also add to `sitemap.xml` and `desktop-agent/scripts/facebook-post-pipeline.config.json` blurbs when shipping.

| Game id | Site path | Status | Notes |
|---------|-----------|--------|-------|
| sliding-scale | `/games/sliding-scale/` | **live** | Workroom slider puzzle; workshop/logo art |
| flappy-dragon | `/games/flappy-dragon/` | **live** | Tap-to-fly; dragon skin unlocks |
| dragon-vball | `/games/dragon-vball/` | **live** | Forest Pong vs AI; first to 3 |
| dragos-revenge | `/games/dragos-revenge/` | **live** | Rodent's Revenge clone; Drago + 8 levels (S010/S011) |
| hangman-lite | `/games/hangman-lite/` | **live** | Dragon hangman; stickman limp-on-lose; optional reward WHACK-GRID-10 |
| typing-race | `/games/typing-race/` | **live** | Letter heat loop; optional reward SORT-COLOR-6 |
| count-the-dragons | `/games/count-the-dragons/` | **live** | Fruit Search crowd scenes; optional reward SIMON-GLOW-8 |

Hub: listed in `GAMES_DATA.newGameIds` (New games section) + Facebook post blurbs.

## Unlock chain (canonical)

| Order | Game id | Reward code | Unlocks next | Site path |
|-------|---------|-------------|--------------|-----------|
| 1 | terminal | FORGE-GATE-7 | memory-matching | `/games/terminal/` **live** |
| 2 | memory-matching | FIND-WALDO-3 | fruit-search | `/games/memory-matching/` **live** |
| 3 | fruit-search | TRACE-A-Z-4 | alphabet-trace | `/games/fruit-search/` **in progress** |
| 4 | alphabet-trace | TYPE-FAST-5 | color-match (via typing clear) | `/games/alphabet-trace/` |
| 5 | color-match | COUNT-DRAG-7 | simon-says (via count clear) | `/games/color-match/` |
| 6 | simon-says | HANG-FRUIT-9 | whack-a-fruit (via hangman clear) | `/games/simon-says/` |
| 7 | whack-a-fruit | PATTERN-AB-11 | pattern-builder | `/games/whack-a-fruit/` |
| 8 | pattern-builder | MAZE-PATH-12 | maze-generator | `/games/pattern-builder/` |
| 9 | maze-generator | COLOR-SVG-13 | coloring-viewer | `/games/maze-generator/` |
| 10 | coloring-viewer | - | - | `/games/coloring-viewer/` |

**Always open (pre-pipeline):** hangman-lite, typing-race, count-the-dragons still grant reward codes on clear (WHACK-GRID-10, SORT-COLOR-6, SIMON-GLOW-8) for Terminal LOGIN - they do not require an unlock to play.

Registry source of truth: `assets/js/kids-unlocks.js` (`UNLOCK_CODES`, `REWARD_CODES_BY_GAME`).

## Per-game deliverables

### Carol (design) - `docs/games/{slug}/`

- `GAME-OVERVIEW.md` - pitch, audience, core loop, modes, difficulty
- `LEVELS.md` - level/round structure, win condition, par if any
- `HUD.md` - screens, buttons, feedback copy
- `BUILD-PLAN.md` - files Dave will create, data shapes, v1 scope / out of scope
- `UNLOCK.md` - requiresUnlock id, rewardCode, clear condition, Terminal LOGIN hint

Use [`docs/games/_TEMPLATE/`](games/_TEMPLATE/) as starting point.

### Dave (code) - site repo

- `games/{slug}/index.html` - gate check, landing via `initGameChrome`, play mount
- `assets/js/{slug}.js` - `init{Game}()` stub or playable v1
- `assets/css/{slug}.css` - layout
- On clear: call `KIDS_UNLOCKS.markCleared(slug)` + grant next unlock if applicable
- **Do not** set `status: "live"` in `games.js` until Brandon/Cursor reviews

### External art (Fruit Search)

Work folder: `G:\Laughing Dragons\Laughing-Dragons.com\Laughing dragons matching game\`  
Sync maps/sprites into `assets/kids/games/fruit-search/` when ready (`scripts/copy-fruit-search-assets.ps1` TBD).

## Build order (2026-08-10)

1. **Fruit Search** - Carol S004 spec → Dave S005 scaffold (priority)
2. **Alphabet Trace, Typing Race, Color Match** - Carol S006
3. **Count the Dragons, Simon Says, Hangman Lite** - Carol S007
4. **Whack-a-Fruit, Pattern Builder, Maze, Coloring** - Carol S008
5. Dave S009 - scaffolds each slug after Carol marks spec `ready` in STATUS.md

## Live game patterns (copy Dave)

- Terminal: `games/terminal/`, `assets/js/terminal-game.js`
- Memory: `games/memory-matching/`, gate in HTML head, `initGameChrome`, par unlock

## Task queue

OpenClaw: `G:\openclaw\business\TASK-QUEUE.md` - section **Site / Games pipeline (S003+)**.
