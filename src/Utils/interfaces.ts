export interface GameState {
  guessCount: number;
  letterCount: number;
  currentGuess: string;
  guessList: string[];
  isGameOver: boolean;
}
