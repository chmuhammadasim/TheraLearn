import React, { useState, useEffect } from 'react';
import { getPsychologistById, getPatientsByPsychologistId, sendMessageToPatient } from '../../services/psychologistService';
import { useParams } from 'react-router-dom';
import { FiPhone, FiMail, FiSend } from 'react-icons/fi';

function PsychologistPatientDashboard() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologistAndPatients = async () => {
      try {
        const psychologistData = await getPsychologistById(id);
        const patientsData = await getPatientsByPsychologistId(id);
        setPsychologist(psychologistData || {});
        setPatients(patientsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologistAndPatients();
  }, [id]);

  const handleSendMessage = async () => {
    if (selectedPatient && message) {
      try {
        await sendMessageToPatient(selectedPatient._id, message);
        alert('Message sent successfully!');
        setMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
      }
    } else {
      alert('Please select a patient and enter a message.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eeddf3] via-[#ee92b1] to-[#6330b4] p-6">
      <div className="max-w-4xl mt-24 mb-16 mx-auto bg-white p-8 rounded-lg shadow-2xl transform hover:scale-105 transition duration-500">
        {/* Psychologist Info */}
        {psychologist && psychologist.firstName ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-blue-900">
              {psychologist.firstName || "First Name"} {psychologist.lastName || "Last Name"}
            </h1>
            <p className="text-pink-600 text-xl font-medium mt-2">{psychologist.specialization || "Specialization"}</p>
            <p className="text-gray-500 mt-4 flex items-center">
              <FiPhone className="mr-2" /> {psychologist.phone || "Phone not available"}
            </p>
            <p className="text-gray-500 flex items-center">
              <FiMail className="mr-2" /> {psychologist.contact || "Email not available"}
            </p>
            <p className="text-gray-600 mt-2">
              {psychologist.city || "City not available"}, {psychologist.country || "Country not available"}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No psychologist data available.</p>
          </div>
        )}

        {/* Patients List Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-indigo-700">Patients</h2>
          {patients.length > 0 ? (
            <div className="mt-4 space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient._id}
                  className="bg-yellow-100 p-4 rounded-lg shadow hover:bg-yellow-200 transition duration-300"
                >
                  <p className="text-gray-800 font-semibold">{patient.name || "Name not available"}</p>
                  <p className="text-gray-600">{patient.email || "Email not available"}</p>
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 mt-4">
              <p>No patients found.</p>
            </div>
          )}
        </div>

        {/* Messaging Section */}
        {selectedPatient && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-indigo-700">Message to {selectedPatient.name}</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full mt-2 p-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 flex items-center bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition-all duration-300"
            >
              <FiSend className="mr-2" /> Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PsychologistPatientDashboard;
