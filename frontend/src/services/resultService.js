import axios from 'axios';


export const getResult = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/results/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    // Return a default value or structured error object instead of throwing
    return { success: false, error: error?.message || 'Unknown error', data: null };
  }
};
