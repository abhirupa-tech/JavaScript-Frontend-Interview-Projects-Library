// Constants
const cardHideColor = 'bg-neutral-400';
const isShown = 'isShown';

// Game state variables
let isSecondCardFlipped = false;
let lastCardClicked = -1;
let gameStatus;
let countDownTimer;
let timerTimeout;
let time = 60; // Initial countdown time
let matchedPairs = 0;
let flippingInProgress = false;

// DOM elements
let gameStatusMessage = document.getElementById('finalMessage');
let timer = document.querySelector('#timer');

// Color list for cards
let colorList = [
    'bg-amber-600',
    'bg-lime-500',
    'bg-cyan-400',
    'bg-yellow-400',
    'bg-neutral-600', // Black card
    'bg-amber-600',
    'bg-cyan-400',
    'bg-lime-500',
    'bg-yellow-400'
];

// Emulating an Enum for GameStatus
const GameStatus = Object.freeze({
    START: 'You are yet to begin!',
    IN_PROGRESS: 'Every move counts. Do not stop now!',
    WIN: 'Victory is yours! Time to bask in the glory.',
    LOSE: 'Sorry! Game Over!'
});

/** Renders all the cards initially and then attaches click listeners */
const renderGameCards = () => {
    const container = document.getElementById("grid");
    for (let i = 0; i < 9; i++) {
        const child = document.createElement('div');
        child.id = 'card_' + i;
        child.className = "card bg-neutral-400 w-fill h-20 cursor-pointer hover:shadow-lg rounded-lg border hover:border-neutral-800 flex items-center justify-center";
        child.addEventListener("click", () => handleCardClick(child, i));
        container.appendChild(child);
    }
};

/** Handles the card click event. */
const handleCardClick = (child, i) => {
    if (flippingInProgress) return; // Prevent clicks during flip animation

    const color = colorList[i];
    if (gameStatus === GameStatus.START) {
        startGame();
    }

    const unMatchedCard = getUnmatchedCard();
    const lastCardColor = getLastCardColor(unMatchedCard);

    showCard(child, color);

    if (color === 'bg-neutral-600') { // Black card clicked
        endGame(GameStatus.LOSE);
        return;
    }

    if (color === lastCardColor) {
        matchedPairs++;
        markCardMatched(child);
        markCardMatched(unMatchedCard);

        if (matchedPairs === Math.floor(colorList.length / 2)) {
            endGame(GameStatus.WIN);
            return;
        }
        updateLastCardClicked(i);
        return;
    }

    if (shouldFlipBackCards(unMatchedCard, color, lastCardColor)) {
        flippingInProgress = true;
        setTimeout(() => {
            flipBackCards(child, unMatchedCard, color, lastCardColor);
            flippingInProgress = false;
        }, 1000);
    }

    updateLastCardClicked(i);
};

/** Gets the unmatched card element. */
const getUnmatchedCard = () => {
    return lastCardClicked !== -1 ? document.getElementById('card_' + lastCardClicked) : null;
};

/** Gets the color of the last card clicked. */
const getLastCardColor = (unMatchedCard) => {
    return unMatchedCard && unMatchedCard.classList.contains(isShown) ? colorList[lastCardClicked] : null;
};

/** Shows the clicked card by adding the appropriate classes. */
const showCard = (child, color) => {
    child.classList.add(color, isShown);
    child.classList.remove(cardHideColor);
};

/** Marks a card as matched by setting an attribute. */
const markCardMatched = (card) => {
    card.setAttribute('data-matched', 'true');
};

/** Updates the last card clicked and toggles the second card flipped state. */
const updateLastCardClicked = (i) => {
    lastCardClicked = i;
    isSecondCardFlipped = !isSecondCardFlipped;
};

/** Determines if the cards should be flipped back. */
const shouldFlipBackCards = (unMatchedCard, color, lastCardColor) => {
    return isSecondCardFlipped && unMatchedCard && unMatchedCard.classList.contains(isShown) && color !== lastCardColor && lastCardClicked !== -1;
};

/** Flips back the clicked card and the unmatched card after a delay. */
const flipBackCards = (child, unMatchedCard, color, lastCardColor) => {
    setTimeout(() => {
        child.classList.add(cardHideColor);
        child.classList.remove(color, isShown);

        unMatchedCard.classList.add(cardHideColor);
        unMatchedCard.classList.remove(lastCardColor, isShown);
    }, 1000);
};

/** Starts the game and initializes the countdown timer. */
const startGame = () => {
    startCountDownTimer();
    gameStatus = GameStatus.IN_PROGRESS;
    gameStatusMessage.textContent = GameStatus.IN_PROGRESS;
};

/** Starts the countdown timer and sets a timeout to clear it. */
const startCountDownTimer = () => {
    countDownTimer = setInterval(() => {
        timer.textContent = --time;
    }, 1000);

    timerTimeout = setTimeout(() => {
        clearInterval(countDownTimer);
        endGame(GameStatus.LOSE);
    }, 60000);
};

/** Ends the game, freezes the main container, and displays the game status. */
const endGame = (state) => {
    gameStatus = state;
    gameStatusMessage.textContent = state;
    blockClicksOnCards();
    timer.textContent = '0';
    clearInterval(countDownTimer);
    clearTimeout(timerTimeout);
};

/** Disables click events on all card elements. */
const blockClicksOnCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
    });
};

/** Shuffles an array using the Fisher-Yates algorithm. */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/** Initializes the game by shuffling colors, setting the game status, and rendering game cards. */
const init = () => {
    colorList = shuffleArray(colorList);
    gameStatus = GameStatus.START;
    gameStatusMessage.textContent = GameStatus.START;
    renderGameCards();
};

document.addEventListener("DOMContentLoaded", init);

/** Refreshes the game if it is not in the START state. */
const refresh = () => {
    if (gameStatus !== GameStatus.START) location.reload();
};
