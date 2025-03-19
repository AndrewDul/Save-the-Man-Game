const categories = {
  animals: [
    "dog",
    "cat",
    "elephant",
    "giraffe",
    "monkey",
    "lion",
    "tiger",
    "bear",
    "zebra",
    "kangaroo",
  ],
  colors: [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "black",
    "white",
  ],
  food: [
    "pizza",
    "pasta",
    "apple",
    "banana",
    "orange",
    "sandwich",
    "steak",
    "cheese",
    "burger",
    "sushi",
  ],
  actions: [
    "running",
    "walking",
    "jumping",
    "singing",
    "dancing",
    "eating",
    "drinking",
    "sleeping",
    "swimming",
    "laughing",
  ],
  transport: [
    "car",
    "bus",
    "bike",
    "train",
    "truck",
    "scooter",
    "motorcycle",
    "airplane",
    "ship",
    "subway",
  ],
  kitchen: [
    "knife",
    "spoon",
    "fork",
    "plate",
    "glass",
    "pan",
    "pot",
    "oven",
    "fridge",
    "microwave",
  ],
  work: [
    "office",
    "computer",
    "meeting",
    "deadline",
    "coffee",
    "colleague",
    "project",
    "email",
    "report",
    "schedule",
  ],
};

let selectedCategory = "all";

function getWordsByCategory(category) {
  if (category === "all") {
    return Object.values(categories).flat();
  } else {
    return categories[category];
  }
}

let words = getWordsByCategory(selectedCategory);
let usedWords = [];

