import React from "react";
import Gallery from "../components/Gallery";
import { ferrariCars } from "../data/carsData";

const Ferrari = ({ darkMode }) => {
  return (
    <Gallery
      cars={ferrariCars}
      title="Ferrari Collection"
      subtitle="We Are the Competition - Prancing horse legends"
      darkMode={darkMode}
    />
  );
};

export default Ferrari;
