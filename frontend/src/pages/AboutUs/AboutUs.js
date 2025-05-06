import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaSmile, FaLightbulb, FaPaintBrush } from 'react-icons/fa';

const AboutUsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl"
        animate={{ x: [-100, 100, -100], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-60 h-60 bg-pink-500 rounded-full opacity-20 blur-3xl"
        animate={{ x: [50, -50, 50], y: [-30, 30, -30] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-green-300 rounded-full"></div>
        <div className="absolute bottom-60 left-1/4 w-5 h-5 bg-red-300 rounded-full"></div>
        <div className="absolute bottom-30 right-1/3 w-7 h-7 bg-blue-300 rounded-full"></div>
      </div>

      <motion.h1
        className="text-6xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        About Us
      </motion.h1>

      <div className="space-y-16 max-w-5xl mx-auto relative z-10">
        {/* Section Components */}
        <AboutCard
          icon={<FaBook />}
          title="Our Vision"
          content="We strive to create a fun, engaging, and educational environment where kids can learn and grow. Our vision is to empower children with the knowledge and skills they need to succeed in life."
          color="from-red-400 to-pink-500"
          delay={0.1}
        />
        <AboutCard
          icon={<FaChalkboardTeacher />}
          title="Our Teachers"
          content="Our teachers are passionate about education and dedicated to helping each child reach their full potential. They bring joy and excitement to the learning process."
          color="from-yellow-400 to-orange-500"
          delay={0.3}
        />
        <AboutCard
          icon={<FaSmile />}
          title="Our Students"
          content="Our students are at the heart of everything we do. We believe that every child has the potential to achieve greatness, and we are committed to helping them get there."
          color="from-green-400 to-teal-500"
          delay={0.5}
        />
        <AboutCard
          icon={<FaLightbulb />}
          title="Creative Learning"
          content="Creativity is at the core of our educational approach. We encourage students to think outside the box and explore new ideas through innovative projects."
          color="from-purple-400 to-indigo-500"
          delay={0.7}
        />
        <AboutCard
          icon={<FaPaintBrush />}
          title="Artistic Expression"
          content="We nurture artistic talents through art, music, and drama, providing a platform for students to express themselves and develop their creativity."
          color="from-blue-400 to-cyan-500"
          delay={0.9}
        />
        <AboutCard
          icon={<FaUserGraduate />}
          title="Student Achievements"
          content="Our students excel in various fields, including academics, sports, and the arts. We celebrate every achievement and encourage them to keep pushing boundaries."
          color="from-pink-400 to-red-500"
          delay={1.1}
        />
      </div>
    </div>
  );
};

const AboutCard = ({ icon, title, content, color, delay }) => (
  <motion.div
    className={`flex flex-col md:flex-row items-center bg-gradient-to-br ${color} p-10 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90 hover:shadow-2xl transition-all transform hover:scale-105 text-white border border-white/10`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: 'easeOut', delay }}
    whileHover={{ y: -5 }}
  >
    <motion.div
      className="text-7xl md:text-8xl mb-6 md:mb-0 md:mr-10 bg-white/10 p-6 rounded-full"
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <div className="md:ml-4">
      <h2 className="text-3xl font-bold mb-4 relative">
        {title}
        <span className="absolute -bottom-1 left-0 w-16 h-1 bg-white/60 rounded-full"></span>
      </h2>
      <p className="text-lg leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

export default AboutUsPage;
