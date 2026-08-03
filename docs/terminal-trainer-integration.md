# Terminal Trainer — Laughing-dragons.com integration plan

This document covers what was built in `laughing-dragons-site`, how the win/reward flow works, and the checklist to ship it on **https://laughing-dragons.com**.

---

## What players get when they win

After `ECHO LAUGHING-DRAGONS` (Level 3 complete):

1. **Win banner** on the in-game monitor — `***** YOU WIN *****`
2. **Game unlock** — Memory Matching Game unlocked on `/kids/#games`
   - Display code: **`FORGE-GATE-7`**
   - Unlock is saved automatically in the browser (`localStorage`)
3. **Store coupon** — **`DragonForge15`** — 15% off anything in-store
   - Link goes to shop (Shopify → Etsy → `/shop/` fallback)

---

## Files added or changed

| File | Role |
|------|------|
| `assets/js/kids-unlocks.js` | Shared unlock API + reward constants |
| `assets/js/terminal-game.js` | Win banner trigger, reward grant on Level 3 |
| `assets/css/terminal-game.css` | Win banner overlay styles |
| `kids/games/terminal/index.html` | Win banner markup + script includes |
| `assets/js/kids.js` | Locked / unlocked game cards on Kids hub |
| `kids/index.html` | Loads `kids-unlocks.js` |
| `kids/games/memory-matching/index.html` | Gated “unlocked” landing (game WIP) |
| `assets/css/site.css` | Locked / unlocked card styles |
| `sitemap.xml` | `/kids/games/memory-matching/` |

---

## localStorage keys

| Key | Set when |
|-----|----------|
| `ldp-terminal-trainer-v2` | Terminal progress (levels, commands, etc.) |
| `ldp-kids-unlock-terminal-trainer-complete` | Level 3 beaten |
| `ldp-kids-unlock-memory-matching-unlocked` | Same moment — unlocks Memory Matching card |

Existing players who already beat Level 3 get unlocks re-granted on next visit (sync in `terminal-game.js`).

---

## Reward configuration

Edit **`assets/js/kids-unlocks.js`** → `KIDS_REWARDS.terminalTrainer`:

```javascript
gameUnlockCode: "FORGE-GATE-7",
couponCode: "DragonForge15",
couponLabel: "15% off anything in-store",
```

Shop URL resolves from `assets/js/config.js` → `links.shopify` or `links.etsy`.

---

## Deploy checklist (laughing-dragons.com)

### 1. Code deploy

- [ ] Commit and push this repo to the site host (GitHub Pages, Cloudflare, etc. — see `DEPLOY.md`)
- [ ] Confirm live URLs:
  - `/kids/games/terminal/`
  - `/kids/games/memory-matching/`
  - `/kids/#games`

### 2. Shopify — create discount **DragonForge15**

In **Shopify Admin → Discounts → Create discount**:

| Field | Value |
|-------|--------|
| Method | Discount code |
| Code | `DragonForge15` |
| Type | Percentage |
| Value | 15% |
| Applies to | All products (or “in-store pickup” collection if you prefer) |
| Usage | One per customer (recommended) or unlimited — your call |
| Active dates | Set start; no end date until promo ends |

**Note:** The site only *displays* the code. Shopify must have the matching discount or checkout will reject it.

Optional: add the same code on **Etsy** if you want parity for Etsy shoppers.

### 3. Physical / in-store use

- Train staff: code **`DragonForge15`** = 15% off in-store purchases
- Optional: print a small sign at the register referencing Terminal Trainer

### 4. Smoke test (production)

1. Open `/kids/games/terminal/` in a private window
2. Play through (or use saved progress) to `ECHO LAUGHING-DRAGONS`
3. Confirm win banner shows both codes + copy buttons
4. Visit `/kids/#games` — Memory Matching shows **Unlocked**
5. Open `/kids/games/memory-matching/` — unlocked landing (not redirect to terminal)
6. Click **Visit the shop** — correct Shopify/Etsy URL

### 5. Memory Matching (live)

Playable at `/kids/games/memory-matching/` when unlocked:

1. `assets/js/memory-game.js` + `assets/css/memory-game.css`
2. `kids.js` → `status: "live"` with `requiresUnlock: "memory-matching-unlocked"`
3. Art under `assets/kids/games/memory-matching/` (sync: `scripts/copy-matching-assets.ps1`)

### 6. Optional enhancements

- [ ] Add `DragonForge15` to `/shop/` page copy (“Beat Terminal Trainer for 15% off”)
- [ ] Blog post announcing Terminal Trainer + reward
- [ ] YouTube Kids Show episode CTA linking to the game
- [ ] Analytics event on win banner (if you add tracking later)

---

## Architecture diagram

```
Terminal Trainer (Level 3 win)
        │
        ├─► localStorage: ldp-kids-unlock-*
        │
        ├─► Win banner (FORGE-GATE-7 + DragonForge15)
        │
        └─► Kids hub (/kids/#games)
                 │
                 ├─ Memory Matching: Unlocked → /kids/games/memory-matching/
                 └─ Other games: Coming soon

Shop (Shopify / Etsy)
        └─ Discount code DragonForge15 (created in admin, not in repo)
```

---

## Local development

```powershell
.\scripts\play-terminal.ps1
```

Opens `http://localhost:8080/kids/games/terminal/`.

To reset unlocks for testing (browser console):

```javascript
localStorage.removeItem('ldp-kids-unlock-terminal-trainer-complete');
localStorage.removeItem('ldp-kids-unlock-memory-matching-unlocked');
localStorage.removeItem('ldp-terminal-trainer-v2');
```

---

## Related docs

- [`docs/terminal-trainer-walkthrough.md`](terminal-trainer-walkthrough.md) — full game map
- [`UPDATE.md`](../UPDATE.md) — day-to-day edit guide
