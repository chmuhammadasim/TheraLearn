import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("authRole");
      if (token) {
        setIsLoggedIn(true);
        setRole(userRole);
      } else {
        setIsLoggedIn(false);
        setRole(null);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authRole", userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRole");
    setIsLoggedIn(false);
    setRole(null);
    // navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
