import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isLoggedIn, role, logout } = useContext(AuthContext);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavbarOpacity(scrollY > 0 ? 0.9 : 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setUser(null);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isUser = role === "user";
  const isSuperAdmin = role === "admin";
  const isPsychologist = role === "psychologist";

  const navLinks = [
    { to: "/", label: "HomePage", color: "#ffb703" },
    { to: "/games", label: "Games", color: "#023047" },
    { to: "/bloglist", label: "Blogs", color: "#bc6c25" },
    { to: "/about", label: "AboutUs", color: "#ff006e" },
    { to: "/contact", label: "ContactUs", color: "#00b4d8" },
  ];

  const roleLinks = {
    user: [
      { to: "/dashboard", label: "Dashboard", color: "#6a4c93" }, // Deep Purple
      {
        to: "/psychologistslist",
        label: "Psychologists List",
        color: "#f4a261",
      }, // Warm Orange
    ],
    psychologist: [
      {
        to: "/psychologist-dashboard",
        label: "Paitent Info",
        color: "#2a9d8f",
      }, // Teal
      { to: "/PsychologistBlogPage", label: "Blog Panel", color: "#e76f51" }, // Muted Red-Orange
    ],
    admin: [
      { to: "/superadmin", label: "UserDashboard", color: "#ff0054" }, // Hot Pink
      { to: "/superadminpanel", label: "ContentPanel", color: "#3a86ff" }, // Bright Blue
      {
        to: "/superadmincontactus",
        label: "Feedbacks",
        color: "#8338ec",
      }, // Vivid Violet
      {
        to: "/superadminblogdashboard",
        label: "Blog Panel",
        color: "#fb5607",
      }, // Vibrant Orange
    ],
  };

  return (
    <Disclosure
      as="nav"
      className="fixed w-full top-0 z-50 shadow-lg"
      style={{ backgroundColor: `rgba(250, 250, 250, ${navbarOpacity})` }}
    >
      {({ open: isMobileMenuOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex items-center space-x-4">
                <motion.img
                  className="h-12 w-12 rounded-full shadow-lg"
                  src="/LOGO.png"
                  alt="Logo"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="text-gray-800 text-lg font-extrabold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  TheraLearn
                </motion.span>
              </div>

              {/* Centered Links */}
              <div className="hidden sm:flex sm:space-x-6">
                {navLinks.map(({ to, label, color }) => (
                  <motion.div
                    key={to}
                    className="relative"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={to}
                      className={`px-2 py-2 ml-2 rounded-md text-md font-medium transition duration-300 ease-in-out ${
                        location.pathname === to ? "text-white" : `text-gray-900` 
                      }`}
                      style={{
                        backgroundColor: location.pathname === to ? color : "transparent",
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                {isLoggedIn && (
                  <>
                    {(isUser || isPsychologist || isSuperAdmin) &&
                      roleLinks[role].map(({ to, label, color }) => (
                        <motion.div
                          key={to}
                          className="relative"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={to}
                            className={`px-2 py-2 ml-2 rounded-md text-md font-medium transition duration-300 ease-in-out ${
                              location.pathname === to ? "text-white" : "text-gray-900"
                            }`}
                            style={{
                              backgroundColor: location.pathname === to ? color : "transparent",
                            }}
                          >
                            {label}
                          </Link>
                        </motion.div>
                      ))}
                  </>
                )}
              </div>

              {/* Right side: Auth Buttons */}
              <div className="hidden sm:flex sm:items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="flex items-center space-x-2">
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full shadow-lg"
                        />
                      ) : (
                        <UserCircleIcon className="w-8 h-8 text-gray-700" />
                      )}
                    </Link>
                    <button
                      className="bg-[#ff347f] text-[#fdfdfd] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c] transition duration-300 ease-in-out"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#61d4b3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
                  onClick={() => setOpen(!open)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navLinks.map(({ to, label, color }) => (
                <motion.div
                  key={to}
                  className="relative"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={to}
                    className={`block px-4 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out ${
                      location.pathname === to ? "text-white" : "text-gray-900"
                    }`}
                    style={{
                      backgroundColor: location.pathname === to ? color : "transparent",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              {isLoggedIn && (
                <>
                  {(isUser || isPsychologist || isSuperAdmin) &&
                    roleLinks[role].map(({ to, label, color }) => (
                      <motion.div
                        key={to}
                        className="relative"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to={to}
                          className={`block px-4 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out ${
                            location.pathname === to ? "text-white" : "text-gray-900 "
                          }`}
                          style={{
                            backgroundColor: location.pathname === to ? color : "transparent",
                          }}
                          onClick={() => setOpen(false)}
                        >
                          {label}
                        </Link>
                      </motion.div>
                    ))}
                </>
              )}
              <div className="mt-4">
                {isLoggedIn ? (
                  <button
                    className="w-full bg-[#ff347f] text-[#fdfdfd] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c] transition duration-300 ease-in-out"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full bg-[#ff347f] text-[#fdfdfd] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c] transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full mt-2 bg-[#ff347f] text-[#fdfdfd] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c] transition duration-300 ease-in-out"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
