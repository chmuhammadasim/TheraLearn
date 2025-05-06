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

    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      data = null;
    }

    if (!response.ok) {
      const errorMsg = data?.message || `Signup failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    // Log error for debugging
    console.error("Signup error:", error);
    throw new Error(error?.message || 'An error occurred during signup');
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

    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      data = null;
    }

    if (!response.ok) {
      const errorMsg = data?.message || `Login failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    // Log error for debugging
    console.error("Login error:", error);
    throw new Error(error?.message || 'An error occurred during login');
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
    // Log error for debugging
    console.error("Forgot password error:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'An error occurred during Forget Password';
    throw new Error(errorMessage);
  }
};
