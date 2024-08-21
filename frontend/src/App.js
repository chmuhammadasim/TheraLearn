import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/landingPages/LandingPage";
import ContactUsPage from "./pages/ContactUs/ContactUs";
import AboutUsPage from "./pages/AboutUs/AboutUs";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import NotFound404 from "./pages/NotFound404/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import BlogList from "./pages/BlogPages/BlogList";
import BlogDetail from "./pages/BlogPages/BlogDetail";
import BlogForm from "./pages/psychologist/BlogForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import ProfilePage from "./pages/Profile/Profile";
import SuperAdminRoute from "./components/SuperAdminRoute";
import SuperAdminPanel from "./pages/superAdmin/SuperAdminPanel";
import PsychologistRoute from "./components/PsychologistRoute";
import GamePage from './pages/Game/Game'
import PsychologistListPage from "./pages/PsychologistList/PsychologistList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

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
  }, [isLoggedIn, role]);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} role={role} />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Show Login/Signup only if the user is not signed in */}
          {!isLoggedIn && (
            <>
              <Route
                path="/login"
                element={
                  <AuthRoute isLoggedIn={isLoggedIn}>
                    <LoginPage />
                  </AuthRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRoute isLoggedIn={isLoggedIn}>
                    <SignupPage />
                  </AuthRoute>
                }
              />
            </>
          )}

          {/* Show Dashboard only if the user is signed in */}
          {isLoggedIn && (
            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {isLoggedIn && role === "superadmin" && (
            <Route
              path="/superadmin"
              element={
                <SuperAdminRoute isLoggedIn={isLoggedIn} role={role}>
                  <SuperAdminPanel />
                </SuperAdminRoute>
              }
            />
          )}

          {isLoggedIn && role === "psychologist" && (
            <Route
              path="/blogform"
              element={
                <PsychologistRoute isLoggedIn={isLoggedIn} role={role}>
                  <BlogForm />
                </PsychologistRoute>
              }
            />
          )}

          {/* Public Routes */}
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/psychologistslist" element={<PsychologistListPage />} />
          <Route path="/404" element={<NotFound404 />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
