# 🐍 Snake Game

A modern, visually stunning implementation of the classic Snake game built with HTML Canvas and pure JavaScript. Features a sleek dark theme, smooth animations, and progressive difficulty.

![Snake Game Preview](https://img.shields.io/badge/Status-Ready%20to%20Play-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **🎨 Modern Dark Theme** - Sleek glassmorphism design with vibrant gradient accents
- **🎮 Difficulty Levels** - Choose between Easy, Medium, or Hard modes
- **⚡ Progressive Speed** - Game speeds up as you score higher
- **🔊 Sound Effects** - Satisfying audio feedback for eating and game over
- **💾 Persistent High Score** - Your best score is saved in local storage
- **📱 Mobile Controls** - Fully playable on touch devices
- **⏸️ Pause/Resume** - Press 'P' to pause anytime
- **🌟 Visual Effects** - Gradient snake, pulsing food, and glowing effects

## 🎯 How to Play

| Control | Action |
|---------|--------|
| `↑` `↓` `←` `→` | Move the snake |
| `W` `A` `S` `D` | Alternative movement keys |
| `P` | Pause/Resume game |
| Touch controls | Mobile support |

**Goal:** Eat the red food to grow longer and score points. Avoid hitting the walls or yourself!

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Satya136-dvsn/Snake-Game.git
   ```

2. **Open the game:**

   ```bash
   cd Snake-Game
   ```

   Open `index.html` in your browser, or use a live server.

3. **Play!** Select your difficulty and click "Start Game"

## 🛠️ Technologies

- **HTML5 Canvas** - Smooth 2D rendering
- **CSS3** - Modern styling with glassmorphism and animations
- **Vanilla JavaScript (ES6+)** - Clean, modular game logic
- **Web Audio API** - Sound effects

## 📁 Project Structure

```
Snake-Game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling and animations
├── js/
│   └── script.js       # Game logic
├── assets/
│   ├── eat.wav         # Eating sound effect
│   └── game-over.wav   # Game over sound effect
└── README.md           # Documentation
```

## 🎮 Game Mechanics

- **Food Spawning** - Food never spawns on the snake's body
- **Collision Detection** - Wall and self-collision ends the game
- **Direction Lock** - Prevents 180° turns that would cause instant death
- **Dynamic Speed** - Base speed increases by 5ms every 5 points

## 💡 Future Ideas

- [ ] Power-ups (speed boost, invincibility, score multiplier)
- [ ] Multiple game modes (Time Attack, Survival, Zen)
- [ ] Global leaderboard
- [ ] Custom themes and snake skins
- [ ] Obstacles and maze modes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ using pure JavaScript</p>
