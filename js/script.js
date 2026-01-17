// ===========================================
// SNAKE GAME - Modern Implementation
// ===========================================

// --- DOM Elements ---
const canvas = document.querySelector(".play-board");
const ctx = canvas.getContext("2d");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// --- Screens ---
const startScreen = document.querySelector(".start-screen");
const gameOverScreen = document.querySelector(".game-over-screen");
const pauseOverlay = document.querySelector(".pause-overlay");

// --- Buttons ---
const startButton = document.querySelector(".start-button");
const playAgainButton = document.querySelector(".play-again-button");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

// --- Audio ---
const eatSound = new Audio('assets/eat.wav');
const gameOverSound = new Audio('assets/game-over.wav');

// --- Game Configuration ---
const GRID_SIZE = 20;
const GRID_COUNT = canvas.width / GRID_SIZE;
const BASE_SPEEDS = {
    easy: 150,
    medium: 100,
    hard: 70
};

// --- Game State ---
let snake = [];
let food = {};
let direction = "right";
let nextDirection = "right"; // Prevents rapid direction reversal
let score = 0;
let gameOver = false;
let gameStarted = false;
let paused = false;
let gameLoopId = null;
let currentSpeed = BASE_SPEEDS.medium;
let highScore = parseInt(localStorage.getItem("high-score")) || 0;

// Initialize high score display
highScoreElement.innerText = `High Score: ${highScore}`;

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

/**
 * Check if a position collides with the snake body
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {boolean} - True if position is on snake
 */
const isOnSnake = (x, y) => {
    return snake.some(segment => segment.x === x && segment.y === y);
};

/**
 * Generate a random position for food that isn't on the snake
 */
const updateFoodPosition = () => {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * GRID_COUNT);
        newY = Math.floor(Math.random() * GRID_COUNT);
    } while (isOnSnake(newX, newY));
    
    food = { x: newX, y: newY };
};

/**
 * Calculate dynamic speed based on score
 * Speed increases slightly as score grows
 */
const getDynamicSpeed = () => {
    const speedIncrease = Math.floor(score / 5) * 5;
    return Math.max(currentSpeed - speedIncrease, 50); // Min 50ms
};

// ===========================================
// RENDERING FUNCTIONS
// ===========================================

/**
 * Draw a subtle grid background
 */
const drawGrid = () => {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= GRID_COUNT; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }
};

/**
 * Draw a rounded rectangle
 */
const drawRoundedRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
};

/**
 * Render the snake with gradient coloring
 */
const drawSnake = () => {
    snake.forEach((segment, index) => {
        // Calculate gradient color from head to tail
        const ratio = index / snake.length;
        const r = Math.round(0 + (0 - 0) * ratio);
        const g = Math.round(255 - (255 - 170) * ratio);
        const b = Math.round(136 + (85 - 136) * ratio);
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        
        const padding = 1;
        const size = GRID_SIZE - padding * 2;
        const x = segment.x * GRID_SIZE + padding;
        const y = segment.y * GRID_SIZE + padding;
        
        // Draw rounded segment
        drawRoundedRect(x, y, size, size, 4);
        
        // Add glow effect to head
        if (index === 0) {
            ctx.shadowColor = "#00ff88";
            ctx.shadowBlur = 10;
            drawRoundedRect(x, y, size, size, 4);
            ctx.shadowBlur = 0;
        }
    });
};

/**
 * Render the food with pulsing animation
 */
const drawFood = () => {
    const time = Date.now() / 200;
    const pulse = Math.sin(time) * 2;
    
    const size = GRID_SIZE - 4 + pulse;
    const offset = (GRID_SIZE - size) / 2;
    const x = food.x * GRID_SIZE + offset;
    const y = food.y * GRID_SIZE + offset;
    
    // Glow effect
    ctx.shadowColor = "#ff6b6b";
    ctx.shadowBlur = 15 + pulse * 2;
    
    ctx.fillStyle = "#ff6b6b";
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        size / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    ctx.shadowBlur = 0;
};

/**
 * Main render function
 */
