import "./style.css";

import { makeGameBoard } from "./Board/make-board";
import { GameState } from "./Utils/interfaces";
import { createBtns } from "./GameOver/new-game";
import { determineIfLetter } from "./Utils/determine-if-letter";
import { WORDS } from "./wordlist/word-list";
import { getRandomWord } from "./wordlist/get-word";
import {
  showLetter,
  deleteLetter,
  checkCorrectLetter,
} from "./Board/board-letters";

// constants
const WORD_LENGTH = 5;
let SECRET_WORD = getRandomWord(WORDS);

console.log(SECRET_WORD);

const app = document.getElementById("app") as HTMLDivElement;

const gameState: GameState = {
  guessCount: 0,
  letterCount: 0,
  currentGuess: "",
  guessList: [],
  isGameOver: false,
};

const getKeyPress = (e: KeyboardEvent) => {
  const key = e.key;
  const guessCount = gameState.guessCount;
  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;
  const isGameOVer = gameState.isGameOver;

  console.log(key);

  // user type
  if (determineIfLetter(key) && letterCount < 5 && guessCount < 6) {
    showLetter(key.toLocaleUpperCase(), gameState);
    gameState.currentGuess += key.toLocaleLowerCase();
    gameState.letterCount++;
  }
  // user delete character
  if (key === "Backspace" && letterCount > 0) {
    gameState.letterCount--;
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    deleteLetter(gameState);
  }
  // user submit a guess
  const inWordList = WORDS.includes(currentGuess);
  if (key === "Enter" && letterCount === WORD_LENGTH && inWordList) {
    if (guessCount === 5 && !isGameOVer) {
      gameOver();
    }
    checkIfCorrectGuess(currentGuess);
  }
};
document.addEventListener("keydown", getKeyPress);

const checkIfCorrectGuess = (guess: string) => {
  const guessCount = gameState.guessCount;
  if (guess == SECRET_WORD) {
    gameWin();
    return;
  } else if (guess !== SECRET_WORD && guessCount < 6) {
    for (let i = 0; i < WORD_LENGTH; i++) {
      const currRow =
        document.getElementsByClassName("row")[gameState.guessCount];
      const currLetter = currRow.getElementsByClassName("tile")[i];
      const guessL = guess[i];
      const wordL = SECRET_WORD[i];
      const correctness = checkCorrectLetter(guessL, wordL, SECRET_WORD);
      currLetter.classList.add(correctness);

      // update keyboard colors
      const keyboardKey = document.getElementById(guessL);
      console.log(keyboardKey);
      keyboardKey?.classList.add(correctness);
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
  const loseMsgCont = document.createElement("div");
  loseMsgCont.textContent = "You Lost!";

  app.append(loseMsgCont);
  console.log("you lost");
};

makeGameBoard();

const keyboard = document.getElementById("keyboard-cont");
const getKeyboardPress = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement | HTMLButtonElement;
  const key = target.textContent!;

  console.log(e);

  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;
  const guessCount = gameState.guessCount;
  const isGameOVer = gameState.isGameOver;

  if (target.className === "key-tile") {
    showLetter(key.toLocaleUpperCase(), gameState);
    gameState.currentGuess += key.toLocaleLowerCase();
    gameState.letterCount++;
  }

  const deleteClass = target.classList[0];
  if (deleteClass === "delete-key" && letterCount > 0) {
    gameState.letterCount--;
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    deleteLetter(gameState);
  }
  // user submit a guess
  const inWordList = WORDS.includes(currentGuess);
  const enterClass = target.classList[0];
  if (enterClass === "enter-key" && letterCount === WORD_LENGTH && inWordList) {
    if (guessCount === 5 && !isGameOVer) {
      gameOver();
    }
    checkIfCorrectGuess(currentGuess);
  }
};

keyboard?.addEventListener("click", getKeyboardPress);
