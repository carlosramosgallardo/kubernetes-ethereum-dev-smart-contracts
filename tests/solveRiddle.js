const { ethers } = require("hardhat");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("❌ CONTRACT_ADDRESS no está definido.");
  }

  let correctAnswer = process.env.SECRET_ANSWER || "Esteban";
  
  // Limpia la respuesta usando normalize() y trim()
  correctAnswer = correctAnswer.trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  console.log(`⏳ Intentando resolver el acertijo con: '${correctAnswer}'`);

  const [deployer] = await ethers.getSigners();
  const myContract = await ethers.getContractAt("RiddleContract", contractAddress, deployer);

  try {
    // Intentar resolver el acertijo
    const tx = await myContract.solveRiddle(correctAnswer);
    await tx.wait();  // Esperar a que la transacción sea confirmada

    console.log("⏳ Verificando si el acertijo fue resuelto...");

    let isSolved = await myContract.isSolved();
    console.log("Estado de isSolved después de intentar resolver:", isSolved);

    if (isSolved) {
      console.log("✅ ¡Acertijo resuelto correctamente!");
    } else {
      console.log("❌ Respuesta incorrecta. El acertijo sigue sin resolverse.");
    }
  } catch (error) {
    console.error("❌ Error al intentar resolver el acertijo:", error.reason || error);
  }
}

main().catch((error) => {
  console.error("❌ Error en la ejecución:", error.reason || error);
  process.exit(1);
});
