import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPsychologists } from "../../services/psychologistService";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";

function PsychologistListPage() {
  const [psychologists, setPsychologists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Combined data fetching with loading state
    const fetchData = async () => {
      try {
        // Check for assigned doctor first
        try {
          const storedId = localStorage.getItem("assignedDoctor");
          if (storedId) {
            const cleanId = storedId.replace(/^"|"$/g, "");
            if (cleanId) {
              navigate(`/psychologistsdetail/${cleanId}`);
              return; // Exit early if redirecting
            }
          }
        } catch (localStorageError) {
          console.error("Error accessing localStorage:", localStorageError);
          // Continue with the flow instead of exiting
        }

        // Fetch psychologists data
        const data = await getPsychologists();
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }
        setPsychologists(data);
        
        // Set a minimum loading time of 1 second for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching psychologists:", error);
        setError(error.message || "Failed to load psychologists");
        setIsLoading(false); // Ensure loading state is turned off even if there's an error
      }
    };

    fetchData();
  }, [navigate]);

  const handlePsychologistClick = (id) => {
    try {
      if (!id) {
        throw new Error("Invalid psychologist ID");
      }
      localStorage.setItem("assignedDoctortemp", id);
      navigate(`/psychologistsdetail/${id}`);
    } catch (error) {
      console.error("Error navigating to psychologist details:", error);
      setError("Unable to view psychologist details. Please try again.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#008cff] to-[#60efff] flex items-center justify-center p-10">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl text-red-600 font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#008cff] to-[#60efff] p-10 pt-16 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute bg-clouds -top-16 left-0 w-full h-56 opacity-50 animate-float" />
        <div className="absolute bg-balloons -bottom-16 right-0 w-56 h-56 opacity-50 animate-float" />
      </div>

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
        {!psychologists || psychologists.length === 0 ? (
          <div className="col-span-full text-center text-xl text-white">
            No psychologists found. Please check back later.
          </div>
        ) : (
          psychologists.map((psychologist) => (
            <motion.div
              key={psychologist?._id || `psych-${Math.random()}`}
              className="group relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border-4 border-pink-300 hover:border-pink-500"
              onClick={() => psychologist?._id && handlePsychologistClick(psychologist._id)}
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            >
              <motion.img
                src={psychologist.profilePictureUrl || 'https://placehold.co/600x400'}
                alt={`${psychologist.firstName || ''} ${psychologist.lastName || ''}`}
                className="w-full h-60 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Image+Not+Available';
                }}
              />
              <div className="mt-4 text-center">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors duration-300">
                  {psychologist.name || `${psychologist.firstName || ''} ${psychologist.lastName || ''}`}
                </h3>
                {(psychologist.firstName || psychologist.lastName) && (
                  <p className="text-pink-600 mt-1">
                    {psychologist.firstName || ''} {psychologist.lastName || ''}
                  </p>
                )}
                {psychologist.email && <p className="text-gray-500 mt-2">{psychologist.email}</p>}
                {psychologist.contact && <p className="text-gray-500">{psychologist.contact}</p>}
                {(psychologist.address || psychologist.city || psychologist.country) && (
                  <p className="text-gray-500">
                    {[
                      psychologist.address,
                      psychologist.city,
                      psychologist.country
                    ].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
              {psychologist?._id && (
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
              )}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-300 rounded-full group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-300 rounded-full group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute -top-10 -left-10 w-10 h-10 bg-yellow-200 rounded-full opacity-50 animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-10 h-10 bg-yellow-200 rounded-full opacity-50 animate-pulse" />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}

export default PsychologistListPage;
