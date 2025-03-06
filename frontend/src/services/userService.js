import axios from 'axios';


export const getUserData = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/user/byid`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data: ' + error.message);
  }
};

export const updateUserData = async (data) => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_KEY}/user/update`, data, {
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
