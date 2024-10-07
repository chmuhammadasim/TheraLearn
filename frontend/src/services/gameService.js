import axios from 'axios';


export const getUserGames = async () => {
  const token = localStorage.getItem('authToken');
  
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/game/getbyid`, {
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
