import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPsychologistById,
  getAssignedPsychologists,
  assignPsychologistToPatient,
} from "../../services/psychologistService";
import { FiPhone, FiMail, FiMapPin, FiAward } from "react-icons/fi";

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const psychologistData = await getPsychologistById(id);
        setPsychologist(psychologistData);
        const assignedPsychologists = await getAssignedPsychologists();

        if (assignedPsychologists) {
          setIsDoctorSelected(true);
        } else {
          setIsDoctorSelected(false);
        }
      } catch (error) {
        console.error(
          "Error fetching psychologist or assigned psychologists:",
          error
        );
      }
    };

    fetchData();
  }, [id]);

  const handleSelectDoctor = async () => {
    try {
      await assignPsychologistToPatient(psychologist._id);
      setIsDoctorSelected(true);
      alert("Psychologist selected as your doctor successfully!");
    } catch (error) {
      console.error("Error assigning psychologist:", error);
      alert("Failed to select psychologist as your doctor.");
    }
  };

  if (!psychologist) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-20 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white flex flex-col items-center">
          <img
            src={psychologist.profilePictureUrl}
            alt={`${psychologist.firstName} ${psychologist.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6"
          />
          <h1 className="text-2xl font-semibold">
            {psychologist.firstName} {psychologist.lastName}
          </h1>
          <p className="text-lg mt-2 italic">{psychologist.specialization}</p>
          <div className="mt-8 space-y-4 text-sm">
            <p className="flex items-center gap-2">
              <FiPhone className="text-yellow-300" /> {psychologist.contact}
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-yellow-300" /> {psychologist.email}
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin className="text-yellow-300" /> {psychologist.city},{" "}
              {psychologist.country}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* About Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-2 border-gray-300">
              About
            </h2>
            <p className="text-gray-700 mt-4 leading-relaxed">
              {psychologist.bio}
            </p>
          </div>

          {/* Professional Details Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-2 border-gray-300">
              Professional Details
            </h2>
            <ul className="mt-4 text-gray-700 space-y-4">
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Years of Experience:</strong> {psychologist.experience}{" "}
                years
              </li>
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Education:</strong> {psychologist.education}
              </li>
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Clinic Address:</strong> {psychologist.clinicAddress}
              </li>
            </ul>
          </div>

          {/* Action Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            {!isDoctorSelected ? (
              <button
                onClick={handleSelectDoctor}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
              >
                Select as My Doctor
              </button>
            ) : (
              <div className="text-green-600 text-lg font-semibold text-center">
                You have selected this psychologist as your doctor.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;