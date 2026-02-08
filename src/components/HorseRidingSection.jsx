import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HorseCard from './HorseCard';
import { Button } from '@/components/ui/button';

const horses = [
  {
    name: 'Paco',
    image: '/images/horses/paco.jpeg',
    story: 'A gentle gaited Peruvian Horse with a heart of a champion. Paco offers a smooth, almost hover craft like, ride over the terrain. Perfect for intermediate or first time riders. Paco will make you passionate about riding because he is a pure joy to ride.'
  },
  {
    name: 'Congrejeto',
    image: '/images/horses/congrejeto.jpeg',
    story: 'An elegant strides Freshian Horse. This species is known for their Knights in Shining Armor. They are the most handsome of Horses. Gentle and patient- ideal for beginners and intermediate riders. Calm demeanor, safe and confident riding experience.'
  },
  {
    name: 'Tequilla',
    image: '/images/horses/tequilla.jpeg',
    story: 'A spanish gaited horse with spirit and endurance. He is bold, beautiful with flowing mane and best suited for experienced equestrians who have practiced harmony with horses and who enjoy the thrill of the ride.'
  },
  {
    name: 'Victorioso',
    image: '/images/horses/victorioso.png',
    story: 'Known for his power and fluid grace. He combines strength with elegance like poetry in motion. This magnificent horse is perfect for riders seeking adventure and a rewarding experience as you connect with nature and beauty.'
  },
  {
    name: 'Carbonero',
    image: '/images/horses/carbonero.jpeg',
    story: 'Wise and experienced Spanish gaited horse. This guy offers an enjoyable nature ride on the back of a smooth operator. Carbonero is very intuitive and aware of his rider. He enjoys the ride as much as his rider does. He is steady, calm and reliable.'
  }
];

const HorseRidingSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const isExpanded = expandedIndex !== null;

  const openExpanded = useCallback((index) => {
    setDirection(0);
    setExpandedIndex(index);
  }, []);

  const closeExpanded = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setExpandedIndex((prev) => (prev === 0 ? horses.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setExpandedIndex((prev) => (prev === horses.length - 1 ? 0 : prev + 1));
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : dir < 0 ? -300 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : dir < 0 ? 300 : 0,
      opacity: 0,
    }),
  };

  return (
    <section id="horse-riding" className="py-16 px-4 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Meet Our Horses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the unique personalities and stories of our magnificent companions
          </p>
        </motion.div>

        {/* Original Grid - always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {horses.map((horse, index) => (
            <HorseCard
              key={horse.name}
              name={horse.name}
              image={horse.image}
              story={horse.story}
              index={index}
              onLearnMore={() => openExpanded(index)}
            />
          ))}
        </div>

        {/* Expanded Carousel Overlay */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              onClick={closeExpanded}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Arrow */}
                <button
                  onClick={goToPrevious}
                  className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 hover:shadow-xl transition-all duration-300 text-amber-700 hover:text-amber-900"
                  aria-label="Previous horse"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Card Content */}
                <div className="overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={expandedIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="bg-white rounded-xl shadow-2xl overflow-hidden"
                    >
                      {/* Expanded Image */}
                      <div className="relative overflow-hidden h-[450px]">
                        <img
                          src={horses[expandedIndex].image}
                          alt={`${horses[expandedIndex].name} - Beautiful horse at What A Rush Riding Stables`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                            {horses[expandedIndex].name}
                          </h3>
                        </div>
                      </div>

                      {/* Story */}
                      <div className="p-6">
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                          {horses[expandedIndex].story}
                        </p>
                        <Button
                          onClick={closeExpanded}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                        >
                          Show Less
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={goToNext}
                  className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-amber-100 hover:shadow-xl transition-all duration-300 text-amber-700 hover:text-amber-900"
                  aria-label="Next horse"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {horses.map((horse, index) => (
                    <button
                      key={horse.name}
                      onClick={() => {
                        setDirection(index > expandedIndex ? 1 : -1);
                        setExpandedIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === expandedIndex
                          ? 'bg-amber-500 scale-125'
                          : 'bg-white/60 hover:bg-white/90'
                      }`}
                      aria-label={`Go to ${horse.name}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <p className="text-center text-white/80 mt-3 text-sm">
                  {expandedIndex + 1} of {horses.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HorseRidingSection;
