// ============================================
// ROMANTIC PAGE — INTERACTIVE LOGIC
// ============================================

// YouTube Player Setup
let ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: 'Xno24NdFZiI',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'Xno24NdFZiI' // Required for loop to work
        }
    });
}

const SECRET_PASSWORD = 'روري';

// ============================================
// PASSWORD CHECK
// ============================================
function checkPassword() {
    const input = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('errorMsg');
    const passwordScreen = document.getElementById('passwordScreen');
    const mainContent = document.getElementById('mainContent');

    const value = input.value.trim();

    if (value === SECRET_PASSWORD) {
        // Correct password — transition
        errorMsg.textContent = '';
        
        // Play YouTube background music
        if (typeof ytPlayer !== 'undefined' && ytPlayer.playVideo) {
            ytPlayer.playVideo();
        }

        // Launch confetti burst
        launchConfetti();

        // Fade out password screen
        passwordScreen.classList.add('fade-out');

        setTimeout(() => {
            passwordScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Start intensive floating hearts
            startRomanticHearts();
            
            // Start flying animations
            createFlyingOrbs();
            createShootingStars();
        }, 800);

    } else {
        // Wrong password
        errorMsg.textContent = '💔 كلمة السر غلط... حاول تاني';
        errorMsg.classList.remove('shake');
        void errorMsg.offsetWidth; // force reflow
        errorMsg.classList.add('shake');

        // Shake the input too
        input.style.animation = 'none';
        void input.offsetWidth;
        input.style.animation = 'shakeError 0.5s ease';
        setTimeout(() => {
            input.style.animation = 'none';
        }, 500);
    }
}

// Enter key support
document.getElementById('passwordInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// ============================================
// FLOATING HEARTS
// ============================================
function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.classList.add('float-heart');

    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '🤍', '💞', '🩷'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Random position and animation settings
    const leftPos = Math.random() * 100;
    const size = 0.8 + Math.random() * 1.5;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * 2;
    const sway = (Math.random() - 0.5) * 100;

    heart.style.left = `${leftPos}%`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.setProperty('--sway', `${sway}px`);

    container.appendChild(heart);

    // Remove after animation completes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Start subtle floating hearts on password screen
function startSubtleHearts() {
    setInterval(() => {
        createFloatingHeart();
    }, 3000);
}

// More hearts after unlock
function startRomanticHearts() {
    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingHeart(), i * 200);
    }

    // Continuous hearts
    setInterval(() => {
        createFloatingHeart();
    }, 1200);
}

// ============================================
// PARTICLES / STARS BACKGROUND
// ============================================
function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 480 ? 30 : 50;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${1 + Math.random() * 2}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${2 + Math.random() * 4}s`;
        particle.style.animationDelay = `${Math.random() * 3}s`;

        container.appendChild(particle);
    }
}

// ============================================
// CONFETTI BURST
// ============================================
function launchConfetti() {
    const colors = ['#ff2d55', '#ff6b8a', '#e0245e', '#ff9eb5', '#ffffff', '#ffb6c1', '#ff69b4'];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = `${40 + Math.random() * 20}%`;
        confetti.style.top = `${30 + Math.random() * 20}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${4 + Math.random() * 8}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = `${1 + Math.random() * 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        // Random spread direction
        const spreadX = (Math.random() - 0.5) * 300;
        const spreadY = (Math.random() - 0.5) * 200;
        confetti.style.setProperty('--spreadX', `${spreadX}px`);
        confetti.style.setProperty('--spreadY', `${spreadY}px`);

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ============================================
// MAGIC MESSAGES
// ============================================
const sweetMessages = [
    "وجودك بيخلي الحاجات العادية، حاجات مميزة جداً ✨",
    "يارب الابتسامة دي متفارقش وشك أبداً 🌸",
    "فيكي رقة وطيبة يخطفوا قلب أي حد 🥺",
    "مبسوط جداً إن الصدفة جمعتني بيكي 🤍",
    "خليكي متأكدة إنك حد جميل جداً من جوة ومن برة 💖",
    "كلامك الحلو بيريح القلب ويطمنه 🥺"
];

function showMagicMessage() {
    const msgElement = document.getElementById('magicMessageText');
    
    // Pick a message different from current
    let randomMsg;
    do {
        randomMsg = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
    } while (randomMsg === msgElement.textContent && sweetMessages.length > 1);
    
    // Animate out
    msgElement.classList.remove('show');
    
    setTimeout(() => {
        msgElement.textContent = randomMsg;
        // Animate in
        msgElement.classList.add('show');
        
        // Add a little pop of small hearts at the button
        createFloatingHeart();
        createFloatingHeart();
    }, 400);
}

// ============================================
// FLYING ORBS & SHOOTING STARS
// ============================================
function createFlyingOrbs() {
    const container = document.createElement('div');
    container.classList.add('flying-orbs-container');
    document.body.appendChild(container);

    setInterval(() => {
        const orb = document.createElement('div');
        orb.classList.add('flying-orb');
        
        // Randomly start from left or right
        const startLeft = Math.random() > 0.5;
        orb.style.top = `${Math.random() * 80 + 10}%`; // 10% to 90% vertical
        
        if (startLeft) {
            orb.style.left = '-10%';
            orb.style.animationName = 'flyRight';
        } else {
            orb.style.right = '-10%';
            orb.style.animationName = 'flyLeft';
        }

        // Randomize speed and size
        const duration = 12 + Math.random() * 15; // 12s to 27s
        orb.style.animationDuration = `${duration}s`;
        
        const size = 5 + Math.random() * 15; // 5px to 20px
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        // Random glow color
        const colors = ['#ff2d55', '#ffffff', '#ff6b8a', '#ff9eb5', '#ffc107'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        orb.style.backgroundColor = color;
        orb.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`;

        container.appendChild(orb);

        // Remove after animation
        setTimeout(() => orb.remove(), duration * 1000);
    }, 1200); // Create a new orb every 1.2 seconds
}

function createShootingStars() {
    const container = document.createElement('div');
    container.classList.add('shooting-stars-container');
    document.body.appendChild(container);

    setInterval(() => {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        star.style.top = `${Math.random() * 50}%`; // Top half of screen
        
        container.appendChild(star);
        setTimeout(() => star.remove(), 2500);
    }, 3500); // New shooting star every 3.5 seconds
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    startSubtleHearts();
});
