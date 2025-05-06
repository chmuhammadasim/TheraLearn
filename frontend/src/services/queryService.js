import axios from 'axios';


export const submitQuery = async (formData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/query`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in submitQuery service:', error);
    // Return a consistent error object instead of throwing
    return {
      success: false,
      message: error?.response?.data?.message || error.message || 'An unknown error occurred.',
      error: error
    };
  }
};
