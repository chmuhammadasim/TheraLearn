import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#f9b248] via-[#f8c731] to-[#fc3a52] text-white py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Brand Name */}
          <motion.div
            className="flex items-center mb-8 md:mb-0"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://via.placeholder.com/150x50?text=MyApp" alt="Logo" className="h-12 mr-4 rounded-full shadow-lg" />
            <h1 className="text-3xl font-bold flex items-center">
              MyApp <span className="ml-2">🎉</span>
            </h1>
          </motion.div>
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 md:mb-0">
            <motion.a
              href="#home"
              className="text-xl hover:text-[#0e2431] transition"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, color: '#0e2431' }}
              transition={{ duration: 0.3 }}
            >
              Home 🏠
            </motion.a>
            <motion.a
              href="#about"
              className="text-xl hover:text-[#0e2431] transition"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, color: '#0e2431' }}
              transition={{ duration: 0.3 }}
            >
              About 💡
            </motion.a>
            <motion.a
              href="#services"
              className="text-xl hover:text-[#0e2431] transition"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, color: '#0e2431' }}
              transition={{ duration: 0.3 }}
            >
              Services 🛠️
            </motion.a>
            <motion.a
              href="#contact"
              className="text-xl hover:text-[#0e2431] transition"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, color: '#0e2431' }}
              transition={{ duration: 0.3 }}
            >
              Contact 📞
            </motion.a>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <motion.p
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            &copy; {new Date().getFullYear()} MyApp. All rights reserved. ✨
          </motion.p>
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <a href="https://facebook.com" className="text-white text-3xl hover:text-[#0e2431] transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="text-white text-3xl hover:text-[#0e2431] transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-white text-3xl hover:text-[#0e2431] transition">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="text-white text-3xl hover:text-[#0e2431] transition">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" className="text-white text-3xl hover:text-[#0e2431] transition">
              <FaGithub />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0e2431] rounded-full mix-blend-multiply opacity-20 filter blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#fc3a52] rounded-full mix-blend-multiply opacity-20 filter blur-xl"></div>
      <div className="absolute top-0 left-0 w-20 h-20 bg-[#f9b248] rounded-full mix-blend-multiply opacity-20 filter blur-xl"></div>
    </footer>
  );
};

export default Footer;
