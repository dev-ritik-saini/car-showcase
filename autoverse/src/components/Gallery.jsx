import React, { useState, useMemo, useCallback, memo } from "react";
import { Search, X, SearchX } from "lucide-react";
import CarCard from "./CarCard";
import ImageModal from "./ImageModal";
import "./Gallery.css";

const Gallery = memo(({ cars, title, subtitle, darkMode }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSortedCars = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    let result = cars.filter(
      (car) =>
        car.name.toLowerCase().includes(searchLower) ||
        car.brand.toLowerCase().includes(searchLower) ||
        car.specs.toLowerCase().includes(searchLower),
    );

    if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "brand") {
      result = [...result].sort((a, b) => a.brand.localeCompare(b.brand));
    }

    return result;
  }, [cars, searchTerm, sortBy]);

  const handleCardClick = useCallback((car) => {
    setSelectedCar(car);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCar(null);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className={`gallery-container ${darkMode ? "dark" : ""}`}>
      <div className="gallery-header">
        <div className="gallery-title-section">
          <h1 className="gallery-title">{title}</h1>
          {subtitle && <p className="gallery-subtitle">{subtitle}</p>}
          <p className="gallery-count">
            {filteredAndSortedCars.length} vehicles
          </p>
        </div>

        <div className="gallery-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              enterKeyHint="search"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            aria-label="Sort cars"
          >
            <option value="default">Default Order</option>
            <option value="name">Sort by Name</option>
            <option value="brand">Sort by Brand</option>
          </select>
        </div>
      </div>

      {filteredAndSortedCars.length === 0 ? (
        <div className="no-results">
          <SearchX size={48} className="no-results-icon" />
          <h3>No cars found</h3>
          <p>Try adjusting your search term</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredAndSortedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onClick={handleCardClick}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}

      {selectedCar && (
        <ImageModal
          car={selectedCar}
          onClose={handleCloseModal}
          darkMode={darkMode}
        />
      )}
    </div>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
