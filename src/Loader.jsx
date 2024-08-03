import React from "react";
import "./styles/Loader.css"; // Ensure you create this CSS file for the spinner styles

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Deploying Contract...</p>
    </div>
  );
};

export default Loader;
