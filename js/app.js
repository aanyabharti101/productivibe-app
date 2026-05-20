// ==============================
// PRODUCTIVIBE - COMPLETE APPLICATION
// ==============================

console.log('🐾 ProductiVibe starting...');

// ========== LEVEL SYSTEM (Progressive) ==========
const levelRequirements = {
    1: { tasksNeeded: 5, name: "🌱 Beginner", animal: "🐣", animalName: "Hatchling" },
    2: { tasksNeeded: 10, name: "📋 Task Master", animal: "🐿️", animalName: "Squirrel" },
    3: { tasksNeeded: 20, name: "⚡ Productivity Pro", animal: "🦊", animalName: "Fox" },
    4: { tasksNeeded: 35, name: "🎯 Focus Warrior", animal: "🐺", animalName: "Wolf" },
    5: { tasksNeeded: 50, name: "👑 Productivity Legend", animal: "🦅", animalName: "Eagle" },
    6: { tasksNeeded: 75, name: "🏆 Ultimate Champion", animal: "🐉", animalName: "Dragon" },
    7: { tasksNeeded: 100, name: "🌟 Mythical Master", animal: "🦄", animalName: "Unicorn" }
};

const levelRewards = {
    1: { bgGradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" },
    2: { bgGradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
    3: { bgGradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" },
    4: { bgGradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)" },
    5: { bgGradient: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" },
    6: { bgGradient: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)" },
    7: { bgGradient: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)" }
};

// ========== QUOTES DATABASE ==========
const quotesDB = {
    motivation: [
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future depends on what you do today.", author: "Mahatma Gandhi" }
    ],
    selfcare: [
        { text: "Rest when you're weary. Refresh and renew yourself.", author: "Oprah Winfrey" },
        { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brown" }
    ],
    confidence: [
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "You are enough just as you are.", author: "Meghan Markle" }
    ],
    career: [
        { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
    ],
    famous: [
        { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ]
};

// ========== DAILY CHALLENGES ==========
const dailyChallenges = [
    { icon: "💧", text: "Drink a glass of water right now!", color: "#3b82f6" },
    { icon: "🧘", text: "Take 3 deep breaths and stretch", color: "#10b981" },
    { icon: "📝", text: "Write down 3 things you're grateful for", color: "#f59e0b" },
    { icon: "🚶", text: "Stand up and walk for 1 minute", color: "#8b5cf6" },
    { icon: "🎧", text: "Listen to a song that makes you happy", color: "#ec4899" }
];

// ========== DOM Elements ==========
const levelDisplay = document.getElementById('currentLevel');
const levelNameDisplay = document.getElementById('levelName');
const streakDisplay = document.getElementById('streakCount');
const tasksToNextDisplay = document.getElementById('tasksToNext');
const progressFill = document.getElementById('progressFill');
const animalEmoji = document.getElementById('animalEmoji');
const animalNameDisplay = document.getElementById('animalName');
const animalCompanionSpan = document.getElementById('animalCompanion');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCategory = document.getElementById('quoteCategory');
const refreshQuoteBtn = document.getElementById('refreshQuoteBtn');
const quoteIntervalSelect = document.getElementById('quoteInterval');

// ========== GAME DATA ==========
let userData = {
    streak: 0,
    lastVisit: null,
    totalTasksCompleted: 0,
    totalPomodoros: 0,
    level: 1,
    completedChallenges: []
};

let quoteIntervalTimer = null;
let currentChallenge = null;

// Habit Data
let habits = [];

// Helper functions
function getTasksNeededForNextLevel() {
    const nextLevel = userData.level + 1;
    if (levelRequirements[nextLevel]) {
        return levelRequirements[nextLevel].tasksNeeded;
    }
    return 0;
}

function getProgressToNextLevel() {
    let tasksForCurrentLevel = userData.totalTasksCompleted;
    for (let i = 1; i < userData.level; i++) {
        if (levelRequirements[i]) {
            tasksForCurrentLevel -= levelRequirements[i].tasksNeeded;
        }
    }
    const tasksNeeded = getTasksNeededForNextLevel();
    return {
        completed: Math.max(0, tasksForCurrentLevel),
        needed: tasksNeeded,
        percentage: tasksNeeded > 0 ? (tasksForCurrentLevel / tasksNeeded) * 100 : 100
    };
}

function loadUserData() {
    try {
        const saved = localStorage.getItem('productivibe_user');
        if (saved) {
            userData = JSON.parse(saved);
        }
        
        const today = new Date().toDateString();
        if (userData.lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (userData.lastVisit === yesterday.toDateString()) {
                userData.streak++;
                showToast(`🔥 ${userData.streak} day streak!`);
            } else if (userData.lastVisit !== today) {
                userData.streak = 1;
            }
            userData.lastVisit = today;
            saveUserData();
        }
        
        updateLevelBanner();
        updateAnimalCompanion();
    } catch(e) { console.log("Loading user data"); }
}

function saveUserData() {
    localStorage.setItem('productivibe_user', JSON.stringify(userData));
}

function updateLevelBanner() {
    if (levelDisplay) levelDisplay.textContent = userData.level;
    
    const currentLevelData = levelRequirements[userData.level];
    if (levelNameDisplay && currentLevelData) {
        levelNameDisplay.textContent = currentLevelData.name;
    }
    
    if (streakDisplay) streakDisplay.textContent = `${userData.streak} day streak`;
    
    const progress = getProgressToNextLevel();
    const tasksRemaining = progress.needed - progress.completed;
    
    if (tasksToNextDisplay && levelRequirements[userData.level + 1]) {
        tasksToNextDisplay.textContent = tasksRemaining > 0 ? tasksRemaining : 0;
    } else if (tasksToNextDisplay) {
        tasksToNextDisplay.textContent = "MAX";
    }
    
    const progressPercent = Math.min(100, progress.percentage);
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
}

function updateAnimalCompanion() {
    const levelData = levelRequirements[userData.level];
    if (!levelData) return;
    
    if (animalEmoji) animalEmoji.textContent = levelData.animal;
    if (animalNameDisplay) animalNameDisplay.textContent = levelData.animalName;
    if (animalCompanionSpan) animalCompanionSpan.textContent = levelData.animal;
}

function changeBackgroundColor(gradient) {
    document.body.style.background = gradient;
    localStorage.setItem('productivibe_bg', gradient);
}

function loadBackground() {
    const savedBg = localStorage.getItem('productivibe_bg');
    if (savedBg) {
        document.body.style.background = savedBg;
    }
}

function checkLevelUp() {
    if (levelRequirements[userData.level + 1]) {
        let tasksForCurrentLevel = userData.totalTasksCompleted;
        for (let i = 1; i < userData.level; i++) {
            tasksForCurrentLevel -= levelRequirements[i].tasksNeeded;
        }
        
        if (tasksForCurrentLevel >= levelRequirements[userData.level + 1].tasksNeeded) {
            userData.level++;
            saveUserData();
            updateLevelBanner();
            updateAnimalCompanion();
            showLevelUpAnimation();
            
            const newAnimal = levelRequirements[userData.level];
            showToast(`🎉 LEVEL ${userData.level} UNLOCKED! 🎉 You earned: ${newAnimal.animal} ${newAnimal.animalName}!`);
            
            if (levelRewards[userData.level]) {
                changeBackgroundColor(levelRewards[userData.level].bgGradient);
            }
        }
    }
    updateLevelBanner();
}

function showLevelUpAnimation() {
    const newAnimal = levelRequirements[userData.level];
    const animation = document.createElement('div');
    animation.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; 
                    padding: 30px 50px; border-radius: 20px; font-size: 2rem; 
                    font-weight: bold; text-align: center; z-index: 10000;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: bounce 0.5s ease;">
            🎉 LEVEL UP! 🎉<br>
            <span style="font-size: 1.5rem;">${newAnimal.animal} ${levelRequirements[userData.level]?.name}</span><br>
            <span style="font-size: 1rem;">Your new companion: ${newAnimal.animalName}!</span>
        </div>
    `;
    document.body.appendChild(animation);
    setTimeout(() => animation.remove(), 4000);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.innerHTML = `<div style="position: fixed; bottom: 20px; right: 20px; background: var(--secondary); color: white; padding: 12px 20px; border-radius: 10px; z-index: 10000; animation: slideIn 0.3s ease; font-size: 0.85rem;">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== RESET PROGRESS ==========
function resetAllProgress() {
    if (confirm("⚠️ WARNING: This will reset ALL your progress!\n\nThis includes:\n- Your level (back to Level 1)\n- All completed tasks\n- Your streak counter\n- Pomodoro sessions\n- All habits\n\nAre you ABSOLUTELY sure?")) {
        if (confirm("LAST CHANCE: This action cannot be undone. Reset your progress?")) {
            userData = {
                streak: 0,
                lastVisit: new Date().toDateString(),
                totalTasksCompleted: 0,
                totalPomodoros: 0,
                level: 1,
                completedChallenges: []
            };
            
            tasks = [];
            habits = [];
            saveTasks();
            saveHabits();
            saveUserData();
            
            document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            localStorage.removeItem('productivibe_bg');
            
            renderTasks();
            renderHabitTracker();
            updateLevelBanner();
            updateAnimalCompanion();
            updateChallengeCard();
            
            showToast("🔄 Progress has been reset! Starting fresh!");
            
            const modal = document.querySelector('.stats-modal');
            if (modal) modal.remove();
        }
    }
}

// ========== DAILY CHALLENGE ==========
function getRandomChallenge() {
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('dailyChallenge');
    
    if (savedChallenge) {
        const parsed = JSON.parse(savedChallenge);
        if (parsed.date === today) {
            currentChallenge = parsed.challenge;
            return currentChallenge;
        }
    }
    
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    currentChallenge = dailyChallenges[randomIndex];
    localStorage.setItem('dailyChallenge', JSON.stringify({
        challenge: currentChallenge,
        date: today
    }));
    return currentChallenge;
}

function updateChallengeCard() {
    const challenge = getRandomChallenge();
    const challengeCard = document.getElementById('challengeCard');
    const challengeIcon = document.getElementById('challengeIcon');
    const challengeText = document.getElementById('challengeText');
    
    if (challengeCard && challengeIcon && challengeText) {
        challengeIcon.textContent = challenge.icon;
        challengeText.textContent = challenge.text;
    }
}

function markChallengeComplete() {
    const today = new Date().toDateString();
    if (!userData.completedChallenges.includes(today)) {
        userData.completedChallenges.push(today);
        saveUserData();
        showToast(`✨ Challenge complete! +1 productivity point!`);
        
        const card = document.getElementById('challengeCard');
        if (card) {
            card.style.background = '#e8f5e9';
            setTimeout(() => {
                card.style.background = '';
            }, 1000);
        }
    } else {
        showToast(`✅ You already completed today's challenge!`);
    }
}

// ========== QUOTE SYSTEM ==========
function getRandomQuote(category) {
    let quotes;
    if (category === 'random') {
        const categories = Object.keys(quotesDB);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        quotes = quotesDB[randomCategory];
    } else {
        quotes = quotesDB[category];
    }
    
    if (!quotes || quotes.length === 0) {
        quotes = quotesDB.motivation;
    }
    
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateQuote() {
    const category = quoteCategory ? quoteCategory.value : 'random';
    const quote = getRandomQuote(category);
    if (quoteText) quoteText.textContent = `"${quote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = `- ${quote.author}`;
    
    localStorage.setItem('lastQuote', JSON.stringify({ quote, category, date: new Date().toISOString() }));
}

function startQuoteInterval() {
    if (quoteIntervalTimer) {
        clearInterval(quoteIntervalTimer);
        quoteIntervalTimer = null;
    }
    
    const intervalValue = quoteIntervalSelect ? quoteIntervalSelect.value : 'day';
    let intervalMs = 24 * 60 * 60 * 1000;
    
    switch(intervalValue) {
        case 'minute':
            intervalMs = 60 * 1000;
            break;
        case 'hour':
            intervalMs = 60 * 60 * 1000;
            break;
        case 'day':
            intervalMs = 24 * 60 * 60 * 1000;
            break;
        default:
            intervalMs = 24 * 60 * 60 * 1000;
    }
    
    if (intervalValue !== 'manual') {
        quoteIntervalTimer = setInterval(() => {
            updateQuote();
            showToast(`✨ New quote loaded!`);
        }, intervalMs);
    }
}

function saveQuoteInterval() {
    if (quoteIntervalSelect) {
        localStorage.setItem('quoteInterval', quoteIntervalSelect.value);
        startQuoteInterval();
    }
}

function loadQuoteInterval() {
    const saved = localStorage.getItem('quoteInterval');
    if (saved && quoteIntervalSelect) {
        quoteIntervalSelect.value = saved;
    }
    startQuoteInterval();
}

function loadDailyQuote() {
    const saved = localStorage.getItem('lastQuote');
    const intervalValue = quoteIntervalSelect ? quoteIntervalSelect.value : 'day';
    
    if (intervalValue === 'day') {
        const today = new Date().toDateString();
        if (saved) {
            const parsed = JSON.parse(saved);
            const savedDate = new Date(parsed.date).toDateString();
            if (savedDate === today) {
                if (quoteText) quoteText.textContent = `"${parsed.quote.text}"`;
                if (quoteAuthor) quoteAuthor.textContent = `- ${parsed.quote.author}`;
                if (quoteCategory) quoteCategory.value = parsed.category;
                return;
            }
        }
    }
    
    updateQuote();
}

if (refreshQuoteBtn) refreshQuoteBtn.addEventListener('click', updateQuote);
if (quoteCategory) quoteCategory.addEventListener('change', updateQuote);
if (quoteIntervalSelect) quoteIntervalSelect.addEventListener('change', saveQuoteInterval);

// ========== BREATHING EXERCISE ==========
const breathingModal = document.getElementById('breathingModal');
const breathingBall = document.querySelector('.ball');
const breathingInstruction = document.getElementById('breathingInstruction');
const breathingTimer = document.getElementById('breathingTimer');
const startBreathingBtn = document.getElementById('startBreathingBtn');
const stopBreathingBtn = document.getElementById('stopBreathingBtn');
const closeBreathingModal = document.getElementById('closeBreathingModal');
const stepInhale = document.getElementById('stepInhale');
const stepHold = document.getElementById('stepHold');
const stepExhale = document.getElementById('stepExhale');

let breathingInterval = null;

function animateBallTo(size, duration) {
    if (breathingBall) {
        breathingBall.style.transition = `all ${duration}s ease-in-out`;
        breathingBall.style.transform = `scale(${size})`;
    }
}

function startBreathing() {
    if (breathingInterval) clearInterval(breathingInterval);
    
    let stepIndex = 0;
    const steps = [
        { text: "🌬️ Breathe In...", timer: 4, size: 1.8, stepElem: stepInhale },
        { text: "🔒 Hold...", timer: 7, size: 1.8, stepElem: stepHold },
        { text: "🌊 Breathe Out...", timer: 8, size: 1, stepElem: stepExhale }
    ];
    
    function runStep() {
        if (stepIndex >= steps.length) {
            stepIndex = 0;
            runStep();
            return;
        }
        
        const step = steps[stepIndex];
        if (breathingInstruction) breathingInstruction.textContent = step.text;
        if (breathingTimer) breathingTimer.textContent = `${step.timer} seconds`;
        
        [stepInhale, stepHold, stepExhale].forEach(el => el?.classList.remove('active'));
        if (step.stepElem) step.stepElem.classList.add('active');
        
        animateBallTo(step.size, step.timer);
        
        let timeLeft = step.timer;
        const timerInterval = setInterval(() => {
            timeLeft--;
            if (breathingTimer) breathingTimer.textContent = `${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                stepIndex++;
                runStep();
            }
        }, 1000);
        
        breathingInterval = timerInterval;
    }
    
    runStep();
}

function stopBreathing() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }
    if (breathingBall) {
        breathingBall.style.transition = 'all 0.3s ease';
        breathingBall.style.transform = 'scale(1)';
    }
    if (breathingInstruction) breathingInstruction.textContent = "Ready to begin?";
    if (breathingTimer) breathingTimer.textContent = "4 seconds";
    [stepInhale, stepHold, stepExhale].forEach(el => el?.classList.remove('active'));
}

const breathingBtn = document.getElementById('breathingBtn');
if (breathingBtn) {
    breathingBtn.onclick = () => {
        if (breathingModal) breathingModal.style.display = 'flex';
    };
}

if (startBreathingBtn) startBreathingBtn.addEventListener('click', startBreathing);
if (stopBreathingBtn) stopBreathingBtn.addEventListener('click', stopBreathing);
if (closeBreathingModal) closeBreathingModal.onclick = () => {
    stopBreathing();
    if (breathingModal) breathingModal.style.display = 'none';
};

// ========== TIMER ==========
let timerIntervalId;
let timeLeft = 25 * 60;
let isRunning = false;
let currentMode = 'work';

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    if (timerDisplay) timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    if (startBtn) startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    
    timerIntervalId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerIntervalId);
            isRunning = false;
            if (startBtn) startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
            
            if (currentMode === 'work') {
                userData.totalPomodoros++;
                saveUserData();
                showToast(`✅ Pomodoro completed! Total: ${userData.totalPomodoros}`);
            }
            
            alert(`Time's up! ${currentMode === 'work' ? 'Take a break!' : 'Back to work!'}`);
            
            if (currentMode === 'work') switchMode('shortBreak');
            else if (currentMode === 'shortBreak') switchMode('work');
            else if (currentMode === 'longBreak') switchMode('work');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerIntervalId);
    isRunning = false;
    if (startBtn) startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
}

