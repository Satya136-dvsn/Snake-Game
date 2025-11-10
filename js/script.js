// Game Constants
const canvas = document.querySelector(".play-board");
const ctx = canvas.getContext("2d");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// Game Screens
const startScreen = document.querySelector(".start-screen");
const gameOverScreen = document.querySelector(".game-over-screen");

// Buttons
const startButton = document.querySelector(".start-button");
const playAgainButton = document.querySelector(".play-again-button");

// Audio
const eatSound = new Audio('assets/eat.wav');
const gameOverSound = new Audio('assets/game-over.wav');

// Game State Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = {};
let direction = "right";
let score = 0;
let gameOver = false;
let gameStarted = false;
let paused = false;
let setIntervalId;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

/**
 * Generates a random position for the food.
 */
const updateFoodPosition = () => {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
};

/**
 * Draws the snake, food, and grid on the canvas.
 */
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "#3498db";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
};

/**
 * Updates the game state.
 */
const update = () => {
    if (gameOver) return;
    if (paused) return;

    // Move snake
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
        if (score > highScore) {
            highScore = score;
            highScoreElement.innerText = `High Score: ${highScore}`;
            localStorage.setItem("high-score", highScore);
        }
        eatSound.play();
        updateFoodPosition();
    } else {
        snake.pop();
    }

    // Check for wall collision
    if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize
    ) {
        endGame();
    }

    // Check for self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
};

/**
 * Ends the game.
 */
const endGame = () => {
    gameOver = true;
    gameOverSound.play();
    clearInterval(setIntervalId);
    gameOverScreen.style.display = "flex";
    document.querySelector(".final-score").innerText = score;
    document.querySelector(".high-score-display").innerText = highScore;
};

/**
 * Toggles the game's paused state.
 */
const togglePause = () => {
    if (!gameStarted || gameOver) return;
    paused = !paused;
    if (paused) {
        clearInterval(setIntervalId);
    } else {
        setIntervalId = setInterval(() => {
            update();
            draw();
        }, 130);
    }
};

/**
 * Changes the snake's direction.
 * @param {KeyboardEvent} e - The key press event.
 */
const changeDirection = e => {
    const key = e.key;
    if (key === "p" || key === "P") {
        togglePause();
        return;
    }
    if ((key === "ArrowUp" || key === "w") && direction !== "down") {
        direction = "up";
    } else if ((key === "ArrowDown" || key === "s") && direction !== "up") {
        direction = "down";
    } else if ((key === "ArrowLeft" || key === "a") && direction !== "right") {
        direction = "left";
    } else if ((key === "ArrowRight" || key === "d") && direction !== "left") {
        direction = "right";
    }
};

/**
 * Starts the game.
 */
const startGame = () => {
    gameStarted = true;
    startScreen.style.display = "none";
    updateFoodPosition();
    setIntervalId = setInterval(() => {
        update();
        draw();
    }, 130);
};

/**
 * Resets the game.
 */
const resetGame = () => {
    location.reload();
};

// Event Listeners
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", resetGame);
document.addEventListener("keydown", changeDirection);
controls.forEach(button => {
    button.addEventListener("click", () => {
        const key = button.dataset.key;
        changeDirection({ key });
    });
});
