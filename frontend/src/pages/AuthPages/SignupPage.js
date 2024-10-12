import React, { useState, useEffect } from 'react';
import { signUpUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
// import { Cloudinary } from '@cloudinary/url-gen';

const App = () => {
  //const cld = new Cloudinary({ cloud: { cloudName: 'do7z15tdv' } });
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [formData, setFormData] = useState(initialFormData());
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function initialFormData() {
    return {
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
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (type, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[type]];
      newArray[index] = value;
      return { ...prev, [type]: newArray };
    });
  };

  const addArrayItem = (type) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ''] }));
  };

  const removeArrayItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      'username', 'email', 'password', 'confirmPassword', 'firstName', 'lastName', 'dateOfBirth'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${capitalizeFirstLetter(field)} is required`;
    });

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    // Validate psychologist specific fields
    if (isPsychologist) {
      if (formData.educations.some((edu) => !edu)) newErrors.educations = 'All education fields are required';
      if (formData.experiences.some((exp) => !exp)) newErrors.experiences = 'All experience fields are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isUploading) return; // Prevent submission if uploading
      try {
        const response = await signUpUser({ ...formData, profilePictureUrl: uploadedImage, role: isPsychologist ? 'psychologist' : 'user' });
        if (response.status) {
          setMessage('Signup successful');
          navigate('/login');
        }
      } catch (error) {
        setMessage(error.message || 'An error occurred');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');

      setIsUploading(true); // Set uploading state
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/do7z15tdv/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          setUploadedImage(data.secure_url);
          console.log(data);
          
          setFormData((prev) => ({ ...prev, profilePictureUrl: data.secure_url }));
        } else {
          console.error('Image upload failed:', data);
          setMessage('Image upload failed, please try again.');
        }
      } catch (error) {
        console.error('Image upload failed:', error);
        setMessage('Image upload failed, please try again.');
      } finally {
        setIsUploading(false); // Reset uploading state
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pb-10 flex items-center justify-center bg-gradient-to-r from-[#64ff8b] via-[#a6c0fe] to-[#9678ff] relative overflow-hidden pt-20">
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

        <div className="flex justify-center mb-6 gap-5">
          <ToggleButton active={!isPsychologist} label="User Signup" onClick={() => setIsPsychologist(false)} />
          <ToggleButton active={isPsychologist} label="Psychologist Signup" onClick={() => setIsPsychologist(true)} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup title="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
          <InputGroup title="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputGroup title="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
          <InputGroup title="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <InputGroup title="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
          <InputGroup title="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />

          <AddressGroup formData={formData} handleChange={handleChange} />

          {/* Image Upload Field */}
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#2c3e50]">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ff8b]"
            />
            {isUploading && <p className='text font-semibold text-cyan-950'>Checking Profile Image...</p>}
            {uploadedImage && <p className='text font-semibold text-cyan-950'>Successfully Checked Image</p>}
          </div>

          <InputGroup title="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />

          {isPsychologist && (
            <div>
              <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Education:</h2>
              {formData.educations.map((education, index) => (
                <EducationInput key={index} index={index} value={education} onChange={handleArrayChange} onRemove={removeArrayItem} />
              ))}
              <button type="button" onClick={() => addArrayItem('educations')} className="flex items-center text-blue-500">
                <FaPlusCircle className="mr-2" /> Add Education
              </button>
              {errors.educations && <p className="text-red-500">{errors.educations}</p>}
            </div>
          )}

          {isPsychologist && (
            <div>
              <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Experience:</h2>
              {formData.experiences.map((experience, index) => (
                <ExperienceInput key={index} index={index} value={experience} onChange={handleArrayChange} onRemove={removeArrayItem} />
              ))}
              <button type="button" onClick={() => addArrayItem('experiences')} className="flex items-center text-blue-500">
                <FaPlusCircle className="mr-2" /> Add Experience
              </button>
              {errors.experiences && <p className="text-red-500">{errors.experiences}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-[#e74c3c] rounded-lg shadow-lg hover:bg-[#c0392b] transition duration-300"
            disabled={isUploading}
          >
            {isUploading ? 'Wait Checking Profile Image...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ToggleButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 font-semibold rounded-lg transition-colors ${active ? 'bg-[#e74c3c] text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
  >
    {label}
  </button>
);

const InputGroup = ({ title, name, value, onChange, error, type = 'text' }) => (
  <div className="form-group">
    <label className="block text-left text-lg font-medium text-[#2c3e50]">{title}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ff8b] ${error ? 'border-red-500' : ''}`}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

const AddressGroup = ({ formData, handleChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <InputGroup title="Address" name="address" value={formData.address} onChange={handleChange} />
    <InputGroup title="City" name="city" value={formData.city} onChange={handleChange} />
    <InputGroup title="Country" name="country" value={formData.country} onChange={handleChange} />
    <InputGroup title="Contact" name="contact" value={formData.contact} onChange={handleChange} />
    <InputGroup title="Bio" name="bio" value={formData.bio} onChange={handleChange} />
  </div>
);

const EducationInput = ({ index, value, onChange, onRemove }) => (
  <div className="flex items-center mb-2">
    <InputGroup title={`Education ${index + 1}`} name={`educations-${index}`} value={value} onChange={(e) => onChange('educations', index, e.target.value)} />
    <button type="button" onClick={() => onRemove('educations', index)} className="ml-2 text-red-500 hover:text-red-700">
      <FaMinusCircle />
    </button>
  </div>
);

const ExperienceInput = ({ index, value, onChange, onRemove }) => (
  <div className="flex items-center mb-2">
    <InputGroup title={`Experience ${index + 1}`} name={`experiences-${index}`} value={value} onChange={(e) => onChange('experiences', index, e.target.value)} />
    <button type="button" onClick={() => onRemove('experiences', index)} className="ml-2 text-red-500 hover:text-red-700">
      <FaMinusCircle />
    </button>
  </div>
);

export default App;
