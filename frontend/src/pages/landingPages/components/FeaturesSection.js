import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

const FeaturesSection = ({ features }) => {
  return (
    <section className="border-b-8 border-pink-500 py-20 md:py-28 min-h-screen flex flex-col justify-center bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400 rounded-full opacity-30 blur-2xl animate-bounce"></div>
      <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-purple-300 rounded-full opacity-25 blur-xl animate-ping"></div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/20 rounded-3xl shadow-2xl backdrop-blur-xl p-8 text-5xl md:text-6xl font-extrabold mb-10 text-purple-900 drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">✨ Our Amazing Games 🎮</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white/20 rounded-2xl shadow-xl backdrop-blur-xl p-6 text-xl md:text-2xl mb-16 text-purple-800 leading-relaxed font-medium"
        >
          Fun, educational, and entertaining games that spark creativity and foster learning!
        </motion.p>

        {/* Feature Cards Grid with staggered animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.07, 
                transition: { duration: 0.3 },
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="transform-gpu"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Start Playing Now!
        </motion.button>
      </div>

      {/* Enhanced floating shapes */}
      <div className="absolute -top-20 right-20 w-32 h-32 bg-yellow-500 rounded-full blur-xl opacity-40 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-400 rounded-full blur-xl opacity-30 animate-bounce-slow"></div>
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-blue-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-purple-500 rounded-full blur-xl opacity-25 animate-ping"></div>
      <div className="absolute top-1/2 left-1/5 w-20 h-20 bg-orange-400 rounded-full blur-lg opacity-40 animate-bounce-slow"></div>
      <div className="absolute top-3/4 right-1/2 w-16 h-16 bg-pink-500 rounded-full blur-md opacity-30 animate-float"></div>
    </section>
  );
};

export default FeaturesSection;
