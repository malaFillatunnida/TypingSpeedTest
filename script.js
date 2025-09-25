const wordDisplay = document.getElementById("word");
const input = document.getElementById("text");
const timeElement = document.getElementById("time");
const correctElement = document.getElementById("correct");
const wrongElement = document.getElementById("wrong");
const endgameElement = document.getElementById("end-game-container");
const startBtn = document.getElementById("startBtn");

const words = [
  "computer",
  "keyboard",
  "javascript",
  "developer",
  "internet",
  "function",
  "variable",
  "object",
  "design",
  "performance",
  "learning",
  "challenge",
  "project",
  "speed",
  "accuracy",
  "practice",
  "language",
  "programming",
  "typing",
  "dynamic",
];

let randomWord;
let correct;
let wrong;
let time;
let timer;
let gameRunning = false;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  wordDisplay.innerText = randomWord;
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  correct = 0;
  wrong = 0;
  time = 30;
  correctElement.innerText = correct;
  wrongElement.innerText = wrong;
  timeElement.innerText = time;
  endgameElement.style.display = "none";
  input.disabled = false;
  input.value = "";
  input.focus();
  addWordToDom();

  timer = setInterval(() => {
    time--;
    timeElement.innerText = time;
    if (time <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  gameRunning = false;
  input.disabled = true;
  endgameElement.innerHTML = `
    <h1>⏰ Waktunya habis!</h1>
    <p>✅ Benar: ${correct}</p>
    <p>❌ Salah: ${wrong}</p>
    <p>🎯 Ketepatan: ${((correct / (correct + wrong)) * 100 || 0).toFixed(
      1
    )}%</p>
    <button onclick="history.go(0)">Bermain Lagi</button>
  `;
  endgameElement.style.display = "flex";
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && gameRunning) {
    if (input.value.toLowerCase() === randomWord.toLowerCase()) {
      correct++;
      correctElement.innerText = correct;
      input.classList.add("correct");
    } else {
      wrong++;
      wrongElement.innerText = wrong;
      input.classList.add("wrong");
    }

    setTimeout(() => {
      input.classList.remove("correct", "wrong");
    }, 300);

    input.value = "";
    addWordToDom();
  }
});

startBtn.addEventListener("click", startGame);
