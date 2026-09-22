# AdSense go-live progress

Last checked: September 22, 2026

Publisher: `ca-pub-7048606415692002`

**Master matrix (Google-aligned):** [ADSENSE-REQUIREMENTS-MATRIX.md](ADSENSE-REQUIREMENTS-MATRIX.md)

## Rejection status (Sep 2026)

| Site | Ownership | Content review | Violation |
|------|-----------|----------------|-----------|
| laughing-dragons.com | ✅ Verified | ❌ Failed | **Low value content** |
| theassociatedguess.com | ✅ Verified | ❌ Failed | **Low value content** |
| them1947.com | ✅ Verified | ❌ Failed | **Low value content** |

**None of the three are approved for ads.** Green ownership check only means ads.txt/code was found — not that content passed.

## Scanner snapshot

Run: `powershell -File G:\LocalAIagent\desktop-agent\scripts\check-adsense-readiness.ps1 -Site tag`

| Site | Technical | Content approval-ready | Top content issue |
|------|-----------|------------------------|-------------------|
| TAG | 100% | **YES** | 82/82 indexable (300w+ / 2 min); 0 duplicate body pairs |
| LD hub | 86% | YES* | Header/footer slot IDs empty (console) |
| THEM 1947 | 82% | **NO** | 23/28 archive pages under 150 words |

\*LD passes automated content heuristics but **still failed Google review** — treat as manual follow-up on game guide depth.

## What to do before “Request review”

1. Read [ADSENSE-REQUIREMENTS-MATRIX.md](ADSENSE-REQUIREMENTS-MATRIX.md) Tier B–F for your site
2. Fix content blockers until scanner shows **Content approval-ready: YES**
3. **TAG:** Request review in AdSense → Sites (console ready: auto ads off, CMP, logos — Sep 22)
4. **LD / 1947:** Fix content blockers first, then request review
5. Optional: Search Console + sitemap for each domain
6. Resubmit with examples of **removed bad pages + added good pages** (Google requires this)

## Do not do yet

- Do not click “Request review” on LD or 1947 until content tier is green (TAG is ready)
- Do not assume 100% technical score = approval
