import { GameState } from "../Utils/interfaces";
import { gameOverMsg } from "./new-game";
import { getKeyPress } from "../main";

export const gameWin = (gameState: GameState, WORD_LENGTH: number) => {
  gameState.isGameOver = true;
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currRow =
      document.getElementsByClassName("row")[gameState.guessCount];
    const currLetter = currRow.getElementsByClassName("tile")[i];

    currLetter.classList.add("correct");
  }

  const winState = "Win";

  gameOverMsg(winState);

  document.removeEventListener("keydown", getKeyPress);
};
