import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPsychologists } from '../../services/psychologistService';

function PsychologistListPage() {
  const [psychologists, setPsychologists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const data = await getPsychologists();
        setPsychologists(data);
      } catch (error) {
        console.error('Error fetching psychologists:', error);
      }
    };

    fetchPsychologists();
  }, []);

  const handlePsychologistClick = (psychologistId) => {
    navigate(`/psychologists/${psychologistId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 p-6">
      <header className="text-center py-8">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">Our Psychologists</h1>
        <p className="text-xl text-gray-700">Click on a psychologist to view details and contact them.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {psychologists.map((psychologist) => (
          <div
            key={psychologist.id}
            className="group relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden"
            onClick={() => handlePsychologistClick(psychologist.id)}
          >
            <img
              src={psychologist.image}
              alt={psychologist.name}
              className="w-full h-64 object-cover rounded-lg group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="relative z-10 mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-900">{psychologist.name}</h3>
              <p className="text-gray-600 mt-2">{psychologist.specialization}</p>
              <p className="text-gray-500 mt-2">{psychologist.phone}</p>
              <p className="text-gray-500">{psychologist.contact}</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 text-white text-center rounded-full px-6 py-3 font-bold animate-bounce">
                View Details
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PsychologistListPage;
