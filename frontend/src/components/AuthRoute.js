import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default AuthRoute;
