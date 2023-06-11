/*
Takes in a game, frame, roll, and an array of pins.
    - frameNum: 1 to 10
    - rollNum: 1 or 2
    - pinArray: [] or longer
Updates the remaining pins and score.
Returns an updated game.
*/

export default function updateGame(game, frameNum, rollNum, pinArray) {
  const updatedGame = [...game]; // shallow copy

  // TODO: import and use calculateScore()
  if (rollNum === 1) {
    updatedGame[frameNum - 1].remainOne = pinArray;
  } else if (rollNum === 2) {
    updatedGame[frameNum - 1].remainTwo = pinArray;
  }

  return updatedGame;
}
