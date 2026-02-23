import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Sun, Moon, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/bmw", label: "BMW" },
    { path: "/audi", label: "Audi" },
    { path: "/mercedes", label: "Mercedes" },
    { path: "/lamborghini", label: "Lamborghini" },
    { path: "/ferrari", label: "Ferrari" },
    { path: "/tesla", label: "Tesla" },
    { path: "/suv", label: "SUV" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${darkMode ? "dark" : ""}`}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <Car className="logo-icon" size={28} />
          <span className="logo-text">AutoVerse</span>
        </Link>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
