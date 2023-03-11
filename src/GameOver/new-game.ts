export const createBtns = (app: HTMLDivElement) => {
  const btnsCont = document.createElement("div");
  btnsCont.classList.add("btns-cont");
  const yesBtn = document.createElement("button");
  yesBtn.textContent = "YES";
  yesBtn.classList.add("play-again-btn");
  const noBtn = document.createElement("button");
  noBtn.textContent = "NO";
  noBtn.classList.add("play-again-btn");

  btnsCont.append(yesBtn, noBtn);

  app.append(btnsCont);
};

export const gameOverMsg = (winState: string) => {
  console.log(`You ${winState}`);
};
