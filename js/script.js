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
 * @function updateFoodPosition
 * @description Generates a random position for the food within the canvas grid.
 * The position is calculated based on the canvas dimensions and grid size.
 * The generated coordinates are assigned to the 'food' object.
 */
const updateFoodPosition = () => {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
};

/**
 * @function draw
 * @description Renders the game elements (snake and food) on the canvas.
 * It clears the canvas before drawing to ensure a clean frame for each render.
 * The snake and food are drawn based on their current positions and the grid size.
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
 * @function update
 * @description Updates the game state on each frame.
 * This includes moving the snake, checking for collisions (food, wall, self),
 * and updating the score. The game loop is terminated if the game is over.
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
 * @function endGame
 * @description Handles the game over state.
 * It stops the game loop, plays a sound, and displays the game over screen
 * with the final score and high score.
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
 * @function togglePause
 * @description Toggles the paused state of the game.
 * When paused, the game loop is cleared. When resumed, the game loop is restarted.
 * The game must be started and not over for the pause to function.
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
 * @function changeDirection
 * @description Changes the direction of the snake based on user input.
 * It ensures the snake cannot reverse its direction.
 * Also handles the 'P' key for pausing the game.
 * @param {object} e - The event object, containing the key pressed.
 * @param {string} e.key - The key that was pressed.
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
 * @function startGame
 * @description Starts the game.
 * It hides the start screen, initializes the food position, and begins the game loop.
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
 * @function resetGame
 * @description Resets the game by reloading the page.
 * This effectively restarts the game from its initial state.
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
