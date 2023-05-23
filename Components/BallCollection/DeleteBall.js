import { Text, View, Pressable } from "react-native";
import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DeleteBall({ id }) {
  function deleteBall() {
    const ball = doc(db, "ballCollection", id);
    deleteDoc(ball);
  }

  return (
    <View>
      <Pressable onPress={deleteBall}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
}
