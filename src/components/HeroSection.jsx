import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { shuffle, heroPreviewVideos } from '@/lib/galleryMedia';

const HeroSection = () => {
  // Shuffled once per page load so every visit starts on a different clip;
  // the lazy initializer keeps the order stable across re-renders.
  const [playlist] = useState(() => shuffle(heroPreviewVideos));
  const [clipIndex, setClipIndex] = useState(0);
  // Mount the video only after the page has fully loaded so it never competes
  // with the hero image / critical assets. Skipped during build-time
  // prerendering (window.__PRERENDER__) so the snapshot stays hydratable.
  const [showVideo, setShowVideo] = useState(false);
  // True while the current clip is painting frames; the static hero image
  // shows through whenever this is false (loading, clip swap, failure).
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);
  const errorCountRef = useRef(0);

  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (document.readyState === 'complete') {
      setShowVideo(true);
      return undefined;
    }
    const onLoad = () => setShowVideo(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Start downloading the first clip right away, in parallel with the rest of
  // the page, so it's (nearly) cached by the time the video mounts on window
  // `load`. The <video> element itself still waits so decoding/playback never
  // competes with the critical rendering path.
  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = playlist[0];
    document.head.appendChild(link);
    return () => link.remove();
  }, [playlist]);

  // Kick playback on mount and on every clip swap. Autoplay can be rejected
  // (low-power mode, data saver); swallowing the rejection leaves the static
  // image visible, which is the intended fallback.
  useEffect(() => {
    if (!showVideo) return;
    const vid = videoRef.current;
    if (!vid) return;
    // The hero must never make sound; React doesn't reliably reflect the
    // muted attribute into the DOM, so set the property directly too.
    vid.muted = true;
    const p = vid.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [showVideo, clipIndex]);

  // Chrome defers playback for tabs that load while hidden (play() resolves
  // but the video never advances). Re-kick playback when the tab becomes
  // visible so a background-opened tab doesn't show a frozen first frame.
  useEffect(() => {
    if (!showVideo) return undefined;
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return;
      const vid = videoRef.current;
      if (vid && vid.paused) {
        vid.muted = true;
        const p = vid.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [showVideo]);

  // Preload only the next clip so the swap on `ended` isn't laggy while the
  // idle cost stays bounded to current + next.
  useEffect(() => {
    if (!showVideo || playlist.length < 2) return undefined;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = playlist[(clipIndex + 1) % playlist.length];
    document.head.appendChild(link);
    return () => link.remove();
  }, [showVideo, clipIndex, playlist]);

  const advanceClip = () => {
    // Hide instantly (no fade-out) so the element never paints between
    // sources; the hero image underneath covers the gap.
    setVideoReady(false);
    setClipIndex((i) => (i + 1) % playlist.length);
  };

  const handleVideoError = () => {
    errorCountRef.current += 1;
    // Every clip failed in a row — stay on the static image, stop looping.
    if (errorCountRef.current >= playlist.length) return;
    advanceClip();
  };

  const scrollToNextSection = () => {
    const horseSection = document.getElementById('horse-riding');
    if (horseSection) {
      horseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background: static image base layer with the rotating video above it */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source srcSet="/images/hero-background.webp" type="image/webp" />
          <img
            src="/images/hero-background.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
          />
        </picture>
        {showVideo && (
          <video
            ref={videoRef}
            src={playlist[clipIndex]}
            muted
            autoPlay
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => {
              errorCountRef.current = 0;
              setVideoReady(true);
            }}
            onEnded={advanceClip}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover object-center ${
              videoReady ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'
            }`}
          />
        )}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="animate-hero-rise relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <h1
            className="animate-hero-pop anim-delay-200 text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400 bg-clip-text text-transparent leading-tight"
            style={{ textShadow: '0 4px 20px rgba(45, 212, 191, 0.3)' }}
          >
            WHAT A RUSH!
          </h1>

          <p className="animate-hero-rise-sm anim-delay-400 text-xl md:text-3xl text-white font-light tracking-wide">
            Experience the thrill of Beachfront Horseback riding
          </p>

          <p className="animate-hero-rise-sm anim-delay-600 text-lg md:text-xl text-white/90 font-light tracking-wide mt-4">
            Scenic sugar cane fields, estuaries and guided wooded trail rides.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNextSection}
        className="animate-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm font-light tracking-wider">SCROLL</span>
          <ChevronDown className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
