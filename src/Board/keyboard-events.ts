import { GameState } from "../Utils/interfaces";

export const showLetterOnTiles = (key: string, gameState: GameState) => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = key;
};

export const deleteLetterFromTile = (gameState: GameState) => {
  const currRow = document.getElementsByClassName("row")[gameState.guessCount];
  const currLetter =
    currRow.getElementsByClassName("tile")[gameState.letterCount];

  currLetter.textContent = "";
};
export const handleUserType = (
  keyIsValid: boolean,
  keyVal: string,
  gameState: GameState
) => {
  if (keyIsValid) {
    showLetterOnTiles(keyVal, gameState);
    gameState.currentGuess += keyVal.toLocaleLowerCase();
    gameState.letterCount++;
  }
};

export const handleUserDeleteLetter = (
  isDelKey: boolean,
  gameState: GameState
) => {
  if (isDelKey) {
    gameState.letterCount--;
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    deleteLetterFromTile(gameState);
  }
};
