import axios from 'axios';

// Helper to get token fresh each time
const getToken = () => localStorage.getItem('authToken');

// Generic error handler
const handleError = (error, context) => {
  if (axios.isAxiosError(error)) {
    // Network error
    if (!error.response) {
      console.error(`${context}: Network error or server unreachable.`, error);
      return { error: 'Network error. Please check your connection.' };
    }
    // Server responded with error
    console.error(`${context}:`, error.response.data || error.message);
    return { error: error.response.data?.message || 'Server error occurred.' };
  }
  // Other errors
  console.error(`${context}: Unexpected error.`, error);
  return { error: 'An unexpected error occurred.' };
};

// Function to fetch all users
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/superadmin/all`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error, 'Error fetching users');
  }
};

// Function to update the status of a user (activate/deactivate)
export const updateUserStatus = async (userId, isActive) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}/superadmin/users/${userId}`,
      { isActive },
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Error updating user status');
  }
};

export const addPsychologist = async (isActive) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_KEY}/superadmin/add/psychologist`,
      { isActive },
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'Error adding psychologist');
  }
};