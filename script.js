const words = ['hangman', 'apple', 'banana', 'cherry', 'elephant', 'kangaroo'];
let word, guessedLetters, remainingAttempts, timer;

const hangmanImg = document.getElementById('hangman-img');
const hangmanWord = document.getElementById('hangman-word');
const keyboard = document.getElementById('keyboard');
const gameResult = document.getElementById('game-result');
const restartBtn = document.getElementById('restart-btn');

// Initialize game
function initGame() {
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = new Set();
  remainingAttempts = 6;
  updateHangmanWord();
  updateHangmanImg();
  renderKeyboard();
  gameResult.textContent = '';
}

// Update the displayed word with guessed letters
function updateHangmanWord() {
  hangmanWord.innerHTML = word.split('').map(letter => guessedLetters.has(letter) ? letter : '_').join(' ');
}

// Update hangman image based on remaining attempts
function updateHangmanImg() {
  hangmanImg.style.backgroundImage = `url('images/hangman_${6 - remainingAttempts}.png')`;
}

// Check if the game is won
function checkWin() {
  return word.split('').every(letter => guessedLetters.has(letter));
}

// Check if the game is lost
function checkLoss() {
  return remainingAttempts === 0;
}

// Handle letter click
function handleLetterClick(letter) {
  if (!guessedLetters.has(letter)) {
    guessedLetters.add(letter);
    if (!word.includes(letter)) {
      remainingAttempts--;
    }
    updateHangmanWord();
    updateHangmanImg();
    if (checkWin()) {
      gameResult.textContent = 'Congratulations! You won!';
      clearInterval(timer);
    } else if (checkLoss()) {
      gameResult.textContent = `You lost! The word was "${word}".`;
      clearInterval(timer);
    }
  }
}

// Render keyboard
function renderKeyboard() {
  keyboard.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const key = document.createElement('div');
    key.textContent = letter;
    key.classList.add('key');
    key.addEventListener('click', () => handleLetterClick(letter.toLowerCase()));
    keyboard.appendChild(key);
  }
}

// Handle restart button click
restartBtn.addEventListener('click', () => {
  initGame();
  timer = setInterval(() => {
    remainingAttempts--;
    updateHangmanImg();
    if (checkLoss()) {
      gameResult.textContent = `You lost! The word was "${word}".`;
      clearInterval(timer);
    }
  }, 15000);
});

// Start the game
initGame();
timer = setInterval(() => {
  remainingAttempts--;
  updateHangmanImg();
  if (checkLoss()) {
    gameResult.textContent = `You lost! The word was "${word}".`;
    clearInterval(timer);
  }
}, 15000);
