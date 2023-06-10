import { doc, collection, updateDoc } from "firebase/firestore";
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

export default async function updateGameAftRoll1(
  gameId,
  frameNum,
  rollNum,
  pinArray
) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  // number of pins still standing after first throw:
  const standingPinsCount = Object.values(pinArray).filter(
    (state) => state === "standing"
  ).length;

  const rollOne = 10 - standingPinsCount;
  const roll = rollNum;

  // modify this line below
  const updatedFields = { [`game.${frameNum}.type`]: "strike" };

  try {
    await updateDoc(gameRef, updatedFields);
    console.log("Game updated successfully");
  } catch (error) {
    console.error("Error updating game:", error);
  }

  // // TODO: import and use calculateScore()
  // if (rollNum === 1) {
  //   updatedGame[frameNum - 1].remainOne = pinArray;
  // } else if (rollNum === 2) {
  //   updatedGame[frameNum - 1].remainTwo = pinArray;
  // }

  // return updatedGame;
}
