import React from "react";
import { View, Text } from "react-native";

const TodayScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>Today's Games</Text>
    </View>
  );
};

export default TodayScreen;
