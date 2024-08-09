import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 relative overflow-hidden">
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
            <img src="https://via.placeholder.com/150x50?text=MyApp" alt="Logo" className="h-12 mr-4" />
            <h1 className="text-3xl font-bold">MyApp</h1>
          </motion.div>
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 md:mb-0">
            <motion.a
              href="#home"
              className="text-lg text-[#ff6f61] hover:text-[#f9b248] transition-transform transform hover:scale-110"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#about"
              className="text-lg text-[#ff6f61] hover:text-[#f9b248] transition-transform transform hover:scale-110"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              About
            </motion.a>
            <motion.a
              href="#services"
              className="text-lg text-[#ff6f61] hover:text-[#f9b248] transition-transform transform hover:scale-110"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#contact"
              className="text-lg text-[#ff6f61] hover:text-[#f9b248] transition-transform transform hover:scale-110"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Contact
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
            &copy; {new Date().getFullYear()} <span className="font-semibold">MyApp</span>. All rights reserved.
          </motion.p>
          <motion.div
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <a href="https://facebook.com" className="text-[#3b5998] text-3xl hover:text-[#ff6f61] transition-transform transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="text-[#1da1f2] text-3xl hover:text-[#ff6f61] transition-transform transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="text-[#e4405f] text-3xl hover:text-[#ff6f61] transition-transform transform hover:scale-110">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="text-[#0077b5] text-3xl hover:text-[#ff6f61] transition-transform transform hover:scale-110">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" className="text-[#333] text-3xl hover:text-[#ff6f61] transition-transform transform hover:scale-110">
              <FaGithub />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
