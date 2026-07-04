#!/usr/bin/env bash
# Re-encode the hero background clips into public/images/hero-videos/:
# no audio (the hero is always muted), CRF 28 H.264, faststart so playback
# begins after a few hundred KB. Run from the repo root after adding or
# changing any clip listed in heroPreviewVideos (src/lib/galleryMedia.js).
set -euo pipefail

# Masters live in media-src/ (kept out of the published tree). The hero clips
# reuse the gallery masters, re-encoded muted for the full-bleed background.
SRC_DIR="media-src/gallery-videos"
OUT_DIR="public/images/hero-videos"
CLIPS=(ridingvideo1 ridingvideo3 ridingvideo7 ridingvideo9 ridingvideo10 ridingvideo11 ridingvideo12)

mkdir -p "$OUT_DIR"
for clip in "${CLIPS[@]}"; do
  reenc=$(mktemp --suffix=.mp4)
  copy=$(mktemp --suffix=.mp4)
  ffmpeg -y -loglevel error -i "$SRC_DIR/$clip.mp4" \
    -an -c:v libx264 -preset slow -crf 28 -profile:v main -pix_fmt yuv420p \
    -movflags +faststart "$reenc"
  # Some source clips are already low-bitrate; for those, just dropping the
  # audio track beats a re-encode. Keep whichever comes out smaller.
  ffmpeg -y -loglevel error -i "$SRC_DIR/$clip.mp4" \
    -an -c:v copy -movflags +faststart "$copy"
  if [ "$(stat -c%s "$reenc")" -le "$(stat -c%s "$copy")" ]; then
    mv "$reenc" "$OUT_DIR/$clip.mp4"; rm -f "$copy"; how="crf28"
  else
    mv "$copy" "$OUT_DIR/$clip.mp4"; rm -f "$reenc"; how="copy"
  fi
  printf '%s (%s): %s -> %s bytes\n' "$clip" "$how" \
    "$(stat -c%s "$SRC_DIR/$clip.mp4")" \
    "$(stat -c%s "$OUT_DIR/$clip.mp4")"
done
