import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white py-12 md:py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <motion.svg
          className="absolute top-10 left-10 w-1/3 md:w-1/4 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 350 350"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="90" fill="#ffffff" />
        </motion.svg>
        <motion.svg
          className="absolute top-6 right-6 w-1/4 md:w-1/6 opacity-15"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 350 350"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="20" y="20" width="160" height="160" fill="#ffffff" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          {/* Logo and Brand Name */}
          <motion.div
            className="flex items-center mb-6 md:mb-0"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/LOGO.png"
              alt="Logo"
              className="h-12 w-12 md:h-14 mr-4 rounded-full border-4 border-white shadow-lg"
            />
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              TheraLearn
            </h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mb-8 md:mb-0 text-center">
            {["Home", "About", "Services", "Contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-lg font-medium text-white px-4 py-2 rounded hover:bg-white hover:text-blue-600 transition-transform transform hover:scale-105"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="flex gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: FaFacebookF, color: "#3b5998", url: "https://facebook.com" },
              { icon: FaTwitter, color: "#1da1f2", url: "https://twitter.com" },
              { icon: FaInstagram, color: "#e4405f", url: "https://instagram.com" },
              { icon: FaLinkedinIn, color: "#0077b5", url: "https://linkedin.com" },
              { icon: FaGithub, color: "#333", url: "https://github.com" }
            ].map(({ icon: Icon, color, url }, idx) => (
              <motion.a
                key={idx}
                href={url}
                className={`text-2xl md:text-3xl hover:text-white transition-transform transform hover:scale-125`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  backgroundColor: color,
                  padding: '8px',
                  borderRadius: '50%',
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-center mt-8 text-xs md:text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            &copy; {new Date().getFullYear()} <span className="font-semibold">TheraLearn</span>. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
