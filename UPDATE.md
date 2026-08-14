# How to Add Content and Push Updates

The site is **GitHub → Cloudflare Pages**. Every push to `main` triggers an automatic redeploy (usually 1–3 minutes). No build step.

**Repo:** `G:\LocalAIagent\laughing-dragons-site`  
**Remote:** `https://github.com/laughingdragonsproductions/laughing-dragons-site.git`  
**Live:** `https://laughing-dragons.com`

---

## Standard workflow (every change)

### 1. Preview locally

```powershell
cd G:\LocalAIagent\laughing-dragons-site
python -m http.server 8080
```

Or run `.\scripts\preview.ps1`

Open `http://localhost:8080/` — hard refresh (Ctrl+F5) if CSS/JS looks stale.

### 2. Commit and push

```powershell
cd G:\LocalAIagent\laughing-dragons-site
git add .
git status
git commit -m "Describe what you changed"
git push origin main
```

Or run `.\scripts\push-update.ps1 "Describe what you changed"`

Or push **both** Cloudflare sites (hub + Chittinn Chattin):

```powershell
.\scripts\push-all-sites.ps1 "Describe what you changed"
```

Options: `-HubOnly`, `-ChittinOnly`, `-Force` (skip size block), `-DryRun` (preview only).

`push-update.ps1` runs `check-site-size.ps1` first (warns at **800 MB / 80%** of the 1 GB budget, blocks at **950 MB / 95%** unless you pass `-Force`).

### 3. Confirm deploy

1. Cloudflare Dashboard → **Workers & Pages** → **laughing-dragons-site** → **Deployments**
2. Wait for **Success**
3. Visit `https://laughing-dragons.com` (Ctrl+F5)

---

## Where to edit — common additions

| What you want to add | File(s) to edit |
|---------------------|-----------------|
| **Kids Show episode on YouTube** | `assets/js/kids.js` — set `youtubeUrl` + `status: "published"` |
| **Episode finished, premiere pending** | `assets/js/kids.js` — set `status: "premiere-soon"` (shows **Premiering soon** tag) |
| **New Kids episode row** | `assets/js/kids.js` — add object to `episodes[]` |
| **3D printable STL for a character** | `assets/js/kids.js` — add `printUrl` when ready (see comments in file) |
| **Character images** | PNGs in `assets/kids/characters/` as `{letter}.png` (a.png–z.png) |
| **New free tool** | Copy a file in `tools/`, add to `assets/js/tools.js` `TOOLS`, add URL to `sitemap.xml` |
| **Blog post** | New HTML under `blog/posts/`, link from `blog/index.html`, add to `sitemap.xml` |
| **Shop / Etsy / Shopify URL** | `assets/js/config.js` → `links` |
| **Contact form / Web3Forms key** | `assets/js/config.js` → `web3formsAccessKey`; page copy in `contact/index.html`; thank-you page at `submissionsent/index.html`. Contact stays in footer Legal (not `NAV`) by design. |
| **New top-level page** | Create `section/index.html`, add to `assets/js/site.js` `NAV`, add to `sitemap.xml` |
| **New sellable 3D print (cooler)** | Add `.3mf` to source folder, run `python scripts/extract-cooler-images.py`, push |
| **Store goes live (Buy buttons)** | Change `buyHref` in `assets/js/prints.js` to Shopify URL |
| **Site size check before push** | `.\scripts\check-site-size.ps1` (warns at 80% of 1 GB) |
| **New brand images** | `assets/brand/` |
| **AdSense slot IDs** | `assets/js/config.js` → `adsense.slots` |
| **Home hero / pillar copy** | `index.html` |
| **Home pillar photos (Kids / Tools)** | `assets/kids/best-shot.png`, `assets/tools/tools-pillar.png`; pass `image` in `index.html` `renderPillar()` |
| **Kids game (coming soon)** | Add to `games[]` in `assets/js/kids.js`; link to `/kids/games/coming-soon/` until live |
| **Character detail pages** | Run `python scripts/generate-character-pages.py` after template changes |
| **Tool coming soon stub** | Add to `TOOLS_COMING_SOON` in `assets/js/tools.js` → links to `tools/coming-soon.html` |

---

## Kids Show — publish an episode

Edit `assets/js/kids.js`:

```javascript
{
  letter: "A",
  title: "Letter A — Adam the Apple",
  status: "published",
  youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  description: "Meet Adam — sweet, happy, and full of energy!",
}
```

Commit + push. `/kids/#episodes` shows a **Watch on YouTube** card automatically.

---

## Games pipeline (Agent Town)

- **Master doc:** [`docs/games-pipeline.md`](docs/games-pipeline.md) — unlock chain, Carol/Dave deliverables  
- **Status board:** [`docs/games/STATUS.md`](docs/games/STATUS.md) — agents update on handoff  
- **Per-game specs:** `docs/games/{slug}/` — Carol design; Dave codes `games/{slug}/`  
- **Unlock codes:** `assets/js/kids-unlocks.js` — Terminal `LOGIN` redeems codes  
- **OpenClaw queue:** `G:\openclaw\business\TASK-QUEUE.md` — S003–S009  
- **Live:** `/games/terminal/`, `/games/memory-matching/`, `/games/fruit-search/` · **Pre-pipeline (always playable):** The Sliding Scale, Flappy Dragon, Dragon V-ball, Drago's Revenge at `/games/`

