const { ethers } = require("hardhat");

async function main() {
  const [signer] = await ethers.getSigners(); // Obtener la cuenta desde Hardhat
  const message = "ASEREJEE"; // Mensaje a inyectar
  const hexMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)); // Convertir a Hex

  console.log(`🔹 Enviando transacción con mensaje: "${message}"`);
  
  const tx = await signer.sendTransaction({
    to: "0x0000000000000000000000000000000000000069", // ¿69?
    value: 0,
    data: hexMessage // Texto en la transacción
  });

  console.log(`✅ Transacción enviada! Hash: ${tx.hash}`);

  await tx.wait(); // Esperar confirmación

  console.log(`🔍 Puedes buscarla en Blockscout usando el hash.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error al inyectar transacción:", error);
    process.exit(1);
  });
