import React from 'react';
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
  return (
    <Router>
      <div>
        <Navbar  isLoggedIn={false} />
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
