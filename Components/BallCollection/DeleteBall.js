import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import Icon from "react-native-vector-icons/AntDesign";

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
  };

  const showConfirmBox = () => {
    return Alert.alert(
      "Deleting ball",
      "Are you sure you want to delete this ball?",
      [
        // "Cancel" button
        // Just dismisses the dialog when tapped
        { text: "Cancel" },
        // "Confirm" button
        {
          text: "Confirm",
          onPress: () => {
            deleteBall();
          },
          style: "destructive",
        },
      ],

      { cancelable: false }
    );
  };

  const handleDelete = () => {
    showConfirmBox();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleDelete} style={{ margin: 10 }}>
        <Icon name="delete" size={20} color="#FE6464" />
      </TouchableOpacity>
    </View>
  );
}
