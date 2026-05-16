// ==============================
// POMODORO TIMER FUNCTIONALITY
// ==============================

let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let currentMode = 'work';

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Audio for timer completion
const timerCompleteAudio = new Audio('sounds/alarm.mp3');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update browser tab title when timer is running
    if (isRunning) {
        document.title = `(${minutes}:${seconds.toString().padStart(2, '0')}) ProductiVibe`;
    } else {
        document.title = 'ProductiVibe - Life Improvement App';
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            
            // Play notification sound
            playTimerCompleteSound();
            
            // Show notification
            showNotification(`Time's up! ${currentMode === 'work' ? 'Take a break!' : 'Time to work!'}`);
            
            // Auto switch to next mode
            if (currentMode === 'work') {
                switchMode('shortBreak');
            } else if (currentMode === 'shortBreak') {
                switchMode('work');
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    
    switchMode(currentMode); // Reset to current mode's default time
}

function switchMode(mode) {
    currentMode = mode;
    
    // Update active mode button
    modeButtons.forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Set time based on mode
    if (mode === 'work') {
        timeLeft = 25 * 60;
    } else if (mode === 'shortBreak') {
        timeLeft = 5 * 60;
    } else if (mode === 'longBreak') {
        timeLeft = 15 * 60;
    }
    
    updateTimerDisplay();
}

function playTimerCompleteSound() {
    // Play the timer completion sound
    timerCompleteAudio.currentTime = 0;
    timerCompleteAudio.play().catch(e => {
        console.log("Audio play failed, showing alert instead");
        // Fallback to vibration if supported
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    });
}

function showNotification(message) {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        alert(message);
        return;
    }
    
    // Check if notification permission is already granted
    if (Notification.permission === "granted") {
        new Notification(message);
    } 
    // Otherwise, ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(message);
            } else {
                alert(message);
            }
        });
    } else {
        alert(message);
    }
}

// Event Listeners for Timer
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) {
            if (!confirm('Switch mode? This will reset the timer.')) return;
            pauseTimer();
        }
        switchMode(btn.dataset.mode);
    });
});

// Initialize timer display
updateTimerDisplay();

// ==============================
// MUSIC PLAYER FUNCTIONALITY - WITH REAL SOUNDS!
// ==============================

let isMusicPlaying = false;
let currentTrack = 0;
let currentAudio = null;

const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlistItems = document.querySelectorAll('.playlist-item');
const currentSongElement = document.getElementById('currentSong');
const currentArtistElement = document.getElementById('currentArtist');

// LOCAL AMBIENCE SOUNDS 
const tracks = [
    {
        title: "Forest Ambience",
        artist: "Nature Sounds",
        icon: "fa-tree",
        file: "forest.mp3",          
        duration: "∞",
        volume: 0.5
    },
    {
        title: "Ocean Waves", 
        artist: "Calming Sounds",
        icon: "fa-water",
        file: "ocean.mp3",           
        duration: "∞", 
        volume: 0.6
    },
    {
        title: "Rainfall",
        artist: "Relaxation",
        icon: "fa-cloud-rain",
        file: "rain.mp3",            
        duration: "∞",
        volume: 0.5
    },
    {
        title: "White Noise",
        artist: "Focus Sounds",
        icon: "fas fa-fan",
        file: "white_noise.mp3",     
        duration: "∞",
        volume: 0.4
    },
    {
        title: "Cafe Ambience",
        artist: "Background Noise",
        icon: "fas fa-coffee",
        file: "cafe.mp3",            
        duration: "∞",
        volume: 0.5
    }
];

