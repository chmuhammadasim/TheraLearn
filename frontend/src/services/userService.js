import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user';

export const getUserData = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${API_URL}/byid`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch user data: ' + error.message);
  }
};

export const updateUserData = async (data) => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.put(`${API_URL}`, data, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user data: ' + error.message);
  }
};
