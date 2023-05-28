import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PinDown from "../../Components/Buttons/PinDown";
import PinInit from "../../Components/Buttons/PinInit";
import PinStand from "../../Components/Buttons/PinStand";
import PinConv from "../../Components/Buttons/PinConv";

const Roll2 = ({ navigation, route }) => {
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#36393f",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        {Object.entries(invertedTriangle).map(([rowIndex, pins]) => (
          <View
            key={rowIndex}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
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
      <TouchableOpacity onPress={() => setSpare()}>
        <Text>Spare</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => resetState()}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("Roll1")}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Roll2;
