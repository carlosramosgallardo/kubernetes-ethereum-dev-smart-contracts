  const { ethers } = require("hardhat");

  async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Desplegando contratos con la cuenta:", deployer.address);
    console.log("Saldo de la cuenta:", (await deployer.getBalance()).toString());

    const MyContractFactory = await ethers.getContractFactory("MyContract");
    console.log("Desplegando MyContract...");
    const myContract = await MyContractFactory.deploy();
    await myContract.deployed();
    console.log("MyContract desplegado en:", myContract.address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error en el despliegue:", error);
      process.exit(1);
    });
