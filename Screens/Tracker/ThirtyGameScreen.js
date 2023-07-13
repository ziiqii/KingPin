import React from "react";
import { View, Text } from "react-native";

const ThirtyGameScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>Past 30 Games</Text>
    </View>
  );
};

export default ThirtyGameScreen;
