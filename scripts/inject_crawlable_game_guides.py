"""Embed game landing guides in HTML so crawlers see substantive copy before JS runs."""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GAMES_JS = ROOT / "assets" / "js" / "games.js"
MOUNT_RE = re.compile(
    r'(<div id="game-landing-mount">)(.*?)(</div>)',
    re.DOTALL,
)
LANDING_FN_RE = re.compile(
    r"function (render\w+Landing)\(\)\s*\{\s*return `\s*([\s\S]*?)`\s*;\s*\}",
)
INLINE_LANDING_RE = re.compile(
    r"landingHtml:\s*`([\s\S]*?)`\s*,?\s*\n\s*\}\);",
)
RENDER_CALL_RE = re.compile(r"landingHtml:\s*(render\w+Landing\(\))")
GAME_BLOCK_SPLIT_RE = re.compile(r"\n    \{\n")


def _word_count(text: str) -> int:
    plain = html.unescape(re.sub(r"<[^>]+>", " ", text))
    return len(re.findall(r"\w+", plain))


def _load_render_landings() -> dict[str, str]:
    text = GAMES_JS.read_text(encoding="utf-8")
    return {name: body.strip() for name, body in LANDING_FN_RE.findall(text)}


def _load_long_descriptions() -> dict[str, str]:
    text = GAMES_JS.read_text(encoding="utf-8")
    out: dict[str, str] = {}
    for block in GAME_BLOCK_SPLIT_RE.split(text):
        href_m = re.search(r'href:\s*"(/games/[^"]+/)"', block)
        if not href_m:
            continue
        long_m = re.search(
            r"longDescription:\s*([\s\S]*?)\n\s*(?:href:|image:|status:)",
            block,
        )
        if not long_m:
            continue
        desc = "".join(re.findall(r'"([^"]*)"', long_m.group(1))).strip()
        if desc:
            out[href_m.group(1)] = desc
    return out


def _landing_from_long(title: str, href: str, long_desc: str) -> str:
    safe_title = html.escape(title)
    paragraphs = [p.strip() for p in re.split(r"\s{2,}|\n", long_desc) if p.strip()]
    body = "".join(f"<p>{html.escape(p)}</p>" for p in paragraphs[:4])
    return f"""<article class="game-landing prose reveal">
  <p class="game-landing-back"><a href="/games/">&larr; All games</a></p>
  <p class="pillar-eyebrow">Laughing Dragons Games</p>
  <h1>{safe_title}</h1>
  <p class="page-lead">{html.escape(paragraphs[0][:180])}</p>
  {body}
  <h2>Play in your browser</h2>
  <p>This is a finished Laughing Dragons studio game with a written guide, tips, and a playable build on this page. Progress saves locally in your browser — no account or install required.</p>
  <p><a class="btn btn-primary" href="#game-play">Play now ↓</a></p>
</article>"""


def _extract_landing(page_html: str, render_landings: dict[str, str]) -> str | None:
    inline = INLINE_LANDING_RE.search(page_html)
    if inline:
        return inline.group(1).strip()
    call = RENDER_CALL_RE.search(page_html)
    if call:
        fn_name = call.group(1).replace("()", "")
        return render_landings.get(fn_name)
    return None


def _page_href(path: Path) -> str:
    rel = path.relative_to(ROOT / "games").as_posix()
    return f"/games/{rel.replace('/index.html', '/')}"


def _page_title(page_html: str) -> str:
    m = re.search(r"<title>([^<]+)</title>", page_html, re.I)
    return (m.group(1).strip() if m else "Laughing Dragons Game").replace(" | Laughing Dragons", "")


def _inject_mount(page_html: str, landing: str) -> str:
    landing = landing.strip()
    if _word_count(landing) < 120:
        return page_html

    def repl(match: re.Match[str]) -> str:
        return f"{match.group(1)}\n      {landing}\n    {match.group(3)}"

    updated, count = MOUNT_RE.subn(repl, page_html, count=1)
    return updated if count else page_html


def main() -> None:
    render_landings = _load_render_landings()
    long_desc = _load_long_descriptions()
    updated = 0
    for path in sorted((ROOT / "games").glob("*/index.html")):
        text = path.read_text(encoding="utf-8")
        landing = _extract_landing(text, render_landings)
        href = _page_href(path)
        if landing and _word_count(landing) < 120 and href in long_desc:
            landing = _landing_from_long(_page_title(text), href, long_desc[href])
        if not landing:
            continue
        next_text = _inject_mount(text, landing)
        if next_text != text:
            path.write_text(next_text, encoding="utf-8")
            updated += 1
            print(f"updated {path.relative_to(ROOT)} ({_word_count(landing)}w)")
    print(f"done — {updated} game page(s) patched")


if __name__ == "__main__":
    main()
