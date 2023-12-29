// Visual Layout
export const SCREEN_WIDTH = 1440;
export const SCREEN_HEIGHT = 1024;

export const FLOOR_HEIGHT = SCREEN_HEIGHT - 256 / 2;
export const FENCE_HEIGHT = 512;
export const ON_TOP_OF_FENCE_HEIGHT = 416;

export const FENCE_X = SCREEN_WIDTH / 2 - 16;
export const FENCE_WIDTH = 32;

export const FINISH_LINE_WIDTH = SCREEN_WIDTH * 0.85;

// Gameplay
export const MAX_SHEEP = 10; // end game when this number of sheep is reached

const DEBUG_MODE = true;
export const DEBUG_FLAGS = {
  DISABLE_MUSIC: true,
  END_GAME_AT_ONE_SHEEP: true,
  SUPRESS_PLAY_BUTTON: true,
};

if (!DEBUG_MODE) {
  for (const [key] of Object.entries(DEBUG_FLAGS)) {
    // @ts-ignore
    DEBUG_FLAGS[key] = false;
  }
}
