import React from "react";
import { View, Text } from "react-native";
import ScoreBoard from "../../Components/Tables/ScoreBoard";

const GameOverScreen = ({ route }) => {
  const { gameId } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      <Text style={{ fontSize: 50, color: "white", textAlign: "center" }}>
        GAME OVER
      </Text>
      <View style={{ alignItems: "stretch" }}>
        <ScoreBoard Id={gameId} />
      </View>
    </View>
  );
};

export default GameOverScreen;
