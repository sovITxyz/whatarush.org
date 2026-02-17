import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, X, Camera, Video } from 'lucide-react';

const galleryPhotos = '/images/gallery/photos';
const galleryVideos = '/images/gallery/videos';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Spread view photos evenly throughout the shuffled gallery
function buildGallery(items) {
  const isView = (item) => item.src.toLowerCase().includes('view');
  const views = shuffle(items.filter(isView));
  const others = shuffle(items.filter((item) => !isView(item)));
  const result = [];
  const interval = Math.max(1, Math.floor(others.length / (views.length + 1)));
  let vi = 0;
  for (let i = 0; i < others.length; i++) {
    result.push(others[i]);
    if ((i + 1) % interval === 0 && vi < views.length) {
      result.push(views[vi++]);
    }
  }
  while (vi < views.length) result.push(views[vi++]);
  return result;
}

const p = galleryPhotos;
const photos = buildGallery([
  { src: `${p}/Carbonero.jpeg` },
  { src: `${p}/carb.jpeg` },
  { src: `${p}/Congrejeto1.jpeg` },
  { src: `${p}/Congrejeto2.jpeg` },
  { src: `${p}/Congrejeto3.jpeg` },
  { src: `${p}/con.jpeg` },
  { src: `${p}/view.jpeg` },
  { src: `${p}/paco2.jpeg` },
  { src: `${p}/paco3.jpeg` },
  { src: `${p}/view1.jpeg` },
  { src: `${p}/Tequilla.jpeg` },
  { src: `${p}/Tequilla2.jpeg` },
  { src: `${p}/tiq.jpeg` },
  { src: `${p}/tiqwthall.jpeg` },
  { src: `${p}/view2.jpeg` },
  { src: `${p}/Victorioso.jpeg` },
  { src: `${p}/Victorioso2.jpeg` },
  { src: `${p}/vic.jpeg` },
  { src: `${p}/all.jpeg` },
  { src: `${p}/all2.jpeg` },
  { src: `${p}/riding3 view.jpeg` },
  { src: `${p}/view3.jpeg` },
  { src: `${p}/riding1.jpeg` },
  { src: `${p}/riding2.jpeg` },
  { src: `${p}/riding1-b.jpeg` },
  { src: `${p}/riding2-b.jpeg` },
  { src: `${p}/riding6.jpeg` },
  { src: `${p}/riding4 view.jpeg` },
  { src: `${p}/riding7.jpeg` },
  { src: `${p}/riding8.jpeg` },
  { src: `${p}/riding11.jpeg` },
  { src: `${p}/view4.jpeg` },
  { src: `${p}/riding14.jpeg` },
  { src: `${p}/riding16.jpeg` },
  { src: `${p}/riding17.jpeg` },
  { src: `${p}/riding5 view.jpeg` },
  { src: `${p}/riding18.jpeg` },
  { src: `${p}/riding19.jpeg` },
  { src: `${p}/riding20.jpeg` },
  { src: `${p}/view5.jpeg` },
  { src: `${p}/riding21.jpeg` },
  { src: `${p}/riding22.jpeg` },
  { src: `${p}/riding23.jpeg` },
  { src: `${p}/view6.jpeg` },
  { src: `${p}/riding24.jpeg` },
  { src: `${p}/riding25.jpeg` },
  { src: `${p}/riding26.jpeg` },
  { src: `${p}/view7.jpeg` },
  { src: `${p}/riding27.jpeg` },
  { src: `${p}/tack.jpeg` },
  { src: `${p}/tack1.jpeg` },
  { src: `${p}/view8.jpeg` },
  { src: `${p}/tack2.jpeg` },
  { src: `${p}/tack3.jpeg` },
  { src: `${p}/tack4.jpeg` },
  { src: `${p}/view9.jpeg` },
  { src: `${p}/tack5.jpeg` },
  { src: `${p}/tack7.jpeg` },
]);

