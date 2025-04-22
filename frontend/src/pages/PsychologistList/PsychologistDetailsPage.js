import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getPsychologistById,
  getAssignedPsychologists,
  assignPsychologistToPatient,
  sendMessageToPsychologist,
  getChatHistoryUser,
} from "../../services/psychologistService";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiAward,
  FiStar,
} from "react-icons/fi";

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const fetchData = async () => {
    try {
      let storedId = localStorage.getItem("assignedDoctor");
       storedId = storedId.replace(/^"|"$/g, "");
      const psychologistData = await getPsychologistById(storedId);
      setPsychologist(psychologistData);
      
      if (!storedId) {
        storedId = await getAssignedPsychologists();
      }
      if (storedId) {
        setIsDoctorSelected(true);
        const history = await getChatHistoryUser(storedId);
        setChatHistory(history.filteredMessages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSelectDoctor = async () => {
    if (!psychologist?._id) return;
    try {
      await assignPsychologistToPatient(psychologist._id);
      setIsDoctorSelected(true);
      alert("Psychologist selected successfully!");
    } catch {
      alert("Failed to select psychologist.");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !psychologist?._id) return;
    try {
      const newMessage = { sender: "Patient", message, timestamp: new Date() };
      await sendMessageToPsychologist(psychologist._id, message);
      setChatHistory((prev) => [...prev, newMessage]);
      setMessage("");
      scrollToBottom();
    } catch {
      alert("Failed to send message.");
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  if (!psychologist) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 pt-20 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 transition-all">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white flex flex-col items-center relative">
          <img
            src={psychologist.profilePictureUrl}
            alt={`${psychologist.firstName} ${psychologist.lastName}`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-6 transform hover:scale-105 transition-transform"
          />
          <h1 className="text-3xl font-semibold mb-1">
            {psychologist.firstName} {psychologist.lastName}
          </h1>
          <p className="text-lg italic">{psychologist.specialization}</p>
          <div className="mt-5 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FiPhone className="text-yellow-300" /> {psychologist.contact}
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-yellow-300" /> {psychologist.email}
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin className="text-yellow-300" /> {psychologist.city},
              {psychologist.country}
            </p>
          </div>
        </div>

        <div className="col-span-2 p-8 space-y-6">
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{psychologist.bio}</p>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Professional Details
            </h2>
            <ul className="text-gray-700 space-y-4 mt-4">
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Experience:</strong>{" "}
                {psychologist.experience?.join(", ") || "N/A"}
              </li>
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Education:</strong>{" "}
                {psychologist.education?.join(", ") || "N/A"}
              </li>
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Availability:</strong>{" "}
                {psychologist.availability || "N/A"}
              </li>
              <li className="flex items-center gap-2">
                <FiAward className="text-indigo-600" />
                <strong>Consultation Fee:</strong>{" "}
                {psychologist.consultationFee
                  ? `$${psychologist.consultationFee}`
                  : "N/A"}
              </li>
              <li className="flex items-center gap-2">
                <FiStar className="text-yellow-400" />
                <strong>Rating:</strong> {psychologist.rating || "N/A"} / 5
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            {!isDoctorSelected ? (
              <button
                onClick={handleSelectDoctor}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-600 shadow-lg transition-all"
              >
                Select as My Doctor
              </button>
            ) : (
              <div className="text-green-600 text-lg font-semibold text-center">
                You have selected this psychologist.
              </div>
            )}
          </div>

          {isDoctorSelected && (
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Chat with {psychologist.firstName}
              </h2>
              <div className="max-h-64 overflow-auto mb-4">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`mb-3 ${
                      chat.sender === "user" ? "text-left" : "text-right"
                    }`}
                  >
                    <p
                      className={`inline-block px-4 py-2 rounded-xl ${
                        chat.sender === "user"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {chat.message}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-4 flex-col sm:flex-row mt-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows="2"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PsychologistDetailsPage;
