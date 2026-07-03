import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

// The prerendered snapshot (scripts/prerender.js) captures the page *after*
// the framer-motion entrance animations have finished, so it can never match
// React's first client render (which mounts with pre-animation styles, e.g.
// the nav at translateY(-100px)). React 18 treats any such mismatch as a
// hydration failure (#418/#423) and falls back to a full client render
// anyway — so render explicitly: the snapshot serves crawlers and the first
// paint, then React takes over cleanly without hydration errors.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);