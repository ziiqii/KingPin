import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CreateBall({ toggleModal }) {
  const [addedBall, setAddedBall] = useState({ balls: "" });

  function addBall() {
    const ballDb = collection(db, "ballCollection");
    addDoc(ballDb, {
      balls: addedBall.balls,
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
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
        <Text>Add Ball</Text>
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
