import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 text-white py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <motion.svg
          className="absolute -top-24 -left-24 w-1/4 opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="90" fill="#ffffff" />
        </motion.svg>
        <motion.svg
          className="absolute bottom-0 right-0 w-1/4 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="20" y="20" width="160" height="160" fill="#ffffff" />
        </motion.svg>
        <motion.svg
          className="absolute top-1/4 right-1/4 w-1/5 opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          animate={{ rotate: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="100,10 190,190 10,190" fill="#ffffff" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          {/* Logo and Brand Name */}
          <motion.div
            className="flex items-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/LOGO.png" alt="Logo" className="h-12 mr-4 rounded-full border-4 border-white shadow-lg" />
            <h1 className="text-4xl font-extrabold bg-clip-text   tracking-wide">
              TheraLearn
            </h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-8 mb-12 md:mb-0">
            <motion.a
              href="#home"
              className="text-lg font-medium bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-110"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#about"
              className="text-lg font-medium bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-110"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              About
            </motion.a>
            <motion.a
              href="#services"
              className="text-lg font-medium bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-110"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Services
            </motion.a>
            <motion.a
              href="#contact"
              className="text-lg font-medium bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-110"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.a>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <motion.p
            className="text-center mb-4 text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            &copy; {new Date().getFullYear()} <span className="font-semibold">TheraLearn</span>. All rights reserved.
          </motion.p>
          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.a
              href="https://facebook.com"
              className="text-[#3b5998] text-4xl hover:text-yellow-300 transition-transform transform hover:scale-125"
              whileHover={{ scale: 1.3, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              className="text-[#1da1f2] text-4xl hover:text-yellow-300 transition-transform transform hover:scale-125"
              whileHover={{ scale: 1.3, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              className="text-[#e4405f] text-4xl hover:text-yellow-300 transition-transform transform hover:scale-125"
              whileHover={{ scale: 1.3, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              className="text-[#0077b5] text-4xl hover:text-yellow-300 transition-transform transform hover:scale-125"
              whileHover={{ scale: 1.3, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a
              href="https://github.com"
              className="text-[#333] text-4xl hover:text-yellow-300 transition-transform transform hover:scale-125"
              whileHover={{ scale: 1.3, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
