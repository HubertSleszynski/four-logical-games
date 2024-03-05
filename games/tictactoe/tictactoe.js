//VARIABLES

let interval = null;
let seconds = 0;
let lockingCards = false;

let EasyMode = false;
let MediumMode = false;
let HardMode = false;

let classAtTheTime, turnO, winPatterns, gameWon, minVal, maxVal;

const allWinPatterns = [
  [
    [40, 41, 42],
    [43, 44, 45],
    [46, 47, 48],
    [40, 43, 46],
    [41, 44, 47],
    [42, 45, 48],
    [40, 44, 48],
    [42, 44, 46],
  ],
  [
    [24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33],
    [35, 36, 37, 38, 38],
    [39, 40, 41, 42, 43],
    [44, 45, 46, 47, 48],
    [24, 29, 34, 39, 44],
    [25, 30, 35, 40, 45],
    [26, 31, 36, 41, 46],
    [27, 32, 37, 42, 47],
    [28, 33, 38, 43, 48],
    [24, 30, 36, 42, 48],
    [44, 40, 36, 32, 28],
  ],
  [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28],
    [28, 29, 30, 31, 32, 33, 34, 35],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48],
    [0, 7, 14, 21, 28, 35, 42],
    [1, 8, 15, 22, 29, 36, 43],
    [2, 9, 16, 23, 30, 37, 44],
    [3, 10, 17, 24, 31, 38, 45],
    [4, 11, 18, 25, 32, 39, 46],
    [5, 12, 19, 26, 33, 40, 47],
    [6, 13, 20, 27, 34, 41, 48],
    [0, 8, 16, 24, 32, 40, 48],
    [42, 36, 30, 24, 18, 12, 6],
  ],
];

//SETTING BUTTONS

const buttonBack = document.getElementById("btnBack");
const buttonEasy = document.getElementById("btnEasy");
const buttonMedium = document.getElementById("btnMedium");
const buttonHard = document.getElementById("btnHard");

const buttonHome = document.getElementById("btnHome");
const buttonStop = document.getElementById("btnStop");
const buttonReset = document.getElementById("btnReset");

const gratulationsHomeButton = document.getElementById("home");
const gratulationsPlayAgainButton = document.getElementById("playAgain");

//SETTING TIMER

const clockMinutes = document.getElementById("minutes");
const clockSeconds = document.getElementById("seconds");

const gratulationMinutes = document.getElementById("yourTimeMinutes");
const gratulationSeconds = document.getElementById("yourTimeSeconds");

//SESTTING ELEMENTS

const containerElement = document.querySelector(".container");
const buttonsElement = document.querySelector(".buttons");
const levelElement = document.getElementById("levelPick");
const gratulationsElement = document.querySelector(".gratulations");
const mainElement = document.getElementById("main");
const boardElement = document.getElementById("board");

const squares = document.querySelectorAll("[data-square]");
squares.forEach(square =>
  square.addEventListener("click", handleClick, { once: true })
);

//WINNER

const gratulationsWinner = document.querySelector(".gratulations__winner");

//HANDLING LEVEL BUTTONS

buttonEasy.addEventListener("click", () => {
  EasyMode = true;
  levelPicked();
});

buttonMedium.addEventListener("click", () => {
  MediumMode = true;
  levelPicked();
});

buttonHard.addEventListener("click", () => {
  HardMode = true;
  levelPicked();
});

buttonBack.addEventListener("click", () => {
  location.href = "../../index.html";
});

function levelPicked() {
  showTheActualGame();
  setDiff();
  startCounting();
}

function showTheActualGame() {
  levelElement.classList.replace("show", "hide");
  buttonsElement.classList.replace("hide", "show");
  containerElement.classList.replace("hide", "show");
  mainElement.style.border = "2px solid var(--FCOLOR1)";
}

