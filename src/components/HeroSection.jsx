import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToNextSection = () => {
    const horseSection = document.getElementById('horse-riding');
    if (horseSection) {
      horseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-background.jpg)',
        }}
      >
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