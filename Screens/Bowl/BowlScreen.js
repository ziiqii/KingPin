import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import startGame from "../../Functions/startGame";

const BowlScreen = ({ navigation }) => {
  const frameNum = 1;
  const rollNum = 1;

  const handleStartGame = async () => {
    console.log("Game started");
    const gameId = await startGame(); // Wait for the startGame() function to complete and get the gameId
    console.log("This is the gameId!: ", gameId);
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
      <TouchableOpacity
        onPress={() => {
          handleStartGame();
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
