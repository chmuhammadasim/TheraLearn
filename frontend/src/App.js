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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check if the user is logged in
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken'); // Assume the token is stored in localStorage
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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
