import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import "./CarCard.css";

const CarCard = memo(
  ({ car, onClick, darkMode }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px", // Increased for earlier loading
        },
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleImageLoad = useCallback(() => {
      setIsLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
      setHasError(true);
      setIsLoaded(true);
    }, []);

    const handleClick = useCallback(() => {
      onClick(car);
    }, [onClick, car]);

    // Generate optimized image URL for mobile
    const getOptimizedImageUrl = useCallback((url) => {
      if (url.includes("unsplash.com")) {
        // For Unsplash images, request smaller size on mobile
        return url.replace("w=800", "w=400").replace("q=80", "q=70");
      }
      return url;
    }, []);

    return (
      <div
        ref={cardRef}
        className={`car-card ${isVisible ? "visible" : ""} ${darkMode ? "dark" : ""}`}
        onClick={handleClick}
      >
        <div className="car-card-image-container">
          {!isLoaded && (
            <div className="skeleton-loader">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          {isVisible && !hasError && (
            <img
              src={getOptimizedImageUrl(car.image)}
              alt={car.name}
              className={`car-card-image ${isLoaded ? "loaded" : ""}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          )}
          {hasError && (
            <div className="image-error">
              <span>Image unavailable</span>
            </div>
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
  },
  (prevProps, nextProps) => {
    // Custom comparison for memo - only re-render if these change
    return (
      prevProps.car.id === nextProps.car.id &&
      prevProps.darkMode === nextProps.darkMode
    );
  },
);

CarCard.displayName = "CarCard";

export default CarCard;
