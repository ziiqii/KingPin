import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import calculateScore from "./calculateScore";

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

export default async function updateScore(gameId, frameNum) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  try {
    // Get the game document
    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists) {
      console.log(
        "This is the data I'm trying to get :",
        gameDoc.data().game[frameNum]["rollOne"]
      );

      // whole game with all frames
      const game = gameDoc.data().game;

      const currScore = calculateScore(game);
      console.log(currScore);
    } else {
      console.log("No such doc");
    }
  } catch (error) {
    console.error("Error updating game score:", error);
  }
}
