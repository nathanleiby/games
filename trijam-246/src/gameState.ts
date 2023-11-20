import { Sounds } from "./loader";

interface GameState {
  currentLevel: number;
  currentSequenceLength: number;
  isGameOver: boolean;

  playInput: string[];
  desiredInput: string[];
  isPlayingDesiredInput: boolean;
}

export const gameState: GameState = {
  currentLevel: 1,
  currentSequenceLength: 1,
  isGameOver: false,

  playInput: [],
  desiredInput: [],

  isPlayingDesiredInput: false,
};

export const BOOP = "boop";
export const BEEP = "beep";
// const BOP = "bop";

export function newGame() {
  gameState.currentLevel = 1;
  gameState.currentSequenceLength = 1;
  gameState.isGameOver = false;

  resetPuzzle();
}

export function resetPuzzle() {
  gameState.playInput = [];

  // generate a desired input according to the given length, composed of BOOPS and BEEPS
  gameState.desiredInput = [];
  for (let i = 0; i < gameState.currentSequenceLength; i++) {
    const random = Math.random();
    if (random < 0.5) {
      gameState.desiredInput.push(BOOP);
    } else {
      gameState.desiredInput.push(BEEP);
    }
  }

  // to help for playtesting without sound
  console.log("Desired Input:", gameState.desiredInput);
}

export function addPlayInput(input: string) {
  gameState.playInput.push(input);
}

export async function playDesiredInput() {
  if (gameState.isPlayingDesiredInput) {
    return;
  }

  gameState.isPlayingDesiredInput = true;
  const asyncFunctions = gameState.desiredInput.map((input) => {
    return async () => {
      if (input === BOOP) {
        return Sounds.boop.play(1.0);
      } else if (input === BEEP) {
        return Sounds.beep.play(1.0);
      }
    };
  });

  for (const asyncFn of asyncFunctions) {
    await asyncFn();
  }

  gameState.isPlayingDesiredInput = false;
}
