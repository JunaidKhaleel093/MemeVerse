import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Home, Search, Upload, User, Menu, X } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import Button from "../ui/Button";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/trending", label: "Trending", icon: <Flame size={20} /> },
    { path: "/search", label: "Search", icon: <Search size={20} /> },
    { path: "/upload", label: "Upload", icon: <Upload size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Flame size={28} className="text-purple-500 drop-shadow-md" />
          </motion.div>
          <span className="text-2xl font-bold text-purple-500 tracking-wide">
            MemeVerse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all ${
                isActive(item.path)
                  ? "text-white bg-purple-600 shadow-lg"
                  : "text-gray-700 hover:text-black hover:bg-white/20"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.username}
                  className="h-8 w-8 rounded-full object-cover border border-purple-500 shadow-md"
                />
                <span className="font-medium text-white">
                  {currentUser?.username}
                </span>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900/90 backdrop-blur-md border-t border-purple-500"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-3">
            <nav className="flex flex-col space-y-3 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-purple-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-purple-600/50 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Auth Buttons (Mobile) */}
            <div className="flex flex-col space-y-2 py-3 border-t border-gray-700">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.username}
                      className="h-8 w-8 rounded-full object-cover border border-purple-500 shadow-md"
                    />
                    <span className="font-medium text-white">
                      {currentUser?.username}
                    </span>
                  </Link>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
