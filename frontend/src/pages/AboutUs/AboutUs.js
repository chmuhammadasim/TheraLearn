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
    <div className="min-h-screen pt-20 bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6 relative overflow-hidden">
      {/* Background Particles */}
      <motion.div
        className="absolute top-0 left-0 w-56 h-56 bg-blue-500 rounded-full opacity-30 blur-xl"
        animate={{ x: [-100, 100, -100], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-30 blur-xl"
        animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <motion.h1
        className="text-5xl font-extrabold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        About Us
      </motion.h1>

      <div className="space-y-12 max-w-5xl mx-auto relative z-10">
        {/* Section Components */}
        <AboutCard
          icon={<FaBook />}
          title="Our Vision"
          content="We strive to create a fun, engaging, and educational environment where kids can learn and grow. Our vision is to empower children with the knowledge and skills they need to succeed in life."
          color="from-red-400 to-pink-500 bg-opacity-10 bg-black"
        />
        <AboutCard
          icon={<FaChalkboardTeacher />}
          title="Our Teachers"
          content="Our teachers are passionate about education and dedicated to helping each child reach their full potential. They bring joy and excitement to the learning process."
          color="from-yellow-400 to-orange-500"
        />
        <AboutCard
          icon={<FaSmile />}
          title="Our Students"
          content="Our students are at the heart of everything we do. We believe that every child has the potential to achieve greatness, and we are committed to helping them get there."
          color="from-green-400 to-teal-500"
        />
        <AboutCard
          icon={<FaLightbulb />}
          title="Creative Learning"
          content="Creativity is at the core of our educational approach. We encourage students to think outside the box and explore new ideas through innovative projects."
          color="from-purple-400 to-indigo-500"
        />
        <AboutCard
          icon={<FaPaintBrush />}
          title="Artistic Expression"
          content="We nurture artistic talents through art, music, and drama, providing a platform for students to express themselves and develop their creativity."
          color="from-blue-400 to-cyan-500"
        />
        <AboutCard
          icon={<FaUserGraduate />}
          title="Student Achievements"
          content="Our students excel in various fields, including academics, sports, and the arts. We celebrate every achievement and encourage them to keep pushing boundaries."
          color="from-pink-400 to-red-500"
        />
      </div>
    </div>
  );
};

const AboutCard = ({ icon, title, content, color }) => (
  <motion.div
    className={`flex flex-col md:flex-row items-center bg-gradient-to-br ${color} p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 text-white`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: 'easeOut' }}
  >
    <motion.div
      className="text-6xl md:text-7xl mb-6 md:mb-0 md:mr-8"
      whileHover={{ rotate: 15 }}
      transition={{ duration: 0.5 }}
    >
      {icon}
    </motion.div>
    <div>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

export default AboutUsPage;
