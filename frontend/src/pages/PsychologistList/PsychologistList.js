import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPsychologists } from "../../services/psychologistService";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";

function PsychologistListPage() {
  const [psychologists, setPsychologists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } catch (error) {
        console.error("Error fetching psychologists:", error);
      }
    };

    fetchPsychologists();
  }, []);

  const handlePsychologistClick = (psychologistId) => {
    navigate(`/psychologistsdetail/${psychologistId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#008cff] to-[#60efff] p-10 pt-16 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute bg-clouds -top-16 left-0 w-full h-56 opacity-50 animate-float" />
        <div className="absolute bg-balloons -bottom-16 right-0 w-56 h-56 opacity-50 animate-float" />
      </div>

      {/* Page Header */}
      <header className="text-center py-8">
        <motion.h1
          className="text-6xl font-extrabold text-blue-900 mb-4 font-fun"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          🌟 Meet Our Friendly Experts! 🌈
        </motion.h1>
        <p className="text-xl text-gray-700">
          Choose a psychologist to explore their expertise and learn more!
        </p>
      </header>

      {/* Psychologist Cards */}
      <motion.div
        className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delayChildren: 0.2,
          staggerChildren: 0.1,
        }}
      >
        {psychologists.map((psychologist) => (
          <motion.div
            key={psychologist._id}
            className="group relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-4 border-pink-300 hover:border-pink-500"
            onClick={() => handlePsychologistClick(psychologist._id)}
            whileHover={{
              scale: 1.05,
              rotate: [0, 2, -2, 0],
            }}
          >
            {/* Profile Picture */}
            <motion.img
              src={psychologist.profilePictureUrl}
              alt={psychologist.firstName}
              className="w-full h-60 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="mt-4 text-center">
              <h3 className="text-3xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
                {psychologist.name}
              </h3>
              <p className="text-pink-600 mt-1">{psychologist.firstName} {psychologist.lastName}</p>
              <p className="text-gray-500 mt-2">{psychologist.email}</p>
              <p className="text-gray-500">{psychologist.contact}</p>
              <p className="text-gray-500">{psychologist.address}, {psychologist.city}, {psychologist.country}</p>
            </div>
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.span
                className="text-white font-bold px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full shadow-lg"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.6)",
                }}
              >
                View Details
              </motion.span>
            </div>
            {/* Decorative Shapes */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-300 rounded-full group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full group-hover:scale-125 transition-transform duration-300" />
            <div className="absolute -top-10 -left-10 w-10 h-10 bg-yellow-200 rounded-full opacity-50 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-10 h-10 bg-yellow-200 rounded-full opacity-50 animate-pulse" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default PsychologistListPage;
