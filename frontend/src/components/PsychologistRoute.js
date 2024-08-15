import React from "react";
import { Navigate } from "react-router-dom";

const PsychologistRoute = ({ isLoggedIn, role, children }) => {
  if (!isLoggedIn || role !== "psychologist") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PsychologistRoute;
