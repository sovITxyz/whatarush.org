import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from '@/App';
import '@/index.css';

// Build-time SSG (vite-react-ssg) renders App with react-dom/server in pure
// Node — no headless browser — so full HTML (including the JSON-LD and every
// section) ships to crawlers on any host, including Cloudflare. On the client
// ViteReactSSG hydrates the snapshot when it exists, or plain-renders in dev.
// It owns mounting (targets #root) and auto-wraps <HelmetProvider>, so App
// uses vite-react-ssg's <Head> for title/description/JSON-LD.
export const createRoot = ViteReactSSG(<App />);
