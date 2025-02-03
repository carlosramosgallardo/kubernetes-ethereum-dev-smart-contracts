const { ethers } = require("ethers");

// Define la URL de tu nodo; por ejemplo, puede ser un nodo local o un nodo remoto.
const rpcUrl = "http://besu.local"; // Cambia esto según tu configuración

// Crea una instancia de proveedor conectada a esa URL.
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

// Dirección del contrato que quieres consultar.
const contractAddress = process.env.CONTRACT_ADDRESS;// Reemplaza con la dirección del contrato

async function readSlot(slotIndex) {
  const storageValue = await provider.getStorageAt(contractAddress, slotIndex);
  console.log(`Slot ${slotIndex}: ${storageValue}`);
}

async function main() {
  // Ejemplo: Leer los primeros 5 slots
  for (let i = 0; i < 5; i++) {
    await readSlot(i);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });

