let remainingStones = 13; // Ajustable según el nivel
let maxPick = 3;
let selectedStones = 0;
let sticksContainer = document.getElementById("sticks-container");
let remainingStonesDisplay = document.getElementById("remaining-stones");
let levelDisplay = document.getElementById("level-display"); // Para mostrar el nivel
let turnIndicator = document.getElementById("turn-indicator"); // Para mostrar quién tiene el turno

// Niveles con diferente cantidad de palos
const levels = {
    1: 13,
    2: 14,
    3: 16,
    4: 17,
    5: 19,
    6: 21,
    7: 23,
    8: 25,
    9: 27,
    10: 29,
};

// Cargar el nivel seleccionado
function selectLevel(level) {
    if (level <= 5) {
        startLevel(level);
    }
}

// Función para iniciar el nivel
function startLevel(level) {
    remainingStones = levels[level];
    remainingStonesDisplay.textContent = remainingStones;
    selectedStones = 0;
    levelDisplay.textContent = `Nivel: ${level}`; // Actualizar el nivel en el encabezado
    updateSticks();
    document.getElementById("pass-turn-button").disabled = true; // Desactivar el botón de pasar turno
    updateTurnIndicator("Jugador"); // Inicializar el indicador de turno
}

// Función para renderizar los palos en la pantalla
function updateSticks() {
    sticksContainer.innerHTML = ''; // Limpiamos los palos anteriores
    for (let i = 0; i < remainingStones; i++) {
        let stick = document.createElement("div");
        stick.className = "stick"; // Asignar la clase stick con el diseño de CSS
        stick.addEventListener("click", () => selectStick(stick));
        sticksContainer.appendChild(stick); // Añadir el palo al contenedor
    }
}

// Función que selecciona un palo
function selectStick(stickElement) {
    if (selectedStones >= maxPick) return;

    if (!stickElement.classList.contains("selected")) {
        stickElement.classList.add("selected");
        selectedStones++;
    }

    // Activar el botón de pasar turno si se han seleccionado palos
    document.getElementById("pass-turn-button").disabled = selectedStones === 0;
}

// Función para el turno del jugador
function playerPick() {
    remainingStones -= selectedStones;  
    selectedStones = 0;
    remainingStonesDisplay.textContent = remainingStones;
    updateSticks();
    updateTurnIndicator("Máquina"); // Actualizar el indicador de turno

    // Verificar si el jugador ha ganado
    if (remainingStones <= 0) {
        endGame("¡Ganaste! Tú tomaste la última ficha.");
        return;
    }

    // Solo activar el turno de la computadora si el jugador no ha ganado
    setTimeout(computerTurn, 1000);
}

// Función para el turno de la computadora
function computerTurn() {
    let stonesToTake = Math.min(Math.floor(Math.random() * maxPick) + 1, remainingStones);
    remainingStones -= stonesToTake;
    remainingStonesDisplay.textContent = remainingStones;

    updateSticks();
    updateTurnIndicator("Jugador"); // Actualizar el indicador de turno

    // Verificar si la computadora ha perdido
    if (remainingStones <= 0) {
        endGame("¡Perdiste! La computadora tomó la última ficha.");
        return;
    }
}

// Termina el juego
function endGame(message) {
    alert(message);
    // Si el jugador gana, pasar al siguiente nivel
    if (message.includes("¡Ganaste!")) {
        const currentLevel = parseInt(levelDisplay.textContent.split(": ")[1]);
        if (currentLevel < 10) {
            const nextLevelButton = document.getElementById(`level${currentLevel + 1}`);
            nextLevelButton.disabled = false; // Desbloquear el siguiente nivel
            nextLevelButton.innerHTML = `Nivel ${currentLevel + 1}`; // Actualizar el texto del botón
            startLevel(currentLevel + 1); // Iniciar el siguiente nivel automáticamente
        }
    }
}

// Función para actualizar el indicador de turno
function updateTurnIndicator(turn) {
  turnIndicator.textContent = `Turno de ${turn}`;
}

// Función para pasar el turno
function passTurn() {
    if (selectedStones < 1 || selectedStones > maxPick) {
        alert("Debes seleccionar entre 1 y 3 palos para pasar el turno.");
        return;
    }
    playerPick(); // Procesar la selección del jugador
}

// Función para reiniciar el juego
function restartGame() {
    startLevel(1);
}

// Iniciar el nivel 1 al cargar la página
startLevel(1);