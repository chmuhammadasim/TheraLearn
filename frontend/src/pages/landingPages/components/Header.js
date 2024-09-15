import React from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaPuzzlePiece,
  FaRobot,
  FaGamepad,
  FaAppleAlt,
  FaCat,
  FaRegSmileBeam,
  FaMusic,
} from "react-icons/fa";

const MainPage = () => {
  return (
    <div className="bg-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-[#61d4b3] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            className="bg-[url('https://source.unsplash.com/1600x900/?toys')] bg-cover bg-center h-full"
          />
        </div>
        <motion.div
          className="absolute -top-10 left-1/4 bg-[#ffdbac] w-32 h-32 rounded-full opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 bg-[#ffd1a5] w-20 h-20 rounded-full opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to MyApp
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 font-light"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Your one-stop solution for all your needs
          </motion.p>
          <motion.a
            href="#cta"
            className="bg-[#ff347f] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-[#c9356c] transition-transform duration-300 transform hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            Get Started
          </motion.a>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center bg-gradient-to-r from-white via-gray-100 to-white relative">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Amazing Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaRocket />}
              title="Fast Performance"
              description="Boost your workflow with lightning-fast speeds."
              image="https://source.unsplash.com/100x100/?rocket"
              color="text-[#61d4b3]"
            />
            <FeatureCard
              icon={<FaPuzzlePiece />}
              title="Customizable"
              description="Easily adapt features to suit your preferences."
              image="https://source.unsplash.com/100x100/?puzzle"
              color="text-[#fdd365]"
            />
            <FeatureCard
              icon={<FaRobot />}
              title="Automation"
              description="Smart tools to automate your tasks."
              image="https://source.unsplash.com/100x100/?robot"
              color="text-[#fb8d62]"
            />
            <FeatureCard
              icon={<FaGamepad />}
              title="Interactive UI"
              description="Engage with an immersive and fun UI."
              image="https://source.unsplash.com/100x100/?gamepad"
              color="text-[#fd2eb3]"
            />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section
        id="cta"
        className="bg-[#ff347f] text-white py-16 md:py-24 min-h-screen flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
            className="bg-[url('https://source.unsplash.com/1600x900/?fun')] bg-cover bg-center h-full"
          />
        </div>
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 font-light"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Join us today and experience the best of our services.
          </motion.p>
          <motion.a
            href="#contact"
            className="bg-[#fdd365] text-[#61d4b3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#fbbf2d] transition-transform duration-300 transform hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            Sign Up Now
          </motion.a>
        </div>
      </section>
      {/* Blog Section */}
      <section className="py-16 md:py-24 min-h-screen flex flex-col justify-center bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            From Our Blog
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <BlogCard
              icon={<FaAppleAlt />}
              title="Healthy Lifestyle"
              summary="Tips for maintaining a healthy diet."
              image="https://source.unsplash.com/100x100/?apple"
            />
            <BlogCard
              icon={<FaCat />}
              title="Pet Care"
              summary="How to take care of your furry friends."
              image="https://source.unsplash.com/100x100/?cat"
            />
            <BlogCard
              icon={<FaRegSmileBeam />}
              title="Mental Wellbeing"
              summary="Strategies to boost your mental health."
              image="https://source.unsplash.com/100x100/?smile"
            />
            <BlogCard
              icon={<FaMusic />}
              title="Musical Journey"
              summary="Discover the joys of learning music."
              image="https://source.unsplash.com/100x100/?music"
            />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

const FeatureCard = ({ icon, title, description, image, color }) => {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg hover
              transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {" "}
      <div className="text-5xl mb-4" style={{ color }}>
        {icon}
      </div>{" "}
      <h3 className="text-xl font-bold mb-2">{title}</h3>{" "}
      <p className="text-gray-600 mb-4">{description}</p>{" "}
    </motion.div>
  );
};

const BlogCard = ({ icon, title, summary, image }) => {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg hover
              transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {" "}
      <img src={image} alt={title} className="mb-4 rounded-lg" />{" "}
      <h3 className="text-xl font-bold mb-2">{title}</h3>{" "}
      <p className="text-gray-600 mb-4">{summary}</p>{" "}
    </motion.div>
  );
};

export default MainPage;
