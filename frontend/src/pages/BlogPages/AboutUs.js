import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaSmile, FaLightbulb, FaPaintBrush } from 'react-icons/fa';

function AboutUsPage() {
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
    <div className="min-h-screen bg-gradient-to-r from-[#f8c731] to-[#fc3a52] text-[#0e2431] p-4 md:p-6 flex flex-col items-center justify-center">
      {/* Navbar Space */}
      <div className="h-16 md:h-20"></div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-[#f9b248] rounded-full opacity-50"
        animate={{ x: [-50, 50, -50], y: [0, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-[#f9b248] rounded-full opacity-50"
        animate={{ x: [-50, 50, -50], y: [0, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      

<motion.div
        className="absolute bottom-0 right-20 w-20 h-20 md:w-32 md:h-32 bg-[#42f831] rounded-full opacity-50"
        animate={{ x: [-50, 50, 50], y: [50, -100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-8 md:mb-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        About Us
      </motion.h1>

      <div className="space-y-8 md:space-y-10 max-w-3xl mx-auto">
        {/* Educational Vision */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <FaBook className="text-[#fc3a52] text-5xl md:text-6xl mb-4 md:mb-0 md:mr-8" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Vision</h2>
            <p className="text-lg">
              We strive to create a fun, engaging, and educational environment where kids can learn and grow.
              Our vision is to empower children with the knowledge and skills they need to succeed in life.
            </p>
          </div>
        </motion.div>

        {/* Dedicated Teachers */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <FaChalkboardTeacher className="text-[#f9b248] text-5xl md:text-6xl mb-4 md:mb-0 md:mr-8" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Teachers</h2>
            <p className="text-lg">
              Our teachers are passionate about education and dedicated to helping each child reach their full potential.
              With years of experience and a love for teaching, they bring joy and excitement to the learning process.
            </p>
          </div>
        </motion.div>

        {/* Happy Students */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <FaSmile className="text-[#f8c731] text-5xl md:text-6xl mb-4 md:mb-0 md:mr-8" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Students</h2>
            <p className="text-lg">
              Our students are at the heart of everything we do. We believe that every child has the potential to achieve greatness,
              and we are committed to helping them get there with interactive lessons and engaging activities.
            </p>
          </div>
        </motion.div>

        {/* Creative Learning */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <FaLightbulb className="text-[#fc3a52] text-5xl md:text-6xl mb-4 md:mb-0 md:mr-8" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Creative Learning</h2>
            <p className="text-lg">
              Creativity is at the core of our educational approach. We encourage students to think outside the box
              and explore new ideas through innovative projects and activities.
            </p>
          </div>
        </motion.div>

        {/* Artistic Expression */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <FaPaintBrush className="text-[#f9b248] text-5xl md:text-6xl mb-4 md:mb-0 md:mr-8" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Artistic Expression</h2>
            <p className="text-lg">
              We believe in nurturing artistic talents in our students. Through art, music, and drama, we provide
              a platform for students to express themselves and develop their creativity.
            </p>
          </div>
        </motion.div>

        {/* Student Achievements */}
        <motion.div
          className="flex flex-col items-center bg-white p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <FaUserGraduate className="text-[#fc3a52] text-5xl md:text-6xl mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Student Achievements</h2>
          <p className="text-lg mb-4 text-center">
            Our students have excelled in various fields, including academics, sports, and the arts.
            We celebrate every achievement, big or small, and encourage our students to keep pushing the boundaries.
          </p>
          <motion.a
            href="#"
            className="bg-[#fc3a52] text-white py-2 px-4 rounded-lg hover:bg-[#f9b248] transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            See More
          </motion.a>
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.footer
        className="mt-10 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <p className="text-sm">&copy; 2024 Kids Learning Hub. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}

export default AboutUsPage;
