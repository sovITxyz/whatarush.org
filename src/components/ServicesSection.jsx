import React from 'react';
import { motion } from 'framer-motion';
import { Heart, GraduationCap, Users, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    name: 'Guided Trail Rides',
    icon: MapPin,
    price: '$60.00',
    priceLabel: '$60.00',
    duration: '1\u00BD to 2 hour session',
    description: 'Guided trail rides through scenic sugar cane fields, estuaries, and wooded trails. Necessary tack & equipment provided.',
    color: 'from-emerald-500 to-green-500',
  },
  {
    name: 'Horse/Human Therapy Sessions',
    icon: Heart,
    price: 'custom',
    priceLabel: 'Customized Package',
    description: 'Therapeutic sessions connecting horses and humans for healing and growth. Packages built for your individual needs — contact us for details.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Horsemanship Training Lessons',
    icon: GraduationCap,
    price: 'custom',
    priceLabel: 'Customized Package',
    description: 'Learn the art of horsemanship from experienced trainers. Packages built for your individual needs — contact us for details.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Riding Lessons',
    icon: Users,
    price: 'custom',
    priceLabel: 'Customized Package',
    description: 'Structured riding lessons for all skill levels. Packages built for your individual needs — contact us for details.',
    color: 'from-teal-500 to-cyan-500',
  },
];

const ServicesSection = () => {
  const handleContact = () => {
    window.open('https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested%20in%20your%20services', '_blank');
  };

  return (
    <section id="services" className="py-16 px-4 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            We Offer
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our range of horseback experiences in beautiful El Salvador
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 h-full flex flex-col">
                <div className={`bg-gradient-to-r ${service.color} p-6 text-center`}>
                  <service.icon className="w-12 h-12 text-white mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-white">
                    {service.name}
                  </h3>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>

                  {service.duration && (
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-4">
                    {service.price !== 'custom' && <DollarSign className="w-5 h-5 text-green-600" />}
                    <span className={`text-lg font-bold ${service.price === 'custom' ? 'text-amber-600' : service.price ? 'text-green-600' : 'text-gray-400 italic'}`}>
                      {service.priceLabel}
                    </span>
                  </div>

                  <Button
                    onClick={handleContact}
                    className={`w-full bg-gradient-to-r ${service.color} text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
