/**
 * The Merchant of Venice - Educational Website
 * JavaScript: Navigation, Animations, Snakes & Ladders Game
 */

/* ============================================
   LOADING ANIMATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    // Simulate loading time, then hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 2000);
});

/* ============================================
   NAVIGATION
   ============================================ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

/* ============================================
   SOUND EFFECT PLACEHOLDERS
   ============================================ */
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound && sound.querySelector('source').src) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
}

/* ============================================
   EDUCATIONAL QUESTIONS (20+)
   ============================================ */
const QUESTIONS = [
    {
        question: "In what year was William Shakespeare born?",
        options: ["1564", "1600", "1588", "1616"],
        correct: 0
    },
    {
        question: "Where was Shakespeare born?",
        options: ["London", "Stratford-upon-Avon", "Oxford", "Venice"],
        correct: 1
    },
    {
        question: "What is the name of the merchant in the play?",
        options: ["Bassanio", "Antonio", "Shylock", "Lorenzo"],
        correct: 1
    },
    {
        question: "Who is the Jewish moneylender in the play?",
        options: ["Antonio", "Gratiano", "Shylock", "Launcelot"],
        correct: 2
    },
    {
        question: "How much money does Antonio borrow from Shylock?",
        options: ["1,000 ducats", "3,000 ducats", "5,000 ducats", "10,000 ducats"],
        correct: 1
    },
    {
        question: "What does Shylock demand if Antonio cannot repay the loan?",
        options: ["Antonio's ships", "A pound of flesh", "Antonio's house", "Double the money"],
        correct: 1
    },
    {
        question: "Who does Bassanio want to marry?",
        options: ["Jessica", "Portia", "Nerissa", "Ophelia"],
        correct: 1
    },
    {
        question: "Which casket does Bassanio choose to win Portia?",
        options: ["Gold", "Silver", "Lead", "Bronze"],
        correct: 2
    },
    {
        question: "Who is Shylock's daughter?",
        options: ["Portia", "Nerissa", "Jessica", "Juliet"],
        correct: 2
    },
    {
        question: "Who does Jessica elope with?",
        options: ["Bassanio", "Lorenzo", "Gratiano", "Antonio"],
        correct: 1
    },
    {
        question: "In what city is most of the play set?",
        options: ["London", "Rome", "Venice", "Verona"],
        correct: 2
    },
    {
        question: "What disguise does Portia use in the trial scene?",
        options: ["A nurse", "A lawyer named Balthazar", "A merchant", "A priest"],
        correct: 1
    },
    {
        question: "Complete the quote: 'The quality of mercy is not _____'",
        options: ["given", "strained", "found", "lost"],
        correct: 1
    },
    {
        question: "What profession is Antonio?",
        options: ["Lawyer", "Merchant", "Soldier", "Poet"],
        correct: 1
    },
    {
        question: "Where does Portia live?",
        options: ["Venice", "Belmont", "Padua", "Florence"],
        correct: 1
    },
    {
        question: "Why does Shylock hate Antonio?",
        options: ["Antonio stole his money", "Antonio lends money without interest", "Antonio is a rival merchant", "Antonio insulted Portia"],
        correct: 1
    },
    {
        question: "What happens to Shylock at the end of the trial?",
        options: ["He is executed", "He must convert to Christianity", "He wins the case", "He leaves Venice"],
        correct: 1
    },
    {
        question: "Approximately when was The Merchant of Venice written?",
        options: ["1596–1598", "1603–1605", "1580–1582", "1610–1612"],
        correct: 0
    },
    {
        question: "Which theme is NOT central to the play?",
        options: ["Mercy", "Justice", "Space exploration", "Revenge"],
        correct: 2
    },
    {
        question: "What does Portia say Shylock may take from Antonio?",
        options: ["Blood and flesh", "Flesh only, no blood", "One pound of gold", "Nothing"],
        correct: 1
    },
    {
        question: "How many plays did Shakespeare write approximately?",
        options: ["12", "39", "100", "5"],
        correct: 1
    },
    {
        question: "What is the famous speech Shylock gives about humanity?",
        options: ["To be or not to be", "Hath not a Jew eyes?", "All the world's a stage", "Is this a dagger?"],
        correct: 1
    },
    {
        question: "Who is Antonio's closest friend in the play?",
        options: ["Shylock", "Bassanio", "Portia", "Jessica"],
        correct: 1
    },
    {
        question: "What test must Portia's suitors pass?",
        options: ["A sword fight", "Choosing the correct casket", "A riddle", "A race"],
        correct: 1
    },
    {
        question: "What genre is The Merchant of Venice classified as?",
        options: ["Tragedy only", "Comedy (with dramatic elements)", "History play", "Romance only"],
        correct: 1
    }
];

