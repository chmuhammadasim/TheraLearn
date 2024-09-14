import React, { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserStatus } from '../../services/superAdminService';
import { FaUserAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { RiLoader4Line } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, !isActive);
      setUsers(users.map(user => user._id === userId ? { ...user, isActive: !isActive } : user));
      toast.success(`User status updated successfully!`, {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status.', {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <RiLoader4Line className="text-6xl text-[#0e2431] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f8c731] to-[#fc3a52] py-10 px-5">
      <ToastContainer />
      <div className="max-w-7xl mt-20 mb-20 mx-auto bg-white shadow-xl rounded-lg overflow-hidden animate-fadeIn">
        <div className="bg-[#0e2431] text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Super Admin Panel</h2>
          <p>Manage user accounts, activate or deactivate them.</p>
        </div>

        {error && (
          <div className="text-red-600 p-4">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full bg-white text-left table-auto border-collapse">
            <thead className="bg-[#0e2431] text-white">
              <tr>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Username</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Email</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">First Name</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Last Name</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Contact</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">City</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Country</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Status</th>
                <th className="px-4 py-2 border-b-2 border-[#f8c731]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="border-t px-4 py-2 flex items-center space-x-2">
                    <FaUserAlt className="text-[#f8c731]" />
                    <span>{user.username}</span>
                  </td>
                  <td className="border-t px-4 py-2">{user.email}</td>
                  <td className="border-t px-4 py-2">{user.firstName || 'N/A'}</td>
                  <td className="border-t px-4 py-2">{user.lastName || 'N/A'}</td>
                  <td className="border-t px-4 py-2">{user.contact || 'N/A'}</td>
                  <td className="border-t px-4 py-2">{user.city || 'N/A'}</td>
                  <td className="border-t px-4 py-2">{user.country || 'N/A'}</td>
                  <td className="border-t px-4 py-2 flex items-center">
                    {user.isActive ? (
                      <span className="flex items-center space-x-2 text-green-600">
                        <FaCheck />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2 text-red-600">
                        <FaTimes />
                        <span>Inactive</span>
                      </span>
                    )}
                  </td>
                  <td className="border-t px-4 py-2">
                    <button
                      onClick={() => handleStatusChange(user._id, user.isActive)}
                      className={`px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${user.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
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
