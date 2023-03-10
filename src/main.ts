import "./style.css";

import { makeGameBoard } from "./Board/make-board";
import { GameState } from "./Utils/interfaces";
import { createBtns } from "./GameOver/new-game";
import { determineIfLetter } from "./Utils/determine-if-letter";
import { WORDS } from "./wordlist/word-list";
import { getRandomWord } from "./wordlist/get-word";
import {
  checkCorrectLetter,
  notInWordlistMsg,
  handleUserType,
  handleUserDeleteLetter,
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

  // user type
  const keyVal = key.toLocaleUpperCase();
  const keyIsValid =
    determineIfLetter(key) && letterCount < 5 && guessCount < 6;

  handleUserType(keyIsValid, keyVal, gameState);

  // user delete character
  const isDelKey = key === "Backspace" && letterCount > 0;

  handleUserDeleteLetter(isDelKey, gameState);

  // user submit a guess
  const enoughLetters = letterCount === WORD_LENGTH;
  const inWordList = WORDS.includes(currentGuess);

  if (key === "Enter" && enoughLetters) {
    if (inWordList) {
      checkGuessSubmit(currentGuess, inWordList);
    } else notInWordlistMsg(app);
  }

  // if (key === "Enter" && enoughLetters) {
  //   if (inWordList) {
  //     if (guessCount === 5 && !isGameOVer) {
  //       gameOver();
  //     }
  //     checkIfCorrectGuess(currentGuess);
  //   } else {
  //     notInWordlistMsg(app);

  //     elmntTarget.removeEventListener(evnt, getKeyPress);
  //     setTimeout(() => {
  //       elmntTarget.addEventListener(evnt, getKeyPress);
  //     }, 500);
  //   }
  // }
};
document.addEventListener("keydown", getKeyPress);

const keyboard = document.getElementById("keyboard-cont") as HTMLDivElement;

const getKeyboardPress = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement | HTMLButtonElement;
  const key = target.textContent!;

  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;
  const guessCount = gameState.guessCount;
  const isGameOVer = gameState.isGameOver;

  // user on-screen keyboard press
  const keyTile = target.classList[0];
  const isCorrectTile = keyTile === "key-tile";
  const keyIsValid = isCorrectTile && letterCount < 5 && guessCount < 6;
  const keyVal = key.toLocaleUpperCase();

  handleUserType(keyIsValid, keyVal, gameState);

  // user on-screen keyboard del
  const deleteClass = target.classList[0];
  const isDelKey = deleteClass === "delete-key" && letterCount > 0;

  handleUserDeleteLetter(isDelKey, gameState);

  // user submit a guess
  const keyClass = target.classList[0];
  const enoughLetters = letterCount === WORD_LENGTH;
  const inWordList = WORDS.includes(currentGuess);

  if (keyClass === "enter-key" && enoughLetters) {
    if (inWordList) {
      checkGuessSubmit(currentGuess, inWordList);
    } else notInWordlistMsg(app);
  }
};

keyboard.addEventListener("click", getKeyboardPress);

const checkGuessSubmit = (guess: string, inWordList: boolean) => {
  const guessCount = gameState.guessCount;

  if (guess == SECRET_WORD) {
    gameWin();
    return;
  }

  if (guess !== SECRET_WORD && guessCount < 6 && inWordList) {
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
      keyboardKey?.classList.add(correctness);
    }
    gameState.guessCount++;
  }

  // maximum guesses
  if (guessCount === 5) {
    gameOver();
    return;
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

  console.log("win");
};

export const gameOver = () => {
  const loseMsgCont = document.createElement("div");
  loseMsgCont.textContent = "You Lost!";

  app.append(loseMsgCont);
  console.log("you lost");
};

makeGameBoard();
