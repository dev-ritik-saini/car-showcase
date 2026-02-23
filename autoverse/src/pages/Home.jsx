import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Tag,
  Camera,
  Star,
  ArrowRight,
  CircleDot,
  Zap,
  Truck,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import CarCard from "../components/CarCard";
import ImageModal from "../components/ImageModal";
import { featuredCars } from "../data/carsData";
import "./Home.css";

const Home = ({ darkMode }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const brands = [
    {
      id: "bmw",
      name: "BMW",
      Icon: CircleDot,
      path: "/bmw",
      description: "Ultimate Driving Machine",
    },
    {
      id: "audi",
      name: "Audi",
      Icon: CircleDot,
      path: "/audi",
      description: "Vorsprung durch Technik",
    },
    {
      id: "mercedes",
      name: "Mercedes",
      Icon: Star,
      path: "/mercedes",
      description: "The Best or Nothing",
    },
    {
      id: "lamborghini",
      name: "Lamborghini",
      Icon: Zap,
      path: "/lamborghini",
      description: "Expect the Unexpected",
    },
    {
      id: "ferrari",
      name: "Ferrari",
      Icon: Zap,
      path: "/ferrari",
      description: "We Are the Competition",
    },
    {
      id: "tesla",
      name: "Tesla",
      Icon: Zap,
      path: "/tesla",
      description: "Accelerating the Future",
    },
    {
      id: "suv",
      name: "SUV",
      Icon: Truck,
      path: "/suv",
      description: "Premium Collection",
    },
  ];

  return (
    <div className={`home ${darkMode ? "dark" : ""}`}>
      <HeroSection darkMode={darkMode} />

      {/* Brands Section */}
      <section className="brands-section">
        <div className="section-header">
          <h2>Explore by Brand</h2>
          <p>
            Discover exclusive collections from the world's most prestigious
            automakers
          </p>
        </div>
        <div className="brands-grid">
          {brands.map((brand) => (
            <Link to={brand.path} key={brand.id} className="brand-card">
              <brand.Icon size={32} className="brand-icon" />
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
              <ArrowRight size={18} className="brand-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Vehicles</h2>
          <p>Hand-picked selection of exceptional automobiles</p>
        </div>
        <div className="featured-grid">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onClick={setSelectedCar}
              darkMode={darkMode}
            />
          ))}
        </div>
        <div className="featured-cta">
          <Link to="/ferrari" className="cta-button">
            View All Collections
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-content">
          <div className="stat-card">
            <Car size={32} className="stat-icon" />
            <span className="stat-value">175+</span>
            <span className="stat-title">Premium Vehicles</span>
          </div>
          <div className="stat-card">
            <Tag size={32} className="stat-icon" />
            <span className="stat-value">7</span>
            <span className="stat-title">Exclusive Brands</span>
          </div>
          <div className="stat-card">
            <Camera size={32} className="stat-icon" />
            <span className="stat-value">HD</span>
            <span className="stat-title">Quality Images</span>
          </div>
          <div className="stat-card">
            <Star size={32} className="stat-icon" />
            <span className="stat-value">100%</span>
            <span className="stat-title">Curated Selection</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore?</h2>
          <p>
            Dive into our extensive collection of luxury and performance
            vehicles
          </p>
          <div className="cta-buttons">
            <Link to="/lamborghini" className="cta-btn primary">
              Explore Supercars
            </Link>
            <Link to="/about" className="cta-btn secondary">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {selectedCar && (
        <ImageModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Home;
