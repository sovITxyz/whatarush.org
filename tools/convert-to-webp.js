#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');
const QUALITY = 80;

async function findImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convert() {
  const images = await findImages(IMAGES_DIR);
  let converted = 0;
  let skipped = 0;

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(/\.(jpe?g|png)$/i, '.webp');

    if (fs.existsSync(webpPath)) {
      skipped++;
      continue;
    }

    try {
      await sharp(imgPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const origSize = fs.statSync(imgPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const savings = ((1 - webpSize / origSize) * 100).toFixed(1);

      console.log(`${path.relative(IMAGES_DIR, imgPath)} -> .webp (${savings}% smaller)`);
      converted++;
    } catch (err) {
      console.error(`Failed: ${path.relative(IMAGES_DIR, imgPath)} - ${err.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} already existed, ${images.length} total images`);
}

convert();
