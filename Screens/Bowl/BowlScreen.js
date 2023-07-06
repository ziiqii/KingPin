import React from "react";
import { View } from "react-native";
import startGame from "../../Functions/startGame";
import AppButton from "../../Components/Buttons/AppButton";

const BowlScreen = ({ navigation }) => {
  const frameNum = 1;
  const rollNum = 1;

  const handleStartGame = async () => {
    console.log("Game started");
    const gameId = await startGame(); // Wait for the startGame() function to complete and get the gameId
    navigation.navigate("RollScreen1", {
      frameNum: frameNum,
      rollNum: rollNum,
      gameId: gameId, // Pass the gameId as a parameter to RollScreen1
    });
  };

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
        buttonTitle="Start Game"
        onPress={() => {
          handleStartGame();
        }}
      />

      <AppButton buttonTitle="Continue Game" />
    </View>
  );
};

export default BowlScreen;