function resetTimer() {
    clearInterval(timerIntervalId);
    isRunning = false;
    if (startBtn) startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    switchMode(currentMode);
}

function switchMode(mode) {
    currentMode = mode;
    
    modeButtons.forEach(btn => {
        if (btn.dataset.mode === mode) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    
    if (mode === 'work') timeLeft = 25 * 60;
    else if (mode === 'shortBreak') timeLeft = 5 * 60;
    else if (mode === 'longBreak') timeLeft = 15 * 60;
    
    updateTimerDisplay();
}

if (startBtn) startBtn.addEventListener('click', startTimer);
if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
if (resetBtn) resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) {
            if (confirm('Switch mode? This will reset the timer.')) {
                pauseTimer();
                switchMode(btn.dataset.mode);
            }
        } else {
            switchMode(btn.dataset.mode);
        }
    });
});

updateTimerDisplay();

// ========== MUSIC PLAYER ==========
let isMusicPlaying = false;
let currentTrack = 0;
let currentAudio = null;

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlistItems = document.querySelectorAll('.playlist-item');
const currentSongElement = document.getElementById('currentSong');
const currentArtistElement = document.getElementById('currentArtist');

const tracks = [
    { title: "Forest Ambience", artist: "Nature Sounds", file: "forest.mp3", volume: 0.5 },
    { title: "Ocean Waves", artist: "Calming Sounds", file: "ocean.mp3", volume: 0.6 },
    { title: "Rainfall", artist: "Relaxation", file: "rain.mp3", volume: 0.5 },
    { title: "White Noise", artist: "Focus Sounds", file: "white_noise.mp3", volume: 0.4 },
    { title: "Cafe Ambience", artist: "Background Noise", file: "cafe.mp3", volume: 0.5 }
];

function initAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    const track = tracks[currentTrack];
    currentAudio = new Audio('sounds/' + track.file);
    currentAudio.loop = true;
    currentAudio.volume = track.volume;
    updateMusicUI();
}

function playPauseMusic() {
    if (!currentAudio) initAudio();
    if (isMusicPlaying) {
        currentAudio.pause();
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isMusicPlaying = false;
    } else {
        currentAudio.play().catch(e => console.log("Play failed"));
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isMusicPlaying = true;
    }
}

function changeTrack(direction) {
    const wasPlaying = isMusicPlaying;
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    if (direction === 'next') currentTrack = (currentTrack + 1) % tracks.length;
    else currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    initAudio();
    if (wasPlaying) {
        currentAudio.play().catch(e => console.log("Play failed"));
        isMusicPlaying = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function updateMusicUI() {
    playlistItems.forEach((item, index) => {
        if (index === currentTrack) item.classList.add('active');
        else item.classList.remove('active');
    });
    if (currentSongElement) currentSongElement.textContent = tracks[currentTrack].title;
    if (currentArtistElement) currentArtistElement.textContent = tracks[currentTrack].artist;
}

if (playBtn) playBtn.addEventListener('click', playPauseMusic);
if (prevBtn) prevBtn.addEventListener('click', () => changeTrack('prev'));
if (nextBtn) nextBtn.addEventListener('click', () => changeTrack('next'));

playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (currentTrack === index && currentAudio) {
            playPauseMusic();
        } else {
            const wasPlaying = isMusicPlaying;
            if (currentAudio) {
                currentAudio.pause();
                currentAudio = null;
            }
            currentTrack = index;
            initAudio();
            if (wasPlaying) {
                currentAudio.play().catch(e => console.log("Play failed"));
                isMusicPlaying = true;
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
    });
});

