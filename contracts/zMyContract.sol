    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract MyContract {
        string public message = "Hola, mundo!";

        constructor() {
            // Inicialización del contrato
        }

        function setMessage(string memory newMessage) public {
            message = newMessage;
        }
    }