function shuffleWords(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getRandomWord() {
  if (words.length === 0) {
    words = getWordsByCategory(selectedCategory);
    usedWords = [];
    shuffleWords(words);
  }

  let word = words.shift();
  usedWords.push(word);

  let categoryName =
    selectedCategory === "all"
      ? Object.keys(categories).find((cat) => categories[cat].includes(word))
      : selectedCategory;

  displayCategory(categoryName);
  return word;
}

// DOM elements
const gallowsImage = document.querySelector("#gallows img");
const board = document.getElementById("board");
const alphabet = document.getElementById("alphabet");
const wordGuess = document.getElementById("wordGuess");
const submitGuess = document.getElementById("submitGuess");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const activePlayer = document.getElementById("activePlayer");
const scoreList = document.getElementById("scoreList");
const continueGameButton = document.getElementById("continueGame");
const categoryDisplay = document.getElementById("categoryDisplay");
const correctSound = new Audio("yes.wav");
const wrongSound = new Audio("no.wav");

let selectedWord;
let guessedWord;
let mistakes = 0;
let maxMistakes = 9;
let players = [];
let currentPlayerIndex = 0;

function displayCategory(category) {
  categoryDisplay.textContent = `Category: ${
    category.charAt(0).toUpperCase() + category.slice(1)
  }`;
}

// Toggle rules section
const toggleRulesButton = document.getElementById("toggleRules");
const rulesContent = document.getElementById("rulesContent");

toggleRulesButton.addEventListener("click", () => {
  rulesContent.style.display =
    rulesContent.style.display === "none" ? "block" : "none";
  toggleRulesButton.textContent =
    rulesContent.style.display === "none" ? "+" : "-";
});

function initializeGame() {
  selectedWord = getRandomWord();
  guessedWord = Array(selectedWord.length).fill("_");
  mistakes = 0;
  board.textContent = guessedWord.join(" ");
  alphabet.innerHTML = "";

  for (let letter of "abcdefghijklmnopqrstuvwxyz") {
    let button = document.createElement("button");
    button.textContent = letter;
    button.className = "letter";
    button.addEventListener("click", () => handleGuess(letter, button));
    alphabet.appendChild(button);
  }

  updateScoreboard();
  document.getElementById("resultOverlay").style.display = "none";
  gallowsImage.src = "img/s0.jpg";
}

function handleGuess(letter, button) {
  if (!players.length || button.classList.contains("used")) return;

  if (selectedWord.includes(letter)) {
    selectedWord.split("").forEach((char, index) => {
      if (char === letter) guessedWord[index] = letter;
    });

    players[currentPlayerIndex].score += 5;
    button.classList.add("used");
    correctSound.play();
  } else {
    mistakes++;
    gallowsImage.src = `img/s${mistakes}.jpg`;
    button.classList.add("wrong");
    wrongSound.play();
    nextPlayer();
  }

  button.disabled = true;
  board.textContent = guessedWord.join(" ");
  checkGameEnd();
  updateScoreboard();
}

submitGuess.addEventListener("click", () => {
  if (!players.length) return;

  if (wordGuess.value.toLowerCase() === selectedWord) {
    guessedWord = selectedWord.split("");
    players[currentPlayerIndex].score += 10;
    correctSound.play();
    endGame(true);
  } else {
    mistakes++;
    gallowsImage.src = `img/s${mistakes}.jpg`;
    wrongSound.play();
    nextPlayer();
  }

  wordGuess.value = "";
  board.textContent = guessedWord.join(" ");
  checkGameEnd();
  updateScoreboard();
});

function checkGameEnd() {
  if (!guessedWord.includes("_")) {
    endGame(true);
  } else if (mistakes >= maxMistakes) {
    endGame(false);
  }
}

function endGame(won) {
  if (won) {
    players[currentPlayerIndex].wins++;
    document.getElementById("winMessage").style.display = "block";
    document.getElementById("loseMessage").style.display = "none";
  } else {
    document.getElementById("winMessage").style.display = "none";
    document.getElementById("loseMessage").style.display = "block";
  }

  document.getElementById("resultOverlay").style.display = "block";
}

function updateScoreboard() {
  scoreList.innerHTML = "";
  players.forEach((player) => {
    let li = document.createElement("li");
    li.textContent = `${player.name}: ${player.score} points, ${player.wins} wins`;
    scoreList.appendChild(li);
  });
}

function nextPlayer() {
  if (players.length > 1) {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    activePlayer.value = players[currentPlayerIndex].name;
    playerNameDisplay.textContent = players[currentPlayerIndex].name;
  }
}

document.getElementById("addPlayer").addEventListener("click", () => {
  const playerName = document.getElementById("playerName").value.trim();
  if (playerName && !players.find((p) => p.name === playerName)) {
    players.push({ name: playerName, score: 0, wins: 0 });
    let option = document.createElement("option");
    option.value = playerName;
    option.textContent = playerName;
    activePlayer.appendChild(option);
    currentPlayerIndex = players.length - 1;
    activePlayer.value = playerName;
    playerNameDisplay.textContent = playerName;
    updateScoreboard();
  }
});

activePlayer.addEventListener("change", (e) => {
  currentPlayerIndex = players.findIndex((p) => p.name === e.target.value);
  playerNameDisplay.textContent = players[currentPlayerIndex].name;
});

document.getElementById("category").addEventListener("change", (e) => {
  selectedCategory = e.target.value;
  words = getWordsByCategory(selectedCategory);
  shuffleWords(words);
  initializeGame();
});

document.getElementById("continueGameButton").addEventListener("click", () => {
  initializeGame();
  document.getElementById("resultOverlay").style.display = "none";
});

document.getElementById("playAgainButton").addEventListener("click", () => {
  players = [];
  currentPlayerIndex = 0;
  initializeGame();
  document.getElementById("resultOverlay").style.display = "none";
});

// Generowanie gwiazd
function createStarryBackground() {
  const container = document.getElementById("starry-bg");
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    // Losowa pozycja
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    // Losowy ruch
    const duration = 25 + Math.random() * 15;
    const delay = Math.random() * -30;

    if (Math.random() > 0.5) {
      star.style.animation = `moveX ${duration}s linear ${delay}s infinite`;
    } else {
      star.style.animation = `moveY ${duration}s linear ${delay}s infinite`;
    }

    // 10% szans na planetę
    if (Math.random() < 0.1) {
      star.className += " planet";
      star.style.backgroundColor = Math.random() < 0.5 ? "#0099ff" : "#ff6600"; // Niebieski lub pomarańczowy
    }

    // 5% szans na księżyc
    if (Math.random() < 0.05) {
      star.className += " moon";
    }

    container.appendChild(star);
  }
}

window.addEventListener("load", createStarryBackground);
initializeGame();