initAudio();

// ========== TASK MANAGER ==========
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

try {
    const saved = localStorage.getItem('productivibe_tasks');
    if (saved) tasks = JSON.parse(saved);
} catch(e) { console.log("Could not load tasks"); }

function saveTasks() {
    localStorage.setItem('productivibe_tasks', JSON.stringify(tasks));
}

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<div style="text-align: center; color: #94a3b8; padding: 30px;">✨ Click "Add Task" to start earning rewards!</div>';
        return;
    }
    
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item' + (task.completed ? ' completed' : '');
        taskDiv.innerHTML = `
            <div class="task-checkbox" style="cursor: pointer; ${task.completed ? 'background-color: #10b981; border-color: #10b981;' : ''}">
                ${task.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="task-text">${escapeHtml(task.text)}</div>
            <div class="task-delete" style="cursor: pointer;">
                <i class="fas fa-trash"></i>
            </div>
        `;
        
        const checkbox = taskDiv.querySelector('.task-checkbox');
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (tasks[index].completed) {
                tasks[index].completed = false;
                userData.totalTasksCompleted--;
                saveUserData();
                saveTasks();
                renderTasks();
                updateLevelBanner();
                updateAnimalCompanion();
                showToast(`↩️ Task un-completed`);
            } else {
                tasks[index].completed = true;
                userData.totalTasksCompleted++;
                saveUserData();
                saveTasks();
                renderTasks();
                updateLevelBanner();
                updateAnimalCompanion();
                checkLevelUp();
                showToast(`✅ Task completed! Total: ${userData.totalTasksCompleted} tasks done!`);
            }
        });
        
        const deleteBtn = taskDiv.querySelector('.task-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            updateLevelBanner();
            showToast(`🗑️ Task removed`);
        });
        
        taskList.appendChild(taskDiv);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        showToast('📝 Please enter a task');
        return;
    }
    tasks.push({ text: text, completed: false, id: Date.now() });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
    showToast(`➕ Task added: "${text}"`);
}

