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
  MdCheckCircle,
  MdMedicalServices,
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
    <div className="flex items-center mt-1 border rounded-md px-3 py-2 transition hover:shadow-sm">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ml-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, name, value, onChange, disabled = false }) => (
  <div className="mt-4">
    <label className="block text-gray-700 font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition hover:shadow-sm"
    />
  </div>
);

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch {
        setError("Failed to fetch user data. Please try again.");
      }
    };
    fetchData();
  }, []);

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

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
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
    const storedRole = localStorage.getItem("authrole");
    if (storedRole === "parent") {
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
    } else if (storedRole === "psychologist") {
      setError("You do not have permission to add children.");
    }
  };

  const removeChild = (index) => {
    const storedRole = localStorage.getItem("authrole");
    if (storedRole !== "parent") {
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
              <p className="text-gray-100 text-sm">
                {formData.username || "No username"}
              </p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="w-full sm:w-auto bg-yellow-500 px-4 py-2 text-sm sm:text-base rounded-md text-white shadow-md hover:bg-yellow-600 flex items-center justify-center transition"
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

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
              <div className="flex items-center mt-1 border rounded-md px-3 py-2 transition hover:shadow-sm">
                <MdLock className="text-xl text-blue-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full ml-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            <TextAreaField
              label="Medical History (comma-separated)"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField
              label="Insurance Provider"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdMedicalServices className="text-xl text-blue-700" />}
            />
            <InputField
              label="Preferred Hospital"
              name="preferredHospital"
              value={formData.preferredHospital}
              onChange={handleInputChange}
              disabled={!isEditing}
              icon={<MdLocationOn className="text-xl text-blue-700" />}
            />
          </div>

          <div className="mt-2 flex items-center space-x-2">
            <input
              type="checkbox"
              name="emergencyAuthorization"
              checked={formData.emergencyAuthorization}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <label className="text-gray-700 font-semibold">
              Emergency Authorization
            </label>
          </div>

          {/* Show children section only if role is parent */}
          {role === "parent" && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Children</h3>
              {formData.children.length > 0 ? (
                formData.children.map((child, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-md mt-4 flex flex-col transition hover:shadow-sm"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p>
                          <strong>Role:</strong> {child.role}
                        </p>
                        <p>
                          <strong>Name:</strong> {child.firstName}{" "}
                          {child.lastName}
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
                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                          disabled={!isEditing}
                          icon={<MdPerson className="text-xl text-blue-700" />}
                        />
                        <InputField
                          label="Last Name"
                          name="lastName"
                          value={child.lastName}
                          onChange={(e) =>
                            handleChildChange(index, "lastName", e.target.value)
                          }
                          disabled={!isEditing}
                          icon={<MdPerson className="text-xl text-blue-700" />}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
                          icon={<MdPerson className="text-xl text-blue-700" />}
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
                          disabled={!isEditing}
                          icon={
                            <MdMedicalServices className="text-xl text-blue-700" />
                          }
                        />
                        <TextAreaField
                          label="Medical Conditions (comma-separated)"
                          name="medicalConditions"
                          value={child.medicalConditions}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "medicalConditions",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />
                        <TextAreaField
                          label="Allergies (comma-separated)"
                          name="allergies"
                          value={child.allergies}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "allergies",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />
                        <TextAreaField
                          label="Medications (comma-separated)"
                          name="medications"
                          value={child.medications}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "medications",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 mt-2">No children added.</p>
              )}
              {isEditing && (
                <button
                  onClick={addChild}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center transition"
                >
                  <FaPlus className="mr-2" /> Add Child
                </button>
              )}
            </div>
          )}
          {role === "parent" && (
            <div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold">
                  Primary Care Physician
                </h3>
                <InputField
                  label="Name"
                  name="primaryCarePhysicianName"
                  value={formData.primaryCarePhysician.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={<MdPerson className="text-xl text-blue-700" />}
                />
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
            </div>
          )}

          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="w-full sm:w-auto mt-6 bg-green-600 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-green-700 flex items-center justify-center transition"
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