// Initialize audio - SIMPLE & WORKING
function initAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    const track = tracks[currentTrack];
    currentAudio = new Audio('sounds/' + track.file);
    currentAudio.loop = true;
    currentAudio.volume = track.volume || 0.5;
    
    // Handle loading errors
    currentAudio.addEventListener('error', (e) => {
        console.error('Failed to load:', track.file, e);
        showMusicToast(`Error loading ${track.title}`);
    });
    
    // FIX: Handle audio ending (prevents mute bugs)
    currentAudio.addEventListener('ended', () => {
        if (isMusicPlaying) {
            console.log(`Restarting ${track.file}`);
            currentAudio.currentTime = 0;
            currentAudio.play().catch(e => {
                console.log("Auto-restart failed");
            });
        }
    });
    
    // Update UI
    updateMusicUI();
}

function playPauseMusic() {
    if (!currentAudio) {
        initAudio();
    }
    
    if (isMusicPlaying) {
        // PAUSE
        currentAudio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.style.backgroundColor = 'var(--primary)';
        isMusicPlaying = false;
        showMusicToast('Music paused');
    } else {
        // PLAY - simple and reliable
        currentAudio.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.backgroundColor = 'var(--secondary)';
            isMusicPlaying = true;
            showMusicToast(`Playing: ${tracks[currentTrack].title}`);
        }).catch(e => {
            console.error("Play failed:", e);
            showMusicToast('Click play again');
        });
    }
}

function changeTrack(direction) {
    const wasPlaying = isMusicPlaying;
    
    // Pause current
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    // Change track
    if (direction === 'next') {
        currentTrack = (currentTrack + 1) % tracks.length;
    } else {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    }
    
    // Create new audio
    initAudio();
    
    // Auto-play if was playing
    if (wasPlaying) {
        currentAudio.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.style.backgroundColor = 'var(--secondary)';
            isMusicPlaying = true;
            showMusicToast(`Now: ${tracks[currentTrack].title}`);
        });
    }
}

