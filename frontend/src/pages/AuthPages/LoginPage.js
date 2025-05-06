import React, { useState, useEffect, useContext } from 'react';
import { logInUser, forgotPassword } from '../../services/authService';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { AuthContext } from "../../components/AuthContext/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [children, setChildren] = useState([]);
  const [showChildPopup, setShowChildPopup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
      // Validate inputs again as a safety measure
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const credentials = { email, password };
      
      // Handle network errors with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      try {
        const data = await logInUser(credentials, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!data) throw new Error('No response received from server');
        if (!data.token) throw new Error('Authentication failed: No token received');
        
        setMessage('Login successful');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authRole', data.role || 'user');
        
        if (data.role === 'parent') {
          // Ensure all expected data is available
          if (!data.parent) throw new Error('User data incomplete');
          
          localStorage.setItem('authUser', JSON.stringify(data.parent));
          localStorage.setItem('authChildren', JSON.stringify(data.children || []));
          localStorage.setItem('assignedDoctor', JSON.stringify(data.assignedDoctor || null));
          
          setChildren(data.children || []);
          if (data.children && data.children.length > 0) {
            setShowChildPopup(true);
          } else {
            // Handle case when parent has no children
            setMessage('Login successful. No children profiles found.');
          }
        }
        
        login(data.token, data.role);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      // Handle specific error cases
      if (error.name === 'AbortError') {
        setMessage('Login request timed out. Please check your connection and try again.');
      } else if (error.status === 401) {
        setMessage('Invalid email or password.');
      } else if (error.status === 403) {
        setMessage('Your account has been locked. Please contact support.');
      } else if (!navigator.onLine) {
        setMessage('You appear to be offline. Please check your internet connection.');
      } else {
        setMessage(error.message || 'Something went wrong, please try again.');
      }
      
      // Clear any potentially sensitive data
      localStorage.removeItem('authToken');
      console.error('Login error:', error);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleChildSelection = (child) => {
    localStorage.setItem('selectedChild', JSON.stringify(child));
    localStorage.setItem('selectedChildId', JSON.stringify(child._id));
    setShowChildPopup(false);
    window.location.href = "/";
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage('');
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotMessage('Please enter a valid email address.');
      return;
    }
    setForgotLoading(true);
    try {
      await forgotPassword(forgotEmail);
      setForgotMessage('Password reset instructions sent to your email.');
    } catch (err) {
      setForgotMessage(err.message || 'Failed to send reset instructions.');
    } finally {
      setForgotLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 text-white relative overflow-hidden p-6">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full opacity-30 blur-2xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800 rounded-full opacity-20 blur-3xl -z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="relative bg-white/90 backdrop-blur-md p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center z-10 text-gray-800 border border-blue-100"
      >
        <motion.h1
          className="text-5xl font-extrabold text-blue-700 mb-4 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back!
        </motion.h1>
        <p className="mb-8 text-lg text-gray-500">Sign in to your TheraLearn account</p>

        {message && (
          <motion.p
            className={`mb-4 text-lg font-semibold ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}

        {!showForgot ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-left text-lg font-medium mb-1 text-blue-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-blue-50 ${errors.email ? 'border-red-400' : 'border-blue-200'}`}
                placeholder="you@email.com"
                autoComplete="username"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div>
              <label className="block text-left text-lg font-medium mb-1 text-blue-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-blue-50 ${errors.password ? 'border-red-400' : 'border-blue-200'}`}
                placeholder="Your password"
                autoComplete="current-password"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 disabled:opacity-60"
            >
              {loggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label className="block text-left text-lg font-medium mb-1 text-blue-700">Enter your email</label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-blue-50 border-blue-200"
                placeholder="you@email.com"
                autoComplete="username"
              />
            </div>
            <button
              type="submit"
              disabled={forgotLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 disabled:opacity-60"
            >
              {forgotLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            {forgotMessage && (
              <div className={`text-sm mt-2 ${forgotMessage.includes('sent') ? 'text-green-600' : 'text-red-500'}`}>
                {forgotMessage}
              </div>
            )}
            <button
              type="button"
              onClick={() => { setShowForgot(false); setForgotMessage(''); }}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="mt-6 flex justify-between text-sm text-blue-600">
          <button
            type="button"
            className="hover:underline"
            onClick={() => { setShowForgot(true); setForgotMessage(''); setForgotEmail(''); }}
          >
            Forgot password?
          </button>
          <a href="/register" className="hover:underline">Create account</a>
        </div>
      </motion.div>

      {showChildPopup && (
        <div className="absolute z-20 inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center text-gray-800 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Select a Child</h2>
            {children.length > 0 ? (
              <div className="space-y-3">
                {children.map((child) => (
                  <button
                    key={child._id}
                    onClick={() => handleChildSelection(child)}
                    className="block w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow"
                  >
                    {child.firstName} {child.lastName}
                  </button>
                ))}
              </div>
            ) : (
              <p>No children found</p>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
