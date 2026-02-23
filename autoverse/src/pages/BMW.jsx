import React from "react";
import Gallery from "../components/Gallery";
import { bmwCars } from "../data/carsData";

const BMW = ({ darkMode }) => {
  return (
    <Gallery
      cars={bmwCars}
      title="BMW Collection"
      subtitle="The Ultimate Driving Machine - Experience German engineering excellence"
      darkMode={darkMode}
    />
  );
};

export default BMW;
