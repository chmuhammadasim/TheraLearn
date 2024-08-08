import React from 'react';
import { motion } from 'framer-motion';
import {
  FaRocket,
  FaPuzzlePiece,
  FaRobot,
  FaGamepad,
  FaAppleAlt,
  FaCat ,
  FaRegSmileBeam ,
  FaStar,
  FaMusic,
  FaGlobeAmericas,
  FaBook,
} from 'react-icons/fa';

const MainPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-[#61d4b3] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
            className="bg-[url('https://source.unsplash.com/1600x900/?toys')] bg-cover bg-center h-full"
          />
        </div>
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to MyApp
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Your one-stop solution for all your needs.
          </motion.p>
          <motion.a
            href="#cta"
            className="bg-[#ff347f] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#c9356c] transition"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Get Started
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Features
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaRocket className="text-5xl mb-4 text-[#61d4b3]" />
              <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
              <p className="text-gray-700 mb-4">Description of Feature 1. It provides this and that.</p>
              <img src="https://source.unsplash.com/100x100/?rocket" alt="Illustration" className="w-24 h-24 object-cover" />
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaPuzzlePiece className="text-5xl mb-4 text-[#fdd365]" />
              <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
              <p className="text-gray-700 mb-4">Description of Feature 2. It provides this and that.</p>
              <img src="https://source.unsplash.com/100x100/?puzzle" alt="Illustration" className="w-24 h-24 object-cover" />
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaRobot className="text-5xl mb-4 text-[#fb8d62]" />
              <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
              <p className="text-gray-700 mb-4">Description of Feature 3. It provides this and that.</p>
              <img src="https://source.unsplash.com/100x100/?robot" alt="Illustration" className="w-24 h-24 object-cover" />
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaGamepad className="text-5xl mb-4 text-[#fd2eb3]" />
              <h3 className="text-xl font-semibold mb-2">Feature 4</h3>
              <p className="text-gray-700 mb-4">Description of Feature 4. It provides this and that.</p>
              <img src="https://source.unsplash.com/100x100/?gamepad" alt="Illustration" className="w-24 h-24 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-[#ff347f] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
            className="bg-[url('https://source.unsplash.com/1600x900/?fun')] bg-cover bg-center h-full"
          />
        </div>
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Join us today and experience the best of our services.
          </motion.p>
          <motion.a
            href="#contact"
            className="bg-[#fdd365] text-[#61d4b3] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#fbbf2d] transition"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Sign Up Now
          </motion.a>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            From Our Blog
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaAppleAlt className="text-5xl mb-4 text-[#61d4b3]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 1</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 1. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?apple" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog1" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaCat className="text-5xl mb-4 text-[#fdd365]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 2</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 2. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?puzzle" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog2" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaRegSmileBeam className="text-5xl mb-4 text-[#fb8d62]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 3</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 3. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?duck" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog3" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaStar className="text-5xl mb-4 text-[#fd2eb3]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 4</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 4. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?star" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog4" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaMusic className="text-5xl mb-4 text-[#fb8d62]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 5</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 5. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?music" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog5" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaGlobeAmericas className="text-5xl mb-4 text-[#61d4b3]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 6</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 6. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?globe" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog6" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2 md:w-1/4 p-6 shadow-lg bg-white rounded-lg flex flex-col items-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <FaBook className="text-5xl mb-4 text-[#fdd365]" />
              <h3 className="text-xl font-semibold mb-2">Blog Post 7</h3>
              <p className="text-gray-700 mb-4">Summary of Blog Post 7. Read more to find out.</p>
              <img src="https://source.unsplash.com/100x100/?book" alt="Illustration" className="w-24 h-24 object-cover" />
              <a href="#blog7" className="text-[#ff347f] hover:underline">Read more</a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
