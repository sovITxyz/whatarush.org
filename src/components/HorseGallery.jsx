import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const basePath = '/images/added';

const media = [
  // Videos first
  { type: 'video', src: `${basePath}/video1.MP4` },
  { type: 'video', src: `${basePath}/video2.MP4` },
  { type: 'video', src: `${basePath}/video3.mp4` },
  // Pictures with view images spread evenly throughout
  { type: 'image', src: `${basePath}/main.jpeg` },
  { type: 'image', src: `${basePath}/Carbonero.jpeg` },
  { type: 'image', src: `${basePath}/Congrejeto1.jpeg` },
  { type: 'image', src: `${basePath}/view.jpeg` },
  { type: 'image', src: `${basePath}/Congrejeto2.jpeg` },
  { type: 'image', src: `${basePath}/Congrejeto3.jpeg` },
  { type: 'image', src: `${basePath}/paco2.jpeg` },
  { type: 'image', src: `${basePath}/view1.jpeg` },
  { type: 'image', src: `${basePath}/paco3.jpeg` },
  { type: 'image', src: `${basePath}/paco-barbedwire.jpeg` },
  { type: 'image', src: `${basePath}/Tequilla.jpeg` },
  { type: 'image', src: `${basePath}/view2.jpeg` },
  { type: 'image', src: `${basePath}/Tequilla2.jpeg` },
  { type: 'image', src: `${basePath}/Victorioso.jpeg` },
  { type: 'image', src: `${basePath}/Victorioso2.jpeg` },
  { type: 'image', src: `${basePath}/riding3 view.jpeg` },
  { type: 'image', src: `${basePath}/shawn&Darcy.jpeg` },
  { type: 'video', src: `${basePath}/beachride.mov` },
  { type: 'image', src: `${basePath}/sign.jpeg` },
  { type: 'image', src: `${basePath}/view3.jpeg` },
  { type: 'image', src: `${basePath}/riding1.jpeg` },
  { type: 'image', src: `${basePath}/riding2.jpeg` },
  { type: 'image', src: `${basePath}/riding6.jpeg` },
  { type: 'image', src: `${basePath}/riding4 view.jpeg` },
  { type: 'image', src: `${basePath}/riding7.jpeg` },
  { type: 'image', src: `${basePath}/riding8.jpeg` },
  { type: 'image', src: `${basePath}/riding11.jpeg` },
  { type: 'image', src: `${basePath}/view4.jpeg` },
  { type: 'image', src: `${basePath}/riding14.jpeg` },
  { type: 'image', src: `${basePath}/riding16.jpeg` },
  { type: 'image', src: `${basePath}/riding17.jpeg` },
  { type: 'image', src: `${basePath}/riding5 view.jpeg` },
  { type: 'image', src: `${basePath}/riding18.jpeg` },
  { type: 'image', src: `${basePath}/riding19.jpeg` },
  { type: 'image', src: `${basePath}/riding20.jpeg` },
  { type: 'image', src: `${basePath}/view5.jpeg` },
  { type: 'image', src: `${basePath}/riding21.jpeg` },
  { type: 'image', src: `${basePath}/riding22.jpeg` },
  { type: 'image', src: `${basePath}/riding23.jpeg` },
  { type: 'image', src: `${basePath}/view6.jpeg` },
  { type: 'image', src: `${basePath}/riding24.jpeg` },
  { type: 'image', src: `${basePath}/riding25.jpeg` },
  { type: 'image', src: `${basePath}/riding26.jpeg` },
  { type: 'image', src: `${basePath}/view7.jpeg` },
  { type: 'image', src: `${basePath}/riding27.jpeg` },
  { type: 'image', src: `${basePath}/tack.jpeg` },
  { type: 'image', src: `${basePath}/tack1.jpeg` },
  { type: 'image', src: `${basePath}/view8.jpeg` },
  { type: 'image', src: `${basePath}/tack2.jpeg` },
  { type: 'image', src: `${basePath}/tack3.jpeg` },
  { type: 'image', src: `${basePath}/tack4.jpeg` },
  { type: 'image', src: `${basePath}/view9.jpeg` },
  { type: 'image', src: `${basePath}/tack5.jpeg` },
  { type: 'image', src: `${basePath}/tack7.jpeg` },
  // Shakey videos last
  { type: 'video', src: `${basePath}/shakey-video1.MP4` },
  { type: 'video', src: `${basePath}/shakey-video2.mp4` },
];

const MediaItem = ({ item, onClick, className, videoRef }) => {
  if (item.type === 'video') {
    return (
      <video
        ref={videoRef}
        key={item.src}
        src={item.src}
        controls
        playsInline
        onClick={onClick}
        className={className}
      />
    );
  }
  return (
    <img
      src={item.src}
      alt=""
      onClick={onClick}
      className={`${className} cursor-pointer`}
    />
  );
};

const HorseGallery = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbsRef = useRef(null);
  const thumbRefs = useRef([]);
  const isFirstRender = useRef(true);
  const mainVideoRef = useRef(null);

  // Auto-scroll thumbnail strip to keep active thumb visible (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const thumb = thumbRefs.current[current];
    if (thumb && thumbsRef.current) {
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [current]);

  const openFullscreen = useCallback(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.pause();
    }
    setFullscreen(true);
  }, []);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  }, []);

  const item = media[current];

  return (
    <>
      <section id="horse-gallery" className="py-16 px-4 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our horses, rides, and beautiful surroundings
            </p>
          </motion.div>

          {/* Slideshow */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black aspect-video">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full h-full"
                >
                  <MediaItem
                    item={item}
                    onClick={item.type === 'video' ? undefined : openFullscreen}
                    videoRef={mainVideoRef}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 transition-all text-amber-700 hover:text-amber-900"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 transition-all text-amber-700 hover:text-amber-900"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Counter */}
          <p className="text-center text-gray-500 mt-4 text-sm">
            {current + 1} / {media.length}
          </p>

          {/* Thumbnail strip */}
          <div ref={thumbsRef} className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {media.map((m, i) => (
              <button
                key={i}
                ref={(el) => { thumbRefs.current[i] = el; }}
                onClick={() => goTo(i)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {m.type === 'video' ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <img src={m.src} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen overlay (images only) */}
      {fullscreen && item.type !== 'video' && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {current + 1} / {media.length}
          </p>

          {/* Content */}
          <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {item.type === 'video' ? (
              <video
                key={item.src}
                src={item.src}
                controls
                playsInline
                autoPlay
                className="max-w-full max-h-full object-contain"
                onClick={() => setFullscreen(false)}
              />
            ) : (
              <img
                src={item.src}
                alt=""
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={() => setFullscreen(false)}
              />
            )}
          </div>

          {/* Fullscreen arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      )}
    </>
  );
};

export default HorseGallery;
