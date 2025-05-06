import axios from 'axios';

export const getUserData = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { error: true, message: 'No authentication token found.' };
    }

    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/user/byid`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { error: false, data: response.data };
  } catch (error) {
    let message = 'Failed to fetch user data.';
    if (error.response) {
      // Server responded with a status other than 2xx
      message += ` Server responded with status ${error.response.status}: ${error.response.data?.message || error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      message += ' No response received from server.';
    } else {
      // Something else happened
      message += ` ${error.message}`;
    }
    return { error: true, message };
  }
};

export const updateUserData = async (data) => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return { error: true, message: 'No authentication token found.' };
    }

    const response = await axios.put(`${process.env.REACT_APP_API_KEY}/user/update`, data, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return { error: false, data: response.data };
  } catch (error) {
    let message = 'Failed to update user data.';
    if (error.response) {
      message += ` Server responded with status ${error.response.status}: ${error.response.data?.message || error.response.statusText}`;
    } else if (error.request) {
      message += ' No response received from server.';
    } else {
      message += ` ${error.message}`;
    }
    return { error: true, message };
  }
};
