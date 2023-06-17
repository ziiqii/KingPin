/*
Returns a new game.
A game is an array of 10 frame objects:
    - Each frame has the following fields:
        - frameNum (number): 1 to 10, initialized as 1 to 10
        - type (string): "open" / "spare" / "strike", all initialized as null
        - remainOne (array of numbers): [], initialized as null
        - remainTwo (array of numbers): [], initialized as null
        - score (number): 0 to 300, initialized as 0

Simplified:
Why not a game is array of 10 frames:
    - Each frame has 2 rolls: [9, 1]
    - 10th frame has 3 rolls: [9, /, 5]
*/
export default function generateGame() {
  const game = {};

  for (let i = 1; i <= 10; i++) {
    // frame 10 needs to have three frame types.
    if (i === 10) {
      const frame = {
        frameNum: i,
        type1: null,
        type2: null,
        type3: null,
        score: null,
        rollOne: null,
        rollTwo: null,
        rollThree: null,
        pinStateOne: null,
        pinStateTwo: null,
        pinStateThree: null,
      };
      game[i] = frame;
    } else {
      const frame = {
        frameNum: i,
        type: null,
        score: null,
        rollOne: null,
        rollTwo: null,
        pinState: null,
      };
      game[i] = frame;
    }
  }

  return game;
}
