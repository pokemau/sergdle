// constants
const WORD_LENGTH = 5;
const NUMBER_OF_GUESSES = 6;

export const makeGameBoard = () => {
  const boardCont = document.getElementById("board-cont") as HTMLDivElement;

  for (let i = 1; i <= NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.classList.add(`row`);

    for (let j = 1; j <= WORD_LENGTH; j++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");

      row.append(tile);
    }

    boardCont.append(row);
  }
};
