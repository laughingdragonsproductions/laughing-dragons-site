# AdSense go-live checklist

Step-by-step guide for everything still needed before ads show on **laughing-dragons.com** (Games + Tools) and **laughingdragonsproductions.com** (Shopify). Publisher ID: `ca-pub-7048606415692002`.

---

## Where to find settings in the AdSense dashboard

Sign in at **https://ads.google.com** with the Google account that owns `pub-7048606415692002` (Laughing Dragons / laughingdragonsproductions — not a personal account unless that is where AdSense lives).

Use the **left sidebar**. If the sidebar is collapsed, click the **☰ menu** (top left).

| What you need | Sidebar label | Direct URL (after login) |
|---------------|---------------|---------------------------|
| Add site, ads.txt status, request review | **Sites** | https://ads.google.com/aw/adsense/sites |
| Turn off Auto ads, edit per-site ad settings | **Ads** | https://ads.google.com/aw/adsense/ads |
| Create display / multiplex units | **Ads** → **By ad unit** tab | https://ads.google.com/aw/adsense/ads |
| EU consent (CMP) | **Privacy & messaging** | https://ads.google.com/aw/adsense/privacymessaging |
| Payment / account status | **Account** | https://ads.google.com/aw/adsense/settings |

### Can't find a menu item?

1. **Wrong Google account** — top-right avatar → switch account → use the one that shows publisher ID `pub-7048606415692002` under **Account** → **Settings** → **Account information**.
2. **Account still in setup** — new accounts may show a setup wizard instead of the full sidebar until you complete address, phone, and site steps.
3. **"Ads" vs "Auto ads"** — Google merged these. Open **Ads**, find your site in the table, click **Edit** (pencil) to reach Auto ads on/off.
4. **"By ad unit"** — inside **Ads**, look for tabs at the top: **By site** / **By ad unit**. Click **By ad unit** → **Display ads** or **Multiplex ads** → **New ad unit**.
5. **Privacy & messaging missing** — only appears for approved or active AdSense accounts; if the account is still "Getting ready", finish site verification first under **Sites**.

---

## What is already wired in code

| Item | Status |
|------|--------|
| Root `ads.txt` | Done |
| Privacy / Terms / About / Contact | Done |
| Kids Show (`/kids/`) ad-free | Done |
| Publisher script on Games + Tools pages | Done |
| Multiplex slot `7102817128` in `config.js` | Done |
| Ad mounts on `/games/` and `/tools/` | Done |
| Header + footer display slots | **Empty** - need slot IDs from AdSense |
| Cloudflare live deploy | **You** - push latest repo to GitHub |
| AdSense account approval + review | **You** - dashboard steps below |

---

## Step 1 - Deploy the latest site code

Cloudflare Pages rebuilds when `main` is pushed to GitHub.

```powershell
cd G:\LocalAIagent\laughing-dragons-site
git status
git add -A
git commit -m "AdSense: multiplex, Tools ads, slot config."
git push origin main
```

**If push fails (GitHub auth):**

```powershell
gh auth logout -h github.com -u Chittinandchattin
gh auth login
```

Sign in as **laughingdragonsproductions**, then push again.

**Confirm deploy:** Cloudflare dashboard → Pages → latest deployment = Success (usually 1-2 minutes).

---

## Step 2 - Verify live infrastructure

Open these URLs in a browser (or view page source):

| Check | URL | Expect |
|-------|-----|--------|
| ads.txt | https://laughing-dragons.com/ads.txt | Line contains `pub-7048606415692002` |
| Script on game page | https://laughing-dragons.com/games/terminal/ | `adsbygoogle.js` in source |
| Script on tool page | https://laughing-dragons.com/tools/word-counter.html | `adsbygoogle.js` in source |
| Kids Show blocked | https://laughing-dragons.com/kids/ | **No** `adsbygoogle.js` in source |
| Multiplex unit | `/games/terminal/` or `/tools/` page source | `<ins class="adsbygoogle"` with `data-ad-slot="7102817128"` |

Ads may still show blank until Steps 3-6 are complete and Google has approved the site.

---

## Step 3 - AdSense dashboard: site + ads.txt

