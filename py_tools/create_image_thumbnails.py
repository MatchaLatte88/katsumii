#!/usr/bin/env python3
"""Create 16:9 thumbnails for PNG/JPG images.

Usage:
    python py_tools/create_image_thumbnails.py path/to/images

The script writes two sibling output folders inside the source folder by default:
    thumbnails_640x360
    thumbnails_1280x720
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

try:
    from PIL import Image, ImageOps
except ImportError as exc:
    raise SystemExit(
        "Pillow is required. Install it with:\n"
        "    python -m pip install Pillow"
    ) from exc


IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg"}
SIZES = {
    "m": (640, 360),
    "L": (1280, 720),
}


def iter_images(source_dir: Path, recursive: bool) -> Iterable[Path]:
    pattern = "**/*" if recursive else "*"

    for path in source_dir.glob(pattern):
        if not path.is_file():
            continue

        if path.suffix.lower() in IMAGE_EXTENSIONS:
            yield path


def output_path(image_path: Path, output_dir: Path, suffix: str) -> Path:
    return output_dir / f"{image_path.stem}_thumb_{suffix}{image_path.suffix.lower()}"


def save_thumbnail(image_path: Path, target_path: Path, size: tuple[int, int]) -> None:
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(image_path) as image:
        image = ImageOps.exif_transpose(image)
        thumbnail = ImageOps.fit(
            image,
            size,
            method=Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )

        if target_path.suffix.lower() in {".jpg", ".jpeg"}:
            thumbnail = thumbnail.convert("RGB")
            thumbnail.save(target_path, quality=90, optimize=True, progressive=True)
        else:
            thumbnail.save(target_path, optimize=True)


def create_thumbnails(source_dir: Path, recursive: bool, overwrite: bool) -> int:
    output_dirs = {
        "m": source_dir / "thumbnails_640x360",
        "L": source_dir / "thumbnails_1280x720",
    }
    output_dir_paths = {path.resolve() for path in output_dirs.values()}
    processed = 0

    for image_path in iter_images(source_dir, recursive):
        if any(parent.resolve() in output_dir_paths for parent in image_path.parents):
            continue

        for suffix, size in SIZES.items():
            target_path = output_path(image_path, output_dirs[suffix], suffix)
            if target_path.exists() and not overwrite:
                continue

            save_thumbnail(image_path, target_path, size)

        processed += 1

    return processed


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create 640x360 and 1280x720 thumbnails from PNG/JPG images."
    )
    parser.add_argument(
        "source_dir",
        nargs="?",
        default=".",
        help="Folder containing the original PNG/JPG images. Defaults to current folder.",
    )
    parser.add_argument(
        "-r",
        "--recursive",
        action="store_true",
        help="Also process images in subfolders.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Replace thumbnails that already exist.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source_dir = Path(args.source_dir).expanduser().resolve()

    if not source_dir.is_dir():
        raise SystemExit(f"Source folder does not exist: {source_dir}")

    processed = create_thumbnails(source_dir, args.recursive, args.overwrite)
    print(f"Done. Processed {processed} image(s).")
    print(f"Medium thumbnails: {source_dir / 'thumbnails_640x360'}")
    print(f"Large thumbnails:  {source_dir / 'thumbnails_1280x720'}")


if __name__ == "__main__":
    main()
