import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReply, FaEnvelope, FaUser, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SuperAdminContactUs = () => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState({ subject: '', replyMessage: '' });
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
      setReply({ subject: '', replyMessage: '' });
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700 bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mr-4"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 mt-16 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl font-extrabold mb-14 text-gray-900 tracking-tight drop-shadow-lg">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Super Admin
          </span>
          <span className="text-gray-700"> - User Queries</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {queries.map((query, idx) => (
            <motion.div
              key={query._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 opacity-10 text-[7rem] pointer-events-none select-none">
                <FaEnvelope />
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-2 mr-2 shadow">
                    <FaUser />
                  </span>
                  {query.name}
                </h3>
                <p className="text-gray-600 flex items-center mb-3">
                  <FaEnvelope className="mr-2 text-blue-500" /> {query.email}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-gray-800">Message:</span>
                  <span className="block mt-1 text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-100 shadow-inner">
                    {query.message}
                  </span>
                </p>
                <p className="text-gray-500 flex items-center text-sm">
                  <FaCalendarAlt className="mr-2 text-purple-500" /> {new Date(query.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedQuery(query);
                  setReply({ subject: '', replyMessage: '' });
                }}
                className="absolute top-4 right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center shadow-lg font-semibold"
                title="Reply"
              >
                <FaReply className="inline mr-2" /> Reply
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-12 shadow-2xl w-full max-w-xl mx-4 relative border-2 border-purple-200"
              >
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                  title="Close"
                >
                  <FaTimes />
                </button>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
                  Reply to{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedQuery.name}
                  </span>
                </h2>
                <div className="mb-6">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={reply.subject}
                    onChange={handleReplyChange}
                    className="w-full border border-purple-200 p-4 rounded-xl mb-4 focus:ring-2 focus:ring-purple-400 bg-purple-50 text-lg shadow"
                  />
                  <textarea
                    name="replyMessage"
                    placeholder="Write your reply here..."
                    value={reply.replyMessage}
                    onChange={handleReplyChange}
                    className="w-full border border-purple-200 p-4 rounded-xl h-40 focus:ring-2 focus:ring-purple-400 bg-purple-50 text-lg resize-none shadow"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleSendReply(selectedQuery.email)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg"
                  >
                    Send Reply
                  </button>
                  <button
                    onClick={() => setSelectedQuery(null)}
                    className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-all duration-300 shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuperAdminContactUs;
