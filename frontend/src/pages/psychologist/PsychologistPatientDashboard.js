import React, { useState, useEffect, useCallback } from "react";
import {
  FiPhone,
  FiMail,
  FiUser,
  FiSearch,
  FiBarChart2,
  FiSend,
  FiRefreshCw,
  FiMapPin,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiActivity,
  FiLayers,
  FiClock,
  FiCoffee,
} from "react-icons/fi";
import {
  getPsychologistDetails,
  getPatients,
  sendMessageToPatient,
  getPatientResponse,
  getChatHistory,
  savePatientNotes,
  savePrescription,
  scheduleFollowUp,
  saveMentalHealthNotes,
  saveLabTests,
  saveTherapySession,
  saveDietRestrictions,
  getPatientRecords,
} from "../../services/psychologistService";
import Loading from "../../components/Loading";

const DashboardStats = ({ totalPatients }) => (
  <div className="w-full bg-gradient-to-r from-yellow-100 to-orange-200 p-8 rounded-2xl shadow-lg text-center mb-8 border-l-8 border-yellow-400">
    <h2 className="text-2xl font-bold text-yellow-700 flex items-center justify-center gap-3">
      <FiBarChart2 className="text-yellow-500" />
      Dashboard Overview
    </h2>
    <div className="mt-6 flex justify-center">
      <div className="px-8 py-5 bg-white rounded-xl shadow-md border-2 border-yellow-200">
        <p className="text-gray-600 text-lg">Total Patients</p>
        <p className="text-4xl font-extrabold text-yellow-600">{totalPatients}</p>
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
  const [activeTab, setActiveTab] = useState("chat");
  const [patientRecords, setPatientRecords] = useState({
    notes: "",
    prescription: "",
    followUpDate: "",
    mentalHealthNotes: "",
    labTests: "",
    therapySessions: [],
    dietRestrictions: "",
  });

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
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const fetchPatientRecords = async (patientId) => {
    try {
      const records = await getPatientRecords(patientId);
      setPatientRecords(records);
    } catch (error) {
      console.error("Error fetching patient records:", error);
      // Initialize with empty values if records don't exist
      setPatientRecords({
        notes: "",
        prescription: "",
        followUpDate: "",
        mentalHealthNotes: "",
        labTests: "",
        therapySessions: [],
        dietRestrictions: "",
      });
    }
  };

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
      setChatHistory((prev) => [
        ...prev,
        { sender: "psychologist", message },
      ]);
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
          { sender: "patient", message: patientResponse.response },
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
      await fetchPatientRecords(patient._id);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      alert("Failed to load chat history.");
    }
  };

  const saveNotes = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await savePatientNotes(selectedPatient._id, patientRecords.notes);
      alert("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Failed to save notes.");
    }
  };

  const savePrescriptionData = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await savePrescription(selectedPatient._id, patientRecords.prescription);
      alert("Prescription saved successfully!");
    } catch (error) {
      console.error("Error saving prescription:", error);
      alert("Failed to save prescription.");
    }
  };

  const saveFollowUpDate = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await scheduleFollowUp(selectedPatient._id, patientRecords.followUpDate);
      alert("Follow-up date scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling follow-up:", error);
      alert("Failed to schedule follow-up.");
    }
  };

  const saveMentalHealth = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await saveMentalHealthNotes(selectedPatient._id, patientRecords.mentalHealthNotes);
      alert("Mental health notes saved successfully!");
    } catch (error) {
      console.error("Error saving mental health notes:", error);
      alert("Failed to save mental health notes.");
    }
  };

  const saveLabTestData = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await saveLabTests(selectedPatient._id, patientRecords.labTests);
      alert("Lab tests saved successfully!");
    } catch (error) {
      console.error("Error saving lab tests:", error);
      alert("Failed to save lab tests.");
    }
  };

  const addTherapySession = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    const newSession = {
      date: new Date().toISOString().split('T')[0],
      notes: "",
      duration: 60,
    };
    setPatientRecords(prev => ({
      ...prev,
      therapySessions: [...prev.therapySessions, newSession]
    }));
  };

  const updateTherapySession = async (index, field, value) => {
    const updatedSessions = [...patientRecords.therapySessions];
    updatedSessions[index] = {
      ...updatedSessions[index],
      [field]: value
    };
    setPatientRecords(prev => ({
      ...prev,
      therapySessions: updatedSessions
    }));
  };

  const saveTherapySessions = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await saveTherapySession(selectedPatient._id, patientRecords.therapySessions);
      alert("Therapy sessions saved successfully!");
    } catch (error) {
      console.error("Error saving therapy sessions:", error);
      alert("Failed to save therapy sessions.");
    }
  };

  const saveDietRestrictionData = async () => {
    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }
    try {
      await saveDietRestrictions(selectedPatient._id, patientRecords.dietRestrictions);
      alert("Diet restrictions saved successfully!");
    } catch (error) {
      console.error("Error saving diet restrictions:", error);
      alert("Failed to save diet restrictions.");
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(searchText.toLowerCase());
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-indigo-100">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-b-3xl shadow">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <FiUser className="text-3xl" />
            Psychologist Dashboard
          </h1>
          <p className="text-blue-100 mt-2 text-lg">
            Manage your patients and communications
          </p>
        </header>

        <div className="p-10">
          {/* Show quick stats */}
          <DashboardStats totalPatients={patients.length} />

          <div className="flex flex-col md:flex-row gap-8">
            {psychologist && (
              <PsychologistDetails psychologist={psychologist} />
            )}
            <div className="w-full md:w-2/3">
              {/* Patient Search */}
              <div className="relative mb-8">
                <FiSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  className="pl-12 p-4 border-2 border-gray-200 rounded-xl w-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all text-lg shadow"
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

          {/* Tabs and content for selected patient */}
          {selectedPatient && (
            <div className="mt-12">
              <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-gray-200 pb-2">
                <TabButton 
                  active={activeTab === "chat"} 
                  onClick={() => setActiveTab("chat")}
                  icon={<FiSend />}
                  label="Chat"
                />
                <TabButton 
                  active={activeTab === "notes"} 
                  onClick={() => setActiveTab("notes")}
                  icon={<FiFileText />}
                  label="Notes"
                />
                <TabButton 
                  active={activeTab === "prescription"} 
                  onClick={() => setActiveTab("prescription")}
                  icon={<FiClipboard />}
                  label="Prescription"
                />
                <TabButton 
                  active={activeTab === "followup"} 
                  onClick={() => setActiveTab("followup")}
                  icon={<FiCalendar />}
                  label="Follow-up"
                />
                <TabButton 
                  active={activeTab === "mentalhealth"} 
                  onClick={() => setActiveTab("mentalhealth")}
                  icon={<FiActivity />}
                  label="Mental Health"
                />
                <TabButton 
                  active={activeTab === "labtests"} 
                  onClick={() => setActiveTab("labtests")}
                  icon={<FiLayers />}
                  label="Lab Tests"
                />
                <TabButton 
                  active={activeTab === "therapy"} 
                  onClick={() => setActiveTab("therapy")}
                  icon={<FiClock />}
                  label="Therapy Sessions"
                />
                <TabButton 
                  active={activeTab === "diet"} 
                  onClick={() => setActiveTab("diet")}
                  icon={<FiCoffee />}
                  label="Diet Restrictions"
                />
              </div>

              {/* Tab content */}
              {activeTab === "chat" && (
                <ChatBox
                  patient={selectedPatient}
                  chatHistory={chatHistory}
                  message={message}
                  setMessage={setMessage}
                  onSendMessage={handleSendMessage}
                  onRefresh={handleGetResponse}
                />
              )}

              {activeTab === "notes" && (
                <NotesTab 
                  notes={patientRecords.notes} 
                  onNotesChange={(value) => setPatientRecords(prev => ({...prev, notes: value}))} 
                  onSave={saveNotes}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "prescription" && (
                <PrescriptionTab 
                  prescription={patientRecords.prescription} 
                  onPrescriptionChange={(value) => setPatientRecords(prev => ({...prev, prescription: value}))} 
                  onSave={savePrescriptionData}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "followup" && (
                <FollowUpTab 
                  followUpDate={patientRecords.followUpDate} 
                  onDateChange={(value) => setPatientRecords(prev => ({...prev, followUpDate: value}))} 
                  onSave={saveFollowUpDate}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "mentalhealth" && (
                <MentalHealthTab 
                  mentalHealthNotes={patientRecords.mentalHealthNotes} 
                  onNotesChange={(value) => setPatientRecords(prev => ({...prev, mentalHealthNotes: value}))} 
                  onSave={saveMentalHealth}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "labtests" && (
                <LabTestsTab 
                  labTests={patientRecords.labTests} 
                  onLabTestsChange={(value) => setPatientRecords(prev => ({...prev, labTests: value}))} 
                  onSave={saveLabTestData}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "therapy" && (
                <TherapySessionsTab 
                  sessions={patientRecords.therapySessions} 
                  onAddSession={addTherapySession}
                  onUpdateSession={updateTherapySession}
                  onSave={saveTherapySessions}
                  patient={selectedPatient}
                />
              )}

              {activeTab === "diet" && (
                <DietRestrictionsTab 
                  dietRestrictions={patientRecords.dietRestrictions} 
                  onDietChange={(value) => setPatientRecords(prev => ({...prev, dietRestrictions: value}))} 
                  onSave={saveDietRestrictionData}
                  patient={selectedPatient}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    className={`px-4 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-all ${
      active 
        ? "bg-indigo-600 text-white" 
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);

const PsychologistDetails = React.memo(({ psychologist }) => (
  <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border-l-8 border-blue-400 flex flex-col items-center mb-8 md:mb-0">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center mb-4 shadow-lg">
      <FiUser className="text-5xl text-blue-700" />
    </div>
    <h2 className="text-2xl font-bold text-blue-800 mb-2">Your Profile</h2>
    <div className="space-y-3 w-full">
      <p className="flex items-center font-medium text-gray-700 text-lg">
        <FiUser className="mr-3 text-blue-500" />
        <span>
          {psychologist.firstName} {psychologist.lastName}
        </span>
      </p>
      <p className="flex items-center font-medium text-gray-700 text-lg">
        <FiMail className="mr-3 text-blue-500" />
        <span>{psychologist.email}</span>
      </p>
      <p className="flex items-center font-medium text-gray-700 text-lg">
        <FiPhone className="mr-3 text-blue-500" />
        <span>{psychologist.contact}</span>
      </p>
      <div className="pt-2 space-y-1">
        <p className="flex items-center text-gray-700">
          <FiBookOpen className="mr-2 text-indigo-500" />
          <span className="font-medium">Education:</span>{" "}
          <span className="ml-1">{psychologist.education.join(", ")}</span>
        </p>
        <p className="flex items-center text-gray-700">
          <FiBriefcase className="mr-2 text-indigo-500" />
          <span className="font-medium">Experience:</span>{" "}
          <span className="ml-1">{psychologist.experience.join(", ")}</span>
        </p>
        <p className="flex items-center text-gray-700">
          <FiMapPin className="mr-2 text-indigo-500" />
          <span className="font-medium">Address:</span>{" "}
          <span className="ml-1">{psychologist.address}</span>
        </p>
      </div>
    </div>
  </div>
));

const PatientList = React.memo(({ patients, selectedPatient, onSelect }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Patients</h2>
    <div className="max-h-96 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
      {patients.length > 0 ? (
        patients.map((patient) => (
          <div
            key={patient._id}
            className={`p-5 rounded-xl border-2 shadow-md cursor-pointer transition-all hover:scale-[1.02] flex items-center gap-4 ${
              selectedPatient?._id === patient._id
                ? "bg-indigo-100 border-indigo-400"
                : "bg-white border-gray-200 hover:border-indigo-300"
            }`}
            onClick={() => onSelect(patient)}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-200 to-blue-200 flex items-center justify-center">
              <FiUser className="text-2xl text-indigo-700" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg text-blue-900">
                {patient.firstName} {patient.lastName}
              </p>
              <div className="flex flex-wrap gap-3 text-gray-600 text-sm mt-1">
                <span className="flex items-center">
                  <FiMail className="inline-block mr-1" /> {patient.email}
                </span>
                <span className="flex items-center">
                  <FiPhone className="inline-block mr-1" /> {patient.contact}
                </span>
              </div>
            </div>
            <div className="text-right text-gray-500 text-sm min-w-[80px]">
              <p className="flex items-center gap-1">
                <FiMapPin className="inline-block" />
                {patient.city}
              </p>
              <p>{patient.country}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No patients found</p>
        </div>
      )}
    </div>
  </div>
));

const ChatBox = ({
  patient,
  chatHistory,
  message,
  setMessage,
  onSendMessage,
  onRefresh,
}) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiUser className="text-xl" />
        Chat with {patient.firstName} {patient.lastName}
      </h3>
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition font-semibold shadow"
      >
        <FiRefreshCw /> Refresh
      </button>
    </div>

    <div className="h-80 overflow-y-auto mb-6 bg-white p-6 border border-gray-200 rounded-xl shadow-inner custom-scrollbar">
      {chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-5 flex ${
              chat.sender === "psychologist" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md ${
                chat.sender === "psychologist"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-base">{chat.message}</p>
              <p
                className={`text-xs mt-2 ${
                  chat.sender === "psychologist"
                    ? "text-indigo-100"
                    : "text-gray-500"
                }`}
              >
                {chat.sender === "psychologist" ? "You" : "Patient"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-400">
            No messages yet. Start the conversation...
          </p>
        </div>
      )}
    </div>

    <div className="flex gap-4">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow"
        rows="2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={onSendMessage}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Send
      </button>
    </div>
  </div>
);

const NotesTab = ({ notes, onNotesChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiFileText className="text-xl" />
        Doctor Notes - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow min-h-[300px]"
        placeholder="Add your clinical notes about the patient here..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Notes
      </button>
    </div>
  </div>
);

const PrescriptionTab = ({ prescription, onPrescriptionChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiClipboard className="text-xl" />
        Prescription - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow min-h-[300px]"
        placeholder="Enter prescription details here..."
        value={prescription}
        onChange={(e) => onPrescriptionChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Prescription
      </button>
    </div>
  </div>
);

const FollowUpTab = ({ followUpDate, onDateChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiCalendar className="text-xl" />
        Follow-up Schedule - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-medium mb-2">Follow-up Date</label>
      <input
        type="date"
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg shadow"
        value={followUpDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Schedule Follow-up
      </button>
    </div>
  </div>
);

const MentalHealthTab = ({ mentalHealthNotes, onNotesChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiActivity className="text-xl" />
        Mental Health Assessment - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow min-h-[300px]"
        placeholder="Add mental health assessment notes, observations, and treatment plans..."
        value={mentalHealthNotes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Assessment
      </button>
    </div>
  </div>
);

const LabTestsTab = ({ labTests, onLabTestsChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiLayers className="text-xl" />
        Lab Tests - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow min-h-[300px]"
        placeholder="Add lab test requirements, results, and observations..."
        value={labTests}
        onChange={(e) => onLabTestsChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Lab Tests
      </button>
    </div>
  </div>
);

const TherapySessionsTab = ({ sessions, onAddSession, onUpdateSession, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiClock className="text-xl" />
        Therapy Sessions - {patient.firstName} {patient.lastName}
      </h3>
      <button
        onClick={onAddSession}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow flex items-center gap-2"
      >
        + Add New Session
      </button>
    </div>
    
    <div className="mb-6 space-y-4">
      {sessions.length > 0 ? (
        sessions.map((session, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-gray-700 font-medium mb-1">Session Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  value={session.date}
                  onChange={(e) => onUpdateSession(index, 'date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  value={session.duration}
                  onChange={(e) => onUpdateSession(index, 'duration', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Session Notes</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                rows="4"
                placeholder="Enter session notes..."
                value={session.notes}
                onChange={(e) => onUpdateSession(index, 'notes', e.target.value)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No therapy sessions recorded yet</p>
        </div>
      )}
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Sessions
      </button>
    </div>
  </div>
);

const DietRestrictionsTab = ({ dietRestrictions, onDietChange, onSave, patient }) => (
  <div className="p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-2xl shadow-xl border-2 border-indigo-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        <FiCoffee className="text-xl" />
        Diet Restrictions - {patient.firstName} {patient.lastName}
      </h3>
    </div>
    
    <div className="mb-6">
      <textarea
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-lg shadow min-h-[300px]"
        placeholder="Add dietary restrictions, recommendations, and nutritional guidelines..."
        value={dietRestrictions}
        onChange={(e) => onDietChange(e.target.value)}
      />
    </div>
    
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-lg"
      >
        <FiSend /> Save Diet Restrictions
      </button>
    </div>
  </div>
);

export default PsychologistPatientDashboard;
