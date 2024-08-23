import React from 'react';
import { Navigate } from 'react-router-dom';

function SuperAdminRoute({ isLoggedIn, role, children }) {
  if (!isLoggedIn || role !== 'superadmin') {
    return <Navigate to="/404" replace />;
  }
  return children;
}

export default SuperAdminRoute;
