//OKNRO GRY

const gameWindow = document.getElementById("gameWindow");

//GLOWNE ELEMENTY STRONY

const headerElement = document.getElementById("header");
const mainElement = document.getElementById("main");
const footerElement = document.getElementById("footer");

//GRY

const memoryContainerElement = document.getElementById("memoryContainer");
const puzzleContainerElement = document.getElementById("puzzleContainer");
const kolkoikrzyzykContainerElement = document.getElementById(
  "kolkoikrzyzykContainer"
);
const sudokuContainerElement = document.getElementById("sudokuContainer");

//ELEMENTY OPISUJACE GRY

const h2Element = document.getElementById("gameWindowH2");
const descriptionTextElement = document.getElementById("descriptionText");
const rulesTextElement = document.getElementById("rulesText");

//POJAWIENIE SIE OKNA PO KLIKNIECIU WYBRANEGO KONTENERA

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

//KONTENERY Z GRAMI

memoryContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "../../games/memory/memory.html";
  h2Element.innerText = "MEMORY";
  rulesTextElement.innerText =
    "Celem gry w Memory jest odkrycie i zebranie jak największej liczby pasujących par kart.\n\n Na początku gry, wszystkie karty są poukładane na stole z twarzą do dołu. Gracz podczas swojej tury wybiera najpierw jedną a później drugą kartę, które według niego będą miały ten sam obrazek.Po odkryciu kart, należy sprawdzić, czy obie odkryte karty są pasującymi parami.\n\n Jeśli karty tworzą parę, gracz zabiera je ze stołu i odkłada obok siebie. Następnie kontynuuje swoją turę i wykonuje kolejny ruch. Jeśli karty nie tworzą pary, gracz odkłada je z powrotem na swoje pierwotne miejsce na stole, z twarzą do dołu.Następnie inny gracz wykonuje swój ruch.\n\n Gra kończy się, gdy wszystkie pary zostaną zebrane. Wygrywa gracz, który na koniec gry posiada największą liczbę zebranych par.";
});

puzzleContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "../../games/puzzle_slider/puzzle_slider.html";
  h2Element.innerText = "PUZZLE SLIDER";
  rulesTextElement.innerText =
    "Puzzle slider to gra logiczna, której celem jest ułożenie fragmentów liczb w zamierzony sposób na kwadratowej planszy.\n\n Plansza składa się z nieruchomych kafelków oraz jednego pustego kafelka, który umożliwia przesuwanie sąsiednich fragmentów. Gracz może wykonywać ruchy, przesuwając kafelki do pustego miejsca, aby stworzyć docelową konfigurację.\n\n Rozgrywka polega na tym, aby poprzez odpowiednie przesuwanie kafelków zrealizować zamierzoną układankę. Im więcej kafelków na planszy, tym trudniejsza łamigłówka, ponieważ liczba możliwych ruchów rośnie, co dodaje wyzwania. ";
});

kolkoikrzyzykContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "../../games/kolkoikrzyzyk/kolkoikrzyzyk.html";
  h2Element.innerText = "KOLKO I KRZYZYK";
  rulesTextElement.innerText =
    "Gra w kółko i krzyżyk jest klasyczną grą dla dwóch graczy, gdzie plansza składa się z siatki o różnych wymiarach.\n\n W wersji 3x3, celem gracza jest ułożenie trzech swoich symboli (X lub O) w rzędzie, zarówno pionowo, poziomo, jak i na skos.\n\n Plansza 5x5 rozszerza tę koncepcję, wymagając ułożenia pięciu symboli w rzędzie. \n\nNatomiast w wersji 7x7 gracze starają się osiągnąć zwycięstwo, ustawiając siedem symboli w jednym ciągu. \n\nRuchy wykonuje się na przemian, umieszczając swój symbol na wolnym polu. Gra kończy się remisem, gdy wszystkie pola są zapełnione, a żaden gracz nie osiągnął zwycięstwa. Linie zwycięstwa mogą być proste (pionowe, poziome, na skos) i obejmować określoną liczbę pól, zazwyczaj 3, 5 lub 7, w zależności od rozmiaru planszy.";
});

sudokuContainerElement.addEventListener("click", () => {
  gameWindowBtnPlay.value = "../../games/sudoku/sudoku.html";
  h2Element.innerText = "SUDOKU";
  rulesTextElement.innerText =
    "Sudoku to gra logiczna, która polega na wypełnianiu siatki 9x9, podzielonej na 9 kwadratów 3x3, liczbami od 1 do 9.\n\n Na początku gry na planszy znajdują się pewne liczby, które są już uzupełnione. Celem gry jest uzupełnienie pozostałych pól w taki sposób, aby każda kolumna, każdy wiersz i każdy kwadrat 3x3 zawierał każdą liczbę od 1 do 9 bez powtórzeń. Podstawową zasadą Sudoku jest to, że w każdym wierszu, kolumnie i kwadracie 3x3 nie można powtarzać tych samych liczb. \n\nGra kończy się, gdy wszystkie pola na planszy są wypełnione i spełniają tę zasadę.";
});
