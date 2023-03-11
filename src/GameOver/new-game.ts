export const createBtns = (gameOverMsgDiv: HTMLDivElement) => {
  const btnsCont = document.createElement("div");
  btnsCont.classList.add("btns-cont");
  const yesBtn = document.createElement("button");
  yesBtn.textContent = "YES";
  yesBtn.classList.add("play-again-btn");
  const noBtn = document.createElement("button");
  noBtn.textContent = "NO";
  noBtn.classList.add("play-again-btn");

  yesBtn.addEventListener("click", () => location.reload());

  noBtn.addEventListener("click", () => {
    const msg = document.querySelector(".game-over-msg");
    msg?.remove();
  });

  btnsCont.append(yesBtn, noBtn);

  gameOverMsgDiv.append(btnsCont);
};

export const gameOverMsg = (winState: string) => {
  const msgDiv = document.createElement("div");
  const pText = document.createElement("p");
  msgDiv.classList.add("game-over-msg");

  const gameOverMsg = `You ${winState}!`;
  const playAganMsg = `Play Again?`;
  pText.textContent = playAganMsg;
  pText.classList.add("pText");
  msgDiv.textContent = gameOverMsg;
  msgDiv.append(pText);

  createBtns(msgDiv);

  const boardCont = document.getElementById("board-cont") as HTMLDivElement;

  boardCont.append(msgDiv);
};
