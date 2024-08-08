import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar({ isLoggedIn }) {
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavbarOpacity(scrollY > 0 ? 0.95 : 1);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 shadow-md" style={{ backgroundColor: `rgba(250, 250, 250, ${navbarOpacity})` }}>
      {({ open: isMobileMenuOpen }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex items-center">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Logo"
                />
                <span className="text-gray-800 text-lg font-semibold ml-2">MyApp</span>
              </div>

              {/* Centered Links */}
              <div className="hidden sm:flex sm:space-x-4">
                <Link
                  to="/"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-[#61d4b3] text-white' : 'hover:bg-[#61d4b3] hover:text-white'}`}
                >
                  HomePage
                </Link>
                <Link
                  to="/contact"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/contact' ? 'bg-[#fdd365] text-white' : 'hover:bg-[#fdd365] hover:text-white'}`}
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/about' ? 'bg-[#fb8d62] text-white' : 'hover:bg-[#fb8d62] hover:text-white'}`}
                >
                  About Us
                </Link>
                <Link
                  to="/games"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/games' ? 'bg-[#fd2eb3] text-white' : 'hover:bg-[#fd2eb3] hover:text-white'}`}
                >
                  Games
                </Link>
                <Link
                  to="/blogs"
                  className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/blogs' ? 'bg-[#2ed4fd] text-white' : 'hover:bg-[#2ed4fd] hover:text-white'}`}
                >
                  Blogs
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/dashboard"
                    className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/dashboard' ? 'bg-[#b5d461] text-white' : 'hover:bg-[#b5d461] hover:text-white'}`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              {/* Right side: Auth Buttons */}
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                {isLoggedIn ? (
                  <button
                    className="bg-[#ff347f] text-[#fdfdfd] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#c9356c]"
                    onClick={() => {
                      // Logic to handle logout
                    }}
                  >
                    Logout
                  </button>
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'bg-[#61d4b3] text-white' : 'hover:bg-[#61d4b3] hover:text-white'}`}
                onClick={() => setOpen(false)} // Close mobile menu on click
              >
                HomePage
              </Link>
              <Link
                to="/contact"
                className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/contact' ? 'bg-[#fdd365] text-white' : 'hover:bg-[#fdd365] hover:text-white'}`}
                onClick={() => setOpen(false)} // Close mobile menu on click
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/about' ? 'bg-[#fb8d62] text-white' : 'hover:bg-[#fb8d62] hover:text-white'}`}
                onClick={() => setOpen(false)} // Close mobile menu on click
              >
                About Us
              </Link>
              <Link
                to="/games"
                className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/games' ? 'bg-[#fd2eb3] text-white' : 'hover:bg-[#fd2eb3] hover:text-white'}`}
                onClick={() => setOpen(false)} // Close mobile menu on click
              >
                Games
              </Link>
              <Link
                to="/blogs"
                className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/blogs' ? 'bg-[#2ed4fd] text-white' : 'hover:bg-[#2ed4fd] hover:text-white'}`}
                onClick={() => setOpen(false)} // Close mobile menu on click
              >
                Blogs
              </Link>
              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className={`text-gray-800 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/dashboard' ? 'bg-[#b5d461] text-white' : 'hover:bg-[#b5d461] hover:text-white'}`}
                  onClick={() => setOpen(false)} // Close mobile menu on click
                >
                  Dashboard
                </Link>
              )}
              {isLoggedIn ? (
                <button
                  className="w-full bg-[#ff347f] text-[#fdfdfd] px-3 py-2 rounded-md text-base font-medium hover:bg-[#c9356c]"
                  onClick={() => {
                    // Logic to handle logout
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setOpen(false)} // Close mobile menu on click
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#ff347f] text-[#fdfdfd] hover:bg-[#c9356c] block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setOpen(false)} // Close mobile menu on click
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