1. Go to [Google AdSense](https://ads.google.com/) → **Sites**.
2. **+ New site** (if not already added) → `laughing-dragons.com`.
3. Confirm status shows **ads.txt** found for `pub-7048606415692002`.
4. If you monetize Shopify separately, add `laughingdragonsproductions.com` as a second site (same publisher ID).

---

## Step 4 - Disable Auto ads (important)

A prior policy flag came from Auto ads on thin pages. Keep manual units only.

1. AdSense → **Ads** → **Auto ads**.
2. Select `laughing-dragons.com`.
3. **Turn off** all Auto ad formats (or disable Auto ads entirely).

Do not re-enable until you intentionally want page-level auto placement again.

---

## Step 5 - Create and link ad units

### 5a. Multiplex (already linked)

| Unit | Slot ID | Config key | Where it shows |
|------|---------|------------|----------------|
| LD Multiplex | `7102817128` | `inContent` | Between guide and game on `/games/`; after content on `/tools/` |

Already in [`assets/js/config.js`](assets/js/config.js). No action unless you recreate the unit and get a new slot ID.

### 5b. Display header + footer (still needed)

1. AdSense → **Ads** → **By ad unit** → **Display ads**.
2. Create two units for `laughing-dragons.com`:

| Unit name | Suggested placement |
|-----------|---------------------|
| LD Games Header | Top of Games/Tools pages |
| LD Games Footer | Bottom of Games/Tools pages |

3. Copy each **data-ad-slot** value.
4. Paste into [`assets/js/config.js`](assets/js/config.js):

```javascript
adsense: {
  publisherId: "ca-pub-7048606415692002",
  slots: {
    header: "PASTE_HEADER_SLOT_HERE",
    footer: "PASTE_FOOTER_SLOT_HERE",
    inContent: "7102817128",
  },
},
```

5. Commit and push again (Step 1).

Until header/footer IDs are pasted, only the multiplex unit renders with a real slot. Header/footer may show generic auto-format placeholders or stay empty.

---

## Step 6 - EU consent (CMP)

Required for visitors in the EEA, UK, and Switzerland.

1. AdSense → **Privacy & messaging** → **European regulations**.
2. Create a consent message for `laughing-dragons.com`.
3. Link privacy URL: `https://laughing-dragons.com/privacy/`
4. **Publish** the message.
5. Repeat for `laughingdragonsproductions.com` if that domain is a separate AdSense site.

---

## Step 7 - Search Console (recommended)

1. [Google Search Console](https://search.google.com/search-console) → add property `laughing-dragons.com`.
2. Verify ownership (DNS or HTML tag).
3. Submit sitemap: `https://laughing-dragons.com/sitemap.xml`

Helps indexing and can speed up AdSense site review.

---

## Step 8 - Request AdSense review

Only after Steps 1-6 are done:

1. AdSense → **Sites** → select `laughing-dragons.com`.
2. Fix any listed policy issues.
3. Check **"I confirm I have fixed the issues"**.
4. Click **Request review**.

Review can take several days. Ads often stay blank until status is **Ready** or **Approved**.

---

## Step 9 - Shopify store (laughingdragonsproductions.com)

Separate from the Cloudflare hub. Snippets live in:

`G:\LocalAIagent\desktop-agent\shopify-theme-ldp\snippets\`

| File | Purpose |
|------|---------|
| `ldp-adsense-multiplex.liquid` | Multiplex unit (`7102817128`) |
| `ldp-adsense-display.liquid` | Display unit - pass `slot_id` |

**In Shopify theme editor:**

1. Upload both snippets to **snippets/** (or deploy the theme overlay per `shopify-theme-ldp/README.md`).
2. Edit templates (e.g. collection, product, or a custom section) and add:

```liquid
{% render 'ldp-adsense-multiplex' %}
{% render 'ldp-adsense-display', slot_id: 'YOUR_HEADER_SLOT' %}
```

3. Replace `YOUR_HEADER_SLOT` with the display slot ID from Step 5b (can use the same header unit or create Shopify-specific units in AdSense).
4. In AdSense, add `laughingdragonsproductions.com` as a site and confirm ads.txt if Shopify allows root-level ads.txt (may require redirect or Shopify's AdSense app - check AdSense site setup for Shopify).

---

## Step 10 - Final live verification

After deploy + AdSense approval, spot-check:

| Page | Header ad | Multiplex | Footer ad | No ads |
|------|-----------|-----------|-----------|--------|
| `/games/terminal/` | Yes | Yes | Yes | - |
| `/tools/word-counter.html` | Yes | Yes | Yes | - |
| `/kids/` | - | - | - | **Yes** |
| `/tools/coming-soon.html` | - | - | - | **Yes** |
| Homepage `/` | No units (script only for verification) | No | No | - |

**Troubleshooting**

| Symptom | Likely cause |
|---------|----------------|
| No ads anywhere | Site not approved yet, or code not deployed |
| Only multiplex shows | Header/footer slot IDs still empty in `config.js` |
| Ads on Kids Show | Bug - should never happen; check `/kids/` source |
| Blank ad boxes | Ad blockers, CMP not accepted, or inventory not filled yet |
| ads.txt not found | File missing from repo root or deploy failed |

---

## Quick reference

| Property | Domain | Deploy path |
|----------|--------|-------------|
| Hub (Games, Tools, Kids) | laughing-dragons.com | GitHub → Cloudflare Pages |
| Shopify store | laughingdragonsproductions.com | Shopify theme snippets |
| Publisher ID | `ca-pub-7048606415692002` | Same for both |
| Multiplex slot | `7102817128` | `config.js` + Shopify snippet |

See also: [ADSENSE-MANUAL.md](ADSENSE-MANUAL.md) (compliance matrix), [DEPLOY.md](DEPLOY.md) (Cloudflare setup).
