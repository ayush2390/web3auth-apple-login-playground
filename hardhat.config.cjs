require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet: {
      url: import.meta.env.VITE_APP_INFURA_URL,
      accounts: [import.meta.env.VITE_APP_PRIVATE_KEY],
    },
  },
};
