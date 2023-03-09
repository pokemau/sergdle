export const determineIfLetter = (letter: string) => {
  const letterASCIIValue = letter.charCodeAt(0);
  const capsLetter = letterASCIIValue >= 65 && letterASCIIValue <= 90;
  const smallLetter = letterASCIIValue >= 97 && letterASCIIValue <= 122;
  const length = letter.length === 1;
  return length && (capsLetter || smallLetter);
};
