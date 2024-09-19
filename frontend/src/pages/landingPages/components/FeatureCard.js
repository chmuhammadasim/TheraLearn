import React from 'react';
import { motion } from 'framer-motion';
const FeatureCard = ({ icon, title, description, image, color }) => {
    return (
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg hover transition-shadow duration-300 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {" "}
        <motion.img
          className="w-20 h-20 mx-auto mb-4"
          src={image}
          alt={title}
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />{" "}
        <div className={`${color} text-5xl mb-4`}>{icon}</div>{" "}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>{" "}
        <p className="text-gray-700">{description}</p>{" "}
      </motion.div>
    );
  };
    export default FeatureCard;
  