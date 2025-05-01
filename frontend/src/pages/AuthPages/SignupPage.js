import React, { useState, useEffect } from "react";
import { signUpUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const App = () => {
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
        console.log('====================================');
        console.log(response);
        console.log('====================================');
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#e0eafc] flex items-center justify-center pt-20">
      <div className="bg-white/90 rounded-3xl shadow-2xl w-full max-w-5xl p-10 border border-[#e3e9f7] backdrop-blur-lg">
        <motion.img
          src="LOGO.png"
          alt="Logo"
          className="mx-auto mb-8 w-28 h-28 rounded-full shadow-lg border-4 border-[#3498db]/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.h1
          className="text-5xl font-bold text-[#34495e] text-center mb-8 tracking-tight"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[#3498db] drop-shadow-md">Create Your Parent Account</span>
        </motion.h1>

        {message && (
          <motion.p
            className={`mb-6 text-lg font-medium text-center px-4 py-2 rounded-xl shadow-sm ${
              message.includes("successful") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup title="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
            <InputGroup title="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <InputGroup title="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
            <InputGroup title="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            <InputGroup title="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
            <InputGroup title="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
            <InputGroup title="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
            <InputGroup title="Address" type="text" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
            <InputGroup title="City" type="text" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            <InputGroup title="Country" type="text" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
            <InputGroup title="Contact Number" type="text" name="contact" value={formData.contact} onChange={handleChange} error={errors.contact} />
            <InputGroup title="Bio" type="text" name="bio" value={formData.bio} onChange={handleChange} error={errors.bio} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup title="Primary Care Physician Name" type="text" name="primaryCarePhysician.name" value={formData.primaryCarePhysician.name} onChange={handleChange} />
            <InputGroup title="Primary Care Physician Contact" type="text" name="primaryCarePhysician.contact" value={formData.primaryCarePhysician.contact} onChange={handleChange}/>
            <InputGroup title="Primary Care Physician Hospital" type="text" name="primaryCarePhysician.hospital" value={formData.primaryCarePhysician.hospital} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputGroup title="Insurance Policy Number" type="text" name="insurancePolicy.policyNumber" value={formData.insurancePolicy.policyNumber} onChange={handleChange} />
            <InputGroup title="Insurance Coverage Details" type="text" name="insurancePolicy.coverageDetails" value={formData.insurancePolicy.coverageDetails} onChange={handleChange} />
            <InputGroup title="Insurance Valid Until" type="date" name="insurancePolicy.validUntil" value={formData.insurancePolicy.validUntil} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup title="Emergency Contact Name" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} error={errors.emergencyContact?.name} />

          </div>

          {/* Children Management */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-[#34495e] mb-6 text-center">Children Information</h2>
            <div className="space-y-8">
              {formData.children.map((child, index) => (
                <motion.div
                  key={index}
                  className="space-y-4 p-8 border border-[#d6e0f5] rounded-2xl shadow-lg bg-white/80 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-[#3498db]">Child {index + 1}</h3>
                    {formData.children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="flex items-center justify-center p-2 rounded-full bg-white/50 hover:bg-red-100 shadow hover:scale-110 transition"
                      >
                        <FaMinusCircle className="size-6 text-red-500 drop-shadow-md" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup title="First Name" name="firstName" value={child.firstName} onChange={(e) => handleChildChange(index, e)} error={errors.children?.[index]?.firstName} />
                    <InputGroup title="Last Name" name="lastName" value={child.lastName} onChange={(e) => handleChildChange(index, e)} error={errors.children?.[index]?.lastName} />
                    <InputGroup title="Date of Birth" type="date" name="dateOfBirth" value={child.dateOfBirth} onChange={(e) => handleChildChange(index, e)} error={errors.children?.[index]?.dateOfBirth} />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      title="Medical Conditions"
                      name="medicalConditions"
                      value={Array.isArray(child.medicalConditions) ? child.medicalConditions.join(",") : ""}
                      onChange={(e) => handleChildChange(index, e)}
                      error={errors.children?.[index]?.medicalConditions}
                    />
                    <InputGroup
                      title="Allergies"
                      name="allergies"
                      value={Array.isArray(child.allergies) ? child.allergies.join(",") : ""}
                      onChange={(e) => handleChildChange(index, e)}
                      error={errors.children?.[index]?.allergies}
                    />
                    <InputGroup
                      title="Medications"
                      name="medications"
                      value={Array.isArray(child.medications) ? child.medications.join(",") : ""}
                      onChange={(e) => handleChildChange(index, e)}
                      error={errors.children?.[index]?.medications}
                    />
                    <InputGroup
                      title="Genetic Disorders"
                      name="geneticDisorders"
                      value={Array.isArray(child.geneticDisorders) ? child.geneticDisorders.join(",") : ""}
                      onChange={(e) => handleChildChange(index, e)}
                      error={errors.children?.[index]?.geneticDisorders}
                    />
                    <InputGroup
                      title="Family Medical History"
                      name="familyMedicalHistory"
                      value={Array.isArray(child.familyMedicalHistory) ? child.familyMedicalHistory.join(",") : ""}
                      onChange={(e) => handleChildChange(index, e)}
                      error={errors.children?.[index]?.familyMedicalHistory}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={addChild}
                className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#3498db] to-[#2980b9] 
                  text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                  transition-all duration-300 focus:ring-4 focus:ring-[#2980b9]/60 focus:outline-none"
              >
                <FaPlusCircle className="size-6 drop-shadow-sm" /> Add Another Child
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mt-10 flex flex-col items-center">
            <label className="block text-lg font-medium text-[#34495e] mb-2">Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full max-w-xs border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all bg-white"
            />
            {uploadedImage && (
              <img src={uploadedImage} alt="Profile Preview" className="mt-4 w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-[#3498db]/30" />
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full md:w-1/2 flex justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3498db] to-[#2980b9] 
                text-white text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                transition-all duration-300 focus:ring-4 focus:ring-[#2980b9]/60 focus:outline-none"
            >
              {isUploading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  
}
  export default App;
  const InputGroup = ({ title, type = "text", name, value, onChange, error }) => (
    <div className="relative mb-2">
      <label className="block text-lg font-medium text-[#34495e] mb-2">{title}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all bg-white`}
        autoComplete="off"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );