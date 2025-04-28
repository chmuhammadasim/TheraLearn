import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);

  const checkTokenValidity = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp && Date.now() >= payload.exp * 1000;
      return !isExpired;
    } catch (err) {
      console.error("Token validation error:", err);
      return false;
    }
  };

  const checkLoginStatus = useCallback(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("authRole");

      if (token && checkTokenValidity(token)) {
        setIsLoggedIn(true);
        setRole(userRole);
      } else {
        setIsLoggedIn(false);
        setRole(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRole");
      }
    } catch (err) {
      console.error("Error checking login status:", err);
      setError("An error occurred while verifying login status.");
      setIsLoggedIn(false);
      setRole(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authRole");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authChildren");
      localStorage.removeItem("selectedChild");
      setIsLoggedIn(false);
      setRole(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      setError("An error occurred during logout.");
    }
  }, []);

  const login = useCallback((token, userRole) => {
    try {
      if (checkTokenValidity(token)) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("authRole", userRole);
        setIsLoggedIn(true);
        setRole(userRole);
        if (userRole === "psychologist" || userRole === "admin") {
          window.location.href = "/";
        }
      } else {
        throw new Error("Invalid or expired token.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Invalid token.");
      logout();
    }
  }, [logout]);

  

  const authContextValue = useMemo(() => ({ isLoggedIn, role, login, logout, error }), [isLoggedIn, role, login, logout, error]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
