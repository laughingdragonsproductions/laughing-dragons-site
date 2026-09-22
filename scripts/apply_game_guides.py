"""Apply simplified game landings + crawlable 350w+ bottom guides to /games/ pages."""

from __future__ import annotations

import html
import re
from pathlib import Path

from game_guides_data import GAME_GUIDES

ROOT = Path(__file__).resolve().parent.parent
GAMES_JS = ROOT / "assets" / "js" / "games.js"

MOUNT_RE = re.compile(
    r'(<div id="game-landing-mount">)(.*?)(</div>)',
    re.DOTALL,
)
GUIDE_RE = re.compile(
    r'\n\s*<section class="container game-full-guide prose" id="game-guide"[\s\S]*?</section>\n',
)
INLINE_LANDING_RE = re.compile(
    r"(landingHtml:\s*(?:`[\s\S]*?`|render\w+Landing\(\))),",
)
RENDER_FN_RE = re.compile(
    r"(function render(?:Terminal|Memory)Landing\(\)\s*\{\s*return `\s*)[\s\S]*?(`;\s*\})",
)


def _word_count(text: str) -> int:
    plain = html.unescape(re.sub(r"<[^>]+>", " ", text))
    return len(re.findall(r"\w+", plain))


def _short_landing(data: dict) -> str:
    title = html.escape(data["title"])
    lead = html.escape(data["short_lead"])
    blurb = html.escape(data["short_blurb"])
    return f"""<article class="game-landing prose reveal">
  <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
  <p class="pillar-eyebrow">Laughing Dragons Games</p>
  <h1>{title}</h1>
  <p class="page-lead">{lead}</p>
  <p>{blurb}</p>
  <p><a class="btn btn-primary" href="#game-play">Play now ↓</a> · <a href="#game-guide">Full guide ↓</a></p>
</article>"""


def _full_guide(data: dict) -> str:
    title = html.escape(data["title"])
    body = "".join(f"<p>{html.escape(p)}</p>\n      " for p in data["guide_paragraphs"])
    return f"""
    <section class="container game-full-guide prose" id="game-guide" aria-label="Full game guide">
      <h2>Complete guide: {title}</h2>
      {body.strip()}
    </section>
"""


def _inject_guide(page_html: str, guide_html: str) -> str:
    page_html = GUIDE_RE.sub("\n", page_html)
    anchor = '<div class="container" id="game-ad-bottom">'
    if anchor in page_html:
        return page_html.replace(anchor, guide_html + anchor, 1)
    anchor = '<div id="game-footer-mount">'
    if anchor in page_html:
        return page_html.replace(anchor, guide_html + anchor, 1)
    return page_html


def _patch_page(path: Path, slug: str, data: dict) -> bool:
    text = path.read_text(encoding="utf-8")
    short = _short_landing(data)
    guide = _full_guide(data)
    changed = False

    def mount_repl(match: re.Match[str]) -> str:
        return f"{match.group(1)}\n      {short}\n    {match.group(3)}"

    next_text, count = MOUNT_RE.subn(mount_repl, text, count=1)
    if count:
        changed = True
        text = next_text

    next_text = _inject_guide(text, guide)
    if next_text != text:
        changed = True
        text = next_text

    short_js = short.replace("\\", "\\\\").replace("`", "\\`")
    if "landingHtml:" in text:
        next_text = INLINE_LANDING_RE.sub(f"landingHtml: `\n{short_js}\n        `,", text, count=1)
        if next_text != text:
            changed = True
            text = next_text

    if changed:
        path.write_text(text, encoding="utf-8")
    return changed


def _patch_games_js() -> bool:
    text = GAMES_JS.read_text(encoding="utf-8")
    changed = False
    for slug, fn in (("terminal", "renderTerminalLanding"), ("memory-matching", "renderMemoryLanding")):
        if slug not in GAME_GUIDES:
            continue
        short = _short_landing(GAME_GUIDES[slug])
        short_js = short.replace("\\", "\\\\").replace("`", "\\`")
        pattern = re.compile(
            rf"(function {fn}\(\)\s*\{{\s*return `\s*)[\s\S]*?(`;\s*\}})",
        )
        next_text, count = pattern.subn(rf"\1{short_js}\2", text, count=1)
        if count:
            text = next_text
            changed = True
    if changed:
        GAMES_JS.write_text(text, encoding="utf-8")
    return changed


def main() -> None:
    updated = 0
    for path in sorted((ROOT / "games").glob("*/index.html")):
        slug = path.parent.name
        if slug not in GAME_GUIDES:
            print(f"skip {slug} — no guide data")
            continue
        if _patch_page(path, slug, GAME_GUIDES[slug]):
            words = _word_count(_full_guide(GAME_GUIDES[slug]))
            updated += 1
            print(f"updated games/{slug}/index.html (guide {words}w)")
    if _patch_games_js():
        print("updated assets/js/games.js landing renderers")
    print(f"done — {updated} game page(s)")


if __name__ == "__main__":
    main()
