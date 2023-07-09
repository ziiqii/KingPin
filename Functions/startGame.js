import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import generateGame from "./generateGame";

export default async function startGame() {
  const auth = getAuth();

  const newGame = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const gamesRef = collection(userRef, "games"); // collection(reference, collectionName)

    try {
      const newGameRef = await addDoc(gamesRef, {
        date: new Date(),
        game: generateGame(),
      });
      console.log(new Date());
      console.log("Game written with ID: ", newGameRef.id);
      return newGameRef.id;
    } catch (error) {
      console.error("Error starting game:", error);
      return null;
    }
  };

  return await newGame();
}
