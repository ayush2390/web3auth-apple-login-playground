import React from "react";
import "./styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate("");
  const deployContract = () => {
    navigate("/deploycontract");
  };
  const readContract = () => {
    navigate("/readcontract");
  };
  const dashboard = () => {
    navigate("/user");
  };
  const sourceCode = () => {
    window.location.href = "https://github.com/your-repo-url"; // Replace with your GitHub repo URL
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={dashboard}>Main Page</li>
        <li onClick={deployContract}>Deploy Contract</li>
        <li onClick={readContract}>Read Contract</li>
        <li>Server Side Verification</li>
        <li>WalletConnect Scanner</li>
        <li>Wallet UI</li>
        <li>Fiat On Ramp</li>
        <li>Explorer Link</li>
        <li onClick={sourceCode}>Source Code</li>
      </ul>
    </div>
  );
};

export default Sidebar;
