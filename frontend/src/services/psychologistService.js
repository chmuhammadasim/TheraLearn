import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/psychologist';

export const getPsychologists = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getall`);
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    throw error;
  }
};

export const getPsychologistById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};
