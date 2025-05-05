import axios from 'axios';


export const signUpUser = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/signup`, {
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
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/auth/login`, {
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
  export const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/auth/forgetpassword`,
        { email: email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during Forget Password';
      throw new Error(errorMessage);
    }
  };
