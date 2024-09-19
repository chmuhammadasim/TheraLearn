import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ title, subtitle, buttonText }) => {
  return (
    <section className="bg-[#61d4b3] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
          className="bg-[url('https://source.unsplash.com/1600x900/?toys')] bg-cover bg-center h-full"
        />
      </div>
      {/* Floating elements for extra creativity */}
      <motion.div
        className="absolute -top-10 left-1/4 bg-[#ffdbac] w-32 h-32 rounded-full opacity-30"
        animate={{ y: [0, 400, 0] }}
        transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 left-1/2 bg-[#9fc1ff] w-32 h-32 rounded-full opacity-30"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 font-light"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {subtitle}
        </motion.p>
        <motion.a
          href="#cta"
          className="bg-[#ff347f] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-[#c9356c] transition-transform duration-300 transform hover:scale-110"
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

export default HeroSection;
