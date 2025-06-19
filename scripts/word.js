// Game settings
const MAX_TRIES = 6;
const WORDS = ['javascript', 'programming', 'computer', 'algorithm', 'developer', 'website'];


let currentWord = '';
let displayWord = [];
let guessedLetters = [];
let triesLeft = MAX_TRIES;


function startGame() {
   
    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    displayWord = [];
    guessedLetters = [];
    triesLeft = MAX_TRIES;
    
    for (let i = 0; i < currentWord.length; i++) {
        displayWord[i] = '_';
    }
    
    document.getElementById('letter-input').disabled = false;
    document.getElementById('guess-button').disabled = false;
    document.getElementById('start-button').textContent = 'New Game';
    
    document.getElementById('letter-input').value = '';
    document.getElementById('letter-input').focus();
    
    updateDisplay();
    showMessage('Game started! Enter your first letter.');
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayWord.join(' ');
    document.getElementById('tries-left').textContent = 'Tries left: ' + triesLeft;
    
    if (guessedLetters.length === 0) {
        document.getElementById('guessed-letters').textContent = 'Guessed letters: none';
    } else {
        document.getElementById('guessed-letters').textContent = 'Guessed letters: ' + guessedLetters.join(', ').toUpperCase();
    }
}

function makeGuess() {
    const letter = document.getElementById('letter-input').value.toLowerCase();
    document.getElementById('letter-input').value = '';
  
    if (letter.length !== 1 || letter < 'a' || letter > 'z') {
        showMessage('Please enter a single letter!');
        document.getElementById('letter-input').focus();
        return;
    }
    
    if (guessedLetters.includes(letter)) {
        showMessage('You already guessed that letter!');
        document.getElementById('letter-input').focus();
        return;
    }
    
    guessedLetters.push(letter);
    
    let found = false;
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            displayWord[i] = letter;
            found = true;
        }
    }
    
    if (!found) {
        triesLeft--;
    }
    
    updateDisplay();
    
    checkGameEnd(found);
    
    if (triesLeft > 0 && displayWord.includes('_')) {
        document.getElementById('letter-input').focus();
    }
}

function checkGameEnd(found) {
    if (!displayWord.includes('_')) {
        showMessage('🎉 You won! The word was "' + currentWord.toUpperCase() + '"');
        endGame();
    }
    else if (triesLeft === 0) {
        showMessage('😞 You lost! The word was "' + currentWord.toUpperCase() + '"');
        endGame();
    }
    else {
        if (found) {
            showMessage('Good guess!');
        } else {
            showMessage('Wrong letter. Try again!');
        }
    }
}

function endGame() {
    document.getElementById('letter-input').disabled = true;
    document.getElementById('guess-button').disabled = true;
}

function showMessage(text) {
    document.getElementById('message').textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('guess-button').addEventListener('click', makeGuess);

    document.getElementById('letter-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
    
    document.getElementById('letter-input').addEventListener('input', function() {
        this.value = this.value.toLowerCase().replace(/[^a-z]/g, '');
    });
});