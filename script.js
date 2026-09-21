// ==========================================
// STRANGER NUMBERS
// GAME JAVASCRIPT
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");

const startingLivesInput =
    document.getElementById("startingLives");

const minimumNumberInput =
    document.getElementById("minimumNumber");

const maximumNumberInput =
    document.getElementById("maximumNumber");

const startButton =
    document.getElementById("startButton");

const hearts =
    document.getElementById("hearts");

const rangeDisplay =
    document.getElementById("rangeDisplay");

const guessInput =
    document.getElementById("guessInput");

const guessButton =
    document.getElementById("guessButton");

const message =
    document.getElementById("message");

const guessesList =
    document.getElementById("guessesList");

const gameOverOverlay =
    document.getElementById("gameOverOverlay");

const answerOverlay =
    document.getElementById("answerOverlay");

const playAgainButton =
    document.getElementById("playAgainButton");

const addLifeButton =
    document.getElementById("addLifeButton");

const endGameButton =
    document.getElementById("endGameButton");

const answerNumber =
    document.getElementById("answerNumber");

const returnButton =
    document.getElementById("returnButton");


// ==========================================
// GAME VARIABLES
// ==========================================

let secretNumber;

let lives;

let maximumLives;

let minimumNumber;

let maximumNumber;

let previousGuesses = [];

let gameRunning = false;


// ==========================================
// START GAME
// ==========================================

function startGame() {

    // Get settings
    maximumLives =
        Number(startingLivesInput.value);

    minimumNumber =
        Number(minimumNumberInput.value);

    maximumNumber =
        Number(maximumNumberInput.value);


    // Validate lives
    if (
        maximumLives < 1 ||
        maximumLives > 20
    ) {

        alert("Lives must be between 1 and 20.");

        return;
    }


    // Validate number range
    if (
        minimumNumber >= maximumNumber
    ) {

        alert(
            "The highest number must be greater than the lowest number."
        );

        return;
    }


    // Generate random number
    secretNumber =
        Math.floor(
            Math.random() *
            (maximumNumber - minimumNumber + 1)
        ) + minimumNumber;


    // Set lives
    lives = maximumLives;


    // Clear previous guesses
    previousGuesses = [];


    // Start game
    gameRunning = true;


    // Update screen
    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");


    // Display range
    rangeDisplay.textContent =
        minimumNumber + " - " + maximumNumber;


    // Create hearts
    createHearts();


    // Clear previous guesses
    guessesList.innerHTML = "";


    // Clear messages
    message.textContent = "";


    // Reset input
    guessInput.value = "";

    guessInput.disabled = false;

    guessButton.disabled = false;


    // Focus input
    guessInput.focus();
}


// ==========================================
// CREATE HEARTS
// ==========================================

function createHearts() {

    hearts.innerHTML = "";

    for (let i = 0; i < maximumLives; i++) {

        const heart =
            document.createElement("span");

        heart.classList.add("heart");

        heart.textContent = "♥";

        heart.id = "heart-" + i;

        hearts.appendChild(heart);
    }
}


// ==========================================
// REMOVE ONE HEART
// ==========================================

function removeHeart() {

    const heart =
        document.getElementById(
            "heart-" + (lives)
        );

    if (heart) {

        heart.classList.add("lost");
    }
}


// ==========================================
// MAKE GUESS
// ==========================================

function makeGuess() {

    if (!gameRunning) {
        return;
    }


    // Get input
    const guess =
        Number(guessInput.value);


    // Validate input
    if (
        guessInput.value === "" ||
        isNaN(guess)
    ) {

        message.textContent =
            "ENTER A NUMBER.";

        return;
    }


    // Check range
    if (
        guess < minimumNumber ||
        guess > maximumNumber
    ) {

        message.textContent =
            "NUMBER MUST BE BETWEEN " +
            minimumNumber +
            " AND " +
            maximumNumber +
            ".";

        return;
    }


    // Check duplicate guess
    if (
        previousGuesses.includes(guess)
    ) {

        message.textContent =
            "YOU ALREADY GUESSED THAT NUMBER.";

        guessInput.value = "";

        guessInput.focus();

        return;
    }


    // Save guess
    previousGuesses.push(guess);


    // ======================================
    // CORRECT
    // ======================================

    if (guess === secretNumber) {

        addGuessToList(
            guess,
            "correct"
        );


        message.textContent =
            "✓ YOU FOUND THE NUMBER!";


        gameRunning = false;

        guessInput.disabled = true;

        guessButton.disabled = true;

        return;
    }


    // ======================================
    // INCORRECT
    // ======================================

    lives--;

    removeHeart();


    // ======================================
    // GUESS TOO LOW
    // ======================================

    if (guess < secretNumber) {

        addGuessToList(
            guess,
            "higher"
        );

        message.textContent =
            "THE NUMBER IS HIGHER ↑";
    }


    // ======================================
    // GUESS TOO HIGH
    // ======================================

    else {

        addGuessToList(
            guess,
            "lower"
        );

        message.textContent =
            "THE NUMBER IS LOWER ↓";
    }


    // Clear input
    guessInput.value = "";

    guessInput.focus();


    // ======================================
    // GAME OVER
    // ======================================

    if (lives <= 0) {

        gameRunning = false;

        guessInput.disabled = true;

        guessButton.disabled = true;


        // Wait slightly so the final
        // heart disappears first

        setTimeout(function() {

            gameOverOverlay.classList.remove(
                "hidden"
            );

        }, 500);
    }
}


