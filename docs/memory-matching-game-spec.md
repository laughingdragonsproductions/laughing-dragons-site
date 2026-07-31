# Memory Matching Game — spec and build plan

Mahjong-style pair matching for Laughing Dragons Kids. Players flip face-down tiles, find matching Fruit Friends pairs, clear the board to win.

**Unlock gate:** Beat Terminal Trainer Level 3 (`kids-unlocks.js` — already wired).  
**Live URL (WIP):** `/kids/games/memory-matching/`  
**Reference:** [`docs/terminal-trainer-integration.md`](terminal-trainer-integration.md)

---

## Game loop

<!-- TODO (Dave / S001): Document each state transition -->

1. **Deal** — shuffle N pairs; render grid face-down.
2. **First flip** — reveal tile A; lock other tiles briefly.
3. **Second flip** — reveal tile B.
4. **Match** — same pair id → leave face-up; increment match count.
5. **Mismatch** — flip both back after short delay (~800ms).
6. **Win** — all pairs matched → show win banner + optional replay.

---

## Tile set

<!-- TODO: Pick default character letters for v1 board sizes -->

- Art source: `assets/kids/characters/{letter}.png` (Fruit Friends A–Z)
- Each tile: `{ id, letter, name, imageSrc }` — two DOM nodes share the same `id` per pair
- Default v1 deck: **8 pairs** (16 tiles) — letters A–H
- Medium deck: **10 pairs** (20 tiles) — letters A–J

Face-down state: solid card back (site surface color + subtle dragon/neon border).  
Face-up state: character image + name label.

---

## Board sizes

| Mode | Grid | Pairs | Notes |
|------|------|-------|-------|
| Easy (default) | 4×4 | 8 | First playable build |
| Medium | 4×5 | 10 | Optional second level |

<!-- TODO: CSS grid layout — responsive min tile size 72px tap target -->

---

## Unlock and rewards

Already implemented in `assets/js/kids-unlocks.js`:

| Reward | Value |
|--------|-------|
| Unlock code | `FORGE-GATE-7` |
| Store coupon | `DragonForge15` (15% off) |

<!-- TODO: On win — reuse Terminal Trainer reward UI pattern or inline banner -->

Win does **not** need to re-grant unlock; player already unlocked to reach the page.

---

## File plan

| File | Role |
|------|------|
| `assets/js/memory-game.js` | `initMemoryGame()` — state, shuffle, flip logic, win detection |
| `assets/css/memory-game.css` | Grid, tile faces, flip animation, win overlay |
| `kids/games/memory-matching/index.html` | Gate check + game mount point |
| `assets/js/kids-unlocks.js` | Unlock gate (no changes expected) |

### Stub API (S001 deliverable)

```javascript
function initMemoryGame(container, options) {
  // options: { pairs: 8, letters: ['A','B',...] }
  // Returns { reset(), destroy() }
}
```

<!-- TODO: Implement stub that renders placeholder grid + "Game loading" until full build -->

---

## HTML shell (target)

<!-- TODO: Replace WIP prose page with game board -->

```html
<div id="memory-game-root" class="memory-game" aria-label="Memory matching game">
  <div class="memory-game-hud">
    <span class="memory-game-moves">Moves: <strong id="memory-moves">0</strong></span>
    <button type="button" class="btn btn-ghost memory-game-reset">New game</button>
  </div>
  <div class="memory-game-board" role="grid" id="memory-board"></div>
  <div class="memory-game-win" hidden><!-- win banner --></div>
</div>
```

---

## Accessibility and mobile

<!-- TODO: Fill in -->

- Minimum tap target 44×44px (aim 72px tiles on phone)
- `role="grid"` / `role="gridcell"` or button per tile with `aria-pressed`
- Keyboard: arrow keys move focus; Enter/Space flip focused tile
- `prefers-reduced-motion`: disable flip animation, instant reveal
- Screen reader: announce match / mismatch / win

---

## Win / replay flow

<!-- TODO -->

- Win overlay: "You matched them all!" + Play again + Back to Kids games
- No new coupon on memory win (coupon already shown at Terminal Trainer win)
- Optional: track best move count in `localStorage` key `ldp-memory-game-best-moves`

---

## Deploy checklist

- [ ] Stub or full game loads at `/kids/games/memory-matching/` when unlocked
- [ ] Locked players redirect to `/kids/games/terminal/`
- [ ] Add `memory-game.js` / `memory-game.css` to cache-bust query on game page
- [ ] Push to `main` → Cloudflare Pages
- [ ] Hard refresh verify on mobile + desktop

---

## Agent Town task S001

**Owner:** Dave (seat-3)  
**Deliverables:**

1. Complete all `<!-- TODO -->` sections in this file.
2. Create stub `assets/js/memory-game.js` with `initMemoryGame()` (placeholder grid OK).
3. Create stub `assets/css/memory-game.css` (board grid + tile back/front shells).
4. Update `kids/games/memory-matching/index.html` to mount `#memory-game-root` when unlocked.

Do **not** ship full polish in S001 — structure and opening scaffold only. Phase 2 (human/Cursor) implements playable flip/match logic.