if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
if (taskInput) taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

// ========== HABIT TRACKER WITH UNIFIED CALENDAR ==========

function loadHabits() {
    try {
        const saved = localStorage.getItem('productivibe_habits');
        if (saved) {
            habits = JSON.parse(saved);
        }
    } catch(e) { console.log("Could not load habits"); }
}

function saveHabits() {
    localStorage.setItem('productivibe_habits', JSON.stringify(habits));
}

function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

function isHabitCompletedToday(habit) {
    const today = getTodayDateString();
    return habit.completions && habit.completions[today] === true;
}

function markHabitCompletedToday(habit, completed = true) {
    const today = getTodayDateString();
    if (!habit.completions) habit.completions = {};
    
    if (completed && !habit.completions[today]) {
        habit.completions[today] = true;
        updateHabitStreak(habit);
        showToast(`✅ ${habit.name} completed for today!`);
    } else if (!completed && habit.completions[today]) {
        delete habit.completions[today];
        updateHabitStreak(habit);
        showToast(`↩️ ${habit.name} un-completed for today`);
    }
    
    saveHabits();
    renderHabitTracker();
}

function updateHabitStreak(habit) {
    if (!habit.completions) habit.completions = {};
    
    let currentStreak = 0;
    let bestStreak = 0;
    
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);
    
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (habit.completions[dateStr]) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    const dates = Object.keys(habit.completions).sort();
    let tempStreak = 0;
    let prevDate = null;
    
    for (const dateStr of dates) {
        const currentDate = new Date(dateStr);
        if (prevDate) {
            const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        } else {
            tempStreak = 1;
        }
        
        bestStreak = Math.max(bestStreak, tempStreak);
        prevDate = currentDate;
    }
    
    habit.currentStreak = currentStreak;
    habit.bestStreak = Math.max(habit.bestStreak || 0, bestStreak);
}

