import React from "react";
import Gallery from "../components/Gallery";
import { audiCars } from "../data/carsData";

const Audi = ({ darkMode }) => {
  return (
    <Gallery
      cars={audiCars}
      title="Audi Collection"
      subtitle="Vorsprung durch Technik - Advancement through technology"
      darkMode={darkMode}
    />
  );
};

export default Audi;
