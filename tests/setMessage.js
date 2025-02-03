const { ethers } = require("hardhat");

async function main() {
  // Obtenemos un signer (por defecto, el primer account disponible en la red de desarrollo)
  const [signer] = await ethers.getSigners();
  console.log("Usando la cuenta:", signer.address);

  // Obtenemos una instancia del contrato en la dirección desplegada
  const myContract = await ethers.getContractAt("MyContract", "0x077f15c7a804F200EA64F45ce7E373F137747e87");

  // Enviamos la transacción para cambiar el mensaje
  const tx = await myContract.setMessage("Aserejee?");
  console.log("Hash de la transacción:", tx.hash);

  // Esperamos a que la transacción se confirme
  await tx.wait();

  // Leemos el mensaje actualizado para confirmar el cambio
  const currentMessage = await myContract.message();
  console.log("El mensaje actualizado es:", currentMessage);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
