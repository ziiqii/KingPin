/*
Converts a game object into an array to be displayed.
*/

export default function parseScore(game) {
  // Replaces data with empty string if data is null
  const nullPush = (data) => {
    if (data == null) {
      data = "";
    }
    return data;
  };

  // Keeps total score updated
  const nullMax = (score) => {
    if (score == null) {
      return maxScore;
    }
    maxScore = Math.max(maxScore, score);
    return maxScore;
  };

  let rollsTop = [];
  let scoresTop = [];
  let rollsBot = [];
  let scoresBot = [];
  let maxScore = 0;

  // frames 1 to 6
  for (let i = 1; i <= 6; i++) {
    rollsTop.push(nullPush(game["game"][i]["rollOne"]));
    rollsTop.push(nullPush(game["game"][i]["rollTwo"]));
    scoresTop.push(nullPush(game["game"][i]["score"]));
    nullMax(game["game"][i]["score"]);
  }

  // frames 7 to 9
  for (let i = 7; i <= 9; i++) {
    rollsBot.push(nullPush(game["game"][i]["rollOne"]));
    rollsBot.push(nullPush(game["game"][i]["rollTwo"]));
    scoresBot.push(nullPush(game["game"][i]["score"]));
    nullMax(game["game"][i]["score"]);
  }

  // frame 10 and total
  rollsBot.push(nullPush(game["game"][10]["rollOne"]));
  rollsBot.push(nullPush(game["game"][10]["rollTwo"]));
  rollsBot.push(nullPush(game["game"][10]["rollThree"]));
  rollsBot.push("");
  scoresBot.push(nullPush(game["game"][10]["score"]));
  nullMax(game["game"][10]["score"]);
  scoresBot.push(nullPush(maxScore));

  output = [rollsTop, scoresTop, rollsBot, scoresBot];
  return output;
}
