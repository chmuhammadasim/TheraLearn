const API_URL = 'http://localhost:5000/api/auth/';

export const signUpUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'An error occurred during signup');
    }
  };
  
  export const logInUser = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'An error occurred during login');
    }
  };