import "./style.css";

import { makeGameBoard } from "./Board/make-board";
import { GameState } from "./Utils/interfaces";
import { determineIfLetter } from "./Utils/determine-if-letter";
import { WORDS } from "./wordlist/word-list";
import { getRandomWord } from "./wordlist/get-random-word";
import { notInWordlistMsg } from "./Board/board-letters";
import { checkGuessSubmit } from "./SubmitGuess/check-guess-submit";
import {
  handleUserType,
  handleUserDeleteLetter,
} from "./Board/keyboard-events";

// constants
const WORD_LENGTH = 5;
let SECRET_WORD = getRandomWord(WORDS);

// const app = document.getElementById("app") as HTMLDivElement;

const gameState: GameState = {
  guessCount: 0,
  letterCount: 0,
  currentGuess: "",
  guessList: [],
  isGameOver: false,
};

makeGameBoard();

export const getKeyPress = (e: KeyboardEvent) => {
  const key = e.key;
  const guessCount = gameState.guessCount;
  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;

  // user type
  const keyVal = key.toLocaleUpperCase();
  const keyIsValid =
    determineIfLetter(key) && letterCount < 5 && guessCount < 6;

  handleUserType(keyIsValid, keyVal, gameState);

  // user delete characterk
  const isDelKey = key === "Backspace" && letterCount > 0;

  handleUserDeleteLetter(isDelKey, gameState);

  // user submit a guess
  const enoughLetters = letterCount === WORD_LENGTH;
  const inWordList = WORDS.includes(currentGuess);

  if (key === "Enter" && enoughLetters) {
    if (inWordList) {
      checkGuessSubmit(
        currentGuess,
        inWordList,
        gameState,
        SECRET_WORD,
        WORD_LENGTH
      );
    } else {
      notInWordlistMsg();

      document.removeEventListener("keydown", getKeyPress);
      setTimeout(() => {
        document.addEventListener("keydown", getKeyPress);
      }, 500);
    }
  }
};

document.addEventListener("keydown", getKeyPress);

const keyboard = document.getElementById("keyboard-cont") as HTMLDivElement;

const getKeyboardPress = (e: MouseEvent) => {
  const target = e.target as HTMLDivElement | HTMLButtonElement;
  const key = target.textContent!;

  const letterCount = gameState.letterCount;
  const currentGuess = gameState.currentGuess;
  const guessCount = gameState.guessCount;

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
      checkGuessSubmit(
        currentGuess,
        inWordList,
        gameState,
        SECRET_WORD,
        WORD_LENGTH
      );
    } else {
      notInWordlistMsg();
      keyboard.removeEventListener("click", getKeyboardPress);
      setTimeout(() => {
        keyboard.addEventListener("click", getKeyboardPress);
      }, 500);
    }
  }
};

keyboard.addEventListener("click", getKeyboardPress);
