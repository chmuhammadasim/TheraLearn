import React, { useState, useEffect } from 'react';
import { logInUser } from '../../services/authService'; // Import the login function
import Loading from '../../components/Loading'; // Import the Loading component

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false); // Separate state for login process

  useEffect(() => {
    // Simulate an initialization delay
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setMessage('');

    try {
      const credentials = { email, password };
      const data = await logInUser(credentials);
      setMessage('Login successful');

      // Store the token in local storage or any state management solution
      localStorage.setItem('authToken', data.token);
      // Redirect or update the UI accordingly
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
