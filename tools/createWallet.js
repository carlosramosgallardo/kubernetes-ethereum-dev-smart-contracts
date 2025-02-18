const { ethers } = require("ethers");

function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Dirección:", wallet.address);
  console.log("Clave privada:", wallet.privateKey);
}

createWallet();