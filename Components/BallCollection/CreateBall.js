import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CreateBall({ toggleModal }) {
  const [addedBall, setAddedBall] = useState({ balls: "" });

  const addBall = async () => {
    const ballCollection = collection(db, "ballCollection");
    const newBallRef = await addDoc(ballCollection, {
      balls: addedBall.balls,
    });
    console.log("Ball written with ID: ", newBallRef.id);
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
