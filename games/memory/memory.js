//VARIABLES

let interval = null;
let seconds = 0;
let lockingCards = false;

let EasyMode = false;
let MediumMode = false;
let HardMode = false;

let cardChanged = false;
let firstCard, secondCard;
let callCount = 0;

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

const cards = document.querySelectorAll("[data-vegetable]");
cards.forEach(card => card.addEventListener("click", changingCard));

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
  mixOrder();
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
    cards.forEach(card => card.classList.add("small"));
  } else if (MediumMode) {
    cards.forEach(card => card.classList.add("med"));
    cards.forEach(card => card.classList.remove("hide"));
  } else {
    cards.forEach(card => card.classList.add("large"));
    cards.forEach(card => card.classList.remove("hide", "med-hide"));
  }
}

function mixOrder() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
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

//TIMER

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

function changingCard() {
  if (lockingCards) return;
  if (this === firstCard) return;
  this.children[0].classList.replace("hide", "show");
  this.children[1].classList.replace("show", "hide");
  if (!cardChanged) {
    cardChanged = true;
    firstCard = this;
  } else {
    secondCard = this;
    if (firstCard.dataset.vegetable === secondCard.dataset.vegetable) {
      callCount += 1;
      firstCard.removeEventListener("click", changingCard);
      secondCard.removeEventListener("click", changingCard);
      checkIfOver();
      cardChanged = false;
      lockingCards = false;
      firstCard = null;
      secondCard = null;
    } else {
      lockingCards = true;
      setTimeout(() => {
        firstCard.children[0].classList.replace("show", "hide");
        firstCard.children[1].classList.replace("hide", "show");
        secondCard.children[0].classList.replace("show", "hide");
        secondCard.children[1].classList.replace("hide", "show");
        cardChanged = false;
        lockingCards = false;
        firstCard = null;
        secondCard = null;
      }, 800);
    }
  }
}

// GAME OVER

function checkIfOver() {
  if (callCount == 6 && EasyMode == true) {
    endOfTheGame();
  } else if (callCount == 8 && MediumMode == true) {
    endOfTheGame();
  } else if (callCount == 10 && HardMode == true) {
    endOfTheGame();
  }
}

function endOfTheGame() {
  stopCounting();
  setInterval(() => {
    containerElement.classList.replace("show", "hide");
    buttonsElement.classList.replace("show", "hide");
    cards.forEach(card => (card.style.display = "none"));
    gratulationsElement.classList.replace("hide", "show");
    mainElement.style.border = "none";
  }, 500);
}
