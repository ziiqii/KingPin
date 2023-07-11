import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import BallInput from "../Inputs/BallInput";
import { Dropdown } from "react-native-element-dropdown";

export default function CreateBall({ toggleModal }) {
  const auth = getAuth();
  const [addedBall, setAddedBall] = useState({
    balls: "",
    weight: "",
    Differential: "",
    RadiusOfGyration: "",
    oilCondition: "",
  });
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  // https://www.motivbowling.com/products/balls/medium-heavy-oil/
  const data = [
    { label: "Heavy", value: "Heavy" },
    { label: "Medium-Heavy", value: "Medium-Heavy" },
    { label: "Medium", value: "Medium" },
    { label: "Light-Medium", value: "Light-Medium" },
    { label: "Light", value: "Light" },
  ];

  const addBall = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const ballCollectionRef = collection(userRef, "balls"); // collection(reference, collectionName)

    try {
      const newBallRef = await addDoc(ballCollectionRef, {
        name: addedBall.balls,
        weight: addedBall.weight,
        differential: addedBall.Differential,
        radiusOfGyration: addedBall.RadiusOfGyration,
        oilCondition: addedBall.oilCondition,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <BallInput
            labelValue={addedBall.balls}
            onChangeText={(text) => setAddedBall({ ...addedBall, balls: text })}
            placeholderText="Ball name"
            autoFocus={true}
          />
          <BallInput
            labelValue={addedBall.weight}
            onChangeText={(text) =>
              setAddedBall({ ...addedBall, weight: text })
            }
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
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Oil Condition" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setAddedBall({ ...addedBall, oilCondition: item.value });
                setIsFocus(false);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              handleAddBall();
            }}
            style={{
              borderRadius: 3,
              backgroundColor: "#673AB7",
              padding: 10,
              paddingHorizontal: 60,
              // margin: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Add Ball</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  dropdownContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#666",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
