import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ScoreBoard from "../../Components/Tables/ScoreBoard";
import updateStats from "../../Functions/updateStats";

const GameOverScreen = ({ route }) => {
  const { gameId } = route.params;

  useEffect(() => {
    const delay = 2000; // 2 seconds delay before retrieving score
    const timer = setTimeout(() => {
      updateStats(gameId);
      console.log("Stats updated");
    }, delay);

    return () => clearTimeout(timer); // Cleanup function to clear the timer if the component unmounts before the delay is over
  }, []);

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
