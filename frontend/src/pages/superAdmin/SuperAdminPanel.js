import React, { useState, useEffect } from "react";
import {
  fetchAllUsers,
  updateUserStatus,
  addPsychologist,
} from "../../services/superAdminService";
import {
  FaUserAlt,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SuperAdminPanel = () => {
  const [userData, setUserData] = useState([]);
  const [childrenData, setChildrenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [expandedParents, setExpandedParents] = useState({});

  const [showAddPsychologist, setShowAddPsychologist] = useState(false);
  const [newPsychologist, setNewPsychologist] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profilePictureUrl: "",
    contact: "",
    address: "",
    city: "",
    country: "",
    dateOfBirth: "",
    bio: "",
    education: [],
    experience: [],
    specialization: "Down Syndrome Specialist",
    therapyMethods: [],
    certifications: [],
    availability: "",
    consultationFee: 0,
    role: "psychologist",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        const parents = Array.isArray(data.parents) ? data.parents : [];
        const psychologists = Array.isArray(data.psychologists)
          ? data.psychologists
          : [];
        setChildrenData(Array.isArray(data.children) ? data.children : []);
        setUserData([...parents, ...psychologists]);
        setFetchError(null);
      } catch {
        setFetchError("Failed to fetch user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserStatusToggle = async (id, currentStatus) => {
    try {
      await updateUserStatus(id, !currentStatus);
      setUserData((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isActive: !currentStatus } : u))
      );
      toast.success("User status updated.", { position: "top-center", autoClose: 2000 });
    } catch {
      toast.error("Failed to update user status.", { position: "top-center", autoClose: 2000 });
    }
  };

  // Functions for Add Psychologist form
  const openAddPsychologistForm = () => setShowAddPsychologist(true);
  const closeAddPsychologistForm = () => setShowAddPsychologist(false);
  const handleChange = (e) => {
    setNewPsychologist({ ...newPsychologist, [e.target.name]: e.target.value });
  };
  const handleAddPsychologist = async (e) => {
    e.preventDefault();
    try {
      await addPsychologist(newPsychologist);
      toast.success("Psychologist added.", { position: "top-center", autoClose: 2000 });
      setShowAddPsychologist(false);
      // Optionally refresh user list or do other updates
    } catch {
      toast.error("Failed to add psychologist.", { position: "top-center", autoClose: 2000 });
    }
  };

  const toggleExpanded = (parentId) =>
    setExpandedParents((prev) => ({ ...prev, [parentId]: !prev[parentId] }));

  const activeCount = userData.filter((u) => u.isActive).length;
  const inactiveCount = userData.length - activeCount;
  const psychCount = userData.filter((u) => u.role === "psychologist").length;
  const nonPsychCount = userData.length - psychCount;

  const activeData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "User Status",
        data: [activeCount, inactiveCount],
        backgroundColor: ["#4ADE80", "#F87171"],
      },
    ],
  };
  const roleData = {
    labels: ["Psychologists", "Others"],
    datasets: [
      {
        label: "User Roles",
        data: [psychCount, nonPsychCount],
        backgroundColor: ["#60A5FA", "#A78BFA"],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "User Overview" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <RiLoader4Line className="text-6xl text-gray-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-5 md:px-10">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg mt-16">
        <header className="p-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center rounded-t-lg">
          <h2 className="text-3xl font-bold mb-1">Super Admin Panel</h2>
          <p className="text-blue-100">Manage Accounts & View Statistics</p>
          <button
            onClick={openAddPsychologistForm}
            className="mt-4 bg-blue-600 px-4 py-2 rounded-md hover:scale-105 transition"
          >
            Add Psychologist
          </button>
        </header>

        {fetchError && (
          <div className="text-red-600 p-4 text-center bg-red-50 border-t border-red-200">
            {fetchError}
          </div>
        )}

        <section className="p-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 p-4 bg-gray-50 rounded-md shadow-sm">
            <Bar data={activeData} options={chartOptions} />
          </div>
          <div className="w-full lg:w-1/2 p-4 bg-gray-50 rounded-md shadow-sm">
            <Bar data={roleData} options={chartOptions} />
          </div>
        </section>

        <section className="px-4 pb-6 overflow-x-auto">
          <table className="w-full table-auto text-left border-t">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => {
                const showChildren = expandedParents[user._id];
                const relatedChildren = childrenData.filter(
                  (child) => child.parentId === user._id
                );
                const parentHasChildren = relatedChildren.length > 0;

                return (
                  <React.Fragment key={user._id}>
                    <tr className="hover:bg-gray-100 border-b text-sm">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <FaUserAlt className="text-gray-600" />
                        <span>{user.username}</span>
                      </td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.firstName || "N/A"}</td>
                      <td className="px-4 py-3 uppercase">{user.role || "N/A"}</td>
                      <td className="px-4 py-3">
                        {user.isActive ? (
                          <span className="flex items-center space-x-1 text-green-500">
                            <FaCheck />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-red-500">
                            <FaTimes />
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUserStatusToggle(user._id, user.isActive)
                          }
                          className={`px-3 py-1 rounded-full text-white transition hover:scale-105 shadow-md ${
                            user.isActive ? "bg-red-500" : "bg-green-500"
                          }`}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </button>
                        {user.role === "parent" && parentHasChildren && (
                          <button
                            onClick={() => toggleExpanded(user._id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full hover:scale-105 transition"
                          >
                            {showChildren ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        )}
                      </td>
                    </tr>
                    {showChildren && (
                      <tr>
                        <td colSpan={6} className="bg-gray-50">
                          <div className="p-4">
                            <h3 className="font-bold mb-2">
                              Children of {user.username}:
                            </h3>
                            <table className="w-full text-sm">
                              <thead className="text-left bg-gray-200">
                                <tr>
                                  <th className="px-2 py-1">Name</th>
                                  <th className="px-2 py-1">Age</th>
                                  <th className="px-2 py-1">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {relatedChildren.map((child) => (
                                  <tr key={child._id} className="border-b">
                                    <td className="px-2 py-1">{child.username || "N/A"}</td>
                                    <td className="px-2 py-1">{child.age || "N/A"}</td>
                                    <td className="px-2 py-1">
                                      {child.isActive ? "Active" : "Inactive"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>

      {showAddPsychologist && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <form
            onSubmit={handleAddPsychologist}
            className="bg-white w-full max-w-5xl p-6 rounded-md shadow-md space-y-4 transform transition-all max-h-[95vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Add Psychologist
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
                <input
                  name="username"
                  value={newPsychologist.username}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Username"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Email
                <input
                  name="email"
                  type="email"
                  value={newPsychologist.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Email"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <input
                  name="password"
                  type="password"
                  value={newPsychologist.password}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Password"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                First Name
                <input
                  name="firstName"
                  value={newPsychologist.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="First Name"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
                <input
                  name="lastName"
                  value={newPsychologist.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Last Name"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture URL
                <input
                  name="profilePictureUrl"
                  value={newPsychologist.profilePictureUrl}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Profile Image Link"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Contact
                <input
                  name="contact"
                  value={newPsychologist.contact}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Phone Number"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Address
                <input
                  name="address"
                  value={newPsychologist.address}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Street Address"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                City
                <input
                  name="city"
                  value={newPsychologist.city}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="City"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Country
                <input
                  name="country"
                  value={newPsychologist.country}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Country"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
                <input
                  name="dateOfBirth"
                  type="date"
                  value={newPsychologist.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 col-span-2">
                Bio
                <textarea
                  name="bio"
                  value={newPsychologist.bio}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Short biography"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Availability
                <input
                  name="availability"
                  value={newPsychologist.availability}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="e.g. Mon-Fri"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Consultation Fee
                <input
                  name="consultationFee"
                  type="number"
                  value={newPsychologist.consultationFee}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring focus:ring-blue-200"
                  placeholder="Fee in USD"
                />
              </label>
            </div>
            <div className="flex justify-end space-x-4 pt-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition"
              >
                Save
              </button>
              <button
                onClick={closeAddPsychologistForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:scale-105 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPanel;
