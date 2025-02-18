const { ethers } = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const newSecretWord = "blockchain";

  // Definir ABI mínima manualmente
  const abi = [
    "function setSecretWord(string memory _secretWord) public"
  ];

  const [deployer] = await ethers.getSigners();
  const myContract = await ethers.getContractAt(abi, contractAddress, deployer);

  const tx = await myContract.setSecretWord(newSecretWord);
  await tx.wait();

  console.log("✅ Palabra secreta establecida correctamente.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error al establecer la palabra secreta:", error);
    process.exit(1);
  });
