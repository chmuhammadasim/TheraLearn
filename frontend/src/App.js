import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/landingPages/LandingPage";
import NotFound404 from "./pages/NotFound404/NotFound";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Loading from "./components/Loading";

// Lazy load components to improve performance
const ContactUsPage = lazy(() => import("./pages/ContactUs/ContactUs"));
const AboutUsPage = lazy(() => import("./pages/AboutUs/AboutUs"));
const LoginPage = lazy(() => import("./pages/AuthPages/LoginPage"));
const SignupPage = lazy(() => import("./pages/AuthPages/SignupPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const BlogList = lazy(() => import("./pages/BlogPages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogPages/BlogDetail"));
const BlogForm = lazy(() => import("./pages/psychologist/BlogForm"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const SuperAdminPanel = lazy(() => import("./pages/superAdmin/SuperAdminPanel"));
const AdminBlogDashboard = lazy(() => import("./pages/superAdmin/AdminBlogPanel"));
const SuperAdminContactUs = lazy(() => import("./pages/superAdmin/SuperAdminContactUs"));
const SuperAdminContentPanel = lazy(() => import("./pages/superAdmin/adminContentPanel"));
const GamePage = lazy(() => import("./pages/Game/Game"));
const NumberGuessingGame = lazy(() => import("./pages/Game/Games/Countinggamespeechrecognition/NumberGuessingGame"));
const HandposeDetector = lazy(() => import("./pages/Game/Games/HandposeDetector/HandposeDetector"));
const EmotionDetection = lazy(() => import("./pages/Game/Games/EmotionDetection/EmotionDetection"));
const CountTheFish = lazy(() => import("./pages/Game/Games/CountTheFish/CountTheFish"));
const MagicMemory = lazy(() => import("./pages/Game/Games/MagicMemory/MagicMemory"));
const PsychologistListPage = lazy(() => import("./pages/PsychologistList/PsychologistList"));
const PsychologistDetailsPage = lazy(() => import("./pages/PsychologistList/PsychologistDetailsPage"));
const PsychologistBlogPage = lazy(() => import("./pages/psychologist/PsychologistBlogPage"));
const PsychologistPatientDashboard = lazy(() => import("./pages/psychologist/PsychologistPatientDashboard"));
const BetterAim = lazy(() => import("./pages/Game/Games/BettterAim/BetterAim"));
const ObjectGuessingGame = lazy(() => import("./pages/Game/Games/Naminggamespeechrecognition/ObjectGuessingGame"));
const ProtectedRoute = lazy(() => import("./components/Routes/ProtectedRoute"));
const AuthRoute = lazy(() => import("./components/Routes/AuthRoute"));
const SuperAdminRoute = lazy(() => import("./components/Routes/SuperAdminRoute"));
const PsychologistRoute = lazy(() => import("./components/Routes/PsychologistRoute"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("authRole");
        
        if (token) {
          setIsLoggedIn(true);
          setRole(userRole);
        } else {
          setIsLoggedIn(false);
          setRole(null);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error checking login status:", err);
        setError("Failed to verify authentication status");
        setIsLoggedIn(false);
        setRole(null);
        setIsLoading(false);
      }
    };

    checkLoginStatus();

    // Listen for storage events to handle login/logout in other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'authToken' || e.key === 'authRole') {
        checkLoginStatus();
      }
    });

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  if (isLoading) {
    return <Loading message="Loading application..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div>
            <ErrorBoundary>
              <Navbar isLoggedIn={isLoggedIn} role={role} />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Suspense fallback={<Loading message="Loading content..." />}>
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
                          <ErrorBoundary>
                            <PsychologistBlogPage isLoggedIn={isLoggedIn} role={role} />
                          </ErrorBoundary>
                        }
                      />
                    </>
                  )}

                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/bloglist" element={<BlogList />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/numberguessinggame" element={<NumberGuessingGame />} />
                  <Route path="/objectguessinggame" element={<ObjectGuessingGame />} />
                  <Route path="/handposedetector" element={<HandposeDetector />} />
                  <Route path="/emotiondetection" element={<EmotionDetection />} />
                  <Route path="/magicmemory" element={<MagicMemory />} />
                  <Route path="/countthefish" element={<CountTheFish />} />
                  <Route path="/betteraim" element={<BetterAim />} />
                  <Route path="/games" element={<GamePage />} />
                  <Route path="/psychologistslist" element={<PsychologistListPage />} />
                  <Route path="/psychologistsdetail/:id" element={<PsychologistDetailsPage />} />
                  
                  <Route path="/404" element={<NotFound404 />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
