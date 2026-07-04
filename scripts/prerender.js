import { createServer } from 'node:http';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import puppeteer from 'puppeteer';

const DIST_DIR = new URL('../dist', import.meta.url).pathname;
const TIMEOUT = 30_000;

const MIME_TYPES = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://localhost`);
      let filePath = join(DIST_DIR, url.pathname === '/' ? 'index.html' : url.pathname);

      try {
        const stat = statSync(filePath);
        if (stat.isDirectory()) filePath = join(filePath, 'index.html');
      } catch {
        // SPA fallback — serve index.html for missing paths
        filePath = join(DIST_DIR, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

function validate(html) {
  const checks = [
    ['JSON-LD (LocalBusiness)', 'LocalBusiness'],
    ['JSON-LD (FAQPage)', 'FAQPage'],
    ['Horse section', 'Meet Our Horses'],
    ['Services section', 'Guided Trail Rides'],
    ['Rental section', 'Palapa Rental'],
    ['Owner section', 'Meet the Owners'],
  ];

  let passed = 0;
  for (const [label, needle] of checks) {
    if (html.includes(needle)) {
      passed++;
    } else {
      console.warn(`  ⚠ Missing: ${label} ("${needle}" not found)`);
    }
  }
  console.log(`  Validation: ${passed}/${checks.length} checks passed`);
  return passed === checks.length;
}

async function prerender() {
  console.log('Prerender: starting...');

  const originalHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
  const originalSize = Buffer.byteLength(originalHtml, 'utf-8');

  const { server, port } = await startServer();
  console.log(`  Static server on http://127.0.0.1:${port}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 50000 });

    // Let the app know it is being prerendered so it can skip client-only,
    // non-deterministic UI (e.g. the hero video preview) and keep the
    // snapshot hydratable.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    await page.goto(`http://127.0.0.1:${port}/`, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT,
    });

    // Wait for the last lazy-loaded component (Footer) to confirm all Suspense resolved
    await page.waitForSelector('footer', { timeout: TIMEOUT });

    // Small extra wait for Helmet side-effects and final paints
    await new Promise((r) => setTimeout(r, 1000));

    // Strip any modulepreload links baked in during rendering. Mounting every
    // lazy section in Puppeteer makes Vite's preload helper (and any stray
    // hints) preload all below-the-fold chunks on first paint, which contends
    // with the entry bundle + LCP image. The chunks still load on demand via
    // their import() at mount — just off the critical path.
    await page.evaluate(() => {
      document.querySelectorAll('link[rel="modulepreload"]').forEach((l) => l.remove());
    });

    const renderedHtml = await page.content();

    writeFileSync(join(DIST_DIR, 'index.html'), renderedHtml, 'utf-8');

    const newSize = Buffer.byteLength(renderedHtml, 'utf-8');
    console.log(`  HTML size: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB`);

    validate(renderedHtml);
    console.log('Prerender: done ✓');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
