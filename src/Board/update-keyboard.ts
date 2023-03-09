export const updateKeyboard = (
  guess: string,
  SECRET_WORD: string,
  WORD_LENGTH: number
) => {
  for (let i = 0; i < WORD_LENGTH; i++) {
    const currLetter = guess[i];
    const keyboardKey = document.getElementById(currLetter);
    console.log(keyboardKey);
  }
};
