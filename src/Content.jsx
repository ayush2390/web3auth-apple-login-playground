import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <div className="app">
      <div className="main-layout">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
