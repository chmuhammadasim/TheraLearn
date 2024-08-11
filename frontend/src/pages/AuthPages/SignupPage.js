import React, { useState, useEffect } from 'react';
import { signUpUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    contact: '',
    bio: '',
    profilePictureUrl: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response =await signUpUser(formData);
        setMessage('Signup successful');
        if (response.status === 201) {
          navigate('/login');
        }
      } catch (error) {
        setMessage(error.message || 'An error occurred');
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#31f83b] to-[#ec3afc] relative overflow-hidden p-4 md:pt-24 md:pb-24">
      {/* Animated Background */}
      {/* <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#0e2431] opacity-20"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
      /> */}
      <motion.div
        className="absolute w-64 h-64 bg-[#98fc3a] rounded-full top-10 right-20 opacity-70"
        animate={{ y: [0, 30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-[#48f9e1] rounded-full bottom-20 left-10 opacity-70"
        animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Fun Illustration */}
      {/* <motion.img
        src="https://via.placeholder.com/150x150?text=Cartoon+Icon"
        alt="Cartoon Icon"
        className="absolute top-[-50px] left-[-50px] w-20 h-20 md:w-32 md:h-32"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      /> */}
      <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl text-center overflow-hidden mt-20 md:mt-0">
        {/* Logo */}
        <motion.img
          src="https://via.placeholder.com/100x100?text=Logo"
          alt="Logo"
          className="mx-auto mb-4 md:mb-6 w-16 h-16 md:w-24 md:h-24"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#0e2431] mb-2 md:mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#fc3a52]">Join Us!</span>
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
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Username and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>
          </div>

          {/* Address and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              />
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Contact:</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              />
            </div>
          </div>

          {/* City and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              />
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              />
            </div>
          </div>

          {/* Bio and Profile Picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Profile Picture URL:</label>
              <input
                type="text"
                name="profilePictureUrl"
                value={formData.profilePictureUrl}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#0e2431]">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              required
            />
            {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
          </div>

          <motion.button
            type="submit"
            className="w-full p-2 md:p-3 bg-[#fc3a52] text-white rounded-lg hover:bg-[#0e2431] hover:text-[#f8c731] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
