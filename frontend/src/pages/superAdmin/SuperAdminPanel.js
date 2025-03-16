import React, { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserStatus } from '../../services/superAdminService';
import { FaUserAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { RiLoader4Line } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SuperAdminPanel = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const activeCount = userData.filter(u => u.isActive).length;
  const inactiveCount = userData.length - activeCount;
  const psychCount = userData.filter(u => u.role === 'psychologist').length;
  const nonPsychCount = userData.length - psychCount;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUserData(data);
        setFetchError(null);
      } catch {
        setFetchError('Failed to fetch user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleUserStatusToggle = async (id, currentStatus) => {
    try {
      await updateUserStatus(id, !currentStatus);
      setUserData(prev =>
        prev.map(u => (u._id === id ? { ...u, isActive: !currentStatus } : u))
      );
      toast.success('User status updated successfully.', { position: 'top-center', autoClose: 2000 });
    } catch {
      toast.error('Failed to update user status.', { position: 'top-center', autoClose: 2000 });
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <RiLoader4Line className="text-6xl text-gray-500 animate-spin" />
      </div>
    );
  }

  const activeData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label: 'User Status',
        data: [activeCount, inactiveCount],
        backgroundColor: ['#4ADE80', '#F87171'],
      },
    ],
  };

  const roleData = {
    labels: ['Psychologists', 'Others'],
    datasets: [
      {
        label: 'User Roles',
        data: [psychCount, nonPsychCount],
        backgroundColor: ['#60A5FA', '#A78BFA'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'User Overview' },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10">
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg mt-16">
        <div className="p-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Super Admin Panel</h2>
          <p className="text-blue-100">Manage Accounts and View Statistics</p>
        </div>

        {fetchError && (
          <div className="text-red-600 p-4 text-center bg-red-50 border-t border-red-200">
            {fetchError}
          </div>
        )}


        <div className="p-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 p-4 bg-gray-50 rounded-md shadow-sm">
            <Bar data={activeData} options={chartOptions} />
          </div>
          <div className="w-full lg:w-1/2 p-4 bg-gray-50 rounded-md shadow-sm">
            <Bar data={roleData} options={chartOptions} />
          </div>
        </div>

        <div className="px-4 pb-6 overflow-x-auto">
          <table className="w-full text-left table-auto border-t">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 border-b text-sm"
                >
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <FaUserAlt className="text-gray-600" />
                    <span>{user.username}</span>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.firstName || 'N/A'}</td>
                  <td className="px-4 py-3">{user.lastName || 'N/A'}</td>
                  <td className="px-4 py-3">{user.contact || 'N/A'}</td>
                  <td className="px-4 py-3">{user.city || 'N/A'}</td>
                  <td className="px-4 py-3">{user.country || 'N/A'}</td>
                  <td className="px-4 py-3">{user.role || 'N/A'}</td>
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
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleUserStatusToggle(user._id, user.isActive)}
                      className={`px-4 py-2 rounded-full text-white transition hover:scale-105 shadow-md ${
                        user.isActive ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;
