import axios from 'axios';

const API_URL = 'http://localhost:5000/api/questions';

export const getQuestions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
