#!/usr/bin/env python3
"""Generate /kids/characters/{a-z}/index.html pages."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LETTERS = "abcdefghijklmnopqrstuvwxyz"

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Meet {title_name} — a Fruit Friends character from the Laughing Dragons Kids Show." />
    <title>{title_name}</title>
    <link rel="icon" href="/assets/brand/ldp-logo.png" type="image/png" />
    <link rel="stylesheet" href="/assets/css/site.css" />
    <link rel="canonical" href="https://laughing-dragons.com/kids/characters/{letter}/" />
  </head>
  <body>
    <div id="app"></div>
    <script src="/assets/js/config.js"></script>
    <script src="/assets/js/kids.js"></script>
    <script src="/assets/js/site.js"></script>
    <script>
      initCharacterPage("{letter}");
    </script>
  </body>
</html>
"""


def title_for_letter(letter: str) -> str:
    # Placeholder; page title updates client-side from KIDS_DATA
    return f"Letter {letter.upper()}"


def main() -> int:
    for letter in LETTERS:
        out_dir = ROOT / "kids" / "characters" / letter
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / "index.html"
        out_path.write_text(
            TEMPLATE.format(letter=letter, title_name=title_for_letter(letter)),
            encoding="utf-8",
        )
    print(f"Generated {len(LETTERS)} character pages under kids/characters/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
