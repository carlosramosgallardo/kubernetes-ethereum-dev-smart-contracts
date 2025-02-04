  const { ethers } = require("hardhat");

  async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Desplegando contratos con la cuenta:", deployer.address);
    console.log("Saldo de la cuenta:", (await deployer.getBalance()).toString());
    
    // Lee los parámetros del constructor desde variables de entorno
    const riddle = process.env.CONTRACT_RIDDLE || "Acertijo por defecto";
    const secretWord = process.env.CONTRACT_SECRET || "palabraSecreta";
    
    // Asumimos que el contrato se llama RiddleContract. Ajusta si es necesario.
    const ContractFactory = await ethers.getContractFactory("RiddleContract");
    console.log("Desplegando contrato...");
    const contractInstance = await ContractFactory.deploy(riddle, secretWord);
    await contractInstance.deployed();
    console.log("Contrato desplegado en:", contractInstance.address);
  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error en el despliegue:", error);
      process.exit(1);
    });
