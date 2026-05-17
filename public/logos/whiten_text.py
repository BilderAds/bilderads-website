#!/usr/bin/env python3
"""Convert ONLY the wordmark/text portion of SVG logos to white.
Logic: dark grayscale fills (black, near-black, dark grey) are usually text.
Brand colors (saturated) are kept as-is.
"""
import re
import sys
from pathlib import Path

WHITE = "#FFFFFF"

NAMED = {
    "black": (0, 0, 0),
    "white": (255, 255, 255),
    "gray": (128, 128, 128),
    "grey": (128, 128, 128),
    "silver": (192, 192, 192),
    "dimgray": (105, 105, 105),
    "dimgrey": (105, 105, 105),
    "darkgray": (169, 169, 169),
    "darkgrey": (169, 169, 169),
}

def parse_color(c):
    c = c.strip().lower()
    if c in ("none", "transparent", "currentcolor", "inherit"):
        return None
    if c.startswith("#"):
        h = c[1:]
        if len(h) == 3:
            h = "".join(ch * 2 for ch in h)
        if len(h) == 6:
            try:
                return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
            except ValueError:
                return None
        if len(h) == 8:
            try:
                return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
            except ValueError:
                return None
    m = re.match(r"rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)", c)
    if m:
        return (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    if c in NAMED:
        return NAMED[c]
    return None

def is_text_color(rgb):
    if rgb is None:
        return False
    r, g, b = rgb
    grayness = max(r, g, b) - min(r, g, b)
    luminance = 0.299 * r + 0.587 * g + 0.114 * b
    # Near-grayscale AND dark enough to be text
    return grayness <= 30 and luminance < 160

def replace_attr(text, attr):
    # attr="..." form
    def sub(m):
        val = m.group(1)
        rgb = parse_color(val)
        if is_text_color(rgb):
            return f'{attr}="{WHITE}"'
        return m.group(0)
    text = re.sub(rf'{attr}="([^"]+)"', sub, text)
    def sub2(m):
        val = m.group(1)
        rgb = parse_color(val)
        if is_text_color(rgb):
            return f"{attr}='{WHITE}'"
        return m.group(0)
    text = re.sub(rf"{attr}='([^']+)'", sub2, text)
    return text

def replace_inline_style(text, prop):
    # style="...prop: value..."
    def sub(m):
        val = m.group(1).strip()
        rgb = parse_color(val)
        if is_text_color(rgb):
            return f"{prop}:{WHITE}"
        return m.group(0)
    return re.sub(rf'{prop}\s*:\s*([^;"\']+)', sub, text)

def whiten_text(text: str) -> str:
    for attr in ("fill", "stroke", "stop-color", "color"):
        text = replace_attr(text, attr)
        text = replace_inline_style(text, attr)
    # If <svg> root has no fill set, paths without explicit fill default to BLACK
    # (invisible on dark BG). Add root fill="white" so they inherit white.
    # Paths/gradients with explicit brand colors are unaffected.
    if not re.search(r'<svg[^>]*\sfill\s*=', text):
        text = re.sub(r'<svg\b', '<svg fill="#FFFFFF"', text, count=1)
    return text

def main(files):
    for f in files:
        path = Path(f)
        if not path.exists() or path.suffix.lower() != ".svg":
            continue
        text = path.read_text()
        white = whiten_text(text)
        out = path.with_name(path.stem + "-textwhite.svg")
        out.write_text(white)
        changed = text != white
        marker = "✓" if changed else "—"
        print(f"{marker} {out.name}{'' if changed else ' (no dark text found)'}")

if __name__ == "__main__":
    files = sys.argv[1:] or list(Path(".").glob("*.svg"))
    main(files)
