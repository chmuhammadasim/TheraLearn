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
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import AuthRoute from "./components/Routes/AuthRoute";
import ProfilePage from "./pages/Profile/Profile";
import SuperAdminRoute from "./components/Routes/SuperAdminRoute";
import SuperAdminPanel from "./pages/superAdmin/SuperAdminPanel";
import AdminBlogDashboard from "./pages/superAdmin/AdminBlogPanel";
import SuperAdminContactUs from "./pages/superAdmin/SuperAdminContactUs";
import SuperAdminContentPanel from "./pages/superAdmin/adminContentPanel";
import PsychologistRoute from "./components/Routes/PsychologistRoute";
import GamePage from "./pages/Game/Game";
import NumberGuessingGame from "./pages/Game/Games/Countinggamespeechrecognition/NumberGuessingGame";
import HandposeDetector from "./pages/Game/Games/HandposeDetector/HandposeDetector"
import EmotionDetection from "./pages/Game/Games/EmotionDetection/EmotionDetection";
import MagicMemory from "./pages/Game/Games/MagicMemory/MagicMemory";
import PsychologistListPage from "./pages/PsychologistList/PsychologistList";
import PsychologistDetailsPage from "./pages/PsychologistList/PsychologistDetailsPage";
import PsychologistBlogPage from "./pages/psychologist/PsychologistBlogPage";
import PsychologistPatientDashboard from "./pages/psychologist/PsychologistPatientDashboard";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import BetterAim from "./pages/Game/Games/BettterAim/BetterAim";
import ObjectGuessingGame from "./pages/Game/Games/Naminggamespeechrecognition/ObjectGuessingGame";

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
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar isLoggedIn={isLoggedIn} role={role} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
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

            {isLoggedIn && role === "admin" && (
              <>
                <Route
                  path="/superadmin"
                  element={
                    <SuperAdminRoute isLoggedIn={isLoggedIn} role={role}>
                      <SuperAdminPanel />
                    </SuperAdminRoute>
                  }
                />
                <Route
                  path="/superadminpanel"
                  element={
                    <SuperAdminRoute isLoggedIn={isLoggedIn} role={role}>
                      <SuperAdminContentPanel />
                    </SuperAdminRoute>
                  }
                />
                <Route
                  path="/superadminblogdashboard"
                  element={
                    <SuperAdminRoute isLoggedIn={isLoggedIn} role={role}>
                      <AdminBlogDashboard />
                    </SuperAdminRoute>
                  }
                />
                <Route
                  path="/superadmincontactus"
                  element={
                    <SuperAdminRoute isLoggedIn={isLoggedIn} role={role}>
                      <SuperAdminContactUs />
                    </SuperAdminRoute>
                  }
                />
              </>
            )}

            {isLoggedIn && role === "psychologist" && (
              <>
                <Route
                  path="/psychologist-blog-form"
                  element={
                    <PsychologistRoute isLoggedIn={isLoggedIn} role={role}>
                      <BlogForm />
                    </PsychologistRoute>
                  }
                />
                <Route
                  path="/psychologist-dashboard"
                  element={
                    <PsychologistRoute isLoggedIn={isLoggedIn} role={role}>
                      <PsychologistPatientDashboard />
                    </PsychologistRoute>
                  }
                />
                <Route
                  path="/PsychologistBlogPage"
                  element={
                    <PsychologistBlogPage isLoggedIn={isLoggedIn} role={role}>
                      <BlogForm />
                    </PsychologistBlogPage>
                  }
                />
              </>
            )}

            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/bloglist" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route
              path="/numberguessinggame"
              element={<NumberGuessingGame />}
            />
            <Route
              path="/objectguessinggame"
              element={<ObjectGuessingGame />}
            />
            <Route
              path="/handposedetector"
              element={<HandposeDetector />}
             />
            <Route
              path="/emotiondetection"
              element={<EmotionDetection />}
            />
            <Route
              path="/magicmemory"
              element={<MagicMemory />}
            />
            <Route path="/betteraim" element={<BetterAim />} />
            <Route path="/games" element={<GamePage />} />
            <Route
              path="/psychologistslist"
              element={<PsychologistListPage />}
            />
            <Route
              path="/psychologistsdetail/:id"
              element={<PsychologistDetailsPage />}
            />
            
            <Route path="/404" element={<NotFound404 />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
