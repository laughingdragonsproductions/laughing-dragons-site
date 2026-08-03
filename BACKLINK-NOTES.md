# Post-launch back-link updates

After `https://laughing-dragons.com` is live, point these properties back to the master hub.

## DRI app privacy URL

**File:** `G:\LocalAIagent\desktop-agent\gui\copy_text.py` (and dri-ai mobile `src/constants/copy.ts`)

```python
# Before
PRIVACY_POLICY_URL = "https://sparkster1010.github.io/LDPPP/privacy.html"

# After
PRIVACY_POLICY_URL = "https://laughing-dragons.com/privacy/"
```

## Shopify theme footer

**File:** `G:\LocalAIagent\desktop-agent\shopify-theme-ldp\` — footer section or `ldp-footer` snippet

Add a link: **Laughing Dragons Home** → `https://laughing-dragons.com`

Also update theme settings copy so the storefront header/footer brand links to the hub, not only internal Shopify pages.

## QuickUtil / tool-site

Tools now live as subpages on the hub at `https://laughing-dragons.com/tools/` (unit converter, word counter, JSON formatter, etc.). The standalone `tool-site` repo is optional legacy — point any remaining QuickUtil links to `/tools/` on the hub instead.

## TextFixer / ditto.site output

**File:** `G:\LocalAIagent\shelf\ditto.site\output\TPS\BRANDING.md` and footer templates

Point "Powered by Laughing Dragons Productions" link to `https://laughing-dragons.com`.

## Infrastructure map & commerce docs

**Files:**

- `G:\LocalAIagent\desktop-agent\briefing\data\infrastructure-map.json`
- `G:\openclaw\business\commerce\stores.json`
- `G:\openclaw\business\commerce\STORES.md`

Register:

| Label | URL |
|-------|-----|
| Master site | `https://laughing-dragons.com` |
| Privacy | `https://laughing-dragons.com/privacy/` |

Jarvis HUD store links can include the hub under a "Brand" or "Home" entry.

## Social profiles

- YouTube: `https://www.youtube.com/@laughingdragons3800` → `assets/js/config.js` → `links.youtube`
- TikTok: `https://www.tiktok.com/@laughingdragonsprints` → `assets/js/config.js` → `links.tiktok`
- `/media/` page link cards use these URLs

## Optional: shop subdomain

`shop.laughing-dragons.com` CNAME → Shopify if you want a short alias in addition to `laughingdragonsproductions.com`.
