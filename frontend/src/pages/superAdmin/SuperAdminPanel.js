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
  FaPlus,
  FaSave,
  FaTimesCircle,
  FaTimes as FaClose,
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 font-sans">
        <RiLoader4Line className="text-6xl text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 py-10 px-5 md:px-10 font-sans">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-white/90 border border-gray-200 rounded-3xl shadow-2xl mt-16 backdrop-blur-lg">
        <header className="p-10 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white text-center rounded-t-3xl shadow-lg">
          <h2 className="text-5xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Super Admin Panel</h2>
          <p className="text-blue-100 text-lg mb-4">Manage Accounts & View Statistics</p>
          <button
            onClick={openAddPsychologistForm}
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-500 px-8 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2 shadow-lg font-semibold text-lg hover:shadow-2xl focus:ring-2 focus:ring-blue-300"
          >
            <FaPlus /> Add Psychologist
          </button>
        </header>

        {fetchError && (
          <div className="text-red-600 p-4 text-center bg-red-50 border-t border-red-200 rounded-b-2xl">
            {fetchError}
          </div>
        )}

        <section className="p-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transition">
              <h3 className="text-xl font-bold mb-4 text-blue-700">User Status</h3>
              <Bar data={activeData} options={chartOptions} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white/80 rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transition">
              <h3 className="text-xl font-bold mb-4 text-blue-700">User Roles</h3>
              <Bar data={roleData} options={chartOptions} />
            </div>
          </div>
        </section>

        <section className="px-8 pb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-700">User Accounts</h3>
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full table-auto text-left border-t border-gray-200">
              <thead className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-4">User</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">First Name</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, idx) => {
                  const showChildren = expandedParents[user._id];
                  const relatedChildren = childrenData.filter(
                    (child) => child.parentId === user._id
                  );
                  const parentHasChildren = relatedChildren.length > 0;

                  return (
                    <React.Fragment key={user._id}>
                      <tr
                        className={`${
                          idx % 2 === 0 ? "bg-white/70" : "bg-blue-50/60"
                        } hover:bg-blue-100/70 border-b text-base transition group`}
                      >
                        <td className="px-4 py-4 flex items-center space-x-3 font-medium">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center shadow-md">
                            {user.profilePictureUrl ? (
                              <img
                                src={user.profilePictureUrl}
                                alt={user.username}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                            ) : (
                              <FaUserAlt className="text-white text-lg" />
                            )}
                          </div>
                          <span>{user.username}</span>
                        </td>
                        <td className="px-4 py-4">{user.email}</td>
                        <td className="px-4 py-4">{user.firstName || "N/A"}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold
                            ${user.role === "psychologist"
                              ? "bg-blue-100 text-blue-700"
                              : user.role === "parent"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                            }`}>
                            {user.role?.toUpperCase() || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`flex items-center space-x-2 font-semibold px-3 py-1 rounded-full text-xs
                            ${user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}>
                            {user.isActive ? <FaCheck /> : <FaTimes />}
                            <span>{user.isActive ? "Active" : "Inactive"}</span>
                          </span>
                        </td>
                        <td className="px-4 py-4 flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleUserStatusToggle(user._id, user.isActive)
                            }
                            className={`px-4 py-2 rounded-full text-white transition hover:scale-105 shadow-md font-semibold flex items-center gap-2
                              ${user.isActive
                                ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              }`}
                          >
                            {user.isActive ? <FaTimesCircle /> : <FaCheck />}
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                          {user.role === "parent" && parentHasChildren && (
                            <button
                              onClick={() => toggleExpanded(user._id)}
                              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2 rounded-full hover:scale-110 transition flex items-center shadow"
                              title={showChildren ? "Hide Children" : "Show Children"}
                            >
                              {showChildren ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                          )}
                        </td>
                      </tr>
                      {showChildren && (
                        <tr>
                          <td colSpan={6} className="bg-blue-50/80">
                            <div className="p-4 rounded-xl border border-blue-100 shadow-inner">
                              <h4 className="font-bold mb-2 text-blue-700">
                                Children of {user.username}:
                              </h4>
                              <table className="w-full text-sm rounded">
                                <thead className="text-left bg-blue-100">
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
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                                          ${child.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                          }`}>
                                          {child.isActive ? "Active" : "Inactive"}
                                        </span>
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
          </div>
        </section>
      </div>

      {showAddPsychologist && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto transition-all duration-300">
          <form
            onSubmit={handleAddPsychologist}
            className="relative bg-white w-full max-w-5xl p-10 rounded-3xl shadow-2xl space-y-8 transform transition-all max-h-[95vh] overflow-y-auto border-2 border-blue-200"
          >
            <button
              type="button"
              onClick={closeAddPsychologistForm}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-2xl transition"
              title="Close"
            >
              <FaClose />
            </button>
            <h2 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-3">
              <FaPlus /> Add Psychologist
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <label className="block text-sm font-medium text-gray-700">
                Username
                <input
                  name="username"
                  value={newPsychologist.username}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
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
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
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
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Password"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                First Name
                <input
                  name="firstName"
                  value={newPsychologist.firstName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="First Name"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
                <input
                  name="lastName"
                  value={newPsychologist.lastName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Last Name"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture URL
                <input
                  name="profilePictureUrl"
                  value={newPsychologist.profilePictureUrl}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Profile Image Link"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Contact
                <input
                  name="contact"
                  value={newPsychologist.contact}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Phone Number"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Address
                <input
                  name="address"
                  value={newPsychologist.address}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Street Address"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                City
                <input
                  name="city"
                  value={newPsychologist.city}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="City"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Country
                <input
                  name="country"
                  value={newPsychologist.country}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
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
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 col-span-2">
                Bio
                <textarea
                  name="bio"
                  value={newPsychologist.bio}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Short biography"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Availability
                <input
                  name="availability"
                  value={newPsychologist.availability}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
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
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                  placeholder="Fee in USD"
                />
              </label>
            </div>
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2 font-semibold shadow-lg"
              >
                <FaSave /> Save
              </button>
              <button
                type="button"
                onClick={closeAddPsychologistForm}
                className="bg-gray-400 text-white px-8 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2 font-semibold shadow"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SuperAdminPanel;
