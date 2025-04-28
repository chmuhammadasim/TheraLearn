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
  FiSend,
  FiMessageSquare,
  FiUserCheck,
  FiClock,
  FiDollarSign,
  FiBookOpen,
  FiBriefcase,
} from "react-icons/fi";
import { motion } from "framer-motion";

function PsychologistDetailsPage() {
  const { id } = useParams();
  const [psychologist, setPsychologist] = useState(null);
  const [isDoctorSelected, setIsDoctorSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      let storedId = localStorage.getItem("assignedDoctor");
      storedId = storedId ? storedId.replace(/^"|"$/g, "") : "";
      
      if (!storedId) {
        storedId = await getAssignedPsychologists();
      }
      
      if (storedId) {
        const psychologistData = await getPsychologistById(storedId);
        setPsychologist(psychologistData);
        setIsDoctorSelected(true);
        const history = await getChatHistoryUser(storedId);
        setChatHistory(history.filteredMessages || []);
      } else {
        const psychologistData = await getPsychologistById(id);
        setPsychologist(psychologistData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      localStorage.setItem("assignedDoctor", JSON.stringify(psychologist._id));
      
      // Show success notification
      const notification = document.getElementById("notification");
      notification.classList.remove("hidden");
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 3000);
    } catch {
      alert("Failed to select psychologist.");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !psychologist?._id) return;
    try {
      const newMessage = { sender: "user", message, timestamp: new Date() };
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mx-auto mb-4"></div>
          <p className="text-xl text-blue-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!psychologist) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-xl text-red-500 mb-4">Psychologist not found</p>
          <a href="/psychologists" className="text-blue-500 hover:underline">Return to psychologists list</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-10 px-4">
      {/* Success notification */}
      <div id="notification" className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 hidden transform transition-all duration-500 ease-in-out">
        <p className="flex items-center">
          <FiUserCheck className="mr-2" size={20} />
          Psychologist selected successfully!
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 transition-all"
      >
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col items-center relative">
          <div className="absolute top-4 right-4">
            <div className="h-4 w-4 rounded-full bg-green-400 animate-pulse"></div>
          </div>
          
          <div className="relative group">
            <img
              src={psychologist.profilePictureUrl || "https://via.placeholder.com/200"}
              alt={`${psychologist.firstName} ${psychologist.lastName}`}
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-105 object-cover"
              onError={(e) => {e.target.src = "https://via.placeholder.com/200?text=No+Image"}}
            />
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300"></div>
          </div>
          
          <h1 className="text-3xl font-bold mb-1 text-center">
            {psychologist.firstName} {psychologist.lastName}
          </h1>
          <p className="text-lg italic text-blue-100 mb-2">{psychologist.specialization || "General Psychologist"}</p>
          
          <div className="flex items-center mb-4">
            {[...Array(Math.round(psychologist.rating || 0))].map((_, i) => (
              <FiStar key={i} className="text-yellow-300 fill-current" />
            ))}
            {[...Array(5 - Math.round(psychologist.rating || 0))].map((_, i) => (
              <FiStar key={i + 5} className="text-yellow-300" />
            ))}
          </div>
          
          <div className="mt-5 space-y-4 text-sm bg-blue-800 bg-opacity-30 p-4 rounded-xl w-full">
            <p className="flex items-center gap-3">
              <FiPhone className="text-blue-200 flex-shrink-0" /> 
              <span>{psychologist.contact || "Not provided"}</span>
            </p>
            <p className="flex items-center gap-3">
              <FiMail className="text-blue-200 flex-shrink-0" /> 
              <span className="break-all">{psychologist.email || "Not provided"}</span>
            </p>
            <p className="flex items-center gap-3">
              <FiMapPin className="text-blue-200 flex-shrink-0" /> 
              <span>{psychologist.city || "City"}, {psychologist.country || "Country"}</span>
            </p>
          </div>
          
          {!isDoctorSelected && (
            <button
              onClick={handleSelectDoctor}
              className="mt-8 w-full bg-white text-indigo-700 py-3 px-6 rounded-lg hover:bg-indigo-50 shadow-lg transition-all duration-300 font-bold flex items-center justify-center gap-2"
            >
              <FiUserCheck size={20} />
              Select as My Psychologist
            </button>
          )}
          
          {isDoctorSelected && (
            <div className="mt-8 text-center p-4 bg-green-500 bg-opacity-20 rounded-xl w-full">
              <FiUserCheck className="mx-auto mb-2" size={24} />
              <p className="text-lg font-semibold">Your Current Psychologist</p>
            </div>
          )}
        </div>

        <div className="col-span-2 p-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiBookOpen className="text-indigo-600" />
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{psychologist.bio || "No biography provided."}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiAward className="text-indigo-600" />
              Professional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                <p className="flex items-center gap-3 text-gray-700">
                  <FiBriefcase className="text-indigo-500 flex-shrink-0" size={18} />
                  <span><strong>Experience:</strong> {psychologist.experience?.join(", ") || "Not specified"}</span>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                <p className="flex items-center gap-3 text-gray-700">
                  <FiBookOpen className="text-indigo-500 flex-shrink-0" size={18} />
                  <span><strong>Education:</strong> {psychologist.education?.join(", ") || "Not specified"}</span>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                <p className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-indigo-500 flex-shrink-0" size={18} />
                  <span><strong>Availability:</strong> {psychologist.availability || "Not specified"}</span>
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
                <p className="flex items-center gap-3 text-gray-700">
                  <FiDollarSign className="text-indigo-500 flex-shrink-0" size={18} />
                  <span><strong>Consultation Fee:</strong> {psychologist.consultationFee ? `$${psychologist.consultationFee}` : "Not specified"}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {isDoctorSelected && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiMessageSquare className="text-indigo-600" />
                Chat with {psychologist.firstName}
              </h2>
              <div 
                ref={chatContainerRef}
                className="bg-white rounded-lg shadow-inner p-4 h-72 overflow-auto mb-4 scroll-smooth"
              >
                {chatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <FiMessageSquare size={40} className="mb-2" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-3 ${
                        chat.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                          chat.sender === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{chat.message}</p>
                        <p className={`text-xs mt-1 ${
                          chat.sender === "user" ? "text-indigo-200" : "text-gray-500"
                        }`}>
                          {new Date(chat.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2 mt-4">
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
                  rows="2"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`px-6 rounded-lg flex items-center justify-center transition-all ${
                    message.trim() 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FiSend size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default PsychologistDetailsPage;
