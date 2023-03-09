import "./style.css";

import { makeGameBoard } from "./Board/make-board";
import { GameState } from "./Utils/interfaces";
import { createBtns } from "./NewGame/new-game";
import { determineIfLetter } from "./Utils/determine-if-letter";
import { WORDS } from "./wordlist/word-list";
import { getRandomWord } from "./wordlist/get-word";

// constants
const WORD_LENGTH = 5;
let SECRET_WORD = getRandomWord(WORDS);

console.log(SECRET_WORD);

const app = document.getElementById("app") as HTMLDivElement;

const gameState: GameState = {
  guessCount: 0,
  letterCount: 0,
  currentGuess: "",
  isGameOver: false,
};

const getKeyPress = (e: KeyboardEvent) => {
  const key = e.key;
  const guessCount = gameState.guessCount;
  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;
  const isGameOVer = gameState.isGameOver;

  console.log(key);

  if (determineIfLetter(key) && letterCount < 5 && guessCount < 6) {
    showLetter(key.toLocaleUpperCase());
    gameState.currentGuess += key.toLocaleLowerCase();
    gameState.letterCount++;
  }

  if (key === "Backspace" && letterCount > 0) {
    gameState.letterCount--;
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    deleteLetter();
  }

  const inWordList = WORDS.includes(currentGuess);
  if (key === "Enter" && guessCount < 6 && letterCount === 5 && inWordList) {
    checkIfCorrectGuess(currentGuess);
    if (guessCount === 5 && !isGameOVer) {
      gameOver();
    }
  }
};
document.addEventListener("keydown", (e) => getKeyPress(e));

const showLetter = (key: string) => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = key;
};

const deleteLetter = () => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = "";
};

const checkIfCorrectGuess = (guess: string) => {
  if (guess == SECRET_WORD) {
    gameWin();
    return;
  } else if (gameState.guessCount < 6) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const currRow =
        document.getElementsByClassName("row")[gameState.guessCount];
      const currLetter = currRow.getElementsByClassName("tile")[i];
      const currGuessLetter = currLetter.textContent?.toLocaleLowerCase()!;
      if (currGuessLetter === SECRET_WORD[i]) {
        currLetter.classList.add("correct");
      } else if (SECRET_WORD.includes(currGuessLetter)) {
        currLetter.classList.add("slightly-correct");
      } else {
        currLetter.classList.add("wrong");
      }
    }
    gameState.guessCount++;
  }

  gameState.letterCount = 0;
  gameState.currentGuess = "";
};

const gameWin = () => {
  gameState.isGameOver = true;
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currRow =
      document.getElementsByClassName("row")[gameState.guessCount];
    const currLetter = currRow.getElementsByClassName("tile")[i];
    currLetter.classList.add("correct");
  }

  const winMessage = document.createElement("div");
  winMessage.classList.add("win-msg");
  const playAgainMsg = document.createElement("div");
  playAgainMsg.classList.add("play-again-msg");

  playAgainMsg.textContent = "Play Again?";
  winMessage.textContent = "YOU WON!";
  app.append(winMessage);
  app.append(playAgainMsg);
  createBtns(app);

  document.removeEventListener("keydown", getKeyPress);
};

const gameOver = () => {
  console.log("you lost");
};

makeGameBoard();
