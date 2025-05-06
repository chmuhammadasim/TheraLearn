import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ isLoggedIn, children }) {
  try {
    // Defensive checks for props
    if (typeof isLoggedIn !== 'boolean') {
      console.error('AuthRoute: "isLoggedIn" prop should be a boolean.');
      return <div>Unexpected error occurred. Please try again later.</div>;
    }

    if (isLoggedIn) {
      return <Navigate to="/dashboard" replace />;
    }

    // Ensure children is valid React node
    if (!children) {
      console.error('AuthRoute: No children provided.');
      return <div>Unexpected error occurred. Please try again later.</div>;
    }

    return children;
  } catch (error) {
    console.error('AuthRoute encountered an error:', error);
    return <div>Something went wrong. Please refresh the page.</div>;
  }
}

export default AuthRoute;
