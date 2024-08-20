import axios from 'axios';

const API_URL = 'http://localhost:5000/api/game';

export const getUserGames = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${API_URL}/getbyid`, {
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
