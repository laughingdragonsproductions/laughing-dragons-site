# AdSense — manual steps for Brandon

Code changes from the AdSense readiness batch are live after deploy. Complete these steps in **Google AdSense** (not in the repo):

## 1. Create ad units

AdSense → **Ads** → **By ad unit** → **Display ads**

| Unit name | Site |
|-----------|------|
| LD Header | laughing-dragons.com |
| LD Footer | laughing-dragons.com |

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

Push to GitHub after updating. Until slots are filled, the site shows no ad placeholders (correct for review).

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

AdSense → **Sites** → select domain → **Request review**

**Note:** No ads run on `/kids/**` pages by design (Families policy).

Publisher: `ca-pub-7048606415692002`
