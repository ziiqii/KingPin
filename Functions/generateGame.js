/*
Returns a new game.
A game is an array of 10 frame objects:
    - Each frame has the following fields:
        - frameNum (number): 1 to 10, initialized as 1 to 10
        - type (string): "open" / "spare" / "strike", all initialized as null
        - remainOne (array of numbers): [], initialized as null
        - remainOne (array of numbers): [], initialized as null
        - score (number): 0 to 300, initialized as 0

Simplified:
Why not a game is array of 10 frames:
    - Each frame has 2 rolls: [9, 1]
    - 10th frame has 3 rolls: [9, /, 5]
*/
export default function generateGame() {
  const frames = [];

  for (let i = 1; i <= 10; i++) {
    const frame = {
      frameNum: i,
      type: null,
      remainOne: [],
      remainTwo: [],
      score: 0,
    };

    frames.push(frame);
  }

  return frames;
}
