import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-5 md:py-16 overflow-hidden">
      {/* Rotating Background Circles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-50 blur-2xl"
          style={{ top: '-100px', left: '-100px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full opacity-50 blur-2xl"
          style={{ bottom: '-150px', right: '-100px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Brand Name */}
          <motion.div
            className="flex items-center space-x-4 mb-6 md:mb-0"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/LOGO.png"
              alt="Logo"
              className="h-14 w-14 rounded-full border-4 border-white shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
            <h1 className="text-4xl font-extrabold tracking-wide text-white">
              TheraLearn
            </h1>
          </motion.div>
        </div>

        {/* Social Icons with Glowing Effect */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            className="flex gap-6 md:gap-10"
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
                className="text-3xl md:text-4xl transition-transform transform hover:scale-125 relative group"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  backgroundColor: color,
                  padding: '10px',
                  borderRadius: '50%',
                }}
              >
                <Icon />
                {/* Glowing Effect */}
                <span className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-white transition duration-300"></span>
              </motion.a>
            ))}
          </motion.div>

          {/* Footer Text */}
          <motion.p
            className="mt-10 text-center text-sm md:text-base font-light"
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
