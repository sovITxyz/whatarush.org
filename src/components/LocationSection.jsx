import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationSection = ({ title, mapUrl, image }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50/30">
      <div className={image ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-amber-100"
        >
          <div className={image ? "flex flex-col md:flex-row" : ""}>
            <div className={`p-8 md:p-12 text-center bg-gradient-to-br from-amber-50 to-orange-50/50 flex flex-col items-center justify-center ${image ? "md:w-1/2" : "w-full"}`}>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-full shadow-md">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed max-w-2xl mx-auto">
                {title}
              </h2>

              <Button
                asChild
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {image && (
              <div className="md:w-1/2">
                <img
                  src={image}
                  alt="Location"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;