import React from "react";
import { Navigate } from "react-router-dom";

const PsychologistRoute = ({ isLoggedIn, role, children }) => {
  try {
    if (!isLoggedIn || role !== "psychologist") {
      return <Navigate to="/login" />;
    }
    return children;
  } catch (error) {
    // Optionally log the error somewhere
    console.error("Error in PsychologistRoute:", error);
    // Redirect to a generic error page or login
    return <Navigate to="/404" />;
  }
};

export default PsychologistRoute;
