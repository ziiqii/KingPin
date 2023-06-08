import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const GameOverScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      <Text style={{ fontSize: 50, color: "white" }}>GAME OVER</Text>
    </View>
  );
};

export default GameOverScreen;