---

## Kids — games and characters

- **Games:** edit `games[]` in `assets/js/kids.js`. Until a game is built, set `href: "/kids/games/coming-soon/"`. Live games use `status: "live"` and a real path (e.g. `/kids/games/terminal/`).
- **Terminal Trainer (local test):** `.\scripts\play-terminal.ps1` or double-click `scripts\play-terminal.bat` → opens `http://localhost:8080/kids/games/terminal/`. Game code: `assets/js/terminal-game.js`, `assets/css/terminal-game.css`, page at `kids/games/terminal/index.html`.
- **Terminal Trainer media sync:** `.\scripts\copy-terminal-assets.ps1` copies intro video from `G:\Laughing Dragons\Laughing-Dragons.com\Newterminalvideo.mp4` into `assets/kids/games/terminal/newterminalvideo.mp4` (and removes legacy `sitting-at-pc.mp4` if present). Desk frame lives at `assets/kids/games/terminal/desk-monitor-frame.png`.
- **Terminal Trainer game tree map:** [`docs/terminal-trainer-game-tree.png`](docs/terminal-trainer-game-tree.png) — visual step-by-step path (steps 1–19).
- **Terminal Trainer walkthrough & content map:** [`docs/terminal-trainer-walkthrough.md`](docs/terminal-trainer-walkthrough.md) — site pages, repo files, A:\ tree, full command walkthrough, where to add levels.
- **Monitor overlay tuning:** edit CSS variables `--monitor-top`, `--monitor-left`, `--monitor-width`, `--monitor-height` in `assets/css/terminal-game.css` if the terminal drifts off the PC screen in the desk image.
- **Terminal Trainer win rewards:** codes and unlock logic live in `assets/js/kids-unlocks.js`. Win banner in `kids/games/terminal/index.html` + `terminal-game.js`. Full deploy checklist: [`docs/terminal-trainer-integration.md`](docs/terminal-trainer-integration.md) (create **DragonForge15** in Shopify admin before go-live).
- **Kids game unlocks:** `assets/js/kids-unlocks.js` must load on `/kids/` and any gated game page. Hub locked/unlocked cards rendered in `renderKidsGames()` in `kids.js`.
- **Memory Matching Game:** live at `/kids/games/memory-matching/` (unlock gate). Code: `assets/js/memory-game.js`, `assets/css/memory-game.css`. Art: `assets/kids/games/memory-matching/{maps,tiles}/`. Sync from work folder with `.\scripts\copy-matching-assets.ps1`.
- **Character sheets:** grid tiles link to `/kids/characters/{letter}/`. Regenerate pages with `python scripts/generate-character-pages.py` if the HTML template changes.
- **Pillar art sources:** Kids → `G:\Laughing Dragons\Kids Show\assets\Random Images\best shot.png`; Tools → `G:\Laughing Dragons\Images and videos\tools.png`

---

## Add a new tool

1. Duplicate `tools/word-counter.html` → `tools/my-tool.html`
2. Update title, description, canonical URL, and tool panel content/JS
3. Add entry to `TOOLS` in `assets/js/tools.js`
4. Add `<url>` to `sitemap.xml`
5. Commit + push → live at `https://laughing-dragons.com/tools/my-tool.html`

---

## Add a new cooler to the print catalog

1. Drop the `.3mf` in `G:\Laughing Dragons\3d Models\Ready To Sell Coolers`
2. Regenerate images + catalog:

```powershell
cd G:\LocalAIagent\laughing-dragons-site
python scripts/extract-cooler-images.py
```

3. Preview, then commit + push

If a new category needs its own hub tile later, add a folder under `assets/prints/` and extend `PRINTS_DATA.categories` in `prints.js`.

---

## Page template pattern

Every page uses:

- AdSense script in `<head>` (`ca-pub-7048606415692002`)
- `config.js` + `site.js` (and `kids.js` / `tools.js` when needed)
- `initPage({ title, description, activePath, content })` for hub header/footer

Copy an existing page in the same section rather than starting from scratch.

---

## What you do NOT need to do

- Re-configure Cloudflare Pages for normal updates
- Run `npm run build` (leave build command empty in CF)
- Manually upload files to Cloudflare

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Push rejected | `git pull origin main`, resolve conflicts, push again |
| Site not updating | Check CF Deployments; clear build command if set to `npm run build` |
| 404 on new page | Directory pages need `folder/index.html` |
| Old content in browser | Hard refresh (Ctrl+F5) |

See also [DEPLOY.md](DEPLOY.md) (initial setup) and [BACKLINK-NOTES.md](BACKLINK-NOTES.md) (cross-site links).
