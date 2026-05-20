# 🌿 ProductiVibe

> A gamified productivity app that turns task completion into an engaging leveling experience

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/aanyabharti101/productivibe-app.svg)](https://github.com/aanyabharti101/productivibe-app/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

## 📋 Overview

ProductiVibe combines a Pomodoro timer, task manager, and ambient music player with a leveling system that rewards consistency. Complete tasks to unlock animal companions and watch your productivity grow.

**Try it here:** [Live Demo](https://aanyabharti101.github.io/productivibe-app/)

---

## ✨ Features

### 🎯 Gamified Task Management

* Add, complete, and delete tasks
* Toggle completion — click again to un-complete if needed
* Every 5 completed tasks = level up
* Progress saves automatically in your browser

### 🦊 Progressive Leveling System

| Level | Title               | Companion    |
| ----- | ------------------- | ------------ |
| 1     | Beginner            | 🐣 Hatchling |
| 2     | Task Master         | 🐿️ Squirrel |
| 3     | Productivity Pro    | 🦊 Fox       |
| 4     | Focus Warrior       | 🐺 Wolf      |
| 5     | Productivity Legend | 🦅 Eagle     |
| 6     | Ultimate Champion   | 🐉 Dragon    |
| 7     | Mythical Master     | 🦄 Unicorn   |

Each level unlocks a new background gradient as a visual reward.

### ⏱️ Pomodoro Timer

* 25-minute focus sessions
* 5-minute short breaks
* 15-minute long breaks
* Auto-switches between work and break modes
* Tracks total Pomodoro sessions completed

### 🎵 Ambient Music Player

* 5 nature-inspired tracks (Forest, Ocean, Rain, White Noise, Cafe)
* Continuous looping
* Volume control with mute button
* Click any track to play

### 💬 Daily Quotes

* 6 categories: Motivation, Self-Care, Confidence, Career, Famous People, Random
* Auto-refresh intervals: Manual, Minute, Hour, or Day
* Refresh anytime with one click

### 🧘 Breathing Exercises

* Guided 4-7-8 breathing technique
* Visual breathing ball that expands and contracts
* Clear step-by-step instructions
* Timer display for each phase

### ⭐ Daily Challenges

* Small wellness tasks (hydrate, stretch, move, etc.)
* Changes every day
* Track completion in statistics

### 📊 Statistics Dashboard

* Current level and animal companion
* Daily streak counter
* Total tasks completed
* Pomodoro sessions count
* Progress toward next level
* Reset progress option with confirmation


### 📈 Personal Goals (Habit Tracker)

Create and track your own personal goals:

- **Add custom habits** - Morning meditation, daily exercise, reading, hydration
- **Set targets** - Choose how many times per day/week
- **Progress bars** - Visual feedback for each habit
- **Track streaks** - Build consistency over time

**Examples:**
- 🧘 Morning meditation: 1/1 times ✅
- 📖 Reading: 20/20 pages ✅
- 💧 Drinking water: 6/8 glasses
- 🏃‍♂️ Exercise: 0/30 minutes

*Goals persist automatically. Delete or reset anytime.*

---

## 🛠️ Built With

* **HTML5** — Semantic structure
* **CSS3** — Custom styling, animations, responsive design
* **JavaScript (Vanilla)** — Core functionality without frameworks
* **Font Awesome 6** — Icons
* **LocalStorage API** — Persistent data storage

---

## 🚀 Getting Started

### Prerequisites

* Modern web browser (Chrome, Firefox, Safari, Edge)
* Local audio files for music player (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/aanyabharti101/productivibe-app.git

# Navigate into project folder
cd productivibe-app

# Open the app
open index.html

```
OR
```
# Run the command in project folder (recommeneded for no feature blocks)
npx live-server

```


## 📁 Project Structure

```text
productivibe-app/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── sounds/
└── README.md
```

---

## 💾 Data Storage

All user data is stored locally in the browser.

| Key                  | Stores                                    |
| -------------------- | ----------------------------------------- |
| `productivibe_user`  | Level, streak, completed tasks, pomodoros |
| `productivibe_tasks` | Task list                                 |
| `productivibe_bg`    | Background unlocks                        |
| `lastQuote`          | Current quote                             |

No data is sent to external servers.

---

## 🎮 How to Use

### Tasks

1. Type a task into the input field
2. Click **Add** or press Enter
3. Click ✓ to complete
4. Click again to undo completion
5. Use 🗑️ to delete tasks

### Timer

1. Choose a timer mode
2. Click **Start**
3. Pause or reset anytime
4. Timer auto-switches when complete

### Music

1. Press **Play**
2. Change tracks using next/previous buttons
3. Adjust volume with slider
4. Click playlist items directly

### Quotes

1. Select a quote category
2. Choose refresh interval
3. Refresh manually anytime

### Breathing Exercises

1. Open the Breathing section
2. Start a session
3. Follow the breathing animation
4. Inhale → Hold → Exhale timing guidance

---

## 📱 Responsive Design

Designed to work across desktop, tablet, and mobile devices.

---

## 🔜 Future Improvements

* [ ] Custom timer durations
* [ ] More ambient tracks
* [ ] More Rewards/Levels/Features
* [ ] Data export / backup
* [ ] Dark mode toggle
* [ ] PWA support

---

## 🤝 Contributing

Contributions and suggestions are welcome.

```bash
# Fork the project
# Create a feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "Add amazing feature"

# Push branch
git push origin feature/amazing-feature
```

Then open a Pull Request.

---

## 📄 License

Distributed under the MIT License.

---

## 🙏 Acknowledgments

* Pomodoro Technique by Francesco Cirillo
* Font Awesome for icons
* Mixkit and Zapsplat for sound inspiration

---

## 📬 Contact

Aanya Bharti
GitHub: https://github.com/aanyabharti101

Project Link:
https://github.com/aanyabharti101/productivibe-app

---

*Built to make productivity more engaging and enjoyable.*
