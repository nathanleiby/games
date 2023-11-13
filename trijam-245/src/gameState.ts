export const gameState = {
  activeSheep: 0,
  sheepCounted: 0,
};

export function incrementSheepCounted() {
  gameState.sheepCounted += 1;
}
