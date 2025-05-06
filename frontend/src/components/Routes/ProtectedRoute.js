import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  try {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (error) {
    // Optionally log the error
    console.error('Error in ProtectedRoute:', error);
    // Render a fallback UI
    return (
      <div style={{ color: 'red', padding: '2rem' }}>
        Sorry, something went wrong. Please try again later.
      </div>
    );
  }
}

export default ProtectedRoute;
