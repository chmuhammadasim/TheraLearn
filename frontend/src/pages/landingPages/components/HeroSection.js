import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ title, subtitle, buttonText }) => {
  return (
    <section className="bg-gradient-to-b from-[#78e978] via-[#61e8b3] to-[#78e978] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          className="bg-[url('https://www.fmiblog.com/wp-content/uploads/2023/04/Stuffed-Plush-Toys-Market.jpg')] bg-cover bg-center h-full"
        />
      </div>

      {/* Floating Emojis for Fun */}
      <motion.div
        className="absolute top-13 left-10 text-6xl"
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        🎉
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 text-6xl"
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        🚀
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/4 text-6xl"
        animate={{ y: [0, -30, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        🌟
      </motion.div>

      {/* Floating Heart Shape */}
      <motion.div
        className="absolute top-15 right-32 text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        ❤️
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          className=" p-6 bg-black bg-opacity-20 rounded-lg text-5xl md:text-6xl font-extrabold mb-4 tracking-wide flex justify-center items-center gap-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span>🎈</span> {title} <span>✨</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 font-light"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          {subtitle} 😊
        </motion.p>

        {/* Call to Action Button with Bounce Effect */}
        <motion.a
          href="#cta"
          className="bg-gradient-to-r from-[#ff6ec7] to-[#ff4081] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-[0_0_30px_#ff6ec7] transition-transform duration-300 transform hover:scale-110"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.3 }}
        >
          {buttonText} 🚀
        </motion.a>
      </div>

      {/* Floating Background Shapes */}
      <motion.div
        className="absolute top-1/3 left-1/4 bg-[#ffdbac] w-36 h-36 rounded-full opacity-40"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 right-1/4 bg-[#9fc1ff] w-48 h-48 rounded-full opacity-30"
        animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
    </section>
  );
};

export default HeroSection;
