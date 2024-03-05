//VARIABLES

let interval = null;
let seconds = 0;
let lockingCards = false;

let EasyMode = false;
let MediumMode = false;
let HardMode = false;

let puzzle, emptyPuzzle, puzzleContainer, emptyCell, diff, usedSquares;

let puzzles = [
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, undefined],
  ],
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, undefined],
  ],
  [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, undefined],
  ],
];

let emptyPuzzles = [
  [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
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

//SETTING ELEMENTS

const containerElement = document.querySelector(".container");
const buttonsElement = document.querySelector(".buttons");
const levelElement = document.getElementById("levelPick");
const gratulationsElement = document.querySelector(".gratulations");
const mainElement = document.getElementById("main");

let hardLevelCells = document.querySelectorAll(".hard");
let mediumLevelCells = document.querySelectorAll(".medium");

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
  setDiff();
  shuffleFullBoard();
  showTheActualGame();
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
    puzzle = puzzles[0];
    emptyPuzzle = emptyPuzzles[0];
    diff = 3;
    usedSquares = 8;
    emptyCell = { x: diff - 1, y: diff - 1 };
    puzzleContainer = puzzle;
    hardLevelCells.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
    mediumLevelCells.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
  } else if (MediumMode) {
    puzzle = puzzles[1];
    emptyPuzzle = emptyPuzzles[1];
    diff = 4;
    usedSquares = 15;
    emptyCell = { x: diff - 1, y: diff - 1 };
    puzzleContainer = puzzle;
    hardLevelCells.forEach(function (element) {
      element.parentNode.removeChild(element);
    });
  } else {
    puzzle = puzzles[2];
    emptyPuzzle = emptyPuzzles[2];
    diff = 5;
    usedSquares = 24;
    emptyCell = { x: diff - 1, y: diff - 1 };
    puzzleContainer = puzzle;
  }
}

//HANDLING BOTTOM BUTTONS

buttonHome.addEventListener("click", () => {
  location.href = "../../index.html";
});

buttonStop.addEventListener("click", () => {
  if (buttonStop.innerHTML == "Stop") {
    buttonStop.innerHTML = "Resume";
    lockingCards = true;
    stopCounting();
  } else {
    lockingCards = false;
    startCounting();
    buttonStop.innerHTML = "Stop";
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

function arePuzzlesEqual(puzzleMixed, puzzleContainer) {
  for (let y = 0; y < diff; y++) {
    for (let x = 0; x < diff; x++) {
      if (puzzleMixed[y][x] !== puzzleContainer[y][x]) {
        return false;
      }
    }
  }
  return true;
}

function cellClick(cell) {
  if (lockingCards) return;
  const x = cell.cellIndex;
  const y = cell.parentElement.rowIndex;

  if (isAdjacent(x, y, emptyCell.x, emptyCell.y)) {
    swapTiles(x, y, emptyCell.x, emptyCell.y);
    draw();
    if (arePuzzlesEqual(puzzle, puzzleContainer)) {
      endOfTheGame();
    }
  }
}

function isAdjacent(x1, y1, x2, y2) {
  return (
    (Math.abs(x1 - x2) === 1 && y1 === y2) ||
    (Math.abs(y1 - y2) === 1 && x1 === x2)
  );
}

function swapTiles(x1, y1, x2, y2) {
  const temp = puzzle[y1][x1];
  puzzle[y1][x1] = puzzle[y2][x2];
  puzzle[y2][x2] = temp;
  emptyCell = { x: x1, y: y1 };
}

function draw() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const x = index % diff;
    const y = Math.floor(index / diff);
    const value = puzzle[y][x];
    cell.textContent = value !== null ? value : "";
    if (value === null) {
      emptyCell = { x, y };
    }
  });
}

function shuffleFullBoard() {
  let nums = [...Array(usedSquares).keys()].map(x => x + 1);
  do {
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    puzzle = emptyPuzzle;

    let k = 0;
    for (let i = 0; i < diff; i++) {
      for (let j = 0; j < diff; j++) {
        puzzle[i][j] = nums[k++];
      }
    }
  } while (!isSolvable(nums));

  draw();
}

function isSolvable(nums) {
  let inversions = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
}

function endOfTheGame() {
  stopCounting();
  setInterval(() => {
    containerElement.classList.replace("show", "hide");
    buttonsElement.classList.replace("show", "hide");
    gratulationsElement.classList.replace("hide", "show");
    mainElement.style.border = "none";
  }, 500);
}
