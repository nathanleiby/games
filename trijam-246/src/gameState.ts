import { Sounds } from "./loader";

interface GameState {
  playInput: string[];
  desiredInput: string[];
  isPlayingDesiredInput: boolean;
}
export const gameState: GameState = {
  playInput: [],
  desiredInput: [],
  isPlayingDesiredInput: false,
};

export const BOOP = "boop";
export const BEEP = "beep";
// const BOP = "bop";

export function resetPuzzle(length: number = 3) {
  gameState.playInput = [];

  // generate a desired input according to the given length, composed of BOOPS and BEEPS
  gameState.desiredInput = [];
  for (let i = 0; i < length; i++) {
    const random = Math.random();
    if (random < 0.5) {
      gameState.desiredInput.push(BOOP);
    } else {
      gameState.desiredInput.push(BEEP);
    }
  }
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
