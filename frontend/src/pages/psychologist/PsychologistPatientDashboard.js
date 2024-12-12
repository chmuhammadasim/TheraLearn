import React, { useState, useEffect } from 'react';
import { FiPhone, FiMail, FiUser } from 'react-icons/fi';
import { getPsychologistDetails, getPatients } from '../../services/psychologistService';

function PsychologistPatientDashboard() {
  const [psychologist, setPsychologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const psychologistData = await getPsychologistDetails();
        setPsychologist(psychologistData);

        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {psychologist && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
              Psychologist Dashboard
            </h1>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/3 p-4 bg-blue-50 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Details</h2>
                <p><FiUser className="inline-block mr-2" /> {psychologist.firstName} {psychologist.lastName}</p>
                <p><FiMail className="inline-block mr-2" /> {psychologist.email}</p>
                <p><FiPhone className="inline-block mr-2" /> {psychologist.contact}</p>
                <p className="mt-2">Specialization: <span className="font-medium">{psychologist.specialization}</span></p>
                <p>Education: <span className="font-medium">{psychologist.education.join(', ')}</span></p>
                <p>Experience: <span className="font-medium">{psychologist.experience.join(', ')}</span></p>
              </div>
              <div className="w-full sm:w-2/3">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Patients</h2>
                {patients.length > 0 ? (
                  <ul className="space-y-4">
                    {patients.map((patient) => (
                      <li key={patient._id} className="p-4 bg-blue-50 rounded-lg shadow-md">
                        <p className="font-semibold">
                          {patient.firstName} {patient.lastName}
                        </p>
                        <p>Email: {patient.email}</p>
                        <p>Contact: {patient.contact}</p>
                        <p>City: {patient.city}</p>
                        <p>Country: {patient.country}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No patients assigned yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PsychologistPatientDashboard;
