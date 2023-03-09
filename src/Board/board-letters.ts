import { GameState } from "../Utils/interfaces";

const WORD_LENGTH = 5;

export const showLetter = (key: string, gameState: GameState) => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = key;
};

export const deleteLetter = (gameState: GameState) => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = "";
};

export const checkLetterIfCorrect = (
  gameState: GameState,
  SECRET_WORD: string
) => {
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currRow =
      document.getElementsByClassName("row")[gameState.guessCount];
    const currLetter = currRow.getElementsByClassName("tile")[i];
    const currGuessLetter = currLetter.textContent?.toLocaleLowerCase()!;

    if (currGuessLetter == SECRET_WORD[i]) {
      currLetter.classList.add("correct");
    } else if (SECRET_WORD.includes(currGuessLetter)) {
      currLetter.classList.add("slightly-correct");
    } else currLetter.classList.add("wrong");
  }
  gameState.guessCount++;
};
