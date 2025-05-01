// Enhanced styles for the sign-up form
import React, { useState, useEffect } from "react";
import { signUpUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { FaPlusCircle, FaMinusCircle, FaUser, FaEnvelope, FaLock, FaAddressCard, FaPhone, FaCalendarAlt, FaMedkit, FaUserMd } from "react-icons/fa";

const App = () => {
  const [formData, setFormData] = useState(initialFormData());
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  function initialFormData() {
    // Same initial data as before
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
      role: "parent",
      children: [
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "male",
          medicalConditions: [""],
          allergies: [""],
          bloodType: "A+",
          medications: [""],
          geneticDisorders: [""],
          familyMedicalHistory: [""],
        },
      ],
      primaryCarePhysician: { name: "", contact: "", hospital: "" },
      emergencyContact: { name: "", contact: "" },
      insurancePolicy: { policyNumber: "", coverageDetails: "", validUntil: "" },
    };
  }

  // Handlers remain the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...formData.children];
    
    if (name === "medicalConditions" || name === "allergies" || name === "medications" || name === "geneticDisorders" || name === "familyMedicalHistory") {
      newChildren[index] = { 
        ...newChildren[index], 
        [name]: value.split(",").map(item => item.trim()) 
      };
    } else {
      newChildren[index] = { ...newChildren[index], [name]: value };
    }
  
    setFormData((prev) => ({ ...prev, children: newChildren }));
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [
        ...prev.children,
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "male",
          bloodType: "A+",
          medicalConditions: [""],
          allergies: [""],
          medications: [""],
          geneticDisorders: [""],
          familyMedicalHistory: [""],
        },
      ],
    }));
  };

  const removeChild = (index) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, children: newChildren }));
  };

  const validate = () => {
    // Same validation logic as before
    const newErrors = {};
    const requiredFields = [
      "username",
      "email",
      "password",
      "confirmPassword",
      "firstName",
      "lastName",
      "dateOfBirth",
      "emergencyContact",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = `${capitalizeFirstLetter(field)} is required`;
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (formData.children.some((child) => !child.firstName || !child.lastName || !child.dateOfBirth)) {
      newErrors.children = "Each child must have a first name, last name, and date of birth";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isUploading) return;
      try {
        const response = await signUpUser({
          ...formData,
          profilePictureUrl: uploadedImage,
          role: "parent",
        });

        if (response.status === '201') {
          setMessage("Signup successful");
          navigate('/login');
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

      setIsUploading(true);
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/do7z15tdv/upload`, { method: "POST", body: formData });
        const data = await res.json();
        if (data.secure_url) {
          setUploadedImage(data.secure_url);
          setFormData((prev) => ({ ...prev, profilePictureUrl: data.secure_url }));
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

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br  from-[#EBF4FF] via-[#D9E8FF] to-[#C0DBFE] flex items-center justify-center py-10">
      <div className="bg-white/95 rounded-3xl mt-16 shadow-2xl w-full max-w-6xl p-10 border border-[#e3e9f7] backdrop-blur-lg">
        <motion.img
          src="LOGO.png"
          alt="Logo"
          className="mx-auto mb-6 w-28 h-28 rounded-full shadow-xl border-4 border-[#3498db]/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.h1
          className="text-5xl font-bold text-[#2c3e50] text-center mb-6 tracking-tight"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[#3498db] to-[#2980b9] text-transparent bg-clip-text drop-shadow-sm">
            Create Your Parent Account
          </span>
        </motion.h1>

        {message && (
          <motion.div
            className={`mb-6 text-lg font-medium text-center px-6 py-3 rounded-xl shadow-md ${
              message.includes("successful") ? "bg-green-100 text-green-600 border border-green-200" : "bg-red-100 text-red-600 border border-red-200"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        )}

        
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap bg-gray-100 p-1 rounded-xl shadow-md w-full md:w-auto">
            <button 
              onClick={() => setActiveSection('personal')}
              className={`flex-1 md:flex-initial px-3 md:px-6 mx-3 my-3 py-3 rounded-lg flex items-center justify-center md:justify-start gap-2 transition-all text-sm md:text-base ${
                activeSection === 'personal' 
                  ? 'bg-white shadow-md text-[#3498db] font-medium' 
                  : 'text-gray-600 bg-blue-300 hover:bg-white/50'
              }`}
            >
              <FaUser className="size-4" /> 
              <span className="hidden md:inline">Personal Info</span>
              <span className="inline md:hidden">Personal</span>
            </button>
            <button 
              onClick={() => setActiveSection('medical')}
              className={`flex-1 md:flex-initial px-3 md:px-6 mx-3 my-3 py-3 rounded-lg flex items-center justify-center md:justify-start gap-2 transition-all text-sm md:text-base ${
                activeSection === 'medical' 
                  ? 'bg-white shadow-md text-[#3498db] font-medium' 
                  : 'text-gray-600 bg-blue-300 hover:bg-white/50'
              }`}
            >
              <FaUserMd className="size-4" /> 
              <span className="hidden md:inline">Medical Info</span>
              <span className="inline md:hidden">Medical</span>
            </button>
            <button 
              onClick={() => setActiveSection('children')}
              className={`flex-1 md:flex-initial px-3 md:px-6 mx-3 my-3 py-3 rounded-lg flex items-center justify-center md:justify-start gap-2 transition-all text-sm md:text-base ${
                activeSection === 'children' 
                  ? 'bg-white shadow-md text-[#3498db] font-medium' 
                  : 'text-gray-600 bg-blue-300 hover:bg-white/50'
              }`}
            >
              <FaMedkit className="size-4" /> 
              <span className="hidden md:inline">Children</span>
              <span className="inline md:hidden">Children</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information Section */}
          {activeSection === 'personal' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="relative flex justify-center mb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#3498db]/30 shadow-lg">
                    <img 
                      src={uploadedImage || "https://via.placeholder.com/150?text=Upload+Photo"} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center transition-all duration-300">
                    <label className="cursor-pointer text-white text-sm font-medium">
                      Change Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnhancedInputGroup 
                  title="Username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  error={errors.username} 
                  icon={<FaUser className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="Email" 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                  icon={<FaEnvelope className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="Password" 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  error={errors.password} 
                  icon={<FaLock className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="Confirm Password" 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  error={errors.confirmPassword} 
                  icon={<FaLock className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="First Name" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  error={errors.firstName} 
                />
                <EnhancedInputGroup 
                  title="Last Name" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  error={errors.lastName} 
                />
                <EnhancedInputGroup 
                  title="Date of Birth" 
                  type="date" 
                  name="dateOfBirth" 
                  value={formData.dateOfBirth} 
                  onChange={handleChange} 
                  error={errors.dateOfBirth} 
                  icon={<FaCalendarAlt className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="Phone Number" 
                  type="text" 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleChange} 
                  error={errors.contact} 
                  icon={<FaPhone className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="Address" 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  error={errors.address} 
                  icon={<FaAddressCard className="text-gray-400" />}
                />
                <EnhancedInputGroup 
                  title="City" 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  error={errors.city} 
                />
                <EnhancedInputGroup 
                  title="Country" 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange} 
                  error={errors.country} 
                />
                <EnhancedInputGroup 
                  title="Bio" 
                  type="text" 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  error={errors.bio} 
                />
              </div>
            </motion.div>
          )}

          {/* Medical Information Section */}
          {activeSection === 'medical' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 shadow-md">
                <h3 className="text-xl font-semibold text-[#3498db] mb-4 flex items-center gap-2">
                  <FaUserMd className="text-[#3498db]" /> Primary Care Physician
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <EnhancedInputGroup 
                    title="Physician Name" 
                    type="text" 
                    name="primaryCarePhysician.name" 
                    value={formData.primaryCarePhysician.name} 
                    onChange={handleChange} 
                  />
                  <EnhancedInputGroup 
                    title="Physician Contact" 
                    type="text" 
                    name="primaryCarePhysician.contact" 
                    value={formData.primaryCarePhysician.contact} 
                    onChange={handleChange}
                    icon={<FaPhone className="text-gray-400" />}
                  />
                  <EnhancedInputGroup 
                    title="Hospital" 
                    type="text" 
                    name="primaryCarePhysician.hospital" 
                    value={formData.primaryCarePhysician.hospital} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-green-50 border border-green-100 shadow-md">
                <h3 className="text-xl font-semibold text-green-600 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EnhancedInputGroup 
                    title="Contact Name" 
                    name="emergencyContact.name" 
                    value={formData.emergencyContact.name} 
                    onChange={handleChange} 
                    error={errors.emergencyContact?.name} 
                  />
                  <EnhancedInputGroup 
                    title="Contact Number" 
                    name="emergencyContact.contact" 
                    value={formData.emergencyContact.contact} 
                    onChange={handleChange} 
                    error={errors.emergencyContact?.contact}
                    icon={<FaPhone className="text-gray-400" />} 
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 shadow-md">
                <h3 className="text-xl font-semibold text-purple-600 mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <EnhancedInputGroup 
                    title="Policy Number" 
                    type="text" 
                    name="insurancePolicy.policyNumber" 
                    value={formData.insurancePolicy.policyNumber} 
                    onChange={handleChange} 
                  />
                  <EnhancedInputGroup 
                    title="Coverage Details" 
                    type="text" 
                    name="insurancePolicy.coverageDetails" 
                    value={formData.insurancePolicy.coverageDetails} 
                    onChange={handleChange} 
                  />
                  <EnhancedInputGroup 
                    title="Valid Until" 
                    type="date" 
                    name="insurancePolicy.validUntil" 
                    value={formData.insurancePolicy.validUntil} 
                    onChange={handleChange}
                    icon={<FaCalendarAlt className="text-gray-400" />} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Children Section */}
          {activeSection === 'children' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold text-[#34495e] mb-6 text-center">Children Information</h2>
              {errors.children && (
                <p className="text-red-500 text-center mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  {errors.children}
                </p>
              )}
              
              <div className="space-y-8">
                {formData.children.map((child, index) => (
                  <motion.div
                    key={index}
                    className="space-y-4 p-8 border-2 border-[#d6e0f5] rounded-2xl shadow-lg bg-gradient-to-br from-white to-blue-50 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3498db] to-[#2980b9]"></div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-medium text-[#3498db]">Child {index + 1}</h3>
                      {formData.children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChild(index)}
                          className="flex items-center justify-center p-2 rounded-full bg-white hover:bg-red-100 shadow-md hover:scale-110 transition"
                        >
                          <FaMinusCircle className="size-6 text-red-500" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <EnhancedInputGroup 
                        title="First Name" 
                        name="firstName" 
                        value={child.firstName} 
                        onChange={(e) => handleChildChange(index, e)} 
                        error={errors.children?.[index]?.firstName} 
                      />
                      <EnhancedInputGroup 
                        title="Last Name" 
                        name="lastName" 
                        value={child.lastName} 
                        onChange={(e) => handleChildChange(index, e)} 
                        error={errors.children?.[index]?.lastName} 
                      />
                      <EnhancedInputGroup 
                        title="Date of Birth" 
                        type="date" 
                        name="dateOfBirth" 
                        value={child.dateOfBirth} 
                        onChange={(e) => handleChildChange(index, e)} 
                        error={errors.children?.[index]?.dateOfBirth}
                        icon={<FaCalendarAlt className="text-gray-400" />} 
                      />
                      
                      <div>
                        <label className="block text-lg font-medium text-[#34495e] mb-2">Gender</label>
                        <select
                          name="gender"
                          value={child.gender}
                          onChange={(e) => handleChildChange(index, e)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.children?.[index]?.gender && <p className="text-red-500 text-sm mt-1">{errors.children[index].gender}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium text-[#34495e] mb-2">Blood Type</label>
                        <select
                          name="bloodType"
                          value={child.bloodType}
                          onChange={(e) => handleChildChange(index, e)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                        {errors.children?.[index]?.bloodType && <p className="text-red-500 text-sm mt-1">{errors.children[index].bloodType}</p>}
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white/80 rounded-xl">
                      <h4 className="text-lg font-medium text-[#3498db] mb-4">Health Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <EnhancedInputGroup
                          title="Medical Conditions"
                          name="medicalConditions"
                          value={Array.isArray(child.medicalConditions) ? child.medicalConditions.join(",") : ""}
                          onChange={(e) => handleChildChange(index, e)}
                          error={errors.children?.[index]?.medicalConditions}
                          placeholder="Separate with commas"
                        />
                        <EnhancedInputGroup
                          title="Allergies"
                          name="allergies"
                          value={Array.isArray(child.allergies) ? child.allergies.join(",") : ""}
                          onChange={(e) => handleChildChange(index, e)}
                          error={errors.children?.[index]?.allergies}
                          placeholder="Separate with commas"
                        />
                        <EnhancedInputGroup
                          title="Medications"
                          name="medications"
                          value={Array.isArray(child.medications) ? child.medications.join(",") : ""}
                          onChange={(e) => handleChildChange(index, e)}
                          error={errors.children?.[index]?.medications}
                          placeholder="Separate with commas"
                        />
                        <EnhancedInputGroup
                          title="Genetic Disorders"
                          name="geneticDisorders"
                          value={Array.isArray(child.geneticDisorders) ? child.geneticDisorders.join(",") : ""}
                          onChange={(e) => handleChildChange(index, e)}
                          error={errors.children?.[index]?.geneticDisorders}
                          placeholder="Separate with commas"
                        />
                        <EnhancedInputGroup
                          title="Family Medical History"
                          name="familyMedicalHistory"
                          value={Array.isArray(child.familyMedicalHistory) ? child.familyMedicalHistory.join(",") : ""}
                          onChange={(e) => handleChildChange(index, e)}
                          error={errors.children?.[index]?.familyMedicalHistory}
                          placeholder="Separate with commas"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={addChild}
                  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#3498db] to-[#2980b9] 
                    text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                    transition-all duration-300 focus:ring-4 focus:ring-[#2980b9]/60 focus:outline-none"
                >
                  <FaPlusCircle className="size-5" /> Add Another Child
                </button>
              </div>
            </motion.div>
          )}

          {/* Navigation and Submit Buttons */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
            {activeSection === 'personal' ? (
              <div></div>
            ) : (
              <button
                type="button"
                onClick={() => setActiveSection(activeSection === 'medical' ? 'personal' : 'medical')}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-medium rounded-xl 
                  transition-all hover:shadow focus:outline-none"
              >
                Previous
              </button>
            )}
            
            {activeSection === 'children' ? (
              <button
                type="submit"
                disabled={isUploading}
                className="flex justify-center items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#3498db] to-[#2980b9] 
                  text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                  transition-all duration-300 focus:ring-4 focus:ring-[#2980b9]/60 focus:outline-none w-full md:w-auto"
              >
                {isUploading ? "Processing..." : "Complete Registration"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveSection(activeSection === 'personal' ? 'medical' : 'children')}
                className="px-8 py-3 bg-[#3498db] hover:bg-[#2980b9] text-white text-lg font-medium rounded-xl 
                  shadow hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#3498db]/70"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;

// Enhanced input component with icons
const EnhancedInputGroup = ({ title, type = "text", name, value, onChange, error, icon, placeholder }) => (
  <div className="relative mb-2">
    <label className="block text-lg font-medium text-[#34495e] mb-2">{title}</label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} py-3 rounded-lg border ${
          error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        } focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all shadow-sm`}
        autoComplete="off"
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);