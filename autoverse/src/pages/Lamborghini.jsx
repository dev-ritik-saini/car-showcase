import React from "react";
import Gallery from "../components/Gallery";
import { lamborghiniCars } from "../data/carsData";

const Lamborghini = ({ darkMode }) => {
  return (
    <Gallery
      cars={lamborghiniCars}
      title="Lamborghini Collection"
      subtitle="Expect the Unexpected - Italian supercar excellence"
      darkMode={darkMode}
    />
  );
};

export default Lamborghini;
