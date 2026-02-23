import React, { useEffect, useState } from "react";
import { X, Tag, Zap, Star, ArrowRight } from "lucide-react";
import "./ImageModal.css";

const ImageModal = ({ car, onClose, darkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""} ${darkMode ? "dark" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`modal-content ${isClosing ? "closing" : ""}`}>
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-image-container">
          {!isLoaded && (
            <div className="modal-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            src={car.image.replace("w=800", "w=1200")}
            alt={car.name}
            className={`modal-image ${isLoaded ? "loaded" : ""}`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="modal-info">
          <span className="modal-brand">{car.brand}</span>
          <h2 className="modal-name">{car.name}</h2>
          <p className="modal-specs">{car.specs}</p>

          <div className="modal-details">
            <div className="detail-item">
              <Tag size={18} className="detail-icon" />
              <span>Premium Collection</span>
            </div>
            <div className="detail-item">
              <Zap size={18} className="detail-icon" />
              <span>High Performance</span>
            </div>
            <div className="detail-item">
              <Star size={18} className="detail-icon" />
              <span>Luxury Class</span>
            </div>
          </div>

          <button className="modal-cta">
            <span>Explore More</span>
            <ArrowRight size={18} className="cta-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