const draw = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background grid
    drawGrid();
    
    // Draw game elements
    drawFood();
    drawSnake();
};

// ===========================================
// GAME LOGIC
// ===========================================

/**
 * Update game state each frame
 */
const update = () => {
    if (gameOver || paused) return;
    
    // Apply the next direction (prevents rapid reversal)
    direction = nextDirection;
    
    // Calculate new head position
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case "up": head.y--; break;
        case "down": head.y++; break;
        case "left": head.x--; break;
        case "right": head.x++; break;
    }
    
    // Add new head
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
        
        eatSound.currentTime = 0;
        eatSound.play().catch(() => {}); // Ignore autoplay errors
        updateFoodPosition();
        
        // Increase speed dynamically
        clearTimeout(gameLoopId);
        gameLoop();
    } else {
        snake.pop();
    }
    
    // Check for wall collision
    if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        endGame();
        return;
    }
    
    // Check for self collision (skip head)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }
};

/**
 * Main game loop using setTimeout for dynamic speed
 */
const gameLoop = () => {
    update();
    draw();
    
    if (!gameOver && !paused) {
        gameLoopId = setTimeout(gameLoop, getDynamicSpeed());
    }
};

/**
 * End the game and show game over screen
 */
const endGame = () => {
    gameOver = true;
    clearTimeout(gameLoopId);
    
    gameOverSound.play().catch(() => {});
    
    gameOverScreen.style.display = "flex";
    document.querySelector(".final-score").innerText = score;
    document.querySelector(".high-score-display").innerText = highScore;
};

/**
 * Toggle pause state
 */
const togglePause = () => {
    if (!gameStarted || gameOver) return;
    
    paused = !paused;
    
    if (paused) {
        clearTimeout(gameLoopId);
        pauseOverlay.classList.add("show");
    } else {
        pauseOverlay.classList.remove("show");
        gameLoop();
    }
};

// ===========================================
// INPUT HANDLING
// ===========================================

/**
 * Handle direction changes from keyboard/buttons
 */
const changeDirection = (e) => {
    const key = e.key || e;
    
    // Handle pause
    if (key === "p" || key === "P") {
        togglePause();
        return;
    }
    
    // Don't change direction if paused or game over
    if (paused || gameOver) return;
    
    // Map keys to directions with reversal prevention
    if ((key === "ArrowUp" || key === "w" || key === "W") && direction !== "down") {
        nextDirection = "up";
    } else if ((key === "ArrowDown" || key === "s" || key === "S") && direction !== "up") {
        nextDirection = "down";
    } else if ((key === "ArrowLeft" || key === "a" || key === "A") && direction !== "right") {
        nextDirection = "left";
    } else if ((key === "ArrowRight" || key === "d" || key === "D") && direction !== "left") {
        nextDirection = "right";
    }
};

// ===========================================
// GAME CONTROL FUNCTIONS
// ===========================================

/**
 * Initialize and start the game
 */
const startGame = () => {
    // Reset state
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    nextDirection = "right";
    score = 0;
    gameOver = false;
    gameStarted = true;
    paused = false;
    
    // Update UI
    scoreElement.innerText = `Score: ${score}`;
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    pauseOverlay.classList.remove("show");
    
    // Initialize food and start game
    updateFoodPosition();
    gameLoop();
};

/**
 * Reset and restart the game (without page reload)
 */
const resetGame = () => {
    clearTimeout(gameLoopId);
    gameOverScreen.style.display = "none";
    startGame();
};

// ===========================================
// EVENT LISTENERS
// ===========================================

// Start button
startButton.addEventListener("click", startGame);

// Play again button
playAgainButton.addEventListener("click", resetGame);

// Keyboard controls
document.addEventListener("keydown", changeDirection);

// Touch controls
controls.forEach(button => {
    button.addEventListener("click", () => {
        changeDirection(button.dataset.key);
    });
});

// Difficulty selection
difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Update active state
        difficultyButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        // Set speed
        currentSpeed = parseInt(btn.dataset.speed);
    });
});

// Prevent arrow key scrolling
window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
    }
});
