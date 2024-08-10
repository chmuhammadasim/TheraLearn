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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f76b1c] to-[#ffaf2b] text-[#0e2431] relative overflow-hidden">
      {/* Background Animation */}
      {/* <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#0e2431] opacity-40"
        initial={{ opacity: 0.0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 5, ease: 'circInOut', repeat: Infinity }}
      /> */}
      
      {/* Floating Shapes Animation */}
      <motion.div
        className="absolute w-64 h-64 bg-[#fc3a52] rounded-full top-10 right-20 opacity-70"
        animate={{ y: [0, 30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-[#f9b248] rounded-full bottom-20 left-10 opacity-70"
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center overflow-hidden">
        {/* Cartoon Illustration */}
        <motion.img
          src="Boy1.png"
          alt="Cartoon Character"
          className="absolute z-0 top-[10px] left-[20px] w-auto h-20"
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
          <motion.div
            className="form-group"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-left text-lg font-medium text-[#0e2431]">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52] transition-transform transform hover:scale-105"
            />
          </motion.div>
          
          <motion.div
            className="form-group"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <label className="block text-left text-lg font-medium text-[#0e2431]">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52] transition-transform transform hover:scale-105"
            />
          </motion.div>
          
          <motion.button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-[#fc3a52] text-white rounded-lg hover:bg-[#f8c731] transition-transform transform hover:scale-105"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {loggingIn ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
        
        <motion.p
          className="mt-4 text-[#0e2431] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Not a member? <a href="/signup" className="text-[#fc3a52] hover:underline">Register here</a>
        </motion.p>
      </div>
    </div>
  );
}

export default LoginPage;
