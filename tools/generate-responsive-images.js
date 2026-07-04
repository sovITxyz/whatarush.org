#!/usr/bin/env node
// Generate responsive WebP + AVIF variants so browsers download a size that
// matches the viewport instead of the full-resolution original (some gallery
// photos are 5712px wide). For each source jpeg/png in the directories below,
// emits {base}-{w}.webp and {base}-{w}.avif for every width in WIDTHS. Never
// upscales (withoutEnlargement — a variant wider than the source is written at
// the source width so the URL always exists and srcset never 404s). Skips any
// variant that already exists. Run from the repo root:
//   npm run responsive-images
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('public/images');
const DIRS = ['gallery/photos', 'property', 'horses', 'owners', 'location'];
const WIDTHS = [400, 800, 1280, 1920];
const WEBP = { quality: 78 };
const AVIF = { quality: 50, effort: 4 };

function listSources() {
  const files = [];
  for (const d of DIRS) {
    const dir = path.join(ROOT, d);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      // Only originals — skip already-generated -<width> variants.
      if (/\.(jpe?g|png)$/i.test(name) && !/-\d+\.(jpe?g|png)$/i.test(name)) {
        files.push(path.join(dir, name));
      }
    }
  }
  return files;
}

async function run() {
  const sources = listSources();
  let made = 0;
  let skipped = 0;
  let failed = 0;

  for (const src of sources) {
    const base = src.replace(/\.(jpe?g|png)$/i, '');
    for (const w of WIDTHS) {
      for (const [ext, opts] of [['webp', WEBP], ['avif', AVIF]]) {
        const out = `${base}-${w}.${ext}`;
        if (fs.existsSync(out)) {
          skipped++;
          continue;
        }
        try {
          await sharp(src)
            .resize({ width: w, withoutEnlargement: true })[ext](opts)
            .toFile(out);
          made++;
        } catch (err) {
          console.error(`fail ${path.relative(ROOT, out)}: ${err.message}`);
          failed++;
        }
      }
    }
    console.log(path.relative(ROOT, src));
  }

  console.log(`\nresponsive-images: ${made} made, ${skipped} skipped, ${failed} failed, ${sources.length} sources`);
}

run();
