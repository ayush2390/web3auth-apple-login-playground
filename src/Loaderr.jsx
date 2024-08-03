import React from "react";
import "./styles/Loaderr.css"; // Ensure you create this CSS file for the spinner styles

const Loaderr = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
};

export default Loaderr;
