import React from "react";
import { Link } from "react-router-dom";
import { Car, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import "./Footer.css";

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/", label: "Home" },
    { path: "/bmw", label: "BMW Collection" },
    { path: "/ferrari", label: "Ferrari Collection" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { Icon: Facebook, label: "Facebook", url: "#" },
    { Icon: Instagram, label: "Instagram", url: "#" },
    { Icon: Twitter, label: "Twitter", url: "#" },
    { Icon: Youtube, label: "YouTube", url: "#" },
  ];

  return (
    <footer className={`footer ${darkMode ? "dark" : ""}`}>
      <div className="footer-container">
        <div className="footer-section brand">
          <div className="footer-logo">
            <Car className="logo-icon" size={28} />
            <span className="logo-text">AutoVerse</span>
          </div>
          <p className="footer-description">
            Your ultimate destination for exploring the world's most prestigious
            and exotic automobiles. Experience automotive excellence like never
            before.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section collections">
          <h3>Collections</h3>
          <ul>
            <li>
              <Link to="/lamborghini">Lamborghini</Link>
            </li>
            <li>
              <Link to="/mercedes">Mercedes</Link>
            </li>
            <li>
              <Link to="/audi">Audi</Link>
            </li>
            <li>
              <Link to="/tesla">Tesla</Link>
            </li>
            <li>
              <Link to="/suv">Premium SUVs</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                className="social-link"
                aria-label={social.label}
              >
                <social.Icon size={20} />
              </a>
            ))}
          </div>
          <div className="newsletter">
            <h4>Subscribe to Newsletter</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} AutoVerse. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
