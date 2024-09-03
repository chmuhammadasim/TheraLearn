import axios from 'axios';

const API_URL = 'http://localhost:5000/api/query';

export const submitQuery = async (formData) => {
   try {
    const response = await axios.post(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit query');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in sendQuery service:', error);
    throw error;
  }
};











