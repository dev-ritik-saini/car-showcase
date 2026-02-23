import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Heart,
  Lightbulb,
  Sparkles,
  User,
  Palette,
  Wrench,
  Code,
} from "lucide-react";
import "./About.css";

const About = ({ darkMode }) => {
  const team = [
    { name: "Alex Morgan", role: "Founder & CEO", Icon: User },
    { name: "Sarah Chen", role: "Creative Director", Icon: Palette },
    { name: "James Wilson", role: "Chief Curator", Icon: Wrench },
    { name: "Emily Davis", role: "Content Lead", Icon: Code },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We curate only the finest automotive specimens",
      Icon: Trophy,
    },
    {
      title: "Passion",
      description: "Driven by our love for exceptional automobiles",
      Icon: Heart,
    },
    {
      title: "Innovation",
      description: "Embracing the future of automotive technology",
      Icon: Lightbulb,
    },
    {
      title: "Quality",
      description: "Uncompromising standards in every selection",
      Icon: Sparkles,
    },
  ];

  return (
    <div className={`about-page ${darkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-badge">About Us</span>
          <h1>Welcome to AutoVerse</h1>
          <p>
            Your ultimate destination for exploring the world's most prestigious
            and exotic automobiles
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="story-content">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, AutoVerse was born from a simple yet powerful
              vision: to create the most comprehensive and visually stunning
              showcase of premium automobiles online.
            </p>
            <p>
              What started as a passion project has evolved into a destination
              for automotive enthusiasts worldwide. We believe that every car
              has a story to tell, and our mission is to share those stories
              through breathtaking imagery and detailed specifications.
            </p>
            <p>
              From legendary Italian supercars to cutting-edge electric
              vehicles, our curated collections represent the pinnacle of
              automotive engineering and design.
            </p>
          </div>
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
              alt="Luxury Car"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <value.Icon size={32} className="value-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To inspire and educate automotive enthusiasts by showcasing the
            world's most exceptional vehicles. We strive to be the premier
            online destination for discovering luxury, performance, and
            innovation in the automotive world.
          </p>
          <div className="mission-stats">
            <div className="mission-stat">
              <span className="stat-number">175+</span>
              <span className="stat-label">Premium Vehicles</span>
            </div>
            <div className="mission-stat">
              <span className="stat-number">7</span>
              <span className="stat-label">Exclusive Brands</span>
            </div>
            <div className="mission-stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Happy Visitors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet Our Team</h2>
        <p className="team-subtitle">The passionate people behind AutoVerse</p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <member.Icon size={36} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Explore?</h2>
        <p>
          Discover our curated collections of the world's finest automobiles
        </p>
        <div className="cta-buttons">
          <Link to="/ferrari" className="cta-btn primary">
            Explore Collections
          </Link>
          <Link to="/contact" className="cta-btn secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
