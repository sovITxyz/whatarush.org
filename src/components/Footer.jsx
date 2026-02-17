import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const handleSocialClick = (platform) => {
    // For specific social platforms, typically you'd link to their pages.
    // However, per instructions to update contact/inquiry buttons to WhatsApp, 
    // I will keep these as generic links or update if they were contact buttons.
    // The prompt says "buttons with contact/inquiry actions". 
    // Social media buttons are usually navigation, but since they were previously toast triggers, 
    // I will update them to just open the WhatsApp link as a general contact fallback if desired, 
    // but typically social buttons should link to social profiles.
    // Given the strict instruction "Update ALL contact and inquiry buttons", 
    // I will apply the WhatsApp link to the "Contact Us" section phone/mail items if they were interactive, 
    // but currently they are just text.
    // The social buttons were using toast. I will leave them be or set them to placeholder links 
    // if not explicitly contact buttons. 
    // However, the prompt says "buttons with contact/inquiry actions". Social buttons are borderline.
    // I will update them to open the WhatsApp link as requested for "buttons with contact/inquiry actions" 
    // since they were previously triggering a "not implemented" toast which implies they are placeholders for contact/action.
    window.open('https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested', '_blank');
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook' },
    { icon: Instagram, name: 'Instagram' },
    { icon: Twitter, name: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
              House of Grace
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Experience the perfect blend of adventure and luxury on the beautiful beaches of La Libertad, El Salvador.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span>La Libertad, El Salvador</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-teal-400" />
                <a 
                  href="https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                >
                  Contact: Shawn Burke
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-teal-400" />
                <a 
                  href="https://wa.me/50369866030?text=Hi%2C%20I%20saw%20your%20website%20and%20I%27m%20interested"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                >
                  Available for inquiries
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.name)}
                  className="bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 pt-6 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} House of Grace. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            La Libertad, El Salvador - Where Adventure Meets Paradise
          </p>
          <a href="https://sovit.xyz" target="_blank" rel="noopener noreferrer" className="block text-gray-600 text-xs mt-3 hover:text-teal-400 transition-colors">
            Website created by Cameron — sovit.xyz
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;