function updateMusicUI() {
    playlistItems.forEach((item, index) => {
        if (index === currentTrack) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    currentSongElement.textContent = tracks[currentTrack].title;
    currentArtistElement.textContent = `${tracks[currentTrack].artist} • ${tracks[currentTrack].duration}`;
}

function showMusicToast(message) {
    const existingToast = document.querySelector('.music-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'music-toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .volume-container {
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f8fafc;
        border-radius: 10px;
    }
    
    .volume-slider {
        flex: 1;
        height: 6px;
        -webkit-appearance: none;
        background: #e2e8f0;
        border-radius: 3px;
        outline: none;
    }
    
    .volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--primary);
        cursor: pointer;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
`;
document.head.appendChild(style);

// Event Listeners
playBtn.addEventListener('click', playPauseMusic);
prevBtn.addEventListener('click', () => changeTrack('prev'));
nextBtn.addEventListener('click', () => changeTrack('next'));

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
                currentAudio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    playBtn.style.backgroundColor = 'var(--secondary)';
                    isMusicPlaying = true;
                    showMusicToast(`Now: ${tracks[currentTrack].title}`);
                });
            }
        }
    });
});

// Add volume control
function addVolumeControl() {
    const musicCard = document.querySelector('.card:nth-child(2)');
    
    // Remove old if exists
    const oldControl = musicCard.querySelector('.volume-container');
    if (oldControl) oldControl.remove();
    
    const volumeHTML = `
        <div class="volume-container">
            <i class="fas fa-volume-up" style="color: var(--primary);"></i>
            <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="50">
            <span id="volumeValue" style="color: var(--gray); font-size: 0.9rem; width: 40px; text-align: center;">50%</span>
            <button id="muteBtn" style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">🔊</button>
        </div>
    `;
    
    const playlist = musicCard.querySelector('.playlist');
    playlist.insertAdjacentHTML('afterend', volumeHTML);
    
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const muteBtn = document.getElementById('muteBtn');
    
    let isMuted = false;
    let lastVolume = 50;
    
    volumeSlider.addEventListener('input', function() {
        const volume = this.value / 100;
        if (currentAudio) {
            currentAudio.volume = volume * (tracks[currentTrack].volume || 0.5);
        }
        volumeValue.textContent = `${this.value}%`;
        lastVolume = this.value;
        
        if (this.value == 0) {
            muteBtn.innerHTML = '🔇';
            isMuted = true;
        } else {
            muteBtn.innerHTML = '🔊';
            isMuted = false;
        }
    });
    
    muteBtn.addEventListener('click', () => {
        if (isMuted) {
            // Unmute
            volumeSlider.value = lastVolume;
            if (currentAudio) {
                currentAudio.volume = lastVolume / 100 * (tracks[currentTrack].volume || 0.5);
            }
            volumeValue.textContent = `${lastVolume}%`;
            muteBtn.innerHTML = '🔊';
            isMuted = false;
        } else {
            // Mute
            lastVolume = volumeSlider.value;
            volumeSlider.value = 0;
            if (currentAudio) {
                currentAudio.volume = 0;
            }
            volumeValue.textContent = '0%';
            muteBtn.innerHTML = '🔇';
            isMuted = true;
        }
    });
}

// Initialize
initAudio();
addVolumeControl();

// Simple background check for audio bugs (runs every 15 seconds)
setInterval(() => {
    if (currentAudio && isMusicPlaying && currentAudio.paused) {
        console.log("Audio bug detected - trying to resume");
        currentAudio.play().catch(e => {
            console.log("Could not resume, creating new audio");
            const track = tracks[currentTrack];
            const newAudio = new Audio('sounds/' + track.file);
            newAudio.loop = true;
            newAudio.volume = track.volume || 0.5;
            newAudio.play().then(() => {
                currentAudio = newAudio;
            });
        });
    }
}, 15000);


// ==============================
// FEATURE BUTTONS FUNCTIONALITY
// ==============================

// Sound for feature button clicks
const buttonClickSound = new Audio('sounds/click.mp3');
buttonClickSound.volume = 0.2;

document.getElementById('breathingBtn').addEventListener('click', function() {
    buttonClickSound.currentTime = 0;
    buttonClickSound.play().catch(e => console.log("Sound play failed"));
    
    showFeatureModal('Breathing Exercises', 
        'Try the 4-7-8 breathing technique:\n\n1. Breathe in quietly through your nose for 4 seconds\n2. Hold your breath for 7 seconds\n3. Exhale completely through your mouth for 8 seconds\n\nRepeat 4 times for immediate relaxation.\n\nClick the play button below to start a guided session.');
    
    // Add breathing exercise audio
    setTimeout(() => {
        const modal = document.querySelector('.feature-modal');
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            const breathingAudioHTML = `
                <div style="margin-top: 20px; text-align: center;">
                    <button id="startBreathing" class="btn btn-secondary" style="margin: 10px;">
                        <i class="fas fa-play-circle"></i> Start Guided Breathing
                    </button>
                    <button id="stopBreathing" class="btn btn-outline" style="margin: 10px;">
                        <i class="fas fa-stop"></i> Stop
                    </button>
                </div>
            `;
            modalBody.insertAdjacentHTML('beforeend', breathingAudioHTML);
            
            // Add breathing exercise functionality
            const breathingAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/13/audio_af44ff1db9.mp3?filename=meditation-and-relaxation-114356.mp3');
            breathingAudio.loop = true;
            breathingAudio.volume = 0.4;
            
            document.getElementById('startBreathing').addEventListener('click', () => {
                breathingAudio.play();
                showMusicToast('Starting guided breathing session');
            });
            
            document.getElementById('stopBreathing').addEventListener('click', () => {
                breathingAudio.pause();
                breathingAudio.currentTime = 0;
                showMusicToast('Breathing session stopped');
            });
        }
    }, 100);
});

document.getElementById('statsBtn').addEventListener('click', function() {
    buttonClickSound.currentTime = 0;
    buttonClickSound.play().catch(e => console.log("Sound play failed"));
    
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    showFeatureModal('Your Productivity Stats', 
        `📊 Task Completion: ${completedTasks}/${totalTasks} (${completionRate}%)\n\n⏱️ Pomodoro sessions completed: 0\n\n📈 Focus streak: 0 days\n\n⭐ Achievement: ${completionRate >= 50 ? 'Productivity Star!' : 'Keep going!'}\n\n💡 Tip: Complete 3 Pomodoro sessions today to unlock a new achievement!`);
});

document.getElementById('habitsBtn').addEventListener('click', function() {
    buttonClickSound.currentTime = 0;
    buttonClickSound.play().catch(e => console.log("Sound play failed"));
    
    showFeatureModal('Habit Tracker', 
        'Coming soon! Track daily habits like:\n\n• Morning meditation\n• Daily exercise\n• Reading 20 pages\n• Drinking 8 glasses of water\n\nBuild streaks and watch your habits transform!\n\n🎯 Current feature in development');
});

document.getElementById('quotesBtn').addEventListener('click', function() {
    buttonClickSound.currentTime = 0;
    buttonClickSound.play().catch(e => console.log("Sound play failed"));
    
    const quotes = [
        "The future depends on what you do today. - Mahatma Gandhi",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The secret of getting ahead is getting started. - Mark Twain",
        "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        "The way to get started is to quit talking and begin doing. - Walt Disney",
        "It always seems impossible until it's done. - Nelson Mandela",
        "Productivity is never an accident. It is always the result of a commitment to excellence. - Paul J. Meyer",
        "Focus on being productive instead of busy. - Tim Ferriss",
        "The key is not to prioritize what's on your schedule, but to schedule your priorities. - Stephen Covey"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    showFeatureModal('Daily Motivation', `"${randomQuote}"\n\n💭 Take a moment to reflect on this quote.\n\n✨ You've got this!`);
});

function showFeatureModal(title, content) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'feature-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <pre>${content}</pre>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-ok">OK</button>
            </div>
        </div>
    `;
    
    // Add styles for modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 25px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f1f5f9;
    `;
    
    const modalBody = modal.querySelector('.modal-body pre');
    modalBody.style.cssText = `
        white-space: pre-wrap;
        line-height: 1.6;
        font-size: 1.1rem;
        color: var(--dark);
        padding: 15px 0;
    `;
    
    const modalFooter = modal.querySelector('.modal-footer');
    modalFooter.style.cssText = `
        margin-top: 20px;
        text-align: right;
    `;
    
    // Close buttons
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-ok');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        modalContent.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Add animation styles
    const modalStyles = document.createElement('style');
    if (!document.querySelector('#modal-styles')) {
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(30px); opacity: 0; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    document.body.appendChild(modal);
}

// ==============================
// ADDITIONAL SOUND EFFECTS
// ==============================

// Add click sounds to main buttons
const mainButtons = document.querySelectorAll('.btn:not(#addTaskBtn)');
mainButtons.forEach(button => {
    button.addEventListener('click', function() {
        const clickSound = new Audio('sounds/click.mp3');
        clickSound.volume = 0.1;
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Click sound failed"));
    });
});

// Mode switch sound
modeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const switchSound = new Audio('sounds/click.mp3');
        switchSound.volume = 0.2;
        switchSound.currentTime = 0;
        switchSound.play().catch(e => console.log("Switch sound failed"));
    });
});

// ==============================
// INITIALIZE THE APP
// ==============================

console.log('ProductiVibe app initialized with sounds! 🎵');
console.log('Real audio tracks loaded from Pixabay');
console.log('Timer completion sound enabled');
console.log('Task completion sounds enabled');
console.log('Button click sounds enabled');

// Ask for notification permission on load
if ("Notification" in window && Notification.permission === "default") {
    setTimeout(() => {
        if (confirm("Allow notifications for timer alerts?")) {
            Notification.requestPermission();
        }
    }, 2000);
}

// Add internet connection check
window.addEventListener('online', () => {
    showMusicToast('Connection restored! Sounds are working.');
});

window.addEventListener('offline', () => {
    showMusicToast('No internet connection. Some sounds may not work.');
});