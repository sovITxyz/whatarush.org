import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HorseCard = ({ name, images, imgTick, story, index, onLearnMore }) => {
  const currentIndex = imgTick % images.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div onClick={onLearnMore} className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105">
        {/* Image with crossfade */}
        <div className="relative overflow-hidden h-[300px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${name} - Beautiful horse at What A Rush Riding Stables`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            {name}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-4">
            {story}
          </p>

          <Button
            onClick={onLearnMore}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HorseCard;
