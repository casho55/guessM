let secretNumber = generateSecretNumber();
let attempts = 0;
const maxAttempts = 5;
let winners = [];

// Function to generate a random secret number between 1 and 100
function generateSecretNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to initialize the game and winners dashboard
function initializeGame() {
    // Retrieve winners from local storage if available
    const storedWinners = localStorage.getItem('winners');
    if (storedWinners) {
        winners = JSON.parse(storedWinners);
        updateDashboard();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();

    const guessButton = document.getElementById('guess-button');
    const guessInput = document.getElementById('guess');
    const messageElement = document.getElementById('message');
    const attemptsElement = document.getElementById('attempts');
    const winnersDashboard = document.getElementById('winners-dashboard');

    guessButton.addEventListener('click', function() {
        const guess = Number(guessInput.value);
        attempts++;

        if (guess === secretNumber) {
            messageElement.textContent = `Congratulations! ${guess} is the correct number. You win in ${attempts} attempts.`;
            winners.push({ name: "Anonymous", attempts: attempts });
            updateDashboard();
            saveWinners();
            setTimeout(resetGame, 3000);
        } else if (attempts >= maxAttempts) {
            messageElement.textContent = `Sorry, you've used all ${maxAttempts} attempts. The number was ${secretNumber}.`;
            setTimeout(resetGame, 3000);
        } else if (guess < secretNumber) {
            messageElement.textContent = 'Too low. Try again!';
        } else {
            messageElement.textContent = 'Too high. Try again!';
        }

        attemptsElement.textContent = `Attempts: ${attempts}`;
    });

    function resetGame() {
        secretNumber = generateSecretNumber();
        attempts = 0;
        guessInput.value = '';
        messageElement.textContent = '';
        attemptsElement.textContent = '';
    }

    function updateDashboard() {
        winnersDashboard.innerHTML = ''; // Clear previous entries

        winners.forEach((winner, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${winner.name} - Attempts: ${winner.attempts}`;
            winnersDashboard.appendChild(listItem);
        });
    }

    function saveWinners() {
        localStorage.setItem('winners', JSON.stringify(winners));
    }
});
