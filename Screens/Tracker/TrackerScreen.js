import React from "react";
import { Text, View } from "react-native";
import ScoreBoard from "../../Components/Tables/ScoreBoard";

import PinInitial from "../../Components/Buttons/PinInitial";

const TrackerScreen = () => {
  return (
    <View style={{backgroundColor: "#36393f"}}>
      <Text>Analytics</Text>
      <ScoreBoard />

      <PinInitial buttonTitle={1}/>
    </View>
  );
};

export default TrackerScreen;
