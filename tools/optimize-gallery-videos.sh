#!/usr/bin/env bash
# Re-encode the full-quality gallery masters (media-src/gallery-videos/) into
# web-friendly clips in public/images/gallery/videos/:
#   - height capped at 720 (never upscaled), H.264 CRF 28 (30 for the three
#     longest clips), low-bitrate AAC, faststart so playback begins after a
#     few hundred KB.
#   - a pure remux (-c copy) is also tried; whichever output is smaller wins,
#     so already-small/low-bitrate clips aren't inflated by a needless encode.
#   - a WebP poster frame (~1s in) is extracted per clip for <video poster> and
#     the gallery's click-to-load heavy clips.
# Output names are normalized to lowercase .mp4 (the masters mix .mp4/.MP4/.mov).
# Run from the repo root after adding or changing a master.
set -euo pipefail

SRC_DIR="media-src/gallery-videos"
OUT_DIR="public/images/gallery/videos"
POSTER_DIR="$OUT_DIR/posters"

mkdir -p "$OUT_DIR" "$POSTER_DIR"

# Long clips get a slightly higher CRF (smaller files, quality still fine).
HIGH_CRF="beachride video2 shakey-video1"
SCALE="scale=-2:'min(720,ih)':flags=lanczos"

shopt -s nullglob
total_src=0
total_out=0
for src in "$SRC_DIR"/*; do
  [ -f "$src" ] || continue
  base="$(basename "$src")"
  name="$(echo "${base%.*}" | tr '[:upper:]' '[:lower:]')"
  out="$OUT_DIR/$name.mp4"

  crf=28
  case " $HIGH_CRF " in *" $name "*) crf=30 ;; esac

  reenc="$(mktemp --suffix=.mp4)"
  remux="$(mktemp --suffix=.mp4)"

  ffmpeg -y -loglevel error -i "$src" \
    -vf "$SCALE" \
    -c:v libx264 -preset slow -crf "$crf" -profile:v main -pix_fmt yuv420p \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$reenc"

  # Pure remux (keeps original video stream, just moves the moov atom up front).
  # Fails harmlessly for codecs the mp4 container can't stream-copy.
  remux_ok=1
  ffmpeg -y -loglevel error -i "$src" -c copy -movflags +faststart "$remux" 2>/dev/null || remux_ok=0

  if [ "$remux_ok" -eq 1 ] && [ "$(stat -c%s "$remux")" -lt "$(stat -c%s "$reenc")" ]; then
    mv "$remux" "$out"; rm -f "$reenc"; how="remux"
  else
    mv "$reenc" "$out"; rm -f "$remux"; how="crf$crf"
  fi

  ffmpeg -y -loglevel error -ss 1 -i "$src" -frames:v 1 \
    -vf "$SCALE" -c:v libwebp -quality 70 "$POSTER_DIR/$name.webp"

  s=$(stat -c%s "$src"); o=$(stat -c%s "$out")
  total_src=$((total_src + s)); total_out=$((total_out + o))
  printf '%-18s (%-6s): %9d -> %9d bytes\n' "$name" "$how" "$s" "$o"
done

printf '\nTOTAL: %d -> %d bytes (%d%% of original)\n' \
  "$total_src" "$total_out" $((total_out * 100 / total_src))
