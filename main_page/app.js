//GAME WINDOW

const gameWindow = document.getElementById("gameWindow");

//GLOWNE ELEMENTY STRONY

const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

//GAMES

const memoryContainerElement = document.getElementById("memoryContainer");
const puzzleContainerElement = document.getElementById("puzzleContainer");
const kolkoikrzyzykContainerElement = document.getElementById(
  "kolkoikrzyzykContainer"
);
const sudokuContainerElement = document.getElementById("sudokuContainer");

//ELEMENTS USED TO DESCRIBE GAMES

const h2Element = document.getElementById("gameWindowH2");
const descriptionTextElement = document.getElementById("descriptionText");
const rulesTextElement = document.getElementById("rulesText");

//WINDOW WILL APPEAR AFTER CLICKING ON THE SELECTED CONTAINER

const gameContainer = document.getElementsByClassName("game-container");

for (let i = 0; i < gameContainer.length; i++) {
  gameContainer[i].addEventListener("click", () => {
    gameWindow.classList.replace("hide", "show");
    mainElement.classList.replace("show-grid", "hide");
    headerElement.classList.replace("show", "hide");
    footerElement.classList.replace("show", "hide");
  });
}

//BACK BUTTON

const gameWindowBtnBack = document.getElementById("btnBack");

gameWindowBtnBack.addEventListener("click", () => {
  gameWindow.classList.replace("show", "hide");
  mainElement.classList.replace("hide", "show-grid");
  headerElement.classList.replace("hide", "show");
  footerElement.classList.replace("hide", "show");
});

//PLAY BUTTON

const gameWindowBtnPlay = document.getElementById("btnPlay");

gameWindowBtnPlay.addEventListener("click", () => {
  location.href = gameWindowBtnPlay.value;
});

//GAME CONTAINERS

memoryContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "four-logical-games/games/memory/memory.html";
  h2Element.innerText = "MEMORY";
  rulesTextElement.innerText =
    "The aim of the Memory game is to uncover and collect as many matching pairs of cards as possible.\n\n At the beginning of the game, all cards are arranged face down on the table. During their turn, a player first selects one card and then another, believing that they have the same image. After revealing the cards, it is necessary to check if both revealed cards form a matching pair.\n\n If the cards make a pair, the player takes them from the table and places them next to each other. They then continue their turn and make another move. If the cards do not form a pair, the player places them back in their original positions on the table, face down. Then, it's the turn of another player to make their move.\n\n The game concludes when all pairs have been collected. The player with the most collected pairs at the end of the game is declared the winner.";
});

puzzleContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value =
    "four-logical-games/games/puzzle_slider/puzzle_slider.html";
  h2Element.innerText = "PUZZLE SLIDER";
  rulesTextElement.innerText =
    "Puzzle slider is a logic game where the objective is to arrange number fragments in a deliberate manner on a square board.\n\n The board consists of fixed tiles and one empty tile, allowing the sliding of adjacent fragments. Players can make moves by sliding tiles into the empty space to create the intended configuration.\n\n The gameplay revolves around strategically sliding tiles to achieve the desired puzzle arrangement. The more tiles on the board, the more challenging the puzzle becomes, as the number of possible moves increases, adding complexity to the challenge. ";
});

kolkoikrzyzykContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "four-logical-games/games/tictactoe/tictactoe.html";
  h2Element.innerText = "TIC TAC TOE";
  rulesTextElement.innerText =
    "Tic-tac-toe is a classic two-player game where the board consists of a grid of various dimensions.\n\n In the 3x3 version, the player's goal is to align three of their symbols (X or O) either vertically, horizontally, or diagonally.\n\n The 5x5 board expands on this concept, requiring the alignment of five symbols in a row.\n\nMeanwhile, in the 7x7 version, players strive for victory by arranging seven symbols in a consecutive sequence. \n\nMoves are made alternately, placing one's symbol on an empty square. The game ends in a draw when all squares are filled, and no player has achieved victory. Winning lines can be straight (vertical, horizontal, or diagonal) and encompass a specific number of squares, typically 3, 5, or 7, depending on the board size.";
});

sudokuContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "four-logical-games/games/sudoku/sudoku.html";
  h2Element.innerText = "SUDOKU";
  rulesTextElement.innerText =
    "Sudoku is a logic game in which players aim to fill a 9x9 grid, divided into 9 squares of 3x3, with numbers from 1 to 9.\n\n At the beginning of the game, certain numbers are already filled on the board. The goal of the game is to fill the remaining fields in such a way that each column, each row, and each 3x3 square contains every number from 1 to 9 without repetition. The fundamental rule of Sudoku is that the same numbers cannot be repeated in any row, column, or 3x3 square.\n\nThe game concludes when all the fields on the board are filled, adhering to this rule.";
});
