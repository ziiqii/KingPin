import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import startGame from "../../Functions/startGame";

const BowlScreen = ({ navigation }) => {
  const frameNum = 1;
  const rollNum = 1;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log("Game started");
          startGame();
          navigation.navigate("RollScreen1", {
            frameNum: frameNum,
            rollNum: rollNum,
          });
        }}
        style={{
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white" }}>Continue Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BowlScreen;
