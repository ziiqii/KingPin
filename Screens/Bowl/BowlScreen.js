import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BowlScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity>
        <Text>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Continue Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BowlScreen;
