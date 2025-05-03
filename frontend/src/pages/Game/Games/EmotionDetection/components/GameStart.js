import { useState } from 'react';
import axios from 'axios';

const GameStart = ({ onStart }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to create player:', name); // Debug log
      
      // First try with proxy endpoint
      let response;
      try {
        response = await axios.post('/api/players', { name });
      } catch (proxyErr) {
        console.log('Proxy request failed, trying direct URL...');
        // Fallback to direct URL if proxy fails
        response = await axios.post('http://localhost:5000/api/players', { name });
      }
      
      console.log('API Response:', response); // Debug log
      
      if (!response.data || !response.data._id) {
        throw new Error('Invalid response format from server');
      }
      
      console.log('Player created successfully:', response.data); // Debug log
      onStart(response.data);
      
    } catch (err) {
      const errorDetails = {
        message: err.message,
        responseData: err.response?.data,
        status: err.response?.status
      };
      
      console.error('API Error Details:', errorDetails);
      setError(err.response?.data?.message || err.message || 'Failed to start game');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">Emotion Game</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
              minLength={2}
              maxLength={20}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting...
              </>
            ) : 'Start Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameStart;