import axios from 'axios';
const token = localStorage.getItem('authToken');
// Function to fetch all users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/superadmin/all`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to update the status of a user (activate/deactivate)
export const updateUserStatus = async (userId, isActive) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_API_KEY}/superadmin/users/${userId}`, 
      { isActive },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};