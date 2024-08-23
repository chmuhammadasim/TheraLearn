import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../components/AuthContext/AuthContext";

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
      setNavbarOpacity(scrollY > 0 ? 0.95 : 1);
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

  return (
    <Disclosure
      as="nav"
      className="fixed w-full top-0 z-50 shadow-md"
      style={{ backgroundColor: `rgba(250, 250, 250, ${navbarOpacity})` }}
    >
      {({ open: isMobileMenuOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex items-center">
                <img
                  className="h-12 w-12"
                  src="/LOGO.png"
                  alt="Logo"
                />
                <span className="text-gray-800 text-lg font-semibold ml-2">
                  THERALEARN
                </span>
              </div>

              {/* Centered Links */}
              <div className="hidden sm:flex sm:space-x-4">
                <Link
                  to="/"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/"
                      ? "bg-[#61d4b3] text-white"
                      : "hover:bg-[#61d4b3] hover:text-white"
                  }`}
                >
                  HomePage
                </Link>
                <Link
                  to="/contact"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/contact"
                      ? "bg-[#fdd365] text-white"
                      : "hover:bg-[#fdd365] hover:text-white"
                  }`}
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/about"
                      ? "bg-[#fb8d62] text-white"
                      : "hover:bg-[#fb8d62] hover:text-white"
                  }`}
                >
                  About Us
                </Link>
                <Link
                  to="/games"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/games"
                      ? "bg-[#fd2eb3] text-white"
                      : "hover:bg-[#fd2eb3] hover:text-white"
                  }`}
                >
                  Games
                </Link>
                <Link
                  to="/bloglist"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/blogs"
                      ? "bg-[#2ed4fd] text-white"
                      : "hover:bg-[#2ed4fd] hover:text-white"
                  }`}
                >
                  Blogs
                </Link>
                {isLoggedIn && (
                  <>
                    {isUser && (
                      <>
                        <Link
                          to="/dashboard"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/dashboard"
                              ? "bg-[#b5d461] text-white"
                              : "hover:bg-[#b5d461] hover:text-white"
                          }`}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/psychologistslist"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/psychologistslist"
                              ? "bg-[#d4619a] text-white"
                              : "hover:bg-[#d4619a] hover:text-white"
                          }`}
                        >
                          Psychologists List
                        </Link>
                      </>
                    )}
                    {isPsychologist && (
                      <>
                        <Link
                          to="/psychologist-dashboard"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/psychologist-dashboard"
                              ? "bg-[#ff8c00] text-white"
                              : "hover:bg-[#ff8c00] hover:text-white"
                          }`}
                        >
                          Psychologist Dashboard
                        </Link>
                        <Link
                          to="/psychologist-blog-form"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/psychologist-blog-form"
                              ? "bg-[#ff8c00] text-white"
                              : "hover:bg-[#ff8c00] hover:text-white"
                          }`}
                        >
                          Psychologist Blog Form
                        </Link>
                        {/* <Link
                          to="/psychologist-profile"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/psychologist-profile"
                              ? "bg-[#ff8c00] text-white"
                              : "hover:bg-[#ff8c00] hover:text-white"
                          }`}
                        >
                          Psychologist Profile
                        </Link> */}
                      </>
                    )}
                    {isSuperAdmin && (
                      <>
                        <Link
                          to="/superadmin"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/superadmin"
                              ? "bg-[#ff00ff] text-white"
                              : "hover:bg-[#ff00ff] hover:text-white"
                          }`}
                        >
                          User Dashboard
                        </Link>
                        <Link
                          to="/superadminpanel"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/superadmin-panel"
                              ? "bg-[#ff00ff] text-white"
                              : "hover:bg-[#ff00ff] hover:text-white"
                          }`}
                        >
                          Admin Panel
                        </Link>
                        <Link
                          to="/superadmincontactus"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/superadmin-contact-us"
                              ? "bg-[#ff00ff] text-white"
                              : "hover:bg-[#ff00ff] hover:text-white"
                          }`}
                        >
                          Admin Contact Panel
                        </Link>
                        <Link
                          to="/superadminblogdashboard"
                          className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/superadmin-blog-dashboard"
                              ? "bg-[#ff00ff] text-white"
                              : "hover:bg-[#ff00ff] hover:text-white"
                          }`}
                        >
                          Admin Blog Panel
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Right side: Auth Buttons */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="flex items-center space-x-2">
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <UserCircleIcon className="w-8 h-8 text-gray-700" />
                      )}
                    </Link>
                    <button
                      className="bg-[#ff347f] text-[#fdfdfd] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#61d4b3] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "bg-[#61d4b3] text-white"
                    : "hover:bg-[#61d4b3] hover:text-white"
                }`}
              >
                HomePage
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/contact"
                    ? "bg-[#fdd365] text-white"
                    : "hover:bg-[#fdd365] hover:text-white"
                }`}
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/about"
                    ? "bg-[#fb8d62] text-white"
                    : "hover:bg-[#fb8d62] hover:text-white"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/games"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/games"
                    ? "bg-[#fd2eb3] text-white"
                    : "hover:bg-[#fd2eb3] hover:text-white"
                }`}
              >
                Games
              </Link>
              <Link
                to="/bloglist"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/blogs"
                    ? "bg-[#2ed4fd] text-white"
                    : "hover:bg-[#2ed4fd] hover:text-white"
                }`}
              >
                Blogs
              </Link>
              {isLoggedIn && (
                <>
                  {isUser && (
                    <>
                      <Link
                        to="/dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/dashboard"
                            ? "bg-[#b5d461] text-white"
                            : "hover:bg-[#b5d461] hover:text-white"
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/psychologistslist"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/dashboard"
                            ? "bg-[#b5d461] text-white"
                            : "hover:bg-[#b5d461] hover:text-white"
                        }`}
                      >
                        Psychologists List
                      </Link>
                    </>
                  )}
                  {isPsychologist && (
                    <>
                      <Link
                        to="/psychologist-dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/psychologist-dashboard"
                            ? "bg-[#ff8c00] text-white"
                            : "hover:bg-[#ff8c00] hover:text-white"
                        }`}
                      >
                        Psychologist Dashboard
                      </Link>
                      <Link
                        to="/psychologist-blog-form"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/psychologist-blog-form"
                            ? "bg-[#ff8c00] text-white"
                            : "hover:bg-[#ff8c00] hover:text-white"
                        }`}
                      >
                        Psychologist Blog Form
                      </Link>
                      {/* <Link
                        to="/psychologist-profile"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/psychologist-profile"
                            ? "bg-[#ff8c00] text-white"
                            : "hover:bg-[#ff8c00] hover:text-white"
                        }`}
                      >
                        Psychologist Profile
                      </Link> */}
                    </>
                  )}
                  {isSuperAdmin && (
                    <>
                      <Link
                        to="/superadmin"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/superadmin"
                            ? "bg-[#ff00ff] text-white"
                            : "hover:bg-[#ff00ff] hover:text-white"
                        }`}
                      >
                        User dashboard
                      </Link>
                      <Link
                        to="/superadmin-panel"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/superadmin-panel"
                            ? "bg-[#ff00ff] text-white"
                            : "hover:bg-[#ff00ff] hover:text-white"
                        }`}
                      >
                        Admin Panel
                      </Link>
                      <Link
                        to="/superadmin-contact-us"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/superadmin-contact-us"
                            ? "bg-[#ff00ff] text-white"
                            : "hover:bg-[#ff00ff] hover:text-white"
                        }`}
                      >
                        Admin Contact Panel
                      </Link>
                      <Link
                        to="/superadmin-blog-dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/superadmin-blog-dashboard"
                            ? "bg-[#ff00ff] text-white"
                            : "hover:bg-[#ff00ff] hover:text-white"
                        }`}
                      >
                        Admin Blog Panel
                      </Link>
                    </>
                  )}
                </>
              )}
              {isLoggedIn ? (
                <button
                  className="w-full bg-[#ff347f] text-[#fdfdfd] px-3 py-2 rounded-md text-base font-medium hover:bg-[#c9356c]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] px-3 py-2 rounded-md text-base font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
