import React, { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaSave,
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdLocationOn,
  MdLock,
  MdCalendarToday,
  MdMedicalServices,
  MdHealthAndSafety,
  MdInfo,
} from "react-icons/md";
import { getUserData, updateUserData } from "../../services/userService";

const InputField = ({
  label,
  name,
  value,
  icon,
  type = "text",
  onChange,
  disabled = false,
  className = "",
  placeholder = "",
  required = false,
}) => (
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className={`flex items-center mt-1 border rounded-md px-3 py-2 transition ${disabled ? 'bg-gray-50' : 'hover:shadow-md focus-within:shadow-md focus-within:border-blue-400'}`}>
      {icon}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full ml-2 focus:outline-none ${disabled ? 'text-gray-500' : ''} ${className}`}
      />
    </div>
  </div>
);

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  disabled = false, 
  placeholder = "",
  required = false 
}) => (
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${disabled ? 'bg-gray-50 text-gray-500' : 'hover:shadow-md'}`}
      rows={3}
    />
  </div>
);

const SectionCard = ({ title, icon, children, isOpen = true, toggleOpen }) => {
  return (
    <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div 
        className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          {icon}
          <h3 className="text-xl font-semibold ml-2 text-blue-800">{title}</h3>
        </div>
        {toggleOpen && (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    contact: "",
    role: "parent",
    profilePictureUrl: "",
    children: [],
    primaryCarePhysician: { name: "", contact: "", hospital: "" },
    emergencyAuthorization: false,
    insurancePolicy: { policyNumber: "", coverageDetails: "", validUntil: "" },
    insuranceProvider: "",
    preferredHospital: "",
    medicalHistory: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openSections, setOpenSections] = useState({
    personal: true,
    medical: true,
    children: true,
    physician: true,
    insurance: true
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getUserData();
        setFormData({
          ...res.data,
          medicalHistory: Array.isArray(res.data.medicalHistory)
            ? res.data.medicalHistory.join(", ")
            : "",
        });
        const storedRole =
          localStorage.getItem("authrole") || res.data.role || "parent";
        setRole(storedRole);
      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    if (name.startsWith("primaryCarePhysician")) {
      const field = name.replace("primaryCarePhysician", "").toLowerCase();
      setFormData((prev) => ({
        ...prev,
        primaryCarePhysician: {
          ...prev.primaryCarePhysician,
          [field]: value,
        },
      }));
    } else if (name.startsWith("insurancePolicy")) {
      const field = name.replace("insurancePolicy", "").toLowerCase();
      setFormData((prev) => ({
        ...prev,
        insurancePolicy: {
          ...prev.insurancePolicy,
          [field]: value,
        },
      }));
    } else if (inputType === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedData = {
        ...formData,
        medicalHistory: formData.medicalHistory
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item),
      };
      await updateUserData(updatedData);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update profile. Please check your information and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, profilePictureUrl: file });
    }
  };

  const addChild = () => {
    if (role === "parent") {
      setFormData((prev) => ({
        ...prev,
        children: [
          ...prev.children,
          {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            bloodType: "",
            medicalConditions: "",
            allergies: "",
            medications: "",
            role: "child",
          },
        ],
      }));
    } else {
      setError("You do not have permission to add children.");
    }
  };

  const removeChild = (index) => {
    if (role !== "parent") {
      setError("You do not have permission to remove children.");
      return;
    }
    const updatedChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: updatedChildren });
  };

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...formData.children];
    updatedChildren[index][field] = value;
    setFormData({ ...formData, children: updatedChildren });
  };

  if (loading && !formData.firstName) {
    return (
      <div className="min-h-screen bg-gradient-to-tr pt-20 from-blue-200 via-green-200 to-blue-300 py-10 px-5 flex justify-center items-center">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600 border-t-transparent" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-blue-800 font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr pt-20 from-blue-200 via-green-200 to-blue-300 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white flex flex-wrap items-center justify-between p-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <label htmlFor="profilePic" className="relative cursor-pointer">
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                src={
                  selectedImage ||
                  formData.profilePictureUrl ||
                  "/default-profile.png"
                }
                alt="Profile"
              />
              {isEditing && (
                <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full text-blue-700">
                  <FaCamera size={24} />
                </div>
              )}
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
              disabled={!isEditing}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{`${formData.firstName || 'New'} ${formData.lastName || 'User'}`}</h2>
              <p className="text-gray-100 text-sm">
                {formData.username || "No username"}
              </p>
              <div className="mt-1 bg-blue-800 px-3 py-1 rounded-full text-xs inline-block">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </div>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="w-full sm:w-auto bg-yellow-500 px-4 py-2 text-sm sm:text-base rounded-md text-white shadow-md hover:bg-yellow-600 flex items-center justify-center transition"
            disabled={loading}
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-sm">
              <div className="flex">
                <div className="py-1"><MdInfo className="text-xl text-red-500" /></div>
                <div className="ml-3">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded shadow-sm">
              <div className="flex">
                <div className="py-1"><MdInfo className="text-xl text-green-500" /></div>
                <div className="ml-3">
                  <p className="font-medium">Success</p>
                  <p>{success}</p>
                </div>
              </div>
            </div>
          )}

          <SectionCard 
            title="Personal Information" 
            icon={<MdPerson className="text-xl text-blue-700" />}
            isOpen={openSections.personal}
            toggleOpen={() => toggleSection('personal')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdPerson className="text-xl text-blue-700" />}
                placeholder="Enter username"
                required
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                type="email"
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdEmail className="text-xl text-blue-700" />}
                placeholder="Enter email address"
                required
              />
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Password {isEditing && <span className="text-red-500">*</span>}
                </label>
                <div className={`flex items-center border rounded-md px-3 py-2 transition ${!isEditing ? 'bg-gray-50' : 'hover:shadow-md'}`}>
                  <MdLock className="text-xl text-blue-700" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={isEditing ? "Enter new password" : "••••••••"}
                    className={`w-full ml-2 focus:outline-none ${!isEditing ? 'text-gray-500' : ''}`}
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </div>
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdPerson className="text-xl text-blue-700" />}
                placeholder="Enter first name"
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdPerson className="text-xl text-blue-700" />}
                placeholder="Enter last name"
                required
              />
              <InputField
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdPhone className="text-xl text-blue-700" />}
                placeholder="Enter contact number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdLocationOn className="text-xl text-blue-700" />}
                placeholder="Enter address"
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdLocationOn className="text-xl text-blue-700" />}
                placeholder="Enter city"
              />
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdLocationOn className="text-xl text-blue-700" />}
                placeholder="Enter country"
              />
            </div>
          </SectionCard>

          <SectionCard 
            title="Medical Information" 
            icon={<MdHealthAndSafety className="text-xl text-blue-700" />}
            isOpen={openSections.medical}
            toggleOpen={() => toggleSection('medical')}
          >
            <div className="grid grid-cols-1 gap-4">
              <TextAreaField
                label="Medical History (comma-separated)"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Asthma, Diabetes, High blood pressure"
              />
              <InputField
                label="Preferred Hospital"
                name="preferredHospital"
                value={formData.preferredHospital}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<MdLocationOn className="text-xl text-blue-700" />}
                placeholder="Enter preferred hospital"
              />
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emergencyAuthorization"
                  name="emergencyAuthorization"
                  checked={formData.emergencyAuthorization}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="emergencyAuthorization" className="text-gray-700 font-semibold">
                  Emergency Authorization
                </label>
              </div>
            </div>
          </SectionCard>

          {/* Show children section only if role is parent */}
          {role === "parent" && (
            <SectionCard 
              title="Children" 
              icon={<MdPerson className="text-xl text-blue-700" />}
              isOpen={openSections.children}
              toggleOpen={() => toggleSection('children')}
            >
              {formData.children.length > 0 ? (
                formData.children.map((child, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-md mt-4 flex flex-col transition hover:shadow-sm bg-blue-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-2">
                          <MdPerson className="text-xl text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            {child.firstName ? `${child.firstName} ${child.lastName}` : `Child #${index + 1}`}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {child.dateOfBirth ? `DOB: ${child.dateOfBirth}` : "No birthdate set"}
                          </p>
                        </div>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeChild(index)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
                          title="Remove child"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-3 rounded-lg">
                        <InputField
                          label="First Name"
                          name="firstName"
                          value={child.firstName}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "firstName",
                              e.target.value
                            )
                          }
                          disabled={false}
                          icon={<MdPerson className="text-xl text-blue-700" />}
                          placeholder="Enter first name"
                          required
                        />
                        <InputField
                          label="Last Name"
                          name="lastName"
                          value={child.lastName}
                          onChange={(e) =>
                            handleChildChange(index, "lastName", e.target.value)
                          }
                          disabled={false}
                          icon={<MdPerson className="text-xl text-blue-700" />}
                          placeholder="Enter last name"
                          required
                        />
                        <InputField
                          label="Date of Birth"
                          name="dateOfBirth"
                          value={child.dateOfBirth}
                          type="date"
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "dateOfBirth",
                              e.target.value
                            )
                          }
                          disabled={false}
                          icon={
                            <MdCalendarToday className="text-xl text-blue-700" />
                          }
                        />
                        <InputField
                          label="Gender"
                          name="gender"
                          value={child.gender}
                          onChange={(e) =>
                            handleChildChange(index, "gender", e.target.value)
                          }
                          disabled={false}
                          icon={<MdPerson className="text-xl text-blue-700" />}
                          placeholder="Enter gender"
                        />
                        <InputField
                          label="Blood Type"
                          name="bloodType"
                          value={child.bloodType}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "bloodType",
                              e.target.value
                            )
                          }
                          disabled={false}
                          icon={
                            <MdMedicalServices className="text-xl text-blue-700" />
                          }
                          placeholder="e.g., A+, B-, O+"
                        />
                        <TextAreaField
                          label="Medical Conditions"
                          name="medicalConditions"
                          value={child.medicalConditions}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "medicalConditions",
                              e.target.value
                            )
                          }
                          disabled={false}
                          placeholder="e.g., Asthma, ADHD"
                        />
                        <TextAreaField
                          label="Allergies"
                          name="allergies"
                          value={child.allergies}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "allergies",
                              e.target.value
                            )
                          }
                          disabled={false}
                          placeholder="e.g., Peanuts, Penicillin"
                        />
                        <TextAreaField
                          label="Medications"
                          name="medications"
                          value={child.medications}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "medications",
                              e.target.value
                            )
                          }
                          disabled={false}
                          placeholder="e.g., Albuterol inhaler, Concerta"
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 mt-2 p-4 bg-gray-50 rounded-lg text-center">No children added yet.</p>
              )}
              {isEditing && (
                <button
                  onClick={addChild}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center transition shadow-sm"
                >
                  <FaPlus className="mr-2" /> Add Child
                </button>
              )}
            </SectionCard>
          )}

          {/* Show primary care physician only if role is parent */}
          {role === "parent" && (
            <SectionCard 
              title="Primary Care Physician" 
              icon={<MdMedicalServices className="text-xl text-blue-700" />}
              isOpen={openSections.physician}
              toggleOpen={() => toggleSection('physician')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  name="primaryCarePhysicianName"
                  value={formData.primaryCarePhysician.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdPerson className="text-xl text-blue-700" />}
                  placeholder="Enter physician name"
                />
                <InputField
                  label="Contact"
                  name="primaryCarePhysicianContact"
                  value={formData.primaryCarePhysician.contact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdPhone className="text-xl text-blue-700" />}
                  placeholder="Enter contact number"
                />
                <InputField
                  label="Hospital"
                  name="primaryCarePhysicianHospital"
                  value={formData.primaryCarePhysician.hospital}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdLocationOn className="text-xl text-blue-700" />}
                  placeholder="Enter hospital name"
                />
              </div>
            </SectionCard>
          )}

          {/* Show insurance policy only if role is parent */}
          {role === "parent" && (
            <SectionCard 
              title="Insurance Information" 
              icon={<MdHealthAndSafety className="text-xl text-blue-700" />}
              isOpen={openSections.insurance}
              toggleOpen={() => toggleSection('insurance')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Insurance Provider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdMedicalServices className="text-xl text-blue-700" />}
                  placeholder="Enter insurance provider"
                />
                <InputField
                  label="Policy Number"
                  name="insurancePolicyPolicynumber"
                  value={formData.insurancePolicy.policyNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdLock className="text-xl text-blue-700" />}
                  placeholder="Enter policy number"
                />
                <InputField
                  label="Valid Until"
                  name="insurancePolicyValiduntil"
                  value={formData.insurancePolicy.validUntil}
                  type="date"
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdCalendarToday className="text-xl text-blue-700" />}
                />
                <TextAreaField
                  label="Coverage Details"
                  name="insurancePolicyCoveragedetails"
                  value={formData.insurancePolicy.coverageDetails}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Describe coverage details"
                />
              </div>
            </SectionCard>
          )}

          {isEditing && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSaveChanges}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 flex items-center justify-center transition shadow-md disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-white border-t-transparent mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Save Profile Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
