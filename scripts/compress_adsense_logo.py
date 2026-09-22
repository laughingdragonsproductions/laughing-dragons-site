"""Compress Laughing Dragons logo for AdSense upload (max 148 KB)."""

from __future__ import annotations

import sys
from io import BytesIO
from pathlib import Path

from PIL import Image

TARGET_BYTES = 148 * 1024


def flatten_rgba(image: Image.Image, background=(0, 0, 0)) -> Image.Image:
    rgba = image.convert("RGBA")
    base = Image.new("RGB", rgba.size, background)
    base.paste(rgba, mask=rgba.split()[3])
    return base


def jpeg_bytes(image: Image.Image, quality: int) -> bytes:
    buf = BytesIO()
    image.save(buf, format="JPEG", quality=quality, optimize=True, progressive=True)
    return buf.getvalue()


def best_jpeg_under_target(
    base: Image.Image,
    *,
    scales: tuple[float, ...] = (1.0, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5),
) -> tuple[Image.Image, int, int]:
    for scale in scales:
        if scale == 1.0:
            image = base
        else:
            w, h = base.size
            image = base.resize(
                (max(1, int(w * scale)), max(1, int(h * scale))),
                Image.Resampling.LANCZOS,
            )

        lo, hi = 30, 95
        winner: tuple[int, int, Image.Image] | None = None
        while lo <= hi:
            quality = (lo + hi) // 2
            data = jpeg_bytes(image, quality)
            if len(data) <= TARGET_BYTES:
                winner = (len(data), quality, image.copy())
                lo = quality + 1
            else:
                hi = quality - 1

        if winner:
            size, quality, image = winner
            return image, quality, size

    raise RuntimeError("Could not compress image to 148 KB")


def compress_for_adsense(
    src: Path,
    out: Path | None = None,
    *,
    background=(0, 0, 0),
) -> tuple[Path, Image.Image, int]:
    src = src.resolve()
    if not src.exists():
        raise FileNotFoundError(src)

    out_path = out.resolve() if out else src.with_name(f"{src.stem}-adsense.jpg")
    out_path.parent.mkdir(parents=True, exist_ok=True)

    base = flatten_rgba(Image.open(src), background=background)
    image, quality, _size = best_jpeg_under_target(base)
    image.save(out_path, format="JPEG", quality=quality, optimize=True, progressive=True)
    return out_path, image, quality


def main() -> int:
    src = Path(
        r"C:\Users\David\.cursor\projects\g-LocalAIagent-laughing-dragons-site\assets"
        r"\c__Users_David_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_"
        r"LDPSMALL-ecd1dbb5-6bcd-412d-aa89-3f6468bc97f8.png"
    )
    out: Path | None = Path(r"G:\LocalAIagent\laughing-dragons-site\assets\brand\ldp-logo-adsense.jpg")
    if len(sys.argv) > 1:
        src = Path(sys.argv[1])
    if len(sys.argv) > 2:
        out = Path(sys.argv[2])

    out_path, image, quality = compress_for_adsense(src, out)
    final = out_path.stat().st_size
    print(f"Source: {src.name} ({src.stat().st_size / 1024:.1f} KB)")
    print(f"Output: {out_path}")
    print(f"Size:   {final / 1024:.1f} KB ({final} bytes)")
    print(f"Dims:   {image.size[0]}x{image.size[1]} @ JPEG q={quality}")
    return 0 if final <= TARGET_BYTES else 1


if __name__ == "__main__":
    raise SystemExit(main())
