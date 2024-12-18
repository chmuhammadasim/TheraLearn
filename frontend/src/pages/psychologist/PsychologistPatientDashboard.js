import React, { useState, useEffect, useCallback } from "react";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";
import {
  getPsychologistDetails,
  getPatients,
  sendMessageToPatient,
  getPatientResponse,
  getChatHistory,
} from "../../services/psychologistService";

function PsychologistPatientDashboard() {
  const [psychologist, setPsychologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [psychologistData, patientsData] = await Promise.all([
        getPsychologistDetails(),
        getPatients(),
      ]);
      setPsychologist(psychologistData);
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleSendMessage = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    if (!message.trim()) {
      alert("Message cannot be empty!");
      return;
    }

    try {
      await sendMessageToPatient(selectedPatient._id, message);
      setChatHistory((prev) => [...prev, { sender: "Psychologist", message }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  const handleGetResponse = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }

    try {
      const patientResponse = await getPatientResponse(selectedPatient._id);
      if (patientResponse.response) {
        setChatHistory((prev) => [
          ...prev,
          { sender: "Patient", message: patientResponse.response },
        ]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      alert("Failed to fetch patient response.");
    }
  };

  const handlePatientSelection = async (patient) => {
    setSelectedPatient(patient);
    try {
      const history = await getChatHistory(patient._id);
      setChatHistory(history.filteredMessages || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      alert("Failed to load chat history.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-blue-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            Psychologist Dashboard
          </h1>
        </header>

        <div className="flex flex-wrap gap-6">
          {psychologist && (
            <PsychologistDetails psychologist={psychologist} />
          )}
          <PatientList
            patients={patients}
            selectedPatient={selectedPatient}
            onSelect={handlePatientSelection}
          />
        </div>

        {selectedPatient && (
          <ChatBox
            patient={selectedPatient}
            chatHistory={chatHistory}
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            onRefresh={handleGetResponse}
          />
        )}
      </div>
    </div>
  );
}

const PsychologistDetails = React.memo(({ psychologist }) => (
  <div className="w-full sm:w-1/3 bg-blue-50 p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">
      Your Details
    </h2>
    <p><FiUser className="inline-block mr-2" /> {psychologist.firstName} {psychologist.lastName}</p>
    <p><FiMail className="inline-block mr-2" /> {psychologist.email}</p>
    <p><FiPhone className="inline-block mr-2" /> {psychologist.contact}</p>
    <p className="mt-2">Specialization: <span className="font-medium">{psychologist.specialization}</span></p>
    <p>Education: <span className="font-medium">{psychologist.education.join(", ")}</span></p>
    <p>Experience: <span className="font-medium">{psychologist.experience.join(", ")}</span></p>
  </div>
));

const PatientList = React.memo(({ patients, selectedPatient, onSelect }) => (
  <div className="w-full sm:w-2/3">
    <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Patients</h2>
    <div className="max-h-60 overflow-y-auto space-y-4">
      {patients.length > 0 ? (
        patients.map((patient) => (
          <div
            key={patient._id}
            className={`p-4 bg-blue-50 rounded-lg shadow-md cursor-pointer ${
              selectedPatient?._id === patient._id ? "ring-2 ring-blue-400" : ""
            }`}
            onClick={() => onSelect(patient)}
          >
            <p className="font-semibold">{patient.firstName} {patient.lastName}</p>
            <p>Email: {patient.email}</p>
            <p>Contact: {patient.contact}</p>
            <p>City: {patient.city}</p>
            <p>Country: {patient.country}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No patients assigned yet.</p>
      )}
    </div>
  </div>
));

const ChatBox = ({ patient, chatHistory, message, setMessage, onSendMessage, onRefresh }) => (
  <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-blue-600 mb-4">
      Chat with {patient.firstName} {patient.lastName}
    </h3>
    <div className="max-h-60 overflow-y-auto mb-4 bg-white p-4 border border-gray-200 rounded-lg">
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-3 ${chat.sender === "Psychologist" ? "text-right" : "text-left"}`}
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                chat.sender === "Psychologist" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              }`}
            >
              {chat.message}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Start the conversation...</p>
      )}
    </div>
    <div className="flex gap-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={onSendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Send
      </button>
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
      >
        Refresh
      </button>
    </div>
  </div>
);

export default PsychologistPatientDashboard;
