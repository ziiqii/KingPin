import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

/*
Takes in a game, frame, roll, and an array of pins.
    - frameNum: 1 to 10
    - rollNum: 1 or 2 or 3
    - pinArray: [] or longer
Updates the remaining pins and score.
Returns an updated game.
*/

export default async function updateGame(
  gameId, // to get to the document to update
  frameNum, // to find out which specific frame to update in the game
  rollNum, // to find out where to place the points of the roll
  pinArray, // to get the points of that roll
  frameState // to get the "type" of the frame
) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  // number of pins still standing
  const standingPinsCount = Object.values(pinArray).filter(
    (state) => state === "standing"
  ).length;

  // number of pins that were converted
  const convertedPinsCount = Object.values(pinArray).filter(
    (state) => state === "converted"
  ).length;

  // think about how to fit "score" into this
  const score = 999;

  // seperating into frame 10 vs non-frame 10

  // non-frame 10:
  if (frameNum != 10) {
    const rollNumber = rollNum == 1 ? "rollOne" : "rollTwo";

    let points = null;
    if (rollNum == 1) {
      points = 10 - standingPinsCount;
    } else {
      points = convertedPinsCount;
    }

    const updatedFields = {
      [`game.${frameNum}.${rollNumber}`]: points,
      [`game.${frameNum}.score`]: score,
      [`game.${frameNum}.type`]: frameState,
    };

    try {
      await updateDoc(gameRef, updatedFields);
      console.log("Game updated successfully");
    } catch (error) {
      console.error("Error updating game:", error);
    }
  } else {
    // frame 10:
    const rollNumber = (() => {
      switch (rollNum) {
        case 1:
          return "rollOne";
        case 2:
          return "rollTwo";
        case 3:
          return "rollThree";
      }
    })();

    const typeNumber = (() => {
      switch (rollNum) {
        case 1:
          return "type1";
        case 2:
          return "type2";
        case 3:
          return "type3";
      }
    })();

    let points = null;
    if (rollNum == 1) {
      points = 10 - standingPinsCount;
    } else {
      if (frameState == null || frameState == "strike") {
        points = 10 - standingPinsCount;
      } else {
        points = convertedPinsCount;
      }
    }

    const updatedFields = {
      [`game.${frameNum}.${rollNumber}`]: points,
      [`game.${frameNum}.score`]: score,
    };

    if (rollNum == 3 && frameState == null) {
      updatedFields[`game.${frameNum}.${typeNumber}`] = "open";
    } else {
      updatedFields[`game.${frameNum}.${typeNumber}`] = frameState;
    }

    try {
      await updateDoc(gameRef, updatedFields);
      console.log("Game updated successfully");
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }
}
