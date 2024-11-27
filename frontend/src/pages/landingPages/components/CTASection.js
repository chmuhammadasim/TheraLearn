import React from "react";
import { motion } from "framer-motion";

const CTASection = ({ title, description, buttonText, benefits }) => {
  return (
    <section
      id="cta"
      className="border-b-8 border-orange-500 relative bg-gradient-to-bl from-[#2a2a72] via-[#009ffd] to-[#2a2a72] text-white py-20 md:py-32 min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 1%, transparent 20%)",
          backgroundSize: "20px 20px",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      {/* Floating Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-gradient-to-tr from-pink-500 to-yellow-300 opacity-30 rounded-full filter blur-2xl"
        animate={{ y: [0, -30, 30], x: [0, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-gradient-to-b from-green-400 to-blue-600 opacity-20 rounded-full filter blur-3xl"
        animate={{ x: [-20, 40, -40], y: [0, 30, -30] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-20 rounded-full filter blur-3xl"
        animate={{ x: [0, 100, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-t from-green-400 to-blue-600 opacity-30 rounded-full filter blur-2xl"
        animate={{ y: [0, -100, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      {/* Title & Description */}
      <div className="container mx-auto px-8 text-center z-10">
        <motion.h2
          className="p-8 bg-gradient-to-b from-[#ffffff1a] to-[#ffffff08] rounded-2xl shadow-xl backdrop-blur-xl text-4xl md:text-6xl font-extrabold mb-8 tracking-wide text-shadow-md"
          initial={{ scale: 0.7, opacity: 0, rotateX: -30 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
        >
          {title} <span className="text-yellow-400">🚀</span>
        </motion.h2>
        <motion.p
          className="p-8 bg-gradient-to-b from-[#ffffff1a] to-[#ffffff08] rounded-2xl shadow-xl backdrop-blur-xl text-2xl md:text-2xl mb-10 font-medium max-w-4xl mx-auto text-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.a
          href="#contact"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-16 py-6 rounded-full text-lg font-bold shadow-xl hover:shadow-3xl transform transition-all duration-500 hover:scale-125 hover:rotate-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {buttonText}
        </motion.a>
      </div>

      {/* Benefits Section */}
      <motion.div
        className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8"
        initial={{ opacity: 0, rotateY: -30 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="p-8 bg-gradient-to-b from-[#ffffff1a] to-[#ffffff08] rounded-2xl shadow-xl backdrop-blur-xl transform hover:scale-105 hover:rotate-2 transition duration-500 relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-tr from-yellow-400 to-pink-500 opacity-10 rounded-xl shadow-2xl"
              animate={{ rotateX: [0, 15, -15, 0], rotateY: [0, -5, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            ></motion.div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
              🌟 {benefit.title}
            </h3>
            <p className="text-base text-gray-200">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CTASection;
