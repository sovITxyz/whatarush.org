import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import RentalUnitCard from './RentalUnitCard';
import PropertyGallery from './PropertyGallery';
import { Button } from '@/components/ui/button';

const AvailableUnitsSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo]);

  const handleBooking = () => {
    window.open('https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested', '_blank');
  };

  return (
    <section id="available-units" className="py-16 px-4 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent">
            Palapa Rental
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your perfect beachfront retreat in La Libertad, El Salvador
          </p>
          <motion.button
            onClick={() => setShowVideo(true)}
            animate={{ scale: [1, 1.16, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-4 inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-[22px] transition-colors duration-300"
          >
            <Play className="w-5 h-5 fill-current" />
            Watch Video Tour
          </motion.button>
        </motion.div>

        {/* Fullscreen video overlay */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
              onClick={() => setShowVideo(false)}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                <video
                  ref={videoRef}
                  src="/images/property-video/palaparental.mp4"
                  controls
                  playsInline
                  preload="none"
                  autoPlay
                  onEnded={() => setShowVideo(false)}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative mb-0 lg:mb-0">
          {/* Left: Rental Details - determines container height */}
          <div className="lg:w-1/2">
            <RentalUnitCard />
          </div>

          {/* Right: Property Gallery - constrained to card height, scrolls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-4 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-1/2"
          >
            <PropertyGallery />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AvailableUnitsSection;