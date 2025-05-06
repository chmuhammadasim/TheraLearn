import axios from 'axios';


export const getQuestions = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/questions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Return a safe fallback value to prevent app failure
    return [];
  }
};
