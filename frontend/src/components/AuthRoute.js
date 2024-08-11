import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default AuthRoute;
