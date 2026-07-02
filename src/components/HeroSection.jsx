import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { randomHeroPreview } from '@/lib/galleryMedia';

const HeroSection = () => {
  // A different short clip on every page load, stable within a render.
  const [previewSrc] = useState(() => randomHeroPreview());
  // Mount the video only after the page has fully loaded so it never competes
  // with the hero image / critical assets. Skipped during build-time
  // prerendering (window.__PRERENDER__) so the snapshot stays hydratable.
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    if (document.readyState === 'complete') {
      setShowVideo(true);
      return undefined;
    }
    const onLoad = () => setShowVideo(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const scrollToNextSection = () => {
    const horseSection = document.getElementById('horse-riding');
    if (horseSection) {
      horseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const gallery = document.getElementById('horse-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source srcSet="/images/hero-background.webp" type="image/webp" />
          <img
            src="/images/hero-background.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Glassmorphism Container */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent leading-tight"
            style={{ textShadow: '0 4px 20px rgba(251, 191, 36, 0.3)' }}
          >
            WHAT A RUSH!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-white font-light tracking-wide"
          >
            Experience the thrill of Beachfront Horseback riding
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 font-light tracking-wide mt-4"
          >
            Scenic sugar cane fields, estuaries and guided wooded trail rides.
          </motion.p>

          {/* Live video preview — a random short clip each visit */}
          <motion.button
            type="button"
            onClick={scrollToGallery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="group relative mt-8 mx-auto block w-full max-w-[16rem] md:max-w-xs aspect-video overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/40 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Watch a riding video preview and open the gallery"
          >
            {showVideo ? (
              <video
                src={previewSrc}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-900/30 via-black/40 to-black/60 animate-pulse" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 text-white/90 text-xs md:text-sm font-light tracking-wide pointer-events-none">
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span>
                Straight from the trail
                <span className="text-amber-300 group-hover:text-amber-200 transition-colors"> — see the gallery</span>
              </span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/80 text-sm font-light tracking-wider">SCROLL</span>
          <ChevronDown className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
        </div>
      </motion.button>
    </section>
  );
};

export default HeroSection;