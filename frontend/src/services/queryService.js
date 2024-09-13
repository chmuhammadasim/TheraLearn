import axios from 'axios';

const API_URL = 'http://localhost:5000/api/query';

export const submitQuery = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Axios automatically parses the response, no need for response.json()
    return response.data;
  } catch (error) {
    console.error('Error in submitQuery service:', error);
    throw error;
  }
};
