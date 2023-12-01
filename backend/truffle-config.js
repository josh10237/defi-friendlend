require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
  //   development: {
  //     host: "127.0.0.1",
  //     port: 8545,
  //     network_id: "*",
  //   },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY, 0, 10),
      network_id: "11155111",
      gas: 29999972,
    },
  },
  compilers: {
    solc: {
      version: "0.5.15",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};