function getHabitIcon(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('meditat')) return 'fa-spa';
    if (lowerName.includes('exercise') || lowerName.includes('workout')) return 'fa-dumbbell';
    if (lowerName.includes('read')) return 'fa-book';
    if (lowerName.includes('water') || lowerName.includes('hydrat')) return 'fa-tint';
    if (lowerName.includes('walk')) return 'fa-walking';
    if (lowerName.includes('sleep')) return 'fa-moon';
    if (lowerName.includes('journal')) return 'fa-pen';
    return 'fa-star';
}

// Generate unified calendar showing ALL habits with colored dots
function generateUnifiedCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    let calendarHTML = `
        <div class="unified-calendar">
            <div class="calendar-header">
                <button class="calendar-nav" id="prevMonthBtn"><i class="fas fa-chevron-left"></i></button>
                <span class="calendar-month-year">${today.toLocaleString('default', { month: 'long' })} ${currentYear}</span>
                <button class="calendar-nav" id="nextMonthBtn"><i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="calendar-weekdays">
                <div class="calendar-weekday">S</div>
                <div class="calendar-weekday">M</div>
                <div class="calendar-weekday">T</div>
                <div class="calendar-weekday">W</div>
                <div class="calendar-weekday">T</div>
                <div class="calendar-weekday">F</div>
                <div class="calendar-weekday">S</div>
            </div>
            <div class="calendar-days" id="calendarDays">
    `;
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarHTML += `<div class="calendar-day-cell empty"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = day === today.getDate();
        
        // Collect all habit completions for this date
        let dotsHTML = '';
        for (const habit of habits) {
            if (habit.completions && habit.completions[dateStr] === true) {
                const habitColor = habit.color || "#6366f1";
                dotsHTML += `<span class="calendar-dot" style="background: ${habitColor};"></span>`;
            }
        }
        
        calendarHTML += `
            <div class="calendar-day-cell ${isToday ? 'today' : ''}" data-date="${dateStr}">
                <span class="day-number">${day}</span>
                <div class="calendar-dots-container">${dotsHTML}</div>
            </div>
        `;
    }
    
    calendarHTML += `
            </div>
        </div>
    `;
    
    return calendarHTML;
}

function renderHabitTracker() {
    const habitsList = document.getElementById('habitsList');
    if (!habitsList) return;
    
    // Render unified calendar first
    const calendarHTML = generateUnifiedCalendar();
    
    if (habits.length === 0) {
        habitsList.innerHTML = `
            ${calendarHTML}
            <div class="empty-habits" style="margin-top: 20px;">✨ No habits yet. Create your first habit above!</div>
        `;
    } else {
        let habitsHTML = calendarHTML;
        
        // Add habit cards below calendar
        habitsHTML += `<div class="habits-cards-container">`;
        habits.forEach((habit, index) => {
            const completedToday = isHabitCompletedToday(habit);
            const targetText = habit.target ? `${habit.target} ${habit.unit}` : `${habit.target || 1} ${habit.unit || 'time'}`;
            const habitColor = habit.color || "#6366f1";
            
            habitsHTML += `
                <div class="habit-card" style="border-left: 4px solid ${habitColor};">
                    <div class="habit-card-header">
                        <span class="habit-name">
                            <i class="fas ${getHabitIcon(habit.name)}" style="color: ${habitColor};"></i>
                            ${escapeHtml(habit.name)}
                        </span>
                        <span class="habit-target">🎯 ${targetText}/day</span>
                        <span class="habit-delete-icon" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </span>
                    </div>
                    <div class="habit-stats-row">
                        <span><i class="fas fa-fire" style="color: ${habitColor};"></i> ${habit.currentStreak || 0} days</span>
                        <span><i class="fas fa-trophy"></i> Best: ${habit.bestStreak || 0}</span>
                        <span><i class="fas fa-check-circle"></i> ${habit.completions ? Object.keys(habit.completions).length : 0} total</span>
                    </div>
                    <div class="habit-actions">
                        <button class="habit-check-btn ${completedToday ? 'completed' : ''}" data-index="${index}">
                            ${completedToday ? '✅ Done Today' : '✓ Mark Done'}
                        </button>
                    </div>
                </div>
            `;
        });
        habitsHTML += `</div>`;
        habitsList.innerHTML = habitsHTML;
    }
    
    // Attach event listeners
    document.querySelectorAll('.habit-check-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.dataset.index);
            if (!isNaN(index) && habits[index] && !isHabitCompletedToday(habits[index])) {
                markHabitCompletedToday(habits[index], true);
            }
        });
    });
    
    document.querySelectorAll('.habit-delete-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const index = parseInt(icon.dataset.index);
            if (!isNaN(index) && confirm(`Delete "${habits[index].name}"?`)) {
                habits.splice(index, 1);
                saveHabits();
                renderHabitTracker();
                showToast(`🗑️ Habit deleted`);
            }
        });
    });
    
    // Calendar navigation
    const prevBtn = document.getElementById('prevMonthBtn');
    const nextBtn = document.getElementById('nextMonthBtn');
    if (prevBtn) {
        prevBtn.onclick = () => navigateCalendar(-1);
    }
    if (nextBtn) {
        nextBtn.onclick = () => navigateCalendar(1);
    }
}

let currentCalendarDate = new Date();

function navigateCalendar(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    renderHabitTracker();
}

function addHabit() {
    const habitName = document.getElementById('habitNameInput');
    const habitTarget = document.getElementById('habitTargetInput');
    const habitUnit = document.getElementById('habitUnitInput');
    const habitColor = document.getElementById('habitColorInput');
    
    const name = habitName.value.trim();
    const target = parseInt(habitTarget.value) || 1;
    const unit = habitUnit.value.trim() || 'time';
    const color = habitColor.value;
    
    if (name === '') {
        showToast('📝 Please enter a habit name');
        return;
    }
    
    habits.push({
        name: name,
        target: target,
        unit: unit,
        color: color,
        completions: {},
        currentStreak: 0,
        bestStreak: 0,
        createdAt: new Date().toISOString()
    });
    
    saveHabits();
    renderHabitTracker();
    
    habitName.value = '';
    habitTarget.value = '1';
    habitUnit.value = 'times';
    document.getElementById('colorPreview').style.background = "#6366f1";
    habitColor.value = "#6366f1";
    habitName.focus();
    
    showToast(`➕ Habit added: "${name}"`);
}

// Update color preview
const habitColorInput = document.getElementById('habitColorInput');
const colorPreview = document.getElementById('colorPreview');
if (habitColorInput && colorPreview) {
    habitColorInput.addEventListener('input', () => {
        colorPreview.style.background = habitColorInput.value;
    });
}

// ========== HABIT MODALS ==========
const habitsModal = document.getElementById('habitsModal');
const habitsBtn = document.getElementById('habitsBtn');
const closeHabitsModal = document.getElementById('closeHabitsModal');
const addHabitBtn = document.getElementById('addHabitBtn');

if (habitsBtn) {
    habitsBtn.onclick = () => {
        if (habitsModal) habitsModal.style.display = 'flex';
        currentCalendarDate = new Date();
        renderHabitTracker();
    };
}

if (closeHabitsModal) {
    closeHabitsModal.onclick = () => {
        if (habitsModal) habitsModal.style.display = 'none';
    };
}

if (addHabitBtn) {
    addHabitBtn.addEventListener('click', addHabit);
}

window.onclick = (e) => {
    if (e.target === habitsModal) habitsModal.style.display = 'none';
};

// ========== STATS MODAL ==========
function showStatsModal() {
    const progress = getProgressToNextLevel();
    const currentLevelData = levelRequirements[userData.level];
    const nextLevelData = levelRequirements[userData.level + 1];
    const today = new Date().toDateString();
    const challengeCompleted = userData.completedChallenges.includes(today);
    
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
    
    modal.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 15px; max-width: 400px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: var(--primary); margin-bottom: 20px;">📊 Your Productivity Stats</h2>
            
            <div style="margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 10px;">
                <strong>🐾 Your Companion:</strong> ${currentLevelData.animal} ${currentLevelData.animalName}
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 10px;">
                <strong>🔥 Daily Streak:</strong> ${userData.streak} day${userData.streak !== 1 ? 's' : ''}
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 10px;">
                <strong>✅ Tasks Completed:</strong> ${userData.totalTasksCompleted}
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 10px;">
                <strong>⏱️ Pomodoro Sessions:</strong> ${userData.totalPomodoros}
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 10px;">
                <strong>🏆 Current Level:</strong> ${userData.level} - ${currentLevelData.name}
            </div>
            <div style="margin-bottom: 15px; padding: 10px; background: #dbeafe; border-radius: 10px;">
                <strong>✨ Daily Challenge:</strong> ${challengeCompleted ? '✅ Completed today!' : '⏳ Not yet completed'}
            </div>
            ${nextLevelData ? `
            <div style="margin-bottom: 15px; padding: 10px; background: #fef3c7; border-radius: 10px;">
                <strong>⭐ Next Level:</strong> ${nextLevelData.name}<br>
                <strong>📋 Progress:</strong> ${progress.completed}/${progress.needed} tasks<br>
                <div style="background: #e2e8f0; height: 8px; border-radius: 10px; margin-top: 8px;">
                    <div style="background: #f59e0b; width: ${progress.percentage}%; height: 100%; border-radius: 10px;"></div>
                </div>
                <small>${progress.needed - progress.completed} more tasks to level up!</small>
            </div>
            ` : '<div style="margin-bottom: 15px; padding: 10px; background: #10b981; border-radius: 10px;">🏆 MAX LEVEL! You are a Productivity Legend! 🏆</div>'}
            
            <div style="margin: 20px 0; border-top: 2px solid #e2e8f0; padding-top: 15px;">
                <button id="resetProgressBtn" style="width: 100%; padding: 12px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    🔄 Reset All Progress
                </button>
                <p style="font-size: 0.7rem; color: #94a3b8; text-align: center; margin-top: 8px;">⚠️ This will erase all your tasks, habits, and level progress</p>
            </div>
            
            <button id="modalClose" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('modalClose').onclick = () => modal.remove();
    const resetBtn = document.getElementById('resetProgressBtn');
    if (resetBtn) resetBtn.onclick = () => {
        modal.remove();
        resetAllProgress();
    };
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ========== FEATURE BUTTONS ==========
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;`;
    modal.innerHTML = `
        <div style="background: white; padding: 25px; border-radius: 15px; max-width: 400px; width: 90%;">
            <h3 style="margin-bottom: 15px; color: var(--primary);">${title}</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${content}</p>
            <button id="modalClose" style="margin-top: 20px; padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('modalClose').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

const statsBtn = document.getElementById('statsBtn');
if (statsBtn) statsBtn.onclick = showStatsModal;

const quotesCompleteBtn = document.getElementById('quotesBtn');
if (quotesCompleteBtn) quotesCompleteBtn.onclick = markChallengeComplete;

// ========== INITIALIZE ==========
loadUserData();
loadBackground();
renderTasks();
loadHabits();
renderHabitTracker();
loadQuoteInterval();
loadDailyQuote();
updateChallengeCard();

if (colorPreview) colorPreview.style.background = "#6366f1";

console.log('✅ ProductiVibe fully loaded!');