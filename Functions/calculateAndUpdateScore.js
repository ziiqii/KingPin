import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

// after updating the db state, we will need to fetch the game state from the db
// to use in calculating the score.

// The calculating and updating of score should only be done after the second roll
// for frames 1 - 9, and after the third roll for frame 10 (or after second roll for
// frame 10 if the first 2 throws were open)

/* 
  based on the flowchart on canva, the process is:
  
  1. Fetch game state from db
  2. Run the calculateScore on the fetch game state
  3. Obtain the score for the current frame (if there is insufficient info e.g. null values, 
    delay calculation of current frame to a later frame)
  4. Update the db with the newly obtained score
  */
// game , frameNum

export default async function calculateAndUpdateScore(gameId) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  try {
    // Get the game document
    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists) {
      // console.log(
      //   "This is the data I'm trying to get :",
      //   gameDoc.data().game[frameNum]["rollOne"]
      // );

      // whole game with all frames
      const game = gameDoc.data().game;

      // The start of calculating score
      const frames = { ...game };
      let prevScore = 0;

      for (let frameNum = 1; frameNum <= 10; frameNum++) {
        const frame = frames[frameNum];
        let score;

        // This if else block is the logic for not updating/displaying the score
        // for frames that have not been reached yet.
        if (frameNum != 10) {
          if (frame["pinState"] == null) {
            // console.log(
            //   "Frame number that we will not update the score of: ",
            //   frameNum
            // );
            continue;
          }
        } else {
          // frame 10
          if (frame["rollOne"] == null) {
            continue;
          }
        }

        // calculate and update logic
        if (frameNum === 10) {
          score = calculateFrameTen(frame);
        } else {
          if (frame.type === "strike") {
            score = calculateStrike(
              frame,
              frames[frameNum + 1],
              frames[frameNum + 2]
            );
          } else if (frame.type === "spare") {
            score = calculateSpare(frames[frameNum + 1]);
          } else {
            score = calculateOpenFrame(frame);
          }
        }

        // updating of score should happen here:

        const newScore = prevScore + score;
        prevScore = newScore;

        // game[frameNum]["rollOne"]

        const updatedScore = {
          [`game.${frameNum}.score`]: newScore,
        };

        try {
          await updateDoc(gameRef, updatedScore);
          console.log("Score updated successfully");
        } catch (error) {
          console.error("Error updating score:", error);
        }
      }
    } else {
      console.log("No such doc");
    }
  } catch (error) {
    console.error("Error updating game score:", error);
  }

  function calculateStrike(frame, nextFrame, nextNextFrame) {
    if (nextFrame.type === "strike") {
      if (frame.frameNum === 8) {
        if (nextNextFrame.rollOne === 10) {
          return 30;
        } else {
          return 20 + nextNextFrame.rollOne;
        }
      } else if (nextNextFrame.type === "strike") {
        return 30;
      } else {
        return 20 + nextNextFrame.rollOne;
      }
    } else if (nextFrame.type === "spare") {
      return 20;
    } else {
      return 10 + (nextFrame.rollOne + nextFrame.rollTwo);
    }
  }

  function calculateSpare(nextFrame) {
    if (nextFrame.rollOne === 0 || nextFrame.rollOne === null) {
      return 10;
    } else if (nextFrame.rollOne === 10) {
      return 20;
    } else {
      return 10 + nextFrame.rollOne;
    }
  }

  function calculateOpenFrame(frame) {
    return frame.rollOne + frame.rollTwo;
  }

  function calculateFrameTen(frame) {
    if (frame.rollThree == null) {
      return calculateOpenFrame(frame);
    } else {
      return calculateOpenFrame(frame) + frame.rollThree;
    }
  }
}
