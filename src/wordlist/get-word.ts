export const getRandomWord = (wordlist: string[]) => {
  const RANDOM_WORD =
    wordlist[Math.floor(Math.random() * wordlist.length)].toLocaleLowerCase();

  return RANDOM_WORD;
};
