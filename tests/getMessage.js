const { ethers } = require("hardhat");

async function main() {
  // Dirección del contrato desplegado (debe estar correctamente configurado)
  const contractAddress = process.env.CONTRACT_ADDRESS;

  // Obtiene la instancia del contrato
  const myContract = await ethers.getContractAt("MyContract", contractAddress);

  // Llama a la función `riddle` del contrato
  const riddleText = await myContract.riddle();
  console.log("El acertijo es:", riddleText);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error al obtener el acertijo:", error);
    process.exit(1);
  });
