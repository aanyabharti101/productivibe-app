// ==============================
// PRODUCTIVIBE - COMPLETE WITH ANIMALS, QUOTES & BREATHING
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
        { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
        { text: "Your limitation—it's only your imagination.", author: "Unknown" },
        { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
        { text: "Great things never come from comfort zones.", author: "Unknown" },
        { text: "Dream it. Wish it. Do it.", author: "Unknown" },
        { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" }
    ],
    selfcare: [
        { text: "Rest when you're weary. Refresh and renew yourself.", author: "Oprah Winfrey" },
        { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brown" },
        { text: "Almost everything will work again if you unplug it for a few minutes.", author: "Anne Lamott" },
        { text: "Be patient with yourself. Self-growth is tender.", author: "Unknown" },
        { text: "Talk to yourself like you would to someone you love.", author: "Brené Brown" },
        { text: "You owe yourself the love that you so freely give to others.", author: "Unknown" }
    ],
    confidence: [
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. McIntyre" },
        { text: "You are enough just as you are.", author: "Meghan Markle" },
        { text: "With confidence, you have won before you have started.", author: "Marcus Garvey" },
        { text: "The most beautiful thing you can wear is confidence.", author: "Blake Lively" }
    ],
    career: [
        { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius" },
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
        { text: "Your work is to discover your work and then with all your heart to give yourself to it.", author: "Buddha" }
    ],
    famous: [
        { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
    ]
};

// ========== DAILY AFFIRMATIONS / RANDOM ACTS ==========
const dailyChallenges = [
    { icon: "💧", text: "Drink a glass of water right now!", color: "#3b82f6" },
    { icon: "🧘", text: "Take 3 deep breaths and stretch", color: "#10b981" },
    { icon: "📝", text: "Write down 3 things you're grateful for", color: "#f59e0b" },
    { icon: "🚶", text: "Stand up and walk for 1 minute", color: "#8b5cf6" },
    { icon: "🎧", text: "Listen to a song that makes you happy", color: "#ec4899" },
    { icon: "📖", text: "Read something inspiring for 2 minutes", color: "#06b6d4" },
    { icon: "💬", text: "Send a kind message to someone", color: "#22c55e" },
    { icon: "🧹", text: "Tidy up one small area of your workspace", color: "#eab308" },
    { icon: "🎯", text: "Review your top goal for today", color: "#ef4444" },
    { icon: "🌿", text: "Step outside for fresh air (1 minute)", color: "#14b8a6" }
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

// Helper functions for level calculation
function getTasksForLevel(level) {
    let total = 0;
    for (let i = 1; i <= level; i++) {
        if (levelRequirements[i]) {
            total += levelRequirements[i].tasksNeeded;
        }
    }
    return total;
}

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

// Load user data
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
    let newLevel = userData.level;
    let totalNeeded = 0;
    
    for (let i = 1; i <= newLevel + 1; i++) {
        if (levelRequirements[i]) {
            totalNeeded += levelRequirements[i].tasksNeeded;
        }
    }
    
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
    toast.innerHTML = `<div style="position: fixed; bottom: 20px; right: 20px; background: var(--secondary); color: white; padding: 12px 20px; border-radius: 10px; z-index: 10000; animation: slideIn 0.3s ease;">${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== RESET PROGRESS FUNCTION ==========
function resetAllProgress() {
    if (confirm("⚠️ WARNING: This will reset ALL your progress!\n\nThis includes:\n- Your level (back to Level 1)\n- All completed tasks\n- Your streak counter\n- Pomodoro sessions\n\nAre you ABSOLUTELY sure?")) {
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
            saveTasks();
            saveUserData();
            
            document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
            localStorage.removeItem('productivibe_bg');
            
            renderTasks();
            updateLevelBanner();
            updateAnimalCompanion();
            updateChallengeCard();
            
            showToast("🔄 Progress has been reset! Starting fresh!");
            
            const modal = document.querySelector('.stats-modal');
            if (modal) modal.remove();
        }
    }
}

// ========== DAILY CHALLENGE SYSTEM ==========
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
        challengeCard.style.borderLeftColor = challenge.color;
    }
}

function markChallengeComplete() {
    const today = new Date().toDateString();
    if (!userData.completedChallenges.includes(today)) {
        userData.completedChallenges.push(today);
        saveUserData();
        showToast(`✨ Challenge complete! +1 productivity point!`);
        updateChallengeCard();
        
        // Add a little celebration
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

// ========== TASK MANAGER (with un-complete feature) ==========
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
            <div class="task-text" style="${task.completed ? 'text-decoration: line-through; color: #94a3b8;' : ''}">
                ${escapeHtml(task.text)}
            </div>
            <div class="task-delete" style="cursor: pointer; color: #94a3b8;">
                <i class="fas fa-trash"></i>
            </div>
        `;
        
        const checkbox = taskDiv.querySelector('.task-checkbox');
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // TOGGLE completion (allow un-completing!)
            if (tasks[index].completed) {
                // UN-COMPLETE task
                tasks[index].completed = false;
                userData.totalTasksCompleted--;
                saveUserData();
                saveTasks();
                renderTasks();
                updateLevelBanner();
                updateAnimalCompanion();
                showToast(`↩️ Task un-completed. Total tasks: ${userData.totalTasksCompleted}`);
            } else {
                // COMPLETE task
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
            if (tasks[index].completed) {
                userData.totalTasksCompleted--;
                saveUserData();
            }
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

// ========== STATS MODAL WITH RESET BUTTON ==========
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
                <button id="resetProgressBtn" style="width: 100%; padding: 12px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                    🔄 Reset All Progress
                </button>
                <p style="font-size: 0.7rem; color: #94a3b8; text-align: center; margin-top: 8px;">⚠️ This will erase all your tasks and level progress</p>
            </div>
            
            <button id="modalClose" style="width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; margin-top: 10px;">
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
const habitsBtn = document.getElementById('habitsBtn');
const quotesBtn = document.getElementById('quotesBtn');

if (statsBtn) statsBtn.onclick = showStatsModal;
if (habitsBtn) habitsBtn.onclick = () => showModal('📅 Habit Tracker', 'Track daily habits:\n\n✅ Morning meditation\n✅ Exercise\n✅ Reading\n✅ Hydration\n\n🚧 Full feature coming soon!');
if (quotesBtn) quotesBtn.onclick = markChallengeComplete;

// ========== INITIALIZE ==========
loadUserData();
loadBackground();
renderTasks();
loadQuoteInterval();
loadDailyQuote();
updateChallengeCard();

console.log('✅ ProductiVibe fully loaded!');
console.log(`🐾 Companion: ${levelRequirements[userData.level].animal} ${levelRequirements[userData.level].animalName}`);
console.log(`🔥 Streak: ${userData.streak} days`);
console.log(`🏆 Level: ${userData.level}`);