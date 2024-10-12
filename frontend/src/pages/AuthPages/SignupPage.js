  import React, { useState, useEffect } from 'react';
  import { signUpUser } from '../../services/authService';
  import { useNavigate } from 'react-router-dom';
  import Loading from '../../components/Loading';
  import { motion } from 'framer-motion';
  import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

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
      <div className="min-h-screen pb-10 flex items-center justify-center bg-gradient-to-r from-[#64ff8b] via-[#a6c0fe] to-[#9678ff] relative overflow-hidden pt-20">
        {/* Animated Background */}
        {/* <motion.div
          className="absolute inset-0 bg-[#ff7560] opacity-70 rounded-full"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 bg-[#ffdf60] opacity-70 rounded-full"
          initial={{ scale: 0.6 }}
          animate={{ scale: 0.8 }}
          transition={{ duration: 6, ease: 'easeInOut' }}
        /> */}

        <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl text-center">
          <motion.img
            src="LOGO.png"
            alt="Logo"
            className="mx-auto mb-4 w-24 h-24"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
          <motion.h1
            className="text-4xl font-bold text-[#2c3e50] mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#e74c3c]">Join Us!</span>
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
          <div className="flex justify-center mb-6 gap-5">
            <button
              className={`py-2 px-4 font-semibold rounded-l-lg ${!isPsychologist ? 'bg-[#e74c3c] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setIsPsychologist(false)}
            >
              User Signup
            </button>
            <button
              className={`py-2 px-4 font-semibold rounded-r-lg ${isPsychologist ? 'bg-[#e74c3c] text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setIsPsychologist(true)}
            >
              Psychologist Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                  required
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                />
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">City:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                />
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                />
              </div>
              <div className="form-group">
                <label className="block text-left text-lg font-medium text-[#2c3e50]">Contact:</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#2c3e50]">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
              />
            </div>

            {/* Profile Picture URL */}
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#2c3e50]">Profile Picture URL:</label>
              <input
                type="text"
                name="profilePictureUrl"
                value={formData.profilePictureUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label className="block text-left text-lg font-medium text-[#2c3e50]">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                required
              />
              {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
            </div>

            {/* Additional Fields for Psychologists */}
            {isPsychologist && (
              <>
                {/* Education Fields */}
                <div>
                  <label className="block text-left text-lg font-medium text-[#2c3e50]">Education:</label>
                  {formData.educations.map((education, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <input
                        type="text"
                        value={education}
                        onChange={(e) => handleEducationChange(index, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                        placeholder={`Education ${index + 1}`}
                        required
                      />
                      {formData.educations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="ml-2 text-red-500"
                        >
                          <FaMinusCircle size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducation}
                    className="flex items-center text-[#fff]  mb-4"
                  >
                    <FaPlusCircle size={20} className="mr-2" /> Add Education
                  </button>
                </div>

                {/* Experience Fields */}
                <div>
                  <label className="block text-left text-lg font-medium text-[#2c3e50]">Experience:</label>
                  {formData.experiences.map((experience, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <input
                        type="text"
                        value={experience}
                        onChange={(e) => handleExperienceChange(index, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
                        placeholder={`Experience ${index + 1}`}
                        required
                      />
                      {formData.experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="ml-2 text-red-500"
                        >
                          <FaMinusCircle size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperience}
                    className="flex items-center text-[#ffffff] mb-4 bg-slate-400"
                  >
                    <FaPlusCircle size={20} className="mr-2" /> Add Experience
                  </button>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#e74c3c] text-white font-semibold rounded-lg shadow-md hover:bg-[#c0392b] transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default SignupPage;