function setDiff() {
  if (EasyMode) {
    boardElement.classList.add("easy");
    squares.forEach(square => {
      square.classList.add("large");
    });
    for (let i = 0; i < 40; i++) {
      const squareElement = document.querySelector("[data-square]");
      squareElement.remove();
    }
    minVal = 40;
    maxVal = 49;
    winPatterns = allWinPatterns[0];
  } else if (MediumMode) {
    boardElement.classList.add("medium");
    squares.forEach(square => {
      square.classList.add("med");
    });
    for (let i = 0; i < 24; i++) {
      const squareElement = document.querySelector("[data-square]");
      squareElement.remove();
    }
    minVal = 24;
    maxVal = 49;
    winPatterns = allWinPatterns[1];
  } else if (HardMode) {
    boardElement.classList.add("hard");
    squares.forEach(square => {
      square.classList.add("small");
    });
    winPatterns = allWinPatterns[2];
    minVal = 0;
    maxVal = 49;
  }
}

//HANDLING BOTTOM BUTTONS

buttonHome.addEventListener("click", () => {
  location.href = "../../index.html";
});

buttonStop.addEventListener("click", () => {
  if (buttonStop.innerHTML == "Stop") {
    buttonStop.innerHTML = "Start";
    lockingCards = true;
    stopCounting();
  } else {
    startCounting();
    buttonStop.innerHTML = "Stop";
    lockingCards = false;
  }
});

buttonReset.addEventListener("click", () => {
  location.reload();
});

// TIMER

function startCounting() {
  interval = setInterval(() => {
    seconds++;
    updateTime();
  }, 1000);
}

function stopCounting() {
  clearInterval(interval);
}

function updateTime() {
  if (seconds >= 60) {
    clockMinutes.textContent = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    clockSeconds.textContent = (seconds % 60).toString().padStart(2, "0");
  } else {
    clockMinutes.textContent = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    clockSeconds.textContent = seconds.toString().padStart(2, "0");
  }
  gratulationMinutes.textContent = clockMinutes.textContent;
  gratulationSeconds.textContent = clockSeconds.textContent;
}

//HANDLING GRATULATION BUTTONS

gratulationsHomeButton.addEventListener("click", () => {
  location.href = "../../index.html";
});

gratulationsPlayAgainButton.addEventListener("click", () => {
  location.reload();
});

//THE GAME

function handleClick(e) {
  if (lockingCards) return;
  const square = e.target;
  if (turnO) {
    classAtTheTime = "o";
  } else {
    classAtTheTime = "x";
  }
  markYourSquare(square);
  seeResults();
}

function markYourSquare(square) {
  square.classList.add(classAtTheTime);
  square.textContent = classAtTheTime;
}

function swapTurns() {
  turnO = !turnO;
}

function seeResults() {
  for (const pattern of winPatterns) {
    gameWon = true;
    for (const index of pattern) {
      if (!squares[index].classList.contains(classAtTheTime)) {
        gameWon = false;
        break;
      }
    }
    if (gameWon) {
      checkWhoWon();
      return;
    }
    checkForDraw();
  }
  swapTurns();
}

function checkForDraw() {
  for (minVal; minVal < maxVal; minVal++) {
    const square = squares[minVal];
    if (!square.classList.contains("x") && !square.classList.contains("o")) {
      return;
    }
  }
  gratulationsWinner.innerText = "Draw";
  endOfTheGame();
}

function checkWhoWon() {
  if (turnO) {
    gratulationsWinner.innerText = "O WINS";
    endOfTheGame();
  } else if (!turnO) {
    gratulationsWinner.innerText = "X WINS";
    endOfTheGame();
  }
}

function endOfTheGame() {
  stopCounting();
  stopCounting();
  setInterval(() => {
    containerElement.classList.replace("show", "hide");
    buttonsElement.classList.replace("show", "hide");
    gratulationsElement.classList.replace("hide", "show");
    mainElement.style.border = "none";
  }, 500);
}
