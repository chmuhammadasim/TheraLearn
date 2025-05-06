import axios from 'axios';


export const getUserGames = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    console.error('No auth token found in localStorage.');
    return [];
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/game/getbyid`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return [];
  }
};