/* ============================================
   GAME CONFIGURATION
   ============================================ */
const BOARD_SIZE = 100;
const GRID_COLS = 10;

// Ladders: square -> destination (climb up)
const LADDERS = {
    4: 25,
    13: 46,
    33: 49,
    42: 63,
    50: 69,
    62: 81,
    74: 92
};

// Snakes: square -> destination (slide down)
const SNAKES = {
    27: 5,
    40: 3,
    43: 18,
    54: 31,
    66: 45,
    76: 58,
    89: 53,
    99: 41
};

// Bonus squares: move forward extra spaces
const BONUS_SQUARES = {
    7: 3,
    19: 4,
    38: 5,
    56: 3,
    71: 4,
    85: 3
};

// Penalty squares: move backward
const PENALTY_SQUARES = {
    12: 3,
    28: 4,
    47: 3,
    59: 5,
    73: 4,
    94: 3
};

// Question squares trigger educational quiz
const QUESTION_SQUARES = [6, 11, 16, 22, 29, 35, 44, 51, 57, 64, 68, 77, 82, 87, 93, 97];

// Dice face Unicode characters
const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

/* ============================================
   GAME STATE
   ============================================ */
let playerPosition = 1;
let playerScore = 0;
let correctAnswers = 0;
let isRolling = false;
let isGameOver = false;
let usedQuestions = [];

/* ============================================
   DOM ELEMENTS
   ============================================ */
const gameModal = document.getElementById('gameModal');
const openGameBtn = document.getElementById('openGameBtn');
const closeGameBtn = document.getElementById('closeGameBtn');
const gameBoard = document.getElementById('gameBoard');
const dice = document.getElementById('dice');
const rollDiceBtn = document.getElementById('rollDiceBtn');
const gameMessage = document.getElementById('gameMessage');
const questionPanel = document.getElementById('questionPanel');
const questionText = document.getElementById('questionText');
const questionOptions = document.getElementById('questionOptions');
const playerPositionEl = document.getElementById('playerPosition');
const playerScoreEl = document.getElementById('playerScore');
const correctCountEl = document.getElementById('correctCount');

/* ============================================
   MODAL CONTROLS
   ============================================ */
openGameBtn.addEventListener('click', openGame);
closeGameBtn.addEventListener('click', closeGame);

// Also open from nav "Play Game" link
document.querySelectorAll('a[href="#game"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('nav-link-game')) {
            e.preventDefault();
            openGame();
        }
    });
});

// Close on backdrop click
document.querySelector('.game-modal-backdrop').addEventListener('click', closeGame);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gameModal.classList.contains('active')) {
        closeGame();
    }
});

function openGame() {
    gameModal.classList.add('active');
    gameModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    initGame();
}

function closeGame() {
    gameModal.classList.remove('active');
    gameModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* ============================================
   BOARD HELPERS
   ============================================ */

/**
 * Convert square number (1-100) to grid row/col for display
 * Board starts at 1 (bottom-left) and ends at 100 (top-left)
 */
function getGridPosition(squareNum) {
    const rowFromTop = Math.floor((BOARD_SIZE - squareNum) / GRID_COLS);
    const colInRow = (BOARD_SIZE - squareNum) % GRID_COLS;

    let col;
    if (rowFromTop % 2 === 0) {
        col = colInRow;
    } else {
        col = GRID_COLS - 1 - colInRow;
    }

    return { row: rowFromTop + 1, col: col + 1 };
}

/**
 * Get square number for a grid cell (display order: row 0 col 0 = square 100)
 */
function getSquareNumber(row, col) {
    if (row % 2 === 0) {
        return BOARD_SIZE - row * GRID_COLS - col;
    }
    return BOARD_SIZE - row * GRID_COLS - (GRID_COLS - 1 - col);
}

/**
 * Get CSS class for special square types
 */
function getSquareClass(num) {
    if (SNAKES[num]) return 'snake-head';
    if (LADDERS[num]) return 'ladder-base';
    if (BONUS_SQUARES[num]) return 'bonus';
    if (PENALTY_SQUARES[num]) return 'penalty';
    if (QUESTION_SQUARES.includes(num)) return 'question';
    return '';
}

/**
 * Get icon for special squares
 */
function getSquareIcon(num) {
    if (SNAKES[num]) return '🐍';
    if (LADDERS[num]) return '🪜';
    if (BONUS_SQUARES[num]) return '⭐';
    if (PENALTY_SQUARES[num]) return '⚠️';
    if (QUESTION_SQUARES.includes(num)) return '❓';
    return '';
}

/* ============================================
   INITIALIZE GAME
   ============================================ */
function initGame() {
    playerPosition = 1;
    playerScore = 0;
    correctAnswers = 0;
    isRolling = false;
    isGameOver = false;
    usedQuestions = [];

    updateHUD();
    buildBoard();
    hideQuestionPanel();
    setMessage('Roll the dice to begin your journey through Venice!', 'info');
    rollDiceBtn.disabled = false;
    updateDiceDisplay(1);
}

/**
 * Build the 10x10 game board
 */
function buildBoard() {
    gameBoard.innerHTML = '';

    for (let row = 0; row < GRID_COLS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const num = getSquareNumber(row, col);
            const square = document.createElement('div');
            square.className = `board-square ${getSquareClass(num)}`;
            square.dataset.square = num;
            square.id = `square-${num}`;

            const icon = getSquareIcon(num);
            square.innerHTML = `
                <span class="square-num">${num}</span>
                ${icon ? `<span class="square-icon">${icon}</span>` : ''}
            `;

            gameBoard.appendChild(square);
        }
    }

    placeToken(playerPosition);
}

