import React from "react";
import Gallery from "../components/Gallery";
import { suvCars } from "../data/carsData";

const SUV = ({ darkMode }) => {
  return (
    <Gallery
      cars={suvCars}
      title="Premium SUV Collection"
      subtitle="Luxury meets versatility - The finest sport utility vehicles"
      darkMode={darkMode}
    />
  );
};

export default SUV;