const v = galleryVideos;
const videos = [
  { src: `${v}/beachride.mp4` },
  { src: `${v}/video1.mov` },
  { src: `${v}/video2.MP4` },
  { src: `${v}/video3.mp4` },
  { src: `${v}/ridingvideo1.mp4` },
  { src: `${v}/ridingvideo2.mp4` },
  { src: `${v}/ridingvideo3.mp4` },
  { src: `${v}/ridingvideo4.mp4` },
  { src: `${v}/ridingvideo5.mp4` },
  { src: `${v}/ridingvideo6.mp4` },
  { src: `${v}/ridingvideo7.mp4` },
  { src: `${v}/shakey-video1.MP4` },
  { src: `${v}/shakey-video2.mp4` },
];

const GalleryCarousel = ({ items, type }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thumbsRef = useRef(null);
  const thumbRefs = useRef([]);
  const isFirstRender = useRef(true);
  const mainVideoRef = useRef(null);
  const touchStartX = useRef(null);
  const sectionRef = useRef(null);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause video when scrolled away
  useEffect(() => {
    if (!isVisible && mainVideoRef.current && type === 'video') {
      mainVideoRef.current.pause();
    }
  }, [isVisible, type]);

  useEffect(() => {
    setCurrent(0);
    setFullscreen(false);
    isFirstRender.current = true;
  }, [type]);

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

  // Auto-slideshow for photos only, disabled in fullscreen or when not visible
  useEffect(() => {
    if (type !== 'image' || fullscreen || !isVisible) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [type, fullscreen, isVisible, items.length]);

  const openFullscreen = useCallback(() => {
    if (mainVideoRef.current) mainVideoRef.current.pause();
    setFullscreen(true);
  }, []);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  }, [goNext, goPrev]);

  const item = items[current];

  return (
    <div ref={sectionRef}>
      {/* Slideshow */}
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black aspect-[3/4] md:aspect-video">
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
              {type === 'video' ? (
                <video
                  ref={mainVideoRef}
                  key={item.src}
                  src={item.src}
                  controls
                  playsInline
                  preload="none"
                  autoPlay={isVisible}
                  onEnded={goNext}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={item.src}
                  alt=""
                  onClick={openFullscreen}
                  className="w-full h-full object-contain cursor-pointer"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Counter overlaid top-right */}
          <div className="absolute top-3 right-3 z-10 bg-black/50 text-white/80 text-xs px-2.5 py-1 rounded-full">
            {current + 1} / {items.length}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 transition-all text-amber-700 hover:text-amber-900"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 transition-all text-amber-700 hover:text-amber-900"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div ref={thumbsRef} className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {items.map((m, i) => (
          <button
            key={i}
            ref={(el) => { thumbRefs.current[i] = el; }}
            onClick={() => goTo(i)}
            className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === current ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {type === 'video' ? (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
            ) : (
              <img src={m.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen overlay (images only) */}
      {fullscreen && type === 'image' && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm z-10">
            {current + 1} / {items.length}
          </p>

          <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={item.src}
              alt=""
              className="max-w-full max-h-full object-contain cursor-pointer"
              onClick={() => setFullscreen(false)}
            />
          </div>

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
    </div>
  );
};

const HorseGallery = () => {
  const [tab, setTab] = useState('photos');

  return (
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

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTab('photos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
              tab === 'photos'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-amber-50 shadow'
            }`}
          >
            <Camera className="w-5 h-5" />
            Photos
          </button>
          <button
            onClick={() => setTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
              tab === 'videos'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-amber-50 shadow'
            }`}
          >
            <Video className="w-5 h-5" />
            Videos
          </button>
        </div>

        {tab === 'photos' ? (
          <GalleryCarousel items={photos} type="image" />
        ) : (
          <GalleryCarousel items={videos} type="video" />
        )}
      </div>
    </section>
  );
};

export default HorseGallery;
