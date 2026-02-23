import React, { useState, useRef, useEffect } from "react";
import "./CarCard.css";

const CarCard = ({ car, onClick, darkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`car-card ${isVisible ? "visible" : ""} ${darkMode ? "dark" : ""}`}
      onClick={() => onClick(car)}
    >
      <div className="car-card-image-container">
        {!isLoaded && (
          <div className="skeleton-loader">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        {isVisible && (
          <img
            src={car.image}
            alt={car.name}
            className={`car-card-image ${isLoaded ? "loaded" : ""}`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
          />
        )}
        <div className="car-card-overlay">
          <span className="view-details">View Details</span>
        </div>
      </div>
      <div className="car-card-content">
        <span className="car-brand">{car.brand}</span>
        <h3 className="car-name">{car.name}</h3>
        <p className="car-specs">{car.specs}</p>
      </div>
    </div>
  );
};

export default CarCard;
