# 🐍 Snake Game

<div align="center">

[![Live Demo](https://img.shields.io/badge/🎮_Play_Now-Live_Demo-00d4aa?style=for-the-badge)](https://satya136-dvsn.github.io/Snake-Game/)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?style=for-the-badge&logo=github)](https://satya136-dvsn.github.io/Snake-Game/)

**A modern, feature-rich Snake game built with vanilla JavaScript and HTML5 Canvas**

*Demonstrating clean code architecture, game loop optimization, and responsive design principles*

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Canvas API](https://img.shields.io/badge/Canvas_API-FF6B6B?style=flat-square)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Technical Highlights](#-technical-highlights)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Game Controls](#-game-controls)
- [Skills Demonstrated](#-skills-demonstrated)

---

## 🎯 Overview

A polished recreation of the classic Snake arcade game, showcasing modern web development practices. This project emphasizes **clean code architecture**, **performance optimization**, and **user experience design** — built entirely without frameworks to demonstrate core JavaScript proficiency.

---

## 🚀 Live Demo

### **[▶️ Play the Game](https://satya136-dvsn.github.io/Snake-Game/)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🎨 Modern UI** | Sleek dark theme with glassmorphism effects, gradient accents, and smooth animations |
| **⚡ Dynamic Difficulty** | Three difficulty levels (Easy/Medium/Hard) with progressive speed scaling |
| **💾 Persistent Storage** | High scores saved to localStorage for return visits |
| **📱 Responsive Design** | Fully playable on desktop and mobile with touch controls |
| **🔊 Audio Feedback** | Sound effects for food collection and game over events |
| **⏸️ Pause System** | Pause/resume functionality with visual overlay |
| **🎮 Multiple Input Methods** | Arrow keys, WASD, and touch controls supported |

---

## 🔧 Technical Highlights

### Architecture & Design Patterns

- **Game Loop Optimization** — Uses `setTimeout` with dynamic intervals for frame-rate independent gameplay
- **State Machine** — Clean separation of game states (menu, playing, paused, game over)
- **Collision Detection** — Efficient boundary and self-collision checking
- **Input Buffering** — Direction queue prevents 180° turns that would cause instant death

### Code Quality

```javascript
// Example: Clean, modular function structure
const update = () => {
    if (gameOver || paused) return;
    
    direction = nextDirection;  // Input buffer pattern
    const head = calculateNewHead();
    
    if (checkCollision(head)) return endGame();
    
    snake.unshift(head);
    handleFoodCollision(head);
};
```

### Performance

- Minimal DOM manipulation — all rendering via Canvas API
- Efficient snake movement using array operations (`unshift`/`pop`)
- Responsive design without CSS frameworks

---

## 🏁 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Satya136-dvsn/Snake-Game.git

# Navigate to project
cd Snake-Game

# Open in browser (or use Live Server)
start index.html
```

No build tools or dependencies required — pure vanilla JavaScript.

---

## 📁 Project Structure

```
Snake-Game/
├── index.html          # Entry point with semantic HTML5
├── css/
│   └── style.css       # Modern CSS with custom properties
├── js/
│   └── script.js       # Game logic (~400 lines, well-documented)
├── assets/
│   ├── eat.wav         # Food collection sound
│   └── game-over.wav   # Game over sound
└── README.md
```

---

## 🎮 Game Controls

| Input | Action |
|-------|--------|
| `↑` `↓` `←` `→` | Move snake |
| `W` `A` `S` `D` | Alternative movement |
| `P` | Pause/Resume |
| Touch/Swipe | Mobile controls |

---

## 💡 Skills Demonstrated

This project showcases proficiency in:

- **JavaScript (ES6+)** — Arrow functions, template literals, destructuring, modules
- **HTML5 Canvas API** — 2D rendering, animations, and game graphics
- **CSS3** — Flexbox, Grid, custom properties, animations, glassmorphism
- **Game Development** — Game loops, collision detection, state management
- **Web Audio API** — Sound effect integration
- **Responsive Design** — Mobile-first approach with touch support
- **Local Storage API** — Client-side data persistence
- **Git/GitHub** — Version control and deployment via GitHub Pages

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Satya](https://github.com/Satya136-dvsn)**

*If you enjoyed this project, consider giving it a ⭐*

</div>
