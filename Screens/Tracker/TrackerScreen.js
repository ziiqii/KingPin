import React from "react";
import { Text, View } from "react-native";
import ScoreBoard from "../../Components/Tables/ScoreBoard";

import PinInit from "../../Components/Buttons/PinInit";
import PinStand from "../../Components/Buttons/PinStand";
import PinDown from "../../Components/Buttons/PinDown";
import PinConv from "../../Components/Buttons/PinConv";

const TrackerScreen = () => {
  return (
    <View style={{ backgroundColor: "#36393f" }}>
      <Text>Analytics</Text>
      <ScoreBoard />

      <PinInit buttonTitle={1} />
      <PinStand buttonTitle={1} />
      <PinDown buttonTitle={1} />
      <PinConv buttonTitle={1} />
    </View>
  );
};

export default TrackerScreen;
