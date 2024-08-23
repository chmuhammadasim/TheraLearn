import React, { useState, useEffect } from 'react';
import { signUpUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBriefcase, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

function SignupPage() {
  const [isPsychologist, setIsPsychologist] = useState(false);
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
    dateOfBirth: '',
    role: 'user',
    educations: [''],
    experiences: [''],
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

  const handleEducationChange = (index, value) => {
    const newEducations = [...formData.educations];
    newEducations[index] = value;
    setFormData({ ...formData, educations: newEducations });
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index] = value;
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addEducation = () => {
    setFormData({ ...formData, educations: [...formData.educations, ''] });
  };

  const removeEducation = (index) => {
    const newEducations = formData.educations.filter((_, i) => i !== index);
    setFormData({ ...formData, educations: newEducations });
  };

  const addExperience = () => {
    setFormData({ ...formData, experiences: [...formData.experiences, ''] });
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExperiences });
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

    if (isPsychologist) {
      if (formData.educations.some((education) => !education)) newErrors.educations = 'All education fields are required';
      if (formData.experiences.some((experience) => !experience)) newErrors.experiences = 'All experience fields are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await signUpUser({ ...formData, role: isPsychologist ? 'psychologist' : 'user' });
        if (response.status === '201') {
          setMessage('Signup successful');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#31f83b] to-[#3afcd2] relative overflow-hidden p-4 md:pt-24 md:pb-24">
      {/* Animated Background */}
      {/* Background motion divs here... */}
      
      <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl text-center overflow-hidden mt-20 md:mt-0">
        <motion.img
          src="LOGO.png"
          alt="Logo"
          className="mx-auto mb-4 md:mb-6 w-20 h-20 md:w-24 md:h-24"
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

        {/* Toggle between User and Psychologist */}
        <div className="flex justify-center mb-6">
          <button
            className={`py-2 px-4 font-semibold rounded-l-lg ${!isPsychologist ? 'bg-[#fc3a52] text-white' : 'bg-gray-200'}`}
            onClick={() => setIsPsychologist(false)}
          >
            User Signup
          </button>
          <button
            className={`py-2 px-4 font-semibold rounded-r-lg ${isPsychologist ? 'bg-[#fc3a52] text-white' : 'bg-gray-200'}`}
            onClick={() => setIsPsychologist(true)}
          >
            Psychologist Signup
          </button>
        </div>

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

          {/* Personal Information */}
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

          {/* Address and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
            </div>
          </div>

          {/* Country and Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#0e2431]">Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                required
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

          {/* Bio */}
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#0e2431]">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
              rows="4"
            />
          </div>

          {/* Profile Picture */}
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#0e2431]">Profile Picture URL:</label>
            <input
              type="url"
              name="profilePictureUrl"
              value={formData.profilePictureUrl}
              onChange={handleChange}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
            />
          </div>

          {/* Education and Experience Fields for Psychologist */}
          {isPsychologist && (
            <>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#0e2431]">Education:</label>
                {formData.educations.map((education, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <FaUserGraduate className="text-[#f8c731] text-2xl" />
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => handleEducationChange(index, e.target.value)}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                      placeholder="Education details"
                      required
                    />
                    {formData.educations.length > 1 && (
                      <FaMinusCircle
                        className="text-red-500 text-2xl cursor-pointer"
                        onClick={() => removeEducation(index)}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center text-[#0e2431] hover:text-[#fc3a52] transition duration-200"
                >
                  <FaPlusCircle className="mr-1" />
                  Add Education
                </button>
                {errors.educations && <span className="text-red-500 text-sm">{errors.educations}</span>}
              </div>

              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#0e2431]">Experience:</label>
                {formData.experiences.map((experience, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <FaBriefcase className="text-[#f8c731] text-2xl" />
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => handleExperienceChange(index, e.target.value)}
                      className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc3a52]"
                      placeholder="Experience details"
                      required
                    />
                    {formData.experiences.length > 1 && (
                      <FaMinusCircle
                        className="text-red-500 text-2xl cursor-pointer"
                        onClick={() => removeExperience(index)}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center text-[#0e2431] hover:text-[#fc3a52] transition duration-200"
                >
                  <FaPlusCircle className="mr-1" />
                  Add Experience
                </button>
                {errors.experiences && <span className="text-red-500 text-sm">{errors.experiences}</span>}
              </div>
            </>
          )}

          <motion.button
            type="submit"
            className="w-full p-3 md:p-4 bg-[#fc3a52] text-white font-semibold rounded-lg hover:bg-[#0e2431] transition duration-200"
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
