import { Text, View, Pressable } from "react-native";
import React from "react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

export default function DeleteBall({ id }) {
  const auth = getAuth();

  const deleteBall = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const ballCollectionRef = collection(userRef, "balls");
    const delBallRef = doc(ballCollectionRef, id);
    try {
      await deleteDoc(delBallRef);
      console.log("Ball deleted with ID: ", id);
    } catch (error) {
      console.error("Error deleting ball:", error);
    }
  }

  return (
    <View>
      <Pressable onPress={deleteBall}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
}