// ==========================================
// ADD GUESS TO PREVIOUS GUESSES
// ==========================================

function addGuessToList(
    guess,
    result
) {

    const entry =
        document.createElement("div");

    entry.classList.add(
        "guess-entry",
        result
    );


    const number =
        document.createElement("span");

    number.classList.add(
        "guess-number"
    );

    number.textContent =
        guess;


    const indicator =
        document.createElement("span");

    indicator.classList.add(
        "guess-indicator"
    );


    // Colour system
    if (result === "higher") {

        indicator.textContent =
            "↑ HIGHER";

    }

    else if (result === "lower") {

        indicator.textContent =
            "↓ LOWER";

    }

    else {

        indicator.textContent =
            "✓ CORRECT";
    }


    entry.appendChild(number);

    entry.appendChild(indicator);

    guessesList.prepend(entry);
}


// ==========================================
// PLAY AGAIN
// ==========================================

function playAgain() {

    gameOverOverlay.classList.add(
        "hidden"
    );


    // Generate a new number
    secretNumber =
        Math.floor(
            Math.random() *
            (maximumNumber - minimumNumber + 1)
        ) + minimumNumber;


    // Reset lives
    lives = maximumLives;


    // Reset guesses
    previousGuesses = [];


    // Reset game
    gameRunning = true;


    // Reset display
    guessesList.innerHTML = "";

    message.textContent = "";


    // Recreate hearts
    createHearts();


    // Enable input
    guessInput.disabled = false;

    guessButton.disabled = false;


    // Clear input
    guessInput.value = "";

    guessInput.focus();
}


// ==========================================
// ADD ONE LIFE
// ==========================================

function addLife() {

    // Add one life
    lives++;

    maximumLives++;


    // Add a new heart
    const heart =
        document.createElement("span");

    heart.classList.add("heart");

    heart.textContent = "♥";

    heart.id =
        "heart-" + (maximumLives - 1);


    hearts.appendChild(heart);


    // Close game over popup
    gameOverOverlay.classList.add(
        "hidden"
    );


    // Continue game
    gameRunning = true;


    guessInput.disabled = false;

    guessButton.disabled = false;

    message.textContent =
        "+1 LIFE FOUND.";


    guessInput.focus();
}


// ==========================================
// END GAME
// ==========================================

function endGame() {

    gameOverOverlay.classList.add(
        "hidden"
    );


    // Show answer
    answerNumber.textContent =
        secretNumber;


    answerOverlay.classList.remove(
        "hidden"
    );
}


// ==========================================
// RETURN TO START MENU
// ==========================================

function returnToMenu() {

    answerOverlay.classList.add(
        "hidden"
    );

    gameScreen.classList.add(
        "hidden"
    );

    startScreen.classList.remove(
        "hidden"
    );
}


// ==========================================
// BUTTON EVENTS
// ==========================================

startButton.addEventListener(
    "click",
    startGame
);


guessButton.addEventListener(
    "click",
    makeGuess
);


playAgainButton.addEventListener(
    "click",
    playAgain
);


addLifeButton.addEventListener(
    "click",
    addLife
);


endGameButton.addEventListener(
    "click",
    endGame
);


returnButton.addEventListener(
    "click",
    returnToMenu
);


// ==========================================
// ENTER KEY
// ==========================================

guessInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            makeGuess();
        }
    }
);
