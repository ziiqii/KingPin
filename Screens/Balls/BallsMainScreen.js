import React from "react";
import { View } from "react-native";
import AppButton from "../../Components/Buttons/AppButton";

const BallsMainScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      <AppButton
        buttonTitle="View all balls"
        onPress={() => navigation.navigate("BallsScreen")}
      />
      <AppButton
        buttonTitle="View arsenal"
        onPress={() => {
          navigation.navigate("ArsenalScreen");
        }}
      />
    </View>
  );
};

export default BallsMainScreen;
