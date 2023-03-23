import { GameState } from "../Utils/interfaces";
import { gameWin } from "../GameOver/game-win";
import { gameOver } from "../GameOver/game-over";
import { checkCorrectLetter } from "../Board/board-letters";

export const checkGuessSubmit = (
  guess: string,
  inWordList: boolean,
  gameState: GameState,
  SECRET_WORD: string,
  WORD_LENGTH: number
) => {
  const guessCount = gameState.guessCount;

  if (guess == SECRET_WORD) {
    gameWin(gameState, WORD_LENGTH);
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
