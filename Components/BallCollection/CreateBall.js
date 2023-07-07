import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
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

  const handleAddBall = () => {
    if (addedBall.balls.trim() === "") {
      // the "name" field is empty
      Alert.alert(
        "Please include the ball name",
        "The ball name field cannot be empty."
      );
      return;
    }
    addBall();
    toggleModal();
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        onPress={() => {
          handleAddBall();
        }}
        style={{
          borderRadius: 3,
          backgroundColor: "#673AB7",
          padding: 10,
          paddingHorizontal: 60,
          margin: 10,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Add Ball</Text>
      </TouchableOpacity>
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
