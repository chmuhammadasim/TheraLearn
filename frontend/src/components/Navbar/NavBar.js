import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../components/AuthContext/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isLoggedIn, role, logout } = useContext(AuthContext);
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setNavbarOpacity(window.scrollY > 0 ? 0.85 : 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "HomePage", color: "#ffb703" },
    { to: "/games", label: "Games", color: "#023047" },
    { to: "/bloglist", label: "Blogs", color: "#bc6c25" },
    { to: "/about", label: "AboutUs", color: "#ff006e" },
    { to: "/contact", label: "ContactUs", color: "#00b4d8" },
  ];

  const roleLinks = {
    parent: [
      { to: "/dashboard", label: "Dashboard", color: "#6a4c93" },
      { to: "/psychologistslist", label: "Psychologists List", color: "#f4a261" },
    ],
    psychologist: [
      { to: "/psychologist-dashboard", label: "Paitent Info", color: "#2a9d8f" },
      { to: "/PsychologistBlogPage", label: "Blog Panel", color: "#e76f51" },
    ],
    admin: [
      { to: "/", label: "HomePage", color: "#ffb703" },
      { to: "/games", label: "Games", color: "#023047" },
      { to: "/superadmin", label: "UserDashboard", color: "#ff0054" },
      { to: "/superadminpanel", label: "ContentPanel", color: "#3a86ff" },
      { to: "/superadmincontactus", label: "Feedbacks", color: "#8338ec" },
      { to: "/superadminblogdashboard", label: "Blog Panel", color: "#fb5607" },
    ],
  };

  const getRoleLinks = () => (isLoggedIn && roleLinks[role]) || [];

  const renderLinks = (links, isMobile = false) =>
    links.map(({ to, label, color }) => (
      <motion.div
        key={to}
        className="relative"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to={to}
          aria-label={label}
          className={`
            group
            ${isMobile
              ? "block px-4 py-2 rounded-xl text-base font-semibold"
              : "px-3 py-2 mx-1 rounded-xl text-md font-semibold"
            }
            transition duration-200 ease-in-out
            ${location.pathname === to ? "text-white" : "text-gray-900"}
            relative
            overflow-hidden
          `}
          style={{
            background: location.pathname === to
              ? `linear-gradient(90deg, ${color} 100%, #fff0 100%)`
              : "transparent",
            boxShadow: location.pathname === to
              ? "0 2px 12px 0 rgba(0,0,0,0.07)"
              : "none",
          }}
          onClick={isMobile ? () => setOpen(false) : undefined}
        >
          <span className="relative z-10">{label}</span>
          <span
            className={`
              absolute left-0 bottom-0 w-full h-0.5
              bg-gradient-to-r from-pink-400 to-blue-400
              scale-x-0 group-hover:scale-x-100
              transition-transform duration-300 origin-left
              ${location.pathname === to ? "scale-x-100" : ""}
            `}
          />
        </Link>
      </motion.div>
    ));

  return (
    <Disclosure
      as="nav"
      className="fixed w-full top-0 z-50"
      style={{
        background: `linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)`,
        backdropFilter: "blur(12px)",
        backgroundColor: `rgba(250, 250, 250, ${navbarOpacity})`,
        borderBottom: "1.5px solid #e0e7ef",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
      }}
    >
      {({ open: isMobileMenuOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
            <div className="relative flex h-20 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex items-center space-x-4">
                <motion.img
                  className="h-14 w-14 rounded-full shadow-xl border-2 border-white"
                  src="/LOGO.png"
                  alt="Logo"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                />
                <motion.span
                  className="text-gray-800 text-2xl font-extrabold tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  TheraLearn
                </motion.span>
              </div>

              {/* Desktop Links */}
              <div className="hidden sm:flex sm:space-x-2">
                {role !== "admin" && renderLinks(navLinks)}
                {renderLinks(getRoleLinks())}
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden sm:flex sm:items-center space-x-3">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" aria-label="Profile" className="flex items-center space-x-2">
                      <UserCircleIcon className="w-9 h-9 text-gray-700 hover:text-[#ff347f] transition" />
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.07 }}
                      className="bg-gradient-to-r from-[#ff347f] to-[#ffb703] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#c9356c] hover:to-[#ffb703] transition"
                      onClick={handleLogout}
                      aria-label="Logout"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      aria-label="Login"
                      className="bg-gradient-to-r from-[#ff347f] to-[#ffb703] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#c9356c] hover:to-[#ffb703] transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      aria-label="Signup"
                      className="bg-gradient-to-r from-[#ffb703] to-[#ff347f] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#ffb703] hover:to-[#c9356c] transition"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#61d4b3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
                  aria-label="Open main menu"
                  onClick={() => setOpen(!open)}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <Disclosure.Panel static>
                <motion.div
                  className="sm:hidden px-4 pt-4 pb-6 bg-white/80 backdrop-blur-xl rounded-b-2xl shadow-xl border-t border-gray-200"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    {role !== "admin" && renderLinks(navLinks, true)}
                    {renderLinks(getRoleLinks(), true)}
                  </div>
                  <div className="mt-6">
                    {isLoggedIn ? (
                      <button
                        className="w-full bg-gradient-to-r from-[#ff347f] to-[#ffb703] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#c9356c] hover:to-[#ffb703] transition"
                        onClick={handleLogout}
                        aria-label="Logout"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          aria-label="Login"
                          className="block w-full bg-gradient-to-r from-[#ff347f] to-[#ffb703] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#c9356c] hover:to-[#ffb703] transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          aria-label="Signup"
                          className="block w-full mt-2 bg-gradient-to-r from-[#ffb703] to-[#ff347f] text-white px-5 py-2 rounded-xl text-base font-semibold shadow-md hover:from-[#ffb703] hover:to-[#c9356c] transition"
                        >
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
