import React from "react";
import { motion } from "framer-motion";

const CTASection = ({ title, description, buttonText }) => {
  return (
    <section
      id="cta"
      className="bg-[#ff347f] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 font-light"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {description}
        </motion.p>
        <motion.a
          href="#contact"
          className="bg-[#fdd365] text-[#61d4b3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fbbf2d] transition-transform duration-300 transform hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.3 }}
        >
          {buttonText}
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;
