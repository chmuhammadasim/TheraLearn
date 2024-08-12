import React, { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserStatus } from '../../services/superAdminService';

const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
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
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, !isActive);
      setUsers(users.map(user => user._id === userId ? { ...user, isActive: !isActive } : user));
      alert('User status updated successfully!');
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-[#0e2431] text-white p-6 text-center">
          <h2 className="text-3xl font-bold">Super Admin Panel</h2>
          <p>Manage user accounts, activate or deactivate them.</p>
        </div>

        {error && (
          <div className="text-red-600 p-4">
            {error}
          </div>
        )}

        <table className="w-full bg-white text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {user.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleStatusChange(user._id, user.isActive)}
                    className={`px-4 py-2 rounded-md shadow-md ${user.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} hover:opacity-75 transition`}
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
  );
};

export default SuperAdminPanel;
