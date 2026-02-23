import React from "react";
import Gallery from "../components/Gallery";
import { mercedesCars } from "../data/carsData";

const Mercedes = ({ darkMode }) => {
  return (
    <Gallery
      cars={mercedesCars}
      title="Mercedes Collection"
      subtitle="The Best or Nothing - Luxury and performance redefined"
      darkMode={darkMode}
    />
  );
};

export default Mercedes;
