import React from "react";
import { motion } from "framer-motion";

const CTASection = ({ title, description, buttonText, benefits }) => {
  return (
    <section
      id="cta"
      className="border-b-8 border-lime-500 relative bg-gradient-to-t from-[rgb(89,207,192)] via-[#7079ff] to-[rgb(89,207,192)] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Animated Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-64 h-64 bg-[#fdd365] opacity-20 rounded-full filter blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#61d4b3] opacity-20 rounded-full filter blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      {/* Content Container */}
      <div className="container mx-auto px-6 text-center z-10">
        <motion.h2
          className=" p-6 bg-white bg-opacity-15 rounded-full text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex items-center justify-center gap-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>🚀</span> {title} <span>✨</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 font-light"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {description} 😊
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#contact"
          className="inline-block bg-gradient-to-r from-[#fdd365] to-[#ffae34] text-[#ff347f] px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-[0_0_20px_#ffae34] transition-transform duration-300 transform hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          {buttonText} 💥
        </motion.a>

        {/* Benefits Section */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white bg-opacity-10 rounded-lg shadow-lg hover:bg-opacity-20 transition duration-300 hover:scale-105 cursor-pointer"
              whileHover={{ rotate: [0, 2, -2, 0], scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                🌟 {benefit.title}
              </h3>
              <p className="text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
