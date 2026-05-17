#!/usr/bin/env python3
"""Convert SVG logos to pure white for dark-background trust strips."""
import re
import sys
from pathlib import Path

WHITE = "#FFFFFF"

def whiten_svg(text: str) -> str:
    # Replace fill="#xxxxxx" or fill="rgb(...)" or fill="black" etc.
    text = re.sub(r'fill="(?!none)[^"]*"', f'fill="{WHITE}"', text)
    text = re.sub(r"fill='(?!none)[^']*'", f"fill='{WHITE}'", text)
    # Replace style="fill: #xxx" inline
    text = re.sub(r'fill:\s*(?!none)[^;"\']+', f'fill:{WHITE}', text)
    # Replace stop-color in gradients
    text = re.sub(r'stop-color="[^"]*"', f'stop-color="{WHITE}"', text)
    text = re.sub(r"stop-color='[^']*'", f"stop-color='{WHITE}'", text)
    text = re.sub(r'stop-color:\s*[^;"\']+', f'stop-color:{WHITE}', text)
    # Stroke colors too (some logos use stroke instead of fill)
    text = re.sub(r'stroke="(?!none)[^"]*"', f'stroke="{WHITE}"', text)
    text = re.sub(r'stroke:\s*(?!none)[^;"\']+', f'stroke:{WHITE}', text)
    return text

def main(files):
    for f in files:
        path = Path(f)
        if not path.exists() or path.suffix.lower() != ".svg":
            continue
        text = path.read_text()
        white = whiten_svg(text)
        out = path.with_name(path.stem + "-white.svg")
        out.write_text(white)
        print(f"✓ {out.name}")

if __name__ == "__main__":
    files = sys.argv[1:] or list(Path(".").glob("*.svg"))
    main(files)
