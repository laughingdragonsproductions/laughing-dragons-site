# Deploy Laughing Dragons Hub to Cloudflare Pages

Static site — no build step. Cloudflare serves files from the repo root.

## 1. Push this repo to GitHub

```powershell
cd G:\LocalAIagent\laughing-dragons-site
git add .
git commit -m "Initial Laughing Dragons master hub site"
git branch -M main
git remote add origin https://github.com/YOUR_USER/laughing-dragons-site.git
git push -u origin main
```

## 2. Create Cloudflare Pages project

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select the `laughing-dragons-site` repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. Deploy

Preview URL: `https://laughing-dragons-site.pages.dev` (name may vary).

## 3. Add custom domain — laughing-dragons.com

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `laughing-dragons.com` and `www.laughing-dragons.com`
3. If the domain is on Cloudflare, DNS is automatic. Otherwise add the CNAME Cloudflare shows.

Wait for SSL (usually a few minutes).

## 4. Shopify domain — laughingdragonsproductions.com

In Shopify Admin → **Settings** → **Domains**:

1. Connect `laughingdragonsproductions.com` as the primary storefront domain
2. Update `assets/js/config.js` → `links.shopify` to `https://laughingdragonsproductions.com`
3. Commit and push — Pages redeploys automatically

## 5. AdSense (already wired)

Publisher ID: `ca-pub-7048606415692002`

Every page includes the AdSense script in `<head>`. Root `ads.txt` is set for `pub-7048606415692002`.

After the domain is live:

1. AdSense → **Sites** → **Add site** → `laughing-dragons.com`
2. Verify `https://laughing-dragons.com/ads.txt`
3. Ensure Privacy, Terms, and About are linked (footer already does this)
4. Create ad units in AdSense and paste slot IDs into `assets/js/config.js` → `adsense.slots`
5. Wait for review (can take days)

## 6. Search Console

1. Add property at [Google Search Console](https://search.google.com/search-console)
2. Submit `https://laughing-dragons.com/sitemap.xml`

## 7. Post-launch back-links

See [BACKLINK-NOTES.md](BACKLINK-NOTES.md) for DRI privacy, Shopify footer, QuickUtil, and infrastructure-map updates.

## 8. Ongoing updates

After the site is live, use [UPDATE.md](UPDATE.md) for every content change (Kids episodes, tools, blog, images). Push to `main` — Cloudflare redeploys automatically.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Hero video not playing | Browsers require `muted` + `playsinline`; reduced-motion shows poster only |
| 404 on `/shop/` | Ensure `shop/index.html` exists; CF Pages serves directory indexes |
| ads.txt 404 | File must be at repo root |
| Ads not showing | Site may need AdSense approval first; add slot IDs in config.js |
