require("@nomiclabs/hardhat-ethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.17",
  networks: {
    development: {
      url: process.env.NODE_RPC_URL || "http://besu.local",
      // Agrega la cuenta para firmar transacciones:
      //accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
      accounts: ["0xf7e69b678bd7c3ea85d4e8bfc8f3e517bd83ed370ef984c4f7e32257d68c278c"]
    }
  }
};