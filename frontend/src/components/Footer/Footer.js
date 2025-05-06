import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: FaFacebookF,
    color: "bg-[#3b5998]",
    url: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaTwitter,
    color: "bg-[#1da1f2]",
    url: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: FaInstagram,
    color: "bg-[#e4405f]",
    url: "https://instagram.com/chmuhammadasim",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    color: "bg-[#0077b5]",
    url: "https://linkedin.com/in/muhammad-asim-chattha",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    color: "bg-[#333]",
    url: "https://github.com/chmuhammadasim",
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t-2 border-black bg-gradient-to-br from-[#f9d52385] to-[#e14fae7e] text-white py-8 md:py-16 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-60 blur-3xl"
          style={{ top: "-120px", left: "-120px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-40 blur-3xl"
          style={{ bottom: "-140px", right: "-120px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Brand Name */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/LOGO.png"
              alt="TheraLearn Logo"
              className="h-16 w-16 rounded-full border-4 border-white shadow-xl bg-white/80"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <span className="text-4xl font-extrabold tracking-wide text-slate-900 drop-shadow-lg">
              TheraLearn
            </span>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex gap-5 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map(({ icon: Icon, color, url, label }, idx) => (
              <motion.a
                key={idx}
                href={url}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group ${color} text-white text-2xl md:text-3xl p-3 md:p-4 rounded-full shadow-lg transition-transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white`}
                whileHover={{ scale: 1.2, boxShadow: "0 0 24px 8px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
                <span className="pointer-events-none absolute inset-0 rounded-full border border-white opacity-0 group-hover:opacity-100 group-hover:shadow-lg transition duration-300"></span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/30 w-full" />

        {/* Copyright */}
        <motion.p
          className="text-center text-sm md:text-lg font-medium text-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">TheraLearn</span>. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
