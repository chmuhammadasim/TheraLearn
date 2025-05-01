import React from "react";
import { motion } from "framer-motion";

const CTASection = ({ title, description, buttonText, benefits }) => {
  return (
    <section
      id="cta"
      className="border-b-8 border-orange-500 relative bg-gradient-to-bl from-[#2a2a72] via-[#009ffd] to-[#2a2a72] text-white py-20 md:py-32 min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Enhanced background pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.25) 1%, transparent 15%), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05)), linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05))",
          backgroundSize: "20px 20px, 30px 30px, 30px 30px",
          backgroundPosition: "0 0, 0 0, 15px 15px"
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      
      {/* Improved floating elements with more depth */}
      <motion.div
        className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-gradient-to-tr from-pink-500 to-yellow-300 opacity-30 rounded-full filter blur-2xl"
        animate={{ y: [0, -40, 40], x: [0, 30, -30], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-gradient-to-b from-green-400 to-blue-600 opacity-20 rounded-full filter blur-3xl"
        animate={{ x: [-30, 50, -50], y: [0, 40, -40], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-gradient-to-r from-pink-500 to-yellow-500 opacity-20 rounded-full filter blur-3xl"
        animate={{ x: [0, 120, 0], scale: [1, 1.2, 0.8, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-[380px] h-[380px] bg-gradient-to-t from-green-400 to-blue-600 opacity-25 rounded-full filter blur-2xl"
        animate={{ y: [0, -120, 0], scale: [1, 0.8, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Title & Description with improved glass morphism */}
      <div className="container mx-auto px-8 text-center z-10">
        <motion.h2
          className="p-8 bg-gradient-to-b from-[#ffffff25] to-[#ffffff08] rounded-2xl shadow-2xl backdrop-blur-xl border border-[#ffffff30] text-4xl md:text-6xl font-extrabold mb-8 tracking-wide text-shadow-lg"
          initial={{ scale: 0.7, opacity: 0, rotateX: -30 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 80px rgba(0,0,0,0.3)" }}
        >
          {title} <span className="text-yellow-400 animate-bounce inline-block">🚀</span>
        </motion.h2>
        <motion.p
          className="p-8 bg-gradient-to-b from-[#ffffff20] to-[#ffffff08] rounded-2xl shadow-2xl backdrop-blur-xl border border-[#ffffff20] text-xl md:text-2xl mb-12 font-medium max-w-4xl mx-auto text-gray-100 leading-relaxed"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          whileHover={{ scale: 1.01, boxShadow: "0 15px 60px rgba(0,0,0,0.2)" }}
        >
          {description}
        </motion.p>

        {/* Enhanced CTA Button with animated gradient and pulse effect */}
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 blur-md"
            animate={{ 
              background: [
                "linear-gradient(90deg, #9c27b0, #e91e63, #3f51b5)",
                "linear-gradient(180deg, #e91e63, #3f51b5, #9c27b0)",
                "linear-gradient(270deg, #3f51b5, #9c27b0, #e91e63)",
                "linear-gradient(0deg, #9c27b0, #e91e63, #3f51b5)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.a
            href="/signup"
            className="relative inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-xl z-10"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            animate={{ boxShadow: ["0 10px 25px rgba(0,0,0,0.2)", "0 15px 35px rgba(0,0,0,0.4)", "0 10px 25px rgba(0,0,0,0.2)"] }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced Benefits Section with improved cards */}
      <motion.div
        className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8 w-full max-w-7xl"
        initial={{ opacity: 0, rotateY: -30 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="p-8 bg-gradient-to-b from-[#ffffff20] to-[#ffffff05] rounded-2xl shadow-2xl backdrop-blur-xl border border-[#ffffff15] transform hover:scale-105 transition duration-500 relative overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              borderColor: "rgba(255,255,255,0.3)"
            }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white to-pink-500 opacity-10 rounded-xl"
              animate={{ rotateX: [0, 15, -15, 0], rotateY: [0, -5, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 to-pink-600 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <h3 className="text-2xl font-bold mb-5 text-white flex items-center">
              <span className="text-3xl mr-2 transform transition-transform duration-500 group-hover:scale-125 inline-block">
                🌟
              </span> 
              {benefit.title}
            </h3>
            <p className="text-lg text-gray-200 leading-relaxed">{benefit.description}</p>
            <motion.div 
              className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mt-6 rounded-full"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CTASection;
