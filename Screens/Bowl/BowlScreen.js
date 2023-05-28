import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BowlScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Roll1")}>
        <Text style={{fontSize: 20, color: "white"}}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{fontSize: 20, color: "white"}}>Continue Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BowlScreen;
