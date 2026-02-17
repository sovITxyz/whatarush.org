import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GoogleReview = () => {
  const reviewUrl = 'https://www.google.com/maps/place/What+a+RUSH+Riding+stables./@13.4353125,-89.1872656,15z/data=!4m6!3m5!1s0x8f7ccf0002a7f95f:0xbbe2eba9bd437ed7!8m2!3d13.4353125!4d-89.1872656!16s%2Fg%2F11ysmhp_w6!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D';

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Love Your Experience?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Leave us a review on Google.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-xl mb-8"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15522.526557165196!2d-89.1873645!3d13.4351132!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7ccf0002a7f95f%3A0xbbe2eba9bd437ed7!2sWhat%20a%20RUSH%20Riding%20stables.!5e0!3m2!1ses-419!2ssv!4v1771340829721!5m2!1ses-419!2ssv"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="What A Rush Riding Stables on Google Maps"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <Button
            onClick={() => window.open(reviewUrl, '_blank')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <Star className="w-5 h-5 mr-2 fill-white" />
            Write a Google Review
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReview;
