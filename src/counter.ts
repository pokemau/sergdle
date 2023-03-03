export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;

  const setCounter = (count: number) => {
    counter = count;
    element.textContent = `count is ${count}`;
  };

  element.addEventListener("click", () => setCounter(counter + 1));

  setCounter(0);
}
