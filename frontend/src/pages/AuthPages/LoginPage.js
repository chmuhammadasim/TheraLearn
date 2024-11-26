import React, { useState, useEffect, useContext } from 'react';
import { logInUser } from '../../services/authService';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../components/AuthContext/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoggingIn(true);
    setMessage('');

    try {
      const credentials = { email, password };
      const data = await logInUser(credentials);
      setMessage('Login successful');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authRole', data.role);
      login(data.token, data.role);
      navigate('/');
    } catch (error) {
      setMessage(error.message || 'Something went wrong, please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#92ffff] to-[#799cfa] text-[#0e2431] relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute w-96 h-96 bg-[#3afc7b] rounded-full top-10 right-20 opacity-70"
        animate={{ y: [0, 50, 0], rotate: [0, 360] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-[#f94848] rounded-full bottom-20 left-10 opacity-70"
        animate={{ y: [0, -50, 0], rotate: [0, -360] }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-[#85f876] rounded-full top-[50%] right-[40%] opacity-70"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="relative bg-white p-10 rounded-lg shadow-xl w-full max-w-lg text-center z-10">

        <motion.h1
          className="text-5xl font-bold text-[#fc3a52] mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Welcome Back!
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

        <form onSubmit={handleLogin} className="space-y-6">
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-transform transform hover:scale-105 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fc3a52]'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-transform transform hover:scale-105 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#fc3a52]'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </motion.div>

          <motion.button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-[#fc3a52] text-white rounded-lg hover:bg-[#f8c731] transition-transform transform hover:scale-105 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {loggingIn ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                Logging in...
              </div>
            ) : 'Login'}
          </motion.button>
        </form>

        <motion.p
          className="mt-4 text-[#0e2431] text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Not a member?{' '}
          <a href="/signup" className="text-[#fc3a52] hover:underline transition-colors duration-300">
            Register here
          </a>
        </motion.p>
      </div>
    </div>
  );
}

export default LoginPage;
