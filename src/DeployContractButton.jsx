import React, { useState } from "react";
import { ethers } from "ethers";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./styles/DeployContractButton.css";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import json from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json";

const DeployContractButton = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { abi, bytecode } = json;
  const deployContract = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this feature");
        return;
      }

      setLoading(true);

      const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;
      const provider = new ethers.providers.InfuraProvider(
        "sepolia",
        import.meta.env.VITE_APP_INFURA_ID
      );
      const wallet = new ethers.Wallet(privateKey, provider);

      const HelloWorld = new ethers.ContractFactory(abi, bytecode, wallet);
      const hello = await HelloWorld.deploy("Hello, Hardhat!");

      await hello.deployTransaction.wait();
      setLoading(false);
      const address = hello.address;

      setContractAddress(address);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      setLoading(false);
      console.error("Error deploying contract:", error);
      alert("Error deploying contract");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <button
          onClick={deployContract}
          disabled={loading}
          className="deployContractBtn"
        >
          Deploy Contract
        </button>
        {loading && <Loader />}
        {contractAddress && (
          <div>
            <p className="contractAddress">
              Contract deployed to: {contractAddress}
            </p>
            <CopyToClipboard text={contractAddress}>
              <button className="copyBtn">Copy Address</button>
            </CopyToClipboard>
          </div>
        )}
        {showSuccessMessage && (
          <div className="success-message">Contract deployed successfully!</div>
        )}
      </div>
    </div>
  );
};

export default DeployContractButton;
