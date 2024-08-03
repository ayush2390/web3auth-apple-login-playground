import React, { createContext, useContext, useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const Web3AuthContext = createContext(null);

const clientId =
  "BNwDp8_MlNS-X0gNeTCrIl0STvCVQIxYGwzxQZ6ghpzgExR58YkPfxYs5th_nwmRt_zmxPDkysc2CwiDfSKCV-c";
const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/ethereum.svg",
};

const Web3AuthProvider = ({ children }) => {
  const [web3auth, setWeb3auth] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const initWeb3Auth = async () => {
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const web3authInstance = new Web3AuthNoModal({
        clientId,
        web3AuthNetwork: "sapphire_devnet",
        privateKeyProvider,
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
          uxMode: "redirect",
          loginConfig: {
            jwt: {
              verifier: "login",
              typeOfLogin: "jwt",
              clientId: "M5DQi0bcOy3x0MqhV1QT75ToTSCzTqSz",
            },
          },
        },
      });

      web3authInstance.configureAdapter(openloginAdapter);

      await web3authInstance.init();

      setWeb3auth(web3authInstance);

      if (web3authInstance.status === "connected") {
        setConnected(true);
      }
    };

    initWeb3Auth();
  }, []);

  return (
    <Web3AuthContext.Provider value={{ web3auth, connected, setConnected }}>
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => useContext(Web3AuthContext);

export default Web3AuthProvider;
