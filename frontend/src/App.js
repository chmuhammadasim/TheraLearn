import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/landingPages/LandingPage';
import ContactUsPage from './pages/BlogPages/ContactUs';
import AboutUsPage from './pages/BlogPages/AboutUs';
import LoginPage from './pages/AuthPages/LoginPage';
import SignupPage from './pages/AuthPages/SignupPage';
import NotFound404 from './pages/NotFound404/NotFound';
import DashboardPage from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              <LoginPage />
            </AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              <SignupPage />
            </AuthRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
