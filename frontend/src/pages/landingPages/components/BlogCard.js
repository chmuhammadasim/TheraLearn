import React from 'react';
import { motion } from 'framer-motion';

const BlogCard = ({ icon, title, summary, image }) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0], transition: { duration: 0.6 } }}
      style={{ border: '3px solid white' }}
    >
      {/* Decorative floating shapes */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full animate-bounce"></div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-400 rounded-full animate-pulse"></div>


      {/* Icon in playful colors */}
      <div className="text-6xl mb-4 text-yellow-500">{icon}</div>

      {/* Title with colorful playful font */}
      <h3 className="text-2xl font-extrabold mb-2 text-purple-800" style={{ fontFamily: 'Comic Sans MS, sans-serif' }}>
        {title}
      </h3>

      {/* Summary with bright text */}
      <p className="text-lg text-white font-semibold">{summary}</p>
    </motion.div>
  );
};

export default BlogCard;
