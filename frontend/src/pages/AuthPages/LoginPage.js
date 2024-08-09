import React, { useState, useEffect } from 'react';
import { logInUser } from '../../services/authService';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setMessage('');

    try {
      const credentials = { email, password };
      const data = await logInUser(credentials);
      setMessage('Login successful');
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f948db] to-[#fd26eb] relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#0e2431] opacity-40"
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 5, ease: 'circInOut', repeat: Infinity }}
      />
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden">
        {/* Cartoon Illustration */}
        <motion.img
          src="Boy1.png"
          alt="Cartoon Character"
          className="absolute z-0x top-[10px] left-[20px] w-auto h-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <motion.h1
          className="text-4xl font-bold text-[#0e2431] mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#fc3a52]">Welcome Back!</span>
        </motion.h1>
        {message && (
          <motion.p
            className={`mb-4 text-lg ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </motion.p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#0e2431]">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52] transition-transform transform hover:scale-105"
            />
          </div>
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#0e2431]">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52] transition-transform transform hover:scale-105"
            />
          </div>
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-[#fc3a52] text-white rounded-lg hover:bg-[#f8c731] transition-transform transform hover:scale-105"
          >
            {loggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <motion.p
          className="mt-4 text-[#0e2431] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Not a member? <a href="/signup" className="text-[#fc3a52] hover:underline">Register here</a>
        </motion.p>
      </div>
    </div>
  );
}

export default LoginPage;
