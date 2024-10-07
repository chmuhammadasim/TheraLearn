import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, image, color }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center transform hover:-translate-y-2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with hover zoom effect */}
      <motion.img
        className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-purple-300"
        src={image}
        alt={title}
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        transition={{ duration: 0.4 }}
      />

      {/* Icon with animation */}
      <motion.div
        className={`${color} text-6xl mb-4`}
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 360 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* {icon} */}
      </motion.div>

      {/* Title and description */}
      <h3 className="text-2xl font-bold mb-2 text-purple-700">{title}</h3>
      <p className="text-gray-600 font-medium">{description}</p>

      {/* Floating effect for entire card */}
      <motion.div
        className="absolute inset-0 rounded-xl border-4 border-dotted border-yellow-400 opacity-50"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureCard;
