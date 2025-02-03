// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RiddleContract {
    string public riddle; // Acertijo que se establece al desplegar el contrato
    bytes32 private hashedSecretWord; // Hash de la palabra secreta
    bool public isSolved; // Indica si el acertijo ha sido resuelto
    string private secretWord; // Palabra secreta revelada una vez resuelto el acertijo

    // Evento que se emite cuando el acertijo es resuelto
    event RiddleSolved(address indexed solver, string solution);

    // Constructor que inicializa el acertijo y la palabra secreta (en forma de hash)
    constructor(string memory _riddle, string memory _secretWord) {
        riddle = _riddle;
        hashedSecretWord = keccak256(abi.encodePacked(trim(_secretWord))); // Aplica trim() para limpiar
        isSolved = false;
    }

    // Función que permite a los usuarios intentar resolver el acertijo
    function solveRiddle(string memory _attempt) public {
        require(!isSolved, "El acertijo ya ha sido resuelto.");
        
        // Aplica trim() en el intento antes de comparar
        require(
            keccak256(abi.encodePacked(trim(_attempt))) == hashedSecretWord, 
            "Respuesta incorrecta."
        );

        secretWord = _attempt;
        isSolved = true;
        emit RiddleSolved(msg.sender, _attempt); // Emite el evento cuando se resuelve el acertijo
    }

    // Función para obtener la palabra secreta solo si el acertijo ha sido resuelto
    function getSecretWord() public view returns (string memory) {
        require(isSolved, "Aun no se ha resuelto el acertijo.");
        return secretWord;
    }

    // Función para limpiar espacios en blanco antes y después del string
    function trim(string memory _input) internal pure returns (string memory) {
        bytes memory strBytes = bytes(_input);
        uint256 start = 0;
        uint256 end = strBytes.length;

        while (start < end && (strBytes[start] == 0x20 || strBytes[start] == 0x0A || strBytes[start] == 0x0D)) {
            start++;
        }
        while (end > start && (strBytes[end - 1] == 0x20 || strBytes[end - 1] == 0x0A || strBytes[end - 1] == 0x0D)) {
            end--;
        }

        bytes memory trimmedBytes = new bytes(end - start);
        for (uint256 i = start; i < end; i++) {
            trimmedBytes[i - start] = strBytes[i];
        }
        return string(trimmedBytes);
    }
}
