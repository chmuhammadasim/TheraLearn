import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import './ContactUs.css';

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <div>
        <h1>Thank you for contacting us!</h1>
        <p>We have received your message and will get back to you soon.</p>
        <button onClick={handleReset}>Send Another Message</button>
      </div>
    );
  }

  return (
    <div className='background'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default ContactUsPage;
