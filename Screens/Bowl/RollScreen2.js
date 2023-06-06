import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinDown from "../../Components/Buttons/PinDown";
import PinStand from "../../Components/Buttons/PinStand";
import PinConv from "../../Components/Buttons/PinConv";
import ScoreBoard from "../../Components/Tables/ScoreBoard";

const RollScreen2 = ({ navigation, route }) => {
  const { pinState } = route.params;
  const [newPinState, setNewPinState] = useState(pinState);

  const togglePinState = (id) => {
    const pinType = {
      standing: "converted",
      down: "down",
      converted: "standing",
    };

    // Finally set the pin state
    setNewPinState((prevState) => ({
      ...prevState,
      [id]: pinType[prevState[id]],
    }));
  };

  const setSpare = () => {
    // "stanidng" pins -> "converted"
    const updatedPinState = Object.fromEntries(
      Object.entries(pinState).map(([id, state]) => [
        id,
        state === "standing" ? "converted" : state,
      ])
    );
    setNewPinState(updatedPinState);
  };

  const resetState = () => {
    setNewPinState(pinState);
  };

  const invertedTriangle = {
    0: ["7", "8", "9", "10"],
    1: ["4", "5", "6"],
    2: ["2", "3"],
    3: ["1"],
  };

  return (
    <View>
      {/* Scoreboard */}
      <View style={{ alignItems: "stretch" }}>
        <ScoreBoard />
      </View>

      {/* Pin Display */}
      <View style={{ flexDirection: "column" }}>
        {Object.entries(invertedTriangle).map(([rowIndex, pins]) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: -5,
            }}
          >
            {pins.map((pinId) => {
              const pinType = newPinState[pinId];

              switch (pinType) {
                case "down":
                  return (
                    <PinDown
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                case "standing":
                  return (
                    <PinStand
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                case "converted":
                  return (
                    <PinConv
                      key={pinId}
                      buttonTitle={pinId}
                      onPress={() => togglePinState(pinId)}
                    />
                  );
                default:
                  return null;
              }
            })}
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setSpare()}>
          <Text style={{fontSize: 16, color: "white"}}>Spare</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetState()}>
          <Text style={{fontSize: 16, color: "white"}}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("RollScreen1")}>
          <Text style={{fontSize: 16, color: "white"}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RollScreen2;
