import { motion } from 'framer-motion';

const MeetTheOwners = () => {
  return (
    <section id="meet-the-owners" className="py-16 px-4 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Meet the Owners
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Shawn and D'Arcy Burke with over 30 years of Horsemanship Experience and Training
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="/images/added/shawn&Darcy.jpeg"
              alt="Shawn and D'Arcy"
              className="w-full h-[464px] object-cover object-top"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="/images/added2/cowboyandcowgirl.jpeg"
              alt="Shawn and D'Arcy — Cowboy and Cowgirl"
              className="w-full h-[464px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheOwners;
