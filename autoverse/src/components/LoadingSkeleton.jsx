import React from "react";
import "./LoadingSkeleton.css";

const LoadingSkeleton = ({ count = 6, darkMode }) => {
  return (
    <div className={`skeleton-grid ${darkMode ? "dark" : ""}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image">
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-brand">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-title">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-specs">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
