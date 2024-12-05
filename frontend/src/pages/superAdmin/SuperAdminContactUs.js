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
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/query/all`, {
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
        `${process.env.REACT_APP_API_KEY}/query/reply`,
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
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">Loading...</div>;
  }

  return (
    <div className="container bg-gray-300 mx-auto p-6 pt-16 pb-16">
      <h1 className="text-center text-4xl mt-16 font-bold mb-12 text-gray-900">Super Admin - User Queries</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {queries.map((query) => (
          <motion.div
            key={query._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
                <FaUser className="text-gray-500 mr-2" /> {query.name}
              </h3>
              <p className="text-gray-600 flex items-center mb-3">
                <FaEnvelope className="mr-2" /> {query.email}
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Message:</strong> {query.message}
              </p>
              <p className="text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2" /> {new Date(query.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedQuery(query)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
            >
              <FaReply className="inline mr-2" /> Reply
            </button>
          </motion.div>
        ))}
      </div>

      {selectedQuery && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 shadow-lg w-full md:max-w-2xl m-3"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reply to {selectedQuery.name}</h2>
            <div className="mb-5">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={reply.subject}
                onChange={handleReplyChange}
                className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-gray-500"
              />
              <textarea
                name="replyMessage"
                placeholder="Write your reply here..."
                value={reply.replyMessage}
                onChange={handleReplyChange}
                className="w-full border border-gray-300 p-3 rounded-lg h-48 focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleSendReply(selectedQuery.email)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Send Reply
              </button>
              <button
                onClick={() => setSelectedQuery(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
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
