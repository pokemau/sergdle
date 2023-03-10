import { GameState } from "../Utils/interfaces";

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

type Correctness = "correct" | "slightly-correct" | "wrong";

export const checkCorrectLetter = (
  guessL: string,
  wordL: string,
  SECRET_WORD: string
): Correctness => {
  if (guessL === wordL) return "correct";
  else if (SECRET_WORD.includes(guessL)) return "slightly-correct";
  else return "wrong";
};

export const notInWordlistMsg = (app: HTMLDivElement) => {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("not-word");
  msgDiv.id = "not-word-div";

  msgDiv.textContent = "Not in Wordlist";

  app.prepend(msgDiv);

  setTimeout(() => {
    const msgDivEl = document.getElementById("not-word-div") as HTMLDivElement;
    msgDivEl.remove();
  }, 500);

  return;
};
