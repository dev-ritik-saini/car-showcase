import React from "react";
import Gallery from "../components/Gallery";
import { teslaCars } from "../data/carsData";

const Tesla = ({ darkMode }) => {
  return (
    <Gallery
      cars={teslaCars}
      title="Tesla Collection"
      subtitle="Accelerating the World's Transition to Sustainable Energy"
      darkMode={darkMode}
    />
  );
};

export default Tesla;
