import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import BallInput from "../Inputs/BallInput";

export default function CreateBall({ toggleModal }) {
  const auth = getAuth();
  const [addedBall, setAddedBall] = useState({
    balls: "",
    weight: "",
    Differential: "",
    RadiusOfGyration: "",
  });

  const addBall = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const ballCollectionRef = collection(userRef, "balls"); // collection(reference, collectionName)

    try {
      const newBallRef = await addDoc(ballCollectionRef, {
        name: addedBall.balls,
        weight: addedBall.weight,
        differential: addedBall.Differential,
        radiusOfGyration: addedBall.RadiusOfGyration,
      });
      console.log("Ball written with ID: ", newBallRef.id);
    } catch (error) {
      console.error("Error adding ball:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        fontSize={30}
        placeholder="Ball name"
        value={addedBall.balls}
        onChangeText={(text) => setAddedBall({ ...addedBall, balls: text })}
      /> */}
      <BallInput
        labelValue={addedBall.balls}
        onChangeText={(text) => setAddedBall({ ...addedBall, balls: text })}
        placeholderText="Ball name"
      />
      <BallInput
        labelValue={addedBall.weight}
        onChangeText={(text) => setAddedBall({ ...addedBall, weight: text })}
        placeholderText="Weight (in lb)"
        keyboardType="numeric"
      />
      <BallInput
        labelValue={addedBall.Differential}
        onChangeText={(text) =>
          setAddedBall({ ...addedBall, Differential: text })
        }
        placeholderText="Differential"
        keyboardType="numeric"
      />
      <BallInput
        labelValue={addedBall.RadiusOfGyration}
        onChangeText={(text) =>
          setAddedBall({ ...addedBall, RadiusOfGyration: text })
        }
        placeholderText="Radius of Gyration (RG)"
        keyboardType="numeric"
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
