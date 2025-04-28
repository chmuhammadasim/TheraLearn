import React, { useState, useEffect, useCallback } from "react";
import { FiPhone, FiMail, FiUser, FiSearch, FiBarChart2, FiSend, FiRefreshCw } from "react-icons/fi";
import {
  getPsychologistDetails,
  getPatients,
  sendMessageToPatient,
  getPatientResponse,
  getChatHistory,
} from "../../services/psychologistService";
import Loading from "../../components/Loading";

// Enhanced dashboard stats component with better visual elements
const DashboardStats = ({ totalPatients }) => (
  <div className="w-full bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md text-center mb-6 border-l-4 border-yellow-400">
    <h2 className="text-xl font-semibold text-yellow-600 flex items-center justify-center gap-2">
      <FiBarChart2 className="text-yellow-500" />
      Dashboard Overview
    </h2>
    <div className="mt-4 flex justify-center">
      <div className="px-6 py-3 bg-white rounded-lg shadow-sm">
        <p className="text-gray-600">Total Patients</p>
        <p className="text-3xl font-bold text-yellow-600">{totalPatients}</p>
      </div>
    </div>
  </div>
);

function PsychologistPatientDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [psychologist, setPsychologist] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchDashboardData = useCallback(async () => {
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
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    localStorage.setItem("patientid", patient._id);
    try {
      const history = await getChatHistory(patient._id);
      setChatHistory(history.filteredMessages || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      alert("Failed to load chat history.");
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold">Psychologist Dashboard</h1>
          <p className="text-blue-100">Manage your patients and communications</p>
        </header>

        <div className="p-8">
          {/* Show quick stats */}
          <DashboardStats totalPatients={patients.length} />

          <div className="flex flex-wrap gap-6">
            {psychologist && <PsychologistDetails psychologist={psychologist} />}
            <div className="w-full sm:w-2/3">
              {/* Patient Search */}
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Patient list */}
              <PatientList
                patients={filteredPatients}
                selectedPatient={selectedPatient}
                onSelect={handlePatientSelection}
              />
            </div>
          </div>

          {/* Chat Box */}
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
    </div>
  );
}

const PsychologistDetails = React.memo(({ psychologist }) => (
  <div className="w-full sm:w-1/3 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your Profile</h2>
    <div className="space-y-3">
      <p className="flex items-center font-medium text-gray-700">
        <FiUser className="mr-3 text-blue-500" /> 
        <span>{psychologist.firstName} {psychologist.lastName}</span>
      </p>
      <p className="flex items-center font-medium text-gray-700">
        <FiMail className="mr-3 text-blue-500" /> 
        <span>{psychologist.email}</span>
      </p>
      <p className="flex items-center font-medium text-gray-700">
        <FiPhone className="mr-3 text-blue-500" /> 
        <span>{psychologist.contact}</span>
      </p>
      <div className="pt-2">
        <p className="text-gray-700"><span className="font-medium">Education:</span> {psychologist.education.join(", ")}</p>
        <p className="text-gray-700"><span className="font-medium">Experience:</span> {psychologist.experience.join(", ")}</p>
        <p className="text-gray-700"><span className="font-medium">Address:</span> {psychologist.address}</p>
      </div>
    </div>
  </div>
));

const PatientList = React.memo(({ patients, selectedPatient, onSelect }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Patients</h2>
    <div className="max-h-80 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
      {patients.length > 0 ? (
        patients.map((patient) => (
          <div
            key={patient._id}
            className={`p-4 rounded-lg border-2 shadow-md cursor-pointer transition-all hover:transform hover:scale-[1.01] ${
              selectedPatient?._id === patient._id
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => onSelect(patient)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg text-blue-800">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-gray-600">
                  <FiMail className="inline-block mr-1" /> {patient.email}
                </p>
                <p className="text-gray-600">
                  <FiPhone className="inline-block mr-1" /> {patient.contact}
                </p>
              </div>
              <div className="text-right text-gray-500 text-sm">
                <p>{patient.city}</p>
                <p>{patient.country}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No patients found</p>
        </div>
      )}
    </div>
  </div>
));

const ChatBox = ({ patient, chatHistory, message, setMessage, onSendMessage, onRefresh }) => (
  <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold text-blue-700">
        Chat with {patient.firstName} {patient.lastName}
      </h3>
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
      >
        <FiRefreshCw /> Refresh
      </button>
    </div>
    
    <div className="h-80 overflow-y-auto mb-4 bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-inner">
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-4 flex ${chat.sender === "psychologist" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-lg shadow-sm ${
                chat.sender === "psychologist"
                  ? "bg-blue-500 text-white rounded-bl-none"
                  : "bg-gray-200 text-gray-800 rounded-br-none"
              }`}
            >
              <p>{chat.message}</p>
              <p className={`text-xs mt-1 ${chat.sender === "psychologist" ? "text-blue-100" : "text-gray-500"}`}>
                {chat.sender}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400">No messages yet. Start the conversation...</p>
        </div>
      )}
    </div>
    
    <div className="flex gap-3">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows="2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={onSendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
      >
        <FiSend /> Send
      </button>
    </div>
  </div>
);

export default PsychologistPatientDashboard;
