import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, image, color }) => {
  return (
    <motion.div
      className="relative bg-white p-8 rounded-3xl shadow-xl overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Background gradient that appears on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Image with enhanced hover effect */}
        <motion.div className="mb-6 relative">
          <motion.div 
            className="w-28 h-28 mx-auto rounded-full border-4 border-purple-300 overflow-hidden shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          {/* Decorative ring */}
          <motion.div 
            className="absolute inset-0 border-4 border-dashed border-purple-200 rounded-full opacity-0 group-hover:opacity-100"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Icon */}
        {icon && (
          <motion.div
            className={`${color} text-5xl mb-4 mx-auto`}
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Title with underline animation */}
        <div className="relative mb-3">
          <h3 className="text-2xl font-bold text-purple-800">{title}</h3>
          <motion.div 
            className="h-1 bg-gradient-to-r from-purple-400 to-indigo-500 w-0 mx-auto mt-2 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "50%" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
        
        {/* Description with improved typography */}
        <p className="text-gray-600 font-medium leading-relaxed">{description}</p>
        
        {/* Learn more button that appears on hover */}
        <motion.button
          className="mt-5 px-4 py-2 bg-purple-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          whileHover={{ scale: 1.05, backgroundColor: "#6D28D9" }}
        >
          Learn more
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
