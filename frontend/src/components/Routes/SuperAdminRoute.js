import React from 'react';
import { Navigate } from 'react-router-dom';

function SuperAdminRoute({ isLoggedIn, role, children }) {
  try {
    if (!isLoggedIn || role !== 'admin') {
      return <Navigate to="/404" replace />;
    }
    return children;
  } catch (error) {
    console.error('Error in SuperAdminRoute:', error);
    return <Navigate to="/404" replace />;
  }
}

export default SuperAdminRoute;
