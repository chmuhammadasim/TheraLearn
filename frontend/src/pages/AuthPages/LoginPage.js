import React, { useState, useEffect, useContext } from 'react';
import { logInUser } from '../../services/authService';
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
      const credentials = { email, password };
      const data = await logInUser(credentials);
      setMessage('Login successful');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authRole', data.role);
      if(data.role === 'parent') {
        localStorage.setItem('authUser', JSON.stringify(data.parent));
        localStorage.setItem('authChildren', JSON.stringify(data.children));
        setChildren(data.children);
        setShowChildPopup(true);
      }
      login(data.token, data.role);
    } catch (error) {
      setMessage(error.message || 'Something went wrong, please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleChildSelection = (child) => {
    localStorage.setItem('selectedChild', JSON.stringify(child));
    setShowChildPopup(false);
    window.location.href = "/";
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 text-white relative overflow-hidden p-6">
      <div className="relative bg-white p-10 rounded-lg shadow-xl w-full max-w-lg text-center z-10 text-gray-800">
        <motion.h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome Back!</motion.h1>

        {message && <p className={`mb-4 text-lg ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-left text-lg font-medium">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-left text-lg font-medium">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" disabled={loggingIn} className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-300">
            {loggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {showChildPopup && (
        <div className="absolute z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center text-gray-800">
            <h2 className="text-2xl font-bold mb-4">Select a Child</h2>
            {children.length > 0 ? (
              children.map((child) => (
                <button key={child._id} onClick={() => handleChildSelection(child)} className="block w-full p-3 bg-blue-500 text-white rounded-lg mb-2 hover:bg-blue-600">
                  {child.firstName} {child.lastName}
                </button>
              ))
            ) : (
              <p>No children found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
