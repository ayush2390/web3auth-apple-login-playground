import React, { useEffect, useState } from "react";
import { useWeb3Auth } from "./Web3AuthProvider";
import Web3 from "web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "./styles/Dashboard.css";

const Dashboard = () => {
  const { web3auth, connected, setConnected } = useWeb3Auth();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const handleLogin = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      return;
    }

    try {
      setConnected(true);
      setUser(await web3auth.getUserInfo());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const userInf = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      return;
    }
    try {
      const web3 = new Web3(web3auth.provider);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const userAddress = accounts[0];
        console.log("User Address:", userAddress);
        setAddress(userAddress);

        const balanceInWei = await web3.eth.getBalance(userAddress);
        console.log("Balance in Wei (raw):", balanceInWei);

        if (balanceInWei !== undefined && balanceInWei !== null) {
          const newBalance = web3.utils.fromWei(
            balanceInWei.toString(),
            "ether"
          );
          setBalance(parseFloat(newBalance).toFixed(4));
          console.log("Balance in ETH:", newBalance);
        } else {
          console.error("Invalid balance retrieved");
        }
      } else {
        console.error("No accounts found");
      }
    } catch (error) {
      console.error("Failed to retrieve user info:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleLogin();
      await userInf();
    };
    fetchData();
  }, [web3auth, connected]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Address:", address);
    console.log("Balance:", balance);
  }, [user, address, balance]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopySuccess("Address copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy address:", err);
      });
  };

  return (
    <div className="main-content">
      <h2>Welcome to Web3Auth Playground</h2>
      <div className="account-details">
        <h3>Your Account Details</h3>
        {connected && user && address && (
          <div className="user-info">
            <img
              src={user.profileImage}
              alt="Profile"
              className="profile-image"
            />
            <h2>{user.name}</h2>
            <p>
              Address:
              <span className="copy-address" onClick={copyToClipboard}>
                {address}
                <FontAwesomeIcon icon={faCopy} className="copy-icon" />
              </span>
              <span className="copy-success">{copySuccess}</span>
            </p>
            <p>Wallet Balance: {balance} ETH</p>
            <p>Chain ID: 0x1</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
