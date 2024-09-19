import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPsychologists } from '../../services/psychologistService';
import Loading from '../../components/Loading'; // Assuming you have a Loading component

function PsychologistListPage() {
  const [psychologists, setPsychologists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } catch (error) {
        console.error('Error fetching psychologists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  const handlePsychologistClick = (psychologistId) => {
    navigate(`/psychologistsdetail/${psychologistId}`);
  };

  if (isLoading) {
    return <Loading />; // Render loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 p-10 pt-16">
      <header className="text-center py-8">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Our Psychologists</h1>
        <p className="text-xl text-gray-700">Select a psychologist to view more details.</p>
      </header>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
        {psychologists.map((psychologist) => (
          <div
            key={psychologist.id}
            className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            onClick={() => handlePsychologistClick(psychologist._id)}
          >
            <img
              src={psychologist.image}
              alt={psychologist.name}
              className="w-full h-60 object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-80"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                {psychologist.name}
              </h3>
              <p className="text-gray-600 mt-1">{psychologist.specialization}</p>
              <p className="text-gray-500 mt-2">{psychologist.phone}</p>
              <p className="text-gray-500">{psychologist.contact}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-semibold px-6 py-3 bg-indigo-600 rounded-full shadow-lg">
                View Details
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PsychologistListPage;
