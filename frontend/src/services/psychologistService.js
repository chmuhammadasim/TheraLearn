import axios from 'axios';

const API_URL = 'http://localhost:5000/api/psychologist';

export const getPsychologists = async () => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(`${API_URL}/getall`, {
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologists:', error);
    throw error;
  }
};

export const getPsychologistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching psychologist details:', error);
    throw error;
  }
};
