# AdSense — manual steps for Brandon



Games-first monetization is live in code. Complete these steps in **Google AdSense** (not in the repo):



## Compliance matrix (Aug 2026)


| Requirement | Status | Notes |
|-------------|--------|-------|
| ads.txt | **Ready** | Root `ads.txt` → `pub-7048606415692002` |
| Privacy policy | **Ready** | `/privacy/` — AdSense, cookies, opt-out, Google policy links |
| Contact page | **Ready** | `/contact/` — Web3Forms form |
| About page | **Ready** | `/about/` — real studio content |
| Terms | **Ready** | `/terms/` |
| Footer legal links | **Ready** | Privacy, Terms, About, Contact |
| Original content | **Ready** | 7 live games with guides, 9 tools, blog, kids characters |
| Kids section ad-free | **Ready** | No script on `/kids/**` |
| Publisher script on site | **Ready** | Homepage `<head>` + `site.js` on non-kids pages |
| Ad units configured | **You** | Paste slot IDs in `config.js` after creating units |
| Auto ads disabled | **You** | AdSense dashboard — prior policy flag from auto ads on thin pages |
| EU consent (CMP) | **You** | AdSense → Privacy & messaging → European regulations |
| Search Console | **Recommended** | Verify domain, submit sitemap |
| Request review | **You** | After checklist above |



## 0. Before you create ad units



1. AdSense → **Ads** → **Auto ads** → **Disable** (or turn off all formats) until manual slot IDs are configured. Auto ads on thin pages caused the prior policy flag.

2. After deploy, view page source on `/kids/` — confirm **no** `adsbygoogle.js` script tag.

3. View page source on `/` and `/games/terminal/` — confirm `adsbygoogle.js` is present (verification script).

4. View `/games/terminal/` — confirm the written guide (commands, levels, tips) appears **above** the game.



## 1. Create ad units (Games section only)



AdSense → **Ads** → **By ad unit** → **Display ads**



| Unit name | Site |

|-----------|------|

| LD Games Header | laughing-dragons.com |

| LD Games Footer | laughing-dragons.com |



Copy each **data-ad-slot** value into `assets/js/config.js`:



```javascript

adsense: {

  publisherId: "ca-pub-7048606415692002",

  slots: {

    header: "YOUR_SLOT_ID",

    footer: "YOUR_SLOT_ID",

    inContent: "",

  },

},

```



Push to GitHub after updating. The site loads the AdSense **publisher script** on all pages except `/kids/**` and WIP paths. **Ad units** render only on `/games/` live pages once slot IDs are filled.



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



- **No ads** on `/kids/**` (Kids Show — child-directed)

- **No ads** on under-development or coming-soon pages

- **Ads only** on `/games/` with substantive landing content



Publisher: `ca-pub-7048606415692002`