/**
 * Place or move the player token on the board
 */
function placeToken(position) {
    // Remove existing token
    document.querySelectorAll('.player-token').forEach(t => t.remove());

    const square = document.getElementById(`square-${position}`);
    if (!square) return;

    const token = document.createElement('div');
    token.className = 'player-token';
    token.id = 'playerToken';
    token.setAttribute('aria-label', `Player on square ${position}`);
    square.appendChild(token);
}

/**
 * Animate token movement step by step
 */
async function animateMovement(from, to) {
    const step = from < to ? 1 : -1;
    let current = from;

    while (current !== to) {
        current += step;
        placeToken(current);
        await delay(150);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ============================================
   HUD UPDATES
   ============================================ */
function updateHUD() {
    playerPositionEl.textContent = playerPosition;
    playerScoreEl.textContent = playerScore;
    correctCountEl.textContent = correctAnswers;
}

function setMessage(text, type = '') {
    gameMessage.textContent = text;
    gameMessage.className = 'game-message' + (type ? ` ${type}` : '');
}

/* ============================================
   DICE ROLLING
   ============================================ */
rollDiceBtn.addEventListener('click', rollDice);

async function rollDice() {
    if (isRolling || isGameOver) return;

    isRolling = true;
    rollDiceBtn.disabled = true;
    hideQuestionPanel();

    // Animate dice rolling
    dice.classList.add('rolling');
    playSound('soundDice');

    let roll = 0;
    for (let i = 0; i < 10; i++) {
        roll = Math.floor(Math.random() * 6) + 1;
        updateDiceDisplay(roll);
        await delay(80);
    }

    dice.classList.remove('rolling');
    roll = Math.floor(Math.random() * 6) + 1;
    updateDiceDisplay(roll);

    setMessage(`You rolled a ${roll}!`, 'info');
    await delay(500);

    await movePlayer(roll);

    isRolling = false;
    if (!isGameOver) {
        rollDiceBtn.disabled = false;
    }
}

function updateDiceDisplay(value) {
    dice.querySelector('.dice-face').textContent = DICE_FACES[value - 1];
    dice.setAttribute('aria-label', `Dice showing ${value}`);
}

/* ============================================
   PLAYER MOVEMENT
   ============================================ */
async function movePlayer(steps) {
    const newPosition = Math.min(playerPosition + steps, BOARD_SIZE);
    const from = playerPosition;

    await animateMovement(from, newPosition);
    playerPosition = newPosition;
    updateHUD();

    // Check win condition
    if (playerPosition >= BOARD_SIZE) {
        handleWin();
        return;
    }

    // Process special squares in order
    await processSpecialSquares();
}

/**
 * Handle snakes, ladders, bonus, penalty, and question squares
 */
async function processSpecialSquares() {
    let continueProcessing = true;

    while (continueProcessing) {
        continueProcessing = false;
        const pos = playerPosition;

        // Ladder
        if (LADDERS[pos]) {
            const dest = LADDERS[pos];
            setMessage(`🪜 Ladder! Climb from ${pos} to ${dest}!`, 'success');
            playerScore += 10;
            await delay(800);
            await animateMovement(pos, dest);
            playerPosition = dest;
            updateHUD();
            continueProcessing = true;
            continue;
        }

        // Snake
        if (SNAKES[pos]) {
            const dest = SNAKES[pos];
            setMessage(`🐍 Snake! Slide down from ${pos} to ${dest}!`, 'error');
            await delay(800);
            await animateMovement(pos, dest);
            playerPosition = dest;
            updateHUD();
            continueProcessing = true;
            continue;
        }

        // Bonus square
        if (BONUS_SQUARES[pos]) {
            const bonus = BONUS_SQUARES[pos];
            setMessage(`⭐ Bonus square! Move forward ${bonus} spaces!`, 'success');
            playerScore += 5;
            updateHUD();
            await delay(800);
            const newPos = Math.min(playerPosition + bonus, BOARD_SIZE);
            await animateMovement(playerPosition, newPos);
            playerPosition = newPos;
            updateHUD();

            if (playerPosition >= BOARD_SIZE) {
                handleWin();
                return;
            }
            continueProcessing = true;
            continue;
        }

        // Penalty square
        if (PENALTY_SQUARES[pos]) {
            const penalty = PENALTY_SQUARES[pos];
            setMessage(`⚠️ Penalty square! Move back ${penalty} spaces!`, 'error');
            await delay(800);
            const newPos = Math.max(playerPosition - penalty, 1);
            await animateMovement(playerPosition, newPos);
            playerPosition = newPos;
            updateHUD();
            continueProcessing = true;
            continue;
        }

        // Question square
        if (QUESTION_SQUARES.includes(pos)) {
            setMessage('❓ Answer a question to continue!', 'info');
            await showQuestion();
            return;
        }
    }

    setMessage(`You are on square ${playerPosition}. Roll again!`, 'info');
}

/* ============================================
   QUESTION SYSTEM
   ============================================ */
function getRandomQuestion() {
    // Reset pool if all questions used
    if (usedQuestions.length >= QUESTIONS.length) {
        usedQuestions = [];
    }

    let available = QUESTIONS.map((_, i) => i).filter(i => !usedQuestions.includes(i));
    const index = available[Math.floor(Math.random() * available.length)];
    usedQuestions.push(index);
    return { ...QUESTIONS[index], index };
}

function showQuestion() {
    return new Promise(resolve => {
        const q = getRandomQuestion();
        questionText.textContent = q.question;
        questionOptions.innerHTML = '';

        q.options.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.className = 'question-option';
            btn.textContent = option;
            btn.addEventListener('click', () => handleAnswer(i, q.correct, q.options[q.correct], resolve));
            questionOptions.appendChild(btn);
        });

        questionPanel.classList.remove('hidden');
        rollDiceBtn.disabled = true;
    });
}

