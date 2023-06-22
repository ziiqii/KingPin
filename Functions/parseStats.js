/*
Converts a game object into an array to be used for analytics.

Returns an array of: 
1. Total score
2. # of strikes
3. # of spares
4. # of rolls
*/

export default function parseGame(game) {
  // Replaces data with empty string if data is null
  const nullPush = (data) => {
    if (data == null) {
      data = "";
    }
    return data;
  };

  let score = 0;
  let strikes = 0;
  let spares = 0;
  let frames = 10; // becomes 21 if type1 is strike or type2 is spare

  // Get score

  score = game["game"][10]["score"]

  // Get strikes and spares
  for (let i = 1; i <= 9; i++) {
    // frames 1 to 9
    if (game["game"][i]["type"] == "strike") {
      strikes += 1;
    } else if (game["game"][i]["type"] == "spare") {
      spares += 1;
    }
  }

  // frame 10
  let frameTenRolls = [];
  frameTenRolls.push(nullPush(game["game"][10]["type1"]));
  frameTenRolls.push(nullPush(game["game"][10]["type2"]));
  frameTenRolls.push(nullPush(game["game"][10]["type3"]));
  if (frameTenRolls[0] == "strike") {
    frames = 11
    if (frameTenRolls[1] == "strike") {
      frames = 12
    }
  } else if (frameTenRolls[1] == "spare") {
    frames = 11
  }
  for (let i = 0; i < 3; i++) {
    if (frameTenRolls[i] == "strike") {
        strikes += 1
    } else if (frameTenRolls[i] == "spare") {
        spares += 1
    }
  }

  const output = [score, strikes, spares, frames];
  return output;
}
