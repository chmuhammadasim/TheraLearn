import React, { useState, useEffect } from "react";
import {
  FaUserEdit,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaSave,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdLocationOn,
  MdLock,
  MdCalendarToday,
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
}) => (
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold">{label}</label>
    <div className="flex items-center mt-1 border rounded-md px-3 py-2">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ml-2 focus:outline-none ${className}`}
      />
    </div>
  </div>
);

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    bio: "",
    profilePictureUrl: "",
    dateOfBirth: "",
    role: "parent",
    children: [],
    emergencyContact: { contact: "" },
    insurancePolicy: { policyNumber: "", coverageDetails: "", validUntil: "" },
    primaryCarePhysician: { contact: "", hospital: "" },
  });
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserData();
        setFormData(res.data);
      } catch {
        setError("Failed to fetch user data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Handle nested objects
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
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    try {
      await updateUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({ ...formData, profilePictureUrl: file });
    }
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
          medicalConditions: [],
          allergies: [],
        },
      ],
    }));
  };

  const removeChild = (index) => {
    const updatedChildren = formData.children.filter((_, i) => i !== index);
    setFormData({ ...formData, children: updatedChildren });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white flex items-center justify-between p-6 rounded-b-xl">
          <div className="flex items-center">
            <label htmlFor="profilePic" className="relative cursor-pointer">
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
                src={selectedImage || formData.profilePictureUrl || "/default-profile.png"}
                alt="Profile"
              />
              {isEditing && (
                <FaCamera
                  className="absolute bottom-1 right-1 bg-white p-1 rounded-full text-blue-700"
                  size={24}
                />
              )}
            </label>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h2>
              <p className="text-gray-200 text-sm">{formData.bio || "No bio available"}</p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="bg-yellow-500 px-4 py-2 rounded-md text-white shadow-md hover:bg-yellow-600 flex items-center"
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && <div className="text-red-600 mb-2">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPerson className="text-xl text-blue-700" />}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              type="email"
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdEmail className="text-xl text-blue-700" />}
            />
            <div>
              <label className="block text-gray-700 font-semibold mt-4">
                Password
              </label>
              <div className="flex items-center mt-1 border rounded-md px-3 py-2">
                <MdLock className="text-xl text-blue-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full ml-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPerson className="text-xl text-blue-700" />}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPerson className="text-xl text-blue-700" />}
            />
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLocationOn className="text-xl text-blue-700" />}
            />
            <InputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLocationOn className="text-xl text-blue-700" />}
            />
            <InputField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLocationOn className="text-xl text-blue-700" />}
            />
            <InputField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPhone className="text-xl text-blue-700" />}
            />
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-semibold mt-4">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none"
              />
            </div>
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              type="date"
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdCalendarToday className="text-xl text-blue-700" />}
            />
            <InputField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPerson className="text-xl text-blue-700" />}
            />
          </div>

          {/* Children */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Children</h3>
            {formData.children.length > 0 ? (
              formData.children.map((child, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-4 rounded-md mt-4 flex justify-between"
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {child.firstName} {child.lastName}
                    </p>
                    <p>
                      <strong>Birthdate:</strong> {child.dateOfBirth}
                    </p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeChild(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-2">No children added.</p>
            )}
            {isEditing && (
              <button
                onClick={addChild}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center"
              >
                <FaPlus className="mr-2" /> Add Child
              </button>
            )}
          </div>

          {/* Primary Care Physician */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Primary Care Physician</h3>
            <InputField
              label="Contact"
              name="primaryCarePhysicianContact"
              value={formData.primaryCarePhysician.contact}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdPhone className="text-xl text-blue-700" />}
            />
            <InputField
              label="Hospital"
              name="primaryCarePhysicianHospital"
              value={formData.primaryCarePhysician.hospital}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLocationOn className="text-xl text-blue-700" />}
            />
          </div>

          {/* Insurance Policy */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Insurance Policy</h3>
            <InputField
              label="Policy Number"
              name="insurancePolicyPolicynumber"
              value={formData.insurancePolicy.policyNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLock className="text-xl text-blue-700" />}
            />
            <InputField
              label="Coverage Details"
              name="insurancePolicyCoveragedetails"
              value={formData.insurancePolicy.coverageDetails}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLock className="text-xl text-blue-700" />}
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
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="w-full mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
