import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import "./HeroSection.css";

const HeroSection = ({ darkMode }) => {
  return (
    <section className={`hero ${darkMode ? "dark" : ""}`}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
          alt="Luxury Car"
          className="hero-image"
        />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          Premium Car Showcase
        </div>

        <h1 className="hero-title">
          <span className="title-line">Welcome to</span>
          <span className="title-highlight">AutoVerse</span>
        </h1>

        <p className="hero-description">
          Discover the world's most exclusive and prestigious automobiles. From
          legendary supercars to cutting-edge electric vehicles, explore our
          curated collection of automotive excellence.
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">175+</span>
            <span className="stat-label">Premium Vehicles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">7</span>
            <span className="stat-label">Exclusive Brands</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">High Quality Images</span>
          </div>
        </div>

        <div className="hero-buttons">
          <Link to="/ferrari" className="hero-btn primary">
            <span>Explore Collection</span>
            <ArrowRight size={18} className="btn-arrow" />
          </Link>
          <Link to="/about" className="hero-btn secondary">
            Learn More
          </Link>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <ChevronDown size={24} className="scroll-arrow" />
      </div>
    </section>
  );
};

export default HeroSection;
