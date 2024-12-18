import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPsychologistById, assignPsychologistToPatient } from '../../services/psychologistService';
import { FiPhone, FiMail, FiMapPin, FiStar } from 'react-icons/fi';

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);

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

  const handleSelectDoctor = async () => {
    try {
      await assignPsychologistToPatient(psychologist._id);
      setIsDoctorSelected(true);
      alert('Psychologist selected as your doctor successfully!');
    } catch (error) {
      console.error('Error assigning psychologist:', error);
      alert('Failed to select psychologist as your doctor.');
    }
  };

  if (!psychologist) {
    return <div className="text-center mt-20 text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FFDEE9] to-[#B5EAD7] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-12 mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={psychologist.profilePictureUrl}
            alt={psychologist.firstName}
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full shadow-lg border-4 border-indigo-500"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600">
              {psychologist.firstName} {psychologist.lastName}
            </h1>
            <p className="text-pink-600 text-lg md:text-xl font-medium mt-2">{psychologist.specialization}</p>
            <p className="text-gray-500 mt-4 flex items-center justify-center md:justify-start">
              <FiPhone className="mr-2 text-blue-500" /> {psychologist.phone}
            </p>
            <p className="text-gray-500 flex items-center justify-center md:justify-start">
              <FiMail className="mr-2 text-blue-500" /> {psychologist.contact}
            </p>
            <p className="text-gray-600 mt-2">
              {psychologist.city}, {psychologist.country}
            </p>
            <p className="text-gray-600 mt-2 flex items-center justify-center md:justify-start">
              <FiMapPin className="mr-2 text-green-500" />
              Clinic Address: {psychologist.clinicAddress}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">About</h2>
          <p className="text-gray-600 mt-4">{psychologist.bio}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Professional Details</h2>
          <ul className="text-gray-600 mt-4 space-y-2">
            <li><strong>Years of Experience:</strong> {psychologist.experience} years</li>
            <li><strong>Education:</strong> {psychologist.education}</li>
            <li>
              <strong>Ratings:</strong>
              <span className="ml-2 flex items-center text-yellow-500">
                <FiStar className="mr-1" />
                {psychologist.rating} / 5
              </span>
            </li>
          </ul>
        </div>

        {/* <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Reviews</h2>
          <div className="mt-4 space-y-4">
            {psychologist.reviews.length > 0 ? (
              psychologist.reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-gray-800 font-semibold">"{review.comment}"</p>
                  <p className="text-gray-500 mt-2">- {review.reviewer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews available.</p>
            )}
          </div>
        </div> */}

        <div className="mt-8">
          {!isDoctorSelected ? (
            <button
              onClick={handleSelectDoctor}
              className="w-full bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white px-6 py-3 rounded-lg shadow-lg hover:from-[#34D399] hover:to-[#2563EB] transition-all duration-300"
            >
              Select as My Doctor
            </button>
          ) : (
            <div className="text-green-600 text-lg font-semibold">
              You have selected this psychologist as your doctor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;
