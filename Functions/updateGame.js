import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import calculateAndUpdateScore from "./calculateAndUpdateScore";

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
  pinState, // to get the points of that roll
  frameState // to get the "type" of the frame
) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  // number of pins still standing
  const standingPinsCount = Object.values(pinState).filter(
    (state) => state === "standing"
  ).length;

  // number of pins that were converted
  const convertedPinsCount = Object.values(pinState).filter(
    (state) => state === "converted"
  ).length;

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
      [`game.${frameNum}.type`]: frameState,
      [`game.${frameNum}.pinState`]:
        rollNum == 2 || (rollNum == 1 && frameState == "strike")
          ? pinState
          : null,
    };

    // finally updating the database
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

    const pinStateNumber = (() => {
      switch (rollNum) {
        case 1:
          return "pinStateOne";
        case 2:
          return "pinStateTwo";
        case 3:
          return "pinStateThree";
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
    };

    // for updating of frame type
    if (rollNum == 3 && frameState == null) {
      updatedFields[`game.${frameNum}.${typeNumber}`] = "open";
    } else {
      updatedFields[`game.${frameNum}.${typeNumber}`] = frameState;
    }

    // for updating of pin state (only updates when a frame is finished)
    if (
      (rollNum == 1 && frameState != "strike") ||
      (rollNum == 2 && frameState == null)
    ) {
      updatedFields[`game.${frameNum}.${pinStateNumber}`] = null;
    } else {
      updatedFields[`game.${frameNum}.${pinStateNumber}`] = pinState;
    }

    // finally updating the database
    try {
      await updateDoc(gameRef, updatedFields);
      console.log("Game updated successfully");
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }

  // determine whether to run calculateAndUpdateScore or not:
  // we will need information of the previous roll to decide whether
  // to calculate score or not in frame 10

  if (frameNum != 10) {
    if (rollNum == 2 || frameState == "strike") {
      calculateAndUpdateScore(gameId);
    }
  } else {
    // frame 10, score is never calculated on roll1
    // only 2 cases: either calculate after second roll if second roll was open and first roll was NOT strike,
    // or calculate after third roll.

    try {
      // Get the game document
      const gameDoc = await getDoc(gameRef);
      if (gameDoc.exists) {
        const firstRollStrike = gameDoc.data().game[10]["type1"] == "strike";
        if (
          (rollNum == 2 && frameState == "open" && !firstRollStrike) ||
          rollNum == 3
        ) {
          calculateAndUpdateScore(gameId);
        }
      } else {
        console.log("No such doc");
      }
    } catch (error) {
      console.error("Error obtaining game fields in updateGame:", error);
    }
  }
}
