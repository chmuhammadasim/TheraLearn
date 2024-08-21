import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologistById } from '../../services/psychologistService';

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);

  useEffect(() => {
    const fetchPsychologist = async () => {
      try {
        const data = await getPsychologistById(id);
        setPsychologist(data);
      } catch (error) {
        console.error('Error fetching psychologist details:', error);
      }
    };

    fetchPsychologist();
  }, [id]);

  if (!psychologist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={psychologist.image}
            alt={psychologist.name}
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-extrabold text-blue-900">{psychologist.name}</h1>
            <p className="text-gray-600 text-xl">{psychologist.specialization}</p>
            <p className="text-gray-500 mt-2">{psychologist.phone}</p>
            <p className="text-gray-500">{psychologist.contact}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">About</h2>
          <p className="text-gray-600 mt-4">{psychologist.description}</p>
        </div>
        <div className="mt-8 text-center">
          <a
            href={`mailto:${psychologist.contact}`}
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
          >
            Contact Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;
