import React from "react";
import ReactDOM from "react-dom/client";
// import "./webpack.config.js";
// import "./global-polyfill.js";
import App from "./App.jsx";
import "./index.css";
import Web3AuthProvider from "./Web3AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3AuthProvider>
      <App />
    </Web3AuthProvider>
  </React.StrictMode>
);
