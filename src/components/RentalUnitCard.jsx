import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, MapPin, DollarSign, Wifi, Zap, Home, Bitcoin, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RentalUnitCard = () => {
  const handleContact = () => {
    window.open('https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested%20in%20the%20Palapa%20Rental', '_blank');
  };

  const features = [
    { icon: Bed, text: '1 Bedroom', color: 'text-blue-600' },
    { icon: Bath, text: '1 Bathroom', color: 'text-cyan-600' },
    { icon: MapPin, text: 'Beachfront - La Libertad', color: 'text-teal-600' },
    { icon: Home, text: 'Fully Furnished', color: 'text-amber-600' },
    { icon: DollarSign, text: 'American Standard', color: 'text-green-600' },
    { icon: Wifi, text: 'Starlink Internet Included', color: 'text-indigo-600' },
    { icon: Zap, text: 'Electricity Extra', color: 'text-yellow-600' },
  ];

  const pricing = [
    { label: 'By the night', price: '$250.00 USD' },
    { label: 'By the week', price: '$1,500.00 USD' },
    { label: 'By the month', price: '$3,700.00 USD' },
  ];

  const paymentMethods = [
    { icon: Banknote, text: 'Cash', color: 'text-green-600' },
    { icon: Bitcoin, text: 'Bitcoin', color: 'text-orange-500' },
    { icon: CreditCard, text: 'Credit Card', color: 'text-blue-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-xl shadow-lg p-8 h-full w-full"
    >
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Palapa Rental
        </h3>
        <p className="text-gray-600">Your perfect beachfront retreat awaits</p>
      </div>

      {/* Short Term Pricing */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Short Term</p>
        <div className="space-y-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
          {pricing.map((tier) => (
            <div key={tier.label} className="flex justify-between items-baseline">
              <span className="text-gray-600">{tier.label}</span>
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {tier.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Long Term Pricing */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Long Term</p>
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
          <div className="flex justify-between items-baseline">
            <span className="text-gray-600">1 Year Lease</span>
            <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              $1,850.00 USD / month
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">We accept:</p>
        <div className="flex gap-4">
          {paymentMethods.map((method) => (
            <div key={method.text} className="flex items-center gap-1.5">
              <method.icon className={`w-4 h-4 ${method.color}`} />
              <span className="text-sm font-medium text-gray-700">{method.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-3 text-gray-700"
          >
            <feature.icon className={`w-5 h-5 ${feature.color}`} />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="border-t pt-6 mb-6">
        <p className="text-gray-600 mb-2">Contact:</p>
        <p className="text-xl font-semibold text-gray-800">Shawn Burke</p>
      </div>

      <Button
        onClick={handleContact}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Contact for Details
      </Button>
    </motion.div>
  );
};

export default RentalUnitCard;
