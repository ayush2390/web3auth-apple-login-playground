import React, { useEffect } from "react";
import { useWeb3Auth } from "./Web3AuthProvider";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const { web3auth, connected, setConnected } = useWeb3Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate("/user");
    }
  }, [connected, navigate]);

  const handleLogin = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized yet");
      return;
    }

    try {
      await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          domain: "https://dev-3p18fvnwadfbjijg.us.auth0.com",
          verifierIdField: "sub",
          connection: "apple",
        },
      });

      setConnected(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login">
      <button onClick={handleLogin} className="loginButton">
        Login with Apple
      </button>
    </div>
  );
};

export default Login;
