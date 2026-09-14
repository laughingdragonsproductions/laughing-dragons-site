# AdSense - manual steps for Brandon

**Go-live checklist:** see [ADSENSE-GO-LIVE.md](ADSENSE-GO-LIVE.md) for the full step-by-step (deploy, slot IDs, CMP, Shopify, review).

Games-first monetization is live in code. Complete these steps in **Google AdSense** (not in the repo):

## Compliance matrix (Aug 2026)

| Requirement | Status | Notes |
|-------------|--------|-------|
| ads.txt | **Ready** | Root `ads.txt` → `pub-7048606415692002` (live at laughing-dragons.com) |
| Privacy policy | **Ready** | `/privacy/` - AdSense, cookies, opt-out, Games vs Kids Show boundary |
| Contact page | **Ready** | `/contact/` - Web3Forms form |
| About page | **Ready** | `/about/` - real studio content |
| Terms | **Ready** | `/terms/` |
| Footer legal links | **Ready** | Privacy, Terms, About, Contact |
| Original content | **Ready** | 7 live games with guides, 9 tools, blog, kids characters |
| Games section monetized | **Ready** | All finished `/games/` pages eligible - original studio products |
| Tools section monetized | **Ready** | Live `/tools/` pages eligible; `coming-soon` stub excluded |
| Kids section ad-free | **Ready** | No script or units on `/kids/**` (child-directed Kids Show only) |
| Publisher script on site | **Ready** | Homepage `<head>` + `site.js` on non-kids, non-WIP pages |
| Ad units configured | **Ready** | Multiplex `7102817128` in `config.js` → `inContent`; paste header/footer slot IDs when created |
| Auto ads disabled | **You** | AdSense dashboard - prior policy flag from auto ads on thin pages |
| EU consent (CMP) | **You** | AdSense → Privacy & messaging → European regulations |
| Search Console | **Recommended** | Verify domain, submit sitemap |
| Request review | **You** | After checklist above |

## Site policy (Games vs Kids Show)

Laughing Dragons operates two separate sections on the same domain:

| Section | Path | Ads | Audience |
|---------|------|-----|----------|
| **Games** | `/games/` | Yes - manual units on finished game pages | General audience; original browser games with written guides |
| **Tools** | `/tools/` | Yes - manual units on live tool pages | General audience; free browser utilities |
| **Kids Show** | `/kids/` | No - script and units blocked | Child-directed Fruit Friends content |

Games are standalone studio products. They may share character art with the Kids Show, but they live under `/games/`, include substantive landing copy, and are monetized. The Kids Show under `/kids/` is the only child-directed area and remains ad-free.

**WIP exclusion:** Pages with `coming-soon` in the URL (tools/shop stubs) do not load ad units.

## 0. Before you create ad units

1. AdSense → **Ads** → **Auto ads** → **Disable** (or turn off all formats) until manual slot IDs are configured. Auto ads on thin pages caused the prior policy flag.

2. After deploy, view page source on `/kids/` - confirm **no** `adsbygoogle.js` script tag.

3. View page source on `/`, `/games/terminal/`, and `/games/fruit-search/` - confirm `adsbygoogle.js` is present (verification script).

4. View `/games/terminal/` - confirm the written guide (commands, levels, tips) appears **above** the game.

5. View `/games/fruit-search/` - confirm landing guide + ad mount divs (`#game-ad-top`, `#game-ad-bottom`) are present.

## 1. Create ad units

AdSense → **Ads** → **By ad unit**

| Unit name | Format | Site | Config key |
|-----------|--------|------|------------|
| LD Multiplex | Multiplex ads | laughing-dragons.com | `inContent` → `7102817128` |
| LD Games Header | Display ads | laughing-dragons.com | `header` |
| LD Games Footer | Display ads | laughing-dragons.com | `footer` |

Copy each **data-ad-slot** into `assets/js/config.js`:

```javascript
adsense: {
  publisherId: "ca-pub-7048606415692002",
  slots: {
    header: "YOUR_HEADER_SLOT",
    footer: "YOUR_FOOTER_SLOT",
    inContent: "7102817128",
  },
},
```

**Placement on laughing-dragons.com**

| Section | Header | Multiplex (in-content) | Footer |
|---------|--------|------------------------|--------|
| `/games/` hub + live game pages | top | between guide and play area | bottom |
| `/tools/` hub + live tool pages | top | after tool content | bottom |
| `/kids/` | — | — | — |

**Shopify (laughingdragonsproductions.com)** — snippets in `desktop-agent/shopify-theme-ldp/snippets/`:

- `ldp-adsense-multiplex.liquid` — multiplex unit (slot `7102817128`)
- `ldp-adsense-display.liquid` — display unit; pass `slot_id` when header/footer units exist

Example in a collection template section:

```liquid
{% render 'ldp-adsense-multiplex' %}
{% render 'ldp-adsense-display', slot_id: 'YOUR_HEADER_SLOT' %}
```

Push to GitHub after updating. The site loads the AdSense **publisher script** on all pages except `/kids/**` and `coming-soon` WIP paths. **Ad units** render on all finished `/games/` and live `/tools/` pages once slot IDs are filled.

## 2. EU consent (CMP)

AdSense → **Privacy & messaging** → **European regulations**

- Create + publish a message for `laughing-dragons.com`
- Link to `https://laughing-dragons.com/privacy/`

## 3. Add site

AdSense → **Sites** → **+ New site** → `laughing-dragons.com`

Confirm **ads.txt** is detected (`pub-7048606415692002`).

## 4. Search Console (recommended)

- Verify `laughing-dragons.com`
- Submit `https://laughing-dragons.com/sitemap.xml`

## 5. Request review

AdSense → **Sites** → select domain → check **"I confirm I have fixed the issues"** → **Request review**

**Policy notes:**

- **Ads on all finished `/games/` pages** - original Laughing Dragons browser games with substantive landing content
- **Ads on live `/tools/` pages** - free browser utilities (excluding coming-soon stubs)
- **No ads** on `/kids/**` (Kids Show - child-directed)
- **No ads** on under-development or coming-soon stub pages
- **Auto ads stay disabled** - manual units only

Publisher: `ca-pub-7048606415692002`