function hideQuestionPanel() {
    questionPanel.classList.add('hidden');
}

async function handleAnswer(selected, correct, correctText, resolve) {
    const buttons = questionOptions.querySelectorAll('.question-option');
    buttons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        // Correct: stay on square
        buttons[selected].classList.add('correct');
        setMessage('✓ Correct! Well done, scholar!', 'success');
        playerScore += 15;
        correctAnswers++;
        updateHUD();
        playSound('soundCorrect');
    } else {
        // Wrong: move back 2-5 squares
        buttons[selected].classList.add('incorrect');
        buttons[correct].classList.add('correct');
        const penalty = Math.floor(Math.random() * 4) + 2;
        setMessage(`✗ Wrong! The answer was "${correctText}". Move back ${penalty} spaces.`, 'error');
        playSound('soundWrong');

        await delay(1500);
        hideQuestionPanel();

        const newPos = Math.max(playerPosition - penalty, 1);
        await animateMovement(playerPosition, newPos);
        playerPosition = newPos;
        updateHUD();
    }

    await delay(1500);
    hideQuestionPanel();
    rollDiceBtn.disabled = false;

    if (selected === correct) {
        setMessage(`You are on square ${playerPosition}. Roll again!`, 'info');
    }

    resolve();
}

/* ============================================
   WIN CONDITION
   ============================================ */
function handleWin() {
    isGameOver = true;
    playerScore += 50;
    updateHUD();
    playSound('soundWin');
    setMessage(`🎉 Congratulations! You reached square 100 and completed the game! Final score: ${playerScore}`, 'win');
    rollDiceBtn.disabled = true;
    placeToken(BOARD_SIZE);
}
