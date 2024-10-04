import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReply, FaEnvelope, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SuperAdminContactUs = () => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState({ email: '', subject: '', replyMessage: '' });
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/query/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setQueries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReply({ ...reply, [name]: value });
  };

  const handleSendReply = async (email) => {
    try {
      await axios.post(
        'http://localhost:5000/api/query/reply',
        { email, subject: reply.subject, replyMessage: reply.replyMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      alert('Reply sent successfully!');
      setSelectedQuery(null);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-bold">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-16 mb-8">
      <h1 className="p-6 bg-opacity-20 rounded-full text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        Super Admin - User Queries
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {queries.map((query) => (
          <motion.div
            key={query._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-3xl transition-shadow duration-300 relative transform border-l-4 border-blue-500"
          >
            <div className="mb-4 text-left">
              <p className="font-bold text-2xl flex items-center text-blue-700 mb-2">
                <FaUser className="text-blue-600 mr-3" /> {query.name}
              </p>
              <p className="text-lg text-gray-700 flex items-center mb-3">
                <FaEnvelope className="text-gray-500 mr-2" /> {query.email}
              </p>
              <p className="text-md text-gray-700 mb-3">
                <strong>Message:</strong> {query.message}
              </p>
              <p className="text-md text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2" /> {new Date(query.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedQuery(query)}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-5 py-2 rounded-full flex items-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <FaReply className="inline mr-2" /> Reply
            </button>
          </motion.div>
        ))}
      </div>

      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="bg-white rounded-lg p-10 shadow-lg w-full max-w-lg border-t-4 border-purple-500"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
              Reply to {selectedQuery.name}
            </h2>
            <div className="mb-5">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={reply.subject}
                onChange={handleReplyChange}
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <textarea
                name="replyMessage"
                placeholder="Write your reply here..."
                value={reply.replyMessage}
                onChange={handleReplyChange}
                className="w-full border border-gray-300 p-3 rounded-lg h-36 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleSendReply(selectedQuery.email)}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Send Reply
              </button>
              <button
                onClick={() => setSelectedQuery(null)}
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminContactUs;
