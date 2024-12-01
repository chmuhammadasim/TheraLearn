import React, { useState, useEffect } from "react";
import { signUpUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const App = () => {
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [formData, setFormData] = useState(initialFormData());
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function initialFormData() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      contact: "",
      bio: "",
      profilePictureUrl: "",
      dateOfBirth: "",
      role: "user",
      educations: [""],
      experiences: [""],
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
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
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
      "username",
      "email",
      "password",
      "confirmPassword",
      "firstName",
      "lastName",
      "dateOfBirth",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${capitalizeFirstLetter(field)} is required`;
    });

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (isPsychologist) {
      formData.educations.forEach((edu, idx) => {
        if (!edu)
          newErrors[`educations_${idx}`] = `Education ${idx + 1} is required`;
      });
      formData.experiences.forEach((exp, idx) => {
        if (!exp)
          newErrors[`experiences_${idx}`] = `Experience ${idx + 1} is required`;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isUploading) return; // Prevent submission if uploading
      try {
        const response = await signUpUser({
          ...formData,
          profilePictureUrl: uploadedImage,
          role: isPsychologist ? "psychologist" : "user",
          education: formData.educations.filter((edu) => edu.trim() !== ""),
          experience: formData.experiences.filter((exp) => exp.trim() !== ""),
        });
        if (response.status) {
          setMessage("Signup successful");
          navigate("/login");
        }
      } catch (error) {
        setMessage(error.message || "An error occurred");
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      setIsUploading(true); // Set uploading state
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/do7z15tdv/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        if (data.secure_url) {
          setUploadedImage(data.secure_url);
          setFormData((prev) => ({
            ...prev,
            profilePictureUrl: data.secure_url,
          }));
        } else {
          setMessage("Image upload failed, please try again.");
        }
      } catch (error) {
        setMessage("Image upload failed, please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pb-10 flex items-center justify-center bg-gradient-to-r from-[#8e9eab] via-[#eef2f3] to-[#8e9eab] relative overflow-hidden pt-20">
      <div className="relative bg-white m-4 py-8 px-10 rounded-lg shadow-xl w-full max-w-4xl text-center">
        <motion.img
          src="LOGO.png"
          alt="Logo"
          className="mx-auto mb-4 w-24 h-24"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.h1
          className="text-5xl font-bold text-[#34495e] mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#3498db]">Create Your Account</span>
        </motion.h1>
        {message && (
          <motion.p
            className={`mb-4 text-lg ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </motion.p>
        )}

        <div className="flex justify-center gap-5 mb-6">
          <ToggleButton
            active={!isPsychologist}
            label="User Signup"
            onClick={() => setIsPsychologist(false)}
          />
          <ToggleButton
            active={isPsychologist}
            label="Psychologist Signup"
            onClick={() => setIsPsychologist(true)}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup
            title="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputGroup
            title="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputGroup
            title="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputGroup
            title="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <InputGroup
            title="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputGroup
            title="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <InputGroup
            title="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            error={errors.contact}
          />

          <InputGroup
            title="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputGroup
            title="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <InputGroup
            title="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />

          {/* Image Upload Field */}
          <div className="form-group">
            <label className="block text-left text-lg font-medium text-[#34495e]">
              Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]"
            />
            {isUploading && (
              <p className="text font-semibold text-gray-500">
                Checking Profile Image...
              </p>
            )}
            {uploadedImage && (
              <p className="text font-semibold text-green-500">
                Image Successfully Uploaded
              </p>
            )}
          </div>

          <InputGroup
            title="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
          />

          {isPsychologist && (
            <div>
              <h2 className="text-2xl font-bold text-[#3498db] mb-4">
                Education & Experience
              </h2>
              {formData.educations.map((education, index) => (
                <EducationExperienceGroup
                  key={index}
                  title={`Education ${index + 1}`}
                  value={education}
                  index={index}
                  type="educations"
                  handleChange={handleArrayChange}
                  addItem={addArrayItem}
                  removeItem={removeArrayItem}
                  error={errors.educations}
                />
              ))}
              {formData.experiences.map((experience, index) => (
                <EducationExperienceGroup
                  key={index}
                  title={`Experience ${index + 1}`}
                  value={experience}
                  index={index}
                  type="experiences"
                  handleChange={handleArrayChange}
                  addItem={addArrayItem}
                  removeItem={removeArrayItem}
                  error={errors.experiences}
                />
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 bg-[#3498db] text-white font-bold rounded-lg hover:bg-[#2980b9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db]"
            >
              {isUploading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ToggleButton = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-semibold ${
      active ? "bg-[#3498db] text-white" : "bg-gray-200 text-[#34495e]"
    }`}
  >
    {label}
  </button>
);

const InputGroup = ({ title, type = "text", name, value, onChange, error }) => (
  <div className="form-group">
    <label className="block text-left text-lg font-medium text-[#34495e]">
      {title}:
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const EducationExperienceGroup = ({
  title,
  value,
  index,
  type,
  handleChange,
  addItem,
  removeItem,
  error,
}) => (
  <div className="form-group mb-4">
    <label className="block text-left text-lg font-medium text-[#34495e]">
      {title}:
    </label>
    <div className="flex items-center  max-md:flex-col">
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(type, index, e.target.value)}
        className={`flex-grow p-2 border md:w-9 ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db]`}
      />
      <div className="flex m-2">
        <button type="button" onClick={() => addItem(type)}>
          <FaPlusCircle className="text-green-500 text-xl" />
        </button>
        <button
          type="button"
          onClick={() => removeItem(type, index)}
          disabled={index === 0}
        >
          <FaMinusCircle className="text-red-500 text-xl" />
        </button>
      </div>
    </div>
  </div>
);

export default App;
