import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { submitQuery } from '../../services/queryService';
import './ContactUs.css';
import Loading from '../../components/Loading';

function ContactUsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      // Submit the query using the service
      await submitQuery(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (submitted) {
    return (
      <div className="submitted">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          🎉 Thank you for contacting us!
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          We have received your message and will get back to you soon.
        </motion.p>
        <motion.button
          onClick={handleReset}
          className="bg-[#61d4b3] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#4daa8b] transition"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          Send Another Message
        </motion.button>
      </div>
    );
  }

  return (
    <div className="contact-container mt-10 p-6">
      <motion.h1
        className="text-5xl font-extrabold mb-12 text-center gradient-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us ✉️
      </motion.h1>

      {/* Contact Information */}
      <div className="flex flex-col  md:flex-row justify-around items-center mb-12">
        <motion.div
          className="flex m-5 items-center mb-6 md:mb-0 info-box"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaEnvelope className="text-[#fc3a52]  text-6xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">Email Us</h2>
            <p className="text-lg">contact@kidssite.com</p>
          </div>
        </motion.div>
        <motion.div
          className="flex m-5 items-center mb-6 md:mb-0 info-box"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaPhone className="text-[#48e4f9] text-6xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">Call Us</h2>
            <p className="text-lg">+123 456 7890</p>
          </div>
        </motion.div>
        <motion.div
          className="flex m-5 items-center mb-6 md:mb-0 info-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="text-[#f8c731] text-6xl mr-4" />
          <div>
            <h2 className="text-2xl font-bold">Visit Us</h2>
            <p className="text-lg">123 Kids St, Fun City</p>
          </div>
        </motion.div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-container bg-white shadow-lg p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error-input' : ''}`}
            />
            {errors.name && <p className="error-text">{errors.name} 😟</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error-input' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email} 😟</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-input ${errors.message ? 'error-input' : ''}`}
            />
            {errors.message && <p className="error-text">{errors.message} 😟</p>}
          </div>
          <div className="form-buttons">
            <motion.button
              type="submit"
              className="bg-[#61d4b3] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#4daa8b] transition"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Submit 🚀
            </motion.button>
            <motion.button
              type="button"
              onClick={handleReset}
              className="bg-[#ff347f] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#c9356c] transition"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Reset 🔄
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
