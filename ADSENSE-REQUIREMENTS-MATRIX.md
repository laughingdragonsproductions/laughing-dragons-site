# AdSense Requirements Matrix (Google-aligned)

**Publisher:** `ca-pub-7048606415692002` · **Portfolio:** Laughing Dragons Productions

This matrix is the **authoritative compliance checklist**. It mirrors Google's published requirements in order of enforcement. Our old technical-only checklists (ads.txt, slot IDs, legal pages) cover **site verification only** — they do **not** predict approval.

**Official sources (pull these when Google updates policy):**

| ID | Document | URL |
|----|----------|-----|
| **G-UX** | Google AdSense content and user experience | https://support.google.com/adsense/answer/10015918 |
| **G-PUB** | Spam policies for Google web search (Publisher Policies) | https://support.google.com/publisherpolicies/answer/11035931 |
| **G-SPAM** | Spam policies for Google web search (full) | https://developers.google.com/search/docs/essentials/spam-policies |
| **G-THIN** | Manual actions: Thin content with little or no added value | https://support.google.com/webmasters/answer/9044175#thin-content |
| **G-POL** | Google Publisher Policies (content we won't monetize) | https://support.google.com/adsense/answer/10008391 |

---

## Current rejection (all three sites — Sep 2026)

**Dashboard status:** Verify site ownership ✅ · **Policy violation:** Low value content ❌

**Google's stated bar (verbatim from Sites review):**

> To qualify for ad serving, a site must provide **substantial unique value**, establish a **consistent presence on the web**, and show a level of **user interest** that supports a commercial advertising partnership.

**Before resubmitting, Google requires the site to:**

1. Provide **authentic, high-quality information, tools, or services**
2. Exhibit **ongoing curation and structural maintenance**
3. Generate and sustain **genuine user interest**

**Linked from the rejection UI:**

- [Google AdSense content and user experience](https://support.google.com/adsense/answer/10015918) (G-UX)
- [Google's spam policies for thin content](https://support.google.com/webmasters/answer/9044175#thin-content) (G-THIN)
- [Spam policies for Google web search](https://support.google.com/publisherpolicies/answer/11035931) (G-PUB)

### Why all three failed the same way (not “one approved, one didn’t”)

| Fact | Implication |
|------|-------------|
| **None** of the three domains are approved for ads yet | Ownership verified ≠ content approved |
| Same violation label on **laughing-dragons.com**, **theassociatedguess.com**, **them1947.com** | Google applied the **same quality bar**, not a domain lottery |
| Our code scanner showed **88–100% “ready”** | We measured **technical wiring**, not **substantial unique value** |
| Shared publisher account | One account; **each site is reviewed independently** for content quality |

**Likely reviewer signals across the portfolio:**

- **Scaled / templated content** (many similar satire articles, repeated “mysterious case of…” patterns, 1‑min reads)
- **Thin pages** in the index (stubs, placeholder titles, production notes, sparse product/archive copy)
- **Doorway-ish URLs** (many near-duplicate article shells created for volume, not depth)
- **Inconsistent “real publication” cues** (satire without enough editorial infrastructure visible to a cold reviewer)
- **Hub site** mixing games, tools, kids-adjacent art, and shop links — reads as a **link farm / portal** unless each section proves standalone value

---

## How to use this matrix

| Column | Meaning |
|--------|---------|
| **Google requirement** | Wording traced to G-UX, G-PUB, G-SPAM, or G-THIN |
| **How we verify** | Automated script, manual spot-check, or Search Console |
| **LD** | laughing-dragons.com |
| **TAG** | theassociatedguess.com |
| **1947** | them1947.com |
| **Status** | ✅ Pass · ⚠️ Partial · ❌ Fail · 👤 You (AdSense console) |

**Do not request review** until every ❌ in the **Content & UX** and **Spam / thin content** sections is ✅ or ⚠️ with a documented fix plan.

---

## Tier A — AdSense site verification (necessary, not sufficient)

These are what Google checks **before** the content deep-review. All three sites pass most of these — which is why ownership shows green but ads stay off.

| ID | Google requirement | How we verify | LD | TAG | 1947 |
|----|-------------------|---------------|----|----|------|
| A1 | Publisher ID in site code | `config.js` contains `ca-pub-7048606415692002` | ✅ | ✅ | ⚠️ slots empty |
| A2 | Root **ads.txt** authorizes seller | Live `/ads.txt` | ✅ | ✅ | ✅ |
| A3 | Site added in AdSense → **Sites** | Dashboard | 👤 | 👤 | 👤 |
| A4 | **Verify site ownership** | Dashboard green check | ✅ | ✅ | ✅ |
| A5 | Privacy policy with ad/cookie disclosures | Page + opt-out links | ✅ | ✅ | ✅ |
| A6 | About + Contact + Terms | Required static pages | ✅ | ✅ | ✅ |
| A7 | Auto ads **disabled** (manual units only) | AdSense → Ads | 👤 | ✅ | 👤 |
| A8 | EU **Privacy & messaging** (CMP) | AdSense console | ✅ | ✅ | ✅ |
| A9 | Ad units created; slot IDs in code | `config.js` slots filled | ⚠️ header/footer empty | ✅ all 3 | ❌ empty |
| A10 | No ads on legal / policy-only pages | View-source privacy, terms, search | ✅ | ✅ | ✅ |
| A11 | Search Console property + sitemap | GSC | 👤 | 👤 | 👤 |

---

## Tier B — Google AdSense content & user experience (G-UX / answer/10015918)

| ID | Google requirement (from G-UX) | How we verify | LD | TAG | 1947 |
|----|-------------------------------|---------------|----|----|------|
| **B1** | **Provide enough unique content** — pages have enough unique content that Google can determine what the site is about | Sample 10 URLs; word count; unique titles | ⚠️ games/tools OK; hub thin | ✅ 82/82 indexable, 300w+ | ⚠️ archive thin |
| **B2** | Content gives users a **reason to visit and return** | Editorial freshness, updates, RSS, changelog | ⚠️ games updated; blog sparse | ⚠️ pipeline + 1/day ON004 | ❌ static catalog |
| **B3** | **Substantial value and originality** vs other sites on similar subjects | Human read: not generic AI template voice | ⚠️ | ⚠️ satire voice OK; 6 “Case of…” titles remain | ⚠️ |
| **B4** | **Update site regularly** — continually add new unique content | Publish cadence + visible dates | ⚠️ | ⚠️ 1/day if approved | ❌ |
| **B5** | Content adheres to **Spam policies for Google web search** | Tier C below | ⚠️ | ✅ scaled/thin gates pass | ⚠️ |
| **B6** | **No duplicate content** — not copied/republished without original value | Dedup titles; no scraped body copy | ✅ | ✅ 0 body pairs ≥35% overlap | ⚠️ |
| **B7** | **No duplicate content on same page or across pages** | Site search; title collision report | ⚠️ | ✅ unique titles in catalog | ⚠️ |
| **B8** | If many similar pages, **expand each page or consolidate** | Merge or deepen sub-300w articles | ⚠️ WIP game pages | ✅ 0 thin articles | ⚠️ SKU stubs |
| **B9** | **Minimize repeating long text blocks** across pages | Footer/boilerplate length | ✅ | ⚠️ house ad blocks repeat | ✅ |
| **B10** | **Good user experience** — informative, organized, easy to navigate | UX audit | ✅ | ✅ layout | ⚠️ landing vs archive |
| **B11** | **Accessible navigation bar** — alignment, readability, functionality, accuracy | Mobile + desktop nav test | ✅ | ✅ | ⚠️ |
| **B12** | Organize by **topic/category**; avoid same content in multiple categories | IA review | ✅ | ✅ sections | ⚠️ |
| **B13** | Site delivers what it promises; **no misleading links** | Click every nav item | ✅ | ✅ | ✅ |
| **B14** | Site works in **multiple browsers** | Smoke test | 👤 | 👤 | 👤 |
| **B15** | Review **AdSense Program policies** before submit | Policy center | 👤 | 👤 | 👤 |

---

## Tier C — Publisher bridge + spam tips (G-PUB / answer/11035931)

| ID | Google requirement (from G-PUB) | How we verify | LD | TAG | 1947 |
|----|--------------------------------|---------------|----|----|------|
| **C1** | **Do not** place Google-served ads on screens that violate Spam policies for Google web search | Tier D audit on every ad-enabled URL | ⚠️ | ✅ index gate + Brandon GO | ⚠️ |
| **C2** | Avoid **unnecessary, repeated use of keywords** that don't add value | Read intro paragraphs | ⚠️ | ⚠️ some SEO-ish titles | ⚠️ |
| **C3** | Sites must **not claim** content/services they do not have | About vs reality | ✅ | ✅ satire labeled | ✅ |
| **C4** | No **doorway pages** for search engines | No stub/index-only monetized pages | ⚠️ | ✅ no thin stubs in sitemap | ⚠️ |
| **C5** | No **cookie-cutter / affiliate** pages with little original content | Affiliate link audit | ✅ | ✅ house ads labeled | ⚠️ |

---

## Tier D — Spam policies: content quality (G-SPAM — sections tied to “Low value content”)

These are the **specific abuse types** Google lists under thin/low-value enforcement.

| ID | Google policy (G-SPAM) | What triggers it | LD | TAG | 1947 | Fix |
|----|------------------------|------------------|----|----|------|-----|
| **D1** | **Scaled content abuse** — many pages generated to manipulate rankings, **little or no value**, unoriginal (incl. AI mass-gen) | High page count + low word count + template titles | ⚠️ | ✅ 82/82 pass 300w gate | ⚠️ | Depth gate before publish; Brandon GO |
| **D2** | **Scraped content** — republish without original value | Body text match external sources | ✅ | ✅ | ✅ | — |
| **D3** | **Thin affiliation** — copied merchant descriptions, cookie-cutter affiliate | Product pages | ⚠️ shop links | N/A | ⚠️ classified SKUs | Unique copy per SKU |
| **D4** | **Doorway abuse** — pages funnel users without useful destination | Stub pages in sitemap | ⚠️ coming-soon | ❌ placeholder slugs | ⚠️ | noindex/remove stubs |
| **D5** | **Keyword stuffing** | Unnatural keyword repetition | ✅ | ⚠️ | ⚠️ | Edit titles/deks |
| **D6** | **Site reputation abuse** — third-party content on host for host's ranking signals only | Partner promos without integration | ⚠️ house ads | ⚠️ house ads | ✅ | Editorial integration |
| **D7** | **Thin content: thin affiliate pages** (G-THIN) | Affiliate without reviews/value | N/A | N/A | ⚠️ | — |
| **D8** | **Thin content: content from other sources** (G-THIN) | Scraped/low-quality guest posts | ✅ | ✅ | ✅ | — |
| **D9** | **Thin content: doorways** (G-THIN) | See D4 | ⚠️ | ❌ | ⚠️ | — |
| **D10** | **Misleading functionality** — pages that don't deliver promised service | Fake generators, broken tools | ✅ games work | ✅ | ✅ landing honest | — |

### G-THIN recommended actions (apply before reconsideration)

From [G-THIN](https://support.google.com/webmasters/answer/9044175#thin-content):

1. Check for content that **duplicates content found elsewhere**
2. Check for **thin content pages with affiliate links**
3. Check for **doorway pages**
4. Ask whether the site provides **significant added value** (test with unaffiliated users)
5. **Improve** the site for user value
6. Request review with **examples of bad content removed and good content added**

---

## Tier E — Dashboard “Low value content” bar (maps rejection UI → actions)

| ID | Google criterion (rejection text) | Portfolio action |
|----|-----------------------------------|------------------|
| **E1** | **Substantial unique value** | Minimum **300 words** of unique body on every indexable/adjacent page; no production notes in body |
| **E2** | **Consistent presence on the web** | Search Console verified; sitemap; regular publish cadence; About/Newsroom/Contact real |
| **E3** | **User interest** (supports commercial partnership) | Search Console impressions/clicks; external links; not only internal network links |
| **E4** | **Authentic, high-quality information, tools, or services** | TAG: deepen satire; LD: games/tools must be clearly usable; 1947: unique archive essays |
| **E5** | **Ongoing curation and structural maintenance** | Corrections page, editorial standards, dated updates, remove bad pages |
| **E6** | **Genuine user interest** | Avoid looking like a private link network between LDP properties |

---

## Tier F — Per-site remediation checklist (do before “Request review”)

### theassociatedguess.com (TAG) — highest ad priority

| Priority | Action | Closes | Status |
|----------|--------|--------|--------|
| P0 | **Noindex or remove** all non-indexable articles (<200w, placeholders, production notes) from sitemap | D1, D4, E1 | ✅ Sep 22 |
| P0 | **Brandon GO gate** on every live story (no auto-publish) | D1, E5 | ✅ ON004 |
| P1 | Raise **MIN_INDEXABLE_WORDS** to **300**; rebuild; keep only quality pieces in sitemap | B1, E1 | ✅ 82/82 |
| P1 | Add visible **Editorial Standards**, **Corrections**, **Newsroom** (already in repo — verify live) | E2, E5 | ✅ live |
| P1 | Reduce template repetition (“Case of…”, “Mysterious…”) — diversify ledes | B3, D1 | ⚠️ 6 remain |
| P2 | Search Console + submit sitemap | A11, E2 | 👤 Brandon |
| P2 | EU CMP live | A8 | ✅ Sep 22 |
| P2b | Site logo uploaded (≤148 KB) | — | ✅ Sep 22 |
| P3 | Request review only after P0–P1 ✅ | A3 | 👤 **ready — do §3** |

### laughing-dragons.com (LD)

| Priority | Action | Closes |
|----------|--------|--------|
| P0 | Every monetized **game page**: written guide **≥300 words** above the fold | B1, E4 |
| P0 | Every monetized **tool page**: working tool + **≥150 words** explanation | E4 |
| P1 | **Kids Show** clearly separated; no kid-directed copy on monetized game pages | B3, C3 |
| P1 | Remove **coming-soon** from sitemap; no ads on WIP | D4 |
| P2 | Fill **header + footer** slot IDs | A9 |
| P2 | Search Console + sitemap | A11 |
| P3 | Request review | A3 |

### them1947.com (1947)

| Priority | Action | Closes |
|----------|--------|--------|
| P0 | Each **/files/** archive page: unique essay **≥250 words** (not duplicate SKU blurbs) | B1, D3 |
| P0 | Do **not** monetize `/` cinematic landing or thin routes | C1 |
| P1 | Create display ad units + fill `config.js` | A9 |
| P2 | Search Console | A11 |
| P3 | Request review **after** TAG/LD learnings applied | A3 |

---

## Tier G — Reconsideration request template (copy into AdSense)

Use **after** fixes are live. Google asks for **examples of bad content removed and good content added** (G-THIN).

```
Site: [domain]

Issue: Low value content

What we removed or noindexed:
- [URL] — [reason: thin / placeholder / duplicate template]

What we added or expanded:
- [URL] — [word count now] — [what makes it unique]

Structural / trust improvements:
- Editorial standards: [URL]
- Corrections: [URL]
- Publish gate: human approval before any article goes live

We believe the site now provides substantial unique value for [audience].
```

---

## Automated scanner

```powershell
# Portfolio content + technical checks (updates jarvis/state/adsense-readiness.json)
powershell -File G:\LocalAIagent\desktop-agent\scripts\check-adsense-readiness.ps1 -Site tag
powershell -File G:\LocalAIagent\desktop-agent\scripts\check-adsense-readiness.ps1 -Site ld
powershell -File G:\LocalAIagent\desktop-agent\scripts\check-adsense-readiness.ps1 -Site them1947
```

**Interpret scores:**

| Score type | Meaning |
|------------|---------|
| **Technical %** | ads.txt, slots, legal pages, script scope |
| **Content approval ready** | Tier B–E pass — **required for resubmit** |

A site can score **100% technical** and still fail review — as all three did in Sep 2026.

---

## Related repo docs

| Site | Manual |
|------|--------|
| LD hub | [ADSENSE-MANUAL.md](ADSENSE-MANUAL.md) · [ADSENSE-GO-LIVE.md](ADSENSE-GO-LIVE.md) |
| TAG | [../Theassociatedguess/ADSENSE-MANUAL.md](../Theassociatedguess/ADSENSE-MANUAL.md) |
| 1947 | [../Them1947/ADSENSE-MANUAL.md](../Them1947/ADSENSE-MANUAL.md) |

**Last synced to Google sources:** September 21, 2026
