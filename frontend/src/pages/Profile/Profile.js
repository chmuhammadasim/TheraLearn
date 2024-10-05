import React, { useState, useEffect } from "react";
import { FaUserEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdCalendarToday,
  MdLock,
} from "react-icons/md";
import { getUserData, updateUserData } from "../../services/userService"; // Adjust the path as needed

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
    createdAt: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserData();
        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          password: "",
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          address: res.data.address || "",
          city: res.data.city || "",
          country: res.data.country || "",
          contact: res.data.contact || "",
          bio: res.data.bio || "",
          profilePictureUrl: res.data.profilePictureUrl || "/LOGO.png",
          dateOfBirth: res.data.dateOfBirth || "",
          createdAt: res.data.createdAt || "",
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
        setFormData({
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
          createdAt: "",
        });
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8c731] to-[#fc3a52] py-10 px-5">
      <div className="max-w-4xl mt-20 mb-20 mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#0e2431] text-white flex items-center justify-between p-6">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-[#f8c731]"
              src={formData.profilePictureUrl}
              alt="Profile"
            />
            <div className="ml-4">
              <h2 className="text-3xl font-bold">{`${formData.firstName} ${formData.lastName}`}</h2>
              <p>{formData.bio || "Add a short bio"}</p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="flex items-center bg-[#fc3a52] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#d12f44] transition"
          >
            <FaUserEdit className="mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Username</label>
              <div className="flex items-center mt-1">
                <MdPerson className="text-xl text-[#fc3a52] mr-2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <div className="flex items-center mt-1">
                <MdEmail className="text-xl text-[#fc3a52] mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Password</label>
              <div className="flex items-center mt-1 relative">
                <MdLock className="text-xl text-[#fc3a52] mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Contact</label>
              <div className="flex items-center mt-1">
                <MdPhone className="text-xl text-[#fc3a52] mr-2" />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                  !isEditing ? "bg-gray-100" : "bg-white"
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <div className="flex items-center mt-1">
                <MdCalendarToday className="text-xl text-[#fc3a52] mr-2" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fc3a52] ${
                    !isEditing ? "bg-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Created At</label>
            <div className="flex items-center mt-1">
              <MdCalendarToday className="text-xl text-[#fc3a52] mr-2" />
              <input
                type="text"
                name="createdAt"
                value={new Date(formData.createdAt).toLocaleDateString()}
                disabled
                className="w-full border-2 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="w-full mt-6 bg-[#fc3a52] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#d12f44] transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
