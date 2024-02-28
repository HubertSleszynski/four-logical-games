//VARIABLES

let interval = null;
let seconds = 0;
let lockingCards = false;
let errorsCounter = 0;

let EasyMode = false;
let MediumMode = false;
let HardMode = false;

let chosenNumber = null;
let board, solution;
let boards = [
  "017820094009007080583040200190000000705030908000000015001080437070300600930072850",
  "006904570050063941000810000043050600800401002009070180000087000795140060081609700",
  "800546200000030501600002384014308000008090700000204150452700009107020000003165002",
  "010260090000004700008305124876003002190000037300700816234801600001900000080032040",
  "600200834008010750059470000527003400003000200004100395000032170032060900186004003",
  "350002706007050000000309010020507900084090350001208070030705000000020800809100025",
  "070800540090004001064510000905006130000030000031200904000058270300700090059003010",
  "870041506100000007604709000000030800507020401006080000000405708900000004702810059",
  "098000100004050900000083060016730208080090070205018390030570000009040700001000530",
  "000000609490030000050904003032080901960000038708090260300102050000070086601000000",
  "020400000008095002009000370095048003400000006800650940014000200300910400000004080",
  "000009002000037090092001305020410500003000900007058040708600450060180000900300000",
  "080000930270000008000097005007140590000030000061075800800350000600000051052000080",
  "402001030065003020000008054900000080708000209040000003590700000030100490020900801",
  "087052040000007000000019057006000305005030900208000700840520000000700000070680530",
];
let solutions = [
  "617823594429567183583149276198754362765231948342698715251986437874315629936472851",
  "316924578258763941974815236143258697867491352529376184632587419795142863481639725",
  "831546297249837561675912384714358926528691743396274158452783619167429835983165472",
  "417268395523194768968375124876413952192586437345729816234851679651947283789632541",
  "671259834248316759359478612527983461913645287864127395495832176732561948186794523",
  "358412796917856243246379518623547981784691352591238674432785169165924837879163425",
  "173892549598364721264517389925486137647139852831275964416958273382741695759623418",
  "873241596195368247624759183419537862587926431236184975361495728958672314742813659",
  "598467123364152987127983465916734258483295671275618394632571849859346712741829536",
  "123758649497631825856924713532486971964217538718593264389162457245379186671845392",
  "123467598748395612569821374695148726431279856872653941914586237387912465256734189",
  "185426937279513468436897125327148596548639712961275843814352679693784251752961384",
  "376549182185237694492861375829413567543726918617958243738692451264185739951374826",
  "482591637165473928379628154913247586758316249246859713591784362837162495624935871",
  "987352146521467893364819257496178325715236984238945761843521679652793418179684532",
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

let numbers = document.querySelectorAll(".number");
numbers.forEach(number =>
  number.addEventListener("click", function () {
    chosenNumber = this;
  })
);

let squares = document.querySelectorAll(".square");
squares.forEach(square => square.addEventListener("click", squareChosen));

let errors = document.querySelector(".errors");

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
  location.href = "../../main_page/index.html";
});

function levelPicked() {
  showTheActualGame();
  setDiff();
  launchingTheGame();
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
    let easyBoard = Math.floor(Math.random() * 5);
    board = boards[easyBoard];
    solution = solutions[easyBoard];
  } else if (MediumMode) {
    let mediumBoard = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
    board = boards[mediumBoard];
    solution = solutions[mediumBoard];
  } else {
    let hardBoard = Math.floor(Math.random() * (14 - 9 + 1)) + 9;
    board = boards[hardBoard];
    solution = solutions[hardBoard];
  }
}

//HANDLING BOTTOM BUTTONS

buttonHome.addEventListener("click", () => {
  location.href = "../../main_page/index.html";
});

buttonStop.addEventListener("click", () => {
  if (buttonStop.innerHTML == "Stop") {
    buttonStop.innerHTML = "Start";
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
  location.href = "../../main_page/index.html";
});

gratulationsPlayAgainButton.addEventListener("click", () => {
  location.reload();
});

//THE GAME

function launchingTheGame() {
  for (let i = 0; i < 81; i++) {
    if (board[i] != "0") {
      squares[i].innerText = board[i];
      squares[i].classList.add("alreadyDone");
    } else {
      squares[i].innerText = " ";
    }
  }
}

function squareChosen() {
  if (lockingCards) return;
  if (chosenNumber) {
    if (this.innerText != "") {
      return;
    }
    if (chosenNumber.innerText == solution[this.id]) {
      this.innerText = chosenNumber.innerText;
      this.classList.add("alreadyDone");
      checkIfOver();
    } else {
      errorsCounter += 1;
      errors.textContent = errorsCounter;
    }
  }
}

function checkIfOver() {
  let squareArray = Array.from(squares);
  if (squareArray.every(square => square.classList.contains("alreadyDone"))) {
    endOfTheGame();
  }
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
