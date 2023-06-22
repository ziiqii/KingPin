import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import parseStats from "./parseStats";

/*
1. Parses the game to get stats.
2. Access and update the analytics document.
*/

export default async function updateStats(
  gameId // to get to the document of the finished game
) {
  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser?.email);
  const gameRef = doc(userRef, "games", gameId);

  try {
    // Get the game document
    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists) {
      const game = gameDoc.data();
      const parsedStats = parseStats(game);
      // parsedStats = [score, strikes, spares, frames]
      await updateDoc(userRef, {
        games: increment(1),
        score: increment(parsedStats[0]),
        strikes: increment(parsedStats[1]),
        spares: increment(parsedStats[2]),
        frames: increment(parsedStats[3]),
      });
    } else {
      console.log("No such doc");
    }
  } catch (error) {
    console.error("Could not get document", error);
  }
}
