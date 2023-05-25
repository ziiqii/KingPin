import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

export default function CreateBall({ toggleModal }) {
  const auth = getAuth();
  const [addedBall, setAddedBall] = useState({ balls: "" });

  const addBall = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const ballCollectionRef = collection(userRef, "balls"); // collection(reference, collectionName)

    try {
      const newBallRef = await addDoc(ballCollectionRef, {
        name: addedBall.balls,
      });
      console.log("Ball written with ID: ", newBallRef.id);
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        fontSize={30}
        placeholder="Add your ball here"
        value={addedBall.balls}
        onChangeText={(text) => setAddedBall({ ...addedBall, balls: text })}
      />
      <Pressable
        onPress={() => {
          addBall();
          toggleModal();
        }}
      >
        <Text style={{ fontSize: 30 }}>Add Ball</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
