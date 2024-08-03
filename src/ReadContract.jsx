import React, { useState } from "react";
import { ethers } from "ethers";
import Sidebar from "./Sidebar";
import "./styles/ReadContract.css";
import Loaderr from "./Loaderr";
import json from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";

const ReadContract = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [greeting, setGreeting] = useState("");
  const [inputGreeting, setInputGreeting] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { abi } = json;

  const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    import.meta.env.VITE_APP_INFURA_ID
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const getGreeting = async () => {
    if (!contractAddress) {
      setError("Please enter a contract address.");
      return;
    }

    try {
      setError(""); // Clear previous error
      setLoading(true);

      const contract = new ethers.Contract(contractAddress, abi, wallet);
      const currentGreeting = await contract.greet();
      setGreeting(currentGreeting);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error reading greeting:", error);
      alert("Error reading greeting");
    }
  };

  const updateGreeting = async () => {
    if (!contractAddress) {
      setError("Please enter a contract address.");
      return;
    }

    try {
      setError(""); // Clear previous error
      setLoading(true);
      const contract = new ethers.Contract(contractAddress, abi, wallet);
      const transaction = await contract.setGreeting(inputGreeting);
      await transaction.wait();
      setLoading(false);
      alert("Greeting updated successfully");
      getGreeting(); // Refresh the greeting after update
    } catch (error) {
      setLoading(false);
      console.error("Error updating greeting:", error);
      alert("Error updating greeting");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address"
          className="inputBar"
        />
        <button onClick={getGreeting} className="btn">
          {loading ? "Reading..." : "Read Greeting"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {greeting && <p className="greeting">Current Greeting: {greeting}</p>}
        <input
          type="text"
          value={inputGreeting}
          onChange={(e) => setInputGreeting(e.target.value)}
          placeholder="Enter new greeting"
          className="inputBar inputBarSecond"
        />
        <button onClick={updateGreeting} className="btn">
          {loading ? "Updating..." : "Update Greeting"}
        </button>
        {loading && <Loaderr />}
      </div>
    </div>
  );
};

export default ReadContract;
