import { Questions } from './Questions.js'; // Importing the Questions array from Questions.js

const hintButton = document.getElementById("hint-button"); // Getting the hint button element
const hintText = document.getElementById("hint-text"); // Getting the hint text element
const options = document.querySelectorAll('.option'); // Getting all option elements
const question = document.getElementById('question'); // Getting the question element
const score = document.getElementById('score'); // Getting the score element
const finalScore = document.getElementById('score-number'); // Getting the final score element
const timer = document.getElementById('timer'); // Getting the timer element
const gameOver = document.getElementById('gameOverNotif'); // Getting the game over notification element
const restart = document.getElementById('restart-game'); // Getting the restart button element

// Maintaining a list of indices of asked Questions in a session
let questionList = [];
let currentQuestionIndex = 0;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions(); // Shuffle the questions when the page loads
    populateQuestion(); // Populate the first question
});

options.forEach((option) => {
    option.addEventListener("click", () => {
        console.log("Option Clicked" + option.textContent);
        checkCorrectAnswer(option.textContent); // Check if the clicked option is correct
        if (!timerInterval) {
            startTimer(); // Start the timer on the first click
        }
    });
});

restart.addEventListener('click', () => {
    location.reload(); // Reload the page when the restart button is clicked
});

hintButton.addEventListener("click", () => {
    hintButton.classList.add("hidden"); // Hide the hint button
    hintText.classList.remove("hidden"); // Show the hint text
});

const shuffleQuestions = () => {
    questionList = Questions.slice(); // Create a copy of the Questions array
    for (let i = questionList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionList[i], questionList[j]] = [questionList[j], questionList[i]]; // Shuffle the questions
    }
}

const populateQuestion = () => {
    if (currentQuestionIndex < questionList.length) {
        const currentQuestion = questionList[currentQuestionIndex];

        question.textContent = currentQuestion.question; // Set the question text
        options.forEach((option, index) => {
            option.textContent = currentQuestion.choices[index]; // Set the option texts
        });
        hintText.textContent = currentQuestion.hint; // Set the hint text
        currentQuestionIndex++;
    } else {
        console.log("No more questions available."); // Log a message if there are no more questions
    }
}

const checkCorrectAnswer = (answer) => {
    if (answer === questionList[currentQuestionIndex - 1].correctAnswer) incrementScore(); // Increment the score if the answer is correct
    else showGameOver(); // Show game over if the answer is incorrect

    // Refresh Hint State
    hintText.classList.add("hidden"); // Hide the hint text
    hintButton.classList.remove("hidden"); // Show the hint button

    populateQuestion(); // Populate the next question
}

const incrementScore = () => {
    score.textContent = parseInt(score.textContent) + 1; // Increment the score
}

const showGameOver = () => {
    clearInterval(timerInterval); // Clear the timer interval
    finalScore.textContent = score.textContent; // Set the final score
    gameOver.classList.remove("hidden"); // Show the game over notification
}

const startTimer = () => {
    let timeLeft = 60; // Set the initial time to 60 seconds
    timer.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Clear the timer interval when time is up
            showGameOver(); // Show game over when time is up
        }
    }, 1000); // Update the timer every second
}
