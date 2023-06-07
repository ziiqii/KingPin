import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import startGame from "../../Functions/startGame";

const BowlScreen = ({ navigation }) => {
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
          navigation.navigate("RollScreen1");
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
